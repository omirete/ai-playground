import OpenAI from "openai";
import PromptDALLE from "@/models/PromptDALLE";
import { dataUrlToFile, uploadBlob } from "@/src/helpers/fileStorage";
import { randomUUID } from "crypto";
import authenticateRequest from "@/server/helpers/authenticateRequest";
import responseWithStatus from "@/server/helpers/responseWithStatus";
import { authErrorUnauthorized } from "@/server/errors";
import { createReadStream } from "fs";

export default defineEventHandler(async (event) => {
    const user = authenticateRequest(getHeader(event, "Authorization"));
    if (user) {
        const query = getQuery(event);
        const promptId = query.promptId?.toString();
        if (promptId) {
            const originalImg = await PromptDALLE.findOne({
                where: {
                    userId: user.id,
                    id: promptId,
                },
            });
            if (originalImg) {
                // const dalle3 = query.model?.toString() === "dall-e-3";
                const dalle3 = false; // Only dalle-2 supported model at the moment.
                const model = dalle3 ? "dall-e-3" : "dall-e-2";
                const n = dalle3 ? 1 : 2;
                const openai = new OpenAI({
                    organization: process.env.OPENAI_ORG_ID,
                    apiKey: process.env.OPENAI_API_SECRET,
                });
                const response = await openai.images.createVariation({
                    image: createReadStream(
                        `${process.env.IMG_SAVE_DIR}${originalImg.dataValues.image}`,
                    ),
                    model,
                    n,
                    size: dalle3 ? "1024x1024" : "256x256",
                    response_format: "b64_json",
                });
                const imageSrcs: string[] = [];
                const generatedImagesPromise = response.data.map(async (d) => {
                    const src = `data:image/jpeg;base64,${d.b64_json}`;
                    imageSrcs.push(src);
                    const revisedPrompt = d.revised_prompt;
                    const filename = `${randomUUID()}.jpg`;
                    const img = dataUrlToFile(src, filename);
                    if (img) {
                        const success = await uploadBlob(
                            img,
                            process.env.IMG_SAVE_DIR ?? "",
                            filename,
                            false,
                        );
                        if (success) {
                            return PromptDALLE.create({
                                userId: user.id,
                                prompt: originalImg.dataValues.prompt,
                                revisedPrompt:
                                    revisedPrompt ??
                                    originalImg.dataValues.revisedPrompt,
                                variationOf: promptId,
                                model,
                                image: filename,
                            });
                        } else {
                            console.error(
                                "Could not upload img to filestorage.",
                            );
                            return Promise.resolve(undefined);
                        }
                    } else {
                        console.error(
                            "Could not generate an image file to store it.",
                        );
                        return Promise.resolve(undefined);
                    }
                });
                const generatedImages = await Promise.all(
                    generatedImagesPromise,
                );
                const responseData = {
                    data: generatedImages
                        .map((x) => x?.dataValues)
                        .filter((x) => x !== undefined),
                    images: imageSrcs,
                    status: response.created > 0 ? 200 : 500,
                    text: `Created ${n} variation/s.`,
                };
                return responseWithStatus(event, responseData);
            } else {
                return responseWithStatus(event, {
                    status: 400,
                    error: "Could not find original image, or image doesn't belong to this user.",
                });
            }
        } else {
            return responseWithStatus(event, {
                status: 400,
                error: "Missing promptId param.",
            });
        }
    } else {
        return responseWithStatus(event, authErrorUnauthorized);
    }
});

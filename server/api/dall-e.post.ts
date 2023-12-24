import OpenAI from "openai";
import PromptDALLE from "@/models/PromptDALLE";
import { dataUrlToFile, uploadBlob } from "@/src/helpers/fileStorage";
import { randomUUID } from "crypto";
import authenticateRequest from "@/server/helpers/authenticateRequest";
import responseWithStatus from "@/server/helpers/responseWithStatus";
import { authErrorUnauthorized } from "@/server/errors";
import GeneratedImage from "@/src/types/GeneratedImage";

export interface DallEPostReturn {
    data: GeneratedImage[];
    images: string[];
    status: number;
    text: string;
}

export default defineEventHandler(async (event) => {
    const user = authenticateRequest(getHeader(event, "Authorization"));
    if (user) {
        const query = getQuery(event);
        const prompt = query.prompt?.toString();
        if (prompt) {
            const model = query.model?.toString();
            const dalle3 = model === "dall-e-3";
            const openai = new OpenAI({
                organization: process.env.OPENAI_ORG_ID,
                apiKey: process.env.OPENAI_API_SECRET,
            });
            const response = await openai.images.generate({
                prompt,
                n: dalle3 ? 1 : 2,
                response_format: "b64_json",
                size: dalle3 ? "1024x1024" : "256x256",
                model: dalle3 ? "dall-e-3" : "dall-e-2",
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
                            prompt,
                            revisedPrompt,
                            model: dalle3 ? "dall-e-3" : "dall-e-2",
                            image: filename,
                        });
                    } else {
                        console.error("Could not upload img to filestorage.");
                        return Promise.resolve(undefined);
                    }
                } else {
                    console.error(
                        "Could not generate an image file to store it.",
                    );
                    return Promise.resolve(undefined);
                }
            });
            const generatedImages = await Promise.all(generatedImagesPromise);
            const responseData = {
                data: generatedImages
                    .map((x) => x?.dataValues)
                    .filter((x) => x !== undefined),
                images: imageSrcs,
                status: response.created > 0 ? 200 : 500,
                text: `Created ${response.created} image/s.`,
            };
            return responseWithStatus(event, responseData);
        } else {
            return responseWithStatus(event, {
                status: 400,
                error: "Missing prompt param.",
            });
        }
    } else {
        return responseWithStatus(event, authErrorUnauthorized);
    }
});

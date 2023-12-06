import OpenAI from "openai";
import PromptDALLE from "@/models/PromptDALLE";
import { dataUrlToFile, uploadBlob } from "@/src/helpers/fileStorage";
import { randomUUID } from "crypto";
import authenticateRequest from "@/server/helpers/authenticateRequest";
import responseWithStatus from "@/server/helpers/responseWithStatus";
import { authErrorUnauthorized } from "@/server/errors";

export default defineEventHandler(async (event) => {
    const user = authenticateRequest(getHeader(event, "Authorization"));
    if (user) {
        const query = getQuery(event);
        const prompt = query.prompt?.toString();
        if (prompt) {
            const openai = new OpenAI({
                organization: process.env.OPENAI_ORG_ID,
                apiKey: process.env.OPENAI_API_SECRET,
            });
            const response = await openai.images.generate({
                prompt,
                n: 2,
                response_format: "b64_json",
                size: "256x256",
            });
            const img_src = response.data.map(
                (d) => `data:image/jpeg;base64,${d.b64_json}`
            );
            img_src.forEach((src) => {
                const filename = `${randomUUID()}.jpg`;
                const img = dataUrlToFile(src, filename);
                if (img) {
                    uploadBlob(
                        img,
                        process.env.IMG_SAVE_DIR ?? "",
                        filename,
                        false
                    ).then(async (success) => {
                        if (success) {
                            await PromptDALLE.create({
                                userId: user.id,
                                prompt,
                                image: filename,
                            });
                        } else {
                            console.error(
                                "Could not upload img to filestorage."
                            );
                        }
                    });
                } else {
                    console.error(
                        "Could not generate an image file to store it."
                    );
                }
            });
            return responseWithStatus(event, {
                data: response.data,
                images: img_src,
                status: response.created > 0 ? 200 : 500,
                text: `Creaded ${response.created} image/s.`,
            });
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

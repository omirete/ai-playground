import { Configuration, OpenAIApi } from "openai";
import PromptDALLE from "~/models/PromptDALLE";
import { dataUrlToFile, uploadBlob } from "~/src/helpers/fileStorage";
import { randomUUID } from "crypto";
import authenticateRequest from "~/server/helpers/authenticateRequest";
import { authErrorUnauthorized } from "~/server/errors";

export default defineEventHandler(async (event) => {
    const user = authenticateRequest(getHeader(event, "Authorization"));
    if (user) {
        const query = getQuery(event);
        const prompt = query.prompt?.toString();
        if (prompt) {
            const configuration = new Configuration({
                organization: process.env.OPENAI_ORG_ID,
                apiKey: process.env.OPENAI_API_SECRET,
            });
            const openai = new OpenAIApi(configuration);
            const response = await openai.createImage({
                prompt,
                n: 2,
                response_format: "b64_json",
                size: "256x256",
            });
            const img_src = response.data.data.map(
                (d) => `data:image/jpeg;base64,${d.b64_json}`
            );
            img_src.forEach((src) => {
                const filename = `${randomUUID()}.jpg`;
                const img = dataUrlToFile(src, filename);
                if (img) {
                    uploadBlob(
                        img,
                        `${process.env.SFTP_BASE_DIR ?? ""}generated-images`,
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
            return {
                data: response.data,
                images: img_src,
                status: response.status,
                text: response.statusText,
            };
        } else {
            return { error: "Missing prompt param." };
        }
    } else {
        return authErrorUnauthorized;
    }
});

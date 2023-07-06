import { Configuration, OpenAIApi } from "openai";
import PromptDALLE from "../../models/PromptDALLE";
import {
    dataUrlToFile,
    uploadBlob,
} from "../../src/helpers/fileStorage/webdav";
import { randomUUID } from "crypto";

export default defineEventHandler(async (event) => {
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
                    "generated-images",
                    filename,
                    false
                ).then((success) => {
                    if (success) {
                        console.log("Img uploaded to filestorage.");
                        PromptDALLE.create({
                            prompt,
                            image: filename,
                        }).then(() => {
                            console.log("Img info stored in database.");
                        });
                    } else {
                        console.error("Could not upload img to filestorage.");
                    }
                });
            } else {
                console.error("Could not generate an image file to store it.");
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
});

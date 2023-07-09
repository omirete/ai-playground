import PromptGPT from "~/models/PromptGPT";
import authenticateRequest from "~/server/helpers/authenticateRequest";
import { authErrorUnauthorized } from "~/server/errors";

export default defineEventHandler(async (event) => {
    const user = authenticateRequest(getHeader(event, "Authorization"));
    if (user) {
        const promptsGPT = await PromptGPT.findAll({
            where: { userId: user.id },
        });
        return {
            prompts: promptsGPT.map((p) => p.dataValues),
        };
    } else {
        return authErrorUnauthorized;
    }
});

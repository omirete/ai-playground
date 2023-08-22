import PromptGPT from "~/models/PromptGPT";
import authenticateRequest from "~/server/helpers/authenticateRequest";
import responseWithStatus from "~/server/helpers/responseWithStatus";
import { authErrorUnauthorized } from "~/server/errors";

export default defineEventHandler(async (event) => {
    const user = authenticateRequest(getHeader(event, "Authorization"));
    if (user) {
        const promptsGPT = await PromptGPT.findAll({
            where: { userId: user.id },
        });
        return responseWithStatus(event, {
            status: 200,
            prompts: promptsGPT.map((p) => p.dataValues),
        });
    } else {
        return responseWithStatus(event, authErrorUnauthorized);
    }
});

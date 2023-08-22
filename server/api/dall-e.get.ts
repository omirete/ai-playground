import PromptDALLE from "~/models/PromptDALLE";
import { authErrorUnauthorized } from "~/server/errors";
import authenticateRequest from "~/server/helpers/authenticateRequest";
import responseWithStatus from "~/server/helpers/responseWithStatus";

export default defineEventHandler(async (event) => {
    const user = authenticateRequest(getHeader(event, "Authorization"));
    if (user) {
        const promptsDalle = await PromptDALLE.findAll({
            where: { userId: user.id },
        });
        return responseWithStatus(event, {
            status: 200,
            prompts: promptsDalle.map((p) => p.dataValues),
        });
    } else {
        return responseWithStatus(event, authErrorUnauthorized);
    }
});

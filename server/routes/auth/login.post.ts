import { compareSync } from "bcrypt";
import { generateToken } from "@/server/helpers/jwt";
import User from "@/models/User";
import {
    authErrorIncorrectCredentials,
    authErrorMissingCredentials,
} from "@/server/errors";
import responseWithStatus from "@/server/helpers/responseWithStatus";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const jsonBody = typeof body === "string" ? JSON.parse(body) : body;
    if (!jsonBody.email || !jsonBody.password) {
        return responseWithStatus(event, authErrorMissingCredentials);
    }
    const user = await User.findOne({ where: { email: jsonBody.email } });
    if (user === null) {
        return responseWithStatus(event, authErrorIncorrectCredentials);
    }
    const pwdOk = compareSync(jsonBody.password, user.dataValues.pwdHash);

    if (pwdOk) {
        const token = generateToken(user);
        return responseWithStatus(event, { status: 200, token });
    } else {
        return responseWithStatus(event, authErrorIncorrectCredentials);
    }
});

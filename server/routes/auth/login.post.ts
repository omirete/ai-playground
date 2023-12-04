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
    if (!body.email || !body.password) {
        return responseWithStatus(event, authErrorMissingCredentials);
    }
    const user = await User.findOne({ where: { email: body.email } });
    if (user === null) {
        return responseWithStatus(event, authErrorIncorrectCredentials);
    }

    const pwdOk = compareSync(body.password, user.dataValues.pwdHash);
    const token = generateToken(user);

    if (pwdOk) {
        return responseWithStatus(event, { status: 200, token: token });
    } else {
        return responseWithStatus(event, authErrorIncorrectCredentials);
    }
});

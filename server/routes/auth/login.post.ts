import { compareSync } from "bcrypt";
import { generateToken } from "~/server/helpers/jwt";
import User from "~/models/User";
import {
    authErrorIncorrectCredentials,
    authErrorMissingCredentials,
} from "~/server/errors";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    if (!body.email || !body.password) {
        return authErrorMissingCredentials;
    }
    const user = await User.findOne({ where: { email: body.email } });
    if (user === null) {
        return authErrorIncorrectCredentials;
    }

    const pwdOk = compareSync(body.password, user.dataValues.pwdHash);
    const token = generateToken(user);

    if (pwdOk) {
        return {
            status: 200,
            token: token,
        };
    } else {
        return authErrorIncorrectCredentials;
    }
});

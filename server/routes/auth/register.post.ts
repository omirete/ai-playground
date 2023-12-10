import { hashSync } from "bcrypt";
import { validatePassword } from "@/src/helpers/password";
import User from "@/models/User";
import responseWithStatus from "../../helpers/responseWithStatus";
import { authErrorMissingCredentials } from "../../errors";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const jsonBody = typeof body === "string" ? JSON.parse(body) : body;
    if (!jsonBody.email || !jsonBody.password || !jsonBody.name) {
        return responseWithStatus(event, authErrorMissingCredentials);
    }
    if (!validatePassword(jsonBody.password)) {
        return responseWithStatus(event, {
            status: 400,
            text: "Password not strong enough.",
        });
    }

    const saltRounds = 10;
    const pwdHash = hashSync(jsonBody.password, saltRounds);
    try {
        const user = await User.create({
            email: jsonBody.email,
            name: jsonBody.name,
            pwdHash,
        });
    } catch (error) {
        // Cannot create account because email is already registered, but we
        // cannot disclose this info, so we pretend like the user was created
        // successfully.
        return responseWithStatus(event, {
            status: 201,
            text: "User created successfully.",
        });
    }
    return responseWithStatus(event, {
        status: 201,
        text: "User created successfully.",
    });
});

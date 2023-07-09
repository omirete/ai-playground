import { hashSync } from "bcrypt";
import { validatePassword } from "~/src/helpers/password";
import User from "~/models/User";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    if (!body.email || !body.password || !body.name) {
        return {
            status: 400,
            text: "Missing email, password or name.",
        };
    }
    if (!validatePassword(body.password)) {
        return {
            status: 400,
            text: "Password not strong enough.",
        };
    }

    const saltRounds = 10;
    const pwdHash = hashSync(body.password, saltRounds);
    try {
        const user = await User.create({
            email: body.email,
            name: body.name,
            pwdHash,
        });
    } catch (error) {
        // Cannot create account because email is already registered, but we
        // cannot disclose this info, so we pretend like the user was created
        // successfully.
        return {
            status: 201,
            text: "User created successfully.",
        };
    }
    return {
        status: 201,
        text: "User created successfully.",
    };
});

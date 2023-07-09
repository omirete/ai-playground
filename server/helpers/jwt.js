import { readFileSync } from "fs";
import jwt from "jsonwebtoken";

export const verifyAndDecodeToken = (token) => {
    const pubkey = readFileSync("public.pem");
    const decodedToken = jwt.verify(token, pubkey, {
        ignoreExpiration: false,
        algorithms: ["RS256"],
    });
    return decodedToken;
};

export const generateToken = (user) => {
    // sign with RSA SHA256
    const privateKey = readFileSync("private.key");
    const token = jwt.sign(
        {
            data: {
                user: user.dataValues, // User from sequelize model
            },
        },
        privateKey,
        {
            expiresIn: "7d",
            algorithm: "RS256",
        }
    );
    return token;
};

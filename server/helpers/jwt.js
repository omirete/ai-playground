import jwt from "jsonwebtoken";

export const verifyAndDecodeToken = (token) => {
    const config = useRuntimeConfig();
    const pubkey = config.public.publicKey;
    const decodedToken = jwt.verify(token, pubkey, {
        ignoreExpiration: false,
        algorithms: ["RS256"],
    });
    return decodedToken;
};

export const generateToken = (user) => {
    const config = useRuntimeConfig();
    // sign with RSA SHA256
    const privateKey = config.privateKey;
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

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
    const userData = user.dataValues;
    const token = jwt.sign(
        {
            data: {
                user: {
                    id: userData.id,
                    email: userData.email,
                    name: userData.name,
                    createdAt: userData.createdAt,
                    updatedAt: userData.updatedAt,
                }, // User from sequelize model
            },
        },
        privateKey,
        {
            expiresIn: "7d",
            algorithm: "RS256",
        },
    );
    return token;
};

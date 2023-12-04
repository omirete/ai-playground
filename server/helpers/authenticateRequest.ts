import type UserType from "@/src/types/UserType";
import { verifyAndDecodeToken } from "./jwt";

const authenticateRequest = (auth?: string): UserType | undefined => {
    if (auth?.startsWith("Bearer ")) {
        const token = auth.split(" ", 2)[1];
        const tokenPayload = verifyAndDecodeToken(token) as Record<string, any>;
        if (
            Object.keys(tokenPayload).includes("data") &&
            Object.keys(tokenPayload.data).includes("user") &&
            Object.keys(tokenPayload.data.user).includes("id") &&
            Object.keys(tokenPayload.data.user).includes("email") &&
            Object.keys(tokenPayload.data.user).includes("name") &&
            Object.keys(tokenPayload.data.user).includes("createdAt") &&
            Object.keys(tokenPayload.data.user).includes("updatedAt")
        ) {
            return {
                id: tokenPayload.data.user.id,
                email: tokenPayload.data.user.email,
                name: tokenPayload.data.user.name,
                createdAt: tokenPayload.data.user.createdAt,
                updatedAt: tokenPayload.data.user.updatedAt,
            };
        } else {
            console.error("Invalid token");
            return undefined;
        }
    }
    return undefined;
};

export default authenticateRequest;

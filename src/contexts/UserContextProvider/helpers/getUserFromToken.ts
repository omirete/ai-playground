import type UserType from "@/src/types/UserType";

const getUserFromToken = (token: string | null): UserType | undefined => {
    if (token !== null) {
        try {
            const base64Url = token.split(".")[1];
            const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
            const jsonPayload = decodeURIComponent(
                atob(base64)
                    .split("")
                    .map(function (c) {
                        return (
                            "%" +
                            ("00" + c.charCodeAt(0).toString(16)).slice(-2)
                        );
                    })
                    .join(""),
            );
            const payloadObj = JSON.parse(jsonPayload);
            const expirationDate = new Date(payloadObj.exp * 1000);
            if (expirationDate.toISOString() > new Date().toISOString()) {
                const userData = payloadObj.data.user;
                const user: UserType = {
                    id: userData.id,
                    name: userData.name,
                    email: userData.email,
                    createdAt: userData.createdAt,
                    updatedAt: userData.updatedAt,
                };
                return user;
            }
            return undefined;
        } catch (error) {
            console.error(error);
            return undefined;
        }
    } else {
        return undefined;
    }
};

export default getUserFromToken;

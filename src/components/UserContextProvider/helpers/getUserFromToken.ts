import UserType from "~/src/types/UserType";

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
                    .join("")
            );
            const payloadObj = JSON.parse(jsonPayload);
            const user: UserType = {
                id: payloadObj.data.user.id,
                name: payloadObj.data.user.email,
                email: payloadObj.data.user.email,
                createdAt: payloadObj.data.user.createdAt,
                updatedAt: payloadObj.data.user.updatedAt,
            };
            return user;
        } catch (error) {
            console.error(error);
            return undefined;
        }
    } else {
        return undefined;
    }
};

export default getUserFromToken;

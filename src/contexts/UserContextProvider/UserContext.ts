import type { InjectionKey } from "vue";
import type UserType from "@/src/types/UserType";

export interface UserContextType {
    user: Ref<UserType | undefined>;
    updateToken(newToken: string): void;
    clearToken(): void;
}

const UserContext = Symbol() as InjectionKey<UserContextType>;

export default UserContext;

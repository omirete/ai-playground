import type { InjectionKey } from "vue";
import type UserType from "@/src/types/UserType";

const UserContext = Symbol() as InjectionKey<Ref<UserType | undefined>>;

export default UserContext;

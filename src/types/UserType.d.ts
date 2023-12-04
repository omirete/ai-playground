import { UserFields } from "@/models/User";
import { type MetaFields } from "@/models";

type UserType = Omit<UserFields & MetaFields, "pwdHash">;

export default UserType;

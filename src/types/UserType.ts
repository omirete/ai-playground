import { UserFields } from "~/models/User";
import { MetaFields } from "~/models";

type UserType = Omit<UserFields & MetaFields, "pwdHash">;

export default UserType;

import { iUserFields } from "./IUserFields";
export interface ILoginUser extends Readonly<Pick<iUserFields, "email" | "password">> { }
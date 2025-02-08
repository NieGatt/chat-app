import { iUserFields } from "./IUserFields";
export interface IResetPass extends Readonly<Pick<iUserFields, "id" | "password">> {
    currentPassword?: string;
}
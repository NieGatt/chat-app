import { iUserFields } from "./IUserFields";
export interface IUpdateUser extends Readonly<Pick<iUserFields, "id" | "name">> {
    filePath?: string;
} 
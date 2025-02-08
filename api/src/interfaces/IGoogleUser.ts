import { iUserFields } from "./IUserFields";
export interface IGoogleUser extends Readonly<Pick<iUserFields, "email" | "name" | "pictureUrl" | "id">> { }
import { iUserFields } from "./IUserFields";
export interface IRegisterUser extends Omit<iUserFields, "pictureUrl"> { }
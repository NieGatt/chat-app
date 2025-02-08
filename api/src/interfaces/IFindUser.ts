import { iUserFields } from "./IUserFields";
export interface IFindUser extends Readonly<Pick<iUserFields, "id" | "name">> {
    page: number
}
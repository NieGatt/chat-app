import { iUserFields } from "./IUserFields";
export interface ISendEmail extends Readonly<Pick<iUserFields, "name" | "email">> {
    template: "email-verification" | "forgot-password"
    token: string;
}
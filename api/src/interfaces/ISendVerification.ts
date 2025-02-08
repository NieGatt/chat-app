import { iUserFields } from "./IUserFields";
export interface ISendVerification extends Readonly<Pick<iUserFields, "email">> {
    template: "email-verification" | "forgot-password"
}
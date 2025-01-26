export interface ISendEmailHandler {
    name: string;
    email: string;
    token: string;
    templateName: "EmailVerification" | "PasswordReset"
}
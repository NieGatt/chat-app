export interface ISendEmailHandler {
    name: string;
    email: string;
    token: string;
    templateName: "email-verification" | "forgot-password"
}
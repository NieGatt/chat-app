import { TemplateType } from "../types/TemplateType";

export interface ISendEmailHandler {
    name: string;
    email: string;
    token: string;
    templateName: TemplateType
}
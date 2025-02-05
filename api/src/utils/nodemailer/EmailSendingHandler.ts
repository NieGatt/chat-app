import { transporter } from "./NodeMailerConfig";
import { ISendEmailHandler } from "../../interfaces/ISendEmailHandler";
import { GenerateTemplate } from "../template/GenerateTemplate";

export class EmailSendingHandler {
    async deliverEmail(data: ISendEmailHandler) {
        const generateTemplate = new GenerateTemplate()
        const template = generateTemplate.compile({
            name: data.name,
            token: data.token,
            templateName: data.templateName
        });

        await transporter.sendMail({
            from: "itbreaksfast@gmail.com",
            to: data.email,
            html: template
        })
    }
}
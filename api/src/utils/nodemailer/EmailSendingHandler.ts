import { transporter } from "./NodeMailerConfig";
import { ISendEmailHandler } from "../../interfaces/ISendEmailHandler";
import { templateHandler } from "../template/TemplateHandler";

export const deliverEmail = async (data: ISendEmailHandler) => {
    const template = templateHandler({
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
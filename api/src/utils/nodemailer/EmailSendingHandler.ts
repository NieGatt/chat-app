import { transporter } from "./NodeMailerConfig";
import { templateHandler } from "../template/TemplateHandler";
import { ISendEmail } from "../../interfaces/ISendEmail";

export const deliverEmail = async (data: ISendEmail) => {
    const template = templateHandler({
        name: data.name,
        token: data.token,
        template: data.template
    });

    await transporter.sendMail({
        from: "itbreaksfast@gmail.com",
        to: data.email,
        html: template
    })
}
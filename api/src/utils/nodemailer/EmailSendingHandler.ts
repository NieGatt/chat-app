import { transporter } from "./NodeMailerConfig";
import hbs from "handlebars";
import * as path from "path";
import * as fs from "fs";
import { ISendEmailHandler } from "../../interfaces/ISendEmailHandler";

export class EmailSendingHandler {
    private compileTemplate(data: Omit<ISendEmailHandler, "email">) {
        const templatePath = path.join(__dirname, `templates/${data.templateName}.hbs`);
        const templateFile = fs.readFileSync(templatePath, "utf-8");
        const template = hbs.compile(templateFile);
        return template({
            name: data.name,
            token: data.token
        })
    }

    async deliverEmail(data: ISendEmailHandler) {
        const template = this.compileTemplate({
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
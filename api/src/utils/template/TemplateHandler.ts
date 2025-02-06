import { ISendEmailHandler } from "../../interfaces/ISendEmailHandler";
import hbs from "handlebars";
import * as path from "path";
import * as fs from "fs";

export const templateHandler = (data: Omit<ISendEmailHandler, "email">) => {
    const templatePath = path.join(__dirname, `templates/${data.templateName}.hbs`);
    const templateFile = fs.readFileSync(templatePath, "utf-8");
    const template = hbs.compile(templateFile);
    return template({
        name: data.name,
        token: data.token
    })
}

import hbs from "handlebars";
import * as path from "path";
import * as fs from "fs";
import { ICompileTemplate } from "../../interfaces/ICompileTemplate";

export const templateHandler = (data: ICompileTemplate) => {
    const templatePath = path.join(__dirname, `templates/${data.template}.hbs`);
    const templateFile = fs.readFileSync(templatePath, "utf-8");
    const template = hbs.compile(templateFile);
    return template({
        name: data.name,
        token: data.token
    })
}

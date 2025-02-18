import { z } from "zod";

const fieldsSchema = z.object({
    name:
        z.string({ message: "Name Is Requred" })
            .regex(/^[a-zA-ZÀ-ú\s]{3,50}$/, {
                message: "Name must contain 3 to 50 characters (letters/spaces)"
            })
            .trim(),
            
    text: z.string().regex(/^[a-zA-ZÀ-ú0-9\s\?><\.,\]\[\)\(\+\=_\*&\^%\$#@\!`;:'"\|\\\-]{1,500}$/, { message: "text field does not match regex: /^[a-zA-ZÀ-ú\s\?><\.,\]\[\)\(\+\=_\*&\^%\$#@\!`;:'\"\|\\\-]{1,500}$/" }).optional(),

    email:
        z.string({ message: "Email Is Requred" })
            .email({ message: "Invalid Email Format" }),

    password:
        z.string({ message: "Password Is Requred" })
            .regex(/^(?=.*[a-zA-Z])(?=.*[0-9&%$#@])[A-Za-z0-9&%$#@]{8,16}$/
                , {
                    message: "Password must match /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9&%$#@])[A-Za-z0-9&%$#@]{8,16}$/"
                })
            .trim()
})


export { fieldsSchema }
import { z } from "zod";

const fieldsSchema = z.object({
    file:
        z.instanceof(File)
            .refine((file) => file.size <= 100 * 1024 * 1024, "File cannot exceed 100MB")
            .refine((file) =>
                ["image/jpeg", "image/jpg", "image/png", "video/mp4", "image/gif"].includes(file.type),
                "File extension does not match .jpeg, .png, .jpg, .mp4")
            .optional(),

    fileImage:
        z.instanceof(File)
            .refine((file) => file.size <= 10 * 1024 * 1024, "File cannot exceed 10MB")
            .refine((file) =>
                ["image/jpeg", "image/jpg", "image/png"].includes(file.type),
                "File extension does not match .jpeg, .png, .jpg")
            .optional(),

    text: z.string().regex(/^[a-zA-ZÀ-ú0-9\s\?><\.,\]\[\)\(\+\=_\*&\^%\$#@\!`;:'"\|\\\-]{1,500}$/, { message: "text field does not match regex: /^[a-zA-ZÀ-ú\s\?><\.,\]\[\)\(\+\=_\*&\^%\$#@\!`;:'\"\|\\\-]{1,500}$/" }).optional(),

    name: z.string({ message: "Name Is Requred" }).regex(/^[a-zA-ZÀ-ú\s]{3,50}$/,
        { message: "Name is 3-50 chars and space" }).trim(),

    email: z.string({ message: "Email Is Requred" }).email(
        { message: "Invalid Email Format" }),

    currentPassword: z.string({ message: "Current password Is Requred" }).regex(/^(?=.*[a-zA-Z])(?=.*[0-9&%$#@])[A-Za-z0-9&%$#@]{8,16}$/,
        { message: "Mix letters with 0-9 or &%$#@ into 8-16 chars" })
        .trim().optional(),

    password: z.string({ message: "Password Is Requred" }).regex(/^(?=.*[a-zA-Z])(?=.*[0-9&%$#@])[A-Za-z0-9&%$#@]{8,16}$/,
        { message: "Mix letters with 0-9 or &%$#@ into 8-16 chars" })
        .trim(),

    confirmPassword: z.string({ message: "Confirm password Is Requred" })
})

export { fieldsSchema };
import { z } from "zod";

const fieldsSchema = z.object({
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
import { templateHandler } from "./TemplateHandler";

it("should generate templates correctly", () => {
    const emailTemplate = templateHandler({
        templateName: "email-verification",
        name: "Jhon Doe",
        token: "Some token"
    })

    const passwordTemplate = templateHandler({
        templateName: "forgot-password",
        name: "Jhon Doe",
        token: "Some"
    })

    expect(typeof emailTemplate).toBe("string")
    expect(emailTemplate).toContain("Email Verification")
    expect(typeof passwordTemplate).toBe("string")
    expect(passwordTemplate).toContain("Password Reset")
})
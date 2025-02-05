import { GenerateTemplate } from "./GenerateTemplate";

it("should generate templates correctly", () => {
    const generateTemplate = new GenerateTemplate()

    const emailTemplate = generateTemplate.compile({
        templateName: "email-verification",
        name: "Jhon Doe",
        token: "Some token"
    })

    const passwordTemplate = generateTemplate.compile({
        templateName: "forgot-password",
        name: "Jhon Doe",
        token: "Some"
    })

    expect(typeof emailTemplate).toBe("string")
    expect(emailTemplate).toContain("Email Verification")
    expect(typeof passwordTemplate).toBe("string")
    expect(passwordTemplate).toContain("Password Reset")
})
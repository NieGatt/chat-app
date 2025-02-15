import { transporter } from "./NodeMailerConfig"
import { deliverEmail } from "./EmailSendingHandler"

jest.mock("./NodeMailerConfig", () => {
    return { transporter: { sendMail: jest.fn(() => "success") } }
})

const mockedTransporter = <jest.Mocked<typeof transporter>>transporter

describe("testing email transporter", () => {
    it("should be called with correct parameters", async () => {
        deliverEmail({
            template: "email-verification",
            name: "Joana Doe",
            email: "example@account.com",
            token: "Some-Token"
        })

        expect(mockedTransporter.sendMail).toHaveBeenCalledTimes(1)
        expect(mockedTransporter.sendMail).toHaveBeenCalledWith({
            to: expect.stringMatching("example@account.com"),
            from: expect.stringMatching("itbreaksfast@gmail.com"),
            html: expect.stringContaining("Joana Doe")
        })
    })
})
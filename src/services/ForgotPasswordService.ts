import { getCustomRepository } from "typeorm"
import { UsersRepository } from "../repositories/UsersRepository"
import nodemailer from "nodemailer"

class ForgotPasswordService {
  async execute(email: string) {
    const usersRepository = getCustomRepository(UsersRepository)

    const user = await usersRepository.findOne({ email })

    if (!user) {
      throw new Error("User not found")
    }

    let transporter = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "2714d6e6b04133",
        pass: "209fbcf5334b98"
      }
    })

    const message = await transporter.sendMail({
      from: "ChatCom <noreply@example.com>",
      to: email,
      subject: "Hello ✔",
      html: "<b>Hello world?</b>"
    })

    console.log("Message sent: %s", message.messageId)
  }
}

export { ForgotPasswordService }

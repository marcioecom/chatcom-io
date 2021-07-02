import { getCustomRepository } from "typeorm"
import { UsersRepository } from "../repositories/UsersRepository"
import nodemailer from "nodemailer"
import config from '../config/mail'
import SMTPTransport from "nodemailer/lib/smtp-transport"

class ForgotPasswordService {
  async execute(email: string) {
    const usersRepository = getCustomRepository(UsersRepository)

    const user = await usersRepository.findOne({ email })

    if (!user) {
      throw new Error("User not found")
    }

    const transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: false,
      auth: {
        user: config.user,
        pass: config.pass
      },
      tls: { rejectUnauthorized: false }
    } as unknown as SMTPTransport.Options)

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

import { getCustomRepository } from "typeorm"
import { UsersRepository } from "../repositories/UsersRepository"
import { SendMailService } from "./SendMailService"
import { resolve } from "path"

class ForgotUserPasswordService {
  async execute(email: string) {
    const usersRepository = getCustomRepository(UsersRepository)
    const sendMailService = new SendMailService()

    const user = await usersRepository.findOne({ email })

    if (!user) {
      throw new Error("User not found")
    }

    const variables = {
      name: user.name,
      user_id: user.id,
      link: process.env.URL_MAIL
    };

    const emailPath = resolve(__dirname, "..", "..", "public", "views", "emails", "reset-password.hbs")

    sendMailService.execute(email, emailPath, variables)

  }
}

export { ForgotUserPasswordService }

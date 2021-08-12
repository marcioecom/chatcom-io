import { getCustomRepository } from "typeorm"
import { UsersRepository } from "../../repositories/UsersRepository"
import { SendMailUseCase } from "../sendMail/SendMailUseCase"
import { resolve } from "path"

class ForgotUserPasswordUseCase {
  async execute(email: string) {
    const usersRepository = getCustomRepository(UsersRepository)
    const sendMailService = new SendMailUseCase()

    const user = await usersRepository.findOne({ email })

    if (!user) {
      throw new Error("User not found")
    }

    const variables = {
      name: user.name,
      user_id: user.id,
      link: process.env.URL_MAIL
    };

    const emailPath = resolve(__dirname, "..", "..", "..", "public", "views", "emails", "reset-password.hbs")

    sendMailService.execute(email, emailPath, variables)

  }
}

export { ForgotUserPasswordUseCase }

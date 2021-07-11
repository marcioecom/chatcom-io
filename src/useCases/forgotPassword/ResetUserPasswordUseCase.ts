import { hash } from "bcryptjs"
import { getCustomRepository } from "typeorm"
import { UsersRepository } from "../../repositories/UsersRepository"


class ResetUserPasswordUseCase {
  async execute(id: string, newPassword: string) {
    const usersRepository = getCustomRepository(UsersRepository)

    const user = await usersRepository.findOne({ id })

    if (!user) {
      throw new Error('User not found')
    }

    const passwordHash = await hash(newPassword, 8)

    user.password = passwordHash

    await usersRepository.save(user)

    return user
  }
}

export { ResetUserPasswordUseCase }

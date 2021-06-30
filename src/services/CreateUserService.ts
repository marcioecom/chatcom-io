import { getCustomRepository } from "typeorm"
import { UsersRepository } from "../repositories/UsersRepository"
import { hash } from "bcryptjs"

interface IUserRequest {
  username: string;
  email: string;
  admin?: boolean;
  password: string;
}

class CreateUserService {
  async execute({ username, email, admin = false, password }: IUserRequest) {
    const usersRepository = getCustomRepository(UsersRepository)

    if (!email) {
      throw new Error("Email incorrect")
    }

    const userAlredyExists = await usersRepository.findOne({ email })

    if (userAlredyExists) {
      throw new Error("User alredy exists")
    }

    const passwordHash = await hash(password, 8)

    const user = usersRepository.create({
      username,
      email,
      admin,
      password: passwordHash
    })

    await usersRepository.save(user)

    return user
  }
}

export { CreateUserService }

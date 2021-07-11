import { Request, Response } from "express"
import { CreateUserUseCase } from "../useCases/createUser/CreateUserUseCase"

class CreateUserController {
  async handle(req: Request, res: Response) {
    const { name, email, admin, password } = req.body

    const createUserService = new CreateUserUseCase()

    const user = await createUserService.execute({
      name,
      email,
      admin,
      password
    })

    return res.json(user)
  }
}

export { CreateUserController }

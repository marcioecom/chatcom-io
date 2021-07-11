import { Request, Response } from "express"
import { AuthenticateUserUseCase } from "../useCases/authenticateUser/AuthenticateUserUseCase"

class AuthenticateUserController {
  async handle(req: Request, res: Response) {
    const { email, password } = req.body

    const authenticateUserService = new AuthenticateUserUseCase()

    const token = await authenticateUserService.execute({
      email,
      password
    })

    return res.json(token)
  }
}

export { AuthenticateUserController }

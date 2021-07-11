import { Request, Response } from "express";
import { ResetUserPasswordUseCase } from "../useCases/forgotPassword/ResetUserPasswordUseCase";

class ResetUserPasswordController {
  async handle(req: Request, res: Response) {
    const { newPassword } = req.body
    const { id } = req.params

    const resetUserPasswordService = new ResetUserPasswordUseCase()

    const user = await resetUserPasswordService.execute(id, newPassword)

    return res.json(user)
  }
}

export { ResetUserPasswordController }

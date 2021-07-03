import { Request, Response } from "express";
import { ResetUserPasswordService } from "../services/ResetUserPasswordService";

class ResetUserPasswordController {
  async handle(req: Request, res: Response) {
    const { newPassword } = req.body
    const { id } = req.params

    const resetUserPasswordService = new ResetUserPasswordService()

    const user = await resetUserPasswordService.execute(id, newPassword)

    return res.json(user)
  }
}

export { ResetUserPasswordController }

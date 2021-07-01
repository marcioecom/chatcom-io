import { Request, Response } from "express"
import { ForgotPasswordService } from "../services/ForgotPasswordService"

class ForgotPasswordController {
  async handle(req: Request, res: Response) {
    const { email } = req.body

    const forgotPasswordService = new ForgotPasswordService()

    forgotPasswordService.execute(email)

    return res.render('views/email-sent')
  }
}

export { ForgotPasswordController }

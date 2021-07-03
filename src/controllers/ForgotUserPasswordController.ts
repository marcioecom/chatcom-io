import { Request, Response } from "express"
import { ForgotUserPasswordService } from "../services/ForgotUserPasswordService"

class ForgotUserPasswordController {
  async handle(req: Request, res: Response) {
    const { email } = req.body

    const forgotPasswordService = new ForgotUserPasswordService()

    forgotPasswordService.execute(email)

    return res.render('views/email-sent')
  }
}

export { ForgotUserPasswordController }

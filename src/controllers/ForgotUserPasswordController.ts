import { Request, Response } from "express"
import { ForgotUserPasswordUseCase } from "../useCases/forgotPassword/ForgotUserPasswordUseCase"

class ForgotUserPasswordController {
  async handle(req: Request, res: Response) {
    const { email } = req.body

    const forgotPasswordService = new ForgotUserPasswordUseCase()

    forgotPasswordService.execute(email)

    return res.render('views/email-sent')
  }
}

export { ForgotUserPasswordController }

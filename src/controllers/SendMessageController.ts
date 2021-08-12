import { Request, Response } from "express";
import { CreateMessageUseCase } from "../useCases/Message/CreateMessageUseCase";

class SendMessageController {
  async handle(req: Request, res: Response) {
    const { user_sender, user_receiver, text } = req.body

    const createMessageUseCase = new CreateMessageUseCase()

    const message = createMessageUseCase.execute({
      user_sender,
      user_receiver,
      text
    })

    return res.json(message)
  }
}

export { SendMessageController }

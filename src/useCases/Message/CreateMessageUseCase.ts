import { getCustomRepository } from "typeorm"
import { MessagesRepository } from "../../repositories/MessagesRepository"

interface IMessageRequest {
  user_sender: string;
  user_receiver: string;
  text: string;
}

class CreateMessageUseCase {
  async execute({ user_sender, user_receiver, text }: IMessageRequest) {
    const messagesRepository = getCustomRepository(MessagesRepository)

    const message = messagesRepository.create({
      user_sender,
      user_receiver,
      text
    })

    messagesRepository.save(message)

    return message
  }
}

export { CreateMessageUseCase }

import { getCustomRepository, Repository } from "typeorm"
import { Connection } from "../../entities/Connection"
import { ConnectionsRepository } from "../../repositories/ConnectionsRepository"

interface IConnectionCreate {
  socket_id: string;
  user_sender: string;
  user_receiver: string;
}

class CreateConnectionUseCase {
  private connectionsRepository: Repository<Connection>

  constructor() {
    this.connectionsRepository = getCustomRepository(ConnectionsRepository)
  }

  async execute({ socket_id, user_sender, user_receiver }: IConnectionCreate) {

    const connection = this.connectionsRepository.create({
      user_sender,
      user_receiver,
      socket_id
    })

    await this.connectionsRepository.save(connection)

    return connection
  }
}

export { CreateConnectionUseCase }

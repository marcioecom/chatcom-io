import { Router } from "express"
import { CreateUserController } from "./controllers/CreateUserController";

const router = Router()

const createUserController = new CreateUserController()

router.get('/', function (req, res) {
  return res.sendFile(__dirname + '/views/index.html');
});

router.post('/users', createUserController.handle)

export { router }

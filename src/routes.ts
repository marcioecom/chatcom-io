import { Router } from "express"
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateUserController } from "./controllers/CreateUserController";

const router = Router()

const createUserController = new CreateUserController()
const authenticateUserController = new AuthenticateUserController()

router.get('/', function (req, res) {
  return res.sendFile(__dirname + '/views/index.html');
});

router.post('/users', createUserController.handle)
router.post('/login', authenticateUserController.handle)

export { router }

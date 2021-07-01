import { Router } from "express"
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateUserController } from "./controllers/CreateUserController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

const router = Router()

const createUserController = new CreateUserController()
const authenticateUserController = new AuthenticateUserController()

router.get('/', ensureAuthenticated, (req, res) => {
  return res.render('views/index');
});
router.get('/login', (req, res) => {
  return res.render('views/login')
})
router.get('/cadastro', (req, res) => {
  return res.render('views/register')
})
router.post('/users', createUserController.handle)
router.post('/login', authenticateUserController.handle)

export { router }

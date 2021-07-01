import { Router } from "express"
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateUserController } from "./controllers/CreateUserController";
import { ForgotPasswordController } from "./controllers/ForgotPasswordController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

const router = Router()

const createUserController = new CreateUserController()
const authenticateUserController = new AuthenticateUserController()
const forgotPasswordController = new ForgotPasswordController()

router.post('/users', createUserController.handle)
router.post('/login', authenticateUserController.handle)
router.post('/reset-password', forgotPasswordController.handle)

router.get('/', ensureAuthenticated, (req, res) => {
  return res.render('views/index');
});

router.get('/cadastro', (req, res) => {
  return res.render('views/register')
})

router.get('/login', (req, res) => {
  return res.render('views/login')
})

router.get('/forgot-password', (req, res) => {
  return res.render('views/forgot-password')
})

export { router }

import { Router } from "express";
import {getUser, login, register} from "../controllers/AuthController.js";
const router = Router()

router.post('/register', register);
router.post('/login',login);
router.get('/get-user', getUser);


export default router;

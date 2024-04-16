import { Router } from "express";
import {getUser, login, logout, register} from "../controllers/AuthController.js";
import { deleteFromId } from "../controllers/ToDoController.js";
const router = Router()

router.post('/register', register);
router.post('/login',login);
router.get('/get-user', getUser);
router.get('/logout',logout);

router.delete('/delete/:id', deleteFromId);


export default router;

import { Router } from "express";
import { getTodo, getTodoById } from "../controllers/ToDoController.js";

const router = Router()

router.get('/get-todo', getTodo);
router.get('/todo/:todoId', getTodoById);

export default router;

import { Router } from "express";
import { addTodo, changeTodo, getTodo, getTodoById } from "../controllers/ToDoController.js";

const router = Router()

router.get('/get-todo', getTodo);
router.get('/todo/:todoId', getTodoById);
router.post('/add-todo', addTodo);
router.post('/change-todo', changeTodo);

export default router;

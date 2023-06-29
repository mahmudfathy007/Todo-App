import { Router } from "express";
import { getAllTodos, createTodo , deleteTodo } from "./controller/todos.controller.js";


const router = Router();


router.get("/:userName/getTodos",getAllTodos);
router.post("/:userName/createTodos",createTodo);
router.delete("/:userName/deleteTodo/:id",deleteTodo);

export default router;
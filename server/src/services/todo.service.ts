import { NotFoundError } from "elysia";
import { todoQueries } from "../db/queries";
import { Todo } from "../db/schemas";

const todoService = {
  getAll: async () => {
    const todos = await todoQueries.getTodos();
    if (!todos.length) throw new NotFoundError("Empty todos");
    return todos;
  },
  getById: async (id: number) => {
    const todo = await todoQueries.getTodoById(id);
    if (!todo) throw new NotFoundError("Todo not found");
    return todo;
  },
  create: async (data: Todo.CreateTodoInput) => {
    const todo = await todoQueries.createTodo(data);
    if (!todo) throw new NotFoundError("Todo not found");
    return todo;
  },
  update: async (id: number, data: Todo.UpdateTodoInput) => {
    const todo = await todoQueries.updateTodo(id, data);
    if (!todo) throw new NotFoundError("Todo not found");
    return todo;
  },
  delete: async (id: number) => {
    const todo = await todoQueries.deleteTodo(id);
    if (!todo) throw new NotFoundError("Todo not found");
    return todo;
  },
};

export default todoService;

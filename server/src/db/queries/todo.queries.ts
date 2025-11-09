import { eq } from "drizzle-orm";
import db from "..";
import { Todo } from "../schemas";

export const getTodos = async () => {
  return await db.select().from(Todo.todoTable);
};

export const getTodoById = async (id: number) => {
  const [todo] = await db
    .select()
    .from(Todo.todoTable)
    .where(eq(Todo.todoTable.id, id));
  return todo;
};

export const createTodo = async (todo: Todo.CreateTodoInput) => {
  const [newTodo] = await db.insert(Todo.todoTable).values(todo).returning();
  return newTodo;
};

export const updateTodo = async (id: number, todo: Todo.UpdateTodoInput) => {
  const [updatedTodo] = await db
    .update(Todo.todoTable)
    .set(todo)
    .where(eq(Todo.todoTable.id, id))
    .returning();
  return updatedTodo;
};

export const deleteTodo = async (id: number) => {
  const [deletedTodo] = await db
    .delete(Todo.todoTable)
    .where(eq(Todo.todoTable.id, id))
    .returning();
  return deletedTodo;
};

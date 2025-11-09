import { Elysia } from "elysia";
import { errorSchema, withHandled } from "../lib/utils/errorsAndHandlers";
import { z } from "zod";
import {
  todoSchema,
  todoInsertSchema,
  todoUpdateSchema,
} from "../db/schemas/todo.schema";
import { todoService } from "../services";

const todoRoute = new Elysia({ prefix: "/todos" })
  .get(
    "/",
    withHandled(() => todoService.getAll()),
    {
      detail: {
        tags: ["todos"],
        summary: "Get all todos",
      },
      response: {
        200: z.array(todoSchema),
        404: errorSchema,
      },
    }
  )
  .get(
    "/:id",
    withHandled(({ params: { id } }) => todoService.getById(id)),
    {
      detail: {
        tags: ["todos"],
        summary: "Get todo by Id",
      },
      description: "Todo Id must be a valid number",
      params: z.object({ id: z.coerce.number() }),
      response: {
        200: todoSchema,
        404: errorSchema,
        422: errorSchema,
      },
    }
  )

  .post(
    "/",
    withHandled(({ body }) => todoService.create(body)),
    {
      detail: {
        tags: ["todos"],
        summary: "Create todo",
      },
      description: "to create todo title is required",
      body: todoInsertSchema,
      response: {
        201: todoSchema,
        422: errorSchema,
        500: errorSchema,
      },
    }
  )

  .put(
    "/:id",
    withHandled(({ params: { id }, body }) => todoService.update(id, body)),
    {
      detail: { tags: ["todos"], summary: "Update todo" },
      description:
        "to update todo, Todo id and need to update values are needed",
      params: z.object({ id: z.coerce.number() }),
      body: todoUpdateSchema,
      response: {
        200: todoSchema,
        404: errorSchema,
        422: errorSchema,
      },
    }
  )

  .delete(
    "/:id",
    withHandled(({ params: { id } }) => todoService.delete(id)),
    {
      detail: { tags: ["todos"], summary: "Delete todo" },
      description: "Todo Id must be a valid number",
      params: z.object({ id: z.coerce.number() }),
      response: {
        200: todoSchema,
        404: errorSchema,
        422: errorSchema,
      },
    }
  );
export default todoRoute;

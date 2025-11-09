import { pgTable, integer, varchar, boolean } from "drizzle-orm/pg-core";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import { z } from "zod";

export const todoTable = pgTable("todo", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar().notNull(),
  isCompleted: boolean().default(false).notNull(),
});

export const todoSchema = createSelectSchema(todoTable, {
  id: z.number().positive(),
});
export const todoInsertSchema = createInsertSchema(todoTable);
export const todoUpdateSchema = createUpdateSchema(todoTable);

export type Todo = z.infer<typeof todoSchema>;
export type CreateTodoInput = z.infer<typeof todoInsertSchema>;
export type UpdateTodoInput = z.infer<typeof todoUpdateSchema>;

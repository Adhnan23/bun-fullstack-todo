import { Elysia } from "elysia";
import todoRoute from "./todo.routes";

const apiRoutes = new Elysia({ prefix: "/api" }).use(todoRoute);

export default apiRoutes;

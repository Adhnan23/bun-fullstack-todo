import { Elysia, file } from "elysia";
import { openapi } from "@elysiajs/openapi";
import ENV from "./lib/utils/env";
import apiRoutes from "./routes";
import { z } from "zod";

const app = new Elysia()
  .use(
    openapi({
      mapJsonSchema: { zod: z.toJSONSchema },
    })
  )
  .onError(({ code, error, status }) => {
    switch (code) {
      case "VALIDATION":
        return status(422, { error: error.customError });
      case "NOT_FOUND":
        return status(404, { error: error.message });
      case "INTERNAL_SERVER_ERROR":
        return status(500, { error: error.message });
    }
  })
  .use(apiRoutes)
  .listen(ENV.PORT);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

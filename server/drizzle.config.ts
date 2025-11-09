import { defineConfig } from "drizzle-kit";
import ENV from "./src/lib/utils/env";

export default defineConfig({
  out: "./src/db/migrations",
  schema: "./src/db/schemas/index.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: ENV.DATABASE_URL,
  },
});

import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import ENV from "../lib/utils/env";

const pool = new Pool({
  connectionString: ENV.DATABASE_URL,
});
const db = drizzle({ client: pool });
export default db;

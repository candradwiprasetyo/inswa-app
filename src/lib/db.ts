import { Pool } from "pg";

const pool = new Pool({
  user: process.env.PG_USER,
  password: process.env.PG_PASS,
  host: process.env.PG_HOST,
  database: process.env.PG_DB,
  port: Number(process.env.PG_PORT),
  ssl: false,
});

export default pool;

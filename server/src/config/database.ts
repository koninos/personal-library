import "dotenv/config";
import pg from "pg";

const { Pool } = pg;

const isTestEnv = process.env.NODE_ENV === "test";

const connectionString = isTestEnv
  ? process.env.TEST_DATABASE_URL
  : process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error(
    isTestEnv
      ? "TEST_DATABASE_URL environment variable is required"
      : "DATABASE_URL environment variable is required",
  );
}

export const pool = new Pool({ connectionString });

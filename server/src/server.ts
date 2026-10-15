import express from "express";
import { pool } from "./config/database.js";
import booksRouter from "./routes/books.js";
import "dotenv/config";
import cors from "cors";

const app = express();
const port = Number(process.env.PORT) || 3000;

const artificialDelayMs =
  process.env.NODE_ENV === "production"
    ? 0
    : Number(process.env.ARTIFICIAL_DELAY_MS) || 0;

app.use(express.json());

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
  }),
);

if (artificialDelayMs > 0) {
  app.use(async (_req, _res, next) => {
    await new Promise((resolve) => setTimeout(resolve, artificialDelayMs));
    next();
  });
}

app.get("/api/health", async (_req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ status: "ok", database: "connected" });
  } catch (error) {
    console.error("Database health check failed:", error);
    res.status(503).json({ status: "error", database: "disconnected" });
  }
});

app.use("/api/books", booksRouter);

app.listen(port, () => {
  console.log(`API server listening on http://localhost:${port}`);
});

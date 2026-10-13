import { Router } from "express";
import { pool } from "../config/database.js";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, title, author, isbn, status FROM books ORDER BY id DESC",
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Failed to fetch books:", error);
    res.status(500).json({ error: "Failed to fetch books" });
  }
});

export default router;

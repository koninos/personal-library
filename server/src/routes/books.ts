import { Router } from "express";
import { pool } from "../config/database.js";
import { createBookSchema } from "../schemas/bookSchema.js";

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

router.post("/", async (req, res) => {
  const validation = createBookSchema.safeParse(req.body);

  if (!validation.success) {
    res.status(400).json({
      error: "Invalid book data",
      details: validation.error.flatten(),
    });

    return;
  }

  const { title, author, isbn } = validation.data;

  try {
    const result = await pool.query(
      `INSERT INTO books (title, author, isbn)
       VALUES ($1, $2, $3)
       RETURNING id, title, author, isbn, status`,
      [title, author, isbn || null],
    );

    const newEntry = result.rows[0];

    res.status(201).json(newEntry);
  } catch (error) {
    console.error("Failed to create book:", error);
    res.status(500).json({ error: "Failed to create book" });
  }
});

export default router;

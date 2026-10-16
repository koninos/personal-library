import { beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import app from "../app.js";
import { pool } from "../config/database.js";

beforeEach(async () => {
  await pool.query("TRUNCATE TABLE books RESTART IDENTITY");
});

describe("GET /api/books", () => {
  it("returns an array of books", async () => {
    const response = await request(app).get("/api/books");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.any(Array));
  });

  it("returns the books stored in the database", async () => {
    await pool.query(
      `INSERT INTO books (title, author)
     VALUES ($1, $2), ($3, $4)`,
      ["The Hobbit", "J. R. R. Tolkien", "Dune", "Frank Herbert"],
    );

    const response = await request(app).get("/api/books");

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
    expect(response.body.map((book: { title: string }) => book.title)).toEqual([
      "Dune",
      "The Hobbit",
    ]);
  });
});

describe("POST /api/books", () => {
  it("creates a book and persists it in the database", async () => {
    const response = await request(app).post("/api/books").send({
      title: "  The Hobbit  ",
      author: "  J. R. R. Tolkien  ",
    });

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      title: "The Hobbit",
      author: "J. R. R. Tolkien",
      isbn: null,
      status: "want-to-read",
    });
    expect(response.body.id).toEqual(expect.any(Number));

    const result = await pool.query(
      "SELECT title, author, status FROM books WHERE id = $1",
      [response.body.id],
    );

    expect(result.rows).toEqual([
      {
        title: "The Hobbit",
        author: "J. R. R. Tolkien",
        status: "want-to-read",
      },
    ]);
  });

  it("rejects a book with an empty title", async () => {
    const response = await request(app).post("/api/books").send({
      title: "   ",
      author: "J. R. R. Tolkien",
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Invalid book data");

    const result = await pool.query("SELECT COUNT(*) FROM books");

    expect(Number(result.rows[0].count)).toBe(0);
  });

  it("rejects a book with an empty author", async () => {
    const response = await request(app).post("/api/books").send({
      title: "The Hobbit",
      author: "   ",
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Invalid book data");

    const result = await pool.query("SELECT COUNT(*) FROM books");

    expect(Number(result.rows[0].count)).toBe(0);
  });
});

describe("PATCH /api/books", () => {
  it("updates a book's reading status", async () => {
    const createResponse = await request(app).post("/api/books").send({
      title: "The Hobbit",
      author: "J. R. R. Tolkien",
    });

    const bookId = createResponse.body.id;

    const updateResponse = await request(app)
      .patch(`/api/books/${bookId}`)
      .send({
        status: "currently-reading",
      });

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body).toMatchObject({
      id: bookId,
      title: "The Hobbit",
      author: "J. R. R. Tolkien",
      status: "currently-reading",
    });

    const result = await pool.query("SELECT status FROM books WHERE id = $1", [
      bookId,
    ]);

    expect(result.rows[0].status).toBe("currently-reading");
  });

  it("rejects an unsupported reading status", async () => {
    const createResponse = await request(app).post("/api/books").send({
      title: "The Hobbit",
      author: "J. R. R. Tolkien",
    });

    const bookId = createResponse.body.id;

    const response = await request(app).patch(`/api/books/${bookId}`).send({
      status: "finished",
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Invalid book status");

    const result = await pool.query("SELECT status FROM books WHERE id = $1", [
      bookId,
    ]);

    expect(result.rows[0].status).toBe("want-to-read");
  });

  it("returns 404 when the book does not exist", async () => {
    const response = await request(app).patch("/api/books/999").send({
      status: "read",
    });

    expect(response.status).toBe(404);
    expect(response.body.error).toBe("Book not found");
  });
});

describe("DELETE /api/books/:id", () => {
  it("deletes a book from the database", async () => {
    const createResponse = await request(app).post("/api/books").send({
      title: "The Hobbit",
      author: "J. R. R. Tolkien",
    });

    const bookId = createResponse.body.id;

    const deleteResponse = await request(app).delete(`/api/books/${bookId}`);

    expect(deleteResponse.status).toBe(204);
    expect(deleteResponse.body).toEqual({});

    const result = await pool.query("SELECT id FROM books WHERE id = $1", [
      bookId,
    ]);

    expect(result.rows).toHaveLength(0);
  });

  it("returns 404 when the book does not exist", async () => {
    const response = await request(app).delete("/api/books/999");

    expect(response.status).toBe(404);
    expect(response.body.error).toBe("Book not found");
  });

  it("rejects an invalid book ID", async () => {
    const response = await request(app).delete("/api/books/abc");

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Invalid book ID");
  });
});

import { describe, expect, it } from "vitest";
import { createBookSchema, updateBookStatusSchema } from "./bookSchema.js";

describe("createBookSchema", () => {
  it("accepts a valid book", () => {
    const result = createBookSchema.safeParse({
      title: "The Hobbit",
      author: "J. R. R. Tolkien",
    });

    expect(result.success).toBe(true);
  });

  it("rejects an empty title", () => {
    const result = createBookSchema.safeParse({
      title: "   ",
      author: "J. R. R. Tolkien",
    });

    expect(result.success).toBe(false);
  });

  it("rejects an empty author", () => {
    const result = createBookSchema.safeParse({
      title: "The Hobbit",
      author: "   ",
    });

    expect(result.success).toBe(false);
  });
});

describe("updateBookStatusSchema", () => {
  it("rejects an unsupported reading status", () => {
    const result = updateBookStatusSchema.safeParse({
      status: "finished",
    });

    expect(result.success).toBe(false);
  });
});

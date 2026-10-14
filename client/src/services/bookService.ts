import type { Book, BookStatus } from "../types/book";
import type { BookFormData } from "../schemas/bookSchema";

const API_URL = import.meta.env.VITE_API_URL;

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export function getBooks(): Promise<Book[]> {
  return request<Book[]>("/books");
}

export function createBook(data: BookFormData): Promise<Book> {
  return request<Book>("/books", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateBookStatus(
  id: number,
  status: BookStatus,
): Promise<Book> {
  return request<Book>(`/books/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}

export function deleteBook(id: number): Promise<void> {
  return request<void>(`/books/${id}`, {
    method: "DELETE",
  });
}

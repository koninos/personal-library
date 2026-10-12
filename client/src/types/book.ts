export type BookStatus = "want-to-read" | "currently-reading" | "read";

export interface Book {
  id: number;
  title: string;
  author: string;
  status: BookStatus;
  isbn?: string;
}

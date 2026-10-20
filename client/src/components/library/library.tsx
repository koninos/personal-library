import { useEffect, useState } from "react";
import BookFilters from "./bookFilters/bookFilters";

import type { Book, BookStatus } from "../../types/book";
import type { BookFormData } from "../../schemas/bookSchema";
import {
  createBook,
  getBooks,
  deleteBook,
  updateBookStatus,
} from "../../services/bookService";
import { BookListSkeleton } from "./bookListSkeleton/bookListSkeleton";
import "./library.scss";
import LibraryHeader from "./libraryHeader/libraryHeader";
import LibraryToolbar from "./libraryToolbar/libraryToolbar";
import BookForm from "./bookForm/bookForm";
import BookList from "./bookList/bookList";

export type BookFilter = "all" | BookStatus;

function Library() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [updatingBookIds, setUpdatingBookIds] = useState<number[]>([]);
  const [deletingBookIds, setDeletingBookIds] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [activeFilter, setActiveFilter] = useState<BookFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function loadBooks() {
      try {
        const data = await getBooks();
        setBooks(data);
      } catch (error) {
        console.error("Failed to load books:", error);
        setError("Could not load your books. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }

    loadBooks();
  }, []);

  const filteredBooks = books.filter((book) => {
    const matchesStatus =
      activeFilter === "all" || book.status === activeFilter;

    const query = searchQuery.trim().toLowerCase();

    const matchesSearch =
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query);

    return matchesStatus && matchesSearch;
  });

  async function handleAddBook(newBook: BookFormData) {
    setIsAdding(true);

    try {
      setError(null);

      const createdBook = await createBook(newBook);

      setBooks((currentBooks) => [createdBook, ...currentBooks]);
    } catch (error) {
      console.error("Failed to add book:", error);
      setError("Could not add the book. Please try again.");
      throw error;
    } finally {
      setIsAdding(false);
    }
  }

  async function handleStatusChange(bookId: Book["id"], status: BookStatus) {
    setUpdatingBookIds((ids) => [...ids, bookId]);
    try {
      setError(null);

      const updatedBook = await updateBookStatus(bookId, status);

      setBooks((currentBooks) =>
        currentBooks.map((book) => (book.id === bookId ? updatedBook : book)),
      );
    } catch (err) {
      console.error("Failed to update book status:", err);
      setError("Could not update the book status. Please try again.");
    } finally {
      setUpdatingBookIds((ids) => ids.filter((id) => id !== bookId));
    }
  }

  async function handleDeleteBook(bookId: Book["id"]) {
    setDeletingBookIds((ids) => [...ids, bookId]);

    try {
      setError(null);
      await deleteBook(bookId);

      setBooks((currentBooks) =>
        currentBooks.filter((book) => book.id !== bookId),
      );
    } catch (err) {
      console.error("Failed to delete book:", err);
      setError("Could not delete the book. Please try again.");
    } finally {
      setDeletingBookIds((ids) => ids.filter((id) => id !== bookId));
    }
  }

  return (
    <main className="library">
      <LibraryHeader bookCount={books.length} />

      <BookForm onAddBook={handleAddBook} isSubmitting={isAdding} />

      {isLoading ? (
        <BookListSkeleton />
      ) : error ? (
        <p role="alert">{error}</p>
      ) : (
        <section className="library__content">
          <LibraryToolbar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          <BookFilters
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />

          <BookList
            books={filteredBooks}
            searchQuery={searchQuery}
            activeFilter={activeFilter}
            updatingBookIds={updatingBookIds}
            deletingBookIds={deletingBookIds}
            onStatusChange={handleStatusChange}
            onDeleteBook={handleDeleteBook}
          />
        </section>
      )}
    </main>
  );
}

export default Library;

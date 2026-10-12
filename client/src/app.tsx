import { useState } from "react";
import BookFilters from "./components/bookFilters/bookFilters";
import BookForm from "./components/bookForm/bookForm";
import BookList from "./components/bookList/bookList";
import type { Book, BookStatus } from "./types/book";
import type { BookFormData } from "./schemas/bookSchema";

export type BookFilter = "all" | BookStatus;

function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [activeFilter, setActiveFilter] = useState<BookFilter>("all");

  const filteredBooks =
    activeFilter === "all"
      ? books
      : books.filter((book) => book.status === activeFilter);

  function handleAddBook(newBook: BookFormData) {
    const book: Book = {
      ...newBook,
      id: Date.now(),
      status: "want-to-read",
    };

    setBooks((currentBooks) => [...currentBooks, book]);
  }

  return (
    <main className="library">
      <header className="library__header">
        <div>
          <h1>My Personal Library</h1>
          <p>Keep track of the books you want to read and have read.</p>
        </div>

        <span className="library__count">
          {books.length} {books.length === 1 ? "book" : "books"}
        </span>
      </header>

      <BookForm onAddBook={handleAddBook} />

      <section className="library__content">
        <div className="library__toolbar">
          <h2>Your books</h2>

          {/* Search will go here. */}
        </div>

        <BookFilters
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        <BookList books={filteredBooks} />
      </section>
    </main>
  );
}

export default App;

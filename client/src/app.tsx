import { useState } from "react";
import BookFilters from "./components/bookFilters/bookFilters";
import BookForm from "./components/bookForm/bookForm";
import BookList from "./components/bookList/bookList";
import type { Book } from "./types/book";
import type { BookFormData } from "./schemas/bookSchema";

function App() {
  const [books, setBooks] = useState<Book[]>([]);

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

        <BookFilters />

        <BookList books={books} />
      </section>
    </main>
  );
}

export default App;

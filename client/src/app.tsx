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
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBooks = books.filter((book) => {
    const matchesStatus =
      activeFilter === "all" || book.status === activeFilter;

    const query = searchQuery.trim().toLowerCase();

    const matchesSearch =
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query);

    return matchesStatus && matchesSearch;
  });

  function handleAddBook(newBook: BookFormData) {
    const book: Book = {
      ...newBook,
      id: Date.now(),
      status: "want-to-read",
    };

    setBooks((currentBooks) => [...currentBooks, book]);
  }

  function handleStatusChange(bookId: Book["id"], status: BookStatus) {
    setBooks((currentBooks) =>
      currentBooks.map((book) =>
        book.id === bookId ? { ...book, status } : book,
      ),
    );
  }

  function handleDeleteBook(bookId: Book["id"]) {
    setBooks((currentBooks) =>
      currentBooks.filter((book) => book.id !== bookId),
    );
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

          <label className="library__search">
            <span className="library__search-label">Search books</span>
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search by title or author..."
            />
          </label>
        </div>

        <BookFilters
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        <BookList
          books={filteredBooks}
          searchQuery={searchQuery}
          onStatusChange={handleStatusChange}
          onDeleteBook={handleDeleteBook}
        />
      </section>
    </main>
  );
}

export default App;

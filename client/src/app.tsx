import { useEffect, useState } from "react";
import BookFilters from "./components/bookFilters/bookFilters";
import BookForm from "./components/bookForm/bookForm";
import BookList from "./components/bookList/bookList";
import type { Book, BookStatus } from "./types/book";
import type { BookFormData } from "./schemas/bookSchema";
import { createBook, getBooks } from "./services/bookService";

export type BookFilter = "all" | BookStatus;

function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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
    try {
      setIsLoading(true);
      setError(null);

      const createdBook = await createBook(newBook);

      setBooks((currentBooks) => [createdBook, ...currentBooks]);
    } catch (error) {
      console.error("Failed to add book:", error);
      setError("Could not add the book. Please try again.");
      throw error;
    } finally {
      setIsLoading(false);
    }
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

      {isLoading ? (
        <p role="status">Loading books...</p>
      ) : error ? (
        <p role="alert">{error}</p>
      ) : (
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
      )}
    </main>
  );
}

export default App;

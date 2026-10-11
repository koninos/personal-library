import BookForm from "./components/bookForm/bookForm";

function App() {
  return (
    <main className="library">
      <header className="library__header">
        <div>
          <h1>My Personal Library</h1>
          <p>Keep track of the books you want to read and have read.</p>
        </div>

        <span className="library__count">0 books</span>
      </header>

      <BookForm />

      <section className="library__content">
        <div className="library__toolbar">
          <h2>Your books</h2>

          {/* Search will go here. */}
        </div>

        <nav
          className="library__filters"
          aria-label="Filter books by reading status"
        >
          <button
            type="button"
            className="library__filter library__filter--active"
          >
            All books
          </button>
          <button type="button" className="library__filter">
            Want to read
          </button>
          <button type="button" className="library__filter">
            Currently reading
          </button>
          <button type="button" className="library__filter">
            Read
          </button>
        </nav>

        <div className="library__grid">
          <p className="library__empty">
            Your library is empty. Add your first book to get started.
          </p>
        </div>
      </section>
    </main>
  );
}

export default App;

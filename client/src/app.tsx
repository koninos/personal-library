import BookFilters from "./components/bookFilters/bookFilters";
import BookForm from "./components/bookForm/bookForm";
import BookList from "./components/bookList/bookList";

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

        <BookFilters />

        <BookList />
      </section>
    </main>
  );
}

export default App;

import "./bookFilters.scss";

function BookFilters() {
  return (
    <nav
      className="library__filters"
      aria-label="Filter books by reading status"
    >
      <button type="button" className="library__filter library__filter--active">
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
  );
}

export default BookFilters;

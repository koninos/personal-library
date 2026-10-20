import "./libraryToolbar.scss";

type LibraryToolbarProps = {
  searchQuery: string;
  onSearchChange: (query: string) => void;
};

function LibraryToolbar({ searchQuery, onSearchChange }: LibraryToolbarProps) {
  return (
    <div className="library__toolbar">
      <h2>Your books</h2>

      <label className="library__search">
        <span className="library__search-label">Search books</span>
        <input
          type="search"
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search by title or author..."
        />
      </label>
    </div>
  );
}

export default LibraryToolbar;

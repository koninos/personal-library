import "./libraryHeader.scss";

type LibraryHeaderProps = {
  bookCount: number;
};

function LibraryHeader({ bookCount }: LibraryHeaderProps) {
  return (
    <header className="library__header">
      <div>
        <h1>My Personal Library</h1>
        <p>Keep track of the books you want to read and have read.</p>
      </div>

      <span className="library__count">
        {bookCount} {bookCount === 1 ? "book" : "books"}
      </span>
    </header>
  );
}

export default LibraryHeader;

import type { Book, BookStatus } from "../../types/book";
import "./bookList.scss";

interface BookListProps {
  books: Book[];
  onStatusChange: (bookId: Book["id"], status: BookStatus) => void;
  onDeleteBook: (bookId: Book["id"]) => void;
}

function BookList({ books, onStatusChange, onDeleteBook }: BookListProps) {
  if (books.length === 0) {
    return (
      <div className="library__grid">
        <p className="library__empty">
          Your library is empty. Add your first book to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="library__grid">
      {books.map((book) => (
        <article className="book-card" key={book.id}>
          <h3 className="book-card__title">{book.title}</h3>
          <p className="book-card__author">{book.author}</p>
          <label className="book-card__status-field">
            <span>Reading status</span>
            <select
              value={book.status}
              onChange={(event) =>
                onStatusChange(book.id, event.target.value as BookStatus)
              }
              aria-label={`Reading status for ${book.title}`}
            >
              <option value="want-to-read">Want to read</option>
              <option value="currently-reading">Currently reading</option>
              <option value="read">Read</option>
            </select>
          </label>
          <button
            className="book-card__delete"
            type="button"
            onClick={() => onDeleteBook(book.id)}
          >
            Delete
          </button>
        </article>
      ))}
    </div>
  );
}

export default BookList;

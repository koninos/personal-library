import type { Book, BookStatus } from "../../../types/book";
import "./bookCard.scss";

interface BookCardProps {
  book: Book;
  isUpdating: boolean;
  isDeleting: boolean;
  onStatusChange: (bookId: Book["id"], status: BookStatus) => void;
  onDeleteBook: (bookId: Book["id"]) => void;
}

function BookCard({
  book,
  isDeleting,
  isUpdating,
  onDeleteBook,
  onStatusChange,
}: BookCardProps) {
  const { id, title, author, status } = book;

  return (
    <article className="book-card">
      <h3 className="book-card__title">{title}</h3>
      <p className="book-card__author">{author}</p>
      <label className="book-card__status-field">
        <span>Reading status</span>
        <select
          value={status}
          disabled={isUpdating}
          onChange={(event) =>
            onStatusChange(id, event.target.value as BookStatus)
          }
          aria-label={`Reading status for ${title}`}
        >
          <option value="want-to-read">Want to read</option>
          <option value="currently-reading">Currently reading</option>
          <option value="read">Read</option>
        </select>
      </label>
      <button
        className="book-card__delete"
        type="button"
        disabled={isDeleting}
        onClick={() => onDeleteBook(id)}
      >
        {isDeleting ? "Deleting" : "Delete"}
      </button>
    </article>
  );
}

export default BookCard;

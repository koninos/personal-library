import type { Book, BookStatus } from "../../types/book";
import "./bookList.scss";

interface BookListProps {
  books: Book[];
  searchQuery: string;
  activeFilter: "all" | BookStatus;
  updatingBookIds: number[];
  deletingBookIds: number[];
  onStatusChange: (bookId: Book["id"], status: BookStatus) => void;
  onDeleteBook: (bookId: Book["id"]) => void;
}

function BookList({
  books,
  searchQuery,
  activeFilter,
  updatingBookIds,
  deletingBookIds,
  onStatusChange,
  onDeleteBook,
}: BookListProps) {
  if (books.length === 0) {
    const hasSearchQuery = searchQuery.trim().length > 0;
    const hasActiveFilter = activeFilter !== "all";

    const emptyMessage =
      hasSearchQuery || hasActiveFilter
        ? "No books match your filters."
        : "Your library is empty. Add your first book to get started.";

    return (
      <div className="library__grid">
        <p className="library__empty">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="library__grid">
      {books.map(({ id, title, author, status }) => {
        const isUpdating = updatingBookIds.includes(id);
        const isDeleting = deletingBookIds.includes(id);

        return (
          <article className="book-card" key={id}>
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
      })}
    </div>
  );
}

export default BookList;

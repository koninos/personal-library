import type { Book, BookStatus } from "../../../types/book";
import BookCard from "../bookCard/bookCard";
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
      {books.map((book) => {
        const isUpdating = updatingBookIds.includes(book.id);
        const isDeleting = deletingBookIds.includes(book.id);

        return (
          <BookCard
            key={book.id}
            book={book}
            isDeleting={isDeleting}
            isUpdating={isUpdating}
            onDeleteBook={onDeleteBook}
            onStatusChange={onStatusChange}
          />
        );
      })}
    </div>
  );
}

export default BookList;

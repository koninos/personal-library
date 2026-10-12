import type { Book } from "../../types/book";
import "./bookList.scss";

interface BookListProps {
  books: Book[];
}

function BookList({ books }: BookListProps) {
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
          <span className="book-card__status">{book.status}</span>
        </article>
      ))}
    </div>
  );
}

export default BookList;

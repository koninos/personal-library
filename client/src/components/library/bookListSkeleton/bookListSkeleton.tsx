import "./bookListSkeleton.scss";

export function BookListSkeleton() {
  return (
    <div className="skeleton__grid" aria-busy="true">
      {Array.from({ length: 6 }, (_, index) => (
        <article className="book-card book-card--skeleton" key={index}>
          <div className="book-card__title skeleton__title" />

          <div className="book-card__author skeleton__author" />

          <div className="book-card__status-field">
            <div className="skeleton__status" />
          </div>

          <div className="skeleton__delete" />
        </article>
      ))}

      <span className="visually-hidden" role="status">
        Loading books...
      </span>
    </div>
  );
}

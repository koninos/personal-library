import "./bookList.scss";

function BookList() {
  return (
    <div className="library__grid">
      <p className="library__empty">
        Your library is empty. Add your first book to get started.
      </p>
    </div>
  );
}

export default BookList;

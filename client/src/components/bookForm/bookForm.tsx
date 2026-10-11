import "./bookForm.scss";

function BookForm() {
  return (
    <section className="library__add-book">
      <h2>Add a book</h2>

      <form className="book-form">
        <div className="book-form__field">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="e.g. Clean Code"
            required
          />
        </div>

        <div className="book-form__field">
          <label htmlFor="author">Author</label>
          <input
            id="author"
            name="author"
            type="text"
            placeholder="e.g. Robert C. Martin"
            required
          />
        </div>

        <button className="book-form__submit" type="submit">
          Add book
        </button>
      </form>
    </section>
  );
}

export default BookForm;

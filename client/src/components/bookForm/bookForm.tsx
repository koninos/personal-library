import { useState, type FormEvent } from "react";
import { bookSchema, type BookFormData } from "../../schemas/bookSchema";
import "./bookForm.scss";

interface BookFormProps {
  isSubmitting: boolean;
  onAddBook: (book: BookFormData) => Promise<void>;
}

function BookForm({ onAddBook, isSubmitting }: BookFormProps) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [errors, setErrors] = useState<
    Partial<Record<keyof BookFormData, string>>
  >({});

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = bookSchema.safeParse({ title, author });

    if (!result.success) {
      const nextErrors: Partial<Record<keyof BookFormData, string>> = {};

      for (const issue of result.error.issues) {
        const field = issue.path[0];

        if (field === "title" || field === "author") {
          nextErrors[field] = issue.message;
        }
      }

      setErrors(nextErrors);
      return;
    }

    try {
      await onAddBook(result.data);

      setTitle("");
      setAuthor("");
      setErrors({});
    } catch {
      // app.tsx already records and displays the API error.
      // Preserve the form values so the user can retry.
    }
  };

  return (
    <section className="library__add-book">
      <h2>Add a book</h2>

      <form className="book-form" onSubmit={handleSubmit} noValidate>
        <div className="book-form__field">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="e.g. Clean Code"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
              setErrors((current) => ({ ...current, title: undefined }));
            }}
            aria-invalid={Boolean(errors.title)}
            aria-describedby={errors.title ? "title-error" : undefined}
          />
          {errors.title && (
            <p id="title-error" className="book-form__error">
              {errors.title}
            </p>
          )}
        </div>

        <div className="book-form__field">
          <label htmlFor="author">Author</label>
          <input
            id="author"
            name="author"
            type="text"
            placeholder="e.g. Robert C. Martin"
            value={author}
            onChange={(event) => {
              setAuthor(event.target.value);
              setErrors((current) => ({ ...current, author: undefined }));
            }}
            aria-invalid={Boolean(errors.author)}
            aria-describedby={errors.author ? "author-error" : undefined}
          />
          {errors.author && (
            <p id="author-error" className="book-form__error">
              {errors.author}
            </p>
          )}
        </div>

        <button
          className="book-form__submit"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Adding..." : "Add Book"}
        </button>
      </form>
    </section>
  );
}

export default BookForm;

CREATE TABLE IF NOT EXISTS books (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  isbn VARCHAR(20),
  status VARCHAR(30) NOT NULL DEFAULT 'want-to-read',
  CONSTRAINT books_status_check
    CHECK (status IN ('want-to-read', 'currently-reading', 'read'))
);
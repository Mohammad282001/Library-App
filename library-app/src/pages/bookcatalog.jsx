import React, { useEffect, useState } from "react";
import axios from "axios";
import "./signup.css";

const firebaseUrl = "https://booking-259c4-default-rtdb.firebaseio.com/";

const BookCatalog = () => {
  const [booksList, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatedTitles, setUpdatedTitles] = useState({});
  const [newBookTitle, setNewBookTitle] = useState("");
  const [newBookAuthor, setNewBookAuthor] = useState("");
  const [newBookDescription, setNewBookDescription] = useState("");
  const [newBookUrl, setNewBookUrl] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${firebaseUrl}/books.json`);
        if (response.data) {
          const booksData = Object.entries(response.data).map(([id, book]) => ({
            id,
            ...book,
          }));
          setBooks(booksData);
        } else {
          console.log("No books found.");
        }
      } catch (error) {
        console.error("Error fetching books: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const updateBookTitle = async (bookId) => {
    try {
      await axios.patch(`${firebaseUrl}/books/${bookId}.json`, {
        title: updatedTitles[bookId],
      });
      const updatedList = booksList.map((book) =>
        book.id === bookId ? { ...book, title: updatedTitles[bookId] } : book
      );
      setBooks(updatedList);
      setUpdatedTitles((prevTitles) => ({ ...prevTitles, [bookId]: "" }));
    } catch (error) {
      console.error("Error updating book title: ", error);
    }
  };

  const softDeleteBook = async (bookId) => {
    try {
      await axios.patch(`${firebaseUrl}/books/${bookId}.json`, {
        softDeleted: true,
      });
      const updatedList = booksList.map((book) =>
        book.id === bookId ? { ...book, softDeleted: true } : book
      );
      setBooks(updatedList);
    } catch (error) {
      console.error("Error soft deleting book: ", error);
    }
  };

  const handleTitleChange = (bookId, newTitle) => {
    setUpdatedTitles((prevTitles) => ({ ...prevTitles, [bookId]: newTitle }));
  };

  const handleAddBook = async (event) => {
    event.preventDefault();

    const newBook = {
      title: newBookTitle,
      author: newBookAuthor,
      description: newBookDescription,
      coverImage: newBookUrl,
      softDeleted: false,
    };

    try {
      const response = await axios.post(`${firebaseUrl}/books.json`, newBook);
      const newBookId = response.data.name;
      setBooks((prevBooks) => [...prevBooks, { ...newBook, id: newBookId }]);
    } catch (error) {
      console.error("Error adding new book: ", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <div className="book-catalog-cards">
        {booksList.map((book) => {
          if (!book.softDeleted) {
            return (
              <div key={book.id} className="book-card">
                <img src={book.coverImage} alt={book.title} />
                <h3>{book.title}</h3>
                <p>{book.author}</p>
                <p>{book.description}</p>
                <input
                  type="text"
                  placeholder="New Title"
                  value={updatedTitles[book.id] || ""}
                  onChange={(e) => handleTitleChange(book.id, e.target.value)}
                />
                <button onClick={() => updateBookTitle(book.id)}>Update Title</button>
                <button onClick={() => softDeleteBook(book.id)}>Delete Book</button>
              </div>
            );
          }
          return null;
        })}
      </div>
      <section className="add-book">
        <h3>Looking To Add Other Books?</h3>
        <form onSubmit={handleAddBook}>
          <label htmlFor="book-title">Book Title</label>
          <input
            onChange={(e) => setNewBookTitle(e.target.value)}
            type="text"
            name="book-title"
            id="book-title"
            placeholder="Spiderman"
          />

          <label htmlFor="book-Author">Book Author</label>
          <input
            onChange={(e) => setNewBookAuthor(e.target.value)}
            type="text"
            name="book-Author"
            id="book-Author"
            placeholder="Peter Parker"
          />

          <label htmlFor="book-Description">Book Description</label>
          <input
            onChange={(e) => setNewBookDescription(e.target.value)}
            type="text"
            name="book-Description"
            id="book-Description"
            placeholder="Description"
          />

          <label htmlFor="book-URL">Image URL</label>
          <input
            onChange={(e) => setNewBookUrl(e.target.value)}
            type="text"
            name="book-URL"
            id="book-URL"
            placeholder="www.spider.com/img.png"
          />

          <button>Add Book</button>
        </form>
      </section>
    </main>
  );
};

export default BookCatalog;

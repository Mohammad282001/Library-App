// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const BookCatalog = () => {
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         const response = await axios.get(
//           `https://firestore.googleapis.com/v1/projects/book-library-20eb4/databases/(default)/documents/books/`,
//         );
//         const booksData = response.data.documents.map((doc) => {
//           const fields = doc.fields;
//           return {
//             id: doc.name.split("/").pop(),
//             title: fields.title.stringValue,
//             author: fields.author.stringValue,
//             description: fields.description.stringValue,
//             coverImage: fields.coverImage.stringValue,
//             softDeleted: fields.softDeleted.booleanValue,
//           };
//         });
//         setBooks(booksData);
//       } catch (error) {
//         console.error("Error fetching books: ", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBooks();
//   }, []);

//   const updateBookTitle = async (bookId, newTitle) => {
//     const bookToUpdate = books.find(book => book.id == bookId);

//     if (!bookToUpdate) {
//       console.error("Book not found");
//       return;
//     }
//     else { console.log("book Found") }

//     const updatedBook = {
//       ...bookToUpdate,
//       title: newTitle,
//     };

//     try {
//       const updateBookTitle = async (bookId, updatedTitle) => {
//         try {
//           const response = await axios.put(
//             `https://firestore.googleapis.com/v1/projects/book-library-20eb4/databases/(default)/documents/books/${bookId}`,
//             {
//               fields: {
//                 title: { stringValue: updatedTitle },
//               },
//             },
//             { withCredentials: true }
//           );
//           console.log('Book updated successfully:', response.data);
//           // Update your local state or trigger a re-render if necessary
//         } catch (error) {
//           console.error('Error updating book:', error);
//           // Handle error gracefully, show user feedback or retry logic
//         }
//       };
//       // Optionally, refresh the book list after updating
//       const updatedBooks = books.map(book =>
//         book.id == bookId ? updatedBook : book
//       );
//       setBooks(updatedBooks);
//     } catch (error) {
//       console.error("Error updating book title: ", error);
//     }
//   };

//   const handleUpdate = (bookId) => {
//     updateBookTitle(bookId, "mohammad");
//   };


//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="book-catalog">
//       {books.map((book) => (
//         <div key={book.id} className="book-card">
//           <img src={book.coverImage} alt={book.title} />
//           <h3>{book.title}</h3>
//           <p>{book.author}</p>
//           <p>{book.description}</p>
//           <button onClick={() => handleUpdate(book.id)}>Update Title</button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default BookCatalog;



import React, { useEffect, useState } from "react";
import axios from "axios";
import { db, updateDoc, doc } from "../firebase";

const BookCatalog = () => {
  const [booksList, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatedTitle, setUpdatedTitle] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          `https://firestore.googleapis.com/v1/projects/book-library-20eb4/databases/(default)/documents/books/`,
        );
        const booksData = response.data.documents.map((doc) => {
          const fields = doc.fields;
          return {
            id: doc.name.split("/").pop(),
            title: fields.title.stringValue,
            author: fields.author.stringValue,
            description: fields.description.stringValue,
            coverImage: fields.coverImage.stringValue,
            softDeleted: fields.softDeleted.booleanValue,
          };
        });
        setBooks(booksData);
      } catch (error) {
        console.error("Error fetching books: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }

  const updateBookTitle = async (bookId) => {
    const bookDoc = doc(db, "books", bookId)
    await updateDoc(bookDoc, { title: "Book new title" })

    // const updatedList = booksList.map((book) =>
    //   book.bookId === bookId ? { ...book, title: updatedTitle } : book
    // );

    const updatedList = booksList.map((book) =>
      book.bookId === bookId ? { ...book, title: updatedTitle } : book
    );


    // setBooks(updateList);

  }
  const deleteBook = async (bookId) => {
    const bookDoc = doc(db, "books", bookId)
    await updateDoc(bookDoc, { softDeleted: "true" })






  }
  let count = 0;



  return (
    <div className="book-catalog">
      {booksList.map((book) => {
        if (book.softDeleted == false) {
          return (
            <div key={book.id} className="book-card">
              <img src={book.coverImage} alt={book.title} />
              <h3>{book.title}</h3>
              <p>{book.author}</p>
              <p>{book.description}</p>
              <input type="text" id="titleInput" placeholder="New Title "
              // onChange={(e) => setUpdateTitle(e.target.value)}

              />
              <button onClick={() => updateBookTitle(book.id)}> Update Title</button>
              <button onClick={() => deleteBook(book.id)}> Delete Book</button>
            </div>
          );
        }

      })}
    </div>
  );
};

export default BookCatalog;

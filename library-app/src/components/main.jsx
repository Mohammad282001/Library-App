import React from "react";
import CardsComp from "./initState";

function Main(props) {
    return (
        <main>
            <section className="book-list">
                {CardsComp.books.map((book) => (
                    <div className="book-card" key={book.id}>
                        <h3 className="book-title">{book.Title}</h3>
                        <p className="book-author"><strong>Author:</strong> {book.author}</p>
                        <p className="book-isbn"><strong>ISBN:</strong> {book.isbn}</p>
                    </div>
                ))}
            </section>
        </main>
    );
}

export default Main;

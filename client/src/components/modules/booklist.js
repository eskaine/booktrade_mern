import React from 'react';
import Book from '../modules/book';

const BookList = (props) => (
  <div id="book-list" className="container">
    {props.list.map((book) => {
      return(<Book key={book.id} path={props.path} book={book} callback={props.callback} />);
    })}
  </div>
);

export default BookList;

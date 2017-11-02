import React from 'react';
import Book from '../containers/book';

const BookList = (props) => (
  <div id={props.id}>
    {props.list.map((book) => {
      return(<Book key={book._id} path={props.path} book={book} callback={props.callback} />);
    })}
  </div>
);

export default BookList;

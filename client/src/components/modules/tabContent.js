import React from 'react';
import Book from '../containers/book';

const TabContent = (props) => (
  <div className="tab-pane fade" id={props.id} role="tabpanel" aria-labelledby={props.id}>
    <br />
    <h2>{props.title}</h2>
    <hr />
    {props.list.map((book) => {
      return(<Book key={book._id} path={props.path} book={book} callback={props.callback} />);
    })}
  </div>
);

export default TabContent;

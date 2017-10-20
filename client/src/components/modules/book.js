import React from 'react';

const Book = props => (
  <div className="img-container">
    <img src={props.book.imageUrl} />
    <div className="overlay">
      {() => {
        if(!props.book.isRequested)
          return (<button id={props.book.id} className="btn btn-danger overlay-btn" type="button">Remove</button>);
         if(!props.book.isOwner)
          return (<button id={props.book.id} className="btn btn-primary overlay-btn" type="button">Request</button>);
      }}
    </div>
  </div>
)

export default Book;

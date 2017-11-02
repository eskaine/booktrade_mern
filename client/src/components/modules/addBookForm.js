import React from 'react';

const AddBookForm = props => (
  
  <form>
    <div className="input-group">
      <input id="add" className="form-control" type="text" name="book" placeholder="Add Book" value={props.value} onChange={props.callback} />
      <span className="input-group-btn">
        <button id="add-btn" className="btn btn-primary" type="submit" onClick={props.addBook}>Add</button>
      </span>
    </div>
  </form>
   
)


export default AddBookForm;

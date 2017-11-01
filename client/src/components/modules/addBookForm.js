import React from 'react';

class AddBookForm extends React.Component {
//const AddBookForm = props => (
  render() {

    return(
      <form>
        <div className="input-group">
          <input id="add" className="form-control" type="text" name="book" placeholder="Add Book" value={this.props.value} onChange={this.props.callback} />
          <span className="input-group-btn">
            <button id="add-btn" className="btn btn-primary" type="submit" onClick={this.props.addBook}>Add</button>
          </span>
        </div>
      </form>
    );

  }


//)
}

export default AddBookForm;

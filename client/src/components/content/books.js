import React from 'react';
import {NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';
import Input from '../modules/input';
import Requests from '../../controllers/requests';

class Books extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      book: ""
    };
  }

  setData = (path) => {
    let store = this.context.store;
    let storeState = store.getState;

    store.subscribe({

    });


  }

  setTitle = () => {
    let title = "My Books";
    if(this.props.match.url === "/allbooks")
      title = "All Books";
    return title;
  }

  addBook = (e) => {
    e.preventDefault();
  }

  setInputBook = (e) => {
    this.setState({
      book: e.target.value
    });
  }

  generateForm = () => {

    if(this.props.match.url === "/mybooks") {
      return (
        <div className="row">
          <div className="col-md-4">
            <form>
              <div className="input-group">
                <input id="add" className="form-control" type="text" name="book" placeholder="Add Book" onChange={this.setInputBook} />
                <span className="input-group-btn">
                  <button id="add-btn" className="btn btn-primary" type="submit" onClick={this.addBook}>Add</button>
                </span>
              </div>
            </form>
          </div>
        </div>
      );
    }

  }

  render() {
    let title = this.setTitle();
    let form = this.generateForm();
    let requestCount,approvalCount, books;

    return (
      <div className="container">
        <br />
        <div className="container grid" >
          <button id="requestList" className="btn btn-primary" type="button">My Request Books {requestCount}</button>
          <button id="approvalList" className="btn btn-success" type="button">Pending My Approvals {approvalCount}</button>
        </div>
        <br />
        <div id="trade-list" className="container"></div>
        <br />

        <div className="container">
          <h2>{title}</h2>
          {form}
          <hr />
          {books}
        </div>


      </div>
    );
  }

}

Books.contextTypes = {
  store: PropTypes.object
}

export default Books;

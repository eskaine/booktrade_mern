import React from 'react';
import {NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';
import Input from '../modules/input';
import AddBookForm from '../modules/addBookForm';
import Book from '../modules/book';
import Requests from '../../controllers/requests';

class Books extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      book: "",
      list: []
    };
  }

  setTitle() {
    let title = "My Books";
    if(this.props.match.url === "/allbooks")
      title = "All Books";
    return title;
  }

  setCount() {
    let store = this.context.store.getState();
    let requestCount = "";
    let approvalCount = "";

    if(store.requestCounter > 0) {
      requestCount = "(" + store.requestCounter + ")";
    }

    if(store.approvalCounter > 0) {
      approvalCount = "(" + store.approvalCounter + ")";
    }

    console.log('store count');
    console.log(store);
    return {requestCount, approvalCount};

  }

  updateList = (book) => {
    let list = [].concat(this.state.list);
    list.push(book);
    list.sort(function(a, b) {
      let titleA = a.title.toUpperCase();
      let titleB = b.title.toUpperCase();
      return titleA.localeCompare(titleB);
    });
    this.setList(list);
  }

  addBook = (e) => {
    e.preventDefault();
    let resetBook = this.resetBook;
    let updateList = this.updateList;

    let params = {
      book: this.state.book
    };

    Requests.post('/addbook', params, function success(res) {
      resetBook();
      updateList(res);
    });
  }

  genBookList() {
    let url = this.props.match.url;
    let setList = this.setList;
    Requests.get(url, function success(res) {
      setList(res.data);
    });
  }

  setInputBook = (e) => {
    this.setState({
      book: e.target.value
    });
  }

  resetBook = () => {
    this.setState({
      book: ""
    });
  }

  setList = (list) => {
    this.setState({
      list: list
    });
  }

  generateForm = () => {
    if(this.props.match.url === "/mybooks") {
      return (
        <AddBookForm value={this.state.book} addBook={this.addBook} setInputBook={this.setInputBook} />
      );
    }
  }

  render() {
    this.genBookList();
    let title = this.setTitle();
    let {requestCount,approvalCount} = this.setCount();
    let books, list;

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
          <div className="row">
            <div className="col-md-4">
              <h2>{title}</h2>
              {this.generateForm()}
            </div>
          </div>
        </div>
        <hr />
        <div className="container">
          {this.state.list.map((book) => {
            return(<Book book={book} />);
          })}
        </div>
      </div>


    );
  }

}

Books.contextTypes = {
  store: PropTypes.object
}

export default Books;

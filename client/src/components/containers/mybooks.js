import React from 'react';
import PropTypes from 'prop-types';
import AddBookForm from '../modules/addBookForm';
import BookList from '../modules/booklist';
import Requests from '../../common/requests';
import DOM from '../../common/domFunctions';

class MyBooks extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      path: "/mybooks",
      addpath: "/addbook",
      requestpath: "/removebook",
      title: "My Books",
      book: "",
      list: []
    };
  }

  addBook = (e) => {
    e.preventDefault();
    let resetBook = this.resetBook;
    let updateList = this.updateList;
    let params = {
      book: this.state.book
    };

    Requests.post(this.state.addpath, params, function(res) {
      resetBook();
      updateList(res);
    });
  }

  removeBook = (e) => {
    let bookID = e.target.id;
    let params = {
        id: e.target.id
    };

    Requests.post(this.state.requestpath, params, function(res) {
      //update dom
      DOM.removeBook(bookID);
    });
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

  componentWillMount() {
    let setList = this.setList;
    Requests.get(this.state.path, function (res) {
      setList(res);
    });
  }

  render() {
    return (
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h2>{this.state.title}</h2>
              <AddBookForm value={this.state.book} addBook={this.addBook} setInputBook={this.setInputBook} />
            </div>
          </div>
          <hr />
          <BookList list={this.state.list} path={this.state.path} callback={this.removeBook} />
        </div>
    );
  }
}

MyBooks.contextTypes = {
  store: PropTypes.object
}

export default MyBooks;

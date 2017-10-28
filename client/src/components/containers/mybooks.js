import React from 'react';
import PropTypes from 'prop-types';
import Actions from '../../actions';
import Requests from '../../common/requests';
import {SortList, UpdateList} from '../../common/common';
import BookList from '../modules/booklist';
import AddBookForm from '../modules/addBookForm';

class MyBooks extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      queryBook: "",
      listID: "mybooks-list",
      list: []
    };
  }

  addBook = (e) => {
    e.preventDefault();
    let list = this.state.list;
    let store = this.context.store;
    let resetBook = this.resetBook;
    let params = {
      book: this.state.queryBook
    };

    Requests.post("/addbook", params, function(res) {
      resetBook();
      store.dispatch(Actions.lists.setMyBooks(SortList(res.book, list)));
    });
  }

  removeBook = (e) => {
    let list = this.state.list;
    let store = this.context.store;
    let bookID = e.target.id;
    let params = {
        id: bookID
    };

    Requests.post("/removebook", params, function(res) {
      UpdateList(bookID, list)
      .then(function(result) {
        store.dispatch(Actions.lists.setMyBooks(result.newList));
      });
    });
  }

  setInputBook = (e) => {
    this.setState({
      queryBook: e.target.value
    });
  }

  resetBook = () => {
    this.setState({
      queryBook: ""
    });
  }

  setList = (list) => {
      this.setState({
        list: list
      });
  }

  componentWillMount() {
    let store = this.context.store
    store.subscribe(() => {
      let state = store.getState();
      this.setList(state.myBooksList);
    });
  }

  componentDidMount() {
    let store = this.context.store;
    Requests.get("/mybooks", function (res) {
      if(res.approvalsCount > 0)
        store.dispatch(Actions.counters.setApprovals(res.approvalsCount));
      if(res.list.length > 0)
        store.dispatch(Actions.lists.setMyBooks(res.list));
    });
  }

  render() {
    return (
        <div>
          <div className="row">
            <div className="col-md-4">
              <h2>My Books</h2>
              <AddBookForm value={this.state.queryBook} addBook={this.addBook} setInputBook={this.setInputBook} />
            </div>
          </div>
          <hr />
          <BookList id={this.state.listID} list={this.state.list} path="/mybooks" callback={this.removeBook} />
        </div>
    );
  }
}

MyBooks.contextTypes = {
  store: PropTypes.object
}

export default MyBooks;

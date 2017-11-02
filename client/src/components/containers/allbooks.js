import React from 'react';
import PropTypes from 'prop-types';
import Actions from '../../actions';
import Requests from '../../common/requests';
import {UpdateList} from '../../common/common';
import BookList from '../modules/booklist';

class AllBooks extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      listID: "allbooks-list",
      list: []
    };
  }

  requestBook = (e) => {
    let list = this.state.list;
    let store = this.context.store;
    let bookID = e.target.id;
    let params = {
        id: bookID
    };

    Requests.post("/requestbook", params, function(res) {
      UpdateList(bookID, list)
      .then(function(result) {
        store.dispatch(Actions.lists.setAllBooks(result.newList));
        store.dispatch(Actions.counters.incRequests());
      });
    });
  }

  setList = (list) => {
    this.setState({
      list: list
    });
  }

  componentWillMount() {
    let store = this.context.store;
    store.subscribe(() => {
      if(this.props.history.location.pathname === "/allbooks") {
        let state = store.getState();
        this.setList(state.allBooksList);
      }
    });
  }

  componentDidMount() {
    let store = this.context.store;
    Requests.get("/allbooks", function (res) {
      if(res.list.length > 0) {
        store.dispatch(Actions.lists.setAllBooks(res.list));
      }
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(nextState.list.length !== this.state.list.length) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <h2>All Books</h2>
          </div>
        </div>
        <hr />
        <BookList id={this.state.listID} list={this.state.list} path="/allbooks" callback={this.requestBook}/>
      </div>
    );
  }
}

AllBooks.contextTypes = {
  store: PropTypes.object
}

export default AllBooks;

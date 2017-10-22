import React from 'react';
import PropTypes from 'prop-types';
import BookList from '../modules/booklist';
import Requests from '../../common/requests';
import Actions from '../../actions';
import DOM from '../../common/domFunctions';

class AllBooks extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      path: "/allbooks",
      requestpath: "/requestbook",
      title: "All Books",
      list: []
    };
  }

  requestBook = (e) => {
    let store = this.context.store;
    let bookID = e.target.id;
    //prepare params
    let params = {
        id: bookID
    };

    Requests.post(this.state.requestpath, params, function() {
      //update dom
      DOM.removeBook(bookID);
      //update state
      store.dispatch(Actions.incRequests());
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
          </div>
        </div>
        <hr />
        <BookList list={this.state.list} path={this.state.path} callback={this.requestBook}/>
      </div>
    );
  }
}

AllBooks.contextTypes = {
  store: PropTypes.object
}

export default AllBooks;

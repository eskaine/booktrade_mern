import React from 'react';
import {NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';

class Books extends React.Component {

  render() {

    let title, requestCount,approvalCount, form, books;

    return (
      <div className="container">
        <br />
        <div className="container grid" >
          <button id="requestList" className="btn btn-primary" type="button">My Request Books ({requestCount})</button>
          <button id="approvalList" className="btn btn-success" type="button">Pending My Approvals ({approvalCount})</button>
        </div>
        <br />

        <div id="trade-list" className="container"></div>

        <br />

        <div className="container">
          <h1>{title}</h1>
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

import React from 'react';
import PropTypes from 'prop-types';
import Actions from '../../actions';
import Requests from '../../common/requests';
import TabContent from '../modules/tabContent';
import {UpdateList, SetCountString} from '../../common/common';

class Trade extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      requestsCount: "",
      approvalsCount: "",
      requestsList: [],
      approvalsList: [],
      approvalCallbacks: {
        approve: this.approveRequest,
        reject: this.rejectRequest
      }
    };
  }

  getRequestsList = (e) => {
    let store = this.context.store;
    Requests.get("/requestsList", function(res) {
      store.dispatch(Actions.lists.setRequests(res.list));
      store.dispatch(Actions.counters.setRequests(res.requestsCount));
    });
  }

  getApprovalsList = (e) => {
    let store = this.context.store;
    Requests.get('/approvalsList', function(res) {
      store.dispatch(Actions.lists.setApprovals(res.list));
    });
  }

  deleteRequest = (e) => {
    let store = this.context.store;
    let list = this.state.requestsList;
    let bookID = e.target.id;
    let params = {
        id: bookID
    };

    Requests.post('/deleteRequest', params, function(res) {
      if(!res.result) {
        UpdateList(bookID, list)
        .then(function(result) {
          store.dispatch(Actions.lists.setRequests(result.newList));
          store.dispatch(Actions.counters.decRequests());
        });
      }
    });
  }

  approveRequest = (e) => {
    let store = this.context.store;
    let setBookApproved = this.setBookApproved;
    let bookID = e.target.id;
    let params = {
        id: bookID
    };

    Requests.post('/approveRequest', params, function() {
      store.dispatch(Actions.counters.decApprovals());
      setBookApproved(bookID);
    });
  }

  rejectRequest = (e) => {
    let store = this.context.store;
    let list = this.state.approvalsList;
    let bookID = e.target.id;
    let params = {
        id: bookID
    };

    Requests.post("/rejectRequest", params, function(res) {

      UpdateList(bookID, list)
      .then(function(result) {
        store.dispatch(Actions.lists.setApprovals(result.newList));
        store.dispatch(Actions.counters.decApprovals());
      });

    });
  }

  setBookApproved = (bookID) => {
    let list  = [].concat(this.state.approvalsList);
    for(let i in list) {
      if(list[i]._id === bookID) {
        let book = list[i];
        book.isApproved = true;
        list[i] = book;
        this.setApprovalsList(list);
        break;
      }
    }
  }

  setRequestsList = (list) => {
    this.setState({
      requestsList: list
    });
  }

  setApprovalsList = (list) => {
    this.setState({
      approvalsList: list
    });
  }

  setRequestsCount = (countString) => {
    this.setState({
      requestsCount: countString
    });
  }

  setApprovalsCount = (countString) => {
    this.setState({
      approvalsCount: countString
    });
  }

  componentWillMount() {
    let store = this.context.store;
    store.subscribe(() => {
      let state = store.getState();
      this.setRequestsList(state.requestsList);
      this.setApprovalsList(state.approvalsList);
      this.setRequestsCount(SetCountString(state.requestsCount));
      this.setApprovalsCount(SetCountString(state.approvalsCount));
    });
  }

  render() {
    let Lists= this.props.childComponent;

    return(
      <div className="container">
        <br />
        <ul className="nav nav-pills mb-3" id="trade-tab" role="tablist">
          <li className="nav-item">
            <a className="nav-link" id="requests-btn" data-toggle="pill" href="#requests-tab" onClick={this.getRequestsList} role="tab" aria-controls="requests-btn" aria-selected="true">My Requested Books{this.state.requestsCount}</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" id="approvals-btn" data-toggle="pill" href="#approvals-tab" onClick={this.getApprovalsList} role="tab" aria-controls="approvals-btn" aria-selected="false">Pending My Approvals{this.state.approvalsCount}</a>
          </li>
        </ul>
        <div className="tab-content" id="trade-tabContent">
          <TabContent id="requests-tab" title="My Requested Books" list={this.state.requestsList} path="/deleteRequest" callback={this.deleteRequest} />
          <TabContent id="approvals-tab" title="Pending My Approvals" list={this.state.approvalsList} path="/approveRequest" callback={this.state.approvalCallbacks} />
        </div>
        <br />
        <br />
        <Lists history={this.props.history} />
        <br />
      </div>
    );
  }
};

Trade.contextTypes = {
  store: PropTypes.object
}

export default Trade;

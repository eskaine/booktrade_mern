import React from 'react';
import PropTypes from 'prop-types';
class Trade extends React.Component {

  setCount() {
    let store = this.context.store.getState();
    let requestsCount, approvalsCount;

    if(store.requestsCount > 0)
      requestsCount = "(" + store.requestsCount + ")";

    if(store.approvalsCount > 0)
      approvalsCount = "(" + store.approvalsCount + ")";

    return {requestsCount, approvalsCount};
  }

  render() {
    let ChildComponent= this.props.childComponent;
    let {requestsCount, approvalsCount} = this.setCount();

    return(
      <div className="container">
        <br />
        <div className="container grid" >
          <button id="request-btn" className="btn btn-primary" type="button">My Request Books {requestsCount}</button>
          <button id="approval-btn" className="btn btn-success" type="button">Pending My Approvals {approvalsCount}</button>
        </div>
        <br />
        <div id="trade-list" className="container"></div>
        <br />
        <ChildComponent />
      </div>
    );
  }
};

Trade.contextTypes = {
  store: PropTypes.object
}

export default Trade;

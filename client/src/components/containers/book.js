import React from 'react';

class Button extends React.Component {
  buttonType() {
    if(!this.props.book.isRequested && this.props.path === "/mybooks")
      return (<button id={this.props.book._id} className="btn btn-danger overlay-btn" type="button" onClick={this.props.callback}>Remove</button>);
    if(!this.props.book.isOwner  && this.props.path === "/allbooks")
      return (<button id={this.props.book._id} className="btn btn-primary overlay-btn" type="button" onClick={this.props.callback}>Request</button>);
    if(!this.props.book.isApproved && this.props.path === "/deleteRequest")
      return (<button id={this.props.book._id} className="btn btn-danger overlay-btn" type="button" onClick={this.props.callback}>Delete</button>);
    if(!this.props.book.isApproved  && this.props.path === "/approveRequest")
      return (
        <div>
          <button id={this.props.book._id} className="btn btn-success approve-btn" type="button" onClick={this.props.callback.approve}>Approve</button>
          <button id={this.props.book._id} className="btn btn-danger reject-btn" type="button" onClick={this.props.callback.reject}>Reject</button>
        </div>
      );
  }

  render() {
    let button = this.buttonType();

    return (
      <div className="overlay">
        {button}
      </div>
    );
  }
}

class Book extends React.Component {

  setClass() {
    if(this.props.book.isApproved) {
      return "img-container grayout";
    }
    return "img-container";
  }

  render() {
    let className = this.setClass();

    return (
      <div id={"book-" + this.props.book._id} className={className}>
        <img src={this.props.book.imageUrl} alt={this.props.book.title} />
        <Button path={this.props.path} book={this.props.book} callback={this.props.callback} />
      </div>
    );
  }

}

export default Book;

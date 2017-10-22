import React from 'react';

class Button extends React.Component {
  buttonType() {
    if(!this.props.isRequested && this.props.path === "/mybooks")
      return (<button id={this.props.id} className="btn btn-danger overlay-btn" type="button" onClick={this.props.callback}>Remove</button>);
    if(!this.props.isOwner  && this.props.path === "/allbooks")
      return (<button id={this.props.id} className="btn btn-primary overlay-btn" type="button" onClick={this.props.callback}>Request</button>);
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

const Book = (props) => (
  <div id={"book-" + props.book.id} className="img-container">
    <img src={props.book.imageUrl} alt={props.book.title} />
    <Button id={props.book.id} path={props.path} isRequested={props.book.isRequested} isOwner={props.book.isOwner} callback={props.callback} />
  </div>
)

export default Book;

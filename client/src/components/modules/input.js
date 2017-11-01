import React from 'react';

class Input extends React.Component {

  render() {

    let name = this.props.fieldName.toLowerCase();

    return(
      <div className="form-group">
        <label htmlFor={name}>{this.props.fieldName}</label>
        <input className={this.props.className} id={name} type={this.props.type} placeholder={this.props.fieldName} value={this.props.value} onChange={this.props.callback} required />
        <div className="invalid-feedback">
          {this.props.error}
        </div>
      </div>
    );
  }

}

export default Input;

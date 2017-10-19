import React from 'react';

const Input = props => (
  <div className="form-group">
    <label htmlFor={props.params.id}>{props.params.labelName}</label>
    <input className="form-control" id={props.params.id} type={props.params.type} placeholder={props.params.placeholder} value={props.defaultValue} onChange={props.callback} required />
    <div className="invalid-feedback">
      {props.params.invalidMessage}
    </div>
  </div>
)

export default Input;

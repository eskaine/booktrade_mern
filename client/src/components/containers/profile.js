import React from 'react';
import PropTypes from 'prop-types';
import Actions from '../../actions';
import Input from '../modules/input';
import Requests from '../../common/requests';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      city: '',
      state: '',
      oldPass: '',
      newPass: '',
      oldPassClass: 'form-control',
      oldPassError: ''
    }
  }

  handleProfile = (e) => {
    e.preventDefault();
    let store = this.context.store;
    let state = this.state;
    let params = {
      name: this.state.name,
      city: this.state.city,
      state: this.state.state
    };

    Requests.post('/profile', params, function() {
      store.dispatch(Actions.setName(state.name));
      store.dispatch(Actions.setCity(state.city));
      store.dispatch(Actions.setState(state.state));
    });
  }

  handlePassword = (e) => {
    e.preventDefault();
    let reset = this.resetPassword;
    let This = this;
    let params = {
      oldPass: this.state.oldPass,
      newPass: this.state.newPass
    };

    Requests.post('/updatePassword', params, function success() {
      reset();
    }, function(res) {
      if(res.type === "invalidPassword") {
        This.setOldPasswordClass('form-control is-invalid');
        This.setOldPasswordError(res.message);
      }
    });
  }

  setInputName = (e) => {
    this.setState({
      name: e.target.value
    });
  }

  setInputCity = (e) => {
    this.setState({
      city: e.target.value
    });
  }

  setInputState = (e) => {
    this.setState({
      state: e.target.value
    });
  }

  setOldPass = (e) => {
    this.setState({
      oldPass: e.target.value
    });
  }

  setNewPass = (e) => {
    this.setState({
      newPass: e.target.value
    });
  }

  resetPassword = () => {
    this.setState({
      oldPass: '',
      newPass: ''
    });
  }

  setOldPasswordClass = (classes) => {
    this.setState({
      oldPassClass: classes
    });
  }

  setOldPasswordError = (errorMsg) => {
    this.setState({
      oldPassError: errorMsg
    });
  }

  componentWillMount() {
    let state = this.context.store.getState();
    this.setState({
      name: state.userDetails.name,
      city: state.userDetails.city,
      state: state.userDetails.state
    });
  }

  render() {

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <br />
            <h2>Update Profile</h2>
            <br />
            <form>
              <Input value={this.state.name} className="form-control" fieldName="Name" type="text" callback={this.setInputName} />
              <Input value={this.state.city} className="form-control" fieldName="City" type="text" callback={this.setInputCity} />
              <Input value={this.state.state} className="form-control" fieldName="State" type="text" callback={this.setInputState} />
              <br />
              <button className="btn btn-primary" onClick={this.handleProfile}>Save Changes</button>
            </form>
            <br />
            <br />
            <h2>Change Password</h2>
            <br />
            <form>
              <Input value={this.state.oldPass} className={this.state.oldPassClass} fieldName="Old Password" type="password" error={this.state.oldPassError} callback={this.setOldPass} />
              <Input value={this.state.newPass} className="form-control" fieldName="New Password" type="password" callback={this.setNewPass} />
              <br />
              <button className="btn btn-primary" onClick={this.handlePassword}>Save Changes</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Profile.contextTypes = {
  store: PropTypes.object
}

export default Profile;

import React from 'react';
import PropTypes from 'prop-types';
import Actions from '../../actions';
import Input from '../modules/input';
import InputParams from '../../common/inputParams';
import Requests from '../../common/requests';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      city: '',
      state: '',
      oldPass: '',
      newPass: ''
    }
  }

  setParams() {
    let name = InputParams('Name', 'text');
    let city = InputParams('City', 'text');
    let state = InputParams('State', 'text');
    let oldPass = InputParams('Old Password', 'password');
    let newPass = InputParams('New Password', 'password');
    return {name, city, state, oldPass, newPass};
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

  handleProfile = (e) => {
    e.preventDefault();
    let store = this.context.store;
    let state = this.state;
    let params = {
      name: this.state.name,
      city: this.state.city,
      state: this.state.state
    };

    Requests.post('/profile', params, function success() {
      store.dispatch(Actions.setName(state.name));
      store.dispatch(Actions.setCity(state.city));
      store.dispatch(Actions.setState(state.state));
    }, function failure() {

    });
  }

  handlePassword = (e) => {
    e.preventDefault();
    let reset = this.resetPassword;
    let params = {
      oldPass: this.state.oldPass,
      newPass: this.state.newPass
    };

    Requests.post('/password', params, function success() {
      reset();
    }, function failure() {

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
    let {name, city, state, oldPass, newPass} = this.setParams();

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <br />
            <h2>Update Profile</h2>
            <br />
            <form>
              <Input value={this.state.name} params={name} callback={this.setInputName} />
              <Input value={this.state.city} params={city} callback={this.setInputCity} />
              <Input value={this.state.state} params={state} callback={this.setInputState} />
              <br />
              <button className="btn btn-primary" onClick={this.handleProfile}>Save Changes</button>
            </form>
            <br />
            <br />
            <h2>Change Password</h2>
            <br />
            <form>
              <Input value={this.state.oldPass} params={oldPass} callback={this.setOldPass} />
              <Input value={this.state.newPass} params={newPass} callback={this.setNewPass} />
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

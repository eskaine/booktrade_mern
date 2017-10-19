import React from 'react';
import PropTypes from 'prop-types';
import Input from '../modules/input';
import InputParams from '../../common/inputParams';
import Requests from '../../controllers/requests';
import {SetProfile} from '../../common/storeFunctions';

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

  resetPassword() {
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

    Requests.submit('/profile', params, function success() {
      SetProfile(store, state.name, state.city, state.state);
    }, null);
  }

  componentWillMount() {
    let store = this.context.store.getState();
    this.setState({
      name: store.userDetails.name,
      city: store.userDetails.city,
      state: store.userDetails.state
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
            <form novalidate>
              <Input defaultValue={this.state.name} params={name} callback={this.setInputName} />
              <Input defaultValue={this.state.city} params={city} callback={this.setInputCity} />
              <Input defaultValue={this.state.state} params={state} callback={this.setInputState} />
              <br />
              <button className="btn btn-primary" onClick={this.handleProfile}>Save Changes</button>
            </form>
            <br />
            <br />
            <h2>Change Password</h2>
            <br />
            <form>
              <Input params={oldPass} callback={this.setOldPass} />
              <Input params={newPass} callback={this.setNewPass} />
              <br />
              <button className="btn btn-primary" type="submit">Save Changes</button>
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

import Axios from 'axios';
import {setAuth} from '../actions';

var requests = {

  submit: function (path, params, callback) {
      Axios.post(path, params)
     .then(function (res) {
       if(res.status === 200 && res.statusText === "OK") {
         callback(res.data);
       }
     })
     .catch(function (error) {
       console.log(error);
     });
  },

  logout: function (callback) {
    Axios.get('/logout')
    .then(function (res) {
        callback();
    })
    .catch(function (error) {
      console.log(error);
    });
  },

  getInitialState: function (store) {
    Axios.get('/user')
    .then(function (res) {
      if(res.status === 200 && res.statusText === "OK") {
        if(res.data !== "") {
          //store.dispatch(setAuth(res.data.isAuthenticated));
          console.log(store.getState());
          //store.dispatch(approvalCounter);
          //store.dispatch(requestCounter);
        }
      }
    })
    .catch(function (error) {
    console.log(error);
    });
  }

}

export default requests;

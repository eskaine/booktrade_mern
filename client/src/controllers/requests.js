import Axios from 'axios';
var requests = {

  submit: function (path, params, firstCB, secondCB) {
      Axios.post(path, params)
     .then(function (res) {
       if(res.status === 200 && res.statusText === "OK") {
         if(res.data) {
           firstCB(res.data);
         } else {
           firstCB();
         }
       }

       if(res.status === 202 && res.statusText === "Accepted") {
         secondCB(res.data);
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
      console.log(error.status);
    });
  },

  getInitialState: function (store) {
    Axios.get('/user')
    .then(function (res) {
      console.log(res);
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

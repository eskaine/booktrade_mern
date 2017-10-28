import Axios from 'axios';

var Requests = {

  post: function (path, params, firstCB, secondCB) {
      Axios.post(path, params)
     .then(function (res) {
       if(res.status === 200 && res.statusText === "OK") {

         if(res.data)
           firstCB(res.data);
         else
           firstCB();
       }
       if(res.status === 202 && res.statusText === "Accepted")
         secondCB(res.data);
     })
     .catch(function (error) {
       console.log(error);
     });
  },

  get: function(path, cb) {
    Axios.get(path)
    .then(function(res) {
      if(res.status === 200 && res.statusText === "OK" && res.data) {
        cb(res.data);
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
  }

}

export default Requests;

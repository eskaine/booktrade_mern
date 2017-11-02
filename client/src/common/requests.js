import Axios from 'axios';

 //persist express session inbetween passing through cors
Axios.defaults.withCredentials = true;

const appUrl = "https://booktrade-eskaine.c9users.io";

const Requests = {

  post: function (path, params, firstCB, secondCB) {
      Axios.post(appUrl + path, params)
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
    Axios.get(appUrl + path)
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
    Axios.get(appUrl + '/logout')
    .then(function (res) {
        callback();
    })
    .catch(function (error) {
      console.log(error);
    });
  }

}

export default Requests;

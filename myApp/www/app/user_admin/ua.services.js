(function () {

  angular
  .module('starter')
  .service('uaService', uaService);

  uaService.$inject = ['$http'];

  function uaService ($http) {
    return {
      getSingleUser: function (id) {
        return $http.get('https://atoys-psl.herokuapp.com/users/'+id)
        // return $http.get('http://localhost:5000/users/'+id)
        .then(function (res) {
          return res;
        })
        .catch(function (err) {
          return err;
        });
      },
      updateUser: function (id, fname, lname, email, schedule_type, schedule) {
        return $http.post('https://atoys-psl.herokuapp.com/users/edit/'+id, {
        // return $http.post('http://localhost:5000/users/edit/'+id, {
          fname: fname,
          lname: lname,
          email: email,
          schedule_type: schedule_type,
          schedule: schedule
        })
        .then(function (res) {
          return res;
        })
        .catch(function (err) {
          return err;
        })
      }
    }
  }


})();
(function () {

  angular
  .module('starter')
  .service('uaService', uaService);

  uaService.$inject = ['$http'];

  function uaService ($http) {
    return {
      getSingleUser: function (id) {
        return $http.get('https://atoys-psl.herokuapp.com/users/'+id)
        .then(function (res) {
          return res;
        })
        .catch(function (err) {
          return err;
        });
      },
      updateUser: function (userDetails) {
        return $http.post('https://atoys-psl.herokuapp.com/users/edit/'+userDetails.id, {
          fname: userDetails.fname,
          lname: userDetails.lname,
          email: userDetails.email,
          schedule_type: userDetails.schedule_type,
          schedule: userDetails.schedule
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
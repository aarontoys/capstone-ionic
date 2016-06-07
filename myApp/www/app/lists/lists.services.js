(function () {
  
  angular
  .module('starter')
  .service('listsDataService', listsDataService);

  listsDataService.$inject = ['$http'];

  function listsDataService ($http) {
    return {
      getLists: function (id) {
        return $http.get('https://atoys-psl.herokuapp.com/lists/'+id)
        // return $http.get('http://localhost:5000/lists/'+id)
        .then(function(res) {
          return res;
        })
        .catch(function (err) {
          return err
        });
      },
      updateSchedule: function(id, schedule) {
        return $http.post('https://atoys-psl.herokuapp.com/addItem/update/'+id, {
        // return $http.post('http://localhost:5000/addItem/update/'+id, {
          schedule: schedule
        })
      }
    }
  }

})();

(function () {
  
  angular
  .module('starter')
  .service('listsDataService', listsDataService);

  listsDataService.$inject = ['$http'];

  function listsDataService ($http) {
    return {
      getLists: function (id) {
        return $http.get('http://localhost:5000/lists/'+id)
        .then(function(res) {
          return res;
        })
        .catch(function (err) {
          return err
        });
      }
    }
  }

})();

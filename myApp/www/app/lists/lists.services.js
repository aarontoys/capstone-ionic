(function () {
  
  angular
  .module('starter')
  .service('listsDataService', listsDataService);

  listsDataService.$inject = ['$http'];

  function listsDataService ($http) {
    return {
      getLists: function (id) {
        return $http.get('https://atoys-psl.herokuapp.com/lists/'+id)
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

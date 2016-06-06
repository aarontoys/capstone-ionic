(function () {

  angular
  .module('starter')
  .service('addItemDataService', addItemDataService);

  addItemDataService.$inject = ['$http'];

  function addItemDataService ($http) {
    return {
      lookupBarcode: function (barcode) {
        console.log(barcode);
        return $http.get('https://atoys-psl.herokuapp.com/addItem/'+barcode, {
        // return $http.get('http://localhost:5000/addItem/'+barcode, {
          barcode: barcode
        })
        .then(function(res) {
          console.log(res);
          return res;
        })
        .catch(function(err) {
          return err;
        })
      },
      addItem: function (userId,semName,type,schedule) {
        return $http.post('https://atoys-psl.herokuapp.com/addItem',{
        // return $http.post('http://localhost:5000/addItem',{
          user_id: userId,
          semName: semName,
          schedule_type: type,
          schedule: schedule
        })

      }
    }
  }
})();
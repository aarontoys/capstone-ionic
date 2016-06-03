(function () {

  angular
  .module('starter')
  .service('addItemDataService', addItemDataService);

  addItemDataService.$inject = ['$http'];

  function addItemDataService ($http) {
    return {
      lookupBarcode: function (barcode) {
        console.log(barcode);
        return $http.get('http://localhost:5000/addItem/'+barcode, {
          barcode: barcode
        })
        .then(function(res) {
          console.log(res);
          return res;
        })
      },
      addItem: function (userId,semName,selList,freq) {
        return $http.post('http://localhost:5000/addItem',{
          user_id: userId,
          semName: semName,
          schedule_type: 1,
          schedule: [selList,freq]
        })

      }
    }
  }
})();
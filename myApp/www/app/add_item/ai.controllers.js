(function () {

  angular
  .module('starter')
  .controller('addItemCtrl', addItemCtrl)

  addItemCtrl.$inject = ['$scope', '$timeout', 'addItemDataService', 'uaService', '$cordovaBarcodeScanner']

  function addItemCtrl ($scope, $timeout, addItemDataService, uaService, $cordovaBarcodeScanner) {
    var vm = this;


    vm.barcode = '049000000443';

    vm.userId = 1
    console.log('vm.barcode', vm.barcode);

    getLists();

    $scope.$on('$ionicView.enter', function(e) {
      vm.show = false;
      $timeout(function () {
        loadBarcodeScanner();
      }, 1000);
    });

    vm.scanNew = function () {
      loadBarcodeScanner();
    }

    function loadBarcodeScanner () {
      $cordovaBarcodeScanner
      .scan()
      .then(function(barcodeData) {
        console.log(barcodeData);
        lookupBarcode(barcodeData.text);
      }, function(error) {
        return error;
      });
    }

    vm.lookupBarcode = function () {
      console.log('vm.lookupBarcode');
      lookupBarcode(vm.barcode);
   
    }

    function lookupBarcode (barcode) {
      console.log(barcode);
      addItemDataService.lookupBarcode(barcode)
      .then(function(newItem) {
        console.log(newItem);
        vm.title = newItem.data.product.title
        vm.imageUrl = newItem.data.product.imageUrl
        vm.brand = newItem.data.product.brandName
        vm.show = true;
      })
    }

    function getLists () {
      console.log('line59');
      uaService.getSingleUser(vm.userId)
      .then(function(user) {
        console.log(user)
        vm.current = user.data.user[0].occurrences[0]
        vm.next = user.data.user[0].occurrences[1]
        vm.following = user.data.user[0].occurrences[2]
        vm.hold = user.data.user[0].occurrences[3]
      })
    }

    vm.addItem = function () {
      console.log(vm);

      addItemDataService.addItem(vm.userId,vm.semName,vm.selList,vm.freq)
    }
  }




})();

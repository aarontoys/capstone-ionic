(function () {

  angular
  .module('starter')
  .controller('addItemCtrl', addItemCtrl)

  addItemCtrl.$inject = ['$scope', '$timeout','addItemDataService', 'uaService', '$cordovaBarcodeScanner', 'xDaysService', '$cordovaToast']

  function addItemCtrl ($scope, $timeout, addItemDataService, uaService, $cordovaBarcodeScanner, xDaysService, $cordovaToast) {
    var vm = this;


    vm.barcode = '049000000443';

    vm.userId = 1

    vm.freqOpts = xDaysService.freqOpts();

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
        lookupBarcode(barcodeData.text);
      }, function(error) {
        return error;
      });
    }

    vm.lookupBarcode = function () {
      lookupBarcode(vm.barcode);
   
    }

    function lookupBarcode (barcode) {
      addItemDataService.lookupBarcode(barcode)
      .then(function(newItem) {
        if(newItem.data.product.length) {
          vm.notFound = false;
          vm.product = newItem.data.product[0];
          vm.show = true;
        } else {
          vm.notFound = 'Sorry, we could not find that item. Please try a different item.'
        }
      })
    }

    function getLists () {
      uaService.getSingleUser(vm.userId)
      .then(function(user) {
        vm.current = user.data.user[0].occurrences[0]
        vm.next = user.data.user[0].occurrences[1]
        vm.following = user.data.user[0].occurrences[2]
        vm.hold = user.data.user[0].occurrences[3]
      })
    }

    vm.addItem = function () {
      vm.schedule = xDaysService.buildxDaysSchedule(vm.xDays);
      vm.schedule_type = 1;

      addItemDataService.addItem(vm.userId,vm.semName,vm.schedule_type,vm.schedule)
      .then(function(result){
        console.log('line92',result);
        // ionicToast.hide();
        $cordovaToast.show(vm.semName + ' added successfully!','short','center')
          .then(function(success){
            console.log(success);
          }, function(error) {
            console.log(error)
          });
      })
      .catch(function(error) {
        $cordovaToast.show('Uh oh! Something went wrong!','long','center')
          .then(function(success){
            console.log(success);
          }, function(error) {
            console.log(error)
          });
      });
    }
  }




})();

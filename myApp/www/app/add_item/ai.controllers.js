(function () {

  angular
  .module('starter')
  .controller('addItemCtrl', addItemCtrl);

  addItemCtrl.$inject = ['$scope', '$timeout','addItemDataService', 'uaService', '$cordovaBarcodeScanner', 'xDaysService', '$cordovaToast', '$ionicScrollDelegate'];

  function addItemCtrl ($scope, $timeout, addItemDataService, uaService, $cordovaBarcodeScanner, xDaysService, $cordovaToast, $ionicScrollDelegate) {

    var vm = this;
    vm.xDays = {};
    vm.xDays.occur = 3;
    // vm.barcode = '049000000443';
    vm.barcodes = [
      '016000434714',
      '051500255278',
      '040822011440',
      '381371163274',
      '048500305690',
      '096619813131'
    ];

    vm.userId = 1;

    vm.freqOpts = xDaysService.freqOpts();

    vm.xDays.mult = 1;

    vm.addItemMessage = 'Add product to my lists';

    getLists();

    vm.isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    $scope.$on('$ionicView.enter', function(e) {
      vm.show = false;
      $timeout(function () {
        loadBarcodeScanner();
      }, 1000);
    });

    vm.scanNew = function () {
      if (vm.isMobile) {
        loadBarcodeScanner();
        vm.showLoader = true;
        vm.barcode = '';
        vm.semName = '';
        vm.product = '';
        vm.xDays.startDate = '';
        vm.xDays.occur = 3;
      } else {
        $ionicScrollDelegate.scrollTop();
        vm.showLoader = false;
        vm.barcode = '';
        vm.semName = '';
        vm.product = '';
        vm.xDays.startDate = '';
        vm.xDays.occur = 3;
      }
    };

    function loadBarcodeScanner () {
      if (vm.isMobile) {
        $cordovaBarcodeScanner
        .scan()
        .then(function(barcodeData) {
          lookupBarcode(barcodeData.text);
        }, function(error) {
          return error;
        });
      }
    }

    vm.lookupBarcode = function () {
      lookupBarcode(vm.barcode);
   
    };

    function lookupBarcode (barcode) {
      addItemDataService.lookupBarcode(barcode)
      .then(function(newItem) {
        if(newItem.data.product.length) {
          vm.notFound = false;
          vm.product = newItem.data.product[0];
          vm.show = true;
        } else {
          vm.notFound = 'Sorry, we could not find that item. Please try a different item.';
        }
      });
    }

    function getLists () {
      uaService.getSingleUser(vm.userId)
      .then(function(user) {
        vm.current = user.data.user[0].occurrences[0];
        vm.next = user.data.user[0].occurrences[1];
        vm.following = user.data.user[0].occurrences[2];
        vm.hold = user.data.user[0].occurrences[3];
      });
    }

    vm.addItem = function () {
      vm.schedule = xDaysService.buildxDaysSchedule(vm.xDays);
      vm.schedule_type = 1;
      addItemDataService.addItem(vm.userId,vm.semName,vm.schedule_type,vm.schedule)
      .then(function(result){
        if (vm.isMobile) {
          $cordovaToast.show(vm.semName + ' added successfully!','short','center')
            .then(function(success){
            }, function(error) {
            });
        } else {
          vm.addItemMessage = 'Success!';
          $timeout(function () {
            resetAddItemMessage();
          }, 2000);
        }
      })
      .catch(function(error) {
        if (vm.isMobile) {
          $cordovaToast.show('Uh oh! Something went wrong!','long','center')
            .then(function(success){
            }, function(error) {
            });
        } else {
          vm.addItemMessage = 'Uh oh! Something went wrong!';
          $timeout(function () {
            resetAddItemMessage();
          }, 2000);
        }
      });
    };

    function resetAddItemMessage () {
      vm.addItemMessage = 'Add product to my lists';
    }
  }

})();

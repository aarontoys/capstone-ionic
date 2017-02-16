(function () {

  angular
  .module('starter')
  .controller('userAdminCtrl', userAdminCtrl);

  userAdminCtrl.$inject = ['$scope','uaService', 'ionicDatePicker', 'xDaysService', '$cordovaToast', '$timeout'];


  function userAdminCtrl ($scope, uaService, ionicDatePicker, xDaysService, $cordovaToast, $timeout) {

    var vm = this;
    var day = 60*60*24*1000;

    vm.shopDays = {};
    vm.required = true;
    // var parser = datetime('EEE, MMM d, yyyy');
    // parser.set
    vm.addSaveUserMessage = 'Update';

    vm.isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    vm.freqOpts = xDaysService.freqOpts();
    
    $scope.$on('$ionicView.enter', function(e) {
    // console.log('line15',vm.shopDays);

    });
      vm.xDays = {};
      vm.xDays.startDate = new Date();
      vm.xDays.occur = 3;
      // vm.test = vm.date

    vm.checkboxRequired = function (obj) {
      for (var key in obj) {
        if (obj[key]) {
          vm.required = false;
          break;
        } else {
          vm.required = true;
        }
      }
    };

    vm.datePlus = function () {
      vm.xDays.startDate = new Date(vm.xDays.startDate.getTime() + day );

    };

    vm.dateMinus = function () {

      vm.xDays.startDate = new Date(vm.xDays.startDate.getTime() - day);
    };


    var dayKeys = { 
          mon: 2, 
          tue: 3,
          wed: 4,
          thu: 5,
          fri: 6,
          sat: 7,
          sun: 1
        };

//comment



    getSingleUser(1);

    function getSingleUser (id) {
      uaService.getSingleUser(id)
      .then(function (result) {
        vm.fname = result.data.user[0].fname;
        vm.lname = result.data.user[0].lname;
        vm.email = result.data.user[0].email;
        vm.shopFreq = result.data.user[0].schedule_type;
        var schedule = result.data.user[0].schedule;

        if (vm.shopFreq) {
          vm.shopFreq = 'xDays';
          vm.xDays.startDate = new Date(schedule[0]);

          if (!(schedule[1] % 30)) {
            vm.xDays.occur = schedule[1]/30;
            vm.xDays.mult = 30;
          } else if (!(schedule[1] % 7)) {
            vm.xDays.occur = schedule[1]/7;
            vm.xDays.mult = 7;
          } else {
            vm.xDays.occur = schedule[1];
            vm.xDays.mult = 1;
          }

          vm.required = false;
        } else {
          vm.shopFreq = 'DOW';
          buildShopDays(schedule);
          vm.checkboxRequired(vm.shopDays);
        }
      });
    }

    function updateSingleUser () {

    }


  
    function getUser () {

    }

    vm.submit = function () {
      vm.id = 1;
      if (vm.shopFreq === 'xDays') {
        vm.schedule = xDaysService.buildxDaysSchedule(vm.xDays);
        vm.schedule_type = 1;
      } else {
        vm.schedule = buildDOWSchedule(vm.shopDays);
        vm.schedule_type = 0;
      }
      uaService.updateUser(vm.id, vm.fname, vm.lname, vm.email, vm.schedule_type, vm.schedule)
      .then(function(result){
        // console.log('line92',result);
        if (vm.isMobile) {        
          $cordovaToast.show('Update Successful!','short','center')
            .then(function(success){
              // console.log(success);
            }, function(error) {
              console.log(error);
            });
        } else {
          vm.addSaveUserMessage = 'Success!';
          $timeout(function () {
            resetAddUserMessage();
          },2000);
        }
      })
      .catch(function(error) {
        if (vm.isMobile) {
          $cordovaToast.show('Uh oh! Something went wrong!','long','center')
            .then(function(success){
              // console.log(success);
            }, function(error) {
              console.log(error);
            });
        } else {
          vm.addSaveUserMessage = 'Oh no, didn\'t save!';
          $timeout(function () {
            resetAddUserMessage();
          },2000);
        }
      });
      // vm.schedule = buildSchedule(vm.shopDays);
      // vm.schedule_type = 0;
      // uaService.updateUser(vm)
    };

    function resetAddUserMessage () {
      vm.addSaveUserMessage = 'Update';
    }

    function buildDOWSchedule (daysObj) {
      // if(daysObj) {
      //   return Object.keys(daysObj).map(function(el) {
      //     if (daysObj[el]) {
      //       return dayKeys[el]
      //     }
      //   }).filter(function(el) {
      //     return el >= 1;
      //   })
      // }
      if(daysObj) {
        return Object.keys(daysObj).reduce(function(arr, cur) {
          if( daysObj[cur] ){
            arr.push(dayKeys[cur]);
          }
          return arr;
        }, []);
      } else { return []; }
    }

    function buildShopDays (arr) {
      arr.forEach(function(el) {
        switch (el) {
          case 1:
            vm.shopDays.sun = true;
            break;
          case 2:
            vm.shopDays.mon = true;
            break;
          case 3:
            vm.shopDays.tue = true;
            break;
          case 4:
            vm.shopDays.wed = true;
            break;
          case 5:
            vm.shopDays.thu = true;
            break;
          case 6:
            vm.shopDays.fri = true;
            break;
          case 7:
            vm.shopDays.sat = true;
            break;
        }
      });
    }

    var ipObj1 = {
      callback: function (val) {  //Mandatory 
        // console.log('Return value from the datepicker popup is : ' + val, new Date(val));
        vm.xDays.startDate = new Date(val);
      }
    };
    vm.openDatePicker = function(){
      ionicDatePicker.openDatePicker(ipObj1);
    };




    
  }

})();
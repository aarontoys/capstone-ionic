(function () {

  angular
  .module('starter')
  .controller('userAdminCtrl', userAdminCtrl)

  userAdminCtrl.$inject = ['$scope','uaService', 'ionicDatePicker', 'xDaysService'];


  function userAdminCtrl ($scope, uaService, ionicDatePicker, xDaysService) {

    var vm = this;
    var day = 60*60*24*1000

    // var parser = datetime('EEE, MMM d, yyyy');
    // parser.set

    vm.freqOpts = xDaysService.freqOpts();
    
    $scope.$on('$ionicView.enter', function(e) {
    // console.log('line15',vm.shopDays);

    });
      vm.xDays = {};
      vm.xDays.startDate = new Date()
      // vm.test = vm.date

    vm.consoleLog = function () {
    console.log('line22',vm.freqOpts.options[0].name);
    console.log('line22',vm.freqOpts.options[0].range);
    console.log('line22',vm.freqOpts.options[0].range.length);
    }

    vm.datePlus = function () {
      vm.xDays.startDate = new Date(vm.xDays.startDate.getTime() + day );

    }

    vm.dateMinus = function () {

      vm.xDays.startDate = new Date(vm.xDays.startDate.getTime() - day);
    }


    var dayKeys = { 
          mon: 2, 
          tue: 3,
          wed: 4,
          thu: 5,
          fri: 6,
          sat: 7,
          sun: 1
        }

//comment



    getSingleUser(3);

    function getSingleUser (id) {
      uaService.getSingleUser(id)
      .then(function (result) {
        vm.fname = result.data.user[0].fname
        vm.lname = result.data.user[0].lname
        vm.email = result.data.user[0].email
      })
    }

    function updateSingleUser () {

    }


  
    function getUser () {

    }

    vm.submit = function () {
      console.log(vm);
      vm.id = 3;
      if (vm.shopFreq === 'xDays') {
        vm.schedule = xDaysService.buildxDaysSchedule(vm.xDays);
        vm.schedule_type = 1;
      } else {
        vm.schedule = buildDOWSchedule(vm.shopDays);
        vm.schedule_type = 0;
      }
      uaService.updateUser(vm.id, vm.fname, vm.lname, vm.email, vm.schedule_type, vm.schedule)

      // vm.schedule = buildSchedule(vm.shopDays);
      // vm.schedule_type = 0;
      // uaService.updateUser(vm)
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
            arr.push(dayKeys[cur])
          }
          return arr;
        }, []);
      } else { return []; }
    }

    var ipObj1 = {
      callback: function (val) {  //Mandatory 
        console.log('Return value from the datepicker popup is : ' + val, new Date(val));
      }
    }
    vm.openDatePicker = function(){
      ionicDatePicker.openDatePicker(ipObj1);
    };




    
  }

})();
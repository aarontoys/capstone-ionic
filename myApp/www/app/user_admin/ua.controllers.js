(function () {

  angular
  .module('starter')
  .controller('userAdminCtrl', userAdminCtrl)

  userAdminCtrl.$inject = ['uaService', 'ionicDatePicker'];


  function userAdminCtrl (uaService, ionicDatePicker) {

    console.log('userAdminCtrl');
    var vm = this,
        dayKeys = { 
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
        console.log('result: ', result)
        vm.fname = result.data.user[0].fname
        vm.lname = result.data.user[0].lname
        vm.email = result.data.user[0].email
      })
    }

    function updateSingleUser () {

    }


    console.log('line12',vm);
  
    function getUser () {

    }

    vm.submit = function () {
      // console.log(vm);
      // console.log('t/f:', !!vm.shopDays);
      // console.log(buildSchedule(vm.shopDays));
      vm.id = 3;
      vm.schedule = buildSchedule(vm.shopDays);
      vm.schedule_type = 0;
      console.log(vm);
      uaService.updateUser(vm)
    }


    function buildSchedule (daysObj) {
      // console.log(Object.values(daysObj));
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
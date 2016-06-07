(function () {

  angular
  .module('starter')
  .controller('listsCtrl', listsCtrl)

  listsCtrl.$inject = ['$scope', '$state','listsDataService']

  function listsCtrl ($scope, $state, listsDataService) {
    var vm = this;
    
    $scope.$on('$ionicView.enter', function(e) {
      var test = $state.current.url
      test = test[test.length - 1]
      vm.test = test;
    });
    
    vm.userId =1;

    vm.lists = [];

    getLists(vm.userId);

    vm.getLists = function (id) {
      getLists(id);
    }

    // vm.getLists = function (id) {
    function getLists (id) {

      listsDataService.getLists(id)
      .then(function (lists) {
        vm.lists = lists.data.lists;
        vm.items = lists.data.items;
        consolidate(vm.lists);
        $scope.$broadcast('scroll.refreshComplete');
      })
      .catch(function (err) {
        return next(err);
      });
    };

    vm.doRefresh = function () {
      getLists(vm.userId);
      console.log(vm.lists);
    }

    function consolidate (listArr) {
      return listArr.map(function(eachList) {
        var result = eachList.items.reduce(function(prev,curr,index) {
          if (prev.length && prev[prev.length-1].id === curr.id) {
            prev[prev.length-1].count++;
          } else {
            curr.count = 1;
            prev.push(curr)
          }
          return prev;
        }, [])
        eachList.items = result
        return eachList;
      });
    }

    vm.checkOff = function (sched) {
      console.log(sched)
      console.log(vm.lists[1].occurs);
      sched.schedule[0] = vm.lists[1].occurs;
      console.log(sched.schedule);
      listsDataService
        .updateSchedule(sched.id, sched.schedule)
        .then(vm.doRefresh);
      // var lists = getLists(vm.userId);
      // console.log(lists)
    }

    vm.swipeRight = function () {
      console.log('swipe right worked');
    }
  }

})();
(function () {

  angular
  .module('starter')
  .controller('listsCtrl', listsCtrl);

  listsCtrl.$inject = ['$scope', '$state','listsDataService', '$ionicScrollDelegate'];

  function listsCtrl ($scope, $state, listsDataService, $ionicScrollDelegate) {
    
    var vm = this;
    
    $scope.$on('$ionicView.enter', function(e) {
      getLists(vm.userId);
      var listId = $state.current.url;
      listId = listId[listId.length - 1];
      vm.listId = listId;
      $ionicScrollDelegate.scrollTop();
    });

    vm.userId =1;

    vm.lists = [];

    getLists(vm.userId);

    vm.getLists = function (id) {
      getLists(id);
    };

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
    }

    vm.doRefresh = function () {
      getLists(vm.userId);
    };

    function consolidate (listArr) {
      return listArr.map(function(eachList) {
        var result = eachList.items.reduce(function(prev,curr,index) {
          if (prev.length && prev[prev.length-1].id === curr.id) {
            prev[prev.length-1].count++;
          } else {
            curr.count = 1;
            prev.push(curr);
          }
          return prev;
        }, []);
        eachList.items = result;
        return eachList;
      });
    }

    vm.checkOff = function (sched, listId) {
      sched.status = 0;
      if (parseInt(listId) < 3) {
        
        sched.schedule[0] = vm.lists[parseInt(listId)+1].occurs;
      } else { 
        sched.schedule[0] = new Date(new Date(vm.lists[parseInt(listId)].occurs).getTime() + 864000000);
      }
      listsDataService
        .updateSchedule(sched.id, sched.schedule)
        .then(vm.doRefresh);
    };

    vm.swipe = function (item, listId, dir) { 

      var dateDiff;
      var newStartTime;
      var newInterval;
      var newSched
      if (!+listId) {
        var newArr = item.occurrences.slice().reverse();
        for (var i = 0; i < newArr.length; i++) {
          if(new Date(newArr[i]) < new Date(vm.lists[parseInt(listId)+1].occurs)) {
            dateDiff = new Date(vm.lists[parseInt(listId)+1].occurs) - new Date(newArr[i]);
            break;
          }
        }
        newStartTime = new Date(new Date(item.occurrences[0]).getTime() + dateDiff);
        newInterval = item.schedule[1];
        newSched = [newStartTime,newInterval];
        listsDataService
          .updateSchedule(item.id, newSched)
          .then(vm.doRefresh);
      }
      else {
        newSched = [vm.lists[0].occurs, item.schedule[1]];
        listsDataService
          .updateSchedule(item.id, newSched)
          .then(vm.doRefresh);
        // for (var i =0; i < item.occurrences.length; i++) {
        //   if(new Date(item.occurrences[i]) >= new Date(vm.lists[listId].occurs)) {
        //     dateDiff = new Date(item.occurrences[i]) - new Date(vm.lists[listId].occurs)
        //     break;
        //   }
        // }
        // console.log(dateDiff/1000/60/60/24)
        // newStartTime = new Date()
        // newStartTime = item.schedule[0];
        // schedInterval = (new Date(vm.lists[parseInt(listId)].occurs) - new Date(vm.lists[parseInt(listId)-1].occurs))/1000/60/60/24;
        // newInterval = schedInterval - 1;
        // console.log(item);
        // console.log(schedInterval);
        // console.log(newStartTime);
        // console.log(newInterval);
      }
    };
  }

})();
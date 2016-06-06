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
        $scope.$broadcast('scroll.refreshComplete');
      })
      .catch(function (err) {
        return next(err);
      });
    };

    vm.doRefresh = function () {
      getLists(vm.userId);
    }
  }

})();
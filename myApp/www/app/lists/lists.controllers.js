(function () {

  angular
  .module('starter')
  .controller('listsCtrl', listsCtrl)

  listsCtrl.$inject = ['$scope', '$state','listsDataService']

  function listsCtrl ($scope, $state, listsDataService) {
    var vm = this
    
    $scope.$on('$ionicView.enter', function(e) {
      console.log('line13');
      var test = $state.current.url
      test = test[test.length - 1]
      vm.test = test;
      console.log('test',vm.test);
    });
    // console.log($state.current.url[]);
    console.log()
    vm.userId =1;
    console.log(vm.userId);

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
        console.log(vm.lists);
        console.log(vm.lists[0].name);
      })
      .catch(function (err) {
        return next(err);
      });
    };
  }

})();
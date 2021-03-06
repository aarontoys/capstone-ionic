// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services','ionic-datepicker','ngCordova','datetime'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html',
    controller: 'listsCtrl',
    controllerAs: 'vm'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'userAdminCtrl',
        controllerAs: 'vm'
      }
    }
  })

  .state('tab.currentList', {
    url: '/list/0',
    views: {
      'tab-currentList': {
        templateUrl: 'templates/current-list.html',
        controller: 'listsCtrl',
        controllerAs: 'vm'
      }
    }
  })

 .state('tab.nextlist', {
    url: '/list/1',
    views: {
      'tab-nextlist': {
        templateUrl: 'templates/current-list.html',
        controller: 'listsCtrl',
        controllerAs: 'vm'
      }
    }
  })

 .state('tab.followinglist', {
    url: '/list/2',
    views: {
      'tab-followinglist': {
        templateUrl: 'templates/current-list.html',
        controller: 'listsCtrl',
        controllerAs: 'vm'
      }
    }
  })

 .state('tab.holdinglist', {
    url: '/list/3',
    views: {
      'tab-holdinglist': {
        templateUrl: 'templates/current-list.html',
        controller: 'listsCtrl',
        controllerAs: 'vm'
      }
    }
  })

 .state('tab.addItem', {
  url: '/add-item',
  views: {
    'tab-addItem': {
      templateUrl: 'templates/add-item.html',
      controller: 'addItemCtrl',
      controllerAs: 'vm'
    }
  }
 })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

})

.config(function (ionicDatePickerProvider) {
  var datePickerObj = {
    inputDate: new Date(),
    setLabel: 'Ok',
    todayLabel: 'Today',
    closeLabel: 'Close',
    mondayFirst: false,
    weeksList: ["S", "M", "T", "W", "T", "F", "S"],
    monthsList: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
    templateType: 'popup',
    from: new Date(),
    to: new Date(2018, 8, 1),
    showTodayButton: true,
    dateFormat: 'dd MMMM yyyy',
    closeOnSelect: false,
    disableWeekdays: [6]
  };
  ionicDatePickerProvider.configDatePicker(datePickerObj);
});

// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
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
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.resources', {
      url: '/resources',
      views: {
        'menuContent': {
          templateUrl: 'templates/resources/resources.html',
          controller: 'resourcesCtrl',
          controllerAs: 'vm',
          resolve: {
            resources: function (request, url) {
              return request.request(url.resources, 'GET', {format: 'json'}).then(function (data) {
                return data.data;
              });
            }
          }
        }
      }
    })

  .state('app.single', {
    url: '/resource/:resourcesId',
    views: {
      'menuContent': {
        templateUrl: 'templates/resource/resource.html',
        controller: 'resourceCtrl',
        controllerAs: 'vm',
        resolve: {
          resource: function ($ionicLoading, $stateParams, request, url) {
            return request.request(url.resources + "/" +$stateParams.resourcesId , 'GET', {format: 'json'}).then(function (data) {
              return data.data;
            });
          }
        }
      }
    }
  })

    .state('app.diagram', {
      url: '/diagram/:resourcesId/:diagram',
      views: {
        'menuContent': {
          templateUrl: 'templates/diagram/diagram.html',
          controller: 'diagramCtrl',
          controllerAs: 'vm',
          resolve: {
            diagramData: function ($ionicLoading, $stateParams, request, url) {
              console.log($stateParams);
              return request.request(url.file + "/" + $stateParams.resourcesId + "/" + $stateParams.diagram, 'GET', {format: 'json'}).then(function (data) {
                return data.data;
              });
            }
          }
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/resources');
});

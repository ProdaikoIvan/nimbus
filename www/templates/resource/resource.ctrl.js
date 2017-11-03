angular.module('starter.controllers')
  .controller('resourceCtrl', function ($scope, resource, $stateParams, $state) {
    var vm = this;
    vm.resource = resource;
    console.log(resource);

    vm.go = go;
    function go(item) {
      $stateParams.diagram = item.level;
      console.log($stateParams);
      $state.go('app.diagram', $stateParams);
    }
  });

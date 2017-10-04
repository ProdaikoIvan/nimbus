(function () {
  'use strict';

  angular
    .module('starter.controllers')
    .controller('diagramConstructorCtrl', diagramConstructorCtrl);

  diagramConstructorCtrl.$inject = ['$scope', '$stateParams', '$state'];

  function diagramConstructorCtrl($scope, $stateParams, $state) {
    this.$onInit = function () {
      var vm = this;
      console.log(vm);

      vm.goToResources = goToResources;

      function goToResources(res){
        $stateParams.diagram = res;
        $state.go('app.diagram', $stateParams);
      }
    };
  }
})();

// /diagram

angular.module('starter.controllers')
  .controller('diagramCtrl', function ($scope, diagramData, $stateParams) {
    var vm = this;
    vm.diagramData = diagramData;

    console.log($stateParams);


  });

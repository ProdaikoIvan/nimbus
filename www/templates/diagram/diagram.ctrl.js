// /diagram

angular.module('starter.controllers')
  .controller('diagramCtrl', function ($scope, diagramData) {
    var vm = this;
    vm.diagramData = diagramData;

    console.log(vm.diagramData);


  });

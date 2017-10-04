angular.module('starter.controllers')
  .controller('resourcesCtrl', function ($scope, resources) {
    var vm = this;
    vm.resources = resources;

  });

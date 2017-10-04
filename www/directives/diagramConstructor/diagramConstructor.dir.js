(function () {
  'use strict';

  angular
    .module('starter.controllers')
    .directive('diagramConstructor', diagramConstructor);

  diagramConstructor.$inject = ['builder', '$compile'];

  function diagramConstructor(builder, $compile) {
    var directive = {
      bindToController: true,
      controller: 'diagramConstructorCtrl',
      controllerAs: 'vm',
      templateUrl: 'directives/diagramConstructor/diagramConstructor.html',
      link: link,
      restrict: 'AE',
      replace: true,
      scope: {
        model: '='
      }
    };
    return directive;

    function link(scope, element, attrs) {
      var constr = angular.element(element[0].querySelector('#diagram-constructor'));
      for (var el in scope.vm.model.DiagramElement) {
        if (scope.vm.model.DiagramElement[el].hasOwnProperty('Activity')) {
          var ActivityChild = builder.Activity(scope.vm.model.DiagramElement[el]);
          if(scope.vm.model.DiagramElement[el].Activity.DrillDown !== undefined){
            var params = scope.vm.model.DiagramElement[el].Activity.DrillDown['#text'];
            ActivityChild.attr('ng-click', 'vm.goToResources("'+params+'")');
            $compile(ActivityChild)(scope);
          }
          constr.append(ActivityChild);
        }
        else if (scope.vm.model.DiagramElement[el].hasOwnProperty('Input_Output')) {

        }
        else if (scope.vm.model.DiagramElement[el].hasOwnProperty('Line')) {
          var LineChild = builder.Line(scope.vm.model.DiagramElement[el]);
          if (angular.isArray(LineChild)) {
            LineChild.forEach(function (item) {
              constr.append(item);
            })
          }
          else{
            constr.append(LineChild);
          }
        }
        else if(scope.vm.model.DiagramElement[el].hasOwnProperty('FreeText')){
          var FreeText = builder.FreeText(scope.vm.model.DiagramElement[el]);
          constr.append(FreeText);

        }
      }
    }
  }
})();

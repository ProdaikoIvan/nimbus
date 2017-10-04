(function () {
    'use strict';

    angular
        .module('starter')
        .factory('request', request);

        request.$inject = ['$http', '$q', 'url', '$ionicLoading'];
    function request($http, $q, url, $ionicLoading) {
        return{
            request:request
        };
      
        ////////////////
        function request(urlPath, method, params, data) {
          $ionicLoading.show();
            var defer = $q.defer();
            $http({
                method: method,
                url: urlPath,
                params: params,
                data: data
            }).then(function (data) {
                defer.resolve(data);
              $ionicLoading.hide();
            },function (dataError) {
                defer.reject(dataError);
              $ionicLoading.hide();
            });
            return defer.promise;
        }

    }
})();

(function() {
    'use strict';

    angular
        .module('starter')
        .factory('url', url);

        url.$inject = [];
    function url() {
       // var server = "https://xmltodiag.herokuapp.com/";
        var server = "https://nimbusc.herokuapp.com/api/v1/";
        return {
            resources: server + 'resources',
            file: server + 'file/resources'
        };
    }
})();

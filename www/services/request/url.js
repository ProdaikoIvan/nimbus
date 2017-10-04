(function() {
    'use strict';

    angular
        .module('starter')
        .factory('url', url);

        url.$inject = [];
    function url() {
        var server = "https://xmltodiag.herokuapp.com/";
        return {
            resources: server + 'resources',
            file: server + 'file/resources'
        };
    }
})();

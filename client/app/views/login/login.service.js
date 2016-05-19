(function () {
	'use strict';
    angular
        .module('app')
        .factory('loginService', loginService);

    loginService.$inject = ["$http", "$q", "jwtHelper", "store"]

    function loginService($http, $q, jwtHelper, store) {
        var service = {
            login: login,
            signUp: signUp,
            isAuthenticated: isAuthenticated,
            logout: logout
        };

        return service;

        function login(email, password) {
            var deferred = $q.defer();

						deferred.resolve();

            return deferred.promise;
        }

        function signUp(email, password) {
            var deferred = $q.defer();

						deferred.resolve();

            return deferred.promise;
        }

        function isAuthenticated() {
            return true;
        }

        function logout() {
            var deferred = $q.defer();

            deferred.resolve();

            return deferred.promise;
        }
    }
})();

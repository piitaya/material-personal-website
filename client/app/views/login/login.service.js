(function () {
	'use strict';
    angular
        .module('app')
        .factory('loginService', loginService);
       
    loginService.$inject = ["$http", "$q", "jwtHelper", "store", "auth"]
    
    function loginService($http, $q, jwtHelper, store, auth) {
        var service = {
            login: login,
            signUp: signUp,
            isAuthenticated: isAuthenticated,
            logout: logout
        };
        
        return service;
        
        function login(email, password) {
            var deferred = $q.defer();
            
            auth.signin({
				connection: 'Username-Password-Authentication',
				username: email,
				password: password,
				authParams: {
					scope: 'openid name email'
				},
				sso: false
			}, function(profile, token) {
                deferred.resolve(profile);
            }, function(error) {
                deferred.reject(error);
            });
            
            return deferred.promise;
        }

        function signUp(email, password) {
            var deferred = $q.defer();
            
            $http({
                method: 'POST',
                url: '/api/auth/signup',
                headers: {'Content-Type': 'application/json'},
                skipAuthorization: true,
                data: {
                    email: email,
                    password: password
                }
            }).then(function(response) {
                if (response.data && response.data.token) {
                    localStorage.setItem("token", response.data.token);
                    deferred.resolve(response);
                }
                else {
                    deferred.reject('Internal error, please try again later...');
                }
                
            }).catch(function(err) {
                deferred.reject('Internal error, please try again later...');
            });
            
            return deferred;
        }

        function isAuthenticated() {
            return auth.isAuthenticated;
        }

        function logout() {
            var deferred = $q.defer();
            auth.signout();
            deferred.resolve();
            
            return deferred.promise;
        }
    }
})();
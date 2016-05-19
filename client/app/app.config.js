(function () {
	'use strict';
	angular
		.module('app')
		.config(config);
    
    angular
        .module('app')
        .value('$routerRootComponent', 'app');
        
    angular
        .module('app')
        .run(run);
        
    config.$inject = ["$locationProvider", "$urlRouterProvider", "$stateProvider", "$mdIconProvider", "$mdThemingProvider", "authProvider", "jwtInterceptorProvider", "$httpProvider"];
    
	function config($locationProvider, $urlRouterProvider, $stateProvider, $mdIconProvider, $mdThemingProvider, authProvider, jwtInterceptorProvider, $httpProvider) {
        
        // Auth0
        authProvider.init({
            domain: 'synomedia.auth0.com',
            clientID: 'O0uCvorEz77mnuBv8V7zUoMTOPr0gDuO',
            loginState: 'login'
        });
        
        authProvider.on('loginSuccess', function($location, profilePromise, idToken, store) {
            profilePromise.then(function(profile) {
                store.set('profile', profile);
                store.set('token', idToken);
            });
        });
        
        authProvider.on('loginFailure', function() {
            // Do nothing
        });
        
        authProvider.on('logout', function(store) {
            store.remove('profile');
            store.remove('token');
        });
        
        // Jwt
        jwtInterceptorProvider.tokenGetter = ['store', function(store) {
        // Return the saved token
            return store.get('token');
        }];

        $httpProvider.interceptors.push('jwtInterceptor');
        
        //$locationProvider.html5Mode(true);
        
        // Material angular
        $mdIconProvider.defaultFontSet('material-icons');
        
        $mdThemingProvider.theme('default')
            .primaryPalette('blue')
            .accentPalette('pink');
            
        // Routes
        $urlRouterProvider.otherwise(function($injector) {
            var $state = $injector.get("$state");
            $state.go('main.downloads');
        });
        
        $stateProvider
        .state ('login', {
            url: '/login',
            component: 'login'
        })

        .state ('main', {
            abstract: true,
            component: 'main',
            data: {
                requiresLogin: true
            },
            resolve: {
                user: function($http, store) {
                    $http({
                        method: "GET",
                        url: "http://localhost:3000/api/user"
                    }).then(function(user) {
                        console.log(user.data);
                        return user.data;
                    });
                }
            }
        })
        
        .state('auth-popup', {
            url: '/auth/:state',
            component: 'authPopup'
        })
        
        .state ('main.account', {
            url: '/account',
            component: 'account'
        })
        
        .state ('main.downloads', {
            url: '/downloads',
            component: 'downloads',
            resolve: {
                tasks: function(taskService) {
                    return taskService.getAll();
                }
            }
        })

        .state ('main.search', {
            url: '/search/:type',
            component: 'search'
        })
        
        .state ('main.movie', {
            url: '/movies/:slug',
            component: 'movie',
            resolve: {
                movie: function(mediaService, $stateParams) {
                    return mediaService.getMovie($stateParams.slug);
                }
            }
        })
        
        .state ('main.show', {
            url: '/shows/:slug',
            component: 'show'
        })
        
        .state ('main.show-season', {
            url: '/shows/:slug/seasons/:season_number',
            component: 'showSeason'
        });
        
        
    }
    
    run.$inject = ['$transitions', 'auth', 'store', 'jwtHelper'];
    
    function run($transitions, auth, store, jwtHelper) {
        auth.hookEvents();
        
        $transitions.onStart({}, function($state, $transition$) {
            
            if ($transition$.$to().data && $transition$.$to().data.requiresLogin) {
                 var token = store.get('token');
                 if (token) {
                     if (!jwtHelper.isTokenExpired(token)) {
                         if (!auth.isAuthenticated) {
                            auth.authenticate(store.get('profile'), token);
                         }
                     }
                     else {
                         $state.go(auth.config.loginState);
                     }
                 }
                 else {
                     $state.go(auth.config.loginState);
                 }
            }
        });
    }
})();


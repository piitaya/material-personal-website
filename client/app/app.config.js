(function () {
	'use strict';
	angular
		.module('app')
		.config(config);

    config.$inject = ["$urlRouterProvider", "$stateProvider", "$mdIconProvider", "$mdThemingProvider"];

	function config($urlRouterProvider, $stateProvider, $mdIconProvider, $mdThemingProvider) {

        // Material angular
        $mdIconProvider.defaultFontSet('material-icons');
        $mdThemingProvider.theme('default')
            .primaryPalette('blue')
            .accentPalette('pink');

        // Routes
        $urlRouterProvider.otherwise(function($injector) {
            var $state = $injector.get("$state");
            $state.go('home');
        });

        $stateProvider
        .state ('login', {
            url: '/login',
            component: 'login'
        })

        .state ('home', {
					  url: '/',
            component: 'home'
        });

    }
})();

(function () {
	'use strict';
	angular
		.module('app')
		.config(config);

    config.$inject = ["$urlRouterProvider", "$stateProvider", "$mdIconProvider", "$mdThemingProvider", "LoopBackResourceProvider"];

	function config($urlRouterProvider, $stateProvider, $mdIconProvider, $mdThemingProvider, LoopBackResourceProvider) {

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

				// Use a custom auth header instead of the default 'Authorization'
		    LoopBackResourceProvider.setAuthHeader('X-Access-Token');

		    // Change the URL where to access the LoopBack REST API server
		    LoopBackResourceProvider.setUrlBase('http://localhost:5000/api/');

        $stateProvider
        .state ('login', {
            url: '/login',
            component: 'login'
        })

        .state ('home', {
					  url: '/',
            component: 'home'
        })

				.state ('admin', {
					  url: '/admin',
            component: 'admin',
						abstract: true
        })

				.state ('admin.experiences', {
					  url: '/experiences',
            component: 'adminExperiences',
						resolve: {
								experiences: function(Experience) {
									return Experience.find({}).$promise;
								},
								types: function(ExperienceType) {
									return ExperienceType.find({}).$promise;
								},
						}
        });


    }
})();

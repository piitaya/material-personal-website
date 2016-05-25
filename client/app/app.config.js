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
		    LoopBackResourceProvider.setUrlBase('/api');

        $stateProvider
        .state ('login', {
            url: '/login',
            component: 'login',
						data: {
							title: "Login"
						}
        })

        .state ('home', {
					  url: '/',
            component: 'home',
						data: {
							title: "Home"
						}
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
								}
						},
						data: {
							title: "Expériences"
						}
        })

				.state ('admin.experience-types', {
					  url: '/experience-types',
            component: 'adminExperienceTypes',
						resolve: {
								types: function(ExperienceType) {
									return ExperienceType.find({}).$promise;
								}
						},
						data: {
							title: "Types d'expérience"
						}
        })

				.state ('admin.skills', {
					  url: '/skills',
            component: 'adminSkills',
						resolve: {
								skills: function(Skill) {
									return Skill.find({}).$promise;
								},
								types: function(SkillType) {
									return SkillType.find({}).$promise;
								}
						},
						data: {
							title: "Compétences"
						}
        })

				.state ('admin.skill-types', {
					  url: '/skill-types',
            component: 'adminSkillTypes',
						resolve: {
								types: function(SkillType) {
									return SkillType.find({}).$promise;
								}
						},
						data: {
							title: "Types de compétence"
						}
        });
    }
})();

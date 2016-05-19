(function () {
	'use strict';
	angular
		.module('app')
		.component('movie', {
            templateUrl: 'app/views/movie/movie.html',
            controller: MovieComponent,
            controllerAs: "vm",
            bindings: {
                movie: "<"
            }
        });

	MovieComponent.$inject = ["$stateParams", "mediaService"];

	function MovieComponent($stateParams, mediaService) {
		var vm = this;
        
        vm.infos = {
            title: vm.movie.title,
            year: vm.movie.year,
            type: "movie"
        }
	}
})();
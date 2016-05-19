(function () {
	'use strict';
	angular
		.module('app')
		.component('showSeason', {
            templateUrl: 'app/views/show/show-season.html',
            controller: ShowSeasonComponent,
            controllerAs: "vm"
        });

	ShowSeasonComponent.$inject = ["$stateParams", "mediaService"];

	function ShowSeasonComponent($stateParams, mediaService) {
		var vm = this;
        
        vm.$onInit = function() {
            var slug = $stateParams.slug;
            var season_number = $stateParams.season_number;
            vm.season_number = season_number;
            return mediaService.getShowSeason(slug, season_number).then(function(episodes) {
                vm.episodes = episodes;
            });
        };
	}
})();
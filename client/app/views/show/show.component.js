(function () {
	'use strict';
	angular
		.module('app')
		.component('show', {
            templateUrl: 'app/views/show/show.html',
            controller: ShowComponent,
            controllerAs: "vm"
        });

	ShowComponent.$inject = ["$stateParams", "mediaService"];

	function ShowComponent($stateParams, mediaService) {
		var vm = this;
        
        vm.$onInit = function() {
            console.log($stateParams);
            var slug = $stateParams.slug;
            return mediaService.getShow(slug).then(function(show) {
                vm.show = show;
                return mediaService.getShowSeasons(slug)
            }).then(function(seasons) {
                vm.seasons = seasons;    
            });
        };
	}
})();
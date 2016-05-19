(function () {
	'use strict';
	angular
		.module('app')
		.component('search', {
            templateUrl: 'app/views/search/search.html',
            controller: SearchComponent,
            controllerAs: "vm"
        });

	SearchComponent.$inject = ["$state", "$stateParams", "mediaService"];

	function SearchComponent($state, $stateParams, mediaService) {
		var vm = this;
		
        vm.$onInit = function() {
            vm.type = $stateParams.type;
        }
        
        vm.states = {
            movie: "main.movie",
            show: "main.show"
        };

        vm.getResult = getResult;
        vm.items = [];
        vm.openItem = openItem;
        
        function getResult() {
            if (!vm.query) {
                vm.items = [];
            }
            else {
                mediaService.search(vm.query, vm.type).then(function(items) {
                    vm.items = items;
                });
            }
        }
        
        function openItem(item) {
            $state.go(vm.states[vm.type], {slug: item.ids.slug});
        };
	}
})();
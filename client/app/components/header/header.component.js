(function () {
	'use strict';
	angular
		.module('app')
		.component('header', {
		    templateUrl: 'app/components/header/header.html',
		    controller: HeaderComponent,
		    controllerAs: "vm"
		});

	HeaderComponent.$inject = ["$mdSidenav"];

	function HeaderComponent($mdSidenav) {
		var vm = this;

        vm.toggleSidenav = toggleSidenav;

        function toggleSidenav() {
            $mdSidenav('sidenav').toggle();
        };
	}
})();

(function () {
	'use strict';
	angular
		.module('app')
		.component('sidenav', {
            templateUrl: 'app/components/sidenav/sidenav.html',
            controller: SidenavComponent,
            controllerAs: "vm"
        });

	SidenavComponent.$inject = ["$mdSidenav", "loginService", "$state"];

	function SidenavComponent($mdSidenav, loginService, $state) {
		var vm = this;
		 
        vm.closeSidenav = closeSidenav;
        vm.logout = logout;
        
        vm.links = [{
            label: "Téléchargements",
            route: 'main.downloads',  
        }, {
            label: "Rechercher",
            route: 'main.search({type: "movie"})',
        }];
        
        vm.$onInit = function() {
        };
        
        function closeSidenav() {
           $mdSidenav('sidenav').close();
        }
        
        function logout() {
            loginService.logout().then(function() {
                console.log("loggout");
                closeSidenav();
                $state.go('login');
            })
        }
	}
})();
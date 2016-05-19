(function () {
	'use strict';
	angular
		.module('app')
		.component('account', {
            templateUrl: 'app/views/account/account.html',
            controller: AccountComponent,
            controllerAs: "vm"
        });

	AccountComponent.$inject = ["$window", "store"];

	function AccountComponent($window, store) {
		var vm = this;
		
		vm.services = [{
			name: "trakt",
			label: "Track.TV",
			icon: "local_movies",
			data: {}
		},{
			name: "real-debrid",
			label: "Real-Debrid",
			icon: "file_download",
			data: {}
		}];
	}
})();
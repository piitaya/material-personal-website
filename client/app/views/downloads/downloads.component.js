(function () {
	'use strict';
	angular
		.module('app')
		.component('downloads', {
            templateUrl: 'app/views/downloads/downloads.html',
            controller: DownloadsComponent,
            controllerAs: "vm",
			bindings: {
				tasks: "<"
			}
        });

	DownloadsComponent.$inject = [];

	function DownloadsComponent() {
		var vm = this;
		
	}
})();
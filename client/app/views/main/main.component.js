(function () {
	'use strict';
	angular
		.module('app')
		.component('main', {
            templateUrl: 'app/views/main/main.html',
            controller: MainComponent,
            controllerAs: "vm"
        });

	MainComponent.$inject = [];

	function MainComponent() {
		var vm = this;
        
        console.log("main");
        
	}
})();
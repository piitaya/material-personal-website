(function () {
	'use strict';
	angular
		.module('app')
		.component('steppersDemo', {
            templateUrl: 'app/views/steppers-demo/steppers-demo.html',
            controller: SteppersDemoComponent,
            controllerAs: "vm"
        });

	SteppersDemoComponent.$inject = [];

	function SteppersDemoComponent() {
		var vm = this;
        
        vm.next = function() {
            console.log("test");
        }
		
	}
})();
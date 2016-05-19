(function () {
	'use strict';
	angular
		.module('app')
		.component('step', {
            templateUrl: 'app/components/steppers/step/step.html',
            controller: StepComponent,
            controllerAs: "vm",
            transclude: true,
            require: {
                steppers: '^steppers'
            },
            bindings: {
                title: "<",
                editable: "<"
            }
        });

	StepComponent.$inject = [];
    
	function StepComponent() {
		var vm = this;
        
        vm.state = "";
        vm.editable = vm.editable | false;
        vm.title = vm.title | "";
        
        vm.$onInit = function() {
            vm.steppers.addStep(vm);
        };
        
        vm.next = function() {
            vm.steppers.next();
            console.log("steppers");
        }
        
        vm.prev = function() {
            vm.steppers.prev();
        }
	}
})();
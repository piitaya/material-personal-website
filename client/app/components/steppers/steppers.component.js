(function () {
	'use strict';
	angular
		.module('app')
		.component('steppers', {
            templateUrl: 'app/components/steppers/steppers.html',
            controller: SteppersComponent,
            controllerAs: "vm",
            transclude: true
        });

	SteppersComponent.$inject = [];
    
	function SteppersComponent() {
		var vm = this;
        
        vm.steps = [];
        vm.addStep = addStep;
        vm.select = select;
        vm.next = next;
        vm.prev = prev;
        
        function getSteps() {
            return vm.steps;
        }
        
        function addStep(step) {
            if (vm.steps.length === 0) {
                step.state = "active";
            }
            vm.steps.push(step);
        };
        
        function select(index) {
            for (var i in vm.steps) {
                if (i < index) {
                    vm.steps[i].state = "done";
                }
                else if (i == index) {
                    vm.steps[i].state = "active";
                }
                else {
                    vm.steps[i].state = "";
                }
            }
        };
        
        function next() {
            var index = getCurrentStep();
            if (index < vm.steps.length - 1) {
                vm.select(index + 1);
            }
            
        };
        
        function prev() {
            var index = getCurrentStep();
            if (index > 0) {
                vm.select(getCurrentStep() - 1);
            }
        };   
        
        function getCurrentStep() {
            for (var i in vm.steps) {
                if (vm.steps[i].state == "active") {
                    return parseInt(i);
                }
            }
            return null;
        }  
	}
})();
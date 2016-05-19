(function () {
	'use strict';
	angular
		.module('app')
		.component('taskCard', {
            templateUrl: 'app/components/card/task-card/task-card.html',
            controller: TaskCardComponent,
            controllerAs: "vm",
            bindings: {
                data: "<"
            }
        });

	TaskCardComponent.$inject = ["$interval", "taskService"];
    
	function TaskCardComponent($interval, taskService) {
		var vm = this;
        
        vm.icon = "play_arrow";
        vm.mode = "determinate";
        
        vm.interval = undefined;
        vm.value = 0;
        
        vm.toggleIcon = function() {
            vm.icon = vm.icon == "play_arrow" ? "pause" : "play_arrow";
            if (!vm.interval) {
                vm.interval = $interval(function() {
                    vm.value += Math.floor(10*Math.random() + 1);
                    if (vm.value >= 100) {
                        vm.value = 0;
                    }
                }, 200);
            }
            else {
                $interval.cancel(vm.interval);
                vm.interval = undefined;
            }
        }
	}
})();
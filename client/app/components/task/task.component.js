(function () {
	'use strict';
	angular
		.module('app')
		.component('task', {
            templateUrl: 'app/components/task/task.html',
            controller: TaskComponent,
            controllerAs: "vm",
            bindings: {
                infos: "<"
            }
        });

	TaskComponent.$inject = ["taskService"];
    
	function TaskComponent(taskService) {
		var vm = this;
        
        vm.createLink = function(){
            taskService.createLink(vm.infos).then(function(task) {
                console.log(task);
            });
        }
        
	}
})();
(function () {
	'use strict';
	angular
		.module('app')
		.component('experiences', {
        templateUrl: 'app/views/home/experiences/experiences.html',
        controller: ExperiencesComponent,
        controllerAs: "vm"
    });

	ExperiencesComponent.$inject = ["Experience"];

	function ExperiencesComponent(Experience) {
		var vm = this;

    vm.$onInit = function() {
        Experience.find({
          filter: {
            include: "type"
          }
        }).$promise.then(function(experiences) {
            vm.experiences = experiences;
            console.log(experiences);
        });
    }

  }
})();

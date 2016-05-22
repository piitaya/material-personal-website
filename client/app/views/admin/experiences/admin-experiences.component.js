(function () {
	'use strict';
	angular
		.module('app')
		.component('adminExperiences', {
        templateUrl: 'app/views/admin/experiences/admin-experiences.html',
        controller: AdminExperiencesComponent,
        controllerAs: "vm"
    });

	AdminExperiencesComponent.$inject = ["Experience", "ExperienceType", "$mdDialog", "$scope"];

	function AdminExperiencesComponent(Experience, ExperienceType, $mdDialog, $scope) {
		var vm = this;

    Experience.find({}).$promise.then(function(experiences) {
			angular.forEach(experiences, function(experience) {
					experience.startDate = new Date(experience.startDate);
					experience.endDate = new Date(experience.endDate);
			});
			vm.experiences = experiences;
    });

		vm.edit = function(event, index) {
			var experience = vm.experiences[index];
		  $mdDialog.show({
		    controller: DialogController,
				controllerAs: "vm",
		    templateUrl: 'app/views/admin/experiences/dialog-experience.html',
		    parent: angular.element(document.body),
		    targetEvent: event,
		    clickOutsideToClose:true,
		    fullscreen: true,
				locals: {
           experience: experience
         },
		  })
		  .then(function(editedExperience) {
			  console.log("save");
				vm.experiences[index] = angular.copy(editedExperience);
		  }, function() {
		    console.log("cancel")
		  });
		};

	}
})();

function DialogController($scope, $mdDialog, experience) {
	var vm = this;

	vm.experience = angular.copy(experience);

  vm.cancel = function() {
    $mdDialog.cancel();
  };
  vm.save = function() {
    $mdDialog.hide(vm.experience);
  };
}

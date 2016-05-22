(function () {
	'use strict';
	angular
		.module('app')
		.component('adminExperiences', {
        templateUrl: 'app/views/admin/experiences/admin-experiences.html',
        controller: AdminExperiencesComponent,
        controllerAs: "vm"
    });

	AdminExperiencesComponent.$inject = ["Experience", "ExperienceType", "$mdDialog", "$mdToast"];

	function AdminExperiencesComponent(Experience, ExperienceType, $mdDialog, $mdToast) {
		var vm = this;

    Experience.find({}).$promise.then(function(experiences) {
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
				vm.experiences[index] = angular.copy(editedExperience);
				vm.experiences[index].$save().then(function() {
					$mdToast.show($mdToast.simple().textContent("Experience mise à jour."));
				}).catch(function(err) {
					$mdToast.show($mdToast.simple().textContent("Erreur lors de la mise à jour de l'experience."));
				});
		  }, function() {
		  });
		};

	}
})();

function DialogController($mdDialog, experience) {
	var vm = this;

	vm.experience = angular.copy(experience);
	if (vm.experience.startDate) {
		vm.experience.startDate = new Date(vm.experience.startDate);
	}
	if (vm.experience.endDate) {
		vm.experience.endDate = new Date(vm.experience.endDate);
	}

	if (vm.experience)
  vm.cancel = function() {
    $mdDialog.cancel();
  };
  vm.save = function() {
		// Set endDate to null if experience is current experience
		if (vm.experience.isCurrent) {
			vm.experience.endDate = null;
		}
    $mdDialog.hide(vm.experience);
  };
}

(function () {
	'use strict';
	angular
		.module('app')
		.component('adminExperiences', {
        templateUrl: 'app/views/admin/experiences/admin-experiences.html',
        controller: AdminExperiencesComponent,
        controllerAs: "vm",
				bindings: {
					experiences: "<",
					types: "<"
				}
    });

	AdminExperiencesComponent.$inject = ["$mdDialog", "$mdToast", "Experience"];

	function AdminExperiencesComponent($mdDialog, $mdToast, Experience) {
		var vm = this;

		vm.typesMap = {};

		angular.forEach(vm.types,  function(type) {
			vm.typesMap[type.id] = type;
		});

		vm.edit = function(event, experience) {

			var index = vm.experiences.indexOf(experience);

		  $mdDialog.show({
		    controller: DialogController,
				controllerAs: "vm",
		    templateUrl: 'app/views/admin/experiences/dialog-experience.html',
		    parent: angular.element(document.body),
		    targetEvent: event,
		    clickOutsideToClose: true,
		    fullscreen: true,
				locals: {
           experience: experience,
					 types: vm.types
         },
		  })
		  .then(function(editedExperience) {
				editedExperience.$save().then(function(result) {
					$mdToast.show(
						$mdToast.simple()
							.textContent("Experience mise à jour.")
							.position("bottom right")
						);
						vm.experiences[index] = result;
				}).catch(function(err) {
					$mdToast.show(
						$mdToast.simple()
							.textContent("Erreur lors de la mise à jour de l'experience.")
							.position("bottom right")
					);
				});
		  }, function() {
		  });
		};

		vm.new = function(event) {
		  $mdDialog.show({
		    controller: DialogController,
				controllerAs: "vm",
		    templateUrl: 'app/views/admin/experiences/dialog-experience.html',
		    parent: angular.element(document.body),
		    targetEvent: event,
		    clickOutsideToClose: true,
		    fullscreen: true,
				locals: {
           experience: {},
					 types: vm.types
         },
		  })
		  .then(function(newExperience) {
				Experience.create(newExperience).$promise.then(function(result) {
					vm.experiences.push(result);
					$mdToast.show(
						$mdToast.simple()
							.textContent("Experience créée.")
							.position("bottom right")
						);
				}).catch(function(err) {
					$mdToast.show(
						$mdToast.simple()
							.textContent("Erreur lors de la création de l'experience.")
							.position("bottom right")
					);
				});
		  }, function() {
		  });
		};

		vm.delete = function(event, experience) {
			event.stopPropagation();

		  var confirm = $mdDialog.confirm()
        .title("Êtes-vous sûr de supprimer cette experience?")
        .textContent('Cette action est définitive.')
        .ariaLabel('Suppression experience')
        .targetEvent(event)
        .ok('Oui')
        .cancel('Non');
		  $mdDialog.show(confirm).then(function() {
				var index = vm.experiences.indexOf(experience);
	    	Experience.deleteById({id: experience.id}).$promise.then(function() {
				vm.experiences.splice(index, 1);
				$mdToast.show(
					$mdToast.simple()
						.textContent("Experience supprimée.")
						.position("bottom right")
					);
				}).catch(function(err) {
					$mdToast.show(
						$mdToast.simple()
							.textContent("Erreur lors de la suppression de l'experience.")
							.position("bottom right")
					);
				});
		  }, function() {
		  });
		}
	}
})();

function DialogController($mdDialog, experience, types) {
	var vm = this;

	vm.types = types;
	vm.experience = angular.copy(experience);
	if (vm.experience.startDate) {
		vm.experience.startDate = new Date(vm.experience.startDate);
	}
	if (vm.experience.endDate) {
		vm.experience.endDate = new Date(vm.experience.endDate);
	}
	vm.experience.isCurrent = vm.experience.isCurrent ? true : false;

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

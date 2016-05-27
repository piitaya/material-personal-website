(function () {
	'use strict';
	angular
		.module('app')
		.component('adminExperienceTypes', {
        templateUrl: 'app/views/admin/experience-types/admin-experience-types.html',
        controller: AdminExperienceTypesComponent,
        controllerAs: "vm",
				bindings: {
					types: "<"
				}
    });

	AdminExperienceTypesComponent.$inject = ["$mdDialog", "$mdToast", "ExperienceType"];

	function AdminExperienceTypesComponent($mdDialog, $mdToast, ExperienceType) {
		var vm = this;

		vm.edit = function(event, type) {

			var index = vm.types.indexOf(type);

			console.log(type);
		  $mdDialog.show({
		    controller: DialogController,
				controllerAs: "vm",
		    templateUrl: 'app/views/admin/experience-types/dialog-experience-type.html',
		    parent: angular.element(document.body),
		    targetEvent: event,
		    clickOutsideToClose: true,
		    fullscreen: true,
				locals: {
           type: type
         },
		  })
		  .then(function(editedType) {
				editedType.$save().then(function(result) {
					$mdToast.show(
						$mdToast.simple()
							.textContent("Type d'expérience mise à jour.")
							.position("bottom right")
						);
						vm.types[index] = result;
				}).catch(function(err) {
					$mdToast.show(
						$mdToast.simple()
							.textContent("Erreur lors de la mise à jour du type d'expérience.")
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
		    templateUrl: 'app/views/admin/experience-types/dialog-experience-type.html',
		    parent: angular.element(document.body),
		    targetEvent: event,
		    clickOutsideToClose: true,
		    fullscreen: true,
				locals: {
           type: {}
         },
		  })
		  .then(function(newType) {
				ExperienceType.create(newType).$promise.then(function(result) {
					vm.types.push(result);
					$mdToast.show(
						$mdToast.simple()
							.textContent("Type d'expérience créée.")
							.position("bottom right")
						);
				}).catch(function(err) {
					$mdToast.show(
						$mdToast.simple()
							.textContent("Erreur lors de la création du type d'expérience.")
							.position("bottom right")
					);
				});
		  }, function() {
		  });
		};

		vm.delete = function(event, type) {
			event.stopPropagation();

		  var confirm = $mdDialog.confirm()
        .title("Êtes-vous sûr de supprimer ce type d'expérience?")
        .textContent('Cette action est définitive.')
        .ariaLabel("Suppression de type d'expérience")
        .targetEvent(event)
        .ok('Oui')
        .cancel('Non');
		  $mdDialog.show(confirm).then(function() {
				var index = vm.types.indexOf(type);
	    	ExperienceType.deleteById({id: type.id}).$promise.then(function() {
				vm.types.splice(index, 1);
				$mdToast.show(
					$mdToast.simple()
						.textContent("Type d'expérience supprimée.")
						.position("bottom right")
					);
				}).catch(function(err) {
					$mdToast.show(
						$mdToast.simple()
							.textContent("Erreur lors de la suppression du type d'expérience.")
							.position("bottom right")
					);
				});
		  }, function() {
		  });
		}
	}

	function DialogController($mdDialog, type) {
		var vm = this;

		vm.type = angular.copy(type);

		if (!vm.type.style) {
			vm.type.style = {};
		}

	  vm.cancel = function() {
	    $mdDialog.cancel();
	  };
	  vm.save = function() {
	    $mdDialog.hide(vm.type);
	  };
	}
})();

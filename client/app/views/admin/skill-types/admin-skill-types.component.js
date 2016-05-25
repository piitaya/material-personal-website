(function () {
	'use strict';
	angular
		.module('app')
		.component('adminSkillTypes', {
        templateUrl: 'app/views/admin/skill-types/admin-skill-types.html',
        controller: AdminSkillTypesComponent,
        controllerAs: "vm",
				bindings: {
					types: "<"
				}
    });

	AdminSkillTypesComponent.$inject = ["$mdDialog", "$mdToast", "SkillType"];

	function AdminSkillTypesComponent($mdDialog, $mdToast, SkillType) {
		var vm = this;

		vm.edit = function(event, type) {

			var index = vm.types.indexOf(type);

			console.log(type);
		  $mdDialog.show({
		    controller: DialogController,
				controllerAs: "vm",
		    templateUrl: 'app/views/admin/skill-types/dialog-skill-type.html',
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
							.textContent("Type de compétence mise à jour.")
							.position("bottom right")
						);
						vm.types[index] = result;
				}).catch(function(err) {
					$mdToast.show(
						$mdToast.simple()
							.textContent("Erreur lors de la mise à jour du type de compétence.")
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
		    templateUrl: 'app/views/admin/skill-types/dialog-skill-type.html',
		    parent: angular.element(document.body),
		    targetEvent: event,
		    clickOutsideToClose: true,
		    fullscreen: true,
				locals: {
           type: {}
         },
		  })
		  .then(function(newType) {
				SkillType.create(newType).$promise.then(function(result) {
					vm.types.push(result);
					$mdToast.show(
						$mdToast.simple()
							.textContent("Type de compétence créée.")
							.position("bottom right")
						);
				}).catch(function(err) {
					$mdToast.show(
						$mdToast.simple()
							.textContent("Erreur lors de la création du type de compétence.")
							.position("bottom right")
					);
				});
		  }, function() {
		  });
		};

		vm.delete = function(event, type) {
			event.stopPropagation();

		  var confirm = $mdDialog.confirm()
        .title("Êtes-vous sûr de supprimer ce type de compétence?")
        .textContent('Cette action est définitive.')
        .ariaLabel("Suppression de type de compétence")
        .targetEvent(event)
        .ok('Oui')
        .cancel('Non');
		  $mdDialog.show(confirm).then(function() {
				var index = vm.types.indexOf(type);
	    	SkillType.deleteById({id: type.id}).$promise.then(function() {
				vm.types.splice(index, 1);
				$mdToast.show(
					$mdToast.simple()
						.textContent("Type de compétence supprimée.")
						.position("bottom right")
					);
				}).catch(function(err) {
					$mdToast.show(
						$mdToast.simple()
							.textContent("Erreur lors de la suppression du type de compétence.")
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

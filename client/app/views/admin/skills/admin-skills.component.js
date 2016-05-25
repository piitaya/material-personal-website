(function () {
	'use strict';
	angular
		.module('app')
		.component('adminSkills', {
        templateUrl: 'app/views/admin/skills/admin-skills.html',
        controller: AdminSkillsComponent,
        controllerAs: "vm",
				bindings: {
					skills: "<",
					types: "<"
				}
    });

	AdminSkillsComponent.$inject = ["$mdDialog", "$mdToast", "Skill"];

	function AdminSkillsComponent($mdDialog, $mdToast, Skill) {
		var vm = this;

		vm.typesMap = {};

		angular.forEach(vm.types,  function(type) {
			vm.typesMap[type.id] = type;
		});

		vm.edit = function(event, skill) {

			var index = vm.skills.indexOf(skill);

		  $mdDialog.show({
		    controller: DialogController,
				controllerAs: "vm",
		    templateUrl: 'app/views/admin/skills/dialog-skill.html',
		    parent: angular.element(document.body),
		    targetEvent: event,
		    clickOutsideToClose: true,
		    fullscreen: true,
				locals: {
           skill: skill,
					 types: vm.types
         },
		  })
		  .then(function(editedSkill) {
				editedSkill.$save().then(function(result) {
					$mdToast.show(
						$mdToast.simple()
							.textContent("Compétence mise à jour.")
							.position("bottom right")
						);
						vm.skills[index] = result;
				}).catch(function(err) {
					$mdToast.show(
						$mdToast.simple()
							.textContent("Erreur lors de la mise à jour de la compétence.")
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
		    templateUrl: 'app/views/admin/skills/dialog-skill.html',
		    parent: angular.element(document.body),
		    targetEvent: event,
		    clickOutsideToClose: true,
		    fullscreen: true,
				locals: {
           skill: {},
					 types: vm.types
         },
		  })
		  .then(function(newSkill) {
				Skill.create(newSkill).$promise.then(function(result) {
					vm.skills.push(result);
					$mdToast.show(
						$mdToast.simple()
							.textContent("Skill créée.")
							.position("bottom right")
						);
				}).catch(function(err) {
					$mdToast.show(
						$mdToast.simple()
							.textContent("Erreur lors de la création de la compétence.")
							.position("bottom right")
					);
				});
		  }, function() {
		  });
		};

		vm.delete = function(event, skill) {
			event.stopPropagation();

		  var confirm = $mdDialog.confirm()
        .title("Êtes-vous sûr de supprimer cette compétence?")
        .textContent('Cette action est définitive.')
        .ariaLabel('Suppression skill')
        .targetEvent(event)
        .ok('Oui')
        .cancel('Non');
		  $mdDialog.show(confirm).then(function() {
				var index = vm.skills.indexOf(skill);
	    	Skill.deleteById({id: skill.id}).$promise.then(function() {
				vm.skills.splice(index, 1);
				$mdToast.show(
					$mdToast.simple()
						.textContent("Skill supprimée.")
						.position("bottom right")
					);
				}).catch(function(err) {
					$mdToast.show(
						$mdToast.simple()
							.textContent("Erreur lors de la suppression de la compétence.")
							.position("bottom right")
					);
				});
		  }, function() {
		  });
		}
	}

	function DialogController($mdDialog, skill, types) {
		var vm = this;

		vm.types = types;
		vm.skill = angular.copy(skill);

	  vm.cancel = function() {
	    $mdDialog.cancel();
	  };
	  vm.save = function() {
			// Set endDate to null if skill is current skill
			if (vm.skill.isCurrent) {
				vm.skill.endDate = null;
			}
	    $mdDialog.hide(vm.skill);
	  };
	}
})();

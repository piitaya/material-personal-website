(function () {
	'use strict';
	angular
		.module('app.controllers')
		.controller('SkillAdminController', SkillAdminController);

	SkillAdminController.$inject = ['skillService', 'skillTypeService'];

	function SkillAdminController(skillService, skillTypeService) {
		var vm = this;
		
		vm.skills = [];
		vm.types = [];
		vm.newSkill = {};
		vm.create = create;
		vm.update = update;
		vm.remove = remove;
		vm.getSliderColor = getSliderColor;
		vm.icons = {};
		vm.getIcon = getIcon;

		activate();

		function activate() {
			skillService.query().$promise.then(function(skills) {
				vm.skills = skills;
			});
			skillTypeService.query().$promise.then(function(types) {
				vm.types = types;

				types.forEach(function(type) {
					vm.icons[type._id] = {icon: type.icon};
				});
			});
		}

		function create() {
			skillService.save(vm.newSkill).$promise.then(function(skill) {
				vm.skills.push(skill);
				vm.newSkill = {};
				$("#new-skill-form").removeClass("active");
				console.log("Skill created");
			});
		}

		function update(skill) {
			skillService.get({id: skill._id }).$promise.then(function() {
				return skillService.update({id: skill._id}, skill).$promise;
			}).then(function() {
				console.log("Skill updated");
			});
		}

		function remove(skill) {
			skillService.remove({id: skill._id}).$promise.then(function() {
				var skillIndex = vm.skills.indexOf(skill);
				vm.skills.splice(skillIndex, 1);
				console.log("Skill removed");
			});
			
		}

		function getSliderColor(power) {
			if (power <= 20) {
				return "slider-red";
			}
			else if (power <= 50) {
				return "slider-orange";
			}
			else if (power <= 100) {
				return "slider-green";
			}
			else {
				return "slider-red";
			}
		}

		function getIcon(typeId) {
			var icon = vm.icons[typeId];
			return icon ? icon.icon : "";
		}
	}
})();
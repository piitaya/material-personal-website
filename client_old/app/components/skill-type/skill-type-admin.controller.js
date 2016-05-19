(function () {
	'use strict';
	angular
		.module('app.controllers')
		.controller('SkillTypeAdminController', SkillTypeAdminController);

	SkillTypeAdminController.$inject = ['skillTypeService'];

	function SkillTypeAdminController(skillTypeService) {
		var vm = this;
		
		vm.skillTypes = [];
		vm.newSkillType = {};
		vm.create = create;
		vm.update = update;
		vm.remove = remove;

		activate();

		function activate() {
			vm.skillTypes = skillTypeService.query();
		}

		function create() {
			skillTypeService.save(vm.newSkillType).$promise.then(function(skillType) {
				vm.skillTypes.push(skillType);
				vm.newSkillType = {};
				$("#new-skill-type-form").removeClass("active");
				console.log("Skill Type created");
			});
		}

		function update(skillType) {
			skillTypeService.get({id: skillType._id }).$promise.then(function() {
				return skillTypeService.update({id: skillType._id}, skillType).$promise;
			}).then(function() {
				console.log("Skill Type updated");
			});
		}

		function remove(skillType) {
			skillTypeService.remove({id: skillType._id}).$promise.then(function() {
				var skillTypeIndex = vm.skillTypes.indexOf(skillType);
				vm.skillTypes.splice(skillTypeIndex, 1);
				console.log("Skill Type removed");
			});
			
		}
	}
})();
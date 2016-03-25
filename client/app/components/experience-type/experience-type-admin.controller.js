(function () {
	'use strict';
	angular
		.module('app.controllers')
		.controller('ExperienceTypeAdminController', ExperienceTypeAdminController);

	ExperienceTypeAdminController.$inject = ['experienceTypeService'];

	function ExperienceTypeAdminController(experienceTypeService) {
		var vm = this;
		
		vm.experienceTypes = [];
		vm.newExperienceType = {};
		vm.create = create;
		vm.update = update;
		vm.remove = remove;

		activate();

		function activate() {
			vm.experienceTypes = experienceTypeService.query();
		}

		function create() {
			experienceTypeService.save(vm.newExperienceType).$promise.then(function(experienceType) {
				vm.experienceTypes.push(experienceType);
				vm.newExperienceType = {};
				$("#new-experience-type-form").removeClass("active");
				console.log("Experience Type created");
			});
		}

		function update(experienceType) {
			experienceTypeService.get({id: experienceType._id }).$promise.then(function() {
				return experienceTypeService.update({id: experienceType._id}, experienceType).$promise;
			}).then(function() {
				console.log("Experience Type updated");
			});
		}

		function remove(experienceType) {
			experienceTypeService.remove({id: experienceType._id}).$promise.then(function() {
				var experienceTypeIndex = vm.experienceTypes.indexOf(experienceType);
				vm.experienceTypes.splice(experienceTypeIndex, 1);
				console.log("Experience Type removed");
			});
			
		}
	}
})();
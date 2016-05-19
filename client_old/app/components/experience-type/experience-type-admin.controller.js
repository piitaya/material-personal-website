(function () {
	'use strict';
	angular
		.module('app.controllers')
		.controller('ExperienceTypeAdminController', ExperienceTypeAdminController);

	ExperienceTypeAdminController.$inject = ['ExperienceType'];

	function ExperienceTypeAdminController(ExperienceType) {
		var vm = this;
		
		vm.experienceTypes = [];
		vm.newExperienceType = {};
		vm.create = create;
		vm.update = update;
		vm.remove = remove;

		activate();

		function activate() {
			vm.experienceTypes = ExperienceType.find();
		}

		function create() {
			ExperienceType.create(vm.newExperienceType).$promise.then(function(experienceType) {
				vm.experienceTypes.push(experienceType);
				vm.newExperienceType = {};
				$("#new-experience-type-form").removeClass("active");
				console.log("Experience Type created");
			});
		}

		function update(experienceType) {
            ExperienceType.prototype$updateAttributes(experienceType).$promise.then(function() {
				console.log("Experience Type updated");
			});
		}

		function remove(experienceType) {
            ExperienceType.deleteById({ id: experienceType.id }).$promise.then(function() {
			    var experienceTypeIndex = vm.experienceTypes.indexOf(experienceType);
                vm.experienceTypes.splice(experienceTypeIndex, 1);
			    console.log("Experience Type removed");
			});		
		}
	}
})();
(function () {
	'use strict';
	angular
		.module('app.controllers')
		.controller('ExperienceAdminController', ExperienceAdminController);

	ExperienceAdminController.$inject = ['Experience', 'ExperienceType', 'dateService'];

	function ExperienceAdminController(Experience, ExperienceType, dateService) {
		var vm = this;
		
		vm.experiences = [];
		vm.newExperience = { isCurrent: false };
		vm.create = create;
		vm.update = update;
		vm.remove = remove;
		vm.duration = duration;
		vm.icons = {};
		vm.getIcon = getIcon;

		activate();

		function activate() {
			Experience.find().$promise.then(function(experiences) {
				vm.experiences = experiences;
			});
			ExperienceType.find().$promise.then(function(types) {
				vm.types = types;

				types.forEach(function(type) {
					vm.icons[type.id] = {icon: type.icon};
				});
			});
		}

		function create() {
			vm.newExperience.startDate = dateService.getDate(vm.newExperience.startDate);
			vm.newExperience.endDate = dateService.getDate(vm.newExperience.endDate);
			Experience.create(vm.newExperience).$promise.then(function(experience) {
				vm.experiences.push(experience);
				vm.newExperience = { isCurrent: false };
				$("#new-experience-form").removeClass("active");
				console.log("Experience created");
			});
		}

		function update(experience) {
			experience.startDate = dateService.getDate(experience.startDate);
			experience.endDate = dateService.getDate(experience.endDate);
			Experience.prototype$updateAttributes(experience).$promise.then(function() {
				console.log("Experience updated");
			});
		}

		function remove(experience) {
			Experience.deleteById({id: experience._id}).$promise.then(function() {
				var experienceIndex = vm.experiences.indexOf(experience);
				vm.experiences.splice(experienceIndex, 1);
				console.log("Experience removed");
			});
			
		}

		function duration(startDate, endDate, isCurrent) {
			var start = dateService.getDate(startDate);
			var end = isCurrent ? new Date() : dateService.getDate(endDate);
			
			if (start && end) {
				return "(" + dateService.getDuration(start, end) + ")";
			}
			else {
				return "";
			}
		}

		function getIcon(typeId) {
			var icon = vm.icons[typeId];
			return icon ? icon.icon : "";
		}
	}
})();
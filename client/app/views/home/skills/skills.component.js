(function () {
	'use strict';
	angular
		.module('app')
		.component('skills', {
        templateUrl: 'app/views/home/skills/skills.html',
        controller: SkillsComponent,
        controllerAs: "vm"
    });

	SkillsComponent.$inject = ["SkillType"];

	function SkillsComponent(SkillType) {
		var vm = this;

    vm.$onInit = function() {
        SkillType.find({
          filter: {
            include: "skills"
          }
        }).$promise.then(function(types) {
            vm.types = types;
            console.log(types);
        });
    }

  }
})();

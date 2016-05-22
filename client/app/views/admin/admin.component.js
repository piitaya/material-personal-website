(function () {
	'use strict';
	angular
		.module('app')
		.component('admin', {
        templateUrl: 'app/views/admin/admin.html',
        controller: AdminComponent,
        controllerAs: "vm"
    });

	AdminComponent.$inject = [];

	function AdminComponent() {
		var vm = this;

		console.log("admin");

	}
})();

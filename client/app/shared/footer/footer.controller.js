(function () {
	'use strict';
	angular
		.module('app.controllers')
		.controller('FooterController', FooterController);

	FooterController.$inject = [];

	function FooterController() {
		var vm = this;
		vm.contact = {};

		vm.submit = submit;

		function submit() {
			console.log(vm.contact.email);
			console.log(vm.contact.subject);
			console.log(vm.contact.message);
		}
	}
})();
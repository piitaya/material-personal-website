(function () {
	'use strict';
	angular
		.module('app.controllers')
		.controller('CommonController', CommonController);

	CommonController.$inject = [];

	function CommonController() {
		var vm = this;
	}
})();
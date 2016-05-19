(function () {
	'use strict';
	angular
		.module('app.services')
		.factory('homeService', homeService);

	homeService.$inject = [];

	function homeService() {
		var service = {
			getElements: getElements
		};

		return service;

		////////////

		function getElements() {
			var elements = [{
				icon: 'mdi-image-filter-drama',
				title: 'First',
				content: 'Lorem ipsum dolor sit amet.'
			},{
				icon: 'mdi-maps-place',
				title: 'Second',
				content: 'Lorem ipsum dolor sit amet.'
			},{
				icon: 'mdi-social-whatshot',
				title: 'Third',
				content: 'Lorem ipsum dolor sit amet.'
			}];
			return elements;
		}
	}
})();
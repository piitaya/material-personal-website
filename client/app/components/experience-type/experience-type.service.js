(function () {
	'use strict';
	angular
		.module('app.services')
		.factory('experienceTypeService', experienceTypeService);

	experienceTypeService.$inject = ['$resource'];

	function experienceTypeService($resource) {
		return $resource('/api/admin/experience-types/:id', { id: '@_id' }, {
			update: {
				method: 'PUT' // this method issues a PUT request
			}
		});
	}
})();
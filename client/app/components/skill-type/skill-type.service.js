(function () {
	'use strict';
	angular
		.module('app.services')
		.factory('skillTypeService', skillTypeService);

	skillTypeService.$inject = ['$resource'];

	function skillTypeService($resource) {
		return $resource('/api/admin/skill-types/:id', { id: '@_id' }, {
			update: {
				method: 'PUT' // this method issues a PUT request
			}
		});
	}
})();
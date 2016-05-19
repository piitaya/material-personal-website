(function () {
	'use strict';
	angular
		.module('app.services')
		.factory('skillService', skillService);

	skillService.$inject = ['$resource'];

	function skillService($resource) {
		return $resource('/api/admin/skills/:id', { id: '@_id' }, {
			update: {
				method: 'PUT' // this method issues a PUT request
			}
		});
	}
})();
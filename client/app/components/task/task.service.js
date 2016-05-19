(function () {
	'use strict';
	angular
		.module('app')
		.service('taskService', taskService);

	taskService.$inject = ['$http'];

	function taskService($http) {
		var service = {
            getAll: getAll,
            createLink: createLink,
        };
        
        return service;
        
        function getAll(query, type) {
            return $http({
                method: "GET",
                url: "http://localhost:3000/api/tasks/"
            }).then(function(result) {return result.data});
        }
        
        function createLink(infos) {
            return $http({
                method: 'POST',
                url: 'http://localhost:3000/api/tasks/link',
                data: infos
            }).then(function(result) {return result.data});
        }
	}
})();
(function () {
	'use strict';
	angular
		.module('app')
		.service('mediaService', mediaService);

	mediaService.$inject = ['$http'];

	function mediaService($http) {
		var service = {
            search: search,
            getMovie: getMovie,
            getShow: getShow,
            getShowSeasons: getShowSeasons,
            getShowSeason: getShowSeason
        };
        
        return service;
        
        function search(query, type) {
            return $http({
                method: "GET",
                url: "http://localhost:3000/api/search/",
                params: {
                    query: query,
                    type: type
                }
            }).then(function(result) {return result.data});
        }
        
        function getMovie(slug) {
            return $http({
                method: "GET",
                url: "http://localhost:3000/api/movies/" + slug
            }).then(function(result) {return result.data});
        }
        
        function getShow(slug) {
            return $http({
                method: "GET",
                url: "http://localhost:3000/api/shows/" + slug
            }).then(function(result) {return result.data});
        }
        
        function getShowSeasons(slug) {
            return $http({
                method: "GET",
                url: "http://localhost:3000/api/shows/" + slug + "/seasons"
            }).then(function(result) {return result.data});
        }
        
        function getShowSeason(slug, season_number) {
            return $http({
                method: "GET",
                url: "http://localhost:3000/api/shows/" + slug + "/seasons/" + season_number
            }).then(function(result) {return result.data});
        }
	}
})();
(function () {
	'use strict';
	angular
		.module('app.services')
		.directive('sideNav', sideNav);

	function sideNav() {
		var directive = {
	        link: link,
	        restrict: 'EA'
	    };

	    return directive;

	    function link(scope, element, attrs) {
	    	element.sideNav();

	    	angular.element($(".side-nav a")).bind('click', function() {
	    		element.sideNav('hide');
	    	});
	    }
	}
})();
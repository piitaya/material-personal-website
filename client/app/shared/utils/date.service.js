(function () {
	'use strict';
	angular
		.module('app.services')
		.factory('dateService', dateService);

	dateService.$inject = [];

	function dateService() {
		var service = {
			getDate: getDate,
			getDuration: getDuration
		};

		return service;

		////////////

		function getDate(date) {
			if (!date || date === "") {
				return undefined;
			}
			else if (typeof date === 'string' && date.indexOf("/") > -1) {
				return moment(date, 'DD/MM/YYYY').toDate();
			}
			else {
				return moment(date).toDate();
			}
			
		}

		function getDuration(start, end) {
			if (start && end) {
				start = moment(start);
				end = moment(end);
				var months = end.diff(start, 'months') + 1;
				return moment.duration(months, 'months').humanize();
			}
			else {
				return "";
			}
		}
	}
})();
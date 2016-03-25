(function () {
	'use strict';
	angular
		.module('app', [
			'ngAnimate',
			'ngResource',
			'ui.router',
			'ui.materialize',
			'nouislider',
            'lbServices',
			'duScroll',
			'app.controllers',
			'app.filters',
			'app.services',
			'app.directives'
		]);

	/* Controllers */
	angular
		.module('app.controllers', []);

	/* Filters */
	angular
		.module('app.filters', []);

	/* Services */
	angular
		.module('app.services', []);

	/* Directives */
	angular
		.module('app.directives', []);
})();

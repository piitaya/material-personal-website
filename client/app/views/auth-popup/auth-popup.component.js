(function () {
	'use strict';
	angular
		.module('app')
		.component('authPopup', {
            templateUrl: 'app/views/auth-popup/auth-popup.html',
            controller: AuthPopupComponent,
            controllerAs: "vm"
        });

	AuthPopupComponent.$inject = ['$window', "$stateParams"];

	function AuthPopupComponent($window, $stateParams) {
		var vm = this;
        
        vm.success = false;
        if ($stateParams.state == 'success') {
            vm.success = true;
        }
        $window.onbeforeunload = function() {
            $window.opener.authCallback(vm.success); 
        };
        $window.close();
	}
})();
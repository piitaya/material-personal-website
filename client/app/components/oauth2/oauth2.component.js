(function () {
	'use strict';
	angular
		.module('app')
		.component('oauth2', {
            templateUrl: 'app/components/oauth2/oauth2.html',
            controller: Oauth2Component,
            controllerAs: "vm",
            bindings: {
                service: "@",
                data: "=",
            }
        });

	Oauth2Component.$inject = ["$scope", "$window", "$http", "store"];;
    
	function Oauth2Component($scope, $window, $http, store) {
		var vm = this;
		
		vm.linkAccount = linkAccount;
        vm.delinkAccount = delinkAccount;
        vm.data = {
            state: "disconnected",
            profile: {
                id: undefined,
                username: undefined
            }
        };
        
		function linkAccount() {
			var url = 'http://localhost:3000/auth/' + vm.service + '?token=' + store.get("token") + "&redirect=" + encodeURIComponent("http://localhost:8181/#/auth");
			var newWindow = $window.open(url, 'name', 'height=600,width=450');
			if ($window.focus) {
				newWindow.focus();
			}
            vm.data.state = "waiting";
            $window.authCallback = function(success) {
                if (success) {
                    vm.data.state = "connected";
                    vm.data.profile = {};
                }
                else {
                    vm.data.state = "disconnected";
                    vm.data.profile = {};
                }
                $scope.$apply();
            };
		}
        
        function delinkAccount() {
			vm.data.state = "waiting";
            setTimeout(function() {
                vm.data.state = "disconnected";
                $scope.$apply();
            }, 2000);
		} 
	}
})();
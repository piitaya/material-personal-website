(function () {
	'use strict';
	angular
		.module('app')
		.component('login', {
            templateUrl: 'app/views/login/login.html',
            controller: LoginComponent,
            controllerAs: "vm"
        });

	LoginComponent.$inject = ['auth', 'loginService', "$state"];

	function LoginComponent(auth, loginService, $state) {
		var vm = this;

		vm.reset = reset;
		vm.login = login;
		vm.logout = logout;

		vm.email = '';
		vm.password = '';

		vm.showPassword = false;
		
		vm.isAuth = loginService.isAuthenticated;
		function reset() {
			auth.reset({
				email: 'hello@bye.com',
				password: 'hello',
				connection: 'Username-Password-Authentication'
			});
		}

		function login() {
			console.log("loading...");
			loginService.login(vm.email, vm.password).then(function(response) {
				console.log("logged !");
				$state.go("main.downloads")
			}).catch(function(error) {
				console.log("error: "+ error);
			});
		}
		
		function logout() {
			console.log("loading...");
			loginService.logout().then(function(response) {
				console.log("loggout !");
			}).catch(function(error) {
				console.log("error: "+ error);
			});
		}
	}
})();
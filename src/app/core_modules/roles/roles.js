"use strict";

(function(){
	var module = angular.module('app.roles', ['app', 'ngRoute']);

	module.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
		$routeProvider.when('/roles', {
			templateUrl :'/src/app/core_modules/roles/templates/roles.html',
			controller: 'rolesController'
		});
		$locationProvider.html5Mode(true);
	}]);
})();
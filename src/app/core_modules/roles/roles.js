"use strict";

(function(){
	var module = angular.module('app.roles', ['app', 'ngRoute', 'app.common']);

	module.config(['$routeProvider', '$locationProvider', 'storageProvider', function ($routeProvider, $locationProvider, storageProvider) {
		$routeProvider.when('/roles', {
			templateUrl :'/src/app/core_modules/roles/templates/roles.html',
			controller: 'rolesController'
		});
		$locationProvider.html5Mode(true);
	}]);
})();
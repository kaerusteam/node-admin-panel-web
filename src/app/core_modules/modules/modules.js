"use strict";

(function(){
	var module = angular.module('app.modules', ['app', 'ngRoute', 'app.datatable']);

	module.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
		$routeProvider.when('/modules', {
			templateUrl :'/src/app/core_modules/modules/templates/modules.html',
			controller: 'modulesController'
		});
		$locationProvider.html5Mode(true);
	}]);
})();
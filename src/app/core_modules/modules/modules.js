"use strict";

(function(){
	var module = angular.module('app.modules', ['app', 'ngRoute', 'app.datatable', 'app.common']);

	module.config(['$routeProvider', '$locationProvider', 'storageProvider', function ($routeProvider, $locationProvider, storageProvider) {
		$routeProvider.when('/modules', {
			templateUrl :'/src/app/core_modules/modules/templates/modules.html',
			controller: 'modulesController'
		});
		$locationProvider.html5Mode(true);
	}]);
})();
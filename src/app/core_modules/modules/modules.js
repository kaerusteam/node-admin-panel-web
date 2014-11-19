"use strict";

(function(){
	var module = angular.module('app.modules', ['app', 'ngRoute', 'pascalprecht.translate', 'app.datatable']);

	module.config(['$routeProvider', '$locationProvider', '$translateProvider', function ($routeProvider, $locationProvider, $translateProvider) {
		console.log($translateProvider, $routeProvider)

		$translateProvider.preferredLanguage('ru');

		$routeProvider.when('/modules', {
			templateUrl :'/src/app/core_modules/modules/templates/modules.html',
			controller: 'modulesController'
		});
		$locationProvider.html5Mode(true);
	}]);
})();
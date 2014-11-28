"use strict";

(function(){
	var module = angular.module('moduleTemplate', ['app', 'ngRoute']);

	module.config(['$routeProvider', '$locationProvider', '$controllerProvider', function ($routeProvider, $locationProvider) {
		$routeProvider.when('/module_template', {
			templateUrl :'/src/app/user_modules/module_template/templates/module-template.html',
			controller: 'moduleTemplateController'
		});
		$locationProvider.html5Mode(true);
	}]);
})();
"use strict";

(function(){
	var module = angular.module('moduleTemplate', ['app', 'ngRoute']);

	module.config(['$routeProvider', '$locationProvider', '$controllerProvider', function ($routeProvider, $locationProvider) {
		$routeProvider.when('/module_template', {
			templateUrl :'/app/user_modules/module_template/module-template.html',
			controller: 'moduleTemplateController'
		});
		$locationProvider.html5Mode(true);
	}]);
})();
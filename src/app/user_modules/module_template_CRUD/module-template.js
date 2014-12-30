"use strict";

(function(){
	var module = angular.module('moduleTemplateCrud', ['app', 'ngRoute', 'ui.bootstrap', 'ngMaterial']);

	module.config(['$routeProvider', '$locationProvider', '$controllerProvider', function ($routeProvider, $locationProvider) {
		$routeProvider.when('/module_template_CRUD', {
			templateUrl :'/src/app/user_modules/module_template_CRUD/templates/module-template.html',
			controller: 'moduleTemplateCrudController'
		});
		$locationProvider.html5Mode(true);
	}]);
})();
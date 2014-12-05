"use strict";

(function(){
	var module = angular.module('testTreeView', ['app', 'ngRoute']);

	module.config(['$routeProvider', '$locationProvider', '$controllerProvider', function ($routeProvider, $locationProvider) {
		$routeProvider.when('/test_tree_view', {
			templateUrl :'/src/app/user_modules/test_tree_view/templates/tree-view.html',
			controller: 'testTreeViewController'
		});
		$locationProvider.html5Mode(true);
	}]);
})();
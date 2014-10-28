"use strict";

(function(){
	angular.module('moduleTemplate', ['app']);

	angular.module('moduleTemplate').controller('moduleTemplateController', ['$scope', 'serverAPI', function($scope, serverAPI) {
		console.log('init module template');
	}]);
})();
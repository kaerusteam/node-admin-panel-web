"use strict";

(function(){
	angular.module("app.modules").controller("modulesController", ["$scope", "serverAPI", "datatableService", function($scope, serverAPI, datatableService) {
		$scope.authTypes = [
			{
				name: "simple",
				description: "Simple auth (password)"
			},{
				name: "basic",
				description: "Basic auth (login+password)"
			},{
				name: "social",
				description: "Social network auth"
			},{
				name: "2-step",
				description: "2-step auth (login+password, sms code)"
			}
		];

		$scope.modulesTable = datatableService.createTable({url: "/modules/get"});

		console.log('init modules module');
	}]);
})();
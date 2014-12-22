"use strict";

(function(){
	angular.module("app.roles").controller("rolesController", ["$scope", "serverAPI", "storage", function($scope, serverAPI, storage) {		
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
		storage.setPrefix("roles");
		console.log('init roles module');
	}]);
})();
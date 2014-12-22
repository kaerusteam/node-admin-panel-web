"use strict";

(function(){
	angular.module("app.modules").controller("modulesController", ["$scope", "serverAPI", "datatableService", "storage", function($scope, serverAPI, datatableService, storage) {
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
		$scope.masterDataTable = datatableService.createTable({pagination: true, count:2});
		$scope.masterDataTable.refresh([{name: "roles"}, {name: "groups"}, {name: "users"}, {name: "users2"}, {name: "users3"}, {name: "users4"}, {name: "users5"}, {name: "roles"}, {name: "groups"}, {name: "users"}, {name: "users2"}, {name: "users3"}, {name: "users4"}, {name: "roles"}, {name: "groups"}, {name: "users"}, {name: "users2"}, {name: "users3"}, {name: "users4"}, {name: "roles"}, {name: "groups"}, {name: "users"}, {name: "users2"}, {name: "users3"}, {name: "users4"}, {name: "roles"}, {name: "groups"}, {name: "users"}, {name: "users2"}, {name: "users3"}, {name: "users4"}]);
		$scope.refresh = function(){
			$scope.modulesTable.refresh();
		}
		storage.setPrefix("modules");
		console.log('init modules module', $scope.masterDataTable);
	}]);
})();
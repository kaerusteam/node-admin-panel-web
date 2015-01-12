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

		// $scope.modulesTable = datatableService.createTable({url: "/modules/get"});
		$scope.masterDataTable = datatableService.createTable({pagination: true, limit:10});
		
		// $scope.masterDataTable = datatableService.createTable({url: "/audit/readList", pagination: true, limit:10});
		// $scope.masterDataTable.setColumns([{caption: "ID", field: "_id"}, {caption: "Время изменения", field: "timeChange"}, {caption: "Тип модификации", field: "modifiedType"}, {caption: "Изменёное поле", field: "modifiedField"}]);
		// {"_id":"5497cfa4336bbdd316be2053","timeChange":1412150964671,"changerName":"Ворон","changerId":14,"modifiedType":"Заказчик","modifiedId":5,"modifiedField":"deposit","modifiedOldValue":2247397,"modifiedNewValue":2247007,"auditId":1098}

		$scope.masterDataTable.setColumns([{caption: "Master data", field: "name"}, {caption: "Master data2", field: "name2"}]);
		$scope.masterDataTable.refresh([{name: "roles", name2: "roles"}, {name: "groups", name2: "1"}, {name: "users", name2: "1"}, {name: "users2", name2: "1"}, {name: "users3", name2: "1"}, {name: "users4", name2: "1"}, {name: "users5", name2: "2"}, {name: "roles", name2: "2"}, {name: "groups", name2: "2"}, {name: "users", name2: "2"}, {name: "users2", name2: "2"}, {name: "users3", name2: "2"}, {name: "users4", name2: "3"}, {name: "roles", name2: "3"}, {name: "groups", name2: "3"}, {name: "users", name2: "3"}, {name: "users2", name2: "3"}, {name: "users3", name2: "3"}, {name: "users4", name2: "3"}, {name: "roles", name2: "3"}, {name: "groups", name2: "3"}, {name: "users", name2: "3"}, {name: "users2", name2: "3"}, {name: "users3", name2: "3"}, {name: "users4", name2: "3"}, {name: "roles", name2: "3"}, {name: "groups", name2: "3"}, {name: "users", name2: "2"}, {name: "users2", name2: "2"}, {name: "users3", name2: "2"}, {name: "users4", name2: "2"}]);
		console.log($scope.masterDataTable)
		$scope.refresh = function(){
			$scope.modulesTable.refresh();
		}
		storage.setPrefix("modules");
		console.log('init modules module', $scope.masterDataTable);
	}]);
})();
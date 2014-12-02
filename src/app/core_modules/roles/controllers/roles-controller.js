"use strict";

(function(){
	angular.module("app.roles").controller("rolesController", ["$scope", "serverAPI", function($scope, serverAPI) {
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

		console.log('init roles module');

		$scope.action = function(object){
			console.log(object.description);
		}

		$scope.list = [{title: 'asda', handler : $scope.action, items : [{title: "нееще", items : [{title : "ненет"}]}]},
						{title: 'пора', iconClass : "glyphicon-refresh", items :[{title: "еще", items : [{title : "дада"}]}]}];
	}]);
})();
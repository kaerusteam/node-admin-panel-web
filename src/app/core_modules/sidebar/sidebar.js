"use strict";

(function(){
	angular.module('app.sidebar', ['app']);

	angular.module('app.sidebar').controller('sidebar', ['$scope', 'serverAPI', 'sidebarService', function($scope, sidebarService, serverAPI) {
		$scope.sidebarCollapsed = true;
		$scope.modules = [1,12]

		// serverAPI.call( "/api/statisticsCommon" , {}, function(){

		// })

		$scope.toggleMobileSidebar = function(){
			$scope.sidebarCollapsed = !$scope.sidebarCollapsed;
		}

		console.log('init main-panel');
	}]);
})();
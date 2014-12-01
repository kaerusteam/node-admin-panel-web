"use strict";

(function(){
	angular.module('app.sidebar', ['app']);

	angular.module('app.sidebar').controller('sidebar', ['$scope', '$location', 'sidebarService', 'serverAPI', function($scope, $location, sidebarService, serverAPI) {

		$scope.sidebarCollapsed = true;
		$scope.modules = sidebarService.moduleList;
		// serverAPI.call( "/api/statisticsCommon" , {}, function(){

		// })

		$scope.toggleMobileSidebar = function(){
			$scope.sidebarCollapsed = !$scope.sidebarCollapsed;
		}

		console.log('init sidebar');
	}]);
})();
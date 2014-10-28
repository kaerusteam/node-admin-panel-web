"use strict";

(function() {
	var common = angular.module('app.common', ['app']);

	common.factory('serverAPI', ['$http', 'auth', 'localization', function($http, auth, localization) {
		return {
			call: function(url, data, callback){
				var data = {
					data: data || {},
					authToken: auth.authToken,
					locale: localization.currentLocale
				}

				$http({
					method: "POST", 
					url: url, 
					data : data,
					cache: false
				}).success(function (res) {
					// $scope.download = false;
					// if (!res.error) {
					// 	if(res.data.stats.length === 0) {
					// 		alertService.add("danger", "Нет данных за указанный промежуток", 2000);
					// 	}
					// 	$scope.stats.common = {
					// 		all: res.data.stats,
					// 		avg: { }
					// 	}
					// 	callback && callback();
					// }
					// else {
					// 	alertService.add("danger", res.error.message);
					// }
				});
			}
		};
	}]);
})();
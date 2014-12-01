"use strict";

(function() {
	var common = angular.module('app.common');

	common.factory('serverAPI', ['$http', 'auth', 'localization', function($http, auth, localization) {
		return {
			call: function(url, data, callback){
				if (arguments.length == 3){
					var __callback = callback;
					var __data = data;
				}else{
					var __callback = data;
				}
				var params = {
					authToken: auth.authToken,
					locale: localization.currentLocale.name
				}
				if (typeof(__data) != "undefined" && __data != null){
					params.data = __data;
				}
				$http({
					method: "POST", 
					url: url, 
					data : params,
					cache: false
				}).success(function (res) {
					if (!res.error){
						__callback(null, res.result);
					}else{
						__callback(res.error);
					}
				}).error(function (err) {
					__callback(err);
				});
			}
		};
	}]);
})();
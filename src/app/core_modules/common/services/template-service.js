"use strict";

(function() {
	var common = angular.module('app.common');

	common.factory('templateService', ['$http', '$templateCache', function($http, $templateCache) {
		return {
			getTemplate: function(url, callback){
				var template = $templateCache.get(url);
				if (!template){
					$http({
						method: "GET", 
						url: url, 
						cache: true
					}).success(function (res) {
						$templateCache.put(url, res);
						callback(null, res)
					}).error(function (err) {
						callback(err)
					});
				}else{
					callback(null, template)
				}
			}
		};
	}]);
})();
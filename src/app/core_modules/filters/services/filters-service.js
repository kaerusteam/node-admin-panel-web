"use strict";

(function(){
	var module = angular.module('app.filters');

	module.factory('filtersService', function(serverAPI) {
		return {
			filtersType : [
			{
				type : "number",
				templatePath : "",
				flags : {
					$lt : "<",
					$lte : "<=",
					$gt : ">",
					$gte : ">="
				}
			}
			]
		}
	})
})();
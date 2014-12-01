"use strict";

(function(){
	angular.module("app.localization").controller("localizationController", ["$scope", "localization", function($scope, localization) {
		$scope.localeList = localization.localeList;
		$scope.locale = localization.currentLocale;
		$scope.setLocale = function(locale){
			localization.setLocale(locale);
		}
		console.log('init localization module');
	}]);
})();
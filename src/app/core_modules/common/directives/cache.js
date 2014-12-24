"use strict";

(function() {
	var common = angular.module('app.common');
	/**
	 * @ngdoc directive
	 * @name cacheLocalStorage
	 * @requires $compile
	 * @requires $timeout
	 * @requires storage
	 *
	 * @description
	 * Save valiable from ngModel to local storage
	 * Сохраняет переменную забинденную с помощью ngModel в локальное хранилище
	 *
	 */
	common.directive('cacheLocalStorage', [ '$compile', '$timeout', 'storage', function ($compile, $timeout, storage) {
		return {
			restrict: 'A',
			scope: true,
			replace: true,
			link: function (scope, element, attributes) {
				if(storage.getItemLocal(attributes.ngModel)){
					scope[attributes.ngModel] =  storage.getItemLocal(attributes.ngModel)
				}
				scope.$watch(attributes.ngModel, function(value){
					if(typeof(value)!="undefined" && value != null){
						storage.setItemLocal(attributes.ngModel, value)
					}
				});
			}
		}
	}]);

	/**
	 * @ngdoc directive
	 * @name ngCacheSessionStorage
	 * @requires $compile
	 * @requires $timeout
	 * @requires $storage
	 *
	 * @description
	 * Save valiable from ngModel to local storage
	 * Сохраняет переменную забинденную с помощью ngModel в сессионное хранилище
	 *
	 */
	common.directive('cacheSessionStorage', [ '$compile', '$timeout', 'storage', function ($compile, $timeout, storage) {
		return {
			restrict: 'A',
			scope: true,
			replace: true,
			link: function (scope, element, attributes) {
				if(storage.getItemLocal(attributes.ngModel)){
					scope[attributes.ngModel] =  storage.getItemSession(attributes.ngModel)
				}
				scope.$watch(attributes.ngModel, function(value){
					if(typeof(value)!="undefined" && value != null){
						storage.setItemSession(attributes.ngModel, value)
						
					}
				});
			}
		}
	}]);
})();
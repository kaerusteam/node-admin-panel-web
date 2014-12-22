"use strict";

(function() {
	var datatable = angular.module('app.datatable');
	/**
	 * @ngdoc directive
	 * @name uiPagination
	 * @requires $compile
	 * @requires $timeout
	 * @requires templateService
	 *
	 * @description
	 * Include template into element
	 *
	 */
	datatable.directive('uiPagination', [ '$compile', '$timeout', 'templateService', function ($compile, $timeout, templateService) {
		return {
			restrict: 'A',
			scope: false,
			replace: true,
			link: function (scope, element, attributes) {
				scope.table = scope[attributes.uiPagination];
				var pagination = null;
				var url = "/src/app/core_modules/datatable/templates/pagination.html";
				templateService.getTemplate(url, function(err, template){
					if (!err){
						pagination = angular.element(template);
						element.append(pagination);
                    	$compile(pagination)(scope);
					}else{
						console.error(err)
					}
				});
			}
		}
	}]);

})();
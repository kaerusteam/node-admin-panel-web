"use strict";

(function() {
	var common = angular.module('app.common');

	common.directive('preloader', [ '$compile', '$timeout', 'templateService', function ($compile, $timeout, templateService) {
		return {
			restrict: 'A',
			scope: true,
			replace: true,
			link: function (scope, element, attributes) {
				scope.$watch(attributes.preloader, function(value){
					if (value){
						if (preloader){
							preloader.removeClass("hidden");
						}
					}else{
						if (preloader){
							preloader.addClass("hidden");
						}
					}
				});
				var preloader = null;
				var url = "/src/app/core_modules/common/templates/preloader.html";
				templateService.getTemplate("/src/app/core_modules/common/templates/preloader.html", function(err, template){
					if (!err){
						preloader = angular.element(template);
						element.prepend(preloader);
					}else{
						console.error(err)
					}
				})
				element.addClass("preloader-parent");
			}
		}
	}]);
})();
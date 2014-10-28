"use strict";

(function() {
	var common = angular.module('app.common');

	common.factory('localization', function() {
		return {
			DEFAUL_LOCALE: 'en-us',
			currentLocale: localStorage.__currentLocale || 'en-us',

			setLocale: function(locale){
				this.currentLocale = locale;
				localStorage.__currentLocale = this.currentLocale;
			}
		};
	});
})();
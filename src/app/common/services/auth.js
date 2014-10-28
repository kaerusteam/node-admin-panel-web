"use strict";

(function() {
	var common = angular.module('app.common');

	common.factory('auth', function() {
		return {
			authToken: localStorage.__authToken || null,
			setAuthToken: function(authToken){
				this.authToken = authToken;
				localStorage.__authToken = this.authToken;
			}
		};
	});
})();
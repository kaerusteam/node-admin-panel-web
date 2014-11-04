"use strict";

(function() {
	var sidebar = angular.module('app.sidebar');

	sidebar.factory('sidebarService', function() {
		return {
			moduleList: [],
			setModuleList: function(list){
				this.moduleList = list;
			}
		};
	});
})();
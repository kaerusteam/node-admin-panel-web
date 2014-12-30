"use strict";

(function(){
	angular.module('moduleTemplateCrud').controller('moduleTemplateCrudController', ['$scope', 'serverAPI', function($scope, serverAPI) {
		console.log('init module template');

		$scope.columns = [
			{title : "ID", field : "id", type: "number", searchAvailable : true, isSortable : true},
			{title : "Name", field : "name", type: "string", searchAvailable : true, isSortable : true}
		];

		$scope.filters = [
			{title : "ID", field : "id", type: "number",},
			{title : "Name", field : "name", type: "string",}
		];

		$scope.items = [
			{id : 1, name : "Vasya1"},
			{id : 2, name : "Vasya2"},
			{id : 3, name : "Vasya3"}
		];

		$scope.search = function(column){
			column.search = !column.search;
			column.searchStr = null;
		}

		$scope.edit = function(){
			this.editable = true;
			this.copyItem = angular.copy(this.item);
		}

		$scope.save = function(){
			this.editable = false;
		}

		$scope.cancel = function(){
			this.item = angular.copy(this.copyItem);
			this.editable = false;
		}

		$scope.sort = function(column, sort){
			column.sort = sort;
		}

	}]);
})();
"use strict";

(function(){
	angular.module('testTreeView').controller('testTreeViewController', ['$scope', 'serverAPI', function($scope, serverAPI) {

		$scope.tree = [
			{
				id : 1,
				label: 'Animal',
				children: [
					{
						id : 2,
						label: 'Dog',
						iconClass : 'glyphicon-heart',
						data: {
							description: ""
						}
					}, {
						id : 3,
						label: 'Cat',
						iconClass : 'glyphicon-heart',
						data: {
						  description: ""
						}
					}, {
						id : 5,
						label: 'Hippopotamus',
						iconClass : 'glyphicon-heart',
						data: {
						  description: ""
						}
					}, {
						id : 4,
						label: 'Chicken',
						iconClass : 'glyphicon-heart',
						children: [
							{
								label :'White Leghorn'
							},{ 
								label: 'Rhode Island Red'
							},{
								label: 'Jersey Giant'
							}
						]
					}
				]
			}
		]
		

	}]);
})();
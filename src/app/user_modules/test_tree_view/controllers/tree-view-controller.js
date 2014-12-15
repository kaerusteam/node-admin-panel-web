"use strict";

(function(){
	angular.module('testTreeView').controller('testTreeViewController', ['$scope', 'serverAPI', function($scope, serverAPI) {

		$scope.tree = {
			children : [
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
								id : 6,
								label :'White Leghorn'
							},{ 
								id : 7,
								label: 'Rhode Island Red'
							},{
								id : 8,
								label: 'Jersey Giant'
							}
						]
					}
				]
			},
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
								id : 6,
								label :'White Leghorn'
							},{ 
								id : 7,
								label: 'Rhode Island Red'
							},{
								id : 8,
								label: 'Jersey Giant'
							}
						]
					}
				]
			}
		]
	}
		

	}]);
})();
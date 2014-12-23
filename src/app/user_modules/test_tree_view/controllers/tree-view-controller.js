"use strict";

(function(){
	angular.module('testTreeView').controller('testTreeViewController', ['$scope', 'serverAPI', function($scope, serverAPI) {

		$scope.movedNode = [];
		$scope.updating = false;
		$scope.treeData = "sdfsdfd";

		var handlerChilds = function(parent, data, callback){
			var childs = [], deletedChilds = [], newChilds=[];

			for(var i =0; i< $scope.movedNode.length; i++){
				if ($scope.movedNode[i].oldParent==parent.id){
					deletedChilds.push($scope.movedNode[i].child.id);
				}
				if ($scope.movedNode[i].newParent==parent.id){
					newChilds.push($scope.movedNode[i].child);
				}
			}
			for(var i=0; i< data.length; i++){
				if (deletedChilds.indexOf(data[i]._id)==-1){
					childs.push({
						id : data[i]._id,
						label : data[i].name,
						iconClass : 'glyphicon-heart',
						data : data[i].name,
						childs : true
					})
				}
			}
			if (newChilds.length){
				childs = childs.concat(newChilds);
			}
			callback(childs);
		}

		var onDropNodeInChild = function(oldParent, newParent, child){
			$scope.movedNode.push({oldParent : oldParent.id, newParent : newParent.id, child : child})
		}

		$scope.tree = {
			dragDropAllowed : false, 
			onDropNodeInChild : onDropNodeInChild,
			expandAll : false,
			getChilds : {
					url : "/modules/get",
					params : {},
					handler : handlerChilds
			},
			getData : {
				url : "/modules/get",
				params : {},
				//handler : handlerData
			},
			treeNode : [
			{
				id : 123,
				label: 'Animal',
				childs : true
			},
			{
				id : 1,
				label: 'Animal',
				childs: true
			}
		]
	}

	$scope.tree2 = {
			dragDropAllowed : true,
			expandAll : true,
			treeNode : [
			{
				id : 123,
				label: 'Animal',
				childs : [
					{
						label: 'Dog',
						iconClass : 'glyphicon-heart',
						data: {
							description: "Dog"
						}
					}, {
						label: 'Cat',
						iconClass : 'glyphicon-heart',
						data: {
						  description: "Cat"
						}
					}, {
						label: 'Hippopotamus',
						iconClass : 'glyphicon-heart',
						data: {
						  description: "Hippopotamus"
						}
					}, {
						label: 'Chicken',
						iconClass : 'glyphicon-heart',
						childs: [
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
			},
			{
				id : 1,
				label: 'Animal',
				childs: [
					{
						label: 'Dog',
						iconClass : 'glyphicon-heart',
						data: {
							description: "Dog"
						}
					}, {
						label: 'Cat',
						iconClass : 'glyphicon-heart',
						data: {
						  description: "Cat"
						}
					}, {
						label: 'Hippopotamus',
						iconClass : 'glyphicon-heart',
						data: {
						  description: "Hippopotamus"
						}
					}, {
						label: 'Chicken',
						iconClass : 'glyphicon-heart',
						childs: [
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
	}
		

	}]);
})();
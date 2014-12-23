'use strict';
(function() {
	angular.module('app.common').directive('tree', function($compile, serverAPI){
		return {
			restrict: 'E',
			templateUrl: '/src/app/core_modules/common/templates/tree-view.html',
			scope : {
				treeNode : '=treeControl',
				treeForestAllowed : '=',
				treeData : '='
			},
			link : function(scope, element, attrs){
				scope.templatePath = '/src/app/core_modules/common/templates/tree-view.html';
				scope.treeNode.expand = true;
				scope.expandAll = scope.treeNode.expandAll;
				scope.treeNode.childs = scope.treeNode.treeNode;
				scope.dragDropAllowed = scope.treeNode.dragDropAllowed;
				
				scope.showChild = function(treeNode){
					var getChilds = treeNode.getChilds || scope.treeNode.getChilds;
					if (!treeNode.expand && getChilds){
						serverAPI.call(getChilds.url, getChilds.params, function(err, res){
							if (err){
								scope.treeControl.updating = false;
								console.error(err.message);
							} else{
								if (getChilds.handler){
									getChilds.handler(treeNode, res.data, function(childs){
										treeNode.childs = childs;
									})
								} else{
									treeNode.childs = res;
								}
							}
						})
					}
					if (scope.expandAll && typeof(treeNode.expand)=="undefined"){
						treeNode.expand = true;
					}
					treeNode.expand = !treeNode.expand;
				}

				scope.getData = function(treeNode){
					if (treeNode.data){
						scope.treeData = treeNode.data;
					} else {
						var getData = treeNode.getData || scope.treeNode.getData;
						if (getData){
							serverAPI.call(getData.url, getData.params, function(err, res){
								if (err){
									console.error(err.message);
								} else{
									if (getData.handler){
										getData.handler(res.data, function(data){
											scope.treeData = data;
										})
									} else{
										scope.treeData = res;
									}
								}
							})
						}
					}

				}

				var checkCycles = function(treeNode, node){
					if (node.$parent.treeNode){
						if (node.$parent.treeNode == treeNode){
							return true;
						}else{
							return checkCycles(treeNode, node.$parent);
						}
					}else{
						return false;
					}
				}

				/*
					Transfer node to another node in the tree childs
				*/
				scope.nodeInChild = function(draggedScope, droppedScope){
					if (draggedScope!=droppedScope && !checkCycles(draggedScope.treeNode, droppedScope)){
						var draggedParent = draggedScope.$parent.treeNode;
						
						if (draggedParent){
							draggedParent.childs.splice(draggedParent.childs.indexOf(draggedScope.treeNode), 1);
						}
						if (!droppedScope.treeNode.childs || droppedScope.treeNode.childs instanceof Array){
							droppedScope.treeNode.childs = droppedScope.treeNode.childs || [];
							droppedScope.treeNode.childs.push(draggedScope.treeNode);
						}
						if (scope.treeNode.onDropNodeInChild){
							scope.treeNode.onDropNodeInChild(draggedParent, droppedScope.treeNode, draggedScope.treeNode);
						}
					}else{
					}
				}

				/*
					Transfer node to another level (may be at a higher or lower level) tree
				*/
				scope.nodeInNode = function(draggedScope, droppedScope){
					if (draggedScope!=droppedScope && !checkCycles(draggedScope.treeNode, droppedScope)){
						var draggedParent = draggedScope.$parent.treeNode;
						if (draggedParent){
							draggedParent.childs.splice(draggedParent.childs.indexOf(draggedScope.treeNode), 1);
						}
						var ind = droppedScope.$parent.treeNode.childs.indexOf(droppedScope.treeNode);
						droppedScope.$parent.treeNode.childs.splice(ind, 0, draggedScope.treeNode);
						if (scope.treeNode.onDropNodeInChild){
							scope.treeNode.onDropNodeInChild(draggedParent, droppedScope.$parent.treeNode, draggedScope.treeNode);
						}
					}else{
					}
				}
			}
		}
	})
	
})()
'use strict';
(function() {
	angular.module('app.common').directive('tree', function($compile){
		return {
			restrict: 'E',
			template: 	'<div class="nav"> \
							<div ng-repeat="treeNode in treeData"> \
								<a> \
									<i class="glyphicon"  \
										ng-class="treeNode.children && treeNode.children.length ? (treeNode.childVisible ? \'glyphicon-minus\' : \'glyphicon-plus\') :  treeNode.iconClass" \
										ng-click="showChild(treeNode)"></i> \
									{{treeNode.label || treeNode}} \
								</a> \
								<ng-include src="templatePath" ng-if="treeNode.children && treeNode.children.length">\
							</div>\
						</div>',
			scope : {
				treeData : '='
			},
			link : function(scope, element, attrs){
				scope.templatePath = '/src/app/core_modules/common/templates/tree-view.html';
				scope.showChild = function(treeNode){
					treeNode.childVisible = !treeNode.childVisible;
				}

				scope.getData = function(){

				}

				scope.moveNode = function(){
					
				}
			}
		}
	})
	
})()
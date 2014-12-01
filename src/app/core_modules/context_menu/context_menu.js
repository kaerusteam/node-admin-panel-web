(function() {
  'use strict';

	var module = angular.module('app.contextMenu', ['app']);

	var ContextMenuHtml = document.createElement('div');
	ContextMenuHtml = angular.element(ContextMenuHtml).html('<ul ng-controller="ContextMenuCtrl" class="dropdown-menu"> \
		<li ng-repeat="el in contextMenuItems" ng-class="{\'dropdown-submenu\' : el.items.length}"><a ng-click="el.handler(object)" ng-sub-context-menu="el.items"> \
			<i ng-if="el.iconClass" class="glyphicon {{el.iconClass}}"></i>{{el.title}}</a> \
		</li> \
	</ul>');

	angular.element(document.body).append(ContextMenuHtml);


	module.factory('ContextMenuService', function() {
		return {
			object : [],
			contextMenuItems : [],
			element: null,
			menuElement: null,
			subMenuElement : null
		}
	})

	module.controller("ContextMenuCtrl", function($scope, ContextMenuService){
		$scope.contextMenuItems = ContextMenuService.contextMenuItems;
		$scope.object = ContextMenuService.object;
	})

	module.directive('ngSubContextMenu', function($parse, $compile, $document, ContextMenuService){
		return {
			link : function(scope, element, attrs){
				var object = $parse(attrs.ngSubContextMenu);
				if (object(scope) && object(scope).length){
					var SubContextMenuHtml = document.createElement('ul');
					SubContextMenuHtml = angular.element(SubContextMenuHtml).html('<li ng-repeat="el in el.items" ng-class="{\'dropdown-submenu\' : el.items.length}"><a ng-sub-context-menu="el.items"> \
								<i ng-if="el.iconClass" class="glyphicon {{el.iconClass}}"></i>{{el.title}}</a> \
							</li>');
					SubContextMenuHtml[0].classList.add('dropdown-menu');
					$compile(SubContextMenuHtml)(scope);
					element.after(SubContextMenuHtml);	
				}

				function openQ(event){
					/*console.log(element[0].scrollHeight);
					console.log(element[0].scrollWidth);
					angular.element(SubContextMenuHtml)[0].firstChild.style.top = element[0].scrollHeight +'px';
					angular.element(SubContextMenuHtml)[0].firstChild.style.left = element[0].scrollWidth+'px';*/
					SubContextMenuHtml[0].classList.add('open');
				}

				element.bind("mouseover", function (changeEvent) {
					if (ContextMenuService.subMenuElement && scope.$parent.el && !scope.$parent.el.openSubMenu || ContextMenuService.subMenuElement && !scope.$parent.el){
						ContextMenuService.subMenuElement[0].classList.remove('open');
					}
					if (SubContextMenuHtml){
						scope.el.openSubMenu = true;
						ContextMenuService.subMenuElement = SubContextMenuHtml;
						openQ(changeEvent);
						///SubContextMenuHtml[0].classList.add('open');
					}
				})
			}
		}
	})

	module.directive('ngContextMenu', function($document, $parse, $compile,ContextMenuService) {
		return {
			link : function(scope, element, attrs) {
				
				function open(event){
					var doc = $document[0].documentElement;
					var docLeft = (window.pageXOffset || doc.scrollLeft) -(doc.clientLeft || 0),
						docTop = (window.pageYOffset || doc.scrollTop) -(doc.clientTop || 0),
						elementWidth = element[0].scrollWidth,
						elementHeight = element[0].scrollHeight;
					var docWidth = doc.clientWidth + docLeft,
						docHeight = doc.clientHeight + docTop,
						totalWidth = elementWidth + event.pageX,
						totalHeight = elementHeight + event.pageY,
						left = Math.max(event.pageX - docLeft, 0),
						top = Math.max(event.pageY - docTop, 0);

					if (totalWidth > docWidth) {
						left = left - (totalWidth - docWidth);
					}

					if (totalHeight > docHeight) {
						top = top - (totalHeight - docHeight);
					}
					angular.element(ContextMenuHtml)[0].firstChild.style.top = top+'px';
					angular.element(ContextMenuHtml)[0].firstChild.style.left = left+'px';
					ContextMenuHtml[0].classList.add('open');
				}

				function close(menuElement) {
					menuElement.removeClass('open');
				}

				function handleKeyUpEvent(event) {
					if (event.keyCode === 27) {
						scope.$apply(function() {
							close(ContextMenuService.menuElement);
						});
					}
				}

				function handleClickEvent(event) {
					if (event.target !== ContextMenuService.element  || event.button !== 2) {
						scope.$apply(function() {
							close(ContextMenuService.menuElement);
						});
					}
				}
				//$compile(ContextMenuHtml)(scope);
				element.bind('contextmenu', function(event) {

					scope.$apply(function() {
						event.preventDefault();
						if (ContextMenuService.menuElement !== null) {
							close(ContextMenuService.menuElement);
						}
						var object = $parse(attrs.contextMenuObject);
				
						ContextMenuService.menuElement = ContextMenuHtml;
						ContextMenuService.element = event.target;

						angular.copy(object(scope), ContextMenuService.object);
						angular.copy(scope[attrs.ngContextMenu], ContextMenuService.contextMenuItems);

						open(event);
						
					});

					$document.bind('keyup', handleKeyUpEvent);
					$document.bind('click', handleClickEvent);
					$document.bind('mousedown', handleClickEvent);
					$document.bind('contextmenu', handleClickEvent);
				});
			}
		}
	});
})()

'use strict';
(function() {
	angular.module('app.common').directive('draggable', function() {
		return {
			link : function(scope, element, attrs) {

				if (scope.$eval(attrs.draggable)!=false){
					var el = element[0];

					el.draggable = true;

					el.addEventListener(
						'dragstart',
						function(e) {
							if (e.stopPropagation) e.stopPropagation();
							e.dataTransfer.effectAllowed = 'move';
							e.dataTransfer.setData('text/plain', 'This text may be dragged');
							this.id = "__angularLastDraggingItem";
							this.classList.add('drag');
							return false;
						},
						false
					);

					el.addEventListener(
						'dragend',
						function(e) {
							this.classList.remove('drag');
							return false;
						},
						false
					);
				}
			}
		}
	});

	angular.module('app.common').directive('droppable', function() {
		return {
			scope: {
				drop : "&"
			},
			link: function(scope, element, attrs) {
				var el = element[0];
				if (scope.$eval(attrs.droppable)!=false){
					el.droppable = true;
					el.addEventListener(
						'dragover',
						function(e) {
							if (this != document.getElementById("__angularLastDraggingItem")){
								e.dataTransfer.dropEffect = 'move';
								if (e.preventDefault) e.preventDefault();
								if (e.stopPropagation) e.stopPropagation();
								this.classList.add('over');
							}
							return false;
						},
						false
					);

					el.addEventListener(
						'dragleave',
						function(e) {
							if (this != document.getElementById("__angularLastDraggingItem")){
								this.classList.remove('over');	
							}
							return false;
						},
						false
					);

					el.addEventListener(
						'drop',
						function(e) {
							if (e.stopPropagation) e.stopPropagation();
							if (e.preventDefault) e.preventDefault();
							this.classList.remove('over');

							var item = document.getElementById("__angularLastDraggingItem");
							item.id = "";
							var draggedScope = angular.element(item).scope();
							var droppedScope = angular.element(this).scope();

							scope.$apply(function(scope) {
								var fn = scope.drop();
								if (typeof fn != "undefined") {
									fn(draggedScope, droppedScope);
								}
							});

							return false;
						},
						false
					);
				}
			}
		}
	});
})()
'use strict';
(function() {
	angular.module('app.common').directive('draggable', function() {
		return function(scope, element) {
			var el = element[0];

			el.draggable = true;

			el.addEventListener(
				'dragstart',
				function(e) {
					e.dataTransfer.effectAllowed = 'move';
					e.dataTransfer.setData('Text', this.id);
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
	});

	angular.module('app.common').directive('droppable', function() {
		return {
			scope: {
				drop : "="
			},
			link: function(scope, element) {
				var el = element[0];

				el.droppable = true;
				el.addEventListener(
					'dragover',
					function(e) {
						e.dataTransfer.dropEffect = 'move';
						// allows us to drop
						if (e.preventDefault) e.preventDefault();
						this.classList.add('over');
						return false;
					},
					false
				);

				el.addEventListener(
					'drop',
					function(e) {
						if (e.stopPropagation) e.stopPropagation();

						this.classList.remove('over');

						var item = document.getElementById(e.dataTransfer.getData('Text'));
						//this.appendChild(item);

						//var item = document.getElementById("__angularLastDraggingItem");
						//item.id = "";
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
	});
})()
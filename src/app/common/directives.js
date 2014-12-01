"use strict";

angular.module('app').directive("fileread", [function () {
    return {
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                var reader = new FileReader();
                reader.readAsDataURL(changeEvent.target.files[0]);
                reader.onload = function (loadEvent) {
                    var object = {
                        filename : changeEvent.target.files[0].name,
                        filebody : loadEvent.target.result
                    }
                    scope[attributes.fileread] = angular.copy(object);
                    scope.$apply(function() { 
                      scope.$eval(attributes.fileload); 
                  });
                }
            });
        }
    }
}]);

angular.module('app').directive('ngEnter', function() {
    return function(scope, element, attrs) {
        element.bind("keydown keypress", function(event) {
            if(event.which === 13) {
                scope.$apply(function(){
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});

angular.module('app').directive('ngRightClick', function($parse) {
    return function(scope, element, attrs) {
        var fn = $parse(attrs.ngRightClick);
        element.bind('contextmenu', function(event) {
            scope.$apply(function() {
                event.preventDefault();
                fn(scope);
            });
        });
    };
});
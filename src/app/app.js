"use strict";

(function(){
	var xhr = new XMLHttpRequest();
	xhr.open("GET", '/app/modules.json', true);
	xhr.responseType = 'text';
	xhr.onload = function() {
		if (this.status == 200) {
			try {
				var modulesList = JSON.parse(this.response);
			}catch(e){
				console.error("Modules list file seems to be broken. Initialization failed.");
			}
			if (modulesList){
				var mainDependencies = [];
				for (var i in modulesList.coreModules){
					mainDependencies.push('/app/core_modules/'+modulesList.coreModules[i].main);
				}			
				for (var i in modulesList.userModules){
					mainDependencies.push('/app/user_modules/'+modulesList.userModules[i].main);
				}

				var dependencies = modulesList.dependencies;
				for (var i in modulesList.coreModules){
					for (var j in modulesList.coreModules[i].dependencies){
						dependencies.push('/app/core_modules/'+modulesList.coreModules[i].dependencies[j]);
					}
				}			
				for (var i in modulesList.userModules){
					for (var j in modulesList.userModules[i].dependencies){
						dependencies.push('/app/user_modules/'+modulesList.userModules[i].dependencies[j]);
					}
				}

				requirejs(mainDependencies, function () {
					requirejs(dependencies, function () {
						var app = angular.module('app', ['app.common', 'app.sidebar']);
						angular.bootstrap(document, ["app"]);
					});
				});
			}
		}else{
			console.error("Failed to load modules list. Initialization failed.");
		}
	};
	xhr.send(null);
})();
"use strict";

(function(){
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "/src/app/modules.json", true);
	xhr.responseType = "text";
	xhr.onload = function() {
		if (this.status == 200) {
			try {
				var modulesList = JSON.parse(this.response);
			}catch(e){
				console.error("Modules list file seems to be broken. Initialization failed.");
			}
			if (modulesList){
				var dependencies = [];
				var mainDependencies = [];
				var dependentModules = ["app"];
				var sidebarList = [];
				var error = null;

				mainDependencies.push("/src/app/common/"+modulesList.common.main);
				dependentModules.push("app.common");	

				for (var i in modulesList.coreModules){
					mainDependencies.push("/src/app/core_modules/"+modulesList.coreModules[i].main);
					dependentModules.push(i);
				}			
				for (var i in modulesList.userModules){
					mainDependencies.push("/src/app/user_modules/"+modulesList.userModules[i].main);
					dependentModules.push(i);
				}

				
				for (var i in modulesList.common.dependencies){
					dependencies.push("/src/app/common/"+modulesList.common.dependencies[i]);
				}
				for (var i in modulesList.coreModules){
					for (var j in modulesList.coreModules[i].dependencies){
						dependencies.push("/src/app/core_modules/"+modulesList.coreModules[i].dependencies[j]);
					}
				}			
				for (var i in modulesList.userModules){
					for (var j in modulesList.userModules[i].dependencies){
						dependencies.push("/src/app/user_modules/"+modulesList.userModules[i].dependencies[j]);
					}
				}

				for (var i in modulesList.sidebar){
					if (modulesList.coreModules[modulesList.sidebar[i]]){
						var module = modulesList.coreModules[modulesList.sidebar[i]];
					}else if (modulesList.userModules[modulesList.sidebar[i]]){
						var module = modulesList.userModules[modulesList.sidebar[i]];
					}else{
						console.warn("Could not find module "+modulesList.sidebar[i]+" to add in sidebar");
					}
					if (module && module.info && module.info.name && module.info.url){
						sidebarList.push(module.info);
					}else{
						error = "Module "+modulesList.sidebar[i]+" must have field 'info' which contains fields 'name' and 'url'";
						break;
					}
					module = null;
				}
				
				if (!error){
					requirejs(mainDependencies, function () {
						requirejs(dependencies, function () {
							var app = angular.module("app", ["app.common", "app.sidebar"]);

							app.config(["$locationProvider", function ($locationProvider) {
								$locationProvider.html5Mode(true);
							}]);
							app.run(["sidebarService", function (sidebarService) {
								sidebarService.setModuleList(sidebarList);
							}]);			
							angular.bootstrap(document, dependentModules);
						});
					});
				}else{
					console.error(error);
				}
			}
		}else{
			console.error("Failed to load modules list. Initialization failed.");
		}
	};
	xhr.send(null);
})();
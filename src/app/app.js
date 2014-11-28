"use strict";

(function(){
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "/src/app/app.json", true);
	xhr.responseType = "text";
	xhr.onload = function() {
		if (this.status == 200) {
			try {
				var appConfig = JSON.parse(this.response);
			}catch(e){
				console.error("Modules list file seems to be broken. Initialization failed.");
			}
			if (appConfig){
				var dependencies = [];
				var mainDependencies = [];
				var dependentModules = ["app"];
				var sidebarList = [];
				var error = null;

				for (var i in appConfig.coreModules){
					mainDependencies.push("/src/app/core_modules/"+i+"/"+appConfig.coreModules[i].main);
					dependentModules.push(appConfig.coreModules[i].angularName);
				}			
				for (var i in appConfig.userModules){
					mainDependencies.push("/src/app/user_modules/"+i+"/"+appConfig.userModules[i].main);
					dependentModules.push(appConfig.userModules[i].angularName);
				}

				for (var i in appConfig.coreModules){
					for (var j in appConfig.coreModules[i].dependencies){
						dependencies.push("/src/app/core_modules/"+i+"/"+appConfig.coreModules[i].dependencies[j]);
					}
				}			
				for (var i in appConfig.userModules){
					for (var j in appConfig.userModules[i].dependencies){
						dependencies.push("/src/app/user_modules/"+i+"/"+appConfig.userModules[i].dependencies[j]);
					}
				}

				for (var i in appConfig.sidebar){
					if (appConfig.coreModules[appConfig.sidebar[i]]){
						var module = appConfig.coreModules[appConfig.sidebar[i]];
					}else if (appConfig.userModules[appConfig.sidebar[i]]){
						var module = appConfig.userModules[appConfig.sidebar[i]];
					}else{
						console.warn("Could not find module "+appConfig.sidebar[i]+" to add in sidebar");
					}
					if (module && module.info  && module.info.url){
						module.info.name = appConfig.sidebar[i];						sidebarList.push(module.info);
					}else{
						error = "Module "+appConfig.sidebar[i]+" must have field 'info' which contains field 'url'";
						break;
					}
					module = null;
				}
				
				if (!error){
					requirejs(mainDependencies, function () {
						requirejs(dependencies, function () {
							var app = angular.module("app", ["app.common", "app.sidebar", "app.localization", 'pascalprecht.translate']);

							app.config(["$locationProvider", "$translateProvider", function ($locationProvider, $translateProvider) {
								$locationProvider.html5Mode(true);
								$translateProvider.useLoader('$translatePartialLoader', {  
									urlTemplate: '/src/app/{part}/localization/{lang}.json'
								});
							}]);
							app.run(["$rootScope", "$translate", "sidebarService", "localization", function ($rootScope, $translate, sidebarService, localization) {
								sidebarService.setModuleList(sidebarList);
								localization.useConfig(appConfig);
								$rootScope.$on('$translatePartialLoaderStructureChanged', function () {
									$translate.refresh();
								});
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
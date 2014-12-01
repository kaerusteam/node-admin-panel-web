"use strict";

(function(){
	var module = angular.module('app.localization');

	module.factory('localization', ["$translate", "$translatePartialLoader", function($translate, $translatePartialLoader) {
		var Service = function(){
			this.DEFAUL_LOCALE = {"flag": "gb", "name": "en-us"};
			this.currentLocale = (localStorage.__currentLocale && JSON.parse(localStorage.__currentLocale)) || this.DEFAUL_LOCALE;
			this.setLocaleList = function(list){
				this.localeList = list;
			};
			this.useConfig = function(config){
				var parts = [];
				for (var i in config.coreModules){
					if (config.coreModules[i].localized){
						parts.push("core_modules/"+i);
					}
				}			
				for (var i in config.userModules){
					if (config.userModules[i].localized){
						parts.push("user_modules/"+i);
					}
				}	
				this.setLocaleList(config.locales);
				for (var i = 0; i < parts.length; i++) {	
					$translatePartialLoader.addPart(parts[i])
				}
				$translate.use(this.currentLocale.name);
				$translate.refresh();
			}
			this.setLocale = function(locale){
				$translate.use(locale.name);
				$translate.refresh();
				this.currentLocale.name = locale.name;
				this.currentLocale.flag = locale.flag;
				localStorage.__currentLocale = JSON.stringify(this.currentLocale);
			}
		}
		return new Service();
	}]);
})();
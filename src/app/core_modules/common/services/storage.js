"use strict";

(function() {
	/**
	 * @ngdoc service
	 * @name storage
	 * @description
	 *
	 * Service provides functions for working with local storage and session storage
	 * Сервис предоставляет функции для работы локальным и сессионным хранилищем
	 *
	 */
	var angularLocalStorage = angular.module('app.common');
	angularLocalStorage.provider('storage', function() {
		this.prefix = "";
  		
	  	this.$get = ['$rootScope', '$window', '$document', '$parse', function($rootScope, $window, $document, $parse) {
	  		var self = this;
	  		var prefix;
		    return {
				/**
				 *
				 * @ngdoc method
				 * @name $storage#setPrefix
				 * @kind function
				 * @description Sets the prefix that is appended to a variable name
				 *	Устанавливает префикс, который будет дописываться в к названию переменной. Необходимо для того что бы названия не пересекались в разных модулях
				 * @param {string}  p - prefix
				*/
		    	setPrefix: function(p){
					prefix = p;
				},
				/**
				 *
				 * @ngdoc method
				 * @name $storage#setItemLocal
				 * @kind function
				 * @description Saves the variable value in the local storege in the field key
				 *	Сохраняет переменную value в локальном хранилище по ключу key
				 * @param {string}  key - key
				 * @param {object}  value - value
				*/
				setItemLocal: function(key, value){
					localStorage.setItem(prefix + key, value);
				},
				/**
				 *
				 * @ngdoc method
				 * @name $storage#setItemSession
				 * @kind function
				 * @description Saves the variable value in the local storege in the field key
				 *	Сохраняет переменную value в session storage по ключу key
				 * @param {string}  key - key
				 * @param {object}  value - value
				*/
				setItemSession: function(key, value){
					sessionStorage.setItem(prefix + key, value);
				},
				/**
				 *
				 * @ngdoc method
				 * @name $storage#getItemLocal
				 * @kind function
				 * @description Gets the value of a variable in the local storage in the field key
				 *	Получает значение переменной в local storage по ключу key
				 * @param {string}  key - key
				*/
				getItemLocal: function(key){
					return localStorage.getItem(prefix + key);
				},
				/**
				 *
				 * @ngdoc method
				 * @name $storage#getItemSession
				 * @kind function
				 * @description Gets the value of a variable in the session storage in the field key
				 *	Получает значение переменной в session storage по ключу key
				 * @param {string}  key - key
				*/
				getItemSession: function(key){
					return sessionStorage.getItem(prefix + key);
				},
				/**
				 *
				 * @ngdoc method
				 * @name $storage#removeItemLocal
				 * @kind function
				 * @description remove the variable from local storege in the field key
				 *	Удаляет запись с ключём key из local storege
				 * @param {string}  key - key
				*/
				removeItemLocal: function(key){
					localStorage.removeItem(prefix + key);
				},
				/**
				 *
				 * @ngdoc method
				 * @name $storage#removeItemSession
				 * @kind function
				 * @description remove the variable from session storege in the field key
				 *	Удаляет запись с ключём key из session storege
				 * @param {string}  key - key
				*/
				removeItemSession: function(key){
					sessionStorage.removeItem(prefix + key);
				},
				/**
				 *
				 * @ngdoc method
				 * @name $storage#getPrefix
				 * @kind function
				 * @description return prefix
				 *	Возвращает префикс
				 * @param {string}  p - prefix
				 * @returns {string} prefix
				*/
				getPrefix: function(){
					return prefix;
				},
				/**
				 *
				 * @ngdoc method
				 * @name $storage#clearAll
				 * @kind function
				 * @description remove all variable from local storege and session storage with current prefix
				 *	Удаляет все поля с текущим префиксом из local storege и session storage
				*/
				clearAll: function(){
					var expr = new RegExp(prefix);
					for(var key in localStorage){
						if(expr.test(key)){
							localStorage.removeItem(key);
						}
					}
					for(var key in sessionStorage){
						if(expr.test(key)){
							sessionStorage.removeItem(key);
						}
					}
				}
			};
	  	}];
	});
})();
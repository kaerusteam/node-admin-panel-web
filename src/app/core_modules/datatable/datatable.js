"use strict";

(function(){
	var module = angular.module('app.datatable', ['app', 'app.common']);


	module.factory('datatableService', function(serverAPI) {

		var Datatable = function(params){
			var handlers = [];


			var Datatable = function(params){
				this.data = [];
				this.url = params.url;
				this.updateInfo();
			}

			Datatable.prototype.updateInfo = function() {
				var self = this;
				serverAPI.call(this.url , function(err, res){
					var next = function(){
						var i = 0;
						var _next = function(){
							if (i<handlers.length-1){
								i++;
								handlers[i](res.data, res.count, res.params, _next);
							}else{
								self.data = res.data;
								if (res.count){
									self.count = res.count;
								}else{
									self.count = res.data.length;
								}
							}
						}
						handlers[i](res.data, res.count, res.params, _next);
					}
					if (!err){
						if (handlers.length){
							next();
						}else{
							self.data = res.data;
							if (res.count){
								self.count = res.count;
							}else{
								self.count = res.data.length;
							}
						}
					} else {
						console.error("Cannot get data for table from server");
					}
				});
			};

			Datatable.prototype.use = function(handler){
				if (typeof(handler)=="function"){
					handlers.push(handler);
				}else{
					console.error("Handler must be a function");
				}
			}

			return new Datatable(params);
		}

		return {
			createTable: function(params){
				return new Datatable(params);
			}
		};

	});
})();
"use strict";

(function(){
	var module = angular.module('app.datatable');


	module.factory('datatableService', function(serverAPI) {

		var Datatable = function(params){
			var handlers = [];


			var Datatable = function(params){
				params = params || {};
				this.data = [];
				this.total = 0;
				this.url = params.url;
				if (this.url){
					this.updateInfo();
				}
			}

			Datatable.prototype.updateInfo = function() {
				var self = this;
				if (this.url){
					serverAPI.call(this.url , function(err, res){
						var next = function(){
							var i = 0;
							var _next = function(){
								if (i<handlers.length-1){
									i++;
									handlers[i](res.data, res.total, res.params, _next);
								}else{
									self.data = res.data;
									if (res.total){
										self.total = res.total;
									}else{
										self.total = res.data.length;
									}
								}
							}
							handlers[i](res.data, res.total, res.params, _next);
						}
						if (!err){
							if (handlers.length){
								next();
							}else{
								self.data = res.data;
								if (res.total){
									self.total = res.total;
								}else{
									self.total = res.data.length;
								}
							}
						} else {
							console.error("Error during fetching data. Can not get data for table from server");
						}
					});
				}else{
					console.warn("No url specified. Can not get data for table from server");
				}
			};

			Datatable.prototype.use = function(handler){
				if (typeof(handler)=="function"){
					handlers.push(handler);
				}else{
					console.error("Handler must be a function");
				}
			}

			Datatable.prototype.setFetchUrl = function(url){
				this.url = url;
			}

			Datatable.prototype.setData = function(data){
				if (data instanceof Array){
					this.data = data;
					this.total = data.length;			
				}else{
					console.error("type of data must be an array");
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
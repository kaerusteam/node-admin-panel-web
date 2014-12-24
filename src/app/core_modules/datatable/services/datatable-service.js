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
				this.updating = false;
				this.pagination = angular.isDefined(params.pagination) ? params.pagination : false;
				this.page = this.pagination && angular.isDefined(params.page) ? params.page : 1;
				this.count = this.pagination && angular.isDefined(params.count) ? params.count : 1;
				if (this.url){
					this.refresh();
				}
			}

			Datatable.prototype.refresh = function(data) {
				var self = this;
				var next = function(data, total, params){
					var i = 0;
					var _next = function(){
						if (i<handlers.length-1){
							i++;
							handlers[i](data, total, params, _next);
						}else{
							self.data = data;
							if (total){
								self.total = total;
							}else{
								self.total = data.length;
							}
						}
					}
					handlers[i](data, total, params, _next);
				}
				if (this.url){
					this.updating = true;
					var params;
					if(self.pagination){
						params = {page: self.page, count: self.count}
					}
					serverAPI.call(this.url, params, function(err, res){
						if (!err){
							if (handlers.length){
								next(res.data, res.total, res.params);
							}else{
								self.data = res.data;
								if (res.total){
									self.total = res.total;
								}else{
									self.total = res.data.length;
								}
								self.updating = false;
							}
							if(this.pagination){
								this.pages = this.generatePaginationArr();
							}
						} else {
							self.updating = false;
							console.error("Error during fetching data. Can not get data for table from server");
						}
					});
				}else{
					if (data instanceof Array){
						this.fullData = data;
						if (handlers.length){
							next(this.fullData, this.data.length);
						}
						if(this.pagination){
							this.data = this.fullData.slice((this.page-1)*this.count, (this.page-1)*this.count+this.count);
							this.total = data.length;
							this.pages = this.generatePaginationArr();
						}else{
							this.data = data;
							this.total = data.length;
						}
					}else{
						if(this.fullData instanceof Array && this.pagination){
							this.data = this.fullData.slice((this.page-1)*this.count, (this.page-1)*this.count+this.count);
							this.pages = this.generatePaginationArr();
						}else{
							console.error("type of data must be an array");
						}
					}
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
				if(this.pagination){
					if (data instanceof Array){
						this.fullData = data;
						this.data = this.fullData.slice((this.page-1)*this.count, (this.page-1)*this.count+this.count);
						this.total = data.length;
					}else{
						console.error("type of data must be an array");
					}
				}else{
					if (data instanceof Array){
						this.data = data;
						this.total = data.length;
					}else{
						console.error("type of data must be an array");
					}
				}
				this.pages = this.generatePaginationArr();
			}

			Datatable.prototype.setPage = function (page) {
				if(angular.isDefined(page)){
					this.page = page;
					this.refresh();
				}
			}

			Datatable.prototype.generatePaginationArr = function(){
				var maxBlocks = 9;
				var pagesCount = Math.ceil(this.total/this.count);
				var pages = [];
    			var div = Math.round((maxBlocks - 2) / 2);
                var minPageInBlock = Math.max(1, this.page - div);
                var maxPageInBlock = Math.min(pagesCount, this.page + div*2 - (this.page - minPageInBlock));
                var minPageInBlock = Math.max(1, minPageInBlock - (div*2 - (maxPageInBlock - minPageInBlock)));
				if(minPageInBlock > 1){
					pages.push({type: "first", number: 1, active: false});
				}
				var i;
				for(i = minPageInBlock; i <= maxPageInBlock; i++){
					if(i == this.page){
						pages.push({type: "page", number: i, active: true});
					}else{
						pages.push({type: "page", number: i, active: false});
					}
				}
				if(i-1 == maxPageInBlock && i-1 != pagesCount){
					pages.push({type: "last", number: pagesCount, current: false});
				}
				return pages;
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
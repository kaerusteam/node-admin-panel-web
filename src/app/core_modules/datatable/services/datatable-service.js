"use strict";

(function(){
	var module = angular.module('app.datatable');


	module.factory('datatableService', function(serverAPI) {

		var Datatable = function(params){
			var handlers = [];
			var Datatable = function(params){
				var parseSort = function(sort){
					if(angular.isDefined(sort)){
						if(sort=="desc" || sort==-1){
							return -1
						}else{
							if(sort=="asc" || sort==1){
								return 1
							}else{
								return 0
							}
						}
					}else{
						return 0
					}
				}
				params = params || {};
				this.data = [];
				this.total = 0;
				this.url = params.url;
				this.updating = false;
				this.pagination = angular.isDefined(params.pagination) ? params.pagination : false;
				this.page = this.pagination && angular.isDefined(params.page) ? params.page : 1;
				this.limit = this.pagination && angular.isDefined(params.limit) ? params.limit : 10;
				this.columns = [];
				// this.columns = [{caption: "ID", field: "_id", isSortable: true}, {caption: "Время изменения", field: "timeChange", isSortable: true}, {caption: "Тип модификации", field: "modifiedType", isSortable: true}, {caption: "Изменёное поле", field: "modifiedField", isSortable: true}];
				this.defaultSort = angular.isDefined(params.defaultSort) ? parseSort(params.defaultSort) : 1;
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
					// params = {limit: self.limit}
					if(self.pagination){
						params = {offset: (self.page-1)*self.limit, limit: self.limit, audit: {sort: self.sort, readColumns: self.columns.map(function(column){return column.field})}}
					}
					serverAPI.call(this.url, params, function(err, res){
						if (!err){
							if (handlers.length){
								next(res.list, res.count, res.params);
							}else{
								self.data = res.list;
								if (res.count){
									self.total = res.count;
								}else{
									self.total = res.list.length;
								}
								self.updating = false;
							}
							if(self.pagination){
								self.pages = self.generatePaginationArr();
							}
						} else {
							self.updating = false;
							console.error("Error during fetching data. Can not get data for table from server");
						}
					});
				}else{

					var dynamicSort = function (field, value) { 
						return function (obj1,obj2) {
							if(value == 1){
								return obj1[field] > obj2[field] ? 1 : obj1[field] < obj2[field] ? -1 : 0;
							}else{
								return obj1[field] < obj2[field] ? 1 : obj1[field] > obj2[field] ? -1 : 0;
							}
						}
					}
					var dynamicSortMultiple = function(sort) {
						return function (obj1, obj2) {
							var result = 0;
							for(var field in sort){
								if(result === 0){
									result = dynamicSort(field, sort[field])(obj1, obj2);
								}else{
									 break;  
								}
							}
							return result;
						}
					}
					if (data instanceof Array){
						this.fullData = data;
						if (handlers.length){
							next(this.fullData, this.data.length);
						}
						this.fullData = this.fullData.sort(dynamicSortMultiple(this.sort));
						if(this.pagination){
							this.data = this.fullData.slice((this.page-1)*this.limit, (this.page-1)*this.limit+this.limit);
							this.total = data.length;
							this.pages = this.generatePaginationArr();
						}else{
							this.data = data;
							this.total = data.length;
						}
					}else{
						this.fullData = this.fullData.sort(dynamicSortMultiple(this.sort));
						if(this.fullData instanceof Array && this.pagination){
							this.data = this.fullData.slice((this.page-1)*this.limit, (this.page-1)*this.limit+this.limit);
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

			Datatable.prototype.setPage = function (page) {
				if(angular.isDefined(page)){
					this.page = page;
					this.refresh();
				}
			}

			Datatable.prototype.setColumns = function (columns) {
				var isSortable;
				this.columns = [];
				for(var i = 0; i < columns.length; i++){
					isSortable = angular.isDefined(columns[i].sortable);
					this.columns.push({
						caption: columns[i].caption,
						field: columns[i].field,
						isSortable: angular.isDefined(columns[i].sortable)?angular.isDefined(columns[i].sortable):true,
						sortable: 0,
						visible: angular.isDefined(columns[i].visible)?columns[i].visible:true
					});
				}
			}

			Datatable.prototype.generatePaginationArr = function(){
				var maxBlocks = 9;
				var pagesLimit = Math.ceil(this.total/this.limit);
				var pages = [];
				var div = Math.round((maxBlocks - 2) / 2);
				var minPageInBlock = Math.max(1, this.page - div);
				var maxPageInBlock = Math.min(pagesLimit, this.page + div*2 - (this.page - minPageInBlock));
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
				if(i-1 == maxPageInBlock && i-1 != pagesLimit){
					pages.push({type: "last", number: pagesLimit, current: false});
				}
				return pages;
			}

			Datatable.prototype.sortBy = function(column, event){
				console.log("column", this)
				if(column.isSortable){
					column.sortable = angular.isDefined(column.sortable)&&column.sortable==this.defaultSort? -this.defaultSort : this.defaultSort;
					if(event.ctrlKey){
						this.sort[column.field] = column.sortable;
					}else{
						this.sort = {};
						this.sort[column.field] = column.sortable;
						for(var i = 0; i < this.columns.length; i++){
							if(this.columns[i].isSirtable && this.columns[i].field != column.field){
								this.columns[i].sortable = 0;
							}
						}
					}
					console.log(this)
					this.refresh();
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
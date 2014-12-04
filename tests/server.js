"use strict";

var express = require('express');
var http = require('http');
var httpProxy = require('http-proxy');
var lessMiddleware = require('less-middleware');
var autoprefixer = require('express-autoprefixer');

var PSEUDOnginx = function(){
	this.port = 9001;
	this.apiPort = 9800;
	this.start();
}

PSEUDOnginx.prototype.start = function(){
	this.app = express();

	this.app.use(function(req, res, next) {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
		res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');		
		if(req.method.toLowerCase() === 'options') {
			res.send(200);
		} else {
			next();
		}
	});

	this.app.use(function(req, res, next) {
		console.log(req.method + " - " + req.url);
		next();
	});

	this.app.use(lessMiddleware('../', {debug: true}));
	this.app.use(autoprefixer({ browsers: 'last 2 versions', cascade: false }));
	this.app.use('/', express.static('../'));
	this.app.use('*', express.static('../'));

	this.app.get('/', function(req, res){
		res.sendFile('src/index.html' , {root: "../"});
	});
	this.app.get('*', function(req, res){
		res.sendFile('src/index.html' , {root: "../"});
	});
	var apiProxy = httpProxy.createProxyServer({
		target: {
			host: 'localhost', 
			port: this.apiPort
		}
	});
	
	this.app.post('/*', function(req, res) {
		apiProxy.proxyRequest(req, res);
	});


	http.createServer(this.app).listen(this.port);
	console.log('PSEUDOnginx running on ' + this.port);
}

var server = new PSEUDOnginx();
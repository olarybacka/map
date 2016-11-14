/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var GoogleMapsApiLoader = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"google-maps-api-loader\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var users = [];
	var $userList = document.querySelector(".user-list");

	// get users 
	fetch("http://choniawko.com/api/users-create").then(function (res) {
	    return res.json().then(function (body) {
	        users = body;
	        console.log(users);
	        createList(users);
	    });
	});

	// create user list
	var createList = function createList(users) {
	    var ul = document.createElement("ul");
	    users.forEach(function (x) {
	        var li = document.createElement("li");
	        li.appendChild(document.createTextNode(x.name));
	        ul.appendChild(li);
	    });
	    $userList.appendChild(ul);
	};

	// init map api
	GoogleMapsApiLoader({
	    libraries: ['places'],
	    apiKey: 'AIzaSyBddrDs4IAuWIojOax0sQBoW39pRZUsrQw'
	}).then(function (googleApi) {
	    initMap();
	}, function (err) {
	    console.error(err);
	});

	// init map
	function initMap() {

	    var myLatlng = new google.maps.LatLng(18, -3);
	    var mapOptions = {
	        zoom: 2,
	        center: myLatlng
	    };
	    var map = new google.maps.Map(document.getElementById('map'), mapOptions);

	    users.forEach(function (x) {
	        pinMarker(x.name, x.address.geo.lat, x.address.geo.lng, x.avatar);
	    });

	    function pinMarker(name, lat, lng, avatar) {

	        var pinIcon = new google.maps.MarkerImage(avatar, null, /* size is determined at runtime */
	        null, /* origin is 0,0 */
	        null, /* anchor is bottom center of the scaled image */
	        new google.maps.Size(42, 42));
	        var marker = new google.maps.Marker({
	            position: new google.maps.LatLng(lat, lng),
	            map: map,
	            icon: pinIcon,
	            title: name
	        });
	    }
	}

/***/ }
/******/ ]);
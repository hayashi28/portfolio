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
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

	'use strict';

	$(document).ready(function () {
	    $('.pagetop').click(function () {
	        // .pagetopをクリックすると
	        $('body,html').animate({ // いちばん上にanimateする
	            scrollTop: 0 // 戻る位置
	        }, 400); // 戻るスピード
	        return false;
	    });
	});

	$(document).ready(function () {
	    $(".pagetop").hide(); //とりあえず隠す
	    $(window).on("scroll", function () {
	        if ($(this).scrollTop() > 100) {
	            //100以上にスクロールされた／されている時は
	            $(".pagetop").fadeIn("fast"); //ふわっと表示
	        } else {
	            //それ意外は
	            $(".pagetop").fadeOut("fast"); //ふわっと非表示
	        }
	    });
	    $('.pagetop').click(function () {
	        $('body,html').animate({
	            scrollTop: 0
	        }, 400);
	        return false;
	    });
	});

	$(function () {

	    var field = $(".keyvisual");

	    var items = 100;
	    for (var i = 0; i <= items; i++) {
	        var move = Math.ceil(Math.random() * 50);
	        var pos = Math.ceil(Math.random() * 50);
	        var scale = Math.ceil(Math.random() * 10);
	        var stretch = Math.ceil(Math.random() * 5);
	        var shake = Math.ceil(Math.random() * 5);
	        field.append('<div class="bubble move' + move + ' pos' + pos + '"><div class="scale' + scale + '"><div class="shake' + shake + '"><span class="item stretch' + stretch + '"></span></div></div>');
	    }
	});

/***/ })
/******/ ]);
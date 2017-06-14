/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(2);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(4)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!./app.css", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!./app.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylesheets_app_css__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylesheets_app_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylesheets_app_css__);
// Import the page's CSS. Webpack will know what to do with it.

// Import libraries we need.

window.manufacture = function() {
  var date = Date.now().toString();
  var partNo = $("#partNo_M").val();
  var serialNo = $("#serialNo_M").val();;
  var description = $("#description_M").val();
  var owner = $("#manufacturer").val();
  var cost = $("#cost").val();

  $.post("/api/manufacture/", 
  {
    "partNo": parseInt(partNo),
    "serialNo": parseInt(serialNo),
    "description": description,
    "owner": owner,
    "cost": cost
  });
}

window.sell = function() {
  var date = Date.now().toString();
  var serialNo = $("#serialNo_S").val();
  var seller = $("#seller").val();
  var buyer = $("#buyer").val();
  var price = $("#price").val();

  var type = "Sell";
  var customId = "123" + price + serialNo;
  var description = "Nil";
  
  $.post("/api/sell/", 
  {
    "type": type,
    "customId": customId,
    "serialNo": parseInt(serialNo),
    "description": description,
    "date": date,
    "seller": seller,
    "buyer": buyer,
    "price": price
  });
        
}

window.install = function() {
  var date = Date.now().toString();
  var serialNo = $("#serialNo_I").val();
  var tailNo = $("#tailNo_I").val();;
  var installer = $("#installer").val();
  $.post("/api/install/", 
  {
    "serialNo": parseInt(serialNo),
    "tailNo": parseInt(tailNo),
    "installer": installer
  });
}

window.loan = function() {
  var date = Date.now().toString();
  var serialNo = $("#serialNo_L").val();
  var timeToReturn = $("#timeToReturn").val();
  var borrower = $("#borrower").val();
  $.post("/api/loan/", 
  {
    "serialNo": parseInt(serialNo),
    "timeToReturn": timeToReturn,
    "borrower": borrower
  });
}

// Search blockchain for transactions

window.search_part_history = function() {
  var date = Date.now().toString();
  var id = $("#partIDsearch").val();
  var table = $("#partHistory");
  table.html("<thead class=\"thead-default\"><th>Transactions</th></thead><tbody>");
  
  $.get("/api/search/"+id, function(result) {
    result.forEach(function(transaction) {
      var row = "<tr>";
      row += "<td><p><strong>HASH:</strong> " + transaction.hash + "</p>";
      row += "<p><strong>Description:</strong> " + transaction.description + "</p>";
      row += "<p><strong>Time of transaction:</strong> " + transaction.time + "</p>";
      row += "</td></tr>";
      table.append(row);
    });
  });
  table.append("</tbody>");
}

// Search MongoDB for parts

window.search_part_from_db = function() {
  var date = Date.now().toString();
  var id = $("#partIDsearchDb").val();
  var table = $("#partCheckDb");
  table.html("<thead class=\"thead-default\"><th>Parts</th></thead><tbody>");
  
  $.get("/api/db/search/part/"+id, function(result) {
    result.forEach(function(part) {
      var row = "<tr>";
      console.log(part);
      console.log(part.owner);
      row += "<td><p><strong>Part No</strong> " + part.partNo + "</p>";
      row += "<p><strong>Serial No</strong> " + part.serialNo + "</p>";
      row += "<p><strong>Description:</strong> " + part.description + "</p>";
      row += "<p><strong>Owner</strong> " + part.owner + "</p>";
      row += "<p><strong>Date Of Manufacture:</strong> " + part.date + "</p>";
      row += "<p><strong>Cost:</strong> " + part.cost + "</p>";

      row += "</td></tr>";
      console.log(row);
      table.append(row);
      console.log(table);
    });
  });
  table.append("</tbody>");
}

// Search MongoDB for all transactions of a part

window.search_part_history_from_db = function() {
  var date = Date.now().toString();
  var id = $("#partIDsearchHistoryDb").val();
  var table = $("#partHistoryDb");
  table.html("<thead class=\"thead-default\"><th>Transaction History</th></thead><tbody>");
  
  $.get("/api/db/search/part_history/"+id, function(result) {
    result.forEach(function(transaction) {
      var row = "<tr>";
      console.log(transaction);
      row += "<td><p><strong>Type</strong> " + transaction.type + "</p>";
      row += "<td><p><strong>Part No</strong> " + transaction.partNo + "</p>";
      row += "<p><strong>Serial No</strong> " + transaction.serialNo + "</p>";
      row += "<p><strong>Description:</strong> " + transaction.description + "</p>";
      row += "<p><strong>Owner</strong> " + transaction.owner + "</p>";
      row += "<p><strong>Date Of Manufacture:</strong> " + transaction.date + "</p>";
      row += "<p><strong>Price:</strong> " + transaction.cost + "</p>";

      row += "</td></tr>";
      console.log(row);
      table.append(row);
      console.log(table);
    });
  });
  table.append("</tbody>");
}
/* The user enters the total no. of tokens to buy. We calculate the total cost and send it in
 * the request. We have to send the value in Wei. So, we use the toWei helper method to convert
 * from Ether to Wei.
 */

$( document ).ready(function() {
  $("#timeToReturn").val(new Date().toJSON().slice(0,16));
});


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)();
// imports


// module
exports.push([module.i, "body {\r\n  margin-left: 5%;\r\n  margin-right: 5%;\r\n  margin-top: 5%;\r\n  font-family: \"Open Sans\", sans-serif;\r\n}\r\n\r\nlabel {\r\n  display: inline-block;\r\n  width: 100px;\r\n}\r\n\r\ninput {\r\n  width: 500px;\r\n  padding: 5px;\r\n  font-size: 16px;\r\n}\r\n\r\nbutton {\r\n  font-size: 16px;\r\n  padding: 5px;\r\n}\r\n\r\nh1, h2 {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  margin-top: 0px;\r\n  margin-bottom: 10px;\r\n}\r\n\r\nh2 {\r\n  color: #AAA;\r\n  font-size: 32px;\r\n}\r\n\r\nh3 {\r\n  font-weight: normal;\r\n  color: #AAA;\r\n  font-size: 24px;\r\n}\r\n\r\n#logo {\r\n  width:150px;\r\n  height:50px;\r\n}\r\n\r\n.navbar-right {\r\n  width: 500px;\r\n}\r\n\r\n.container {\r\n    background-color: white;\r\n    margin: auto;\r\n    padding-top: 1em;\r\n}\r\n\r\n.container-fluid {\r\n    background-color: black;\r\n    margin: auto;\r\n}", ""]);

// exports


/***/ }),
/* 3 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),
/* 4 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	insertStyleElement(options, linkElement);
	return linkElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ })
/******/ ]);
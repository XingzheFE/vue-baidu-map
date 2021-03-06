/*!
 * This file is created by xingzheFE
 * Wed May 10 2017 00:13:54 GMT+0800 (CST)
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	return __webpack_require__(__webpack_require__.s = 135);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
/* 1 */
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
		return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
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

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
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
	var sourceMap = obj.sourceMap;

	if (media) {
		styleElement.setAttribute("media", media);
	}

	if (sourceMap) {
		// https://developer.chrome.com/devtools/docs/javascript-debugging
		// this makes source maps inside style tags work properly in Chrome
		css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */';
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}


/***/ }),
/* 2 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(15)(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 4 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var anObject       = __webpack_require__(13)
  , IE8_DOM_DEFINE = __webpack_require__(38)
  , toPrimitive    = __webpack_require__(31)
  , dP             = Object.defineProperty;

exports.f = __webpack_require__(3) ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(84)
  , defined = __webpack_require__(21);
module.exports = function(it){
  return IObject(defined(it));
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (position) {
    var styleObj = {};
    if (position && position.x !== undefined && position.y !== undefined && !isNaN(position.x) && !isNaN(position.y)) {
        if (position.x >= 0 && position.x.toString().indexOf("-") <= -1) {
            styleObj.left = position.x + "px";
        } else {
            styleObj.right = Math.abs(position.x) + "px";
        }
        if (position.y >= 0 && position.y.toString().indexOf("-") <= -1) {
            styleObj.top = position.y + "px";
        } else {
            styleObj.bottom = Math.abs(position.y) + "px";
        }
    } else {
        (0, _log3.default)(new Error("controller position error or not existing"));
    }
    return styleObj;
};

var _log2 = __webpack_require__(8);

var _log3 = _interopRequireDefault(_log2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = _log;
function _log(info) {
    if (typeof info === 'string') {
        console.log('[vue-baidu-map] ' + info);
    } else if (info instanceof Error) {
        console.error('[vue-baidu-map] ' + info.message);
    }
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var dP         = __webpack_require__(5)
  , createDesc = __webpack_require__(18);
module.exports = __webpack_require__(3) ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var store      = __webpack_require__(29)('wks')
  , uid        = __webpack_require__(19)
  , Symbol     = __webpack_require__(2).Symbol
  , USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createIcon = createIcon;
exports.createLabel = createLabel;
exports.createPoint = createPoint;
exports.createSize = createSize;
exports.checkIconConfig = checkIconConfig;
function createIcon(conf) {
    var iconOption = {};
    if (!conf) return;
    if (conf.imageSize) iconOption.imageSize = createSize(conf.imageSize);
    if (conf.size && conf.imageSize) iconOption.imageOffset = createSize({
        x: (conf.size.x - conf.imageSize.x) / 2,
        y: (conf.size.y - conf.imageSize.y) / 2
    });
    if (conf.anchor) iconOption.anchor = createSize(conf.anchor);
    return new BMap.Icon(conf.img, createSize(conf.size), iconOption);
}

function createLabel(config) {
    return new BMap.Label(config.text, { offset: createSize(config.offset) });
}

function createPoint(point) {
    return new BMap.Point(point.lng, point.lat);
}

function createSize(config) {
    return new BMap.Size(config.x, config.y);
}

function checkIconConfig(conf) {
    if (conf && (conf.img && conf.imageSize && conf.imageSize instanceof Object && !isNaN(conf.imageSize.x) && !isNaN(conf.imageSize.y) && conf.size && conf.size instanceof Object && !isNaN(conf.size.x) && !isNaN(conf.size.y) || conf.anchor && conf.anchor instanceof Object && !isNaN(conf.anchor.x) && !isNaN(conf.anchor.y))) {
        return true;
    }
    return false;
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (eventList) {
    var _this = this;

    eventList.map(function (item, index) {
        _this.$overlay.addEventListener(item, function (e) {
            _this.$emit("b-" + item, e, _this);
        });
    });
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(16);
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};

/***/ }),
/* 14 */
/***/ (function(module, exports) {

var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = __webpack_require__(43)
  , enumBugKeys = __webpack_require__(22);

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};

/***/ }),
/* 19 */
/***/ (function(module, exports) {

var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.removeOverlay = removeOverlay;
function removeOverlay(map, key) {
    map.removeOverlay(this[key]);
    for (var i in this[key]) {
        if (this[key].hasOwnProperty(i) && this[key][i]) {
            this[key][i] = null;
        }
    }
    this[key] = null;
}

/***/ }),
/* 21 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};

/***/ }),
/* 22 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(2)
  , core      = __webpack_require__(14)
  , ctx       = __webpack_require__(81)
  , hide      = __webpack_require__(9)
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , IS_WRAP   = type & $export.W
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE]
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(a, b, c){
        if(this instanceof C){
          switch(arguments.length){
            case 0: return new C;
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if(IS_PROTO){
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library` 
module.exports = $export;

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = {};

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = true;

/***/ }),
/* 26 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(5).f
  , has = __webpack_require__(4)
  , TAG = __webpack_require__(10)('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(29)('keys')
  , uid    = __webpack_require__(19);
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2)
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};

/***/ }),
/* 30 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(16);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var global         = __webpack_require__(2)
  , core           = __webpack_require__(14)
  , LIBRARY        = __webpack_require__(25)
  , wksExt         = __webpack_require__(33)
  , defineProperty = __webpack_require__(5).f;
module.exports = function(name){
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
};

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(10);

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    var _this = this;

    if (this && this.contextMenu && this.contextMenu instanceof Array && this.$overlay) {
        if (this.$contextMenu && this.$contextMenu instanceof BMap.ContextMenu) {
            this.contextMenu.map(function (item, index, arr) {
                var menuItem = _this.$contextMenu.getItem(index);
                var text = item.text;
                if (item.text && menuItem) {
                    menuItem.setText(text);
                }
            });
        } else {
            var contextMenu = this.contextMenu;
            var menu = new BMap.ContextMenu();

            if (this.$contextMenu) {
                this.$overlay.removeContextMenu(this.$contextMenu);
            }

            for (var i = 0; i < contextMenu.length; i++) {
                menu.addItem(new BMap.MenuItem(contextMenu[i].text, contextMenu[i].callback));
            }

            this.$overlay.addContextMenu(menu);
            this.$contextMenu = menu;
        }
    } else {
        if (process.env.NODE_ENV === "development") console.warn("[vue-baidu-map] contextMenu is not exist!");
    }
};

var _log2 = __webpack_require__(8);

var _log3 = _interopRequireDefault(_log2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(45)))

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(72);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(71);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 36 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(16)
  , document = __webpack_require__(2).document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(3) && !__webpack_require__(15)(function(){
  return Object.defineProperty(__webpack_require__(37)('div'), 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY        = __webpack_require__(25)
  , $export        = __webpack_require__(23)
  , redefine       = __webpack_require__(44)
  , hide           = __webpack_require__(9)
  , has            = __webpack_require__(4)
  , Iterators      = __webpack_require__(24)
  , $iterCreate    = __webpack_require__(86)
  , setToStringTag = __webpack_require__(27)
  , getPrototypeOf = __webpack_require__(93)
  , ITERATOR       = __webpack_require__(10)('iterator')
  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR    = '@@iterator'
  , KEYS           = 'keys'
  , VALUES         = 'values';

var returnThis = function(){ return this; };

module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
    , methods, key, IteratorPrototype;
  // Fix native
  if($anyNative){
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
    if(IteratorPrototype !== Object.prototype){
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if(DEF_VALUES && $native && $native.name !== VALUES){
    VALUES_BUG = true;
    $default = function values(){ return $native.call(this); };
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES ? $default : getMethod(VALUES),
      keys:    IS_SET     ? $default : getMethod(KEYS),
      entries: $entries
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject    = __webpack_require__(13)
  , dPs         = __webpack_require__(90)
  , enumBugKeys = __webpack_require__(22)
  , IE_PROTO    = __webpack_require__(28)('IE_PROTO')
  , Empty       = function(){ /* empty */ }
  , PROTOTYPE   = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(37)('iframe')
    , i      = enumBugKeys.length
    , lt     = '<'
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(83).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties){
  var result;
  if(O !== null){
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty;
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys      = __webpack_require__(43)
  , hiddenKeys = __webpack_require__(22).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
  return $keys(O, hiddenKeys);
};

/***/ }),
/* 42 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var has          = __webpack_require__(4)
  , toIObject    = __webpack_require__(6)
  , arrayIndexOf = __webpack_require__(80)(false)
  , IE_PROTO     = __webpack_require__(28)('IE_PROTO');

module.exports = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(9);

/***/ }),
/* 45 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof2 = __webpack_require__(35);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function load(config) {
    var key = config.key || "i";
    var version = config.version || 2;
    var callback = "vue_baidu_map_initialize_callback_fn";

    if (window.BMap !== undefined && (0, _typeof3.default)(window.BMap) === "object" && typeof window.BMap.Map === "function") {
        console.log("[vue-baidu-map] BMap 不能重复加载");
        return;
    } else {
        window.BMap = undefined;

        console.log("[vue-baidu-map] BMap 不存在，重新加载");
    }

    if (!key || !version) {
        throw new Error("[vue-baidu-map] 百度地图初始化方法的 key 和 version 参数不能为空！");
    }

    if (typeof key !== "string" || !(Number(version) === 1.4 || Number(version) === 2) || !(typeof callback === "string")) {
        throw new Error("[vue-baidu-map] 地图初始化的参数格式不正确，key应为 String， version 为 Number，callbackName 为字符串！");
    }

    var body = document.body;
    var script = document.createElement("SCRIPT");
    var url = "https://api.map.baidu.com/api?v=" + version + "&ak=" + key + "&callback=" + callback;
    script.setAttribute("src", url);
    script.setAttribute("defer", "");
    script.setAttribute("async", "");

    body.appendChild(script);
}

exports.default = load;

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_script__, __vue_template__
var __vue_styles__ = {}
__webpack_require__(129)
__vue_script__ = __webpack_require__(60)
if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
  console.warn("[vue-loader] lib/controllers/controllerBox.vue: named exports in *.vue files are ignored.")}
__vue_template__ = __webpack_require__(120)
module.exports = __vue_script__ || {}
if (module.exports.__esModule) module.exports = module.exports.default
var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
if (__vue_template__) {
__vue_options__.template = __vue_template__
}
if (!__vue_options__.computed) __vue_options__.computed = {}
Object.keys(__vue_styles__).forEach(function (key) {
var module = __vue_styles__[key]
__vue_options__.computed[key] = function () { return module }
})
if (false) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  var id = "_v-27e221ec/controllerBox.vue"
  if (!module.hot.data) {
    hotAPI.createRecord(id, module.exports)
  } else {
    hotAPI.update(id, module.exports, __vue_template__)
  }
})()}

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_script__, __vue_template__
var __vue_styles__ = {}
__webpack_require__(134)
__vue_script__ = __webpack_require__(61)
if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
  console.warn("[vue-loader] lib/controllers/fullScreenController.vue: named exports in *.vue files are ignored.")}
__vue_template__ = __webpack_require__(125)
module.exports = __vue_script__ || {}
if (module.exports.__esModule) module.exports = module.exports.default
var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
if (__vue_template__) {
__vue_options__.template = __vue_template__
}
if (!__vue_options__.computed) __vue_options__.computed = {}
Object.keys(__vue_styles__).forEach(function (key) {
var module = __vue_styles__[key]
__vue_options__.computed[key] = function () { return module }
})
if (false) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  var id = "_v-8c9467a8/fullScreenController.vue"
  if (!module.hot.data) {
    hotAPI.createRecord(id, module.exports)
  } else {
    hotAPI.update(id, module.exports, __vue_template__)
  }
})()}

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_script__, __vue_template__
var __vue_styles__ = {}
__webpack_require__(128)
__vue_script__ = __webpack_require__(62)
if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
  console.warn("[vue-loader] lib/controllers/localSearchController.vue: named exports in *.vue files are ignored.")}
__vue_template__ = __webpack_require__(119)
module.exports = __vue_script__ || {}
if (module.exports.__esModule) module.exports = module.exports.default
var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
if (__vue_template__) {
__vue_options__.template = __vue_template__
}
if (!__vue_options__.computed) __vue_options__.computed = {}
Object.keys(__vue_styles__).forEach(function (key) {
var module = __vue_styles__[key]
__vue_options__.computed[key] = function () { return module }
})
if (false) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  var id = "_v-0606bf2c/localSearchController.vue"
  if (!module.hot.data) {
    hotAPI.createRecord(id, module.exports)
  } else {
    hotAPI.update(id, module.exports, __vue_template__)
  }
})()}

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_script__, __vue_template__
var __vue_styles__ = {}
__webpack_require__(127)
__vue_script__ = __webpack_require__(63)
if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
  console.warn("[vue-loader] lib/controllers/locateController.vue: named exports in *.vue files are ignored.")}
__vue_template__ = __webpack_require__(118)
module.exports = __vue_script__ || {}
if (module.exports.__esModule) module.exports = module.exports.default
var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
if (__vue_template__) {
__vue_options__.template = __vue_template__
}
if (!__vue_options__.computed) __vue_options__.computed = {}
Object.keys(__vue_styles__).forEach(function (key) {
var module = __vue_styles__[key]
__vue_options__.computed[key] = function () { return module }
})
if (false) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  var id = "_v-03febde3/locateController.vue"
  if (!module.hot.data) {
    hotAPI.createRecord(id, module.exports)
  } else {
    hotAPI.update(id, module.exports, __vue_template__)
  }
})()}

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_script__, __vue_template__
var __vue_styles__ = {}
__webpack_require__(130)
__vue_script__ = __webpack_require__(64)
if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
  console.warn("[vue-loader] lib/controllers/toggleTypeController.vue: named exports in *.vue files are ignored.")}
__vue_template__ = __webpack_require__(121)
module.exports = __vue_script__ || {}
if (module.exports.__esModule) module.exports = module.exports.default
var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
if (__vue_template__) {
__vue_options__.template = __vue_template__
}
if (!__vue_options__.computed) __vue_options__.computed = {}
Object.keys(__vue_styles__).forEach(function (key) {
var module = __vue_styles__[key]
__vue_options__.computed[key] = function () { return module }
})
if (false) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  var id = "_v-28342882/toggleTypeController.vue"
  if (!module.hot.data) {
    hotAPI.createRecord(id, module.exports)
  } else {
    hotAPI.update(id, module.exports, __vue_template__)
  }
})()}

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_script__, __vue_template__
var __vue_styles__ = {}
__webpack_require__(131)
__vue_script__ = __webpack_require__(65)
if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
  console.warn("[vue-loader] lib/controllers/zoomController.vue: named exports in *.vue files are ignored.")}
__vue_template__ = __webpack_require__(122)
module.exports = __vue_script__ || {}
if (module.exports.__esModule) module.exports = module.exports.default
var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
if (__vue_template__) {
__vue_options__.template = __vue_template__
}
if (!__vue_options__.computed) __vue_options__.computed = {}
Object.keys(__vue_styles__).forEach(function (key) {
var module = __vue_styles__[key]
__vue_options__.computed[key] = function () { return module }
})
if (false) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  var id = "_v-36aab038/zoomController.vue"
  if (!module.hot.data) {
    hotAPI.createRecord(id, module.exports)
  } else {
    hotAPI.update(id, module.exports, __vue_template__)
  }
})()}

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_script__, __vue_template__
var __vue_styles__ = {}
__webpack_require__(133)
__vue_script__ = __webpack_require__(66)
if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
  console.warn("[vue-loader] lib/overlays/infoWindow.vue: named exports in *.vue files are ignored.")}
__vue_template__ = __webpack_require__(124)
module.exports = __vue_script__ || {}
if (module.exports.__esModule) module.exports = module.exports.default
var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
if (__vue_template__) {
__vue_options__.template = __vue_template__
}
if (!__vue_options__.computed) __vue_options__.computed = {}
Object.keys(__vue_styles__).forEach(function (key) {
var module = __vue_styles__[key]
__vue_options__.computed[key] = function () { return module }
})
if (false) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  var id = "_v-56ed0ac6/infoWindow.vue"
  if (!module.hot.data) {
    hotAPI.createRecord(id, module.exports)
  } else {
    hotAPI.update(id, module.exports, __vue_template__)
  }
})()}

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_script__, __vue_template__
var __vue_styles__ = {}
__webpack_require__(132)
__webpack_require__(126)
__vue_script__ = __webpack_require__(67)
if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
  console.warn("[vue-loader] lib/overlays/map.vue: named exports in *.vue files are ignored.")}
__vue_template__ = __webpack_require__(123)
module.exports = __vue_script__ || {}
if (module.exports.__esModule) module.exports = module.exports.default
var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
if (__vue_template__) {
__vue_options__.template = __vue_template__
}
if (!__vue_options__.computed) __vue_options__.computed = {}
Object.keys(__vue_styles__).forEach(function (key) {
var module = __vue_styles__[key]
__vue_options__.computed[key] = function () { return module }
})
if (false) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  var id = "_v-445b31e6/map.vue"
  if (!module.hot.data) {
    hotAPI.createRecord(id, module.exports)
  } else {
    hotAPI.update(id, module.exports, __vue_template__)
  }
})()}

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_script__, __vue_template__
var __vue_styles__ = {}
__vue_script__ = __webpack_require__(68)
if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
  console.warn("[vue-loader] lib/overlays/marker.vue: named exports in *.vue files are ignored.")}
module.exports = __vue_script__ || {}
if (module.exports.__esModule) module.exports = module.exports.default
var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
if (__vue_template__) {
__vue_options__.template = __vue_template__
}
if (!__vue_options__.computed) __vue_options__.computed = {}
Object.keys(__vue_styles__).forEach(function (key) {
var module = __vue_styles__[key]
__vue_options__.computed[key] = function () { return module }
})
if (false) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  var id = "_v-15be8bce/marker.vue"
  if (!module.hot.data) {
    hotAPI.createRecord(id, module.exports)
  } else {
    hotAPI.update(id, module.exports, __vue_template__)
  }
})()}

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_script__, __vue_template__
var __vue_styles__ = {}
__vue_script__ = __webpack_require__(69)
if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
  console.warn("[vue-loader] lib/overlays/polyline.vue: named exports in *.vue files are ignored.")}
module.exports = __vue_script__ || {}
if (module.exports.__esModule) module.exports = module.exports.default
var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
if (__vue_template__) {
__vue_options__.template = __vue_template__
}
if (!__vue_options__.computed) __vue_options__.computed = {}
Object.keys(__vue_styles__).forEach(function (key) {
var module = __vue_styles__[key]
__vue_options__.computed[key] = function () { return module }
})
if (false) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  var id = "_v-34ad7edf/polyline.vue"
  if (!module.hot.data) {
    hotAPI.createRecord(id, module.exports)
  } else {
    hotAPI.update(id, module.exports, __vue_template__)
  }
})()}

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof2 = __webpack_require__(35);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var checkMap = function checkMap(mapObj) {
    var result = false;
    if (window.BMap !== undefined && window.BMap.Map && window.BMap.Map instanceof Function && window.BMap.Size && window.BMap.Size instanceof Function && BMap.Point && BMap.Point instanceof Function && BMap.Polyline && BMap.Polyline instanceof Function && BMap.Marker && BMap.Marker instanceof Function) {
        if (mapObj !== undefined) {
            if ((typeof mapObj === "undefined" ? "undefined" : (0, _typeof3.default)(mapObj)) === "object" && mapObj instanceof window.BMap.Map) {
                result = true;
            }
        } else {
            result = true;
        }
    } else {}
    return result;
};

exports.default = checkMap;

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _log2 = __webpack_require__(8);

var _log3 = _interopRequireDefault(_log2);

var _factory = __webpack_require__(11);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function init() {
    var _this = this;
    var map = _this.$map;
    var center = _this.center || { lat: 36.043862, lng: 103.898987 };
    var zoom = _this.zoom || 5;

    var style = _this.style || undefined;
    if (!(BMap && BMap.Map)) {
        (0, _log3.default)(new Error("地图初始化失败！BMap不存在"));
    }
    if (typeof center !== "string") {
        center = (0, _factory.createPoint)(center);
    }
    if (_this.location) {
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function (r) {
            if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                _this.currentLocation = {
                    lng: r.point.lng,
                    lat: r.point.lat
                };
                map.centerAndZoom(r.point, 13);
                if (_this.locateSucceed) {
                    _this.locateSucceed(r);
                }
                setTimeout(function () {
                    _this.LOADING.hide();
                }, 500);
            } else {
                alert("定位失败");
                (0, _log3.default)('locate failed' + this.getStatus());
                if (_this.locateFailed) {
                    _this.locateFailed();
                }
            }
        }, { enableHighAccuracy: _this.enableHighAccuracy });
    } else {
        setTimeout(function () {
            _this.LOADING.hide();
        }, 1000);
    }

    if (_this.enableScrollWheelZoom) {
        (0, _log3.default)("enable-scroll-wheel-zoom");
        map.enableScrollWheelZoom();
    } else {
        (0, _log3.default)("disable-scroll-wheel-zoom");
    }
    map.setMapStyle(style);
    map.centerAndZoom(center, zoom);
    map.enableAutoResize();
}

exports.default = init;

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = __webpack_require__(73);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(74);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Loading = function () {
    function Loading(str) {
        (0, _classCallCheck3.default)(this, Loading);

        this.status = false;
        this.el = {};
        var box = {};
        if (typeof str === "string") {
            box = document.querySelector(str);
        } else {
            box = str;
        }
        var element = document.createElement("div");
        element.setAttribute("class", "loading-animation-1-0-1");
        element.innerHTML = "<div class=\"circle\"></div>";
        this.el = element;
        if (box) {
            box.appendChild(this.el);
        } else {
            console.warn("Loading Animation can not find element");
            document.body.appendChild(this.el);
        }
    }

    (0, _createClass3.default)(Loading, [{
        key: "show",
        value: function show(time) {
            var _this = this;

            this.status = true;
            setTimeout(function () {
                if (_this.el) {
                    _this.el.style.display = "block";
                    _this.el.style.opacity = "1";
                }
            }, time || 0);
        }
    }, {
        key: "hide",
        value: function hide(time) {
            var _this2 = this;

            this.status = false;
            setTimeout(function () {
                if (_this2.el) {
                    _this2.el.style.opacity = "0";
                    setTimeout(function () {
                        _this2.el.style.display = "none";
                    }, 400);
                }
            }, time || 0);
        }
    }]);
    return Loading;
}();

exports.default = Loading;

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getControllerPosition = __webpack_require__(7);

var _getControllerPosition2 = _interopRequireDefault(_getControllerPosition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {
    position: {
        required: true,
        twoway: false,
        type: Object
    },
    visible: {
        required: false,
        twoway: false,
        type: Boolean,
        default: true
    },
    callback: {
        required: false,
        twoway: false,
        type: Function
    }
};

exports.default = {
    props: props,
    data: function data() {
        return {
            styleObj: {}
        };
    },
    ready: function ready() {
        this.styleObj = (0, _getControllerPosition2.default)(this.position);
    }
};

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getControllerPosition = __webpack_require__(7);

var _getControllerPosition2 = _interopRequireDefault(_getControllerPosition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {
    position: {
        required: true,
        twoway: false,
        type: Object
    },
    visible: {
        required: false,
        twoway: false,
        type: Boolean,
        default: true
    },
    callback: {
        required: false,
        twoway: false,
        type: Function
    }
};

exports.default = {
    props: props,
    data: function data() {
        return {
            styleObj: {}
        };
    },
    ready: function ready() {
        this.styleObj = (0, _getControllerPosition2.default)(this.position);
    },

    methods: {
        toggleFullscreen: function toggleFullscreen() {
            var parentStatus = this.$parent.status;
            parentStatus.isFullscreen = !parentStatus.isFullscreen;
        }
    }
};

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getControllerPosition = __webpack_require__(7);

var _getControllerPosition2 = _interopRequireDefault(_getControllerPosition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {
    position: {
        required: true,
        twoway: false,
        type: Object
    },
    visible: {
        required: false,
        twoway: false,
        type: Boolean,
        default: true
    },
    callback: Function
};

exports.default = {
    props: props,
    data: function data() {
        return {
            markerList: [],
            styleObj: {},
            $search: undefined,
            keywords: ''
        };
    },
    ready: function ready() {
        var $map = this.$parent.$map;
        this.styleObj = (0, _getControllerPosition2.default)(this.position);
        $map ? this.addController() : this.$parent.$on("ready", this.addController);
    },
    beforeDestroy: function beforeDestroy() {
        this.removeController();
    },

    methods: {
        search: function search() {
            var _this = this;
            var $search = this.$search,
                keywords = this.keywords,
                markerList = this.markerList,
                callback = this.callback,
                removerMarker = this.removerMarker;

            var $parnet = this.$parent;
            if ($search && keywords) {
                removerMarker();
                $parnet.LOADING.show();
                setTimeout(function () {
                    $parnet.LOADING.hide();
                }, 300);
                $search.search(keywords);
                $search.setMarkersSetCallback(function (pois) {
                    _this.markerList = _this.markerList.concat(pois);
                    callback && callback(pois);
                });
            }
        },
        addController: function addController() {
            var $map = this.$parent.$map;
            var $search = this.$search;

            this.$search = $search = new BMap.LocalSearch($map, {
                renderOptions: { map: $map }
            });
            $search.disableFirstResultSelection();
        },
        removeController: function removeController() {
            this.$search = null;
        },
        removerMarker: function removerMarker() {
            var keywords = this.keywords,
                markerList = this.markerList;
            var $map = this.$parent.$map;

            markerList.map(function (item) {
                $map.removeOverlay(item.marker);
            });
            this.markerList.splice(0, markerList.length);
        }
    },
    watch: {
        "keywords": {
            handler: function handler() {
                var keywords = this.keywords,
                    removerMarker = this.removerMarker;

                if (keywords.length === 0) {
                    removerMarker();
                }
            },

            deep: false
        }
    }
};

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getControllerPosition = __webpack_require__(7);

var _getControllerPosition2 = _interopRequireDefault(_getControllerPosition);

var _log2 = __webpack_require__(8);

var _log3 = _interopRequireDefault(_log2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {
    position: {
        required: true,
        twoway: false,
        type: Object
    },
    enableHighAccuracy: {
        required: false,
        twoway: false,
        type: Boolean,
        default: true
    },
    visible: {
        required: false,
        twoway: false,
        type: Boolean,
        default: true
    },
    locateSucceed: {
        required: false,
        twoway: false,
        type: Function
    },
    locateFailed: {
        required: false,
        twoway: false,
        type: Function
    }
};

exports.default = {
    props: props,
    data: function data() {
        return {
            styleObj: {},
            isLocating: false,
            $geoLocation: undefined
        };
    },
    ready: function ready() {
        var $map = this.$parent.$map;
        this.styleObj = (0, _getControllerPosition2.default)(this.position);
        $map ? this.addController() : this.$parent.$on("ready", this.addController);
    },
    beforeDestroy: function beforeDestroy() {
        this.removeController();
    },

    methods: {
        addController: function addController() {
            var $map = this.$parent.$map;
            var $geoLocation = this.$geoLocation = new BMap.Geolocation();
        },
        removeController: function removeController() {
            this.$geoLocation = null;
        },
        locate: function locate() {
            var _this = this;
            var $parent = this.$parent,
                isLocating = this.isLocating,
                $geoLocation = this.$geoLocation,
                enableHighAccuracy = this.enableHighAccuracy,
                locateSucceed = this.locateSucceed,
                locateFailed = this.locateFailed;

            var $map = $parent.$map;
            if (isLocating || !$geoLocation) {
                (0, _log3.default)("定位中...");
                return;
            };
            this.isLocating = true;
            $parent.LOADING.show();
            $geoLocation.getCurrentPosition(function (r) {
                if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                    $parent.currentLocation = {
                        lng: r.point.lng,
                        lat: r.point.lat
                    };
                    console.log(_this.locateSucceed);
                    locateSucceed && locateSucceed(r);
                    $map.centerAndZoom(r.point, 13);
                } else {
                    alert("定位失败");
                    (0, _log3.default)('locate failed' + this.getStatus());
                    locateFailed && locateFailed();
                }
                $parent.LOADING.hide();
                _this.isLocating = false;
            }, { enableHighAccuracy: enableHighAccuracy });
        }
    }
};

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getControllerPosition = __webpack_require__(7);

var _getControllerPosition2 = _interopRequireDefault(_getControllerPosition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {
    position: {
        required: true,
        twoway: false,
        type: Object
    },
    visible: {
        required: false,
        twoway: false,
        type: Boolean,
        default: true
    }
};

exports.default = {
    props: props,
    data: function data() {
        return {
            mapTypeName: "卫星图像",
            styleObj: {}
        };
    },
    ready: function ready() {
        this.styleObj = (0, _getControllerPosition2.default)(this.position);
    },

    methods: {
        changeMapType: function changeMapType() {
            var $map = this.$parent.$map;

            if (this.mapTypeName === "普通地图") {
                $map.setMapType(BMAP_NORMAL_MAP);
                this.mapTypeName = "卫星图像";
            } else {
                $map.setMapType(BMAP_HYBRID_MAP);
                this.mapTypeName = "普通地图";
            }
        }
    }
};

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getControllerPosition = __webpack_require__(7);

var _getControllerPosition2 = _interopRequireDefault(_getControllerPosition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {
    position: {
        required: true,
        twoway: false,
        type: Object
    },
    visible: {
        required: false,
        twoway: false,
        type: Boolean,
        default: true
    }
};
exports.default = {
    props: props,
    data: function data() {
        return {
            styleObj: {}
        };
    },
    ready: function ready() {
        this.styleObj = (0, _getControllerPosition2.default)(this.position);
    },

    methods: {
        zoomIn: function zoomIn() {
            var _this = this;
            var $map = this.$parent.$map;

            if ($map) {
                $map.zoomTo($map.getZoom() + 1);
            }
        },
        zoomOut: function zoomOut() {
            var _this = this;
            var $map = this.$parent.$map;

            if ($map) {
                $map.zoomTo($map.getZoom() - 1);
            }
        }
    }
};

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _factory = __webpack_require__(11);

var _removeOverlay2 = __webpack_require__(20);

var _bindEvent = __webpack_require__(12);

var _bindEvent2 = _interopRequireDefault(_bindEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var eventList = ["close", "open", "maximize", "restore", "clickclose"];

var props = {
    size: {
        required: false,
        type: Object,
        twoway: false
    },
    visible: {
        required: false,
        type: Boolean,
        twoway: false,
        default: false
    },
    position: {
        required: false,
        type: Object,
        twoway: false
    },
    offset: {
        required: false,
        type: Object,
        twoway: false,
        default: function _default() {
            return {
                x: 0,
                y: 0
            };
        }
    },
    enableAutoPan: {
        required: false,
        type: Boolean,
        twoway: false,
        default: true
    },
    enableCloseOnClick: {
        required: false,
        type: Boolean,
        twoway: false,
        default: true
    },
    enableMessage: {
        required: false,
        type: Boolean,
        twoway: false,
        default: false
    },
    message: String,
    title: String
};
exports.default = {
    props: props,
    data: function data() {
        return {
            componentType: "infoWindow",
            $overlay: undefined
        };
    },
    ready: function ready() {
        var $map = this.$parent.$map;

        $map ? this.addOverlay() : this.$parent.$on("ready", this.addOverlay);
    },
    beforeDestroy: function beforeDestroy() {
        this.removeOverlay();
    },

    watch: {
        visible: function visible(val) {
            var position = this.position,
                $overlay = this.$overlay;
            var $map = this.$parent.$map;

            console.log("infoWindow visible change");
            if (val && position) {
                $map.openInfoWindow($overlay, (0, _factory.createPoint)(position));
            } else {
                $map.closeInfoWindow();
            }
        }
    },
    methods: {
        addOverlay: function addOverlay() {
            var $overlay = this.$overlay,
                visible = this.visible,
                size = this.size,
                position = this.position,
                offset = this.offset,
                title = this.title,
                enableAutoPan = this.enableAutoPan,
                enableCloseOnClick = this.enableCloseOnClick,
                enableMessage = this.enableMessage,
                updateStatus = this.updateStatus;
            var $map = this.$parent.$map;

            var $content = this.$el;
            this.$overlay = $overlay = new BMap.InfoWindow($content, {
                width: size.width,
                height: size.height,
                offset: (0, _factory.createSize)(offset),
                title: title,
                enableAutoPan: enableAutoPan,
                enableCloseOnClick: enableCloseOnClick,
                enableMessage: enableMessage
            });
            _bindEvent2.default.call(this, eventList);
            visible && $map.openInfoWindow($overlay, (0, _factory.createPoint)(position));
        },
        removeOverlay: function removeOverlay() {
            var $container = this.$parent.$overlay;
            var $overlay = this.$overlay;

            $overlay.content = null;
            _removeOverlay2.removeOverlay.call(this, this.$parent.$overlay, '$overlay');
            console.log($overlay);
        }
    }
};

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _init = __webpack_require__(58);

var _init2 = _interopRequireDefault(_init);

var _checkMap = __webpack_require__(57);

var _checkMap2 = _interopRequireDefault(_checkMap);

var _bindEvent = __webpack_require__(12);

var _bindEvent2 = _interopRequireDefault(_bindEvent);

var _bindContextMenu = __webpack_require__(34);

var _bindContextMenu2 = _interopRequireDefault(_bindContextMenu);

var _loadingAnimation = __webpack_require__(59);

var _loadingAnimation2 = _interopRequireDefault(_loadingAnimation);

__webpack_require__(117);

var _log2 = __webpack_require__(8);

var _log3 = _interopRequireDefault(_log2);

var _factory = __webpack_require__(11);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {
    center: {
        required: false,
        twoWay: false,
        type: Object
    },
    zoom: {
        required: false,
        twoway: false,
        type: Number
    },
    usewatch: {
        required: false,
        twoway: false,
        type: Boolean,
        default: true
    },
    mapReady: {
        required: false,
        twoway: false,
        type: Function
    },
    contextMenu: {
        required: false,
        type: Array,
        twoway: false,
        default: undefined
    },
    location: {
        required: false,
        type: Boolean,
        twoway: false,
        default: false
    },
    locateSucceed: {
        required: false,
        twoway: false,
        type: Function
    },
    locateFailed: {
        required: false,
        twoway: false,
        type: Function
    },
    enableScrollWheelZoom: {
        required: false,
        type: Boolean,
        twoway: false,
        default: false
    },
    enableHighAccuracy: {
        required: false,
        type: Boolean,
        twoway: false,
        default: false
    }
};

var eventList = ["click", "dblclick", "rightclick", "rightdblclick", "maptypechange", "mousemove", "mouseover", "mouseout", "movestart", "moving", "moveend", "zoomstart", "zoomend", "addoverlay", "addcontrol", "removecontrol", "removeoverlay", "clearoverlays", "dragstart", "dragging", "dragend", "addtilelayer", "removetilelayer", "load", "resize", "hotspotclick", "hotspotover", "hotspotout", "tilesloaded", "touchstart", "touchmove", "touchend", "longpress"];

exports.default = {
    props: props,
    data: function data() {
        return {
            componentType: "bmap",
            mapTypeName: "卫星图像",
            $map: undefined,
            $overlay: undefined,
            $contextMenu: undefined,
            status: {
                isFullscreen: false }
        };
    },
    ready: function ready() {
        var _this = this;
        _this.LOADING = new _loadingAnimation2.default("#baidu-map-box");
        _this.LOADING.show();
        if (!(0, _checkMap2.default)()) {
            window['vue_baidu_map_initialize_callback_fn'] = function () {
                _this.createMap();
                window['vue_baidu_map_initialize_callback_fn'] = null;
            };
        } else {
            _this.createMap();
        }
    },
    beforeDestroy: function beforeDestroy() {
        this.removeMap();
    },

    watch: {
        "contextMenu": {
            handler: function handler(val) {
                _bindContextMenu2.default.call(this);
            },
            deep: true
        },
        "enableScrollWheelZoom": {
            handler: function handler(val) {
                var $map = this.$map;

                if ($map) {
                    val ? $map.enableScrollWheelZoom() : $map.disableScrollWheelZoom();
                }
            },

            deep: false
        }
    },
    methods: {
        createMap: function createMap() {
            var contextMenu = this.contextMenu,
                mapReady = this.mapReady;

            this.$map = this.$overlay = new BMap.Map(this.$els.map);
            _init2.default.call(this);
            contextMenu && _bindContextMenu2.default.call(this);
            eventList && _bindEvent2.default.call(this, eventList);
            mapReady && mapReady(this);
            this.$emit('ready');
        },
        removeMap: function removeMap() {
            var $overlay = this.$overlay;

            if ($overlay) {
                $overlay.clearoverlays();
                this.$overlay = this.$map = null;
                if (process.env.NODE_ENV === "development") (0, _log3.default)("[vue-baidu-map] delete map!");
            }
        },
        setViewport: function setViewport(points, viewportOptions) {
            if (this.$overlay && (0, _checkMap2.default)()) {
                var pointsArr = points.map(function (item, index, arr) {
                    return (0, _factory.createPoint)(item);
                });
                this.$overlay.setViewport(pointsArr, viewportOptions);
            }
        }
    }
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(45)))

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _bindEvent = __webpack_require__(12);

var _bindEvent2 = _interopRequireDefault(_bindEvent);

var _bindContextMenu = __webpack_require__(34);

var _bindContextMenu2 = _interopRequireDefault(_bindContextMenu);

var _log2 = __webpack_require__(8);

var _log3 = _interopRequireDefault(_log2);

var _factory = __webpack_require__(11);

var _removeOverlay2 = __webpack_require__(20);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {
    visible: {
        required: false,
        twoway: false,
        type: Boolean,
        default: true
    },
    position: {
        required: true,
        twoway: false,
        type: Object
    },
    icon: {
        required: false,
        twoway: false,
        type: Object
    },
    label: {
        required: false,
        twoway: false,
        type: Object
    },
    zIndex: {
        required: false,
        twoway: false,
        type: Number
    },
    enableDragging: {
        required: false,
        twoway: false,
        type: Boolean,
        default: false
    },
    enableClicking: {
        required: false,
        twoway: false,
        type: Boolean,
        default: true
    },
    enableMassClear: {
        required: false,
        twoway: false,
        type: Boolean,
        default: true
    },
    raiseOnDrag: {
        required: false,
        twoway: false,
        type: Boolean,
        default: false
    },
    rotation: Number,
    cid: String,
    contextMenu: Array
};

var eventList = ["click", "dblclick", "mousedown", "mouseup", "mouseout", "mouseover", "remove", "infowindowclose", "infowindowopen", "rightclick", "dragstart", "dragging", "dragend"];

exports.default = {
    props: props,
    data: function data() {
        return {
            componentType: "marker",
            $overlay: undefined,
            $label: undefined,
            $contextMenu: undefined
        };
    },
    ready: function ready() {
        var $map = this.$parent.$map;
        $map ? this.addOverlay() : this.$parent.$on("ready", this.addOverlay);
    },
    beforeDestroy: function beforeDestroy() {
        this.removeOverlay();
    },

    watch: {
        "position": {
            handler: function handler(val) {
                if (this.$overlay) {
                    this.$overlay.setPosition((0, _factory.createPoint)(val));
                }
            },

            deep: true
        },
        "icon": {
            handler: function handler(val) {
                if (this.$overlay) {
                    this.$overlay.setIcon((0, _factory.createIcon)(val));
                }
            },

            deep: true
        },

        "visible": {
            handler: function handler(val) {
                if (this.$overlay) {
                    val ? this.$overlay.show() : this.$overlay.hide();
                }
            },

            deep: false
        },
        "label": {
            handler: function handler(val) {
                if (this.$overlay) {
                    if (this.$label) {
                        this.$label.setContent(val.text);
                        this.$label.setOffset((0, _factory.createSize)(val.offset));
                    } else {
                        this.$overlay.setLabel(this.$label = (0, _factory.createLabel)(val));
                    }
                }
            },

            deep: true
        },
        "enableDragging": {
            handler: function handler(val) {
                if (this.$overlay) {
                    val ? this.$overlay.enableDragging() : this.$overlay.disableDarging();
                }
            },

            deep: false
        },
        "enableMassClear": {
            handler: function handler(val) {
                if (this.$overlay) {
                    val ? this.$overlay.enableMassClear() : this.$overlay.disableMassClear();
                }
            },

            deep: false
        },
        "rotation": {
            handler: function handler(val) {
                if (this.$overlay) {
                    !isNaN(val) && this.$overlay.setRotation(val);
                }
            },

            deep: false
        },
        "zIndex": {
            handler: function handler(val) {
                if (this.$overlay) {
                    val !== undefined && this.$overlay.setZIndex(val);
                }
            },

            deep: false
        },
        "contextMenu": {
            handler: function handler(val) {},

            deep: true
        }
    },
    methods: {
        addOverlay: function addOverlay() {
            var $overlay = this.$overlay,
                visible = this.visible,
                position = this.position,
                label = this.label,
                contextMenu = this.contextMenu,
                icon = this.icon,
                zIndex = this.zIndex,
                enableMassClear = this.enableMassClear,
                enableDragging = this.enableDragging,
                enableClicking = this.enableClicking,
                raiseOnDrag = this.raiseOnDrag,
                updatePosition = this.updatePosition,
                rotation = this.rotation;

            this.$overlay = $overlay = new BMap.Marker((0, _factory.createPoint)(position), {
                enableMassClear: enableMassClear,
                enableDragging: enableDragging,
                enableClicking: enableClicking,
                raiseOnDrag: raiseOnDrag,
                rotation: rotation,
                icon: (0, _factory.createIcon)(icon)
            });
            label && $overlay.setLabel(this.$label = (0, _factory.createLabel)(label));
            eventList && _bindEvent2.default.call(this, eventList);
            contextMenu && _bindContextMenu2.default.call(this, contextMenu);
            !isNaN(zIndex) && $overlay.setZIndex(zIndex);
            this.$parent.$overlay.addOverlay($overlay);
            this.$overlay.addEventListener("dragging", updatePosition);
            visible ? $overlay.show() : $overlay.hide();
        },
        removeOverlay: function removeOverlay() {
            var $overlay = this.$overlay,
                $label = this.$label,
                $contextMenu = this.$contextMenu,
                updatePosition = this.updatePosition;

            if ($overlay && this.$parent.$overlay) {
                $overlay.removeEventListener("dragging", updatePosition);
                $contextMenu && $overlay.removeContextMenu($contextMenu);
                _removeOverlay2.removeOverlay.call(this, this.$parent.$overlay, '$label');
                _removeOverlay2.removeOverlay.call(this, this.$parent.$overlay, '$overlay');
            }
        },
        updatePosition: function updatePosition(e) {
            this.position.lat = e.point.lat;
            this.position.lng = e.point.lng;
        }
    }
};

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _bindEvent = __webpack_require__(12);

var _bindEvent2 = _interopRequireDefault(_bindEvent);

var _removeOverlay2 = __webpack_require__(20);

var _factory = __webpack_require__(11);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {
    visible: {
        required: false,
        twoway: false,
        type: Boolean,
        default: true
    },
    points: {
        required: true,
        twoway: false,
        type: Array
    },
    style: {
        required: false,
        twoway: false,
        type: Object,
        default: function _default() {
            return {};
        }
    },
    enableMassClear: {
        required: false,
        twoway: false,
        type: Boolean,
        default: true
    },
    enableEditing: {
        required: false,
        twoway: false,
        type: Boolean,
        default: false
    },
    enableClicking: {
        required: false,
        twoway: false,
        type: Boolean,
        default: true
    }
};

var eventList = ["click", "dblclick", "mousedown", "mouseup", "mouseout", "mouseover", "remove", "lineupdate"];

exports.default = {
    props: props,
    data: function data() {
        return {
            componentType: "polyline"
        };
    },
    ready: function ready() {
        var map = this.$parent.$map;
        map ? this.addOverlay() : this.$parent.$on("ready", this.addOverlay);
    },

    beforeDestroy: function beforeDestroy() {
        this.removeOverlay();
    },
    watch: {
        "points": {
            handler: function handler(val) {
                if (this.$overlay) {
                    var line = val.map(function (item, index, arr) {
                        return (0, _factory.createPoint)(item);
                    });
                    this.$overlay.setPath(line);
                }
            },

            deep: true
        },
        "style": {
            handler: function handler(val) {
                if (this.$overlay) {
                    if (val.strokeStyle) this.$overlay.setStrokeStyle(val.strokeStyle);
                    if (val.strokeColor) this.$overlay.setStrokeColor(val.strokeColor);
                    if (val.strokeWeight) this.$overlay.setStrokeWeight(val.strokeWeight);
                    if (val.strokeOpacity) this.$overlay.setStrokeOpacity(val.strokeOpacity);
                }
            },

            deep: true
        },
        "visible": {
            handler: function handler(val) {
                if (this.$overlay) {
                    val ? this.$overlay.show() : this.$overlay.hide();
                }
            },

            deep: false
        },
        "enableMassClear": {
            handler: function handler(val) {
                if (this.$overlay) {
                    val ? this.$overlay.enableMassClear() : this.$overlay.disableMassClear();
                }
            },

            deep: false
        },
        "enableEditing": {
            handler: function handler(val) {
                if (this.$overlay) {
                    val ? this.$overlay.enableEditing() : this.$overlay.disableEditing();
                }
            },

            deep: false
        }
    },
    methods: {
        addOverlay: function addOverlay() {
            var $overlay = this.$overlay,
                visible = this.visible,
                points = this.points,
                style = this.style,
                enableMassClear = this.enableMassClear,
                enableEditing = this.enableEditing,
                enableClicking = this.enableClicking;

            var line = points.map(function (item, index, arr) {
                return (0, _factory.createPoint)(item);
            });

            this.$overlay = $overlay = new BMap.Polyline(line, {
                strokeColor: style.strokeColor,
                strokeWeight: style.strokeWeight,
                strokeOpacity: style.strokeOpacity,
                strokeStyle: style.strokeStyle,
                enableMassClear: enableMassClear,
                enableEditing: enableEditing,
                enableClicking: enableClicking
            });
            this.$parent.$overlay.addOverlay($overlay);
            eventList && _bindEvent2.default.call(this, eventList);
            visible ? $overlay.show() : $overlay.hide();
        },
        removeOverlay: function removeOverlay() {
            var $overlay = this.$overlay;

            _removeOverlay2.removeOverlay.call(this, this.$parent.$map, '$overlay');
        }
    }
};

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(75), __esModule: true };

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(76), __esModule: true };

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(77), __esModule: true };

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(70);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(99);
var $Object = __webpack_require__(14).Object;
module.exports = function defineProperty(it, key, desc){
  return $Object.defineProperty(it, key, desc);
};

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(102);
__webpack_require__(100);
__webpack_require__(103);
__webpack_require__(104);
module.exports = __webpack_require__(14).Symbol;

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(101);
__webpack_require__(105);
module.exports = __webpack_require__(33).f('iterator');

/***/ }),
/* 78 */
/***/ (function(module, exports) {

module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};

/***/ }),
/* 79 */
/***/ (function(module, exports) {

module.exports = function(){ /* empty */ };

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(6)
  , toLength  = __webpack_require__(96)
  , toIndex   = __webpack_require__(95);
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(78);
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(17)
  , gOPS    = __webpack_require__(42)
  , pIE     = __webpack_require__(26);
module.exports = function(it){
  var result     = getKeys(it)
    , getSymbols = gOPS.f;
  if(getSymbols){
    var symbols = getSymbols(it)
      , isEnum  = pIE.f
      , i       = 0
      , key;
    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
  } return result;
};

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2).document && document.documentElement;

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(36);
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(36);
module.exports = Array.isArray || function isArray(arg){
  return cof(arg) == 'Array';
};

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create         = __webpack_require__(40)
  , descriptor     = __webpack_require__(18)
  , setToStringTag = __webpack_require__(27)
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(9)(IteratorPrototype, __webpack_require__(10)('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};

/***/ }),
/* 87 */
/***/ (function(module, exports) {

module.exports = function(done, value){
  return {value: value, done: !!done};
};

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

var getKeys   = __webpack_require__(17)
  , toIObject = __webpack_require__(6);
module.exports = function(object, el){
  var O      = toIObject(object)
    , keys   = getKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

var META     = __webpack_require__(19)('meta')
  , isObject = __webpack_require__(16)
  , has      = __webpack_require__(4)
  , setDesc  = __webpack_require__(5).f
  , id       = 0;
var isExtensible = Object.isExtensible || function(){
  return true;
};
var FREEZE = !__webpack_require__(15)(function(){
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function(it){
  setDesc(it, META, {value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  }});
};
var fastKey = function(it, create){
  // return primitive with prefix
  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return 'F';
    // not necessary to add metadata
    if(!create)return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function(it, create){
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return true;
    // not necessary to add metadata
    if(!create)return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function(it){
  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY:      META,
  NEED:     false,
  fastKey:  fastKey,
  getWeak:  getWeak,
  onFreeze: onFreeze
};

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

var dP       = __webpack_require__(5)
  , anObject = __webpack_require__(13)
  , getKeys  = __webpack_require__(17);

module.exports = __webpack_require__(3) ? Object.defineProperties : function defineProperties(O, Properties){
  anObject(O);
  var keys   = getKeys(Properties)
    , length = keys.length
    , i = 0
    , P;
  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

var pIE            = __webpack_require__(26)
  , createDesc     = __webpack_require__(18)
  , toIObject      = __webpack_require__(6)
  , toPrimitive    = __webpack_require__(31)
  , has            = __webpack_require__(4)
  , IE8_DOM_DEFINE = __webpack_require__(38)
  , gOPD           = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(3) ? gOPD : function getOwnPropertyDescriptor(O, P){
  O = toIObject(O);
  P = toPrimitive(P, true);
  if(IE8_DOM_DEFINE)try {
    return gOPD(O, P);
  } catch(e){ /* empty */ }
  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
};

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(6)
  , gOPN      = __webpack_require__(41).f
  , toString  = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function(it){
  try {
    return gOPN(it);
  } catch(e){
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it){
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has         = __webpack_require__(4)
  , toObject    = __webpack_require__(97)
  , IE_PROTO    = __webpack_require__(28)('IE_PROTO')
  , ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function(O){
  O = toObject(O);
  if(has(O, IE_PROTO))return O[IE_PROTO];
  if(typeof O.constructor == 'function' && O instanceof O.constructor){
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(30)
  , defined   = __webpack_require__(21);
// true  -> String#at
// false -> String#codePointAt
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(30)
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(30)
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(21);
module.exports = function(it){
  return Object(defined(it));
};

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(79)
  , step             = __webpack_require__(87)
  , Iterators        = __webpack_require__(24)
  , toIObject        = __webpack_require__(6);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(39)(Array, 'Array', function(iterated, kind){
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(23);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(3), 'Object', {defineProperty: __webpack_require__(5).f});

/***/ }),
/* 100 */
/***/ (function(module, exports) {



/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at  = __webpack_require__(94)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(39)(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global         = __webpack_require__(2)
  , has            = __webpack_require__(4)
  , DESCRIPTORS    = __webpack_require__(3)
  , $export        = __webpack_require__(23)
  , redefine       = __webpack_require__(44)
  , META           = __webpack_require__(89).KEY
  , $fails         = __webpack_require__(15)
  , shared         = __webpack_require__(29)
  , setToStringTag = __webpack_require__(27)
  , uid            = __webpack_require__(19)
  , wks            = __webpack_require__(10)
  , wksExt         = __webpack_require__(33)
  , wksDefine      = __webpack_require__(32)
  , keyOf          = __webpack_require__(88)
  , enumKeys       = __webpack_require__(82)
  , isArray        = __webpack_require__(85)
  , anObject       = __webpack_require__(13)
  , toIObject      = __webpack_require__(6)
  , toPrimitive    = __webpack_require__(31)
  , createDesc     = __webpack_require__(18)
  , _create        = __webpack_require__(40)
  , gOPNExt        = __webpack_require__(92)
  , $GOPD          = __webpack_require__(91)
  , $DP            = __webpack_require__(5)
  , $keys          = __webpack_require__(17)
  , gOPD           = $GOPD.f
  , dP             = $DP.f
  , gOPN           = gOPNExt.f
  , $Symbol        = global.Symbol
  , $JSON          = global.JSON
  , _stringify     = $JSON && $JSON.stringify
  , PROTOTYPE      = 'prototype'
  , HIDDEN         = wks('_hidden')
  , TO_PRIMITIVE   = wks('toPrimitive')
  , isEnum         = {}.propertyIsEnumerable
  , SymbolRegistry = shared('symbol-registry')
  , AllSymbols     = shared('symbols')
  , OPSymbols      = shared('op-symbols')
  , ObjectProto    = Object[PROTOTYPE]
  , USE_NATIVE     = typeof $Symbol == 'function'
  , QObject        = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function(){
  return _create(dP({}, 'a', {
    get: function(){ return dP(this, 'a', {value: 7}).a; }
  })).a != 7;
}) ? function(it, key, D){
  var protoDesc = gOPD(ObjectProto, key);
  if(protoDesc)delete ObjectProto[key];
  dP(it, key, D);
  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function(tag){
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
  return typeof it == 'symbol';
} : function(it){
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D){
  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if(has(AllSymbols, key)){
    if(!D.enumerable){
      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
      D = _create(D, {enumerable: createDesc(0, false)});
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P){
  anObject(it);
  var keys = enumKeys(P = toIObject(P))
    , i    = 0
    , l = keys.length
    , key;
  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P){
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key){
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
  it  = toIObject(it);
  key = toPrimitive(key, true);
  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
  var D = gOPD(it, key);
  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it){
  var names  = gOPN(toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
  var IS_OP  = it === ObjectProto
    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if(!USE_NATIVE){
  $Symbol = function Symbol(){
    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function(value){
      if(this === ObjectProto)$set.call(OPSymbols, value);
      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f   = $defineProperty;
  __webpack_require__(41).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(26).f  = $propertyIsEnumerable;
  __webpack_require__(42).f = $getOwnPropertySymbols;

  if(DESCRIPTORS && !__webpack_require__(25)){
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function(name){
    return wrap(wks(name));
  }
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

for(var symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function(key){
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(key){
    if(isSymbol(key))return keyOf(SymbolRegistry, key);
    throw TypeError(key + ' is not a symbol!');
  },
  useSetter: function(){ setter = true; },
  useSimple: function(){ setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it){
    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
    var args = [it]
      , i    = 1
      , replacer, $replacer;
    while(arguments.length > i)args.push(arguments[i++]);
    replacer = args[1];
    if(typeof replacer == 'function')$replacer = replacer;
    if($replacer || !isArray(replacer))replacer = function(key, value){
      if($replacer)value = $replacer.call(this, key, value);
      if(!isSymbol(value))return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(9)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(32)('asyncIterator');

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(32)('observable');

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(98);
var global        = __webpack_require__(2)
  , hide          = __webpack_require__(9)
  , Iterators     = __webpack_require__(24)
  , TO_STRING_TAG = __webpack_require__(10)('toStringTag');

for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
  var NAME       = collections[i]
    , Collection = global[NAME]
    , proto      = Collection && Collection.prototype;
  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "/** Loading animation */\n.loading-animation-1-0-1 * {\n    box-sizing: border-box;\n    color: #fff;\n}\n.loading-animation-1-0-1 {\n    display: none;\n    z-index: 999;\n    pointer-events: none;\n    box-sizing: border-box;\n    position: absolute;\n    margin: auto;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    width: 100px;\n    height: 100px;\n    padding: 0;\n    background: #3a3c3f;\n    background: rgba( 0,0,0,0.65);\n    border-radius: 3px;\n    text-align: center;\n    transition: all 0.15s ease;\n}\n.loading-animation-1-0-1 .circle {\n    position: relative;\n    width: 45px;\n    height: 45px;\n    margin: 27.5px auto 27.5px auto;\n    border: 5px solid #fff;\n    border-radius: 50%;\n    animation: loading-animation-1-0-1 2s infinite ;\n    animation-timing-function: linear;\n}\n.loading-animation-1-0-1 h3 {\n    font-family: sans-serif;\n    font-size: 15px;\n    margin-top: 8px;\n}\n@keyframes loading-animation-1-0-1 {\n    0% {\n        border-top: 5px solid rgba(255,255,255,0.1);\n        border-left: 5px solid #fff;\n        border-right: 5px solid #fff;\n        border-bottom: 5px solid #fff;\n        /*border-bottom: 5px solid rgba(255,255,255,0.1);*/\n        transform: rotate(45deg);\n    }\n    100% {\n        border-top: 5px solid rgba(255,255,255,0.1);\n        border-left: 5px solid #fff;\n        border-right: 5px solid #fff;\n        border-bottom: 5px solid #fff;\n        transform: rotate(405deg);\n    }\n}\n", ""]);

// exports


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "@charset \"UTF-8\";\n@font-face {\n  font-family: \"iconfont\";\n  src: url(\"//at.alicdn.com/t/font_vd2vfl6vibe29.eot?t=1487219929358\");\n  /* IE9*/\n  src: url(\"//at.alicdn.com/t/font_vd2vfl6vibe29.eot?t=1487219929358#iefix\") format(\"embedded-opentype\"), url(\"//at.alicdn.com/t/font_vd2vfl6vibe29.woff?t=1487219929358\") format(\"woff\"), url(\"//at.alicdn.com/t/font_vd2vfl6vibe29.ttf?t=1487219929358\") format(\"truetype\"), url(\"//at.alicdn.com/t/font_vd2vfl6vibe29.svg?t=1487219929358#iconfont\") format(\"svg\");\n  /* iOS 4.1- */ }\n\n.iconfont {\n  font-family: \"iconfont\" !important;\n  font-size: 16px;\n  font-style: normal;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale; }\n\n.icon-zoomin:before {\n  content: \"\\E61D\"; }\n\n.icon-zoomout:before {\n  content: \"\\E61E\"; }\n\n.icon-location:before {\n  content: \"\\E640\"; }\n\n.icon-search:before {\n  content: \"\\E611\"; }\n\n/*\n * Colors\n */\n/* font color */\n/** 右键菜单 */\n.BMap_contextMenu {\n  box-shadow: rgba(0, 0, 0, 0.468) 0.3px 1px 4px -1px !important;\n  border: none !important; }\n  .BMap_contextMenu span {\n    color: #222 !important; }\n    .BMap_contextMenu span:hover {\n      color: #189adb !important; }\n", "", {"version":3,"sources":["/./lib/overlays/map.vue"],"names":[],"mappings":"AAAA,iBAAiB;AACjB;EACE,wBAAwB;EACxB,qEAAqE;EACrE,QAAQ;EACR,oWAAoW;EACpW,cAAc,EAAE;;AAElB;EACE,mCAAmC;EACnC,gBAAgB;EAChB,mBAAmB;EACnB,oCAAoC;EACpC,mCAAmC,EAAE;;AAEvC;EACE,iBAAiB,EAAE;;AAErB;EACE,iBAAiB,EAAE;;AAErB;EACE,iBAAiB,EAAE;;AAErB;EACE,iBAAiB,EAAE;;AAErB;;GAEG;AACH,gBAAgB;AAChB,WAAW;AACX;EACE,+DAA+D;EAC/D,wBAAwB,EAAE;EAC1B;IACE,uBAAuB,EAAE;IACzB;MACE,0BAA0B,EAAE","file":"map.vue","sourcesContent":["@charset \"UTF-8\";\n@font-face {\n  font-family: \"iconfont\";\n  src: url(\"//at.alicdn.com/t/font_vd2vfl6vibe29.eot?t=1487219929358\");\n  /* IE9*/\n  src: url(\"//at.alicdn.com/t/font_vd2vfl6vibe29.eot?t=1487219929358#iefix\") format(\"embedded-opentype\"), url(\"//at.alicdn.com/t/font_vd2vfl6vibe29.woff?t=1487219929358\") format(\"woff\"), url(\"//at.alicdn.com/t/font_vd2vfl6vibe29.ttf?t=1487219929358\") format(\"truetype\"), url(\"//at.alicdn.com/t/font_vd2vfl6vibe29.svg?t=1487219929358#iconfont\") format(\"svg\");\n  /* iOS 4.1- */ }\n\n.iconfont {\n  font-family: \"iconfont\" !important;\n  font-size: 16px;\n  font-style: normal;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale; }\n\n.icon-zoomin:before {\n  content: \"\\e61d\"; }\n\n.icon-zoomout:before {\n  content: \"\\e61e\"; }\n\n.icon-location:before {\n  content: \"\\e640\"; }\n\n.icon-search:before {\n  content: \"\\e611\"; }\n\n/*\n * Colors\n */\n/* font color */\n/** 右键菜单 */\n.BMap_contextMenu {\n  box-shadow: rgba(0, 0, 0, 0.468) 0.3px 1px 4px -1px !important;\n  border: none !important; }\n  .BMap_contextMenu span {\n    color: #222 !important; }\n    .BMap_contextMenu span:hover {\n      color: #189adb !important; }\n"],"sourceRoot":"webpack://"}]);

// exports


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.controller-section[_v-03febde3] {\n    z-index: 2;\n    position: absolute;\n    overflow: hidden;\n    width: 28px !important;\n    height: 28px !important;\n    color: #4d4d4d;\n    box-shadow: rgba(0, 0, 0, 0.468) 0.3px 1px 4px -1px !important;\n}\n.locate-btn[_v-03febde3] {\n    display: block;\n    width: 100%;\n    height: 100%;\n    line-height: 30px;\n    cursor: pointer;\n    color: inherit;\n    border: none;\n    background-color: #fff;\n}\n.location-animation[_v-03febde3] {\n    -webkit-animation: 1.4s location-animation infinite ease-in-out;\n            animation: 1.4s location-animation infinite ease-in-out;\n}\n@-webkit-keyframes location-animation {\n    0% {\n        color: #4d4d4d;\n    }\n    50% {\n        color: #288adb;\n    }\n    100% {\n        color: #4d4d4d;\n    }\n}\n@keyframes location-animation {\n    0% {\n        color: #4d4d4d;\n    }\n    50% {\n        color: #288adb;\n    }\n    100% {\n        color: #4d4d4d;\n    }\n}\n", "", {"version":3,"sources":["/./lib/controllers/locateController.vue?fdfccf34"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AAkGA;IACA,WAAA;IACA,mBAAA;IACA,iBAAA;IACA,uBAAA;IACA,wBAAA;IACA,eAAA;IACA,+DAAA;CACA;AACA;IACA,eAAA;IACA,YAAA;IACA,aAAA;IACA,kBAAA;IACA,gBAAA;IACA,eAAA;IACA,aAAA;IACA,uBAAA;CACA;AACA;IACA,gEAAA;YAAA,wDAAA;CACA;AACA;IACA;QACA,eAAA;KACA;IACA;QACA,eAAA;KACA;IACA;QACA,eAAA;KACA;CACA;AAVA;IACA;QACA,eAAA;KACA;IACA;QACA,eAAA;KACA;IACA;QACA,eAAA;KACA;CACA","file":"locateController.vue","sourcesContent":["<template>\n    <div v-show=\"visible\" class=\"controller-section\" :style=\"styleObj\">\n        <button @click=\"locate\" class=\"locate-btn\" v-bind:class=\"{'location-animation': isLocating }\"><i class=\"iconfont icon-location\"></i></button>\n    </div>\n</template>\n<script>\n    import getControllerPosition from \"utils/getControllerPosition\";\n    import _log from \"utils/log.js\";\n\n    const props = {\n        position: {\n            required: true,\n            twoway: false,\n            type: Object\n        },\n        enableHighAccuracy: {\n            required: false,\n            twoway: false,\n            type: Boolean,\n            default: true\n        },\n        visible: {\n            required: false,\n            twoway: false,\n            type: Boolean,\n            default: true,\n        },\n        locateSucceed: {\n            required: false,\n            twoway: false,\n            type: Function\n        },\n        locateFailed: {\n            required: false,\n            twoway: false,\n            type: Function\n        }\n    };\n\n    export default {\n        props,\n        data () {\n            return {\n                styleObj: {},\n                isLocating: false,                  // 是否在定位中\n                $geoLocation: undefined,\n            }\n        },\n        ready () {\n            let $map = this.$parent.$map;\n            this.styleObj = getControllerPosition(this.position);\n            $map ? this.addController() : this.$parent.$on(\"ready\", this.addController);\n        },\n        beforeDestroy () {\n            this.removeController();\n        },\n        methods: {\n            addController () {\n                let $map = this.$parent.$map;\n                let $geoLocation = this.$geoLocation = new BMap.Geolocation();\n            },\n\n            removeController () {\n                this.$geoLocation = null;\n            },\n\n            locate () {\n                let _this = this;\n                let { $parent, isLocating, $geoLocation, enableHighAccuracy, locateSucceed, locateFailed } = this;\n                let $map = $parent.$map;\n                if (isLocating || !$geoLocation) {\n                    _log(\"定位中...\")\n                    return;\n                };\n                this.isLocating = true;\n                $parent.LOADING.show();\n                $geoLocation.getCurrentPosition( function( r ){\n                    if( this.getStatus() == BMAP_STATUS_SUCCESS ){\n                        $parent.currentLocation = {\n                            lng: r.point.lng,\n                            lat: r.point.lat\n                        };\n                        console.log(_this.locateSucceed);\n                        locateSucceed && locateSucceed( r );\n                        $map.centerAndZoom( r.point, 13 );\n                    } else {\n                        alert( \"定位失败\" );\n                        _log( 'locate failed' + this.getStatus() );\n                        locateFailed && locateFailed();\n                    }\n                    $parent.LOADING.hide();\n                    _this.isLocating = false;\n                },{ enableHighAccuracy: enableHighAccuracy });\n            }\n        },\n    }\n</script>\n<style lang=\"css\" scoped>\n    .controller-section {\n        z-index: 2;\n        position: absolute;\n        overflow: hidden;\n        width: 28px !important;\n        height: 28px !important;\n        color: #4d4d4d;\n        box-shadow: rgba(0, 0, 0, 0.468) 0.3px 1px 4px -1px !important;\n    }\n    .locate-btn {\n        display: block;\n        width: 100%;\n        height: 100%;\n        line-height: 30px;\n        cursor: pointer;\n        color: inherit;\n        border: none;\n        background-color: #fff;\n    }\n    .location-animation {\n        animation: 1.4s location-animation infinite ease-in-out;\n    }\n    @keyframes location-animation {\n        0% {\n            color: #4d4d4d;\n        }\n        50% {\n            color: #288adb;\n        }\n        100% {\n            color: #4d4d4d;\n        }\n    }\n</style>\n"],"sourceRoot":"webpack://"}]);

// exports


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n*[_v-0606bf2c] {\n    box-sizing: border-box;\n    padding: 0;\n    margin:0;\n}\n.controller-section[_v-0606bf2c] {\n    z-index: 2;\n    position: absolute;\n    overflow: hidden;\n    width: 240px;\n    height: 45px;\n    background: #fff;\n    box-shadow: 0 1px 2.9px 0.1px rgba(0, 0, 0, 0.48);\n}\n.search-input[_v-0606bf2c] {\n    position: absolute;\n    display: block;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    padding: 15px;\n    outline: none;\n    border: none;\n    background-color: #ffffff;\n    color: $font-color;\n    font-size: 14px;\n}\n.search-logo[_v-0606bf2c] {\n    display: block;\n    position: absolute;\n    right: 0;\n    bottom: 0;\n    width: 45px;\n    height: 45px;\n    border: none;\n    outline: none;\n    cursor: pointer;\n    font-size: 20px;\n    text-align: center !important;\n    color: #4d4d4d;\n    background: transparent;\n}\n", "", {"version":3,"sources":["/./lib/controllers/localSearchController.vue?daa8e830"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AAkGA;IACA,uBAAA;IACA,WAAA;IACA,SAAA;CACA;AACA;IACA,WAAA;IACA,mBAAA;IACA,iBAAA;IACA,aAAA;IACA,aAAA;IACA,iBAAA;IACA,kDAAA;CACA;AACA;IACA,mBAAA;IACA,eAAA;IACA,QAAA;IACA,YAAA;IACA,aAAA;IACA,cAAA;IACA,cAAA;IACA,aAAA;IACA,0BAAA;IACA,mBAAA;IACA,gBAAA;CACA;AACA;IACA,eAAA;IACA,mBAAA;IACA,SAAA;IACA,UAAA;IACA,YAAA;IACA,aAAA;IACA,aAAA;IACA,cAAA;IACA,gBAAA;IACA,gBAAA;IACA,8BAAA;IACA,eAAA;IACA,wBAAA;CACA","file":"localSearchController.vue","sourcesContent":["<template>\n    <div v-show=\"visible\" class=\"controller-section\" :style=\"styleObj\">\n        <input v-model=\"keywords\" @keyup.enter.stop.prevent=\"search\" type=\"text\" maxlength=\"20\" class=\"search-input\" placeholder=\"搜索地点\">\n        <button @click=\"search\" class=\"search-logo\"><i class=\"iconfont icon-search\"></i></button>\n    </div>\n</template>\n<script>\n    import getControllerPosition from \"utils/getControllerPosition\";\n\n    const props = {\n        position: {\n            required: true,\n            twoway: false,\n            type: Object\n        },\n        visible: {\n            required: false,\n            twoway: false,\n            type: Boolean,\n            default: true\n        },\n        callback: Function,\n    };\n\n    export default {\n        props,\n        data: function () {\n            return {\n                markerList: [],\n                styleObj: {},\n                $search: undefined,\n                keywords: '',\n            }\n        },\n        ready () {\n            let $map = this.$parent.$map;\n            this.styleObj = getControllerPosition(this.position);\n            $map ? this.addController() : this.$parent.$on(\"ready\", this.addController);\n        },\n        beforeDestroy () {\n            this.removeController();\n        },\n        methods: {\n            search () {\n                let _this = this;\n                let { $search, keywords, markerList, callback, removerMarker } = this;\n                let $parnet = this.$parent;\n                if ($search && keywords) {\n                    removerMarker();\n                    $parnet.LOADING.show();\n                    setTimeout( ()=> {\n                        $parnet.LOADING.hide();\n                    }, 300);\n                    $search.search(keywords);\n                    $search.setMarkersSetCallback(function(pois){\n                        _this.markerList = _this.markerList.concat(pois);\n                        callback && callback(pois);\n                    });\n                }\n            },\n\n            addController () {\n                let $map =  this.$parent.$map;\n                let { $search } = this;\n                this.$search = $search = new BMap.LocalSearch($map, {\n                    renderOptions:{ map: $map }\n                });\n                $search.disableFirstResultSelection();\n            },\n\n            removeController () {\n                this.$search = null;\n            },\n\n            removerMarker () {\n                let { keywords, markerList } = this;\n                let { $map } = this.$parent;\n                markerList.map(item => {\n                    $map.removeOverlay(item.marker);\n                });\n                this.markerList.splice(0, markerList.length);\n            },\n\n        },\n        watch: {\n            \"keywords\": {\n                handler () {\n                    let { keywords, removerMarker } = this;\n                    if (keywords.length === 0) {\n                        removerMarker();\n                    }\n                },\n                deep: false\n            }\n        }\n    }\n</script>\n<style lang=\"css\" scoped>\n    * {\n        box-sizing: border-box;\n        padding: 0;\n        margin:0;\n    }\n    .controller-section {\n        z-index: 2;\n        position: absolute;\n        overflow: hidden;\n        width: 240px;\n        height: 45px;\n        background: #fff;\n        box-shadow: 0 1px 2.9px 0.1px rgba(0, 0, 0, 0.48);\n    }\n    .search-input {\n        position: absolute;\n        display: block;\n        left: 0;\n        width: 100%;\n        height: 100%;\n        padding: 15px;\n        outline: none;\n        border: none;\n        background-color: #ffffff;\n        color: $font-color;\n        font-size: 14px;\n    }\n    .search-logo {\n        display: block;\n        position: absolute;\n        right: 0;\n        bottom: 0;\n        width: 45px;\n        height: 45px;\n        border: none;\n        outline: none;\n        cursor: pointer;\n        font-size: 20px;\n        text-align: center !important;\n        color: #4d4d4d;\n        background: transparent;\n    }\n</style>\n"],"sourceRoot":"webpack://"}]);

// exports


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.controller-section[_v-27e221ec] {\n    z-index: 2;\n    position: absolute;\n    overflow: hidden;\n    width: auto !important;\n    height: auto !important;\n}\n", "", {"version":3,"sources":["/./lib/controllers/controllerBox.vue?6cb51248"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AA0CA;IACA,WAAA;IACA,mBAAA;IACA,iBAAA;IACA,uBAAA;IACA,wBAAA;CACA","file":"controllerBox.vue","sourcesContent":["<!--box ：放置自定义控件-->\n<template>\n    <div v-show=\"visible\" class=\"controller-section\" :style=\"styleObj\">\n        <slot></slot>\n    </div>\n</template>\n<script>\n    import getControllerPosition from \"utils/getControllerPosition\";\n\n    const props = {\n        position: {\n            required: true,\n            twoway: false,\n            type: Object\n        },\n        visible: {\n            required: false,\n            twoway: false,\n            type: Boolean,\n            default: true\n        },\n        callback: {\n            required: false,\n            twoway: false,\n            type: Function\n        }\n    };\n\n    export default {\n        props,\n        data () {\n            return {\n                styleObj: {},\n                // $controller: undefined,\n            }\n        },\n        ready () {\n            this.styleObj = getControllerPosition(this.position);\n        },\n    }\n</script>\n<style lang=\"css\" scoped>\n    .controller-section {\n        z-index: 2;\n        position: absolute;\n        overflow: hidden;\n        width: auto !important;\n        height: auto !important;\n    }\n</style>\n"],"sourceRoot":"webpack://"}]);

// exports


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.controller-section[_v-28342882] {\n    z-index: 2;\n    position: absolute;\n    overflow: hidden;\n    width: 64px;\n    height: 28px;\n    /*box-shadow: rgba(0, 0, 0, 0.298039) 0px 1px 4px -1px;*/\n    box-shadow: rgba(0, 0, 0, 0.468) 0.3px 1px 4px -1px !important;\n}\n#map-type-toggle[_v-28342882] {\n    display: block;\n    height: 28px;\n    width: 100%;\n    padding: 0;\n    outline: none;\n    border: none;\n    /*border: 1px solid #cdcdcd;*/\n    overflow: hidden;\n    white-space:nowrap;\n    background-color: #ffffff;\n    color: #4d4d4d;\n    font-size: 13px;\n    cursor: pointer;\n}\n", "", {"version":3,"sources":["/./lib/controllers/toggleTypeController.vue?2daa853d"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AAmDA;IACA,WAAA;IACA,mBAAA;IACA,iBAAA;IACA,YAAA;IACA,aAAA;IACA,yDAAA;IACA,+DAAA;CACA;AACA;IACA,eAAA;IACA,aAAA;IACA,YAAA;IACA,WAAA;IACA,cAAA;IACA,aAAA;IACA,8BAAA;IACA,iBAAA;IACA,mBAAA;IACA,0BAAA;IACA,eAAA;IACA,gBAAA;IACA,gBAAA;CACA","file":"toggleTypeController.vue","sourcesContent":["<!--notice\n    removeController method is not existing\n-->\n<template>\n    <div v-show=\"visible\" class=\"controller-section\" :style=\"styleObj\" >\n        <button @click=\"changeMapType\" id=\"map-type-toggle\">{{ mapTypeName }}</button>\n    </div>\n</template>\n<script>\nimport getControllerPosition from \"utils/getControllerPosition\";\n\nconst props = {\n    position: {\n        required: true,\n        twoway: false,\n        type: Object\n    },\n    visible: {\n        required: false,\n        twoway: false,\n        type: Boolean,\n        default: true\n    },\n};\n\nexport default {\n    props,\n    data () {\n        return {\n            mapTypeName: \"卫星图像\",\n            styleObj: {}\n        }\n    },\n    ready () {\n        this.styleObj = getControllerPosition(this.position);\n    },\n    methods: {\n        changeMapType () {\n            let { $map } = this.$parent;\n            if ( this.mapTypeName === \"普通地图\" ) {\n                $map.setMapType( BMAP_NORMAL_MAP );\n                this.mapTypeName = \"卫星图像\";\n            } else {\n                $map.setMapType( BMAP_HYBRID_MAP );\n                this.mapTypeName = \"普通地图\";\n            }\n        }\n    }\n}\n</script>\n<style lang=\"css\" scoped>\n    .controller-section {\n        z-index: 2;\n        position: absolute;\n        overflow: hidden;\n        width: 64px;\n        height: 28px;\n        /*box-shadow: rgba(0, 0, 0, 0.298039) 0px 1px 4px -1px;*/\n        box-shadow: rgba(0, 0, 0, 0.468) 0.3px 1px 4px -1px !important;\n    }\n    #map-type-toggle {\n        display: block;\n        height: 28px;\n        width: 100%;\n        padding: 0;\n        outline: none;\n        border: none;\n        /*border: 1px solid #cdcdcd;*/\n        overflow: hidden;\n        white-space:nowrap;\n        background-color: #ffffff;\n        color: #4d4d4d;\n        font-size: 13px;\n        cursor: pointer;\n    }\n</style>\n"],"sourceRoot":"webpack://"}]);

// exports


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.controller-section[_v-36aab038] {\n    z-index: 2;\n    position: absolute;\n    overflow: hidden;\n    width: 28px;\n    height: 56px;\n    background: #fff;\n    /*box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px;*/\n    box-shadow: rgba(0, 0, 0, 0.468) 0.3px 1px 4px -1px !important;\n}\n#zoom-in[_v-36aab038],\n#zoom-out[_v-36aab038] {\n    position: absolute;\n    display: block;\n    left: 0;\n    width: 28px;\n    height: 28px;\n    outline: none;\n    /*border: 1px solid #cdcdcd;*/\n    border: none;\n    background-color: #ffffff;\n    color: #4d4d4d;\n    cursor: pointer;\n    font-size: 18px;\n    &:hover {\n         color: #189adb;\n     }\n}\n#zoom-in[_v-36aab038] {\n    top: 0;\n    border-bottom: 1px solid rgba(0,0,0,0.15);\n}\n#zoom-out[_v-36aab038] {\n    top: 28px;\n}\n", "", {"version":3,"sources":["/./lib/controllers/zoomController.vue?0c92249a"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AAmDA;IACA,WAAA;IACA,mBAAA;IACA,iBAAA;IACA,YAAA;IACA,aAAA;IACA,iBAAA;IACA,oDAAA;IACA,+DAAA;CACA;AACA;;IAEA,mBAAA;IACA,eAAA;IACA,QAAA;IACA,YAAA;IACA,aAAA;IACA,cAAA;IACA,8BAAA;IACA,aAAA;IACA,0BAAA;IACA,eAAA;IACA,gBAAA;IACA,gBAAA;IACA;SACA,eAAA;MACA;CACA;AACA;IACA,OAAA;IACA,0CAAA;CACA;AACA;IACA,UAAA;CACA","file":"zoomController.vue","sourcesContent":["<template>\n    <div v-show=\"true\" class=\"controller-section\" :style=\"styleObj\" >\n        <button @click=\"zoomIn\" id=\"zoom-in\">+</button>\n        <button @click=\"zoomOut\" id=\"zoom-out\">-</button>\n    </div>\n</template>\n<script>\n    import getControllerPosition from \"utils/getControllerPosition\";\n\n    const props = {\n        position: {\n            required: true,\n            twoway: false,\n            type: Object\n        },\n        visible: {\n            required: false,\n            twoway: false,\n            type: Boolean,\n            default: true\n        },\n    };\n    export default {\n        props,\n        data: function () {\n            return {\n                styleObj: {},\n            }\n        },\n        ready () {\n            this.styleObj = getControllerPosition(this.position);\n        },\n        methods: {\n            zoomIn () {\n                let _this = this;\n                let { $map } = this.$parent;\n                if ( $map ) {\n                    $map.zoomTo($map.getZoom() + 1);\n                }\n            },\n            zoomOut () {\n                let _this = this;\n                let { $map } = this.$parent;\n                if ( $map ) {\n                    $map.zoomTo($map.getZoom() - 1);\n                }\n            }\n        },\n    }\n</script>\n<style lang=\"css\" scoped>\n    .controller-section {\n        z-index: 2;\n        position: absolute;\n        overflow: hidden;\n        width: 28px;\n        height: 56px;\n        background: #fff;\n        /*box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px;*/\n        box-shadow: rgba(0, 0, 0, 0.468) 0.3px 1px 4px -1px !important;\n    }\n    #zoom-in,\n    #zoom-out {\n        position: absolute;\n        display: block;\n        left: 0;\n        width: 28px;\n        height: 28px;\n        outline: none;\n        /*border: 1px solid #cdcdcd;*/\n        border: none;\n        background-color: #ffffff;\n        color: #4d4d4d;\n        cursor: pointer;\n        font-size: 18px;\n        &:hover {\n             color: #189adb;\n         }\n    }\n    #zoom-in {\n        top: 0;\n        border-bottom: 1px solid rgba(0,0,0,0.15);\n    }\n    #zoom-out {\n        top: 28px;\n    }\n</style>\n"],"sourceRoot":"webpack://"}]);

// exports


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "/*\n * Colors\n */\n/* font color */\n*[_v-445b31e6] {\n  box-sizing: border-box;\n  padding: 0;\n  margin: 0; }\n\n#baidu-map-box[_v-445b31e6] {\n  position: relative;\n  width: 100%;\n  height: 100%; }\n\n.vue-baidu-map[_v-445b31e6] {\n  width: 100%;\n  height: 100%;\n  background-color: #ffffff; }\n\n.map-fullscreen[_v-445b31e6] {\n  position: fixed !important;\n  z-index: 999;\n  top: 0;\n  left: 0;\n  width: 100% !important;\n  height: 100% !important; }\n", "", {"version":3,"sources":["/./lib/overlays/map.vue"],"names":[],"mappings":"AAAA;;GAEG;AACH,gBAAgB;AAChB;EACE,uBAAuB;EACvB,WAAW;EACX,UAAU,EAAE;;AAEd;EACE,mBAAmB;EACnB,YAAY;EACZ,aAAa,EAAE;;AAEjB;EACE,YAAY;EACZ,aAAa;EACb,0BAA0B,EAAE;;AAE9B;EACE,2BAA2B;EAC3B,aAAa;EACb,OAAO;EACP,QAAQ;EACR,uBAAuB;EACvB,wBAAwB,EAAE","file":"map.vue","sourcesContent":["/*\n * Colors\n */\n/* font color */\n* {\n  box-sizing: border-box;\n  padding: 0;\n  margin: 0; }\n\n#baidu-map-box {\n  position: relative;\n  width: 100%;\n  height: 100%; }\n\n.vue-baidu-map {\n  width: 100%;\n  height: 100%;\n  background-color: #ffffff; }\n\n.map-fullscreen {\n  position: fixed !important;\n  z-index: 999;\n  top: 0;\n  left: 0;\n  width: 100% !important;\n  height: 100% !important; }\n"],"sourceRoot":"webpack://"}]);

// exports


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.component-section[_v-56ed0ac6] {\n    z-index: 2;\n    width: auto;\n    height: auto;\n    overflow: hidden;\n    /*display: none;*/\n}\n", "", {"version":3,"sources":["/./lib/overlays/infoWindow.vue?56f18d74"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AA8HA;IACA,WAAA;IACA,YAAA;IACA,aAAA;IACA,iBAAA;IACA,kBAAA;CACA","file":"infoWindow.vue","sourcesContent":["<template>\n    <div class=\"component-section\">\n        <slot></slot>\n    </div>\n</template>\n<script>\n    /**\n     * FIXME: infowindow 中有内存泄露( fixed 2017-4-20 )\n     */\n    import { createPoint, createSize } from \"utils/factory\";\n    import { removeOverlay } from \"utils/removeOverlay\";\n    import bindEvent from \"utils/bindEvent\";\n\n    const eventList = [\n        \"close\",\n        \"open\",\n        \"maximize\",\n        \"restore\",\n        \"clickclose\"\n    ];\n\n    const props = {\n        size: {\n            required: false,\n            type: Object,\n            twoway: false\n        },\n        visible: {\n            required: false,\n            type: Boolean,\n            twoway: false,\n            default: false\n        },\n        position: {\n            required: false,\n            type: Object,\n            twoway: false\n        },\n        offset: {\n            required: false,\n            type: Object,\n            twoway: false,\n            default () {\n                return {\n                    x: 0,\n                    y: 0\n                }\n            }\n        },\n        enableAutoPan: {\n            required: false,\n            type: Boolean,\n            twoway: false,\n            default: true\n        },\n        enableCloseOnClick: {\n            required: false,\n            type: Boolean,\n            twoway: false,\n            default: true,\n        },\n        enableMessage: {\n            required: false,\n            type: Boolean,\n            twoway: false,\n            default: false\n        },\n        message: String,\n        title: String,\n    };\n    export default {\n        props,\n        data () {\n            return {\n                componentType: \"infoWindow\",\n                $overlay: undefined\n            }\n        },\n        ready () {\n            let { $map } = this.$parent;\n            $map ? this.addOverlay() : this.$parent.$on(\"ready\", this.addOverlay);\n        },\n        beforeDestroy () {\n            this.removeOverlay();\n        },\n        watch: {\n            visible (val) {\n                let { position, $overlay } = this;\n                let { $map } = this.$parent;\n                console.log(\"infoWindow visible change\");\n                if (val && position) {\n                    $map.openInfoWindow($overlay, createPoint(position));\n                } else {\n                    $map.closeInfoWindow();\n                }\n            }\n        },\n        methods: {\n            addOverlay () {\n                let { $overlay, visible, size, position, offset, title, enableAutoPan, enableCloseOnClick, enableMessage, updateStatus } = this;\n                let { $map } = this.$parent;\n                let $content = this.$el;\n                this.$overlay = $overlay = new BMap.InfoWindow($content, {\n                    width: size.width,\n                    height: size.height,\n                    offset: createSize(offset),\n                    title: title,\n                    enableAutoPan: enableAutoPan,\n                    enableCloseOnClick: enableCloseOnClick,                                  // NOTICE: visible 参数控制\n                    enableMessage: enableMessage\n                });\n                bindEvent.call(this, eventList);\n                visible && $map.openInfoWindow($overlay, createPoint(position));\n            },\n\n            removeOverlay () {\n                let $container = this.$parent.$overlay;\n                let { $overlay } = this;\n                $overlay.content = null;// FIXME 无法被移除\n                removeOverlay.call(this, this.$parent.$overlay, '$overlay');\n                console.log( $overlay );\n            },\n        }\n    }\n</script>\n<style lang=\"css\" scoped>\n    .component-section {\n        z-index: 2;\n        width: auto;\n        height: auto;\n        overflow: hidden;\n        /*display: none;*/\n    }\n</style>\n"],"sourceRoot":"webpack://"}]);

// exports


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n*[_v-8c9467a8] {\n    box-sizing: border-box;\n    padding: 0;\n    margin:0;\n}\n.controller-section[_v-8c9467a8] {\n    z-index: 2;\n    position: absolute;\n    overflow: hidden;\n    width: 28px;\n    height: 28px;\n    box-shadow: rgba(0, 0, 0, 0.468) 0.3px 1px 4px -1px !important;\n}\n.fullscreen[_v-8c9467a8] {\n    display: block;\n    width: 100%;\n    height: 100%;\n    padding: 0;\n    font-size: 0.6rem;\n    outline: none;\n    border: none;\n    background-color: #ffffff;\n    color: #4d4d4d;\n    cursor: pointer;\n    text-align: center;\n}\n", "", {"version":3,"sources":["/./lib/controllers/fullScreenController.vue?56346ce0"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AA+CA;IACA,uBAAA;IACA,WAAA;IACA,SAAA;CACA;AACA;IACA,WAAA;IACA,mBAAA;IACA,iBAAA;IACA,YAAA;IACA,aAAA;IACA,+DAAA;CACA;AACA;IACA,eAAA;IACA,YAAA;IACA,aAAA;IACA,WAAA;IACA,kBAAA;IACA,cAAA;IACA,aAAA;IACA,0BAAA;IACA,eAAA;IACA,gBAAA;IACA,mBAAA;CACA","file":"fullScreenController.vue","sourcesContent":["<template>\n    <div v-show=\"visible\" class=\"controller-section\" v-bind:style=\"styleObj\">\n        <button v-if=\"!isFullscreen\" v-on:click=\"toggleFullscreen\" class=\"fullscreen\"><i class=\"iconfont icon-zoomin\"></i></button>\n        <button v-else v-on:click=\"toggleFullscreen\" class=\"fullscreen\"><i class=\"iconfont icon-zoomout\"></i></button>\n    </div>\n</template>\n<script>\n    import getControllerPosition from \"utils/getControllerPosition\";\n\n    const props = {\n        position: {\n            required: true,\n            twoway: false,\n            type: Object\n        },\n        visible: {\n            required: false,\n            twoway: false,\n            type: Boolean,\n            default: true\n        },\n        callback: {\n            required: false,\n            twoway: false,\n            type: Function\n        }\n    };\n\n    export default {\n        props,\n        data () {\n            return {\n                styleObj: {},\n            }\n        },\n        ready () {\n            this.styleObj = getControllerPosition(this.position);\n        },\n        methods: {\n            toggleFullscreen () {\n                let parentStatus = this.$parent.status;\n                parentStatus.isFullscreen = !parentStatus.isFullscreen;\n            }\n        },\n    }\n</script>\n<style lang=\"css\" scoped>\n    * {\n        box-sizing: border-box;\n        padding: 0;\n        margin:0;\n    }\n    .controller-section {\n        z-index: 2;\n        position: absolute;\n        overflow: hidden;\n        width: 28px;\n        height: 28px;\n        box-shadow: rgba(0, 0, 0, 0.468) 0.3px 1px 4px -1px !important;\n    }\n    .fullscreen {\n        display: block;\n        width: 100%;\n        height: 100%;\n        padding: 0;\n        font-size: 0.6rem;\n        outline: none;\n        border: none;\n        background-color: #ffffff;\n        color: #4d4d4d;\n        cursor: pointer;\n        text-align: center;\n    }\n</style>\n"],"sourceRoot":"webpack://"}]);

// exports


/***/ }),
/* 116 */
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
		return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
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


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(106);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(116)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../node_modules/css-loader/index.js!./loadingAnimation.css", function() {
			var newContent = require("!!./../../node_modules/css-loader/index.js!./loadingAnimation.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 118 */
/***/ (function(module, exports) {

module.exports = "\n<div v-show=\"visible\" class=\"controller-section\" :style=\"styleObj\" _v-03febde3=\"\">\n    <button @click=\"locate\" class=\"locate-btn\" v-bind:class=\"{'location-animation': isLocating }\" _v-03febde3=\"\"><i class=\"iconfont icon-location\" _v-03febde3=\"\"></i></button>\n</div>\n";

/***/ }),
/* 119 */
/***/ (function(module, exports) {

module.exports = "\n<div v-show=\"visible\" class=\"controller-section\" :style=\"styleObj\" _v-0606bf2c=\"\">\n    <input v-model=\"keywords\" @keyup.enter.stop.prevent=\"search\" type=\"text\" maxlength=\"20\" class=\"search-input\" placeholder=\"搜索地点\" _v-0606bf2c=\"\">\n    <button @click=\"search\" class=\"search-logo\" _v-0606bf2c=\"\"><i class=\"iconfont icon-search\" _v-0606bf2c=\"\"></i></button>\n</div>\n";

/***/ }),
/* 120 */
/***/ (function(module, exports) {

module.exports = "\n\n<div v-show=\"visible\" class=\"controller-section\" :style=\"styleObj\" _v-27e221ec=\"\">\n    <slot _v-27e221ec=\"\"></slot>\n</div>\n";

/***/ }),
/* 121 */
/***/ (function(module, exports) {

module.exports = "\n\n\n\n<div v-show=\"visible\" class=\"controller-section\" :style=\"styleObj\" _v-28342882=\"\">\n    <button @click=\"changeMapType\" id=\"map-type-toggle\" _v-28342882=\"\">{{ mapTypeName }}</button>\n</div>\n";

/***/ }),
/* 122 */
/***/ (function(module, exports) {

module.exports = "\n<div v-show=\"true\" class=\"controller-section\" :style=\"styleObj\" _v-36aab038=\"\">\n    <button @click=\"zoomIn\" id=\"zoom-in\" _v-36aab038=\"\">+</button>\n    <button @click=\"zoomOut\" id=\"zoom-out\" _v-36aab038=\"\">-</button>\n</div>\n";

/***/ }),
/* 123 */
/***/ (function(module, exports) {

module.exports = "\n<div id=\"baidu-map-box\" v-bind:class=\"{ 'map-fullscreen': status.isFullscreen }\" _v-445b31e6=\"\">\n    <div v-el:map=\"\" class=\"vue-baidu-map\" _v-445b31e6=\"\"></div>\n    <slot _v-445b31e6=\"\"></slot>\n</div>\n";

/***/ }),
/* 124 */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"component-section\" _v-56ed0ac6=\"\">\n    <slot _v-56ed0ac6=\"\"></slot>\n</div>\n";

/***/ }),
/* 125 */
/***/ (function(module, exports) {

module.exports = "\n<div v-show=\"visible\" class=\"controller-section\" v-bind:style=\"styleObj\" _v-8c9467a8=\"\">\n    <button v-if=\"!isFullscreen\" v-on:click=\"toggleFullscreen\" class=\"fullscreen\" _v-8c9467a8=\"\"><i class=\"iconfont icon-zoomin\" _v-8c9467a8=\"\"></i></button>\n    <button v-else=\"\" v-on:click=\"toggleFullscreen\" class=\"fullscreen\" _v-8c9467a8=\"\"><i class=\"iconfont icon-zoomout\" _v-8c9467a8=\"\"></i></button>\n</div>\n";

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(107);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=1!./map.vue", function() {
			var newContent = require("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=1!./map.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(108);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-03febde3&scoped=true!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./locateController.vue", function() {
			var newContent = require("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-03febde3&scoped=true!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./locateController.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(109);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-0606bf2c&scoped=true!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./localSearchController.vue", function() {
			var newContent = require("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-0606bf2c&scoped=true!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./localSearchController.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(110);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-27e221ec&scoped=true!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./controllerBox.vue", function() {
			var newContent = require("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-27e221ec&scoped=true!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./controllerBox.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(111);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-28342882&scoped=true!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./toggleTypeController.vue", function() {
			var newContent = require("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-28342882&scoped=true!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./toggleTypeController.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(112);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-36aab038&scoped=true!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./zoomController.vue", function() {
			var newContent = require("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-36aab038&scoped=true!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./zoomController.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(113);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-445b31e6&scoped=true!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./map.vue", function() {
			var newContent = require("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-445b31e6&scoped=true!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./map.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(114);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-56ed0ac6&scoped=true!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./infoWindow.vue", function() {
			var newContent = require("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-56ed0ac6&scoped=true!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./infoWindow.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(115);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-8c9467a8&scoped=true!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./fullScreenController.vue", function() {
			var newContent = require("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-8c9467a8&scoped=true!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./fullScreenController.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toggleTypeController = exports.locateController = exports.zoomController = exports.localSearchController = exports.fullScreenController = exports.controllerBox = exports.infoWindow = exports.mapPolyline = exports.mapMarker = exports.map = exports.load = undefined;

var _load = __webpack_require__(46);

var _load2 = _interopRequireDefault(_load);

var _map = __webpack_require__(54);

var _map2 = _interopRequireDefault(_map);

var _marker = __webpack_require__(55);

var _marker2 = _interopRequireDefault(_marker);

var _polyline = __webpack_require__(56);

var _polyline2 = _interopRequireDefault(_polyline);

var _infoWindow = __webpack_require__(53);

var _infoWindow2 = _interopRequireDefault(_infoWindow);

var _controllerBox = __webpack_require__(47);

var _controllerBox2 = _interopRequireDefault(_controllerBox);

var _zoomController = __webpack_require__(52);

var _zoomController2 = _interopRequireDefault(_zoomController);

var _toggleTypeController = __webpack_require__(51);

var _toggleTypeController2 = _interopRequireDefault(_toggleTypeController);

var _fullScreenController = __webpack_require__(48);

var _fullScreenController2 = _interopRequireDefault(_fullScreenController);

var _localSearchController = __webpack_require__(49);

var _localSearchController2 = _interopRequireDefault(_localSearchController);

var _locateController = __webpack_require__(50);

var _locateController2 = _interopRequireDefault(_locateController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.load = _load2.default;
exports.map = _map2.default;
exports.mapMarker = _marker2.default;
exports.mapPolyline = _polyline2.default;
exports.infoWindow = _infoWindow2.default;
exports.controllerBox = _controllerBox2.default;
exports.fullScreenController = _fullScreenController2.default;
exports.localSearchController = _localSearchController2.default;
exports.zoomController = _zoomController2.default;
exports.locateController = _locateController2.default;
exports.toggleTypeController = _toggleTypeController2.default;

/***/ })
/******/ ]);
});
//# sourceMappingURL=index.js.map
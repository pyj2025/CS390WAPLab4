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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var io = __webpack_require__(1);
__webpack_require__(53);
var socket = io();
var containerDiv = document.getElementById('container');
var usernameBtn = document.getElementById('usernameBtn');
var usernameInput = document.getElementById('username');
var messageInput = document.getElementById('message');
var messageBtn = document.getElementById('sendMessageBtn');
var collection = document.getElementById('message-list');
var id;
var Chat = (function () {
    function Chat() {
        this.currentID = socket.id;
        this.checkForMessages();
        this.checkForUsers();
    }
    Chat.prototype.sendMessage = function (message) {
        if (message) {
            socket.emit('chat message', message);
            this.createNewMessage({ id: id, message: message });
        }
    };
    Chat.prototype.checkForMessages = function () {
        var _this = this;
        socket.on('chat message', function (msg) {
            _this.createNewMessage(msg);
        });
    };
    Chat.prototype.createNewMessage = function (msg) {
        var div = document.createElement('div');
        div.classList.add('card');
        div.classList.add('hoverable');
        var div2 = document.createElement('div');
        div2.classList.add('card-content');
        var spanTitle = document.createElement('span');
        spanTitle.classList.add('card-title');
        spanTitle.innerHTML = msg.id + " - " + msg.message;
        if (id && msg.id === id) {
            div.classList.add('blue-grey');
            div.classList.add('darken-1');
            div2.classList.add('white-text');
        }
        div2.appendChild(spanTitle);
        div.appendChild(div2);
        collection.appendChild(div);
    };
    Chat.prototype.checkForUsers = function () {
        var _this = this;
        socket.on('user joined', function (username) {
            _this.createNewMessage({ id: username, message: "just joined" });
        });
    };
    return Chat;
}());
socket.on('connect', function () {
    socket.on('username set', function (myId) {
        id = myId;
        containerDiv.style.visibility = 'visible';
    });
    var chat = new Chat();
    usernameBtn.onclick = function () {
        var username = usernameInput.value;
        if (username) {
            socket.emit('set username', username);
        }
    };
    messageBtn.onclick = function () {
        if (id) {
            var message = messageInput.value;
            chat.sendMessage(message);
        }
    };
});


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Module dependencies.
 */

var url = __webpack_require__(2);
var parser = __webpack_require__(9);
var Manager = __webpack_require__(16);
var debug = __webpack_require__(5)('socket.io-client');

/**
 * Module exports.
 */

module.exports = exports = lookup;

/**
 * Managers cache.
 */

var cache = exports.managers = {};

/**
 * Looks up an existing `Manager` for multiplexing.
 * If the user summons:
 *
 *   `io('http://localhost/a');`
 *   `io('http://localhost/b');`
 *
 * We reuse the existing instance based on same scheme/port/host,
 * and we initialize sockets for each namespace.
 *
 * @api public
 */

function lookup (uri, opts) {
  if (typeof uri === 'object') {
    opts = uri;
    uri = undefined;
  }

  opts = opts || {};

  var parsed = url(uri);
  var source = parsed.source;
  var id = parsed.id;
  var path = parsed.path;
  var sameNamespace = cache[id] && path in cache[id].nsps;
  var newConnection = opts.forceNew || opts['force new connection'] ||
                      false === opts.multiplex || sameNamespace;

  var io;

  if (newConnection) {
    debug('ignoring socket cache for %s', source);
    io = Manager(source, opts);
  } else {
    if (!cache[id]) {
      debug('new io instance for %s', source);
      cache[id] = Manager(source, opts);
    }
    io = cache[id];
  }
  if (parsed.query && !opts.query) {
    opts.query = parsed.query;
  }
  return io.socket(parsed.path, opts);
}

/**
 * Protocol version.
 *
 * @api public
 */

exports.protocol = parser.protocol;

/**
 * `connect`.
 *
 * @param {String} uri
 * @api public
 */

exports.connect = lookup;

/**
 * Expose constructors for standalone build.
 *
 * @api public
 */

exports.Manager = __webpack_require__(16);
exports.Socket = __webpack_require__(48);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {
/**
 * Module dependencies.
 */

var parseuri = __webpack_require__(4);
var debug = __webpack_require__(5)('socket.io-client:url');

/**
 * Module exports.
 */

module.exports = url;

/**
 * URL parser.
 *
 * @param {String} url
 * @param {Object} An object meant to mimic window.location.
 *                 Defaults to window.location.
 * @api public
 */

function url (uri, loc) {
  var obj = uri;

  // default to window.location
  loc = loc || global.location;
  if (null == uri) uri = loc.protocol + '//' + loc.host;

  // relative path support
  if ('string' === typeof uri) {
    if ('/' === uri.charAt(0)) {
      if ('/' === uri.charAt(1)) {
        uri = loc.protocol + uri;
      } else {
        uri = loc.host + uri;
      }
    }

    if (!/^(https?|wss?):\/\//.test(uri)) {
      debug('protocol-less url %s', uri);
      if ('undefined' !== typeof loc) {
        uri = loc.protocol + '//' + uri;
      } else {
        uri = 'https://' + uri;
      }
    }

    // parse
    debug('parse %s', uri);
    obj = parseuri(uri);
  }

  // make sure we treat `localhost:80` and `localhost` equally
  if (!obj.port) {
    if (/^(http|ws)$/.test(obj.protocol)) {
      obj.port = '80';
    } else if (/^(http|ws)s$/.test(obj.protocol)) {
      obj.port = '443';
    }
  }

  obj.path = obj.path || '/';

  var ipv6 = obj.host.indexOf(':') !== -1;
  var host = ipv6 ? '[' + obj.host + ']' : obj.host;

  // define unique id
  obj.id = obj.protocol + '://' + host + ':' + obj.port;
  // define href
  obj.href = obj.protocol + '://' + host + (loc && loc.port === obj.port ? '' : (':' + obj.port));

  return obj;
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)))

/***/ }),
/* 3 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

/**
 * Parses an URI
 *
 * @author Steven Levithan <stevenlevithan.com> (MIT license)
 * @api private
 */

var re = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;

var parts = [
    'source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'
];

module.exports = function parseuri(str) {
    var src = str,
        b = str.indexOf('['),
        e = str.indexOf(']');

    if (b != -1 && e != -1) {
        str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ';') + str.substring(e, str.length);
    }

    var m = re.exec(str || ''),
        uri = {},
        i = 14;

    while (i--) {
        uri[parts[i]] = m[i] || '';
    }

    if (b != -1 && e != -1) {
        uri.source = src;
        uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ':');
        uri.authority = uri.authority.replace('[', '').replace(']', '').replace(/;/g, ':');
        uri.ipv6uri = true;
    }

    return uri;
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = __webpack_require__(7);
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = 'undefined' != typeof chrome
               && 'undefined' != typeof chrome.storage
                  ? chrome.storage.local
                  : localstorage();

/**
 * Colors.
 */

exports.colors = [
  '#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC',
  '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF',
  '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC',
  '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF',
  '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC',
  '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033',
  '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366',
  '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933',
  '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC',
  '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF',
  '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
    return true;
  }

  // Internet Explorer and Edge do not support colors.
  if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
    return false;
  }

  // is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
  return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
    // is firebug? http://stackoverflow.com/a/398120/376773
    (typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
    // is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
    // double check webkit in userAgent just in case we are in a worker
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function(v) {
  try {
    return JSON.stringify(v);
  } catch (err) {
    return '[UnexpectedJSONParseError]: ' + err.message;
  }
};


/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '')
    + this.namespace
    + (useColors ? ' %c' : ' ')
    + args[0]
    + (useColors ? '%c ' : ' ')
    + '+' + exports.humanize(this.diff);

  if (!useColors) return;

  var c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit')

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, function(match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });

  args.splice(lastC, 0, c);
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  // this hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return 'object' === typeof console
    && console.log
    && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      exports.storage.removeItem('debug');
    } else {
      exports.storage.debug = namespaces;
    }
  } catch(e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    r = exports.storage.debug;
  } catch(e) {}

  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = process.env.DEBUG;
  }

  return r;
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
  try {
    return window.localStorage;
  } catch (e) {}
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(6)))

/***/ }),
/* 6 */
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
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = __webpack_require__(8);

/**
 * Active `debug` instances.
 */
exports.instances = [];

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
 */

exports.formatters = {};

/**
 * Select a color.
 * @param {String} namespace
 * @return {Number}
 * @api private
 */

function selectColor(namespace) {
  var hash = 0, i;

  for (i in namespace) {
    hash  = ((hash << 5) - hash) + namespace.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }

  return exports.colors[Math.abs(hash) % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function createDebug(namespace) {

  var prevTime;

  function debug() {
    // disabled?
    if (!debug.enabled) return;

    var self = debug;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // turn the `arguments` into a proper Array
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %O
      args.unshift('%O');
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    // apply env-specific formatting (colors, etc.)
    exports.formatArgs.call(self, args);

    var logFn = debug.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }

  debug.namespace = namespace;
  debug.enabled = exports.enabled(namespace);
  debug.useColors = exports.useColors();
  debug.color = selectColor(namespace);
  debug.destroy = destroy;

  // env-specific initialization logic for debug instances
  if ('function' === typeof exports.init) {
    exports.init(debug);
  }

  exports.instances.push(debug);

  return debug;
}

function destroy () {
  var index = exports.instances.indexOf(this);
  if (index !== -1) {
    exports.instances.splice(index, 1);
    return true;
  } else {
    return false;
  }
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  exports.names = [];
  exports.skips = [];

  var i;
  var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
  var len = split.length;

  for (i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }

  for (i = 0; i < exports.instances.length; i++) {
    var instance = exports.instances[i];
    instance.enabled = exports.enabled(instance.namespace);
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  if (name[name.length - 1] === '*') {
    return true;
  }
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }
  return false;
}

/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}


/***/ }),
/* 8 */
/***/ (function(module, exports) {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isNaN(val) === false) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  if (ms >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (ms >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (ms >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (ms >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  return plural(ms, d, 'day') ||
    plural(ms, h, 'hour') ||
    plural(ms, m, 'minute') ||
    plural(ms, s, 'second') ||
    ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, n, name) {
  if (ms < n) {
    return;
  }
  if (ms < n * 1.5) {
    return Math.floor(ms / n) + ' ' + name;
  }
  return Math.ceil(ms / n) + ' ' + name + 's';
}


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Module dependencies.
 */

var debug = __webpack_require__(10)('socket.io-parser');
var Emitter = __webpack_require__(12);
var binary = __webpack_require__(13);
var isArray = __webpack_require__(14);
var isBuf = __webpack_require__(15);

/**
 * Protocol version.
 *
 * @api public
 */

exports.protocol = 4;

/**
 * Packet types.
 *
 * @api public
 */

exports.types = [
  'CONNECT',
  'DISCONNECT',
  'EVENT',
  'ACK',
  'ERROR',
  'BINARY_EVENT',
  'BINARY_ACK'
];

/**
 * Packet type `connect`.
 *
 * @api public
 */

exports.CONNECT = 0;

/**
 * Packet type `disconnect`.
 *
 * @api public
 */

exports.DISCONNECT = 1;

/**
 * Packet type `event`.
 *
 * @api public
 */

exports.EVENT = 2;

/**
 * Packet type `ack`.
 *
 * @api public
 */

exports.ACK = 3;

/**
 * Packet type `error`.
 *
 * @api public
 */

exports.ERROR = 4;

/**
 * Packet type 'binary event'
 *
 * @api public
 */

exports.BINARY_EVENT = 5;

/**
 * Packet type `binary ack`. For acks with binary arguments.
 *
 * @api public
 */

exports.BINARY_ACK = 6;

/**
 * Encoder constructor.
 *
 * @api public
 */

exports.Encoder = Encoder;

/**
 * Decoder constructor.
 *
 * @api public
 */

exports.Decoder = Decoder;

/**
 * A socket.io Encoder instance
 *
 * @api public
 */

function Encoder() {}

var ERROR_PACKET = exports.ERROR + '"encode error"';

/**
 * Encode a packet as a single string if non-binary, or as a
 * buffer sequence, depending on packet type.
 *
 * @param {Object} obj - packet object
 * @param {Function} callback - function to handle encodings (likely engine.write)
 * @return Calls callback with Array of encodings
 * @api public
 */

Encoder.prototype.encode = function(obj, callback){
  debug('encoding packet %j', obj);

  if (exports.BINARY_EVENT === obj.type || exports.BINARY_ACK === obj.type) {
    encodeAsBinary(obj, callback);
  } else {
    var encoding = encodeAsString(obj);
    callback([encoding]);
  }
};

/**
 * Encode packet as string.
 *
 * @param {Object} packet
 * @return {String} encoded
 * @api private
 */

function encodeAsString(obj) {

  // first is type
  var str = '' + obj.type;

  // attachments if we have them
  if (exports.BINARY_EVENT === obj.type || exports.BINARY_ACK === obj.type) {
    str += obj.attachments + '-';
  }

  // if we have a namespace other than `/`
  // we append it followed by a comma `,`
  if (obj.nsp && '/' !== obj.nsp) {
    str += obj.nsp + ',';
  }

  // immediately followed by the id
  if (null != obj.id) {
    str += obj.id;
  }

  // json data
  if (null != obj.data) {
    var payload = tryStringify(obj.data);
    if (payload !== false) {
      str += payload;
    } else {
      return ERROR_PACKET;
    }
  }

  debug('encoded %j as %s', obj, str);
  return str;
}

function tryStringify(str) {
  try {
    return JSON.stringify(str);
  } catch(e){
    return false;
  }
}

/**
 * Encode packet as 'buffer sequence' by removing blobs, and
 * deconstructing packet into object with placeholders and
 * a list of buffers.
 *
 * @param {Object} packet
 * @return {Buffer} encoded
 * @api private
 */

function encodeAsBinary(obj, callback) {

  function writeEncoding(bloblessData) {
    var deconstruction = binary.deconstructPacket(bloblessData);
    var pack = encodeAsString(deconstruction.packet);
    var buffers = deconstruction.buffers;

    buffers.unshift(pack); // add packet info to beginning of data list
    callback(buffers); // write all the buffers
  }

  binary.removeBlobs(obj, writeEncoding);
}

/**
 * A socket.io Decoder instance
 *
 * @return {Object} decoder
 * @api public
 */

function Decoder() {
  this.reconstructor = null;
}

/**
 * Mix in `Emitter` with Decoder.
 */

Emitter(Decoder.prototype);

/**
 * Decodes an ecoded packet string into packet JSON.
 *
 * @param {String} obj - encoded packet
 * @return {Object} packet
 * @api public
 */

Decoder.prototype.add = function(obj) {
  var packet;
  if (typeof obj === 'string') {
    packet = decodeString(obj);
    if (exports.BINARY_EVENT === packet.type || exports.BINARY_ACK === packet.type) { // binary packet's json
      this.reconstructor = new BinaryReconstructor(packet);

      // no attachments, labeled binary but no binary data to follow
      if (this.reconstructor.reconPack.attachments === 0) {
        this.emit('decoded', packet);
      }
    } else { // non-binary full packet
      this.emit('decoded', packet);
    }
  }
  else if (isBuf(obj) || obj.base64) { // raw binary data
    if (!this.reconstructor) {
      throw new Error('got binary data when not reconstructing a packet');
    } else {
      packet = this.reconstructor.takeBinaryData(obj);
      if (packet) { // received final buffer
        this.reconstructor = null;
        this.emit('decoded', packet);
      }
    }
  }
  else {
    throw new Error('Unknown type: ' + obj);
  }
};

/**
 * Decode a packet String (JSON data)
 *
 * @param {String} str
 * @return {Object} packet
 * @api private
 */

function decodeString(str) {
  var i = 0;
  // look up type
  var p = {
    type: Number(str.charAt(0))
  };

  if (null == exports.types[p.type]) {
    return error('unknown packet type ' + p.type);
  }

  // look up attachments if type binary
  if (exports.BINARY_EVENT === p.type || exports.BINARY_ACK === p.type) {
    var buf = '';
    while (str.charAt(++i) !== '-') {
      buf += str.charAt(i);
      if (i == str.length) break;
    }
    if (buf != Number(buf) || str.charAt(i) !== '-') {
      throw new Error('Illegal attachments');
    }
    p.attachments = Number(buf);
  }

  // look up namespace (if any)
  if ('/' === str.charAt(i + 1)) {
    p.nsp = '';
    while (++i) {
      var c = str.charAt(i);
      if (',' === c) break;
      p.nsp += c;
      if (i === str.length) break;
    }
  } else {
    p.nsp = '/';
  }

  // look up id
  var next = str.charAt(i + 1);
  if ('' !== next && Number(next) == next) {
    p.id = '';
    while (++i) {
      var c = str.charAt(i);
      if (null == c || Number(c) != c) {
        --i;
        break;
      }
      p.id += str.charAt(i);
      if (i === str.length) break;
    }
    p.id = Number(p.id);
  }

  // look up json data
  if (str.charAt(++i)) {
    var payload = tryParse(str.substr(i));
    var isPayloadValid = payload !== false && (p.type === exports.ERROR || isArray(payload));
    if (isPayloadValid) {
      p.data = payload;
    } else {
      return error('invalid payload');
    }
  }

  debug('decoded %s as %j', str, p);
  return p;
}

function tryParse(str) {
  try {
    return JSON.parse(str);
  } catch(e){
    return false;
  }
}

/**
 * Deallocates a parser's resources
 *
 * @api public
 */

Decoder.prototype.destroy = function() {
  if (this.reconstructor) {
    this.reconstructor.finishedReconstruction();
  }
};

/**
 * A manager of a binary event's 'buffer sequence'. Should
 * be constructed whenever a packet of type BINARY_EVENT is
 * decoded.
 *
 * @param {Object} packet
 * @return {BinaryReconstructor} initialized reconstructor
 * @api private
 */

function BinaryReconstructor(packet) {
  this.reconPack = packet;
  this.buffers = [];
}

/**
 * Method to be called when binary data received from connection
 * after a BINARY_EVENT packet.
 *
 * @param {Buffer | ArrayBuffer} binData - the raw binary data received
 * @return {null | Object} returns null if more binary data is expected or
 *   a reconstructed packet object if all buffers have been received.
 * @api private
 */

BinaryReconstructor.prototype.takeBinaryData = function(binData) {
  this.buffers.push(binData);
  if (this.buffers.length === this.reconPack.attachments) { // done with buffer list
    var packet = binary.reconstructPacket(this.reconPack, this.buffers);
    this.finishedReconstruction();
    return packet;
  }
  return null;
};

/**
 * Cleans up binary packet reconstruction variables.
 *
 * @api private
 */

BinaryReconstructor.prototype.finishedReconstruction = function() {
  this.reconPack = null;
  this.buffers = [];
};

function error(msg) {
  return {
    type: exports.ERROR,
    data: 'parser error: ' + msg
  };
}


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = __webpack_require__(11);
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = 'undefined' != typeof chrome
               && 'undefined' != typeof chrome.storage
                  ? chrome.storage.local
                  : localstorage();

/**
 * Colors.
 */

exports.colors = [
  '#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC',
  '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF',
  '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC',
  '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF',
  '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC',
  '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033',
  '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366',
  '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933',
  '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC',
  '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF',
  '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
    return true;
  }

  // Internet Explorer and Edge do not support colors.
  if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
    return false;
  }

  // is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
  return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
    // is firebug? http://stackoverflow.com/a/398120/376773
    (typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
    // is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
    // double check webkit in userAgent just in case we are in a worker
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function(v) {
  try {
    return JSON.stringify(v);
  } catch (err) {
    return '[UnexpectedJSONParseError]: ' + err.message;
  }
};


/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '')
    + this.namespace
    + (useColors ? ' %c' : ' ')
    + args[0]
    + (useColors ? '%c ' : ' ')
    + '+' + exports.humanize(this.diff);

  if (!useColors) return;

  var c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit')

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, function(match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });

  args.splice(lastC, 0, c);
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  // this hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return 'object' === typeof console
    && console.log
    && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      exports.storage.removeItem('debug');
    } else {
      exports.storage.debug = namespaces;
    }
  } catch(e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    r = exports.storage.debug;
  } catch(e) {}

  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = process.env.DEBUG;
  }

  return r;
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
  try {
    return window.localStorage;
  } catch (e) {}
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(6)))

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = __webpack_require__(8);

/**
 * Active `debug` instances.
 */
exports.instances = [];

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
 */

exports.formatters = {};

/**
 * Select a color.
 * @param {String} namespace
 * @return {Number}
 * @api private
 */

function selectColor(namespace) {
  var hash = 0, i;

  for (i in namespace) {
    hash  = ((hash << 5) - hash) + namespace.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }

  return exports.colors[Math.abs(hash) % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function createDebug(namespace) {

  var prevTime;

  function debug() {
    // disabled?
    if (!debug.enabled) return;

    var self = debug;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // turn the `arguments` into a proper Array
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %O
      args.unshift('%O');
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    // apply env-specific formatting (colors, etc.)
    exports.formatArgs.call(self, args);

    var logFn = debug.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }

  debug.namespace = namespace;
  debug.enabled = exports.enabled(namespace);
  debug.useColors = exports.useColors();
  debug.color = selectColor(namespace);
  debug.destroy = destroy;

  // env-specific initialization logic for debug instances
  if ('function' === typeof exports.init) {
    exports.init(debug);
  }

  exports.instances.push(debug);

  return debug;
}

function destroy () {
  var index = exports.instances.indexOf(this);
  if (index !== -1) {
    exports.instances.splice(index, 1);
    return true;
  } else {
    return false;
  }
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  exports.names = [];
  exports.skips = [];

  var i;
  var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
  var len = split.length;

  for (i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }

  for (i = 0; i < exports.instances.length; i++) {
    var instance = exports.instances[i];
    instance.enabled = exports.enabled(instance.namespace);
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  if (name[name.length - 1] === '*') {
    return true;
  }
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }
  return false;
}

/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Expose `Emitter`.
 */

if (true) {
  module.exports = Emitter;
}

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  function on() {
    this.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks['$' + event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks['$' + event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1)
    , callbacks = this._callbacks['$' + event];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks['$' + event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/*global Blob,File*/

/**
 * Module requirements
 */

var isArray = __webpack_require__(14);
var isBuf = __webpack_require__(15);
var toString = Object.prototype.toString;
var withNativeBlob = typeof global.Blob === 'function' || toString.call(global.Blob) === '[object BlobConstructor]';
var withNativeFile = typeof global.File === 'function' || toString.call(global.File) === '[object FileConstructor]';

/**
 * Replaces every Buffer | ArrayBuffer in packet with a numbered placeholder.
 * Anything with blobs or files should be fed through removeBlobs before coming
 * here.
 *
 * @param {Object} packet - socket.io event packet
 * @return {Object} with deconstructed packet and list of buffers
 * @api public
 */

exports.deconstructPacket = function(packet) {
  var buffers = [];
  var packetData = packet.data;
  var pack = packet;
  pack.data = _deconstructPacket(packetData, buffers);
  pack.attachments = buffers.length; // number of binary 'attachments'
  return {packet: pack, buffers: buffers};
};

function _deconstructPacket(data, buffers) {
  if (!data) return data;

  if (isBuf(data)) {
    var placeholder = { _placeholder: true, num: buffers.length };
    buffers.push(data);
    return placeholder;
  } else if (isArray(data)) {
    var newData = new Array(data.length);
    for (var i = 0; i < data.length; i++) {
      newData[i] = _deconstructPacket(data[i], buffers);
    }
    return newData;
  } else if (typeof data === 'object' && !(data instanceof Date)) {
    var newData = {};
    for (var key in data) {
      newData[key] = _deconstructPacket(data[key], buffers);
    }
    return newData;
  }
  return data;
}

/**
 * Reconstructs a binary packet from its placeholder packet and buffers
 *
 * @param {Object} packet - event packet with placeholders
 * @param {Array} buffers - binary buffers to put in placeholder positions
 * @return {Object} reconstructed packet
 * @api public
 */

exports.reconstructPacket = function(packet, buffers) {
  packet.data = _reconstructPacket(packet.data, buffers);
  packet.attachments = undefined; // no longer useful
  return packet;
};

function _reconstructPacket(data, buffers) {
  if (!data) return data;

  if (data && data._placeholder) {
    return buffers[data.num]; // appropriate buffer (should be natural order anyway)
  } else if (isArray(data)) {
    for (var i = 0; i < data.length; i++) {
      data[i] = _reconstructPacket(data[i], buffers);
    }
  } else if (typeof data === 'object') {
    for (var key in data) {
      data[key] = _reconstructPacket(data[key], buffers);
    }
  }

  return data;
}

/**
 * Asynchronously removes Blobs or Files from data via
 * FileReader's readAsArrayBuffer method. Used before encoding
 * data as msgpack. Calls callback with the blobless data.
 *
 * @param {Object} data
 * @param {Function} callback
 * @api private
 */

exports.removeBlobs = function(data, callback) {
  function _removeBlobs(obj, curKey, containingObject) {
    if (!obj) return obj;

    // convert any blob
    if ((withNativeBlob && obj instanceof Blob) ||
        (withNativeFile && obj instanceof File)) {
      pendingBlobs++;

      // async filereader
      var fileReader = new FileReader();
      fileReader.onload = function() { // this.result == arraybuffer
        if (containingObject) {
          containingObject[curKey] = this.result;
        }
        else {
          bloblessData = this.result;
        }

        // if nothing pending its callback time
        if(! --pendingBlobs) {
          callback(bloblessData);
        }
      };

      fileReader.readAsArrayBuffer(obj); // blob -> arraybuffer
    } else if (isArray(obj)) { // handle array
      for (var i = 0; i < obj.length; i++) {
        _removeBlobs(obj[i], i, obj);
      }
    } else if (typeof obj === 'object' && !isBuf(obj)) { // and object
      for (var key in obj) {
        _removeBlobs(obj[key], key, obj);
      }
    }
  }

  var pendingBlobs = 0;
  var bloblessData = data;
  _removeBlobs(bloblessData);
  if (!pendingBlobs) {
    callback(bloblessData);
  }
};

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)))

/***/ }),
/* 14 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {
module.exports = isBuf;

var withNativeBuffer = typeof global.Buffer === 'function' && typeof global.Buffer.isBuffer === 'function';
var withNativeArrayBuffer = typeof global.ArrayBuffer === 'function';

var isView = (function () {
  if (withNativeArrayBuffer && typeof global.ArrayBuffer.isView === 'function') {
    return global.ArrayBuffer.isView;
  } else {
    return function (obj) { return obj.buffer instanceof global.ArrayBuffer; };
  }
})();

/**
 * Returns true if obj is a buffer or an arraybuffer.
 *
 * @api private
 */

function isBuf(obj) {
  return (withNativeBuffer && global.Buffer.isBuffer(obj)) ||
          (withNativeArrayBuffer && (obj instanceof global.ArrayBuffer || isView(obj)));
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)))

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Module dependencies.
 */

var eio = __webpack_require__(17);
var Socket = __webpack_require__(48);
var Emitter = __webpack_require__(12);
var parser = __webpack_require__(9);
var on = __webpack_require__(50);
var bind = __webpack_require__(51);
var debug = __webpack_require__(5)('socket.io-client:manager');
var indexOf = __webpack_require__(47);
var Backoff = __webpack_require__(52);

/**
 * IE6+ hasOwnProperty
 */

var has = Object.prototype.hasOwnProperty;

/**
 * Module exports
 */

module.exports = Manager;

/**
 * `Manager` constructor.
 *
 * @param {String} engine instance or engine uri/opts
 * @param {Object} options
 * @api public
 */

function Manager (uri, opts) {
  if (!(this instanceof Manager)) return new Manager(uri, opts);
  if (uri && ('object' === typeof uri)) {
    opts = uri;
    uri = undefined;
  }
  opts = opts || {};

  opts.path = opts.path || '/socket.io';
  this.nsps = {};
  this.subs = [];
  this.opts = opts;
  this.reconnection(opts.reconnection !== false);
  this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);
  this.reconnectionDelay(opts.reconnectionDelay || 1000);
  this.reconnectionDelayMax(opts.reconnectionDelayMax || 5000);
  this.randomizationFactor(opts.randomizationFactor || 0.5);
  this.backoff = new Backoff({
    min: this.reconnectionDelay(),
    max: this.reconnectionDelayMax(),
    jitter: this.randomizationFactor()
  });
  this.timeout(null == opts.timeout ? 20000 : opts.timeout);
  this.readyState = 'closed';
  this.uri = uri;
  this.connecting = [];
  this.lastPing = null;
  this.encoding = false;
  this.packetBuffer = [];
  var _parser = opts.parser || parser;
  this.encoder = new _parser.Encoder();
  this.decoder = new _parser.Decoder();
  this.autoConnect = opts.autoConnect !== false;
  if (this.autoConnect) this.open();
}

/**
 * Propagate given event to sockets and emit on `this`
 *
 * @api private
 */

Manager.prototype.emitAll = function () {
  this.emit.apply(this, arguments);
  for (var nsp in this.nsps) {
    if (has.call(this.nsps, nsp)) {
      this.nsps[nsp].emit.apply(this.nsps[nsp], arguments);
    }
  }
};

/**
 * Update `socket.id` of all sockets
 *
 * @api private
 */

Manager.prototype.updateSocketIds = function () {
  for (var nsp in this.nsps) {
    if (has.call(this.nsps, nsp)) {
      this.nsps[nsp].id = this.generateId(nsp);
    }
  }
};

/**
 * generate `socket.id` for the given `nsp`
 *
 * @param {String} nsp
 * @return {String}
 * @api private
 */

Manager.prototype.generateId = function (nsp) {
  return (nsp === '/' ? '' : (nsp + '#')) + this.engine.id;
};

/**
 * Mix in `Emitter`.
 */

Emitter(Manager.prototype);

/**
 * Sets the `reconnection` config.
 *
 * @param {Boolean} true/false if it should automatically reconnect
 * @return {Manager} self or value
 * @api public
 */

Manager.prototype.reconnection = function (v) {
  if (!arguments.length) return this._reconnection;
  this._reconnection = !!v;
  return this;
};

/**
 * Sets the reconnection attempts config.
 *
 * @param {Number} max reconnection attempts before giving up
 * @return {Manager} self or value
 * @api public
 */

Manager.prototype.reconnectionAttempts = function (v) {
  if (!arguments.length) return this._reconnectionAttempts;
  this._reconnectionAttempts = v;
  return this;
};

/**
 * Sets the delay between reconnections.
 *
 * @param {Number} delay
 * @return {Manager} self or value
 * @api public
 */

Manager.prototype.reconnectionDelay = function (v) {
  if (!arguments.length) return this._reconnectionDelay;
  this._reconnectionDelay = v;
  this.backoff && this.backoff.setMin(v);
  return this;
};

Manager.prototype.randomizationFactor = function (v) {
  if (!arguments.length) return this._randomizationFactor;
  this._randomizationFactor = v;
  this.backoff && this.backoff.setJitter(v);
  return this;
};

/**
 * Sets the maximum delay between reconnections.
 *
 * @param {Number} delay
 * @return {Manager} self or value
 * @api public
 */

Manager.prototype.reconnectionDelayMax = function (v) {
  if (!arguments.length) return this._reconnectionDelayMax;
  this._reconnectionDelayMax = v;
  this.backoff && this.backoff.setMax(v);
  return this;
};

/**
 * Sets the connection timeout. `false` to disable
 *
 * @return {Manager} self or value
 * @api public
 */

Manager.prototype.timeout = function (v) {
  if (!arguments.length) return this._timeout;
  this._timeout = v;
  return this;
};

/**
 * Starts trying to reconnect if reconnection is enabled and we have not
 * started reconnecting yet
 *
 * @api private
 */

Manager.prototype.maybeReconnectOnOpen = function () {
  // Only try to reconnect if it's the first time we're connecting
  if (!this.reconnecting && this._reconnection && this.backoff.attempts === 0) {
    // keeps reconnection from firing twice for the same reconnection loop
    this.reconnect();
  }
};

/**
 * Sets the current transport `socket`.
 *
 * @param {Function} optional, callback
 * @return {Manager} self
 * @api public
 */

Manager.prototype.open =
Manager.prototype.connect = function (fn, opts) {
  debug('readyState %s', this.readyState);
  if (~this.readyState.indexOf('open')) return this;

  debug('opening %s', this.uri);
  this.engine = eio(this.uri, this.opts);
  var socket = this.engine;
  var self = this;
  this.readyState = 'opening';
  this.skipReconnect = false;

  // emit `open`
  var openSub = on(socket, 'open', function () {
    self.onopen();
    fn && fn();
  });

  // emit `connect_error`
  var errorSub = on(socket, 'error', function (data) {
    debug('connect_error');
    self.cleanup();
    self.readyState = 'closed';
    self.emitAll('connect_error', data);
    if (fn) {
      var err = new Error('Connection error');
      err.data = data;
      fn(err);
    } else {
      // Only do this if there is no fn to handle the error
      self.maybeReconnectOnOpen();
    }
  });

  // emit `connect_timeout`
  if (false !== this._timeout) {
    var timeout = this._timeout;
    debug('connect attempt will timeout after %d', timeout);

    // set timer
    var timer = setTimeout(function () {
      debug('connect attempt timed out after %d', timeout);
      openSub.destroy();
      socket.close();
      socket.emit('error', 'timeout');
      self.emitAll('connect_timeout', timeout);
    }, timeout);

    this.subs.push({
      destroy: function () {
        clearTimeout(timer);
      }
    });
  }

  this.subs.push(openSub);
  this.subs.push(errorSub);

  return this;
};

/**
 * Called upon transport open.
 *
 * @api private
 */

Manager.prototype.onopen = function () {
  debug('open');

  // clear old subs
  this.cleanup();

  // mark as open
  this.readyState = 'open';
  this.emit('open');

  // add new subs
  var socket = this.engine;
  this.subs.push(on(socket, 'data', bind(this, 'ondata')));
  this.subs.push(on(socket, 'ping', bind(this, 'onping')));
  this.subs.push(on(socket, 'pong', bind(this, 'onpong')));
  this.subs.push(on(socket, 'error', bind(this, 'onerror')));
  this.subs.push(on(socket, 'close', bind(this, 'onclose')));
  this.subs.push(on(this.decoder, 'decoded', bind(this, 'ondecoded')));
};

/**
 * Called upon a ping.
 *
 * @api private
 */

Manager.prototype.onping = function () {
  this.lastPing = new Date();
  this.emitAll('ping');
};

/**
 * Called upon a packet.
 *
 * @api private
 */

Manager.prototype.onpong = function () {
  this.emitAll('pong', new Date() - this.lastPing);
};

/**
 * Called with data.
 *
 * @api private
 */

Manager.prototype.ondata = function (data) {
  this.decoder.add(data);
};

/**
 * Called when parser fully decodes a packet.
 *
 * @api private
 */

Manager.prototype.ondecoded = function (packet) {
  this.emit('packet', packet);
};

/**
 * Called upon socket error.
 *
 * @api private
 */

Manager.prototype.onerror = function (err) {
  debug('error', err);
  this.emitAll('error', err);
};

/**
 * Creates a new socket for the given `nsp`.
 *
 * @return {Socket}
 * @api public
 */

Manager.prototype.socket = function (nsp, opts) {
  var socket = this.nsps[nsp];
  if (!socket) {
    socket = new Socket(this, nsp, opts);
    this.nsps[nsp] = socket;
    var self = this;
    socket.on('connecting', onConnecting);
    socket.on('connect', function () {
      socket.id = self.generateId(nsp);
    });

    if (this.autoConnect) {
      // manually call here since connecting event is fired before listening
      onConnecting();
    }
  }

  function onConnecting () {
    if (!~indexOf(self.connecting, socket)) {
      self.connecting.push(socket);
    }
  }

  return socket;
};

/**
 * Called upon a socket close.
 *
 * @param {Socket} socket
 */

Manager.prototype.destroy = function (socket) {
  var index = indexOf(this.connecting, socket);
  if (~index) this.connecting.splice(index, 1);
  if (this.connecting.length) return;

  this.close();
};

/**
 * Writes a packet.
 *
 * @param {Object} packet
 * @api private
 */

Manager.prototype.packet = function (packet) {
  debug('writing packet %j', packet);
  var self = this;
  if (packet.query && packet.type === 0) packet.nsp += '?' + packet.query;

  if (!self.encoding) {
    // encode, then write to engine with result
    self.encoding = true;
    this.encoder.encode(packet, function (encodedPackets) {
      for (var i = 0; i < encodedPackets.length; i++) {
        self.engine.write(encodedPackets[i], packet.options);
      }
      self.encoding = false;
      self.processPacketQueue();
    });
  } else { // add packet to the queue
    self.packetBuffer.push(packet);
  }
};

/**
 * If packet buffer is non-empty, begins encoding the
 * next packet in line.
 *
 * @api private
 */

Manager.prototype.processPacketQueue = function () {
  if (this.packetBuffer.length > 0 && !this.encoding) {
    var pack = this.packetBuffer.shift();
    this.packet(pack);
  }
};

/**
 * Clean up transport subscriptions and packet buffer.
 *
 * @api private
 */

Manager.prototype.cleanup = function () {
  debug('cleanup');

  var subsLength = this.subs.length;
  for (var i = 0; i < subsLength; i++) {
    var sub = this.subs.shift();
    sub.destroy();
  }

  this.packetBuffer = [];
  this.encoding = false;
  this.lastPing = null;

  this.decoder.destroy();
};

/**
 * Close the current socket.
 *
 * @api private
 */

Manager.prototype.close =
Manager.prototype.disconnect = function () {
  debug('disconnect');
  this.skipReconnect = true;
  this.reconnecting = false;
  if ('opening' === this.readyState) {
    // `onclose` will not fire because
    // an open event never happened
    this.cleanup();
  }
  this.backoff.reset();
  this.readyState = 'closed';
  if (this.engine) this.engine.close();
};

/**
 * Called upon engine close.
 *
 * @api private
 */

Manager.prototype.onclose = function (reason) {
  debug('onclose');

  this.cleanup();
  this.backoff.reset();
  this.readyState = 'closed';
  this.emit('close', reason);

  if (this._reconnection && !this.skipReconnect) {
    this.reconnect();
  }
};

/**
 * Attempt a reconnection.
 *
 * @api private
 */

Manager.prototype.reconnect = function () {
  if (this.reconnecting || this.skipReconnect) return this;

  var self = this;

  if (this.backoff.attempts >= this._reconnectionAttempts) {
    debug('reconnect failed');
    this.backoff.reset();
    this.emitAll('reconnect_failed');
    this.reconnecting = false;
  } else {
    var delay = this.backoff.duration();
    debug('will wait %dms before reconnect attempt', delay);

    this.reconnecting = true;
    var timer = setTimeout(function () {
      if (self.skipReconnect) return;

      debug('attempting reconnect');
      self.emitAll('reconnect_attempt', self.backoff.attempts);
      self.emitAll('reconnecting', self.backoff.attempts);

      // check again for the case socket closed in above events
      if (self.skipReconnect) return;

      self.open(function (err) {
        if (err) {
          debug('reconnect attempt error');
          self.reconnecting = false;
          self.reconnect();
          self.emitAll('reconnect_error', err.data);
        } else {
          debug('reconnect success');
          self.onreconnect();
        }
      });
    }, delay);

    this.subs.push({
      destroy: function () {
        clearTimeout(timer);
      }
    });
  }
};

/**
 * Called upon successful reconnect.
 *
 * @api private
 */

Manager.prototype.onreconnect = function () {
  var attempt = this.backoff.attempts;
  this.reconnecting = false;
  this.backoff.reset();
  this.updateSocketIds();
  this.emitAll('reconnect', attempt);
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {


module.exports = __webpack_require__(18);

/**
 * Exports parser
 *
 * @api public
 *
 */
module.exports.parser = __webpack_require__(25);


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * Module dependencies.
 */

var transports = __webpack_require__(19);
var Emitter = __webpack_require__(12);
var debug = __webpack_require__(42)('engine.io-client:socket');
var index = __webpack_require__(47);
var parser = __webpack_require__(25);
var parseuri = __webpack_require__(4);
var parseqs = __webpack_require__(39);

/**
 * Module exports.
 */

module.exports = Socket;

/**
 * Socket constructor.
 *
 * @param {String|Object} uri or options
 * @param {Object} options
 * @api public
 */

function Socket (uri, opts) {
  if (!(this instanceof Socket)) return new Socket(uri, opts);

  opts = opts || {};

  if (uri && 'object' === typeof uri) {
    opts = uri;
    uri = null;
  }

  if (uri) {
    uri = parseuri(uri);
    opts.hostname = uri.host;
    opts.secure = uri.protocol === 'https' || uri.protocol === 'wss';
    opts.port = uri.port;
    if (uri.query) opts.query = uri.query;
  } else if (opts.host) {
    opts.hostname = parseuri(opts.host).host;
  }

  this.secure = null != opts.secure ? opts.secure
    : (global.location && 'https:' === location.protocol);

  if (opts.hostname && !opts.port) {
    // if no port is specified manually, use the protocol default
    opts.port = this.secure ? '443' : '80';
  }

  this.agent = opts.agent || false;
  this.hostname = opts.hostname ||
    (global.location ? location.hostname : 'localhost');
  this.port = opts.port || (global.location && location.port
      ? location.port
      : (this.secure ? 443 : 80));
  this.query = opts.query || {};
  if ('string' === typeof this.query) this.query = parseqs.decode(this.query);
  this.upgrade = false !== opts.upgrade;
  this.path = (opts.path || '/engine.io').replace(/\/$/, '') + '/';
  this.forceJSONP = !!opts.forceJSONP;
  this.jsonp = false !== opts.jsonp;
  this.forceBase64 = !!opts.forceBase64;
  this.enablesXDR = !!opts.enablesXDR;
  this.timestampParam = opts.timestampParam || 't';
  this.timestampRequests = opts.timestampRequests;
  this.transports = opts.transports || ['polling', 'websocket'];
  this.transportOptions = opts.transportOptions || {};
  this.readyState = '';
  this.writeBuffer = [];
  this.prevBufferLen = 0;
  this.policyPort = opts.policyPort || 843;
  this.rememberUpgrade = opts.rememberUpgrade || false;
  this.binaryType = null;
  this.onlyBinaryUpgrades = opts.onlyBinaryUpgrades;
  this.perMessageDeflate = false !== opts.perMessageDeflate ? (opts.perMessageDeflate || {}) : false;

  if (true === this.perMessageDeflate) this.perMessageDeflate = {};
  if (this.perMessageDeflate && null == this.perMessageDeflate.threshold) {
    this.perMessageDeflate.threshold = 1024;
  }

  // SSL options for Node.js client
  this.pfx = opts.pfx || null;
  this.key = opts.key || null;
  this.passphrase = opts.passphrase || null;
  this.cert = opts.cert || null;
  this.ca = opts.ca || null;
  this.ciphers = opts.ciphers || null;
  this.rejectUnauthorized = opts.rejectUnauthorized === undefined ? true : opts.rejectUnauthorized;
  this.forceNode = !!opts.forceNode;

  // other options for Node.js client
  var freeGlobal = typeof global === 'object' && global;
  if (freeGlobal.global === freeGlobal) {
    if (opts.extraHeaders && Object.keys(opts.extraHeaders).length > 0) {
      this.extraHeaders = opts.extraHeaders;
    }

    if (opts.localAddress) {
      this.localAddress = opts.localAddress;
    }
  }

  // set on handshake
  this.id = null;
  this.upgrades = null;
  this.pingInterval = null;
  this.pingTimeout = null;

  // set on heartbeat
  this.pingIntervalTimer = null;
  this.pingTimeoutTimer = null;

  this.open();
}

Socket.priorWebsocketSuccess = false;

/**
 * Mix in `Emitter`.
 */

Emitter(Socket.prototype);

/**
 * Protocol version.
 *
 * @api public
 */

Socket.protocol = parser.protocol; // this is an int

/**
 * Expose deps for legacy compatibility
 * and standalone browser access.
 */

Socket.Socket = Socket;
Socket.Transport = __webpack_require__(24);
Socket.transports = __webpack_require__(19);
Socket.parser = __webpack_require__(25);

/**
 * Creates transport of the given type.
 *
 * @param {String} transport name
 * @return {Transport}
 * @api private
 */

Socket.prototype.createTransport = function (name) {
  debug('creating transport "%s"', name);
  var query = clone(this.query);

  // append engine.io protocol identifier
  query.EIO = parser.protocol;

  // transport name
  query.transport = name;

  // per-transport options
  var options = this.transportOptions[name] || {};

  // session id if we already have one
  if (this.id) query.sid = this.id;

  var transport = new transports[name]({
    query: query,
    socket: this,
    agent: options.agent || this.agent,
    hostname: options.hostname || this.hostname,
    port: options.port || this.port,
    secure: options.secure || this.secure,
    path: options.path || this.path,
    forceJSONP: options.forceJSONP || this.forceJSONP,
    jsonp: options.jsonp || this.jsonp,
    forceBase64: options.forceBase64 || this.forceBase64,
    enablesXDR: options.enablesXDR || this.enablesXDR,
    timestampRequests: options.timestampRequests || this.timestampRequests,
    timestampParam: options.timestampParam || this.timestampParam,
    policyPort: options.policyPort || this.policyPort,
    pfx: options.pfx || this.pfx,
    key: options.key || this.key,
    passphrase: options.passphrase || this.passphrase,
    cert: options.cert || this.cert,
    ca: options.ca || this.ca,
    ciphers: options.ciphers || this.ciphers,
    rejectUnauthorized: options.rejectUnauthorized || this.rejectUnauthorized,
    perMessageDeflate: options.perMessageDeflate || this.perMessageDeflate,
    extraHeaders: options.extraHeaders || this.extraHeaders,
    forceNode: options.forceNode || this.forceNode,
    localAddress: options.localAddress || this.localAddress,
    requestTimeout: options.requestTimeout || this.requestTimeout,
    protocols: options.protocols || void (0)
  });

  return transport;
};

function clone (obj) {
  var o = {};
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      o[i] = obj[i];
    }
  }
  return o;
}

/**
 * Initializes transport to use and starts probe.
 *
 * @api private
 */
Socket.prototype.open = function () {
  var transport;
  if (this.rememberUpgrade && Socket.priorWebsocketSuccess && this.transports.indexOf('websocket') !== -1) {
    transport = 'websocket';
  } else if (0 === this.transports.length) {
    // Emit error on next tick so it can be listened to
    var self = this;
    setTimeout(function () {
      self.emit('error', 'No transports available');
    }, 0);
    return;
  } else {
    transport = this.transports[0];
  }
  this.readyState = 'opening';

  // Retry with the next transport if the transport is disabled (jsonp: false)
  try {
    transport = this.createTransport(transport);
  } catch (e) {
    this.transports.shift();
    this.open();
    return;
  }

  transport.open();
  this.setTransport(transport);
};

/**
 * Sets the current transport. Disables the existing one (if any).
 *
 * @api private
 */

Socket.prototype.setTransport = function (transport) {
  debug('setting transport %s', transport.name);
  var self = this;

  if (this.transport) {
    debug('clearing existing transport %s', this.transport.name);
    this.transport.removeAllListeners();
  }

  // set up transport
  this.transport = transport;

  // set up transport listeners
  transport
  .on('drain', function () {
    self.onDrain();
  })
  .on('packet', function (packet) {
    self.onPacket(packet);
  })
  .on('error', function (e) {
    self.onError(e);
  })
  .on('close', function () {
    self.onClose('transport close');
  });
};

/**
 * Probes a transport.
 *
 * @param {String} transport name
 * @api private
 */

Socket.prototype.probe = function (name) {
  debug('probing transport "%s"', name);
  var transport = this.createTransport(name, { probe: 1 });
  var failed = false;
  var self = this;

  Socket.priorWebsocketSuccess = false;

  function onTransportOpen () {
    if (self.onlyBinaryUpgrades) {
      var upgradeLosesBinary = !this.supportsBinary && self.transport.supportsBinary;
      failed = failed || upgradeLosesBinary;
    }
    if (failed) return;

    debug('probe transport "%s" opened', name);
    transport.send([{ type: 'ping', data: 'probe' }]);
    transport.once('packet', function (msg) {
      if (failed) return;
      if ('pong' === msg.type && 'probe' === msg.data) {
        debug('probe transport "%s" pong', name);
        self.upgrading = true;
        self.emit('upgrading', transport);
        if (!transport) return;
        Socket.priorWebsocketSuccess = 'websocket' === transport.name;

        debug('pausing current transport "%s"', self.transport.name);
        self.transport.pause(function () {
          if (failed) return;
          if ('closed' === self.readyState) return;
          debug('changing transport and sending upgrade packet');

          cleanup();

          self.setTransport(transport);
          transport.send([{ type: 'upgrade' }]);
          self.emit('upgrade', transport);
          transport = null;
          self.upgrading = false;
          self.flush();
        });
      } else {
        debug('probe transport "%s" failed', name);
        var err = new Error('probe error');
        err.transport = transport.name;
        self.emit('upgradeError', err);
      }
    });
  }

  function freezeTransport () {
    if (failed) return;

    // Any callback called by transport should be ignored since now
    failed = true;

    cleanup();

    transport.close();
    transport = null;
  }

  // Handle any error that happens while probing
  function onerror (err) {
    var error = new Error('probe error: ' + err);
    error.transport = transport.name;

    freezeTransport();

    debug('probe transport "%s" failed because of error: %s', name, err);

    self.emit('upgradeError', error);
  }

  function onTransportClose () {
    onerror('transport closed');
  }

  // When the socket is closed while we're probing
  function onclose () {
    onerror('socket closed');
  }

  // When the socket is upgraded while we're probing
  function onupgrade (to) {
    if (transport && to.name !== transport.name) {
      debug('"%s" works - aborting "%s"', to.name, transport.name);
      freezeTransport();
    }
  }

  // Remove all listeners on the transport and on self
  function cleanup () {
    transport.removeListener('open', onTransportOpen);
    transport.removeListener('error', onerror);
    transport.removeListener('close', onTransportClose);
    self.removeListener('close', onclose);
    self.removeListener('upgrading', onupgrade);
  }

  transport.once('open', onTransportOpen);
  transport.once('error', onerror);
  transport.once('close', onTransportClose);

  this.once('close', onclose);
  this.once('upgrading', onupgrade);

  transport.open();
};

/**
 * Called when connection is deemed open.
 *
 * @api public
 */

Socket.prototype.onOpen = function () {
  debug('socket open');
  this.readyState = 'open';
  Socket.priorWebsocketSuccess = 'websocket' === this.transport.name;
  this.emit('open');
  this.flush();

  // we check for `readyState` in case an `open`
  // listener already closed the socket
  if ('open' === this.readyState && this.upgrade && this.transport.pause) {
    debug('starting upgrade probes');
    for (var i = 0, l = this.upgrades.length; i < l; i++) {
      this.probe(this.upgrades[i]);
    }
  }
};

/**
 * Handles a packet.
 *
 * @api private
 */

Socket.prototype.onPacket = function (packet) {
  if ('opening' === this.readyState || 'open' === this.readyState ||
      'closing' === this.readyState) {
    debug('socket receive: type "%s", data "%s"', packet.type, packet.data);

    this.emit('packet', packet);

    // Socket is live - any packet counts
    this.emit('heartbeat');

    switch (packet.type) {
      case 'open':
        this.onHandshake(JSON.parse(packet.data));
        break;

      case 'pong':
        this.setPing();
        this.emit('pong');
        break;

      case 'error':
        var err = new Error('server error');
        err.code = packet.data;
        this.onError(err);
        break;

      case 'message':
        this.emit('data', packet.data);
        this.emit('message', packet.data);
        break;
    }
  } else {
    debug('packet received with socket readyState "%s"', this.readyState);
  }
};

/**
 * Called upon handshake completion.
 *
 * @param {Object} handshake obj
 * @api private
 */

Socket.prototype.onHandshake = function (data) {
  this.emit('handshake', data);
  this.id = data.sid;
  this.transport.query.sid = data.sid;
  this.upgrades = this.filterUpgrades(data.upgrades);
  this.pingInterval = data.pingInterval;
  this.pingTimeout = data.pingTimeout;
  this.onOpen();
  // In case open handler closes socket
  if ('closed' === this.readyState) return;
  this.setPing();

  // Prolong liveness of socket on heartbeat
  this.removeListener('heartbeat', this.onHeartbeat);
  this.on('heartbeat', this.onHeartbeat);
};

/**
 * Resets ping timeout.
 *
 * @api private
 */

Socket.prototype.onHeartbeat = function (timeout) {
  clearTimeout(this.pingTimeoutTimer);
  var self = this;
  self.pingTimeoutTimer = setTimeout(function () {
    if ('closed' === self.readyState) return;
    self.onClose('ping timeout');
  }, timeout || (self.pingInterval + self.pingTimeout));
};

/**
 * Pings server every `this.pingInterval` and expects response
 * within `this.pingTimeout` or closes connection.
 *
 * @api private
 */

Socket.prototype.setPing = function () {
  var self = this;
  clearTimeout(self.pingIntervalTimer);
  self.pingIntervalTimer = setTimeout(function () {
    debug('writing ping packet - expecting pong within %sms', self.pingTimeout);
    self.ping();
    self.onHeartbeat(self.pingTimeout);
  }, self.pingInterval);
};

/**
* Sends a ping packet.
*
* @api private
*/

Socket.prototype.ping = function () {
  var self = this;
  this.sendPacket('ping', function () {
    self.emit('ping');
  });
};

/**
 * Called on `drain` event
 *
 * @api private
 */

Socket.prototype.onDrain = function () {
  this.writeBuffer.splice(0, this.prevBufferLen);

  // setting prevBufferLen = 0 is very important
  // for example, when upgrading, upgrade packet is sent over,
  // and a nonzero prevBufferLen could cause problems on `drain`
  this.prevBufferLen = 0;

  if (0 === this.writeBuffer.length) {
    this.emit('drain');
  } else {
    this.flush();
  }
};

/**
 * Flush write buffers.
 *
 * @api private
 */

Socket.prototype.flush = function () {
  if ('closed' !== this.readyState && this.transport.writable &&
    !this.upgrading && this.writeBuffer.length) {
    debug('flushing %d packets in socket', this.writeBuffer.length);
    this.transport.send(this.writeBuffer);
    // keep track of current length of writeBuffer
    // splice writeBuffer and callbackBuffer on `drain`
    this.prevBufferLen = this.writeBuffer.length;
    this.emit('flush');
  }
};

/**
 * Sends a message.
 *
 * @param {String} message.
 * @param {Function} callback function.
 * @param {Object} options.
 * @return {Socket} for chaining.
 * @api public
 */

Socket.prototype.write =
Socket.prototype.send = function (msg, options, fn) {
  this.sendPacket('message', msg, options, fn);
  return this;
};

/**
 * Sends a packet.
 *
 * @param {String} packet type.
 * @param {String} data.
 * @param {Object} options.
 * @param {Function} callback function.
 * @api private
 */

Socket.prototype.sendPacket = function (type, data, options, fn) {
  if ('function' === typeof data) {
    fn = data;
    data = undefined;
  }

  if ('function' === typeof options) {
    fn = options;
    options = null;
  }

  if ('closing' === this.readyState || 'closed' === this.readyState) {
    return;
  }

  options = options || {};
  options.compress = false !== options.compress;

  var packet = {
    type: type,
    data: data,
    options: options
  };
  this.emit('packetCreate', packet);
  this.writeBuffer.push(packet);
  if (fn) this.once('flush', fn);
  this.flush();
};

/**
 * Closes the connection.
 *
 * @api private
 */

Socket.prototype.close = function () {
  if ('opening' === this.readyState || 'open' === this.readyState) {
    this.readyState = 'closing';

    var self = this;

    if (this.writeBuffer.length) {
      this.once('drain', function () {
        if (this.upgrading) {
          waitForUpgrade();
        } else {
          close();
        }
      });
    } else if (this.upgrading) {
      waitForUpgrade();
    } else {
      close();
    }
  }

  function close () {
    self.onClose('forced close');
    debug('socket closing - telling transport to close');
    self.transport.close();
  }

  function cleanupAndClose () {
    self.removeListener('upgrade', cleanupAndClose);
    self.removeListener('upgradeError', cleanupAndClose);
    close();
  }

  function waitForUpgrade () {
    // wait for upgrade to finish since we can't send packets while pausing a transport
    self.once('upgrade', cleanupAndClose);
    self.once('upgradeError', cleanupAndClose);
  }

  return this;
};

/**
 * Called upon transport error
 *
 * @api private
 */

Socket.prototype.onError = function (err) {
  debug('socket error %j', err);
  Socket.priorWebsocketSuccess = false;
  this.emit('error', err);
  this.onClose('transport error', err);
};

/**
 * Called upon transport close.
 *
 * @api private
 */

Socket.prototype.onClose = function (reason, desc) {
  if ('opening' === this.readyState || 'open' === this.readyState || 'closing' === this.readyState) {
    debug('socket close with reason: "%s"', reason);
    var self = this;

    // clear timers
    clearTimeout(this.pingIntervalTimer);
    clearTimeout(this.pingTimeoutTimer);

    // stop event from firing again for transport
    this.transport.removeAllListeners('close');

    // ensure transport won't stay open
    this.transport.close();

    // ignore further transport communication
    this.transport.removeAllListeners();

    // set ready state
    this.readyState = 'closed';

    // clear session id
    this.id = null;

    // emit close event
    this.emit('close', reason, desc);

    // clean buffers after, so users can still
    // grab the buffers on `close` event
    self.writeBuffer = [];
    self.prevBufferLen = 0;
  }
};

/**
 * Filters upgrades, returning only those matching client transports.
 *
 * @param {Array} server upgrades
 * @api private
 *
 */

Socket.prototype.filterUpgrades = function (upgrades) {
  var filteredUpgrades = [];
  for (var i = 0, j = upgrades.length; i < j; i++) {
    if (~index(this.transports, upgrades[i])) filteredUpgrades.push(upgrades[i]);
  }
  return filteredUpgrades;
};

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)))

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * Module dependencies
 */

var XMLHttpRequest = __webpack_require__(20);
var XHR = __webpack_require__(22);
var JSONP = __webpack_require__(44);
var websocket = __webpack_require__(45);

/**
 * Export transports.
 */

exports.polling = polling;
exports.websocket = websocket;

/**
 * Polling transport polymorphic constructor.
 * Decides on xhr vs jsonp based on feature detection.
 *
 * @api private
 */

function polling (opts) {
  var xhr;
  var xd = false;
  var xs = false;
  var jsonp = false !== opts.jsonp;

  if (global.location) {
    var isSSL = 'https:' === location.protocol;
    var port = location.port;

    // some user agents have empty `location.port`
    if (!port) {
      port = isSSL ? 443 : 80;
    }

    xd = opts.hostname !== location.hostname || port !== opts.port;
    xs = opts.secure !== isSSL;
  }

  opts.xdomain = xd;
  opts.xscheme = xs;
  xhr = new XMLHttpRequest(opts);

  if ('open' in xhr && !opts.forceJSONP) {
    return new XHR(opts);
  } else {
    if (!jsonp) throw new Error('JSONP disabled');
    return new JSONP(opts);
  }
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)))

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {// browser shim for xmlhttprequest module

var hasCORS = __webpack_require__(21);

module.exports = function (opts) {
  var xdomain = opts.xdomain;

  // scheme must be same when usign XDomainRequest
  // http://blogs.msdn.com/b/ieinternals/archive/2010/05/13/xdomainrequest-restrictions-limitations-and-workarounds.aspx
  var xscheme = opts.xscheme;

  // XDomainRequest has a flow of not sending cookie, therefore it should be disabled as a default.
  // https://github.com/Automattic/engine.io-client/pull/217
  var enablesXDR = opts.enablesXDR;

  // XMLHttpRequest can be disabled on IE
  try {
    if ('undefined' !== typeof XMLHttpRequest && (!xdomain || hasCORS)) {
      return new XMLHttpRequest();
    }
  } catch (e) { }

  // Use XDomainRequest for IE8 if enablesXDR is true
  // because loading bar keeps flashing when using jsonp-polling
  // https://github.com/yujiosaka/socke.io-ie8-loading-example
  try {
    if ('undefined' !== typeof XDomainRequest && !xscheme && enablesXDR) {
      return new XDomainRequest();
    }
  } catch (e) { }

  if (!xdomain) {
    try {
      return new global[['Active'].concat('Object').join('X')]('Microsoft.XMLHTTP');
    } catch (e) { }
  }
};

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)))

/***/ }),
/* 21 */
/***/ (function(module, exports) {


/**
 * Module exports.
 *
 * Logic borrowed from Modernizr:
 *
 *   - https://github.com/Modernizr/Modernizr/blob/master/feature-detects/cors.js
 */

try {
  module.exports = typeof XMLHttpRequest !== 'undefined' &&
    'withCredentials' in new XMLHttpRequest();
} catch (err) {
  // if XMLHttp support is disabled in IE then it will throw
  // when trying to create
  module.exports = false;
}


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * Module requirements.
 */

var XMLHttpRequest = __webpack_require__(20);
var Polling = __webpack_require__(23);
var Emitter = __webpack_require__(12);
var inherit = __webpack_require__(40);
var debug = __webpack_require__(42)('engine.io-client:polling-xhr');

/**
 * Module exports.
 */

module.exports = XHR;
module.exports.Request = Request;

/**
 * Empty function
 */

function empty () {}

/**
 * XHR Polling constructor.
 *
 * @param {Object} opts
 * @api public
 */

function XHR (opts) {
  Polling.call(this, opts);
  this.requestTimeout = opts.requestTimeout;
  this.extraHeaders = opts.extraHeaders;

  if (global.location) {
    var isSSL = 'https:' === location.protocol;
    var port = location.port;

    // some user agents have empty `location.port`
    if (!port) {
      port = isSSL ? 443 : 80;
    }

    this.xd = opts.hostname !== global.location.hostname ||
      port !== opts.port;
    this.xs = opts.secure !== isSSL;
  }
}

/**
 * Inherits from Polling.
 */

inherit(XHR, Polling);

/**
 * XHR supports binary
 */

XHR.prototype.supportsBinary = true;

/**
 * Creates a request.
 *
 * @param {String} method
 * @api private
 */

XHR.prototype.request = function (opts) {
  opts = opts || {};
  opts.uri = this.uri();
  opts.xd = this.xd;
  opts.xs = this.xs;
  opts.agent = this.agent || false;
  opts.supportsBinary = this.supportsBinary;
  opts.enablesXDR = this.enablesXDR;

  // SSL options for Node.js client
  opts.pfx = this.pfx;
  opts.key = this.key;
  opts.passphrase = this.passphrase;
  opts.cert = this.cert;
  opts.ca = this.ca;
  opts.ciphers = this.ciphers;
  opts.rejectUnauthorized = this.rejectUnauthorized;
  opts.requestTimeout = this.requestTimeout;

  // other options for Node.js client
  opts.extraHeaders = this.extraHeaders;

  return new Request(opts);
};

/**
 * Sends data.
 *
 * @param {String} data to send.
 * @param {Function} called upon flush.
 * @api private
 */

XHR.prototype.doWrite = function (data, fn) {
  var isBinary = typeof data !== 'string' && data !== undefined;
  var req = this.request({ method: 'POST', data: data, isBinary: isBinary });
  var self = this;
  req.on('success', fn);
  req.on('error', function (err) {
    self.onError('xhr post error', err);
  });
  this.sendXhr = req;
};

/**
 * Starts a poll cycle.
 *
 * @api private
 */

XHR.prototype.doPoll = function () {
  debug('xhr poll');
  var req = this.request();
  var self = this;
  req.on('data', function (data) {
    self.onData(data);
  });
  req.on('error', function (err) {
    self.onError('xhr poll error', err);
  });
  this.pollXhr = req;
};

/**
 * Request constructor
 *
 * @param {Object} options
 * @api public
 */

function Request (opts) {
  this.method = opts.method || 'GET';
  this.uri = opts.uri;
  this.xd = !!opts.xd;
  this.xs = !!opts.xs;
  this.async = false !== opts.async;
  this.data = undefined !== opts.data ? opts.data : null;
  this.agent = opts.agent;
  this.isBinary = opts.isBinary;
  this.supportsBinary = opts.supportsBinary;
  this.enablesXDR = opts.enablesXDR;
  this.requestTimeout = opts.requestTimeout;

  // SSL options for Node.js client
  this.pfx = opts.pfx;
  this.key = opts.key;
  this.passphrase = opts.passphrase;
  this.cert = opts.cert;
  this.ca = opts.ca;
  this.ciphers = opts.ciphers;
  this.rejectUnauthorized = opts.rejectUnauthorized;

  // other options for Node.js client
  this.extraHeaders = opts.extraHeaders;

  this.create();
}

/**
 * Mix in `Emitter`.
 */

Emitter(Request.prototype);

/**
 * Creates the XHR object and sends the request.
 *
 * @api private
 */

Request.prototype.create = function () {
  var opts = { agent: this.agent, xdomain: this.xd, xscheme: this.xs, enablesXDR: this.enablesXDR };

  // SSL options for Node.js client
  opts.pfx = this.pfx;
  opts.key = this.key;
  opts.passphrase = this.passphrase;
  opts.cert = this.cert;
  opts.ca = this.ca;
  opts.ciphers = this.ciphers;
  opts.rejectUnauthorized = this.rejectUnauthorized;

  var xhr = this.xhr = new XMLHttpRequest(opts);
  var self = this;

  try {
    debug('xhr open %s: %s', this.method, this.uri);
    xhr.open(this.method, this.uri, this.async);
    try {
      if (this.extraHeaders) {
        xhr.setDisableHeaderCheck && xhr.setDisableHeaderCheck(true);
        for (var i in this.extraHeaders) {
          if (this.extraHeaders.hasOwnProperty(i)) {
            xhr.setRequestHeader(i, this.extraHeaders[i]);
          }
        }
      }
    } catch (e) {}

    if ('POST' === this.method) {
      try {
        if (this.isBinary) {
          xhr.setRequestHeader('Content-type', 'application/octet-stream');
        } else {
          xhr.setRequestHeader('Content-type', 'text/plain;charset=UTF-8');
        }
      } catch (e) {}
    }

    try {
      xhr.setRequestHeader('Accept', '*/*');
    } catch (e) {}

    // ie6 check
    if ('withCredentials' in xhr) {
      xhr.withCredentials = true;
    }

    if (this.requestTimeout) {
      xhr.timeout = this.requestTimeout;
    }

    if (this.hasXDR()) {
      xhr.onload = function () {
        self.onLoad();
      };
      xhr.onerror = function () {
        self.onError(xhr.responseText);
      };
    } else {
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 2) {
          try {
            var contentType = xhr.getResponseHeader('Content-Type');
            if (self.supportsBinary && contentType === 'application/octet-stream') {
              xhr.responseType = 'arraybuffer';
            }
          } catch (e) {}
        }
        if (4 !== xhr.readyState) return;
        if (200 === xhr.status || 1223 === xhr.status) {
          self.onLoad();
        } else {
          // make sure the `error` event handler that's user-set
          // does not throw in the same tick and gets caught here
          setTimeout(function () {
            self.onError(xhr.status);
          }, 0);
        }
      };
    }

    debug('xhr data %s', this.data);
    xhr.send(this.data);
  } catch (e) {
    // Need to defer since .create() is called directly fhrom the constructor
    // and thus the 'error' event can only be only bound *after* this exception
    // occurs.  Therefore, also, we cannot throw here at all.
    setTimeout(function () {
      self.onError(e);
    }, 0);
    return;
  }

  if (global.document) {
    this.index = Request.requestsCount++;
    Request.requests[this.index] = this;
  }
};

/**
 * Called upon successful response.
 *
 * @api private
 */

Request.prototype.onSuccess = function () {
  this.emit('success');
  this.cleanup();
};

/**
 * Called if we have data.
 *
 * @api private
 */

Request.prototype.onData = function (data) {
  this.emit('data', data);
  this.onSuccess();
};

/**
 * Called upon error.
 *
 * @api private
 */

Request.prototype.onError = function (err) {
  this.emit('error', err);
  this.cleanup(true);
};

/**
 * Cleans up house.
 *
 * @api private
 */

Request.prototype.cleanup = function (fromError) {
  if ('undefined' === typeof this.xhr || null === this.xhr) {
    return;
  }
  // xmlhttprequest
  if (this.hasXDR()) {
    this.xhr.onload = this.xhr.onerror = empty;
  } else {
    this.xhr.onreadystatechange = empty;
  }

  if (fromError) {
    try {
      this.xhr.abort();
    } catch (e) {}
  }

  if (global.document) {
    delete Request.requests[this.index];
  }

  this.xhr = null;
};

/**
 * Called upon load.
 *
 * @api private
 */

Request.prototype.onLoad = function () {
  var data;
  try {
    var contentType;
    try {
      contentType = this.xhr.getResponseHeader('Content-Type');
    } catch (e) {}
    if (contentType === 'application/octet-stream') {
      data = this.xhr.response || this.xhr.responseText;
    } else {
      data = this.xhr.responseText;
    }
  } catch (e) {
    this.onError(e);
  }
  if (null != data) {
    this.onData(data);
  }
};

/**
 * Check if it has XDomainRequest.
 *
 * @api private
 */

Request.prototype.hasXDR = function () {
  return 'undefined' !== typeof global.XDomainRequest && !this.xs && this.enablesXDR;
};

/**
 * Aborts the request.
 *
 * @api public
 */

Request.prototype.abort = function () {
  this.cleanup();
};

/**
 * Aborts pending requests when unloading the window. This is needed to prevent
 * memory leaks (e.g. when using IE) and to ensure that no spurious error is
 * emitted.
 */

Request.requestsCount = 0;
Request.requests = {};

if (global.document) {
  if (global.attachEvent) {
    global.attachEvent('onunload', unloadHandler);
  } else if (global.addEventListener) {
    global.addEventListener('beforeunload', unloadHandler, false);
  }
}

function unloadHandler () {
  for (var i in Request.requests) {
    if (Request.requests.hasOwnProperty(i)) {
      Request.requests[i].abort();
    }
  }
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)))

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */

var Transport = __webpack_require__(24);
var parseqs = __webpack_require__(39);
var parser = __webpack_require__(25);
var inherit = __webpack_require__(40);
var yeast = __webpack_require__(41);
var debug = __webpack_require__(42)('engine.io-client:polling');

/**
 * Module exports.
 */

module.exports = Polling;

/**
 * Is XHR2 supported?
 */

var hasXHR2 = (function () {
  var XMLHttpRequest = __webpack_require__(20);
  var xhr = new XMLHttpRequest({ xdomain: false });
  return null != xhr.responseType;
})();

/**
 * Polling interface.
 *
 * @param {Object} opts
 * @api private
 */

function Polling (opts) {
  var forceBase64 = (opts && opts.forceBase64);
  if (!hasXHR2 || forceBase64) {
    this.supportsBinary = false;
  }
  Transport.call(this, opts);
}

/**
 * Inherits from Transport.
 */

inherit(Polling, Transport);

/**
 * Transport name.
 */

Polling.prototype.name = 'polling';

/**
 * Opens the socket (triggers polling). We write a PING message to determine
 * when the transport is open.
 *
 * @api private
 */

Polling.prototype.doOpen = function () {
  this.poll();
};

/**
 * Pauses polling.
 *
 * @param {Function} callback upon buffers are flushed and transport is paused
 * @api private
 */

Polling.prototype.pause = function (onPause) {
  var self = this;

  this.readyState = 'pausing';

  function pause () {
    debug('paused');
    self.readyState = 'paused';
    onPause();
  }

  if (this.polling || !this.writable) {
    var total = 0;

    if (this.polling) {
      debug('we are currently polling - waiting to pause');
      total++;
      this.once('pollComplete', function () {
        debug('pre-pause polling complete');
        --total || pause();
      });
    }

    if (!this.writable) {
      debug('we are currently writing - waiting to pause');
      total++;
      this.once('drain', function () {
        debug('pre-pause writing complete');
        --total || pause();
      });
    }
  } else {
    pause();
  }
};

/**
 * Starts polling cycle.
 *
 * @api public
 */

Polling.prototype.poll = function () {
  debug('polling');
  this.polling = true;
  this.doPoll();
  this.emit('poll');
};

/**
 * Overloads onData to detect payloads.
 *
 * @api private
 */

Polling.prototype.onData = function (data) {
  var self = this;
  debug('polling got data %s', data);
  var callback = function (packet, index, total) {
    // if its the first message we consider the transport open
    if ('opening' === self.readyState) {
      self.onOpen();
    }

    // if its a close packet, we close the ongoing requests
    if ('close' === packet.type) {
      self.onClose();
      return false;
    }

    // otherwise bypass onData and handle the message
    self.onPacket(packet);
  };

  // decode payload
  parser.decodePayload(data, this.socket.binaryType, callback);

  // if an event did not trigger closing
  if ('closed' !== this.readyState) {
    // if we got data we're not polling
    this.polling = false;
    this.emit('pollComplete');

    if ('open' === this.readyState) {
      this.poll();
    } else {
      debug('ignoring poll - transport state "%s"', this.readyState);
    }
  }
};

/**
 * For polling, send a close packet.
 *
 * @api private
 */

Polling.prototype.doClose = function () {
  var self = this;

  function close () {
    debug('writing close packet');
    self.write([{ type: 'close' }]);
  }

  if ('open' === this.readyState) {
    debug('transport open - closing');
    close();
  } else {
    // in case we're trying to close while
    // handshaking is in progress (GH-164)
    debug('transport not open - deferring close');
    this.once('open', close);
  }
};

/**
 * Writes a packets payload.
 *
 * @param {Array} data packets
 * @param {Function} drain callback
 * @api private
 */

Polling.prototype.write = function (packets) {
  var self = this;
  this.writable = false;
  var callbackfn = function () {
    self.writable = true;
    self.emit('drain');
  };

  parser.encodePayload(packets, this.supportsBinary, function (data) {
    self.doWrite(data, callbackfn);
  });
};

/**
 * Generates uri for connection.
 *
 * @api private
 */

Polling.prototype.uri = function () {
  var query = this.query || {};
  var schema = this.secure ? 'https' : 'http';
  var port = '';

  // cache busting is forced
  if (false !== this.timestampRequests) {
    query[this.timestampParam] = yeast();
  }

  if (!this.supportsBinary && !query.sid) {
    query.b64 = 1;
  }

  query = parseqs.encode(query);

  // avoid port if default for schema
  if (this.port && (('https' === schema && Number(this.port) !== 443) ||
     ('http' === schema && Number(this.port) !== 80))) {
    port = ':' + this.port;
  }

  // prepend ? to query
  if (query.length) {
    query = '?' + query;
  }

  var ipv6 = this.hostname.indexOf(':') !== -1;
  return schema + '://' + (ipv6 ? '[' + this.hostname + ']' : this.hostname) + port + this.path + query;
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */

var parser = __webpack_require__(25);
var Emitter = __webpack_require__(12);

/**
 * Module exports.
 */

module.exports = Transport;

/**
 * Transport abstract constructor.
 *
 * @param {Object} options.
 * @api private
 */

function Transport (opts) {
  this.path = opts.path;
  this.hostname = opts.hostname;
  this.port = opts.port;
  this.secure = opts.secure;
  this.query = opts.query;
  this.timestampParam = opts.timestampParam;
  this.timestampRequests = opts.timestampRequests;
  this.readyState = '';
  this.agent = opts.agent || false;
  this.socket = opts.socket;
  this.enablesXDR = opts.enablesXDR;

  // SSL options for Node.js client
  this.pfx = opts.pfx;
  this.key = opts.key;
  this.passphrase = opts.passphrase;
  this.cert = opts.cert;
  this.ca = opts.ca;
  this.ciphers = opts.ciphers;
  this.rejectUnauthorized = opts.rejectUnauthorized;
  this.forceNode = opts.forceNode;

  // other options for Node.js client
  this.extraHeaders = opts.extraHeaders;
  this.localAddress = opts.localAddress;
}

/**
 * Mix in `Emitter`.
 */

Emitter(Transport.prototype);

/**
 * Emits an error.
 *
 * @param {String} str
 * @return {Transport} for chaining
 * @api public
 */

Transport.prototype.onError = function (msg, desc) {
  var err = new Error(msg);
  err.type = 'TransportError';
  err.description = desc;
  this.emit('error', err);
  return this;
};

/**
 * Opens the transport.
 *
 * @api public
 */

Transport.prototype.open = function () {
  if ('closed' === this.readyState || '' === this.readyState) {
    this.readyState = 'opening';
    this.doOpen();
  }

  return this;
};

/**
 * Closes the transport.
 *
 * @api private
 */

Transport.prototype.close = function () {
  if ('opening' === this.readyState || 'open' === this.readyState) {
    this.doClose();
    this.onClose();
  }

  return this;
};

/**
 * Sends multiple packets.
 *
 * @param {Array} packets
 * @api private
 */

Transport.prototype.send = function (packets) {
  if ('open' === this.readyState) {
    this.write(packets);
  } else {
    throw new Error('Transport not open');
  }
};

/**
 * Called upon open
 *
 * @api private
 */

Transport.prototype.onOpen = function () {
  this.readyState = 'open';
  this.writable = true;
  this.emit('open');
};

/**
 * Called with data.
 *
 * @param {String} data
 * @api private
 */

Transport.prototype.onData = function (data) {
  var packet = parser.decodePacket(data, this.socket.binaryType);
  this.onPacket(packet);
};

/**
 * Called with a decoded packet.
 */

Transport.prototype.onPacket = function (packet) {
  this.emit('packet', packet);
};

/**
 * Called upon close.
 *
 * @api private
 */

Transport.prototype.onClose = function () {
  this.readyState = 'closed';
  this.emit('close');
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * Module dependencies.
 */

var keys = __webpack_require__(26);
var hasBinary = __webpack_require__(27);
var sliceBuffer = __webpack_require__(33);
var after = __webpack_require__(34);
var utf8 = __webpack_require__(35);

var base64encoder;
if (global && global.ArrayBuffer) {
  base64encoder = __webpack_require__(37);
}

/**
 * Check if we are running an android browser. That requires us to use
 * ArrayBuffer with polling transports...
 *
 * http://ghinda.net/jpeg-blob-ajax-android/
 */

var isAndroid = typeof navigator !== 'undefined' && /Android/i.test(navigator.userAgent);

/**
 * Check if we are running in PhantomJS.
 * Uploading a Blob with PhantomJS does not work correctly, as reported here:
 * https://github.com/ariya/phantomjs/issues/11395
 * @type boolean
 */
var isPhantomJS = typeof navigator !== 'undefined' && /PhantomJS/i.test(navigator.userAgent);

/**
 * When true, avoids using Blobs to encode payloads.
 * @type boolean
 */
var dontSendBlobs = isAndroid || isPhantomJS;

/**
 * Current protocol version.
 */

exports.protocol = 3;

/**
 * Packet types.
 */

var packets = exports.packets = {
    open:     0    // non-ws
  , close:    1    // non-ws
  , ping:     2
  , pong:     3
  , message:  4
  , upgrade:  5
  , noop:     6
};

var packetslist = keys(packets);

/**
 * Premade error packet.
 */

var err = { type: 'error', data: 'parser error' };

/**
 * Create a blob api even for blob builder when vendor prefixes exist
 */

var Blob = __webpack_require__(38);

/**
 * Encodes a packet.
 *
 *     <packet type id> [ <data> ]
 *
 * Example:
 *
 *     5hello world
 *     3
 *     4
 *
 * Binary is encoded in an identical principle
 *
 * @api private
 */

exports.encodePacket = function (packet, supportsBinary, utf8encode, callback) {
  if (typeof supportsBinary === 'function') {
    callback = supportsBinary;
    supportsBinary = false;
  }

  if (typeof utf8encode === 'function') {
    callback = utf8encode;
    utf8encode = null;
  }

  var data = (packet.data === undefined)
    ? undefined
    : packet.data.buffer || packet.data;

  if (global.ArrayBuffer && data instanceof ArrayBuffer) {
    return encodeArrayBuffer(packet, supportsBinary, callback);
  } else if (Blob && data instanceof global.Blob) {
    return encodeBlob(packet, supportsBinary, callback);
  }

  // might be an object with { base64: true, data: dataAsBase64String }
  if (data && data.base64) {
    return encodeBase64Object(packet, callback);
  }

  // Sending data as a utf-8 string
  var encoded = packets[packet.type];

  // data fragment is optional
  if (undefined !== packet.data) {
    encoded += utf8encode ? utf8.encode(String(packet.data), { strict: false }) : String(packet.data);
  }

  return callback('' + encoded);

};

function encodeBase64Object(packet, callback) {
  // packet data is an object { base64: true, data: dataAsBase64String }
  var message = 'b' + exports.packets[packet.type] + packet.data.data;
  return callback(message);
}

/**
 * Encode packet helpers for binary types
 */

function encodeArrayBuffer(packet, supportsBinary, callback) {
  if (!supportsBinary) {
    return exports.encodeBase64Packet(packet, callback);
  }

  var data = packet.data;
  var contentArray = new Uint8Array(data);
  var resultBuffer = new Uint8Array(1 + data.byteLength);

  resultBuffer[0] = packets[packet.type];
  for (var i = 0; i < contentArray.length; i++) {
    resultBuffer[i+1] = contentArray[i];
  }

  return callback(resultBuffer.buffer);
}

function encodeBlobAsArrayBuffer(packet, supportsBinary, callback) {
  if (!supportsBinary) {
    return exports.encodeBase64Packet(packet, callback);
  }

  var fr = new FileReader();
  fr.onload = function() {
    packet.data = fr.result;
    exports.encodePacket(packet, supportsBinary, true, callback);
  };
  return fr.readAsArrayBuffer(packet.data);
}

function encodeBlob(packet, supportsBinary, callback) {
  if (!supportsBinary) {
    return exports.encodeBase64Packet(packet, callback);
  }

  if (dontSendBlobs) {
    return encodeBlobAsArrayBuffer(packet, supportsBinary, callback);
  }

  var length = new Uint8Array(1);
  length[0] = packets[packet.type];
  var blob = new Blob([length.buffer, packet.data]);

  return callback(blob);
}

/**
 * Encodes a packet with binary data in a base64 string
 *
 * @param {Object} packet, has `type` and `data`
 * @return {String} base64 encoded message
 */

exports.encodeBase64Packet = function(packet, callback) {
  var message = 'b' + exports.packets[packet.type];
  if (Blob && packet.data instanceof global.Blob) {
    var fr = new FileReader();
    fr.onload = function() {
      var b64 = fr.result.split(',')[1];
      callback(message + b64);
    };
    return fr.readAsDataURL(packet.data);
  }

  var b64data;
  try {
    b64data = String.fromCharCode.apply(null, new Uint8Array(packet.data));
  } catch (e) {
    // iPhone Safari doesn't let you apply with typed arrays
    var typed = new Uint8Array(packet.data);
    var basic = new Array(typed.length);
    for (var i = 0; i < typed.length; i++) {
      basic[i] = typed[i];
    }
    b64data = String.fromCharCode.apply(null, basic);
  }
  message += global.btoa(b64data);
  return callback(message);
};

/**
 * Decodes a packet. Changes format to Blob if requested.
 *
 * @return {Object} with `type` and `data` (if any)
 * @api private
 */

exports.decodePacket = function (data, binaryType, utf8decode) {
  if (data === undefined) {
    return err;
  }
  // String data
  if (typeof data === 'string') {
    if (data.charAt(0) === 'b') {
      return exports.decodeBase64Packet(data.substr(1), binaryType);
    }

    if (utf8decode) {
      data = tryDecode(data);
      if (data === false) {
        return err;
      }
    }
    var type = data.charAt(0);

    if (Number(type) != type || !packetslist[type]) {
      return err;
    }

    if (data.length > 1) {
      return { type: packetslist[type], data: data.substring(1) };
    } else {
      return { type: packetslist[type] };
    }
  }

  var asArray = new Uint8Array(data);
  var type = asArray[0];
  var rest = sliceBuffer(data, 1);
  if (Blob && binaryType === 'blob') {
    rest = new Blob([rest]);
  }
  return { type: packetslist[type], data: rest };
};

function tryDecode(data) {
  try {
    data = utf8.decode(data, { strict: false });
  } catch (e) {
    return false;
  }
  return data;
}

/**
 * Decodes a packet encoded in a base64 string
 *
 * @param {String} base64 encoded message
 * @return {Object} with `type` and `data` (if any)
 */

exports.decodeBase64Packet = function(msg, binaryType) {
  var type = packetslist[msg.charAt(0)];
  if (!base64encoder) {
    return { type: type, data: { base64: true, data: msg.substr(1) } };
  }

  var data = base64encoder.decode(msg.substr(1));

  if (binaryType === 'blob' && Blob) {
    data = new Blob([data]);
  }

  return { type: type, data: data };
};

/**
 * Encodes multiple messages (payload).
 *
 *     <length>:data
 *
 * Example:
 *
 *     11:hello world2:hi
 *
 * If any contents are binary, they will be encoded as base64 strings. Base64
 * encoded strings are marked with a b before the length specifier
 *
 * @param {Array} packets
 * @api private
 */

exports.encodePayload = function (packets, supportsBinary, callback) {
  if (typeof supportsBinary === 'function') {
    callback = supportsBinary;
    supportsBinary = null;
  }

  var isBinary = hasBinary(packets);

  if (supportsBinary && isBinary) {
    if (Blob && !dontSendBlobs) {
      return exports.encodePayloadAsBlob(packets, callback);
    }

    return exports.encodePayloadAsArrayBuffer(packets, callback);
  }

  if (!packets.length) {
    return callback('0:');
  }

  function setLengthHeader(message) {
    return message.length + ':' + message;
  }

  function encodeOne(packet, doneCallback) {
    exports.encodePacket(packet, !isBinary ? false : supportsBinary, false, function(message) {
      doneCallback(null, setLengthHeader(message));
    });
  }

  map(packets, encodeOne, function(err, results) {
    return callback(results.join(''));
  });
};

/**
 * Async array map using after
 */

function map(ary, each, done) {
  var result = new Array(ary.length);
  var next = after(ary.length, done);

  var eachWithIndex = function(i, el, cb) {
    each(el, function(error, msg) {
      result[i] = msg;
      cb(error, result);
    });
  };

  for (var i = 0; i < ary.length; i++) {
    eachWithIndex(i, ary[i], next);
  }
}

/*
 * Decodes data when a payload is maybe expected. Possible binary contents are
 * decoded from their base64 representation
 *
 * @param {String} data, callback method
 * @api public
 */

exports.decodePayload = function (data, binaryType, callback) {
  if (typeof data !== 'string') {
    return exports.decodePayloadAsBinary(data, binaryType, callback);
  }

  if (typeof binaryType === 'function') {
    callback = binaryType;
    binaryType = null;
  }

  var packet;
  if (data === '') {
    // parser error - ignoring payload
    return callback(err, 0, 1);
  }

  var length = '', n, msg;

  for (var i = 0, l = data.length; i < l; i++) {
    var chr = data.charAt(i);

    if (chr !== ':') {
      length += chr;
      continue;
    }

    if (length === '' || (length != (n = Number(length)))) {
      // parser error - ignoring payload
      return callback(err, 0, 1);
    }

    msg = data.substr(i + 1, n);

    if (length != msg.length) {
      // parser error - ignoring payload
      return callback(err, 0, 1);
    }

    if (msg.length) {
      packet = exports.decodePacket(msg, binaryType, false);

      if (err.type === packet.type && err.data === packet.data) {
        // parser error in individual packet - ignoring payload
        return callback(err, 0, 1);
      }

      var ret = callback(packet, i + n, l);
      if (false === ret) return;
    }

    // advance cursor
    i += n;
    length = '';
  }

  if (length !== '') {
    // parser error - ignoring payload
    return callback(err, 0, 1);
  }

};

/**
 * Encodes multiple messages (payload) as binary.
 *
 * <1 = binary, 0 = string><number from 0-9><number from 0-9>[...]<number
 * 255><data>
 *
 * Example:
 * 1 3 255 1 2 3, if the binary contents are interpreted as 8 bit integers
 *
 * @param {Array} packets
 * @return {ArrayBuffer} encoded payload
 * @api private
 */

exports.encodePayloadAsArrayBuffer = function(packets, callback) {
  if (!packets.length) {
    return callback(new ArrayBuffer(0));
  }

  function encodeOne(packet, doneCallback) {
    exports.encodePacket(packet, true, true, function(data) {
      return doneCallback(null, data);
    });
  }

  map(packets, encodeOne, function(err, encodedPackets) {
    var totalLength = encodedPackets.reduce(function(acc, p) {
      var len;
      if (typeof p === 'string'){
        len = p.length;
      } else {
        len = p.byteLength;
      }
      return acc + len.toString().length + len + 2; // string/binary identifier + separator = 2
    }, 0);

    var resultArray = new Uint8Array(totalLength);

    var bufferIndex = 0;
    encodedPackets.forEach(function(p) {
      var isString = typeof p === 'string';
      var ab = p;
      if (isString) {
        var view = new Uint8Array(p.length);
        for (var i = 0; i < p.length; i++) {
          view[i] = p.charCodeAt(i);
        }
        ab = view.buffer;
      }

      if (isString) { // not true binary
        resultArray[bufferIndex++] = 0;
      } else { // true binary
        resultArray[bufferIndex++] = 1;
      }

      var lenStr = ab.byteLength.toString();
      for (var i = 0; i < lenStr.length; i++) {
        resultArray[bufferIndex++] = parseInt(lenStr[i]);
      }
      resultArray[bufferIndex++] = 255;

      var view = new Uint8Array(ab);
      for (var i = 0; i < view.length; i++) {
        resultArray[bufferIndex++] = view[i];
      }
    });

    return callback(resultArray.buffer);
  });
};

/**
 * Encode as Blob
 */

exports.encodePayloadAsBlob = function(packets, callback) {
  function encodeOne(packet, doneCallback) {
    exports.encodePacket(packet, true, true, function(encoded) {
      var binaryIdentifier = new Uint8Array(1);
      binaryIdentifier[0] = 1;
      if (typeof encoded === 'string') {
        var view = new Uint8Array(encoded.length);
        for (var i = 0; i < encoded.length; i++) {
          view[i] = encoded.charCodeAt(i);
        }
        encoded = view.buffer;
        binaryIdentifier[0] = 0;
      }

      var len = (encoded instanceof ArrayBuffer)
        ? encoded.byteLength
        : encoded.size;

      var lenStr = len.toString();
      var lengthAry = new Uint8Array(lenStr.length + 1);
      for (var i = 0; i < lenStr.length; i++) {
        lengthAry[i] = parseInt(lenStr[i]);
      }
      lengthAry[lenStr.length] = 255;

      if (Blob) {
        var blob = new Blob([binaryIdentifier.buffer, lengthAry.buffer, encoded]);
        doneCallback(null, blob);
      }
    });
  }

  map(packets, encodeOne, function(err, results) {
    return callback(new Blob(results));
  });
};

/*
 * Decodes data when a payload is maybe expected. Strings are decoded by
 * interpreting each byte as a key code for entries marked to start with 0. See
 * description of encodePayloadAsBinary
 *
 * @param {ArrayBuffer} data, callback method
 * @api public
 */

exports.decodePayloadAsBinary = function (data, binaryType, callback) {
  if (typeof binaryType === 'function') {
    callback = binaryType;
    binaryType = null;
  }

  var bufferTail = data;
  var buffers = [];

  while (bufferTail.byteLength > 0) {
    var tailArray = new Uint8Array(bufferTail);
    var isString = tailArray[0] === 0;
    var msgLength = '';

    for (var i = 1; ; i++) {
      if (tailArray[i] === 255) break;

      // 310 = char length of Number.MAX_VALUE
      if (msgLength.length > 310) {
        return callback(err, 0, 1);
      }

      msgLength += tailArray[i];
    }

    bufferTail = sliceBuffer(bufferTail, 2 + msgLength.length);
    msgLength = parseInt(msgLength);

    var msg = sliceBuffer(bufferTail, 0, msgLength);
    if (isString) {
      try {
        msg = String.fromCharCode.apply(null, new Uint8Array(msg));
      } catch (e) {
        // iPhone Safari doesn't let you apply to typed arrays
        var typed = new Uint8Array(msg);
        msg = '';
        for (var i = 0; i < typed.length; i++) {
          msg += String.fromCharCode(typed[i]);
        }
      }
    }

    buffers.push(msg);
    bufferTail = sliceBuffer(bufferTail, msgLength);
  }

  var total = buffers.length;
  buffers.forEach(function(buffer, i) {
    callback(exports.decodePacket(buffer, binaryType, true), i, total);
  });
};

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)))

/***/ }),
/* 26 */
/***/ (function(module, exports) {


/**
 * Gets the keys for an object.
 *
 * @return {Array} keys
 * @api private
 */

module.exports = Object.keys || function keys (obj){
  var arr = [];
  var has = Object.prototype.hasOwnProperty;

  for (var i in obj) {
    if (has.call(obj, i)) {
      arr.push(i);
    }
  }
  return arr;
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {/* global Blob File */

/*
 * Module requirements.
 */

var isArray = __webpack_require__(32);

var toString = Object.prototype.toString;
var withNativeBlob = typeof Blob === 'function' ||
                        typeof Blob !== 'undefined' && toString.call(Blob) === '[object BlobConstructor]';
var withNativeFile = typeof File === 'function' ||
                        typeof File !== 'undefined' && toString.call(File) === '[object FileConstructor]';

/**
 * Module exports.
 */

module.exports = hasBinary;

/**
 * Checks for binary data.
 *
 * Supports Buffer, ArrayBuffer, Blob and File.
 *
 * @param {Object} anything
 * @api public
 */

function hasBinary (obj) {
  if (!obj || typeof obj !== 'object') {
    return false;
  }

  if (isArray(obj)) {
    for (var i = 0, l = obj.length; i < l; i++) {
      if (hasBinary(obj[i])) {
        return true;
      }
    }
    return false;
  }

  if ((typeof Buffer === 'function' && Buffer.isBuffer && Buffer.isBuffer(obj)) ||
    (typeof ArrayBuffer === 'function' && obj instanceof ArrayBuffer) ||
    (withNativeBlob && obj instanceof Blob) ||
    (withNativeFile && obj instanceof File)
  ) {
    return true;
  }

  // see: https://github.com/Automattic/has-binary/pull/4
  if (obj.toJSON && typeof obj.toJSON === 'function' && arguments.length === 1) {
    return hasBinary(obj.toJSON(), true);
  }

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && hasBinary(obj[key])) {
      return true;
    }
  }

  return false;
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(28).Buffer))

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(29)
var ieee754 = __webpack_require__(30)
var isArray = __webpack_require__(31)

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)))

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  for (var i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(
      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
    ))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),
/* 30 */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),
/* 31 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 32 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 33 */
/***/ (function(module, exports) {

/**
 * An abstraction for slicing an arraybuffer even when
 * ArrayBuffer.prototype.slice is not supported
 *
 * @api public
 */

module.exports = function(arraybuffer, start, end) {
  var bytes = arraybuffer.byteLength;
  start = start || 0;
  end = end || bytes;

  if (arraybuffer.slice) { return arraybuffer.slice(start, end); }

  if (start < 0) { start += bytes; }
  if (end < 0) { end += bytes; }
  if (end > bytes) { end = bytes; }

  if (start >= bytes || start >= end || bytes === 0) {
    return new ArrayBuffer(0);
  }

  var abv = new Uint8Array(arraybuffer);
  var result = new Uint8Array(end - start);
  for (var i = start, ii = 0; i < end; i++, ii++) {
    result[ii] = abv[i];
  }
  return result.buffer;
};


/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = after

function after(count, callback, err_cb) {
    var bail = false
    err_cb = err_cb || noop
    proxy.count = count

    return (count === 0) ? callback() : proxy

    function proxy(err, result) {
        if (proxy.count <= 0) {
            throw new Error('after called too many times')
        }
        --proxy.count

        // after first error, rest are passed to err_cb
        if (err) {
            bail = true
            callback(err)
            // future error callbacks will go to error handler
            callback = err_cb
        } else if (proxy.count === 0 && !bail) {
            callback(null, result)
        }
    }
}

function noop() {}


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module, global) {var __WEBPACK_AMD_DEFINE_RESULT__;/*! https://mths.be/utf8js v2.1.2 by @mathias */
;(function(root) {

	// Detect free variables `exports`
	var freeExports = true && exports;

	// Detect free variable `module`
	var freeModule = true && module &&
		module.exports == freeExports && module;

	// Detect free variable `global`, from Node.js or Browserified code,
	// and use it as `root`
	var freeGlobal = typeof global == 'object' && global;
	if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
		root = freeGlobal;
	}

	/*--------------------------------------------------------------------------*/

	var stringFromCharCode = String.fromCharCode;

	// Taken from https://mths.be/punycode
	function ucs2decode(string) {
		var output = [];
		var counter = 0;
		var length = string.length;
		var value;
		var extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	// Taken from https://mths.be/punycode
	function ucs2encode(array) {
		var length = array.length;
		var index = -1;
		var value;
		var output = '';
		while (++index < length) {
			value = array[index];
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
		}
		return output;
	}

	function checkScalarValue(codePoint, strict) {
		if (codePoint >= 0xD800 && codePoint <= 0xDFFF) {
			if (strict) {
				throw Error(
					'Lone surrogate U+' + codePoint.toString(16).toUpperCase() +
					' is not a scalar value'
				);
			}
			return false;
		}
		return true;
	}
	/*--------------------------------------------------------------------------*/

	function createByte(codePoint, shift) {
		return stringFromCharCode(((codePoint >> shift) & 0x3F) | 0x80);
	}

	function encodeCodePoint(codePoint, strict) {
		if ((codePoint & 0xFFFFFF80) == 0) { // 1-byte sequence
			return stringFromCharCode(codePoint);
		}
		var symbol = '';
		if ((codePoint & 0xFFFFF800) == 0) { // 2-byte sequence
			symbol = stringFromCharCode(((codePoint >> 6) & 0x1F) | 0xC0);
		}
		else if ((codePoint & 0xFFFF0000) == 0) { // 3-byte sequence
			if (!checkScalarValue(codePoint, strict)) {
				codePoint = 0xFFFD;
			}
			symbol = stringFromCharCode(((codePoint >> 12) & 0x0F) | 0xE0);
			symbol += createByte(codePoint, 6);
		}
		else if ((codePoint & 0xFFE00000) == 0) { // 4-byte sequence
			symbol = stringFromCharCode(((codePoint >> 18) & 0x07) | 0xF0);
			symbol += createByte(codePoint, 12);
			symbol += createByte(codePoint, 6);
		}
		symbol += stringFromCharCode((codePoint & 0x3F) | 0x80);
		return symbol;
	}

	function utf8encode(string, opts) {
		opts = opts || {};
		var strict = false !== opts.strict;

		var codePoints = ucs2decode(string);
		var length = codePoints.length;
		var index = -1;
		var codePoint;
		var byteString = '';
		while (++index < length) {
			codePoint = codePoints[index];
			byteString += encodeCodePoint(codePoint, strict);
		}
		return byteString;
	}

	/*--------------------------------------------------------------------------*/

	function readContinuationByte() {
		if (byteIndex >= byteCount) {
			throw Error('Invalid byte index');
		}

		var continuationByte = byteArray[byteIndex] & 0xFF;
		byteIndex++;

		if ((continuationByte & 0xC0) == 0x80) {
			return continuationByte & 0x3F;
		}

		// If we end up here, it’s not a continuation byte
		throw Error('Invalid continuation byte');
	}

	function decodeSymbol(strict) {
		var byte1;
		var byte2;
		var byte3;
		var byte4;
		var codePoint;

		if (byteIndex > byteCount) {
			throw Error('Invalid byte index');
		}

		if (byteIndex == byteCount) {
			return false;
		}

		// Read first byte
		byte1 = byteArray[byteIndex] & 0xFF;
		byteIndex++;

		// 1-byte sequence (no continuation bytes)
		if ((byte1 & 0x80) == 0) {
			return byte1;
		}

		// 2-byte sequence
		if ((byte1 & 0xE0) == 0xC0) {
			byte2 = readContinuationByte();
			codePoint = ((byte1 & 0x1F) << 6) | byte2;
			if (codePoint >= 0x80) {
				return codePoint;
			} else {
				throw Error('Invalid continuation byte');
			}
		}

		// 3-byte sequence (may include unpaired surrogates)
		if ((byte1 & 0xF0) == 0xE0) {
			byte2 = readContinuationByte();
			byte3 = readContinuationByte();
			codePoint = ((byte1 & 0x0F) << 12) | (byte2 << 6) | byte3;
			if (codePoint >= 0x0800) {
				return checkScalarValue(codePoint, strict) ? codePoint : 0xFFFD;
			} else {
				throw Error('Invalid continuation byte');
			}
		}

		// 4-byte sequence
		if ((byte1 & 0xF8) == 0xF0) {
			byte2 = readContinuationByte();
			byte3 = readContinuationByte();
			byte4 = readContinuationByte();
			codePoint = ((byte1 & 0x07) << 0x12) | (byte2 << 0x0C) |
				(byte3 << 0x06) | byte4;
			if (codePoint >= 0x010000 && codePoint <= 0x10FFFF) {
				return codePoint;
			}
		}

		throw Error('Invalid UTF-8 detected');
	}

	var byteArray;
	var byteCount;
	var byteIndex;
	function utf8decode(byteString, opts) {
		opts = opts || {};
		var strict = false !== opts.strict;

		byteArray = ucs2decode(byteString);
		byteCount = byteArray.length;
		byteIndex = 0;
		var codePoints = [];
		var tmp;
		while ((tmp = decodeSymbol(strict)) !== false) {
			codePoints.push(tmp);
		}
		return ucs2encode(codePoints);
	}

	/*--------------------------------------------------------------------------*/

	var utf8 = {
		'version': '2.1.2',
		'encode': utf8encode,
		'decode': utf8decode
	};

	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		true
	) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
			return utf8;
		}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}	else { var key, hasOwnProperty, object; }

}(this));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(36)(module), __webpack_require__(3)))

/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 37 */
/***/ (function(module, exports) {

/*
 * base64-arraybuffer
 * https://github.com/niklasvh/base64-arraybuffer
 *
 * Copyright (c) 2012 Niklas von Hertzen
 * Licensed under the MIT license.
 */
(function(){
  "use strict";

  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

  // Use a lookup table to find the index.
  var lookup = new Uint8Array(256);
  for (var i = 0; i < chars.length; i++) {
    lookup[chars.charCodeAt(i)] = i;
  }

  exports.encode = function(arraybuffer) {
    var bytes = new Uint8Array(arraybuffer),
    i, len = bytes.length, base64 = "";

    for (i = 0; i < len; i+=3) {
      base64 += chars[bytes[i] >> 2];
      base64 += chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
      base64 += chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
      base64 += chars[bytes[i + 2] & 63];
    }

    if ((len % 3) === 2) {
      base64 = base64.substring(0, base64.length - 1) + "=";
    } else if (len % 3 === 1) {
      base64 = base64.substring(0, base64.length - 2) + "==";
    }

    return base64;
  };

  exports.decode =  function(base64) {
    var bufferLength = base64.length * 0.75,
    len = base64.length, i, p = 0,
    encoded1, encoded2, encoded3, encoded4;

    if (base64[base64.length - 1] === "=") {
      bufferLength--;
      if (base64[base64.length - 2] === "=") {
        bufferLength--;
      }
    }

    var arraybuffer = new ArrayBuffer(bufferLength),
    bytes = new Uint8Array(arraybuffer);

    for (i = 0; i < len; i+=4) {
      encoded1 = lookup[base64.charCodeAt(i)];
      encoded2 = lookup[base64.charCodeAt(i+1)];
      encoded3 = lookup[base64.charCodeAt(i+2)];
      encoded4 = lookup[base64.charCodeAt(i+3)];

      bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
      bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
      bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
    }

    return arraybuffer;
  };
})();


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * Create a blob builder even when vendor prefixes exist
 */

var BlobBuilder = global.BlobBuilder
  || global.WebKitBlobBuilder
  || global.MSBlobBuilder
  || global.MozBlobBuilder;

/**
 * Check if Blob constructor is supported
 */

var blobSupported = (function() {
  try {
    var a = new Blob(['hi']);
    return a.size === 2;
  } catch(e) {
    return false;
  }
})();

/**
 * Check if Blob constructor supports ArrayBufferViews
 * Fails in Safari 6, so we need to map to ArrayBuffers there.
 */

var blobSupportsArrayBufferView = blobSupported && (function() {
  try {
    var b = new Blob([new Uint8Array([1,2])]);
    return b.size === 2;
  } catch(e) {
    return false;
  }
})();

/**
 * Check if BlobBuilder is supported
 */

var blobBuilderSupported = BlobBuilder
  && BlobBuilder.prototype.append
  && BlobBuilder.prototype.getBlob;

/**
 * Helper function that maps ArrayBufferViews to ArrayBuffers
 * Used by BlobBuilder constructor and old browsers that didn't
 * support it in the Blob constructor.
 */

function mapArrayBufferViews(ary) {
  for (var i = 0; i < ary.length; i++) {
    var chunk = ary[i];
    if (chunk.buffer instanceof ArrayBuffer) {
      var buf = chunk.buffer;

      // if this is a subarray, make a copy so we only
      // include the subarray region from the underlying buffer
      if (chunk.byteLength !== buf.byteLength) {
        var copy = new Uint8Array(chunk.byteLength);
        copy.set(new Uint8Array(buf, chunk.byteOffset, chunk.byteLength));
        buf = copy.buffer;
      }

      ary[i] = buf;
    }
  }
}

function BlobBuilderConstructor(ary, options) {
  options = options || {};

  var bb = new BlobBuilder();
  mapArrayBufferViews(ary);

  for (var i = 0; i < ary.length; i++) {
    bb.append(ary[i]);
  }

  return (options.type) ? bb.getBlob(options.type) : bb.getBlob();
};

function BlobConstructor(ary, options) {
  mapArrayBufferViews(ary);
  return new Blob(ary, options || {});
};

module.exports = (function() {
  if (blobSupported) {
    return blobSupportsArrayBufferView ? global.Blob : BlobConstructor;
  } else if (blobBuilderSupported) {
    return BlobBuilderConstructor;
  } else {
    return undefined;
  }
})();

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)))

/***/ }),
/* 39 */
/***/ (function(module, exports) {

/**
 * Compiles a querystring
 * Returns string representation of the object
 *
 * @param {Object}
 * @api private
 */

exports.encode = function (obj) {
  var str = '';

  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      if (str.length) str += '&';
      str += encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]);
    }
  }

  return str;
};

/**
 * Parses a simple querystring into an object
 *
 * @param {String} qs
 * @api private
 */

exports.decode = function(qs){
  var qry = {};
  var pairs = qs.split('&');
  for (var i = 0, l = pairs.length; i < l; i++) {
    var pair = pairs[i].split('=');
    qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
  }
  return qry;
};


/***/ }),
/* 40 */
/***/ (function(module, exports) {


module.exports = function(a, b){
  var fn = function(){};
  fn.prototype = b.prototype;
  a.prototype = new fn;
  a.prototype.constructor = a;
};

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_'.split('')
  , length = 64
  , map = {}
  , seed = 0
  , i = 0
  , prev;

/**
 * Return a string representing the specified number.
 *
 * @param {Number} num The number to convert.
 * @returns {String} The string representation of the number.
 * @api public
 */
function encode(num) {
  var encoded = '';

  do {
    encoded = alphabet[num % length] + encoded;
    num = Math.floor(num / length);
  } while (num > 0);

  return encoded;
}

/**
 * Return the integer value specified by the given string.
 *
 * @param {String} str The string to convert.
 * @returns {Number} The integer value represented by the string.
 * @api public
 */
function decode(str) {
  var decoded = 0;

  for (i = 0; i < str.length; i++) {
    decoded = decoded * length + map[str.charAt(i)];
  }

  return decoded;
}

/**
 * Yeast: A tiny growing id generator.
 *
 * @returns {String} A unique id.
 * @api public
 */
function yeast() {
  var now = encode(+new Date());

  if (now !== prev) return seed = 0, prev = now;
  return now +'.'+ encode(seed++);
}

//
// Map each character to its index.
//
for (; i < length; i++) map[alphabet[i]] = i;

//
// Expose the `yeast`, `encode` and `decode` functions.
//
yeast.encode = encode;
yeast.decode = decode;
module.exports = yeast;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = __webpack_require__(43);
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = 'undefined' != typeof chrome
               && 'undefined' != typeof chrome.storage
                  ? chrome.storage.local
                  : localstorage();

/**
 * Colors.
 */

exports.colors = [
  '#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC',
  '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF',
  '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC',
  '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF',
  '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC',
  '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033',
  '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366',
  '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933',
  '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC',
  '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF',
  '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
    return true;
  }

  // Internet Explorer and Edge do not support colors.
  if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
    return false;
  }

  // is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
  return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
    // is firebug? http://stackoverflow.com/a/398120/376773
    (typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
    // is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
    // double check webkit in userAgent just in case we are in a worker
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function(v) {
  try {
    return JSON.stringify(v);
  } catch (err) {
    return '[UnexpectedJSONParseError]: ' + err.message;
  }
};


/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '')
    + this.namespace
    + (useColors ? ' %c' : ' ')
    + args[0]
    + (useColors ? '%c ' : ' ')
    + '+' + exports.humanize(this.diff);

  if (!useColors) return;

  var c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit')

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, function(match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });

  args.splice(lastC, 0, c);
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  // this hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return 'object' === typeof console
    && console.log
    && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      exports.storage.removeItem('debug');
    } else {
      exports.storage.debug = namespaces;
    }
  } catch(e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    r = exports.storage.debug;
  } catch(e) {}

  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = process.env.DEBUG;
  }

  return r;
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
  try {
    return window.localStorage;
  } catch (e) {}
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(6)))

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = __webpack_require__(8);

/**
 * Active `debug` instances.
 */
exports.instances = [];

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
 */

exports.formatters = {};

/**
 * Select a color.
 * @param {String} namespace
 * @return {Number}
 * @api private
 */

function selectColor(namespace) {
  var hash = 0, i;

  for (i in namespace) {
    hash  = ((hash << 5) - hash) + namespace.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }

  return exports.colors[Math.abs(hash) % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function createDebug(namespace) {

  var prevTime;

  function debug() {
    // disabled?
    if (!debug.enabled) return;

    var self = debug;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // turn the `arguments` into a proper Array
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %O
      args.unshift('%O');
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    // apply env-specific formatting (colors, etc.)
    exports.formatArgs.call(self, args);

    var logFn = debug.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }

  debug.namespace = namespace;
  debug.enabled = exports.enabled(namespace);
  debug.useColors = exports.useColors();
  debug.color = selectColor(namespace);
  debug.destroy = destroy;

  // env-specific initialization logic for debug instances
  if ('function' === typeof exports.init) {
    exports.init(debug);
  }

  exports.instances.push(debug);

  return debug;
}

function destroy () {
  var index = exports.instances.indexOf(this);
  if (index !== -1) {
    exports.instances.splice(index, 1);
    return true;
  } else {
    return false;
  }
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  exports.names = [];
  exports.skips = [];

  var i;
  var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
  var len = split.length;

  for (i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }

  for (i = 0; i < exports.instances.length; i++) {
    var instance = exports.instances[i];
    instance.enabled = exports.enabled(instance.namespace);
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  if (name[name.length - 1] === '*') {
    return true;
  }
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }
  return false;
}

/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {
/**
 * Module requirements.
 */

var Polling = __webpack_require__(23);
var inherit = __webpack_require__(40);

/**
 * Module exports.
 */

module.exports = JSONPPolling;

/**
 * Cached regular expressions.
 */

var rNewline = /\n/g;
var rEscapedNewline = /\\n/g;

/**
 * Global JSONP callbacks.
 */

var callbacks;

/**
 * Noop.
 */

function empty () { }

/**
 * JSONP Polling constructor.
 *
 * @param {Object} opts.
 * @api public
 */

function JSONPPolling (opts) {
  Polling.call(this, opts);

  this.query = this.query || {};

  // define global callbacks array if not present
  // we do this here (lazily) to avoid unneeded global pollution
  if (!callbacks) {
    // we need to consider multiple engines in the same page
    if (!global.___eio) global.___eio = [];
    callbacks = global.___eio;
  }

  // callback identifier
  this.index = callbacks.length;

  // add callback to jsonp global
  var self = this;
  callbacks.push(function (msg) {
    self.onData(msg);
  });

  // append to query string
  this.query.j = this.index;

  // prevent spurious errors from being emitted when the window is unloaded
  if (global.document && global.addEventListener) {
    global.addEventListener('beforeunload', function () {
      if (self.script) self.script.onerror = empty;
    }, false);
  }
}

/**
 * Inherits from Polling.
 */

inherit(JSONPPolling, Polling);

/*
 * JSONP only supports binary as base64 encoded strings
 */

JSONPPolling.prototype.supportsBinary = false;

/**
 * Closes the socket.
 *
 * @api private
 */

JSONPPolling.prototype.doClose = function () {
  if (this.script) {
    this.script.parentNode.removeChild(this.script);
    this.script = null;
  }

  if (this.form) {
    this.form.parentNode.removeChild(this.form);
    this.form = null;
    this.iframe = null;
  }

  Polling.prototype.doClose.call(this);
};

/**
 * Starts a poll cycle.
 *
 * @api private
 */

JSONPPolling.prototype.doPoll = function () {
  var self = this;
  var script = document.createElement('script');

  if (this.script) {
    this.script.parentNode.removeChild(this.script);
    this.script = null;
  }

  script.async = true;
  script.src = this.uri();
  script.onerror = function (e) {
    self.onError('jsonp poll error', e);
  };

  var insertAt = document.getElementsByTagName('script')[0];
  if (insertAt) {
    insertAt.parentNode.insertBefore(script, insertAt);
  } else {
    (document.head || document.body).appendChild(script);
  }
  this.script = script;

  var isUAgecko = 'undefined' !== typeof navigator && /gecko/i.test(navigator.userAgent);

  if (isUAgecko) {
    setTimeout(function () {
      var iframe = document.createElement('iframe');
      document.body.appendChild(iframe);
      document.body.removeChild(iframe);
    }, 100);
  }
};

/**
 * Writes with a hidden iframe.
 *
 * @param {String} data to send
 * @param {Function} called upon flush.
 * @api private
 */

JSONPPolling.prototype.doWrite = function (data, fn) {
  var self = this;

  if (!this.form) {
    var form = document.createElement('form');
    var area = document.createElement('textarea');
    var id = this.iframeId = 'eio_iframe_' + this.index;
    var iframe;

    form.className = 'socketio';
    form.style.position = 'absolute';
    form.style.top = '-1000px';
    form.style.left = '-1000px';
    form.target = id;
    form.method = 'POST';
    form.setAttribute('accept-charset', 'utf-8');
    area.name = 'd';
    form.appendChild(area);
    document.body.appendChild(form);

    this.form = form;
    this.area = area;
  }

  this.form.action = this.uri();

  function complete () {
    initIframe();
    fn();
  }

  function initIframe () {
    if (self.iframe) {
      try {
        self.form.removeChild(self.iframe);
      } catch (e) {
        self.onError('jsonp polling iframe removal error', e);
      }
    }

    try {
      // ie6 dynamic iframes with target="" support (thanks Chris Lambacher)
      var html = '<iframe src="javascript:0" name="' + self.iframeId + '">';
      iframe = document.createElement(html);
    } catch (e) {
      iframe = document.createElement('iframe');
      iframe.name = self.iframeId;
      iframe.src = 'javascript:0';
    }

    iframe.id = self.iframeId;

    self.form.appendChild(iframe);
    self.iframe = iframe;
  }

  initIframe();

  // escape \n to prevent it from being converted into \r\n by some UAs
  // double escaping is required for escaped new lines because unescaping of new lines can be done safely on server-side
  data = data.replace(rEscapedNewline, '\\\n');
  this.area.value = data.replace(rNewline, '\\n');

  try {
    this.form.submit();
  } catch (e) {}

  if (this.iframe.attachEvent) {
    this.iframe.onreadystatechange = function () {
      if (self.iframe.readyState === 'complete') {
        complete();
      }
    };
  } else {
    this.iframe.onload = complete;
  }
};

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)))

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * Module dependencies.
 */

var Transport = __webpack_require__(24);
var parser = __webpack_require__(25);
var parseqs = __webpack_require__(39);
var inherit = __webpack_require__(40);
var yeast = __webpack_require__(41);
var debug = __webpack_require__(42)('engine.io-client:websocket');
var BrowserWebSocket = global.WebSocket || global.MozWebSocket;
var NodeWebSocket;
if (typeof window === 'undefined') {
  try {
    NodeWebSocket = __webpack_require__(46);
  } catch (e) { }
}

/**
 * Get either the `WebSocket` or `MozWebSocket` globals
 * in the browser or try to resolve WebSocket-compatible
 * interface exposed by `ws` for Node-like environment.
 */

var WebSocket = BrowserWebSocket;
if (!WebSocket && typeof window === 'undefined') {
  WebSocket = NodeWebSocket;
}

/**
 * Module exports.
 */

module.exports = WS;

/**
 * WebSocket transport constructor.
 *
 * @api {Object} connection options
 * @api public
 */

function WS (opts) {
  var forceBase64 = (opts && opts.forceBase64);
  if (forceBase64) {
    this.supportsBinary = false;
  }
  this.perMessageDeflate = opts.perMessageDeflate;
  this.usingBrowserWebSocket = BrowserWebSocket && !opts.forceNode;
  this.protocols = opts.protocols;
  if (!this.usingBrowserWebSocket) {
    WebSocket = NodeWebSocket;
  }
  Transport.call(this, opts);
}

/**
 * Inherits from Transport.
 */

inherit(WS, Transport);

/**
 * Transport name.
 *
 * @api public
 */

WS.prototype.name = 'websocket';

/*
 * WebSockets support binary
 */

WS.prototype.supportsBinary = true;

/**
 * Opens socket.
 *
 * @api private
 */

WS.prototype.doOpen = function () {
  if (!this.check()) {
    // let probe timeout
    return;
  }

  var uri = this.uri();
  var protocols = this.protocols;
  var opts = {
    agent: this.agent,
    perMessageDeflate: this.perMessageDeflate
  };

  // SSL options for Node.js client
  opts.pfx = this.pfx;
  opts.key = this.key;
  opts.passphrase = this.passphrase;
  opts.cert = this.cert;
  opts.ca = this.ca;
  opts.ciphers = this.ciphers;
  opts.rejectUnauthorized = this.rejectUnauthorized;
  if (this.extraHeaders) {
    opts.headers = this.extraHeaders;
  }
  if (this.localAddress) {
    opts.localAddress = this.localAddress;
  }

  try {
    this.ws = this.usingBrowserWebSocket ? (protocols ? new WebSocket(uri, protocols) : new WebSocket(uri)) : new WebSocket(uri, protocols, opts);
  } catch (err) {
    return this.emit('error', err);
  }

  if (this.ws.binaryType === undefined) {
    this.supportsBinary = false;
  }

  if (this.ws.supports && this.ws.supports.binary) {
    this.supportsBinary = true;
    this.ws.binaryType = 'nodebuffer';
  } else {
    this.ws.binaryType = 'arraybuffer';
  }

  this.addEventListeners();
};

/**
 * Adds event listeners to the socket
 *
 * @api private
 */

WS.prototype.addEventListeners = function () {
  var self = this;

  this.ws.onopen = function () {
    self.onOpen();
  };
  this.ws.onclose = function () {
    self.onClose();
  };
  this.ws.onmessage = function (ev) {
    self.onData(ev.data);
  };
  this.ws.onerror = function (e) {
    self.onError('websocket error', e);
  };
};

/**
 * Writes data to socket.
 *
 * @param {Array} array of packets.
 * @api private
 */

WS.prototype.write = function (packets) {
  var self = this;
  this.writable = false;

  // encodePacket efficient as it uses WS framing
  // no need for encodePayload
  var total = packets.length;
  for (var i = 0, l = total; i < l; i++) {
    (function (packet) {
      parser.encodePacket(packet, self.supportsBinary, function (data) {
        if (!self.usingBrowserWebSocket) {
          // always create a new object (GH-437)
          var opts = {};
          if (packet.options) {
            opts.compress = packet.options.compress;
          }

          if (self.perMessageDeflate) {
            var len = 'string' === typeof data ? global.Buffer.byteLength(data) : data.length;
            if (len < self.perMessageDeflate.threshold) {
              opts.compress = false;
            }
          }
        }

        // Sometimes the websocket has already been closed but the browser didn't
        // have a chance of informing us about it yet, in that case send will
        // throw an error
        try {
          if (self.usingBrowserWebSocket) {
            // TypeError is thrown when passing the second argument on Safari
            self.ws.send(data);
          } else {
            self.ws.send(data, opts);
          }
        } catch (e) {
          debug('websocket closed before onclose event');
        }

        --total || done();
      });
    })(packets[i]);
  }

  function done () {
    self.emit('flush');

    // fake drain
    // defer to next tick to allow Socket to clear writeBuffer
    setTimeout(function () {
      self.writable = true;
      self.emit('drain');
    }, 0);
  }
};

/**
 * Called upon close
 *
 * @api private
 */

WS.prototype.onClose = function () {
  Transport.prototype.onClose.call(this);
};

/**
 * Closes socket.
 *
 * @api private
 */

WS.prototype.doClose = function () {
  if (typeof this.ws !== 'undefined') {
    this.ws.close();
  }
};

/**
 * Generates uri for connection.
 *
 * @api private
 */

WS.prototype.uri = function () {
  var query = this.query || {};
  var schema = this.secure ? 'wss' : 'ws';
  var port = '';

  // avoid port if default for schema
  if (this.port && (('wss' === schema && Number(this.port) !== 443) ||
    ('ws' === schema && Number(this.port) !== 80))) {
    port = ':' + this.port;
  }

  // append timestamp to URI
  if (this.timestampRequests) {
    query[this.timestampParam] = yeast();
  }

  // communicate binary support capabilities
  if (!this.supportsBinary) {
    query.b64 = 1;
  }

  query = parseqs.encode(query);

  // prepend ? to query
  if (query.length) {
    query = '?' + query;
  }

  var ipv6 = this.hostname.indexOf(':') !== -1;
  return schema + '://' + (ipv6 ? '[' + this.hostname + ']' : this.hostname) + port + this.path + query;
};

/**
 * Feature detection for WebSocket.
 *
 * @return {Boolean} whether this transport is available.
 * @api public
 */

WS.prototype.check = function () {
  return !!WebSocket && !('__initialize' in WebSocket && this.name === WS.prototype.name);
};

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)))

/***/ }),
/* 46 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 47 */
/***/ (function(module, exports) {


var indexOf = [].indexOf;

module.exports = function(arr, obj){
  if (indexOf) return arr.indexOf(obj);
  for (var i = 0; i < arr.length; ++i) {
    if (arr[i] === obj) return i;
  }
  return -1;
};

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Module dependencies.
 */

var parser = __webpack_require__(9);
var Emitter = __webpack_require__(12);
var toArray = __webpack_require__(49);
var on = __webpack_require__(50);
var bind = __webpack_require__(51);
var debug = __webpack_require__(5)('socket.io-client:socket');
var parseqs = __webpack_require__(39);
var hasBin = __webpack_require__(27);

/**
 * Module exports.
 */

module.exports = exports = Socket;

/**
 * Internal events (blacklisted).
 * These events can't be emitted by the user.
 *
 * @api private
 */

var events = {
  connect: 1,
  connect_error: 1,
  connect_timeout: 1,
  connecting: 1,
  disconnect: 1,
  error: 1,
  reconnect: 1,
  reconnect_attempt: 1,
  reconnect_failed: 1,
  reconnect_error: 1,
  reconnecting: 1,
  ping: 1,
  pong: 1
};

/**
 * Shortcut to `Emitter#emit`.
 */

var emit = Emitter.prototype.emit;

/**
 * `Socket` constructor.
 *
 * @api public
 */

function Socket (io, nsp, opts) {
  this.io = io;
  this.nsp = nsp;
  this.json = this; // compat
  this.ids = 0;
  this.acks = {};
  this.receiveBuffer = [];
  this.sendBuffer = [];
  this.connected = false;
  this.disconnected = true;
  this.flags = {};
  if (opts && opts.query) {
    this.query = opts.query;
  }
  if (this.io.autoConnect) this.open();
}

/**
 * Mix in `Emitter`.
 */

Emitter(Socket.prototype);

/**
 * Subscribe to open, close and packet events
 *
 * @api private
 */

Socket.prototype.subEvents = function () {
  if (this.subs) return;

  var io = this.io;
  this.subs = [
    on(io, 'open', bind(this, 'onopen')),
    on(io, 'packet', bind(this, 'onpacket')),
    on(io, 'close', bind(this, 'onclose'))
  ];
};

/**
 * "Opens" the socket.
 *
 * @api public
 */

Socket.prototype.open =
Socket.prototype.connect = function () {
  if (this.connected) return this;

  this.subEvents();
  this.io.open(); // ensure open
  if ('open' === this.io.readyState) this.onopen();
  this.emit('connecting');
  return this;
};

/**
 * Sends a `message` event.
 *
 * @return {Socket} self
 * @api public
 */

Socket.prototype.send = function () {
  var args = toArray(arguments);
  args.unshift('message');
  this.emit.apply(this, args);
  return this;
};

/**
 * Override `emit`.
 * If the event is in `events`, it's emitted normally.
 *
 * @param {String} event name
 * @return {Socket} self
 * @api public
 */

Socket.prototype.emit = function (ev) {
  if (events.hasOwnProperty(ev)) {
    emit.apply(this, arguments);
    return this;
  }

  var args = toArray(arguments);
  var packet = {
    type: (this.flags.binary !== undefined ? this.flags.binary : hasBin(args)) ? parser.BINARY_EVENT : parser.EVENT,
    data: args
  };

  packet.options = {};
  packet.options.compress = !this.flags || false !== this.flags.compress;

  // event ack callback
  if ('function' === typeof args[args.length - 1]) {
    debug('emitting packet with ack id %d', this.ids);
    this.acks[this.ids] = args.pop();
    packet.id = this.ids++;
  }

  if (this.connected) {
    this.packet(packet);
  } else {
    this.sendBuffer.push(packet);
  }

  this.flags = {};

  return this;
};

/**
 * Sends a packet.
 *
 * @param {Object} packet
 * @api private
 */

Socket.prototype.packet = function (packet) {
  packet.nsp = this.nsp;
  this.io.packet(packet);
};

/**
 * Called upon engine `open`.
 *
 * @api private
 */

Socket.prototype.onopen = function () {
  debug('transport is open - connecting');

  // write connect packet if necessary
  if ('/' !== this.nsp) {
    if (this.query) {
      var query = typeof this.query === 'object' ? parseqs.encode(this.query) : this.query;
      debug('sending connect packet with query %s', query);
      this.packet({type: parser.CONNECT, query: query});
    } else {
      this.packet({type: parser.CONNECT});
    }
  }
};

/**
 * Called upon engine `close`.
 *
 * @param {String} reason
 * @api private
 */

Socket.prototype.onclose = function (reason) {
  debug('close (%s)', reason);
  this.connected = false;
  this.disconnected = true;
  delete this.id;
  this.emit('disconnect', reason);
};

/**
 * Called with socket packet.
 *
 * @param {Object} packet
 * @api private
 */

Socket.prototype.onpacket = function (packet) {
  var sameNamespace = packet.nsp === this.nsp;
  var rootNamespaceError = packet.type === parser.ERROR && packet.nsp === '/';

  if (!sameNamespace && !rootNamespaceError) return;

  switch (packet.type) {
    case parser.CONNECT:
      this.onconnect();
      break;

    case parser.EVENT:
      this.onevent(packet);
      break;

    case parser.BINARY_EVENT:
      this.onevent(packet);
      break;

    case parser.ACK:
      this.onack(packet);
      break;

    case parser.BINARY_ACK:
      this.onack(packet);
      break;

    case parser.DISCONNECT:
      this.ondisconnect();
      break;

    case parser.ERROR:
      this.emit('error', packet.data);
      break;
  }
};

/**
 * Called upon a server event.
 *
 * @param {Object} packet
 * @api private
 */

Socket.prototype.onevent = function (packet) {
  var args = packet.data || [];
  debug('emitting event %j', args);

  if (null != packet.id) {
    debug('attaching ack callback to event');
    args.push(this.ack(packet.id));
  }

  if (this.connected) {
    emit.apply(this, args);
  } else {
    this.receiveBuffer.push(args);
  }
};

/**
 * Produces an ack callback to emit with an event.
 *
 * @api private
 */

Socket.prototype.ack = function (id) {
  var self = this;
  var sent = false;
  return function () {
    // prevent double callbacks
    if (sent) return;
    sent = true;
    var args = toArray(arguments);
    debug('sending ack %j', args);

    self.packet({
      type: hasBin(args) ? parser.BINARY_ACK : parser.ACK,
      id: id,
      data: args
    });
  };
};

/**
 * Called upon a server acknowlegement.
 *
 * @param {Object} packet
 * @api private
 */

Socket.prototype.onack = function (packet) {
  var ack = this.acks[packet.id];
  if ('function' === typeof ack) {
    debug('calling ack %s with %j', packet.id, packet.data);
    ack.apply(this, packet.data);
    delete this.acks[packet.id];
  } else {
    debug('bad ack %s', packet.id);
  }
};

/**
 * Called upon server connect.
 *
 * @api private
 */

Socket.prototype.onconnect = function () {
  this.connected = true;
  this.disconnected = false;
  this.emit('connect');
  this.emitBuffered();
};

/**
 * Emit buffered events (received and emitted).
 *
 * @api private
 */

Socket.prototype.emitBuffered = function () {
  var i;
  for (i = 0; i < this.receiveBuffer.length; i++) {
    emit.apply(this, this.receiveBuffer[i]);
  }
  this.receiveBuffer = [];

  for (i = 0; i < this.sendBuffer.length; i++) {
    this.packet(this.sendBuffer[i]);
  }
  this.sendBuffer = [];
};

/**
 * Called upon server disconnect.
 *
 * @api private
 */

Socket.prototype.ondisconnect = function () {
  debug('server disconnect (%s)', this.nsp);
  this.destroy();
  this.onclose('io server disconnect');
};

/**
 * Called upon forced client/server side disconnections,
 * this method ensures the manager stops tracking us and
 * that reconnections don't get triggered for this.
 *
 * @api private.
 */

Socket.prototype.destroy = function () {
  if (this.subs) {
    // clean subscriptions to avoid reconnections
    for (var i = 0; i < this.subs.length; i++) {
      this.subs[i].destroy();
    }
    this.subs = null;
  }

  this.io.destroy(this);
};

/**
 * Disconnects the socket manually.
 *
 * @return {Socket} self
 * @api public
 */

Socket.prototype.close =
Socket.prototype.disconnect = function () {
  if (this.connected) {
    debug('performing disconnect (%s)', this.nsp);
    this.packet({ type: parser.DISCONNECT });
  }

  // remove socket from pool
  this.destroy();

  if (this.connected) {
    // fire events
    this.onclose('io client disconnect');
  }
  return this;
};

/**
 * Sets the compress flag.
 *
 * @param {Boolean} if `true`, compresses the sending data
 * @return {Socket} self
 * @api public
 */

Socket.prototype.compress = function (compress) {
  this.flags.compress = compress;
  return this;
};

/**
 * Sets the binary flag
 *
 * @param {Boolean} whether the emitted data contains binary
 * @return {Socket} self
 * @api public
 */

Socket.prototype.binary = function (binary) {
  this.flags.binary = binary;
  return this;
};


/***/ }),
/* 49 */
/***/ (function(module, exports) {

module.exports = toArray

function toArray(list, index) {
    var array = []

    index = index || 0

    for (var i = index || 0; i < list.length; i++) {
        array[i - index] = list[i]
    }

    return array
}


/***/ }),
/* 50 */
/***/ (function(module, exports) {


/**
 * Module exports.
 */

module.exports = on;

/**
 * Helper for subscriptions.
 *
 * @param {Object|EventEmitter} obj with `Emitter` mixin or `EventEmitter`
 * @param {String} event name
 * @param {Function} callback
 * @api public
 */

function on (obj, ev, fn) {
  obj.on(ev, fn);
  return {
    destroy: function () {
      obj.removeListener(ev, fn);
    }
  };
}


/***/ }),
/* 51 */
/***/ (function(module, exports) {

/**
 * Slice reference.
 */

var slice = [].slice;

/**
 * Bind `obj` to `fn`.
 *
 * @param {Object} obj
 * @param {Function|String} fn or string
 * @return {Function}
 * @api public
 */

module.exports = function(obj, fn){
  if ('string' == typeof fn) fn = obj[fn];
  if ('function' != typeof fn) throw new Error('bind() requires a function');
  var args = slice.call(arguments, 2);
  return function(){
    return fn.apply(obj, args.concat(slice.call(arguments)));
  }
};


/***/ }),
/* 52 */
/***/ (function(module, exports) {


/**
 * Expose `Backoff`.
 */

module.exports = Backoff;

/**
 * Initialize backoff timer with `opts`.
 *
 * - `min` initial timeout in milliseconds [100]
 * - `max` max timeout [10000]
 * - `jitter` [0]
 * - `factor` [2]
 *
 * @param {Object} opts
 * @api public
 */

function Backoff(opts) {
  opts = opts || {};
  this.ms = opts.min || 100;
  this.max = opts.max || 10000;
  this.factor = opts.factor || 2;
  this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
  this.attempts = 0;
}

/**
 * Return the backoff duration.
 *
 * @return {Number}
 * @api public
 */

Backoff.prototype.duration = function(){
  var ms = this.ms * Math.pow(this.factor, this.attempts++);
  if (this.jitter) {
    var rand =  Math.random();
    var deviation = Math.floor(rand * this.jitter * ms);
    ms = (Math.floor(rand * 10) & 1) == 0  ? ms - deviation : ms + deviation;
  }
  return Math.min(ms, this.max) | 0;
};

/**
 * Reset the number of attempts.
 *
 * @api public
 */

Backoff.prototype.reset = function(){
  this.attempts = 0;
};

/**
 * Set the minimum duration
 *
 * @api public
 */

Backoff.prototype.setMin = function(min){
  this.ms = min;
};

/**
 * Set the maximum duration
 *
 * @api public
 */

Backoff.prototype.setMax = function(max){
  this.max = max;
};

/**
 * Set the jitter
 *
 * @api public
 */

Backoff.prototype.setJitter = function(jitter){
  this.jitter = jitter;
};



/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(54);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(56)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(55)(false);
// imports


// module
exports.push([module.i, "/*!\r\n * Materialize v1.0.0 (http://materializecss.com)\r\n * Copyright 2014-2017 Materialize\r\n * MIT License (https://raw.githubusercontent.com/Dogfalo/materialize/master/LICENSE)\r\n */\r\n.materialize-red {\n  background-color: #e51c23 !important;\n}\n\n.materialize-red-text {\n  color: #e51c23 !important;\n}\n\n.materialize-red.lighten-5 {\n  background-color: #fdeaeb !important;\n}\n\n.materialize-red-text.text-lighten-5 {\n  color: #fdeaeb !important;\n}\n\n.materialize-red.lighten-4 {\n  background-color: #f8c1c3 !important;\n}\n\n.materialize-red-text.text-lighten-4 {\n  color: #f8c1c3 !important;\n}\n\n.materialize-red.lighten-3 {\n  background-color: #f3989b !important;\n}\n\n.materialize-red-text.text-lighten-3 {\n  color: #f3989b !important;\n}\n\n.materialize-red.lighten-2 {\n  background-color: #ee6e73 !important;\n}\n\n.materialize-red-text.text-lighten-2 {\n  color: #ee6e73 !important;\n}\n\n.materialize-red.lighten-1 {\n  background-color: #ea454b !important;\n}\n\n.materialize-red-text.text-lighten-1 {\n  color: #ea454b !important;\n}\n\n.materialize-red.darken-1 {\n  background-color: #d0181e !important;\n}\n\n.materialize-red-text.text-darken-1 {\n  color: #d0181e !important;\n}\n\n.materialize-red.darken-2 {\n  background-color: #b9151b !important;\n}\n\n.materialize-red-text.text-darken-2 {\n  color: #b9151b !important;\n}\n\n.materialize-red.darken-3 {\n  background-color: #a21318 !important;\n}\n\n.materialize-red-text.text-darken-3 {\n  color: #a21318 !important;\n}\n\n.materialize-red.darken-4 {\n  background-color: #8b1014 !important;\n}\n\n.materialize-red-text.text-darken-4 {\n  color: #8b1014 !important;\n}\n\n.red {\n  background-color: #F44336 !important;\n}\n\n.red-text {\n  color: #F44336 !important;\n}\n\n.red.lighten-5 {\n  background-color: #FFEBEE !important;\n}\n\n.red-text.text-lighten-5 {\n  color: #FFEBEE !important;\n}\n\n.red.lighten-4 {\n  background-color: #FFCDD2 !important;\n}\n\n.red-text.text-lighten-4 {\n  color: #FFCDD2 !important;\n}\n\n.red.lighten-3 {\n  background-color: #EF9A9A !important;\n}\n\n.red-text.text-lighten-3 {\n  color: #EF9A9A !important;\n}\n\n.red.lighten-2 {\n  background-color: #E57373 !important;\n}\n\n.red-text.text-lighten-2 {\n  color: #E57373 !important;\n}\n\n.red.lighten-1 {\n  background-color: #EF5350 !important;\n}\n\n.red-text.text-lighten-1 {\n  color: #EF5350 !important;\n}\n\n.red.darken-1 {\n  background-color: #E53935 !important;\n}\n\n.red-text.text-darken-1 {\n  color: #E53935 !important;\n}\n\n.red.darken-2 {\n  background-color: #D32F2F !important;\n}\n\n.red-text.text-darken-2 {\n  color: #D32F2F !important;\n}\n\n.red.darken-3 {\n  background-color: #C62828 !important;\n}\n\n.red-text.text-darken-3 {\n  color: #C62828 !important;\n}\n\n.red.darken-4 {\n  background-color: #B71C1C !important;\n}\n\n.red-text.text-darken-4 {\n  color: #B71C1C !important;\n}\n\n.red.accent-1 {\n  background-color: #FF8A80 !important;\n}\n\n.red-text.text-accent-1 {\n  color: #FF8A80 !important;\n}\n\n.red.accent-2 {\n  background-color: #FF5252 !important;\n}\n\n.red-text.text-accent-2 {\n  color: #FF5252 !important;\n}\n\n.red.accent-3 {\n  background-color: #FF1744 !important;\n}\n\n.red-text.text-accent-3 {\n  color: #FF1744 !important;\n}\n\n.red.accent-4 {\n  background-color: #D50000 !important;\n}\n\n.red-text.text-accent-4 {\n  color: #D50000 !important;\n}\n\n.pink {\n  background-color: #e91e63 !important;\n}\n\n.pink-text {\n  color: #e91e63 !important;\n}\n\n.pink.lighten-5 {\n  background-color: #fce4ec !important;\n}\n\n.pink-text.text-lighten-5 {\n  color: #fce4ec !important;\n}\n\n.pink.lighten-4 {\n  background-color: #f8bbd0 !important;\n}\n\n.pink-text.text-lighten-4 {\n  color: #f8bbd0 !important;\n}\n\n.pink.lighten-3 {\n  background-color: #f48fb1 !important;\n}\n\n.pink-text.text-lighten-3 {\n  color: #f48fb1 !important;\n}\n\n.pink.lighten-2 {\n  background-color: #f06292 !important;\n}\n\n.pink-text.text-lighten-2 {\n  color: #f06292 !important;\n}\n\n.pink.lighten-1 {\n  background-color: #ec407a !important;\n}\n\n.pink-text.text-lighten-1 {\n  color: #ec407a !important;\n}\n\n.pink.darken-1 {\n  background-color: #d81b60 !important;\n}\n\n.pink-text.text-darken-1 {\n  color: #d81b60 !important;\n}\n\n.pink.darken-2 {\n  background-color: #c2185b !important;\n}\n\n.pink-text.text-darken-2 {\n  color: #c2185b !important;\n}\n\n.pink.darken-3 {\n  background-color: #ad1457 !important;\n}\n\n.pink-text.text-darken-3 {\n  color: #ad1457 !important;\n}\n\n.pink.darken-4 {\n  background-color: #880e4f !important;\n}\n\n.pink-text.text-darken-4 {\n  color: #880e4f !important;\n}\n\n.pink.accent-1 {\n  background-color: #ff80ab !important;\n}\n\n.pink-text.text-accent-1 {\n  color: #ff80ab !important;\n}\n\n.pink.accent-2 {\n  background-color: #ff4081 !important;\n}\n\n.pink-text.text-accent-2 {\n  color: #ff4081 !important;\n}\n\n.pink.accent-3 {\n  background-color: #f50057 !important;\n}\n\n.pink-text.text-accent-3 {\n  color: #f50057 !important;\n}\n\n.pink.accent-4 {\n  background-color: #c51162 !important;\n}\n\n.pink-text.text-accent-4 {\n  color: #c51162 !important;\n}\n\n.purple {\n  background-color: #9c27b0 !important;\n}\n\n.purple-text {\n  color: #9c27b0 !important;\n}\n\n.purple.lighten-5 {\n  background-color: #f3e5f5 !important;\n}\n\n.purple-text.text-lighten-5 {\n  color: #f3e5f5 !important;\n}\n\n.purple.lighten-4 {\n  background-color: #e1bee7 !important;\n}\n\n.purple-text.text-lighten-4 {\n  color: #e1bee7 !important;\n}\n\n.purple.lighten-3 {\n  background-color: #ce93d8 !important;\n}\n\n.purple-text.text-lighten-3 {\n  color: #ce93d8 !important;\n}\n\n.purple.lighten-2 {\n  background-color: #ba68c8 !important;\n}\n\n.purple-text.text-lighten-2 {\n  color: #ba68c8 !important;\n}\n\n.purple.lighten-1 {\n  background-color: #ab47bc !important;\n}\n\n.purple-text.text-lighten-1 {\n  color: #ab47bc !important;\n}\n\n.purple.darken-1 {\n  background-color: #8e24aa !important;\n}\n\n.purple-text.text-darken-1 {\n  color: #8e24aa !important;\n}\n\n.purple.darken-2 {\n  background-color: #7b1fa2 !important;\n}\n\n.purple-text.text-darken-2 {\n  color: #7b1fa2 !important;\n}\n\n.purple.darken-3 {\n  background-color: #6a1b9a !important;\n}\n\n.purple-text.text-darken-3 {\n  color: #6a1b9a !important;\n}\n\n.purple.darken-4 {\n  background-color: #4a148c !important;\n}\n\n.purple-text.text-darken-4 {\n  color: #4a148c !important;\n}\n\n.purple.accent-1 {\n  background-color: #ea80fc !important;\n}\n\n.purple-text.text-accent-1 {\n  color: #ea80fc !important;\n}\n\n.purple.accent-2 {\n  background-color: #e040fb !important;\n}\n\n.purple-text.text-accent-2 {\n  color: #e040fb !important;\n}\n\n.purple.accent-3 {\n  background-color: #d500f9 !important;\n}\n\n.purple-text.text-accent-3 {\n  color: #d500f9 !important;\n}\n\n.purple.accent-4 {\n  background-color: #aa00ff !important;\n}\n\n.purple-text.text-accent-4 {\n  color: #aa00ff !important;\n}\n\n.deep-purple {\n  background-color: #673ab7 !important;\n}\n\n.deep-purple-text {\n  color: #673ab7 !important;\n}\n\n.deep-purple.lighten-5 {\n  background-color: #ede7f6 !important;\n}\n\n.deep-purple-text.text-lighten-5 {\n  color: #ede7f6 !important;\n}\n\n.deep-purple.lighten-4 {\n  background-color: #d1c4e9 !important;\n}\n\n.deep-purple-text.text-lighten-4 {\n  color: #d1c4e9 !important;\n}\n\n.deep-purple.lighten-3 {\n  background-color: #b39ddb !important;\n}\n\n.deep-purple-text.text-lighten-3 {\n  color: #b39ddb !important;\n}\n\n.deep-purple.lighten-2 {\n  background-color: #9575cd !important;\n}\n\n.deep-purple-text.text-lighten-2 {\n  color: #9575cd !important;\n}\n\n.deep-purple.lighten-1 {\n  background-color: #7e57c2 !important;\n}\n\n.deep-purple-text.text-lighten-1 {\n  color: #7e57c2 !important;\n}\n\n.deep-purple.darken-1 {\n  background-color: #5e35b1 !important;\n}\n\n.deep-purple-text.text-darken-1 {\n  color: #5e35b1 !important;\n}\n\n.deep-purple.darken-2 {\n  background-color: #512da8 !important;\n}\n\n.deep-purple-text.text-darken-2 {\n  color: #512da8 !important;\n}\n\n.deep-purple.darken-3 {\n  background-color: #4527a0 !important;\n}\n\n.deep-purple-text.text-darken-3 {\n  color: #4527a0 !important;\n}\n\n.deep-purple.darken-4 {\n  background-color: #311b92 !important;\n}\n\n.deep-purple-text.text-darken-4 {\n  color: #311b92 !important;\n}\n\n.deep-purple.accent-1 {\n  background-color: #b388ff !important;\n}\n\n.deep-purple-text.text-accent-1 {\n  color: #b388ff !important;\n}\n\n.deep-purple.accent-2 {\n  background-color: #7c4dff !important;\n}\n\n.deep-purple-text.text-accent-2 {\n  color: #7c4dff !important;\n}\n\n.deep-purple.accent-3 {\n  background-color: #651fff !important;\n}\n\n.deep-purple-text.text-accent-3 {\n  color: #651fff !important;\n}\n\n.deep-purple.accent-4 {\n  background-color: #6200ea !important;\n}\n\n.deep-purple-text.text-accent-4 {\n  color: #6200ea !important;\n}\n\n.indigo {\n  background-color: #3f51b5 !important;\n}\n\n.indigo-text {\n  color: #3f51b5 !important;\n}\n\n.indigo.lighten-5 {\n  background-color: #e8eaf6 !important;\n}\n\n.indigo-text.text-lighten-5 {\n  color: #e8eaf6 !important;\n}\n\n.indigo.lighten-4 {\n  background-color: #c5cae9 !important;\n}\n\n.indigo-text.text-lighten-4 {\n  color: #c5cae9 !important;\n}\n\n.indigo.lighten-3 {\n  background-color: #9fa8da !important;\n}\n\n.indigo-text.text-lighten-3 {\n  color: #9fa8da !important;\n}\n\n.indigo.lighten-2 {\n  background-color: #7986cb !important;\n}\n\n.indigo-text.text-lighten-2 {\n  color: #7986cb !important;\n}\n\n.indigo.lighten-1 {\n  background-color: #5c6bc0 !important;\n}\n\n.indigo-text.text-lighten-1 {\n  color: #5c6bc0 !important;\n}\n\n.indigo.darken-1 {\n  background-color: #3949ab !important;\n}\n\n.indigo-text.text-darken-1 {\n  color: #3949ab !important;\n}\n\n.indigo.darken-2 {\n  background-color: #303f9f !important;\n}\n\n.indigo-text.text-darken-2 {\n  color: #303f9f !important;\n}\n\n.indigo.darken-3 {\n  background-color: #283593 !important;\n}\n\n.indigo-text.text-darken-3 {\n  color: #283593 !important;\n}\n\n.indigo.darken-4 {\n  background-color: #1a237e !important;\n}\n\n.indigo-text.text-darken-4 {\n  color: #1a237e !important;\n}\n\n.indigo.accent-1 {\n  background-color: #8c9eff !important;\n}\n\n.indigo-text.text-accent-1 {\n  color: #8c9eff !important;\n}\n\n.indigo.accent-2 {\n  background-color: #536dfe !important;\n}\n\n.indigo-text.text-accent-2 {\n  color: #536dfe !important;\n}\n\n.indigo.accent-3 {\n  background-color: #3d5afe !important;\n}\n\n.indigo-text.text-accent-3 {\n  color: #3d5afe !important;\n}\n\n.indigo.accent-4 {\n  background-color: #304ffe !important;\n}\n\n.indigo-text.text-accent-4 {\n  color: #304ffe !important;\n}\n\n.blue {\n  background-color: #2196F3 !important;\n}\n\n.blue-text {\n  color: #2196F3 !important;\n}\n\n.blue.lighten-5 {\n  background-color: #E3F2FD !important;\n}\n\n.blue-text.text-lighten-5 {\n  color: #E3F2FD !important;\n}\n\n.blue.lighten-4 {\n  background-color: #BBDEFB !important;\n}\n\n.blue-text.text-lighten-4 {\n  color: #BBDEFB !important;\n}\n\n.blue.lighten-3 {\n  background-color: #90CAF9 !important;\n}\n\n.blue-text.text-lighten-3 {\n  color: #90CAF9 !important;\n}\n\n.blue.lighten-2 {\n  background-color: #64B5F6 !important;\n}\n\n.blue-text.text-lighten-2 {\n  color: #64B5F6 !important;\n}\n\n.blue.lighten-1 {\n  background-color: #42A5F5 !important;\n}\n\n.blue-text.text-lighten-1 {\n  color: #42A5F5 !important;\n}\n\n.blue.darken-1 {\n  background-color: #1E88E5 !important;\n}\n\n.blue-text.text-darken-1 {\n  color: #1E88E5 !important;\n}\n\n.blue.darken-2 {\n  background-color: #1976D2 !important;\n}\n\n.blue-text.text-darken-2 {\n  color: #1976D2 !important;\n}\n\n.blue.darken-3 {\n  background-color: #1565C0 !important;\n}\n\n.blue-text.text-darken-3 {\n  color: #1565C0 !important;\n}\n\n.blue.darken-4 {\n  background-color: #0D47A1 !important;\n}\n\n.blue-text.text-darken-4 {\n  color: #0D47A1 !important;\n}\n\n.blue.accent-1 {\n  background-color: #82B1FF !important;\n}\n\n.blue-text.text-accent-1 {\n  color: #82B1FF !important;\n}\n\n.blue.accent-2 {\n  background-color: #448AFF !important;\n}\n\n.blue-text.text-accent-2 {\n  color: #448AFF !important;\n}\n\n.blue.accent-3 {\n  background-color: #2979FF !important;\n}\n\n.blue-text.text-accent-3 {\n  color: #2979FF !important;\n}\n\n.blue.accent-4 {\n  background-color: #2962FF !important;\n}\n\n.blue-text.text-accent-4 {\n  color: #2962FF !important;\n}\n\n.light-blue {\n  background-color: #03a9f4 !important;\n}\n\n.light-blue-text {\n  color: #03a9f4 !important;\n}\n\n.light-blue.lighten-5 {\n  background-color: #e1f5fe !important;\n}\n\n.light-blue-text.text-lighten-5 {\n  color: #e1f5fe !important;\n}\n\n.light-blue.lighten-4 {\n  background-color: #b3e5fc !important;\n}\n\n.light-blue-text.text-lighten-4 {\n  color: #b3e5fc !important;\n}\n\n.light-blue.lighten-3 {\n  background-color: #81d4fa !important;\n}\n\n.light-blue-text.text-lighten-3 {\n  color: #81d4fa !important;\n}\n\n.light-blue.lighten-2 {\n  background-color: #4fc3f7 !important;\n}\n\n.light-blue-text.text-lighten-2 {\n  color: #4fc3f7 !important;\n}\n\n.light-blue.lighten-1 {\n  background-color: #29b6f6 !important;\n}\n\n.light-blue-text.text-lighten-1 {\n  color: #29b6f6 !important;\n}\n\n.light-blue.darken-1 {\n  background-color: #039be5 !important;\n}\n\n.light-blue-text.text-darken-1 {\n  color: #039be5 !important;\n}\n\n.light-blue.darken-2 {\n  background-color: #0288d1 !important;\n}\n\n.light-blue-text.text-darken-2 {\n  color: #0288d1 !important;\n}\n\n.light-blue.darken-3 {\n  background-color: #0277bd !important;\n}\n\n.light-blue-text.text-darken-3 {\n  color: #0277bd !important;\n}\n\n.light-blue.darken-4 {\n  background-color: #01579b !important;\n}\n\n.light-blue-text.text-darken-4 {\n  color: #01579b !important;\n}\n\n.light-blue.accent-1 {\n  background-color: #80d8ff !important;\n}\n\n.light-blue-text.text-accent-1 {\n  color: #80d8ff !important;\n}\n\n.light-blue.accent-2 {\n  background-color: #40c4ff !important;\n}\n\n.light-blue-text.text-accent-2 {\n  color: #40c4ff !important;\n}\n\n.light-blue.accent-3 {\n  background-color: #00b0ff !important;\n}\n\n.light-blue-text.text-accent-3 {\n  color: #00b0ff !important;\n}\n\n.light-blue.accent-4 {\n  background-color: #0091ea !important;\n}\n\n.light-blue-text.text-accent-4 {\n  color: #0091ea !important;\n}\n\n.cyan {\n  background-color: #00bcd4 !important;\n}\n\n.cyan-text {\n  color: #00bcd4 !important;\n}\n\n.cyan.lighten-5 {\n  background-color: #e0f7fa !important;\n}\n\n.cyan-text.text-lighten-5 {\n  color: #e0f7fa !important;\n}\n\n.cyan.lighten-4 {\n  background-color: #b2ebf2 !important;\n}\n\n.cyan-text.text-lighten-4 {\n  color: #b2ebf2 !important;\n}\n\n.cyan.lighten-3 {\n  background-color: #80deea !important;\n}\n\n.cyan-text.text-lighten-3 {\n  color: #80deea !important;\n}\n\n.cyan.lighten-2 {\n  background-color: #4dd0e1 !important;\n}\n\n.cyan-text.text-lighten-2 {\n  color: #4dd0e1 !important;\n}\n\n.cyan.lighten-1 {\n  background-color: #26c6da !important;\n}\n\n.cyan-text.text-lighten-1 {\n  color: #26c6da !important;\n}\n\n.cyan.darken-1 {\n  background-color: #00acc1 !important;\n}\n\n.cyan-text.text-darken-1 {\n  color: #00acc1 !important;\n}\n\n.cyan.darken-2 {\n  background-color: #0097a7 !important;\n}\n\n.cyan-text.text-darken-2 {\n  color: #0097a7 !important;\n}\n\n.cyan.darken-3 {\n  background-color: #00838f !important;\n}\n\n.cyan-text.text-darken-3 {\n  color: #00838f !important;\n}\n\n.cyan.darken-4 {\n  background-color: #006064 !important;\n}\n\n.cyan-text.text-darken-4 {\n  color: #006064 !important;\n}\n\n.cyan.accent-1 {\n  background-color: #84ffff !important;\n}\n\n.cyan-text.text-accent-1 {\n  color: #84ffff !important;\n}\n\n.cyan.accent-2 {\n  background-color: #18ffff !important;\n}\n\n.cyan-text.text-accent-2 {\n  color: #18ffff !important;\n}\n\n.cyan.accent-3 {\n  background-color: #00e5ff !important;\n}\n\n.cyan-text.text-accent-3 {\n  color: #00e5ff !important;\n}\n\n.cyan.accent-4 {\n  background-color: #00b8d4 !important;\n}\n\n.cyan-text.text-accent-4 {\n  color: #00b8d4 !important;\n}\n\n.teal {\n  background-color: #009688 !important;\n}\n\n.teal-text {\n  color: #009688 !important;\n}\n\n.teal.lighten-5 {\n  background-color: #e0f2f1 !important;\n}\n\n.teal-text.text-lighten-5 {\n  color: #e0f2f1 !important;\n}\n\n.teal.lighten-4 {\n  background-color: #b2dfdb !important;\n}\n\n.teal-text.text-lighten-4 {\n  color: #b2dfdb !important;\n}\n\n.teal.lighten-3 {\n  background-color: #80cbc4 !important;\n}\n\n.teal-text.text-lighten-3 {\n  color: #80cbc4 !important;\n}\n\n.teal.lighten-2 {\n  background-color: #4db6ac !important;\n}\n\n.teal-text.text-lighten-2 {\n  color: #4db6ac !important;\n}\n\n.teal.lighten-1 {\n  background-color: #26a69a !important;\n}\n\n.teal-text.text-lighten-1 {\n  color: #26a69a !important;\n}\n\n.teal.darken-1 {\n  background-color: #00897b !important;\n}\n\n.teal-text.text-darken-1 {\n  color: #00897b !important;\n}\n\n.teal.darken-2 {\n  background-color: #00796b !important;\n}\n\n.teal-text.text-darken-2 {\n  color: #00796b !important;\n}\n\n.teal.darken-3 {\n  background-color: #00695c !important;\n}\n\n.teal-text.text-darken-3 {\n  color: #00695c !important;\n}\n\n.teal.darken-4 {\n  background-color: #004d40 !important;\n}\n\n.teal-text.text-darken-4 {\n  color: #004d40 !important;\n}\n\n.teal.accent-1 {\n  background-color: #a7ffeb !important;\n}\n\n.teal-text.text-accent-1 {\n  color: #a7ffeb !important;\n}\n\n.teal.accent-2 {\n  background-color: #64ffda !important;\n}\n\n.teal-text.text-accent-2 {\n  color: #64ffda !important;\n}\n\n.teal.accent-3 {\n  background-color: #1de9b6 !important;\n}\n\n.teal-text.text-accent-3 {\n  color: #1de9b6 !important;\n}\n\n.teal.accent-4 {\n  background-color: #00bfa5 !important;\n}\n\n.teal-text.text-accent-4 {\n  color: #00bfa5 !important;\n}\n\n.green {\n  background-color: #4CAF50 !important;\n}\n\n.green-text {\n  color: #4CAF50 !important;\n}\n\n.green.lighten-5 {\n  background-color: #E8F5E9 !important;\n}\n\n.green-text.text-lighten-5 {\n  color: #E8F5E9 !important;\n}\n\n.green.lighten-4 {\n  background-color: #C8E6C9 !important;\n}\n\n.green-text.text-lighten-4 {\n  color: #C8E6C9 !important;\n}\n\n.green.lighten-3 {\n  background-color: #A5D6A7 !important;\n}\n\n.green-text.text-lighten-3 {\n  color: #A5D6A7 !important;\n}\n\n.green.lighten-2 {\n  background-color: #81C784 !important;\n}\n\n.green-text.text-lighten-2 {\n  color: #81C784 !important;\n}\n\n.green.lighten-1 {\n  background-color: #66BB6A !important;\n}\n\n.green-text.text-lighten-1 {\n  color: #66BB6A !important;\n}\n\n.green.darken-1 {\n  background-color: #43A047 !important;\n}\n\n.green-text.text-darken-1 {\n  color: #43A047 !important;\n}\n\n.green.darken-2 {\n  background-color: #388E3C !important;\n}\n\n.green-text.text-darken-2 {\n  color: #388E3C !important;\n}\n\n.green.darken-3 {\n  background-color: #2E7D32 !important;\n}\n\n.green-text.text-darken-3 {\n  color: #2E7D32 !important;\n}\n\n.green.darken-4 {\n  background-color: #1B5E20 !important;\n}\n\n.green-text.text-darken-4 {\n  color: #1B5E20 !important;\n}\n\n.green.accent-1 {\n  background-color: #B9F6CA !important;\n}\n\n.green-text.text-accent-1 {\n  color: #B9F6CA !important;\n}\n\n.green.accent-2 {\n  background-color: #69F0AE !important;\n}\n\n.green-text.text-accent-2 {\n  color: #69F0AE !important;\n}\n\n.green.accent-3 {\n  background-color: #00E676 !important;\n}\n\n.green-text.text-accent-3 {\n  color: #00E676 !important;\n}\n\n.green.accent-4 {\n  background-color: #00C853 !important;\n}\n\n.green-text.text-accent-4 {\n  color: #00C853 !important;\n}\n\n.light-green {\n  background-color: #8bc34a !important;\n}\n\n.light-green-text {\n  color: #8bc34a !important;\n}\n\n.light-green.lighten-5 {\n  background-color: #f1f8e9 !important;\n}\n\n.light-green-text.text-lighten-5 {\n  color: #f1f8e9 !important;\n}\n\n.light-green.lighten-4 {\n  background-color: #dcedc8 !important;\n}\n\n.light-green-text.text-lighten-4 {\n  color: #dcedc8 !important;\n}\n\n.light-green.lighten-3 {\n  background-color: #c5e1a5 !important;\n}\n\n.light-green-text.text-lighten-3 {\n  color: #c5e1a5 !important;\n}\n\n.light-green.lighten-2 {\n  background-color: #aed581 !important;\n}\n\n.light-green-text.text-lighten-2 {\n  color: #aed581 !important;\n}\n\n.light-green.lighten-1 {\n  background-color: #9ccc65 !important;\n}\n\n.light-green-text.text-lighten-1 {\n  color: #9ccc65 !important;\n}\n\n.light-green.darken-1 {\n  background-color: #7cb342 !important;\n}\n\n.light-green-text.text-darken-1 {\n  color: #7cb342 !important;\n}\n\n.light-green.darken-2 {\n  background-color: #689f38 !important;\n}\n\n.light-green-text.text-darken-2 {\n  color: #689f38 !important;\n}\n\n.light-green.darken-3 {\n  background-color: #558b2f !important;\n}\n\n.light-green-text.text-darken-3 {\n  color: #558b2f !important;\n}\n\n.light-green.darken-4 {\n  background-color: #33691e !important;\n}\n\n.light-green-text.text-darken-4 {\n  color: #33691e !important;\n}\n\n.light-green.accent-1 {\n  background-color: #ccff90 !important;\n}\n\n.light-green-text.text-accent-1 {\n  color: #ccff90 !important;\n}\n\n.light-green.accent-2 {\n  background-color: #b2ff59 !important;\n}\n\n.light-green-text.text-accent-2 {\n  color: #b2ff59 !important;\n}\n\n.light-green.accent-3 {\n  background-color: #76ff03 !important;\n}\n\n.light-green-text.text-accent-3 {\n  color: #76ff03 !important;\n}\n\n.light-green.accent-4 {\n  background-color: #64dd17 !important;\n}\n\n.light-green-text.text-accent-4 {\n  color: #64dd17 !important;\n}\n\n.lime {\n  background-color: #cddc39 !important;\n}\n\n.lime-text {\n  color: #cddc39 !important;\n}\n\n.lime.lighten-5 {\n  background-color: #f9fbe7 !important;\n}\n\n.lime-text.text-lighten-5 {\n  color: #f9fbe7 !important;\n}\n\n.lime.lighten-4 {\n  background-color: #f0f4c3 !important;\n}\n\n.lime-text.text-lighten-4 {\n  color: #f0f4c3 !important;\n}\n\n.lime.lighten-3 {\n  background-color: #e6ee9c !important;\n}\n\n.lime-text.text-lighten-3 {\n  color: #e6ee9c !important;\n}\n\n.lime.lighten-2 {\n  background-color: #dce775 !important;\n}\n\n.lime-text.text-lighten-2 {\n  color: #dce775 !important;\n}\n\n.lime.lighten-1 {\n  background-color: #d4e157 !important;\n}\n\n.lime-text.text-lighten-1 {\n  color: #d4e157 !important;\n}\n\n.lime.darken-1 {\n  background-color: #c0ca33 !important;\n}\n\n.lime-text.text-darken-1 {\n  color: #c0ca33 !important;\n}\n\n.lime.darken-2 {\n  background-color: #afb42b !important;\n}\n\n.lime-text.text-darken-2 {\n  color: #afb42b !important;\n}\n\n.lime.darken-3 {\n  background-color: #9e9d24 !important;\n}\n\n.lime-text.text-darken-3 {\n  color: #9e9d24 !important;\n}\n\n.lime.darken-4 {\n  background-color: #827717 !important;\n}\n\n.lime-text.text-darken-4 {\n  color: #827717 !important;\n}\n\n.lime.accent-1 {\n  background-color: #f4ff81 !important;\n}\n\n.lime-text.text-accent-1 {\n  color: #f4ff81 !important;\n}\n\n.lime.accent-2 {\n  background-color: #eeff41 !important;\n}\n\n.lime-text.text-accent-2 {\n  color: #eeff41 !important;\n}\n\n.lime.accent-3 {\n  background-color: #c6ff00 !important;\n}\n\n.lime-text.text-accent-3 {\n  color: #c6ff00 !important;\n}\n\n.lime.accent-4 {\n  background-color: #aeea00 !important;\n}\n\n.lime-text.text-accent-4 {\n  color: #aeea00 !important;\n}\n\n.yellow {\n  background-color: #ffeb3b !important;\n}\n\n.yellow-text {\n  color: #ffeb3b !important;\n}\n\n.yellow.lighten-5 {\n  background-color: #fffde7 !important;\n}\n\n.yellow-text.text-lighten-5 {\n  color: #fffde7 !important;\n}\n\n.yellow.lighten-4 {\n  background-color: #fff9c4 !important;\n}\n\n.yellow-text.text-lighten-4 {\n  color: #fff9c4 !important;\n}\n\n.yellow.lighten-3 {\n  background-color: #fff59d !important;\n}\n\n.yellow-text.text-lighten-3 {\n  color: #fff59d !important;\n}\n\n.yellow.lighten-2 {\n  background-color: #fff176 !important;\n}\n\n.yellow-text.text-lighten-2 {\n  color: #fff176 !important;\n}\n\n.yellow.lighten-1 {\n  background-color: #ffee58 !important;\n}\n\n.yellow-text.text-lighten-1 {\n  color: #ffee58 !important;\n}\n\n.yellow.darken-1 {\n  background-color: #fdd835 !important;\n}\n\n.yellow-text.text-darken-1 {\n  color: #fdd835 !important;\n}\n\n.yellow.darken-2 {\n  background-color: #fbc02d !important;\n}\n\n.yellow-text.text-darken-2 {\n  color: #fbc02d !important;\n}\n\n.yellow.darken-3 {\n  background-color: #f9a825 !important;\n}\n\n.yellow-text.text-darken-3 {\n  color: #f9a825 !important;\n}\n\n.yellow.darken-4 {\n  background-color: #f57f17 !important;\n}\n\n.yellow-text.text-darken-4 {\n  color: #f57f17 !important;\n}\n\n.yellow.accent-1 {\n  background-color: #ffff8d !important;\n}\n\n.yellow-text.text-accent-1 {\n  color: #ffff8d !important;\n}\n\n.yellow.accent-2 {\n  background-color: #ffff00 !important;\n}\n\n.yellow-text.text-accent-2 {\n  color: #ffff00 !important;\n}\n\n.yellow.accent-3 {\n  background-color: #ffea00 !important;\n}\n\n.yellow-text.text-accent-3 {\n  color: #ffea00 !important;\n}\n\n.yellow.accent-4 {\n  background-color: #ffd600 !important;\n}\n\n.yellow-text.text-accent-4 {\n  color: #ffd600 !important;\n}\n\n.amber {\n  background-color: #ffc107 !important;\n}\n\n.amber-text {\n  color: #ffc107 !important;\n}\n\n.amber.lighten-5 {\n  background-color: #fff8e1 !important;\n}\n\n.amber-text.text-lighten-5 {\n  color: #fff8e1 !important;\n}\n\n.amber.lighten-4 {\n  background-color: #ffecb3 !important;\n}\n\n.amber-text.text-lighten-4 {\n  color: #ffecb3 !important;\n}\n\n.amber.lighten-3 {\n  background-color: #ffe082 !important;\n}\n\n.amber-text.text-lighten-3 {\n  color: #ffe082 !important;\n}\n\n.amber.lighten-2 {\n  background-color: #ffd54f !important;\n}\n\n.amber-text.text-lighten-2 {\n  color: #ffd54f !important;\n}\n\n.amber.lighten-1 {\n  background-color: #ffca28 !important;\n}\n\n.amber-text.text-lighten-1 {\n  color: #ffca28 !important;\n}\n\n.amber.darken-1 {\n  background-color: #ffb300 !important;\n}\n\n.amber-text.text-darken-1 {\n  color: #ffb300 !important;\n}\n\n.amber.darken-2 {\n  background-color: #ffa000 !important;\n}\n\n.amber-text.text-darken-2 {\n  color: #ffa000 !important;\n}\n\n.amber.darken-3 {\n  background-color: #ff8f00 !important;\n}\n\n.amber-text.text-darken-3 {\n  color: #ff8f00 !important;\n}\n\n.amber.darken-4 {\n  background-color: #ff6f00 !important;\n}\n\n.amber-text.text-darken-4 {\n  color: #ff6f00 !important;\n}\n\n.amber.accent-1 {\n  background-color: #ffe57f !important;\n}\n\n.amber-text.text-accent-1 {\n  color: #ffe57f !important;\n}\n\n.amber.accent-2 {\n  background-color: #ffd740 !important;\n}\n\n.amber-text.text-accent-2 {\n  color: #ffd740 !important;\n}\n\n.amber.accent-3 {\n  background-color: #ffc400 !important;\n}\n\n.amber-text.text-accent-3 {\n  color: #ffc400 !important;\n}\n\n.amber.accent-4 {\n  background-color: #ffab00 !important;\n}\n\n.amber-text.text-accent-4 {\n  color: #ffab00 !important;\n}\n\n.orange {\n  background-color: #ff9800 !important;\n}\n\n.orange-text {\n  color: #ff9800 !important;\n}\n\n.orange.lighten-5 {\n  background-color: #fff3e0 !important;\n}\n\n.orange-text.text-lighten-5 {\n  color: #fff3e0 !important;\n}\n\n.orange.lighten-4 {\n  background-color: #ffe0b2 !important;\n}\n\n.orange-text.text-lighten-4 {\n  color: #ffe0b2 !important;\n}\n\n.orange.lighten-3 {\n  background-color: #ffcc80 !important;\n}\n\n.orange-text.text-lighten-3 {\n  color: #ffcc80 !important;\n}\n\n.orange.lighten-2 {\n  background-color: #ffb74d !important;\n}\n\n.orange-text.text-lighten-2 {\n  color: #ffb74d !important;\n}\n\n.orange.lighten-1 {\n  background-color: #ffa726 !important;\n}\n\n.orange-text.text-lighten-1 {\n  color: #ffa726 !important;\n}\n\n.orange.darken-1 {\n  background-color: #fb8c00 !important;\n}\n\n.orange-text.text-darken-1 {\n  color: #fb8c00 !important;\n}\n\n.orange.darken-2 {\n  background-color: #f57c00 !important;\n}\n\n.orange-text.text-darken-2 {\n  color: #f57c00 !important;\n}\n\n.orange.darken-3 {\n  background-color: #ef6c00 !important;\n}\n\n.orange-text.text-darken-3 {\n  color: #ef6c00 !important;\n}\n\n.orange.darken-4 {\n  background-color: #e65100 !important;\n}\n\n.orange-text.text-darken-4 {\n  color: #e65100 !important;\n}\n\n.orange.accent-1 {\n  background-color: #ffd180 !important;\n}\n\n.orange-text.text-accent-1 {\n  color: #ffd180 !important;\n}\n\n.orange.accent-2 {\n  background-color: #ffab40 !important;\n}\n\n.orange-text.text-accent-2 {\n  color: #ffab40 !important;\n}\n\n.orange.accent-3 {\n  background-color: #ff9100 !important;\n}\n\n.orange-text.text-accent-3 {\n  color: #ff9100 !important;\n}\n\n.orange.accent-4 {\n  background-color: #ff6d00 !important;\n}\n\n.orange-text.text-accent-4 {\n  color: #ff6d00 !important;\n}\n\n.deep-orange {\n  background-color: #ff5722 !important;\n}\n\n.deep-orange-text {\n  color: #ff5722 !important;\n}\n\n.deep-orange.lighten-5 {\n  background-color: #fbe9e7 !important;\n}\n\n.deep-orange-text.text-lighten-5 {\n  color: #fbe9e7 !important;\n}\n\n.deep-orange.lighten-4 {\n  background-color: #ffccbc !important;\n}\n\n.deep-orange-text.text-lighten-4 {\n  color: #ffccbc !important;\n}\n\n.deep-orange.lighten-3 {\n  background-color: #ffab91 !important;\n}\n\n.deep-orange-text.text-lighten-3 {\n  color: #ffab91 !important;\n}\n\n.deep-orange.lighten-2 {\n  background-color: #ff8a65 !important;\n}\n\n.deep-orange-text.text-lighten-2 {\n  color: #ff8a65 !important;\n}\n\n.deep-orange.lighten-1 {\n  background-color: #ff7043 !important;\n}\n\n.deep-orange-text.text-lighten-1 {\n  color: #ff7043 !important;\n}\n\n.deep-orange.darken-1 {\n  background-color: #f4511e !important;\n}\n\n.deep-orange-text.text-darken-1 {\n  color: #f4511e !important;\n}\n\n.deep-orange.darken-2 {\n  background-color: #e64a19 !important;\n}\n\n.deep-orange-text.text-darken-2 {\n  color: #e64a19 !important;\n}\n\n.deep-orange.darken-3 {\n  background-color: #d84315 !important;\n}\n\n.deep-orange-text.text-darken-3 {\n  color: #d84315 !important;\n}\n\n.deep-orange.darken-4 {\n  background-color: #bf360c !important;\n}\n\n.deep-orange-text.text-darken-4 {\n  color: #bf360c !important;\n}\n\n.deep-orange.accent-1 {\n  background-color: #ff9e80 !important;\n}\n\n.deep-orange-text.text-accent-1 {\n  color: #ff9e80 !important;\n}\n\n.deep-orange.accent-2 {\n  background-color: #ff6e40 !important;\n}\n\n.deep-orange-text.text-accent-2 {\n  color: #ff6e40 !important;\n}\n\n.deep-orange.accent-3 {\n  background-color: #ff3d00 !important;\n}\n\n.deep-orange-text.text-accent-3 {\n  color: #ff3d00 !important;\n}\n\n.deep-orange.accent-4 {\n  background-color: #dd2c00 !important;\n}\n\n.deep-orange-text.text-accent-4 {\n  color: #dd2c00 !important;\n}\n\n.brown {\n  background-color: #795548 !important;\n}\n\n.brown-text {\n  color: #795548 !important;\n}\n\n.brown.lighten-5 {\n  background-color: #efebe9 !important;\n}\n\n.brown-text.text-lighten-5 {\n  color: #efebe9 !important;\n}\n\n.brown.lighten-4 {\n  background-color: #d7ccc8 !important;\n}\n\n.brown-text.text-lighten-4 {\n  color: #d7ccc8 !important;\n}\n\n.brown.lighten-3 {\n  background-color: #bcaaa4 !important;\n}\n\n.brown-text.text-lighten-3 {\n  color: #bcaaa4 !important;\n}\n\n.brown.lighten-2 {\n  background-color: #a1887f !important;\n}\n\n.brown-text.text-lighten-2 {\n  color: #a1887f !important;\n}\n\n.brown.lighten-1 {\n  background-color: #8d6e63 !important;\n}\n\n.brown-text.text-lighten-1 {\n  color: #8d6e63 !important;\n}\n\n.brown.darken-1 {\n  background-color: #6d4c41 !important;\n}\n\n.brown-text.text-darken-1 {\n  color: #6d4c41 !important;\n}\n\n.brown.darken-2 {\n  background-color: #5d4037 !important;\n}\n\n.brown-text.text-darken-2 {\n  color: #5d4037 !important;\n}\n\n.brown.darken-3 {\n  background-color: #4e342e !important;\n}\n\n.brown-text.text-darken-3 {\n  color: #4e342e !important;\n}\n\n.brown.darken-4 {\n  background-color: #3e2723 !important;\n}\n\n.brown-text.text-darken-4 {\n  color: #3e2723 !important;\n}\n\n.blue-grey {\n  background-color: #607d8b !important;\n}\n\n.blue-grey-text {\n  color: #607d8b !important;\n}\n\n.blue-grey.lighten-5 {\n  background-color: #eceff1 !important;\n}\n\n.blue-grey-text.text-lighten-5 {\n  color: #eceff1 !important;\n}\n\n.blue-grey.lighten-4 {\n  background-color: #cfd8dc !important;\n}\n\n.blue-grey-text.text-lighten-4 {\n  color: #cfd8dc !important;\n}\n\n.blue-grey.lighten-3 {\n  background-color: #b0bec5 !important;\n}\n\n.blue-grey-text.text-lighten-3 {\n  color: #b0bec5 !important;\n}\n\n.blue-grey.lighten-2 {\n  background-color: #90a4ae !important;\n}\n\n.blue-grey-text.text-lighten-2 {\n  color: #90a4ae !important;\n}\n\n.blue-grey.lighten-1 {\n  background-color: #78909c !important;\n}\n\n.blue-grey-text.text-lighten-1 {\n  color: #78909c !important;\n}\n\n.blue-grey.darken-1 {\n  background-color: #546e7a !important;\n}\n\n.blue-grey-text.text-darken-1 {\n  color: #546e7a !important;\n}\n\n.blue-grey.darken-2 {\n  background-color: #455a64 !important;\n}\n\n.blue-grey-text.text-darken-2 {\n  color: #455a64 !important;\n}\n\n.blue-grey.darken-3 {\n  background-color: #37474f !important;\n}\n\n.blue-grey-text.text-darken-3 {\n  color: #37474f !important;\n}\n\n.blue-grey.darken-4 {\n  background-color: #263238 !important;\n}\n\n.blue-grey-text.text-darken-4 {\n  color: #263238 !important;\n}\n\n.grey {\n  background-color: #9e9e9e !important;\n}\n\n.grey-text {\n  color: #9e9e9e !important;\n}\n\n.grey.lighten-5 {\n  background-color: #fafafa !important;\n}\n\n.grey-text.text-lighten-5 {\n  color: #fafafa !important;\n}\n\n.grey.lighten-4 {\n  background-color: #f5f5f5 !important;\n}\n\n.grey-text.text-lighten-4 {\n  color: #f5f5f5 !important;\n}\n\n.grey.lighten-3 {\n  background-color: #eeeeee !important;\n}\n\n.grey-text.text-lighten-3 {\n  color: #eeeeee !important;\n}\n\n.grey.lighten-2 {\n  background-color: #e0e0e0 !important;\n}\n\n.grey-text.text-lighten-2 {\n  color: #e0e0e0 !important;\n}\n\n.grey.lighten-1 {\n  background-color: #bdbdbd !important;\n}\n\n.grey-text.text-lighten-1 {\n  color: #bdbdbd !important;\n}\n\n.grey.darken-1 {\n  background-color: #757575 !important;\n}\n\n.grey-text.text-darken-1 {\n  color: #757575 !important;\n}\n\n.grey.darken-2 {\n  background-color: #616161 !important;\n}\n\n.grey-text.text-darken-2 {\n  color: #616161 !important;\n}\n\n.grey.darken-3 {\n  background-color: #424242 !important;\n}\n\n.grey-text.text-darken-3 {\n  color: #424242 !important;\n}\n\n.grey.darken-4 {\n  background-color: #212121 !important;\n}\n\n.grey-text.text-darken-4 {\n  color: #212121 !important;\n}\n\n.black {\n  background-color: #000000 !important;\n}\n\n.black-text {\n  color: #000000 !important;\n}\n\n.white {\n  background-color: #FFFFFF !important;\n}\n\n.white-text {\n  color: #FFFFFF !important;\n}\n\n.transparent {\n  background-color: transparent !important;\n}\n\n.transparent-text {\n  color: transparent !important;\n}\n\n/*! normalize.css v7.0.0 | MIT License | github.com/necolas/normalize.css */\n/* Document\n   ========================================================================== */\n/**\n * 1. Correct the line height in all browsers.\n * 2. Prevent adjustments of font size after orientation changes in\n *    IE on Windows Phone and in iOS.\n */\nhtml {\n  line-height: 1.15;\n  /* 1 */\n  -ms-text-size-adjust: 100%;\n  /* 2 */\n  -webkit-text-size-adjust: 100%;\n  /* 2 */\n}\n\n/* Sections\n   ========================================================================== */\n/**\n * Remove the margin in all browsers (opinionated).\n */\nbody {\n  margin: 0;\n}\n\n/**\n * Add the correct display in IE 9-.\n */\narticle,\naside,\nfooter,\nheader,\nnav,\nsection {\n  display: block;\n}\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/* Grouping content\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n * 1. Add the correct display in IE.\n */\nfigcaption,\nfigure,\nmain {\n  /* 1 */\n  display: block;\n}\n\n/**\n * Add the correct margin in IE 8.\n */\nfigure {\n  margin: 1em 40px;\n}\n\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\nhr {\n  -webkit-box-sizing: content-box;\n          box-sizing: content-box;\n  /* 1 */\n  height: 0;\n  /* 1 */\n  overflow: visible;\n  /* 2 */\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\npre {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */\n}\n\n/* Text-level semantics\n   ========================================================================== */\n/**\n * 1. Remove the gray background on active links in IE 10.\n * 2. Remove gaps in links underline in iOS 8+ and Safari 8+.\n */\na {\n  background-color: transparent;\n  /* 1 */\n  -webkit-text-decoration-skip: objects;\n  /* 2 */\n}\n\n/**\n * 1. Remove the bottom border in Chrome 57- and Firefox 39-.\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\nabbr[title] {\n  border-bottom: none;\n  /* 1 */\n  text-decoration: underline;\n  /* 2 */\n  -webkit-text-decoration: underline dotted;\n     -moz-text-decoration: underline dotted;\n          text-decoration: underline dotted;\n  /* 2 */\n}\n\n/**\n * Prevent the duplicate application of `bolder` by the next rule in Safari 6.\n */\nb,\nstrong {\n  font-weight: inherit;\n}\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */\n}\n\n/**\n * Add the correct font style in Android 4.3-.\n */\ndfn {\n  font-style: italic;\n}\n\n/**\n * Add the correct background and color in IE 9-.\n */\nmark {\n  background-color: #ff0;\n  color: #000;\n}\n\n/**\n * Add the correct font size in all browsers.\n */\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/* Embedded content\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n */\naudio,\nvideo {\n  display: inline-block;\n}\n\n/**\n * Add the correct display in iOS 4-7.\n */\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n\n/**\n * Remove the border on images inside links in IE 10-.\n */\nimg {\n  border-style: none;\n}\n\n/**\n * Hide the overflow in IE.\n */\nsvg:not(:root) {\n  overflow: hidden;\n}\n\n/* Forms\n   ========================================================================== */\n/**\n * 1. Change the font styles in all browsers (opinionated).\n * 2. Remove the margin in Firefox and Safari.\n */\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: sans-serif;\n  /* 1 */\n  font-size: 100%;\n  /* 1 */\n  line-height: 1.15;\n  /* 1 */\n  margin: 0;\n  /* 2 */\n}\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\nbutton,\ninput {\n  /* 1 */\n  overflow: visible;\n}\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\nbutton,\nselect {\n  /* 1 */\n  text-transform: none;\n}\n\n/**\n * 1. Prevent a WebKit bug where (2) destroys native `audio` and `video`\n *    controls in Android 4.\n * 2. Correct the inability to style clickable types in iOS and Safari.\n */\nbutton,\nhtml [type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button;\n  /* 2 */\n}\n\n/**\n * Remove the inner border and padding in Firefox.\n */\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\n/**\n * Correct the padding in Firefox.\n */\nfieldset {\n  padding: 0.35em 0.75em 0.625em;\n}\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\nlegend {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  /* 1 */\n  color: inherit;\n  /* 2 */\n  display: table;\n  /* 1 */\n  max-width: 100%;\n  /* 1 */\n  padding: 0;\n  /* 3 */\n  white-space: normal;\n  /* 1 */\n}\n\n/**\n * 1. Add the correct display in IE 9-.\n * 2. Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\nprogress {\n  display: inline-block;\n  /* 1 */\n  vertical-align: baseline;\n  /* 2 */\n}\n\n/**\n * Remove the default vertical scrollbar in IE.\n */\ntextarea {\n  overflow: auto;\n}\n\n/**\n * 1. Add the correct box sizing in IE 10-.\n * 2. Remove the padding in IE 10-.\n */\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  /* 1 */\n  padding: 0;\n  /* 2 */\n}\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n[type=\"search\"] {\n  -webkit-appearance: textfield;\n  /* 1 */\n  outline-offset: -2px;\n  /* 2 */\n}\n\n/**\n * Remove the inner padding and cancel buttons in Chrome and Safari on macOS.\n */\n[type=\"search\"]::-webkit-search-cancel-button,\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n::-webkit-file-upload-button {\n  -webkit-appearance: button;\n  /* 1 */\n  font: inherit;\n  /* 2 */\n}\n\n/* Interactive\n   ========================================================================== */\n/*\n * Add the correct display in IE 9-.\n * 1. Add the correct display in Edge, IE, and Firefox.\n */\ndetails,\nmenu {\n  display: block;\n}\n\n/*\n * Add the correct display in all browsers.\n */\nsummary {\n  display: list-item;\n}\n\n/* Scripting\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n */\ncanvas {\n  display: inline-block;\n}\n\n/**\n * Add the correct display in IE.\n */\ntemplate {\n  display: none;\n}\n\n/* Hidden\n   ========================================================================== */\n/**\n * Add the correct display in IE 10-.\n */\n[hidden] {\n  display: none;\n}\n\nhtml {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n}\n\n*, *:before, *:after {\n  -webkit-box-sizing: inherit;\n          box-sizing: inherit;\n}\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen-Sans, Ubuntu, Cantarell, \"Helvetica Neue\", sans-serif;\n}\n\nul:not(.browser-default) {\n  padding-left: 0;\n  list-style-type: none;\n}\n\nul:not(.browser-default) > li {\n  list-style-type: none;\n}\n\na {\n  color: #039be5;\n  text-decoration: none;\n  -webkit-tap-highlight-color: transparent;\n}\n\n.valign-wrapper {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n\n.clearfix {\n  clear: both;\n}\n\n.z-depth-0 {\n  -webkit-box-shadow: none !important;\n          box-shadow: none !important;\n}\n\n/* 2dp elevation modified*/\n.z-depth-1, nav, .card-panel, .card, .toast, .btn, .btn-large, .btn-small, .btn-floating, .dropdown-content, .collapsible, .sidenav {\n  -webkit-box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);\n          box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);\n}\n\n.z-depth-1-half, .btn:hover, .btn-large:hover, .btn-small:hover, .btn-floating:hover {\n  -webkit-box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.14), 0 1px 7px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -1px rgba(0, 0, 0, 0.2);\n          box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.14), 0 1px 7px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -1px rgba(0, 0, 0, 0.2);\n}\n\n/* 6dp elevation modified*/\n.z-depth-2 {\n  -webkit-box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.3);\n          box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.3);\n}\n\n/* 12dp elevation modified*/\n.z-depth-3 {\n  -webkit-box-shadow: 0 8px 17px 2px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2);\n          box-shadow: 0 8px 17px 2px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2);\n}\n\n/* 16dp elevation */\n.z-depth-4 {\n  -webkit-box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -7px rgba(0, 0, 0, 0.2);\n          box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -7px rgba(0, 0, 0, 0.2);\n}\n\n/* 24dp elevation */\n.z-depth-5, .modal {\n  -webkit-box-shadow: 0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12), 0 11px 15px -7px rgba(0, 0, 0, 0.2);\n          box-shadow: 0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12), 0 11px 15px -7px rgba(0, 0, 0, 0.2);\n}\n\n.hoverable {\n  -webkit-transition: -webkit-box-shadow .25s;\n  transition: -webkit-box-shadow .25s;\n  transition: box-shadow .25s;\n  transition: box-shadow .25s, -webkit-box-shadow .25s;\n}\n\n.hoverable:hover {\n  -webkit-box-shadow: 0 8px 17px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);\n          box-shadow: 0 8px 17px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);\n}\n\n.divider {\n  height: 1px;\n  overflow: hidden;\n  background-color: #e0e0e0;\n}\n\nblockquote {\n  margin: 20px 0;\n  padding-left: 1.5rem;\n  border-left: 5px solid #ee6e73;\n}\n\ni {\n  line-height: inherit;\n}\n\ni.left {\n  float: left;\n  margin-right: 15px;\n}\n\ni.right {\n  float: right;\n  margin-left: 15px;\n}\n\ni.tiny {\n  font-size: 1rem;\n}\n\ni.small {\n  font-size: 2rem;\n}\n\ni.medium {\n  font-size: 4rem;\n}\n\ni.large {\n  font-size: 6rem;\n}\n\nimg.responsive-img,\nvideo.responsive-video {\n  max-width: 100%;\n  height: auto;\n}\n\n.pagination li {\n  display: inline-block;\n  border-radius: 2px;\n  text-align: center;\n  vertical-align: top;\n  height: 30px;\n}\n\n.pagination li a {\n  color: #444;\n  display: inline-block;\n  font-size: 1.2rem;\n  padding: 0 10px;\n  line-height: 30px;\n}\n\n.pagination li.active a {\n  color: #fff;\n}\n\n.pagination li.active {\n  background-color: #ee6e73;\n}\n\n.pagination li.disabled a {\n  cursor: default;\n  color: #999;\n}\n\n.pagination li i {\n  font-size: 2rem;\n}\n\n.pagination li.pages ul li {\n  display: inline-block;\n  float: none;\n}\n\n@media only screen and (max-width: 992px) {\n  .pagination {\n    width: 100%;\n  }\n  .pagination li.prev,\n  .pagination li.next {\n    width: 10%;\n  }\n  .pagination li.pages {\n    width: 80%;\n    overflow: hidden;\n    white-space: nowrap;\n  }\n}\n\n.breadcrumb {\n  font-size: 18px;\n  color: rgba(255, 255, 255, 0.7);\n}\n\n.breadcrumb i,\n.breadcrumb [class^=\"mdi-\"], .breadcrumb [class*=\"mdi-\"],\n.breadcrumb i.material-icons {\n  display: inline-block;\n  float: left;\n  font-size: 24px;\n}\n\n.breadcrumb:before {\n  content: '\\E5CC';\n  color: rgba(255, 255, 255, 0.7);\n  vertical-align: top;\n  display: inline-block;\n  font-family: 'Material Icons';\n  font-weight: normal;\n  font-style: normal;\n  font-size: 25px;\n  margin: 0 10px 0 8px;\n  -webkit-font-smoothing: antialiased;\n}\n\n.breadcrumb:first-child:before {\n  display: none;\n}\n\n.breadcrumb:last-child {\n  color: #fff;\n}\n\n.parallax-container {\n  position: relative;\n  overflow: hidden;\n  height: 500px;\n}\n\n.parallax-container .parallax {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  z-index: -1;\n}\n\n.parallax-container .parallax img {\n  opacity: 0;\n  position: absolute;\n  left: 50%;\n  bottom: 0;\n  min-width: 100%;\n  min-height: 100%;\n  -webkit-transform: translate3d(0, 0, 0);\n          transform: translate3d(0, 0, 0);\n  -webkit-transform: translateX(-50%);\n          transform: translateX(-50%);\n}\n\n.pin-top, .pin-bottom {\n  position: relative;\n}\n\n.pinned {\n  position: fixed !important;\n}\n\n/*********************\n  Transition Classes\n**********************/\nul.staggered-list li {\n  opacity: 0;\n}\n\n.fade-in {\n  opacity: 0;\n  -webkit-transform-origin: 0 50%;\n          transform-origin: 0 50%;\n}\n\n/*********************\n  Media Query Classes\n**********************/\n@media only screen and (max-width: 600px) {\n  .hide-on-small-only, .hide-on-small-and-down {\n    display: none !important;\n  }\n}\n\n@media only screen and (max-width: 992px) {\n  .hide-on-med-and-down {\n    display: none !important;\n  }\n}\n\n@media only screen and (min-width: 601px) {\n  .hide-on-med-and-up {\n    display: none !important;\n  }\n}\n\n@media only screen and (min-width: 600px) and (max-width: 992px) {\n  .hide-on-med-only {\n    display: none !important;\n  }\n}\n\n@media only screen and (min-width: 993px) {\n  .hide-on-large-only {\n    display: none !important;\n  }\n}\n\n@media only screen and (min-width: 1201px) {\n  .hide-on-extra-large-only {\n    display: none !important;\n  }\n}\n\n@media only screen and (min-width: 1201px) {\n  .show-on-extra-large {\n    display: block !important;\n  }\n}\n\n@media only screen and (min-width: 993px) {\n  .show-on-large {\n    display: block !important;\n  }\n}\n\n@media only screen and (min-width: 600px) and (max-width: 992px) {\n  .show-on-medium {\n    display: block !important;\n  }\n}\n\n@media only screen and (max-width: 600px) {\n  .show-on-small {\n    display: block !important;\n  }\n}\n\n@media only screen and (min-width: 601px) {\n  .show-on-medium-and-up {\n    display: block !important;\n  }\n}\n\n@media only screen and (max-width: 992px) {\n  .show-on-medium-and-down {\n    display: block !important;\n  }\n}\n\n@media only screen and (max-width: 600px) {\n  .center-on-small-only {\n    text-align: center;\n  }\n}\n\n.page-footer {\n  padding-top: 20px;\n  color: #fff;\n  background-color: #ee6e73;\n}\n\n.page-footer .footer-copyright {\n  overflow: hidden;\n  min-height: 50px;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: justify;\n  -webkit-justify-content: space-between;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  padding: 10px 0px;\n  color: rgba(255, 255, 255, 0.8);\n  background-color: rgba(51, 51, 51, 0.08);\n}\n\ntable, th, td {\n  border: none;\n}\n\ntable {\n  width: 100%;\n  display: table;\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n\ntable.striped tr {\n  border-bottom: none;\n}\n\ntable.striped > tbody > tr:nth-child(odd) {\n  background-color: rgba(242, 242, 242, 0.5);\n}\n\ntable.striped > tbody > tr > td {\n  border-radius: 0;\n}\n\ntable.highlight > tbody > tr {\n  -webkit-transition: background-color .25s ease;\n  transition: background-color .25s ease;\n}\n\ntable.highlight > tbody > tr:hover {\n  background-color: rgba(242, 242, 242, 0.5);\n}\n\ntable.centered thead tr th, table.centered tbody tr td {\n  text-align: center;\n}\n\ntr {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.12);\n}\n\ntd, th {\n  padding: 15px 5px;\n  display: table-cell;\n  text-align: left;\n  vertical-align: middle;\n  border-radius: 2px;\n}\n\n@media only screen and (max-width: 992px) {\n  table.responsive-table {\n    width: 100%;\n    border-collapse: collapse;\n    border-spacing: 0;\n    display: block;\n    position: relative;\n    /* sort out borders */\n  }\n  table.responsive-table td:empty:before {\n    content: '\\A0';\n  }\n  table.responsive-table th,\n  table.responsive-table td {\n    margin: 0;\n    vertical-align: top;\n  }\n  table.responsive-table th {\n    text-align: left;\n  }\n  table.responsive-table thead {\n    display: block;\n    float: left;\n  }\n  table.responsive-table thead tr {\n    display: block;\n    padding: 0 10px 0 0;\n  }\n  table.responsive-table thead tr th::before {\n    content: \"\\A0\";\n  }\n  table.responsive-table tbody {\n    display: block;\n    width: auto;\n    position: relative;\n    overflow-x: auto;\n    white-space: nowrap;\n  }\n  table.responsive-table tbody tr {\n    display: inline-block;\n    vertical-align: top;\n  }\n  table.responsive-table th {\n    display: block;\n    text-align: right;\n  }\n  table.responsive-table td {\n    display: block;\n    min-height: 1.25em;\n    text-align: left;\n  }\n  table.responsive-table tr {\n    border-bottom: none;\n    padding: 0 10px;\n  }\n  table.responsive-table thead {\n    border: 0;\n    border-right: 1px solid rgba(0, 0, 0, 0.12);\n  }\n}\n\n.collection {\n  margin: 0.5rem 0 1rem 0;\n  border: 1px solid #e0e0e0;\n  border-radius: 2px;\n  overflow: hidden;\n  position: relative;\n}\n\n.collection .collection-item {\n  background-color: #fff;\n  line-height: 1.5rem;\n  padding: 10px 20px;\n  margin: 0;\n  border-bottom: 1px solid #e0e0e0;\n}\n\n.collection .collection-item.avatar {\n  min-height: 84px;\n  padding-left: 72px;\n  position: relative;\n}\n\n.collection .collection-item.avatar:not(.circle-clipper) > .circle,\n.collection .collection-item.avatar :not(.circle-clipper) > .circle {\n  position: absolute;\n  width: 42px;\n  height: 42px;\n  overflow: hidden;\n  left: 15px;\n  display: inline-block;\n  vertical-align: middle;\n}\n\n.collection .collection-item.avatar i.circle {\n  font-size: 18px;\n  line-height: 42px;\n  color: #fff;\n  background-color: #999;\n  text-align: center;\n}\n\n.collection .collection-item.avatar .title {\n  font-size: 16px;\n}\n\n.collection .collection-item.avatar p {\n  margin: 0;\n}\n\n.collection .collection-item.avatar .secondary-content {\n  position: absolute;\n  top: 16px;\n  right: 16px;\n}\n\n.collection .collection-item:last-child {\n  border-bottom: none;\n}\n\n.collection .collection-item.active {\n  background-color: #26a69a;\n  color: #eafaf9;\n}\n\n.collection .collection-item.active .secondary-content {\n  color: #fff;\n}\n\n.collection a.collection-item {\n  display: block;\n  -webkit-transition: .25s;\n  transition: .25s;\n  color: #26a69a;\n}\n\n.collection a.collection-item:not(.active):hover {\n  background-color: #ddd;\n}\n\n.collection.with-header .collection-header {\n  background-color: #fff;\n  border-bottom: 1px solid #e0e0e0;\n  padding: 10px 20px;\n}\n\n.collection.with-header .collection-item {\n  padding-left: 30px;\n}\n\n.collection.with-header .collection-item.avatar {\n  padding-left: 72px;\n}\n\n.secondary-content {\n  float: right;\n  color: #26a69a;\n}\n\n.collapsible .collection {\n  margin: 0;\n  border: none;\n}\n\n.video-container {\n  position: relative;\n  padding-bottom: 56.25%;\n  height: 0;\n  overflow: hidden;\n}\n\n.video-container iframe, .video-container object, .video-container embed {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n}\n\n.progress {\n  position: relative;\n  height: 4px;\n  display: block;\n  width: 100%;\n  background-color: #acece6;\n  border-radius: 2px;\n  margin: 0.5rem 0 1rem 0;\n  overflow: hidden;\n}\n\n.progress .determinate {\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  background-color: #26a69a;\n  -webkit-transition: width .3s linear;\n  transition: width .3s linear;\n}\n\n.progress .indeterminate {\n  background-color: #26a69a;\n}\n\n.progress .indeterminate:before {\n  content: '';\n  position: absolute;\n  background-color: inherit;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  will-change: left, right;\n  -webkit-animation: indeterminate 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;\n          animation: indeterminate 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;\n}\n\n.progress .indeterminate:after {\n  content: '';\n  position: absolute;\n  background-color: inherit;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  will-change: left, right;\n  -webkit-animation: indeterminate-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;\n          animation: indeterminate-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;\n  -webkit-animation-delay: 1.15s;\n          animation-delay: 1.15s;\n}\n\n@-webkit-keyframes indeterminate {\n  0% {\n    left: -35%;\n    right: 100%;\n  }\n  60% {\n    left: 100%;\n    right: -90%;\n  }\n  100% {\n    left: 100%;\n    right: -90%;\n  }\n}\n\n@keyframes indeterminate {\n  0% {\n    left: -35%;\n    right: 100%;\n  }\n  60% {\n    left: 100%;\n    right: -90%;\n  }\n  100% {\n    left: 100%;\n    right: -90%;\n  }\n}\n\n@-webkit-keyframes indeterminate-short {\n  0% {\n    left: -200%;\n    right: 100%;\n  }\n  60% {\n    left: 107%;\n    right: -8%;\n  }\n  100% {\n    left: 107%;\n    right: -8%;\n  }\n}\n\n@keyframes indeterminate-short {\n  0% {\n    left: -200%;\n    right: 100%;\n  }\n  60% {\n    left: 107%;\n    right: -8%;\n  }\n  100% {\n    left: 107%;\n    right: -8%;\n  }\n}\n\n/*******************\n  Utility Classes\n*******************/\n.hide {\n  display: none !important;\n}\n\n.left-align {\n  text-align: left;\n}\n\n.right-align {\n  text-align: right;\n}\n\n.center, .center-align {\n  text-align: center;\n}\n\n.left {\n  float: left !important;\n}\n\n.right {\n  float: right !important;\n}\n\n.no-select, input[type=range],\ninput[type=range] + .thumb {\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n\n.circle {\n  border-radius: 50%;\n}\n\n.center-block {\n  display: block;\n  margin-left: auto;\n  margin-right: auto;\n}\n\n.truncate {\n  display: block;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.no-padding {\n  padding: 0 !important;\n}\n\nspan.badge {\n  min-width: 3rem;\n  padding: 0 6px;\n  margin-left: 14px;\n  text-align: center;\n  font-size: 1rem;\n  line-height: 22px;\n  height: 22px;\n  color: #757575;\n  float: right;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n}\n\nspan.badge.new {\n  font-weight: 300;\n  font-size: 0.8rem;\n  color: #fff;\n  background-color: #26a69a;\n  border-radius: 2px;\n}\n\nspan.badge.new:after {\n  content: \" new\";\n}\n\nspan.badge[data-badge-caption]::after {\n  content: \" \" attr(data-badge-caption);\n}\n\nnav ul a span.badge {\n  display: inline-block;\n  float: none;\n  margin-left: 4px;\n  line-height: 22px;\n  height: 22px;\n  -webkit-font-smoothing: auto;\n}\n\n.collection-item span.badge {\n  margin-top: calc(0.75rem - 11px);\n}\n\n.collapsible span.badge {\n  margin-left: auto;\n}\n\n.sidenav span.badge {\n  margin-top: calc(24px - 11px);\n}\n\ntable span.badge {\n  display: inline-block;\n  float: none;\n  margin-left: auto;\n}\n\n/* This is needed for some mobile phones to display the Google Icon font properly */\n.material-icons {\n  text-rendering: optimizeLegibility;\n  -webkit-font-feature-settings: 'liga';\n     -moz-font-feature-settings: 'liga';\n          font-feature-settings: 'liga';\n}\n\n.container {\n  margin: 0 auto;\n  max-width: 1280px;\n  width: 90%;\n}\n\n@media only screen and (min-width: 601px) {\n  .container {\n    width: 85%;\n  }\n}\n\n@media only screen and (min-width: 993px) {\n  .container {\n    width: 70%;\n  }\n}\n\n.col .row {\n  margin-left: -0.75rem;\n  margin-right: -0.75rem;\n}\n\n.section {\n  padding-top: 1rem;\n  padding-bottom: 1rem;\n}\n\n.section.no-pad {\n  padding: 0;\n}\n\n.section.no-pad-bot {\n  padding-bottom: 0;\n}\n\n.section.no-pad-top {\n  padding-top: 0;\n}\n\n.row {\n  margin-left: auto;\n  margin-right: auto;\n  margin-bottom: 20px;\n}\n\n.row:after {\n  content: \"\";\n  display: table;\n  clear: both;\n}\n\n.row .col {\n  float: left;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  padding: 0 0.75rem;\n  min-height: 1px;\n}\n\n.row .col[class*=\"push-\"], .row .col[class*=\"pull-\"] {\n  position: relative;\n}\n\n.row .col.s1 {\n  width: 8.3333333333%;\n  margin-left: auto;\n  left: auto;\n  right: auto;\n}\n\n.row .col.s2 {\n  width: 16.6666666667%;\n  margin-left: auto;\n  left: auto;\n  right: auto;\n}\n\n.row .col.s3 {\n  width: 25%;\n  margin-left: auto;\n  left: auto;\n  right: auto;\n}\n\n.row .col.s4 {\n  width: 33.3333333333%;\n  margin-left: auto;\n  left: auto;\n  right: auto;\n}\n\n.row .col.s5 {\n  width: 41.6666666667%;\n  margin-left: auto;\n  left: auto;\n  right: auto;\n}\n\n.row .col.s6 {\n  width: 50%;\n  margin-left: auto;\n  left: auto;\n  right: auto;\n}\n\n.row .col.s7 {\n  width: 58.3333333333%;\n  margin-left: auto;\n  left: auto;\n  right: auto;\n}\n\n.row .col.s8 {\n  width: 66.6666666667%;\n  margin-left: auto;\n  left: auto;\n  right: auto;\n}\n\n.row .col.s9 {\n  width: 75%;\n  margin-left: auto;\n  left: auto;\n  right: auto;\n}\n\n.row .col.s10 {\n  width: 83.3333333333%;\n  margin-left: auto;\n  left: auto;\n  right: auto;\n}\n\n.row .col.s11 {\n  width: 91.6666666667%;\n  margin-left: auto;\n  left: auto;\n  right: auto;\n}\n\n.row .col.s12 {\n  width: 100%;\n  margin-left: auto;\n  left: auto;\n  right: auto;\n}\n\n.row .col.offset-s1 {\n  margin-left: 8.3333333333%;\n}\n\n.row .col.pull-s1 {\n  right: 8.3333333333%;\n}\n\n.row .col.push-s1 {\n  left: 8.3333333333%;\n}\n\n.row .col.offset-s2 {\n  margin-left: 16.6666666667%;\n}\n\n.row .col.pull-s2 {\n  right: 16.6666666667%;\n}\n\n.row .col.push-s2 {\n  left: 16.6666666667%;\n}\n\n.row .col.offset-s3 {\n  margin-left: 25%;\n}\n\n.row .col.pull-s3 {\n  right: 25%;\n}\n\n.row .col.push-s3 {\n  left: 25%;\n}\n\n.row .col.offset-s4 {\n  margin-left: 33.3333333333%;\n}\n\n.row .col.pull-s4 {\n  right: 33.3333333333%;\n}\n\n.row .col.push-s4 {\n  left: 33.3333333333%;\n}\n\n.row .col.offset-s5 {\n  margin-left: 41.6666666667%;\n}\n\n.row .col.pull-s5 {\n  right: 41.6666666667%;\n}\n\n.row .col.push-s5 {\n  left: 41.6666666667%;\n}\n\n.row .col.offset-s6 {\n  margin-left: 50%;\n}\n\n.row .col.pull-s6 {\n  right: 50%;\n}\n\n.row .col.push-s6 {\n  left: 50%;\n}\n\n.row .col.offset-s7 {\n  margin-left: 58.3333333333%;\n}\n\n.row .col.pull-s7 {\n  right: 58.3333333333%;\n}\n\n.row .col.push-s7 {\n  left: 58.3333333333%;\n}\n\n.row .col.offset-s8 {\n  margin-left: 66.6666666667%;\n}\n\n.row .col.pull-s8 {\n  right: 66.6666666667%;\n}\n\n.row .col.push-s8 {\n  left: 66.6666666667%;\n}\n\n.row .col.offset-s9 {\n  margin-left: 75%;\n}\n\n.row .col.pull-s9 {\n  right: 75%;\n}\n\n.row .col.push-s9 {\n  left: 75%;\n}\n\n.row .col.offset-s10 {\n  margin-left: 83.3333333333%;\n}\n\n.row .col.pull-s10 {\n  right: 83.3333333333%;\n}\n\n.row .col.push-s10 {\n  left: 83.3333333333%;\n}\n\n.row .col.offset-s11 {\n  margin-left: 91.6666666667%;\n}\n\n.row .col.pull-s11 {\n  right: 91.6666666667%;\n}\n\n.row .col.push-s11 {\n  left: 91.6666666667%;\n}\n\n.row .col.offset-s12 {\n  margin-left: 100%;\n}\n\n.row .col.pull-s12 {\n  right: 100%;\n}\n\n.row .col.push-s12 {\n  left: 100%;\n}\n\n@media only screen and (min-width: 601px) {\n  .row .col.m1 {\n    width: 8.3333333333%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.m2 {\n    width: 16.6666666667%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.m3 {\n    width: 25%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.m4 {\n    width: 33.3333333333%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.m5 {\n    width: 41.6666666667%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.m6 {\n    width: 50%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.m7 {\n    width: 58.3333333333%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.m8 {\n    width: 66.6666666667%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.m9 {\n    width: 75%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.m10 {\n    width: 83.3333333333%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.m11 {\n    width: 91.6666666667%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.m12 {\n    width: 100%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.offset-m1 {\n    margin-left: 8.3333333333%;\n  }\n  .row .col.pull-m1 {\n    right: 8.3333333333%;\n  }\n  .row .col.push-m1 {\n    left: 8.3333333333%;\n  }\n  .row .col.offset-m2 {\n    margin-left: 16.6666666667%;\n  }\n  .row .col.pull-m2 {\n    right: 16.6666666667%;\n  }\n  .row .col.push-m2 {\n    left: 16.6666666667%;\n  }\n  .row .col.offset-m3 {\n    margin-left: 25%;\n  }\n  .row .col.pull-m3 {\n    right: 25%;\n  }\n  .row .col.push-m3 {\n    left: 25%;\n  }\n  .row .col.offset-m4 {\n    margin-left: 33.3333333333%;\n  }\n  .row .col.pull-m4 {\n    right: 33.3333333333%;\n  }\n  .row .col.push-m4 {\n    left: 33.3333333333%;\n  }\n  .row .col.offset-m5 {\n    margin-left: 41.6666666667%;\n  }\n  .row .col.pull-m5 {\n    right: 41.6666666667%;\n  }\n  .row .col.push-m5 {\n    left: 41.6666666667%;\n  }\n  .row .col.offset-m6 {\n    margin-left: 50%;\n  }\n  .row .col.pull-m6 {\n    right: 50%;\n  }\n  .row .col.push-m6 {\n    left: 50%;\n  }\n  .row .col.offset-m7 {\n    margin-left: 58.3333333333%;\n  }\n  .row .col.pull-m7 {\n    right: 58.3333333333%;\n  }\n  .row .col.push-m7 {\n    left: 58.3333333333%;\n  }\n  .row .col.offset-m8 {\n    margin-left: 66.6666666667%;\n  }\n  .row .col.pull-m8 {\n    right: 66.6666666667%;\n  }\n  .row .col.push-m8 {\n    left: 66.6666666667%;\n  }\n  .row .col.offset-m9 {\n    margin-left: 75%;\n  }\n  .row .col.pull-m9 {\n    right: 75%;\n  }\n  .row .col.push-m9 {\n    left: 75%;\n  }\n  .row .col.offset-m10 {\n    margin-left: 83.3333333333%;\n  }\n  .row .col.pull-m10 {\n    right: 83.3333333333%;\n  }\n  .row .col.push-m10 {\n    left: 83.3333333333%;\n  }\n  .row .col.offset-m11 {\n    margin-left: 91.6666666667%;\n  }\n  .row .col.pull-m11 {\n    right: 91.6666666667%;\n  }\n  .row .col.push-m11 {\n    left: 91.6666666667%;\n  }\n  .row .col.offset-m12 {\n    margin-left: 100%;\n  }\n  .row .col.pull-m12 {\n    right: 100%;\n  }\n  .row .col.push-m12 {\n    left: 100%;\n  }\n}\n\n@media only screen and (min-width: 993px) {\n  .row .col.l1 {\n    width: 8.3333333333%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.l2 {\n    width: 16.6666666667%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.l3 {\n    width: 25%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.l4 {\n    width: 33.3333333333%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.l5 {\n    width: 41.6666666667%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.l6 {\n    width: 50%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.l7 {\n    width: 58.3333333333%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.l8 {\n    width: 66.6666666667%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.l9 {\n    width: 75%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.l10 {\n    width: 83.3333333333%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.l11 {\n    width: 91.6666666667%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.l12 {\n    width: 100%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.offset-l1 {\n    margin-left: 8.3333333333%;\n  }\n  .row .col.pull-l1 {\n    right: 8.3333333333%;\n  }\n  .row .col.push-l1 {\n    left: 8.3333333333%;\n  }\n  .row .col.offset-l2 {\n    margin-left: 16.6666666667%;\n  }\n  .row .col.pull-l2 {\n    right: 16.6666666667%;\n  }\n  .row .col.push-l2 {\n    left: 16.6666666667%;\n  }\n  .row .col.offset-l3 {\n    margin-left: 25%;\n  }\n  .row .col.pull-l3 {\n    right: 25%;\n  }\n  .row .col.push-l3 {\n    left: 25%;\n  }\n  .row .col.offset-l4 {\n    margin-left: 33.3333333333%;\n  }\n  .row .col.pull-l4 {\n    right: 33.3333333333%;\n  }\n  .row .col.push-l4 {\n    left: 33.3333333333%;\n  }\n  .row .col.offset-l5 {\n    margin-left: 41.6666666667%;\n  }\n  .row .col.pull-l5 {\n    right: 41.6666666667%;\n  }\n  .row .col.push-l5 {\n    left: 41.6666666667%;\n  }\n  .row .col.offset-l6 {\n    margin-left: 50%;\n  }\n  .row .col.pull-l6 {\n    right: 50%;\n  }\n  .row .col.push-l6 {\n    left: 50%;\n  }\n  .row .col.offset-l7 {\n    margin-left: 58.3333333333%;\n  }\n  .row .col.pull-l7 {\n    right: 58.3333333333%;\n  }\n  .row .col.push-l7 {\n    left: 58.3333333333%;\n  }\n  .row .col.offset-l8 {\n    margin-left: 66.6666666667%;\n  }\n  .row .col.pull-l8 {\n    right: 66.6666666667%;\n  }\n  .row .col.push-l8 {\n    left: 66.6666666667%;\n  }\n  .row .col.offset-l9 {\n    margin-left: 75%;\n  }\n  .row .col.pull-l9 {\n    right: 75%;\n  }\n  .row .col.push-l9 {\n    left: 75%;\n  }\n  .row .col.offset-l10 {\n    margin-left: 83.3333333333%;\n  }\n  .row .col.pull-l10 {\n    right: 83.3333333333%;\n  }\n  .row .col.push-l10 {\n    left: 83.3333333333%;\n  }\n  .row .col.offset-l11 {\n    margin-left: 91.6666666667%;\n  }\n  .row .col.pull-l11 {\n    right: 91.6666666667%;\n  }\n  .row .col.push-l11 {\n    left: 91.6666666667%;\n  }\n  .row .col.offset-l12 {\n    margin-left: 100%;\n  }\n  .row .col.pull-l12 {\n    right: 100%;\n  }\n  .row .col.push-l12 {\n    left: 100%;\n  }\n}\n\n@media only screen and (min-width: 1201px) {\n  .row .col.xl1 {\n    width: 8.3333333333%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.xl2 {\n    width: 16.6666666667%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.xl3 {\n    width: 25%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.xl4 {\n    width: 33.3333333333%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.xl5 {\n    width: 41.6666666667%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.xl6 {\n    width: 50%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.xl7 {\n    width: 58.3333333333%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.xl8 {\n    width: 66.6666666667%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.xl9 {\n    width: 75%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.xl10 {\n    width: 83.3333333333%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.xl11 {\n    width: 91.6666666667%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.xl12 {\n    width: 100%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.offset-xl1 {\n    margin-left: 8.3333333333%;\n  }\n  .row .col.pull-xl1 {\n    right: 8.3333333333%;\n  }\n  .row .col.push-xl1 {\n    left: 8.3333333333%;\n  }\n  .row .col.offset-xl2 {\n    margin-left: 16.6666666667%;\n  }\n  .row .col.pull-xl2 {\n    right: 16.6666666667%;\n  }\n  .row .col.push-xl2 {\n    left: 16.6666666667%;\n  }\n  .row .col.offset-xl3 {\n    margin-left: 25%;\n  }\n  .row .col.pull-xl3 {\n    right: 25%;\n  }\n  .row .col.push-xl3 {\n    left: 25%;\n  }\n  .row .col.offset-xl4 {\n    margin-left: 33.3333333333%;\n  }\n  .row .col.pull-xl4 {\n    right: 33.3333333333%;\n  }\n  .row .col.push-xl4 {\n    left: 33.3333333333%;\n  }\n  .row .col.offset-xl5 {\n    margin-left: 41.6666666667%;\n  }\n  .row .col.pull-xl5 {\n    right: 41.6666666667%;\n  }\n  .row .col.push-xl5 {\n    left: 41.6666666667%;\n  }\n  .row .col.offset-xl6 {\n    margin-left: 50%;\n  }\n  .row .col.pull-xl6 {\n    right: 50%;\n  }\n  .row .col.push-xl6 {\n    left: 50%;\n  }\n  .row .col.offset-xl7 {\n    margin-left: 58.3333333333%;\n  }\n  .row .col.pull-xl7 {\n    right: 58.3333333333%;\n  }\n  .row .col.push-xl7 {\n    left: 58.3333333333%;\n  }\n  .row .col.offset-xl8 {\n    margin-left: 66.6666666667%;\n  }\n  .row .col.pull-xl8 {\n    right: 66.6666666667%;\n  }\n  .row .col.push-xl8 {\n    left: 66.6666666667%;\n  }\n  .row .col.offset-xl9 {\n    margin-left: 75%;\n  }\n  .row .col.pull-xl9 {\n    right: 75%;\n  }\n  .row .col.push-xl9 {\n    left: 75%;\n  }\n  .row .col.offset-xl10 {\n    margin-left: 83.3333333333%;\n  }\n  .row .col.pull-xl10 {\n    right: 83.3333333333%;\n  }\n  .row .col.push-xl10 {\n    left: 83.3333333333%;\n  }\n  .row .col.offset-xl11 {\n    margin-left: 91.6666666667%;\n  }\n  .row .col.pull-xl11 {\n    right: 91.6666666667%;\n  }\n  .row .col.push-xl11 {\n    left: 91.6666666667%;\n  }\n  .row .col.offset-xl12 {\n    margin-left: 100%;\n  }\n  .row .col.pull-xl12 {\n    right: 100%;\n  }\n  .row .col.push-xl12 {\n    left: 100%;\n  }\n}\n\nnav {\n  color: #fff;\n  background-color: #ee6e73;\n  width: 100%;\n  height: 56px;\n  line-height: 56px;\n}\n\nnav.nav-extended {\n  height: auto;\n}\n\nnav.nav-extended .nav-wrapper {\n  min-height: 56px;\n  height: auto;\n}\n\nnav.nav-extended .nav-content {\n  position: relative;\n  line-height: normal;\n}\n\nnav a {\n  color: #fff;\n}\n\nnav i,\nnav [class^=\"mdi-\"], nav [class*=\"mdi-\"],\nnav i.material-icons {\n  display: block;\n  font-size: 24px;\n  height: 56px;\n  line-height: 56px;\n}\n\nnav .nav-wrapper {\n  position: relative;\n  height: 100%;\n}\n\n@media only screen and (min-width: 993px) {\n  nav a.sidenav-trigger {\n    display: none;\n  }\n}\n\nnav .sidenav-trigger {\n  float: left;\n  position: relative;\n  z-index: 1;\n  height: 56px;\n  margin: 0 18px;\n}\n\nnav .sidenav-trigger i {\n  height: 56px;\n  line-height: 56px;\n}\n\nnav .brand-logo {\n  position: absolute;\n  color: #fff;\n  display: inline-block;\n  font-size: 2.1rem;\n  padding: 0;\n}\n\nnav .brand-logo.center {\n  left: 50%;\n  -webkit-transform: translateX(-50%);\n          transform: translateX(-50%);\n}\n\n@media only screen and (max-width: 992px) {\n  nav .brand-logo {\n    left: 50%;\n    -webkit-transform: translateX(-50%);\n            transform: translateX(-50%);\n  }\n  nav .brand-logo.left, nav .brand-logo.right {\n    padding: 0;\n    -webkit-transform: none;\n            transform: none;\n  }\n  nav .brand-logo.left {\n    left: 0.5rem;\n  }\n  nav .brand-logo.right {\n    right: 0.5rem;\n    left: auto;\n  }\n}\n\nnav .brand-logo.right {\n  right: 0.5rem;\n  padding: 0;\n}\n\nnav .brand-logo i,\nnav .brand-logo [class^=\"mdi-\"], nav .brand-logo [class*=\"mdi-\"],\nnav .brand-logo i.material-icons {\n  float: left;\n  margin-right: 15px;\n}\n\nnav .nav-title {\n  display: inline-block;\n  font-size: 32px;\n  padding: 28px 0;\n}\n\nnav ul {\n  margin: 0;\n}\n\nnav ul li {\n  -webkit-transition: background-color .3s;\n  transition: background-color .3s;\n  float: left;\n  padding: 0;\n}\n\nnav ul li.active {\n  background-color: rgba(0, 0, 0, 0.1);\n}\n\nnav ul a {\n  -webkit-transition: background-color .3s;\n  transition: background-color .3s;\n  font-size: 1rem;\n  color: #fff;\n  display: block;\n  padding: 0 15px;\n  cursor: pointer;\n}\n\nnav ul a.btn, nav ul a.btn-large, nav ul a.btn-small, nav ul a.btn-large, nav ul a.btn-flat, nav ul a.btn-floating {\n  margin-top: -2px;\n  margin-left: 15px;\n  margin-right: 15px;\n}\n\nnav ul a.btn > .material-icons, nav ul a.btn-large > .material-icons, nav ul a.btn-small > .material-icons, nav ul a.btn-large > .material-icons, nav ul a.btn-flat > .material-icons, nav ul a.btn-floating > .material-icons {\n  height: inherit;\n  line-height: inherit;\n}\n\nnav ul a:hover {\n  background-color: rgba(0, 0, 0, 0.1);\n}\n\nnav ul.left {\n  float: left;\n}\n\nnav form {\n  height: 100%;\n}\n\nnav .input-field {\n  margin: 0;\n  height: 100%;\n}\n\nnav .input-field input {\n  height: 100%;\n  font-size: 1.2rem;\n  border: none;\n  padding-left: 2rem;\n}\n\nnav .input-field input:focus, nav .input-field input[type=text]:valid, nav .input-field input[type=password]:valid, nav .input-field input[type=email]:valid, nav .input-field input[type=url]:valid, nav .input-field input[type=date]:valid {\n  border: none;\n  -webkit-box-shadow: none;\n          box-shadow: none;\n}\n\nnav .input-field label {\n  top: 0;\n  left: 0;\n}\n\nnav .input-field label i {\n  color: rgba(255, 255, 255, 0.7);\n  -webkit-transition: color .3s;\n  transition: color .3s;\n}\n\nnav .input-field label.active i {\n  color: #fff;\n}\n\n.navbar-fixed {\n  position: relative;\n  height: 56px;\n  z-index: 997;\n}\n\n.navbar-fixed nav {\n  position: fixed;\n}\n\n@media only screen and (min-width: 601px) {\n  nav.nav-extended .nav-wrapper {\n    min-height: 64px;\n  }\n  nav, nav .nav-wrapper i, nav a.sidenav-trigger, nav a.sidenav-trigger i {\n    height: 64px;\n    line-height: 64px;\n  }\n  .navbar-fixed {\n    height: 64px;\n  }\n}\n\na {\n  text-decoration: none;\n}\n\nhtml {\n  line-height: 1.5;\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen-Sans, Ubuntu, Cantarell, \"Helvetica Neue\", sans-serif;\n  font-weight: normal;\n  color: rgba(0, 0, 0, 0.87);\n}\n\n@media only screen and (min-width: 0) {\n  html {\n    font-size: 14px;\n  }\n}\n\n@media only screen and (min-width: 992px) {\n  html {\n    font-size: 14.5px;\n  }\n}\n\n@media only screen and (min-width: 1200px) {\n  html {\n    font-size: 15px;\n  }\n}\n\nh1, h2, h3, h4, h5, h6 {\n  font-weight: 400;\n  line-height: 1.3;\n}\n\nh1 a, h2 a, h3 a, h4 a, h5 a, h6 a {\n  font-weight: inherit;\n}\n\nh1 {\n  font-size: 4.2rem;\n  line-height: 110%;\n  margin: 2.8rem 0 1.68rem 0;\n}\n\nh2 {\n  font-size: 3.56rem;\n  line-height: 110%;\n  margin: 2.3733333333rem 0 1.424rem 0;\n}\n\nh3 {\n  font-size: 2.92rem;\n  line-height: 110%;\n  margin: 1.9466666667rem 0 1.168rem 0;\n}\n\nh4 {\n  font-size: 2.28rem;\n  line-height: 110%;\n  margin: 1.52rem 0 0.912rem 0;\n}\n\nh5 {\n  font-size: 1.64rem;\n  line-height: 110%;\n  margin: 1.0933333333rem 0 0.656rem 0;\n}\n\nh6 {\n  font-size: 1.15rem;\n  line-height: 110%;\n  margin: 0.7666666667rem 0 0.46rem 0;\n}\n\nem {\n  font-style: italic;\n}\n\nstrong {\n  font-weight: 500;\n}\n\nsmall {\n  font-size: 75%;\n}\n\n.light {\n  font-weight: 300;\n}\n\n.thin {\n  font-weight: 200;\n}\n\n@media only screen and (min-width: 360px) {\n  .flow-text {\n    font-size: 1.2rem;\n  }\n}\n\n@media only screen and (min-width: 390px) {\n  .flow-text {\n    font-size: 1.224rem;\n  }\n}\n\n@media only screen and (min-width: 420px) {\n  .flow-text {\n    font-size: 1.248rem;\n  }\n}\n\n@media only screen and (min-width: 450px) {\n  .flow-text {\n    font-size: 1.272rem;\n  }\n}\n\n@media only screen and (min-width: 480px) {\n  .flow-text {\n    font-size: 1.296rem;\n  }\n}\n\n@media only screen and (min-width: 510px) {\n  .flow-text {\n    font-size: 1.32rem;\n  }\n}\n\n@media only screen and (min-width: 540px) {\n  .flow-text {\n    font-size: 1.344rem;\n  }\n}\n\n@media only screen and (min-width: 570px) {\n  .flow-text {\n    font-size: 1.368rem;\n  }\n}\n\n@media only screen and (min-width: 600px) {\n  .flow-text {\n    font-size: 1.392rem;\n  }\n}\n\n@media only screen and (min-width: 630px) {\n  .flow-text {\n    font-size: 1.416rem;\n  }\n}\n\n@media only screen and (min-width: 660px) {\n  .flow-text {\n    font-size: 1.44rem;\n  }\n}\n\n@media only screen and (min-width: 690px) {\n  .flow-text {\n    font-size: 1.464rem;\n  }\n}\n\n@media only screen and (min-width: 720px) {\n  .flow-text {\n    font-size: 1.488rem;\n  }\n}\n\n@media only screen and (min-width: 750px) {\n  .flow-text {\n    font-size: 1.512rem;\n  }\n}\n\n@media only screen and (min-width: 780px) {\n  .flow-text {\n    font-size: 1.536rem;\n  }\n}\n\n@media only screen and (min-width: 810px) {\n  .flow-text {\n    font-size: 1.56rem;\n  }\n}\n\n@media only screen and (min-width: 840px) {\n  .flow-text {\n    font-size: 1.584rem;\n  }\n}\n\n@media only screen and (min-width: 870px) {\n  .flow-text {\n    font-size: 1.608rem;\n  }\n}\n\n@media only screen and (min-width: 900px) {\n  .flow-text {\n    font-size: 1.632rem;\n  }\n}\n\n@media only screen and (min-width: 930px) {\n  .flow-text {\n    font-size: 1.656rem;\n  }\n}\n\n@media only screen and (min-width: 960px) {\n  .flow-text {\n    font-size: 1.68rem;\n  }\n}\n\n@media only screen and (max-width: 360px) {\n  .flow-text {\n    font-size: 1.2rem;\n  }\n}\n\n.scale-transition {\n  -webkit-transition: -webkit-transform 0.3s cubic-bezier(0.53, 0.01, 0.36, 1.63) !important;\n  transition: -webkit-transform 0.3s cubic-bezier(0.53, 0.01, 0.36, 1.63) !important;\n  transition: transform 0.3s cubic-bezier(0.53, 0.01, 0.36, 1.63) !important;\n  transition: transform 0.3s cubic-bezier(0.53, 0.01, 0.36, 1.63), -webkit-transform 0.3s cubic-bezier(0.53, 0.01, 0.36, 1.63) !important;\n}\n\n.scale-transition.scale-out {\n  -webkit-transform: scale(0);\n          transform: scale(0);\n  -webkit-transition: -webkit-transform .2s !important;\n  transition: -webkit-transform .2s !important;\n  transition: transform .2s !important;\n  transition: transform .2s, -webkit-transform .2s !important;\n}\n\n.scale-transition.scale-in {\n  -webkit-transform: scale(1);\n          transform: scale(1);\n}\n\n.card-panel {\n  -webkit-transition: -webkit-box-shadow .25s;\n  transition: -webkit-box-shadow .25s;\n  transition: box-shadow .25s;\n  transition: box-shadow .25s, -webkit-box-shadow .25s;\n  padding: 24px;\n  margin: 0.5rem 0 1rem 0;\n  border-radius: 2px;\n  background-color: #fff;\n}\n\n.card {\n  position: relative;\n  margin: 0.5rem 0 1rem 0;\n  background-color: #fff;\n  -webkit-transition: -webkit-box-shadow .25s;\n  transition: -webkit-box-shadow .25s;\n  transition: box-shadow .25s;\n  transition: box-shadow .25s, -webkit-box-shadow .25s;\n  border-radius: 2px;\n}\n\n.card .card-title {\n  font-size: 24px;\n  font-weight: 300;\n}\n\n.card .card-title.activator {\n  cursor: pointer;\n}\n\n.card.small, .card.medium, .card.large {\n  position: relative;\n}\n\n.card.small .card-image, .card.medium .card-image, .card.large .card-image {\n  max-height: 60%;\n  overflow: hidden;\n}\n\n.card.small .card-image + .card-content, .card.medium .card-image + .card-content, .card.large .card-image + .card-content {\n  max-height: 40%;\n}\n\n.card.small .card-content, .card.medium .card-content, .card.large .card-content {\n  max-height: 100%;\n  overflow: hidden;\n}\n\n.card.small .card-action, .card.medium .card-action, .card.large .card-action {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n}\n\n.card.small {\n  height: 300px;\n}\n\n.card.medium {\n  height: 400px;\n}\n\n.card.large {\n  height: 500px;\n}\n\n.card.horizontal {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n}\n\n.card.horizontal.small .card-image, .card.horizontal.medium .card-image, .card.horizontal.large .card-image {\n  height: 100%;\n  max-height: none;\n  overflow: visible;\n}\n\n.card.horizontal.small .card-image img, .card.horizontal.medium .card-image img, .card.horizontal.large .card-image img {\n  height: 100%;\n}\n\n.card.horizontal .card-image {\n  max-width: 50%;\n}\n\n.card.horizontal .card-image img {\n  border-radius: 2px 0 0 2px;\n  max-width: 100%;\n  width: auto;\n}\n\n.card.horizontal .card-stacked {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  position: relative;\n}\n\n.card.horizontal .card-stacked .card-content {\n  -webkit-box-flex: 1;\n  -webkit-flex-grow: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n}\n\n.card.sticky-action .card-action {\n  z-index: 2;\n}\n\n.card.sticky-action .card-reveal {\n  z-index: 1;\n  padding-bottom: 64px;\n}\n\n.card .card-image {\n  position: relative;\n}\n\n.card .card-image img {\n  display: block;\n  border-radius: 2px 2px 0 0;\n  position: relative;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  width: 100%;\n}\n\n.card .card-image .card-title {\n  color: #fff;\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  max-width: 100%;\n  padding: 24px;\n}\n\n.card .card-content {\n  padding: 24px;\n  border-radius: 0 0 2px 2px;\n}\n\n.card .card-content p {\n  margin: 0;\n}\n\n.card .card-content .card-title {\n  display: block;\n  line-height: 32px;\n  margin-bottom: 8px;\n}\n\n.card .card-content .card-title i {\n  line-height: 32px;\n}\n\n.card .card-action {\n  background-color: inherit;\n  border-top: 1px solid rgba(160, 160, 160, 0.2);\n  position: relative;\n  padding: 16px 24px;\n}\n\n.card .card-action:last-child {\n  border-radius: 0 0 2px 2px;\n}\n\n.card .card-action a:not(.btn):not(.btn-large):not(.btn-small):not(.btn-large):not(.btn-floating) {\n  color: #ffab40;\n  margin-right: 24px;\n  -webkit-transition: color .3s ease;\n  transition: color .3s ease;\n  text-transform: uppercase;\n}\n\n.card .card-action a:not(.btn):not(.btn-large):not(.btn-small):not(.btn-large):not(.btn-floating):hover {\n  color: #ffd8a6;\n}\n\n.card .card-reveal {\n  padding: 24px;\n  position: absolute;\n  background-color: #fff;\n  width: 100%;\n  overflow-y: auto;\n  left: 0;\n  top: 100%;\n  height: 100%;\n  z-index: 3;\n  display: none;\n}\n\n.card .card-reveal .card-title {\n  cursor: pointer;\n  display: block;\n}\n\n#toast-container {\n  display: block;\n  position: fixed;\n  z-index: 10000;\n}\n\n@media only screen and (max-width: 600px) {\n  #toast-container {\n    min-width: 100%;\n    bottom: 0%;\n  }\n}\n\n@media only screen and (min-width: 601px) and (max-width: 992px) {\n  #toast-container {\n    left: 5%;\n    bottom: 7%;\n    max-width: 90%;\n  }\n}\n\n@media only screen and (min-width: 993px) {\n  #toast-container {\n    top: 10%;\n    right: 7%;\n    max-width: 86%;\n  }\n}\n\n.toast {\n  border-radius: 2px;\n  top: 35px;\n  width: auto;\n  margin-top: 10px;\n  position: relative;\n  max-width: 100%;\n  height: auto;\n  min-height: 48px;\n  line-height: 1.5em;\n  background-color: #323232;\n  padding: 10px 25px;\n  font-size: 1.1rem;\n  font-weight: 300;\n  color: #fff;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: justify;\n  -webkit-justify-content: space-between;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  cursor: default;\n}\n\n.toast .toast-action {\n  color: #eeff41;\n  font-weight: 500;\n  margin-right: -25px;\n  margin-left: 3rem;\n}\n\n.toast.rounded {\n  border-radius: 24px;\n}\n\n@media only screen and (max-width: 600px) {\n  .toast {\n    width: 100%;\n    border-radius: 0;\n  }\n}\n\n.tabs {\n  position: relative;\n  overflow-x: auto;\n  overflow-y: hidden;\n  height: 48px;\n  width: 100%;\n  background-color: #fff;\n  margin: 0 auto;\n  white-space: nowrap;\n}\n\n.tabs.tabs-transparent {\n  background-color: transparent;\n}\n\n.tabs.tabs-transparent .tab a,\n.tabs.tabs-transparent .tab.disabled a,\n.tabs.tabs-transparent .tab.disabled a:hover {\n  color: rgba(255, 255, 255, 0.7);\n}\n\n.tabs.tabs-transparent .tab a:hover,\n.tabs.tabs-transparent .tab a.active {\n  color: #fff;\n}\n\n.tabs.tabs-transparent .indicator {\n  background-color: #fff;\n}\n\n.tabs.tabs-fixed-width {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n}\n\n.tabs.tabs-fixed-width .tab {\n  -webkit-box-flex: 1;\n  -webkit-flex-grow: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n}\n\n.tabs .tab {\n  display: inline-block;\n  text-align: center;\n  line-height: 48px;\n  height: 48px;\n  padding: 0;\n  margin: 0;\n  text-transform: uppercase;\n}\n\n.tabs .tab a {\n  color: rgba(238, 110, 115, 0.7);\n  display: block;\n  width: 100%;\n  height: 100%;\n  padding: 0 24px;\n  font-size: 14px;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  -webkit-transition: color .28s ease, background-color .28s ease;\n  transition: color .28s ease, background-color .28s ease;\n}\n\n.tabs .tab a:focus, .tabs .tab a:focus.active {\n  background-color: rgba(246, 178, 181, 0.2);\n  outline: none;\n}\n\n.tabs .tab a:hover, .tabs .tab a.active {\n  background-color: transparent;\n  color: #ee6e73;\n}\n\n.tabs .tab.disabled a,\n.tabs .tab.disabled a:hover {\n  color: rgba(238, 110, 115, 0.4);\n  cursor: default;\n}\n\n.tabs .indicator {\n  position: absolute;\n  bottom: 0;\n  height: 2px;\n  background-color: #f6b2b5;\n  will-change: left, right;\n}\n\n@media only screen and (max-width: 992px) {\n  .tabs {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n  }\n  .tabs .tab {\n    -webkit-box-flex: 1;\n    -webkit-flex-grow: 1;\n        -ms-flex-positive: 1;\n            flex-grow: 1;\n  }\n  .tabs .tab a {\n    padding: 0 12px;\n  }\n}\n\n.material-tooltip {\n  padding: 10px 8px;\n  font-size: 1rem;\n  z-index: 2000;\n  background-color: transparent;\n  border-radius: 2px;\n  color: #fff;\n  min-height: 36px;\n  line-height: 120%;\n  opacity: 0;\n  position: absolute;\n  text-align: center;\n  max-width: calc(100% - 4px);\n  overflow: hidden;\n  left: 0;\n  top: 0;\n  pointer-events: none;\n  visibility: hidden;\n  background-color: #323232;\n}\n\n.backdrop {\n  position: absolute;\n  opacity: 0;\n  height: 7px;\n  width: 14px;\n  border-radius: 0 0 50% 50%;\n  background-color: #323232;\n  z-index: -1;\n  -webkit-transform-origin: 50% 0%;\n          transform-origin: 50% 0%;\n  visibility: hidden;\n}\n\n.btn, .btn-large, .btn-small,\n.btn-flat {\n  border: none;\n  border-radius: 2px;\n  display: inline-block;\n  height: 36px;\n  line-height: 36px;\n  padding: 0 16px;\n  text-transform: uppercase;\n  vertical-align: middle;\n  -webkit-tap-highlight-color: transparent;\n}\n\n.btn.disabled, .disabled.btn-large, .disabled.btn-small,\n.btn-floating.disabled,\n.btn-large.disabled,\n.btn-small.disabled,\n.btn-flat.disabled,\n.btn:disabled,\n.btn-large:disabled,\n.btn-small:disabled,\n.btn-floating:disabled,\n.btn-large:disabled,\n.btn-small:disabled,\n.btn-flat:disabled,\n.btn[disabled],\n.btn-large[disabled],\n.btn-small[disabled],\n.btn-floating[disabled],\n.btn-large[disabled],\n.btn-small[disabled],\n.btn-flat[disabled] {\n  pointer-events: none;\n  background-color: #DFDFDF !important;\n  -webkit-box-shadow: none;\n          box-shadow: none;\n  color: #9F9F9F !important;\n  cursor: default;\n}\n\n.btn.disabled:hover, .disabled.btn-large:hover, .disabled.btn-small:hover,\n.btn-floating.disabled:hover,\n.btn-large.disabled:hover,\n.btn-small.disabled:hover,\n.btn-flat.disabled:hover,\n.btn:disabled:hover,\n.btn-large:disabled:hover,\n.btn-small:disabled:hover,\n.btn-floating:disabled:hover,\n.btn-large:disabled:hover,\n.btn-small:disabled:hover,\n.btn-flat:disabled:hover,\n.btn[disabled]:hover,\n.btn-large[disabled]:hover,\n.btn-small[disabled]:hover,\n.btn-floating[disabled]:hover,\n.btn-large[disabled]:hover,\n.btn-small[disabled]:hover,\n.btn-flat[disabled]:hover {\n  background-color: #DFDFDF !important;\n  color: #9F9F9F !important;\n}\n\n.btn, .btn-large, .btn-small,\n.btn-floating,\n.btn-large,\n.btn-small,\n.btn-flat {\n  font-size: 14px;\n  outline: 0;\n}\n\n.btn i, .btn-large i, .btn-small i,\n.btn-floating i,\n.btn-large i,\n.btn-small i,\n.btn-flat i {\n  font-size: 1.3rem;\n  line-height: inherit;\n}\n\n.btn:focus, .btn-large:focus, .btn-small:focus,\n.btn-floating:focus {\n  background-color: #1d7d74;\n}\n\n.btn, .btn-large, .btn-small {\n  text-decoration: none;\n  color: #fff;\n  background-color: #26a69a;\n  text-align: center;\n  letter-spacing: .5px;\n  -webkit-transition: background-color .2s ease-out;\n  transition: background-color .2s ease-out;\n  cursor: pointer;\n}\n\n.btn:hover, .btn-large:hover, .btn-small:hover {\n  background-color: #2bbbad;\n}\n\n.btn-floating {\n  display: inline-block;\n  color: #fff;\n  position: relative;\n  overflow: hidden;\n  z-index: 1;\n  width: 40px;\n  height: 40px;\n  line-height: 40px;\n  padding: 0;\n  background-color: #26a69a;\n  border-radius: 50%;\n  -webkit-transition: background-color .3s;\n  transition: background-color .3s;\n  cursor: pointer;\n  vertical-align: middle;\n}\n\n.btn-floating:hover {\n  background-color: #26a69a;\n}\n\n.btn-floating:before {\n  border-radius: 0;\n}\n\n.btn-floating.btn-large {\n  width: 56px;\n  height: 56px;\n  padding: 0;\n}\n\n.btn-floating.btn-large.halfway-fab {\n  bottom: -28px;\n}\n\n.btn-floating.btn-large i {\n  line-height: 56px;\n}\n\n.btn-floating.btn-small {\n  width: 32.4px;\n  height: 32.4px;\n}\n\n.btn-floating.btn-small.halfway-fab {\n  bottom: -16.2px;\n}\n\n.btn-floating.btn-small i {\n  line-height: 32.4px;\n}\n\n.btn-floating.halfway-fab {\n  position: absolute;\n  right: 24px;\n  bottom: -20px;\n}\n\n.btn-floating.halfway-fab.left {\n  right: auto;\n  left: 24px;\n}\n\n.btn-floating i {\n  width: inherit;\n  display: inline-block;\n  text-align: center;\n  color: #fff;\n  font-size: 1.6rem;\n  line-height: 40px;\n}\n\nbutton.btn-floating {\n  border: none;\n}\n\n.fixed-action-btn {\n  position: fixed;\n  right: 23px;\n  bottom: 23px;\n  padding-top: 15px;\n  margin-bottom: 0;\n  z-index: 997;\n}\n\n.fixed-action-btn.active ul {\n  visibility: visible;\n}\n\n.fixed-action-btn.direction-left, .fixed-action-btn.direction-right {\n  padding: 0 0 0 15px;\n}\n\n.fixed-action-btn.direction-left ul, .fixed-action-btn.direction-right ul {\n  text-align: right;\n  right: 64px;\n  top: 50%;\n  -webkit-transform: translateY(-50%);\n          transform: translateY(-50%);\n  height: 100%;\n  left: auto;\n  /*width 100% only goes to width of button container */\n  width: 500px;\n}\n\n.fixed-action-btn.direction-left ul li, .fixed-action-btn.direction-right ul li {\n  display: inline-block;\n  margin: 7.5px 15px 0 0;\n}\n\n.fixed-action-btn.direction-right {\n  padding: 0 15px 0 0;\n}\n\n.fixed-action-btn.direction-right ul {\n  text-align: left;\n  direction: rtl;\n  left: 64px;\n  right: auto;\n}\n\n.fixed-action-btn.direction-right ul li {\n  margin: 7.5px 0 0 15px;\n}\n\n.fixed-action-btn.direction-bottom {\n  padding: 0 0 15px 0;\n}\n\n.fixed-action-btn.direction-bottom ul {\n  top: 64px;\n  bottom: auto;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: reverse;\n  -webkit-flex-direction: column-reverse;\n      -ms-flex-direction: column-reverse;\n          flex-direction: column-reverse;\n}\n\n.fixed-action-btn.direction-bottom ul li {\n  margin: 15px 0 0 0;\n}\n\n.fixed-action-btn.toolbar {\n  padding: 0;\n  height: 56px;\n}\n\n.fixed-action-btn.toolbar.active > a i {\n  opacity: 0;\n}\n\n.fixed-action-btn.toolbar ul {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  top: 0;\n  bottom: 0;\n  z-index: 1;\n}\n\n.fixed-action-btn.toolbar ul li {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  display: inline-block;\n  margin: 0;\n  height: 100%;\n  -webkit-transition: none;\n  transition: none;\n}\n\n.fixed-action-btn.toolbar ul li a {\n  display: block;\n  overflow: hidden;\n  position: relative;\n  width: 100%;\n  height: 100%;\n  background-color: transparent;\n  -webkit-box-shadow: none;\n          box-shadow: none;\n  color: #fff;\n  line-height: 56px;\n  z-index: 1;\n}\n\n.fixed-action-btn.toolbar ul li a i {\n  line-height: inherit;\n}\n\n.fixed-action-btn ul {\n  left: 0;\n  right: 0;\n  text-align: center;\n  position: absolute;\n  bottom: 64px;\n  margin: 0;\n  visibility: hidden;\n}\n\n.fixed-action-btn ul li {\n  margin-bottom: 15px;\n}\n\n.fixed-action-btn ul a.btn-floating {\n  opacity: 0;\n}\n\n.fixed-action-btn .fab-backdrop {\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: -1;\n  width: 40px;\n  height: 40px;\n  background-color: #26a69a;\n  border-radius: 50%;\n  -webkit-transform: scale(0);\n          transform: scale(0);\n}\n\n.btn-flat {\n  -webkit-box-shadow: none;\n          box-shadow: none;\n  background-color: transparent;\n  color: #343434;\n  cursor: pointer;\n  -webkit-transition: background-color .2s;\n  transition: background-color .2s;\n}\n\n.btn-flat:focus, .btn-flat:hover {\n  -webkit-box-shadow: none;\n          box-shadow: none;\n}\n\n.btn-flat:focus {\n  background-color: rgba(0, 0, 0, 0.1);\n}\n\n.btn-flat.disabled, .btn-flat.btn-flat[disabled] {\n  background-color: transparent !important;\n  color: #b3b2b2 !important;\n  cursor: default;\n}\n\n.btn-large {\n  height: 54px;\n  line-height: 54px;\n  font-size: 15px;\n  padding: 0 28px;\n}\n\n.btn-large i {\n  font-size: 1.6rem;\n}\n\n.btn-small {\n  height: 32.4px;\n  line-height: 32.4px;\n  font-size: 13px;\n}\n\n.btn-small i {\n  font-size: 1.2rem;\n}\n\n.btn-block {\n  display: block;\n}\n\n.dropdown-content {\n  background-color: #fff;\n  margin: 0;\n  display: none;\n  min-width: 100px;\n  overflow-y: auto;\n  opacity: 0;\n  position: absolute;\n  left: 0;\n  top: 0;\n  z-index: 9999;\n  -webkit-transform-origin: 0 0;\n          transform-origin: 0 0;\n}\n\n.dropdown-content:focus {\n  outline: 0;\n}\n\n.dropdown-content li {\n  clear: both;\n  color: rgba(0, 0, 0, 0.87);\n  cursor: pointer;\n  min-height: 50px;\n  line-height: 1.5rem;\n  width: 100%;\n  text-align: left;\n}\n\n.dropdown-content li:hover, .dropdown-content li.active {\n  background-color: #eee;\n}\n\n.dropdown-content li:focus {\n  outline: none;\n}\n\n.dropdown-content li.divider {\n  min-height: 0;\n  height: 1px;\n}\n\n.dropdown-content li > a, .dropdown-content li > span {\n  font-size: 16px;\n  color: #26a69a;\n  display: block;\n  line-height: 22px;\n  padding: 14px 16px;\n}\n\n.dropdown-content li > span > label {\n  top: 1px;\n  left: 0;\n  height: 18px;\n}\n\n.dropdown-content li > a > i {\n  height: inherit;\n  line-height: inherit;\n  float: left;\n  margin: 0 24px 0 0;\n  width: 24px;\n}\n\nbody.keyboard-focused .dropdown-content li:focus {\n  background-color: #dadada;\n}\n\n.input-field.col .dropdown-content [type=\"checkbox\"] + label {\n  top: 1px;\n  left: 0;\n  height: 18px;\n  -webkit-transform: none;\n          transform: none;\n}\n\n.dropdown-trigger {\n  cursor: pointer;\n}\n\n/*!\r\n * Waves v0.6.0\r\n * http://fian.my.id/Waves\r\n *\r\n * Copyright 2014 Alfiana E. Sibuea and other contributors\r\n * Released under the MIT license\r\n * https://github.com/fians/Waves/blob/master/LICENSE\r\n */\n.waves-effect {\n  position: relative;\n  cursor: pointer;\n  display: inline-block;\n  overflow: hidden;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  -webkit-tap-highlight-color: transparent;\n  vertical-align: middle;\n  z-index: 1;\n  -webkit-transition: .3s ease-out;\n  transition: .3s ease-out;\n}\n\n.waves-effect .waves-ripple {\n  position: absolute;\n  border-radius: 50%;\n  width: 20px;\n  height: 20px;\n  margin-top: -10px;\n  margin-left: -10px;\n  opacity: 0;\n  background: rgba(0, 0, 0, 0.2);\n  -webkit-transition: all 0.7s ease-out;\n  transition: all 0.7s ease-out;\n  -webkit-transition-property: opacity, -webkit-transform;\n  transition-property: opacity, -webkit-transform;\n  transition-property: transform, opacity;\n  transition-property: transform, opacity, -webkit-transform;\n  -webkit-transform: scale(0);\n          transform: scale(0);\n  pointer-events: none;\n}\n\n.waves-effect.waves-light .waves-ripple {\n  background-color: rgba(255, 255, 255, 0.45);\n}\n\n.waves-effect.waves-red .waves-ripple {\n  background-color: rgba(244, 67, 54, 0.7);\n}\n\n.waves-effect.waves-yellow .waves-ripple {\n  background-color: rgba(255, 235, 59, 0.7);\n}\n\n.waves-effect.waves-orange .waves-ripple {\n  background-color: rgba(255, 152, 0, 0.7);\n}\n\n.waves-effect.waves-purple .waves-ripple {\n  background-color: rgba(156, 39, 176, 0.7);\n}\n\n.waves-effect.waves-green .waves-ripple {\n  background-color: rgba(76, 175, 80, 0.7);\n}\n\n.waves-effect.waves-teal .waves-ripple {\n  background-color: rgba(0, 150, 136, 0.7);\n}\n\n.waves-effect input[type=\"button\"], .waves-effect input[type=\"reset\"], .waves-effect input[type=\"submit\"] {\n  border: 0;\n  font-style: normal;\n  font-size: inherit;\n  text-transform: inherit;\n  background: none;\n}\n\n.waves-effect img {\n  position: relative;\n  z-index: -1;\n}\n\n.waves-notransition {\n  -webkit-transition: none !important;\n  transition: none !important;\n}\n\n.waves-circle {\n  -webkit-transform: translateZ(0);\n          transform: translateZ(0);\n  -webkit-mask-image: -webkit-radial-gradient(circle, white 100%, black 100%);\n}\n\n.waves-input-wrapper {\n  border-radius: 0.2em;\n  vertical-align: bottom;\n}\n\n.waves-input-wrapper .waves-button-input {\n  position: relative;\n  top: 0;\n  left: 0;\n  z-index: 1;\n}\n\n.waves-circle {\n  text-align: center;\n  width: 2.5em;\n  height: 2.5em;\n  line-height: 2.5em;\n  border-radius: 50%;\n  -webkit-mask-image: none;\n}\n\n.waves-block {\n  display: block;\n}\n\n/* Firefox Bug: link not triggered */\n.waves-effect .waves-ripple {\n  z-index: -1;\n}\n\n.modal {\n  display: none;\n  position: fixed;\n  left: 0;\n  right: 0;\n  background-color: #fafafa;\n  padding: 0;\n  max-height: 70%;\n  width: 55%;\n  margin: auto;\n  overflow-y: auto;\n  border-radius: 2px;\n  will-change: top, opacity;\n}\n\n.modal:focus {\n  outline: none;\n}\n\n@media only screen and (max-width: 992px) {\n  .modal {\n    width: 80%;\n  }\n}\n\n.modal h1, .modal h2, .modal h3, .modal h4 {\n  margin-top: 0;\n}\n\n.modal .modal-content {\n  padding: 24px;\n}\n\n.modal .modal-close {\n  cursor: pointer;\n}\n\n.modal .modal-footer {\n  border-radius: 0 0 2px 2px;\n  background-color: #fafafa;\n  padding: 4px 6px;\n  height: 56px;\n  width: 100%;\n  text-align: right;\n}\n\n.modal .modal-footer .btn, .modal .modal-footer .btn-large, .modal .modal-footer .btn-small, .modal .modal-footer .btn-flat {\n  margin: 6px 0;\n}\n\n.modal-overlay {\n  position: fixed;\n  z-index: 999;\n  top: -25%;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  height: 125%;\n  width: 100%;\n  background: #000;\n  display: none;\n  will-change: opacity;\n}\n\n.modal.modal-fixed-footer {\n  padding: 0;\n  height: 70%;\n}\n\n.modal.modal-fixed-footer .modal-content {\n  position: absolute;\n  height: calc(100% - 56px);\n  max-height: 100%;\n  width: 100%;\n  overflow-y: auto;\n}\n\n.modal.modal-fixed-footer .modal-footer {\n  border-top: 1px solid rgba(0, 0, 0, 0.1);\n  position: absolute;\n  bottom: 0;\n}\n\n.modal.bottom-sheet {\n  top: auto;\n  bottom: -100%;\n  margin: 0;\n  width: 100%;\n  max-height: 45%;\n  border-radius: 0;\n  will-change: bottom, opacity;\n}\n\n.collapsible {\n  border-top: 1px solid #ddd;\n  border-right: 1px solid #ddd;\n  border-left: 1px solid #ddd;\n  margin: 0.5rem 0 1rem 0;\n}\n\n.collapsible-header {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  cursor: pointer;\n  -webkit-tap-highlight-color: transparent;\n  line-height: 1.5;\n  padding: 1rem;\n  background-color: #fff;\n  border-bottom: 1px solid #ddd;\n}\n\n.collapsible-header:focus {\n  outline: 0;\n}\n\n.collapsible-header i {\n  width: 2rem;\n  font-size: 1.6rem;\n  display: inline-block;\n  text-align: center;\n  margin-right: 1rem;\n}\n\n.keyboard-focused .collapsible-header:focus {\n  background-color: #eee;\n}\n\n.collapsible-body {\n  display: none;\n  border-bottom: 1px solid #ddd;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  padding: 2rem;\n}\n\n.sidenav .collapsible,\n.sidenav.fixed .collapsible {\n  border: none;\n  -webkit-box-shadow: none;\n          box-shadow: none;\n}\n\n.sidenav .collapsible li,\n.sidenav.fixed .collapsible li {\n  padding: 0;\n}\n\n.sidenav .collapsible-header,\n.sidenav.fixed .collapsible-header {\n  background-color: transparent;\n  border: none;\n  line-height: inherit;\n  height: inherit;\n  padding: 0 16px;\n}\n\n.sidenav .collapsible-header:hover,\n.sidenav.fixed .collapsible-header:hover {\n  background-color: rgba(0, 0, 0, 0.05);\n}\n\n.sidenav .collapsible-header i,\n.sidenav.fixed .collapsible-header i {\n  line-height: inherit;\n}\n\n.sidenav .collapsible-body,\n.sidenav.fixed .collapsible-body {\n  border: 0;\n  background-color: #fff;\n}\n\n.sidenav .collapsible-body li a,\n.sidenav.fixed .collapsible-body li a {\n  padding: 0 23.5px 0 31px;\n}\n\n.collapsible.popout {\n  border: none;\n  -webkit-box-shadow: none;\n          box-shadow: none;\n}\n\n.collapsible.popout > li {\n  -webkit-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);\n          box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);\n  margin: 0 24px;\n  -webkit-transition: margin 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  transition: margin 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n}\n\n.collapsible.popout > li.active {\n  -webkit-box-shadow: 0 5px 11px 0 rgba(0, 0, 0, 0.18), 0 4px 15px 0 rgba(0, 0, 0, 0.15);\n          box-shadow: 0 5px 11px 0 rgba(0, 0, 0, 0.18), 0 4px 15px 0 rgba(0, 0, 0, 0.15);\n  margin: 16px 0;\n}\n\n.chip {\n  display: inline-block;\n  height: 32px;\n  font-size: 13px;\n  font-weight: 500;\n  color: rgba(0, 0, 0, 0.6);\n  line-height: 32px;\n  padding: 0 12px;\n  border-radius: 16px;\n  background-color: #e4e4e4;\n  margin-bottom: 5px;\n  margin-right: 5px;\n}\n\n.chip:focus {\n  outline: none;\n  background-color: #26a69a;\n  color: #fff;\n}\n\n.chip > img {\n  float: left;\n  margin: 0 8px 0 -12px;\n  height: 32px;\n  width: 32px;\n  border-radius: 50%;\n}\n\n.chip .close {\n  cursor: pointer;\n  float: right;\n  font-size: 16px;\n  line-height: 32px;\n  padding-left: 8px;\n}\n\n.chips {\n  border: none;\n  border-bottom: 1px solid #9e9e9e;\n  -webkit-box-shadow: none;\n          box-shadow: none;\n  margin: 0 0 8px 0;\n  min-height: 45px;\n  outline: none;\n  -webkit-transition: all .3s;\n  transition: all .3s;\n}\n\n.chips.focus {\n  border-bottom: 1px solid #26a69a;\n  -webkit-box-shadow: 0 1px 0 0 #26a69a;\n          box-shadow: 0 1px 0 0 #26a69a;\n}\n\n.chips:hover {\n  cursor: text;\n}\n\n.chips .input {\n  background: none;\n  border: 0;\n  color: rgba(0, 0, 0, 0.6);\n  display: inline-block;\n  font-size: 16px;\n  height: 3rem;\n  line-height: 32px;\n  outline: 0;\n  margin: 0;\n  padding: 0 !important;\n  width: 120px !important;\n}\n\n.chips .input:focus {\n  border: 0 !important;\n  -webkit-box-shadow: none !important;\n          box-shadow: none !important;\n}\n\n.chips .autocomplete-content {\n  margin-top: 0;\n  margin-bottom: 0;\n}\n\n.prefix ~ .chips {\n  margin-left: 3rem;\n  width: 92%;\n  width: calc(100% - 3rem);\n}\n\n.chips:empty ~ label {\n  font-size: 0.8rem;\n  -webkit-transform: translateY(-140%);\n          transform: translateY(-140%);\n}\n\n.materialboxed {\n  display: block;\n  cursor: -webkit-zoom-in;\n  cursor: zoom-in;\n  position: relative;\n  -webkit-transition: opacity .4s;\n  transition: opacity .4s;\n  -webkit-backface-visibility: hidden;\n}\n\n.materialboxed:hover:not(.active) {\n  opacity: .8;\n}\n\n.materialboxed.active {\n  cursor: -webkit-zoom-out;\n  cursor: zoom-out;\n}\n\n#materialbox-overlay {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  background-color: #292929;\n  z-index: 1000;\n  will-change: opacity;\n}\n\n.materialbox-caption {\n  position: fixed;\n  display: none;\n  color: #fff;\n  line-height: 50px;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  text-align: center;\n  padding: 0% 15%;\n  height: 50px;\n  z-index: 1000;\n  -webkit-font-smoothing: antialiased;\n}\n\nselect:focus {\n  outline: 1px solid #c9f3ef;\n}\n\nbutton:focus {\n  outline: none;\n  background-color: #2ab7a9;\n}\n\nlabel {\n  font-size: 0.8rem;\n  color: #9e9e9e;\n}\n\n/* Text Inputs + Textarea\n   ========================================================================== */\n/* Style Placeholders */\n::-webkit-input-placeholder {\n  color: #d1d1d1;\n}\n::-moz-placeholder {\n  color: #d1d1d1;\n}\n:-ms-input-placeholder {\n  color: #d1d1d1;\n}\n::-ms-input-placeholder {\n  color: #d1d1d1;\n}\n::placeholder {\n  color: #d1d1d1;\n}\n\n/* Text inputs */\ninput:not([type]),\ninput[type=text]:not(.browser-default),\ninput[type=password]:not(.browser-default),\ninput[type=email]:not(.browser-default),\ninput[type=url]:not(.browser-default),\ninput[type=time]:not(.browser-default),\ninput[type=date]:not(.browser-default),\ninput[type=datetime]:not(.browser-default),\ninput[type=datetime-local]:not(.browser-default),\ninput[type=tel]:not(.browser-default),\ninput[type=number]:not(.browser-default),\ninput[type=search]:not(.browser-default),\ntextarea.materialize-textarea {\n  background-color: transparent;\n  border: none;\n  border-bottom: 1px solid #9e9e9e;\n  border-radius: 0;\n  outline: none;\n  height: 3rem;\n  width: 100%;\n  font-size: 16px;\n  margin: 0 0 8px 0;\n  padding: 0;\n  -webkit-box-shadow: none;\n          box-shadow: none;\n  -webkit-box-sizing: content-box;\n          box-sizing: content-box;\n  -webkit-transition: border .3s, -webkit-box-shadow .3s;\n  transition: border .3s, -webkit-box-shadow .3s;\n  transition: box-shadow .3s, border .3s;\n  transition: box-shadow .3s, border .3s, -webkit-box-shadow .3s;\n}\n\ninput:not([type]):disabled, input:not([type])[readonly=\"readonly\"],\ninput[type=text]:not(.browser-default):disabled,\ninput[type=text]:not(.browser-default)[readonly=\"readonly\"],\ninput[type=password]:not(.browser-default):disabled,\ninput[type=password]:not(.browser-default)[readonly=\"readonly\"],\ninput[type=email]:not(.browser-default):disabled,\ninput[type=email]:not(.browser-default)[readonly=\"readonly\"],\ninput[type=url]:not(.browser-default):disabled,\ninput[type=url]:not(.browser-default)[readonly=\"readonly\"],\ninput[type=time]:not(.browser-default):disabled,\ninput[type=time]:not(.browser-default)[readonly=\"readonly\"],\ninput[type=date]:not(.browser-default):disabled,\ninput[type=date]:not(.browser-default)[readonly=\"readonly\"],\ninput[type=datetime]:not(.browser-default):disabled,\ninput[type=datetime]:not(.browser-default)[readonly=\"readonly\"],\ninput[type=datetime-local]:not(.browser-default):disabled,\ninput[type=datetime-local]:not(.browser-default)[readonly=\"readonly\"],\ninput[type=tel]:not(.browser-default):disabled,\ninput[type=tel]:not(.browser-default)[readonly=\"readonly\"],\ninput[type=number]:not(.browser-default):disabled,\ninput[type=number]:not(.browser-default)[readonly=\"readonly\"],\ninput[type=search]:not(.browser-default):disabled,\ninput[type=search]:not(.browser-default)[readonly=\"readonly\"],\ntextarea.materialize-textarea:disabled,\ntextarea.materialize-textarea[readonly=\"readonly\"] {\n  color: rgba(0, 0, 0, 0.42);\n  border-bottom: 1px dotted rgba(0, 0, 0, 0.42);\n}\n\ninput:not([type]):disabled + label,\ninput:not([type])[readonly=\"readonly\"] + label,\ninput[type=text]:not(.browser-default):disabled + label,\ninput[type=text]:not(.browser-default)[readonly=\"readonly\"] + label,\ninput[type=password]:not(.browser-default):disabled + label,\ninput[type=password]:not(.browser-default)[readonly=\"readonly\"] + label,\ninput[type=email]:not(.browser-default):disabled + label,\ninput[type=email]:not(.browser-default)[readonly=\"readonly\"] + label,\ninput[type=url]:not(.browser-default):disabled + label,\ninput[type=url]:not(.browser-default)[readonly=\"readonly\"] + label,\ninput[type=time]:not(.browser-default):disabled + label,\ninput[type=time]:not(.browser-default)[readonly=\"readonly\"] + label,\ninput[type=date]:not(.browser-default):disabled + label,\ninput[type=date]:not(.browser-default)[readonly=\"readonly\"] + label,\ninput[type=datetime]:not(.browser-default):disabled + label,\ninput[type=datetime]:not(.browser-default)[readonly=\"readonly\"] + label,\ninput[type=datetime-local]:not(.browser-default):disabled + label,\ninput[type=datetime-local]:not(.browser-default)[readonly=\"readonly\"] + label,\ninput[type=tel]:not(.browser-default):disabled + label,\ninput[type=tel]:not(.browser-default)[readonly=\"readonly\"] + label,\ninput[type=number]:not(.browser-default):disabled + label,\ninput[type=number]:not(.browser-default)[readonly=\"readonly\"] + label,\ninput[type=search]:not(.browser-default):disabled + label,\ninput[type=search]:not(.browser-default)[readonly=\"readonly\"] + label,\ntextarea.materialize-textarea:disabled + label,\ntextarea.materialize-textarea[readonly=\"readonly\"] + label {\n  color: rgba(0, 0, 0, 0.42);\n}\n\ninput:not([type]):focus:not([readonly]),\ninput[type=text]:not(.browser-default):focus:not([readonly]),\ninput[type=password]:not(.browser-default):focus:not([readonly]),\ninput[type=email]:not(.browser-default):focus:not([readonly]),\ninput[type=url]:not(.browser-default):focus:not([readonly]),\ninput[type=time]:not(.browser-default):focus:not([readonly]),\ninput[type=date]:not(.browser-default):focus:not([readonly]),\ninput[type=datetime]:not(.browser-default):focus:not([readonly]),\ninput[type=datetime-local]:not(.browser-default):focus:not([readonly]),\ninput[type=tel]:not(.browser-default):focus:not([readonly]),\ninput[type=number]:not(.browser-default):focus:not([readonly]),\ninput[type=search]:not(.browser-default):focus:not([readonly]),\ntextarea.materialize-textarea:focus:not([readonly]) {\n  border-bottom: 1px solid #26a69a;\n  -webkit-box-shadow: 0 1px 0 0 #26a69a;\n          box-shadow: 0 1px 0 0 #26a69a;\n}\n\ninput:not([type]):focus:not([readonly]) + label,\ninput[type=text]:not(.browser-default):focus:not([readonly]) + label,\ninput[type=password]:not(.browser-default):focus:not([readonly]) + label,\ninput[type=email]:not(.browser-default):focus:not([readonly]) + label,\ninput[type=url]:not(.browser-default):focus:not([readonly]) + label,\ninput[type=time]:not(.browser-default):focus:not([readonly]) + label,\ninput[type=date]:not(.browser-default):focus:not([readonly]) + label,\ninput[type=datetime]:not(.browser-default):focus:not([readonly]) + label,\ninput[type=datetime-local]:not(.browser-default):focus:not([readonly]) + label,\ninput[type=tel]:not(.browser-default):focus:not([readonly]) + label,\ninput[type=number]:not(.browser-default):focus:not([readonly]) + label,\ninput[type=search]:not(.browser-default):focus:not([readonly]) + label,\ntextarea.materialize-textarea:focus:not([readonly]) + label {\n  color: #26a69a;\n}\n\ninput:not([type]):focus.valid ~ label,\ninput[type=text]:not(.browser-default):focus.valid ~ label,\ninput[type=password]:not(.browser-default):focus.valid ~ label,\ninput[type=email]:not(.browser-default):focus.valid ~ label,\ninput[type=url]:not(.browser-default):focus.valid ~ label,\ninput[type=time]:not(.browser-default):focus.valid ~ label,\ninput[type=date]:not(.browser-default):focus.valid ~ label,\ninput[type=datetime]:not(.browser-default):focus.valid ~ label,\ninput[type=datetime-local]:not(.browser-default):focus.valid ~ label,\ninput[type=tel]:not(.browser-default):focus.valid ~ label,\ninput[type=number]:not(.browser-default):focus.valid ~ label,\ninput[type=search]:not(.browser-default):focus.valid ~ label,\ntextarea.materialize-textarea:focus.valid ~ label {\n  color: #4CAF50;\n}\n\ninput:not([type]):focus.invalid ~ label,\ninput[type=text]:not(.browser-default):focus.invalid ~ label,\ninput[type=password]:not(.browser-default):focus.invalid ~ label,\ninput[type=email]:not(.browser-default):focus.invalid ~ label,\ninput[type=url]:not(.browser-default):focus.invalid ~ label,\ninput[type=time]:not(.browser-default):focus.invalid ~ label,\ninput[type=date]:not(.browser-default):focus.invalid ~ label,\ninput[type=datetime]:not(.browser-default):focus.invalid ~ label,\ninput[type=datetime-local]:not(.browser-default):focus.invalid ~ label,\ninput[type=tel]:not(.browser-default):focus.invalid ~ label,\ninput[type=number]:not(.browser-default):focus.invalid ~ label,\ninput[type=search]:not(.browser-default):focus.invalid ~ label,\ntextarea.materialize-textarea:focus.invalid ~ label {\n  color: #F44336;\n}\n\ninput:not([type]).validate + label,\ninput[type=text]:not(.browser-default).validate + label,\ninput[type=password]:not(.browser-default).validate + label,\ninput[type=email]:not(.browser-default).validate + label,\ninput[type=url]:not(.browser-default).validate + label,\ninput[type=time]:not(.browser-default).validate + label,\ninput[type=date]:not(.browser-default).validate + label,\ninput[type=datetime]:not(.browser-default).validate + label,\ninput[type=datetime-local]:not(.browser-default).validate + label,\ninput[type=tel]:not(.browser-default).validate + label,\ninput[type=number]:not(.browser-default).validate + label,\ninput[type=search]:not(.browser-default).validate + label,\ntextarea.materialize-textarea.validate + label {\n  width: 100%;\n}\n\n/* Validation Sass Placeholders */\ninput.valid:not([type]), input.valid:not([type]):focus,\ninput.valid[type=text]:not(.browser-default),\ninput.valid[type=text]:not(.browser-default):focus,\ninput.valid[type=password]:not(.browser-default),\ninput.valid[type=password]:not(.browser-default):focus,\ninput.valid[type=email]:not(.browser-default),\ninput.valid[type=email]:not(.browser-default):focus,\ninput.valid[type=url]:not(.browser-default),\ninput.valid[type=url]:not(.browser-default):focus,\ninput.valid[type=time]:not(.browser-default),\ninput.valid[type=time]:not(.browser-default):focus,\ninput.valid[type=date]:not(.browser-default),\ninput.valid[type=date]:not(.browser-default):focus,\ninput.valid[type=datetime]:not(.browser-default),\ninput.valid[type=datetime]:not(.browser-default):focus,\ninput.valid[type=datetime-local]:not(.browser-default),\ninput.valid[type=datetime-local]:not(.browser-default):focus,\ninput.valid[type=tel]:not(.browser-default),\ninput.valid[type=tel]:not(.browser-default):focus,\ninput.valid[type=number]:not(.browser-default),\ninput.valid[type=number]:not(.browser-default):focus,\ninput.valid[type=search]:not(.browser-default),\ninput.valid[type=search]:not(.browser-default):focus,\ntextarea.materialize-textarea.valid,\ntextarea.materialize-textarea.valid:focus, .select-wrapper.valid > input.select-dropdown {\n  border-bottom: 1px solid #4CAF50;\n  -webkit-box-shadow: 0 1px 0 0 #4CAF50;\n          box-shadow: 0 1px 0 0 #4CAF50;\n}\n\ninput.invalid:not([type]), input.invalid:not([type]):focus,\ninput.invalid[type=text]:not(.browser-default),\ninput.invalid[type=text]:not(.browser-default):focus,\ninput.invalid[type=password]:not(.browser-default),\ninput.invalid[type=password]:not(.browser-default):focus,\ninput.invalid[type=email]:not(.browser-default),\ninput.invalid[type=email]:not(.browser-default):focus,\ninput.invalid[type=url]:not(.browser-default),\ninput.invalid[type=url]:not(.browser-default):focus,\ninput.invalid[type=time]:not(.browser-default),\ninput.invalid[type=time]:not(.browser-default):focus,\ninput.invalid[type=date]:not(.browser-default),\ninput.invalid[type=date]:not(.browser-default):focus,\ninput.invalid[type=datetime]:not(.browser-default),\ninput.invalid[type=datetime]:not(.browser-default):focus,\ninput.invalid[type=datetime-local]:not(.browser-default),\ninput.invalid[type=datetime-local]:not(.browser-default):focus,\ninput.invalid[type=tel]:not(.browser-default),\ninput.invalid[type=tel]:not(.browser-default):focus,\ninput.invalid[type=number]:not(.browser-default),\ninput.invalid[type=number]:not(.browser-default):focus,\ninput.invalid[type=search]:not(.browser-default),\ninput.invalid[type=search]:not(.browser-default):focus,\ntextarea.materialize-textarea.invalid,\ntextarea.materialize-textarea.invalid:focus, .select-wrapper.invalid > input.select-dropdown,\n.select-wrapper.invalid > input.select-dropdown:focus {\n  border-bottom: 1px solid #F44336;\n  -webkit-box-shadow: 0 1px 0 0 #F44336;\n          box-shadow: 0 1px 0 0 #F44336;\n}\n\ninput:not([type]).valid ~ .helper-text[data-success],\ninput:not([type]):focus.valid ~ .helper-text[data-success],\ninput:not([type]).invalid ~ .helper-text[data-error],\ninput:not([type]):focus.invalid ~ .helper-text[data-error],\ninput[type=text]:not(.browser-default).valid ~ .helper-text[data-success],\ninput[type=text]:not(.browser-default):focus.valid ~ .helper-text[data-success],\ninput[type=text]:not(.browser-default).invalid ~ .helper-text[data-error],\ninput[type=text]:not(.browser-default):focus.invalid ~ .helper-text[data-error],\ninput[type=password]:not(.browser-default).valid ~ .helper-text[data-success],\ninput[type=password]:not(.browser-default):focus.valid ~ .helper-text[data-success],\ninput[type=password]:not(.browser-default).invalid ~ .helper-text[data-error],\ninput[type=password]:not(.browser-default):focus.invalid ~ .helper-text[data-error],\ninput[type=email]:not(.browser-default).valid ~ .helper-text[data-success],\ninput[type=email]:not(.browser-default):focus.valid ~ .helper-text[data-success],\ninput[type=email]:not(.browser-default).invalid ~ .helper-text[data-error],\ninput[type=email]:not(.browser-default):focus.invalid ~ .helper-text[data-error],\ninput[type=url]:not(.browser-default).valid ~ .helper-text[data-success],\ninput[type=url]:not(.browser-default):focus.valid ~ .helper-text[data-success],\ninput[type=url]:not(.browser-default).invalid ~ .helper-text[data-error],\ninput[type=url]:not(.browser-default):focus.invalid ~ .helper-text[data-error],\ninput[type=time]:not(.browser-default).valid ~ .helper-text[data-success],\ninput[type=time]:not(.browser-default):focus.valid ~ .helper-text[data-success],\ninput[type=time]:not(.browser-default).invalid ~ .helper-text[data-error],\ninput[type=time]:not(.browser-default):focus.invalid ~ .helper-text[data-error],\ninput[type=date]:not(.browser-default).valid ~ .helper-text[data-success],\ninput[type=date]:not(.browser-default):focus.valid ~ .helper-text[data-success],\ninput[type=date]:not(.browser-default).invalid ~ .helper-text[data-error],\ninput[type=date]:not(.browser-default):focus.invalid ~ .helper-text[data-error],\ninput[type=datetime]:not(.browser-default).valid ~ .helper-text[data-success],\ninput[type=datetime]:not(.browser-default):focus.valid ~ .helper-text[data-success],\ninput[type=datetime]:not(.browser-default).invalid ~ .helper-text[data-error],\ninput[type=datetime]:not(.browser-default):focus.invalid ~ .helper-text[data-error],\ninput[type=datetime-local]:not(.browser-default).valid ~ .helper-text[data-success],\ninput[type=datetime-local]:not(.browser-default):focus.valid ~ .helper-text[data-success],\ninput[type=datetime-local]:not(.browser-default).invalid ~ .helper-text[data-error],\ninput[type=datetime-local]:not(.browser-default):focus.invalid ~ .helper-text[data-error],\ninput[type=tel]:not(.browser-default).valid ~ .helper-text[data-success],\ninput[type=tel]:not(.browser-default):focus.valid ~ .helper-text[data-success],\ninput[type=tel]:not(.browser-default).invalid ~ .helper-text[data-error],\ninput[type=tel]:not(.browser-default):focus.invalid ~ .helper-text[data-error],\ninput[type=number]:not(.browser-default).valid ~ .helper-text[data-success],\ninput[type=number]:not(.browser-default):focus.valid ~ .helper-text[data-success],\ninput[type=number]:not(.browser-default).invalid ~ .helper-text[data-error],\ninput[type=number]:not(.browser-default):focus.invalid ~ .helper-text[data-error],\ninput[type=search]:not(.browser-default).valid ~ .helper-text[data-success],\ninput[type=search]:not(.browser-default):focus.valid ~ .helper-text[data-success],\ninput[type=search]:not(.browser-default).invalid ~ .helper-text[data-error],\ninput[type=search]:not(.browser-default):focus.invalid ~ .helper-text[data-error],\ntextarea.materialize-textarea.valid ~ .helper-text[data-success],\ntextarea.materialize-textarea:focus.valid ~ .helper-text[data-success],\ntextarea.materialize-textarea.invalid ~ .helper-text[data-error],\ntextarea.materialize-textarea:focus.invalid ~ .helper-text[data-error], .select-wrapper.valid .helper-text[data-success],\n.select-wrapper.invalid ~ .helper-text[data-error] {\n  color: transparent;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  pointer-events: none;\n}\n\ninput:not([type]).valid ~ .helper-text:after,\ninput:not([type]):focus.valid ~ .helper-text:after,\ninput[type=text]:not(.browser-default).valid ~ .helper-text:after,\ninput[type=text]:not(.browser-default):focus.valid ~ .helper-text:after,\ninput[type=password]:not(.browser-default).valid ~ .helper-text:after,\ninput[type=password]:not(.browser-default):focus.valid ~ .helper-text:after,\ninput[type=email]:not(.browser-default).valid ~ .helper-text:after,\ninput[type=email]:not(.browser-default):focus.valid ~ .helper-text:after,\ninput[type=url]:not(.browser-default).valid ~ .helper-text:after,\ninput[type=url]:not(.browser-default):focus.valid ~ .helper-text:after,\ninput[type=time]:not(.browser-default).valid ~ .helper-text:after,\ninput[type=time]:not(.browser-default):focus.valid ~ .helper-text:after,\ninput[type=date]:not(.browser-default).valid ~ .helper-text:after,\ninput[type=date]:not(.browser-default):focus.valid ~ .helper-text:after,\ninput[type=datetime]:not(.browser-default).valid ~ .helper-text:after,\ninput[type=datetime]:not(.browser-default):focus.valid ~ .helper-text:after,\ninput[type=datetime-local]:not(.browser-default).valid ~ .helper-text:after,\ninput[type=datetime-local]:not(.browser-default):focus.valid ~ .helper-text:after,\ninput[type=tel]:not(.browser-default).valid ~ .helper-text:after,\ninput[type=tel]:not(.browser-default):focus.valid ~ .helper-text:after,\ninput[type=number]:not(.browser-default).valid ~ .helper-text:after,\ninput[type=number]:not(.browser-default):focus.valid ~ .helper-text:after,\ninput[type=search]:not(.browser-default).valid ~ .helper-text:after,\ninput[type=search]:not(.browser-default):focus.valid ~ .helper-text:after,\ntextarea.materialize-textarea.valid ~ .helper-text:after,\ntextarea.materialize-textarea:focus.valid ~ .helper-text:after, .select-wrapper.valid ~ .helper-text:after {\n  content: attr(data-success);\n  color: #4CAF50;\n}\n\ninput:not([type]).invalid ~ .helper-text:after,\ninput:not([type]):focus.invalid ~ .helper-text:after,\ninput[type=text]:not(.browser-default).invalid ~ .helper-text:after,\ninput[type=text]:not(.browser-default):focus.invalid ~ .helper-text:after,\ninput[type=password]:not(.browser-default).invalid ~ .helper-text:after,\ninput[type=password]:not(.browser-default):focus.invalid ~ .helper-text:after,\ninput[type=email]:not(.browser-default).invalid ~ .helper-text:after,\ninput[type=email]:not(.browser-default):focus.invalid ~ .helper-text:after,\ninput[type=url]:not(.browser-default).invalid ~ .helper-text:after,\ninput[type=url]:not(.browser-default):focus.invalid ~ .helper-text:after,\ninput[type=time]:not(.browser-default).invalid ~ .helper-text:after,\ninput[type=time]:not(.browser-default):focus.invalid ~ .helper-text:after,\ninput[type=date]:not(.browser-default).invalid ~ .helper-text:after,\ninput[type=date]:not(.browser-default):focus.invalid ~ .helper-text:after,\ninput[type=datetime]:not(.browser-default).invalid ~ .helper-text:after,\ninput[type=datetime]:not(.browser-default):focus.invalid ~ .helper-text:after,\ninput[type=datetime-local]:not(.browser-default).invalid ~ .helper-text:after,\ninput[type=datetime-local]:not(.browser-default):focus.invalid ~ .helper-text:after,\ninput[type=tel]:not(.browser-default).invalid ~ .helper-text:after,\ninput[type=tel]:not(.browser-default):focus.invalid ~ .helper-text:after,\ninput[type=number]:not(.browser-default).invalid ~ .helper-text:after,\ninput[type=number]:not(.browser-default):focus.invalid ~ .helper-text:after,\ninput[type=search]:not(.browser-default).invalid ~ .helper-text:after,\ninput[type=search]:not(.browser-default):focus.invalid ~ .helper-text:after,\ntextarea.materialize-textarea.invalid ~ .helper-text:after,\ntextarea.materialize-textarea:focus.invalid ~ .helper-text:after, .select-wrapper.invalid ~ .helper-text:after {\n  content: attr(data-error);\n  color: #F44336;\n}\n\ninput:not([type]) + label:after,\ninput[type=text]:not(.browser-default) + label:after,\ninput[type=password]:not(.browser-default) + label:after,\ninput[type=email]:not(.browser-default) + label:after,\ninput[type=url]:not(.browser-default) + label:after,\ninput[type=time]:not(.browser-default) + label:after,\ninput[type=date]:not(.browser-default) + label:after,\ninput[type=datetime]:not(.browser-default) + label:after,\ninput[type=datetime-local]:not(.browser-default) + label:after,\ninput[type=tel]:not(.browser-default) + label:after,\ninput[type=number]:not(.browser-default) + label:after,\ninput[type=search]:not(.browser-default) + label:after,\ntextarea.materialize-textarea + label:after, .select-wrapper + label:after {\n  display: block;\n  content: \"\";\n  position: absolute;\n  top: 100%;\n  left: 0;\n  opacity: 0;\n  -webkit-transition: .2s opacity ease-out, .2s color ease-out;\n  transition: .2s opacity ease-out, .2s color ease-out;\n}\n\n.input-field {\n  position: relative;\n  margin-top: 1rem;\n  margin-bottom: 1rem;\n}\n\n.input-field.inline {\n  display: inline-block;\n  vertical-align: middle;\n  margin-left: 5px;\n}\n\n.input-field.inline input,\n.input-field.inline .select-dropdown {\n  margin-bottom: 1rem;\n}\n\n.input-field.col label {\n  left: 0.75rem;\n}\n\n.input-field.col .prefix ~ label,\n.input-field.col .prefix ~ .validate ~ label {\n  width: calc(100% - 3rem - 1.5rem);\n}\n\n.input-field > label {\n  color: #9e9e9e;\n  position: absolute;\n  top: 0;\n  left: 0;\n  font-size: 1rem;\n  cursor: text;\n  -webkit-transition: color .2s ease-out, -webkit-transform .2s ease-out;\n  transition: color .2s ease-out, -webkit-transform .2s ease-out;\n  transition: transform .2s ease-out, color .2s ease-out;\n  transition: transform .2s ease-out, color .2s ease-out, -webkit-transform .2s ease-out;\n  -webkit-transform-origin: 0% 100%;\n          transform-origin: 0% 100%;\n  text-align: initial;\n  -webkit-transform: translateY(12px);\n          transform: translateY(12px);\n}\n\n.input-field > label:not(.label-icon).active {\n  -webkit-transform: translateY(-14px) scale(0.8);\n          transform: translateY(-14px) scale(0.8);\n  -webkit-transform-origin: 0 0;\n          transform-origin: 0 0;\n}\n\n.input-field > input[type]:-webkit-autofill:not(.browser-default):not([type=\"search\"]) + label,\n.input-field > input[type=date]:not(.browser-default) + label,\n.input-field > input[type=time]:not(.browser-default) + label {\n  -webkit-transform: translateY(-14px) scale(0.8);\n          transform: translateY(-14px) scale(0.8);\n  -webkit-transform-origin: 0 0;\n          transform-origin: 0 0;\n}\n\n.input-field .helper-text {\n  position: relative;\n  min-height: 18px;\n  display: block;\n  font-size: 12px;\n  color: rgba(0, 0, 0, 0.54);\n}\n\n.input-field .helper-text::after {\n  opacity: 1;\n  position: absolute;\n  top: 0;\n  left: 0;\n}\n\n.input-field .prefix {\n  position: absolute;\n  width: 3rem;\n  font-size: 2rem;\n  -webkit-transition: color .2s;\n  transition: color .2s;\n  top: 0.5rem;\n}\n\n.input-field .prefix.active {\n  color: #26a69a;\n}\n\n.input-field .prefix ~ input,\n.input-field .prefix ~ textarea,\n.input-field .prefix ~ label,\n.input-field .prefix ~ .validate ~ label,\n.input-field .prefix ~ .helper-text,\n.input-field .prefix ~ .autocomplete-content {\n  margin-left: 3rem;\n  width: 92%;\n  width: calc(100% - 3rem);\n}\n\n.input-field .prefix ~ label {\n  margin-left: 3rem;\n}\n\n@media only screen and (max-width: 992px) {\n  .input-field .prefix ~ input {\n    width: 86%;\n    width: calc(100% - 3rem);\n  }\n}\n\n@media only screen and (max-width: 600px) {\n  .input-field .prefix ~ input {\n    width: 80%;\n    width: calc(100% - 3rem);\n  }\n}\n\n/* Search Field */\n.input-field input[type=search] {\n  display: block;\n  line-height: inherit;\n  -webkit-transition: .3s background-color;\n  transition: .3s background-color;\n}\n\n.nav-wrapper .input-field input[type=search] {\n  height: inherit;\n  padding-left: 4rem;\n  width: calc(100% - 4rem);\n  border: 0;\n  -webkit-box-shadow: none;\n          box-shadow: none;\n}\n\n.input-field input[type=search]:focus:not(.browser-default) {\n  background-color: #fff;\n  border: 0;\n  -webkit-box-shadow: none;\n          box-shadow: none;\n  color: #444;\n}\n\n.input-field input[type=search]:focus:not(.browser-default) + label i,\n.input-field input[type=search]:focus:not(.browser-default) ~ .mdi-navigation-close,\n.input-field input[type=search]:focus:not(.browser-default) ~ .material-icons {\n  color: #444;\n}\n\n.input-field input[type=search] + .label-icon {\n  -webkit-transform: none;\n          transform: none;\n  left: 1rem;\n}\n\n.input-field input[type=search] ~ .mdi-navigation-close,\n.input-field input[type=search] ~ .material-icons {\n  position: absolute;\n  top: 0;\n  right: 1rem;\n  color: transparent;\n  cursor: pointer;\n  font-size: 2rem;\n  -webkit-transition: .3s color;\n  transition: .3s color;\n}\n\n/* Textarea */\ntextarea {\n  width: 100%;\n  height: 3rem;\n  background-color: transparent;\n}\n\ntextarea.materialize-textarea {\n  line-height: normal;\n  overflow-y: hidden;\n  /* prevents scroll bar flash */\n  padding: .8rem 0 .8rem 0;\n  /* prevents text jump on Enter keypress */\n  resize: none;\n  min-height: 3rem;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n}\n\n.hiddendiv {\n  visibility: hidden;\n  white-space: pre-wrap;\n  word-wrap: break-word;\n  overflow-wrap: break-word;\n  /* future version of deprecated 'word-wrap' */\n  padding-top: 1.2rem;\n  /* prevents text jump on Enter keypress */\n  position: absolute;\n  top: 0;\n  z-index: -1;\n}\n\n/* Autocomplete */\n.autocomplete-content li .highlight {\n  color: #444;\n}\n\n.autocomplete-content li img {\n  height: 40px;\n  width: 40px;\n  margin: 5px 15px;\n}\n\n/* Character Counter */\n.character-counter {\n  min-height: 18px;\n}\n\n/* Radio Buttons\n   ========================================================================== */\n[type=\"radio\"]:not(:checked),\n[type=\"radio\"]:checked {\n  position: absolute;\n  opacity: 0;\n  pointer-events: none;\n}\n\n[type=\"radio\"]:not(:checked) + span,\n[type=\"radio\"]:checked + span {\n  position: relative;\n  padding-left: 35px;\n  cursor: pointer;\n  display: inline-block;\n  height: 25px;\n  line-height: 25px;\n  font-size: 1rem;\n  -webkit-transition: .28s ease;\n  transition: .28s ease;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n\n[type=\"radio\"] + span:before,\n[type=\"radio\"] + span:after {\n  content: '';\n  position: absolute;\n  left: 0;\n  top: 0;\n  margin: 4px;\n  width: 16px;\n  height: 16px;\n  z-index: 0;\n  -webkit-transition: .28s ease;\n  transition: .28s ease;\n}\n\n/* Unchecked styles */\n[type=\"radio\"]:not(:checked) + span:before,\n[type=\"radio\"]:not(:checked) + span:after,\n[type=\"radio\"]:checked + span:before,\n[type=\"radio\"]:checked + span:after,\n[type=\"radio\"].with-gap:checked + span:before,\n[type=\"radio\"].with-gap:checked + span:after {\n  border-radius: 50%;\n}\n\n[type=\"radio\"]:not(:checked) + span:before,\n[type=\"radio\"]:not(:checked) + span:after {\n  border: 2px solid #5a5a5a;\n}\n\n[type=\"radio\"]:not(:checked) + span:after {\n  -webkit-transform: scale(0);\n          transform: scale(0);\n}\n\n/* Checked styles */\n[type=\"radio\"]:checked + span:before {\n  border: 2px solid transparent;\n}\n\n[type=\"radio\"]:checked + span:after,\n[type=\"radio\"].with-gap:checked + span:before,\n[type=\"radio\"].with-gap:checked + span:after {\n  border: 2px solid #26a69a;\n}\n\n[type=\"radio\"]:checked + span:after,\n[type=\"radio\"].with-gap:checked + span:after {\n  background-color: #26a69a;\n}\n\n[type=\"radio\"]:checked + span:after {\n  -webkit-transform: scale(1.02);\n          transform: scale(1.02);\n}\n\n/* Radio With gap */\n[type=\"radio\"].with-gap:checked + span:after {\n  -webkit-transform: scale(0.5);\n          transform: scale(0.5);\n}\n\n/* Focused styles */\n[type=\"radio\"].tabbed:focus + span:before {\n  -webkit-box-shadow: 0 0 0 10px rgba(0, 0, 0, 0.1);\n          box-shadow: 0 0 0 10px rgba(0, 0, 0, 0.1);\n}\n\n/* Disabled Radio With gap */\n[type=\"radio\"].with-gap:disabled:checked + span:before {\n  border: 2px solid rgba(0, 0, 0, 0.42);\n}\n\n[type=\"radio\"].with-gap:disabled:checked + span:after {\n  border: none;\n  background-color: rgba(0, 0, 0, 0.42);\n}\n\n/* Disabled style */\n[type=\"radio\"]:disabled:not(:checked) + span:before,\n[type=\"radio\"]:disabled:checked + span:before {\n  background-color: transparent;\n  border-color: rgba(0, 0, 0, 0.42);\n}\n\n[type=\"radio\"]:disabled + span {\n  color: rgba(0, 0, 0, 0.42);\n}\n\n[type=\"radio\"]:disabled:not(:checked) + span:before {\n  border-color: rgba(0, 0, 0, 0.42);\n}\n\n[type=\"radio\"]:disabled:checked + span:after {\n  background-color: rgba(0, 0, 0, 0.42);\n  border-color: #949494;\n}\n\n/* Checkboxes\n   ========================================================================== */\n/* Remove default checkbox */\n[type=\"checkbox\"]:not(:checked),\n[type=\"checkbox\"]:checked {\n  position: absolute;\n  opacity: 0;\n  pointer-events: none;\n}\n\n[type=\"checkbox\"] {\n  /* checkbox aspect */\n}\n\n[type=\"checkbox\"] + span:not(.lever) {\n  position: relative;\n  padding-left: 35px;\n  cursor: pointer;\n  display: inline-block;\n  height: 25px;\n  line-height: 25px;\n  font-size: 1rem;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n\n[type=\"checkbox\"] + span:not(.lever):before,\n[type=\"checkbox\"]:not(.filled-in) + span:not(.lever):after {\n  content: '';\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 18px;\n  height: 18px;\n  z-index: 0;\n  border: 2px solid #5a5a5a;\n  border-radius: 1px;\n  margin-top: 3px;\n  -webkit-transition: .2s;\n  transition: .2s;\n}\n\n[type=\"checkbox\"]:not(.filled-in) + span:not(.lever):after {\n  border: 0;\n  -webkit-transform: scale(0);\n          transform: scale(0);\n}\n\n[type=\"checkbox\"]:not(:checked):disabled + span:not(.lever):before {\n  border: none;\n  background-color: rgba(0, 0, 0, 0.42);\n}\n\n[type=\"checkbox\"].tabbed:focus + span:not(.lever):after {\n  -webkit-transform: scale(1);\n          transform: scale(1);\n  border: 0;\n  border-radius: 50%;\n  -webkit-box-shadow: 0 0 0 10px rgba(0, 0, 0, 0.1);\n          box-shadow: 0 0 0 10px rgba(0, 0, 0, 0.1);\n  background-color: rgba(0, 0, 0, 0.1);\n}\n\n[type=\"checkbox\"]:checked + span:not(.lever):before {\n  top: -4px;\n  left: -5px;\n  width: 12px;\n  height: 22px;\n  border-top: 2px solid transparent;\n  border-left: 2px solid transparent;\n  border-right: 2px solid #26a69a;\n  border-bottom: 2px solid #26a69a;\n  -webkit-transform: rotate(40deg);\n          transform: rotate(40deg);\n  -webkit-backface-visibility: hidden;\n          backface-visibility: hidden;\n  -webkit-transform-origin: 100% 100%;\n          transform-origin: 100% 100%;\n}\n\n[type=\"checkbox\"]:checked:disabled + span:before {\n  border-right: 2px solid rgba(0, 0, 0, 0.42);\n  border-bottom: 2px solid rgba(0, 0, 0, 0.42);\n}\n\n/* Indeterminate checkbox */\n[type=\"checkbox\"]:indeterminate + span:not(.lever):before {\n  top: -11px;\n  left: -12px;\n  width: 10px;\n  height: 22px;\n  border-top: none;\n  border-left: none;\n  border-right: 2px solid #26a69a;\n  border-bottom: none;\n  -webkit-transform: rotate(90deg);\n          transform: rotate(90deg);\n  -webkit-backface-visibility: hidden;\n          backface-visibility: hidden;\n  -webkit-transform-origin: 100% 100%;\n          transform-origin: 100% 100%;\n}\n\n[type=\"checkbox\"]:indeterminate:disabled + span:not(.lever):before {\n  border-right: 2px solid rgba(0, 0, 0, 0.42);\n  background-color: transparent;\n}\n\n[type=\"checkbox\"].filled-in + span:not(.lever):after {\n  border-radius: 2px;\n}\n\n[type=\"checkbox\"].filled-in + span:not(.lever):before,\n[type=\"checkbox\"].filled-in + span:not(.lever):after {\n  content: '';\n  left: 0;\n  position: absolute;\n  /* .1s delay is for check animation */\n  -webkit-transition: border .25s, background-color .25s, width .20s .1s, height .20s .1s, top .20s .1s, left .20s .1s;\n  transition: border .25s, background-color .25s, width .20s .1s, height .20s .1s, top .20s .1s, left .20s .1s;\n  z-index: 1;\n}\n\n[type=\"checkbox\"].filled-in:not(:checked) + span:not(.lever):before {\n  width: 0;\n  height: 0;\n  border: 3px solid transparent;\n  left: 6px;\n  top: 10px;\n  -webkit-transform: rotateZ(37deg);\n          transform: rotateZ(37deg);\n  -webkit-transform-origin: 100% 100%;\n          transform-origin: 100% 100%;\n}\n\n[type=\"checkbox\"].filled-in:not(:checked) + span:not(.lever):after {\n  height: 20px;\n  width: 20px;\n  background-color: transparent;\n  border: 2px solid #5a5a5a;\n  top: 0px;\n  z-index: 0;\n}\n\n[type=\"checkbox\"].filled-in:checked + span:not(.lever):before {\n  top: 0;\n  left: 1px;\n  width: 8px;\n  height: 13px;\n  border-top: 2px solid transparent;\n  border-left: 2px solid transparent;\n  border-right: 2px solid #fff;\n  border-bottom: 2px solid #fff;\n  -webkit-transform: rotateZ(37deg);\n          transform: rotateZ(37deg);\n  -webkit-transform-origin: 100% 100%;\n          transform-origin: 100% 100%;\n}\n\n[type=\"checkbox\"].filled-in:checked + span:not(.lever):after {\n  top: 0;\n  width: 20px;\n  height: 20px;\n  border: 2px solid #26a69a;\n  background-color: #26a69a;\n  z-index: 0;\n}\n\n[type=\"checkbox\"].filled-in.tabbed:focus + span:not(.lever):after {\n  border-radius: 2px;\n  border-color: #5a5a5a;\n  background-color: rgba(0, 0, 0, 0.1);\n}\n\n[type=\"checkbox\"].filled-in.tabbed:checked:focus + span:not(.lever):after {\n  border-radius: 2px;\n  background-color: #26a69a;\n  border-color: #26a69a;\n}\n\n[type=\"checkbox\"].filled-in:disabled:not(:checked) + span:not(.lever):before {\n  background-color: transparent;\n  border: 2px solid transparent;\n}\n\n[type=\"checkbox\"].filled-in:disabled:not(:checked) + span:not(.lever):after {\n  border-color: transparent;\n  background-color: #949494;\n}\n\n[type=\"checkbox\"].filled-in:disabled:checked + span:not(.lever):before {\n  background-color: transparent;\n}\n\n[type=\"checkbox\"].filled-in:disabled:checked + span:not(.lever):after {\n  background-color: #949494;\n  border-color: #949494;\n}\n\n/* Switch\r\n   ========================================================================== */\n.switch,\n.switch * {\n  -webkit-tap-highlight-color: transparent;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n\n.switch label {\n  cursor: pointer;\n}\n\n.switch label input[type=checkbox] {\n  opacity: 0;\n  width: 0;\n  height: 0;\n}\n\n.switch label input[type=checkbox]:checked + .lever {\n  background-color: #84c7c1;\n}\n\n.switch label input[type=checkbox]:checked + .lever:before, .switch label input[type=checkbox]:checked + .lever:after {\n  left: 18px;\n}\n\n.switch label input[type=checkbox]:checked + .lever:after {\n  background-color: #26a69a;\n}\n\n.switch label .lever {\n  content: \"\";\n  display: inline-block;\n  position: relative;\n  width: 36px;\n  height: 14px;\n  background-color: rgba(0, 0, 0, 0.38);\n  border-radius: 15px;\n  margin-right: 10px;\n  -webkit-transition: background 0.3s ease;\n  transition: background 0.3s ease;\n  vertical-align: middle;\n  margin: 0 16px;\n}\n\n.switch label .lever:before, .switch label .lever:after {\n  content: \"\";\n  position: absolute;\n  display: inline-block;\n  width: 20px;\n  height: 20px;\n  border-radius: 50%;\n  left: 0;\n  top: -3px;\n  -webkit-transition: left 0.3s ease, background .3s ease, -webkit-box-shadow 0.1s ease, -webkit-transform .1s ease;\n  transition: left 0.3s ease, background .3s ease, -webkit-box-shadow 0.1s ease, -webkit-transform .1s ease;\n  transition: left 0.3s ease, background .3s ease, box-shadow 0.1s ease, transform .1s ease;\n  transition: left 0.3s ease, background .3s ease, box-shadow 0.1s ease, transform .1s ease, -webkit-box-shadow 0.1s ease, -webkit-transform .1s ease;\n}\n\n.switch label .lever:before {\n  background-color: rgba(38, 166, 154, 0.15);\n}\n\n.switch label .lever:after {\n  background-color: #F1F1F1;\n  -webkit-box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);\n          box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);\n}\n\ninput[type=checkbox]:checked:not(:disabled) ~ .lever:active::before,\ninput[type=checkbox]:checked:not(:disabled).tabbed:focus ~ .lever::before {\n  -webkit-transform: scale(2.4);\n          transform: scale(2.4);\n  background-color: rgba(38, 166, 154, 0.15);\n}\n\ninput[type=checkbox]:not(:disabled) ~ .lever:active:before,\ninput[type=checkbox]:not(:disabled).tabbed:focus ~ .lever::before {\n  -webkit-transform: scale(2.4);\n          transform: scale(2.4);\n  background-color: rgba(0, 0, 0, 0.08);\n}\n\n.switch input[type=checkbox][disabled] + .lever {\n  cursor: default;\n  background-color: rgba(0, 0, 0, 0.12);\n}\n\n.switch label input[type=checkbox][disabled] + .lever:after,\n.switch label input[type=checkbox][disabled]:checked + .lever:after {\n  background-color: #949494;\n}\n\n/* Select Field\n   ========================================================================== */\nselect {\n  display: none;\n}\n\nselect.browser-default {\n  display: block;\n}\n\nselect {\n  background-color: rgba(255, 255, 255, 0.9);\n  width: 100%;\n  padding: 5px;\n  border: 1px solid #f2f2f2;\n  border-radius: 2px;\n  height: 3rem;\n}\n\n.select-label {\n  position: absolute;\n}\n\n.select-wrapper {\n  position: relative;\n}\n\n.select-wrapper.valid + label,\n.select-wrapper.invalid + label {\n  width: 100%;\n  pointer-events: none;\n}\n\n.select-wrapper input.select-dropdown {\n  position: relative;\n  cursor: pointer;\n  background-color: transparent;\n  border: none;\n  border-bottom: 1px solid #9e9e9e;\n  outline: none;\n  height: 3rem;\n  line-height: 3rem;\n  width: 100%;\n  font-size: 16px;\n  margin: 0 0 8px 0;\n  padding: 0;\n  display: block;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  z-index: 1;\n}\n\n.select-wrapper input.select-dropdown:focus {\n  border-bottom: 1px solid #26a69a;\n}\n\n.select-wrapper .caret {\n  position: absolute;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  margin: auto 0;\n  z-index: 0;\n  fill: rgba(0, 0, 0, 0.87);\n}\n\n.select-wrapper + label {\n  position: absolute;\n  top: -26px;\n  font-size: 0.8rem;\n}\n\nselect:disabled {\n  color: rgba(0, 0, 0, 0.42);\n}\n\n.select-wrapper.disabled + label {\n  color: rgba(0, 0, 0, 0.42);\n}\n\n.select-wrapper.disabled .caret {\n  fill: rgba(0, 0, 0, 0.42);\n}\n\n.select-wrapper input.select-dropdown:disabled {\n  color: rgba(0, 0, 0, 0.42);\n  cursor: default;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n\n.select-wrapper i {\n  color: rgba(0, 0, 0, 0.3);\n}\n\n.select-dropdown li.disabled,\n.select-dropdown li.disabled > span,\n.select-dropdown li.optgroup {\n  color: rgba(0, 0, 0, 0.3);\n  background-color: transparent;\n}\n\nbody.keyboard-focused .select-dropdown.dropdown-content li:focus {\n  background-color: rgba(0, 0, 0, 0.08);\n}\n\n.select-dropdown.dropdown-content li:hover {\n  background-color: rgba(0, 0, 0, 0.08);\n}\n\n.select-dropdown.dropdown-content li.selected {\n  background-color: rgba(0, 0, 0, 0.03);\n}\n\n.prefix ~ .select-wrapper {\n  margin-left: 3rem;\n  width: 92%;\n  width: calc(100% - 3rem);\n}\n\n.prefix ~ label {\n  margin-left: 3rem;\n}\n\n.select-dropdown li img {\n  height: 40px;\n  width: 40px;\n  margin: 5px 15px;\n  float: right;\n}\n\n.select-dropdown li.optgroup {\n  border-top: 1px solid #eee;\n}\n\n.select-dropdown li.optgroup.selected > span {\n  color: rgba(0, 0, 0, 0.7);\n}\n\n.select-dropdown li.optgroup > span {\n  color: rgba(0, 0, 0, 0.4);\n}\n\n.select-dropdown li.optgroup ~ li.optgroup-option {\n  padding-left: 1rem;\n}\n\n/* File Input\r\n   ========================================================================== */\n.file-field {\n  position: relative;\n}\n\n.file-field .file-path-wrapper {\n  overflow: hidden;\n  padding-left: 10px;\n}\n\n.file-field input.file-path {\n  width: 100%;\n}\n\n.file-field .btn, .file-field .btn-large, .file-field .btn-small {\n  float: left;\n  height: 3rem;\n  line-height: 3rem;\n}\n\n.file-field span {\n  cursor: pointer;\n}\n\n.file-field input[type=file] {\n  position: absolute;\n  top: 0;\n  right: 0;\n  left: 0;\n  bottom: 0;\n  width: 100%;\n  margin: 0;\n  padding: 0;\n  font-size: 20px;\n  cursor: pointer;\n  opacity: 0;\n  filter: alpha(opacity=0);\n}\n\n.file-field input[type=file]::-webkit-file-upload-button {\n  display: none;\n}\n\n/* Range\n   ========================================================================== */\n.range-field {\n  position: relative;\n}\n\ninput[type=range],\ninput[type=range] + .thumb {\n  cursor: pointer;\n}\n\ninput[type=range] {\n  position: relative;\n  background-color: transparent;\n  border: none;\n  outline: none;\n  width: 100%;\n  margin: 15px 0;\n  padding: 0;\n}\n\ninput[type=range]:focus {\n  outline: none;\n}\n\ninput[type=range] + .thumb {\n  position: absolute;\n  top: 10px;\n  left: 0;\n  border: none;\n  height: 0;\n  width: 0;\n  border-radius: 50%;\n  background-color: #26a69a;\n  margin-left: 7px;\n  -webkit-transform-origin: 50% 50%;\n          transform-origin: 50% 50%;\n  -webkit-transform: rotate(-45deg);\n          transform: rotate(-45deg);\n}\n\ninput[type=range] + .thumb .value {\n  display: block;\n  width: 30px;\n  text-align: center;\n  color: #26a69a;\n  font-size: 0;\n  -webkit-transform: rotate(45deg);\n          transform: rotate(45deg);\n}\n\ninput[type=range] + .thumb.active {\n  border-radius: 50% 50% 50% 0;\n}\n\ninput[type=range] + .thumb.active .value {\n  color: #fff;\n  margin-left: -1px;\n  margin-top: 8px;\n  font-size: 10px;\n}\n\ninput[type=range] {\n  -webkit-appearance: none;\n}\n\ninput[type=range]::-webkit-slider-runnable-track {\n  height: 3px;\n  background: #c2c0c2;\n  border: none;\n}\n\ninput[type=range]::-webkit-slider-thumb {\n  border: none;\n  height: 14px;\n  width: 14px;\n  border-radius: 50%;\n  background: #26a69a;\n  -webkit-transition: -webkit-box-shadow .3s;\n  transition: -webkit-box-shadow .3s;\n  transition: box-shadow .3s;\n  transition: box-shadow .3s, -webkit-box-shadow .3s;\n  -webkit-appearance: none;\n  background-color: #26a69a;\n  -webkit-transform-origin: 50% 50%;\n          transform-origin: 50% 50%;\n  margin: -5px 0 0 0;\n}\n\n.keyboard-focused input[type=range]:focus:not(.active)::-webkit-slider-thumb {\n  -webkit-box-shadow: 0 0 0 10px rgba(38, 166, 154, 0.26);\n          box-shadow: 0 0 0 10px rgba(38, 166, 154, 0.26);\n}\n\ninput[type=range] {\n  /* fix for FF unable to apply focus style bug  */\n  border: 1px solid white;\n  /*required for proper track sizing in FF*/\n}\n\ninput[type=range]::-moz-range-track {\n  height: 3px;\n  background: #c2c0c2;\n  border: none;\n}\n\ninput[type=range]::-moz-focus-inner {\n  border: 0;\n}\n\ninput[type=range]::-moz-range-thumb {\n  border: none;\n  height: 14px;\n  width: 14px;\n  border-radius: 50%;\n  background: #26a69a;\n  -webkit-transition: -webkit-box-shadow .3s;\n  transition: -webkit-box-shadow .3s;\n  transition: box-shadow .3s;\n  transition: box-shadow .3s, -webkit-box-shadow .3s;\n  margin-top: -5px;\n}\n\ninput[type=range]:-moz-focusring {\n  outline: 1px solid #fff;\n  outline-offset: -1px;\n}\n\n.keyboard-focused input[type=range]:focus:not(.active)::-moz-range-thumb {\n  box-shadow: 0 0 0 10px rgba(38, 166, 154, 0.26);\n}\n\ninput[type=range]::-ms-track {\n  height: 3px;\n  background: transparent;\n  border-color: transparent;\n  border-width: 6px 0;\n  /*remove default tick marks*/\n  color: transparent;\n}\n\ninput[type=range]::-ms-fill-lower {\n  background: #777;\n}\n\ninput[type=range]::-ms-fill-upper {\n  background: #ddd;\n}\n\ninput[type=range]::-ms-thumb {\n  border: none;\n  height: 14px;\n  width: 14px;\n  border-radius: 50%;\n  background: #26a69a;\n  -webkit-transition: -webkit-box-shadow .3s;\n  transition: -webkit-box-shadow .3s;\n  transition: box-shadow .3s;\n  transition: box-shadow .3s, -webkit-box-shadow .3s;\n}\n\n.keyboard-focused input[type=range]:focus:not(.active)::-ms-thumb {\n  box-shadow: 0 0 0 10px rgba(38, 166, 154, 0.26);\n}\n\n/***************\n    Nav List\n***************/\n.table-of-contents.fixed {\n  position: fixed;\n}\n\n.table-of-contents li {\n  padding: 2px 0;\n}\n\n.table-of-contents a {\n  display: inline-block;\n  font-weight: 300;\n  color: #757575;\n  padding-left: 16px;\n  height: 1.5rem;\n  line-height: 1.5rem;\n  letter-spacing: .4;\n  display: inline-block;\n}\n\n.table-of-contents a:hover {\n  color: #a8a8a8;\n  padding-left: 15px;\n  border-left: 1px solid #ee6e73;\n}\n\n.table-of-contents a.active {\n  font-weight: 500;\n  padding-left: 14px;\n  border-left: 2px solid #ee6e73;\n}\n\n.sidenav {\n  position: fixed;\n  width: 300px;\n  left: 0;\n  top: 0;\n  margin: 0;\n  -webkit-transform: translateX(-100%);\n          transform: translateX(-100%);\n  height: 100%;\n  height: calc(100% + 60px);\n  height: -moz-calc(100%);\n  padding-bottom: 60px;\n  background-color: #fff;\n  z-index: 999;\n  overflow-y: auto;\n  will-change: transform;\n  -webkit-backface-visibility: hidden;\n          backface-visibility: hidden;\n  -webkit-transform: translateX(-105%);\n          transform: translateX(-105%);\n}\n\n.sidenav.right-aligned {\n  right: 0;\n  -webkit-transform: translateX(105%);\n          transform: translateX(105%);\n  left: auto;\n  -webkit-transform: translateX(100%);\n          transform: translateX(100%);\n}\n\n.sidenav .collapsible {\n  margin: 0;\n}\n\n.sidenav li {\n  float: none;\n  line-height: 48px;\n}\n\n.sidenav li.active {\n  background-color: rgba(0, 0, 0, 0.05);\n}\n\n.sidenav li > a {\n  color: rgba(0, 0, 0, 0.87);\n  display: block;\n  font-size: 14px;\n  font-weight: 500;\n  height: 48px;\n  line-height: 48px;\n  padding: 0 32px;\n}\n\n.sidenav li > a:hover {\n  background-color: rgba(0, 0, 0, 0.05);\n}\n\n.sidenav li > a.btn, .sidenav li > a.btn-large, .sidenav li > a.btn-small, .sidenav li > a.btn-large, .sidenav li > a.btn-flat, .sidenav li > a.btn-floating {\n  margin: 10px 15px;\n}\n\n.sidenav li > a.btn, .sidenav li > a.btn-large, .sidenav li > a.btn-small, .sidenav li > a.btn-large, .sidenav li > a.btn-floating {\n  color: #fff;\n}\n\n.sidenav li > a.btn-flat {\n  color: #343434;\n}\n\n.sidenav li > a.btn:hover, .sidenav li > a.btn-large:hover, .sidenav li > a.btn-small:hover, .sidenav li > a.btn-large:hover {\n  background-color: #2bbbad;\n}\n\n.sidenav li > a.btn-floating:hover {\n  background-color: #26a69a;\n}\n\n.sidenav li > a > i,\n.sidenav li > a > [class^=\"mdi-\"], .sidenav li > a li > a > [class*=\"mdi-\"],\n.sidenav li > a > i.material-icons {\n  float: left;\n  height: 48px;\n  line-height: 48px;\n  margin: 0 32px 0 0;\n  width: 24px;\n  color: rgba(0, 0, 0, 0.54);\n}\n\n.sidenav .divider {\n  margin: 8px 0 0 0;\n}\n\n.sidenav .subheader {\n  cursor: initial;\n  pointer-events: none;\n  color: rgba(0, 0, 0, 0.54);\n  font-size: 14px;\n  font-weight: 500;\n  line-height: 48px;\n}\n\n.sidenav .subheader:hover {\n  background-color: transparent;\n}\n\n.sidenav .user-view {\n  position: relative;\n  padding: 32px 32px 0;\n  margin-bottom: 8px;\n}\n\n.sidenav .user-view > a {\n  height: auto;\n  padding: 0;\n}\n\n.sidenav .user-view > a:hover {\n  background-color: transparent;\n}\n\n.sidenav .user-view .background {\n  overflow: hidden;\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: -1;\n}\n\n.sidenav .user-view .circle, .sidenav .user-view .name, .sidenav .user-view .email {\n  display: block;\n}\n\n.sidenav .user-view .circle {\n  height: 64px;\n  width: 64px;\n}\n\n.sidenav .user-view .name,\n.sidenav .user-view .email {\n  font-size: 14px;\n  line-height: 24px;\n}\n\n.sidenav .user-view .name {\n  margin-top: 16px;\n  font-weight: 500;\n}\n\n.sidenav .user-view .email {\n  padding-bottom: 16px;\n  font-weight: 400;\n}\n\n.drag-target {\n  height: 100%;\n  width: 10px;\n  position: fixed;\n  top: 0;\n  z-index: 998;\n}\n\n.drag-target.right-aligned {\n  right: 0;\n}\n\n.sidenav.sidenav-fixed {\n  left: 0;\n  -webkit-transform: translateX(0);\n          transform: translateX(0);\n  position: fixed;\n}\n\n.sidenav.sidenav-fixed.right-aligned {\n  right: 0;\n  left: auto;\n}\n\n@media only screen and (max-width: 992px) {\n  .sidenav.sidenav-fixed {\n    -webkit-transform: translateX(-105%);\n            transform: translateX(-105%);\n  }\n  .sidenav.sidenav-fixed.right-aligned {\n    -webkit-transform: translateX(105%);\n            transform: translateX(105%);\n  }\n  .sidenav > a {\n    padding: 0 16px;\n  }\n  .sidenav .user-view {\n    padding: 16px 16px 0;\n  }\n}\n\n.sidenav .collapsible-body > ul:not(.collapsible) > li.active,\n.sidenav.sidenav-fixed .collapsible-body > ul:not(.collapsible) > li.active {\n  background-color: #ee6e73;\n}\n\n.sidenav .collapsible-body > ul:not(.collapsible) > li.active a,\n.sidenav.sidenav-fixed .collapsible-body > ul:not(.collapsible) > li.active a {\n  color: #fff;\n}\n\n.sidenav .collapsible-body {\n  padding: 0;\n}\n\n.sidenav-overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  opacity: 0;\n  height: 120vh;\n  background-color: rgba(0, 0, 0, 0.5);\n  z-index: 997;\n  display: none;\n}\n\n/*\r\n    @license\r\n    Copyright (c) 2014 The Polymer Project Authors. All rights reserved.\r\n    This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt\r\n    The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt\r\n    The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt\r\n    Code distributed by Google as part of the polymer project is also\r\n    subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt\r\n */\n/**************************/\n/* STYLES FOR THE SPINNER */\n/**************************/\n/*\r\n * Constants:\r\n *      STROKEWIDTH = 3px\r\n *      ARCSIZE     = 270 degrees (amount of circle the arc takes up)\r\n *      ARCTIME     = 1333ms (time it takes to expand and contract arc)\r\n *      ARCSTARTROT = 216 degrees (how much the start location of the arc\r\n *                                should rotate each time, 216 gives us a\r\n *                                5 pointed star shape (it's 360/5 * 3).\r\n *                                For a 7 pointed star, we might do\r\n *                                360/7 * 3 = 154.286)\r\n *      CONTAINERWIDTH = 28px\r\n *      SHRINK_TIME = 400ms\r\n */\n.preloader-wrapper {\n  display: inline-block;\n  position: relative;\n  width: 50px;\n  height: 50px;\n}\n\n.preloader-wrapper.small {\n  width: 36px;\n  height: 36px;\n}\n\n.preloader-wrapper.big {\n  width: 64px;\n  height: 64px;\n}\n\n.preloader-wrapper.active {\n  /* duration: 360 * ARCTIME / (ARCSTARTROT + (360-ARCSIZE)) */\n  -webkit-animation: container-rotate 1568ms linear infinite;\n  animation: container-rotate 1568ms linear infinite;\n}\n\n@-webkit-keyframes container-rotate {\n  to {\n    -webkit-transform: rotate(360deg);\n  }\n}\n\n@keyframes container-rotate {\n  to {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n  }\n}\n\n.spinner-layer {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  opacity: 0;\n  border-color: #26a69a;\n}\n\n.spinner-blue,\n.spinner-blue-only {\n  border-color: #4285f4;\n}\n\n.spinner-red,\n.spinner-red-only {\n  border-color: #db4437;\n}\n\n.spinner-yellow,\n.spinner-yellow-only {\n  border-color: #f4b400;\n}\n\n.spinner-green,\n.spinner-green-only {\n  border-color: #0f9d58;\n}\n\n/**\r\n * IMPORTANT NOTE ABOUT CSS ANIMATION PROPERTIES (keanulee):\r\n *\r\n * iOS Safari (tested on iOS 8.1) does not handle animation-delay very well - it doesn't\r\n * guarantee that the animation will start _exactly_ after that value. So we avoid using\r\n * animation-delay and instead set custom keyframes for each color (as redundant as it\r\n * seems).\r\n *\r\n * We write out each animation in full (instead of separating animation-name,\r\n * animation-duration, etc.) because under the polyfill, Safari does not recognize those\r\n * specific properties properly, treats them as -webkit-animation, and overrides the\r\n * other animation rules. See https://github.com/Polymer/platform/issues/53.\r\n */\n.active .spinner-layer.spinner-blue {\n  /* durations: 4 * ARCTIME */\n  -webkit-animation: fill-unfill-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both, blue-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;\n  animation: fill-unfill-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both, blue-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;\n}\n\n.active .spinner-layer.spinner-red {\n  /* durations: 4 * ARCTIME */\n  -webkit-animation: fill-unfill-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both, red-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;\n  animation: fill-unfill-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both, red-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;\n}\n\n.active .spinner-layer.spinner-yellow {\n  /* durations: 4 * ARCTIME */\n  -webkit-animation: fill-unfill-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both, yellow-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;\n  animation: fill-unfill-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both, yellow-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;\n}\n\n.active .spinner-layer.spinner-green {\n  /* durations: 4 * ARCTIME */\n  -webkit-animation: fill-unfill-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both, green-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;\n  animation: fill-unfill-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both, green-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;\n}\n\n.active .spinner-layer,\n.active .spinner-layer.spinner-blue-only,\n.active .spinner-layer.spinner-red-only,\n.active .spinner-layer.spinner-yellow-only,\n.active .spinner-layer.spinner-green-only {\n  /* durations: 4 * ARCTIME */\n  opacity: 1;\n  -webkit-animation: fill-unfill-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;\n  animation: fill-unfill-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;\n}\n\n@-webkit-keyframes fill-unfill-rotate {\n  12.5% {\n    -webkit-transform: rotate(135deg);\n  }\n  /* 0.5 * ARCSIZE */\n  25% {\n    -webkit-transform: rotate(270deg);\n  }\n  /* 1   * ARCSIZE */\n  37.5% {\n    -webkit-transform: rotate(405deg);\n  }\n  /* 1.5 * ARCSIZE */\n  50% {\n    -webkit-transform: rotate(540deg);\n  }\n  /* 2   * ARCSIZE */\n  62.5% {\n    -webkit-transform: rotate(675deg);\n  }\n  /* 2.5 * ARCSIZE */\n  75% {\n    -webkit-transform: rotate(810deg);\n  }\n  /* 3   * ARCSIZE */\n  87.5% {\n    -webkit-transform: rotate(945deg);\n  }\n  /* 3.5 * ARCSIZE */\n  to {\n    -webkit-transform: rotate(1080deg);\n  }\n  /* 4   * ARCSIZE */\n}\n\n@keyframes fill-unfill-rotate {\n  12.5% {\n    -webkit-transform: rotate(135deg);\n            transform: rotate(135deg);\n  }\n  /* 0.5 * ARCSIZE */\n  25% {\n    -webkit-transform: rotate(270deg);\n            transform: rotate(270deg);\n  }\n  /* 1   * ARCSIZE */\n  37.5% {\n    -webkit-transform: rotate(405deg);\n            transform: rotate(405deg);\n  }\n  /* 1.5 * ARCSIZE */\n  50% {\n    -webkit-transform: rotate(540deg);\n            transform: rotate(540deg);\n  }\n  /* 2   * ARCSIZE */\n  62.5% {\n    -webkit-transform: rotate(675deg);\n            transform: rotate(675deg);\n  }\n  /* 2.5 * ARCSIZE */\n  75% {\n    -webkit-transform: rotate(810deg);\n            transform: rotate(810deg);\n  }\n  /* 3   * ARCSIZE */\n  87.5% {\n    -webkit-transform: rotate(945deg);\n            transform: rotate(945deg);\n  }\n  /* 3.5 * ARCSIZE */\n  to {\n    -webkit-transform: rotate(1080deg);\n            transform: rotate(1080deg);\n  }\n  /* 4   * ARCSIZE */\n}\n\n@-webkit-keyframes blue-fade-in-out {\n  from {\n    opacity: 1;\n  }\n  25% {\n    opacity: 1;\n  }\n  26% {\n    opacity: 0;\n  }\n  89% {\n    opacity: 0;\n  }\n  90% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n\n@keyframes blue-fade-in-out {\n  from {\n    opacity: 1;\n  }\n  25% {\n    opacity: 1;\n  }\n  26% {\n    opacity: 0;\n  }\n  89% {\n    opacity: 0;\n  }\n  90% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n\n@-webkit-keyframes red-fade-in-out {\n  from {\n    opacity: 0;\n  }\n  15% {\n    opacity: 0;\n  }\n  25% {\n    opacity: 1;\n  }\n  50% {\n    opacity: 1;\n  }\n  51% {\n    opacity: 0;\n  }\n}\n\n@keyframes red-fade-in-out {\n  from {\n    opacity: 0;\n  }\n  15% {\n    opacity: 0;\n  }\n  25% {\n    opacity: 1;\n  }\n  50% {\n    opacity: 1;\n  }\n  51% {\n    opacity: 0;\n  }\n}\n\n@-webkit-keyframes yellow-fade-in-out {\n  from {\n    opacity: 0;\n  }\n  40% {\n    opacity: 0;\n  }\n  50% {\n    opacity: 1;\n  }\n  75% {\n    opacity: 1;\n  }\n  76% {\n    opacity: 0;\n  }\n}\n\n@keyframes yellow-fade-in-out {\n  from {\n    opacity: 0;\n  }\n  40% {\n    opacity: 0;\n  }\n  50% {\n    opacity: 1;\n  }\n  75% {\n    opacity: 1;\n  }\n  76% {\n    opacity: 0;\n  }\n}\n\n@-webkit-keyframes green-fade-in-out {\n  from {\n    opacity: 0;\n  }\n  65% {\n    opacity: 0;\n  }\n  75% {\n    opacity: 1;\n  }\n  90% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0;\n  }\n}\n\n@keyframes green-fade-in-out {\n  from {\n    opacity: 0;\n  }\n  65% {\n    opacity: 0;\n  }\n  75% {\n    opacity: 1;\n  }\n  90% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0;\n  }\n}\n\n/**\r\n * Patch the gap that appear between the two adjacent div.circle-clipper while the\r\n * spinner is rotating (appears on Chrome 38, Safari 7.1, and IE 11).\r\n */\n.gap-patch {\n  position: absolute;\n  top: 0;\n  left: 45%;\n  width: 10%;\n  height: 100%;\n  overflow: hidden;\n  border-color: inherit;\n}\n\n.gap-patch .circle {\n  width: 1000%;\n  left: -450%;\n}\n\n.circle-clipper {\n  display: inline-block;\n  position: relative;\n  width: 50%;\n  height: 100%;\n  overflow: hidden;\n  border-color: inherit;\n}\n\n.circle-clipper .circle {\n  width: 200%;\n  height: 100%;\n  border-width: 3px;\n  /* STROKEWIDTH */\n  border-style: solid;\n  border-color: inherit;\n  border-bottom-color: transparent !important;\n  border-radius: 50%;\n  -webkit-animation: none;\n  animation: none;\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n}\n\n.circle-clipper.left .circle {\n  left: 0;\n  border-right-color: transparent !important;\n  -webkit-transform: rotate(129deg);\n  transform: rotate(129deg);\n}\n\n.circle-clipper.right .circle {\n  left: -100%;\n  border-left-color: transparent !important;\n  -webkit-transform: rotate(-129deg);\n  transform: rotate(-129deg);\n}\n\n.active .circle-clipper.left .circle {\n  /* duration: ARCTIME */\n  -webkit-animation: left-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;\n  animation: left-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;\n}\n\n.active .circle-clipper.right .circle {\n  /* duration: ARCTIME */\n  -webkit-animation: right-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;\n  animation: right-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;\n}\n\n@-webkit-keyframes left-spin {\n  from {\n    -webkit-transform: rotate(130deg);\n  }\n  50% {\n    -webkit-transform: rotate(-5deg);\n  }\n  to {\n    -webkit-transform: rotate(130deg);\n  }\n}\n\n@keyframes left-spin {\n  from {\n    -webkit-transform: rotate(130deg);\n            transform: rotate(130deg);\n  }\n  50% {\n    -webkit-transform: rotate(-5deg);\n            transform: rotate(-5deg);\n  }\n  to {\n    -webkit-transform: rotate(130deg);\n            transform: rotate(130deg);\n  }\n}\n\n@-webkit-keyframes right-spin {\n  from {\n    -webkit-transform: rotate(-130deg);\n  }\n  50% {\n    -webkit-transform: rotate(5deg);\n  }\n  to {\n    -webkit-transform: rotate(-130deg);\n  }\n}\n\n@keyframes right-spin {\n  from {\n    -webkit-transform: rotate(-130deg);\n            transform: rotate(-130deg);\n  }\n  50% {\n    -webkit-transform: rotate(5deg);\n            transform: rotate(5deg);\n  }\n  to {\n    -webkit-transform: rotate(-130deg);\n            transform: rotate(-130deg);\n  }\n}\n\n#spinnerContainer.cooldown {\n  /* duration: SHRINK_TIME */\n  -webkit-animation: container-rotate 1568ms linear infinite, fade-out 400ms cubic-bezier(0.4, 0, 0.2, 1);\n  animation: container-rotate 1568ms linear infinite, fade-out 400ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n\n@-webkit-keyframes fade-out {\n  from {\n    opacity: 1;\n  }\n  to {\n    opacity: 0;\n  }\n}\n\n@keyframes fade-out {\n  from {\n    opacity: 1;\n  }\n  to {\n    opacity: 0;\n  }\n}\n\n.slider {\n  position: relative;\n  height: 400px;\n  width: 100%;\n}\n\n.slider.fullscreen {\n  height: 100%;\n  width: 100%;\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n}\n\n.slider.fullscreen ul.slides {\n  height: 100%;\n}\n\n.slider.fullscreen ul.indicators {\n  z-index: 2;\n  bottom: 30px;\n}\n\n.slider .slides {\n  background-color: #9e9e9e;\n  margin: 0;\n  height: 400px;\n}\n\n.slider .slides li {\n  opacity: 0;\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: 1;\n  width: 100%;\n  height: inherit;\n  overflow: hidden;\n}\n\n.slider .slides li img {\n  height: 100%;\n  width: 100%;\n  background-size: cover;\n  background-position: center;\n}\n\n.slider .slides li .caption {\n  color: #fff;\n  position: absolute;\n  top: 15%;\n  left: 15%;\n  width: 70%;\n  opacity: 0;\n}\n\n.slider .slides li .caption p {\n  color: #e0e0e0;\n}\n\n.slider .slides li.active {\n  z-index: 2;\n}\n\n.slider .indicators {\n  position: absolute;\n  text-align: center;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  margin: 0;\n}\n\n.slider .indicators .indicator-item {\n  display: inline-block;\n  position: relative;\n  cursor: pointer;\n  height: 16px;\n  width: 16px;\n  margin: 0 12px;\n  background-color: #e0e0e0;\n  -webkit-transition: background-color .3s;\n  transition: background-color .3s;\n  border-radius: 50%;\n}\n\n.slider .indicators .indicator-item.active {\n  background-color: #4CAF50;\n}\n\n.carousel {\n  overflow: hidden;\n  position: relative;\n  width: 100%;\n  height: 400px;\n  -webkit-perspective: 500px;\n          perspective: 500px;\n  -webkit-transform-style: preserve-3d;\n          transform-style: preserve-3d;\n  -webkit-transform-origin: 0% 50%;\n          transform-origin: 0% 50%;\n}\n\n.carousel.carousel-slider {\n  top: 0;\n  left: 0;\n}\n\n.carousel.carousel-slider .carousel-fixed-item {\n  position: absolute;\n  left: 0;\n  right: 0;\n  bottom: 20px;\n  z-index: 1;\n}\n\n.carousel.carousel-slider .carousel-fixed-item.with-indicators {\n  bottom: 68px;\n}\n\n.carousel.carousel-slider .carousel-item {\n  width: 100%;\n  height: 100%;\n  min-height: 400px;\n  position: absolute;\n  top: 0;\n  left: 0;\n}\n\n.carousel.carousel-slider .carousel-item h2 {\n  font-size: 24px;\n  font-weight: 500;\n  line-height: 32px;\n}\n\n.carousel.carousel-slider .carousel-item p {\n  font-size: 15px;\n}\n\n.carousel .carousel-item {\n  visibility: hidden;\n  width: 200px;\n  height: 200px;\n  position: absolute;\n  top: 0;\n  left: 0;\n}\n\n.carousel .carousel-item > img {\n  width: 100%;\n}\n\n.carousel .indicators {\n  position: absolute;\n  text-align: center;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  margin: 0;\n}\n\n.carousel .indicators .indicator-item {\n  display: inline-block;\n  position: relative;\n  cursor: pointer;\n  height: 8px;\n  width: 8px;\n  margin: 24px 4px;\n  background-color: rgba(255, 255, 255, 0.5);\n  -webkit-transition: background-color .3s;\n  transition: background-color .3s;\n  border-radius: 50%;\n}\n\n.carousel .indicators .indicator-item.active {\n  background-color: #fff;\n}\n\n.carousel.scrolling .carousel-item .materialboxed,\n.carousel .carousel-item:not(.active) .materialboxed {\n  pointer-events: none;\n}\n\n.tap-target-wrapper {\n  width: 800px;\n  height: 800px;\n  position: fixed;\n  z-index: 1000;\n  visibility: hidden;\n  -webkit-transition: visibility 0s .3s;\n  transition: visibility 0s .3s;\n}\n\n.tap-target-wrapper.open {\n  visibility: visible;\n  -webkit-transition: visibility 0s;\n  transition: visibility 0s;\n}\n\n.tap-target-wrapper.open .tap-target {\n  -webkit-transform: scale(1);\n          transform: scale(1);\n  opacity: .95;\n  -webkit-transition: opacity 0.3s cubic-bezier(0.42, 0, 0.58, 1), -webkit-transform 0.3s cubic-bezier(0.42, 0, 0.58, 1);\n  transition: opacity 0.3s cubic-bezier(0.42, 0, 0.58, 1), -webkit-transform 0.3s cubic-bezier(0.42, 0, 0.58, 1);\n  transition: transform 0.3s cubic-bezier(0.42, 0, 0.58, 1), opacity 0.3s cubic-bezier(0.42, 0, 0.58, 1);\n  transition: transform 0.3s cubic-bezier(0.42, 0, 0.58, 1), opacity 0.3s cubic-bezier(0.42, 0, 0.58, 1), -webkit-transform 0.3s cubic-bezier(0.42, 0, 0.58, 1);\n}\n\n.tap-target-wrapper.open .tap-target-wave::before {\n  -webkit-transform: scale(1);\n          transform: scale(1);\n}\n\n.tap-target-wrapper.open .tap-target-wave::after {\n  visibility: visible;\n  -webkit-animation: pulse-animation 1s cubic-bezier(0.24, 0, 0.38, 1) infinite;\n          animation: pulse-animation 1s cubic-bezier(0.24, 0, 0.38, 1) infinite;\n  -webkit-transition: opacity .3s,\r visibility 0s 1s,\r -webkit-transform .3s;\n  transition: opacity .3s,\r visibility 0s 1s,\r -webkit-transform .3s;\n  transition: opacity .3s,\r transform .3s,\r visibility 0s 1s;\n  transition: opacity .3s,\r transform .3s,\r visibility 0s 1s,\r -webkit-transform .3s;\n}\n\n.tap-target {\n  position: absolute;\n  font-size: 1rem;\n  border-radius: 50%;\n  background-color: #ee6e73;\n  -webkit-box-shadow: 0 20px 20px 0 rgba(0, 0, 0, 0.14), 0 10px 50px 0 rgba(0, 0, 0, 0.12), 0 30px 10px -20px rgba(0, 0, 0, 0.2);\n          box-shadow: 0 20px 20px 0 rgba(0, 0, 0, 0.14), 0 10px 50px 0 rgba(0, 0, 0, 0.12), 0 30px 10px -20px rgba(0, 0, 0, 0.2);\n  width: 100%;\n  height: 100%;\n  opacity: 0;\n  -webkit-transform: scale(0);\n          transform: scale(0);\n  -webkit-transition: opacity 0.3s cubic-bezier(0.42, 0, 0.58, 1), -webkit-transform 0.3s cubic-bezier(0.42, 0, 0.58, 1);\n  transition: opacity 0.3s cubic-bezier(0.42, 0, 0.58, 1), -webkit-transform 0.3s cubic-bezier(0.42, 0, 0.58, 1);\n  transition: transform 0.3s cubic-bezier(0.42, 0, 0.58, 1), opacity 0.3s cubic-bezier(0.42, 0, 0.58, 1);\n  transition: transform 0.3s cubic-bezier(0.42, 0, 0.58, 1), opacity 0.3s cubic-bezier(0.42, 0, 0.58, 1), -webkit-transform 0.3s cubic-bezier(0.42, 0, 0.58, 1);\n}\n\n.tap-target-content {\n  position: relative;\n  display: table-cell;\n}\n\n.tap-target-wave {\n  position: absolute;\n  border-radius: 50%;\n  z-index: 10001;\n}\n\n.tap-target-wave::before, .tap-target-wave::after {\n  content: '';\n  display: block;\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  border-radius: 50%;\n  background-color: #ffffff;\n}\n\n.tap-target-wave::before {\n  -webkit-transform: scale(0);\n          transform: scale(0);\n  -webkit-transition: -webkit-transform .3s;\n  transition: -webkit-transform .3s;\n  transition: transform .3s;\n  transition: transform .3s, -webkit-transform .3s;\n}\n\n.tap-target-wave::after {\n  visibility: hidden;\n  -webkit-transition: opacity .3s,\r visibility 0s,\r -webkit-transform .3s;\n  transition: opacity .3s,\r visibility 0s,\r -webkit-transform .3s;\n  transition: opacity .3s,\r transform .3s,\r visibility 0s;\n  transition: opacity .3s,\r transform .3s,\r visibility 0s,\r -webkit-transform .3s;\n  z-index: -1;\n}\n\n.tap-target-origin {\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n  z-index: 10002;\n  position: absolute !important;\n}\n\n.tap-target-origin:not(.btn):not(.btn-large):not(.btn-small), .tap-target-origin:not(.btn):not(.btn-large):not(.btn-small):hover {\n  background: none;\n}\n\n@media only screen and (max-width: 600px) {\n  .tap-target, .tap-target-wrapper {\n    width: 600px;\n    height: 600px;\n  }\n}\n\n.pulse {\n  overflow: visible;\n  position: relative;\n}\n\n.pulse::before {\n  content: '';\n  display: block;\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  background-color: inherit;\n  border-radius: inherit;\n  -webkit-transition: opacity .3s, -webkit-transform .3s;\n  transition: opacity .3s, -webkit-transform .3s;\n  transition: opacity .3s, transform .3s;\n  transition: opacity .3s, transform .3s, -webkit-transform .3s;\n  -webkit-animation: pulse-animation 1s cubic-bezier(0.24, 0, 0.38, 1) infinite;\n          animation: pulse-animation 1s cubic-bezier(0.24, 0, 0.38, 1) infinite;\n  z-index: -1;\n}\n\n@-webkit-keyframes pulse-animation {\n  0% {\n    opacity: 1;\n    -webkit-transform: scale(1);\n            transform: scale(1);\n  }\n  50% {\n    opacity: 0;\n    -webkit-transform: scale(1.5);\n            transform: scale(1.5);\n  }\n  100% {\n    opacity: 0;\n    -webkit-transform: scale(1.5);\n            transform: scale(1.5);\n  }\n}\n\n@keyframes pulse-animation {\n  0% {\n    opacity: 1;\n    -webkit-transform: scale(1);\n            transform: scale(1);\n  }\n  50% {\n    opacity: 0;\n    -webkit-transform: scale(1.5);\n            transform: scale(1.5);\n  }\n  100% {\n    opacity: 0;\n    -webkit-transform: scale(1.5);\n            transform: scale(1.5);\n  }\n}\n\n/* Modal */\n.datepicker-modal {\n  max-width: 325px;\n  min-width: 300px;\n  max-height: none;\n}\n\n.datepicker-container.modal-content {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  padding: 0;\n}\n\n.datepicker-controls {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: justify;\n  -webkit-justify-content: space-between;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  width: 280px;\n  margin: 0 auto;\n}\n\n.datepicker-controls .selects-container {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n}\n\n.datepicker-controls .select-wrapper input {\n  border-bottom: none;\n  text-align: center;\n  margin: 0;\n}\n\n.datepicker-controls .select-wrapper input:focus {\n  border-bottom: none;\n}\n\n.datepicker-controls .select-wrapper .caret {\n  display: none;\n}\n\n.datepicker-controls .select-year input {\n  width: 50px;\n}\n\n.datepicker-controls .select-month input {\n  width: 70px;\n}\n\n.month-prev, .month-next {\n  margin-top: 4px;\n  cursor: pointer;\n  background-color: transparent;\n  border: none;\n}\n\n/* Date Display */\n.datepicker-date-display {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1 auto;\n      -ms-flex: 1 auto;\n          flex: 1 auto;\n  background-color: #26a69a;\n  color: #fff;\n  padding: 20px 22px;\n  font-weight: 500;\n}\n\n.datepicker-date-display .year-text {\n  display: block;\n  font-size: 1.5rem;\n  line-height: 25px;\n  color: rgba(255, 255, 255, 0.7);\n}\n\n.datepicker-date-display .date-text {\n  display: block;\n  font-size: 2.8rem;\n  line-height: 47px;\n  font-weight: 500;\n}\n\n/* Calendar */\n.datepicker-calendar-container {\n  -webkit-box-flex: 2.5;\n  -webkit-flex: 2.5 auto;\n      -ms-flex: 2.5 auto;\n          flex: 2.5 auto;\n}\n\n.datepicker-table {\n  width: 280px;\n  font-size: 1rem;\n  margin: 0 auto;\n}\n\n.datepicker-table thead {\n  border-bottom: none;\n}\n\n.datepicker-table th {\n  padding: 10px 5px;\n  text-align: center;\n}\n\n.datepicker-table tr {\n  border: none;\n}\n\n.datepicker-table abbr {\n  text-decoration: none;\n  color: #999;\n}\n\n.datepicker-table td {\n  border-radius: 50%;\n  padding: 0;\n}\n\n.datepicker-table td.is-today {\n  color: #26a69a;\n}\n\n.datepicker-table td.is-selected {\n  background-color: #26a69a;\n  color: #fff;\n}\n\n.datepicker-table td.is-outside-current-month, .datepicker-table td.is-disabled {\n  color: rgba(0, 0, 0, 0.3);\n  pointer-events: none;\n}\n\n.datepicker-day-button {\n  background-color: transparent;\n  border: none;\n  line-height: 38px;\n  display: block;\n  width: 100%;\n  border-radius: 50%;\n  padding: 0 5px;\n  cursor: pointer;\n  color: inherit;\n}\n\n.datepicker-day-button:focus {\n  background-color: rgba(43, 161, 150, 0.25);\n}\n\n/* Footer */\n.datepicker-footer {\n  width: 280px;\n  margin: 0 auto;\n  padding-bottom: 5px;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: justify;\n  -webkit-justify-content: space-between;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n}\n\n.datepicker-cancel,\n.datepicker-clear,\n.datepicker-today,\n.datepicker-done {\n  color: #26a69a;\n  padding: 0 1rem;\n}\n\n.datepicker-clear {\n  color: #F44336;\n}\n\n/* Media Queries */\n@media only screen and (min-width: 601px) {\n  .datepicker-modal {\n    max-width: 625px;\n  }\n  .datepicker-container.modal-content {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: row;\n        -ms-flex-direction: row;\n            flex-direction: row;\n  }\n  .datepicker-date-display {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 1 270px;\n        -ms-flex: 0 1 270px;\n            flex: 0 1 270px;\n  }\n  .datepicker-controls,\n  .datepicker-table,\n  .datepicker-footer {\n    width: 320px;\n  }\n  .datepicker-day-button {\n    line-height: 44px;\n  }\n}\n\n/* Timepicker Containers */\n.timepicker-modal {\n  max-width: 325px;\n  max-height: none;\n}\n\n.timepicker-container.modal-content {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  padding: 0;\n}\n\n.text-primary {\n  color: white;\n}\n\n/* Clock Digital Display */\n.timepicker-digital-display {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1 auto;\n      -ms-flex: 1 auto;\n          flex: 1 auto;\n  background-color: #26a69a;\n  padding: 10px;\n  font-weight: 300;\n}\n\n.timepicker-text-container {\n  font-size: 4rem;\n  font-weight: bold;\n  text-align: center;\n  color: rgba(255, 255, 255, 0.6);\n  font-weight: 400;\n  position: relative;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n\n.timepicker-span-hours,\n.timepicker-span-minutes,\n.timepicker-span-am-pm div {\n  cursor: pointer;\n}\n\n.timepicker-span-hours {\n  margin-right: 3px;\n}\n\n.timepicker-span-minutes {\n  margin-left: 3px;\n}\n\n.timepicker-display-am-pm {\n  font-size: 1.3rem;\n  position: absolute;\n  right: 1rem;\n  bottom: 1rem;\n  font-weight: 400;\n}\n\n/* Analog Clock Display */\n.timepicker-analog-display {\n  -webkit-box-flex: 2.5;\n  -webkit-flex: 2.5 auto;\n      -ms-flex: 2.5 auto;\n          flex: 2.5 auto;\n}\n\n.timepicker-plate {\n  background-color: #eee;\n  border-radius: 50%;\n  width: 270px;\n  height: 270px;\n  overflow: visible;\n  position: relative;\n  margin: auto;\n  margin-top: 25px;\n  margin-bottom: 5px;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n\n.timepicker-canvas,\n.timepicker-dial {\n  position: absolute;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n}\n\n.timepicker-minutes {\n  visibility: hidden;\n}\n\n.timepicker-tick {\n  border-radius: 50%;\n  color: rgba(0, 0, 0, 0.87);\n  line-height: 40px;\n  text-align: center;\n  width: 40px;\n  height: 40px;\n  position: absolute;\n  cursor: pointer;\n  font-size: 15px;\n}\n\n.timepicker-tick.active,\n.timepicker-tick:hover {\n  background-color: rgba(38, 166, 154, 0.25);\n}\n\n.timepicker-dial {\n  -webkit-transition: opacity 350ms, -webkit-transform 350ms;\n  transition: opacity 350ms, -webkit-transform 350ms;\n  transition: transform 350ms, opacity 350ms;\n  transition: transform 350ms, opacity 350ms, -webkit-transform 350ms;\n}\n\n.timepicker-dial-out {\n  opacity: 0;\n}\n\n.timepicker-dial-out.timepicker-hours {\n  -webkit-transform: scale(1.1, 1.1);\n          transform: scale(1.1, 1.1);\n}\n\n.timepicker-dial-out.timepicker-minutes {\n  -webkit-transform: scale(0.8, 0.8);\n          transform: scale(0.8, 0.8);\n}\n\n.timepicker-canvas {\n  -webkit-transition: opacity 175ms;\n  transition: opacity 175ms;\n}\n\n.timepicker-canvas line {\n  stroke: #26a69a;\n  stroke-width: 4;\n  stroke-linecap: round;\n}\n\n.timepicker-canvas-out {\n  opacity: 0.25;\n}\n\n.timepicker-canvas-bearing {\n  stroke: none;\n  fill: #26a69a;\n}\n\n.timepicker-canvas-bg {\n  stroke: none;\n  fill: #26a69a;\n}\n\n/* Footer */\n.timepicker-footer {\n  margin: 0 auto;\n  padding: 5px 1rem;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: justify;\n  -webkit-justify-content: space-between;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n}\n\n.timepicker-clear {\n  color: #F44336;\n}\n\n.timepicker-close {\n  color: #26a69a;\n}\n\n.timepicker-clear,\n.timepicker-close {\n  padding: 0 20px;\n}\n\n/* Media Queries */\n@media only screen and (min-width: 601px) {\n  .timepicker-modal {\n    max-width: 600px;\n  }\n  .timepicker-container.modal-content {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: row;\n        -ms-flex-direction: row;\n            flex-direction: row;\n  }\n  .timepicker-text-container {\n    top: 32%;\n  }\n  .timepicker-display-am-pm {\n    position: relative;\n    right: auto;\n    bottom: auto;\n    text-align: center;\n    margin-top: 1.2rem;\n  }\n}\n", ""]);

// exports


/***/ }),
/* 55 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
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

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target, parent) {
  if (parent){
    return parent.querySelector(target);
  }
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target, parent) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target, parent);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(57);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
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

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertAt.before, target);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	if(options.attrs.nonce === undefined) {
		var nonce = getNonce();
		if (nonce) {
			options.attrs.nonce = nonce;
		}
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function getNonce() {
	if (false) {}

	return __webpack_require__.nc;
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = typeof options.transform === 'function'
		 ? options.transform(obj.css) 
		 : options.transform.default(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

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

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 57 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ })
/******/ ]);
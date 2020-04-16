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

Object.defineProperty(exports, "__esModule", { value: true });
var fs = __webpack_require__(1);
var path = __webpack_require__(2);
var Elm = __webpack_require__(3).Elm;
var schemaPath = path.resolve(process.cwd(), "./src/Schema.elm");
var generatedElmPath = path.resolve(process.cwd(), "./src/Port.elm");
var generatedElmModuleName = "Port";
var generatedTsPath = path.resolve(process.cwd(), "./src/Main.d.ts");
var schemaContents;
try {
    schemaContents = fs.readFileSync(schemaPath, 'utf8');
}
catch (e) {
    console.log("There was a problem opening the schema located at " + schemaPath + ". Error:");
    console.log(e.message);
    process.exit(1);
}
var elm = Elm.Main.init({
    flags: {
        schemaContents: schemaContents,
        elmModule: generatedElmModuleName,
    }
});
elm.ports.done.subscribe(function (response) {
    if (response.status == 'error') {
        console.log(response.message);
        process.exit(1);
    }
    try {
        fs.writeFileSync(generatedElmPath, response.generatedElm);
    }
    catch (err) {
        console.log('Error generating elm at "' + generatedElmPath + '". Error message:');
        console.log(err.message);
        process.exit(1);
    }
    try {
        fs.writeFileSync(generatedTsPath, response.generatedTypescript);
    }
    catch (err) {
        console.log('Error generating typescript at "' + generatedTsPath + '". Error message:');
        console.log(err.message);
        process.exit(1);
    }
    console.log("successfully generated " + generatedElmPath + "\n" +
        "and                    " + generatedTsPath);
});


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}




var _List_Nil = { $: 0 };
var _List_Nil_UNUSED = { $: '[]' };

function _List_Cons(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons_UNUSED(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
	}));
});



var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log = F2(function(tag, value)
{
	return value;
});

var _Debug_log_UNUSED = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString(value)
{
	return '<internals>';
}

function _Debug_toString_UNUSED(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File !== 'undefined' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[36m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash_UNUSED(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.V.x === region.af.x)
	{
		return 'on line ' + region.V.x;
	}
	return 'on lines ' + region.V.x + ' through ' + region.af.x;
}



// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	/**_UNUSED/
	if (x.$ === 'Set_elm_builtin')
	{
		x = $elm$core$Set$toList(x);
		y = $elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	/**/
	if (x.$ < 0)
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**_UNUSED/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**/
	if (typeof x.$ === 'undefined')
	//*/
	/**_UNUSED/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0 = 0;
var _Utils_Tuple0_UNUSED = { $: '#0' };

function _Utils_Tuple2(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2_UNUSED(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3_UNUSED(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr(c) { return c; }
function _Utils_chr_UNUSED(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return !isNaN(word)
		? $elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: $elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return $elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? $elm$core$Maybe$Nothing
		: $elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return $elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**_UNUSED/
function _Json_errorToString(error)
{
	return $elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? $elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? $elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return $elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? $elm$core$Result$Ok(value)
		: (value instanceof String)
			? $elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? $elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!$elm$core$Result$isOk(result))
					{
						return $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!$elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return $elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!$elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if ($elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));

		case 1:
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return $elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!$elm$core$Result$isOk(result))
		{
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return $elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2($elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap_UNUSED(value) { return { $: 0, a: value }; }
function _Json_unwrap_UNUSED(value) { return value.a; }

function _Json_wrap(value) { return value; }
function _Json_unwrap(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);


// CREATE

var _Regex_never = /.^/;

var _Regex_fromStringWith = F2(function(options, string)
{
	var flags = 'g';
	if (options.aV) { flags += 'm'; }
	if (options.aH) { flags += 'i'; }

	try
	{
		return $elm$core$Maybe$Just(new RegExp(string, flags));
	}
	catch(error)
	{
		return $elm$core$Maybe$Nothing;
	}
});


// USE

var _Regex_contains = F2(function(re, string)
{
	return string.match(re) !== null;
});


var _Regex_findAtMost = F3(function(n, re, str)
{
	var out = [];
	var number = 0;
	var string = str;
	var lastIndex = re.lastIndex;
	var prevLastIndex = -1;
	var result;
	while (number++ < n && (result = re.exec(string)))
	{
		if (prevLastIndex == re.lastIndex) break;
		var i = result.length - 1;
		var subs = new Array(i);
		while (i > 0)
		{
			var submatch = result[i];
			subs[--i] = submatch
				? $elm$core$Maybe$Just(submatch)
				: $elm$core$Maybe$Nothing;
		}
		out.push(A4($elm$regex$Regex$Match, result[0], result.index, number, _List_fromArray(subs)));
		prevLastIndex = re.lastIndex;
	}
	re.lastIndex = lastIndex;
	return _List_fromArray(out);
});


var _Regex_replaceAtMost = F4(function(n, re, replacer, string)
{
	var count = 0;
	function jsReplacer(match)
	{
		if (count++ >= n)
		{
			return match;
		}
		var i = arguments.length - 3;
		var submatches = new Array(i);
		while (i > 0)
		{
			var submatch = arguments[i];
			submatches[--i] = submatch
				? $elm$core$Maybe$Just(submatch)
				: $elm$core$Maybe$Nothing;
		}
		return replacer(A4($elm$regex$Regex$Match, match, arguments[arguments.length - 2], count, _List_fromArray(submatches)));
	}
	return string.replace(re, jsReplacer);
});

var _Regex_splitAtMost = F3(function(n, re, str)
{
	var string = str;
	var out = [];
	var start = re.lastIndex;
	var restoreLastIndex = re.lastIndex;
	while (n--)
	{
		var result = re.exec(string);
		if (!result) break;
		out.push(string.slice(start, result.index));
		start = re.lastIndex;
	}
	out.push(string.slice(start));
	re.lastIndex = restoreLastIndex;
	return _List_fromArray(out);
});

var _Regex_infinity = Infinity;



var _Bitwise_and = F2(function(a, b)
{
	return a & b;
});

var _Bitwise_or = F2(function(a, b)
{
	return a | b;
});

var _Bitwise_xor = F2(function(a, b)
{
	return a ^ b;
});

function _Bitwise_complement(a)
{
	return ~a;
};

var _Bitwise_shiftLeftBy = F2(function(offset, a)
{
	return a << offset;
});

var _Bitwise_shiftRightBy = F2(function(offset, a)
{
	return a >> offset;
});

var _Bitwise_shiftRightZfBy = F2(function(offset, a)
{
	return a >>> offset;
});




// STRINGS


var _Parser_isSubString = F5(function(smallString, offset, row, col, bigString)
{
	var smallLength = smallString.length;
	var isGood = offset + smallLength <= bigString.length;

	for (var i = 0; isGood && i < smallLength; )
	{
		var code = bigString.charCodeAt(offset);
		isGood =
			smallString[i++] === bigString[offset++]
			&& (
				code === 0x000A /* \n */
					? ( row++, col=1 )
					: ( col++, (code & 0xF800) === 0xD800 ? smallString[i++] === bigString[offset++] : 1 )
			)
	}

	return _Utils_Tuple3(isGood ? offset : -1, row, col);
});



// CHARS


var _Parser_isSubChar = F3(function(predicate, offset, string)
{
	return (
		string.length <= offset
			? -1
			:
		(string.charCodeAt(offset) & 0xF800) === 0xD800
			? (predicate(_Utils_chr(string.substr(offset, 2))) ? offset + 2 : -1)
			:
		(predicate(_Utils_chr(string[offset]))
			? ((string[offset] === '\n') ? -2 : (offset + 1))
			: -1
		)
	);
});


var _Parser_isAsciiCode = F3(function(code, offset, string)
{
	return string.charCodeAt(offset) === code;
});



// NUMBERS


var _Parser_chompBase10 = F2(function(offset, string)
{
	for (; offset < string.length; offset++)
	{
		var code = string.charCodeAt(offset);
		if (code < 0x30 || 0x39 < code)
		{
			return offset;
		}
	}
	return offset;
});


var _Parser_consumeBase = F3(function(base, offset, string)
{
	for (var total = 0; offset < string.length; offset++)
	{
		var digit = string.charCodeAt(offset) - 0x30;
		if (digit < 0 || base <= digit) break;
		total = base * total + digit;
	}
	return _Utils_Tuple2(offset, total);
});


var _Parser_consumeBase16 = F2(function(offset, string)
{
	for (var total = 0; offset < string.length; offset++)
	{
		var code = string.charCodeAt(offset);
		if (0x30 <= code && code <= 0x39)
		{
			total = 16 * total + code - 0x30;
		}
		else if (0x41 <= code && code <= 0x46)
		{
			total = 16 * total + code - 55;
		}
		else if (0x61 <= code && code <= 0x66)
		{
			total = 16 * total + code - 87;
		}
		else
		{
			break;
		}
	}
	return _Utils_Tuple2(offset, total);
});



// FIND STRING


var _Parser_findSubString = F5(function(smallString, offset, row, col, bigString)
{
	var newOffset = bigString.indexOf(smallString, offset);
	var target = newOffset < 0 ? bigString.length : newOffset + smallString.length;

	while (offset < target)
	{
		var code = bigString.charCodeAt(offset++);
		code === 0x000A /* \n */
			? ( col=1, row++ )
			: ( col++, (code & 0xF800) === 0xD800 && offset++ )
	}

	return _Utils_Tuple3(newOffset, row, col);
});



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.aQ,
		impl.a3,
		impl.a1,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**_UNUSED/, _Json_errorToString(result.a) /**/);
	var managers = {};
	result = init(result.a);
	var model = result.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		result = A2(update, msg, model);
		stepper(model = result.a, viewMetadata);
		_Platform_enqueueEffects(managers, result.b, subscriptions(model));
	}

	_Platform_enqueueEffects(managers, result.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS
//
// Effects must be queued!
//
// Say your init contains a synchronous command, like Time.now or Time.here
//
//   - This will produce a batch of effects (FX_1)
//   - The synchronous task triggers the subsequent `update` call
//   - This will produce a batch of effects (FX_2)
//
// If we just start dispatching FX_2, subscriptions from FX_2 can be processed
// before subscriptions from FX_1. No good! Earlier versions of this code had
// this problem, leading to these reports:
//
//   https://github.com/elm/core/issues/980
//   https://github.com/elm/core/pull/981
//   https://github.com/elm/compiler/issues/1776
//
// The queue is necessary to avoid ordering issues for synchronous commands.


// Why use true/false here? Why not just check the length of the queue?
// The goal is to detect "are we currently dispatching effects?" If we
// are, we need to bail and let the ongoing while loop handle things.
//
// Now say the queue has 1 element. When we dequeue the final element,
// the queue will be empty, but we are still actively dispatching effects.
// So you could get queue jumping in a really tricky category of cases.
//
var _Platform_effectsQueue = [];
var _Platform_effectsActive = false;


function _Platform_enqueueEffects(managers, cmdBag, subBag)
{
	_Platform_effectsQueue.push({ p: managers, q: cmdBag, r: subBag });

	if (_Platform_effectsActive) return;

	_Platform_effectsActive = true;
	for (var fx; fx = _Platform_effectsQueue.shift(); )
	{
		_Platform_dispatchEffects(fx.p, fx.q, fx.r);
	}
	_Platform_effectsActive = false;
}


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				s: bag.n,
				t: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.t)
		{
			x = temp.s(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		u: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		u: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		$elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}
var $elm$core$Basics$EQ = 1;
var $elm$core$Basics$LT = 0;
var $elm$core$List$cons = _List_cons;
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (!node.$) {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldr,
			helper,
			A3($elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var $elm$core$Array$toList = function (array) {
	return A3($elm$core$Array$foldr, $elm$core$List$cons, _List_Nil, array);
};
var $elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === -2) {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var $elm$core$Dict$toList = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Dict$keys = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Set$toList = function (_v0) {
	var dict = _v0;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Basics$GT = 2;
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $author$project$Main$done = _Platform_outgoingPort('done', $elm$core$Basics$identity);
var $elm$core$Result$Err = function (a) {
	return {$: 1, a: a};
};
var $elm$core$Result$andThen = F2(
	function (callback, result) {
		if (!result.$) {
			var value = result.a;
			return callback(value);
		} else {
			var msg = result.a;
			return $elm$core$Result$Err(msg);
		}
	});
var $elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var $author$project$Main$DecodeRequestError = function (a) {
	return {$: 0, a: a};
};
var $author$project$Main$Request = F2(
	function (schemaContents, elmModule) {
		return {ae: elmModule, aB: schemaContents};
	});
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 0, a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 2, a: a};
};
var $elm$core$Basics$False = 1;
var $elm$core$Basics$add = _Basics_add;
var $elm$core$Maybe$Just = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Maybe$Nothing = {$: 1};
var $elm$core$String$all = _String_all;
var $elm$core$Basics$and = _Basics_and;
var $elm$core$Basics$append = _Utils_append;
var $elm$json$Json$Encode$encode = _Json_encode;
var $elm$core$String$fromInt = _String_fromNumber;
var $elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var $elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var $elm$json$Json$Decode$indent = function (str) {
	return A2(
		$elm$core$String$join,
		'\n    ',
		A2($elm$core$String$split, '\n', str));
};
var $elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var $elm$core$List$length = function (xs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var $elm$core$List$map2 = _List_map2;
var $elm$core$Basics$le = _Utils_le;
var $elm$core$Basics$sub = _Basics_sub;
var $elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2($elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var $elm$core$List$range = F2(
	function (lo, hi) {
		return A3($elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var $elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$map2,
			f,
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(xs) - 1),
			xs);
	});
var $elm$core$Char$toCode = _Char_toCode;
var $elm$core$Char$isLower = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var $elm$core$Char$isUpper = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var $elm$core$Basics$or = _Basics_or;
var $elm$core$Char$isAlpha = function (_char) {
	return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
};
var $elm$core$Char$isDigit = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var $elm$core$Char$isAlphaNum = function (_char) {
	return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
};
var $elm$core$List$reverse = function (list) {
	return A3($elm$core$List$foldl, $elm$core$List$cons, _List_Nil, list);
};
var $elm$core$String$uncons = _String_uncons;
var $elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + ($elm$core$String$fromInt(i + 1) + (') ' + $elm$json$Json$Decode$indent(
			$elm$json$Json$Decode$errorToString(error))));
	});
var $elm$json$Json$Decode$errorToString = function (error) {
	return A2($elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var $elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 0:
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 1) {
							return false;
						} else {
							var _v2 = _v1.a;
							var _char = _v2.a;
							var rest = _v2.b;
							return $elm$core$Char$isAlpha(_char) && A2($elm$core$String$all, $elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 1:
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 2:
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									$elm$core$String$join,
									'',
									$elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										$elm$core$String$join,
										'',
										$elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + ($elm$core$String$fromInt(
								$elm$core$List$length(errors)) + ' ways:'));
							return A2(
								$elm$core$String$join,
								'\n\n',
								A2(
									$elm$core$List$cons,
									introduction,
									A2($elm$core$List$indexedMap, $elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								$elm$core$String$join,
								'',
								$elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + ($elm$json$Json$Decode$indent(
						A2($elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var $elm$core$Array$branchFactor = 32;
var $elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 0, a: a, b: b, c: c, d: d};
	});
var $elm$core$Elm$JsArray$empty = _JsArray_empty;
var $elm$core$Basics$ceiling = _Basics_ceiling;
var $elm$core$Basics$fdiv = _Basics_fdiv;
var $elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var $elm$core$Basics$toFloat = _Basics_toFloat;
var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling(
	A2($elm$core$Basics$logBase, 2, $elm$core$Array$branchFactor));
var $elm$core$Array$empty = A4($elm$core$Array$Array_elm_builtin, 0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var $elm$core$Array$Leaf = function (a) {
	return {$: 1, a: a};
};
var $elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var $elm$core$Basics$eq = _Utils_equal;
var $elm$core$Basics$floor = _Basics_floor;
var $elm$core$Elm$JsArray$length = _JsArray_length;
var $elm$core$Basics$gt = _Utils_gt;
var $elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var $elm$core$Basics$mul = _Basics_mul;
var $elm$core$Array$SubTree = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var $elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodes);
			var node = _v0.a;
			var remainingNodes = _v0.b;
			var newAcc = A2(
				$elm$core$List$cons,
				$elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return $elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var $elm$core$Tuple$first = function (_v0) {
	var x = _v0.a;
	return x;
};
var $elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2($elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var $elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.g) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.h),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.h);
		} else {
			var treeLen = builder.g * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.i) : builder.i;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.g);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.h) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.h);
		}
	});
var $elm$core$Basics$idiv = _Basics_idiv;
var $elm$core$Basics$lt = _Utils_lt;
var $elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					false,
					{i: nodeList, g: (len / $elm$core$Array$branchFactor) | 0, h: tail});
			} else {
				var leaf = $elm$core$Array$Leaf(
					A3($elm$core$Elm$JsArray$initialize, $elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - $elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2($elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var $elm$core$Basics$remainderBy = _Basics_remainderBy;
var $elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return $elm$core$Array$empty;
		} else {
			var tailLen = len % $elm$core$Array$branchFactor;
			var tail = A3($elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
			return A5($elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var $elm$core$Basics$True = 0;
var $elm$core$Result$isOk = function (result) {
	if (!result.$) {
		return true;
	} else {
		return false;
	}
};
var $elm$json$Json$Decode$decodeValue = _Json_run;
var $elm$json$Json$Decode$field = _Json_decodeField;
var $elm$json$Json$Decode$map2 = _Json_map2;
var $elm$core$Result$mapError = F2(
	function (f, result) {
		if (!result.$) {
			var v = result.a;
			return $elm$core$Result$Ok(v);
		} else {
			var e = result.a;
			return $elm$core$Result$Err(
				f(e));
		}
	});
var $elm$json$Json$Decode$string = _Json_decodeString;
var $author$project$Main$decodeRequest = function (value) {
	var decoder = A3(
		$elm$json$Json$Decode$map2,
		$author$project$Main$Request,
		A2($elm$json$Json$Decode$field, 'schemaContents', $elm$json$Json$Decode$string),
		A2($elm$json$Json$Decode$field, 'elmModule', $elm$json$Json$Decode$string));
	return A2(
		$elm$core$Result$mapError,
		$author$project$Main$DecodeRequestError,
		A2($elm$json$Json$Decode$decodeValue, decoder, value));
};
var $elm$parser$Parser$deadEndsToString = function (deadEnds) {
	return 'TODO deadEndsToString';
};
var $elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var $elm$regex$Regex$Match = F4(
	function (match, index, number, submatches) {
		return {aP: index, aU: match, aW: number, a0: submatches};
	});
var $elm$regex$Regex$fromStringWith = _Regex_fromStringWith;
var $elm$regex$Regex$fromString = function (string) {
	return A2(
		$elm$regex$Regex$fromStringWith,
		{aH: false, aV: false},
		string);
};
var $elm$regex$Regex$never = _Regex_never;
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $jorgengranseth$elm_string_format$String$Format$regex = A2(
	$elm$core$Basics$composeR,
	$elm$regex$Regex$fromString,
	$elm$core$Maybe$withDefault($elm$regex$Regex$never));
var $elm$regex$Regex$replace = _Regex_replaceAtMost(_Regex_infinity);
var $jorgengranseth$elm_string_format$String$Format$namedValue = F2(
	function (name, val) {
		var placeholder = $jorgengranseth$elm_string_format$String$Format$regex('{{\\s*' + (name + '\\s*}}'));
		return A2(
			$elm$regex$Regex$replace,
			placeholder,
			function (_v0) {
				return val;
			});
	});
var $author$project$Main$errorToString = function (err) {
	switch (err.$) {
		case 0:
			var decodeError = err.a;
			return A3(
				$jorgengranseth$elm_string_format$String$Format$namedValue,
				'error',
				$elm$json$Json$Decode$errorToString(decodeError),
				'---Unknown Error!---\nWell this is embarasing. Something has gone wrong but i don\'t know why.. This is probably a bug. Full error message:\n{{ error }}');
		case 1:
			var deadEnds = err.a;
			return A3(
				$jorgengranseth$elm_string_format$String$Format$namedValue,
				'error',
				$elm$parser$Parser$deadEndsToString(deadEnds),
				'---Parse schema error!---\nIm got stuck parsing your schema. unfortunatley im not sophisticated enough to produce i nice error message, but here is my best atempt:\n{{ error }}');
		case 2:
			return '---Error: schema is port module!---\nyour schema is as a port module, i will automatically generate ports for you so there is no need to place any in your scmema. The first line of your schema should be this: "module Schema expoisng (..)\"';
		case 3:
			return '---Error: schema is effect module!---\nHey you! Stop that!';
		case 4:
			return '---Error: module does not expose all---\nMaybe this is a bit strict on my part but you should expose everyting in your schema, i.e. the first line of your schema should be "module Schema exposing(..)\"';
		case 5:
			return '---Error: contains imports---\nYour module contains import. Unfortunately i can\'t handle this (but maybe in the future??). You will have to remove all imports.';
		case 6:
			return '---Error: bad declarations---\nYou have used some declarations in your schema that i don\'t know how to deal with. You can\'t have anything that:\nis a value. E.g "myValue = 1"\nis a function. E.g "myFunction n = n + 1\nhas type variables in them. E.g type MyParametricType a = Foo a\n\nThe only types you are alowed to reference are those defined by you in your schema and thes ones: (), Bool, Int, Float, Char, String, List, Maybe and Result.\n';
		case 7:
			return '---Error: missing FromElmMessage---\nI can\'t find a FromElmMessage type in your schema, maybe you misspelled it?\nI always need a FromElmMessage type to be declared even if you wont use it. In that case just declare it as "type alias FromElmMessage = ()\"';
		default:
			return '---Error: missing ToElmMessage---\nI can\'t find a ToElmMessage type in your schema, maybe you misspelled it?\nI always need a ToElmMessage type to be declared even if you wont use it. In that case just declare it as "type alias ToElmMessage = ()\"';
	}
};
var $elm$json$Json$Encode$object = function (pairs) {
	return _Json_wrap(
		A3(
			$elm$core$List$foldl,
			F2(
				function (_v0, obj) {
					var k = _v0.a;
					var v = _v0.b;
					return A3(_Json_addField, k, v, obj);
				}),
			_Json_emptyObject(0),
			pairs));
};
var $elm$json$Json$Encode$string = _Json_wrap;
var $author$project$Main$encodeResponse = function (response) {
	var status = function () {
		if (!response.$) {
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'status',
					$elm$json$Json$Encode$string('success'))
				]);
		} else {
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'status',
					$elm$json$Json$Encode$string('error'))
				]);
		}
	}();
	var data = function () {
		if (!response.$) {
			var generatedElm = response.a.aj;
			var generatedTypescript = response.a.ak;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'generatedElm',
					$elm$json$Json$Encode$string(generatedElm)),
					_Utils_Tuple2(
					'generatedTypescript',
					$elm$json$Json$Encode$string(generatedTypescript))
				]);
		} else {
			var err = response.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'type',
					$elm$json$Json$Encode$string('error')),
					_Utils_Tuple2(
					'message',
					$elm$json$Json$Encode$string(
						$author$project$Main$errorToString(err)))
				]);
		}
	}();
	return $elm$json$Json$Encode$object(
		_Utils_ap(status, data));
};
var $elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							$elm$core$List$foldl,
							fn,
							acc,
							$elm$core$List$reverse(r4)) : A4($elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var $elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4($elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var $elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3($elm$core$List$foldr, $elm$core$List$cons, ys, xs);
		}
	});
var $elm$core$List$concat = function (lists) {
	return A3($elm$core$List$foldr, $elm$core$List$append, _List_Nil, lists);
};
var $elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						$elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var $elm$core$List$concatMap = F2(
	function (f, list) {
		return $elm$core$List$concat(
			A2($elm$core$List$map, f, list));
	});
var $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Typed = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $stil4m$elm_syntax$Elm$Syntax$Node$Node = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $stil4m$elm_syntax$Elm$Syntax$Range$emptyRange = {
	af: {aa: 0, aA: 0},
	V: {aa: 0, aA: 0}
};
var $the_sett$elm_syntax_dsl$Util$nodify = function (exp) {
	return A2($stil4m$elm_syntax$Elm$Syntax$Node$Node, $stil4m$elm_syntax$Elm$Syntax$Range$emptyRange, exp);
};
var $the_sett$elm_syntax_dsl$Util$nodifyAll = $elm$core$List$map($the_sett$elm_syntax_dsl$Util$nodify);
var $the_sett$elm_syntax_dsl$Elm$CodeGen$fqTyped = F3(
	function (moduleName, name, args) {
		return A2(
			$stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Typed,
			$the_sett$elm_syntax_dsl$Util$nodify(
				_Utils_Tuple2(moduleName, name)),
			$the_sett$elm_syntax_dsl$Util$nodifyAll(args));
	});
var $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$FunctionTypeAnnotation = F2(
	function (a, b) {
		return {$: 6, a: a, b: b};
	});
var $the_sett$elm_syntax_dsl$Elm$CodeGen$funAnn = F2(
	function (arg, result) {
		return A2(
			$stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$FunctionTypeAnnotation,
			$the_sett$elm_syntax_dsl$Util$nodify(arg),
			$the_sett$elm_syntax_dsl$Util$nodify(result));
	});
var $the_sett$elm_syntax_dsl$Elm$CodeGen$DeclNoComment = function (a) {
	return {$: 1, a: a};
};
var $the_sett$elm_syntax_dsl$Elm$CodeGen$DeclWithComment = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $stil4m$elm_syntax$Elm$Syntax$Declaration$FunctionDeclaration = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return $elm$core$Maybe$Just(
				f(value));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $the_sett$elm_syntax_dsl$Util$nodifyMaybe = $elm$core$Maybe$map($the_sett$elm_syntax_dsl$Util$nodify);
var $the_sett$elm_syntax_dsl$Elm$CodeGen$function = F3(
	function (docs, sig, decl) {
		return {
			aK: $the_sett$elm_syntax_dsl$Util$nodify(decl),
			aM: $the_sett$elm_syntax_dsl$Util$nodifyMaybe(docs),
			a$: $the_sett$elm_syntax_dsl$Util$nodifyMaybe(sig)
		};
	});
var $the_sett$elm_syntax_dsl$Elm$CodeGen$functionImplementation = F3(
	function (name, args, expr) {
		return {
			w: $the_sett$elm_syntax_dsl$Util$nodifyAll(args),
			z: $the_sett$elm_syntax_dsl$Util$nodify(expr),
			f: $the_sett$elm_syntax_dsl$Util$nodify(name)
		};
	});
var $the_sett$elm_syntax_dsl$Elm$CodeGen$signature = F2(
	function (name, annotation) {
		return {
			f: $the_sett$elm_syntax_dsl$Util$nodify(name),
			a2: $the_sett$elm_syntax_dsl$Util$nodify(annotation)
		};
	});
var $the_sett$elm_syntax_dsl$Elm$CodeGen$funDecl = F5(
	function (docs, sig, name, args, expr) {
		if (!docs.$) {
			var docComment = docs.a;
			return A2(
				$the_sett$elm_syntax_dsl$Elm$CodeGen$DeclWithComment,
				docComment,
				function (strDocs) {
					return $stil4m$elm_syntax$Elm$Syntax$Declaration$FunctionDeclaration(
						A3(
							$the_sett$elm_syntax_dsl$Elm$CodeGen$function,
							$elm$core$Maybe$Just(strDocs),
							A2(
								$elm$core$Maybe$map,
								$the_sett$elm_syntax_dsl$Elm$CodeGen$signature(name),
								sig),
							A3($the_sett$elm_syntax_dsl$Elm$CodeGen$functionImplementation, name, args, expr)));
				});
		} else {
			return $the_sett$elm_syntax_dsl$Elm$CodeGen$DeclNoComment(
				$stil4m$elm_syntax$Elm$Syntax$Declaration$FunctionDeclaration(
					A3(
						$the_sett$elm_syntax_dsl$Elm$CodeGen$function,
						$elm$core$Maybe$Nothing,
						A2(
							$elm$core$Maybe$map,
							$the_sett$elm_syntax_dsl$Elm$CodeGen$signature(name),
							sig),
						A3($the_sett$elm_syntax_dsl$Elm$CodeGen$functionImplementation, name, args, expr))));
		}
	});
var $stil4m$elm_syntax$Elm$Syntax$Expression$Application = function (a) {
	return {$: 1, a: a};
};
var $the_sett$elm_syntax_dsl$Elm$CodeGen$apply = function (exprs) {
	return $stil4m$elm_syntax$Elm$Syntax$Expression$Application(
		$the_sett$elm_syntax_dsl$Util$nodifyAll(exprs));
};
var $stil4m$elm_syntax$Elm$Syntax$Expression$FunctionOrValue = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var $the_sett$elm_syntax_dsl$Elm$CodeGen$fqFun = F2(
	function (moduleName, name) {
		return A2($stil4m$elm_syntax$Elm$Syntax$Expression$FunctionOrValue, moduleName, name);
	});
var $the_sett$elm_syntax_dsl$Elm$CodeGen$fun = function (name) {
	return A2($the_sett$elm_syntax_dsl$Elm$CodeGen$fqFun, _List_Nil, name);
};
var $the_sett$elm_syntax_dsl$Elm$CodeGen$construct = F2(
	function (name, args) {
		return $the_sett$elm_syntax_dsl$Elm$CodeGen$apply(
			A2(
				$elm$core$List$cons,
				$the_sett$elm_syntax_dsl$Elm$CodeGen$fun(name),
				args));
	});
var $stil4m$elm_syntax$Elm$Syntax$Expression$LambdaExpression = function (a) {
	return {$: 17, a: a};
};
var $the_sett$elm_syntax_dsl$Elm$CodeGen$lambda = F2(
	function (args, expr) {
		return $stil4m$elm_syntax$Elm$Syntax$Expression$LambdaExpression(
			{
				Y: $the_sett$elm_syntax_dsl$Util$nodifyAll(args),
				z: $the_sett$elm_syntax_dsl$Util$nodify(expr)
			});
	});
var $stil4m$elm_syntax$Elm$Syntax$Expression$ParenthesizedExpression = function (a) {
	return {$: 14, a: a};
};
var $the_sett$elm_syntax_dsl$Elm$CodeGen$parens = function (expr) {
	return $stil4m$elm_syntax$Elm$Syntax$Expression$ParenthesizedExpression(
		$the_sett$elm_syntax_dsl$Util$nodify(expr));
};
var $stil4m$elm_syntax$Elm$Syntax$Expression$OperatorApplication = F4(
	function (a, b, c, d) {
		return {$: 2, a: a, b: b, c: c, d: d};
	});
var $the_sett$elm_syntax_dsl$Elm$CodeGen$applyBinOp = F3(
	function (exprl, _v0, exprr) {
		var symbol = _v0.a;
		var dir = _v0.b;
		return A4(
			$stil4m$elm_syntax$Elm$Syntax$Expression$OperatorApplication,
			symbol,
			dir,
			$the_sett$elm_syntax_dsl$Util$nodify(exprl),
			$the_sett$elm_syntax_dsl$Util$nodify(exprr));
	});
var $the_sett$elm_syntax_dsl$Elm$CodeGen$BinOp = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var $stil4m$elm_syntax$Elm$Syntax$Infix$Left = 0;
var $the_sett$elm_syntax_dsl$Elm$CodeGen$infixLeft = 0;
var $the_sett$elm_syntax_dsl$Elm$CodeGen$piper = A3($the_sett$elm_syntax_dsl$Elm$CodeGen$BinOp, '|>', $the_sett$elm_syntax_dsl$Elm$CodeGen$infixLeft, 0);
var $the_sett$elm_syntax_dsl$Elm$CodeGen$pipe = F2(
	function (head, expressions) {
		if (!expressions.b) {
			return head;
		} else {
			if (!expressions.b.b) {
				var expr = expressions.a;
				return A3($the_sett$elm_syntax_dsl$Elm$CodeGen$applyBinOp, head, $the_sett$elm_syntax_dsl$Elm$CodeGen$piper, expr);
			} else {
				var expr = expressions.a;
				var exprs = expressions.b;
				return A3(
					$the_sett$elm_syntax_dsl$Elm$CodeGen$applyBinOp,
					head,
					$the_sett$elm_syntax_dsl$Elm$CodeGen$piper,
					A2($the_sett$elm_syntax_dsl$Elm$CodeGen$pipe, expr, exprs));
			}
		}
	});
var $stil4m$elm_syntax$Elm$Syntax$Expression$RecordExpr = function (a) {
	return {$: 18, a: a};
};
var $the_sett$elm_syntax_dsl$Elm$CodeGen$recordSetter = F2(
	function (field, expr) {
		return _Utils_Tuple2(
			$the_sett$elm_syntax_dsl$Util$nodify(field),
			$the_sett$elm_syntax_dsl$Util$nodify(expr));
	});
var $the_sett$elm_syntax_dsl$Elm$CodeGen$record = function (setters) {
	return $stil4m$elm_syntax$Elm$Syntax$Expression$RecordExpr(
		$the_sett$elm_syntax_dsl$Util$nodifyAll(
			A2(
				$elm$core$List$map,
				function (_v0) {
					var fieldName = _v0.a;
					var expr = _v0.b;
					return A2($the_sett$elm_syntax_dsl$Elm$CodeGen$recordSetter, fieldName, expr);
				},
				setters)));
};
var $stil4m$elm_syntax$Elm$Syntax$Expression$Literal = function (a) {
	return {$: 11, a: a};
};
var $the_sett$elm_syntax_dsl$Elm$CodeGen$string = function (literal) {
	return $stil4m$elm_syntax$Elm$Syntax$Expression$Literal(literal);
};
var $stil4m$elm_syntax$Elm$Syntax$Pattern$UnitPattern = {$: 1};
var $the_sett$elm_syntax_dsl$Elm$CodeGen$unitPattern = $stil4m$elm_syntax$Elm$Syntax$Pattern$UnitPattern;
var $the_sett$elm_syntax_dsl$Elm$CodeGen$fqVal = F2(
	function (moduleName, name) {
		return A2($stil4m$elm_syntax$Elm$Syntax$Expression$FunctionOrValue, moduleName, name);
	});
var $the_sett$elm_syntax_dsl$Elm$CodeGen$val = function (name) {
	return A2($the_sett$elm_syntax_dsl$Elm$CodeGen$fqVal, _List_Nil, name);
};
var $stil4m$elm_syntax$Elm$Syntax$Pattern$VarPattern = function (a) {
	return {$: 11, a: a};
};
var $the_sett$elm_syntax_dsl$Elm$CodeGen$varPattern = function (name) {
	return $stil4m$elm_syntax$Elm$Syntax$Pattern$VarPattern(name);
};
var $author$project$GenerateElm$generateDecoder = function (type_) {
	return $the_sett$elm_syntax_dsl$Elm$CodeGen$parens(
		function () {
			switch (type_.$) {
				case 0:
					return $the_sett$elm_syntax_dsl$Elm$CodeGen$fun('decodeUnit');
				case 1:
					return A2(
						$the_sett$elm_syntax_dsl$Elm$CodeGen$fqFun,
						_List_fromArray(
							['Decode']),
						'bool');
				case 2:
					return A2(
						$the_sett$elm_syntax_dsl$Elm$CodeGen$fqFun,
						_List_fromArray(
							['Decode']),
						'int');
				case 3:
					return A2(
						$the_sett$elm_syntax_dsl$Elm$CodeGen$fqFun,
						_List_fromArray(
							['Decode']),
						'float');
				case 4:
					return $the_sett$elm_syntax_dsl$Elm$CodeGen$fun('decodeChar');
				case 5:
					return A2(
						$the_sett$elm_syntax_dsl$Elm$CodeGen$fqFun,
						_List_fromArray(
							['Decode']),
						'string');
				case 6:
					var t = type_.a;
					return $the_sett$elm_syntax_dsl$Elm$CodeGen$apply(
						_List_fromArray(
							[
								A2(
								$the_sett$elm_syntax_dsl$Elm$CodeGen$fqFun,
								_List_fromArray(
									['Decode']),
								'list'),
								$author$project$GenerateElm$generateDecoder(t)
							]));
				case 7:
					var t1 = type_.a;
					var t2 = type_.b;
					return $the_sett$elm_syntax_dsl$Elm$CodeGen$apply(
						_List_fromArray(
							[
								$the_sett$elm_syntax_dsl$Elm$CodeGen$fun('decodeTuple'),
								$author$project$GenerateElm$generateDecoder(t1),
								$author$project$GenerateElm$generateDecoder(t2)
							]));
				case 8:
					var t1 = type_.a;
					var t2 = type_.b;
					var t3 = type_.c;
					return $the_sett$elm_syntax_dsl$Elm$CodeGen$apply(
						_List_fromArray(
							[
								$the_sett$elm_syntax_dsl$Elm$CodeGen$fun('decodeTuple3'),
								$author$project$GenerateElm$generateDecoder(t1),
								$author$project$GenerateElm$generateDecoder(t2),
								$author$project$GenerateElm$generateDecoder(t3)
							]));
				case 9:
					var fields = type_.a;
					return A2(
						$the_sett$elm_syntax_dsl$Elm$CodeGen$pipe,
						$the_sett$elm_syntax_dsl$Elm$CodeGen$apply(
							_List_fromArray(
								[
									A2(
									$the_sett$elm_syntax_dsl$Elm$CodeGen$fqFun,
									_List_fromArray(
										['Decode']),
									'succeed'),
									A2(
									$the_sett$elm_syntax_dsl$Elm$CodeGen$lambda,
									A2(
										$elm$core$List$map,
										function (field) {
											return $the_sett$elm_syntax_dsl$Elm$CodeGen$varPattern(field.f);
										},
										fields),
									$the_sett$elm_syntax_dsl$Elm$CodeGen$record(
										A2(
											$elm$core$List$map,
											function (field) {
												return _Utils_Tuple2(
													field.f,
													$the_sett$elm_syntax_dsl$Elm$CodeGen$val(field.f));
											},
											fields)))
								])),
						A2(
							$elm$core$List$map,
							function (field) {
								return $the_sett$elm_syntax_dsl$Elm$CodeGen$apply(
									_List_fromArray(
										[
											$the_sett$elm_syntax_dsl$Elm$CodeGen$fun('decodeRecordField'),
											$the_sett$elm_syntax_dsl$Elm$CodeGen$string(field.f),
											$author$project$GenerateElm$generateDecoder(field.X)
										]));
							},
							fields));
				case 10:
					var name = type_.a;
					return $the_sett$elm_syntax_dsl$Elm$CodeGen$apply(
						_List_fromArray(
							[
								A2(
								$the_sett$elm_syntax_dsl$Elm$CodeGen$fqFun,
								_List_fromArray(
									['Decode']),
								'lazy'),
								A2(
								$the_sett$elm_syntax_dsl$Elm$CodeGen$lambda,
								_List_fromArray(
									[$the_sett$elm_syntax_dsl$Elm$CodeGen$unitPattern]),
								$the_sett$elm_syntax_dsl$Elm$CodeGen$fun('decode' + name))
							]));
				case 11:
					var t = type_.a;
					return $the_sett$elm_syntax_dsl$Elm$CodeGen$apply(
						_List_fromArray(
							[
								$the_sett$elm_syntax_dsl$Elm$CodeGen$fun('decodeMaybe'),
								$author$project$GenerateElm$generateDecoder(t)
							]));
				default:
					var e = type_.a;
					var t = type_.b;
					return $the_sett$elm_syntax_dsl$Elm$CodeGen$apply(
						_List_fromArray(
							[
								$the_sett$elm_syntax_dsl$Elm$CodeGen$fun('decodeResult'),
								$author$project$GenerateElm$generateDecoder(e),
								$author$project$GenerateElm$generateDecoder(t)
							]));
			}
		}());
};
var $stil4m$elm_syntax$Elm$Syntax$Expression$ListExpr = function (a) {
	return {$: 19, a: a};
};
var $the_sett$elm_syntax_dsl$Elm$CodeGen$list = function (exprs) {
	return $stil4m$elm_syntax$Elm$Syntax$Expression$ListExpr(
		$the_sett$elm_syntax_dsl$Util$nodifyAll(exprs));
};
var $stil4m$elm_syntax$Elm$Syntax$Expression$TupledExpression = function (a) {
	return {$: 13, a: a};
};
var $the_sett$elm_syntax_dsl$Elm$CodeGen$tuple = function (exprs) {
	return $stil4m$elm_syntax$Elm$Syntax$Expression$TupledExpression(
		$the_sett$elm_syntax_dsl$Util$nodifyAll(exprs));
};
var $the_sett$elm_syntax_dsl$Elm$CodeGen$typed = F2(
	function (name, args) {
		return A2(
			$stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Typed,
			$the_sett$elm_syntax_dsl$Util$nodify(
				_Utils_Tuple2(_List_Nil, name)),
			$the_sett$elm_syntax_dsl$Util$nodifyAll(args));
	});
var $author$project$GenerateElm$generateCustomTypeDecoder = function (_v0) {
	var name = _v0.f;
	var constructors = _v0.B;
	return A5(
		$the_sett$elm_syntax_dsl$Elm$CodeGen$funDecl,
		$elm$core$Maybe$Nothing,
		$elm$core$Maybe$Just(
			A2(
				$the_sett$elm_syntax_dsl$Elm$CodeGen$typed,
				'Decoder',
				_List_fromArray(
					[
						A2($the_sett$elm_syntax_dsl$Elm$CodeGen$typed, name, _List_Nil)
					]))),
		'decode' + name,
		_List_Nil,
		$the_sett$elm_syntax_dsl$Elm$CodeGen$apply(
			_List_fromArray(
				[
					$the_sett$elm_syntax_dsl$Elm$CodeGen$fun('decodeCustomType'),
					$the_sett$elm_syntax_dsl$Elm$CodeGen$list(
					A2(
						$elm$core$List$map,
						function (variant) {
							var variantArgs = $elm$core$List$length(variant.w);
							if (!variantArgs) {
								return $the_sett$elm_syntax_dsl$Elm$CodeGen$tuple(
									_List_fromArray(
										[
											$the_sett$elm_syntax_dsl$Elm$CodeGen$string(variant.f),
											$the_sett$elm_syntax_dsl$Elm$CodeGen$apply(
											_List_fromArray(
												[
													A2(
													$the_sett$elm_syntax_dsl$Elm$CodeGen$fqFun,
													_List_fromArray(
														['Decode']),
													'succeed'),
													A2($the_sett$elm_syntax_dsl$Elm$CodeGen$construct, variant.f, _List_Nil)
												]))
										]));
							} else {
								var mapFunction = (variantArgs === 1) ? A2(
									$the_sett$elm_syntax_dsl$Elm$CodeGen$fqFun,
									_List_fromArray(
										['Decode']),
									'map') : A2(
									$the_sett$elm_syntax_dsl$Elm$CodeGen$fqFun,
									_List_fromArray(
										['Decode']),
									'map' + $elm$core$String$fromInt(variantArgs));
								return $the_sett$elm_syntax_dsl$Elm$CodeGen$tuple(
									_List_fromArray(
										[
											$the_sett$elm_syntax_dsl$Elm$CodeGen$string(variant.f),
											$the_sett$elm_syntax_dsl$Elm$CodeGen$apply(
											_Utils_ap(
												_List_fromArray(
													[
														mapFunction,
														A2($the_sett$elm_syntax_dsl$Elm$CodeGen$construct, variant.f, _List_Nil)
													]),
												A2(
													$elm$core$List$indexedMap,
													F2(
														function (i, arg) {
															return $the_sett$elm_syntax_dsl$Elm$CodeGen$parens(
																A2(
																	$the_sett$elm_syntax_dsl$Elm$CodeGen$pipe,
																	$author$project$GenerateElm$generateDecoder(arg),
																	_List_fromArray(
																		[
																			$the_sett$elm_syntax_dsl$Elm$CodeGen$apply(
																			_List_fromArray(
																				[
																					A2(
																					$the_sett$elm_syntax_dsl$Elm$CodeGen$fqFun,
																					_List_fromArray(
																						['Decode']),
																					'field'),
																					$the_sett$elm_syntax_dsl$Elm$CodeGen$string(
																					'_' + $elm$core$String$fromInt(i))
																				]))
																		])));
														}),
													variant.w)))
										]));
							}
						},
						constructors))
				])));
};
var $stil4m$elm_syntax$Elm$Syntax$Expression$CaseExpression = function (a) {
	return {$: 16, a: a};
};
var $the_sett$elm_syntax_dsl$Elm$CodeGen$caseBlock = F2(
	function (expr, cases) {
		return {
			aI: cases,
			z: $the_sett$elm_syntax_dsl$Util$nodify(expr)
		};
	});
var $the_sett$elm_syntax_dsl$Elm$CodeGen$case_ = F2(
	function (pattern, expr) {
		return _Utils_Tuple2(
			$the_sett$elm_syntax_dsl$Util$nodify(pattern),
			$the_sett$elm_syntax_dsl$Util$nodify(expr));
	});
var $the_sett$elm_syntax_dsl$Elm$CodeGen$caseExpr = F2(
	function (expr, cases) {
		return $stil4m$elm_syntax$Elm$Syntax$Expression$CaseExpression(
			A2(
				$the_sett$elm_syntax_dsl$Elm$CodeGen$caseBlock,
				expr,
				A2(
					$elm$core$List$map,
					function (_v0) {
						var pat = _v0.a;
						var body = _v0.b;
						return A2($the_sett$elm_syntax_dsl$Elm$CodeGen$case_, pat, body);
					},
					cases)));
	});
var $stil4m$elm_syntax$Elm$Syntax$Expression$RecordAccessFunction = function (a) {
	return {$: 21, a: a};
};
var $the_sett$elm_syntax_dsl$Elm$CodeGen$accessFun = function (selector) {
	return $stil4m$elm_syntax$Elm$Syntax$Expression$RecordAccessFunction(selector);
};
var $stil4m$elm_syntax$Elm$Syntax$Infix$Right = 1;
var $the_sett$elm_syntax_dsl$Elm$CodeGen$infixRight = 1;
var $the_sett$elm_syntax_dsl$Elm$CodeGen$composel = A3($the_sett$elm_syntax_dsl$Elm$CodeGen$BinOp, '<<', $the_sett$elm_syntax_dsl$Elm$CodeGen$infixRight, 9);
var $author$project$GenerateElm$generateEncoder = function (type_) {
	return $the_sett$elm_syntax_dsl$Elm$CodeGen$parens(
		function () {
			switch (type_.$) {
				case 0:
					return $the_sett$elm_syntax_dsl$Elm$CodeGen$fun('encodeUnit');
				case 1:
					return A2(
						$the_sett$elm_syntax_dsl$Elm$CodeGen$fqFun,
						_List_fromArray(
							['Encode']),
						'bool');
				case 2:
					return A2(
						$the_sett$elm_syntax_dsl$Elm$CodeGen$fqFun,
						_List_fromArray(
							['Encode']),
						'int');
				case 3:
					return A2(
						$the_sett$elm_syntax_dsl$Elm$CodeGen$fqFun,
						_List_fromArray(
							['Encode']),
						'float');
				case 4:
					return $the_sett$elm_syntax_dsl$Elm$CodeGen$fun('encodeChar');
				case 5:
					return A2(
						$the_sett$elm_syntax_dsl$Elm$CodeGen$fqFun,
						_List_fromArray(
							['Encode']),
						'string');
				case 6:
					var t = type_.a;
					return $the_sett$elm_syntax_dsl$Elm$CodeGen$apply(
						_List_fromArray(
							[
								A2(
								$the_sett$elm_syntax_dsl$Elm$CodeGen$fqFun,
								_List_fromArray(
									['Encode']),
								'list'),
								$author$project$GenerateElm$generateEncoder(t)
							]));
				case 7:
					var t1 = type_.a;
					var t2 = type_.b;
					return $the_sett$elm_syntax_dsl$Elm$CodeGen$apply(
						_List_fromArray(
							[
								$the_sett$elm_syntax_dsl$Elm$CodeGen$fun('encodeTuple'),
								$author$project$GenerateElm$generateEncoder(t1),
								$author$project$GenerateElm$generateEncoder(t2)
							]));
				case 8:
					var t1 = type_.a;
					var t2 = type_.b;
					var t3 = type_.c;
					return $the_sett$elm_syntax_dsl$Elm$CodeGen$apply(
						_List_fromArray(
							[
								$the_sett$elm_syntax_dsl$Elm$CodeGen$fun('encodeTuple3'),
								$author$project$GenerateElm$generateEncoder(t1),
								$author$project$GenerateElm$generateEncoder(t2),
								$author$project$GenerateElm$generateEncoder(t3)
							]));
				case 9:
					var fields = type_.a;
					return $the_sett$elm_syntax_dsl$Elm$CodeGen$apply(
						_List_fromArray(
							[
								$the_sett$elm_syntax_dsl$Elm$CodeGen$fun('encodeRecord'),
								$the_sett$elm_syntax_dsl$Elm$CodeGen$list(
								A2(
									$elm$core$List$map,
									function (field) {
										return $the_sett$elm_syntax_dsl$Elm$CodeGen$tuple(
											_List_fromArray(
												[
													$the_sett$elm_syntax_dsl$Elm$CodeGen$string(field.f),
													A3(
													$the_sett$elm_syntax_dsl$Elm$CodeGen$applyBinOp,
													$author$project$GenerateElm$generateEncoder(field.X),
													$the_sett$elm_syntax_dsl$Elm$CodeGen$composel,
													$the_sett$elm_syntax_dsl$Elm$CodeGen$accessFun('.' + field.f))
												]));
									},
									fields))
							]));
				case 10:
					var name = type_.a;
					return $the_sett$elm_syntax_dsl$Elm$CodeGen$fun('encode' + name);
				case 11:
					var t = type_.a;
					return $the_sett$elm_syntax_dsl$Elm$CodeGen$apply(
						_List_fromArray(
							[
								$the_sett$elm_syntax_dsl$Elm$CodeGen$fun('encodeMaybe'),
								$author$project$GenerateElm$generateEncoder(t)
							]));
				default:
					var e = type_.a;
					var t = type_.b;
					return $the_sett$elm_syntax_dsl$Elm$CodeGen$apply(
						_List_fromArray(
							[
								$the_sett$elm_syntax_dsl$Elm$CodeGen$fun('encodeResult'),
								$author$project$GenerateElm$generateEncoder(e),
								$author$project$GenerateElm$generateEncoder(t)
							]));
			}
		}());
};
var $stil4m$elm_syntax$Elm$Syntax$Pattern$NamedPattern = F2(
	function (a, b) {
		return {$: 12, a: a, b: b};
	});
var $the_sett$elm_syntax_dsl$Elm$CodeGen$namedPattern = F2(
	function (name, patterns) {
		return A2(
			$stil4m$elm_syntax$Elm$Syntax$Pattern$NamedPattern,
			{m: _List_Nil, f: name},
			$the_sett$elm_syntax_dsl$Util$nodifyAll(patterns));
	});
var $author$project$GenerateElm$generateCustomTypeEncoder = function (_v0) {
	var name = _v0.f;
	var constructors = _v0.B;
	return A5(
		$the_sett$elm_syntax_dsl$Elm$CodeGen$funDecl,
		$elm$core$Maybe$Nothing,
		$elm$core$Maybe$Just(
			A2(
				$the_sett$elm_syntax_dsl$Elm$CodeGen$funAnn,
				A2($the_sett$elm_syntax_dsl$Elm$CodeGen$typed, name, _List_Nil),
				A3(
					$the_sett$elm_syntax_dsl$Elm$CodeGen$fqTyped,
					_List_fromArray(
						['Encode']),
					'Value',
					_List_Nil))),
		'encode' + name,
		_List_fromArray(
			[
				$the_sett$elm_syntax_dsl$Elm$CodeGen$varPattern('v')
			]),
		A2(
			$the_sett$elm_syntax_dsl$Elm$CodeGen$caseExpr,
			$the_sett$elm_syntax_dsl$Elm$CodeGen$val('v'),
			A2(
				$elm$core$List$map,
				function (variant) {
					var argNames = A2(
						$elm$core$List$indexedMap,
						F2(
							function (i, _v1) {
								return 'a' + $elm$core$String$fromInt(i);
							}),
						variant.w);
					var argVariablePatterns = A2($elm$core$List$map, $the_sett$elm_syntax_dsl$Elm$CodeGen$varPattern, argNames);
					var argVariables = A2($elm$core$List$map, $the_sett$elm_syntax_dsl$Elm$CodeGen$val, argNames);
					var argEncoders = A2($elm$core$List$map, $author$project$GenerateElm$generateEncoder, variant.w);
					return _Utils_Tuple2(
						A2($the_sett$elm_syntax_dsl$Elm$CodeGen$namedPattern, variant.f, argVariablePatterns),
						$the_sett$elm_syntax_dsl$Elm$CodeGen$apply(
							_List_fromArray(
								[
									$the_sett$elm_syntax_dsl$Elm$CodeGen$fun('encodeVariant'),
									$the_sett$elm_syntax_dsl$Elm$CodeGen$string(variant.f),
									$the_sett$elm_syntax_dsl$Elm$CodeGen$list(
									A3(
										$elm$core$List$map2,
										F2(
											function (argVariable, argEncoder) {
												return $the_sett$elm_syntax_dsl$Elm$CodeGen$apply(
													_List_fromArray(
														[argEncoder, argVariable]));
											}),
										argVariables,
										argEncoders))
								])));
				},
				constructors)));
};
var $author$project$GenerateElm$generateCodec = function (declaration) {
	if (!declaration.$) {
		var name = declaration.a.f;
		var definition = declaration.a.ad;
		return _List_fromArray(
			[
				A5(
				$the_sett$elm_syntax_dsl$Elm$CodeGen$funDecl,
				$elm$core$Maybe$Nothing,
				$elm$core$Maybe$Just(
					A2(
						$the_sett$elm_syntax_dsl$Elm$CodeGen$funAnn,
						A2($the_sett$elm_syntax_dsl$Elm$CodeGen$typed, name, _List_Nil),
						A3(
							$the_sett$elm_syntax_dsl$Elm$CodeGen$fqTyped,
							_List_fromArray(
								['Encode']),
							'Value',
							_List_Nil))),
				'encode' + name,
				_List_Nil,
				$author$project$GenerateElm$generateEncoder(definition)),
				A5(
				$the_sett$elm_syntax_dsl$Elm$CodeGen$funDecl,
				$elm$core$Maybe$Nothing,
				$elm$core$Maybe$Just(
					A2(
						$the_sett$elm_syntax_dsl$Elm$CodeGen$typed,
						'Decoder',
						_List_fromArray(
							[
								A2($the_sett$elm_syntax_dsl$Elm$CodeGen$typed, name, _List_Nil)
							]))),
				'decode' + name,
				_List_Nil,
				$author$project$GenerateElm$generateDecoder(definition))
			]);
	} else {
		var customType = declaration.a;
		return _List_fromArray(
			[
				$author$project$GenerateElm$generateCustomTypeEncoder(customType),
				$author$project$GenerateElm$generateCustomTypeDecoder(customType)
			]);
	}
};
var $stil4m$elm_syntax$Elm$Syntax$Declaration$AliasDeclaration = function (a) {
	return {$: 1, a: a};
};
var $the_sett$elm_syntax_dsl$Elm$CodeGen$typeAlias = F4(
	function (docs, name, args, annotation) {
		return {
			aM: $the_sett$elm_syntax_dsl$Util$nodifyMaybe(docs),
			al: $the_sett$elm_syntax_dsl$Util$nodifyAll(args),
			f: $the_sett$elm_syntax_dsl$Util$nodify(name),
			a2: $the_sett$elm_syntax_dsl$Util$nodify(annotation)
		};
	});
var $the_sett$elm_syntax_dsl$Elm$CodeGen$aliasDecl = F4(
	function (docs, name, args, annotation) {
		if (!docs.$) {
			var docComment = docs.a;
			return A2(
				$the_sett$elm_syntax_dsl$Elm$CodeGen$DeclWithComment,
				docComment,
				function (strDocs) {
					return $stil4m$elm_syntax$Elm$Syntax$Declaration$AliasDeclaration(
						A4(
							$the_sett$elm_syntax_dsl$Elm$CodeGen$typeAlias,
							$elm$core$Maybe$Just(strDocs),
							name,
							args,
							annotation));
				});
		} else {
			return $the_sett$elm_syntax_dsl$Elm$CodeGen$DeclNoComment(
				$stil4m$elm_syntax$Elm$Syntax$Declaration$AliasDeclaration(
					A4($the_sett$elm_syntax_dsl$Elm$CodeGen$typeAlias, $elm$core$Maybe$Nothing, name, args, annotation)));
		}
	});
var $stil4m$elm_syntax$Elm$Syntax$Declaration$CustomTypeDeclaration = function (a) {
	return {$: 2, a: a};
};
var $the_sett$elm_syntax_dsl$Elm$CodeGen$valueConstructor = F2(
	function (name, annotations) {
		return {
			w: $the_sett$elm_syntax_dsl$Util$nodifyAll(annotations),
			f: $the_sett$elm_syntax_dsl$Util$nodify(name)
		};
	});
var $the_sett$elm_syntax_dsl$Elm$CodeGen$customType = F4(
	function (docs, name, args, constructors) {
		var vcons = A2(
			$elm$core$List$map,
			function (_v0) {
				var consName = _v0.a;
				var annotation = _v0.b;
				return A2($the_sett$elm_syntax_dsl$Elm$CodeGen$valueConstructor, consName, annotation);
			},
			constructors);
		return {
			B: $the_sett$elm_syntax_dsl$Util$nodifyAll(vcons),
			aM: $the_sett$elm_syntax_dsl$Util$nodifyMaybe(docs),
			al: $the_sett$elm_syntax_dsl$Util$nodifyAll(args),
			f: $the_sett$elm_syntax_dsl$Util$nodify(name)
		};
	});
var $the_sett$elm_syntax_dsl$Elm$CodeGen$customTypeDecl = F4(
	function (docs, name, args, constructors) {
		if (!docs.$) {
			var docComment = docs.a;
			return A2(
				$the_sett$elm_syntax_dsl$Elm$CodeGen$DeclWithComment,
				docComment,
				function (strDocs) {
					return $stil4m$elm_syntax$Elm$Syntax$Declaration$CustomTypeDeclaration(
						A4(
							$the_sett$elm_syntax_dsl$Elm$CodeGen$customType,
							$elm$core$Maybe$Just(strDocs),
							name,
							args,
							constructors));
				});
		} else {
			return $the_sett$elm_syntax_dsl$Elm$CodeGen$DeclNoComment(
				$stil4m$elm_syntax$Elm$Syntax$Declaration$CustomTypeDeclaration(
					A4($the_sett$elm_syntax_dsl$Elm$CodeGen$customType, $elm$core$Maybe$Nothing, name, args, constructors)));
		}
	});
var $the_sett$elm_syntax_dsl$Elm$CodeGen$boolAnn = A2($the_sett$elm_syntax_dsl$Elm$CodeGen$typed, 'Bool', _List_Nil);
var $the_sett$elm_syntax_dsl$Elm$CodeGen$charAnn = A2($the_sett$elm_syntax_dsl$Elm$CodeGen$typed, 'Char', _List_Nil);
var $the_sett$elm_syntax_dsl$Elm$CodeGen$floatAnn = A2($the_sett$elm_syntax_dsl$Elm$CodeGen$typed, 'Float', _List_Nil);
var $the_sett$elm_syntax_dsl$Elm$CodeGen$intAnn = A2($the_sett$elm_syntax_dsl$Elm$CodeGen$typed, 'Int', _List_Nil);
var $the_sett$elm_syntax_dsl$Elm$CodeGen$listAnn = function (listArg) {
	return A2(
		$the_sett$elm_syntax_dsl$Elm$CodeGen$typed,
		'List',
		_List_fromArray(
			[listArg]));
};
var $the_sett$elm_syntax_dsl$Elm$CodeGen$maybeAnn = function (maybeArg) {
	return A2(
		$the_sett$elm_syntax_dsl$Elm$CodeGen$typed,
		'Maybe',
		_List_fromArray(
			[maybeArg]));
};
var $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Record = function (a) {
	return {$: 4, a: a};
};
var $the_sett$elm_syntax_dsl$Elm$CodeGen$recordDefinition = function (fields) {
	return $the_sett$elm_syntax_dsl$Util$nodifyAll(fields);
};
var $the_sett$elm_syntax_dsl$Elm$CodeGen$recordField = F2(
	function (field, typeAnnotation) {
		return _Utils_Tuple2(
			$the_sett$elm_syntax_dsl$Util$nodify(field),
			$the_sett$elm_syntax_dsl$Util$nodify(typeAnnotation));
	});
var $the_sett$elm_syntax_dsl$Elm$CodeGen$uncurry = F2(
	function (fn, _v0) {
		var a = _v0.a;
		var b = _v0.b;
		return A2(fn, a, b);
	});
var $the_sett$elm_syntax_dsl$Elm$CodeGen$recordAnn = function (fields) {
	return $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Record(
		$the_sett$elm_syntax_dsl$Elm$CodeGen$recordDefinition(
			A2(
				$elm$core$List$map,
				$the_sett$elm_syntax_dsl$Elm$CodeGen$uncurry($the_sett$elm_syntax_dsl$Elm$CodeGen$recordField),
				fields)));
};
var $the_sett$elm_syntax_dsl$Elm$CodeGen$stringAnn = A2($the_sett$elm_syntax_dsl$Elm$CodeGen$typed, 'String', _List_Nil);
var $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Tupled = function (a) {
	return {$: 3, a: a};
};
var $the_sett$elm_syntax_dsl$Elm$CodeGen$tupleAnn = function (args) {
	return $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Tupled(
		$the_sett$elm_syntax_dsl$Util$nodifyAll(args));
};
var $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Unit = {$: 2};
var $the_sett$elm_syntax_dsl$Elm$CodeGen$unitAnn = $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Unit;
var $author$project$GenerateElm$generateTypeAnnotation = function (schemaType) {
	switch (schemaType.$) {
		case 0:
			return $the_sett$elm_syntax_dsl$Elm$CodeGen$unitAnn;
		case 1:
			return $the_sett$elm_syntax_dsl$Elm$CodeGen$boolAnn;
		case 2:
			return $the_sett$elm_syntax_dsl$Elm$CodeGen$intAnn;
		case 3:
			return $the_sett$elm_syntax_dsl$Elm$CodeGen$floatAnn;
		case 4:
			return $the_sett$elm_syntax_dsl$Elm$CodeGen$charAnn;
		case 5:
			return $the_sett$elm_syntax_dsl$Elm$CodeGen$stringAnn;
		case 6:
			var t = schemaType.a;
			return $the_sett$elm_syntax_dsl$Elm$CodeGen$listAnn(
				$author$project$GenerateElm$generateTypeAnnotation(t));
		case 7:
			var t1 = schemaType.a;
			var t2 = schemaType.b;
			return $the_sett$elm_syntax_dsl$Elm$CodeGen$tupleAnn(
				A2(
					$elm$core$List$map,
					$author$project$GenerateElm$generateTypeAnnotation,
					_List_fromArray(
						[t1, t2])));
		case 8:
			var t1 = schemaType.a;
			var t2 = schemaType.b;
			var t3 = schemaType.c;
			return $the_sett$elm_syntax_dsl$Elm$CodeGen$tupleAnn(
				A2(
					$elm$core$List$map,
					$author$project$GenerateElm$generateTypeAnnotation,
					_List_fromArray(
						[t1, t2, t3])));
		case 9:
			var fields = schemaType.a;
			return $the_sett$elm_syntax_dsl$Elm$CodeGen$recordAnn(
				A2(
					$elm$core$List$map,
					function (_v1) {
						var name = _v1.f;
						var type_ = _v1.X;
						return _Utils_Tuple2(
							name,
							$author$project$GenerateElm$generateTypeAnnotation(type_));
					},
					fields));
		case 10:
			var name = schemaType.a;
			return A2($the_sett$elm_syntax_dsl$Elm$CodeGen$typed, name, _List_Nil);
		case 11:
			var t = schemaType.a;
			return $the_sett$elm_syntax_dsl$Elm$CodeGen$maybeAnn(
				$author$project$GenerateElm$generateTypeAnnotation(t));
		default:
			var e = schemaType.a;
			var t = schemaType.b;
			return A2(
				$the_sett$elm_syntax_dsl$Elm$CodeGen$typed,
				'Result',
				A2(
					$elm$core$List$map,
					$author$project$GenerateElm$generateTypeAnnotation,
					_List_fromArray(
						[e, t])));
	}
};
var $author$project$GenerateElm$generateTypeDeclaration = function (declaration) {
	if (!declaration.$) {
		var name = declaration.a.f;
		var definition = declaration.a.ad;
		return A4(
			$the_sett$elm_syntax_dsl$Elm$CodeGen$aliasDecl,
			$elm$core$Maybe$Nothing,
			name,
			_List_Nil,
			$author$project$GenerateElm$generateTypeAnnotation(definition));
	} else {
		var name = declaration.a.f;
		var constructors = declaration.a.B;
		return A4(
			$the_sett$elm_syntax_dsl$Elm$CodeGen$customTypeDecl,
			$elm$core$Maybe$Nothing,
			name,
			_List_Nil,
			A2(
				$elm$core$List$map,
				function (variant) {
					return _Utils_Tuple2(
						variant.f,
						A2($elm$core$List$map, $author$project$GenerateElm$generateTypeAnnotation, variant.w));
				},
				constructors));
	}
};
var $the_sett$elm_pretty_printer$Pretty$NLine = F3(
	function (a, b, c) {
		return {$: 2, a: a, b: b, c: c};
	});
var $the_sett$elm_pretty_printer$Pretty$NNil = {$: 0};
var $the_sett$elm_pretty_printer$Pretty$NText = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $elm$core$String$length = _String_length;
var $the_sett$elm_pretty_printer$Pretty$fits = F2(
	function (w, normal) {
		fits:
		while (true) {
			if (w < 0) {
				return false;
			} else {
				switch (normal.$) {
					case 0:
						return true;
					case 1:
						var text = normal.a;
						var innerNormal = normal.b;
						var $temp$w = w - $elm$core$String$length(text),
							$temp$normal = innerNormal(0);
						w = $temp$w;
						normal = $temp$normal;
						continue fits;
					default:
						return true;
				}
			}
		}
	});
var $the_sett$elm_pretty_printer$Pretty$better = F4(
	function (w, k, doc, doc2Fn) {
		return A2($the_sett$elm_pretty_printer$Pretty$fits, w - k, doc) ? doc : doc2Fn(0);
	});
var $the_sett$elm_pretty_printer$Pretty$best = F3(
	function (width, startCol, x) {
		var be = F3(
			function (w, k, docs) {
				be:
				while (true) {
					if (!docs.b) {
						return $the_sett$elm_pretty_printer$Pretty$NNil;
					} else {
						switch (docs.a.b.$) {
							case 0:
								var _v1 = docs.a;
								var i = _v1.a;
								var _v2 = _v1.b;
								var ds = docs.b;
								var $temp$w = w,
									$temp$k = k,
									$temp$docs = ds;
								w = $temp$w;
								k = $temp$k;
								docs = $temp$docs;
								continue be;
							case 1:
								var _v3 = docs.a;
								var i = _v3.a;
								var _v4 = _v3.b;
								var doc = _v4.a;
								var doc2 = _v4.b;
								var ds = docs.b;
								var $temp$w = w,
									$temp$k = k,
									$temp$docs = A2(
									$elm$core$List$cons,
									_Utils_Tuple2(
										i,
										doc(0)),
									A2(
										$elm$core$List$cons,
										_Utils_Tuple2(
											i,
											doc2(0)),
										ds));
								w = $temp$w;
								k = $temp$k;
								docs = $temp$docs;
								continue be;
							case 2:
								var _v5 = docs.a;
								var i = _v5.a;
								var _v6 = _v5.b;
								var j = _v6.a;
								var doc = _v6.b;
								var ds = docs.b;
								var $temp$w = w,
									$temp$k = k,
									$temp$docs = A2(
									$elm$core$List$cons,
									_Utils_Tuple2(
										i + j,
										doc(0)),
									ds);
								w = $temp$w;
								k = $temp$k;
								docs = $temp$docs;
								continue be;
							case 3:
								var _v7 = docs.a;
								var i = _v7.a;
								var text = _v7.b.a;
								var ds = docs.b;
								return A2(
									$the_sett$elm_pretty_printer$Pretty$NText,
									text,
									function (_v8) {
										return A3(
											be,
											w,
											k + $elm$core$String$length(text),
											ds);
									});
							case 4:
								var _v9 = docs.a;
								var i = _v9.a;
								var _v10 = _v9.b;
								var vsep = _v10.b;
								var ds = docs.b;
								return A3(
									$the_sett$elm_pretty_printer$Pretty$NLine,
									i,
									vsep,
									function (_v11) {
										return A3(
											be,
											w,
											i + $elm$core$String$length(vsep),
											ds);
									});
							case 5:
								var _v12 = docs.a;
								var i = _v12.a;
								var _v13 = _v12.b;
								var doc = _v13.a;
								var doc2 = _v13.b;
								var ds = docs.b;
								return A4(
									$the_sett$elm_pretty_printer$Pretty$better,
									w,
									k,
									A3(
										be,
										w,
										k,
										A2(
											$elm$core$List$cons,
											_Utils_Tuple2(i, doc),
											ds)),
									function (_v14) {
										return A3(
											be,
											w,
											k,
											A2(
												$elm$core$List$cons,
												_Utils_Tuple2(i, doc2),
												ds));
									});
							case 6:
								var _v15 = docs.a;
								var i = _v15.a;
								var fn = _v15.b.a;
								var ds = docs.b;
								var $temp$w = w,
									$temp$k = k,
									$temp$docs = A2(
									$elm$core$List$cons,
									_Utils_Tuple2(
										i,
										fn(i)),
									ds);
								w = $temp$w;
								k = $temp$k;
								docs = $temp$docs;
								continue be;
							default:
								var _v16 = docs.a;
								var i = _v16.a;
								var fn = _v16.b.a;
								var ds = docs.b;
								var $temp$w = w,
									$temp$k = k,
									$temp$docs = A2(
									$elm$core$List$cons,
									_Utils_Tuple2(
										i,
										fn(k)),
									ds);
								w = $temp$w;
								k = $temp$k;
								docs = $temp$docs;
								continue be;
						}
					}
				}
			});
		return A3(
			be,
			width,
			startCol,
			_List_fromArray(
				[
					_Utils_Tuple2(0, x)
				]));
	});
var $elm$core$String$concat = function (strings) {
	return A2($elm$core$String$join, '', strings);
};
var $the_sett$elm_pretty_printer$Pretty$copy = F2(
	function (i, s) {
		return (!i) ? '' : _Utils_ap(
			s,
			A2($the_sett$elm_pretty_printer$Pretty$copy, i - 1, s));
	});
var $the_sett$elm_pretty_printer$Pretty$layout = function (normal) {
	var layoutInner = F2(
		function (normal2, acc) {
			layoutInner:
			while (true) {
				switch (normal2.$) {
					case 0:
						return acc;
					case 1:
						var text = normal2.a;
						var innerNormal = normal2.b;
						var $temp$normal2 = innerNormal(0),
							$temp$acc = A2($elm$core$List$cons, text, acc);
						normal2 = $temp$normal2;
						acc = $temp$acc;
						continue layoutInner;
					default:
						var i = normal2.a;
						var sep = normal2.b;
						var innerNormal = normal2.c;
						var norm = innerNormal(0);
						if (norm.$ === 2) {
							var $temp$normal2 = innerNormal(0),
								$temp$acc = A2($elm$core$List$cons, '\n' + sep, acc);
							normal2 = $temp$normal2;
							acc = $temp$acc;
							continue layoutInner;
						} else {
							var $temp$normal2 = innerNormal(0),
								$temp$acc = A2(
								$elm$core$List$cons,
								'\n' + (A2($the_sett$elm_pretty_printer$Pretty$copy, i, ' ') + sep),
								acc);
							normal2 = $temp$normal2;
							acc = $temp$acc;
							continue layoutInner;
						}
				}
			}
		});
	return $elm$core$String$concat(
		$elm$core$List$reverse(
			A2(layoutInner, normal, _List_Nil)));
};
var $the_sett$elm_pretty_printer$Pretty$pretty = F2(
	function (w, doc) {
		return $the_sett$elm_pretty_printer$Pretty$layout(
			A3($the_sett$elm_pretty_printer$Pretty$best, w, 0, doc));
	});
var $the_sett$elm_pretty_printer$Pretty$Concatenate = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $the_sett$elm_pretty_printer$Pretty$append = F2(
	function (doc1, doc2) {
		return A2(
			$the_sett$elm_pretty_printer$Pretty$Concatenate,
			function (_v0) {
				return doc1;
			},
			function (_v1) {
				return doc2;
			});
	});
var $elm_community$basics_extra$Basics$Extra$flip = F3(
	function (f, b, a) {
		return A2(f, a, b);
	});
var $the_sett$elm_pretty_printer$Pretty$a = $elm_community$basics_extra$Basics$Extra$flip($the_sett$elm_pretty_printer$Pretty$append);
var $the_sett$elm_pretty_printer$Pretty$Line = F2(
	function (a, b) {
		return {$: 4, a: a, b: b};
	});
var $the_sett$elm_pretty_printer$Pretty$line = A2($the_sett$elm_pretty_printer$Pretty$Line, ' ', '');
var $the_sett$elm_pretty_printer$Pretty$Text = function (a) {
	return {$: 3, a: a};
};
var $the_sett$elm_pretty_printer$Pretty$string = $the_sett$elm_pretty_printer$Pretty$Text;
var $the_sett$elm_syntax_dsl$Elm$Comments$delimeters = function (doc) {
	return A2(
		$the_sett$elm_pretty_printer$Pretty$a,
		$the_sett$elm_pretty_printer$Pretty$string('-}'),
		A2(
			$the_sett$elm_pretty_printer$Pretty$a,
			$the_sett$elm_pretty_printer$Pretty$line,
			A2(
				$the_sett$elm_pretty_printer$Pretty$a,
				doc,
				$the_sett$elm_pretty_printer$Pretty$string('{-| '))));
};
var $the_sett$elm_syntax_dsl$Elm$Comments$getParts = function (_v0) {
	var parts = _v0;
	return $elm$core$List$reverse(parts);
};
var $the_sett$elm_pretty_printer$Pretty$Empty = {$: 0};
var $the_sett$elm_pretty_printer$Pretty$empty = $the_sett$elm_pretty_printer$Pretty$Empty;
var $the_sett$elm_pretty_printer$Pretty$join = F2(
	function (sep, docs) {
		join:
		while (true) {
			if (!docs.b) {
				return $the_sett$elm_pretty_printer$Pretty$empty;
			} else {
				if (!docs.a.$) {
					var _v1 = docs.a;
					var ds = docs.b;
					var $temp$sep = sep,
						$temp$docs = ds;
					sep = $temp$sep;
					docs = $temp$docs;
					continue join;
				} else {
					var d = docs.a;
					var ds = docs.b;
					var step = F2(
						function (x, rest) {
							if (!x.$) {
								return rest;
							} else {
								var doc = x;
								return A2(
									$the_sett$elm_pretty_printer$Pretty$append,
									sep,
									A2($the_sett$elm_pretty_printer$Pretty$append, doc, rest));
							}
						});
					var spersed = A3($elm$core$List$foldr, step, $the_sett$elm_pretty_printer$Pretty$empty, ds);
					return A2($the_sett$elm_pretty_printer$Pretty$append, d, spersed);
				}
			}
		}
	});
var $the_sett$elm_pretty_printer$Pretty$lines = $the_sett$elm_pretty_printer$Pretty$join($the_sett$elm_pretty_printer$Pretty$line);
var $the_sett$elm_pretty_printer$Pretty$Column = function (a) {
	return {$: 7, a: a};
};
var $the_sett$elm_pretty_printer$Pretty$column = $the_sett$elm_pretty_printer$Pretty$Column;
var $the_sett$elm_pretty_printer$Pretty$Nest = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var $the_sett$elm_pretty_printer$Pretty$nest = F2(
	function (depth, doc) {
		return A2(
			$the_sett$elm_pretty_printer$Pretty$Nest,
			depth,
			function (_v0) {
				return doc;
			});
	});
var $the_sett$elm_pretty_printer$Pretty$Nesting = function (a) {
	return {$: 6, a: a};
};
var $the_sett$elm_pretty_printer$Pretty$nesting = $the_sett$elm_pretty_printer$Pretty$Nesting;
var $the_sett$elm_pretty_printer$Pretty$align = function (doc) {
	return $the_sett$elm_pretty_printer$Pretty$column(
		function (currentColumn) {
			return $the_sett$elm_pretty_printer$Pretty$nesting(
				function (indentLvl) {
					return A2($the_sett$elm_pretty_printer$Pretty$nest, currentColumn - indentLvl, doc);
				});
		});
};
var $the_sett$elm_pretty_printer$Pretty$hang = F2(
	function (spaces, doc) {
		return $the_sett$elm_pretty_printer$Pretty$align(
			A2($the_sett$elm_pretty_printer$Pretty$nest, spaces, doc));
	});
var $the_sett$elm_pretty_printer$Pretty$indent = F2(
	function (spaces, doc) {
		return A2(
			$the_sett$elm_pretty_printer$Pretty$hang,
			spaces,
			A2(
				$the_sett$elm_pretty_printer$Pretty$append,
				$the_sett$elm_pretty_printer$Pretty$string(
					A2($the_sett$elm_pretty_printer$Pretty$copy, spaces, ' ')),
				doc));
	});
var $the_sett$elm_syntax_dsl$Elm$Comments$prettyCode = function (val) {
	return A2(
		$the_sett$elm_pretty_printer$Pretty$indent,
		4,
		$the_sett$elm_pretty_printer$Pretty$string(val));
};
var $the_sett$elm_syntax_dsl$Elm$Comments$prettyMarkdown = function (val) {
	return A2(
		$the_sett$elm_pretty_printer$Pretty$a,
		$the_sett$elm_pretty_printer$Pretty$line,
		A2(
			$the_sett$elm_pretty_printer$Pretty$a,
			$the_sett$elm_pretty_printer$Pretty$line,
			$the_sett$elm_pretty_printer$Pretty$string(val)));
};
var $elm$core$String$cons = _String_cons;
var $elm$core$String$fromChar = function (_char) {
	return A2($elm$core$String$cons, _char, '');
};
var $the_sett$elm_pretty_printer$Pretty$char = function (c) {
	return $the_sett$elm_pretty_printer$Pretty$Text(
		$elm$core$String$fromChar(c));
};
var $the_sett$elm_pretty_printer$Pretty$space = $the_sett$elm_pretty_printer$Pretty$char(' ');
var $the_sett$elm_pretty_printer$Pretty$words = $the_sett$elm_pretty_printer$Pretty$join($the_sett$elm_pretty_printer$Pretty$space);
var $the_sett$elm_syntax_dsl$Elm$Comments$prettyTags = function (tags) {
	return $the_sett$elm_pretty_printer$Pretty$words(
		_List_fromArray(
			[
				$the_sett$elm_pretty_printer$Pretty$string('@docs'),
				A2(
				$the_sett$elm_pretty_printer$Pretty$join,
				$the_sett$elm_pretty_printer$Pretty$string(', '),
				A2($elm$core$List$map, $the_sett$elm_pretty_printer$Pretty$string, tags))
			]));
};
var $the_sett$elm_syntax_dsl$Elm$Comments$prettyCommentPart = function (part) {
	switch (part.$) {
		case 0:
			var val = part.a;
			return $the_sett$elm_syntax_dsl$Elm$Comments$prettyMarkdown(val);
		case 1:
			var val = part.a;
			return $the_sett$elm_syntax_dsl$Elm$Comments$prettyCode(val);
		default:
			var tags = part.a;
			return $the_sett$elm_syntax_dsl$Elm$Comments$prettyTags(tags);
	}
};
var $the_sett$elm_syntax_dsl$Elm$Comments$prettyDocComment = F2(
	function (width, comment) {
		return A2(
			$the_sett$elm_pretty_printer$Pretty$pretty,
			width,
			$the_sett$elm_syntax_dsl$Elm$Comments$delimeters(
				$the_sett$elm_pretty_printer$Pretty$lines(
					A2(
						$elm$core$List$map,
						$the_sett$elm_syntax_dsl$Elm$Comments$prettyCommentPart,
						$the_sett$elm_syntax_dsl$Elm$Comments$getParts(comment)))));
	});
var $the_sett$elm_syntax_dsl$Elm$Pretty$prettyDocComment = F2(
	function (width, decl) {
		if (!decl.$) {
			var comment = decl.a;
			var declFn = decl.b;
			return declFn(
				A2($the_sett$elm_syntax_dsl$Elm$Comments$prettyDocComment, width, comment));
		} else {
			var declNoComment = decl.a;
			return declNoComment;
		}
	});
var $stil4m$elm_syntax$Elm$Syntax$Node$value = function (_v0) {
	var v = _v0.b;
	return v;
};
var $the_sett$elm_syntax_dsl$Util$denode = $stil4m$elm_syntax$Elm$Syntax$Node$value;
var $the_sett$elm_syntax_dsl$Util$denodeAll = $elm$core$List$map($the_sett$elm_syntax_dsl$Util$denode);
var $the_sett$elm_syntax_dsl$Util$denodeMaybe = $elm$core$Maybe$map($the_sett$elm_syntax_dsl$Util$denode);
var $the_sett$elm_syntax_dsl$Elm$Pretty$prettyDocumentation = function (docs) {
	return $the_sett$elm_pretty_printer$Pretty$string(docs);
};
var $the_sett$elm_syntax_dsl$Elm$Pretty$prettyMaybe = F2(
	function (prettyFn, maybeVal) {
		return A2(
			$elm$core$Maybe$withDefault,
			$the_sett$elm_pretty_printer$Pretty$empty,
			A2($elm$core$Maybe$map, prettyFn, maybeVal));
	});
var $the_sett$elm_pretty_printer$Pretty$Union = F2(
	function (a, b) {
		return {$: 5, a: a, b: b};
	});
var $the_sett$elm_pretty_printer$Pretty$flatten = function (doc) {
	flatten:
	while (true) {
		switch (doc.$) {
			case 1:
				var doc1 = doc.a;
				var doc2 = doc.b;
				return A2(
					$the_sett$elm_pretty_printer$Pretty$Concatenate,
					function (_v1) {
						return $the_sett$elm_pretty_printer$Pretty$flatten(
							doc1(0));
					},
					function (_v2) {
						return $the_sett$elm_pretty_printer$Pretty$flatten(
							doc2(0));
					});
			case 2:
				var i = doc.a;
				var doc1 = doc.b;
				return A2(
					$the_sett$elm_pretty_printer$Pretty$Nest,
					i,
					function (_v3) {
						return $the_sett$elm_pretty_printer$Pretty$flatten(
							doc1(0));
					});
			case 5:
				var doc1 = doc.a;
				var doc2 = doc.b;
				var $temp$doc = doc1;
				doc = $temp$doc;
				continue flatten;
			case 4:
				var hsep = doc.a;
				return $the_sett$elm_pretty_printer$Pretty$Text(hsep);
			case 6:
				var fn = doc.a;
				var $temp$doc = fn(0);
				doc = $temp$doc;
				continue flatten;
			case 7:
				var fn = doc.a;
				var $temp$doc = fn(0);
				doc = $temp$doc;
				continue flatten;
			default:
				var x = doc;
				return x;
		}
	}
};
var $the_sett$elm_pretty_printer$Pretty$group = function (doc) {
	return A2(
		$the_sett$elm_pretty_printer$Pretty$Union,
		$the_sett$elm_pretty_printer$Pretty$flatten(doc),
		doc);
};
var $the_sett$elm_syntax_dsl$Elm$Pretty$isNakedCompound = function (typeAnn) {
	switch (typeAnn.$) {
		case 1:
			if (!typeAnn.b.b) {
				return false;
			} else {
				var args = typeAnn.b;
				return true;
			}
		case 6:
			return true;
		default:
			return false;
	}
};
var $elm$core$Tuple$mapBoth = F3(
	function (funcA, funcB, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		return _Utils_Tuple2(
			funcA(x),
			funcB(y));
	});
var $the_sett$elm_pretty_printer$Pretty$surround = F3(
	function (left, right, doc) {
		return A2(
			$the_sett$elm_pretty_printer$Pretty$append,
			A2($the_sett$elm_pretty_printer$Pretty$append, left, doc),
			right);
	});
var $the_sett$elm_pretty_printer$Pretty$parens = function (doc) {
	return A3(
		$the_sett$elm_pretty_printer$Pretty$surround,
		$the_sett$elm_pretty_printer$Pretty$char('('),
		$the_sett$elm_pretty_printer$Pretty$char(')'),
		doc);
};
var $the_sett$elm_syntax_dsl$Elm$Pretty$dot = $the_sett$elm_pretty_printer$Pretty$string('.');
var $the_sett$elm_syntax_dsl$Elm$Pretty$prettyModuleNameDot = function (name) {
	if (!name.b) {
		return $the_sett$elm_pretty_printer$Pretty$empty;
	} else {
		return A2(
			$the_sett$elm_pretty_printer$Pretty$a,
			$the_sett$elm_syntax_dsl$Elm$Pretty$dot,
			A2(
				$the_sett$elm_pretty_printer$Pretty$join,
				$the_sett$elm_syntax_dsl$Elm$Pretty$dot,
				A2($elm$core$List$map, $the_sett$elm_pretty_printer$Pretty$string, name)));
	}
};
var $the_sett$elm_pretty_printer$Pretty$separators = function (sep) {
	return $the_sett$elm_pretty_printer$Pretty$join(
		A2($the_sett$elm_pretty_printer$Pretty$Line, sep, sep));
};
var $the_sett$elm_syntax_dsl$Elm$Pretty$prettyFieldTypeAnn = function (_v8) {
	var name = _v8.a;
	var ann = _v8.b;
	return $the_sett$elm_pretty_printer$Pretty$group(
		A2(
			$the_sett$elm_pretty_printer$Pretty$nest,
			4,
			$the_sett$elm_pretty_printer$Pretty$lines(
				_List_fromArray(
					[
						$the_sett$elm_pretty_printer$Pretty$words(
						_List_fromArray(
							[
								$the_sett$elm_pretty_printer$Pretty$string(name),
								$the_sett$elm_pretty_printer$Pretty$string(':')
							])),
						$the_sett$elm_syntax_dsl$Elm$Pretty$prettyTypeAnnotation(ann)
					]))));
};
var $the_sett$elm_syntax_dsl$Elm$Pretty$prettyFunctionTypeAnnotation = F2(
	function (left, right) {
		var expandLeft = function (ann) {
			if (ann.$ === 6) {
				return $the_sett$elm_syntax_dsl$Elm$Pretty$prettyTypeAnnotationParens(ann);
			} else {
				return $the_sett$elm_syntax_dsl$Elm$Pretty$prettyTypeAnnotation(ann);
			}
		};
		var innerFnTypeAnn = F2(
			function (innerLeft, innerRight) {
				var rightSide = expandRight(
					$the_sett$elm_syntax_dsl$Util$denode(innerRight));
				if (rightSide.b) {
					var hd = rightSide.a;
					var tl = rightSide.b;
					return A2(
						$elm$core$List$cons,
						expandLeft(
							$the_sett$elm_syntax_dsl$Util$denode(innerLeft)),
						A2(
							$elm$core$List$cons,
							$the_sett$elm_pretty_printer$Pretty$words(
								_List_fromArray(
									[
										$the_sett$elm_pretty_printer$Pretty$string('->'),
										hd
									])),
							tl));
				} else {
					return _List_Nil;
				}
			});
		var expandRight = function (ann) {
			if (ann.$ === 6) {
				var innerLeft = ann.a;
				var innerRight = ann.b;
				return A2(innerFnTypeAnn, innerLeft, innerRight);
			} else {
				return _List_fromArray(
					[
						$the_sett$elm_syntax_dsl$Elm$Pretty$prettyTypeAnnotation(ann)
					]);
			}
		};
		return $the_sett$elm_pretty_printer$Pretty$group(
			$the_sett$elm_pretty_printer$Pretty$lines(
				A2(innerFnTypeAnn, left, right)));
	});
var $the_sett$elm_syntax_dsl$Elm$Pretty$prettyGenericRecord = F2(
	function (paramName, fields) {
		var open = A2(
			$the_sett$elm_pretty_printer$Pretty$a,
			$the_sett$elm_pretty_printer$Pretty$line,
			$the_sett$elm_pretty_printer$Pretty$words(
				_List_fromArray(
					[
						$the_sett$elm_pretty_printer$Pretty$string('{'),
						$the_sett$elm_pretty_printer$Pretty$string(paramName)
					])));
		var close = A2(
			$the_sett$elm_pretty_printer$Pretty$a,
			$the_sett$elm_pretty_printer$Pretty$string('}'),
			$the_sett$elm_pretty_printer$Pretty$line);
		var addBarToFirst = function (exprs) {
			if (!exprs.b) {
				return _List_Nil;
			} else {
				var hd = exprs.a;
				var tl = exprs.b;
				return A2(
					$elm$core$List$cons,
					A2(
						$the_sett$elm_pretty_printer$Pretty$a,
						hd,
						$the_sett$elm_pretty_printer$Pretty$string('| ')),
					tl);
			}
		};
		if (!fields.b) {
			return $the_sett$elm_pretty_printer$Pretty$string('{}');
		} else {
			return $the_sett$elm_pretty_printer$Pretty$group(
				A3(
					$the_sett$elm_pretty_printer$Pretty$surround,
					$the_sett$elm_pretty_printer$Pretty$empty,
					close,
					A2(
						$the_sett$elm_pretty_printer$Pretty$nest,
						4,
						A2(
							$the_sett$elm_pretty_printer$Pretty$a,
							A2(
								$the_sett$elm_pretty_printer$Pretty$separators,
								', ',
								addBarToFirst(
									A2(
										$elm$core$List$map,
										$the_sett$elm_syntax_dsl$Elm$Pretty$prettyFieldTypeAnn,
										A2(
											$elm$core$List$map,
											A2($elm$core$Tuple$mapBoth, $the_sett$elm_syntax_dsl$Util$denode, $the_sett$elm_syntax_dsl$Util$denode),
											fields)))),
							open))));
		}
	});
var $the_sett$elm_syntax_dsl$Elm$Pretty$prettyRecord = function (fields) {
	var open = A2(
		$the_sett$elm_pretty_printer$Pretty$a,
		$the_sett$elm_pretty_printer$Pretty$space,
		$the_sett$elm_pretty_printer$Pretty$string('{'));
	var close = A2(
		$the_sett$elm_pretty_printer$Pretty$a,
		$the_sett$elm_pretty_printer$Pretty$string('}'),
		$the_sett$elm_pretty_printer$Pretty$line);
	if (!fields.b) {
		return $the_sett$elm_pretty_printer$Pretty$string('{}');
	} else {
		return $the_sett$elm_pretty_printer$Pretty$group(
			A3(
				$the_sett$elm_pretty_printer$Pretty$surround,
				open,
				close,
				A2(
					$the_sett$elm_pretty_printer$Pretty$separators,
					', ',
					A2(
						$elm$core$List$map,
						$the_sett$elm_syntax_dsl$Elm$Pretty$prettyFieldTypeAnn,
						A2(
							$elm$core$List$map,
							A2($elm$core$Tuple$mapBoth, $the_sett$elm_syntax_dsl$Util$denode, $the_sett$elm_syntax_dsl$Util$denode),
							fields)))));
	}
};
var $the_sett$elm_syntax_dsl$Elm$Pretty$prettyTupled = function (anns) {
	return $the_sett$elm_pretty_printer$Pretty$parens(
		A2(
			$the_sett$elm_pretty_printer$Pretty$a,
			$the_sett$elm_pretty_printer$Pretty$space,
			A2(
				$the_sett$elm_pretty_printer$Pretty$a,
				A2(
					$the_sett$elm_pretty_printer$Pretty$join,
					$the_sett$elm_pretty_printer$Pretty$string(', '),
					A2(
						$elm$core$List$map,
						$the_sett$elm_syntax_dsl$Elm$Pretty$prettyTypeAnnotation,
						$the_sett$elm_syntax_dsl$Util$denodeAll(anns))),
				$the_sett$elm_pretty_printer$Pretty$space)));
};
var $the_sett$elm_syntax_dsl$Elm$Pretty$prettyTypeAnnotation = function (typeAnn) {
	switch (typeAnn.$) {
		case 0:
			var val = typeAnn.a;
			return $the_sett$elm_pretty_printer$Pretty$string(val);
		case 1:
			var fqName = typeAnn.a;
			var anns = typeAnn.b;
			return A2($the_sett$elm_syntax_dsl$Elm$Pretty$prettyTyped, fqName, anns);
		case 2:
			return $the_sett$elm_pretty_printer$Pretty$string('()');
		case 3:
			var anns = typeAnn.a;
			return $the_sett$elm_syntax_dsl$Elm$Pretty$prettyTupled(anns);
		case 4:
			var recordDef = typeAnn.a;
			return $the_sett$elm_syntax_dsl$Elm$Pretty$prettyRecord(
				$the_sett$elm_syntax_dsl$Util$denodeAll(recordDef));
		case 5:
			var paramName = typeAnn.a;
			var recordDef = typeAnn.b;
			return A2(
				$the_sett$elm_syntax_dsl$Elm$Pretty$prettyGenericRecord,
				$the_sett$elm_syntax_dsl$Util$denode(paramName),
				$the_sett$elm_syntax_dsl$Util$denodeAll(
					$the_sett$elm_syntax_dsl$Util$denode(recordDef)));
		default:
			var fromAnn = typeAnn.a;
			var toAnn = typeAnn.b;
			return A2($the_sett$elm_syntax_dsl$Elm$Pretty$prettyFunctionTypeAnnotation, fromAnn, toAnn);
	}
};
var $the_sett$elm_syntax_dsl$Elm$Pretty$prettyTypeAnnotationParens = function (typeAnn) {
	return $the_sett$elm_syntax_dsl$Elm$Pretty$isNakedCompound(typeAnn) ? $the_sett$elm_pretty_printer$Pretty$parens(
		$the_sett$elm_syntax_dsl$Elm$Pretty$prettyTypeAnnotation(typeAnn)) : $the_sett$elm_syntax_dsl$Elm$Pretty$prettyTypeAnnotation(typeAnn);
};
var $the_sett$elm_syntax_dsl$Elm$Pretty$prettyTyped = F2(
	function (fqName, anns) {
		var argsDoc = $the_sett$elm_pretty_printer$Pretty$words(
			A2(
				$elm$core$List$map,
				$the_sett$elm_syntax_dsl$Elm$Pretty$prettyTypeAnnotationParens,
				$the_sett$elm_syntax_dsl$Util$denodeAll(anns)));
		var _v0 = $the_sett$elm_syntax_dsl$Util$denode(fqName);
		var moduleName = _v0.a;
		var typeName = _v0.b;
		var typeDoc = A2(
			$the_sett$elm_pretty_printer$Pretty$a,
			$the_sett$elm_pretty_printer$Pretty$string(typeName),
			$the_sett$elm_syntax_dsl$Elm$Pretty$prettyModuleNameDot(moduleName));
		return $the_sett$elm_pretty_printer$Pretty$words(
			_List_fromArray(
				[typeDoc, argsDoc]));
	});
var $the_sett$elm_syntax_dsl$Elm$Pretty$prettyValueConstructor = function (cons) {
	return A2(
		$the_sett$elm_pretty_printer$Pretty$nest,
		4,
		$the_sett$elm_pretty_printer$Pretty$group(
			$the_sett$elm_pretty_printer$Pretty$lines(
				_List_fromArray(
					[
						$the_sett$elm_pretty_printer$Pretty$string(
						$the_sett$elm_syntax_dsl$Util$denode(cons.f)),
						$the_sett$elm_pretty_printer$Pretty$lines(
						A2(
							$elm$core$List$map,
							$the_sett$elm_syntax_dsl$Elm$Pretty$prettyTypeAnnotationParens,
							$the_sett$elm_syntax_dsl$Util$denodeAll(cons.w)))
					]))));
};
var $the_sett$elm_syntax_dsl$Elm$Pretty$prettyValueConstructors = function (constructors) {
	return A2(
		$the_sett$elm_pretty_printer$Pretty$join,
		A2(
			$the_sett$elm_pretty_printer$Pretty$a,
			$the_sett$elm_pretty_printer$Pretty$string('| '),
			$the_sett$elm_pretty_printer$Pretty$line),
		A2($elm$core$List$map, $the_sett$elm_syntax_dsl$Elm$Pretty$prettyValueConstructor, constructors));
};
var $the_sett$elm_syntax_dsl$Elm$Pretty$prettyCustomType = function (type_) {
	var customTypePretty = A2(
		$the_sett$elm_pretty_printer$Pretty$nest,
		4,
		A2(
			$the_sett$elm_pretty_printer$Pretty$a,
			$the_sett$elm_syntax_dsl$Elm$Pretty$prettyValueConstructors(
				$the_sett$elm_syntax_dsl$Util$denodeAll(type_.B)),
			A2(
				$the_sett$elm_pretty_printer$Pretty$a,
				$the_sett$elm_pretty_printer$Pretty$string('= '),
				A2(
					$the_sett$elm_pretty_printer$Pretty$a,
					$the_sett$elm_pretty_printer$Pretty$line,
					$the_sett$elm_pretty_printer$Pretty$words(
						_List_fromArray(
							[
								$the_sett$elm_pretty_printer$Pretty$string('type'),
								$the_sett$elm_pretty_printer$Pretty$string(
								$the_sett$elm_syntax_dsl$Util$denode(type_.f)),
								$the_sett$elm_pretty_printer$Pretty$words(
								A2(
									$elm$core$List$map,
									$the_sett$elm_pretty_printer$Pretty$string,
									$the_sett$elm_syntax_dsl$Util$denodeAll(type_.al)))
							]))))));
	return $the_sett$elm_pretty_printer$Pretty$lines(
		_List_fromArray(
			[
				A2(
				$the_sett$elm_syntax_dsl$Elm$Pretty$prettyMaybe,
				$the_sett$elm_syntax_dsl$Elm$Pretty$prettyDocumentation,
				$the_sett$elm_syntax_dsl$Util$denodeMaybe(type_.aM)),
				customTypePretty
			]));
};
var $the_sett$elm_syntax_dsl$Elm$Pretty$adjustExpressionParentheses = F2(
	function (context, expression) {
		var shouldRemove = function (expr) {
			var _v3 = _Utils_Tuple3(context.t, context.s, expr);
			_v3$1:
			while (true) {
				if (_v3.a) {
					return true;
				} else {
					switch (_v3.c.$) {
						case 1:
							if (_v3.b) {
								break _v3$1;
							} else {
								return (context.aZ < 11) ? true : false;
							}
						case 3:
							if (_v3.b) {
								break _v3$1;
							} else {
								var _v4 = _v3.c;
								return true;
							}
						case 7:
							if (_v3.b) {
								break _v3$1;
							} else {
								return true;
							}
						case 8:
							if (_v3.b) {
								break _v3$1;
							} else {
								return true;
							}
						case 9:
							if (_v3.b) {
								break _v3$1;
							} else {
								return true;
							}
						case 10:
							if (_v3.b) {
								break _v3$1;
							} else {
								return true;
							}
						case 11:
							if (_v3.b) {
								break _v3$1;
							} else {
								return true;
							}
						case 12:
							if (_v3.b) {
								break _v3$1;
							} else {
								return true;
							}
						case 13:
							if (_v3.b) {
								break _v3$1;
							} else {
								return true;
							}
						case 18:
							if (_v3.b) {
								break _v3$1;
							} else {
								return true;
							}
						case 19:
							if (_v3.b) {
								break _v3$1;
							} else {
								return true;
							}
						case 20:
							if (_v3.b) {
								break _v3$1;
							} else {
								var _v5 = _v3.c;
								return true;
							}
						case 21:
							if (_v3.b) {
								break _v3$1;
							} else {
								return true;
							}
						case 22:
							if (_v3.b) {
								break _v3$1;
							} else {
								var _v6 = _v3.c;
								return true;
							}
						default:
							if (_v3.b) {
								break _v3$1;
							} else {
								return false;
							}
					}
				}
			}
			return true;
		};
		var removeParens = function (expr) {
			if (expr.$ === 14) {
				var innerExpr = expr.a;
				return shouldRemove(
					$the_sett$elm_syntax_dsl$Util$denode(innerExpr)) ? removeParens(
					$the_sett$elm_syntax_dsl$Util$denode(innerExpr)) : expr;
			} else {
				return expr;
			}
		};
		var addParens = function (expr) {
			var _v1 = _Utils_Tuple3(context.t, context.s, expr);
			_v1$4:
			while (true) {
				if ((!_v1.a) && (!_v1.b)) {
					switch (_v1.c.$) {
						case 15:
							return $stil4m$elm_syntax$Elm$Syntax$Expression$ParenthesizedExpression(
								$the_sett$elm_syntax_dsl$Util$nodify(expr));
						case 16:
							return $stil4m$elm_syntax$Elm$Syntax$Expression$ParenthesizedExpression(
								$the_sett$elm_syntax_dsl$Util$nodify(expr));
						case 17:
							return $stil4m$elm_syntax$Elm$Syntax$Expression$ParenthesizedExpression(
								$the_sett$elm_syntax_dsl$Util$nodify(expr));
						case 4:
							var _v2 = _v1.c;
							return $stil4m$elm_syntax$Elm$Syntax$Expression$ParenthesizedExpression(
								$the_sett$elm_syntax_dsl$Util$nodify(expr));
						default:
							break _v1$4;
					}
				} else {
					break _v1$4;
				}
			}
			return expr;
		};
		return addParens(
			removeParens(expression));
	});
var $elm$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			if (!list.b) {
				return false;
			} else {
				var x = list.a;
				var xs = list.b;
				if (isOkay(x)) {
					return true;
				} else {
					var $temp$isOkay = isOkay,
						$temp$list = xs;
					isOkay = $temp$isOkay;
					list = $temp$list;
					continue any;
				}
			}
		}
	});
var $Chadtech$elm_bool_extra$Bool$Extra$any = $elm$core$List$any($elm$core$Basics$identity);
var $elm$core$Basics$modBy = _Basics_modBy;
var $the_sett$elm_syntax_dsl$Elm$Pretty$decrementIndent = F2(
	function (currentIndent, spaces) {
		var modded = A2($elm$core$Basics$modBy, 4, currentIndent - spaces);
		return (!modded) ? 4 : modded;
	});
var $the_sett$elm_syntax_dsl$Elm$Pretty$doubleLines = $the_sett$elm_pretty_printer$Pretty$join(
	A2($the_sett$elm_pretty_printer$Pretty$a, $the_sett$elm_pretty_printer$Pretty$line, $the_sett$elm_pretty_printer$Pretty$line));
var $the_sett$elm_syntax_dsl$Elm$Pretty$escapeChar = function (val) {
	if ('\'' === val) {
		return '\\\'';
	} else {
		var c = val;
		return $elm$core$String$fromChar(c);
	}
};
var $elm$core$String$fromFloat = _String_fromNumber;
var $elm$core$Tuple$mapSecond = F2(
	function (func, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		return _Utils_Tuple2(
			x,
			func(y));
	});
var $the_sett$elm_syntax_dsl$Elm$Pretty$optionalGroup = F2(
	function (flag, doc) {
		return flag ? doc : $the_sett$elm_pretty_printer$Pretty$group(doc);
	});
var $the_sett$elm_syntax_dsl$Elm$Pretty$precedence = function (symbol) {
	switch (symbol) {
		case '>>':
			return 9;
		case '<<':
			return 9;
		case '^':
			return 8;
		case '*':
			return 7;
		case '/':
			return 7;
		case '//':
			return 7;
		case '%':
			return 7;
		case 'rem':
			return 7;
		case '+':
			return 6;
		case '-':
			return 6;
		case '++':
			return 5;
		case '::':
			return 5;
		case '==':
			return 4;
		case '/=':
			return 4;
		case '<':
			return 4;
		case '>':
			return 4;
		case '<=':
			return 4;
		case '>=':
			return 4;
		case '&&':
			return 3;
		case '||':
			return 2;
		case '|>':
			return 0;
		case '<|':
			return 0;
		default:
			return 0;
	}
};
var $stil4m$elm_syntax$Elm$Syntax$Pattern$ParenthesizedPattern = function (a) {
	return {$: 14, a: a};
};
var $the_sett$elm_syntax_dsl$Elm$Pretty$adjustPatternParentheses = F2(
	function (isTop, pattern) {
		var shouldRemove = function (pat) {
			var _v5 = _Utils_Tuple2(isTop, pat);
			_v5$2:
			while (true) {
				switch (_v5.b.$) {
					case 12:
						if (!_v5.a) {
							var _v6 = _v5.b;
							return false;
						} else {
							break _v5$2;
						}
					case 13:
						var _v7 = _v5.b;
						return false;
					default:
						break _v5$2;
				}
			}
			return isTop;
		};
		var removeParens = function (pat) {
			if (pat.$ === 14) {
				var innerPat = pat.a;
				return shouldRemove(
					$the_sett$elm_syntax_dsl$Util$denode(innerPat)) ? removeParens(
					$the_sett$elm_syntax_dsl$Util$denode(innerPat)) : pat;
			} else {
				return pat;
			}
		};
		var addParens = function (pat) {
			var _v1 = _Utils_Tuple2(isTop, pat);
			_v1$2:
			while (true) {
				if (!_v1.a) {
					switch (_v1.b.$) {
						case 12:
							if (_v1.b.b.b) {
								var _v2 = _v1.b;
								var _v3 = _v2.b;
								return $stil4m$elm_syntax$Elm$Syntax$Pattern$ParenthesizedPattern(
									$the_sett$elm_syntax_dsl$Util$nodify(pat));
							} else {
								break _v1$2;
							}
						case 13:
							var _v4 = _v1.b;
							return $stil4m$elm_syntax$Elm$Syntax$Pattern$ParenthesizedPattern(
								$the_sett$elm_syntax_dsl$Util$nodify(pat));
						default:
							break _v1$2;
					}
				} else {
					break _v1$2;
				}
			}
			return pat;
		};
		return addParens(
			removeParens(pattern));
	});
var $the_sett$elm_pretty_printer$Pretty$braces = function (doc) {
	return A3(
		$the_sett$elm_pretty_printer$Pretty$surround,
		$the_sett$elm_pretty_printer$Pretty$char('{'),
		$the_sett$elm_pretty_printer$Pretty$char('}'),
		doc);
};
var $the_sett$elm_syntax_dsl$Elm$Pretty$quotes = function (doc) {
	return A3(
		$the_sett$elm_pretty_printer$Pretty$surround,
		$the_sett$elm_pretty_printer$Pretty$char('\"'),
		$the_sett$elm_pretty_printer$Pretty$char('\"'),
		doc);
};
var $the_sett$elm_syntax_dsl$Elm$Pretty$singleQuotes = function (doc) {
	return A3(
		$the_sett$elm_pretty_printer$Pretty$surround,
		$the_sett$elm_pretty_printer$Pretty$char('\''),
		$the_sett$elm_pretty_printer$Pretty$char('\''),
		doc);
};
var $elm$core$String$fromList = _String_fromList;
var $elm$core$Basics$negate = function (n) {
	return -n;
};
var $rtfeldman$elm_hex$Hex$unsafeToDigit = function (num) {
	unsafeToDigit:
	while (true) {
		switch (num) {
			case 0:
				return '0';
			case 1:
				return '1';
			case 2:
				return '2';
			case 3:
				return '3';
			case 4:
				return '4';
			case 5:
				return '5';
			case 6:
				return '6';
			case 7:
				return '7';
			case 8:
				return '8';
			case 9:
				return '9';
			case 10:
				return 'a';
			case 11:
				return 'b';
			case 12:
				return 'c';
			case 13:
				return 'd';
			case 14:
				return 'e';
			case 15:
				return 'f';
			default:
				var $temp$num = num;
				num = $temp$num;
				continue unsafeToDigit;
		}
	}
};
var $rtfeldman$elm_hex$Hex$unsafePositiveToDigits = F2(
	function (digits, num) {
		unsafePositiveToDigits:
		while (true) {
			if (num < 16) {
				return A2(
					$elm$core$List$cons,
					$rtfeldman$elm_hex$Hex$unsafeToDigit(num),
					digits);
			} else {
				var $temp$digits = A2(
					$elm$core$List$cons,
					$rtfeldman$elm_hex$Hex$unsafeToDigit(
						A2($elm$core$Basics$modBy, 16, num)),
					digits),
					$temp$num = (num / 16) | 0;
				digits = $temp$digits;
				num = $temp$num;
				continue unsafePositiveToDigits;
			}
		}
	});
var $rtfeldman$elm_hex$Hex$toString = function (num) {
	return $elm$core$String$fromList(
		(num < 0) ? A2(
			$elm$core$List$cons,
			'-',
			A2($rtfeldman$elm_hex$Hex$unsafePositiveToDigits, _List_Nil, -num)) : A2($rtfeldman$elm_hex$Hex$unsafePositiveToDigits, _List_Nil, num));
};
var $the_sett$elm_syntax_dsl$Elm$Pretty$prettyPatternInner = F2(
	function (isTop, pattern) {
		var _v0 = A2($the_sett$elm_syntax_dsl$Elm$Pretty$adjustPatternParentheses, isTop, pattern);
		switch (_v0.$) {
			case 0:
				return $the_sett$elm_pretty_printer$Pretty$string('_');
			case 1:
				return $the_sett$elm_pretty_printer$Pretty$string('()');
			case 2:
				var val = _v0.a;
				return $the_sett$elm_syntax_dsl$Elm$Pretty$singleQuotes(
					$the_sett$elm_pretty_printer$Pretty$string(
						$the_sett$elm_syntax_dsl$Elm$Pretty$escapeChar(val)));
			case 3:
				var val = _v0.a;
				return $the_sett$elm_syntax_dsl$Elm$Pretty$quotes(
					$the_sett$elm_pretty_printer$Pretty$string(val));
			case 4:
				var val = _v0.a;
				return $the_sett$elm_pretty_printer$Pretty$string(
					$elm$core$String$fromInt(val));
			case 5:
				var val = _v0.a;
				return $the_sett$elm_pretty_printer$Pretty$string(
					$rtfeldman$elm_hex$Hex$toString(val));
			case 6:
				var val = _v0.a;
				return $the_sett$elm_pretty_printer$Pretty$string(
					$elm$core$String$fromFloat(val));
			case 7:
				var vals = _v0.a;
				return $the_sett$elm_pretty_printer$Pretty$parens(
					A2(
						$the_sett$elm_pretty_printer$Pretty$a,
						$the_sett$elm_pretty_printer$Pretty$space,
						A2(
							$the_sett$elm_pretty_printer$Pretty$a,
							A2(
								$the_sett$elm_pretty_printer$Pretty$join,
								$the_sett$elm_pretty_printer$Pretty$string(', '),
								A2(
									$elm$core$List$map,
									$the_sett$elm_syntax_dsl$Elm$Pretty$prettyPatternInner(true),
									$the_sett$elm_syntax_dsl$Util$denodeAll(vals))),
							$the_sett$elm_pretty_printer$Pretty$space)));
			case 8:
				var fields = _v0.a;
				return $the_sett$elm_pretty_printer$Pretty$braces(
					A3(
						$the_sett$elm_pretty_printer$Pretty$surround,
						$the_sett$elm_pretty_printer$Pretty$space,
						$the_sett$elm_pretty_printer$Pretty$space,
						A2(
							$the_sett$elm_pretty_printer$Pretty$join,
							$the_sett$elm_pretty_printer$Pretty$string(', '),
							A2(
								$elm$core$List$map,
								$the_sett$elm_pretty_printer$Pretty$string,
								$the_sett$elm_syntax_dsl$Util$denodeAll(fields)))));
			case 9:
				var hdPat = _v0.a;
				var tlPat = _v0.b;
				return $the_sett$elm_pretty_printer$Pretty$words(
					_List_fromArray(
						[
							A2(
							$the_sett$elm_syntax_dsl$Elm$Pretty$prettyPatternInner,
							false,
							$the_sett$elm_syntax_dsl$Util$denode(hdPat)),
							$the_sett$elm_pretty_printer$Pretty$string('::'),
							A2(
							$the_sett$elm_syntax_dsl$Elm$Pretty$prettyPatternInner,
							false,
							$the_sett$elm_syntax_dsl$Util$denode(tlPat))
						]));
			case 10:
				var listPats = _v0.a;
				if (!listPats.b) {
					return $the_sett$elm_pretty_printer$Pretty$string('[]');
				} else {
					var open = A2(
						$the_sett$elm_pretty_printer$Pretty$a,
						$the_sett$elm_pretty_printer$Pretty$space,
						$the_sett$elm_pretty_printer$Pretty$string('['));
					var close = A2(
						$the_sett$elm_pretty_printer$Pretty$a,
						$the_sett$elm_pretty_printer$Pretty$string(']'),
						$the_sett$elm_pretty_printer$Pretty$space);
					return A3(
						$the_sett$elm_pretty_printer$Pretty$surround,
						open,
						close,
						A2(
							$the_sett$elm_pretty_printer$Pretty$join,
							$the_sett$elm_pretty_printer$Pretty$string(', '),
							A2(
								$elm$core$List$map,
								$the_sett$elm_syntax_dsl$Elm$Pretty$prettyPatternInner(false),
								$the_sett$elm_syntax_dsl$Util$denodeAll(listPats))));
				}
			case 11:
				var _var = _v0.a;
				return $the_sett$elm_pretty_printer$Pretty$string(_var);
			case 12:
				var qnRef = _v0.a;
				var listPats = _v0.b;
				return $the_sett$elm_pretty_printer$Pretty$words(
					A2(
						$elm$core$List$cons,
						A2(
							$the_sett$elm_pretty_printer$Pretty$a,
							$the_sett$elm_pretty_printer$Pretty$string(qnRef.f),
							$the_sett$elm_syntax_dsl$Elm$Pretty$prettyModuleNameDot(qnRef.m)),
						A2(
							$elm$core$List$map,
							$the_sett$elm_syntax_dsl$Elm$Pretty$prettyPatternInner(false),
							$the_sett$elm_syntax_dsl$Util$denodeAll(listPats))));
			case 13:
				var pat = _v0.a;
				var name = _v0.b;
				return $the_sett$elm_pretty_printer$Pretty$words(
					_List_fromArray(
						[
							A2(
							$the_sett$elm_syntax_dsl$Elm$Pretty$prettyPatternInner,
							false,
							$the_sett$elm_syntax_dsl$Util$denode(pat)),
							$the_sett$elm_pretty_printer$Pretty$string('as'),
							$the_sett$elm_pretty_printer$Pretty$string(
							$the_sett$elm_syntax_dsl$Util$denode(name))
						]));
			default:
				var pat = _v0.a;
				return $the_sett$elm_pretty_printer$Pretty$parens(
					A2(
						$the_sett$elm_syntax_dsl$Elm$Pretty$prettyPatternInner,
						true,
						$the_sett$elm_syntax_dsl$Util$denode(pat)));
		}
	});
var $the_sett$elm_syntax_dsl$Elm$Pretty$prettyArgs = function (args) {
	return $the_sett$elm_pretty_printer$Pretty$words(
		A2(
			$elm$core$List$map,
			$the_sett$elm_syntax_dsl$Elm$Pretty$prettyPatternInner(false),
			args));
};
var $elm$core$String$replace = F3(
	function (before, after, string) {
		return A2(
			$elm$core$String$join,
			after,
			A2($elm$core$String$split, before, string));
	});
var $the_sett$elm_syntax_dsl$Elm$Pretty$escape = function (val) {
	return A3(
		$elm$core$String$replace,
		'\t',
		'\\t',
		A3(
			$elm$core$String$replace,
			'\n',
			'\\n',
			A3(
				$elm$core$String$replace,
				'\"',
				'\\\"',
				A3($elm$core$String$replace, '\\', '\\\\', val))));
};
var $the_sett$elm_syntax_dsl$Elm$Pretty$prettyLiteral = function (val) {
	return $the_sett$elm_syntax_dsl$Elm$Pretty$quotes(
		$the_sett$elm_pretty_printer$Pretty$string(
			$the_sett$elm_syntax_dsl$Elm$Pretty$escape(val)));
};
var $the_sett$elm_syntax_dsl$Elm$Pretty$prettyPattern = function (pattern) {
	return A2($the_sett$elm_syntax_dsl$Elm$Pretty$prettyPatternInner, true, pattern);
};
var $the_sett$elm_syntax_dsl$Elm$Pretty$prettySignature = function (sig) {
	return $the_sett$elm_pretty_printer$Pretty$group(
		A2(
			$the_sett$elm_pretty_printer$Pretty$nest,
			4,
			$the_sett$elm_pretty_printer$Pretty$lines(
				_List_fromArray(
					[
						$the_sett$elm_pretty_printer$Pretty$words(
						_List_fromArray(
							[
								$the_sett$elm_pretty_printer$Pretty$string(
								$the_sett$elm_syntax_dsl$Util$denode(sig.f)),
								$the_sett$elm_pretty_printer$Pretty$string(':')
							])),
						$the_sett$elm_syntax_dsl$Elm$Pretty$prettyTypeAnnotation(
						$the_sett$elm_syntax_dsl$Util$denode(sig.a2))
					]))));
};
var $the_sett$elm_pretty_printer$Pretty$tightline = A2($the_sett$elm_pretty_printer$Pretty$Line, '', '');
var $elm$core$Bitwise$and = _Bitwise_and;
var $elm$core$Bitwise$shiftRightBy = _Bitwise_shiftRightBy;
var $elm$core$String$repeatHelp = F3(
	function (n, chunk, result) {
		return (n <= 0) ? result : A3(
			$elm$core$String$repeatHelp,
			n >> 1,
			_Utils_ap(chunk, chunk),
			(!(n & 1)) ? result : _Utils_ap(result, chunk));
	});
var $elm$core$String$repeat = F2(
	function (n, chunk) {
		return A3($elm$core$String$repeatHelp, n, chunk, '');
	});
var $elm$core$String$padLeft = F3(
	function (n, _char, string) {
		return _Utils_ap(
			A2(
				$elm$core$String$repeat,
				n - $elm$core$String$length(string),
				$elm$core$String$fromChar(_char)),
			string);
	});
var $elm$core$String$toUpper = _String_toUpper;
var $the_sett$elm_syntax_dsl$Elm$Pretty$toHexString = function (val) {
	var padWithZeros = function (str) {
		var length = $elm$core$String$length(str);
		return (length < 2) ? A3($elm$core$String$padLeft, 2, '0', str) : (((length > 2) && (length < 4)) ? A3($elm$core$String$padLeft, 4, '0', str) : (((length > 4) && (length < 8)) ? A3($elm$core$String$padLeft, 8, '0', str) : str));
	};
	return '0x' + padWithZeros(
		$elm$core$String$toUpper(
			$rtfeldman$elm_hex$Hex$toString(val)));
};
var $the_sett$elm_syntax_dsl$Elm$Pretty$topContext = {s: false, t: true, aZ: 11};
var $elm$core$List$unzip = function (pairs) {
	var step = F2(
		function (_v0, _v1) {
			var x = _v0.a;
			var y = _v0.b;
			var xs = _v1.a;
			var ys = _v1.b;
			return _Utils_Tuple2(
				A2($elm$core$List$cons, x, xs),
				A2($elm$core$List$cons, y, ys));
		});
	return A3(
		$elm$core$List$foldr,
		step,
		_Utils_Tuple2(_List_Nil, _List_Nil),
		pairs);
};
var $the_sett$elm_syntax_dsl$Elm$Pretty$prettyApplication = F2(
	function (indent, exprs) {
		var _v30 = A2(
			$elm$core$Tuple$mapSecond,
			$Chadtech$elm_bool_extra$Bool$Extra$any,
			$elm$core$List$unzip(
				A2(
					$elm$core$List$map,
					A2(
						$the_sett$elm_syntax_dsl$Elm$Pretty$prettyExpressionInner,
						{s: false, t: false, aZ: 11},
						4),
					$the_sett$elm_syntax_dsl$Util$denodeAll(exprs))));
		var prettyExpressions = _v30.a;
		var alwaysBreak = _v30.b;
		return _Utils_Tuple2(
			A2(
				$the_sett$elm_syntax_dsl$Elm$Pretty$optionalGroup,
				alwaysBreak,
				$the_sett$elm_pretty_printer$Pretty$align(
					A2(
						$the_sett$elm_pretty_printer$Pretty$nest,
						indent,
						$the_sett$elm_pretty_printer$Pretty$lines(prettyExpressions)))),
			alwaysBreak);
	});
var $the_sett$elm_syntax_dsl$Elm$Pretty$prettyCaseBlock = F2(
	function (indent, caseBlock) {
		var prettyCase = function (_v29) {
			var pattern = _v29.a;
			var expr = _v29.b;
			return A2(
				$the_sett$elm_pretty_printer$Pretty$indent,
				indent,
				A2(
					$the_sett$elm_pretty_printer$Pretty$a,
					A2(
						$the_sett$elm_pretty_printer$Pretty$indent,
						4,
						A3(
							$the_sett$elm_syntax_dsl$Elm$Pretty$prettyExpressionInner,
							$the_sett$elm_syntax_dsl$Elm$Pretty$topContext,
							4,
							$the_sett$elm_syntax_dsl$Util$denode(expr)).a),
					A2(
						$the_sett$elm_pretty_printer$Pretty$a,
						$the_sett$elm_pretty_printer$Pretty$line,
						A2(
							$the_sett$elm_pretty_printer$Pretty$a,
							$the_sett$elm_pretty_printer$Pretty$string(' ->'),
							$the_sett$elm_syntax_dsl$Elm$Pretty$prettyPattern(
								$the_sett$elm_syntax_dsl$Util$denode(pattern))))));
		};
		var patternsPart = $the_sett$elm_syntax_dsl$Elm$Pretty$doubleLines(
			A2($elm$core$List$map, prettyCase, caseBlock.aI));
		var casePart = function () {
			var _v28 = A3(
				$the_sett$elm_syntax_dsl$Elm$Pretty$prettyExpressionInner,
				$the_sett$elm_syntax_dsl$Elm$Pretty$topContext,
				4,
				$the_sett$elm_syntax_dsl$Util$denode(caseBlock.z));
			var caseExpression = _v28.a;
			var alwaysBreak = _v28.b;
			return A2(
				$the_sett$elm_syntax_dsl$Elm$Pretty$optionalGroup,
				alwaysBreak,
				$the_sett$elm_pretty_printer$Pretty$lines(
					_List_fromArray(
						[
							A2(
							$the_sett$elm_pretty_printer$Pretty$nest,
							indent,
							A2(
								$the_sett$elm_syntax_dsl$Elm$Pretty$optionalGroup,
								alwaysBreak,
								$the_sett$elm_pretty_printer$Pretty$lines(
									_List_fromArray(
										[
											$the_sett$elm_pretty_printer$Pretty$string('case'),
											caseExpression
										])))),
							$the_sett$elm_pretty_printer$Pretty$string('of')
						])));
		}();
		return _Utils_Tuple2(
			$the_sett$elm_pretty_printer$Pretty$align(
				$the_sett$elm_pretty_printer$Pretty$lines(
					_List_fromArray(
						[casePart, patternsPart]))),
			true);
	});
var $the_sett$elm_syntax_dsl$Elm$Pretty$prettyExpression = function (expression) {
	return A3($the_sett$elm_syntax_dsl$Elm$Pretty$prettyExpressionInner, $the_sett$elm_syntax_dsl$Elm$Pretty$topContext, 4, expression).a;
};
var $the_sett$elm_syntax_dsl$Elm$Pretty$prettyExpressionInner = F3(
	function (context, indent, expression) {
		var _v26 = A2($the_sett$elm_syntax_dsl$Elm$Pretty$adjustExpressionParentheses, context, expression);
		switch (_v26.$) {
			case 0:
				return _Utils_Tuple2(
					$the_sett$elm_pretty_printer$Pretty$string('()'),
					false);
			case 1:
				var exprs = _v26.a;
				return A2($the_sett$elm_syntax_dsl$Elm$Pretty$prettyApplication, indent, exprs);
			case 2:
				var symbol = _v26.a;
				var dir = _v26.b;
				var exprl = _v26.c;
				var exprr = _v26.d;
				return A5($the_sett$elm_syntax_dsl$Elm$Pretty$prettyOperatorApplication, indent, symbol, dir, exprl, exprr);
			case 3:
				var modl = _v26.a;
				var val = _v26.b;
				return _Utils_Tuple2(
					A2(
						$the_sett$elm_pretty_printer$Pretty$a,
						$the_sett$elm_pretty_printer$Pretty$string(val),
						$the_sett$elm_syntax_dsl$Elm$Pretty$prettyModuleNameDot(modl)),
					false);
			case 4:
				var exprBool = _v26.a;
				var exprTrue = _v26.b;
				var exprFalse = _v26.c;
				return A4($the_sett$elm_syntax_dsl$Elm$Pretty$prettyIfBlock, indent, exprBool, exprTrue, exprFalse);
			case 5:
				var symbol = _v26.a;
				return _Utils_Tuple2(
					$the_sett$elm_pretty_printer$Pretty$parens(
						$the_sett$elm_pretty_printer$Pretty$string(symbol)),
					false);
			case 6:
				var symbol = _v26.a;
				return _Utils_Tuple2(
					$the_sett$elm_pretty_printer$Pretty$string(symbol),
					false);
			case 7:
				var val = _v26.a;
				return _Utils_Tuple2(
					$the_sett$elm_pretty_printer$Pretty$string(
						$elm$core$String$fromInt(val)),
					false);
			case 8:
				var val = _v26.a;
				return _Utils_Tuple2(
					$the_sett$elm_pretty_printer$Pretty$string(
						$the_sett$elm_syntax_dsl$Elm$Pretty$toHexString(val)),
					false);
			case 9:
				var val = _v26.a;
				return _Utils_Tuple2(
					$the_sett$elm_pretty_printer$Pretty$string(
						$elm$core$String$fromFloat(val)),
					false);
			case 10:
				var expr = _v26.a;
				var _v27 = A3(
					$the_sett$elm_syntax_dsl$Elm$Pretty$prettyExpressionInner,
					$the_sett$elm_syntax_dsl$Elm$Pretty$topContext,
					4,
					$the_sett$elm_syntax_dsl$Util$denode(expr));
				var prettyExpr = _v27.a;
				var alwaysBreak = _v27.b;
				return _Utils_Tuple2(
					A2(
						$the_sett$elm_pretty_printer$Pretty$a,
						prettyExpr,
						$the_sett$elm_pretty_printer$Pretty$string('-')),
					alwaysBreak);
			case 11:
				var val = _v26.a;
				return _Utils_Tuple2(
					$the_sett$elm_syntax_dsl$Elm$Pretty$prettyLiteral(val),
					false);
			case 12:
				var val = _v26.a;
				return _Utils_Tuple2(
					$the_sett$elm_syntax_dsl$Elm$Pretty$singleQuotes(
						$the_sett$elm_pretty_printer$Pretty$string(
							$the_sett$elm_syntax_dsl$Elm$Pretty$escapeChar(val))),
					false);
			case 13:
				var exprs = _v26.a;
				return A2($the_sett$elm_syntax_dsl$Elm$Pretty$prettyTupledExpression, indent, exprs);
			case 14:
				var expr = _v26.a;
				return A2($the_sett$elm_syntax_dsl$Elm$Pretty$prettyParenthesizedExpression, indent, expr);
			case 15:
				var letBlock = _v26.a;
				return A2($the_sett$elm_syntax_dsl$Elm$Pretty$prettyLetBlock, indent, letBlock);
			case 16:
				var caseBlock = _v26.a;
				return A2($the_sett$elm_syntax_dsl$Elm$Pretty$prettyCaseBlock, indent, caseBlock);
			case 17:
				var lambda = _v26.a;
				return A2($the_sett$elm_syntax_dsl$Elm$Pretty$prettyLambdaExpression, indent, lambda);
			case 18:
				var setters = _v26.a;
				return $the_sett$elm_syntax_dsl$Elm$Pretty$prettyRecordExpr(setters);
			case 19:
				var exprs = _v26.a;
				return A2($the_sett$elm_syntax_dsl$Elm$Pretty$prettyList, indent, exprs);
			case 20:
				var expr = _v26.a;
				var field = _v26.b;
				return A2($the_sett$elm_syntax_dsl$Elm$Pretty$prettyRecordAccess, expr, field);
			case 21:
				var field = _v26.a;
				return _Utils_Tuple2(
					$the_sett$elm_pretty_printer$Pretty$string(field),
					false);
			case 22:
				var _var = _v26.a;
				var setters = _v26.b;
				return A3($the_sett$elm_syntax_dsl$Elm$Pretty$prettyRecordUpdateExpression, indent, _var, setters);
			default:
				var val = _v26.a;
				return _Utils_Tuple2(
					$the_sett$elm_pretty_printer$Pretty$string('glsl'),
					true);
		}
	});
var $the_sett$elm_syntax_dsl$Elm$Pretty$prettyFun = function (fn) {
	return $the_sett$elm_pretty_printer$Pretty$lines(
		_List_fromArray(
			[
				A2(
				$the_sett$elm_syntax_dsl$Elm$Pretty$prettyMaybe,
				$the_sett$elm_syntax_dsl$Elm$Pretty$prettyDocumentation,
				$the_sett$elm_syntax_dsl$Util$denodeMaybe(fn.aM)),
				A2(
				$the_sett$elm_syntax_dsl$Elm$Pretty$prettyMaybe,
				$the_sett$elm_syntax_dsl$Elm$Pretty$prettySignature,
				$the_sett$elm_syntax_dsl$Util$denodeMaybe(fn.a$)),
				$the_sett$elm_syntax_dsl$Elm$Pretty$prettyFunctionImplementation(
				$the_sett$elm_syntax_dsl$Util$denode(fn.aK))
			]));
};
var $the_sett$elm_syntax_dsl$Elm$Pretty$prettyFunctionImplementation = function (impl) {
	return A2(
		$the_sett$elm_pretty_printer$Pretty$nest,
		4,
		A2(
			$the_sett$elm_pretty_printer$Pretty$a,
			$the_sett$elm_syntax_dsl$Elm$Pretty$prettyExpression(
				$the_sett$elm_syntax_dsl$Util$denode(impl.z)),
			A2(
				$the_sett$elm_pretty_printer$Pretty$a,
				$the_sett$elm_pretty_printer$Pretty$line,
				$the_sett$elm_pretty_printer$Pretty$words(
					_List_fromArray(
						[
							$the_sett$elm_pretty_printer$Pretty$string(
							$the_sett$elm_syntax_dsl$Util$denode(impl.f)),
							$the_sett$elm_syntax_dsl$Elm$Pretty$prettyArgs(
							$the_sett$elm_syntax_dsl$Util$denodeAll(impl.w)),
							$the_sett$elm_pretty_printer$Pretty$string('=')
						])))));
};
var $the_sett$elm_syntax_dsl$Elm$Pretty$prettyIfBlock = F4(
	function (indent, exprBool, exprTrue, exprFalse) {
		var innerIfBlock = F3(
			function (innerExprBool, innerExprTrue, innerExprFalse) {
				var truePart = A2(
					$the_sett$elm_pretty_printer$Pretty$indent,
					indent,
					A3(
						$the_sett$elm_syntax_dsl$Elm$Pretty$prettyExpressionInner,
						$the_sett$elm_syntax_dsl$Elm$Pretty$topContext,
						4,
						$the_sett$elm_syntax_dsl$Util$denode(innerExprTrue)).a);
				var ifPart = function () {
					var _v25 = A3(
						$the_sett$elm_syntax_dsl$Elm$Pretty$prettyExpressionInner,
						$the_sett$elm_syntax_dsl$Elm$Pretty$topContext,
						4,
						$the_sett$elm_syntax_dsl$Util$denode(innerExprBool));
					var prettyBoolExpr = _v25.a;
					var alwaysBreak = _v25.b;
					return A2(
						$the_sett$elm_syntax_dsl$Elm$Pretty$optionalGroup,
						alwaysBreak,
						$the_sett$elm_pretty_printer$Pretty$lines(
							_List_fromArray(
								[
									A2(
									$the_sett$elm_pretty_printer$Pretty$nest,
									indent,
									A2(
										$the_sett$elm_syntax_dsl$Elm$Pretty$optionalGroup,
										alwaysBreak,
										$the_sett$elm_pretty_printer$Pretty$lines(
											_List_fromArray(
												[
													$the_sett$elm_pretty_printer$Pretty$string('if'),
													A3(
													$the_sett$elm_syntax_dsl$Elm$Pretty$prettyExpressionInner,
													$the_sett$elm_syntax_dsl$Elm$Pretty$topContext,
													4,
													$the_sett$elm_syntax_dsl$Util$denode(innerExprBool)).a
												])))),
									$the_sett$elm_pretty_printer$Pretty$string('then')
								])));
				}();
				var falsePart = function () {
					var _v24 = $the_sett$elm_syntax_dsl$Util$denode(innerExprFalse);
					if (_v24.$ === 4) {
						var nestedExprBool = _v24.a;
						var nestedExprTrue = _v24.b;
						var nestedExprFalse = _v24.c;
						return A3(innerIfBlock, nestedExprBool, nestedExprTrue, nestedExprFalse);
					} else {
						return _List_fromArray(
							[
								A2(
								$the_sett$elm_pretty_printer$Pretty$indent,
								indent,
								A3(
									$the_sett$elm_syntax_dsl$Elm$Pretty$prettyExpressionInner,
									$the_sett$elm_syntax_dsl$Elm$Pretty$topContext,
									4,
									$the_sett$elm_syntax_dsl$Util$denode(innerExprFalse)).a)
							]);
					}
				}();
				var elsePart = A2(
					$the_sett$elm_pretty_printer$Pretty$a,
					$the_sett$elm_pretty_printer$Pretty$string('else'),
					$the_sett$elm_pretty_printer$Pretty$line);
				var context = $the_sett$elm_syntax_dsl$Elm$Pretty$topContext;
				if (!falsePart.b) {
					return _List_Nil;
				} else {
					if (!falsePart.b.b) {
						var falseExpr = falsePart.a;
						return _List_fromArray(
							[ifPart, truePart, elsePart, falseExpr]);
					} else {
						var hd = falsePart.a;
						var tl = falsePart.b;
						return A2(
							$elm$core$List$append,
							_List_fromArray(
								[
									ifPart,
									truePart,
									$the_sett$elm_pretty_printer$Pretty$words(
									_List_fromArray(
										[elsePart, hd]))
								]),
							tl);
					}
				}
			});
		var prettyExpressions = A3(innerIfBlock, exprBool, exprTrue, exprFalse);
		return _Utils_Tuple2(
			$the_sett$elm_pretty_printer$Pretty$align(
				$the_sett$elm_pretty_printer$Pretty$lines(prettyExpressions)),
			true);
	});
var $the_sett$elm_syntax_dsl$Elm$Pretty$prettyLambdaExpression = F2(
	function (indent, lambda) {
		var _v22 = A3(
			$the_sett$elm_syntax_dsl$Elm$Pretty$prettyExpressionInner,
			$the_sett$elm_syntax_dsl$Elm$Pretty$topContext,
			4,
			$the_sett$elm_syntax_dsl$Util$denode(lambda.z));
		var prettyExpr = _v22.a;
		var alwaysBreak = _v22.b;
		return _Utils_Tuple2(
			A2(
				$the_sett$elm_syntax_dsl$Elm$Pretty$optionalGroup,
				alwaysBreak,
				$the_sett$elm_pretty_printer$Pretty$align(
					A2(
						$the_sett$elm_pretty_printer$Pretty$nest,
						indent,
						$the_sett$elm_pretty_printer$Pretty$lines(
							_List_fromArray(
								[
									A2(
									$the_sett$elm_pretty_printer$Pretty$a,
									$the_sett$elm_pretty_printer$Pretty$string(' ->'),
									A2(
										$the_sett$elm_pretty_printer$Pretty$a,
										$the_sett$elm_pretty_printer$Pretty$words(
											A2(
												$elm$core$List$map,
												$the_sett$elm_syntax_dsl$Elm$Pretty$prettyPatternInner(false),
												$the_sett$elm_syntax_dsl$Util$denodeAll(lambda.Y))),
										$the_sett$elm_pretty_printer$Pretty$string('\\'))),
									prettyExpr
								]))))),
			alwaysBreak);
	});
var $the_sett$elm_syntax_dsl$Elm$Pretty$prettyLetBlock = F2(
	function (indent, letBlock) {
		return _Utils_Tuple2(
			$the_sett$elm_pretty_printer$Pretty$align(
				$the_sett$elm_pretty_printer$Pretty$lines(
					_List_fromArray(
						[
							$the_sett$elm_pretty_printer$Pretty$string('let'),
							A2(
							$the_sett$elm_pretty_printer$Pretty$indent,
							indent,
							$the_sett$elm_syntax_dsl$Elm$Pretty$doubleLines(
								A2(
									$elm$core$List$map,
									$the_sett$elm_syntax_dsl$Elm$Pretty$prettyLetDeclaration(indent),
									$the_sett$elm_syntax_dsl$Util$denodeAll(letBlock.ac)))),
							$the_sett$elm_pretty_printer$Pretty$string('in'),
							A3(
							$the_sett$elm_syntax_dsl$Elm$Pretty$prettyExpressionInner,
							$the_sett$elm_syntax_dsl$Elm$Pretty$topContext,
							4,
							$the_sett$elm_syntax_dsl$Util$denode(letBlock.z)).a
						]))),
			true);
	});
var $the_sett$elm_syntax_dsl$Elm$Pretty$prettyLetDeclaration = F2(
	function (indent, letDecl) {
		if (!letDecl.$) {
			var fn = letDecl.a;
			return $the_sett$elm_syntax_dsl$Elm$Pretty$prettyFun(fn);
		} else {
			var pattern = letDecl.a;
			var expr = letDecl.b;
			return A2(
				$the_sett$elm_pretty_printer$Pretty$a,
				A2(
					$the_sett$elm_pretty_printer$Pretty$indent,
					indent,
					A3(
						$the_sett$elm_syntax_dsl$Elm$Pretty$prettyExpressionInner,
						$the_sett$elm_syntax_dsl$Elm$Pretty$topContext,
						4,
						$the_sett$elm_syntax_dsl$Util$denode(expr)).a),
				A2(
					$the_sett$elm_pretty_printer$Pretty$a,
					$the_sett$elm_pretty_printer$Pretty$line,
					$the_sett$elm_pretty_printer$Pretty$words(
						_List_fromArray(
							[
								A2(
								$the_sett$elm_syntax_dsl$Elm$Pretty$prettyPatternInner,
								false,
								$the_sett$elm_syntax_dsl$Util$denode(pattern)),
								$the_sett$elm_pretty_printer$Pretty$string('=')
							]))));
		}
	});
var $the_sett$elm_syntax_dsl$Elm$Pretty$prettyList = F2(
	function (indent, exprs) {
		var open = A2(
			$the_sett$elm_pretty_printer$Pretty$a,
			$the_sett$elm_pretty_printer$Pretty$space,
			$the_sett$elm_pretty_printer$Pretty$string('['));
		var close = A2(
			$the_sett$elm_pretty_printer$Pretty$a,
			$the_sett$elm_pretty_printer$Pretty$string(']'),
			$the_sett$elm_pretty_printer$Pretty$line);
		if (!exprs.b) {
			return _Utils_Tuple2(
				$the_sett$elm_pretty_printer$Pretty$string('[]'),
				false);
		} else {
			var _v20 = A2(
				$elm$core$Tuple$mapSecond,
				$Chadtech$elm_bool_extra$Bool$Extra$any,
				$elm$core$List$unzip(
					A2(
						$elm$core$List$map,
						A2(
							$the_sett$elm_syntax_dsl$Elm$Pretty$prettyExpressionInner,
							$the_sett$elm_syntax_dsl$Elm$Pretty$topContext,
							A2($the_sett$elm_syntax_dsl$Elm$Pretty$decrementIndent, indent, 2)),
						$the_sett$elm_syntax_dsl$Util$denodeAll(exprs))));
			var prettyExpressions = _v20.a;
			var alwaysBreak = _v20.b;
			return _Utils_Tuple2(
				A2(
					$the_sett$elm_syntax_dsl$Elm$Pretty$optionalGroup,
					alwaysBreak,
					$the_sett$elm_pretty_printer$Pretty$align(
						A3(
							$the_sett$elm_pretty_printer$Pretty$surround,
							open,
							close,
							A2($the_sett$elm_pretty_printer$Pretty$separators, ', ', prettyExpressions)))),
				alwaysBreak);
		}
	});
var $the_sett$elm_syntax_dsl$Elm$Pretty$prettyOperatorApplication = F5(
	function (indent, symbol, dir, exprl, exprr) {
		return (symbol === '<|') ? A5($the_sett$elm_syntax_dsl$Elm$Pretty$prettyOperatorApplicationLeft, indent, symbol, dir, exprl, exprr) : A5($the_sett$elm_syntax_dsl$Elm$Pretty$prettyOperatorApplicationRight, indent, symbol, dir, exprl, exprr);
	});
var $the_sett$elm_syntax_dsl$Elm$Pretty$prettyOperatorApplicationLeft = F5(
	function (indent, symbol, _v16, exprl, exprr) {
		var context = {
			s: true,
			t: false,
			aZ: $the_sett$elm_syntax_dsl$Elm$Pretty$precedence(symbol)
		};
		var _v17 = A3(
			$the_sett$elm_syntax_dsl$Elm$Pretty$prettyExpressionInner,
			context,
			4,
			$the_sett$elm_syntax_dsl$Util$denode(exprr));
		var prettyExpressionRight = _v17.a;
		var alwaysBreakRight = _v17.b;
		var _v18 = A3(
			$the_sett$elm_syntax_dsl$Elm$Pretty$prettyExpressionInner,
			context,
			4,
			$the_sett$elm_syntax_dsl$Util$denode(exprl));
		var prettyExpressionLeft = _v18.a;
		var alwaysBreakLeft = _v18.b;
		var alwaysBreak = alwaysBreakLeft || alwaysBreakRight;
		return _Utils_Tuple2(
			A2(
				$the_sett$elm_pretty_printer$Pretty$nest,
				4,
				A2(
					$the_sett$elm_syntax_dsl$Elm$Pretty$optionalGroup,
					alwaysBreak,
					$the_sett$elm_pretty_printer$Pretty$lines(
						_List_fromArray(
							[
								$the_sett$elm_pretty_printer$Pretty$words(
								_List_fromArray(
									[
										prettyExpressionLeft,
										$the_sett$elm_pretty_printer$Pretty$string(symbol)
									])),
								prettyExpressionRight
							])))),
			alwaysBreak);
	});
var $the_sett$elm_syntax_dsl$Elm$Pretty$prettyOperatorApplicationRight = F5(
	function (indent, symbol, _v11, exprl, exprr) {
		var expandExpr = F3(
			function (innerIndent, context, expr) {
				if (expr.$ === 2) {
					var sym = expr.a;
					var left = expr.c;
					var right = expr.d;
					return A4(innerOpApply, false, sym, left, right);
				} else {
					return _List_fromArray(
						[
							A3($the_sett$elm_syntax_dsl$Elm$Pretty$prettyExpressionInner, context, innerIndent, expr)
						]);
				}
			});
		var innerOpApply = F4(
			function (isTop, sym, left, right) {
				var innerIndent = A2(
					$the_sett$elm_syntax_dsl$Elm$Pretty$decrementIndent,
					4,
					$elm$core$String$length(symbol) + 1);
				var leftIndent = isTop ? indent : innerIndent;
				var context = {
					s: '<|' === sym,
					t: false,
					aZ: $the_sett$elm_syntax_dsl$Elm$Pretty$precedence(sym)
				};
				var rightSide = A3(
					expandExpr,
					innerIndent,
					context,
					$the_sett$elm_syntax_dsl$Util$denode(right));
				if (rightSide.b) {
					var _v14 = rightSide.a;
					var hdExpr = _v14.a;
					var hdBreak = _v14.b;
					var tl = rightSide.b;
					return A2(
						$elm$core$List$append,
						A3(
							expandExpr,
							leftIndent,
							context,
							$the_sett$elm_syntax_dsl$Util$denode(left)),
						A2(
							$elm$core$List$cons,
							_Utils_Tuple2(
								A2(
									$the_sett$elm_pretty_printer$Pretty$a,
									hdExpr,
									A2(
										$the_sett$elm_pretty_printer$Pretty$a,
										$the_sett$elm_pretty_printer$Pretty$space,
										$the_sett$elm_pretty_printer$Pretty$string(sym))),
								hdBreak),
							tl));
				} else {
					return _List_Nil;
				}
			});
		var _v12 = A2(
			$elm$core$Tuple$mapSecond,
			$Chadtech$elm_bool_extra$Bool$Extra$any,
			$elm$core$List$unzip(
				A4(innerOpApply, true, symbol, exprl, exprr)));
		var prettyExpressions = _v12.a;
		var alwaysBreak = _v12.b;
		return _Utils_Tuple2(
			A2(
				$the_sett$elm_syntax_dsl$Elm$Pretty$optionalGroup,
				alwaysBreak,
				$the_sett$elm_pretty_printer$Pretty$align(
					A2(
						$the_sett$elm_pretty_printer$Pretty$join,
						A2($the_sett$elm_pretty_printer$Pretty$nest, indent, $the_sett$elm_pretty_printer$Pretty$line),
						prettyExpressions))),
			alwaysBreak);
	});
var $the_sett$elm_syntax_dsl$Elm$Pretty$prettyParenthesizedExpression = F2(
	function (indent, expr) {
		var open = $the_sett$elm_pretty_printer$Pretty$string('(');
		var close = A2(
			$the_sett$elm_pretty_printer$Pretty$a,
			$the_sett$elm_pretty_printer$Pretty$string(')'),
			$the_sett$elm_pretty_printer$Pretty$tightline);
		var _v10 = A3(
			$the_sett$elm_syntax_dsl$Elm$Pretty$prettyExpressionInner,
			$the_sett$elm_syntax_dsl$Elm$Pretty$topContext,
			A2($the_sett$elm_syntax_dsl$Elm$Pretty$decrementIndent, indent, 1),
			$the_sett$elm_syntax_dsl$Util$denode(expr));
		var prettyExpr = _v10.a;
		var alwaysBreak = _v10.b;
		return _Utils_Tuple2(
			A2(
				$the_sett$elm_syntax_dsl$Elm$Pretty$optionalGroup,
				alwaysBreak,
				$the_sett$elm_pretty_printer$Pretty$align(
					A3(
						$the_sett$elm_pretty_printer$Pretty$surround,
						open,
						close,
						A2($the_sett$elm_pretty_printer$Pretty$nest, 1, prettyExpr)))),
			alwaysBreak);
	});
var $the_sett$elm_syntax_dsl$Elm$Pretty$prettyRecordAccess = F2(
	function (expr, field) {
		var _v9 = A3(
			$the_sett$elm_syntax_dsl$Elm$Pretty$prettyExpressionInner,
			$the_sett$elm_syntax_dsl$Elm$Pretty$topContext,
			4,
			$the_sett$elm_syntax_dsl$Util$denode(expr));
		var prettyExpr = _v9.a;
		var alwaysBreak = _v9.b;
		return _Utils_Tuple2(
			A2(
				$the_sett$elm_pretty_printer$Pretty$a,
				$the_sett$elm_pretty_printer$Pretty$string(
					$the_sett$elm_syntax_dsl$Util$denode(field)),
				A2($the_sett$elm_pretty_printer$Pretty$a, $the_sett$elm_syntax_dsl$Elm$Pretty$dot, prettyExpr)),
			alwaysBreak);
	});
var $the_sett$elm_syntax_dsl$Elm$Pretty$prettyRecordExpr = function (setters) {
	var open = A2(
		$the_sett$elm_pretty_printer$Pretty$a,
		$the_sett$elm_pretty_printer$Pretty$space,
		$the_sett$elm_pretty_printer$Pretty$string('{'));
	var close = A2(
		$the_sett$elm_pretty_printer$Pretty$a,
		$the_sett$elm_pretty_printer$Pretty$string('}'),
		$the_sett$elm_pretty_printer$Pretty$line);
	if (!setters.b) {
		return _Utils_Tuple2(
			$the_sett$elm_pretty_printer$Pretty$string('{}'),
			false);
	} else {
		var _v8 = A2(
			$elm$core$Tuple$mapSecond,
			$Chadtech$elm_bool_extra$Bool$Extra$any,
			$elm$core$List$unzip(
				A2(
					$elm$core$List$map,
					$the_sett$elm_syntax_dsl$Elm$Pretty$prettySetter,
					$the_sett$elm_syntax_dsl$Util$denodeAll(setters))));
		var prettyExpressions = _v8.a;
		var alwaysBreak = _v8.b;
		return _Utils_Tuple2(
			A2(
				$the_sett$elm_syntax_dsl$Elm$Pretty$optionalGroup,
				alwaysBreak,
				$the_sett$elm_pretty_printer$Pretty$align(
					A3(
						$the_sett$elm_pretty_printer$Pretty$surround,
						open,
						close,
						A2($the_sett$elm_pretty_printer$Pretty$separators, ', ', prettyExpressions)))),
			alwaysBreak);
	}
};
var $the_sett$elm_syntax_dsl$Elm$Pretty$prettyRecordUpdateExpression = F3(
	function (indent, _var, setters) {
		var open = A2(
			$the_sett$elm_pretty_printer$Pretty$a,
			$the_sett$elm_pretty_printer$Pretty$line,
			$the_sett$elm_pretty_printer$Pretty$words(
				_List_fromArray(
					[
						$the_sett$elm_pretty_printer$Pretty$string('{'),
						$the_sett$elm_pretty_printer$Pretty$string(
						$the_sett$elm_syntax_dsl$Util$denode(_var))
					])));
		var close = A2(
			$the_sett$elm_pretty_printer$Pretty$a,
			$the_sett$elm_pretty_printer$Pretty$string('}'),
			$the_sett$elm_pretty_printer$Pretty$line);
		var addBarToFirst = function (exprs) {
			if (!exprs.b) {
				return _List_Nil;
			} else {
				var hd = exprs.a;
				var tl = exprs.b;
				return A2(
					$elm$core$List$cons,
					A2(
						$the_sett$elm_pretty_printer$Pretty$a,
						hd,
						$the_sett$elm_pretty_printer$Pretty$string('| ')),
					tl);
			}
		};
		if (!setters.b) {
			return _Utils_Tuple2(
				$the_sett$elm_pretty_printer$Pretty$string('{}'),
				false);
		} else {
			var _v5 = A2(
				$elm$core$Tuple$mapSecond,
				$Chadtech$elm_bool_extra$Bool$Extra$any,
				$elm$core$List$unzip(
					A2(
						$elm$core$List$map,
						$the_sett$elm_syntax_dsl$Elm$Pretty$prettySetter,
						$the_sett$elm_syntax_dsl$Util$denodeAll(setters))));
			var prettyExpressions = _v5.a;
			var alwaysBreak = _v5.b;
			return _Utils_Tuple2(
				A2(
					$the_sett$elm_syntax_dsl$Elm$Pretty$optionalGroup,
					alwaysBreak,
					$the_sett$elm_pretty_printer$Pretty$align(
						A3(
							$the_sett$elm_pretty_printer$Pretty$surround,
							$the_sett$elm_pretty_printer$Pretty$empty,
							close,
							A2(
								$the_sett$elm_pretty_printer$Pretty$nest,
								indent,
								A2(
									$the_sett$elm_pretty_printer$Pretty$a,
									A2(
										$the_sett$elm_pretty_printer$Pretty$separators,
										', ',
										addBarToFirst(prettyExpressions)),
									open))))),
				alwaysBreak);
		}
	});
var $the_sett$elm_syntax_dsl$Elm$Pretty$prettySetter = function (_v2) {
	var fld = _v2.a;
	var val = _v2.b;
	var _v3 = A3(
		$the_sett$elm_syntax_dsl$Elm$Pretty$prettyExpressionInner,
		$the_sett$elm_syntax_dsl$Elm$Pretty$topContext,
		4,
		$the_sett$elm_syntax_dsl$Util$denode(val));
	var prettyExpr = _v3.a;
	var alwaysBreak = _v3.b;
	return _Utils_Tuple2(
		A2(
			$the_sett$elm_pretty_printer$Pretty$nest,
			4,
			A2(
				$the_sett$elm_syntax_dsl$Elm$Pretty$optionalGroup,
				alwaysBreak,
				$the_sett$elm_pretty_printer$Pretty$lines(
					_List_fromArray(
						[
							$the_sett$elm_pretty_printer$Pretty$words(
							_List_fromArray(
								[
									$the_sett$elm_pretty_printer$Pretty$string(
									$the_sett$elm_syntax_dsl$Util$denode(fld)),
									$the_sett$elm_pretty_printer$Pretty$string('=')
								])),
							prettyExpr
						])))),
		alwaysBreak);
};
var $the_sett$elm_syntax_dsl$Elm$Pretty$prettyTupledExpression = F2(
	function (indent, exprs) {
		var open = A2(
			$the_sett$elm_pretty_printer$Pretty$a,
			$the_sett$elm_pretty_printer$Pretty$space,
			$the_sett$elm_pretty_printer$Pretty$string('('));
		var close = A2(
			$the_sett$elm_pretty_printer$Pretty$a,
			$the_sett$elm_pretty_printer$Pretty$string(')'),
			$the_sett$elm_pretty_printer$Pretty$line);
		if (!exprs.b) {
			return _Utils_Tuple2(
				$the_sett$elm_pretty_printer$Pretty$string('()'),
				false);
		} else {
			var _v1 = A2(
				$elm$core$Tuple$mapSecond,
				$Chadtech$elm_bool_extra$Bool$Extra$any,
				$elm$core$List$unzip(
					A2(
						$elm$core$List$map,
						A2(
							$the_sett$elm_syntax_dsl$Elm$Pretty$prettyExpressionInner,
							$the_sett$elm_syntax_dsl$Elm$Pretty$topContext,
							A2($the_sett$elm_syntax_dsl$Elm$Pretty$decrementIndent, indent, 2)),
						$the_sett$elm_syntax_dsl$Util$denodeAll(exprs))));
			var prettyExpressions = _v1.a;
			var alwaysBreak = _v1.b;
			return _Utils_Tuple2(
				A2(
					$the_sett$elm_syntax_dsl$Elm$Pretty$optionalGroup,
					alwaysBreak,
					$the_sett$elm_pretty_printer$Pretty$align(
						A3(
							$the_sett$elm_pretty_printer$Pretty$surround,
							open,
							close,
							A2($the_sett$elm_pretty_printer$Pretty$separators, ', ', prettyExpressions)))),
				alwaysBreak);
		}
	});
var $the_sett$elm_syntax_dsl$Elm$Pretty$prettyDestructuring = F2(
	function (pattern, expr) {
		return A2(
			$the_sett$elm_pretty_printer$Pretty$nest,
			4,
			$the_sett$elm_pretty_printer$Pretty$lines(
				_List_fromArray(
					[
						$the_sett$elm_pretty_printer$Pretty$words(
						_List_fromArray(
							[
								$the_sett$elm_syntax_dsl$Elm$Pretty$prettyPattern(pattern),
								$the_sett$elm_pretty_printer$Pretty$string('=')
							])),
						$the_sett$elm_syntax_dsl$Elm$Pretty$prettyExpression(expr)
					])));
	});
var $the_sett$elm_syntax_dsl$Elm$Pretty$prettyInfix = function (infix_) {
	var dirToString = function (direction) {
		switch (direction) {
			case 0:
				return 'left';
			case 1:
				return 'right';
			default:
				return 'non';
		}
	};
	return $the_sett$elm_pretty_printer$Pretty$words(
		_List_fromArray(
			[
				$the_sett$elm_pretty_printer$Pretty$string('infix'),
				$the_sett$elm_pretty_printer$Pretty$string(
				dirToString(
					$the_sett$elm_syntax_dsl$Util$denode(infix_.aL))),
				$the_sett$elm_pretty_printer$Pretty$string(
				$elm$core$String$fromInt(
					$the_sett$elm_syntax_dsl$Util$denode(infix_.aZ))),
				$the_sett$elm_pretty_printer$Pretty$parens(
				$the_sett$elm_pretty_printer$Pretty$string(
					$the_sett$elm_syntax_dsl$Util$denode(infix_.aY))),
				$the_sett$elm_pretty_printer$Pretty$string('='),
				$the_sett$elm_pretty_printer$Pretty$string(
				$the_sett$elm_syntax_dsl$Util$denode(infix_.aN))
			]));
};
var $the_sett$elm_syntax_dsl$Elm$Pretty$prettyPortDeclaration = function (sig) {
	return $the_sett$elm_pretty_printer$Pretty$words(
		_List_fromArray(
			[
				$the_sett$elm_pretty_printer$Pretty$string('port'),
				$the_sett$elm_syntax_dsl$Elm$Pretty$prettySignature(sig)
			]));
};
var $the_sett$elm_syntax_dsl$Elm$Pretty$prettyTypeAlias = function (tAlias) {
	var typeAliasPretty = A2(
		$the_sett$elm_pretty_printer$Pretty$nest,
		4,
		A2(
			$the_sett$elm_pretty_printer$Pretty$a,
			$the_sett$elm_syntax_dsl$Elm$Pretty$prettyTypeAnnotation(
				$the_sett$elm_syntax_dsl$Util$denode(tAlias.a2)),
			A2(
				$the_sett$elm_pretty_printer$Pretty$a,
				$the_sett$elm_pretty_printer$Pretty$line,
				$the_sett$elm_pretty_printer$Pretty$words(
					_List_fromArray(
						[
							$the_sett$elm_pretty_printer$Pretty$string('type alias'),
							$the_sett$elm_pretty_printer$Pretty$string(
							$the_sett$elm_syntax_dsl$Util$denode(tAlias.f)),
							$the_sett$elm_pretty_printer$Pretty$words(
							A2(
								$elm$core$List$map,
								$the_sett$elm_pretty_printer$Pretty$string,
								$the_sett$elm_syntax_dsl$Util$denodeAll(tAlias.al))),
							$the_sett$elm_pretty_printer$Pretty$string('=')
						])))));
	return $the_sett$elm_pretty_printer$Pretty$lines(
		_List_fromArray(
			[
				A2(
				$the_sett$elm_syntax_dsl$Elm$Pretty$prettyMaybe,
				$the_sett$elm_syntax_dsl$Elm$Pretty$prettyDocumentation,
				$the_sett$elm_syntax_dsl$Util$denodeMaybe(tAlias.aM)),
				typeAliasPretty
			]));
};
var $the_sett$elm_syntax_dsl$Elm$Pretty$prettyElmSyntaxDeclaration = function (decl) {
	switch (decl.$) {
		case 0:
			var fn = decl.a;
			return $the_sett$elm_syntax_dsl$Elm$Pretty$prettyFun(fn);
		case 1:
			var tAlias = decl.a;
			return $the_sett$elm_syntax_dsl$Elm$Pretty$prettyTypeAlias(tAlias);
		case 2:
			var type_ = decl.a;
			return $the_sett$elm_syntax_dsl$Elm$Pretty$prettyCustomType(type_);
		case 3:
			var sig = decl.a;
			return $the_sett$elm_syntax_dsl$Elm$Pretty$prettyPortDeclaration(sig);
		case 4:
			var infix_ = decl.a;
			return $the_sett$elm_syntax_dsl$Elm$Pretty$prettyInfix(infix_);
		default:
			var pattern = decl.a;
			var expr = decl.b;
			return A2(
				$the_sett$elm_syntax_dsl$Elm$Pretty$prettyDestructuring,
				$the_sett$elm_syntax_dsl$Util$denode(pattern),
				$the_sett$elm_syntax_dsl$Util$denode(expr));
	}
};
var $the_sett$elm_syntax_dsl$Elm$Pretty$prettyDeclaration = F2(
	function (width, decl) {
		var innerDecl = A2($the_sett$elm_syntax_dsl$Elm$Pretty$prettyDocComment, width, decl);
		return $the_sett$elm_syntax_dsl$Elm$Pretty$prettyElmSyntaxDeclaration(innerDecl);
	});
var $author$project$GenerateElm$template = '-- This module was autogenerated using elm-port-schema. Do not manually edit\n    \n\nport module {{ moduleName }} exposing (..)\n\nimport Dict\nimport Json.Decode as Decode exposing (Decoder)\nimport Json.Encode as Encode\n\n\nport fromElm : Encode.Value -> Cmd msg\n\n\nport toElm : (Decode.Value -> msg) -> Sub msg\n\n\nsend : FromElmMessage -> Cmd msg\nsend =\n    fromElm << encodeFromElmMessage\n\n\nrecive : (Result Decode.Error ToElmMessage -> msg) -> Sub msg\nrecive f =\n    toElm (f << Decode.decodeValue decodeToElmMessage)\n\n\n\n-- types\n\n\n{{ typeDeclarations }}\n\n\n\n-- codecs\n\n\n{{ codecs }}\n\n\n\n-- prelude\n\n\nencodeUnit : () -> Encode.Value\nencodeUnit _ =\n    encodeVariant "()" []\n\n\ndecodeUnit : Decode.Decoder ()\ndecodeUnit =\n    decodeCustomType [ ( "()", Decode.succeed () ) ]\n\n\nencodeChar : Char -> Encode.Value\nencodeChar c =\n    Encode.string (String.fromChar c)\n\n\ndecodeChar : Decode.Decoder Char\ndecodeChar =\n    Decode.andThen\n        (\\string ->\n            case String.toList string of\n                [ char ] ->\n                    Decode.succeed char\n\n                _ ->\n                    Decode.fail\n                        ("Expected string of length 1. Got "\n                            ++ String.fromInt (String.length string)\n                        )\n        )\n        Decode.string\n\n\nencodeTuple : (a -> Encode.Value) -> (b -> Encode.Value) -> ( a, b ) -> Encode.Value\nencodeTuple encoderA encoderB ( a, b ) =\n    Encode.list identity\n        [ encoderA a\n        , encoderB b\n        ]\n\n\ndecodeTuple : Decoder t1 -> Decoder t2 -> Decoder ( t1, t2 )\ndecodeTuple t1Decoder t2Decoder =\n    Decode.map2 Tuple.pair\n        (Decode.index 0 t1Decoder)\n        (Decode.index 1 t2Decoder)\n\n\nencodeTuple3 : (a -> Encode.Value) -> (b -> Encode.Value) -> (c -> Encode.Value) -> ( a, b, c ) -> Encode.Value\nencodeTuple3 encoderA encoderB encoderC ( a, b, c ) =\n    Encode.list identity\n        [ encoderA a\n        , encoderB b\n        , encoderC c\n        ]\n\n\ndecodeTuple3 : Decoder t1 -> Decoder t2 -> Decoder t3 -> Decoder ( t1, t2, t3 )\ndecodeTuple3 t1Decoder t2Decoder t3Decoder =\n    Decode.map3 (\\e1 e2 e3 -> ( e1, e2, e3 ))\n        (Decode.index 0 t1Decoder)\n        (Decode.index 1 t2Decoder)\n        (Decode.index 3 t3Decoder)\n\n\nencodeMaybe : (a -> Encode.Value) -> Maybe a -> Encode.Value\nencodeMaybe innerEncoder m =\n    case m of\n        Just inner ->\n            encodeVariant "Just" [ innerEncoder inner ]\n\n        Nothing ->\n            encodeVariant "Nothing" []\n\n\ndecodeMaybe : Decoder t -> Decoder (Maybe t)\ndecodeMaybe justDecoder =\n    decodeCustomType\n        [ ( "Just"\n          , Decode.map Just\n                (decodeVariantArg 0 justDecoder)\n          )\n        , ( "Nothing", Decode.succeed Nothing )\n        ]\n\n\nencodeResult : (x -> Encode.Value) -> (a -> Encode.Value) -> Result x a -> Encode.Value\nencodeResult errEncoder okEncoder r =\n    case r of\n        Ok ok ->\n            encodeVariant "Ok" [ okEncoder ok ]\n\n        Err err ->\n            encodeVariant "Err" [ errEncoder err ]\n\n\ndecodeResult : Decoder e -> Decoder t -> Decoder (Result e t)\ndecodeResult errorDecoder okDecoder =\n    decodeCustomType\n        [ ( "Ok"\n          , Decode.map Ok (decodeVariantArg 0 okDecoder)\n          )\n        , ( "Err"\n          , Decode.map Err (decodeVariantArg 0 errorDecoder)\n          )\n        ]\n\n\nencodeRecord : List ( String, a -> Encode.Value ) -> a -> Encode.Value\nencodeRecord fields record =\n    Encode.object\n        (List.map\n            (\\( fieldName, fieldEncoder ) -> ( fieldName, fieldEncoder record ))\n            fields\n        )\n\n\ndecodeRecordField : String -> Decoder a -> Decoder (a -> b) -> Decoder b\ndecodeRecordField fieldName fieldDecoder recordDecoder =\n    Decode.andThen\n        (\\fieldValue -> Decode.map (\\f -> f fieldValue) recordDecoder)\n        (Decode.field fieldName fieldDecoder)\n\n\ndecodeCustomType : List ( String, Decoder a ) -> Decoder a\ndecodeCustomType decoders =\n    Decode.andThen\n        (\\variant ->\n            case Dict.get variant (Dict.fromList decoders) of\n                Nothing ->\n                    Decode.fail\n                        ("Unexpected variant. Expected on of the following: "\n                            ++ String.join ", " (List.map Tuple.first decoders)\n                        )\n\n                Just variantDecoder ->\n                    variantDecoder\n        )\n        (Decode.field "variant" Decode.string)\n\n\nencodeVariant : String -> List Encode.Value -> Encode.Value\nencodeVariant variantName variantArgs =\n    Encode.object\n        ([ ( "variant", Encode.string variantName ) ]\n            ++ List.indexedMap\n                (\\index variantArg ->\n                    ( "_" ++ String.fromInt index, variantArg )\n                )\n                variantArgs\n        )\n\n\ndecodeVariant : Decoder String\ndecodeVariant =\n    Decode.field "variant" Decode.string\n\n\ndecodeVariantArg : Int -> Decoder a -> Decoder a\ndecodeVariantArg n =\n    Decode.field ("_" ++ String.fromInt n)\n';
var $author$project$GenerateElm$generateElm = F2(
	function (moduleName, schema) {
		return A3(
			$jorgengranseth$elm_string_format$String$Format$namedValue,
			'codecs',
			A2(
				$elm$core$String$join,
				'\n\n\n',
				A2(
					$elm$core$List$map,
					$the_sett$elm_pretty_printer$Pretty$pretty(80),
					A2(
						$elm$core$List$map,
						$the_sett$elm_syntax_dsl$Elm$Pretty$prettyDeclaration(80),
						A2($elm$core$List$concatMap, $author$project$GenerateElm$generateCodec, schema.ac)))),
			A3(
				$jorgengranseth$elm_string_format$String$Format$namedValue,
				'typeDeclarations',
				A2(
					$elm$core$String$join,
					'\n\n\n',
					A2(
						$elm$core$List$map,
						$the_sett$elm_pretty_printer$Pretty$pretty(80),
						A2(
							$elm$core$List$map,
							$the_sett$elm_syntax_dsl$Elm$Pretty$prettyDeclaration(80),
							A2($elm$core$List$map, $author$project$GenerateElm$generateTypeDeclaration, schema.ac)))),
				A3($jorgengranseth$elm_string_format$String$Format$namedValue, 'moduleName', moduleName, $author$project$GenerateElm$template)));
	});
var $elm$core$String$contains = _String_contains;
var $author$project$GenerateTypeScript$indent = F2(
	function (n, s) {
		return A2(
			$elm$core$String$join,
			'\n' + A2($elm$core$String$repeat, n, ' '),
			A2($elm$core$String$split, '\n', s));
	});
var $author$project$GenerateTypeScript$reJoin = F2(
	function (delim, strings) {
		return A2(
			$elm$core$String$join,
			delim,
			A2(
				$elm$core$String$split,
				'\n',
				A2($elm$core$String$join, '\n', strings)));
	});
var $author$project$GenerateTypeScript$generateType = F2(
	function (inline, type_) {
		switch (type_.$) {
			case 0:
				return 'Unit';
			case 1:
				return 'boolean';
			case 2:
				return 'number';
			case 3:
				return 'number';
			case 4:
				return 'string';
			case 5:
				return 'string';
			case 6:
				var t = type_.a;
				return 'Array<' + (A2($author$project$GenerateTypeScript$generateType, true, t) + '>');
			case 7:
				var t1 = type_.a;
				var t2 = type_.b;
				return A3(
					$jorgengranseth$elm_string_format$String$Format$namedValue,
					'type2',
					A2(
						$author$project$GenerateTypeScript$indent,
						2,
						A2($author$project$GenerateTypeScript$generateType, inline, t2)),
					A3(
						$jorgengranseth$elm_string_format$String$Format$namedValue,
						'type1',
						A2(
							$author$project$GenerateTypeScript$indent,
							2,
							A2($author$project$GenerateTypeScript$generateType, inline, t1)),
						A2(
							$elm$core$String$join,
							'\n',
							_List_fromArray(
								['[ {{ type1 }}', ', {{ type2 }}', ']']))));
			case 8:
				var t1 = type_.a;
				var t2 = type_.b;
				var t3 = type_.c;
				return A3(
					$jorgengranseth$elm_string_format$String$Format$namedValue,
					'type3',
					A2(
						$author$project$GenerateTypeScript$indent,
						2,
						A2($author$project$GenerateTypeScript$generateType, inline, t3)),
					A3(
						$jorgengranseth$elm_string_format$String$Format$namedValue,
						'type2',
						A2(
							$author$project$GenerateTypeScript$indent,
							2,
							A2($author$project$GenerateTypeScript$generateType, inline, t2)),
						A3(
							$jorgengranseth$elm_string_format$String$Format$namedValue,
							'type1',
							A2(
								$author$project$GenerateTypeScript$indent,
								2,
								A2($author$project$GenerateTypeScript$generateType, inline, t1)),
							A2(
								$elm$core$String$join,
								'\n',
								_List_fromArray(
									['[ {{ type1 }}', ', {{ type2 }}', ', {{ type3 }}', ']'])))));
			case 9:
				var fields = type_.a;
				var fieldsList = A2(
					$elm$core$List$map,
					function (field) {
						return field.f + (': ' + A2($author$project$GenerateTypeScript$generateType, inline, field.X));
					},
					fields);
				return inline ? A3(
					$jorgengranseth$elm_string_format$String$Format$namedValue,
					'fields',
					A2($elm$core$String$join, ', ', fieldsList),
					'{ {{ fields }} }') : A3(
					$jorgengranseth$elm_string_format$String$Format$namedValue,
					'fields',
					A2($author$project$GenerateTypeScript$reJoin, '\n,  ', fieldsList),
					A2(
						$elm$core$String$join,
						'\n',
						_List_fromArray(
							['{ {{ fields }}', '}'])));
			case 10:
				var name = type_.a;
				return name;
			case 11:
				var t = type_.a;
				return 'Maybe<' + (A2($author$project$GenerateTypeScript$generateType, true, t) + '>');
			default:
				var e = type_.a;
				var t = type_.b;
				return 'Result<' + (A2($author$project$GenerateTypeScript$generateType, true, e) + (', ' + (A2($author$project$GenerateTypeScript$generateType, true, t) + '>')));
		}
	});
var $author$project$GenerateTypeScript$reJoinLines = F2(
	function (delim, str) {
		return A2(
			$elm$core$String$join,
			delim,
			A2($elm$core$String$split, '\n', str));
	});
var $author$project$GenerateTypeScript$generateCustomTypeConstructor = function (_v0) {
	var name = _v0.f;
	var _arguments = _v0.w;
	return (!$elm$core$List$length(_arguments)) ? A3($jorgengranseth$elm_string_format$String$Format$namedValue, 'variant', name, '{ variant : \"{{ variant }}\" }') : A3(
		$jorgengranseth$elm_string_format$String$Format$namedValue,
		'arguments',
		A2(
			$elm$core$String$join,
			'\n, ',
			A2(
				$elm$core$List$indexedMap,
				F2(
					function (i, argument) {
						var argumentStr = A2($author$project$GenerateTypeScript$generateType, false, argument);
						return A2($elm$core$String$contains, '\n', argumentStr) ? A3(
							$jorgengranseth$elm_string_format$String$Format$namedValue,
							'argument',
							A2($author$project$GenerateTypeScript$reJoinLines, '\n    ', argumentStr),
							A3(
								$jorgengranseth$elm_string_format$String$Format$namedValue,
								'i',
								$elm$core$String$fromInt(i),
								A2(
									$elm$core$String$join,
									'\n',
									_List_fromArray(
										['_{{ i }} :', '    {{ argument }}'])))) : A3(
							$jorgengranseth$elm_string_format$String$Format$namedValue,
							'argument',
							argumentStr,
							A3(
								$jorgengranseth$elm_string_format$String$Format$namedValue,
								'i',
								$elm$core$String$fromInt(i),
								'_{{ i }} : {{ argument }}'));
					}),
				_arguments)),
		A3(
			$jorgengranseth$elm_string_format$String$Format$namedValue,
			'variant',
			name,
			A2(
				$elm$core$String$join,
				'\n',
				_List_fromArray(
					['{ variant : \"{{ variant }}\"', ', {{ arguments }}', '}']))));
};
var $author$project$GenerateTypeScript$generateCustomTypeDeclaration = function (_v0) {
	var name = _v0.f;
	var constructors = _v0.B;
	return A3(
		$jorgengranseth$elm_string_format$String$Format$namedValue,
		'constructors',
		A2(
			$author$project$GenerateTypeScript$reJoinLines,
			'\n    ',
			A2(
				$elm$core$String$join,
				'\n| ',
				A2($elm$core$List$map, $author$project$GenerateTypeScript$generateCustomTypeConstructor, constructors))),
		A3(
			$jorgengranseth$elm_string_format$String$Format$namedValue,
			'name',
			name,
			A2(
				$elm$core$String$join,
				'\n',
				_List_fromArray(
					['export type {{ name }}', '    = {{ constructors }}']))));
};
var $author$project$GenerateTypeScript$generateTypeAliasDeclaration = function (_v0) {
	var name = _v0.f;
	var definition = _v0.ad;
	return A3(
		$jorgengranseth$elm_string_format$String$Format$namedValue,
		'type',
		A2(
			$author$project$GenerateTypeScript$reJoinLines,
			'\n    ',
			A2($author$project$GenerateTypeScript$generateType, false, definition)),
		A3(
			$jorgengranseth$elm_string_format$String$Format$namedValue,
			'name',
			name,
			A2(
				$elm$core$String$join,
				'\n',
				_List_fromArray(
					['export type {{ name }} =', '    {{ type }}']))));
};
var $author$project$GenerateTypeScript$generateDeclaration = function (declaration) {
	if (!declaration.$) {
		var typeAliasDeclaration = declaration.a;
		return $author$project$GenerateTypeScript$generateTypeAliasDeclaration(typeAliasDeclaration);
	} else {
		var customTypeDeclaration = declaration.a;
		return $author$project$GenerateTypeScript$generateCustomTypeDeclaration(customTypeDeclaration);
	}
};
var $author$project$GenerateTypeScript$generateTypeScript = function (schema) {
	return A3(
		$jorgengranseth$elm_string_format$String$Format$namedValue,
		'declarations',
		A2(
			$elm$core$String$join,
			'\n\n',
			A2($elm$core$List$map, $author$project$GenerateTypeScript$generateDeclaration, schema.ac)),
		'/*\n * Module\n*/\n\nexport let Elm: {\n    Main: {\n        init: (flags?: any) => ElmApp\n    }\n}\n\nexport interface ElmApp extends Object {\n    ports: {\n        toElm: {\n            send: (msg: ToElmMessage) => void\n        },\n        fromElm: {\n            subscribe: (f: (msg: FromElmMessage) => void) => void\n        }\n    }\n}\n\n/*\n * Declarations\n*/\n\n{{ declarations }}\n\n/*\n * Prelude\n*/\n\nexport type Unit =\n    { variant : "()"\n    }\n\nexport type Maybe<T>\n    = { variant : "Just"\n      , _0 : T\n      }\n    | { variant : "Nothing"\n      }\n\nexport type Result<E, T>\n    = { variant : "Ok"\n      , _0 : T\n      }\n    | { variant : "Err"\n      , _0 : E\n      }\n');
};
var $elm$core$Result$map = F2(
	function (func, ra) {
		if (!ra.$) {
			var a = ra.a;
			return $elm$core$Result$Ok(
				func(a));
		} else {
			var e = ra.a;
			return $elm$core$Result$Err(e);
		}
	});
var $author$project$Main$ParseSchemaError = function (a) {
	return {$: 1, a: a};
};
var $stil4m$elm_syntax$Elm$Processing$ProcessContext = $elm$core$Basics$identity;
var $elm$core$Dict$RBEmpty_elm_builtin = {$: -2};
var $elm$core$Dict$empty = $elm$core$Dict$RBEmpty_elm_builtin;
var $stil4m$elm_syntax$Elm$Processing$init = $elm$core$Dict$empty;
var $stil4m$elm_syntax$Elm$Parser$State$State = $elm$core$Basics$identity;
var $stil4m$elm_syntax$Elm$Parser$State$emptyState = {y: _List_Nil, r: _List_Nil};
var $stil4m$elm_syntax$Elm$Syntax$File$File = F4(
	function (moduleDefinition, imports, declarations, comments) {
		return {y: comments, ac: declarations, aO: imports, C: moduleDefinition};
	});
var $stil4m$elm_syntax$Combine$Parser = $elm$core$Basics$identity;
var $elm$parser$Parser$Advanced$Bad = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $elm$parser$Parser$Advanced$Good = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var $elm$parser$Parser$Advanced$Parser = $elm$core$Basics$identity;
var $elm$parser$Parser$Advanced$andThen = F2(
	function (callback, _v0) {
		var parseA = _v0;
		return function (s0) {
			var _v1 = parseA(s0);
			if (_v1.$ === 1) {
				var p = _v1.a;
				var x = _v1.b;
				return A2($elm$parser$Parser$Advanced$Bad, p, x);
			} else {
				var p1 = _v1.a;
				var a = _v1.b;
				var s1 = _v1.c;
				var _v2 = callback(a);
				var parseB = _v2;
				var _v3 = parseB(s1);
				if (_v3.$ === 1) {
					var p2 = _v3.a;
					var x = _v3.b;
					return A2($elm$parser$Parser$Advanced$Bad, p1 || p2, x);
				} else {
					var p2 = _v3.a;
					var b = _v3.b;
					var s2 = _v3.c;
					return A3($elm$parser$Parser$Advanced$Good, p1 || p2, b, s2);
				}
			}
		};
	});
var $elm$parser$Parser$andThen = $elm$parser$Parser$Advanced$andThen;
var $elm$parser$Parser$Advanced$map = F2(
	function (func, _v0) {
		var parse = _v0;
		return function (s0) {
			var _v1 = parse(s0);
			if (!_v1.$) {
				var p = _v1.a;
				var a = _v1.b;
				var s1 = _v1.c;
				return A3(
					$elm$parser$Parser$Advanced$Good,
					p,
					func(a),
					s1);
			} else {
				var p = _v1.a;
				var x = _v1.b;
				return A2($elm$parser$Parser$Advanced$Bad, p, x);
			}
		};
	});
var $elm$parser$Parser$map = $elm$parser$Parser$Advanced$map;
var $stil4m$elm_syntax$Combine$andMap = F2(
	function (_v0, _v1) {
		var rp = _v0;
		var lp = _v1;
		return function (state) {
			return A2(
				$elm$parser$Parser$andThen,
				function (_v2) {
					var newState = _v2.a;
					var a = _v2.b;
					return A2(
						$elm$parser$Parser$map,
						$elm$core$Tuple$mapSecond(a),
						rp(newState));
				},
				lp(state));
		};
	});
var $stil4m$elm_syntax$Elm$Parser$State$getComments = function (_v0) {
	var s = _v0;
	return s.y;
};
var $elm$parser$Parser$Advanced$succeed = function (a) {
	return function (s) {
		return A3($elm$parser$Parser$Advanced$Good, false, a, s);
	};
};
var $elm$parser$Parser$succeed = $elm$parser$Parser$Advanced$succeed;
var $stil4m$elm_syntax$Combine$succeed = function (res) {
	return function (state) {
		return $elm$parser$Parser$succeed(
			_Utils_Tuple2(state, res));
	};
};
var $stil4m$elm_syntax$Combine$withState = function (f) {
	return function (state) {
		return function (_v0) {
			var p = _v0;
			return p(state);
		}(
			f(state));
	};
};
var $stil4m$elm_syntax$Elm$Parser$File$collectComments = $stil4m$elm_syntax$Combine$withState(
	A2($elm$core$Basics$composeR, $stil4m$elm_syntax$Elm$Parser$State$getComments, $stil4m$elm_syntax$Combine$succeed));
var $elm$parser$Parser$Advanced$Empty = {$: 0};
var $elm$parser$Parser$Advanced$Append = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var $elm$parser$Parser$Advanced$oneOfHelp = F3(
	function (s0, bag, parsers) {
		oneOfHelp:
		while (true) {
			if (!parsers.b) {
				return A2($elm$parser$Parser$Advanced$Bad, false, bag);
			} else {
				var parse = parsers.a;
				var remainingParsers = parsers.b;
				var _v1 = parse(s0);
				if (!_v1.$) {
					var step = _v1;
					return step;
				} else {
					var step = _v1;
					var p = step.a;
					var x = step.b;
					if (p) {
						return step;
					} else {
						var $temp$s0 = s0,
							$temp$bag = A2($elm$parser$Parser$Advanced$Append, bag, x),
							$temp$parsers = remainingParsers;
						s0 = $temp$s0;
						bag = $temp$bag;
						parsers = $temp$parsers;
						continue oneOfHelp;
					}
				}
			}
		}
	});
var $elm$parser$Parser$Advanced$oneOf = function (parsers) {
	return function (s) {
		return A3($elm$parser$Parser$Advanced$oneOfHelp, s, $elm$parser$Parser$Advanced$Empty, parsers);
	};
};
var $elm$parser$Parser$oneOf = $elm$parser$Parser$Advanced$oneOf;
var $stil4m$elm_syntax$Combine$choice = function (xs) {
	return function (state) {
		return $elm$parser$Parser$oneOf(
			A2(
				$elm$core$List$map,
				function (_v0) {
					var x = _v0;
					return x(state);
				},
				xs));
	};
};
var $stil4m$elm_syntax$Elm$Syntax$Declaration$Destructuring = F2(
	function (a, b) {
		return {$: 5, a: a, b: b};
	});
var $stil4m$elm_syntax$Elm$Syntax$Range$Range = F2(
	function (start, end) {
		return {af: end, V: start};
	});
var $elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(x);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm$core$Maybe$map2 = F3(
	function (func, ma, mb) {
		if (ma.$ === 1) {
			return $elm$core$Maybe$Nothing;
		} else {
			var a = ma.a;
			if (mb.$ === 1) {
				return $elm$core$Maybe$Nothing;
			} else {
				var b = mb.a;
				return $elm$core$Maybe$Just(
					A2(func, a, b));
			}
		}
	});
var $elm$core$Basics$compare = _Utils_compare;
var $stil4m$elm_syntax$Elm$Syntax$Range$compareLocations = F2(
	function (left, right) {
		return (_Utils_cmp(left.aA, right.aA) < 0) ? 0 : ((_Utils_cmp(right.aA, left.aA) < 0) ? 2 : A2($elm$core$Basics$compare, left.aa, right.aa));
	});
var $elm$core$List$sortWith = _List_sortWith;
var $stil4m$elm_syntax$Elm$Syntax$Range$sortLocations = $elm$core$List$sortWith($stil4m$elm_syntax$Elm$Syntax$Range$compareLocations);
var $stil4m$elm_syntax$Elm$Syntax$Range$combine = function (ranges) {
	var starts = $stil4m$elm_syntax$Elm$Syntax$Range$sortLocations(
		A2(
			$elm$core$List$map,
			function ($) {
				return $.V;
			},
			ranges));
	var ends = $elm$core$List$reverse(
		$stil4m$elm_syntax$Elm$Syntax$Range$sortLocations(
			A2(
				$elm$core$List$map,
				function ($) {
					return $.af;
				},
				ranges)));
	return A2(
		$elm$core$Maybe$withDefault,
		$stil4m$elm_syntax$Elm$Syntax$Range$emptyRange,
		A3(
			$elm$core$Maybe$map2,
			$stil4m$elm_syntax$Elm$Syntax$Range$Range,
			$elm$core$List$head(starts),
			$elm$core$List$head(ends)));
};
var $stil4m$elm_syntax$Elm$Syntax$Node$combine = F3(
	function (f, a, b) {
		var r1 = a.a;
		var r2 = b.a;
		return A2(
			$stil4m$elm_syntax$Elm$Syntax$Node$Node,
			$stil4m$elm_syntax$Elm$Syntax$Range$combine(
				_List_fromArray(
					[r1, r2])),
			A2(f, a, b));
	});
var $stil4m$elm_syntax$Elm$Syntax$Expression$CaseBlock = F2(
	function (expression, cases) {
		return {aI: cases, z: expression};
	});
var $stil4m$elm_syntax$Combine$Done = function (a) {
	return {$: 1, a: a};
};
var $stil4m$elm_syntax$Elm$Syntax$Expression$Function = F3(
	function (documentation, signature, declaration) {
		return {aK: declaration, aM: documentation, a$: signature};
	});
var $stil4m$elm_syntax$Elm$Syntax$Expression$FunctionImplementation = F3(
	function (name, _arguments, expression) {
		return {w: _arguments, z: expression, f: name};
	});
var $stil4m$elm_syntax$Elm$Syntax$Expression$IfBlock = F3(
	function (a, b, c) {
		return {$: 4, a: a, b: b, c: c};
	});
var $stil4m$elm_syntax$Elm$Syntax$Expression$Lambda = F2(
	function (args, expression) {
		return {Y: args, z: expression};
	});
var $stil4m$elm_syntax$Elm$Syntax$Expression$LetBlock = F2(
	function (declarations, expression) {
		return {ac: declarations, z: expression};
	});
var $stil4m$elm_syntax$Elm$Syntax$Expression$LetDestructuring = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $stil4m$elm_syntax$Elm$Syntax$Expression$LetExpression = function (a) {
	return {$: 15, a: a};
};
var $stil4m$elm_syntax$Elm$Syntax$Expression$LetFunction = function (a) {
	return {$: 0, a: a};
};
var $stil4m$elm_syntax$Combine$Loop = function (a) {
	return {$: 0, a: a};
};
var $stil4m$elm_syntax$Elm$Syntax$Expression$Negation = function (a) {
	return {$: 10, a: a};
};
var $stil4m$elm_syntax$Elm$Syntax$Expression$Operator = function (a) {
	return {$: 6, a: a};
};
var $stil4m$elm_syntax$Elm$Syntax$Expression$PrefixOperator = function (a) {
	return {$: 5, a: a};
};
var $stil4m$elm_syntax$Elm$Syntax$Expression$RecordUpdateExpression = F2(
	function (a, b) {
		return {$: 22, a: a, b: b};
	});
var $stil4m$elm_syntax$Elm$Syntax$Expression$UnitExpr = {$: 0};
var $elm$core$Basics$always = F2(
	function (a, _v0) {
		return a;
	});
var $stil4m$elm_syntax$Combine$andThen = F2(
	function (f, _v0) {
		var p = _v0;
		return function (state) {
			return A2(
				$elm$parser$Parser$andThen,
				function (_v1) {
					var s = _v1.a;
					var a = _v1.b;
					return function (_v2) {
						var x = _v2;
						return x(s);
					}(
						f(a));
				},
				p(state));
		};
	});
var $elm$parser$Parser$Advanced$backtrackable = function (_v0) {
	var parse = _v0;
	return function (s0) {
		var _v1 = parse(s0);
		if (_v1.$ === 1) {
			var x = _v1.b;
			return A2($elm$parser$Parser$Advanced$Bad, false, x);
		} else {
			var a = _v1.b;
			var s1 = _v1.c;
			return A3($elm$parser$Parser$Advanced$Good, false, a, s1);
		}
	};
};
var $elm$parser$Parser$backtrackable = $elm$parser$Parser$Advanced$backtrackable;
var $stil4m$elm_syntax$Combine$backtrackable = function (_v0) {
	var p = _v0;
	return function (state) {
		return $elm$parser$Parser$backtrackable(
			p(state));
	};
};
var $elm$core$String$slice = _String_slice;
var $elm$parser$Parser$Advanced$mapChompedString = F2(
	function (func, _v0) {
		var parse = _v0;
		return function (s0) {
			var _v1 = parse(s0);
			if (_v1.$ === 1) {
				var p = _v1.a;
				var x = _v1.b;
				return A2($elm$parser$Parser$Advanced$Bad, p, x);
			} else {
				var p = _v1.a;
				var a = _v1.b;
				var s1 = _v1.c;
				return A3(
					$elm$parser$Parser$Advanced$Good,
					p,
					A2(
						func,
						A3($elm$core$String$slice, s0.b, s1.b, s0.a),
						a),
					s1);
			}
		};
	});
var $elm$parser$Parser$Advanced$getChompedString = function (parser) {
	return A2($elm$parser$Parser$Advanced$mapChompedString, $elm$core$Basics$always, parser);
};
var $elm$parser$Parser$getChompedString = $elm$parser$Parser$Advanced$getChompedString;
var $elm$parser$Parser$Expecting = function (a) {
	return {$: 0, a: a};
};
var $elm$parser$Parser$Advanced$Token = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$parser$Parser$toToken = function (str) {
	return A2(
		$elm$parser$Parser$Advanced$Token,
		str,
		$elm$parser$Parser$Expecting(str));
};
var $elm$parser$Parser$Advanced$AddRight = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $elm$parser$Parser$Advanced$DeadEnd = F4(
	function (row, col, problem, contextStack) {
		return {_: col, aJ: contextStack, av: problem, aA: row};
	});
var $elm$parser$Parser$Advanced$fromState = F2(
	function (s, x) {
		return A2(
			$elm$parser$Parser$Advanced$AddRight,
			$elm$parser$Parser$Advanced$Empty,
			A4($elm$parser$Parser$Advanced$DeadEnd, s.aA, s._, x, s.c));
	});
var $elm$core$String$isEmpty = function (string) {
	return string === '';
};
var $elm$parser$Parser$Advanced$isSubString = _Parser_isSubString;
var $elm$core$Basics$not = _Basics_not;
var $elm$parser$Parser$Advanced$token = function (_v0) {
	var str = _v0.a;
	var expecting = _v0.b;
	var progress = !$elm$core$String$isEmpty(str);
	return function (s) {
		var _v1 = A5($elm$parser$Parser$Advanced$isSubString, str, s.b, s.aA, s._, s.a);
		var newOffset = _v1.a;
		var newRow = _v1.b;
		var newCol = _v1.c;
		return _Utils_eq(newOffset, -1) ? A2(
			$elm$parser$Parser$Advanced$Bad,
			false,
			A2($elm$parser$Parser$Advanced$fromState, s, expecting)) : A3(
			$elm$parser$Parser$Advanced$Good,
			progress,
			0,
			{_: newCol, c: s.c, d: s.d, b: newOffset, aA: newRow, a: s.a});
	};
};
var $elm$parser$Parser$token = function (str) {
	return $elm$parser$Parser$Advanced$token(
		$elm$parser$Parser$toToken(str));
};
var $stil4m$elm_syntax$Combine$string = function (s) {
	return function (state) {
		return A2(
			$elm$parser$Parser$map,
			function (x) {
				return _Utils_Tuple2(state, x);
			},
			$elm$parser$Parser$getChompedString(
				$elm$parser$Parser$token(s)));
	};
};
var $stil4m$elm_syntax$Elm$Parser$Tokens$caseToken = $stil4m$elm_syntax$Combine$string('case');
var $stil4m$elm_syntax$Elm$Syntax$Expression$CharLiteral = function (a) {
	return {$: 12, a: a};
};
var $elm$parser$Parser$Problem = function (a) {
	return {$: 12, a: a};
};
var $elm$parser$Parser$Advanced$problem = function (x) {
	return function (s) {
		return A2(
			$elm$parser$Parser$Advanced$Bad,
			false,
			A2($elm$parser$Parser$Advanced$fromState, s, x));
	};
};
var $elm$parser$Parser$problem = function (msg) {
	return $elm$parser$Parser$Advanced$problem(
		$elm$parser$Parser$Problem(msg));
};
var $stil4m$elm_syntax$Combine$fail = function (m) {
	return function (state) {
		return A2(
			$elm$parser$Parser$map,
			function (x) {
				return _Utils_Tuple2(state, x);
			},
			$elm$parser$Parser$problem(m));
	};
};
var $elm$parser$Parser$UnexpectedChar = {$: 11};
var $elm$parser$Parser$Advanced$isSubChar = _Parser_isSubChar;
var $elm$parser$Parser$Advanced$chompIf = F2(
	function (isGood, expecting) {
		return function (s) {
			var newOffset = A3($elm$parser$Parser$Advanced$isSubChar, isGood, s.b, s.a);
			return _Utils_eq(newOffset, -1) ? A2(
				$elm$parser$Parser$Advanced$Bad,
				false,
				A2($elm$parser$Parser$Advanced$fromState, s, expecting)) : (_Utils_eq(newOffset, -2) ? A3(
				$elm$parser$Parser$Advanced$Good,
				true,
				0,
				{_: 1, c: s.c, d: s.d, b: s.b + 1, aA: s.aA + 1, a: s.a}) : A3(
				$elm$parser$Parser$Advanced$Good,
				true,
				0,
				{_: s._ + 1, c: s.c, d: s.d, b: newOffset, aA: s.aA, a: s.a}));
		};
	});
var $elm$parser$Parser$chompIf = function (isGood) {
	return A2($elm$parser$Parser$Advanced$chompIf, isGood, $elm$parser$Parser$UnexpectedChar);
};
var $elm$parser$Parser$Advanced$map2 = F3(
	function (func, _v0, _v1) {
		var parseA = _v0;
		var parseB = _v1;
		return function (s0) {
			var _v2 = parseA(s0);
			if (_v2.$ === 1) {
				var p = _v2.a;
				var x = _v2.b;
				return A2($elm$parser$Parser$Advanced$Bad, p, x);
			} else {
				var p1 = _v2.a;
				var a = _v2.b;
				var s1 = _v2.c;
				var _v3 = parseB(s1);
				if (_v3.$ === 1) {
					var p2 = _v3.a;
					var x = _v3.b;
					return A2($elm$parser$Parser$Advanced$Bad, p1 || p2, x);
				} else {
					var p2 = _v3.a;
					var b = _v3.b;
					var s2 = _v3.c;
					return A3(
						$elm$parser$Parser$Advanced$Good,
						p1 || p2,
						A2(func, a, b),
						s2);
				}
			}
		};
	});
var $elm$parser$Parser$Advanced$keeper = F2(
	function (parseFunc, parseArg) {
		return A3($elm$parser$Parser$Advanced$map2, $elm$core$Basics$apL, parseFunc, parseArg);
	});
var $elm$parser$Parser$keeper = $elm$parser$Parser$Advanced$keeper;
var $stil4m$elm_syntax$Combine$fromCore = function (p) {
	return function (state) {
		return A2(
			$elm$parser$Parser$keeper,
			$elm$parser$Parser$succeed(
				function (v) {
					return _Utils_Tuple2(state, v);
				}),
			p);
	};
};
var $elm$core$String$foldr = _String_foldr;
var $elm$core$String$toList = function (string) {
	return A3($elm$core$String$foldr, $elm$core$List$cons, _List_Nil, string);
};
var $stil4m$elm_syntax$Combine$Char$satisfy = function (pred) {
	return $stil4m$elm_syntax$Combine$fromCore(
		A2(
			$elm$parser$Parser$andThen,
			function (s) {
				var _v0 = $elm$core$String$toList(s);
				if (!_v0.b) {
					return $elm$parser$Parser$succeed($elm$core$Maybe$Nothing);
				} else {
					var c = _v0.a;
					return $elm$parser$Parser$succeed(
						$elm$core$Maybe$Just(c));
				}
			},
			$elm$parser$Parser$getChompedString(
				$elm$parser$Parser$chompIf(pred))));
};
var $stil4m$elm_syntax$Combine$Char$anyChar = A2(
	$stil4m$elm_syntax$Combine$andThen,
	A2(
		$elm$core$Basics$composeR,
		$elm$core$Maybe$map($stil4m$elm_syntax$Combine$succeed),
		$elm$core$Maybe$withDefault(
			$stil4m$elm_syntax$Combine$fail('expected any character'))),
	$stil4m$elm_syntax$Combine$Char$satisfy(
		$elm$core$Basics$always(true)));
var $stil4m$elm_syntax$Combine$Char$char = function (c) {
	return A2(
		$stil4m$elm_syntax$Combine$andThen,
		A2(
			$elm$core$Basics$composeR,
			$elm$core$Maybe$map($stil4m$elm_syntax$Combine$succeed),
			$elm$core$Maybe$withDefault(
				$stil4m$elm_syntax$Combine$fail(
					'expected \'' + ($elm$core$String$fromList(
						_List_fromArray(
							[c])) + '\'')))),
		$stil4m$elm_syntax$Combine$Char$satisfy(
			$elm$core$Basics$eq(c)));
};
var $stil4m$elm_syntax$Combine$map = F2(
	function (f, _v0) {
		var p = _v0;
		return function (state) {
			return A2(
				$elm$parser$Parser$map,
				function (_v1) {
					var s = _v1.a;
					var a = _v1.b;
					return _Utils_Tuple2(
						s,
						f(a));
				},
				p(state));
		};
	});
var $stil4m$elm_syntax$Combine$continueWith = F2(
	function (target, dropped) {
		return A2(
			$stil4m$elm_syntax$Combine$andMap,
			target,
			A2(
				$stil4m$elm_syntax$Combine$map,
				F2(
					function (b, a) {
						return A2($elm$core$Basics$always, a, b);
					}),
				dropped));
	});
var $stil4m$elm_syntax$Combine$ignore = F2(
	function (dropped, target) {
		return A2(
			$stil4m$elm_syntax$Combine$andMap,
			dropped,
			A2($stil4m$elm_syntax$Combine$map, $elm$core$Basics$always, target));
	});
var $stil4m$elm_syntax$Combine$or = F2(
	function (_v0, _v1) {
		var lp = _v0;
		var rp = _v1;
		return function (state) {
			return $elm$parser$Parser$oneOf(
				_List_fromArray(
					[
						lp(state),
						rp(state)
					]));
		};
	});
var $elm$core$String$any = _String_any;
var $elm$parser$Parser$Advanced$chompWhileHelp = F5(
	function (isGood, offset, row, col, s0) {
		chompWhileHelp:
		while (true) {
			var newOffset = A3($elm$parser$Parser$Advanced$isSubChar, isGood, offset, s0.a);
			if (_Utils_eq(newOffset, -1)) {
				return A3(
					$elm$parser$Parser$Advanced$Good,
					_Utils_cmp(s0.b, offset) < 0,
					0,
					{_: col, c: s0.c, d: s0.d, b: offset, aA: row, a: s0.a});
			} else {
				if (_Utils_eq(newOffset, -2)) {
					var $temp$isGood = isGood,
						$temp$offset = offset + 1,
						$temp$row = row + 1,
						$temp$col = 1,
						$temp$s0 = s0;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					s0 = $temp$s0;
					continue chompWhileHelp;
				} else {
					var $temp$isGood = isGood,
						$temp$offset = newOffset,
						$temp$row = row,
						$temp$col = col + 1,
						$temp$s0 = s0;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					s0 = $temp$s0;
					continue chompWhileHelp;
				}
			}
		}
	});
var $elm$parser$Parser$Advanced$chompWhile = function (isGood) {
	return function (s) {
		return A5($elm$parser$Parser$Advanced$chompWhileHelp, isGood, s.b, s.aA, s._, s);
	};
};
var $elm$parser$Parser$chompWhile = $elm$parser$Parser$Advanced$chompWhile;
var $elm$core$Char$fromCode = _Char_fromCode;
var $elm$core$Basics$pow = _Basics_pow;
var $rtfeldman$elm_hex$Hex$fromStringHelp = F3(
	function (position, chars, accumulated) {
		fromStringHelp:
		while (true) {
			if (!chars.b) {
				return $elm$core$Result$Ok(accumulated);
			} else {
				var _char = chars.a;
				var rest = chars.b;
				switch (_char) {
					case '0':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated;
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '1':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + A2($elm$core$Basics$pow, 16, position);
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '2':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (2 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '3':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (3 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '4':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (4 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '5':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (5 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '6':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (6 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '7':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (7 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '8':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (8 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '9':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (9 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case 'a':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (10 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case 'b':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (11 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case 'c':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (12 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case 'd':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (13 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case 'e':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (14 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case 'f':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (15 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					default:
						var nonHex = _char;
						return $elm$core$Result$Err(
							$elm$core$String$fromChar(nonHex) + ' is not a valid hexadecimal character.');
				}
			}
		}
	});
var $elm$core$String$startsWith = _String_startsWith;
var $elm$core$List$tail = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(xs);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $rtfeldman$elm_hex$Hex$fromString = function (str) {
	if ($elm$core$String$isEmpty(str)) {
		return $elm$core$Result$Err('Empty strings are not valid hexadecimal strings.');
	} else {
		var result = function () {
			if (A2($elm$core$String$startsWith, '-', str)) {
				var list = A2(
					$elm$core$Maybe$withDefault,
					_List_Nil,
					$elm$core$List$tail(
						$elm$core$String$toList(str)));
				return A2(
					$elm$core$Result$map,
					$elm$core$Basics$negate,
					A3(
						$rtfeldman$elm_hex$Hex$fromStringHelp,
						$elm$core$List$length(list) - 1,
						list,
						0));
			} else {
				return A3(
					$rtfeldman$elm_hex$Hex$fromStringHelp,
					$elm$core$String$length(str) - 1,
					$elm$core$String$toList(str),
					0);
			}
		}();
		var formatError = function (err) {
			return A2(
				$elm$core$String$join,
				' ',
				_List_fromArray(
					['\"' + (str + '\"'), 'is not a valid hexadecimal string because', err]));
		};
		return A2($elm$core$Result$mapError, formatError, result);
	}
};
var $elm$parser$Parser$Advanced$ignorer = F2(
	function (keepParser, ignoreParser) {
		return A3($elm$parser$Parser$Advanced$map2, $elm$core$Basics$always, keepParser, ignoreParser);
	});
var $elm$parser$Parser$ignorer = $elm$parser$Parser$Advanced$ignorer;
var $elm$parser$Parser$ExpectingSymbol = function (a) {
	return {$: 8, a: a};
};
var $elm$parser$Parser$Advanced$symbol = $elm$parser$Parser$Advanced$token;
var $elm$parser$Parser$symbol = function (str) {
	return $elm$parser$Parser$Advanced$symbol(
		A2(
			$elm$parser$Parser$Advanced$Token,
			str,
			$elm$parser$Parser$ExpectingSymbol(str)));
};
var $elm$core$String$toLower = _String_toLower;
var $elm$core$Result$withDefault = F2(
	function (def, result) {
		if (!result.$) {
			var a = result.a;
			return a;
		} else {
			return def;
		}
	});
var $stil4m$elm_syntax$Elm$Parser$Tokens$escapedCharValue = $elm$parser$Parser$oneOf(
	_List_fromArray(
		[
			A2(
			$elm$parser$Parser$ignorer,
			$elm$parser$Parser$succeed('\''),
			$elm$parser$Parser$symbol('\'')),
			A2(
			$elm$parser$Parser$ignorer,
			$elm$parser$Parser$succeed('\"'),
			$elm$parser$Parser$symbol('\"')),
			A2(
			$elm$parser$Parser$ignorer,
			$elm$parser$Parser$succeed('\n'),
			$elm$parser$Parser$symbol('n')),
			A2(
			$elm$parser$Parser$ignorer,
			$elm$parser$Parser$succeed('\t'),
			$elm$parser$Parser$symbol('t')),
			A2(
			$elm$parser$Parser$ignorer,
			$elm$parser$Parser$succeed('\u000D'),
			$elm$parser$Parser$symbol('r')),
			A2(
			$elm$parser$Parser$ignorer,
			$elm$parser$Parser$succeed('\\'),
			$elm$parser$Parser$symbol('\\')),
			A2(
			$elm$parser$Parser$keeper,
			A2(
				$elm$parser$Parser$ignorer,
				A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$succeed(
						A2(
							$elm$core$Basics$composeR,
							$elm$core$String$toLower,
							A2(
								$elm$core$Basics$composeR,
								$rtfeldman$elm_hex$Hex$fromString,
								A2(
									$elm$core$Basics$composeR,
									$elm$core$Result$withDefault(0),
									$elm$core$Char$fromCode)))),
					$elm$parser$Parser$symbol('u')),
				$elm$parser$Parser$symbol('{')),
			A2(
				$elm$parser$Parser$ignorer,
				$elm$parser$Parser$getChompedString(
					$elm$parser$Parser$chompWhile(
						function (c) {
							return A2(
								$elm$core$String$any,
								$elm$core$Basics$eq(c),
								'0123456789ABCDEFabcdef');
						})),
				$elm$parser$Parser$symbol('}')))
		]));
var $elm$core$List$singleton = function (value) {
	return _List_fromArray(
		[value]);
};
var $stil4m$elm_syntax$Elm$Parser$Tokens$quotedSingleQuote = $stil4m$elm_syntax$Combine$fromCore(
	A2(
		$elm$parser$Parser$keeper,
		A2(
			$elm$parser$Parser$ignorer,
			$elm$parser$Parser$succeed(
				A2(
					$elm$core$Basics$composeR,
					$elm$core$String$toList,
					A2(
						$elm$core$Basics$composeR,
						$elm$core$List$head,
						$elm$core$Maybe$withDefault(' ')))),
			$elm$parser$Parser$symbol('\'')),
		A2(
			$elm$parser$Parser$ignorer,
			$elm$parser$Parser$oneOf(
				_List_fromArray(
					[
						A2(
						$elm$parser$Parser$keeper,
						A2(
							$elm$parser$Parser$ignorer,
							$elm$parser$Parser$succeed(
								A2($elm$core$Basics$composeR, $elm$core$List$singleton, $elm$core$String$fromList)),
							$elm$parser$Parser$symbol('\\')),
						$stil4m$elm_syntax$Elm$Parser$Tokens$escapedCharValue),
						$elm$parser$Parser$getChompedString(
						$elm$parser$Parser$chompIf(
							$elm$core$Basics$always(true)))
					])),
			$elm$parser$Parser$symbol('\''))));
var $stil4m$elm_syntax$Elm$Parser$Tokens$characterLiteral = A2(
	$stil4m$elm_syntax$Combine$or,
	$stil4m$elm_syntax$Elm$Parser$Tokens$quotedSingleQuote,
	A2(
		$stil4m$elm_syntax$Combine$ignore,
		$stil4m$elm_syntax$Combine$Char$char('\''),
		A2(
			$stil4m$elm_syntax$Combine$continueWith,
			$stil4m$elm_syntax$Combine$Char$anyChar,
			$stil4m$elm_syntax$Combine$Char$char('\''))));
var $stil4m$elm_syntax$Elm$Parser$Node$asPointerLocation = function (_v0) {
	var line = _v0.x;
	var column = _v0.aa;
	return {aa: column, aA: line};
};
var $stil4m$elm_syntax$Combine$app = function (_v0) {
	var inner = _v0;
	return inner;
};
var $elm$parser$Parser$Advanced$getPosition = function (s) {
	return A3(
		$elm$parser$Parser$Advanced$Good,
		false,
		_Utils_Tuple2(s.aA, s._),
		s);
};
var $elm$parser$Parser$getPosition = $elm$parser$Parser$Advanced$getPosition;
var $stil4m$elm_syntax$Combine$withLocation = function (f) {
	return function (state) {
		return A2(
			$elm$parser$Parser$andThen,
			function (loc) {
				return A2(
					$stil4m$elm_syntax$Combine$app,
					f(loc),
					state);
			},
			A2(
				$elm$parser$Parser$map,
				function (_v0) {
					var row = _v0.a;
					var col = _v0.b;
					return {aa: col, x: row};
				},
				$elm$parser$Parser$getPosition));
	};
};
var $stil4m$elm_syntax$Elm$Parser$Node$parser = function (p) {
	return $stil4m$elm_syntax$Combine$withLocation(
		function (start) {
			return A2(
				$stil4m$elm_syntax$Combine$andMap,
				$stil4m$elm_syntax$Combine$withLocation(
					function (end) {
						return $stil4m$elm_syntax$Combine$succeed(
							{
								af: $stil4m$elm_syntax$Elm$Parser$Node$asPointerLocation(end),
								V: $stil4m$elm_syntax$Elm$Parser$Node$asPointerLocation(start)
							});
					}),
				A2(
					$stil4m$elm_syntax$Combine$andMap,
					p,
					$stil4m$elm_syntax$Combine$succeed(
						F2(
							function (v, r) {
								return A2($stil4m$elm_syntax$Elm$Syntax$Node$Node, r, v);
							}))));
		});
};
var $stil4m$elm_syntax$Elm$Parser$Declarations$charLiteralExpression = $stil4m$elm_syntax$Elm$Parser$Node$parser(
	A2($stil4m$elm_syntax$Combine$map, $stil4m$elm_syntax$Elm$Syntax$Expression$CharLiteral, $stil4m$elm_syntax$Elm$Parser$Tokens$characterLiteral));
var $stil4m$elm_syntax$Elm$Parser$Tokens$elseToken = $stil4m$elm_syntax$Combine$string('else');
var $stil4m$elm_syntax$Elm$Parser$State$currentIndent = function (_v0) {
	var indents = _v0.r;
	return A2(
		$elm$core$Maybe$withDefault,
		0,
		$elm$core$List$head(indents));
};
var $stil4m$elm_syntax$Elm$Parser$State$expectedColumn = A2(
	$elm$core$Basics$composeR,
	$stil4m$elm_syntax$Elm$Parser$State$currentIndent,
	$elm$core$Basics$add(1));
var $stil4m$elm_syntax$Elm$Syntax$Pattern$AllPattern = {$: 0};
var $stil4m$elm_syntax$Elm$Syntax$Pattern$AsPattern = F2(
	function (a, b) {
		return {$: 13, a: a, b: b};
	});
var $stil4m$elm_syntax$Elm$Syntax$Pattern$CharPattern = function (a) {
	return {$: 2, a: a};
};
var $stil4m$elm_syntax$Elm$Syntax$Pattern$ListPattern = function (a) {
	return {$: 10, a: a};
};
var $stil4m$elm_syntax$Elm$Syntax$Pattern$QualifiedNameRef = F2(
	function (moduleName, name) {
		return {m: moduleName, f: name};
	});
var $stil4m$elm_syntax$Elm$Syntax$Pattern$StringPattern = function (a) {
	return {$: 3, a: a};
};
var $stil4m$elm_syntax$Elm$Syntax$Pattern$TuplePattern = function (a) {
	return {$: 7, a: a};
};
var $stil4m$elm_syntax$Elm$Syntax$Pattern$UnConsPattern = F2(
	function (a, b) {
		return {$: 9, a: a, b: b};
	});
var $stil4m$elm_syntax$Combine$between = F3(
	function (lp, rp, p) {
		return A2(
			$stil4m$elm_syntax$Combine$ignore,
			rp,
			A2($stil4m$elm_syntax$Combine$continueWith, p, lp));
	});
var $elm$core$Set$Set_elm_builtin = $elm$core$Basics$identity;
var $elm$core$Set$empty = $elm$core$Dict$empty;
var $elm$core$Dict$Black = 1;
var $elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: -1, a: a, b: b, c: c, d: d, e: e};
	});
var $elm$core$Dict$Red = 0;
var $elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === -1) && (!right.a)) {
			var _v1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === -1) && (!left.a)) {
				var _v3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					0,
					key,
					value,
					A5($elm$core$Dict$RBNode_elm_builtin, 1, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 1, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === -1) && (!left.a)) && (left.d.$ === -1)) && (!left.d.a)) {
				var _v5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _v6 = left.d;
				var _v7 = _v6.a;
				var llK = _v6.b;
				var llV = _v6.c;
				var llLeft = _v6.d;
				var llRight = _v6.e;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					0,
					lK,
					lV,
					A5($elm$core$Dict$RBNode_elm_builtin, 1, llK, llV, llLeft, llRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 1, key, value, lRight, right));
			} else {
				return A5($elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var $elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === -2) {
			return A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _v1 = A2($elm$core$Basics$compare, key, nKey);
			switch (_v1) {
				case 0:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3($elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 1:
					return A5($elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3($elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var $elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _v0 = A3($elm$core$Dict$insertHelp, key, value, dict);
		if ((_v0.$ === -1) && (!_v0.a)) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, 1, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Set$insert = F2(
	function (key, _v0) {
		var dict = _v0;
		return A3($elm$core$Dict$insert, key, 0, dict);
	});
var $elm$core$Set$fromList = function (list) {
	return A3($elm$core$List$foldl, $elm$core$Set$insert, $elm$core$Set$empty, list);
};
var $stil4m$elm_syntax$Elm$Parser$Tokens$reservedList = _List_fromArray(
	['module', 'exposing', 'import', 'as', 'if', 'then', 'else', 'let', 'in', 'case', 'of', 'port', 'infixr', 'infixl', 'type', 'where']);
var $elm$parser$Parser$ExpectingVariable = {$: 7};
var $elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === -2) {
				return $elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _v1 = A2($elm$core$Basics$compare, targetKey, key);
				switch (_v1) {
					case 0:
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 1:
						return $elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var $elm$core$Dict$member = F2(
	function (key, dict) {
		var _v0 = A2($elm$core$Dict$get, key, dict);
		if (!_v0.$) {
			return true;
		} else {
			return false;
		}
	});
var $elm$core$Set$member = F2(
	function (key, _v0) {
		var dict = _v0;
		return A2($elm$core$Dict$member, key, dict);
	});
var $elm$parser$Parser$Advanced$varHelp = F7(
	function (isGood, offset, row, col, src, indent, context) {
		varHelp:
		while (true) {
			var newOffset = A3($elm$parser$Parser$Advanced$isSubChar, isGood, offset, src);
			if (_Utils_eq(newOffset, -1)) {
				return {_: col, c: context, d: indent, b: offset, aA: row, a: src};
			} else {
				if (_Utils_eq(newOffset, -2)) {
					var $temp$isGood = isGood,
						$temp$offset = offset + 1,
						$temp$row = row + 1,
						$temp$col = 1,
						$temp$src = src,
						$temp$indent = indent,
						$temp$context = context;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					src = $temp$src;
					indent = $temp$indent;
					context = $temp$context;
					continue varHelp;
				} else {
					var $temp$isGood = isGood,
						$temp$offset = newOffset,
						$temp$row = row,
						$temp$col = col + 1,
						$temp$src = src,
						$temp$indent = indent,
						$temp$context = context;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					src = $temp$src;
					indent = $temp$indent;
					context = $temp$context;
					continue varHelp;
				}
			}
		}
	});
var $elm$parser$Parser$Advanced$variable = function (i) {
	return function (s) {
		var firstOffset = A3($elm$parser$Parser$Advanced$isSubChar, i.V, s.b, s.a);
		if (_Utils_eq(firstOffset, -1)) {
			return A2(
				$elm$parser$Parser$Advanced$Bad,
				false,
				A2($elm$parser$Parser$Advanced$fromState, s, i.ag));
		} else {
			var s1 = _Utils_eq(firstOffset, -2) ? A7($elm$parser$Parser$Advanced$varHelp, i.ao, s.b + 1, s.aA + 1, 1, s.a, s.d, s.c) : A7($elm$parser$Parser$Advanced$varHelp, i.ao, firstOffset, s.aA, s._ + 1, s.a, s.d, s.c);
			var name = A3($elm$core$String$slice, s.b, s1.b, s.a);
			return A2($elm$core$Set$member, name, i.az) ? A2(
				$elm$parser$Parser$Advanced$Bad,
				false,
				A2($elm$parser$Parser$Advanced$fromState, s, i.ag)) : A3($elm$parser$Parser$Advanced$Good, true, name, s1);
		}
	};
};
var $elm$parser$Parser$variable = function (i) {
	return $elm$parser$Parser$Advanced$variable(
		{ag: $elm$parser$Parser$ExpectingVariable, ao: i.ao, az: i.az, V: i.V});
};
var $stil4m$elm_syntax$Elm$Parser$Tokens$functionName = $stil4m$elm_syntax$Combine$fromCore(
	$elm$parser$Parser$variable(
		{
			ao: function (c) {
				return $elm$core$Char$isAlphaNum(c) || (c === '_');
			},
			az: $elm$core$Set$fromList($stil4m$elm_syntax$Elm$Parser$Tokens$reservedList),
			V: $elm$core$Char$isLower
		}));
var $elm$parser$Parser$ExpectingKeyword = function (a) {
	return {$: 9, a: a};
};
var $elm$parser$Parser$Advanced$keyword = function (_v0) {
	var kwd = _v0.a;
	var expecting = _v0.b;
	var progress = !$elm$core$String$isEmpty(kwd);
	return function (s) {
		var _v1 = A5($elm$parser$Parser$Advanced$isSubString, kwd, s.b, s.aA, s._, s.a);
		var newOffset = _v1.a;
		var newRow = _v1.b;
		var newCol = _v1.c;
		return (_Utils_eq(newOffset, -1) || (0 <= A3(
			$elm$parser$Parser$Advanced$isSubChar,
			function (c) {
				return $elm$core$Char$isAlphaNum(c) || (c === '_');
			},
			newOffset,
			s.a))) ? A2(
			$elm$parser$Parser$Advanced$Bad,
			false,
			A2($elm$parser$Parser$Advanced$fromState, s, expecting)) : A3(
			$elm$parser$Parser$Advanced$Good,
			progress,
			0,
			{_: newCol, c: s.c, d: s.d, b: newOffset, aA: newRow, a: s.a});
	};
};
var $elm$parser$Parser$keyword = function (kwd) {
	return $elm$parser$Parser$Advanced$keyword(
		A2(
			$elm$parser$Parser$Advanced$Token,
			kwd,
			$elm$parser$Parser$ExpectingKeyword(kwd)));
};
var $elm$parser$Parser$Advanced$lazy = function (thunk) {
	return function (s) {
		var _v0 = thunk(0);
		var parse = _v0;
		return parse(s);
	};
};
var $elm$parser$Parser$lazy = $elm$parser$Parser$Advanced$lazy;
var $stil4m$elm_syntax$Combine$lazy = function (t) {
	return function (state) {
		return $elm$parser$Parser$lazy(
			function (_v0) {
				return function (_v1) {
					var t_ = _v1;
					return t_(state);
				}(
					t(0));
			});
	};
};
var $elm$parser$Parser$Nestable = 1;
var $elm$parser$Parser$Advanced$findSubString = _Parser_findSubString;
var $elm$parser$Parser$Advanced$fromInfo = F4(
	function (row, col, x, context) {
		return A2(
			$elm$parser$Parser$Advanced$AddRight,
			$elm$parser$Parser$Advanced$Empty,
			A4($elm$parser$Parser$Advanced$DeadEnd, row, col, x, context));
	});
var $elm$parser$Parser$Advanced$chompUntil = function (_v0) {
	var str = _v0.a;
	var expecting = _v0.b;
	return function (s) {
		var _v1 = A5($elm$parser$Parser$Advanced$findSubString, str, s.b, s.aA, s._, s.a);
		var newOffset = _v1.a;
		var newRow = _v1.b;
		var newCol = _v1.c;
		return _Utils_eq(newOffset, -1) ? A2(
			$elm$parser$Parser$Advanced$Bad,
			false,
			A4($elm$parser$Parser$Advanced$fromInfo, newRow, newCol, expecting, s.c)) : A3(
			$elm$parser$Parser$Advanced$Good,
			_Utils_cmp(s.b, newOffset) < 0,
			0,
			{_: newCol, c: s.c, d: s.d, b: newOffset, aA: newRow, a: s.a});
	};
};
var $elm$core$Basics$neq = _Utils_notEqual;
var $elm$parser$Parser$Advanced$isChar = function (_char) {
	return true;
};
var $elm$parser$Parser$Advanced$revAlways = F2(
	function (_v0, b) {
		return b;
	});
var $elm$parser$Parser$Advanced$skip = F2(
	function (iParser, kParser) {
		return A3($elm$parser$Parser$Advanced$map2, $elm$parser$Parser$Advanced$revAlways, iParser, kParser);
	});
var $elm$parser$Parser$Advanced$nestableHelp = F5(
	function (isNotRelevant, open, close, expectingClose, nestLevel) {
		return A2(
			$elm$parser$Parser$Advanced$skip,
			$elm$parser$Parser$Advanced$chompWhile(isNotRelevant),
			$elm$parser$Parser$Advanced$oneOf(
				_List_fromArray(
					[
						(nestLevel === 1) ? close : A2(
						$elm$parser$Parser$Advanced$andThen,
						function (_v0) {
							return A5($elm$parser$Parser$Advanced$nestableHelp, isNotRelevant, open, close, expectingClose, nestLevel - 1);
						},
						close),
						A2(
						$elm$parser$Parser$Advanced$andThen,
						function (_v1) {
							return A5($elm$parser$Parser$Advanced$nestableHelp, isNotRelevant, open, close, expectingClose, nestLevel + 1);
						},
						open),
						A2(
						$elm$parser$Parser$Advanced$andThen,
						function (_v2) {
							return A5($elm$parser$Parser$Advanced$nestableHelp, isNotRelevant, open, close, expectingClose, nestLevel);
						},
						A2($elm$parser$Parser$Advanced$chompIf, $elm$parser$Parser$Advanced$isChar, expectingClose))
					])));
	});
var $elm$parser$Parser$Advanced$nestableComment = F2(
	function (open, close) {
		var oStr = open.a;
		var oX = open.b;
		var cStr = close.a;
		var cX = close.b;
		var _v0 = $elm$core$String$uncons(oStr);
		if (_v0.$ === 1) {
			return $elm$parser$Parser$Advanced$problem(oX);
		} else {
			var _v1 = _v0.a;
			var openChar = _v1.a;
			var _v2 = $elm$core$String$uncons(cStr);
			if (_v2.$ === 1) {
				return $elm$parser$Parser$Advanced$problem(cX);
			} else {
				var _v3 = _v2.a;
				var closeChar = _v3.a;
				var isNotRelevant = function (_char) {
					return (!_Utils_eq(_char, openChar)) && (!_Utils_eq(_char, closeChar));
				};
				var chompOpen = $elm$parser$Parser$Advanced$token(open);
				return A2(
					$elm$parser$Parser$Advanced$ignorer,
					chompOpen,
					A5(
						$elm$parser$Parser$Advanced$nestableHelp,
						isNotRelevant,
						chompOpen,
						$elm$parser$Parser$Advanced$token(close),
						cX,
						1));
			}
		}
	});
var $elm$parser$Parser$Advanced$multiComment = F3(
	function (open, close, nestable) {
		if (!nestable) {
			return A2(
				$elm$parser$Parser$Advanced$ignorer,
				$elm$parser$Parser$Advanced$token(open),
				$elm$parser$Parser$Advanced$chompUntil(close));
		} else {
			return A2($elm$parser$Parser$Advanced$nestableComment, open, close);
		}
	});
var $elm$parser$Parser$Advanced$Nestable = 1;
var $elm$parser$Parser$Advanced$NotNestable = 0;
var $elm$parser$Parser$toAdvancedNestable = function (nestable) {
	if (!nestable) {
		return 0;
	} else {
		return 1;
	}
};
var $elm$parser$Parser$multiComment = F3(
	function (open, close, nestable) {
		return A3(
			$elm$parser$Parser$Advanced$multiComment,
			$elm$parser$Parser$toToken(open),
			$elm$parser$Parser$toToken(close),
			$elm$parser$Parser$toAdvancedNestable(nestable));
	});
var $stil4m$elm_syntax$Elm$Parser$Comments$multilineCommentInner = $stil4m$elm_syntax$Combine$fromCore(
	$elm$parser$Parser$getChompedString(
		A3($elm$parser$Parser$multiComment, '{-', '-}', 1)));
var $stil4m$elm_syntax$Elm$Parser$State$addComment = F2(
	function (pair, _v0) {
		var s = _v0;
		return _Utils_update(
			s,
			{
				y: A2($elm$core$List$cons, pair, s.y)
			});
	});
var $stil4m$elm_syntax$Combine$modifyState = function (f) {
	return function (state) {
		return $elm$parser$Parser$succeed(
			_Utils_Tuple2(
				f(state),
				0));
	};
};
var $stil4m$elm_syntax$Elm$Parser$Comments$addCommentToState = function (p) {
	return A2(
		$stil4m$elm_syntax$Combine$andThen,
		function (pair) {
			return A2(
				$stil4m$elm_syntax$Combine$continueWith,
				$stil4m$elm_syntax$Combine$succeed(0),
				$stil4m$elm_syntax$Combine$modifyState(
					$stil4m$elm_syntax$Elm$Parser$State$addComment(pair)));
		},
		p);
};
var $stil4m$elm_syntax$Elm$Parser$Comments$parseComment = function (commentParser) {
	return $stil4m$elm_syntax$Elm$Parser$Comments$addCommentToState(
		$stil4m$elm_syntax$Elm$Parser$Node$parser(commentParser));
};
var $stil4m$elm_syntax$Elm$Parser$Comments$multilineComment = $stil4m$elm_syntax$Combine$lazy(
	function (_v0) {
		return $stil4m$elm_syntax$Elm$Parser$Comments$parseComment($stil4m$elm_syntax$Elm$Parser$Comments$multilineCommentInner);
	});
var $stil4m$elm_syntax$Elm$Parser$Whitespace$untilNewlineToken = $stil4m$elm_syntax$Combine$fromCore(
	$elm$parser$Parser$getChompedString(
		$elm$parser$Parser$chompWhile(
			function (c) {
				return (c !== '\u000D') && (c !== '\n');
			})));
var $stil4m$elm_syntax$Elm$Parser$Comments$singleLineComment = $stil4m$elm_syntax$Elm$Parser$Comments$parseComment(
	A2(
		$stil4m$elm_syntax$Combine$andMap,
		$stil4m$elm_syntax$Elm$Parser$Whitespace$untilNewlineToken,
		A2(
			$stil4m$elm_syntax$Combine$andMap,
			$stil4m$elm_syntax$Combine$string('--'),
			$stil4m$elm_syntax$Combine$succeed($elm$core$Basics$append))));
var $stil4m$elm_syntax$Elm$Parser$Layout$anyComment = A2($stil4m$elm_syntax$Combine$or, $stil4m$elm_syntax$Elm$Parser$Comments$singleLineComment, $stil4m$elm_syntax$Elm$Parser$Comments$multilineComment);
var $elm$parser$Parser$Done = function (a) {
	return {$: 1, a: a};
};
var $elm$parser$Parser$Loop = function (a) {
	return {$: 0, a: a};
};
var $elm$parser$Parser$Advanced$loopHelp = F4(
	function (p, state, callback, s0) {
		loopHelp:
		while (true) {
			var _v0 = callback(state);
			var parse = _v0;
			var _v1 = parse(s0);
			if (!_v1.$) {
				var p1 = _v1.a;
				var step = _v1.b;
				var s1 = _v1.c;
				if (!step.$) {
					var newState = step.a;
					var $temp$p = p || p1,
						$temp$state = newState,
						$temp$callback = callback,
						$temp$s0 = s1;
					p = $temp$p;
					state = $temp$state;
					callback = $temp$callback;
					s0 = $temp$s0;
					continue loopHelp;
				} else {
					var result = step.a;
					return A3($elm$parser$Parser$Advanced$Good, p || p1, result, s1);
				}
			} else {
				var p1 = _v1.a;
				var x = _v1.b;
				return A2($elm$parser$Parser$Advanced$Bad, p || p1, x);
			}
		}
	});
var $elm$parser$Parser$Advanced$loop = F2(
	function (state, callback) {
		return function (s) {
			return A4($elm$parser$Parser$Advanced$loopHelp, false, state, callback, s);
		};
	});
var $elm$parser$Parser$Advanced$Done = function (a) {
	return {$: 1, a: a};
};
var $elm$parser$Parser$Advanced$Loop = function (a) {
	return {$: 0, a: a};
};
var $elm$parser$Parser$toAdvancedStep = function (step) {
	if (!step.$) {
		var s = step.a;
		return $elm$parser$Parser$Advanced$Loop(s);
	} else {
		var a = step.a;
		return $elm$parser$Parser$Advanced$Done(a);
	}
};
var $elm$parser$Parser$loop = F2(
	function (state, callback) {
		return A2(
			$elm$parser$Parser$Advanced$loop,
			state,
			function (s) {
				return A2(
					$elm$parser$Parser$map,
					$elm$parser$Parser$toAdvancedStep,
					callback(s));
			});
	});
var $stil4m$elm_syntax$Combine$many = function (p) {
	var helper = function (_v2) {
		var oldState = _v2.a;
		var items = _v2.b;
		return $elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					A2(
					$elm$parser$Parser$keeper,
					$elm$parser$Parser$succeed(
						function (_v0) {
							var newState = _v0.a;
							var item = _v0.b;
							return $elm$parser$Parser$Loop(
								_Utils_Tuple2(
									newState,
									A2($elm$core$List$cons, item, items)));
						}),
					A2($stil4m$elm_syntax$Combine$app, p, oldState)),
					A2(
					$elm$parser$Parser$map,
					function (_v1) {
						return $elm$parser$Parser$Done(
							_Utils_Tuple2(
								oldState,
								$elm$core$List$reverse(items)));
					},
					$elm$parser$Parser$succeed(0))
				]));
	};
	return function (state) {
		return A2(
			$elm$parser$Parser$loop,
			_Utils_Tuple2(state, _List_Nil),
			helper);
	};
};
var $stil4m$elm_syntax$Combine$many1 = function (p) {
	return A2(
		$stil4m$elm_syntax$Combine$andMap,
		$stil4m$elm_syntax$Combine$many(p),
		A2(
			$stil4m$elm_syntax$Combine$andMap,
			p,
			$stil4m$elm_syntax$Combine$succeed($elm$core$List$cons)));
};
var $stil4m$elm_syntax$Elm$Parser$Whitespace$many1Spaces = $stil4m$elm_syntax$Combine$fromCore(
	A2(
		$elm$parser$Parser$ignorer,
		$elm$parser$Parser$token(' '),
		$elm$parser$Parser$chompWhile(
			function (c) {
				return c === ' ';
			})));
var $stil4m$elm_syntax$Elm$Parser$Whitespace$realNewLine = $stil4m$elm_syntax$Combine$fromCore(
	$elm$parser$Parser$getChompedString(
		A2(
			$elm$parser$Parser$ignorer,
			A2(
				$elm$parser$Parser$ignorer,
				$elm$parser$Parser$succeed(0),
				$elm$parser$Parser$oneOf(
					_List_fromArray(
						[
							$elm$parser$Parser$chompIf(
							$elm$core$Basics$eq('\u000D')),
							$elm$parser$Parser$succeed(0)
						]))),
			$elm$parser$Parser$symbol('\n'))));
var $stil4m$elm_syntax$Elm$Parser$Layout$verifyIndent = function (f) {
	return $stil4m$elm_syntax$Combine$withState(
		function (s) {
			return $stil4m$elm_syntax$Combine$withLocation(
				function (l) {
					return A2(
						f,
						$stil4m$elm_syntax$Elm$Parser$State$expectedColumn(s),
						l.aa) ? $stil4m$elm_syntax$Combine$succeed(0) : $stil4m$elm_syntax$Combine$fail(
						'Expected higher indent than ' + $elm$core$String$fromInt(l.aa));
				});
		});
};
var $stil4m$elm_syntax$Elm$Parser$Layout$layout = A2(
	$stil4m$elm_syntax$Combine$continueWith,
	$stil4m$elm_syntax$Elm$Parser$Layout$verifyIndent(
		F2(
			function (stateIndent, current) {
				return _Utils_cmp(stateIndent, current) < 0;
			})),
	$stil4m$elm_syntax$Combine$many1(
		$stil4m$elm_syntax$Combine$choice(
			_List_fromArray(
				[
					$stil4m$elm_syntax$Elm$Parser$Layout$anyComment,
					A2(
					$stil4m$elm_syntax$Combine$continueWith,
					$stil4m$elm_syntax$Combine$choice(
						_List_fromArray(
							[$stil4m$elm_syntax$Elm$Parser$Whitespace$many1Spaces, $stil4m$elm_syntax$Elm$Parser$Layout$anyComment])),
					$stil4m$elm_syntax$Combine$many1($stil4m$elm_syntax$Elm$Parser$Whitespace$realNewLine)),
					$stil4m$elm_syntax$Elm$Parser$Whitespace$many1Spaces
				]))));
var $stil4m$elm_syntax$Combine$maybe = function (_v0) {
	var p = _v0;
	return function (state) {
		return $elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					A2(
					$elm$parser$Parser$map,
					function (_v1) {
						var c = _v1.a;
						var v = _v1.b;
						return _Utils_Tuple2(
							c,
							$elm$core$Maybe$Just(v));
					},
					p(state)),
					$elm$parser$Parser$succeed(
					_Utils_Tuple2(state, $elm$core$Maybe$Nothing))
				]));
	};
};
var $stil4m$elm_syntax$Elm$Parser$Layout$maybeAroundBothSides = function (x) {
	return A2(
		$stil4m$elm_syntax$Combine$ignore,
		$stil4m$elm_syntax$Combine$maybe($stil4m$elm_syntax$Elm$Parser$Layout$layout),
		A2(
			$stil4m$elm_syntax$Combine$continueWith,
			x,
			$stil4m$elm_syntax$Combine$maybe($stil4m$elm_syntax$Elm$Parser$Layout$layout)));
};
var $stil4m$elm_syntax$Elm$Syntax$Pattern$FloatPattern = function (a) {
	return {$: 6, a: a};
};
var $stil4m$elm_syntax$Elm$Syntax$Pattern$HexPattern = function (a) {
	return {$: 5, a: a};
};
var $stil4m$elm_syntax$Elm$Syntax$Pattern$IntPattern = function (a) {
	return {$: 4, a: a};
};
var $elm$parser$Parser$ExpectingBinary = {$: 4};
var $elm$parser$Parser$ExpectingFloat = {$: 5};
var $elm$parser$Parser$ExpectingHex = {$: 2};
var $elm$parser$Parser$ExpectingInt = {$: 1};
var $elm$parser$Parser$ExpectingNumber = {$: 6};
var $elm$parser$Parser$ExpectingOctal = {$: 3};
var $elm$core$Result$fromMaybe = F2(
	function (err, maybe) {
		if (!maybe.$) {
			var v = maybe.a;
			return $elm$core$Result$Ok(v);
		} else {
			return $elm$core$Result$Err(err);
		}
	});
var $elm$parser$Parser$Advanced$consumeBase = _Parser_consumeBase;
var $elm$parser$Parser$Advanced$consumeBase16 = _Parser_consumeBase16;
var $elm$parser$Parser$Advanced$bumpOffset = F2(
	function (newOffset, s) {
		return {_: s._ + (newOffset - s.b), c: s.c, d: s.d, b: newOffset, aA: s.aA, a: s.a};
	});
var $elm$parser$Parser$Advanced$chompBase10 = _Parser_chompBase10;
var $elm$parser$Parser$Advanced$isAsciiCode = _Parser_isAsciiCode;
var $elm$parser$Parser$Advanced$consumeExp = F2(
	function (offset, src) {
		if (A3($elm$parser$Parser$Advanced$isAsciiCode, 101, offset, src) || A3($elm$parser$Parser$Advanced$isAsciiCode, 69, offset, src)) {
			var eOffset = offset + 1;
			var expOffset = (A3($elm$parser$Parser$Advanced$isAsciiCode, 43, eOffset, src) || A3($elm$parser$Parser$Advanced$isAsciiCode, 45, eOffset, src)) ? (eOffset + 1) : eOffset;
			var newOffset = A2($elm$parser$Parser$Advanced$chompBase10, expOffset, src);
			return _Utils_eq(expOffset, newOffset) ? (-newOffset) : newOffset;
		} else {
			return offset;
		}
	});
var $elm$parser$Parser$Advanced$consumeDotAndExp = F2(
	function (offset, src) {
		return A3($elm$parser$Parser$Advanced$isAsciiCode, 46, offset, src) ? A2(
			$elm$parser$Parser$Advanced$consumeExp,
			A2($elm$parser$Parser$Advanced$chompBase10, offset + 1, src),
			src) : A2($elm$parser$Parser$Advanced$consumeExp, offset, src);
	});
var $elm$parser$Parser$Advanced$finalizeInt = F5(
	function (invalid, handler, startOffset, _v0, s) {
		var endOffset = _v0.a;
		var n = _v0.b;
		if (handler.$ === 1) {
			var x = handler.a;
			return A2(
				$elm$parser$Parser$Advanced$Bad,
				true,
				A2($elm$parser$Parser$Advanced$fromState, s, x));
		} else {
			var toValue = handler.a;
			return _Utils_eq(startOffset, endOffset) ? A2(
				$elm$parser$Parser$Advanced$Bad,
				_Utils_cmp(s.b, startOffset) < 0,
				A2($elm$parser$Parser$Advanced$fromState, s, invalid)) : A3(
				$elm$parser$Parser$Advanced$Good,
				true,
				toValue(n),
				A2($elm$parser$Parser$Advanced$bumpOffset, endOffset, s));
		}
	});
var $elm$core$String$toFloat = _String_toFloat;
var $elm$parser$Parser$Advanced$finalizeFloat = F6(
	function (invalid, expecting, intSettings, floatSettings, intPair, s) {
		var intOffset = intPair.a;
		var floatOffset = A2($elm$parser$Parser$Advanced$consumeDotAndExp, intOffset, s.a);
		if (floatOffset < 0) {
			return A2(
				$elm$parser$Parser$Advanced$Bad,
				true,
				A4($elm$parser$Parser$Advanced$fromInfo, s.aA, s._ - (floatOffset + s.b), invalid, s.c));
		} else {
			if (_Utils_eq(s.b, floatOffset)) {
				return A2(
					$elm$parser$Parser$Advanced$Bad,
					false,
					A2($elm$parser$Parser$Advanced$fromState, s, expecting));
			} else {
				if (_Utils_eq(intOffset, floatOffset)) {
					return A5($elm$parser$Parser$Advanced$finalizeInt, invalid, intSettings, s.b, intPair, s);
				} else {
					if (floatSettings.$ === 1) {
						var x = floatSettings.a;
						return A2(
							$elm$parser$Parser$Advanced$Bad,
							true,
							A2($elm$parser$Parser$Advanced$fromState, s, invalid));
					} else {
						var toValue = floatSettings.a;
						var _v1 = $elm$core$String$toFloat(
							A3($elm$core$String$slice, s.b, floatOffset, s.a));
						if (_v1.$ === 1) {
							return A2(
								$elm$parser$Parser$Advanced$Bad,
								true,
								A2($elm$parser$Parser$Advanced$fromState, s, invalid));
						} else {
							var n = _v1.a;
							return A3(
								$elm$parser$Parser$Advanced$Good,
								true,
								toValue(n),
								A2($elm$parser$Parser$Advanced$bumpOffset, floatOffset, s));
						}
					}
				}
			}
		}
	});
var $elm$parser$Parser$Advanced$number = function (c) {
	return function (s) {
		if (A3($elm$parser$Parser$Advanced$isAsciiCode, 48, s.b, s.a)) {
			var zeroOffset = s.b + 1;
			var baseOffset = zeroOffset + 1;
			return A3($elm$parser$Parser$Advanced$isAsciiCode, 120, zeroOffset, s.a) ? A5(
				$elm$parser$Parser$Advanced$finalizeInt,
				c.aS,
				c.am,
				baseOffset,
				A2($elm$parser$Parser$Advanced$consumeBase16, baseOffset, s.a),
				s) : (A3($elm$parser$Parser$Advanced$isAsciiCode, 111, zeroOffset, s.a) ? A5(
				$elm$parser$Parser$Advanced$finalizeInt,
				c.aS,
				c.as,
				baseOffset,
				A3($elm$parser$Parser$Advanced$consumeBase, 8, baseOffset, s.a),
				s) : (A3($elm$parser$Parser$Advanced$isAsciiCode, 98, zeroOffset, s.a) ? A5(
				$elm$parser$Parser$Advanced$finalizeInt,
				c.aS,
				c.Z,
				baseOffset,
				A3($elm$parser$Parser$Advanced$consumeBase, 2, baseOffset, s.a),
				s) : A6(
				$elm$parser$Parser$Advanced$finalizeFloat,
				c.aS,
				c.ag,
				c.ap,
				c.ah,
				_Utils_Tuple2(zeroOffset, 0),
				s)));
		} else {
			return A6(
				$elm$parser$Parser$Advanced$finalizeFloat,
				c.aS,
				c.ag,
				c.ap,
				c.ah,
				A3($elm$parser$Parser$Advanced$consumeBase, 10, s.b, s.a),
				s);
		}
	};
};
var $elm$parser$Parser$number = function (i) {
	return $elm$parser$Parser$Advanced$number(
		{
			Z: A2($elm$core$Result$fromMaybe, $elm$parser$Parser$ExpectingBinary, i.Z),
			ag: $elm$parser$Parser$ExpectingNumber,
			ah: A2($elm$core$Result$fromMaybe, $elm$parser$Parser$ExpectingFloat, i.ah),
			am: A2($elm$core$Result$fromMaybe, $elm$parser$Parser$ExpectingHex, i.am),
			ap: A2($elm$core$Result$fromMaybe, $elm$parser$Parser$ExpectingInt, i.ap),
			aS: $elm$parser$Parser$ExpectingNumber,
			as: A2($elm$core$Result$fromMaybe, $elm$parser$Parser$ExpectingOctal, i.as)
		});
};
var $stil4m$elm_syntax$Elm$Parser$Numbers$raw = F3(
	function (floatf, intf, hexf) {
		return $elm$parser$Parser$number(
			{
				Z: $elm$core$Maybe$Nothing,
				ah: $elm$core$Maybe$Just(floatf),
				am: $elm$core$Maybe$Just(hexf),
				ap: $elm$core$Maybe$Just(intf),
				as: $elm$core$Maybe$Nothing
			});
	});
var $stil4m$elm_syntax$Elm$Parser$Numbers$number = F3(
	function (floatf, intf, hexf) {
		return $stil4m$elm_syntax$Combine$fromCore(
			A3($stil4m$elm_syntax$Elm$Parser$Numbers$raw, floatf, intf, hexf));
	});
var $stil4m$elm_syntax$Elm$Parser$Patterns$numberPart = A3($stil4m$elm_syntax$Elm$Parser$Numbers$number, $stil4m$elm_syntax$Elm$Syntax$Pattern$FloatPattern, $stil4m$elm_syntax$Elm$Syntax$Pattern$IntPattern, $stil4m$elm_syntax$Elm$Syntax$Pattern$HexPattern);
var $stil4m$elm_syntax$Combine$parens = A2(
	$stil4m$elm_syntax$Combine$between,
	$stil4m$elm_syntax$Combine$string('('),
	$stil4m$elm_syntax$Combine$string(')'));
var $stil4m$elm_syntax$Elm$Syntax$Pattern$RecordPattern = function (a) {
	return {$: 8, a: a};
};
var $stil4m$elm_syntax$Combine$sepBy1 = F2(
	function (sep, p) {
		return A2(
			$stil4m$elm_syntax$Combine$andMap,
			$stil4m$elm_syntax$Combine$many(
				A2($stil4m$elm_syntax$Combine$continueWith, p, sep)),
			A2(
				$stil4m$elm_syntax$Combine$andMap,
				p,
				$stil4m$elm_syntax$Combine$succeed($elm$core$List$cons)));
	});
var $stil4m$elm_syntax$Elm$Parser$Patterns$recordPart = $stil4m$elm_syntax$Combine$lazy(
	function (_v0) {
		return $stil4m$elm_syntax$Elm$Parser$Node$parser(
			A2(
				$stil4m$elm_syntax$Combine$map,
				$stil4m$elm_syntax$Elm$Syntax$Pattern$RecordPattern,
				A3(
					$stil4m$elm_syntax$Combine$between,
					A2(
						$stil4m$elm_syntax$Combine$continueWith,
						$stil4m$elm_syntax$Combine$maybe($stil4m$elm_syntax$Elm$Parser$Layout$layout),
						$stil4m$elm_syntax$Combine$string('{')),
					A2(
						$stil4m$elm_syntax$Combine$continueWith,
						$stil4m$elm_syntax$Combine$string('}'),
						$stil4m$elm_syntax$Combine$maybe($stil4m$elm_syntax$Elm$Parser$Layout$layout)),
					A2(
						$stil4m$elm_syntax$Combine$sepBy1,
						$stil4m$elm_syntax$Combine$string(','),
						$stil4m$elm_syntax$Elm$Parser$Layout$maybeAroundBothSides(
							$stil4m$elm_syntax$Elm$Parser$Node$parser($stil4m$elm_syntax$Elm$Parser$Tokens$functionName))))));
	});
var $stil4m$elm_syntax$Combine$sepBy = F2(
	function (sep, p) {
		return A2(
			$stil4m$elm_syntax$Combine$or,
			A2($stil4m$elm_syntax$Combine$sepBy1, sep, p),
			$stil4m$elm_syntax$Combine$succeed(_List_Nil));
	});
var $elm$parser$Parser$Advanced$getOffset = function (s) {
	return A3($elm$parser$Parser$Advanced$Good, false, s.b, s);
};
var $elm$parser$Parser$getOffset = $elm$parser$Parser$Advanced$getOffset;
var $stil4m$elm_syntax$Elm$Parser$Tokens$stringLiteral = function () {
	var helper = function (s) {
		return s.j ? A2(
			$elm$parser$Parser$map,
			function (v) {
				return $elm$parser$Parser$Loop(
					_Utils_update(
						s,
						{
							j: false,
							e: A2(
								$elm$core$List$cons,
								$elm$core$String$fromList(
									_List_fromArray(
										[v])),
								s.e)
						}));
			},
			$stil4m$elm_syntax$Elm$Parser$Tokens$escapedCharValue) : $elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					A2(
					$elm$parser$Parser$map,
					function (_v0) {
						return $elm$parser$Parser$Done(
							$elm$core$String$concat(
								$elm$core$List$reverse(s.e)));
					},
					$elm$parser$Parser$symbol('\"')),
					A2(
					$elm$parser$Parser$map,
					function (_v1) {
						return $elm$parser$Parser$Loop(
							_Utils_update(
								s,
								{j: true, e: s.e}));
					},
					$elm$parser$Parser$getChompedString(
						$elm$parser$Parser$symbol('\\'))),
					A2(
					$elm$parser$Parser$andThen,
					function (_v2) {
						var start = _v2.a;
						var value = _v2.b;
						var end = _v2.c;
						return _Utils_eq(start, end) ? $elm$parser$Parser$problem('Expected a string character or a double quote') : $elm$parser$Parser$succeed(
							$elm$parser$Parser$Loop(
								_Utils_update(
									s,
									{
										e: A2($elm$core$List$cons, value, s.e)
									})));
					},
					A2(
						$elm$parser$Parser$keeper,
						A2(
							$elm$parser$Parser$keeper,
							A2(
								$elm$parser$Parser$keeper,
								$elm$parser$Parser$succeed(
									F3(
										function (start, value, end) {
											return _Utils_Tuple3(start, value, end);
										})),
								$elm$parser$Parser$getOffset),
							$elm$parser$Parser$getChompedString(
								$elm$parser$Parser$chompWhile(
									function (c) {
										return (c !== '\"') && (c !== '\\');
									}))),
						$elm$parser$Parser$getOffset))
				]));
	};
	return $stil4m$elm_syntax$Combine$fromCore(
		A2(
			$elm$parser$Parser$keeper,
			A2(
				$elm$parser$Parser$ignorer,
				$elm$parser$Parser$succeed($elm$core$Basics$identity),
				$elm$parser$Parser$symbol('\"')),
			A2(
				$elm$parser$Parser$loop,
				{j: false, e: _List_Nil},
				helper)));
}();
var $stil4m$elm_syntax$Elm$Parser$Tokens$typeName = $stil4m$elm_syntax$Combine$fromCore(
	$elm$parser$Parser$variable(
		{
			ao: function (c) {
				return $elm$core$Char$isAlphaNum(c) || (c === '_');
			},
			az: $elm$core$Set$fromList($stil4m$elm_syntax$Elm$Parser$Tokens$reservedList),
			V: $elm$core$Char$isUpper
		}));
var $stil4m$elm_syntax$Elm$Parser$Base$typeIndicator = function () {
	var helper = function (_v0) {
		var n = _v0.a;
		var xs = _v0.b;
		return $stil4m$elm_syntax$Combine$choice(
			_List_fromArray(
				[
					A2(
					$stil4m$elm_syntax$Combine$andThen,
					function (t) {
						return helper(
							_Utils_Tuple2(
								t,
								A2($elm$core$List$cons, n, xs)));
					},
					A2(
						$stil4m$elm_syntax$Combine$continueWith,
						$stil4m$elm_syntax$Elm$Parser$Tokens$typeName,
						$stil4m$elm_syntax$Combine$string('.'))),
					$stil4m$elm_syntax$Combine$succeed(
					_Utils_Tuple2(n, xs))
				]));
	};
	return A2(
		$stil4m$elm_syntax$Combine$map,
		function (_v1) {
			var t = _v1.a;
			var xs = _v1.b;
			return _Utils_Tuple2(
				$elm$core$List$reverse(xs),
				t);
		},
		A2(
			$stil4m$elm_syntax$Combine$andThen,
			function (t) {
				return helper(
					_Utils_Tuple2(t, _List_Nil));
			},
			$stil4m$elm_syntax$Elm$Parser$Tokens$typeName));
}();
var $stil4m$elm_syntax$Elm$Parser$Patterns$variablePart = $stil4m$elm_syntax$Elm$Parser$Node$parser(
	A2($stil4m$elm_syntax$Combine$map, $stil4m$elm_syntax$Elm$Syntax$Pattern$VarPattern, $stil4m$elm_syntax$Elm$Parser$Tokens$functionName));
var $stil4m$elm_syntax$Elm$Parser$Patterns$qualifiedPattern = function (consumeArgs) {
	return A2(
		$stil4m$elm_syntax$Combine$andThen,
		function (_v0) {
			var range = _v0.a;
			var _v1 = _v0.b;
			var mod = _v1.a;
			var name = _v1.b;
			return A2(
				$stil4m$elm_syntax$Combine$map,
				function (args) {
					return A2(
						$stil4m$elm_syntax$Elm$Syntax$Node$Node,
						$stil4m$elm_syntax$Elm$Syntax$Range$combine(
							A2(
								$elm$core$List$cons,
								range,
								A2(
									$elm$core$List$map,
									function (_v2) {
										var r = _v2.a;
										return r;
									},
									args))),
						A2(
							$stil4m$elm_syntax$Elm$Syntax$Pattern$NamedPattern,
							A2($stil4m$elm_syntax$Elm$Syntax$Pattern$QualifiedNameRef, mod, name),
							args));
				},
				consumeArgs ? $stil4m$elm_syntax$Combine$many(
					A2(
						$stil4m$elm_syntax$Combine$ignore,
						$stil4m$elm_syntax$Combine$maybe($stil4m$elm_syntax$Elm$Parser$Layout$layout),
						$stil4m$elm_syntax$Elm$Parser$Patterns$cyclic$qualifiedPatternArg())) : $stil4m$elm_syntax$Combine$succeed(_List_Nil));
		},
		A2(
			$stil4m$elm_syntax$Combine$ignore,
			$stil4m$elm_syntax$Combine$maybe($stil4m$elm_syntax$Elm$Parser$Layout$layout),
			$stil4m$elm_syntax$Elm$Parser$Node$parser($stil4m$elm_syntax$Elm$Parser$Base$typeIndicator)));
};
var $stil4m$elm_syntax$Elm$Parser$Patterns$tryToCompose = function (x) {
	return A2(
		$stil4m$elm_syntax$Combine$continueWith,
		$stil4m$elm_syntax$Combine$choice(
			_List_fromArray(
				[
					A2(
					$stil4m$elm_syntax$Combine$map,
					function (y) {
						return A3($stil4m$elm_syntax$Elm$Syntax$Node$combine, $stil4m$elm_syntax$Elm$Syntax$Pattern$AsPattern, x, y);
					},
					A2(
						$stil4m$elm_syntax$Combine$continueWith,
						$stil4m$elm_syntax$Elm$Parser$Node$parser($stil4m$elm_syntax$Elm$Parser$Tokens$functionName),
						A2(
							$stil4m$elm_syntax$Combine$ignore,
							$stil4m$elm_syntax$Elm$Parser$Layout$layout,
							$stil4m$elm_syntax$Combine$fromCore(
								$elm$parser$Parser$keyword('as'))))),
					A2(
					$stil4m$elm_syntax$Combine$map,
					function (y) {
						return A3($stil4m$elm_syntax$Elm$Syntax$Node$combine, $stil4m$elm_syntax$Elm$Syntax$Pattern$UnConsPattern, x, y);
					},
					A2(
						$stil4m$elm_syntax$Combine$continueWith,
						$stil4m$elm_syntax$Elm$Parser$Patterns$cyclic$pattern(),
						A2(
							$stil4m$elm_syntax$Combine$ignore,
							$stil4m$elm_syntax$Combine$maybe($stil4m$elm_syntax$Elm$Parser$Layout$layout),
							$stil4m$elm_syntax$Combine$fromCore(
								$elm$parser$Parser$symbol('::'))))),
					$stil4m$elm_syntax$Combine$succeed(x)
				])),
		$stil4m$elm_syntax$Combine$maybe($stil4m$elm_syntax$Elm$Parser$Layout$layout));
};
function $stil4m$elm_syntax$Elm$Parser$Patterns$cyclic$pattern() {
	return A2(
		$stil4m$elm_syntax$Combine$andThen,
		$stil4m$elm_syntax$Elm$Parser$Patterns$tryToCompose,
		$stil4m$elm_syntax$Elm$Parser$Patterns$cyclic$composablePattern());
}
function $stil4m$elm_syntax$Elm$Parser$Patterns$cyclic$composablePattern() {
	return $stil4m$elm_syntax$Combine$choice(
		_List_fromArray(
			[
				$stil4m$elm_syntax$Elm$Parser$Patterns$variablePart,
				$stil4m$elm_syntax$Elm$Parser$Patterns$qualifiedPattern(true),
				$stil4m$elm_syntax$Elm$Parser$Node$parser(
				A2($stil4m$elm_syntax$Combine$map, $stil4m$elm_syntax$Elm$Syntax$Pattern$StringPattern, $stil4m$elm_syntax$Elm$Parser$Tokens$stringLiteral)),
				$stil4m$elm_syntax$Elm$Parser$Node$parser(
				A2($stil4m$elm_syntax$Combine$map, $stil4m$elm_syntax$Elm$Syntax$Pattern$CharPattern, $stil4m$elm_syntax$Elm$Parser$Tokens$characterLiteral)),
				$stil4m$elm_syntax$Elm$Parser$Node$parser($stil4m$elm_syntax$Elm$Parser$Patterns$numberPart),
				$stil4m$elm_syntax$Elm$Parser$Node$parser(
				A2(
					$stil4m$elm_syntax$Combine$map,
					$elm$core$Basics$always($stil4m$elm_syntax$Elm$Syntax$Pattern$UnitPattern),
					$stil4m$elm_syntax$Combine$fromCore(
						$elm$parser$Parser$symbol('()')))),
				$stil4m$elm_syntax$Elm$Parser$Node$parser(
				A2(
					$stil4m$elm_syntax$Combine$map,
					$elm$core$Basics$always($stil4m$elm_syntax$Elm$Syntax$Pattern$AllPattern),
					$stil4m$elm_syntax$Combine$fromCore(
						$elm$parser$Parser$symbol('_')))),
				$stil4m$elm_syntax$Elm$Parser$Patterns$recordPart,
				$stil4m$elm_syntax$Elm$Parser$Patterns$cyclic$listPattern(),
				$stil4m$elm_syntax$Elm$Parser$Patterns$cyclic$parensPattern()
			]));
}
function $stil4m$elm_syntax$Elm$Parser$Patterns$cyclic$qualifiedPatternArg() {
	return $stil4m$elm_syntax$Combine$choice(
		_List_fromArray(
			[
				$stil4m$elm_syntax$Elm$Parser$Patterns$variablePart,
				$stil4m$elm_syntax$Elm$Parser$Patterns$qualifiedPattern(false),
				$stil4m$elm_syntax$Elm$Parser$Node$parser(
				A2($stil4m$elm_syntax$Combine$map, $stil4m$elm_syntax$Elm$Syntax$Pattern$StringPattern, $stil4m$elm_syntax$Elm$Parser$Tokens$stringLiteral)),
				$stil4m$elm_syntax$Elm$Parser$Node$parser(
				A2($stil4m$elm_syntax$Combine$map, $stil4m$elm_syntax$Elm$Syntax$Pattern$CharPattern, $stil4m$elm_syntax$Elm$Parser$Tokens$characterLiteral)),
				$stil4m$elm_syntax$Elm$Parser$Node$parser($stil4m$elm_syntax$Elm$Parser$Patterns$numberPart),
				$stil4m$elm_syntax$Elm$Parser$Node$parser(
				A2(
					$stil4m$elm_syntax$Combine$map,
					$elm$core$Basics$always($stil4m$elm_syntax$Elm$Syntax$Pattern$UnitPattern),
					$stil4m$elm_syntax$Combine$fromCore(
						$elm$parser$Parser$symbol('()')))),
				$stil4m$elm_syntax$Elm$Parser$Node$parser(
				A2(
					$stil4m$elm_syntax$Combine$map,
					$elm$core$Basics$always($stil4m$elm_syntax$Elm$Syntax$Pattern$AllPattern),
					$stil4m$elm_syntax$Combine$fromCore(
						$elm$parser$Parser$symbol('_')))),
				$stil4m$elm_syntax$Elm$Parser$Patterns$recordPart,
				$stil4m$elm_syntax$Elm$Parser$Patterns$cyclic$listPattern(),
				$stil4m$elm_syntax$Elm$Parser$Patterns$cyclic$parensPattern()
			]));
}
function $stil4m$elm_syntax$Elm$Parser$Patterns$cyclic$listPattern() {
	return $stil4m$elm_syntax$Combine$lazy(
		function (_v5) {
			return $stil4m$elm_syntax$Elm$Parser$Node$parser(
				A3(
					$stil4m$elm_syntax$Combine$between,
					$stil4m$elm_syntax$Combine$string('['),
					$stil4m$elm_syntax$Combine$string(']'),
					A2(
						$stil4m$elm_syntax$Combine$map,
						$stil4m$elm_syntax$Elm$Syntax$Pattern$ListPattern,
						A2(
							$stil4m$elm_syntax$Combine$sepBy,
							$stil4m$elm_syntax$Combine$string(','),
							$stil4m$elm_syntax$Elm$Parser$Layout$maybeAroundBothSides(
								$stil4m$elm_syntax$Elm$Parser$Patterns$cyclic$pattern())))));
		});
}
function $stil4m$elm_syntax$Elm$Parser$Patterns$cyclic$parensPattern() {
	return $stil4m$elm_syntax$Combine$lazy(
		function (_v3) {
			return $stil4m$elm_syntax$Elm$Parser$Node$parser(
				A2(
					$stil4m$elm_syntax$Combine$map,
					function (c) {
						if (c.b && (!c.b.b)) {
							var x = c.a;
							return $stil4m$elm_syntax$Elm$Syntax$Pattern$ParenthesizedPattern(x);
						} else {
							return $stil4m$elm_syntax$Elm$Syntax$Pattern$TuplePattern(c);
						}
					},
					$stil4m$elm_syntax$Combine$parens(
						A2(
							$stil4m$elm_syntax$Combine$sepBy,
							$stil4m$elm_syntax$Combine$string(','),
							$stil4m$elm_syntax$Elm$Parser$Layout$maybeAroundBothSides(
								$stil4m$elm_syntax$Elm$Parser$Patterns$cyclic$pattern())))));
		});
}
var $stil4m$elm_syntax$Elm$Parser$Patterns$pattern = $stil4m$elm_syntax$Elm$Parser$Patterns$cyclic$pattern();
$stil4m$elm_syntax$Elm$Parser$Patterns$cyclic$pattern = function () {
	return $stil4m$elm_syntax$Elm$Parser$Patterns$pattern;
};
var $stil4m$elm_syntax$Elm$Parser$Patterns$composablePattern = $stil4m$elm_syntax$Elm$Parser$Patterns$cyclic$composablePattern();
$stil4m$elm_syntax$Elm$Parser$Patterns$cyclic$composablePattern = function () {
	return $stil4m$elm_syntax$Elm$Parser$Patterns$composablePattern;
};
var $stil4m$elm_syntax$Elm$Parser$Patterns$qualifiedPatternArg = $stil4m$elm_syntax$Elm$Parser$Patterns$cyclic$qualifiedPatternArg();
$stil4m$elm_syntax$Elm$Parser$Patterns$cyclic$qualifiedPatternArg = function () {
	return $stil4m$elm_syntax$Elm$Parser$Patterns$qualifiedPatternArg;
};
var $stil4m$elm_syntax$Elm$Parser$Patterns$listPattern = $stil4m$elm_syntax$Elm$Parser$Patterns$cyclic$listPattern();
$stil4m$elm_syntax$Elm$Parser$Patterns$cyclic$listPattern = function () {
	return $stil4m$elm_syntax$Elm$Parser$Patterns$listPattern;
};
var $stil4m$elm_syntax$Elm$Parser$Patterns$parensPattern = $stil4m$elm_syntax$Elm$Parser$Patterns$cyclic$parensPattern();
$stil4m$elm_syntax$Elm$Parser$Patterns$cyclic$parensPattern = function () {
	return $stil4m$elm_syntax$Elm$Parser$Patterns$parensPattern;
};
var $stil4m$elm_syntax$Elm$Parser$Declarations$functionArgument = $stil4m$elm_syntax$Elm$Parser$Patterns$pattern;
var $stil4m$elm_syntax$Elm$Syntax$Signature$Signature = F2(
	function (name, typeAnnotation) {
		return {f: name, a2: typeAnnotation};
	});
var $stil4m$elm_syntax$Elm$Parser$TypeAnnotation$Eager = 0;
var $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$GenericRecord = F2(
	function (a, b) {
		return {$: 5, a: a, b: b};
	});
var $stil4m$elm_syntax$Elm$Parser$TypeAnnotation$Lazy = 1;
var $stil4m$elm_syntax$Elm$Parser$TypeAnnotation$asTypeAnnotation = F2(
	function (x, xs) {
		var value = x.b;
		if (!xs.b) {
			return value;
		} else {
			return $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Tupled(
				A2($elm$core$List$cons, x, xs));
		}
	});
var $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$GenericType = function (a) {
	return {$: 0, a: a};
};
var $stil4m$elm_syntax$Elm$Parser$TypeAnnotation$genericTypeAnnotation = $stil4m$elm_syntax$Combine$lazy(
	function (_v0) {
		return $stil4m$elm_syntax$Elm$Parser$Node$parser(
			A2($stil4m$elm_syntax$Combine$map, $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$GenericType, $stil4m$elm_syntax$Elm$Parser$Tokens$functionName));
	});
var $stil4m$elm_syntax$Elm$Parser$Layout$Indented = 1;
var $stil4m$elm_syntax$Elm$Parser$Layout$Strict = 0;
var $elm$core$List$member = F2(
	function (x, xs) {
		return A2(
			$elm$core$List$any,
			function (a) {
				return _Utils_eq(a, x);
			},
			xs);
	});
var $stil4m$elm_syntax$Elm$Parser$State$storedColumns = function (_v0) {
	var indents = _v0.r;
	return A2(
		$elm$core$List$map,
		$elm$core$Basics$add(1),
		indents);
};
var $stil4m$elm_syntax$Elm$Parser$Layout$compute = $stil4m$elm_syntax$Combine$withState(
	function (s) {
		return $stil4m$elm_syntax$Combine$withLocation(
			function (l) {
				var known = A2(
					$elm$core$List$cons,
					1,
					$stil4m$elm_syntax$Elm$Parser$State$storedColumns(s));
				return A2($elm$core$List$member, l.aa, known) ? $stil4m$elm_syntax$Combine$succeed(0) : $stil4m$elm_syntax$Combine$succeed(1);
			});
	});
var $stil4m$elm_syntax$Elm$Parser$Layout$optimisticLayout = A2(
	$stil4m$elm_syntax$Combine$continueWith,
	$stil4m$elm_syntax$Elm$Parser$Layout$compute,
	$stil4m$elm_syntax$Combine$many(
		$stil4m$elm_syntax$Combine$choice(
			_List_fromArray(
				[
					$stil4m$elm_syntax$Elm$Parser$Layout$anyComment,
					A2(
					$stil4m$elm_syntax$Combine$continueWith,
					$stil4m$elm_syntax$Combine$choice(
						_List_fromArray(
							[
								$stil4m$elm_syntax$Elm$Parser$Whitespace$many1Spaces,
								$stil4m$elm_syntax$Elm$Parser$Layout$anyComment,
								$stil4m$elm_syntax$Combine$succeed(0)
							])),
					$stil4m$elm_syntax$Combine$many1($stil4m$elm_syntax$Elm$Parser$Whitespace$realNewLine)),
					$stil4m$elm_syntax$Elm$Parser$Whitespace$many1Spaces
				]))));
var $stil4m$elm_syntax$Elm$Parser$Layout$optimisticLayoutWith = F2(
	function (onStrict, onIndented) {
		return A2(
			$stil4m$elm_syntax$Combine$andThen,
			function (ind) {
				if (!ind) {
					return onStrict(0);
				} else {
					return onIndented(0);
				}
			},
			$stil4m$elm_syntax$Elm$Parser$Layout$optimisticLayout);
	});
var $elm$core$Tuple$pair = F2(
	function (a, b) {
		return _Utils_Tuple2(a, b);
	});
var $stil4m$elm_syntax$Elm$Parser$TypeAnnotation$typeAnnotationNoFn = function (mode) {
	return $stil4m$elm_syntax$Combine$lazy(
		function (_v7) {
			return $stil4m$elm_syntax$Combine$choice(
				_List_fromArray(
					[
						$stil4m$elm_syntax$Elm$Parser$TypeAnnotation$cyclic$parensTypeAnnotation(),
						$stil4m$elm_syntax$Elm$Parser$TypeAnnotation$typedTypeAnnotation(mode),
						$stil4m$elm_syntax$Elm$Parser$TypeAnnotation$genericTypeAnnotation,
						$stil4m$elm_syntax$Elm$Parser$TypeAnnotation$cyclic$recordTypeAnnotation()
					]));
		});
};
var $stil4m$elm_syntax$Elm$Parser$TypeAnnotation$typedTypeAnnotation = function (mode) {
	return $stil4m$elm_syntax$Combine$lazy(
		function (_v0) {
			var nodeRanges = $elm$core$List$map(
				function (_v6) {
					var r = _v6.a;
					return r;
				});
			var genericHelper = function (items) {
				return A2(
					$stil4m$elm_syntax$Combine$or,
					A2(
						$stil4m$elm_syntax$Combine$andThen,
						function (next) {
							return A2(
								$stil4m$elm_syntax$Combine$ignore,
								$stil4m$elm_syntax$Combine$maybe($stil4m$elm_syntax$Elm$Parser$Layout$layout),
								A2(
									$stil4m$elm_syntax$Elm$Parser$Layout$optimisticLayoutWith,
									function (_v1) {
										return $stil4m$elm_syntax$Combine$succeed(
											$elm$core$List$reverse(
												A2($elm$core$List$cons, next, items)));
									},
									function (_v2) {
										return genericHelper(
											A2($elm$core$List$cons, next, items));
									}));
						},
						$stil4m$elm_syntax$Elm$Parser$TypeAnnotation$typeAnnotationNoFn(1)),
					$stil4m$elm_syntax$Combine$succeed(
						$elm$core$List$reverse(items)));
			};
			return A2(
				$stil4m$elm_syntax$Combine$andThen,
				function (original) {
					var tir = original.a;
					return A2(
						$stil4m$elm_syntax$Elm$Parser$Layout$optimisticLayoutWith,
						function (_v3) {
							return $stil4m$elm_syntax$Combine$succeed(
								A2(
									$stil4m$elm_syntax$Elm$Syntax$Node$Node,
									tir,
									A2($stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Typed, original, _List_Nil)));
						},
						function (_v4) {
							if (!mode) {
								return A2(
									$stil4m$elm_syntax$Combine$map,
									function (args) {
										return A2(
											$stil4m$elm_syntax$Elm$Syntax$Node$Node,
											$stil4m$elm_syntax$Elm$Syntax$Range$combine(
												A2(
													$elm$core$List$cons,
													tir,
													nodeRanges(args))),
											A2($stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Typed, original, args));
									},
									genericHelper(_List_Nil));
							} else {
								return $stil4m$elm_syntax$Combine$succeed(
									A2(
										$stil4m$elm_syntax$Elm$Syntax$Node$Node,
										tir,
										A2($stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Typed, original, _List_Nil)));
							}
						});
				},
				$stil4m$elm_syntax$Elm$Parser$Node$parser($stil4m$elm_syntax$Elm$Parser$Base$typeIndicator));
		});
};
function $stil4m$elm_syntax$Elm$Parser$TypeAnnotation$cyclic$parensTypeAnnotation() {
	return $stil4m$elm_syntax$Combine$lazy(
		function (_v14) {
			var commaSep = $stil4m$elm_syntax$Combine$many(
				A2(
					$stil4m$elm_syntax$Combine$ignore,
					$stil4m$elm_syntax$Combine$maybe($stil4m$elm_syntax$Elm$Parser$Layout$layout),
					A2(
						$stil4m$elm_syntax$Combine$continueWith,
						$stil4m$elm_syntax$Elm$Parser$TypeAnnotation$cyclic$typeAnnotation(),
						A2(
							$stil4m$elm_syntax$Combine$ignore,
							$stil4m$elm_syntax$Combine$maybe($stil4m$elm_syntax$Elm$Parser$Layout$layout),
							$stil4m$elm_syntax$Combine$string(',')))));
			var nested = A2(
				$stil4m$elm_syntax$Combine$andMap,
				commaSep,
				A2(
					$stil4m$elm_syntax$Combine$ignore,
					$stil4m$elm_syntax$Combine$maybe($stil4m$elm_syntax$Elm$Parser$Layout$layout),
					A2(
						$stil4m$elm_syntax$Combine$andMap,
						$stil4m$elm_syntax$Elm$Parser$TypeAnnotation$cyclic$typeAnnotation(),
						A2(
							$stil4m$elm_syntax$Combine$ignore,
							$stil4m$elm_syntax$Combine$maybe($stil4m$elm_syntax$Elm$Parser$Layout$layout),
							$stil4m$elm_syntax$Combine$succeed($stil4m$elm_syntax$Elm$Parser$TypeAnnotation$asTypeAnnotation)))));
			return $stil4m$elm_syntax$Elm$Parser$Node$parser(
				A2(
					$stil4m$elm_syntax$Combine$continueWith,
					$stil4m$elm_syntax$Combine$choice(
						_List_fromArray(
							[
								A2(
								$stil4m$elm_syntax$Combine$map,
								$elm$core$Basics$always($stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Unit),
								$stil4m$elm_syntax$Combine$string(')')),
								A2(
								$stil4m$elm_syntax$Combine$ignore,
								$stil4m$elm_syntax$Combine$string(')'),
								nested)
							])),
					$stil4m$elm_syntax$Combine$string('(')));
		});
}
function $stil4m$elm_syntax$Elm$Parser$TypeAnnotation$cyclic$recordFieldDefinition() {
	return $stil4m$elm_syntax$Combine$lazy(
		function (_v13) {
			return A2(
				$stil4m$elm_syntax$Combine$andMap,
				A2(
					$stil4m$elm_syntax$Combine$continueWith,
					$stil4m$elm_syntax$Elm$Parser$TypeAnnotation$cyclic$typeAnnotation(),
					A2(
						$stil4m$elm_syntax$Combine$continueWith,
						$stil4m$elm_syntax$Combine$maybe($stil4m$elm_syntax$Elm$Parser$Layout$layout),
						A2(
							$stil4m$elm_syntax$Combine$continueWith,
							$stil4m$elm_syntax$Combine$string(':'),
							$stil4m$elm_syntax$Combine$maybe($stil4m$elm_syntax$Elm$Parser$Layout$layout)))),
				A2(
					$stil4m$elm_syntax$Combine$andMap,
					A2(
						$stil4m$elm_syntax$Combine$continueWith,
						$stil4m$elm_syntax$Elm$Parser$Node$parser($stil4m$elm_syntax$Elm$Parser$Tokens$functionName),
						$stil4m$elm_syntax$Combine$maybe($stil4m$elm_syntax$Elm$Parser$Layout$layout)),
					$stil4m$elm_syntax$Combine$succeed($elm$core$Tuple$pair)));
		});
}
function $stil4m$elm_syntax$Elm$Parser$TypeAnnotation$cyclic$recordFieldsTypeAnnotation() {
	return $stil4m$elm_syntax$Combine$lazy(
		function (_v12) {
			return A2(
				$stil4m$elm_syntax$Combine$sepBy,
				$stil4m$elm_syntax$Combine$string(','),
				$stil4m$elm_syntax$Elm$Parser$Layout$maybeAroundBothSides(
					$stil4m$elm_syntax$Elm$Parser$Node$parser(
						$stil4m$elm_syntax$Elm$Parser$TypeAnnotation$cyclic$recordFieldDefinition())));
		});
}
function $stil4m$elm_syntax$Elm$Parser$TypeAnnotation$cyclic$recordTypeAnnotation() {
	return $stil4m$elm_syntax$Combine$lazy(
		function (_v11) {
			var nextField = A2(
				$stil4m$elm_syntax$Combine$ignore,
				$stil4m$elm_syntax$Elm$Parser$Layout$optimisticLayout,
				A2(
					$stil4m$elm_syntax$Combine$andMap,
					$stil4m$elm_syntax$Elm$Parser$TypeAnnotation$cyclic$typeAnnotation(),
					A2(
						$stil4m$elm_syntax$Combine$ignore,
						$stil4m$elm_syntax$Combine$maybe($stil4m$elm_syntax$Elm$Parser$Layout$layout),
						A2(
							$stil4m$elm_syntax$Combine$ignore,
							$stil4m$elm_syntax$Combine$string(':'),
							A2(
								$stil4m$elm_syntax$Combine$ignore,
								$stil4m$elm_syntax$Combine$maybe($stil4m$elm_syntax$Elm$Parser$Layout$layout),
								A2(
									$stil4m$elm_syntax$Combine$andMap,
									$stil4m$elm_syntax$Elm$Parser$Node$parser($stil4m$elm_syntax$Elm$Parser$Tokens$functionName),
									A2(
										$stil4m$elm_syntax$Combine$ignore,
										$stil4m$elm_syntax$Combine$maybe($stil4m$elm_syntax$Elm$Parser$Layout$layout),
										A2(
											$stil4m$elm_syntax$Combine$ignore,
											$stil4m$elm_syntax$Combine$string(','),
											$stil4m$elm_syntax$Combine$succeed(
												F2(
													function (a, b) {
														return _Utils_Tuple2(a, b);
													}))))))))));
			var additionalRecordFields = function (items) {
				return $stil4m$elm_syntax$Combine$choice(
					_List_fromArray(
						[
							A2(
							$stil4m$elm_syntax$Combine$andThen,
							function (next) {
								return additionalRecordFields(
									A2($elm$core$List$cons, next, items));
							},
							$stil4m$elm_syntax$Elm$Parser$Node$parser(nextField)),
							$stil4m$elm_syntax$Combine$succeed(
							$elm$core$List$reverse(items))
						]));
			};
			return $stil4m$elm_syntax$Elm$Parser$Node$parser(
				A2(
					$stil4m$elm_syntax$Combine$continueWith,
					$stil4m$elm_syntax$Combine$choice(
						_List_fromArray(
							[
								A2(
								$stil4m$elm_syntax$Combine$continueWith,
								$stil4m$elm_syntax$Combine$succeed(
									$stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Record(_List_Nil)),
								$stil4m$elm_syntax$Combine$string('}')),
								A2(
								$stil4m$elm_syntax$Combine$andThen,
								function (fname) {
									return $stil4m$elm_syntax$Combine$choice(
										_List_fromArray(
											[
												A2(
												$stil4m$elm_syntax$Combine$ignore,
												$stil4m$elm_syntax$Combine$string('}'),
												A2(
													$stil4m$elm_syntax$Combine$andMap,
													$stil4m$elm_syntax$Elm$Parser$Node$parser(
														$stil4m$elm_syntax$Elm$Parser$TypeAnnotation$cyclic$recordFieldsTypeAnnotation()),
													A2(
														$stil4m$elm_syntax$Combine$ignore,
														$stil4m$elm_syntax$Combine$string('|'),
														$stil4m$elm_syntax$Combine$succeed(
															$stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$GenericRecord(fname))))),
												A2(
												$stil4m$elm_syntax$Combine$ignore,
												$stil4m$elm_syntax$Combine$string('}'),
												A2(
													$stil4m$elm_syntax$Combine$andThen,
													function (ta) {
														return A2(
															$stil4m$elm_syntax$Combine$map,
															$stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$Record,
															additionalRecordFields(
																_List_fromArray(
																	[
																		A3($stil4m$elm_syntax$Elm$Syntax$Node$combine, $elm$core$Tuple$pair, fname, ta)
																	])));
													},
													A2(
														$stil4m$elm_syntax$Combine$ignore,
														$stil4m$elm_syntax$Combine$maybe($stil4m$elm_syntax$Elm$Parser$Layout$layout),
														A2(
															$stil4m$elm_syntax$Combine$continueWith,
															$stil4m$elm_syntax$Elm$Parser$TypeAnnotation$cyclic$typeAnnotation(),
															A2(
																$stil4m$elm_syntax$Combine$ignore,
																$stil4m$elm_syntax$Combine$maybe($stil4m$elm_syntax$Elm$Parser$Layout$layout),
																$stil4m$elm_syntax$Combine$string(':'))))))
											]));
								},
								A2(
									$stil4m$elm_syntax$Combine$ignore,
									$stil4m$elm_syntax$Combine$maybe($stil4m$elm_syntax$Elm$Parser$Layout$layout),
									$stil4m$elm_syntax$Elm$Parser$Node$parser($stil4m$elm_syntax$Elm$Parser$Tokens$functionName)))
							])),
					A2(
						$stil4m$elm_syntax$Combine$ignore,
						$stil4m$elm_syntax$Combine$maybe($stil4m$elm_syntax$Elm$Parser$Layout$layout),
						$stil4m$elm_syntax$Combine$string('{'))));
		});
}
function $stil4m$elm_syntax$Elm$Parser$TypeAnnotation$cyclic$typeAnnotation() {
	return $stil4m$elm_syntax$Combine$lazy(
		function (_v8) {
			return A2(
				$stil4m$elm_syntax$Combine$andThen,
				function (typeRef) {
					return A2(
						$stil4m$elm_syntax$Elm$Parser$Layout$optimisticLayoutWith,
						function (_v9) {
							return $stil4m$elm_syntax$Combine$succeed(typeRef);
						},
						function (_v10) {
							return A2(
								$stil4m$elm_syntax$Combine$or,
								A2(
									$stil4m$elm_syntax$Combine$map,
									function (ta) {
										return A3($stil4m$elm_syntax$Elm$Syntax$Node$combine, $stil4m$elm_syntax$Elm$Syntax$TypeAnnotation$FunctionTypeAnnotation, typeRef, ta);
									},
									A2(
										$stil4m$elm_syntax$Combine$continueWith,
										$stil4m$elm_syntax$Elm$Parser$TypeAnnotation$cyclic$typeAnnotation(),
										A2(
											$stil4m$elm_syntax$Combine$ignore,
											$stil4m$elm_syntax$Combine$maybe($stil4m$elm_syntax$Elm$Parser$Layout$layout),
											$stil4m$elm_syntax$Combine$string('->')))),
								$stil4m$elm_syntax$Combine$succeed(typeRef));
						});
				},
				$stil4m$elm_syntax$Elm$Parser$TypeAnnotation$typeAnnotationNoFn(0));
		});
}
var $stil4m$elm_syntax$Elm$Parser$TypeAnnotation$parensTypeAnnotation = $stil4m$elm_syntax$Elm$Parser$TypeAnnotation$cyclic$parensTypeAnnotation();
$stil4m$elm_syntax$Elm$Parser$TypeAnnotation$cyclic$parensTypeAnnotation = function () {
	return $stil4m$elm_syntax$Elm$Parser$TypeAnnotation$parensTypeAnnotation;
};
var $stil4m$elm_syntax$Elm$Parser$TypeAnnotation$recordFieldDefinition = $stil4m$elm_syntax$Elm$Parser$TypeAnnotation$cyclic$recordFieldDefinition();
$stil4m$elm_syntax$Elm$Parser$TypeAnnotation$cyclic$recordFieldDefinition = function () {
	return $stil4m$elm_syntax$Elm$Parser$TypeAnnotation$recordFieldDefinition;
};
var $stil4m$elm_syntax$Elm$Parser$TypeAnnotation$recordFieldsTypeAnnotation = $stil4m$elm_syntax$Elm$Parser$TypeAnnotation$cyclic$recordFieldsTypeAnnotation();
$stil4m$elm_syntax$Elm$Parser$TypeAnnotation$cyclic$recordFieldsTypeAnnotation = function () {
	return $stil4m$elm_syntax$Elm$Parser$TypeAnnotation$recordFieldsTypeAnnotation;
};
var $stil4m$elm_syntax$Elm$Parser$TypeAnnotation$recordTypeAnnotation = $stil4m$elm_syntax$Elm$Parser$TypeAnnotation$cyclic$recordTypeAnnotation();
$stil4m$elm_syntax$Elm$Parser$TypeAnnotation$cyclic$recordTypeAnnotation = function () {
	return $stil4m$elm_syntax$Elm$Parser$TypeAnnotation$recordTypeAnnotation;
};
var $stil4m$elm_syntax$Elm$Parser$TypeAnnotation$typeAnnotation = $stil4m$elm_syntax$Elm$Parser$TypeAnnotation$cyclic$typeAnnotation();
$stil4m$elm_syntax$Elm$Parser$TypeAnnotation$cyclic$typeAnnotation = function () {
	return $stil4m$elm_syntax$Elm$Parser$TypeAnnotation$typeAnnotation;
};
var $stil4m$elm_syntax$Elm$Parser$Declarations$functionSignatureFromVarPointer = function (varPointer) {
	return A2(
		$stil4m$elm_syntax$Combine$andMap,
		$stil4m$elm_syntax$Elm$Parser$TypeAnnotation$typeAnnotation,
		A2(
			$stil4m$elm_syntax$Combine$ignore,
			$stil4m$elm_syntax$Combine$maybe($stil4m$elm_syntax$Elm$Parser$Layout$layout),
			A2(
				$stil4m$elm_syntax$Combine$ignore,
				$stil4m$elm_syntax$Combine$string(':'),
				$stil4m$elm_syntax$Combine$succeed(
					function (ta) {
						return A3($stil4m$elm_syntax$Elm$Syntax$Node$combine, $stil4m$elm_syntax$Elm$Syntax$Signature$Signature, varPointer, ta);
					}))));
};
var $stil4m$elm_syntax$Elm$Syntax$Expression$GLSLExpression = function (a) {
	return {$: 23, a: a};
};
var $elm$parser$Parser$NotNestable = 0;
var $elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			$elm$core$String$slice,
			n,
			$elm$core$String$length(string),
			string);
	});
var $stil4m$elm_syntax$Elm$Parser$Declarations$glslExpression = function () {
	var start = '[glsl|';
	var end = '|]';
	return $stil4m$elm_syntax$Elm$Parser$Node$parser(
		A2(
			$stil4m$elm_syntax$Combine$ignore,
			$stil4m$elm_syntax$Combine$string(end),
			A2(
				$stil4m$elm_syntax$Combine$map,
				A2(
					$elm$core$Basics$composeR,
					$elm$core$String$dropLeft(
						$elm$core$String$length(start)),
					$stil4m$elm_syntax$Elm$Syntax$Expression$GLSLExpression),
				$stil4m$elm_syntax$Combine$fromCore(
					$elm$parser$Parser$getChompedString(
						A3($elm$parser$Parser$multiComment, start, end, 0))))));
}();
var $stil4m$elm_syntax$Elm$Parser$Tokens$ifToken = $stil4m$elm_syntax$Combine$string('if');
var $stil4m$elm_syntax$Elm$Parser$Tokens$allowedOperatorTokens = _List_fromArray(
	['+', '-', ':', '/', '*', '>', '<', '=', '/', '&', '^', '%', '|', '!', '.', '#', '$', '≡', '~', '?', '@']);
var $stil4m$elm_syntax$Elm$Parser$Tokens$excludedOperators = _List_fromArray(
	[':', '->', '--', '=']);
var $stil4m$elm_syntax$Combine$Char$oneOf = function (cs) {
	return A2(
		$stil4m$elm_syntax$Combine$andThen,
		A2(
			$elm$core$Basics$composeR,
			$elm$core$Maybe$map($stil4m$elm_syntax$Combine$succeed),
			$elm$core$Maybe$withDefault(
				$stil4m$elm_syntax$Combine$fail(
					'expected one of \'' + ($elm$core$String$fromList(cs) + '\'')))),
		$stil4m$elm_syntax$Combine$Char$satisfy(
			function (a) {
				return A2($elm$core$List$member, a, cs);
			}));
};
var $stil4m$elm_syntax$Elm$Parser$Tokens$operatorTokenFromList = function (allowedChars) {
	return A2(
		$stil4m$elm_syntax$Combine$andThen,
		function (m) {
			return A2($elm$core$List$member, m, $stil4m$elm_syntax$Elm$Parser$Tokens$excludedOperators) ? $stil4m$elm_syntax$Combine$fail('operator is not allowed') : $stil4m$elm_syntax$Combine$succeed(m);
		},
		A2(
			$stil4m$elm_syntax$Combine$map,
			$elm$core$String$fromList,
			$stil4m$elm_syntax$Combine$many1(
				$stil4m$elm_syntax$Combine$Char$oneOf(allowedChars))));
};
var $stil4m$elm_syntax$Elm$Parser$Tokens$infixOperatorToken = $stil4m$elm_syntax$Elm$Parser$Tokens$operatorTokenFromList($stil4m$elm_syntax$Elm$Parser$Tokens$allowedOperatorTokens);
var $stil4m$elm_syntax$Elm$Parser$Layout$layoutStrict = A2(
	$stil4m$elm_syntax$Combine$continueWith,
	$stil4m$elm_syntax$Elm$Parser$Layout$verifyIndent(
		F2(
			function (stateIndent, current) {
				return _Utils_eq(stateIndent, current);
			})),
	$stil4m$elm_syntax$Combine$many1(
		$stil4m$elm_syntax$Combine$choice(
			_List_fromArray(
				[
					$stil4m$elm_syntax$Elm$Parser$Layout$anyComment,
					A2(
					$stil4m$elm_syntax$Combine$continueWith,
					$stil4m$elm_syntax$Combine$succeed(0),
					$stil4m$elm_syntax$Combine$many1($stil4m$elm_syntax$Elm$Parser$Whitespace$realNewLine)),
					$stil4m$elm_syntax$Elm$Parser$Whitespace$many1Spaces
				]))));
var $stil4m$elm_syntax$Elm$Syntax$Expression$RecordAccess = F2(
	function (a, b) {
		return {$: 20, a: a, b: b};
	});
var $stil4m$elm_syntax$Elm$Parser$Declarations$liftRecordAccess = function (e) {
	return $stil4m$elm_syntax$Combine$lazy(
		function (_v0) {
			return A2(
				$stil4m$elm_syntax$Combine$or,
				A2(
					$stil4m$elm_syntax$Combine$andThen,
					$stil4m$elm_syntax$Elm$Parser$Declarations$liftRecordAccess,
					$stil4m$elm_syntax$Elm$Parser$Node$parser(
						A2(
							$stil4m$elm_syntax$Combine$map,
							$stil4m$elm_syntax$Elm$Syntax$Expression$RecordAccess(e),
							A2(
								$stil4m$elm_syntax$Combine$continueWith,
								$stil4m$elm_syntax$Elm$Parser$Node$parser($stil4m$elm_syntax$Elm$Parser$Tokens$functionName),
								$stil4m$elm_syntax$Combine$string('.'))))),
				$stil4m$elm_syntax$Combine$succeed(e));
		});
};
var $stil4m$elm_syntax$Elm$Parser$Tokens$multiLineStringLiteral = function () {
	var helper = function (s) {
		return s.j ? A2(
			$elm$parser$Parser$map,
			function (v) {
				return $elm$parser$Parser$Loop(
					_Utils_update(
						s,
						{
							j: false,
							e: A2(
								$elm$core$List$cons,
								$elm$core$String$fromList(
									_List_fromArray(
										[v])),
								s.e)
						}));
			},
			$stil4m$elm_syntax$Elm$Parser$Tokens$escapedCharValue) : $elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					A2(
					$elm$parser$Parser$map,
					function (_v0) {
						return $elm$parser$Parser$Done(
							$elm$core$String$concat(s.e));
					},
					$elm$parser$Parser$symbol('\"\"\"')),
					A2(
					$elm$parser$Parser$map,
					function (v) {
						return $elm$parser$Parser$Loop(
							_Utils_update(
								s,
								{
									o: s.o + 1,
									e: A2($elm$core$List$cons, v, s.e)
								}));
					},
					$elm$parser$Parser$getChompedString(
						$elm$parser$Parser$symbol('\"'))),
					A2(
					$elm$parser$Parser$map,
					function (_v1) {
						return $elm$parser$Parser$Loop(
							_Utils_update(
								s,
								{o: s.o + 1, j: true, e: s.e}));
					},
					$elm$parser$Parser$getChompedString(
						$elm$parser$Parser$symbol('\\'))),
					A2(
					$elm$parser$Parser$andThen,
					function (_v2) {
						var start = _v2.a;
						var value = _v2.b;
						var end = _v2.c;
						return _Utils_eq(start, end) ? $elm$parser$Parser$problem('Expected a string character or a triple double quote') : $elm$parser$Parser$succeed(
							$elm$parser$Parser$Loop(
								_Utils_update(
									s,
									{
										o: s.o + 1,
										e: A2($elm$core$List$cons, value, s.e)
									})));
					},
					A2(
						$elm$parser$Parser$keeper,
						A2(
							$elm$parser$Parser$keeper,
							A2(
								$elm$parser$Parser$keeper,
								$elm$parser$Parser$succeed(
									F3(
										function (start, value, end) {
											return _Utils_Tuple3(start, value, end);
										})),
								$elm$parser$Parser$getOffset),
							$elm$parser$Parser$getChompedString(
								$elm$parser$Parser$chompWhile(
									function (c) {
										return (c !== '\"') && (c !== '\\');
									}))),
						$elm$parser$Parser$getOffset))
				]));
	};
	return $stil4m$elm_syntax$Combine$fromCore(
		A2(
			$elm$parser$Parser$keeper,
			A2(
				$elm$parser$Parser$ignorer,
				$elm$parser$Parser$succeed($elm$core$Basics$identity),
				$elm$parser$Parser$symbol('\"\"\"')),
			A2(
				$elm$parser$Parser$loop,
				{o: 0, j: false, e: _List_Nil},
				helper)));
}();
var $stil4m$elm_syntax$Elm$Parser$Declarations$literalExpression = $stil4m$elm_syntax$Combine$lazy(
	function (_v0) {
		return $stil4m$elm_syntax$Elm$Parser$Node$parser(
			A2(
				$stil4m$elm_syntax$Combine$map,
				$stil4m$elm_syntax$Elm$Syntax$Expression$Literal,
				A2($stil4m$elm_syntax$Combine$or, $stil4m$elm_syntax$Elm$Parser$Tokens$multiLineStringLiteral, $stil4m$elm_syntax$Elm$Parser$Tokens$stringLiteral)));
	});
var $stil4m$elm_syntax$Combine$loop = F2(
	function (init, stepper) {
		var wrapper = function (_v3) {
			var oldState = _v3.a;
			var v = _v3.b;
			var _v0 = stepper(v);
			var p = _v0;
			return A2(
				$elm$parser$Parser$map,
				function (_v1) {
					var newState = _v1.a;
					var r = _v1.b;
					if (!r.$) {
						var l = r.a;
						return $elm$parser$Parser$Loop(
							_Utils_Tuple2(newState, l));
					} else {
						var d = r.a;
						return $elm$parser$Parser$Done(
							_Utils_Tuple2(newState, d));
					}
				},
				p(oldState));
		};
		return function (state) {
			return A2(
				$elm$parser$Parser$loop,
				_Utils_Tuple2(state, init),
				wrapper);
		};
	});
var $stil4m$elm_syntax$Elm$Parser$Whitespace$manySpaces = $stil4m$elm_syntax$Combine$fromCore(
	$elm$parser$Parser$chompWhile(
		function (c) {
			return c === ' ';
		}));
var $stil4m$elm_syntax$Elm$Syntax$Expression$Floatable = function (a) {
	return {$: 9, a: a};
};
var $stil4m$elm_syntax$Elm$Syntax$Expression$Hex = function (a) {
	return {$: 8, a: a};
};
var $stil4m$elm_syntax$Elm$Syntax$Expression$Integer = function (a) {
	return {$: 7, a: a};
};
var $stil4m$elm_syntax$Elm$Parser$Numbers$forgivingNumber = F3(
	function (floatf, intf, hexf) {
		return $stil4m$elm_syntax$Combine$fromCore(
			$elm$parser$Parser$backtrackable(
				A3($stil4m$elm_syntax$Elm$Parser$Numbers$raw, floatf, intf, hexf)));
	});
var $stil4m$elm_syntax$Elm$Parser$Declarations$numberExpression = $stil4m$elm_syntax$Elm$Parser$Node$parser(
	A3($stil4m$elm_syntax$Elm$Parser$Numbers$forgivingNumber, $stil4m$elm_syntax$Elm$Syntax$Expression$Floatable, $stil4m$elm_syntax$Elm$Syntax$Expression$Integer, $stil4m$elm_syntax$Elm$Syntax$Expression$Hex));
var $stil4m$elm_syntax$Elm$Parser$Tokens$ofToken = $stil4m$elm_syntax$Combine$string('of');
var $stil4m$elm_syntax$Elm$Parser$Tokens$allowedPrefixOperatorTokens = A2($elm$core$List$cons, ',', $stil4m$elm_syntax$Elm$Parser$Tokens$allowedOperatorTokens);
var $stil4m$elm_syntax$Elm$Parser$Tokens$prefixOperatorToken = $stil4m$elm_syntax$Elm$Parser$Tokens$operatorTokenFromList($stil4m$elm_syntax$Elm$Parser$Tokens$allowedPrefixOperatorTokens);
var $stil4m$elm_syntax$Elm$Syntax$Node$range = function (_v0) {
	var r = _v0.a;
	return r;
};
var $stil4m$elm_syntax$Elm$Parser$Declarations$recordAccessFunctionExpression = $stil4m$elm_syntax$Elm$Parser$Node$parser(
	A2(
		$stil4m$elm_syntax$Combine$map,
		A2(
			$elm$core$Basics$composeR,
			$elm$core$Basics$append('.'),
			$stil4m$elm_syntax$Elm$Syntax$Expression$RecordAccessFunction),
		A2(
			$stil4m$elm_syntax$Combine$continueWith,
			$stil4m$elm_syntax$Elm$Parser$Tokens$functionName,
			$stil4m$elm_syntax$Combine$string('.'))));
var $stil4m$elm_syntax$Elm$Parser$Declarations$reference = function () {
	var justFunction = A2(
		$stil4m$elm_syntax$Combine$map,
		function (v) {
			return _Utils_Tuple2(_List_Nil, v);
		},
		$stil4m$elm_syntax$Elm$Parser$Tokens$functionName);
	var helper = function (_v0) {
		var n = _v0.a;
		var xs = _v0.b;
		return $stil4m$elm_syntax$Combine$choice(
			_List_fromArray(
				[
					A2(
					$stil4m$elm_syntax$Combine$continueWith,
					$stil4m$elm_syntax$Combine$choice(
						_List_fromArray(
							[
								A2(
								$stil4m$elm_syntax$Combine$andThen,
								function (t) {
									return helper(
										_Utils_Tuple2(
											t,
											A2($elm$core$List$cons, n, xs)));
								},
								$stil4m$elm_syntax$Elm$Parser$Tokens$typeName),
								A2(
								$stil4m$elm_syntax$Combine$map,
								function (t) {
									return _Utils_Tuple2(
										t,
										A2($elm$core$List$cons, n, xs));
								},
								$stil4m$elm_syntax$Elm$Parser$Tokens$functionName)
							])),
					$stil4m$elm_syntax$Combine$string('.')),
					$stil4m$elm_syntax$Combine$succeed(
					_Utils_Tuple2(n, xs))
				]));
	};
	var recurring = A2(
		$stil4m$elm_syntax$Combine$map,
		function (_v1) {
			var t = _v1.a;
			var xs = _v1.b;
			return _Utils_Tuple2(
				$elm$core$List$reverse(xs),
				t);
		},
		A2(
			$stil4m$elm_syntax$Combine$andThen,
			function (t) {
				return helper(
					_Utils_Tuple2(t, _List_Nil));
			},
			$stil4m$elm_syntax$Elm$Parser$Tokens$typeName));
	return $stil4m$elm_syntax$Combine$choice(
		_List_fromArray(
			[recurring, justFunction]));
}();
var $stil4m$elm_syntax$Elm$Parser$Declarations$referenceExpression = $stil4m$elm_syntax$Elm$Parser$Node$parser(
	A2(
		$stil4m$elm_syntax$Combine$map,
		function (_v0) {
			var xs = _v0.a;
			var x = _v0.b;
			return A2($stil4m$elm_syntax$Elm$Syntax$Expression$FunctionOrValue, xs, x);
		},
		$stil4m$elm_syntax$Elm$Parser$Declarations$reference));
var $elm$core$Tuple$second = function (_v0) {
	var y = _v0.b;
	return y;
};
var $stil4m$elm_syntax$Elm$Parser$Tokens$thenToken = $stil4m$elm_syntax$Combine$string('then');
var $elm$core$List$drop = F2(
	function (n, list) {
		drop:
		while (true) {
			if (n <= 0) {
				return list;
			} else {
				if (!list.b) {
					return list;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs;
					n = $temp$n;
					list = $temp$list;
					continue drop;
				}
			}
		}
	});
var $stil4m$elm_syntax$Elm$Parser$State$popIndent = function (_v0) {
	var s = _v0;
	return _Utils_update(
		s,
		{
			r: A2($elm$core$List$drop, 1, s.r)
		});
};
var $stil4m$elm_syntax$Elm$Parser$State$pushIndent = F2(
	function (x, _v0) {
		var s = _v0;
		return _Utils_update(
			s,
			{
				r: A2($elm$core$List$cons, x, s.r)
			});
	});
var $stil4m$elm_syntax$Elm$Parser$State$pushColumn = F2(
	function (col, state) {
		return A2($stil4m$elm_syntax$Elm$Parser$State$pushIndent, col - 1, state);
	});
var $stil4m$elm_syntax$Elm$Parser$Declarations$withIndentedState = function (p) {
	return $stil4m$elm_syntax$Combine$withLocation(
		function (location) {
			return A2(
				$stil4m$elm_syntax$Combine$ignore,
				$stil4m$elm_syntax$Combine$modifyState($stil4m$elm_syntax$Elm$Parser$State$popIndent),
				A2(
					$stil4m$elm_syntax$Combine$continueWith,
					p,
					$stil4m$elm_syntax$Combine$modifyState(
						$stil4m$elm_syntax$Elm$Parser$State$pushColumn(location.aa))));
		});
};
var $stil4m$elm_syntax$Elm$Parser$Declarations$functionWithNameNode = function (pointer) {
	var functionImplementationFromVarPointer = function (varPointer) {
		return A2(
			$stil4m$elm_syntax$Combine$andMap,
			$stil4m$elm_syntax$Elm$Parser$Declarations$cyclic$expression(),
			A2(
				$stil4m$elm_syntax$Combine$ignore,
				$stil4m$elm_syntax$Combine$maybe($stil4m$elm_syntax$Elm$Parser$Layout$layout),
				A2(
					$stil4m$elm_syntax$Combine$ignore,
					$stil4m$elm_syntax$Combine$string('='),
					A2(
						$stil4m$elm_syntax$Combine$andMap,
						$stil4m$elm_syntax$Combine$many(
							A2(
								$stil4m$elm_syntax$Combine$ignore,
								$stil4m$elm_syntax$Combine$maybe($stil4m$elm_syntax$Elm$Parser$Layout$layout),
								$stil4m$elm_syntax$Elm$Parser$Declarations$functionArgument)),
						$stil4m$elm_syntax$Combine$succeed(
							F2(
								function (args, expr) {
									return A2(
										$stil4m$elm_syntax$Elm$Syntax$Node$Node,
										$stil4m$elm_syntax$Elm$Syntax$Range$combine(
											_List_fromArray(
												[
													$stil4m$elm_syntax$Elm$Syntax$Node$range(varPointer),
													$stil4m$elm_syntax$Elm$Syntax$Node$range(expr)
												])),
										A3($stil4m$elm_syntax$Elm$Syntax$Expression$FunctionImplementation, varPointer, args, expr));
								}))))));
	};
	var functionWithoutSignature = function (varPointer) {
		return A2(
			$stil4m$elm_syntax$Combine$map,
			A2($stil4m$elm_syntax$Elm$Syntax$Expression$Function, $elm$core$Maybe$Nothing, $elm$core$Maybe$Nothing),
			functionImplementationFromVarPointer(varPointer));
	};
	var fromParts = F2(
		function (sig, decl) {
			return {
				aK: decl,
				aM: $elm$core$Maybe$Nothing,
				a$: $elm$core$Maybe$Just(sig)
			};
		});
	var functionWithSignature = function (varPointer) {
		return A2(
			$stil4m$elm_syntax$Combine$andThen,
			function (sig) {
				return A2(
					$stil4m$elm_syntax$Combine$map,
					fromParts(sig),
					A2(
						$stil4m$elm_syntax$Combine$andThen,
						functionImplementationFromVarPointer,
						A2(
							$stil4m$elm_syntax$Combine$ignore,
							$stil4m$elm_syntax$Combine$maybe($stil4m$elm_syntax$Elm$Parser$Layout$layout),
							A2(
								$stil4m$elm_syntax$Combine$continueWith,
								$stil4m$elm_syntax$Elm$Parser$Node$parser($stil4m$elm_syntax$Elm$Parser$Tokens$functionName),
								$stil4m$elm_syntax$Combine$maybe($stil4m$elm_syntax$Elm$Parser$Layout$layoutStrict)))));
			},
			$stil4m$elm_syntax$Elm$Parser$Declarations$functionSignatureFromVarPointer(varPointer));
	};
	return $stil4m$elm_syntax$Combine$choice(
		_List_fromArray(
			[
				functionWithSignature(pointer),
				functionWithoutSignature(pointer)
			]));
};
var $stil4m$elm_syntax$Elm$Parser$Declarations$letDestructuringDeclarationWithPattern = function (p) {
	return $stil4m$elm_syntax$Combine$lazy(
		function (_v7) {
			return A2(
				$stil4m$elm_syntax$Combine$andMap,
				$stil4m$elm_syntax$Elm$Parser$Declarations$cyclic$expression(),
				A2(
					$stil4m$elm_syntax$Combine$ignore,
					$stil4m$elm_syntax$Elm$Parser$Layout$layout,
					A2(
						$stil4m$elm_syntax$Combine$ignore,
						$stil4m$elm_syntax$Combine$string('='),
						A2(
							$stil4m$elm_syntax$Combine$ignore,
							$stil4m$elm_syntax$Combine$maybe($stil4m$elm_syntax$Elm$Parser$Layout$layout),
							$stil4m$elm_syntax$Combine$succeed(
								$stil4m$elm_syntax$Elm$Syntax$Expression$LetDestructuring(p))))));
		});
};
function $stil4m$elm_syntax$Elm$Parser$Declarations$cyclic$caseBlock() {
	return $stil4m$elm_syntax$Combine$lazy(
		function (_v23) {
			return A2(
				$stil4m$elm_syntax$Combine$ignore,
				$stil4m$elm_syntax$Elm$Parser$Tokens$ofToken,
				A2(
					$stil4m$elm_syntax$Combine$continueWith,
					$stil4m$elm_syntax$Elm$Parser$Declarations$cyclic$expression(),
					A2($stil4m$elm_syntax$Combine$continueWith, $stil4m$elm_syntax$Elm$Parser$Layout$layout, $stil4m$elm_syntax$Elm$Parser$Tokens$caseToken)));
		});
}
function $stil4m$elm_syntax$Elm$Parser$Declarations$cyclic$caseExpression() {
	return $stil4m$elm_syntax$Combine$lazy(
		function (_v21) {
			return A2(
				$stil4m$elm_syntax$Combine$andThen,
				function (_v22) {
					var start = _v22.a;
					return A2(
						$stil4m$elm_syntax$Combine$map,
						function (cb) {
							return A2(
								$stil4m$elm_syntax$Elm$Syntax$Node$Node,
								$stil4m$elm_syntax$Elm$Syntax$Range$combine(
									A2(
										$elm$core$List$cons,
										start,
										A2(
											$elm$core$List$map,
											A2($elm$core$Basics$composeR, $elm$core$Tuple$second, $stil4m$elm_syntax$Elm$Syntax$Node$range),
											cb.aI))),
								$stil4m$elm_syntax$Elm$Syntax$Expression$CaseExpression(cb));
						},
						A2(
							$stil4m$elm_syntax$Combine$andMap,
							A2(
								$stil4m$elm_syntax$Combine$continueWith,
								$stil4m$elm_syntax$Elm$Parser$Declarations$withIndentedState(
									$stil4m$elm_syntax$Elm$Parser$Declarations$cyclic$caseStatements()),
								$stil4m$elm_syntax$Elm$Parser$Layout$layout),
							A2(
								$stil4m$elm_syntax$Combine$andMap,
								$stil4m$elm_syntax$Elm$Parser$Declarations$cyclic$caseBlock(),
								$stil4m$elm_syntax$Combine$succeed($stil4m$elm_syntax$Elm$Syntax$Expression$CaseBlock))));
				},
				$stil4m$elm_syntax$Elm$Parser$Node$parser(
					$stil4m$elm_syntax$Combine$succeed(0)));
		});
}
function $stil4m$elm_syntax$Elm$Parser$Declarations$cyclic$caseStatement() {
	return $stil4m$elm_syntax$Combine$lazy(
		function (_v20) {
			return A2(
				$stil4m$elm_syntax$Combine$andMap,
				A2(
					$stil4m$elm_syntax$Combine$continueWith,
					$stil4m$elm_syntax$Elm$Parser$Declarations$cyclic$expression(),
					A2(
						$stil4m$elm_syntax$Combine$continueWith,
						$stil4m$elm_syntax$Combine$maybe($stil4m$elm_syntax$Elm$Parser$Layout$layout),
						A2(
							$stil4m$elm_syntax$Combine$continueWith,
							$stil4m$elm_syntax$Combine$string('->'),
							$stil4m$elm_syntax$Combine$maybe(
								A2($stil4m$elm_syntax$Combine$or, $stil4m$elm_syntax$Elm$Parser$Layout$layout, $stil4m$elm_syntax$Elm$Parser$Layout$layoutStrict))))),
				A2(
					$stil4m$elm_syntax$Combine$andMap,
					$stil4m$elm_syntax$Elm$Parser$Patterns$pattern,
					$stil4m$elm_syntax$Combine$succeed($elm$core$Tuple$pair)));
		});
}
function $stil4m$elm_syntax$Elm$Parser$Declarations$cyclic$caseStatements() {
	return $stil4m$elm_syntax$Combine$lazy(
		function (_v19) {
			var helper = function (last) {
				return $stil4m$elm_syntax$Combine$withState(
					function (s) {
						return $stil4m$elm_syntax$Combine$withLocation(
							function (l) {
								return _Utils_eq(
									$stil4m$elm_syntax$Elm$Parser$State$expectedColumn(s),
									l.aa) ? A2(
									$stil4m$elm_syntax$Combine$map,
									function (c) {
										return $stil4m$elm_syntax$Combine$Loop(
											A2($elm$core$List$cons, c, last));
									},
									$stil4m$elm_syntax$Elm$Parser$Declarations$cyclic$caseStatement()) : $stil4m$elm_syntax$Combine$succeed(
									$stil4m$elm_syntax$Combine$Done(
										$elm$core$List$reverse(last)));
							});
					});
			};
			return A2(
				$stil4m$elm_syntax$Combine$andThen,
				function (v) {
					return A2($stil4m$elm_syntax$Combine$loop, v, helper);
				},
				A2(
					$stil4m$elm_syntax$Combine$map,
					$elm$core$List$singleton,
					$stil4m$elm_syntax$Elm$Parser$Declarations$cyclic$caseStatement()));
		});
}
function $stil4m$elm_syntax$Elm$Parser$Declarations$cyclic$expression() {
	return $stil4m$elm_syntax$Combine$lazy(
		function (_v15) {
			return A2(
				$stil4m$elm_syntax$Combine$andThen,
				function (first) {
					var complete = function (rest) {
						return $stil4m$elm_syntax$Combine$succeed(
							function () {
								if (!rest.b) {
									return first;
								} else {
									return A2(
										$stil4m$elm_syntax$Elm$Syntax$Node$Node,
										$stil4m$elm_syntax$Elm$Syntax$Range$combine(
											A2(
												$elm$core$List$cons,
												$stil4m$elm_syntax$Elm$Syntax$Node$range(first),
												A2($elm$core$List$map, $stil4m$elm_syntax$Elm$Syntax$Node$range, rest))),
										$stil4m$elm_syntax$Elm$Syntax$Expression$Application(
											A2(
												$elm$core$List$cons,
												first,
												$elm$core$List$reverse(rest))));
								}
							}());
					};
					var promoter = function (rest) {
						return A2(
							$stil4m$elm_syntax$Elm$Parser$Layout$optimisticLayoutWith,
							function (_v16) {
								return complete(rest);
							},
							function (_v17) {
								return A2(
									$stil4m$elm_syntax$Combine$or,
									A2(
										$stil4m$elm_syntax$Combine$andThen,
										function (next) {
											return promoter(
												A2($elm$core$List$cons, next, rest));
										},
										$stil4m$elm_syntax$Elm$Parser$Declarations$cyclic$expressionNotApplication()),
									complete(rest));
							});
					};
					return promoter(_List_Nil);
				},
				$stil4m$elm_syntax$Elm$Parser$Declarations$cyclic$expressionNotApplication());
		});
}
function $stil4m$elm_syntax$Elm$Parser$Declarations$cyclic$expressionNotApplication() {
	return $stil4m$elm_syntax$Combine$lazy(
		function (_v14) {
			return A2(
				$stil4m$elm_syntax$Combine$andThen,
				$stil4m$elm_syntax$Elm$Parser$Declarations$liftRecordAccess,
				$stil4m$elm_syntax$Combine$choice(
					_List_fromArray(
						[
							$stil4m$elm_syntax$Elm$Parser$Declarations$numberExpression,
							$stil4m$elm_syntax$Elm$Parser$Declarations$referenceExpression,
							$stil4m$elm_syntax$Elm$Parser$Declarations$cyclic$ifBlockExpression(),
							$stil4m$elm_syntax$Elm$Parser$Declarations$cyclic$tupledExpression(),
							$stil4m$elm_syntax$Elm$Parser$Declarations$recordAccessFunctionExpression,
							$stil4m$elm_syntax$Elm$Parser$Declarations$cyclic$operatorExpression(),
							$stil4m$elm_syntax$Elm$Parser$Declarations$cyclic$letExpression(),
							$stil4m$elm_syntax$Elm$Parser$Declarations$cyclic$lambdaExpression(),
							$stil4m$elm_syntax$Elm$Parser$Declarations$literalExpression,
							$stil4m$elm_syntax$Elm$Parser$Declarations$charLiteralExpression,
							$stil4m$elm_syntax$Elm$Parser$Declarations$cyclic$recordExpression(),
							$stil4m$elm_syntax$Elm$Parser$Declarations$glslExpression,
							$stil4m$elm_syntax$Elm$Parser$Declarations$cyclic$listExpression(),
							$stil4m$elm_syntax$Elm$Parser$Declarations$cyclic$caseExpression()
						])));
		});
}
function $stil4m$elm_syntax$Elm$Parser$Declarations$cyclic$ifBlockExpression() {
	return $stil4m$elm_syntax$Elm$Parser$Node$parser(
		A2(
			$stil4m$elm_syntax$Combine$continueWith,
			$stil4m$elm_syntax$Combine$lazy(
				function (_v13) {
					return A2(
						$stil4m$elm_syntax$Combine$andMap,
						A2(
							$stil4m$elm_syntax$Combine$continueWith,
							$stil4m$elm_syntax$Elm$Parser$Declarations$cyclic$expression(),
							A2($stil4m$elm_syntax$Combine$continueWith, $stil4m$elm_syntax$Elm$Parser$Layout$layout, $stil4m$elm_syntax$Elm$Parser$Tokens$elseToken)),
						A2(
							$stil4m$elm_syntax$Combine$ignore,
							$stil4m$elm_syntax$Combine$maybe($stil4m$elm_syntax$Elm$Parser$Layout$layout),
							A2(
								$stil4m$elm_syntax$Combine$andMap,
								$stil4m$elm_syntax$Elm$Parser$Declarations$cyclic$expression(),
								A2(
									$stil4m$elm_syntax$Combine$ignore,
									$stil4m$elm_syntax$Combine$maybe($stil4m$elm_syntax$Elm$Parser$Layout$layout),
									A2(
										$stil4m$elm_syntax$Combine$ignore,
										$stil4m$elm_syntax$Elm$Parser$Tokens$thenToken,
										A2(
											$stil4m$elm_syntax$Combine$ignore,
											$stil4m$elm_syntax$Combine$maybe($stil4m$elm_syntax$Elm$Parser$Layout$layout),
											A2(
												$stil4m$elm_syntax$Combine$andMap,
												$stil4m$elm_syntax$Elm$Parser$Declarations$cyclic$expression(),
												A2(
													$stil4m$elm_syntax$Combine$ignore,
													$stil4m$elm_syntax$Combine$maybe($stil4m$elm_syntax$Elm$Parser$Layout$layout),
													$stil4m$elm_syntax$Combine$succeed($stil4m$elm_syntax$Elm$Syntax$Expression$IfBlock)))))))));
				}),
			$stil4m$elm_syntax$Elm$Parser$Tokens$ifToken));
}
function $stil4m$elm_syntax$Elm$Parser$Declarations$cyclic$lambdaExpression() {
	return $stil4m$elm_syntax$Combine$lazy(
		function (_v12) {
			return $stil4m$elm_syntax$Elm$Parser$Node$parser(
				A2(
					$stil4m$elm_syntax$Combine$andMap,
					A2(
						$stil4m$elm_syntax$Combine$continueWith,
						$stil4m$elm_syntax$Elm$Parser$Declarations$cyclic$expression(),
						$stil4m$elm_syntax$Elm$Parser$Layout$maybeAroundBothSides(
							$stil4m$elm_syntax$Combine$string('->'))),
					A2(
						$stil4m$elm_syntax$Combine$andMap,
						A2(
							$stil4m$elm_syntax$Combine$sepBy1,
							$stil4m$elm_syntax$Combine$maybe($stil4m$elm_syntax$Elm$Parser$Layout$layout),
							$stil4m$elm_syntax$Elm$Parser$Declarations$functionArgument),
						A2(
							$stil4m$elm_syntax$Combine$ignore,
							$stil4m$elm_syntax$Combine$maybe($stil4m$elm_syntax$Elm$Parser$Layout$layout),
							A2(
								$stil4m$elm_syntax$Combine$ignore,
								$stil4m$elm_syntax$Combine$string('\\'),
								$stil4m$elm_syntax$Combine$succeed(
									F2(
										function (args, expr) {
											return $stil4m$elm_syntax$Elm$Syntax$Expression$LambdaExpression(
												A2($stil4m$elm_syntax$Elm$Syntax$Expression$Lambda, args, expr));
										})))))));
		});
}
function $stil4m$elm_syntax$Elm$Parser$Declarations$cyclic$letBlock() {
	return $stil4m$elm_syntax$Combine$lazy(
		function (_v11) {
			return A2(
				$stil4m$elm_syntax$Combine$ignore,
				A2(
					$stil4m$elm_syntax$Combine$continueWith,
					$stil4m$elm_syntax$Combine$string('in'),
					$stil4m$elm_syntax$Combine$choice(
						_List_fromArray(
							[$stil4m$elm_syntax$Elm$Parser$Layout$layout, $stil4m$elm_syntax$Elm$Parser$Whitespace$manySpaces]))),
				A2(
					$stil4m$elm_syntax$Combine$continueWith,
					$stil4m$elm_syntax$Elm$Parser$Declarations$withIndentedState(
						$stil4m$elm_syntax$Elm$Parser$Declarations$cyclic$letBody()),
					A2(
						$stil4m$elm_syntax$Combine$continueWith,
						$stil4m$elm_syntax$Elm$Parser$Layout$layout,
						$stil4m$elm_syntax$Combine$string('let'))));
		});
}
function $stil4m$elm_syntax$Elm$Parser$Declarations$cyclic$letBody() {
	return $stil4m$elm_syntax$Combine$lazy(
		function (_v8) {
			var blockElement = A2(
				$stil4m$elm_syntax$Combine$andThen,
				function (_v9) {
					var r = _v9.a;
					var p = _v9.b;
					if (p.$ === 11) {
						var v = p.a;
						return A2(
							$stil4m$elm_syntax$Combine$map,
							$stil4m$elm_syntax$Elm$Syntax$Expression$LetFunction,
							$stil4m$elm_syntax$Elm$Parser$Declarations$functionWithNameNode(
								A2($stil4m$elm_syntax$Elm$Syntax$Node$Node, r, v)));
					} else {
						return $stil4m$elm_syntax$Elm$Parser$Declarations$letDestructuringDeclarationWithPattern(
							A2($stil4m$elm_syntax$Elm$Syntax$Node$Node, r, p));
					}
				},
				$stil4m$elm_syntax$Elm$Parser$Patterns$pattern);
			return A2(
				$stil4m$elm_syntax$Combine$andMap,
				$stil4m$elm_syntax$Combine$many(
					A2(
						$stil4m$elm_syntax$Combine$ignore,
						$stil4m$elm_syntax$Combine$maybe($stil4m$elm_syntax$Elm$Parser$Layout$layout),
						$stil4m$elm_syntax$Elm$Parser$Node$parser(blockElement))),
				A2(
					$stil4m$elm_syntax$Combine$andMap,
					$stil4m$elm_syntax$Elm$Parser$Node$parser(blockElement),
					$stil4m$elm_syntax$Combine$succeed($elm$core$List$cons)));
		});
}
function $stil4m$elm_syntax$Elm$Parser$Declarations$cyclic$letExpression() {
	return $stil4m$elm_syntax$Combine$lazy(
		function (_v6) {
			return $stil4m$elm_syntax$Elm$Parser$Node$parser(
				A2(
					$stil4m$elm_syntax$Combine$andMap,
					A2(
						$stil4m$elm_syntax$Combine$continueWith,
						$stil4m$elm_syntax$Elm$Parser$Declarations$cyclic$expression(),
						$stil4m$elm_syntax$Elm$Parser$Layout$layout),
					A2(
						$stil4m$elm_syntax$Combine$andMap,
						$stil4m$elm_syntax$Elm$Parser$Declarations$cyclic$letBlock(),
						$stil4m$elm_syntax$Combine$succeed(
							function (decls) {
								return A2(
									$elm$core$Basics$composeR,
									$stil4m$elm_syntax$Elm$Syntax$Expression$LetBlock(decls),
									$stil4m$elm_syntax$Elm$Syntax$Expression$LetExpression);
							}))));
		});
}
function $stil4m$elm_syntax$Elm$Parser$Declarations$cyclic$listExpression() {
	return $stil4m$elm_syntax$Combine$lazy(
		function (_v5) {
			var innerExpressions = A2(
				$stil4m$elm_syntax$Combine$map,
				$stil4m$elm_syntax$Elm$Syntax$Expression$ListExpr,
				A2(
					$stil4m$elm_syntax$Combine$andMap,
					$stil4m$elm_syntax$Combine$many(
						A2(
							$stil4m$elm_syntax$Combine$continueWith,
							$stil4m$elm_syntax$Elm$Parser$Declarations$cyclic$expression(),
							A2(
								$stil4m$elm_syntax$Combine$ignore,
								$stil4m$elm_syntax$Combine$maybe($stil4m$elm_syntax$Elm$Parser$Layout$layout),
								$stil4m$elm_syntax$Combine$string(',')))),
					A2(
						$stil4m$elm_syntax$Combine$ignore,
						$stil4m$elm_syntax$Combine$maybe($stil4m$elm_syntax$Elm$Parser$Layout$layout),
						A2(
							$stil4m$elm_syntax$Combine$andMap,
							$stil4m$elm_syntax$Elm$Parser$Declarations$cyclic$expression(),
							$stil4m$elm_syntax$Combine$succeed($elm$core$List$cons)))));
			return $stil4m$elm_syntax$Elm$Parser$Node$parser(
				A2(
					$stil4m$elm_syntax$Combine$continueWith,
					$stil4m$elm_syntax$Combine$choice(
						_List_fromArray(
							[
								A2(
								$stil4m$elm_syntax$Combine$map,
								$elm$core$Basics$always(
									$stil4m$elm_syntax$Elm$Syntax$Expression$ListExpr(_List_Nil)),
								$stil4m$elm_syntax$Combine$string(']')),
								A2(
								$stil4m$elm_syntax$Combine$ignore,
								$stil4m$elm_syntax$Combine$string(']'),
								innerExpressions)
							])),
					A2(
						$stil4m$elm_syntax$Combine$ignore,
						$stil4m$elm_syntax$Combine$maybe($stil4m$elm_syntax$Elm$Parser$Layout$layout),
						$stil4m$elm_syntax$Combine$string('['))));
		});
}
function $stil4m$elm_syntax$Elm$Parser$Declarations$cyclic$operatorExpression() {
	var negationExpression = $stil4m$elm_syntax$Combine$lazy(
		function (_v4) {
			return A2(
				$stil4m$elm_syntax$Combine$map,
				$stil4m$elm_syntax$Elm$Syntax$Expression$Negation,
				A2(
					$stil4m$elm_syntax$Combine$andThen,
					$stil4m$elm_syntax$Elm$Parser$Declarations$liftRecordAccess,
					$stil4m$elm_syntax$Combine$choice(
						_List_fromArray(
							[
								$stil4m$elm_syntax$Elm$Parser$Declarations$referenceExpression,
								$stil4m$elm_syntax$Elm$Parser$Declarations$numberExpression,
								$stil4m$elm_syntax$Elm$Parser$Declarations$cyclic$tupledExpression()
							]))));
		});
	return $stil4m$elm_syntax$Combine$lazy(
		function (_v3) {
			return $stil4m$elm_syntax$Combine$choice(
				_List_fromArray(
					[
						$stil4m$elm_syntax$Elm$Parser$Node$parser(
						A2(
							$stil4m$elm_syntax$Combine$continueWith,
							$stil4m$elm_syntax$Combine$choice(
								_List_fromArray(
									[
										negationExpression,
										A2(
										$stil4m$elm_syntax$Combine$ignore,
										$stil4m$elm_syntax$Elm$Parser$Layout$layout,
										$stil4m$elm_syntax$Combine$succeed(
											$stil4m$elm_syntax$Elm$Syntax$Expression$Operator('-')))
									])),
							$stil4m$elm_syntax$Combine$string('-'))),
						$stil4m$elm_syntax$Elm$Parser$Node$parser(
						A2($stil4m$elm_syntax$Combine$map, $stil4m$elm_syntax$Elm$Syntax$Expression$Operator, $stil4m$elm_syntax$Elm$Parser$Tokens$infixOperatorToken))
					]));
		});
}
function $stil4m$elm_syntax$Elm$Parser$Declarations$cyclic$recordExpression() {
	return $stil4m$elm_syntax$Elm$Parser$Node$parser(
		$stil4m$elm_syntax$Combine$lazy(
			function (_v2) {
				var recordField = $stil4m$elm_syntax$Elm$Parser$Node$parser(
					A2(
						$stil4m$elm_syntax$Combine$andMap,
						$stil4m$elm_syntax$Elm$Parser$Declarations$cyclic$expression(),
						A2(
							$stil4m$elm_syntax$Combine$ignore,
							$stil4m$elm_syntax$Combine$maybe($stil4m$elm_syntax$Elm$Parser$Layout$layout),
							A2(
								$stil4m$elm_syntax$Combine$ignore,
								$stil4m$elm_syntax$Combine$string('='),
								A2(
									$stil4m$elm_syntax$Combine$ignore,
									$stil4m$elm_syntax$Combine$maybe($stil4m$elm_syntax$Elm$Parser$Layout$layout),
									A2(
										$stil4m$elm_syntax$Combine$andMap,
										$stil4m$elm_syntax$Elm$Parser$Node$parser($stil4m$elm_syntax$Elm$Parser$Tokens$functionName),
										$stil4m$elm_syntax$Combine$succeed($elm$core$Tuple$pair)))))));
				var recordFields = A2(
					$stil4m$elm_syntax$Combine$andMap,
					$stil4m$elm_syntax$Combine$many(
						A2(
							$stil4m$elm_syntax$Combine$ignore,
							$stil4m$elm_syntax$Combine$maybe($stil4m$elm_syntax$Elm$Parser$Layout$layout),
							A2(
								$stil4m$elm_syntax$Combine$continueWith,
								recordField,
								A2(
									$stil4m$elm_syntax$Combine$ignore,
									$stil4m$elm_syntax$Combine$maybe($stil4m$elm_syntax$Elm$Parser$Layout$layout),
									$stil4m$elm_syntax$Combine$string(','))))),
					A2(
						$stil4m$elm_syntax$Combine$ignore,
						$stil4m$elm_syntax$Combine$maybe($stil4m$elm_syntax$Elm$Parser$Layout$layout),
						A2(
							$stil4m$elm_syntax$Combine$andMap,
							recordField,
							$stil4m$elm_syntax$Combine$succeed($elm$core$List$cons))));
				var recordUpdateSyntaxParser = function (fname) {
					return A2(
						$stil4m$elm_syntax$Combine$ignore,
						$stil4m$elm_syntax$Combine$string('}'),
						A2(
							$stil4m$elm_syntax$Combine$map,
							function (e) {
								return A2($stil4m$elm_syntax$Elm$Syntax$Expression$RecordUpdateExpression, fname, e);
							},
							A2(
								$stil4m$elm_syntax$Combine$continueWith,
								recordFields,
								A2(
									$stil4m$elm_syntax$Combine$ignore,
									$stil4m$elm_syntax$Combine$maybe($stil4m$elm_syntax$Elm$Parser$Layout$layout),
									$stil4m$elm_syntax$Combine$string('|')))));
				};
				var recordContents = A2(
					$stil4m$elm_syntax$Combine$andThen,
					function (fname) {
						return $stil4m$elm_syntax$Combine$choice(
							_List_fromArray(
								[
									recordUpdateSyntaxParser(fname),
									A2(
									$stil4m$elm_syntax$Combine$andThen,
									function (fieldUpdate) {
										return $stil4m$elm_syntax$Combine$choice(
											_List_fromArray(
												[
													A2(
													$stil4m$elm_syntax$Combine$map,
													$elm$core$Basics$always(
														$stil4m$elm_syntax$Elm$Syntax$Expression$RecordExpr(
															_List_fromArray(
																[fieldUpdate]))),
													$stil4m$elm_syntax$Combine$string('}')),
													A2(
													$stil4m$elm_syntax$Combine$ignore,
													$stil4m$elm_syntax$Combine$string('}'),
													A2(
														$stil4m$elm_syntax$Combine$map,
														function (fieldUpdates) {
															return $stil4m$elm_syntax$Elm$Syntax$Expression$RecordExpr(
																A2($elm$core$List$cons, fieldUpdate, fieldUpdates));
														},
														A2(
															$stil4m$elm_syntax$Combine$continueWith,
															recordFields,
															A2(
																$stil4m$elm_syntax$Combine$ignore,
																$stil4m$elm_syntax$Combine$maybe($stil4m$elm_syntax$Elm$Parser$Layout$layout),
																$stil4m$elm_syntax$Combine$string(',')))))
												]));
									},
									A2(
										$stil4m$elm_syntax$Combine$ignore,
										$stil4m$elm_syntax$Combine$maybe($stil4m$elm_syntax$Elm$Parser$Layout$layout),
										A2(
											$stil4m$elm_syntax$Combine$continueWith,
											A2(
												$stil4m$elm_syntax$Combine$map,
												function (e) {
													return A3($stil4m$elm_syntax$Elm$Syntax$Node$combine, $elm$core$Tuple$pair, fname, e);
												},
												$stil4m$elm_syntax$Elm$Parser$Declarations$cyclic$expression()),
											A2(
												$stil4m$elm_syntax$Combine$ignore,
												$stil4m$elm_syntax$Combine$maybe($stil4m$elm_syntax$Elm$Parser$Layout$layout),
												$stil4m$elm_syntax$Combine$string('=')))))
								]));
					},
					A2(
						$stil4m$elm_syntax$Combine$ignore,
						$stil4m$elm_syntax$Combine$maybe($stil4m$elm_syntax$Elm$Parser$Layout$layout),
						$stil4m$elm_syntax$Elm$Parser$Node$parser($stil4m$elm_syntax$Elm$Parser$Tokens$functionName)));
				return A2(
					$stil4m$elm_syntax$Combine$continueWith,
					$stil4m$elm_syntax$Combine$choice(
						_List_fromArray(
							[
								A2(
								$stil4m$elm_syntax$Combine$map,
								$elm$core$Basics$always(
									$stil4m$elm_syntax$Elm$Syntax$Expression$RecordExpr(_List_Nil)),
								$stil4m$elm_syntax$Combine$string('}')),
								recordContents
							])),
					A2(
						$stil4m$elm_syntax$Combine$ignore,
						$stil4m$elm_syntax$Combine$maybe($stil4m$elm_syntax$Elm$Parser$Layout$layout),
						$stil4m$elm_syntax$Combine$string('{')));
			}));
}
function $stil4m$elm_syntax$Elm$Parser$Declarations$cyclic$tupledExpression() {
	return $stil4m$elm_syntax$Combine$lazy(
		function (_v0) {
			var commaSep = $stil4m$elm_syntax$Combine$many(
				A2(
					$stil4m$elm_syntax$Combine$ignore,
					$stil4m$elm_syntax$Combine$maybe($stil4m$elm_syntax$Elm$Parser$Layout$layout),
					A2(
						$stil4m$elm_syntax$Combine$continueWith,
						$stil4m$elm_syntax$Elm$Parser$Declarations$cyclic$expression(),
						A2(
							$stil4m$elm_syntax$Combine$ignore,
							$stil4m$elm_syntax$Combine$maybe($stil4m$elm_syntax$Elm$Parser$Layout$layout),
							$stil4m$elm_syntax$Combine$string(',')))));
			var closingParen = $stil4m$elm_syntax$Combine$fromCore(
				$elm$parser$Parser$symbol(')'));
			var asExpression = F2(
				function (x, xs) {
					if (!xs.b) {
						return $stil4m$elm_syntax$Elm$Syntax$Expression$ParenthesizedExpression(x);
					} else {
						return $stil4m$elm_syntax$Elm$Syntax$Expression$TupledExpression(
							A2($elm$core$List$cons, x, xs));
					}
				});
			var nested = A2(
				$stil4m$elm_syntax$Combine$andMap,
				commaSep,
				A2(
					$stil4m$elm_syntax$Combine$ignore,
					$stil4m$elm_syntax$Combine$maybe($stil4m$elm_syntax$Elm$Parser$Layout$layout),
					A2(
						$stil4m$elm_syntax$Combine$andMap,
						$stil4m$elm_syntax$Elm$Parser$Declarations$cyclic$expression(),
						A2(
							$stil4m$elm_syntax$Combine$ignore,
							$stil4m$elm_syntax$Combine$maybe($stil4m$elm_syntax$Elm$Parser$Layout$layout),
							$stil4m$elm_syntax$Combine$succeed(asExpression)))));
			return $stil4m$elm_syntax$Elm$Parser$Node$parser(
				A2(
					$stil4m$elm_syntax$Combine$continueWith,
					$stil4m$elm_syntax$Combine$choice(
						_List_fromArray(
							[
								A2(
								$stil4m$elm_syntax$Combine$map,
								$elm$core$Basics$always($stil4m$elm_syntax$Elm$Syntax$Expression$UnitExpr),
								closingParen),
								$stil4m$elm_syntax$Combine$backtrackable(
								A2(
									$stil4m$elm_syntax$Combine$map,
									$stil4m$elm_syntax$Elm$Syntax$Expression$PrefixOperator,
									A2($stil4m$elm_syntax$Combine$ignore, closingParen, $stil4m$elm_syntax$Elm$Parser$Tokens$prefixOperatorToken))),
								A2($stil4m$elm_syntax$Combine$ignore, closingParen, nested)
							])),
					$stil4m$elm_syntax$Combine$fromCore(
						$elm$parser$Parser$symbol('('))));
		});
}
var $stil4m$elm_syntax$Elm$Parser$Declarations$caseBlock = $stil4m$elm_syntax$Elm$Parser$Declarations$cyclic$caseBlock();
$stil4m$elm_syntax$Elm$Parser$Declarations$cyclic$caseBlock = function () {
	return $stil4m$elm_syntax$Elm$Parser$Declarations$caseBlock;
};
var $stil4m$elm_syntax$Elm$Parser$Declarations$caseExpression = $stil4m$elm_syntax$Elm$Parser$Declarations$cyclic$caseExpression();
$stil4m$elm_syntax$Elm$Parser$Declarations$cyclic$caseExpression = function () {
	return $stil4m$elm_syntax$Elm$Parser$Declarations$caseExpression;
};
var $stil4m$elm_syntax$Elm$Parser$Declarations$caseStatement = $stil4m$elm_syntax$Elm$Parser$Declarations$cyclic$caseStatement();
$stil4m$elm_syntax$Elm$Parser$Declarations$cyclic$caseStatement = function () {
	return $stil4m$elm_syntax$Elm$Parser$Declarations$caseStatement;
};
var $stil4m$elm_syntax$Elm$Parser$Declarations$caseStatements = $stil4m$elm_syntax$Elm$Parser$Declarations$cyclic$caseStatements();
$stil4m$elm_syntax$Elm$Parser$Declarations$cyclic$caseStatements = function () {
	return $stil4m$elm_syntax$Elm$Parser$Declarations$caseStatements;
};
var $stil4m$elm_syntax$Elm$Parser$Declarations$expression = $stil4m$elm_syntax$Elm$Parser$Declarations$cyclic$expression();
$stil4m$elm_syntax$Elm$Parser$Declarations$cyclic$expression = function () {
	return $stil4m$elm_syntax$Elm$Parser$Declarations$expression;
};
var $stil4m$elm_syntax$Elm$Parser$Declarations$expressionNotApplication = $stil4m$elm_syntax$Elm$Parser$Declarations$cyclic$expressionNotApplication();
$stil4m$elm_syntax$Elm$Parser$Declarations$cyclic$expressionNotApplication = function () {
	return $stil4m$elm_syntax$Elm$Parser$Declarations$expressionNotApplication;
};
var $stil4m$elm_syntax$Elm$Parser$Declarations$ifBlockExpression = $stil4m$elm_syntax$Elm$Parser$Declarations$cyclic$ifBlockExpression();
$stil4m$elm_syntax$Elm$Parser$Declarations$cyclic$ifBlockExpression = function () {
	return $stil4m$elm_syntax$Elm$Parser$Declarations$ifBlockExpression;
};
var $stil4m$elm_syntax$Elm$Parser$Declarations$lambdaExpression = $stil4m$elm_syntax$Elm$Parser$Declarations$cyclic$lambdaExpression();
$stil4m$elm_syntax$Elm$Parser$Declarations$cyclic$lambdaExpression = function () {
	return $stil4m$elm_syntax$Elm$Parser$Declarations$lambdaExpression;
};
var $stil4m$elm_syntax$Elm$Parser$Declarations$letBlock = $stil4m$elm_syntax$Elm$Parser$Declarations$cyclic$letBlock();
$stil4m$elm_syntax$Elm$Parser$Declarations$cyclic$letBlock = function () {
	return $stil4m$elm_syntax$Elm$Parser$Declarations$letBlock;
};
var $stil4m$elm_syntax$Elm$Parser$Declarations$letBody = $stil4m$elm_syntax$Elm$Parser$Declarations$cyclic$letBody();
$stil4m$elm_syntax$Elm$Parser$Declarations$cyclic$letBody = function () {
	return $stil4m$elm_syntax$Elm$Parser$Declarations$letBody;
};
var $stil4m$elm_syntax$Elm$Parser$Declarations$letExpression = $stil4m$elm_syntax$Elm$Parser$Declarations$cyclic$letExpression();
$stil4m$elm_syntax$Elm$Parser$Declarations$cyclic$letExpression = function () {
	return $stil4m$elm_syntax$Elm$Parser$Declarations$letExpression;
};
var $stil4m$elm_syntax$Elm$Parser$Declarations$listExpression = $stil4m$elm_syntax$Elm$Parser$Declarations$cyclic$listExpression();
$stil4m$elm_syntax$Elm$Parser$Declarations$cyclic$listExpression = function () {
	return $stil4m$elm_syntax$Elm$Parser$Declarations$listExpression;
};
var $stil4m$elm_syntax$Elm$Parser$Declarations$operatorExpression = $stil4m$elm_syntax$Elm$Parser$Declarations$cyclic$operatorExpression();
$stil4m$elm_syntax$Elm$Parser$Declarations$cyclic$operatorExpression = function () {
	return $stil4m$elm_syntax$Elm$Parser$Declarations$operatorExpression;
};
var $stil4m$elm_syntax$Elm$Parser$Declarations$recordExpression = $stil4m$elm_syntax$Elm$Parser$Declarations$cyclic$recordExpression();
$stil4m$elm_syntax$Elm$Parser$Declarations$cyclic$recordExpression = function () {
	return $stil4m$elm_syntax$Elm$Parser$Declarations$recordExpression;
};
var $stil4m$elm_syntax$Elm$Parser$Declarations$tupledExpression = $stil4m$elm_syntax$Elm$Parser$Declarations$cyclic$tupledExpression();
$stil4m$elm_syntax$Elm$Parser$Declarations$cyclic$tupledExpression = function () {
	return $stil4m$elm_syntax$Elm$Parser$Declarations$tupledExpression;
};
var $stil4m$elm_syntax$Elm$Parser$Declarations$destructuringDeclaration = $stil4m$elm_syntax$Combine$lazy(
	function (_v0) {
		return A2(
			$stil4m$elm_syntax$Combine$andMap,
			$stil4m$elm_syntax$Elm$Parser$Declarations$expression,
			A2(
				$stil4m$elm_syntax$Combine$ignore,
				$stil4m$elm_syntax$Elm$Parser$Layout$layout,
				A2(
					$stil4m$elm_syntax$Combine$ignore,
					$stil4m$elm_syntax$Combine$string('='),
					A2(
						$stil4m$elm_syntax$Combine$andMap,
						$stil4m$elm_syntax$Elm$Parser$Patterns$pattern,
						$stil4m$elm_syntax$Combine$succeed(
							F2(
								function (x, y) {
									return A3($stil4m$elm_syntax$Elm$Syntax$Node$combine, $stil4m$elm_syntax$Elm$Syntax$Declaration$Destructuring, x, y);
								}))))));
	});
var $stil4m$elm_syntax$Elm$Syntax$Expression$functionRange = function (_function) {
	return $stil4m$elm_syntax$Elm$Syntax$Range$combine(
		_List_fromArray(
			[
				function () {
				var _v0 = _function.aM;
				if (!_v0.$) {
					var documentation = _v0.a;
					return $stil4m$elm_syntax$Elm$Syntax$Node$range(documentation);
				} else {
					return A2(
						$elm$core$Maybe$withDefault,
						function (_v3) {
							var r = _v3.a;
							return r;
						}(
							$stil4m$elm_syntax$Elm$Syntax$Node$value(_function.aK).f),
						A2(
							$elm$core$Maybe$map,
							function (_v1) {
								var value = _v1.b;
								var _v2 = value.f;
								var r = _v2.a;
								return r;
							},
							_function.a$));
				}
			}(),
				function (_v4) {
				var r = _v4.a;
				return r;
			}(
				$stil4m$elm_syntax$Elm$Syntax$Node$value(_function.aK).z)
			]));
};
var $stil4m$elm_syntax$Elm$Parser$Declarations$function = $stil4m$elm_syntax$Combine$lazy(
	function (_v0) {
		return A2(
			$stil4m$elm_syntax$Combine$map,
			function (f) {
				return A2(
					$stil4m$elm_syntax$Elm$Syntax$Node$Node,
					$stil4m$elm_syntax$Elm$Syntax$Expression$functionRange(f),
					$stil4m$elm_syntax$Elm$Syntax$Declaration$FunctionDeclaration(f));
			},
			A2(
				$stil4m$elm_syntax$Combine$andThen,
				$stil4m$elm_syntax$Elm$Parser$Declarations$functionWithNameNode,
				A2(
					$stil4m$elm_syntax$Combine$ignore,
					$stil4m$elm_syntax$Combine$maybe($stil4m$elm_syntax$Elm$Parser$Layout$layout),
					$stil4m$elm_syntax$Elm$Parser$Node$parser($stil4m$elm_syntax$Elm$Parser$Tokens$functionName))));
	});
var $stil4m$elm_syntax$Elm$Syntax$Declaration$InfixDeclaration = function (a) {
	return {$: 4, a: a};
};
var $stil4m$elm_syntax$Elm$Syntax$Infix$Infix = F4(
	function (direction, precedence, operator, _function) {
		return {aL: direction, aN: _function, aY: operator, aZ: precedence};
	});
var $stil4m$elm_syntax$Elm$Syntax$Infix$Non = 2;
var $stil4m$elm_syntax$Elm$Parser$Infix$infixDirection = $stil4m$elm_syntax$Combine$choice(
	_List_fromArray(
		[
			A2(
			$stil4m$elm_syntax$Combine$ignore,
			$stil4m$elm_syntax$Combine$string('right'),
			$stil4m$elm_syntax$Combine$succeed(1)),
			A2(
			$stil4m$elm_syntax$Combine$ignore,
			$stil4m$elm_syntax$Combine$string('left'),
			$stil4m$elm_syntax$Combine$succeed(0)),
			A2(
			$stil4m$elm_syntax$Combine$ignore,
			$stil4m$elm_syntax$Combine$string('non'),
			$stil4m$elm_syntax$Combine$succeed(2))
		]));
var $elm$parser$Parser$Advanced$int = F2(
	function (expecting, invalid) {
		return $elm$parser$Parser$Advanced$number(
			{
				Z: $elm$core$Result$Err(invalid),
				ag: expecting,
				ah: $elm$core$Result$Err(invalid),
				am: $elm$core$Result$Err(invalid),
				ap: $elm$core$Result$Ok($elm$core$Basics$identity),
				aS: invalid,
				as: $elm$core$Result$Err(invalid)
			});
	});
var $elm$parser$Parser$int = A2($elm$parser$Parser$Advanced$int, $elm$parser$Parser$ExpectingInt, $elm$parser$Parser$ExpectingInt);
var $stil4m$elm_syntax$Combine$Num$int = $stil4m$elm_syntax$Combine$fromCore($elm$parser$Parser$int);
var $stil4m$elm_syntax$Elm$Parser$Infix$infixDefinition = A2(
	$stil4m$elm_syntax$Combine$andMap,
	$stil4m$elm_syntax$Elm$Parser$Node$parser($stil4m$elm_syntax$Elm$Parser$Tokens$functionName),
	A2(
		$stil4m$elm_syntax$Combine$ignore,
		$stil4m$elm_syntax$Elm$Parser$Layout$layout,
		A2(
			$stil4m$elm_syntax$Combine$ignore,
			$stil4m$elm_syntax$Combine$string('='),
			A2(
				$stil4m$elm_syntax$Combine$ignore,
				$stil4m$elm_syntax$Elm$Parser$Layout$layout,
				A2(
					$stil4m$elm_syntax$Combine$andMap,
					$stil4m$elm_syntax$Elm$Parser$Node$parser(
						$stil4m$elm_syntax$Combine$parens($stil4m$elm_syntax$Elm$Parser$Tokens$prefixOperatorToken)),
					A2(
						$stil4m$elm_syntax$Combine$ignore,
						$stil4m$elm_syntax$Elm$Parser$Layout$layout,
						A2(
							$stil4m$elm_syntax$Combine$andMap,
							$stil4m$elm_syntax$Elm$Parser$Node$parser($stil4m$elm_syntax$Combine$Num$int),
							A2(
								$stil4m$elm_syntax$Combine$ignore,
								$stil4m$elm_syntax$Elm$Parser$Layout$layout,
								A2(
									$stil4m$elm_syntax$Combine$andMap,
									$stil4m$elm_syntax$Elm$Parser$Node$parser($stil4m$elm_syntax$Elm$Parser$Infix$infixDirection),
									A2(
										$stil4m$elm_syntax$Combine$ignore,
										$stil4m$elm_syntax$Elm$Parser$Layout$layout,
										A2(
											$stil4m$elm_syntax$Combine$ignore,
											$stil4m$elm_syntax$Combine$fromCore(
												$elm$parser$Parser$keyword('infix')),
											$stil4m$elm_syntax$Combine$succeed($stil4m$elm_syntax$Elm$Syntax$Infix$Infix))))))))))));
var $stil4m$elm_syntax$Elm$Parser$Ranges$asPointerLocation = function (_v0) {
	var line = _v0.x;
	var column = _v0.aa;
	return {aa: column, aA: line};
};
var $stil4m$elm_syntax$Elm$Parser$Ranges$withCurrentPoint = function (p) {
	return $stil4m$elm_syntax$Combine$withLocation(
		function (start) {
			var k = $stil4m$elm_syntax$Elm$Parser$Ranges$asPointerLocation(start);
			return p(
				{af: k, V: k});
		});
};
var $stil4m$elm_syntax$Elm$Parser$Declarations$infixDeclaration = $stil4m$elm_syntax$Elm$Parser$Ranges$withCurrentPoint(
	function (current) {
		return A2(
			$stil4m$elm_syntax$Combine$map,
			function (inf) {
				return A2(
					$stil4m$elm_syntax$Elm$Syntax$Node$Node,
					$stil4m$elm_syntax$Elm$Syntax$Range$combine(
						_List_fromArray(
							[
								current,
								$stil4m$elm_syntax$Elm$Syntax$Node$range(inf.aN)
							])),
					$stil4m$elm_syntax$Elm$Syntax$Declaration$InfixDeclaration(inf));
			},
			$stil4m$elm_syntax$Elm$Parser$Infix$infixDefinition);
	});
var $stil4m$elm_syntax$Elm$Syntax$Declaration$PortDeclaration = function (a) {
	return {$: 3, a: a};
};
var $stil4m$elm_syntax$Elm$Parser$Tokens$portToken = $stil4m$elm_syntax$Combine$string('port');
var $stil4m$elm_syntax$Elm$Parser$Declarations$signature = A2(
	$stil4m$elm_syntax$Combine$andMap,
	A2(
		$stil4m$elm_syntax$Combine$continueWith,
		$stil4m$elm_syntax$Elm$Parser$TypeAnnotation$typeAnnotation,
		A2(
			$stil4m$elm_syntax$Combine$continueWith,
			$stil4m$elm_syntax$Combine$maybe($stil4m$elm_syntax$Elm$Parser$Layout$layout),
			$stil4m$elm_syntax$Elm$Parser$Layout$maybeAroundBothSides(
				$stil4m$elm_syntax$Combine$string(':')))),
	A2(
		$stil4m$elm_syntax$Combine$andMap,
		$stil4m$elm_syntax$Elm$Parser$Node$parser($stil4m$elm_syntax$Elm$Parser$Tokens$functionName),
		$stil4m$elm_syntax$Combine$succeed($stil4m$elm_syntax$Elm$Syntax$Signature$Signature)));
var $stil4m$elm_syntax$Elm$Parser$Declarations$portDeclaration = $stil4m$elm_syntax$Elm$Parser$Ranges$withCurrentPoint(
	function (current) {
		return A2(
			$stil4m$elm_syntax$Combine$map,
			function (sig) {
				return A2(
					$stil4m$elm_syntax$Elm$Syntax$Node$Node,
					$stil4m$elm_syntax$Elm$Syntax$Range$combine(
						_List_fromArray(
							[
								current,
								function (_v0) {
								var r = _v0.a;
								return r;
							}(sig.a2)
							])),
					$stil4m$elm_syntax$Elm$Syntax$Declaration$PortDeclaration(sig));
			},
			A2(
				$stil4m$elm_syntax$Combine$continueWith,
				$stil4m$elm_syntax$Elm$Parser$Declarations$signature,
				A2($stil4m$elm_syntax$Combine$ignore, $stil4m$elm_syntax$Elm$Parser$Layout$layout, $stil4m$elm_syntax$Elm$Parser$Tokens$portToken)));
	});
var $stil4m$elm_syntax$Elm$Parser$Typings$DefinedAlias = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $stil4m$elm_syntax$Elm$Parser$Typings$DefinedType = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $stil4m$elm_syntax$Elm$Syntax$Type$Type = F4(
	function (documentation, name, generics, constructors) {
		return {B: constructors, aM: documentation, al: generics, f: name};
	});
var $stil4m$elm_syntax$Elm$Syntax$TypeAlias$TypeAlias = F4(
	function (documentation, name, generics, typeAnnotation) {
		return {aM: documentation, al: generics, f: name, a2: typeAnnotation};
	});
var $stil4m$elm_syntax$Elm$Parser$Typings$genericList = $stil4m$elm_syntax$Combine$many(
	A2(
		$stil4m$elm_syntax$Combine$ignore,
		$stil4m$elm_syntax$Elm$Parser$Layout$layout,
		$stil4m$elm_syntax$Elm$Parser$Node$parser($stil4m$elm_syntax$Elm$Parser$Tokens$functionName)));
var $stil4m$elm_syntax$Elm$Parser$Typings$typePrefix = A2(
	$stil4m$elm_syntax$Combine$continueWith,
	$stil4m$elm_syntax$Elm$Parser$Layout$layout,
	$stil4m$elm_syntax$Combine$string('type'));
var $stil4m$elm_syntax$Elm$Syntax$Type$ValueConstructor = F2(
	function (name, _arguments) {
		return {w: _arguments, f: name};
	});
var $stil4m$elm_syntax$Elm$Parser$TypeAnnotation$typeAnnotationNonGreedy = $stil4m$elm_syntax$Combine$choice(
	_List_fromArray(
		[
			$stil4m$elm_syntax$Elm$Parser$TypeAnnotation$parensTypeAnnotation,
			$stil4m$elm_syntax$Elm$Parser$TypeAnnotation$typedTypeAnnotation(1),
			$stil4m$elm_syntax$Elm$Parser$TypeAnnotation$genericTypeAnnotation,
			$stil4m$elm_syntax$Elm$Parser$TypeAnnotation$recordTypeAnnotation
		]));
var $stil4m$elm_syntax$Elm$Parser$Typings$valueConstructor = A2(
	$stil4m$elm_syntax$Combine$andThen,
	function (tnn) {
		var range = tnn.a;
		var complete = function (args) {
			return $stil4m$elm_syntax$Combine$succeed(
				A2(
					$stil4m$elm_syntax$Elm$Syntax$Node$Node,
					$stil4m$elm_syntax$Elm$Syntax$Range$combine(
						A2(
							$elm$core$List$cons,
							range,
							A2($elm$core$List$map, $stil4m$elm_syntax$Elm$Syntax$Node$range, args))),
					A2($stil4m$elm_syntax$Elm$Syntax$Type$ValueConstructor, tnn, args)));
		};
		var argHelper = function (xs) {
			return A2(
				$stil4m$elm_syntax$Combine$continueWith,
				$stil4m$elm_syntax$Combine$choice(
					_List_fromArray(
						[
							A2(
							$stil4m$elm_syntax$Combine$andThen,
							function (ta) {
								return A2(
									$stil4m$elm_syntax$Elm$Parser$Layout$optimisticLayoutWith,
									function (_v0) {
										return $stil4m$elm_syntax$Combine$succeed(
											$elm$core$List$reverse(
												A2($elm$core$List$cons, ta, xs)));
									},
									function (_v1) {
										return argHelper(
											A2($elm$core$List$cons, ta, xs));
									});
							},
							$stil4m$elm_syntax$Elm$Parser$TypeAnnotation$typeAnnotationNonGreedy),
							$stil4m$elm_syntax$Combine$succeed(
							$elm$core$List$reverse(xs))
						])),
				$stil4m$elm_syntax$Combine$succeed(0));
		};
		return A2(
			$stil4m$elm_syntax$Elm$Parser$Layout$optimisticLayoutWith,
			function (_v2) {
				return complete(_List_Nil);
			},
			function (_v3) {
				return A2(
					$stil4m$elm_syntax$Combine$andThen,
					complete,
					argHelper(_List_Nil));
			});
	},
	A2(
		$stil4m$elm_syntax$Combine$continueWith,
		$stil4m$elm_syntax$Elm$Parser$Node$parser($stil4m$elm_syntax$Elm$Parser$Tokens$typeName),
		$stil4m$elm_syntax$Combine$succeed($stil4m$elm_syntax$Elm$Syntax$Type$ValueConstructor)));
var $stil4m$elm_syntax$Elm$Parser$Typings$valueConstructors = A2(
	$stil4m$elm_syntax$Combine$sepBy1,
	A2(
		$stil4m$elm_syntax$Combine$ignore,
		$stil4m$elm_syntax$Combine$maybe($stil4m$elm_syntax$Elm$Parser$Layout$layout),
		$stil4m$elm_syntax$Combine$string('|')),
	$stil4m$elm_syntax$Elm$Parser$Typings$valueConstructor);
var $stil4m$elm_syntax$Elm$Parser$Typings$typeDefinition = $stil4m$elm_syntax$Elm$Parser$Ranges$withCurrentPoint(
	function (start) {
		return A2(
			$stil4m$elm_syntax$Combine$continueWith,
			$stil4m$elm_syntax$Combine$choice(
				_List_fromArray(
					[
						A2(
						$stil4m$elm_syntax$Combine$map,
						function (typeAlias) {
							return A2(
								$stil4m$elm_syntax$Elm$Parser$Typings$DefinedAlias,
								$stil4m$elm_syntax$Elm$Syntax$Range$combine(
									_List_fromArray(
										[
											start,
											$stil4m$elm_syntax$Elm$Syntax$Node$range(typeAlias.a2)
										])),
								typeAlias);
						},
						A2(
							$stil4m$elm_syntax$Combine$andMap,
							$stil4m$elm_syntax$Elm$Parser$TypeAnnotation$typeAnnotation,
							A2(
								$stil4m$elm_syntax$Combine$ignore,
								$stil4m$elm_syntax$Elm$Parser$Layout$layout,
								A2(
									$stil4m$elm_syntax$Combine$ignore,
									$stil4m$elm_syntax$Combine$string('='),
									A2(
										$stil4m$elm_syntax$Combine$andMap,
										$stil4m$elm_syntax$Elm$Parser$Typings$genericList,
										A2(
											$stil4m$elm_syntax$Combine$andMap,
											A2(
												$stil4m$elm_syntax$Combine$ignore,
												$stil4m$elm_syntax$Elm$Parser$Layout$layout,
												$stil4m$elm_syntax$Elm$Parser$Node$parser($stil4m$elm_syntax$Elm$Parser$Tokens$typeName)),
											A2(
												$stil4m$elm_syntax$Combine$ignore,
												A2(
													$stil4m$elm_syntax$Combine$continueWith,
													$stil4m$elm_syntax$Elm$Parser$Layout$layout,
													$stil4m$elm_syntax$Combine$string('alias')),
												$stil4m$elm_syntax$Combine$succeed(
													$stil4m$elm_syntax$Elm$Syntax$TypeAlias$TypeAlias($elm$core$Maybe$Nothing))))))))),
						A2(
						$stil4m$elm_syntax$Combine$map,
						function (tipe) {
							return A2(
								$stil4m$elm_syntax$Elm$Parser$Typings$DefinedType,
								$stil4m$elm_syntax$Elm$Syntax$Range$combine(
									A2(
										$elm$core$List$cons,
										start,
										A2(
											$elm$core$List$map,
											function (_v0) {
												var r = _v0.a;
												return r;
											},
											tipe.B))),
								tipe);
						},
						A2(
							$stil4m$elm_syntax$Combine$andMap,
							$stil4m$elm_syntax$Elm$Parser$Typings$valueConstructors,
							A2(
								$stil4m$elm_syntax$Combine$ignore,
								A2(
									$stil4m$elm_syntax$Combine$ignore,
									$stil4m$elm_syntax$Combine$maybe($stil4m$elm_syntax$Elm$Parser$Layout$layout),
									$stil4m$elm_syntax$Combine$string('=')),
								A2(
									$stil4m$elm_syntax$Combine$ignore,
									$stil4m$elm_syntax$Combine$maybe($stil4m$elm_syntax$Elm$Parser$Layout$layout),
									A2(
										$stil4m$elm_syntax$Combine$andMap,
										$stil4m$elm_syntax$Elm$Parser$Typings$genericList,
										A2(
											$stil4m$elm_syntax$Combine$ignore,
											$stil4m$elm_syntax$Combine$maybe($stil4m$elm_syntax$Elm$Parser$Layout$layout),
											A2(
												$stil4m$elm_syntax$Combine$andMap,
												$stil4m$elm_syntax$Elm$Parser$Node$parser($stil4m$elm_syntax$Elm$Parser$Tokens$typeName),
												$stil4m$elm_syntax$Combine$succeed(
													$stil4m$elm_syntax$Elm$Syntax$Type$Type($elm$core$Maybe$Nothing)))))))))
					])),
			$stil4m$elm_syntax$Elm$Parser$Typings$typePrefix);
	});
var $stil4m$elm_syntax$Elm$Parser$Declarations$declaration = $stil4m$elm_syntax$Combine$lazy(
	function (_v0) {
		return $stil4m$elm_syntax$Combine$choice(
			_List_fromArray(
				[
					$stil4m$elm_syntax$Elm$Parser$Declarations$infixDeclaration,
					$stil4m$elm_syntax$Elm$Parser$Declarations$function,
					A2(
					$stil4m$elm_syntax$Combine$map,
					function (v) {
						if (!v.$) {
							var r = v.a;
							var t = v.b;
							return A2(
								$stil4m$elm_syntax$Elm$Syntax$Node$Node,
								r,
								$stil4m$elm_syntax$Elm$Syntax$Declaration$CustomTypeDeclaration(t));
						} else {
							var r = v.a;
							var a = v.b;
							return A2(
								$stil4m$elm_syntax$Elm$Syntax$Node$Node,
								r,
								$stil4m$elm_syntax$Elm$Syntax$Declaration$AliasDeclaration(a));
						}
					},
					$stil4m$elm_syntax$Elm$Parser$Typings$typeDefinition),
					$stil4m$elm_syntax$Elm$Parser$Declarations$portDeclaration,
					$stil4m$elm_syntax$Elm$Parser$Declarations$destructuringDeclaration
				]));
	});
var $stil4m$elm_syntax$Elm$Parser$File$fileDeclarations = $stil4m$elm_syntax$Combine$many(
	A2(
		$stil4m$elm_syntax$Combine$ignore,
		$stil4m$elm_syntax$Combine$maybe($stil4m$elm_syntax$Elm$Parser$Layout$layoutStrict),
		$stil4m$elm_syntax$Elm$Parser$Declarations$declaration));
var $stil4m$elm_syntax$Elm$Syntax$Import$Import = F3(
	function (moduleName, moduleAlias, exposingList) {
		return {k: exposingList, l: moduleAlias, m: moduleName};
	});
var $stil4m$elm_syntax$Elm$Parser$Tokens$asToken = $stil4m$elm_syntax$Combine$fromCore(
	$elm$parser$Parser$keyword('as'));
var $stil4m$elm_syntax$Elm$Syntax$Exposing$All = function (a) {
	return {$: 0, a: a};
};
var $stil4m$elm_syntax$Elm$Syntax$Exposing$Explicit = function (a) {
	return {$: 1, a: a};
};
var $stil4m$elm_syntax$Elm$Syntax$Exposing$FunctionExpose = function (a) {
	return {$: 1, a: a};
};
var $stil4m$elm_syntax$Elm$Parser$Expose$functionExpose = $stil4m$elm_syntax$Elm$Parser$Node$parser(
	A2($stil4m$elm_syntax$Combine$map, $stil4m$elm_syntax$Elm$Syntax$Exposing$FunctionExpose, $stil4m$elm_syntax$Elm$Parser$Tokens$functionName));
var $stil4m$elm_syntax$Elm$Syntax$Exposing$InfixExpose = function (a) {
	return {$: 0, a: a};
};
var $stil4m$elm_syntax$Combine$while = function (pred) {
	return function (state) {
		return A2(
			$elm$parser$Parser$map,
			function (x) {
				return _Utils_Tuple2(state, x);
			},
			$elm$parser$Parser$getChompedString(
				$elm$parser$Parser$chompWhile(pred)));
	};
};
var $stil4m$elm_syntax$Elm$Parser$Expose$infixExpose = $stil4m$elm_syntax$Combine$lazy(
	function (_v0) {
		return $stil4m$elm_syntax$Elm$Parser$Node$parser(
			A2(
				$stil4m$elm_syntax$Combine$map,
				$stil4m$elm_syntax$Elm$Syntax$Exposing$InfixExpose,
				$stil4m$elm_syntax$Combine$parens(
					$stil4m$elm_syntax$Combine$while(
						$elm$core$Basics$neq(')')))));
	});
var $stil4m$elm_syntax$Elm$Syntax$Exposing$ExposedType = F2(
	function (name, open) {
		return {f: name, aX: open};
	});
var $stil4m$elm_syntax$Elm$Syntax$Exposing$TypeExpose = function (a) {
	return {$: 3, a: a};
};
var $stil4m$elm_syntax$Elm$Syntax$Exposing$TypeOrAliasExpose = function (a) {
	return {$: 2, a: a};
};
var $stil4m$elm_syntax$Elm$Parser$Expose$exposedType = A2(
	$stil4m$elm_syntax$Combine$andThen,
	function (tipe) {
		return $stil4m$elm_syntax$Combine$choice(
			_List_fromArray(
				[
					A2(
					$stil4m$elm_syntax$Combine$map,
					A2(
						$elm$core$Basics$composeR,
						$stil4m$elm_syntax$Elm$Syntax$Node$range,
						A2(
							$elm$core$Basics$composeR,
							$elm$core$Maybe$Just,
							A2(
								$elm$core$Basics$composeR,
								function (v) {
									return A2($stil4m$elm_syntax$Elm$Syntax$Exposing$ExposedType, tipe, v);
								},
								$stil4m$elm_syntax$Elm$Syntax$Exposing$TypeExpose))),
					$stil4m$elm_syntax$Elm$Parser$Node$parser(
						$stil4m$elm_syntax$Combine$parens(
							$stil4m$elm_syntax$Elm$Parser$Layout$maybeAroundBothSides(
								$stil4m$elm_syntax$Combine$string('..'))))),
					$stil4m$elm_syntax$Combine$succeed(
					$stil4m$elm_syntax$Elm$Syntax$Exposing$TypeOrAliasExpose(tipe))
				]));
	},
	A2(
		$stil4m$elm_syntax$Combine$ignore,
		$stil4m$elm_syntax$Combine$maybe($stil4m$elm_syntax$Elm$Parser$Layout$layout),
		A2(
			$stil4m$elm_syntax$Combine$andMap,
			$stil4m$elm_syntax$Elm$Parser$Tokens$typeName,
			$stil4m$elm_syntax$Combine$succeed($elm$core$Basics$identity))));
var $stil4m$elm_syntax$Elm$Parser$Expose$typeExpose = $stil4m$elm_syntax$Combine$lazy(
	function (_v0) {
		return $stil4m$elm_syntax$Elm$Parser$Node$parser($stil4m$elm_syntax$Elm$Parser$Expose$exposedType);
	});
var $stil4m$elm_syntax$Elm$Parser$Expose$exposable = $stil4m$elm_syntax$Combine$lazy(
	function (_v0) {
		return $stil4m$elm_syntax$Combine$choice(
			_List_fromArray(
				[$stil4m$elm_syntax$Elm$Parser$Expose$typeExpose, $stil4m$elm_syntax$Elm$Parser$Expose$infixExpose, $stil4m$elm_syntax$Elm$Parser$Expose$functionExpose]));
	});
var $stil4m$elm_syntax$Elm$Parser$Ranges$withRange = function (p) {
	return $stil4m$elm_syntax$Combine$withLocation(
		function (start) {
			return A2(
				$stil4m$elm_syntax$Combine$andMap,
				$stil4m$elm_syntax$Combine$withLocation(
					function (end) {
						return $stil4m$elm_syntax$Combine$succeed(
							{
								af: $stil4m$elm_syntax$Elm$Parser$Ranges$asPointerLocation(end),
								V: $stil4m$elm_syntax$Elm$Parser$Ranges$asPointerLocation(start)
							});
					}),
				p);
		});
};
var $stil4m$elm_syntax$Elm$Parser$Expose$exposingListInner = $stil4m$elm_syntax$Combine$lazy(
	function (_v0) {
		return A2(
			$stil4m$elm_syntax$Combine$or,
			$stil4m$elm_syntax$Elm$Parser$Ranges$withRange(
				A2(
					$stil4m$elm_syntax$Combine$ignore,
					$stil4m$elm_syntax$Elm$Parser$Layout$maybeAroundBothSides(
						$stil4m$elm_syntax$Combine$string('..')),
					$stil4m$elm_syntax$Combine$succeed($stil4m$elm_syntax$Elm$Syntax$Exposing$All))),
			A2(
				$stil4m$elm_syntax$Combine$map,
				$stil4m$elm_syntax$Elm$Syntax$Exposing$Explicit,
				A2(
					$stil4m$elm_syntax$Combine$sepBy,
					$stil4m$elm_syntax$Combine$Char$char(','),
					$stil4m$elm_syntax$Elm$Parser$Layout$maybeAroundBothSides($stil4m$elm_syntax$Elm$Parser$Expose$exposable))));
	});
var $stil4m$elm_syntax$Elm$Parser$Expose$exposeListWith = $stil4m$elm_syntax$Combine$parens(
	A2(
		$stil4m$elm_syntax$Combine$ignore,
		$stil4m$elm_syntax$Elm$Parser$Layout$optimisticLayout,
		A2($stil4m$elm_syntax$Combine$continueWith, $stil4m$elm_syntax$Elm$Parser$Expose$exposingListInner, $stil4m$elm_syntax$Elm$Parser$Layout$optimisticLayout)));
var $stil4m$elm_syntax$Elm$Parser$Tokens$exposingToken = $stil4m$elm_syntax$Combine$string('exposing');
var $stil4m$elm_syntax$Elm$Parser$Expose$exposeDefinition = A2(
	$stil4m$elm_syntax$Combine$continueWith,
	$stil4m$elm_syntax$Elm$Parser$Expose$exposeListWith,
	A2(
		$stil4m$elm_syntax$Combine$continueWith,
		$stil4m$elm_syntax$Combine$maybe($stil4m$elm_syntax$Elm$Parser$Layout$layout),
		$stil4m$elm_syntax$Elm$Parser$Tokens$exposingToken));
var $stil4m$elm_syntax$Elm$Parser$Tokens$importToken = $stil4m$elm_syntax$Combine$fromCore(
	$elm$parser$Parser$keyword('import'));
var $stil4m$elm_syntax$Elm$Parser$Base$moduleName = A2(
	$stil4m$elm_syntax$Combine$sepBy1,
	$stil4m$elm_syntax$Combine$string('.'),
	$stil4m$elm_syntax$Elm$Parser$Tokens$typeName);
var $elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _v0 = f(mx);
		if (!_v0.$) {
			var x = _v0.a;
			return A2($elm$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var $elm$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			$elm$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var $stil4m$elm_syntax$Elm$Parser$Imports$setupNode = F2(
	function (start, imp) {
		var allRanges = _List_fromArray(
			[
				$elm$core$Maybe$Just(start),
				$elm$core$Maybe$Just(
				$stil4m$elm_syntax$Elm$Syntax$Node$range(imp.m)),
				A2($elm$core$Maybe$map, $stil4m$elm_syntax$Elm$Syntax$Node$range, imp.k),
				A2($elm$core$Maybe$map, $stil4m$elm_syntax$Elm$Syntax$Node$range, imp.l)
			]);
		return A2(
			$stil4m$elm_syntax$Elm$Syntax$Node$Node,
			$stil4m$elm_syntax$Elm$Syntax$Range$combine(
				A2($elm$core$List$filterMap, $elm$core$Basics$identity, allRanges)),
			imp);
	});
var $stil4m$elm_syntax$Elm$Parser$Imports$importDefinition = function () {
	var parseExposingDefinition = F2(
		function (mod, asDef) {
			return $stil4m$elm_syntax$Combine$choice(
				_List_fromArray(
					[
						A2(
						$stil4m$elm_syntax$Combine$map,
						A2(
							$elm$core$Basics$composeR,
							$elm$core$Maybe$Just,
							A2($stil4m$elm_syntax$Elm$Syntax$Import$Import, mod, asDef)),
						$stil4m$elm_syntax$Elm$Parser$Node$parser($stil4m$elm_syntax$Elm$Parser$Expose$exposeDefinition)),
						$stil4m$elm_syntax$Combine$succeed(
						A3($stil4m$elm_syntax$Elm$Syntax$Import$Import, mod, asDef, $elm$core$Maybe$Nothing))
					]));
		});
	var importAndModuleName = A2(
		$stil4m$elm_syntax$Combine$continueWith,
		$stil4m$elm_syntax$Elm$Parser$Node$parser($stil4m$elm_syntax$Elm$Parser$Base$moduleName),
		A2($stil4m$elm_syntax$Combine$continueWith, $stil4m$elm_syntax$Elm$Parser$Layout$layout, $stil4m$elm_syntax$Elm$Parser$Tokens$importToken));
	var asDefinition = A2(
		$stil4m$elm_syntax$Combine$continueWith,
		$stil4m$elm_syntax$Elm$Parser$Node$parser($stil4m$elm_syntax$Elm$Parser$Base$moduleName),
		A2($stil4m$elm_syntax$Combine$continueWith, $stil4m$elm_syntax$Elm$Parser$Layout$layout, $stil4m$elm_syntax$Elm$Parser$Tokens$asToken));
	var parseAsDefinition = function (mod) {
		return $stil4m$elm_syntax$Combine$choice(
			_List_fromArray(
				[
					A2(
					$stil4m$elm_syntax$Combine$andThen,
					A2(
						$elm$core$Basics$composeR,
						$elm$core$Maybe$Just,
						parseExposingDefinition(mod)),
					A2($stil4m$elm_syntax$Combine$ignore, $stil4m$elm_syntax$Elm$Parser$Layout$optimisticLayout, asDefinition)),
					A2(parseExposingDefinition, mod, $elm$core$Maybe$Nothing)
				]));
	};
	return A2(
		$stil4m$elm_syntax$Combine$andThen,
		function (_v0) {
			var start = _v0.a;
			return A2(
				$stil4m$elm_syntax$Combine$map,
				$stil4m$elm_syntax$Elm$Parser$Imports$setupNode(start),
				A2(
					$stil4m$elm_syntax$Combine$andThen,
					parseAsDefinition,
					A2($stil4m$elm_syntax$Combine$ignore, $stil4m$elm_syntax$Elm$Parser$Layout$optimisticLayout, importAndModuleName)));
		},
		$stil4m$elm_syntax$Elm$Parser$Node$parser(
			$stil4m$elm_syntax$Combine$succeed(0)));
}();
var $stil4m$elm_syntax$Elm$Syntax$Module$EffectModule = function (a) {
	return {$: 2, a: a};
};
var $stil4m$elm_syntax$Elm$Parser$Modules$effectWhereClause = A2(
	$stil4m$elm_syntax$Combine$andMap,
	A2(
		$stil4m$elm_syntax$Combine$continueWith,
		$stil4m$elm_syntax$Elm$Parser$Node$parser($stil4m$elm_syntax$Elm$Parser$Tokens$typeName),
		$stil4m$elm_syntax$Elm$Parser$Layout$maybeAroundBothSides(
			$stil4m$elm_syntax$Combine$string('='))),
	A2(
		$stil4m$elm_syntax$Combine$andMap,
		$stil4m$elm_syntax$Elm$Parser$Tokens$functionName,
		$stil4m$elm_syntax$Combine$succeed($elm$core$Tuple$pair)));
var $elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2($elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var $stil4m$elm_syntax$Elm$Parser$Modules$whereBlock = A2(
	$stil4m$elm_syntax$Combine$map,
	function (pairs) {
		return {
			A: A2(
				$elm$core$Maybe$map,
				$elm$core$Tuple$second,
				$elm$core$List$head(
					A2(
						$elm$core$List$filter,
						A2(
							$elm$core$Basics$composeR,
							$elm$core$Tuple$first,
							$elm$core$Basics$eq('command')),
						pairs))),
			W: A2(
				$elm$core$Maybe$map,
				$elm$core$Tuple$second,
				$elm$core$List$head(
					A2(
						$elm$core$List$filter,
						A2(
							$elm$core$Basics$composeR,
							$elm$core$Tuple$first,
							$elm$core$Basics$eq('subscription')),
						pairs)))
		};
	},
	A3(
		$stil4m$elm_syntax$Combine$between,
		$stil4m$elm_syntax$Combine$string('{'),
		$stil4m$elm_syntax$Combine$string('}'),
		A2(
			$stil4m$elm_syntax$Combine$sepBy1,
			$stil4m$elm_syntax$Combine$string(','),
			$stil4m$elm_syntax$Elm$Parser$Layout$maybeAroundBothSides($stil4m$elm_syntax$Elm$Parser$Modules$effectWhereClause))));
var $stil4m$elm_syntax$Elm$Parser$Modules$effectWhereClauses = A2(
	$stil4m$elm_syntax$Combine$continueWith,
	$stil4m$elm_syntax$Elm$Parser$Modules$whereBlock,
	A2(
		$stil4m$elm_syntax$Combine$continueWith,
		$stil4m$elm_syntax$Elm$Parser$Layout$layout,
		$stil4m$elm_syntax$Combine$string('where')));
var $stil4m$elm_syntax$Elm$Parser$Tokens$moduleToken = $stil4m$elm_syntax$Combine$string('module');
var $stil4m$elm_syntax$Elm$Parser$Modules$effectModuleDefinition = function () {
	var createEffectModule = F3(
		function (name, whereClauses, exp) {
			return $stil4m$elm_syntax$Elm$Syntax$Module$EffectModule(
				{A: whereClauses.A, k: exp, m: name, W: whereClauses.W});
		});
	return A2(
		$stil4m$elm_syntax$Combine$andMap,
		$stil4m$elm_syntax$Elm$Parser$Node$parser($stil4m$elm_syntax$Elm$Parser$Expose$exposeDefinition),
		A2(
			$stil4m$elm_syntax$Combine$ignore,
			$stil4m$elm_syntax$Elm$Parser$Layout$layout,
			A2(
				$stil4m$elm_syntax$Combine$andMap,
				$stil4m$elm_syntax$Elm$Parser$Modules$effectWhereClauses,
				A2(
					$stil4m$elm_syntax$Combine$ignore,
					$stil4m$elm_syntax$Elm$Parser$Layout$layout,
					A2(
						$stil4m$elm_syntax$Combine$andMap,
						$stil4m$elm_syntax$Elm$Parser$Node$parser($stil4m$elm_syntax$Elm$Parser$Base$moduleName),
						A2(
							$stil4m$elm_syntax$Combine$ignore,
							$stil4m$elm_syntax$Elm$Parser$Layout$layout,
							A2(
								$stil4m$elm_syntax$Combine$ignore,
								$stil4m$elm_syntax$Elm$Parser$Tokens$moduleToken,
								A2(
									$stil4m$elm_syntax$Combine$ignore,
									$stil4m$elm_syntax$Elm$Parser$Layout$layout,
									A2(
										$stil4m$elm_syntax$Combine$ignore,
										$stil4m$elm_syntax$Combine$string('effect'),
										$stil4m$elm_syntax$Combine$succeed(createEffectModule))))))))));
}();
var $stil4m$elm_syntax$Elm$Syntax$Module$DefaultModuleData = F2(
	function (moduleName, exposingList) {
		return {k: exposingList, m: moduleName};
	});
var $stil4m$elm_syntax$Elm$Syntax$Module$NormalModule = function (a) {
	return {$: 0, a: a};
};
var $stil4m$elm_syntax$Elm$Parser$Modules$normalModuleDefinition = A2(
	$stil4m$elm_syntax$Combine$map,
	$stil4m$elm_syntax$Elm$Syntax$Module$NormalModule,
	A2(
		$stil4m$elm_syntax$Combine$andMap,
		$stil4m$elm_syntax$Elm$Parser$Node$parser($stil4m$elm_syntax$Elm$Parser$Expose$exposeDefinition),
		A2(
			$stil4m$elm_syntax$Combine$ignore,
			$stil4m$elm_syntax$Elm$Parser$Layout$layout,
			A2(
				$stil4m$elm_syntax$Combine$andMap,
				$stil4m$elm_syntax$Elm$Parser$Node$parser($stil4m$elm_syntax$Elm$Parser$Base$moduleName),
				A2(
					$stil4m$elm_syntax$Combine$ignore,
					$stil4m$elm_syntax$Elm$Parser$Layout$layout,
					A2(
						$stil4m$elm_syntax$Combine$ignore,
						$stil4m$elm_syntax$Elm$Parser$Tokens$moduleToken,
						$stil4m$elm_syntax$Combine$succeed($stil4m$elm_syntax$Elm$Syntax$Module$DefaultModuleData)))))));
var $stil4m$elm_syntax$Elm$Syntax$Module$PortModule = function (a) {
	return {$: 1, a: a};
};
var $stil4m$elm_syntax$Elm$Parser$Modules$portModuleDefinition = A2(
	$stil4m$elm_syntax$Combine$map,
	$stil4m$elm_syntax$Elm$Syntax$Module$PortModule,
	A2(
		$stil4m$elm_syntax$Combine$andMap,
		$stil4m$elm_syntax$Elm$Parser$Node$parser($stil4m$elm_syntax$Elm$Parser$Expose$exposeDefinition),
		A2(
			$stil4m$elm_syntax$Combine$ignore,
			$stil4m$elm_syntax$Elm$Parser$Layout$layout,
			A2(
				$stil4m$elm_syntax$Combine$andMap,
				$stil4m$elm_syntax$Elm$Parser$Node$parser($stil4m$elm_syntax$Elm$Parser$Base$moduleName),
				A2(
					$stil4m$elm_syntax$Combine$ignore,
					$stil4m$elm_syntax$Elm$Parser$Layout$layout,
					A2(
						$stil4m$elm_syntax$Combine$ignore,
						$stil4m$elm_syntax$Elm$Parser$Tokens$moduleToken,
						A2(
							$stil4m$elm_syntax$Combine$ignore,
							$stil4m$elm_syntax$Elm$Parser$Layout$layout,
							A2(
								$stil4m$elm_syntax$Combine$ignore,
								$stil4m$elm_syntax$Elm$Parser$Tokens$portToken,
								$stil4m$elm_syntax$Combine$succeed($stil4m$elm_syntax$Elm$Syntax$Module$DefaultModuleData)))))))));
var $stil4m$elm_syntax$Elm$Parser$Modules$moduleDefinition = $stil4m$elm_syntax$Combine$choice(
	_List_fromArray(
		[$stil4m$elm_syntax$Elm$Parser$Modules$normalModuleDefinition, $stil4m$elm_syntax$Elm$Parser$Modules$portModuleDefinition, $stil4m$elm_syntax$Elm$Parser$Modules$effectModuleDefinition]));
var $stil4m$elm_syntax$Elm$Parser$File$file = A2(
	$stil4m$elm_syntax$Combine$ignore,
	$stil4m$elm_syntax$Elm$Parser$Layout$optimisticLayout,
	A2(
		$stil4m$elm_syntax$Combine$andMap,
		$stil4m$elm_syntax$Elm$Parser$File$collectComments,
		A2(
			$stil4m$elm_syntax$Combine$andMap,
			$stil4m$elm_syntax$Elm$Parser$File$fileDeclarations,
			A2(
				$stil4m$elm_syntax$Combine$ignore,
				$stil4m$elm_syntax$Combine$maybe($stil4m$elm_syntax$Elm$Parser$Layout$layoutStrict),
				A2(
					$stil4m$elm_syntax$Combine$andMap,
					$stil4m$elm_syntax$Combine$many(
						A2($stil4m$elm_syntax$Combine$ignore, $stil4m$elm_syntax$Elm$Parser$Layout$optimisticLayout, $stil4m$elm_syntax$Elm$Parser$Imports$importDefinition)),
					A2(
						$stil4m$elm_syntax$Combine$ignore,
						$stil4m$elm_syntax$Combine$maybe($stil4m$elm_syntax$Elm$Parser$Layout$layoutStrict),
						A2(
							$stil4m$elm_syntax$Combine$andMap,
							$stil4m$elm_syntax$Elm$Parser$Node$parser($stil4m$elm_syntax$Elm$Parser$Modules$moduleDefinition),
							A2(
								$stil4m$elm_syntax$Combine$ignore,
								$stil4m$elm_syntax$Combine$maybe($stil4m$elm_syntax$Elm$Parser$Layout$layoutStrict),
								$stil4m$elm_syntax$Combine$succeed($stil4m$elm_syntax$Elm$Syntax$File$File)))))))));
var $stil4m$elm_syntax$Elm$Internal$RawFile$Raw = $elm$core$Basics$identity;
var $stil4m$elm_syntax$Elm$Internal$RawFile$fromFile = $elm$core$Basics$identity;
var $elm$parser$Parser$DeadEnd = F3(
	function (row, col, problem) {
		return {_: col, av: problem, aA: row};
	});
var $elm$parser$Parser$problemToDeadEnd = function (p) {
	return A3($elm$parser$Parser$DeadEnd, p.aA, p._, p.av);
};
var $elm$parser$Parser$Advanced$bagToList = F2(
	function (bag, list) {
		bagToList:
		while (true) {
			switch (bag.$) {
				case 0:
					return list;
				case 1:
					var bag1 = bag.a;
					var x = bag.b;
					var $temp$bag = bag1,
						$temp$list = A2($elm$core$List$cons, x, list);
					bag = $temp$bag;
					list = $temp$list;
					continue bagToList;
				default:
					var bag1 = bag.a;
					var bag2 = bag.b;
					var $temp$bag = bag1,
						$temp$list = A2($elm$parser$Parser$Advanced$bagToList, bag2, list);
					bag = $temp$bag;
					list = $temp$list;
					continue bagToList;
			}
		}
	});
var $elm$parser$Parser$Advanced$run = F2(
	function (_v0, src) {
		var parse = _v0;
		var _v1 = parse(
			{_: 1, c: _List_Nil, d: 1, b: 0, aA: 1, a: src});
		if (!_v1.$) {
			var value = _v1.b;
			return $elm$core$Result$Ok(value);
		} else {
			var bag = _v1.b;
			return $elm$core$Result$Err(
				A2($elm$parser$Parser$Advanced$bagToList, bag, _List_Nil));
		}
	});
var $elm$parser$Parser$run = F2(
	function (parser, source) {
		var _v0 = A2($elm$parser$Parser$Advanced$run, parser, source);
		if (!_v0.$) {
			var a = _v0.a;
			return $elm$core$Result$Ok(a);
		} else {
			var problems = _v0.a;
			return $elm$core$Result$Err(
				A2($elm$core$List$map, $elm$parser$Parser$problemToDeadEnd, problems));
		}
	});
var $stil4m$elm_syntax$Combine$runParser = F3(
	function (_v0, st, s) {
		var p = _v0;
		return A2(
			$elm$parser$Parser$run,
			p(st),
			s);
	});
var $elm$parser$Parser$ExpectingEnd = {$: 10};
var $elm$parser$Parser$Advanced$end = function (x) {
	return function (s) {
		return _Utils_eq(
			$elm$core$String$length(s.a),
			s.b) ? A3($elm$parser$Parser$Advanced$Good, false, 0, s) : A2(
			$elm$parser$Parser$Advanced$Bad,
			false,
			A2($elm$parser$Parser$Advanced$fromState, s, x));
	};
};
var $elm$parser$Parser$end = $elm$parser$Parser$Advanced$end($elm$parser$Parser$ExpectingEnd);
var $stil4m$elm_syntax$Combine$end = function (state) {
	return A2(
		$elm$parser$Parser$map,
		function (x) {
			return _Utils_Tuple2(state, x);
		},
		$elm$parser$Parser$end);
};
var $stil4m$elm_syntax$Elm$Parser$withEnd = function (p) {
	return A2(
		$stil4m$elm_syntax$Combine$ignore,
		$stil4m$elm_syntax$Combine$withLocation(
			function (_v0) {
				return $stil4m$elm_syntax$Combine$end;
			}),
		p);
};
var $stil4m$elm_syntax$Elm$Parser$parse = function (input) {
	var _v0 = A3(
		$stil4m$elm_syntax$Combine$runParser,
		$stil4m$elm_syntax$Elm$Parser$withEnd($stil4m$elm_syntax$Elm$Parser$File$file),
		$stil4m$elm_syntax$Elm$Parser$State$emptyState,
		input + '\n');
	if (!_v0.$) {
		var _v1 = _v0.a;
		var r = _v1.b;
		return $elm$core$Result$Ok(
			$stil4m$elm_syntax$Elm$Internal$RawFile$fromFile(r));
	} else {
		var s = _v0.a;
		return $elm$core$Result$Err(s);
	}
};
var $stil4m$elm_syntax$Elm$Processing$expressionOperators = function (_v0) {
	var expression = _v0.b;
	if (expression.$ === 6) {
		var s = expression.a;
		return $elm$core$Maybe$Just(s);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm$core$Maybe$andThen = F2(
	function (callback, maybeValue) {
		if (!maybeValue.$) {
			var value = maybeValue.a;
			return callback(value);
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $elm_community$list_extra$List$Extra$takeWhile = function (predicate) {
	var takeWhileMemo = F2(
		function (memo, list) {
			takeWhileMemo:
			while (true) {
				if (!list.b) {
					return $elm$core$List$reverse(memo);
				} else {
					var x = list.a;
					var xs = list.b;
					if (predicate(x)) {
						var $temp$memo = A2($elm$core$List$cons, x, memo),
							$temp$list = xs;
						memo = $temp$memo;
						list = $temp$list;
						continue takeWhileMemo;
					} else {
						return $elm$core$List$reverse(memo);
					}
				}
			}
		});
	return takeWhileMemo(_List_Nil);
};
var $stil4m$elm_syntax$Elm$Processing$findNextSplit = F2(
	function (dict, exps) {
		var prefix = A2(
			$elm_community$list_extra$List$Extra$takeWhile,
			function (x) {
				return _Utils_eq(
					$elm$core$Maybe$Nothing,
					A2(
						$elm$core$Maybe$andThen,
						function (key) {
							return A2($elm$core$Dict$get, key, dict);
						},
						$stil4m$elm_syntax$Elm$Processing$expressionOperators(x)));
			},
			exps);
		var suffix = A2(
			$elm$core$List$drop,
			$elm$core$List$length(prefix) + 1,
			exps);
		return A2(
			$elm$core$Maybe$map,
			function (x) {
				return _Utils_Tuple3(prefix, x, suffix);
			},
			A2(
				$elm$core$Maybe$andThen,
				function (x) {
					return A2($elm$core$Dict$get, x, dict);
				},
				A2(
					$elm$core$Maybe$andThen,
					$stil4m$elm_syntax$Elm$Processing$expressionOperators,
					$elm$core$List$head(
						A2(
							$elm$core$List$drop,
							$elm$core$List$length(prefix),
							exps)))));
	});
var $elm$core$Dict$fromList = function (assocs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, dict) {
				var key = _v0.a;
				var value = _v0.b;
				return A3($elm$core$Dict$insert, key, value, dict);
			}),
		$elm$core$Dict$empty,
		assocs);
};
var $elm$core$List$maximum = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(
			A3($elm$core$List$foldl, $elm$core$Basics$max, x, xs));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $stil4m$elm_syntax$Elm$Processing$highestPrecedence = function (input) {
	var maxi = $elm$core$List$maximum(
		A2(
			$elm$core$List$map,
			A2(
				$elm$core$Basics$composeR,
				$elm$core$Tuple$second,
				A2(
					$elm$core$Basics$composeR,
					function ($) {
						return $.aZ;
					},
					$stil4m$elm_syntax$Elm$Syntax$Node$value)),
			input));
	return $elm$core$Dict$fromList(
		A2(
			$elm$core$Maybe$withDefault,
			_List_Nil,
			A2(
				$elm$core$Maybe$map,
				function (m) {
					return A2(
						$elm$core$List$filter,
						A2(
							$elm$core$Basics$composeR,
							$elm$core$Tuple$second,
							A2(
								$elm$core$Basics$composeR,
								function ($) {
									return $.aZ;
								},
								A2(
									$elm$core$Basics$composeR,
									$stil4m$elm_syntax$Elm$Syntax$Node$value,
									$elm$core$Basics$eq(m)))),
						input);
				},
				maxi)));
};
var $elm$core$Dict$isEmpty = function (dict) {
	if (dict.$ === -2) {
		return true;
	} else {
		return false;
	}
};
var $stil4m$elm_syntax$Elm$Processing$fixApplication = F2(
	function (operators, expressions) {
		var ops = $stil4m$elm_syntax$Elm$Processing$highestPrecedence(
			A2(
				$elm$core$List$map,
				function (x) {
					return _Utils_Tuple2(
						x,
						A2(
							$elm$core$Maybe$withDefault,
							{
								aL: A2($stil4m$elm_syntax$Elm$Syntax$Node$Node, $stil4m$elm_syntax$Elm$Syntax$Range$emptyRange, 0),
								aN: A2($stil4m$elm_syntax$Elm$Syntax$Node$Node, $stil4m$elm_syntax$Elm$Syntax$Range$emptyRange, 'todo'),
								aY: A2($stil4m$elm_syntax$Elm$Syntax$Node$Node, $stil4m$elm_syntax$Elm$Syntax$Range$emptyRange, x),
								aZ: A2($stil4m$elm_syntax$Elm$Syntax$Node$Node, $stil4m$elm_syntax$Elm$Syntax$Range$emptyRange, 5)
							},
							A2($elm$core$Dict$get, x, operators)));
				},
				A2($elm$core$List$filterMap, $stil4m$elm_syntax$Elm$Processing$expressionOperators, expressions)));
		var fixExprs = function (exps) {
			if (exps.b && (!exps.b.b)) {
				var _v2 = exps.a;
				var x = _v2.b;
				return x;
			} else {
				return $stil4m$elm_syntax$Elm$Syntax$Expression$Application(exps);
			}
		};
		var divideAndConquer = function (exps) {
			return $elm$core$Dict$isEmpty(ops) ? fixExprs(exps) : A2(
				$elm$core$Maybe$withDefault,
				fixExprs(exps),
				A2(
					$elm$core$Maybe$map,
					function (_v0) {
						var p = _v0.a;
						var infix = _v0.b;
						var s = _v0.c;
						return A4(
							$stil4m$elm_syntax$Elm$Syntax$Expression$OperatorApplication,
							$stil4m$elm_syntax$Elm$Syntax$Node$value(infix.aY),
							$stil4m$elm_syntax$Elm$Syntax$Node$value(infix.aL),
							A2(
								$stil4m$elm_syntax$Elm$Syntax$Node$Node,
								$stil4m$elm_syntax$Elm$Syntax$Range$combine(
									A2($elm$core$List$map, $stil4m$elm_syntax$Elm$Syntax$Node$range, p)),
								divideAndConquer(p)),
							A2(
								$stil4m$elm_syntax$Elm$Syntax$Node$Node,
								$stil4m$elm_syntax$Elm$Syntax$Range$combine(
									A2($elm$core$List$map, $stil4m$elm_syntax$Elm$Syntax$Node$range, s)),
								divideAndConquer(s)));
					},
					A2($stil4m$elm_syntax$Elm$Processing$findNextSplit, ops, exps)));
		};
		return divideAndConquer(expressions);
	});
var $stil4m$elm_syntax$Elm$Inspector$Post = function (a) {
	return {$: 3, a: a};
};
var $stil4m$elm_syntax$Elm$Inspector$Continue = {$: 1};
var $stil4m$elm_syntax$Elm$Inspector$defaultConfig = {D: $stil4m$elm_syntax$Elm$Inspector$Continue, E: $stil4m$elm_syntax$Elm$Inspector$Continue, F: $stil4m$elm_syntax$Elm$Inspector$Continue, G: $stil4m$elm_syntax$Elm$Inspector$Continue, H: $stil4m$elm_syntax$Elm$Inspector$Continue, I: $stil4m$elm_syntax$Elm$Inspector$Continue, J: $stil4m$elm_syntax$Elm$Inspector$Continue, K: $stil4m$elm_syntax$Elm$Inspector$Continue, L: $stil4m$elm_syntax$Elm$Inspector$Continue, M: $stil4m$elm_syntax$Elm$Inspector$Continue, N: $stil4m$elm_syntax$Elm$Inspector$Continue, O: $stil4m$elm_syntax$Elm$Inspector$Continue, P: $stil4m$elm_syntax$Elm$Inspector$Continue, Q: $stil4m$elm_syntax$Elm$Inspector$Continue, R: $stil4m$elm_syntax$Elm$Inspector$Continue, S: $stil4m$elm_syntax$Elm$Inspector$Continue, T: $stil4m$elm_syntax$Elm$Inspector$Continue, U: $stil4m$elm_syntax$Elm$Inspector$Continue};
var $stil4m$elm_syntax$Elm$Inspector$actionLambda = function (act) {
	switch (act.$) {
		case 0:
			return F3(
				function (_v1, _v2, c) {
					return c;
				});
		case 1:
			return F3(
				function (f, _v3, c) {
					return f(c);
				});
		case 2:
			var g = act.a;
			return F3(
				function (f, x, c) {
					return f(
						A2(g, x, c));
				});
		case 3:
			var g = act.a;
			return F3(
				function (f, x, c) {
					return A2(
						g,
						x,
						f(c));
				});
		default:
			var g = act.a;
			return F3(
				function (f, x, c) {
					return A3(g, f, x, c);
				});
	}
};
var $stil4m$elm_syntax$Elm$Inspector$inspectTypeAnnotation = F3(
	function (config, typeAnnotation, context) {
		return A4(
			$stil4m$elm_syntax$Elm$Inspector$actionLambda,
			config.U,
			A2($stil4m$elm_syntax$Elm$Inspector$inspectTypeAnnotationInner, config, typeAnnotation),
			typeAnnotation,
			context);
	});
var $stil4m$elm_syntax$Elm$Inspector$inspectTypeAnnotationInner = F3(
	function (config, _v0, context) {
		var typeRefence = _v0.b;
		switch (typeRefence.$) {
			case 1:
				var typeArgs = typeRefence.b;
				return A3(
					$elm$core$List$foldl,
					$stil4m$elm_syntax$Elm$Inspector$inspectTypeAnnotation(config),
					context,
					typeArgs);
			case 3:
				var typeAnnotations = typeRefence.a;
				return A3(
					$elm$core$List$foldl,
					$stil4m$elm_syntax$Elm$Inspector$inspectTypeAnnotation(config),
					context,
					typeAnnotations);
			case 4:
				var recordDefinition = typeRefence.a;
				return A3(
					$elm$core$List$foldl,
					$stil4m$elm_syntax$Elm$Inspector$inspectTypeAnnotation(config),
					context,
					A2(
						$elm$core$List$map,
						A2($elm$core$Basics$composeR, $stil4m$elm_syntax$Elm$Syntax$Node$value, $elm$core$Tuple$second),
						recordDefinition));
			case 5:
				var recordDefinition = typeRefence.b;
				return A3(
					$elm$core$List$foldl,
					$stil4m$elm_syntax$Elm$Inspector$inspectTypeAnnotation(config),
					context,
					A2(
						$elm$core$List$map,
						A2($elm$core$Basics$composeR, $stil4m$elm_syntax$Elm$Syntax$Node$value, $elm$core$Tuple$second),
						$stil4m$elm_syntax$Elm$Syntax$Node$value(recordDefinition)));
			case 6:
				var left = typeRefence.a;
				var right = typeRefence.b;
				return A3(
					$elm$core$List$foldl,
					$stil4m$elm_syntax$Elm$Inspector$inspectTypeAnnotation(config),
					context,
					_List_fromArray(
						[left, right]));
			case 2:
				return context;
			default:
				return context;
		}
	});
var $stil4m$elm_syntax$Elm$Inspector$inspectSignature = F3(
	function (config, node, context) {
		var signature = node.b;
		return A4(
			$stil4m$elm_syntax$Elm$Inspector$actionLambda,
			config.R,
			A2($stil4m$elm_syntax$Elm$Inspector$inspectTypeAnnotation, config, signature.a2),
			node,
			context);
	});
var $stil4m$elm_syntax$Elm$Inspector$inspectCase = F3(
	function (config, caze, context) {
		return A4(
			$stil4m$elm_syntax$Elm$Inspector$actionLambda,
			config.D,
			A2($stil4m$elm_syntax$Elm$Inspector$inspectExpression, config, caze.b),
			caze,
			context);
	});
var $stil4m$elm_syntax$Elm$Inspector$inspectDestructuring = F3(
	function (config, destructuring, context) {
		return A4(
			$stil4m$elm_syntax$Elm$Inspector$actionLambda,
			config.E,
			function (c) {
				return A3(
					$stil4m$elm_syntax$Elm$Inspector$inspectExpression,
					config,
					$stil4m$elm_syntax$Elm$Syntax$Node$value(destructuring).b,
					c);
			},
			destructuring,
			context);
	});
var $stil4m$elm_syntax$Elm$Inspector$inspectExpression = F3(
	function (config, node, context) {
		var expression = node.b;
		return A4(
			$stil4m$elm_syntax$Elm$Inspector$actionLambda,
			config.F,
			A2($stil4m$elm_syntax$Elm$Inspector$inspectInnerExpression, config, expression),
			node,
			context);
	});
var $stil4m$elm_syntax$Elm$Inspector$inspectFunction = F3(
	function (config, node, context) {
		var _function = node.b;
		return A4(
			$stil4m$elm_syntax$Elm$Inspector$actionLambda,
			config.H,
			A2(
				$elm$core$Basics$composeR,
				A2(
					$stil4m$elm_syntax$Elm$Inspector$inspectExpression,
					config,
					$stil4m$elm_syntax$Elm$Syntax$Node$value(_function.aK).z),
				A2(
					$elm$core$Maybe$withDefault,
					$elm$core$Basics$identity,
					A2(
						$elm$core$Maybe$map,
						$stil4m$elm_syntax$Elm$Inspector$inspectSignature(config),
						_function.a$))),
			node,
			context);
	});
var $stil4m$elm_syntax$Elm$Inspector$inspectInnerExpression = F3(
	function (config, expression, context) {
		switch (expression.$) {
			case 0:
				return context;
			case 3:
				var moduleName = expression.a;
				var functionOrVal = expression.b;
				return A4(
					$stil4m$elm_syntax$Elm$Inspector$actionLambda,
					config.I,
					$elm$core$Basics$identity,
					_Utils_Tuple2(moduleName, functionOrVal),
					context);
			case 5:
				return context;
			case 6:
				return context;
			case 8:
				return context;
			case 7:
				return context;
			case 9:
				return context;
			case 10:
				var x = expression.a;
				return A3($stil4m$elm_syntax$Elm$Inspector$inspectExpression, config, x, context);
			case 11:
				return context;
			case 12:
				return context;
			case 20:
				var ex1 = expression.a;
				var key = expression.b;
				return A4(
					$stil4m$elm_syntax$Elm$Inspector$actionLambda,
					config.P,
					A2($stil4m$elm_syntax$Elm$Inspector$inspectExpression, config, ex1),
					_Utils_Tuple2(ex1, key),
					context);
			case 21:
				return context;
			case 23:
				return context;
			case 1:
				var expressionList = expression.a;
				return A3(
					$elm$core$List$foldl,
					$stil4m$elm_syntax$Elm$Inspector$inspectExpression(config),
					context,
					expressionList);
			case 2:
				var op = expression.a;
				var dir = expression.b;
				var left = expression.c;
				var right = expression.d;
				return A4(
					$stil4m$elm_syntax$Elm$Inspector$actionLambda,
					config.N,
					function (base) {
						return A3(
							$elm$core$List$foldl,
							$stil4m$elm_syntax$Elm$Inspector$inspectExpression(config),
							base,
							_List_fromArray(
								[left, right]));
					},
					{aL: dir, aT: left, aY: op, a_: right},
					context);
			case 4:
				var e1 = expression.a;
				var e2 = expression.b;
				var e3 = expression.c;
				return A3(
					$elm$core$List$foldl,
					$stil4m$elm_syntax$Elm$Inspector$inspectExpression(config),
					context,
					_List_fromArray(
						[e1, e2, e3]));
			case 13:
				var expressionList = expression.a;
				return A3(
					$elm$core$List$foldl,
					$stil4m$elm_syntax$Elm$Inspector$inspectExpression(config),
					context,
					expressionList);
			case 14:
				var inner = expression.a;
				return A3($stil4m$elm_syntax$Elm$Inspector$inspectExpression, config, inner, context);
			case 15:
				var letBlock = expression.a;
				var next = A2(
					$elm$core$Basics$composeR,
					A2($stil4m$elm_syntax$Elm$Inspector$inspectLetDeclarations, config, letBlock.ac),
					A2($stil4m$elm_syntax$Elm$Inspector$inspectExpression, config, letBlock.z));
				return A4($stil4m$elm_syntax$Elm$Inspector$actionLambda, config.M, next, letBlock, context);
			case 16:
				var caseBlock = expression.a;
				var context2 = A3($stil4m$elm_syntax$Elm$Inspector$inspectExpression, config, caseBlock.z, context);
				var context3 = A3(
					$elm$core$List$foldl,
					F2(
						function (a, b) {
							return A3($stil4m$elm_syntax$Elm$Inspector$inspectCase, config, a, b);
						}),
					context2,
					caseBlock.aI);
				return context3;
			case 17:
				var lambda = expression.a;
				return A4(
					$stil4m$elm_syntax$Elm$Inspector$actionLambda,
					config.L,
					A2($stil4m$elm_syntax$Elm$Inspector$inspectExpression, config, lambda.z),
					lambda,
					context);
			case 19:
				var expressionList = expression.a;
				return A3(
					$elm$core$List$foldl,
					$stil4m$elm_syntax$Elm$Inspector$inspectExpression(config),
					context,
					expressionList);
			case 18:
				var expressionStringList = expression.a;
				return A3(
					$elm$core$List$foldl,
					F2(
						function (a, b) {
							return A3(
								$stil4m$elm_syntax$Elm$Inspector$inspectExpression,
								config,
								$stil4m$elm_syntax$Elm$Syntax$Node$value(a).b,
								b);
						}),
					context,
					expressionStringList);
			default:
				var name = expression.a;
				var updates = expression.b;
				return A4(
					$stil4m$elm_syntax$Elm$Inspector$actionLambda,
					config.Q,
					function (c) {
						return A3(
							$elm$core$List$foldl,
							F2(
								function (a, b) {
									return A3(
										$stil4m$elm_syntax$Elm$Inspector$inspectExpression,
										config,
										$stil4m$elm_syntax$Elm$Syntax$Node$value(a).b,
										b);
								}),
							c,
							updates);
					},
					_Utils_Tuple2(name, updates),
					context);
		}
	});
var $stil4m$elm_syntax$Elm$Inspector$inspectLetDeclaration = F3(
	function (config, _v0, context) {
		var range = _v0.a;
		var declaration = _v0.b;
		if (!declaration.$) {
			var _function = declaration.a;
			return A3(
				$stil4m$elm_syntax$Elm$Inspector$inspectFunction,
				config,
				A2($stil4m$elm_syntax$Elm$Syntax$Node$Node, range, _function),
				context);
		} else {
			var pattern = declaration.a;
			var expression = declaration.b;
			return A3(
				$stil4m$elm_syntax$Elm$Inspector$inspectDestructuring,
				config,
				A2(
					$stil4m$elm_syntax$Elm$Syntax$Node$Node,
					range,
					_Utils_Tuple2(pattern, expression)),
				context);
		}
	});
var $stil4m$elm_syntax$Elm$Inspector$inspectLetDeclarations = F3(
	function (config, declarations, context) {
		return A3(
			$elm$core$List$foldl,
			$stil4m$elm_syntax$Elm$Inspector$inspectLetDeclaration(config),
			context,
			declarations);
	});
var $stil4m$elm_syntax$Elm$Inspector$inspectPortDeclaration = F3(
	function (config, signature, context) {
		return A4(
			$stil4m$elm_syntax$Elm$Inspector$actionLambda,
			config.O,
			A2($stil4m$elm_syntax$Elm$Inspector$inspectSignature, config, signature),
			signature,
			context);
	});
var $stil4m$elm_syntax$Elm$Inspector$inspectValueConstructor = F3(
	function (config, _v0, context) {
		var valueConstructor = _v0.b;
		return A3(
			$elm$core$List$foldl,
			$stil4m$elm_syntax$Elm$Inspector$inspectTypeAnnotation(config),
			context,
			valueConstructor.w);
	});
var $stil4m$elm_syntax$Elm$Inspector$inspectTypeInner = F3(
	function (config, typeDecl, context) {
		return A3(
			$elm$core$List$foldl,
			$stil4m$elm_syntax$Elm$Inspector$inspectValueConstructor(config),
			context,
			typeDecl.B);
	});
var $stil4m$elm_syntax$Elm$Inspector$inspectType = F3(
	function (config, tipe, context) {
		return A4(
			$stil4m$elm_syntax$Elm$Inspector$actionLambda,
			config.S,
			A2(
				$stil4m$elm_syntax$Elm$Inspector$inspectTypeInner,
				config,
				$stil4m$elm_syntax$Elm$Syntax$Node$value(tipe)),
			tipe,
			context);
	});
var $stil4m$elm_syntax$Elm$Inspector$inspectTypeAlias = F3(
	function (config, pair, context) {
		var typeAlias = pair.b;
		return A4(
			$stil4m$elm_syntax$Elm$Inspector$actionLambda,
			config.T,
			A2($stil4m$elm_syntax$Elm$Inspector$inspectTypeAnnotation, config, typeAlias.a2),
			pair,
			context);
	});
var $stil4m$elm_syntax$Elm$Inspector$inspectDeclaration = F3(
	function (config, _v0, context) {
		var r = _v0.a;
		var declaration = _v0.b;
		switch (declaration.$) {
			case 0:
				var _function = declaration.a;
				return A3(
					$stil4m$elm_syntax$Elm$Inspector$inspectFunction,
					config,
					A2($stil4m$elm_syntax$Elm$Syntax$Node$Node, r, _function),
					context);
			case 1:
				var typeAlias = declaration.a;
				return A3(
					$stil4m$elm_syntax$Elm$Inspector$inspectTypeAlias,
					config,
					A2($stil4m$elm_syntax$Elm$Syntax$Node$Node, r, typeAlias),
					context);
			case 2:
				var typeDecl = declaration.a;
				return A3(
					$stil4m$elm_syntax$Elm$Inspector$inspectType,
					config,
					A2($stil4m$elm_syntax$Elm$Syntax$Node$Node, r, typeDecl),
					context);
			case 3:
				var signature = declaration.a;
				return A3(
					$stil4m$elm_syntax$Elm$Inspector$inspectPortDeclaration,
					config,
					A2($stil4m$elm_syntax$Elm$Syntax$Node$Node, r, signature),
					context);
			case 4:
				var inf = declaration.a;
				return A4(
					$stil4m$elm_syntax$Elm$Inspector$actionLambda,
					config.K,
					$elm$core$Basics$identity,
					A2($stil4m$elm_syntax$Elm$Syntax$Node$Node, r, inf),
					context);
			default:
				var pattern = declaration.a;
				var expresion = declaration.b;
				return A3(
					$stil4m$elm_syntax$Elm$Inspector$inspectDestructuring,
					config,
					A2(
						$stil4m$elm_syntax$Elm$Syntax$Node$Node,
						r,
						_Utils_Tuple2(pattern, expresion)),
					context);
		}
	});
var $stil4m$elm_syntax$Elm$Inspector$inspectDeclarations = F3(
	function (config, declarations, context) {
		return A3(
			$elm$core$List$foldl,
			$stil4m$elm_syntax$Elm$Inspector$inspectDeclaration(config),
			context,
			declarations);
	});
var $stil4m$elm_syntax$Elm$Inspector$inspectImport = F3(
	function (config, imp, context) {
		return A4($stil4m$elm_syntax$Elm$Inspector$actionLambda, config.J, $elm$core$Basics$identity, imp, context);
	});
var $stil4m$elm_syntax$Elm$Inspector$inspectImports = F3(
	function (config, imports, context) {
		return A3(
			$elm$core$List$foldl,
			$stil4m$elm_syntax$Elm$Inspector$inspectImport(config),
			context,
			imports);
	});
var $stil4m$elm_syntax$Elm$Inspector$inspect = F3(
	function (config, file, context) {
		return A4(
			$stil4m$elm_syntax$Elm$Inspector$actionLambda,
			config.G,
			A2(
				$elm$core$Basics$composeR,
				A2($stil4m$elm_syntax$Elm$Inspector$inspectImports, config, file.aO),
				A2($stil4m$elm_syntax$Elm$Inspector$inspectDeclarations, config, file.ac)),
			file,
			context);
	});
var $stil4m$elm_syntax$Elm$Processing$Documentation$isDocumentationForRange = F2(
	function (range, _v0) {
		var commentRange = _v0.a;
		var commentText = _v0.b;
		if (A2($elm$core$String$startsWith, '{-|', commentText)) {
			var functionStartRow = range.V.aA;
			return _Utils_eq(commentRange.af.aA + 1, functionStartRow);
		} else {
			return false;
		}
	});
var $stil4m$elm_syntax$Elm$Processing$Documentation$replaceDeclaration = F2(
	function (_v0, _v1) {
		var r1 = _v0.a;
		var _new = _v0.b;
		var r2 = _v1.a;
		var old = _v1.b;
		return A2(
			$stil4m$elm_syntax$Elm$Syntax$Node$Node,
			r2,
			_Utils_eq(r1, r2) ? _new : old);
	});
var $stil4m$elm_syntax$Elm$Processing$Documentation$onFunction = F2(
	function (_v0, file) {
		var functionRange = _v0.a;
		var _function = _v0.b;
		var docs = A2(
			$elm$core$List$filter,
			$stil4m$elm_syntax$Elm$Processing$Documentation$isDocumentationForRange(functionRange),
			file.y);
		var _v1 = $elm$core$List$head(docs);
		if (!_v1.$) {
			var doc = _v1.a;
			var docRange = doc.a;
			var docString = doc.b;
			return _Utils_update(
				file,
				{
					y: A2(
						$elm$core$List$filter,
						$elm$core$Basics$neq(doc),
						file.y),
					ac: A2(
						$elm$core$List$map,
						$stil4m$elm_syntax$Elm$Processing$Documentation$replaceDeclaration(
							A2(
								$stil4m$elm_syntax$Elm$Syntax$Node$Node,
								functionRange,
								$stil4m$elm_syntax$Elm$Syntax$Declaration$FunctionDeclaration(
									_Utils_update(
										_function,
										{
											aM: $elm$core$Maybe$Just(
												A2($stil4m$elm_syntax$Elm$Syntax$Node$Node, docRange, docString))
										})))),
						file.ac)
				});
		} else {
			return file;
		}
	});
var $stil4m$elm_syntax$Elm$Processing$Documentation$onType = F2(
	function (_v0, file) {
		var r = _v0.a;
		var customType = _v0.b;
		var docs = A2(
			$elm$core$List$filter,
			$stil4m$elm_syntax$Elm$Processing$Documentation$isDocumentationForRange(r),
			file.y);
		var _v1 = $elm$core$List$head(docs);
		if (!_v1.$) {
			var doc = _v1.a;
			var docRange = doc.a;
			var docString = doc.b;
			return _Utils_update(
				file,
				{
					y: A2(
						$elm$core$List$filter,
						$elm$core$Basics$neq(doc),
						file.y),
					ac: A2(
						$elm$core$List$map,
						$stil4m$elm_syntax$Elm$Processing$Documentation$replaceDeclaration(
							A2(
								$stil4m$elm_syntax$Elm$Syntax$Node$Node,
								r,
								$stil4m$elm_syntax$Elm$Syntax$Declaration$CustomTypeDeclaration(
									_Utils_update(
										customType,
										{
											aM: $elm$core$Maybe$Just(
												A2($stil4m$elm_syntax$Elm$Syntax$Node$Node, docRange, docString))
										})))),
						file.ac)
				});
		} else {
			return file;
		}
	});
var $stil4m$elm_syntax$Elm$Processing$Documentation$onTypeAlias = F2(
	function (_v0, file) {
		var r = _v0.a;
		var typeAlias = _v0.b;
		var docs = A2(
			$elm$core$List$filter,
			$stil4m$elm_syntax$Elm$Processing$Documentation$isDocumentationForRange(r),
			file.y);
		var _v1 = $elm$core$List$head(docs);
		if (!_v1.$) {
			var doc = _v1.a;
			var docRange = doc.a;
			var docString = doc.b;
			return _Utils_update(
				file,
				{
					y: A2(
						$elm$core$List$filter,
						$elm$core$Basics$neq(doc),
						file.y),
					ac: A2(
						$elm$core$List$map,
						$stil4m$elm_syntax$Elm$Processing$Documentation$replaceDeclaration(
							A2(
								$stil4m$elm_syntax$Elm$Syntax$Node$Node,
								r,
								$stil4m$elm_syntax$Elm$Syntax$Declaration$AliasDeclaration(
									_Utils_update(
										typeAlias,
										{
											aM: $elm$core$Maybe$Just(
												A2($stil4m$elm_syntax$Elm$Syntax$Node$Node, docRange, docString))
										})))),
						file.ac)
				});
		} else {
			return file;
		}
	});
var $stil4m$elm_syntax$Elm$Processing$Documentation$postProcess = function (file) {
	return A3(
		$stil4m$elm_syntax$Elm$Inspector$inspect,
		_Utils_update(
			$stil4m$elm_syntax$Elm$Inspector$defaultConfig,
			{
				H: $stil4m$elm_syntax$Elm$Inspector$Post($stil4m$elm_syntax$Elm$Processing$Documentation$onFunction),
				S: $stil4m$elm_syntax$Elm$Inspector$Post($stil4m$elm_syntax$Elm$Processing$Documentation$onType),
				T: $stil4m$elm_syntax$Elm$Inspector$Post($stil4m$elm_syntax$Elm$Processing$Documentation$onTypeAlias)
			}),
		file,
		file);
};
var $stil4m$elm_syntax$Elm$Interface$operators = $elm$core$List$filterMap(
	function (i) {
		if (i.$ === 3) {
			var o = i.a;
			return $elm$core$Maybe$Just(o);
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $stil4m$elm_syntax$Elm$Syntax$Exposing$operator = function (t) {
	if (!t.$) {
		var s = t.a;
		return $elm$core$Maybe$Just(s);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $stil4m$elm_syntax$Elm$Syntax$Exposing$operators = function (l) {
	return A2($elm$core$List$filterMap, $stil4m$elm_syntax$Elm$Syntax$Exposing$operator, l);
};
var $stil4m$elm_syntax$Elm$Processing$buildSingle = F2(
	function (imp, moduleIndex) {
		var _v0 = imp.k;
		if (_v0.$ === 1) {
			return _List_Nil;
		} else {
			if (!_v0.a.b.$) {
				var _v1 = _v0.a;
				return A2(
					$elm$core$List$map,
					function (x) {
						return _Utils_Tuple2(
							$stil4m$elm_syntax$Elm$Syntax$Node$value(x.aY),
							x);
					},
					$stil4m$elm_syntax$Elm$Interface$operators(
						A2(
							$elm$core$Maybe$withDefault,
							_List_Nil,
							A2(
								$elm$core$Dict$get,
								$stil4m$elm_syntax$Elm$Syntax$Node$value(imp.m),
								moduleIndex))));
			} else {
				var _v2 = _v0.a;
				var l = _v2.b.a;
				var selectedOperators = $stil4m$elm_syntax$Elm$Syntax$Exposing$operators(
					A2($elm$core$List$map, $stil4m$elm_syntax$Elm$Syntax$Node$value, l));
				return A2(
					$elm$core$List$filter,
					A2(
						$elm$core$Basics$composeR,
						$elm$core$Tuple$first,
						function (elem) {
							return A2($elm$core$List$member, elem, selectedOperators);
						}),
					A2(
						$elm$core$List$map,
						function (x) {
							return _Utils_Tuple2(
								$stil4m$elm_syntax$Elm$Syntax$Node$value(x.aY),
								x);
						},
						$stil4m$elm_syntax$Elm$Interface$operators(
							A2(
								$elm$core$Maybe$withDefault,
								_List_Nil,
								A2(
									$elm$core$Dict$get,
									$stil4m$elm_syntax$Elm$Syntax$Node$value(imp.m),
									moduleIndex)))));
			}
		}
	});
var $stil4m$elm_syntax$Elm$DefaultImports$defaults = _List_fromArray(
	[
		{
		k: $elm$core$Maybe$Just(
			A2(
				$stil4m$elm_syntax$Elm$Syntax$Node$Node,
				$stil4m$elm_syntax$Elm$Syntax$Range$emptyRange,
				$stil4m$elm_syntax$Elm$Syntax$Exposing$All($stil4m$elm_syntax$Elm$Syntax$Range$emptyRange))),
		l: $elm$core$Maybe$Nothing,
		m: A2(
			$stil4m$elm_syntax$Elm$Syntax$Node$Node,
			$stil4m$elm_syntax$Elm$Syntax$Range$emptyRange,
			_List_fromArray(
				['Basics']))
	},
		{
		k: $elm$core$Maybe$Just(
			A2(
				$stil4m$elm_syntax$Elm$Syntax$Node$Node,
				$stil4m$elm_syntax$Elm$Syntax$Range$emptyRange,
				$stil4m$elm_syntax$Elm$Syntax$Exposing$Explicit(
					_List_fromArray(
						[
							A2(
							$stil4m$elm_syntax$Elm$Syntax$Node$Node,
							$stil4m$elm_syntax$Elm$Syntax$Range$emptyRange,
							$stil4m$elm_syntax$Elm$Syntax$Exposing$TypeExpose(
								A2($stil4m$elm_syntax$Elm$Syntax$Exposing$ExposedType, 'List', $elm$core$Maybe$Nothing))),
							A2(
							$stil4m$elm_syntax$Elm$Syntax$Node$Node,
							$stil4m$elm_syntax$Elm$Syntax$Range$emptyRange,
							$stil4m$elm_syntax$Elm$Syntax$Exposing$InfixExpose('::'))
						])))),
		l: $elm$core$Maybe$Nothing,
		m: A2(
			$stil4m$elm_syntax$Elm$Syntax$Node$Node,
			$stil4m$elm_syntax$Elm$Syntax$Range$emptyRange,
			_List_fromArray(
				['List']))
	},
		{
		k: $elm$core$Maybe$Just(
			A2(
				$stil4m$elm_syntax$Elm$Syntax$Node$Node,
				$stil4m$elm_syntax$Elm$Syntax$Range$emptyRange,
				$stil4m$elm_syntax$Elm$Syntax$Exposing$Explicit(
					_List_fromArray(
						[
							A2(
							$stil4m$elm_syntax$Elm$Syntax$Node$Node,
							$stil4m$elm_syntax$Elm$Syntax$Range$emptyRange,
							$stil4m$elm_syntax$Elm$Syntax$Exposing$TypeExpose(
								A2(
									$stil4m$elm_syntax$Elm$Syntax$Exposing$ExposedType,
									'Maybe',
									$elm$core$Maybe$Just($stil4m$elm_syntax$Elm$Syntax$Range$emptyRange))))
						])))),
		l: $elm$core$Maybe$Nothing,
		m: A2(
			$stil4m$elm_syntax$Elm$Syntax$Node$Node,
			$stil4m$elm_syntax$Elm$Syntax$Range$emptyRange,
			_List_fromArray(
				['Maybe']))
	},
		{
		k: $elm$core$Maybe$Just(
			A2(
				$stil4m$elm_syntax$Elm$Syntax$Node$Node,
				$stil4m$elm_syntax$Elm$Syntax$Range$emptyRange,
				$stil4m$elm_syntax$Elm$Syntax$Exposing$Explicit(
					_List_fromArray(
						[
							A2(
							$stil4m$elm_syntax$Elm$Syntax$Node$Node,
							$stil4m$elm_syntax$Elm$Syntax$Range$emptyRange,
							$stil4m$elm_syntax$Elm$Syntax$Exposing$TypeExpose(
								A2(
									$stil4m$elm_syntax$Elm$Syntax$Exposing$ExposedType,
									'Result',
									$elm$core$Maybe$Just($stil4m$elm_syntax$Elm$Syntax$Range$emptyRange))))
						])))),
		l: $elm$core$Maybe$Nothing,
		m: A2(
			$stil4m$elm_syntax$Elm$Syntax$Node$Node,
			$stil4m$elm_syntax$Elm$Syntax$Range$emptyRange,
			_List_fromArray(
				['Result']))
	},
		{
		k: $elm$core$Maybe$Nothing,
		l: $elm$core$Maybe$Nothing,
		m: A2(
			$stil4m$elm_syntax$Elm$Syntax$Node$Node,
			$stil4m$elm_syntax$Elm$Syntax$Range$emptyRange,
			_List_fromArray(
				['String']))
	},
		{
		k: $elm$core$Maybe$Nothing,
		l: $elm$core$Maybe$Nothing,
		m: A2(
			$stil4m$elm_syntax$Elm$Syntax$Node$Node,
			$stil4m$elm_syntax$Elm$Syntax$Range$emptyRange,
			_List_fromArray(
				['Tuple']))
	},
		{
		k: $elm$core$Maybe$Nothing,
		l: $elm$core$Maybe$Nothing,
		m: A2(
			$stil4m$elm_syntax$Elm$Syntax$Node$Node,
			$stil4m$elm_syntax$Elm$Syntax$Range$emptyRange,
			_List_fromArray(
				['Debug']))
	},
		{
		k: $elm$core$Maybe$Just(
			A2(
				$stil4m$elm_syntax$Elm$Syntax$Node$Node,
				$stil4m$elm_syntax$Elm$Syntax$Range$emptyRange,
				$stil4m$elm_syntax$Elm$Syntax$Exposing$Explicit(
					_List_fromArray(
						[
							A2(
							$stil4m$elm_syntax$Elm$Syntax$Node$Node,
							$stil4m$elm_syntax$Elm$Syntax$Range$emptyRange,
							$stil4m$elm_syntax$Elm$Syntax$Exposing$TypeExpose(
								A2($stil4m$elm_syntax$Elm$Syntax$Exposing$ExposedType, 'Program', $elm$core$Maybe$Nothing)))
						])))),
		l: $elm$core$Maybe$Nothing,
		m: A2(
			$stil4m$elm_syntax$Elm$Syntax$Node$Node,
			$stil4m$elm_syntax$Elm$Syntax$Range$emptyRange,
			_List_fromArray(
				['Platform']))
	},
		{
		k: $elm$core$Maybe$Just(
			A2(
				$stil4m$elm_syntax$Elm$Syntax$Node$Node,
				$stil4m$elm_syntax$Elm$Syntax$Range$emptyRange,
				$stil4m$elm_syntax$Elm$Syntax$Exposing$Explicit(
					_List_fromArray(
						[
							A2(
							$stil4m$elm_syntax$Elm$Syntax$Node$Node,
							$stil4m$elm_syntax$Elm$Syntax$Range$emptyRange,
							$stil4m$elm_syntax$Elm$Syntax$Exposing$TypeExpose(
								A2($stil4m$elm_syntax$Elm$Syntax$Exposing$ExposedType, 'Cmd', $elm$core$Maybe$Nothing))),
							A2(
							$stil4m$elm_syntax$Elm$Syntax$Node$Node,
							$stil4m$elm_syntax$Elm$Syntax$Range$emptyRange,
							$stil4m$elm_syntax$Elm$Syntax$Exposing$InfixExpose('!'))
						])))),
		l: $elm$core$Maybe$Nothing,
		m: A2(
			$stil4m$elm_syntax$Elm$Syntax$Node$Node,
			$stil4m$elm_syntax$Elm$Syntax$Range$emptyRange,
			_List_fromArray(
				['Platform', 'Cmd']))
	},
		{
		k: $elm$core$Maybe$Just(
			A2(
				$stil4m$elm_syntax$Elm$Syntax$Node$Node,
				$stil4m$elm_syntax$Elm$Syntax$Range$emptyRange,
				$stil4m$elm_syntax$Elm$Syntax$Exposing$Explicit(
					_List_fromArray(
						[
							A2(
							$stil4m$elm_syntax$Elm$Syntax$Node$Node,
							$stil4m$elm_syntax$Elm$Syntax$Range$emptyRange,
							$stil4m$elm_syntax$Elm$Syntax$Exposing$TypeExpose(
								A2($stil4m$elm_syntax$Elm$Syntax$Exposing$ExposedType, 'Sub', $elm$core$Maybe$Nothing)))
						])))),
		l: $elm$core$Maybe$Nothing,
		m: A2(
			$stil4m$elm_syntax$Elm$Syntax$Node$Node,
			$stil4m$elm_syntax$Elm$Syntax$Range$emptyRange,
			_List_fromArray(
				['Platform', 'Sub']))
	}
	]);
var $stil4m$elm_syntax$Elm$RawFile$imports = function (_v0) {
	var file = _v0;
	return A2($elm$core$List$map, $stil4m$elm_syntax$Elm$Syntax$Node$value, file.aO);
};
var $stil4m$elm_syntax$Elm$Processing$tableForFile = F2(
	function (rawFile, _v0) {
		var moduleIndex = _v0;
		return $elm$core$Dict$fromList(
			A2(
				$elm$core$List$concatMap,
				function (a) {
					return A2($stil4m$elm_syntax$Elm$Processing$buildSingle, a, moduleIndex);
				},
				_Utils_ap(
					$stil4m$elm_syntax$Elm$DefaultImports$defaults,
					$stil4m$elm_syntax$Elm$RawFile$imports(rawFile))));
	});
var $stil4m$elm_syntax$Elm$Syntax$Node$map = F2(
	function (f, _v0) {
		var r = _v0.a;
		var a = _v0.b;
		return A2(
			$stil4m$elm_syntax$Elm$Syntax$Node$Node,
			r,
			f(a));
	});
var $stil4m$elm_syntax$Elm$Processing$visitExpression = F3(
	function (visitor, context, expression) {
		var inner = A2($stil4m$elm_syntax$Elm$Processing$visitExpressionInner, visitor, context);
		return A3(
			A2(
				$elm$core$Maybe$withDefault,
				F3(
					function (_v4, nest, expr) {
						return nest(expr);
					}),
				visitor),
			context,
			inner,
			expression);
	});
var $stil4m$elm_syntax$Elm$Processing$visitExpressionInner = F3(
	function (visitor, context, _v2) {
		var range = _v2.a;
		var expression = _v2.b;
		var subVisit = A2($stil4m$elm_syntax$Elm$Processing$visitExpression, visitor, context);
		return function (newExpr) {
			return A2($stil4m$elm_syntax$Elm$Syntax$Node$Node, range, newExpr);
		}(
			function () {
				switch (expression.$) {
					case 1:
						var expressionList = expression.a;
						return $stil4m$elm_syntax$Elm$Syntax$Expression$Application(
							A2($elm$core$List$map, subVisit, expressionList));
					case 2:
						var op = expression.a;
						var dir = expression.b;
						var left = expression.c;
						var right = expression.d;
						return A4(
							$stil4m$elm_syntax$Elm$Syntax$Expression$OperatorApplication,
							op,
							dir,
							subVisit(left),
							subVisit(right));
					case 4:
						var e1 = expression.a;
						var e2 = expression.b;
						var e3 = expression.c;
						return A3(
							$stil4m$elm_syntax$Elm$Syntax$Expression$IfBlock,
							subVisit(e1),
							subVisit(e2),
							subVisit(e3));
					case 13:
						var expressionList = expression.a;
						return $stil4m$elm_syntax$Elm$Syntax$Expression$TupledExpression(
							A2($elm$core$List$map, subVisit, expressionList));
					case 14:
						var expr1 = expression.a;
						return $stil4m$elm_syntax$Elm$Syntax$Expression$ParenthesizedExpression(
							subVisit(expr1));
					case 15:
						var letBlock = expression.a;
						return $stil4m$elm_syntax$Elm$Syntax$Expression$LetExpression(
							{
								ac: A3($stil4m$elm_syntax$Elm$Processing$visitLetDeclarations, visitor, context, letBlock.ac),
								z: subVisit(letBlock.z)
							});
					case 16:
						var caseBlock = expression.a;
						return $stil4m$elm_syntax$Elm$Syntax$Expression$CaseExpression(
							{
								aI: A2(
									$elm$core$List$map,
									$elm$core$Tuple$mapSecond(subVisit),
									caseBlock.aI),
								z: subVisit(caseBlock.z)
							});
					case 17:
						var lambda = expression.a;
						return $stil4m$elm_syntax$Elm$Syntax$Expression$LambdaExpression(
							_Utils_update(
								lambda,
								{
									z: subVisit(lambda.z)
								}));
					case 18:
						var expressionStringList = expression.a;
						return $stil4m$elm_syntax$Elm$Syntax$Expression$RecordExpr(
							A2(
								$elm$core$List$map,
								$stil4m$elm_syntax$Elm$Syntax$Node$map(
									$elm$core$Tuple$mapSecond(subVisit)),
								expressionStringList));
					case 19:
						var expressionList = expression.a;
						return $stil4m$elm_syntax$Elm$Syntax$Expression$ListExpr(
							A2($elm$core$List$map, subVisit, expressionList));
					case 22:
						var name = expression.a;
						var updates = expression.b;
						return A2(
							$stil4m$elm_syntax$Elm$Syntax$Expression$RecordUpdateExpression,
							name,
							A2(
								$elm$core$List$map,
								$stil4m$elm_syntax$Elm$Syntax$Node$map(
									$elm$core$Tuple$mapSecond(subVisit)),
								updates));
					default:
						return expression;
				}
			}());
	});
var $stil4m$elm_syntax$Elm$Processing$visitFunctionDecl = F3(
	function (visitor, context, _function) {
		var newFunctionDeclaration = A2(
			$stil4m$elm_syntax$Elm$Syntax$Node$map,
			A2($stil4m$elm_syntax$Elm$Processing$visitFunctionDeclaration, visitor, context),
			_function.aK);
		return _Utils_update(
			_function,
			{aK: newFunctionDeclaration});
	});
var $stil4m$elm_syntax$Elm$Processing$visitFunctionDeclaration = F3(
	function (visitor, context, functionDeclaration) {
		var newExpression = A3($stil4m$elm_syntax$Elm$Processing$visitExpression, visitor, context, functionDeclaration.z);
		return _Utils_update(
			functionDeclaration,
			{z: newExpression});
	});
var $stil4m$elm_syntax$Elm$Processing$visitLetDeclaration = F3(
	function (visitor, context, _v0) {
		var range = _v0.a;
		var declaration = _v0.b;
		return A2(
			$stil4m$elm_syntax$Elm$Syntax$Node$Node,
			range,
			function () {
				if (!declaration.$) {
					var _function = declaration.a;
					return $stil4m$elm_syntax$Elm$Syntax$Expression$LetFunction(
						A3($stil4m$elm_syntax$Elm$Processing$visitFunctionDecl, visitor, context, _function));
				} else {
					var pattern = declaration.a;
					var expression = declaration.b;
					return A2(
						$stil4m$elm_syntax$Elm$Syntax$Expression$LetDestructuring,
						pattern,
						A3($stil4m$elm_syntax$Elm$Processing$visitExpression, visitor, context, expression));
				}
			}());
	});
var $stil4m$elm_syntax$Elm$Processing$visitLetDeclarations = F3(
	function (visitor, context, declarations) {
		return A2(
			$elm$core$List$map,
			A2($stil4m$elm_syntax$Elm$Processing$visitLetDeclaration, visitor, context),
			declarations);
	});
var $stil4m$elm_syntax$Elm$Processing$visitDeclaration = F3(
	function (visitor, context, _v0) {
		var range = _v0.a;
		var declaration = _v0.b;
		return A2(
			$stil4m$elm_syntax$Elm$Syntax$Node$Node,
			range,
			function () {
				if (!declaration.$) {
					var _function = declaration.a;
					return $stil4m$elm_syntax$Elm$Syntax$Declaration$FunctionDeclaration(
						A3($stil4m$elm_syntax$Elm$Processing$visitFunctionDecl, visitor, context, _function));
				} else {
					return declaration;
				}
			}());
	});
var $stil4m$elm_syntax$Elm$Processing$visitDeclarations = F3(
	function (visitor, context, declarations) {
		return A2(
			$elm$core$List$map,
			A2($stil4m$elm_syntax$Elm$Processing$visitDeclaration, visitor, context),
			declarations);
	});
var $stil4m$elm_syntax$Elm$Processing$visit = F3(
	function (visitor, context, file) {
		var newDeclarations = A3($stil4m$elm_syntax$Elm$Processing$visitDeclarations, visitor, context, file.ac);
		return _Utils_update(
			file,
			{ac: newDeclarations});
	});
var $stil4m$elm_syntax$Elm$Processing$process = F2(
	function (processContext, rawFile) {
		var file = rawFile;
		var table = A2($stil4m$elm_syntax$Elm$Processing$tableForFile, rawFile, processContext);
		var operatorFixed = A3(
			$stil4m$elm_syntax$Elm$Processing$visit,
			$elm$core$Maybe$Just(
				F3(
					function (context, inner, expression) {
						return inner(
							function () {
								if (expression.b.$ === 1) {
									var r = expression.a;
									var args = expression.b.a;
									return A2(
										$stil4m$elm_syntax$Elm$Syntax$Node$Node,
										r,
										A2($stil4m$elm_syntax$Elm$Processing$fixApplication, context, args));
								} else {
									return expression;
								}
							}());
					})),
			table,
			file);
		var documentationFixed = $stil4m$elm_syntax$Elm$Processing$Documentation$postProcess(operatorFixed);
		return documentationFixed;
	});
var $author$project$Main$parseElm = function (schema) {
	return A2(
		$elm$core$Result$map,
		$stil4m$elm_syntax$Elm$Processing$process($stil4m$elm_syntax$Elm$Processing$init),
		A2(
			$elm$core$Result$mapError,
			$author$project$Main$ParseSchemaError,
			$stil4m$elm_syntax$Elm$Parser$parse(schema)));
};
var $author$project$Main$ContainsBadDeclarations = function (a) {
	return {$: 6, a: a};
};
var $author$project$Main$ContainsImports = {$: 5};
var $author$project$Main$DoesNotExposeAll = {$: 4};
var $author$project$Main$IsEffectModule = {$: 3};
var $author$project$Main$IsPortModule = {$: 2};
var $author$project$Main$MissingFromElmMessageDeclaration = {$: 7};
var $author$project$Main$MissingToElmMessageDeclaration = {$: 8};
var $elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var $author$project$Schema$declarationName = function (declaration) {
	if (!declaration.$) {
		var name = declaration.a.f;
		return name;
	} else {
		var name = declaration.a.f;
		return name;
	}
};
var $stil4m$elm_syntax$Elm$Syntax$Module$exposingList = function (m) {
	switch (m.$) {
		case 0:
			var x = m.a;
			return $stil4m$elm_syntax$Elm$Syntax$Node$value(x.k);
		case 1:
			var x = m.a;
			return $stil4m$elm_syntax$Elm$Syntax$Node$value(x.k);
		default:
			var x = m.a;
			return $stil4m$elm_syntax$Elm$Syntax$Node$value(x.k);
	}
};
var $author$project$Main$exposesAll = function (file) {
	var _v0 = $stil4m$elm_syntax$Elm$Syntax$Module$exposingList(
		$stil4m$elm_syntax$Elm$Syntax$Node$value(file.C));
	if (!_v0.$) {
		return true;
	} else {
		return false;
	}
};
var $stil4m$elm_syntax$Elm$Syntax$Module$isEffectModule = function (m) {
	if (m.$ === 2) {
		return true;
	} else {
		return false;
	}
};
var $stil4m$elm_syntax$Elm$Syntax$Module$isPortModule = function (m) {
	if (m.$ === 1) {
		return true;
	} else {
		return false;
	}
};
var $elm_community$result_extra$Result$Extra$partition = function (rs) {
	return A3(
		$elm$core$List$foldr,
		F2(
			function (r, _v0) {
				var succ = _v0.a;
				var err = _v0.b;
				if (!r.$) {
					var v = r.a;
					return _Utils_Tuple2(
						A2($elm$core$List$cons, v, succ),
						err);
				} else {
					var v = r.a;
					return _Utils_Tuple2(
						succ,
						A2($elm$core$List$cons, v, err));
				}
			}),
		_Utils_Tuple2(_List_Nil, _List_Nil),
		rs);
};
var $author$project$Schema$CustomTypeDeclaration = function (a) {
	return {$: 1, a: a};
};
var $author$project$Main$IsValue = 0;
var $author$project$Schema$TypeAliasDeclaration = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Result$map2 = F3(
	function (func, ra, rb) {
		if (ra.$ === 1) {
			var x = ra.a;
			return $elm$core$Result$Err(x);
		} else {
			var a = ra.a;
			if (rb.$ === 1) {
				var x = rb.a;
				return $elm$core$Result$Err(x);
			} else {
				var b = rb.a;
				return $elm$core$Result$Ok(
					A2(func, a, b));
			}
		}
	});
var $elm_community$result_extra$Result$Extra$combine = A2(
	$elm$core$List$foldr,
	$elm$core$Result$map2($elm$core$List$cons),
	$elm$core$Result$Ok(_List_Nil));
var $author$project$Schema$Bool = {$: 1};
var $author$project$Schema$Char = {$: 4};
var $author$project$Main$ContainsFunction = 2;
var $author$project$Main$ContainsInvalidReference = 3;
var $author$project$Main$ContainsInvalidTuple = 4;
var $author$project$Schema$Float = {$: 3};
var $author$project$Schema$Int = {$: 2};
var $author$project$Main$IsParametric = 1;
var $author$project$Schema$List = function (a) {
	return {$: 6, a: a};
};
var $author$project$Schema$Maybe = function (a) {
	return {$: 11, a: a};
};
var $author$project$Schema$Record = function (a) {
	return {$: 9, a: a};
};
var $author$project$Schema$Result = F2(
	function (a, b) {
		return {$: 12, a: a, b: b};
	});
var $author$project$Schema$String = {$: 5};
var $author$project$Schema$Tuple = F2(
	function (a, b) {
		return {$: 7, a: a, b: b};
	});
var $author$project$Schema$Tuple3 = F3(
	function (a, b, c) {
		return {$: 8, a: a, b: b, c: c};
	});
var $author$project$Schema$TypeRef = function (a) {
	return {$: 10, a: a};
};
var $author$project$Schema$Unit = {$: 0};
var $author$project$Main$schemaTypeFromElmTypeAnnotation = function (typeAnnotation) {
	switch (typeAnnotation.$) {
		case 0:
			return $elm$core$Result$Err(1);
		case 2:
			return $elm$core$Result$Ok($author$project$Schema$Unit);
		case 1:
			var _v1 = typeAnnotation.a;
			var _v2 = _v1.b;
			var moduleName = _v2.a;
			var typeName = _v2.b;
			var typeAnnotations = typeAnnotation.b;
			var typeParameters = $elm_community$result_extra$Result$Extra$combine(
				A2(
					$elm$core$List$map,
					A2($elm$core$Basics$composeL, $author$project$Main$schemaTypeFromElmTypeAnnotation, $stil4m$elm_syntax$Elm$Syntax$Node$value),
					typeAnnotations));
			var _v3 = _Utils_Tuple3(moduleName, typeName, typeParameters);
			_v3$10:
			while (true) {
				if (!_v3.a.b) {
					if (!_v3.c.$) {
						if (_v3.c.a.b) {
							if (!_v3.c.a.b.b) {
								switch (_v3.b) {
									case 'List':
										var _v4 = _v3.c.a;
										var t = _v4.a;
										return $elm$core$Result$Ok(
											$author$project$Schema$List(t));
									case 'Maybe':
										var _v5 = _v3.c.a;
										var t = _v5.a;
										return $elm$core$Result$Ok(
											$author$project$Schema$Maybe(t));
									default:
										break _v3$10;
								}
							} else {
								if ((_v3.b === 'Result') && (!_v3.c.a.b.b.b)) {
									var _v6 = _v3.c.a;
									var t1 = _v6.a;
									var _v7 = _v6.b;
									var t2 = _v7.a;
									return $elm$core$Result$Ok(
										A2($author$project$Schema$Result, t1, t2));
								} else {
									break _v3$10;
								}
							}
						} else {
							switch (_v3.b) {
								case 'Bool':
									return $elm$core$Result$Ok($author$project$Schema$Bool);
								case 'Int':
									return $elm$core$Result$Ok($author$project$Schema$Int);
								case 'Float':
									return $elm$core$Result$Ok($author$project$Schema$Float);
								case 'Char':
									return $elm$core$Result$Ok($author$project$Schema$Char);
								case 'String':
									return $elm$core$Result$Ok($author$project$Schema$String);
								default:
									var s = _v3.b;
									return $elm$core$Result$Ok(
										$author$project$Schema$TypeRef(s));
							}
						}
					} else {
						var err = _v3.c.a;
						return $elm$core$Result$Err(err);
					}
				} else {
					break _v3$10;
				}
			}
			return $elm$core$Result$Err(3);
		case 3:
			var typeAnnotations = typeAnnotation.a;
			var typeParameters = $elm_community$result_extra$Result$Extra$combine(
				A2(
					$elm$core$List$map,
					A2($elm$core$Basics$composeL, $author$project$Main$schemaTypeFromElmTypeAnnotation, $stil4m$elm_syntax$Elm$Syntax$Node$value),
					typeAnnotations));
			_v8$3:
			while (true) {
				if (typeParameters.$ === 1) {
					var err = typeParameters.a;
					return $elm$core$Result$Err(err);
				} else {
					if (typeParameters.a.b && typeParameters.a.b.b) {
						if (!typeParameters.a.b.b.b) {
							var _v9 = typeParameters.a;
							var t1 = _v9.a;
							var _v10 = _v9.b;
							var t2 = _v10.a;
							return $elm$core$Result$Ok(
								A2($author$project$Schema$Tuple, t1, t2));
						} else {
							if (!typeParameters.a.b.b.b.b) {
								var _v11 = typeParameters.a;
								var t1 = _v11.a;
								var _v12 = _v11.b;
								var t2 = _v12.a;
								var _v13 = _v12.b;
								var t3 = _v13.a;
								return $elm$core$Result$Ok(
									A3($author$project$Schema$Tuple3, t1, t2, t3));
							} else {
								break _v8$3;
							}
						}
					} else {
						break _v8$3;
					}
				}
			}
			return $elm$core$Result$Err(4);
		case 4:
			var recordFields = typeAnnotation.a;
			return A2(
				$elm$core$Result$map,
				$author$project$Schema$Record,
				$elm_community$result_extra$Result$Extra$combine(
					A2(
						$elm$core$List$map,
						function (_v14) {
							var _v15 = _v14.b;
							var _v16 = _v15.a;
							var fieldName = _v16.b;
							var _v17 = _v15.b;
							var fieldTypeAnnotation = _v17.b;
							return A2(
								$elm$core$Result$map,
								function (schemaType) {
									return {f: fieldName, X: schemaType};
								},
								$author$project$Main$schemaTypeFromElmTypeAnnotation(fieldTypeAnnotation));
						},
						recordFields)));
		case 5:
			return $elm$core$Result$Err(1);
		default:
			return $elm$core$Result$Err(2);
	}
};
var $author$project$Main$schemaDeclarationFromElmDeclaration = function (elmDeclaration) {
	switch (elmDeclaration.$) {
		case 1:
			var name = elmDeclaration.a.f;
			var typeAnnotation = elmDeclaration.a.a2;
			return A2(
				$elm$core$Result$map,
				function (schemaType) {
					return $author$project$Schema$TypeAliasDeclaration(
						{
							ad: schemaType,
							f: $stil4m$elm_syntax$Elm$Syntax$Node$value(name)
						});
				},
				$author$project$Main$schemaTypeFromElmTypeAnnotation(
					$stil4m$elm_syntax$Elm$Syntax$Node$value(typeAnnotation)));
		case 2:
			var customType = elmDeclaration.a;
			return A2(
				$elm$core$Result$map,
				function (schemaConstructors) {
					return $author$project$Schema$CustomTypeDeclaration(
						{
							B: schemaConstructors,
							f: $stil4m$elm_syntax$Elm$Syntax$Node$value(customType.f)
						});
				},
				$elm_community$result_extra$Result$Extra$combine(
					A2(
						$elm$core$List$map,
						function (_v1) {
							var name = _v1.b.f;
							var _arguments = _v1.b.w;
							return A2(
								$elm$core$Result$map,
								function (schemaArguments) {
									return {
										w: schemaArguments,
										f: $stil4m$elm_syntax$Elm$Syntax$Node$value(name)
									};
								},
								$elm_community$result_extra$Result$Extra$combine(
									A2(
										$elm$core$List$map,
										A2($elm$core$Basics$composeL, $author$project$Main$schemaTypeFromElmTypeAnnotation, $stil4m$elm_syntax$Elm$Syntax$Node$value),
										_arguments)));
						},
						customType.B)));
		default:
			return $elm$core$Result$Err(0);
	}
};
var $author$project$Main$schemaFromElm = function (file) {
	if ($stil4m$elm_syntax$Elm$Syntax$Module$isPortModule(
		$stil4m$elm_syntax$Elm$Syntax$Node$value(file.C))) {
		return $elm$core$Result$Err($author$project$Main$IsPortModule);
	} else {
		if ($stil4m$elm_syntax$Elm$Syntax$Module$isEffectModule(
			$stil4m$elm_syntax$Elm$Syntax$Node$value(file.C))) {
			return $elm$core$Result$Err($author$project$Main$IsEffectModule);
		} else {
			if (!$author$project$Main$exposesAll(file)) {
				return $elm$core$Result$Err($author$project$Main$DoesNotExposeAll);
			} else {
				if (!(!$elm$core$List$length(file.aO))) {
					return $elm$core$Result$Err($author$project$Main$ContainsImports);
				} else {
					var _v0 = $elm_community$result_extra$Result$Extra$partition(
						A2(
							$elm$core$List$map,
							$author$project$Main$schemaDeclarationFromElmDeclaration,
							A2($elm$core$List$map, $stil4m$elm_syntax$Elm$Syntax$Node$value, file.ac)));
					var schemaDeclarations = _v0.a;
					var errors = _v0.b;
					var hasFromElmMessage = A2(
						$elm$core$List$any,
						A2(
							$elm$core$Basics$composeL,
							$elm$core$Basics$eq('FromElmMessage'),
							$author$project$Schema$declarationName),
						schemaDeclarations);
					var hasToElmMessage = A2(
						$elm$core$List$any,
						A2(
							$elm$core$Basics$composeL,
							$elm$core$Basics$eq('ToElmMessage'),
							$author$project$Schema$declarationName),
						schemaDeclarations);
					return (!(!$elm$core$List$length(errors))) ? $elm$core$Result$Err(
						$author$project$Main$ContainsBadDeclarations(errors)) : ((!hasFromElmMessage) ? $elm$core$Result$Err($author$project$Main$MissingFromElmMessageDeclaration) : ((!hasToElmMessage) ? $elm$core$Result$Err($author$project$Main$MissingToElmMessageDeclaration) : $elm$core$Result$Ok(
						{ac: schemaDeclarations})));
				}
			}
		}
	}
};
var $author$project$Main$handleRequest = function (unDecodedRequest) {
	return $author$project$Main$encodeResponse(
		A2(
			$elm$core$Result$andThen,
			function (request) {
				return A2(
					$elm$core$Result$map,
					function (schema) {
						return {
							aj: A2($author$project$GenerateElm$generateElm, request.ae, schema),
							ak: $author$project$GenerateTypeScript$generateTypeScript(schema)
						};
					},
					A2(
						$elm$core$Result$andThen,
						$author$project$Main$schemaFromElm,
						$author$project$Main$parseElm(request.aB)));
			},
			$author$project$Main$decodeRequest(unDecodedRequest)));
};
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $elm$core$Platform$Sub$batch = _Platform_batch;
var $elm$core$Platform$Sub$none = $elm$core$Platform$Sub$batch(_List_Nil);
var $elm$json$Json$Decode$value = _Json_decodeValue;
var $elm$core$Platform$worker = _Platform_worker;
var $author$project$Main$main = $elm$core$Platform$worker(
	{
		aQ: function (request) {
			return _Utils_Tuple2(
				0,
				$author$project$Main$done(
					$author$project$Main$handleRequest(request)));
		},
		a1: function (_v0) {
			return $elm$core$Platform$Sub$none;
		},
		a3: F2(
			function (_v1, _v2) {
				return _Utils_Tuple2(0, $elm$core$Platform$Cmd$none);
			})
	});
_Platform_export({'Main':{'init':$author$project$Main$main($elm$json$Json$Decode$value)(0)}});}(this));

/***/ })
/******/ ]);
var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = false;
$jscomp.ASSUME_NO_NATIVE_MAP = false;
$jscomp.ASSUME_NO_NATIVE_SET = false;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || typeof Object.defineProperties == 'function' ? Object.defineProperty : function(target, property, descriptor) {
  descriptor = descriptor;
  if (target == Array.prototype || target == Object.prototype) {
    return;
  }
  target[property] = descriptor.value;
};
$jscomp.getGlobal = function(maybeGlobal) {
  return typeof window != 'undefined' && window === maybeGlobal ? maybeGlobal : typeof global != 'undefined' && global != null ? global : maybeGlobal;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function(target, polyfill, fromLang, toLang) {
  if (!polyfill) {
    return;
  }
  var obj = $jscomp.global;
  var split = target.split('.');
  for (var i = 0; i < split.length - 1; i++) {
    var key = split[i];
    if (!(key in obj)) {
      obj[key] = {};
    }
    obj = obj[key];
  }
  var property = split[split.length - 1];
  var orig = obj[property];
  var impl = polyfill(orig);
  if (impl == orig || impl == null) {
    return;
  }
  $jscomp.defineProperty(obj, property, {configurable:true, writable:true, value:impl});
};
$jscomp.polyfill('Array.prototype.copyWithin', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(target, start, opt_end) {
    var len = this.length;
    target = Number(target);
    start = Number(start);
    opt_end = Number(opt_end != null ? opt_end : len);
    if (target < start) {
      opt_end = Math.min(opt_end, len);
      while (start < opt_end) {
        if (start in this) {
          this[target++] = this[start++];
        } else {
          delete this[target++];
          start++;
        }
      }
    } else {
      opt_end = Math.min(opt_end, len + start - target);
      target += opt_end - start;
      while (opt_end > start) {
        if (--opt_end in this) {
          this[--target] = this[opt_end];
        } else {
          delete this[target];
        }
      }
    }
    return this;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.SYMBOL_PREFIX = 'jscomp_symbol_';
$jscomp.initSymbol = function() {
  $jscomp.initSymbol = function() {
  };
  if (!$jscomp.global['Symbol']) {
    $jscomp.global['Symbol'] = $jscomp.Symbol;
  }
};
$jscomp.Symbol = function() {
  var counter = 0;
  function Symbol(opt_description) {
    return $jscomp.SYMBOL_PREFIX + (opt_description || '') + counter++;
  }
  return Symbol;
}();
$jscomp.initSymbolIterator = function() {
  $jscomp.initSymbol();
  var symbolIterator = $jscomp.global['Symbol'].iterator;
  if (!symbolIterator) {
    symbolIterator = $jscomp.global['Symbol'].iterator = $jscomp.global['Symbol']('iterator');
  }
  if (typeof Array.prototype[symbolIterator] != 'function') {
    $jscomp.defineProperty(Array.prototype, symbolIterator, {configurable:true, writable:true, value:function() {
      return $jscomp.arrayIterator(this);
    }});
  }
  $jscomp.initSymbolIterator = function() {
  };
};
$jscomp.arrayIterator = function(array) {
  var index = 0;
  return $jscomp.iteratorPrototype(function() {
    if (index < array.length) {
      return {done:false, value:array[index++]};
    } else {
      return {done:true};
    }
  });
};
$jscomp.iteratorPrototype = function(next) {
  $jscomp.initSymbolIterator();
  var iterator = {next:next};
  iterator[$jscomp.global['Symbol'].iterator] = function() {
    return this;
  };
  return iterator;
};
$jscomp.iteratorFromArray = function(array, transform) {
  $jscomp.initSymbolIterator();
  if (array instanceof String) {
    array = array + '';
  }
  var i = 0;
  var iter = {next:function() {
    if (i < array.length) {
      var index = i++;
      return {value:transform(index, array[index]), done:false};
    }
    iter.next = function() {
      return {done:true, value:void 0};
    };
    return iter.next();
  }};
  iter[Symbol.iterator] = function() {
    return iter;
  };
  return iter;
};
$jscomp.polyfill('Array.prototype.entries', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function() {
    return $jscomp.iteratorFromArray(this, function(i, v) {
      return [i, v];
    });
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Array.prototype.fill', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(value, opt_start, opt_end) {
    var length = this.length || 0;
    if (opt_start < 0) {
      opt_start = Math.max(0, length + opt_start);
    }
    if (opt_end == null || opt_end > length) {
      opt_end = length;
    }
    opt_end = Number(opt_end);
    if (opt_end < 0) {
      opt_end = Math.max(0, length + opt_end);
    }
    for (var i = Number(opt_start || 0); i < opt_end; i++) {
      this[i] = value;
    }
    return this;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.findInternal = function(array, callback, thisArg) {
  if (array instanceof String) {
    array = String(array);
  }
  var len = array.length;
  for (var i = 0; i < len; i++) {
    var value = array[i];
    if (callback.call(thisArg, value, i, array)) {
      return {i:i, v:value};
    }
  }
  return {i:-1, v:void 0};
};
$jscomp.polyfill('Array.prototype.find', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(callback, opt_thisArg) {
    return $jscomp.findInternal(this, callback, opt_thisArg).v;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Array.prototype.findIndex', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(callback, opt_thisArg) {
    return $jscomp.findInternal(this, callback, opt_thisArg).i;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Array.from', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(arrayLike, opt_mapFn, opt_thisArg) {
    $jscomp.initSymbolIterator();
    opt_mapFn = opt_mapFn != null ? opt_mapFn : function(x) {
      return x;
    };
    var result = [];
    var iteratorFunction = arrayLike[Symbol.iterator];
    if (typeof iteratorFunction == 'function') {
      arrayLike = iteratorFunction.call(arrayLike);
      var next;
      while (!(next = arrayLike.next()).done) {
        result.push(opt_mapFn.call(opt_thisArg, next.value));
      }
    } else {
      var len = arrayLike.length;
      for (var i = 0; i < len; i++) {
        result.push(opt_mapFn.call(opt_thisArg, arrayLike[i]));
      }
    }
    return result;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Object.is', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(left, right) {
    if (left === right) {
      return left !== 0 || 1 / left === 1 / right;
    } else {
      return left !== left && right !== right;
    }
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Array.prototype.includes', function(orig) {
  if (orig) {
    return orig;
  }
  var includes = function(searchElement, opt_fromIndex) {
    var array = this;
    if (array instanceof String) {
      array = String(array);
    }
    var len = array.length;
    for (var i = opt_fromIndex || 0; i < len; i++) {
      if (array[i] == searchElement || Object.is(array[i], searchElement)) {
        return true;
      }
    }
    return false;
  };
  return includes;
}, 'es7', 'es3');
$jscomp.polyfill('Array.prototype.keys', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function() {
    return $jscomp.iteratorFromArray(this, function(i) {
      return i;
    });
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Array.of', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(var_args) {
    return Array.from(arguments);
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Array.prototype.values', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function() {
    return $jscomp.iteratorFromArray(this, function(k, v) {
      return v;
    });
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.makeIterator = function(iterable) {
  $jscomp.initSymbolIterator();
  var iteratorFunction = iterable[Symbol.iterator];
  return iteratorFunction ? iteratorFunction.call(iterable) : $jscomp.arrayIterator(iterable);
};
$jscomp.FORCE_POLYFILL_PROMISE = false;
$jscomp.polyfill('Promise', function(NativePromise) {
  if (NativePromise && !$jscomp.FORCE_POLYFILL_PROMISE) {
    return NativePromise;
  }
  function AsyncExecutor() {
    this.batch_ = null;
  }
  AsyncExecutor.prototype.asyncExecute = function(f) {
    if (this.batch_ == null) {
      this.batch_ = [];
      this.asyncExecuteBatch_();
    }
    this.batch_.push(f);
    return this;
  };
  AsyncExecutor.prototype.asyncExecuteBatch_ = function() {
    var self = this;
    this.asyncExecuteFunction(function() {
      self.executeBatch_();
    });
  };
  var nativeSetTimeout = $jscomp.global['setTimeout'];
  AsyncExecutor.prototype.asyncExecuteFunction = function(f) {
    nativeSetTimeout(f, 0);
  };
  AsyncExecutor.prototype.executeBatch_ = function() {
    while (this.batch_ && this.batch_.length) {
      var executingBatch = this.batch_;
      this.batch_ = [];
      for (var i = 0; i < executingBatch.length; ++i) {
        var f = executingBatch[i];
        delete executingBatch[i];
        try {
          f();
        } catch (error) {
          this.asyncThrow_(error);
        }
      }
    }
    this.batch_ = null;
  };
  AsyncExecutor.prototype.asyncThrow_ = function(exception) {
    this.asyncExecuteFunction(function() {
      throw exception;
    });
  };
  var PromiseState = {PENDING:0, FULFILLED:1, REJECTED:2};
  var PolyfillPromise = function(executor) {
    this.state_ = PromiseState.PENDING;
    this.result_ = undefined;
    this.onSettledCallbacks_ = [];
    var resolveAndReject = this.createResolveAndReject_();
    try {
      executor(resolveAndReject.resolve, resolveAndReject.reject);
    } catch (e) {
      resolveAndReject.reject(e);
    }
  };
  PolyfillPromise.prototype.createResolveAndReject_ = function() {
    var thisPromise = this;
    var alreadyCalled = false;
    function firstCallWins(method) {
      return function(x) {
        if (!alreadyCalled) {
          alreadyCalled = true;
          method.call(thisPromise, x);
        }
      };
    }
    return {resolve:firstCallWins(this.resolveTo_), reject:firstCallWins(this.reject_)};
  };
  PolyfillPromise.prototype.resolveTo_ = function(value) {
    if (value === this) {
      this.reject_(new TypeError('A Promise cannot resolve to itself'));
    } else {
      if (value instanceof PolyfillPromise) {
        this.settleSameAsPromise_(value);
      } else {
        if (isObject(value)) {
          this.resolveToNonPromiseObj_(value);
        } else {
          this.fulfill_(value);
        }
      }
    }
  };
  PolyfillPromise.prototype.resolveToNonPromiseObj_ = function(obj) {
    var thenMethod = undefined;
    try {
      thenMethod = obj.then;
    } catch (error) {
      this.reject_(error);
      return;
    }
    if (typeof thenMethod == 'function') {
      this.settleSameAsThenable_(thenMethod, obj);
    } else {
      this.fulfill_(obj);
    }
  };
  function isObject(value) {
    switch(typeof value) {
      case 'object':
        return value != null;
      case 'function':
        return true;
      default:
        return false;
    }
  }
  PolyfillPromise.prototype.reject_ = function(reason) {
    this.settle_(PromiseState.REJECTED, reason);
  };
  PolyfillPromise.prototype.fulfill_ = function(value) {
    this.settle_(PromiseState.FULFILLED, value);
  };
  PolyfillPromise.prototype.settle_ = function(settledState, valueOrReason) {
    if (this.state_ != PromiseState.PENDING) {
      throw new Error('Cannot settle(' + settledState + ', ' + valueOrReason | '): Promise already settled in state' + this.state_);
    }
    this.state_ = settledState;
    this.result_ = valueOrReason;
    this.executeOnSettledCallbacks_();
  };
  PolyfillPromise.prototype.executeOnSettledCallbacks_ = function() {
    if (this.onSettledCallbacks_ != null) {
      var callbacks = this.onSettledCallbacks_;
      for (var i = 0; i < callbacks.length; ++i) {
        callbacks[i].call();
        callbacks[i] = null;
      }
      this.onSettledCallbacks_ = null;
    }
  };
  var asyncExecutor = new AsyncExecutor;
  PolyfillPromise.prototype.settleSameAsPromise_ = function(promise) {
    var methods = this.createResolveAndReject_();
    promise.callWhenSettled_(methods.resolve, methods.reject);
  };
  PolyfillPromise.prototype.settleSameAsThenable_ = function(thenMethod, thenable) {
    var methods = this.createResolveAndReject_();
    try {
      thenMethod.call(thenable, methods.resolve, methods.reject);
    } catch (error) {
      methods.reject(error);
    }
  };
  PolyfillPromise.prototype.then = function(onFulfilled, onRejected) {
    var resolveChild;
    var rejectChild;
    var childPromise = new PolyfillPromise(function(resolve, reject) {
      resolveChild = resolve;
      rejectChild = reject;
    });
    function createCallback(paramF, defaultF) {
      if (typeof paramF == 'function') {
        return function(x) {
          try {
            resolveChild(paramF(x));
          } catch (error) {
            rejectChild(error);
          }
        };
      } else {
        return defaultF;
      }
    }
    this.callWhenSettled_(createCallback(onFulfilled, resolveChild), createCallback(onRejected, rejectChild));
    return childPromise;
  };
  PolyfillPromise.prototype['catch'] = function(onRejected) {
    return this.then(undefined, onRejected);
  };
  PolyfillPromise.prototype.callWhenSettled_ = function(onFulfilled, onRejected) {
    var thisPromise = this;
    function callback() {
      switch(thisPromise.state_) {
        case PromiseState.FULFILLED:
          onFulfilled(thisPromise.result_);
          break;
        case PromiseState.REJECTED:
          onRejected(thisPromise.result_);
          break;
        default:
          throw new Error('Unexpected state: ' + thisPromise.state_);
      }
    }
    if (this.onSettledCallbacks_ == null) {
      asyncExecutor.asyncExecute(callback);
    } else {
      this.onSettledCallbacks_.push(function() {
        asyncExecutor.asyncExecute(callback);
      });
    }
  };
  function resolvingPromise(opt_value) {
    if (opt_value instanceof PolyfillPromise) {
      return opt_value;
    } else {
      return new PolyfillPromise(function(resolve, reject) {
        resolve(opt_value);
      });
    }
  }
  PolyfillPromise['resolve'] = resolvingPromise;
  PolyfillPromise['reject'] = function(opt_reason) {
    return new PolyfillPromise(function(resolve, reject) {
      reject(opt_reason);
    });
  };
  PolyfillPromise['race'] = function(thenablesOrValues) {
    return new PolyfillPromise(function(resolve, reject) {
      var iterator = $jscomp.makeIterator(thenablesOrValues);
      for (var iterRec = iterator.next(); !iterRec.done; iterRec = iterator.next()) {
        resolvingPromise(iterRec.value).callWhenSettled_(resolve, reject);
      }
    });
  };
  PolyfillPromise['all'] = function(thenablesOrValues) {
    var iterator = $jscomp.makeIterator(thenablesOrValues);
    var iterRec = iterator.next();
    if (iterRec.done) {
      return resolvingPromise([]);
    } else {
      return new PolyfillPromise(function(resolveAll, rejectAll) {
        var resultsArray = [];
        var unresolvedCount = 0;
        function onFulfilled(i) {
          return function(ithResult) {
            resultsArray[i] = ithResult;
            unresolvedCount--;
            if (unresolvedCount == 0) {
              resolveAll(resultsArray);
            }
          };
        }
        do {
          resultsArray.push(undefined);
          unresolvedCount++;
          resolvingPromise(iterRec.value).callWhenSettled_(onFulfilled(resultsArray.length - 1), rejectAll);
          iterRec = iterator.next();
        } while (!iterRec.done);
      });
    }
  };
  return PolyfillPromise;
}, 'es6', 'es3');
$jscomp.executeAsyncGenerator = function(generator) {
  function passValueToGenerator(value) {
    return generator.next(value);
  }
  function passErrorToGenerator(error) {
    return generator['throw'](error);
  }
  return new Promise(function(resolve, reject) {
    function handleGeneratorRecord(genRec) {
      if (genRec.done) {
        resolve(genRec.value);
      } else {
        Promise.resolve(genRec.value).then(passValueToGenerator, passErrorToGenerator).then(handleGeneratorRecord, reject);
      }
    }
    handleGeneratorRecord(generator.next());
  });
};
$jscomp.owns = function(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
};
$jscomp.polyfill('WeakMap', function(NativeWeakMap) {
  function isConformant() {
    if (!NativeWeakMap || !Object.seal) {
      return false;
    }
    try {
      var x = Object.seal({});
      var y = Object.seal({});
      var map = new NativeWeakMap([[x, 2], [y, 3]]);
      if (map.get(x) != 2 || map.get(y) != 3) {
        return false;
      }
      map['delete'](x);
      map.set(y, 4);
      return !map.has(x) && map.get(y) == 4;
    } catch (err) {
      return false;
    }
  }
  if (isConformant()) {
    return NativeWeakMap;
  }
  var prop = '$jscomp_hidden_' + Math.random().toString().substring(2);
  function insert(target) {
    if (!$jscomp.owns(target, prop)) {
      var obj = {};
      $jscomp.defineProperty(target, prop, {value:obj});
    }
  }
  function patch(name) {
    var prev = Object[name];
    if (prev) {
      Object[name] = function(target) {
        insert(target);
        return prev(target);
      };
    }
  }
  patch('freeze');
  patch('preventExtensions');
  patch('seal');
  var index = 0;
  var PolyfillWeakMap = function(opt_iterable) {
    this.id_ = (index += Math.random() + 1).toString();
    if (opt_iterable) {
      $jscomp.initSymbol();
      $jscomp.initSymbolIterator();
      var iter = $jscomp.makeIterator(opt_iterable);
      var entry;
      while (!(entry = iter.next()).done) {
        var item = entry.value;
        this.set(item[0], item[1]);
      }
    }
  };
  PolyfillWeakMap.prototype.set = function(key, value) {
    insert(key);
    if (!$jscomp.owns(key, prop)) {
      throw new Error('WeakMap key fail: ' + key);
    }
    key[prop][this.id_] = value;
    return this;
  };
  PolyfillWeakMap.prototype.get = function(key) {
    return $jscomp.owns(key, prop) ? key[prop][this.id_] : undefined;
  };
  PolyfillWeakMap.prototype.has = function(key) {
    return $jscomp.owns(key, prop) && $jscomp.owns(key[prop], this.id_);
  };
  PolyfillWeakMap.prototype['delete'] = function(key) {
    if (!$jscomp.owns(key, prop) || !$jscomp.owns(key[prop], this.id_)) {
      return false;
    }
    return delete key[prop][this.id_];
  };
  return PolyfillWeakMap;
}, 'es6', 'es3');
$jscomp.MapEntry = function() {
  this.previous;
  this.next;
  this.head;
  this.key;
  this.value;
};
$jscomp.polyfill('Map', function(NativeMap) {
  var isConformant = !$jscomp.ASSUME_NO_NATIVE_MAP && function() {
    if (!NativeMap || !NativeMap.prototype.entries || typeof Object.seal != 'function') {
      return false;
    }
    try {
      NativeMap = NativeMap;
      var key = Object.seal({x:4});
      var map = new NativeMap($jscomp.makeIterator([[key, 's']]));
      if (map.get(key) != 's' || map.size != 1 || map.get({x:4}) || map.set({x:4}, 't') != map || map.size != 2) {
        return false;
      }
      var iter = map.entries();
      var item = iter.next();
      if (item.done || item.value[0] != key || item.value[1] != 's') {
        return false;
      }
      item = iter.next();
      if (item.done || item.value[0].x != 4 || item.value[1] != 't' || !iter.next().done) {
        return false;
      }
      return true;
    } catch (err) {
      return false;
    }
  }();
  if (isConformant) {
    return NativeMap;
  }
  $jscomp.initSymbol();
  $jscomp.initSymbolIterator();
  var idMap = new WeakMap;
  var PolyfillMap = function(opt_iterable) {
    this.data_ = {};
    this.head_ = createHead();
    this.size = 0;
    if (opt_iterable) {
      var iter = $jscomp.makeIterator(opt_iterable);
      var entry;
      while (!(entry = iter.next()).done) {
        var item = entry.value;
        this.set(item[0], item[1]);
      }
    }
  };
  PolyfillMap.prototype.set = function(key, value) {
    var r = maybeGetEntry(this, key);
    if (!r.list) {
      r.list = this.data_[r.id] = [];
    }
    if (!r.entry) {
      r.entry = {next:this.head_, previous:this.head_.previous, head:this.head_, key:key, value:value};
      r.list.push(r.entry);
      this.head_.previous.next = r.entry;
      this.head_.previous = r.entry;
      this.size++;
    } else {
      r.entry.value = value;
    }
    return this;
  };
  PolyfillMap.prototype['delete'] = function(key) {
    var r = maybeGetEntry(this, key);
    if (r.entry && r.list) {
      r.list.splice(r.index, 1);
      if (!r.list.length) {
        delete this.data_[r.id];
      }
      r.entry.previous.next = r.entry.next;
      r.entry.next.previous = r.entry.previous;
      r.entry.head = null;
      this.size--;
      return true;
    }
    return false;
  };
  PolyfillMap.prototype.clear = function() {
    this.data_ = {};
    this.head_ = this.head_.previous = createHead();
    this.size = 0;
  };
  PolyfillMap.prototype.has = function(key) {
    return !!maybeGetEntry(this, key).entry;
  };
  PolyfillMap.prototype.get = function(key) {
    var entry = maybeGetEntry(this, key).entry;
    return entry && entry.value;
  };
  PolyfillMap.prototype.entries = function() {
    return makeIterator(this, function(entry) {
      return [entry.key, entry.value];
    });
  };
  PolyfillMap.prototype.keys = function() {
    return makeIterator(this, function(entry) {
      return entry.key;
    });
  };
  PolyfillMap.prototype.values = function() {
    return makeIterator(this, function(entry) {
      return entry.value;
    });
  };
  PolyfillMap.prototype.forEach = function(callback, opt_thisArg) {
    var iter = this.entries();
    var item;
    while (!(item = iter.next()).done) {
      var entry = item.value;
      callback.call(opt_thisArg, entry[1], entry[0], this);
    }
  };
  PolyfillMap.prototype[Symbol.iterator] = PolyfillMap.prototype.entries;
  var maybeGetEntry = function(map, key) {
    var id = getId(key);
    var list = map.data_[id];
    if (list && $jscomp.owns(map.data_, id)) {
      for (var index = 0; index < list.length; index++) {
        var entry = list[index];
        if (key !== key && entry.key !== entry.key || key === entry.key) {
          return {id:id, list:list, index:index, entry:entry};
        }
      }
    }
    return {id:id, list:list, index:-1, entry:undefined};
  };
  var makeIterator = function(map, func) {
    var entry = map.head_;
    return $jscomp.iteratorPrototype(function() {
      if (entry) {
        while (entry.head != map.head_) {
          entry = entry.previous;
        }
        while (entry.next != entry.head) {
          entry = entry.next;
          return {done:false, value:func(entry)};
        }
        entry = null;
      }
      return {done:true, value:void 0};
    });
  };
  var createHead = function() {
    var head = {};
    head.previous = head.next = head.head = head;
    return head;
  };
  var mapIndex = 0;
  var getId = function(obj) {
    var type = obj && typeof obj;
    if (type == 'object' || type == 'function') {
      obj = obj;
      if (!idMap.has(obj)) {
        var id = '' + ++mapIndex;
        idMap.set(obj, id);
        return id;
      }
      return idMap.get(obj);
    }
    return 'p_' + obj;
  };
  return PolyfillMap;
}, 'es6', 'es3');
$jscomp.polyfill('Math.acosh', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(x) {
    x = Number(x);
    return Math.log(x + Math.sqrt(x * x - 1));
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Math.asinh', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(x) {
    x = Number(x);
    if (x === 0) {
      return x;
    }
    var y = Math.log(Math.abs(x) + Math.sqrt(x * x + 1));
    return x < 0 ? -y : y;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Math.log1p', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(x) {
    x = Number(x);
    if (x < 0.25 && x > -0.25) {
      var y = x;
      var d = 1;
      var z = x;
      var zPrev = 0;
      var s = 1;
      while (zPrev != z) {
        y *= x;
        s *= -1;
        z = (zPrev = z) + s * y / ++d;
      }
      return z;
    }
    return Math.log(1 + x);
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Math.atanh', function(orig) {
  if (orig) {
    return orig;
  }
  var log1p = Math.log1p;
  var polyfill = function(x) {
    x = Number(x);
    return (log1p(x) - log1p(-x)) / 2;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Math.cbrt', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(x) {
    if (x === 0) {
      return x;
    }
    x = Number(x);
    var y = Math.pow(Math.abs(x), 1 / 3);
    return x < 0 ? -y : y;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Math.clz32', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(x) {
    x = Number(x) >>> 0;
    if (x === 0) {
      return 32;
    }
    var result = 0;
    if ((x & 4294901760) === 0) {
      x <<= 16;
      result += 16;
    }
    if ((x & 4278190080) === 0) {
      x <<= 8;
      result += 8;
    }
    if ((x & 4026531840) === 0) {
      x <<= 4;
      result += 4;
    }
    if ((x & 3221225472) === 0) {
      x <<= 2;
      result += 2;
    }
    if ((x & 2147483648) === 0) {
      result++;
    }
    return result;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Math.cosh', function(orig) {
  if (orig) {
    return orig;
  }
  var exp = Math.exp;
  var polyfill = function(x) {
    x = Number(x);
    return (exp(x) + exp(-x)) / 2;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Math.expm1', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(x) {
    x = Number(x);
    if (x < .25 && x > -.25) {
      var y = x;
      var d = 1;
      var z = x;
      var zPrev = 0;
      while (zPrev != z) {
        y *= x / ++d;
        z = (zPrev = z) + y;
      }
      return z;
    }
    return Math.exp(x) - 1;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Math.hypot', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(x, y, var_args) {
    x = Number(x);
    y = Number(y);
    var i, z, sum;
    var max = Math.max(Math.abs(x), Math.abs(y));
    for (i = 2; i < arguments.length; i++) {
      max = Math.max(max, Math.abs(arguments[i]));
    }
    if (max > 1e100 || max < 1e-100) {
      x = x / max;
      y = y / max;
      sum = x * x + y * y;
      for (i = 2; i < arguments.length; i++) {
        z = Number(arguments[i]) / max;
        sum += z * z;
      }
      return Math.sqrt(sum) * max;
    } else {
      sum = x * x + y * y;
      for (i = 2; i < arguments.length; i++) {
        z = Number(arguments[i]);
        sum += z * z;
      }
      return Math.sqrt(sum);
    }
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Math.imul', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(a, b) {
    a = Number(a);
    b = Number(b);
    var ah = a >>> 16 & 65535;
    var al = a & 65535;
    var bh = b >>> 16 & 65535;
    var bl = b & 65535;
    var lh = ah * bl + al * bh << 16 >>> 0;
    return al * bl + lh | 0;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Math.log10', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(x) {
    return Math.log(x) / Math.LN10;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Math.log2', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(x) {
    return Math.log(x) / Math.LN2;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Math.sign', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(x) {
    x = Number(x);
    return x === 0 || isNaN(x) ? x : x > 0 ? 1 : -1;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Math.sinh', function(orig) {
  if (orig) {
    return orig;
  }
  var exp = Math.exp;
  var polyfill = function(x) {
    x = Number(x);
    if (x === 0) {
      return x;
    }
    return (exp(x) - exp(-x)) / 2;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Math.tanh', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(x) {
    x = Number(x);
    if (x === 0) {
      return x;
    }
    var y = Math.exp(-2 * Math.abs(x));
    var z = (1 - y) / (1 + y);
    return x < 0 ? -z : z;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Math.trunc', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(x) {
    x = Number(x);
    if (isNaN(x) || x === Infinity || x === -Infinity || x === 0) {
      return x;
    }
    var y = Math.floor(Math.abs(x));
    return x < 0 ? -y : y;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Number.EPSILON', function(orig) {
  return Math.pow(2, -52);
}, 'es6', 'es3');
$jscomp.polyfill('Number.MAX_SAFE_INTEGER', function() {
  return 9007199254740991;
}, 'es6', 'es3');
$jscomp.polyfill('Number.MIN_SAFE_INTEGER', function() {
  return -9007199254740991;
}, 'es6', 'es3');
$jscomp.polyfill('Number.isFinite', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(x) {
    if (typeof x !== 'number') {
      return false;
    }
    return !isNaN(x) && x !== Infinity && x !== -Infinity;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Number.isInteger', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(x) {
    if (!Number.isFinite(x)) {
      return false;
    }
    return x === Math.floor(x);
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Number.isNaN', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(x) {
    return typeof x === 'number' && isNaN(x);
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Number.isSafeInteger', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(x) {
    return Number.isInteger(x) && Math.abs(x) <= Number.MAX_SAFE_INTEGER;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Object.assign', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(target, var_args) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      if (!source) {
        continue;
      }
      for (var key in source) {
        if ($jscomp.owns(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Object.entries', function(orig) {
  if (orig) {
    return orig;
  }
  var entries = function(obj) {
    var result = [];
    for (var key in obj) {
      if ($jscomp.owns(obj, key)) {
        result.push([key, obj[key]]);
      }
    }
    return result;
  };
  return entries;
}, 'es8', 'es3');
$jscomp.polyfill('Object.getOwnPropertySymbols', function(orig) {
  if (orig) {
    return orig;
  }
  return function() {
    return [];
  };
}, 'es6', 'es5');
$jscomp.polyfill('Reflect.ownKeys', function(orig) {
  if (orig) {
    return orig;
  }
  var symbolPrefix = 'jscomp_symbol_';
  function isSymbol(key) {
    return key.substring(0, symbolPrefix.length) == symbolPrefix;
  }
  var polyfill = function(target) {
    var keys = [];
    var names = Object.getOwnPropertyNames(target);
    var symbols = Object.getOwnPropertySymbols(target);
    for (var i = 0; i < names.length; i++) {
      (isSymbol(names[i]) ? symbols : keys).push(names[i]);
    }
    return keys.concat(symbols);
  };
  return polyfill;
}, 'es6', 'es5');
$jscomp.polyfill('Object.getOwnPropertyDescriptors', function(orig) {
  if (orig) {
    return orig;
  }
  var getOwnPropertyDescriptors = function(obj) {
    var result = {};
    var keys = Reflect.ownKeys(obj);
    for (var i = 0; i < keys.length; i++) {
      result[keys[i]] = Object.getOwnPropertyDescriptor(obj, keys[i]);
    }
    return result;
  };
  return getOwnPropertyDescriptors;
}, 'es8', 'es5');
$jscomp.underscoreProtoCanBeSet = function() {
  var x = {a:true};
  var y = {};
  try {
    y.__proto__ = x;
    return y.a;
  } catch (e) {
  }
  return false;
};
$jscomp.setPrototypeOf = typeof Object.setPrototypeOf == 'function' ? Object.setPrototypeOf : $jscomp.underscoreProtoCanBeSet() ? function(target, proto) {
  target.__proto__ = proto;
  if (target.__proto__ !== proto) {
    throw new TypeError(target + ' is not extensible');
  }
  return target;
} : null;
$jscomp.polyfill('Object.setPrototypeOf', function(orig) {
  return orig || $jscomp.setPrototypeOf;
}, 'es6', 'es5');
$jscomp.polyfill('Object.values', function(orig) {
  if (orig) {
    return orig;
  }
  var values = function(obj) {
    var result = [];
    for (var key in obj) {
      if ($jscomp.owns(obj, key)) {
        result.push(obj[key]);
      }
    }
    return result;
  };
  return values;
}, 'es8', 'es3');
$jscomp.polyfill('Reflect.apply', function(orig) {
  if (orig) {
    return orig;
  }
  var apply = Function.prototype.apply;
  var polyfill = function(target, thisArg, argList) {
    return apply.call(target, thisArg, argList);
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.objectCreate = $jscomp.ASSUME_ES5 || typeof Object.create == 'function' ? Object.create : function(prototype) {
  var ctor = function() {
  };
  ctor.prototype = prototype;
  return new ctor;
};
$jscomp.construct = function() {
  function reflectConstructWorks() {
    function Base() {
    }
    function Derived() {
    }
    new Base;
    Reflect.construct(Base, [], Derived);
    return new Base instanceof Base;
  }
  if (typeof Reflect != 'undefined' && Reflect.construct) {
    if (reflectConstructWorks()) {
      return Reflect.construct;
    }
    var brokenConstruct = Reflect.construct;
    var patchedConstruct = function(target, argList, opt_newTarget) {
      var out = brokenConstruct(target, argList);
      if (opt_newTarget) {
        Reflect.setPrototypeOf(out, opt_newTarget.prototype);
      }
      return out;
    };
    return patchedConstruct;
  }
  function construct(target, argList, opt_newTarget) {
    if (opt_newTarget === undefined) {
      opt_newTarget = target;
    }
    var proto = opt_newTarget.prototype || Object.prototype;
    var obj = $jscomp.objectCreate(proto);
    var apply = Function.prototype.apply;
    var out = apply.call(target, obj, argList);
    return out || obj;
  }
  return construct;
}();
$jscomp.polyfill('Reflect.construct', function(orig) {
  return $jscomp.construct;
}, 'es6', 'es3');
$jscomp.polyfill('Reflect.defineProperty', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(target, propertyKey, attributes) {
    try {
      Object.defineProperty(target, propertyKey, attributes);
      var desc = Object.getOwnPropertyDescriptor(target, propertyKey);
      if (!desc) {
        return false;
      }
      return desc.configurable === (attributes.configurable || false) && desc.enumerable === (attributes.enumerable || false) && ('value' in desc ? desc.value === attributes.value && desc.writable === (attributes.writable || false) : desc.get === attributes.get && desc.set === attributes.set);
    } catch (err) {
      return false;
    }
  };
  return polyfill;
}, 'es6', 'es5');
$jscomp.polyfill('Reflect.deleteProperty', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(target, propertyKey) {
    if (!$jscomp.owns(target, propertyKey)) {
      return true;
    }
    try {
      return delete target[propertyKey];
    } catch (err) {
      return false;
    }
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Reflect.getOwnPropertyDescriptor', function(orig) {
  return orig || Object.getOwnPropertyDescriptor;
}, 'es6', 'es5');
$jscomp.polyfill('Reflect.getPrototypeOf', function(orig) {
  return orig || Object.getPrototypeOf;
}, 'es6', 'es5');
$jscomp.findDescriptor = function(target, propertyKey) {
  var obj = target;
  while (obj) {
    var property = Reflect.getOwnPropertyDescriptor(obj, propertyKey);
    if (property) {
      return property;
    }
    obj = Reflect.getPrototypeOf(obj);
  }
  return undefined;
};
$jscomp.polyfill('Reflect.get', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(target, propertyKey, opt_receiver) {
    if (arguments.length <= 2) {
      return target[propertyKey];
    }
    var property = $jscomp.findDescriptor(target, propertyKey);
    if (property) {
      return property.get ? property.get.call(opt_receiver) : property.value;
    }
    return undefined;
  };
  return polyfill;
}, 'es6', 'es5');
$jscomp.polyfill('Reflect.has', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(target, propertyKey) {
    return propertyKey in target;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Reflect.isExtensible', function(orig) {
  if (orig) {
    return orig;
  }
  if ($jscomp.ASSUME_ES5 || typeof Object.isExtensible == 'function') {
    return Object.isExtensible;
  }
  return function() {
    return true;
  };
}, 'es6', 'es3');
$jscomp.polyfill('Reflect.preventExtensions', function(orig) {
  if (orig) {
    return orig;
  }
  if (!($jscomp.ASSUME_ES5 || typeof Object.preventExtensions == 'function')) {
    return function() {
      return false;
    };
  }
  var polyfill = function(target) {
    Object.preventExtensions(target);
    return !Object.isExtensible(target);
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Reflect.set', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(target, propertyKey, value, opt_receiver) {
    var property = $jscomp.findDescriptor(target, propertyKey);
    if (!property) {
      if (Reflect.isExtensible(target)) {
        target[propertyKey] = value;
        return true;
      }
      return false;
    }
    if (property.set) {
      property.set.call(arguments.length > 3 ? opt_receiver : target, value);
      return true;
    } else {
      if (property.writable && !Object.isFrozen(target)) {
        target[propertyKey] = value;
        return true;
      }
    }
    return false;
  };
  return polyfill;
}, 'es6', 'es5');
$jscomp.polyfill('Reflect.setPrototypeOf', function(orig) {
  if (orig) {
    return orig;
  } else {
    if ($jscomp.setPrototypeOf) {
      var setPrototypeOf = $jscomp.setPrototypeOf;
      var polyfill = function(target, proto) {
        try {
          setPrototypeOf(target, proto);
          return true;
        } catch (e) {
          return false;
        }
      };
      return polyfill;
    } else {
      return null;
    }
  }
}, 'es6', 'es5');
$jscomp.polyfill('Set', function(NativeSet) {
  var isConformant = !$jscomp.ASSUME_NO_NATIVE_SET && function() {
    if (!NativeSet || !NativeSet.prototype.entries || typeof Object.seal != 'function') {
      return false;
    }
    try {
      NativeSet = NativeSet;
      var value = Object.seal({x:4});
      var set = new NativeSet($jscomp.makeIterator([value]));
      if (!set.has(value) || set.size != 1 || set.add(value) != set || set.size != 1 || set.add({x:4}) != set || set.size != 2) {
        return false;
      }
      var iter = set.entries();
      var item = iter.next();
      if (item.done || item.value[0] != value || item.value[1] != value) {
        return false;
      }
      item = iter.next();
      if (item.done || item.value[0] == value || item.value[0].x != 4 || item.value[1] != item.value[0]) {
        return false;
      }
      return iter.next().done;
    } catch (err) {
      return false;
    }
  }();
  if (isConformant) {
    return NativeSet;
  }
  $jscomp.initSymbol();
  $jscomp.initSymbolIterator();
  var PolyfillSet = function(opt_iterable) {
    this.map_ = new Map;
    if (opt_iterable) {
      var iter = $jscomp.makeIterator(opt_iterable);
      var entry;
      while (!(entry = iter.next()).done) {
        var item = entry.value;
        this.add(item);
      }
    }
    this.size = this.map_.size;
  };
  PolyfillSet.prototype.add = function(value) {
    this.map_.set(value, value);
    this.size = this.map_.size;
    return this;
  };
  PolyfillSet.prototype['delete'] = function(value) {
    var result = this.map_['delete'](value);
    this.size = this.map_.size;
    return result;
  };
  PolyfillSet.prototype.clear = function() {
    this.map_.clear();
    this.size = 0;
  };
  PolyfillSet.prototype.has = function(value) {
    return this.map_.has(value);
  };
  PolyfillSet.prototype.entries = function() {
    return this.map_.entries();
  };
  PolyfillSet.prototype.values = function() {
    return this.map_.values();
  };
  PolyfillSet.prototype.keys = PolyfillSet.prototype.values;
  PolyfillSet.prototype[Symbol.iterator] = PolyfillSet.prototype.values;
  PolyfillSet.prototype.forEach = function(callback, opt_thisArg) {
    var set = this;
    this.map_.forEach(function(value) {
      return callback.call(opt_thisArg, value, value, set);
    });
  };
  return PolyfillSet;
}, 'es6', 'es3');
$jscomp.checkStringArgs = function(thisArg, arg, func) {
  if (thisArg == null) {
    throw new TypeError("The 'this' value for String.prototype." + func + ' must not be null or undefined');
  }
  if (arg instanceof RegExp) {
    throw new TypeError('First argument to String.prototype.' + func + ' must not be a regular expression');
  }
  return thisArg + '';
};
$jscomp.polyfill('String.prototype.codePointAt', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(position) {
    var string = $jscomp.checkStringArgs(this, null, 'codePointAt');
    var size = string.length;
    position = Number(position) || 0;
    if (!(position >= 0 && position < size)) {
      return void 0;
    }
    position = position | 0;
    var first = string.charCodeAt(position);
    if (first < 55296 || first > 56319 || position + 1 === size) {
      return first;
    }
    var second = string.charCodeAt(position + 1);
    if (second < 56320 || second > 57343) {
      return first;
    }
    return (first - 55296) * 1024 + second + 9216;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('String.prototype.endsWith', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(searchString, opt_position) {
    var string = $jscomp.checkStringArgs(this, searchString, 'endsWith');
    searchString = searchString + '';
    if (opt_position === void 0) {
      opt_position = string.length;
    }
    var i = Math.max(0, Math.min(opt_position | 0, string.length));
    var j = searchString.length;
    while (j > 0 && i > 0) {
      if (string[--i] != searchString[--j]) {
        return false;
      }
    }
    return j <= 0;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('String.fromCodePoint', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(var_args) {
    var result = '';
    for (var i = 0; i < arguments.length; i++) {
      var code = Number(arguments[i]);
      if (code < 0 || code > 1114111 || code !== Math.floor(code)) {
        throw new RangeError('invalid_code_point ' + code);
      }
      if (code <= 65535) {
        result += String.fromCharCode(code);
      } else {
        code -= 65536;
        result += String.fromCharCode(code >>> 10 & 1023 | 55296);
        result += String.fromCharCode(code & 1023 | 56320);
      }
    }
    return result;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('String.prototype.includes', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(searchString, opt_position) {
    var string = $jscomp.checkStringArgs(this, searchString, 'includes');
    return string.indexOf(searchString, opt_position || 0) !== -1;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('String.prototype.repeat', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(copies) {
    var string = $jscomp.checkStringArgs(this, null, 'repeat');
    if (copies < 0 || copies > 1342177279) {
      throw new RangeError('Invalid count value');
    }
    copies = copies | 0;
    var result = '';
    while (copies) {
      if (copies & 1) {
        result += string;
      }
      if (copies >>>= 1) {
        string += string;
      }
    }
    return result;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.stringPadding = function(padString, padLength) {
  var padding = padString !== undefined ? String(padString) : ' ';
  if (!(padLength > 0) || !padding) {
    return '';
  }
  var repeats = Math.ceil(padLength / padding.length);
  return padding.repeat(repeats).substring(0, padLength);
};
$jscomp.polyfill('String.prototype.padEnd', function(orig) {
  if (orig) {
    return orig;
  }
  var padEnd = function(targetLength, opt_padString) {
    var string = $jscomp.checkStringArgs(this, null, 'padStart');
    var padLength = targetLength - string.length;
    return string + $jscomp.stringPadding(opt_padString, padLength);
  };
  return padEnd;
}, 'es8', 'es3');
$jscomp.polyfill('String.prototype.padStart', function(orig) {
  if (orig) {
    return orig;
  }
  var padStart = function(targetLength, opt_padString) {
    var string = $jscomp.checkStringArgs(this, null, 'padStart');
    var padLength = targetLength - string.length;
    return $jscomp.stringPadding(opt_padString, padLength) + string;
  };
  return padStart;
}, 'es8', 'es3');
$jscomp.polyfill('String.prototype.startsWith', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(searchString, opt_position) {
    var string = $jscomp.checkStringArgs(this, searchString, 'startsWith');
    searchString = searchString + '';
    var strLen = string.length;
    var searchLen = searchString.length;
    var i = Math.max(0, Math.min(opt_position | 0, string.length));
    var j = 0;
    while (j < searchLen && i < strLen) {
      if (string[i++] != searchString[j++]) {
        return false;
      }
    }
    return j >= searchLen;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.arrayFromIterator = function(iterator) {
  var i;
  var arr = [];
  while (!(i = iterator.next()).done) {
    arr.push(i.value);
  }
  return arr;
};
$jscomp.arrayFromIterable = function(iterable) {
  if (iterable instanceof Array) {
    return iterable;
  } else {
    return $jscomp.arrayFromIterator($jscomp.makeIterator(iterable));
  }
};
$jscomp.inherits = function(childCtor, parentCtor) {
  childCtor.prototype = $jscomp.objectCreate(parentCtor.prototype);
  childCtor.prototype.constructor = childCtor;
  if ($jscomp.setPrototypeOf) {
    var setPrototypeOf = $jscomp.setPrototypeOf;
    setPrototypeOf(childCtor, parentCtor);
  } else {
    for (var p in parentCtor) {
      if (p == 'prototype') {
        continue;
      }
      if (Object.defineProperties) {
        var descriptor = Object.getOwnPropertyDescriptor(parentCtor, p);
        if (descriptor) {
          Object.defineProperty(childCtor, p, descriptor);
        }
      } else {
        childCtor[p] = parentCtor[p];
      }
    }
  }
  childCtor.superClass_ = parentCtor.prototype;
};
$jscomp.polyfill('WeakSet', function(NativeWeakSet) {
  function isConformant() {
    if (!NativeWeakSet || !Object.seal) {
      return false;
    }
    try {
      var x = Object.seal({});
      var y = Object.seal({});
      var set = new NativeWeakSet([x]);
      if (!set.has(x) || set.has(y)) {
        return false;
      }
      set['delete'](x);
      set.add(y);
      return !set.has(x) && set.has(y);
    } catch (err) {
      return false;
    }
  }
  if (isConformant()) {
    return NativeWeakSet;
  }
  var PolyfillWeakSet = function(opt_iterable) {
    this.map_ = new WeakMap;
    if (opt_iterable) {
      $jscomp.initSymbol();
      $jscomp.initSymbolIterator();
      var iter = $jscomp.makeIterator(opt_iterable);
      var entry;
      while (!(entry = iter.next()).done) {
        var item = entry.value;
        this.add(item);
      }
    }
  };
  PolyfillWeakSet.prototype.add = function(elem) {
    this.map_.set(elem, true);
    return this;
  };
  PolyfillWeakSet.prototype.has = function(elem) {
    return this.map_.has(elem);
  };
  PolyfillWeakSet.prototype['delete'] = function(elem) {
    return this.map_['delete'](elem);
  };
  return PolyfillWeakSet;
}, 'es6', 'es3');
try {
  if (Array.prototype.values.toString().indexOf('[native code]') == -1) {
    delete Array.prototype.values;
  }
} catch (e) {
}
Ext.define('Xolens.builder.FormFieldBuilder', {singleton:true});
Ext.define('Xolens.builder.GridColumnBuilder', {singleton:true});
Ext.define('Xolens.builder.StoreBuilder', {singleton:true});
Ext.define('Xolens.builder.Builder', {singleton:true, mixins:{util:'Xolens.builder.FormFieldBuilder', util:'Xolens.builder.GridColumnBuilder', util:'Xolens.builder.StoreBuilder'}});
Ext.define('Xolens.module.ModuleApi', {singleton:true});
Ext.define('Xolens.module.ModuleColumn', {singleton:true});
Ext.define('Xolens.module.ModuleContent', {singleton:true});
Ext.define('Xolens.module.ModuleDialog', {singleton:true});
Ext.define('Xolens.module.ModuleField', {singleton:true});
Ext.define('Xolens.module.ModuleForm', {singleton:true});
Ext.define('Xolens.module.enquery.Api', {extend:'Xolens.module.ModuleApi', group:{storeUrl:'api/xolens/pglaraenquery/group/index', singleUrl:'api/xolens/pglaraenquery/group/single', deleteUrl:'api/xolens/pglaraenquery/group/delete', groupparticipant:{storeUrl:'api/xolens/pglaraenquery/group/{id}/groupparticipant/index', singleUrl:'api/xolens/pglaraenquery/group/{id}/groupparticipant/single', deleteUrl:'api/xolens/pglaraenquery/group/{id}/groupparticipant/delete'}, enquiry:{storeUrl:'api/xolens/pglaraenquery/group/{id}/enquiry/index', 
singleUrl:'api/xolens/pglaraenquery/group/{id}/enquiry/single', deleteUrl:'api/xolens/pglaraenquery/group/{id}/enquiry/delete'}}, form:{storeUrl:'api/xolens/pglaraenquery/form/index', singleUrl:'api/xolens/pglaraenquery/form/single', deleteUrl:'api/xolens/pglaraenquery/form/delete', enquiry:{storeUrl:'api/xolens/pglaraenquery/form/{id}/enquiry/index', singleUrl:'api/xolens/pglaraenquery/form/{id}/enquiry/single', deleteUrl:'api/xolens/pglaraenquery/form/{id}/enquiry/delete'}, formsection:{storeUrl:'api/xolens/pglaraenquery/form/{id}/formsection/index', 
singleUrl:'api/xolens/pglaraenquery/form/{id}/formsection/single', deleteUrl:'api/xolens/pglaraenquery/form/{id}/formsection/delete'}}, field:{storeUrl:'api/xolens/pglaraenquery/field/index', singleUrl:'api/xolens/pglaraenquery/field/single', deleteUrl:'api/xolens/pglaraenquery/field/delete', tablefield:{storeUrl:'api/xolens/pglaraenquery/field/{id}/tablefield/index', singleUrl:'api/xolens/pglaraenquery/field/{id}/tablefield/single', deleteUrl:'api/xolens/pglaraenquery/field/{id}/tablefield/delete'}, 
tablecolumn:{storeUrl:'api/xolens/pglaraenquery/field/{id}/tablecolumn/index', singleUrl:'api/xolens/pglaraenquery/field/{id}/tablecolumn/single', deleteUrl:'api/xolens/pglaraenquery/field/{id}/tablecolumn/delete'}, sectionfield:{storeUrl:'api/xolens/pglaraenquery/field/{id}/sectionfield/index', singleUrl:'api/xolens/pglaraenquery/field/{id}/sectionfield/single', deleteUrl:'api/xolens/pglaraenquery/field/{id}/sectionfield/delete'}}, participant:{storeUrl:'api/xolens/pglaraenquery/participant/index', 
singleUrl:'api/xolens/pglaraenquery/participant/single', deleteUrl:'api/xolens/pglaraenquery/participant/delete', participantenquiry:{storeUrl:'api/xolens/pglaraenquery/participant/{id}/participantenquiry/index', singleUrl:'api/xolens/pglaraenquery/participant/{id}/participantenquiry/single', deleteUrl:'api/xolens/pglaraenquery/participant/{id}/participantenquiry/delete'}}, groupparticipant:{storeUrl:'api/xolens/pglaraenquery/groupparticipant/index', singleUrl:'api/xolens/pglaraenquery/groupparticipant/single', 
deleteUrl:'api/xolens/pglaraenquery/groupparticipant/delete'}, tablefield:{storeUrl:'api/xolens/pglaraenquery/tablefield/index', singleUrl:'api/xolens/pglaraenquery/tablefield/single', deleteUrl:'api/xolens/pglaraenquery/tablefield/delete', tablecolumn:{storeUrl:'api/xolens/pglaraenquery/tablefield/{id}/tablecolumn/index', singleUrl:'api/xolens/pglaraenquery/tablefield/{id}/tablecolumn/single', deleteUrl:'api/xolens/pglaraenquery/tablefield/{id}/tablecolumn/delete'}}, section:{storeUrl:'api/xolens/pglaraenquery/section/index', 
singleUrl:'api/xolens/pglaraenquery/section/single', deleteUrl:'api/xolens/pglaraenquery/section/delete', formsection:{storeUrl:'api/xolens/pglaraenquery/section/{id}/formsection/index', singleUrl:'api/xolens/pglaraenquery/section/{id}/formsection/single', deleteUrl:'api/xolens/pglaraenquery/section/{id}/formsection/delete'}, sectionfield:{storeUrl:'api/xolens/pglaraenquery/section/{id}/sectionfield/index', singleUrl:'api/xolens/pglaraenquery/section/{id}/sectionfield/single', deleteUrl:'api/xolens/pglaraenquery/section/{id}/sectionfield/delete'}}, 
enquiry:{storeUrl:'api/xolens/pglaraenquery/enquiry/index', singleUrl:'api/xolens/pglaraenquery/enquiry/single', deleteUrl:'api/xolens/pglaraenquery/enquiry/delete', participantenquiry:{storeUrl:'api/xolens/pglaraenquery/enquiry/{id}/participantenquiry/index', singleUrl:'api/xolens/pglaraenquery/enquiry/{id}/participantenquiry/single', deleteUrl:'api/xolens/pglaraenquery/enquiry/{id}/participantenquiry/delete'}}, fieldvalue:{storeUrl:'api/xolens/pglaraenquery/fieldvalue/index', singleUrl:'api/xolens/pglaraenquery/fieldvalue/single', 
deleteUrl:'api/xolens/pglaraenquery/fieldvalue/delete'}, formsection:{storeUrl:'api/xolens/pglaraenquery/formsection/index', singleUrl:'api/xolens/pglaraenquery/formsection/single', deleteUrl:'api/xolens/pglaraenquery/formsection/delete'}, participantenquiry:{storeUrl:'api/xolens/pglaraenquery/participantenquiry/index', singleUrl:'api/xolens/pglaraenquery/participantenquiry/single', deleteUrl:'api/xolens/pglaraenquery/participantenquiry/delete'}, tablecolumn:{storeUrl:'api/xolens/pglaraenquery/tablecolumn/index', 
singleUrl:'api/xolens/pglaraenquery/tablecolumn/single', deleteUrl:'api/xolens/pglaraenquery/tablecolumn/delete'}, sectionfield:{storeUrl:'api/xolens/pglaraenquery/sectionfield/index', singleUrl:'api/xolens/pglaraenquery/sectionfield/single', deleteUrl:'api/xolens/pglaraenquery/sectionfield/delete', fieldvalue:{storeUrl:'api/xolens/pglaraenquery/sectionfield/{id}/fieldvalue/index', singleUrl:'api/xolens/pglaraenquery/sectionfield/{id}/fieldvalue/single', deleteUrl:'api/xolens/pglaraenquery/sectionfield/{id}/fieldvalue/delete'}}});
Ext.define('Xolens.module.enquery.Column', {extend:'Xolens.module.ModuleColumn', name:{text:'Name', dataIndex:'name', minWidth:200, flex:1}, description:{text:'Description', dataIndex:'description', minWidth:200}, type:{text:'Type', dataIndex:'type', minWidth:200}, displaytext:{text:'DisplayText', dataIndex:'display_text', minWidth:200}, required:{text:'Required', dataIndex:'required', minWidth:200}, valuelist:{text:'ValueList', dataIndex:'value_list', minWidth:200}, group:{text:'Informations group', 
columns:[{text:'Name', dataIndex:'group_name', minWidth:200}]}, maxrecords:{text:'MaxRecords', dataIndex:'max_records', minWidth:200}, field:{text:'Informations field', columns:[{text:'Name', dataIndex:'field_name', minWidth:200}]}, title:{text:'Title', dataIndex:'title', minWidth:200, flex:1}, form:{text:'Informations form', columns:[{text:'Name', dataIndex:'form_name', minWidth:200}]}, sectionfield:{text:'Informations section field', columns:[]}, position:{text:'Position', dataIndex:'position', 
minWidth:200}, section:{text:'Informations section', columns:[{text:'Name', dataIndex:'section_name', minWidth:200}]}, participant:{text:'Informations participant', columns:[{text:'Name', dataIndex:'participant_name', minWidth:200}]}, enquiry:{text:'Informations enquiry', columns:[{text:'Name', dataIndex:'enquiry_name', minWidth:200}, {text:'Title', dataIndex:'enquiry_title', minWidth:200}]}, state:{text:'State', dataIndex:'state', minWidth:200}, createtime:{text:'CreateTime', dataIndex:'create_time', 
minWidth:200}, updatetime:{text:'UpdateTime', dataIndex:'update_time', minWidth:200}, validationtime:{text:'ValidationTime', dataIndex:'validation_time', minWidth:200}, tablefield:{text:'Informations table field', columns:[{text:'Name', dataIndex:'table_field_name', minWidth:200}]}});
Ext.define('Xolens.module.enquery.Form', {extend:'Xolens.module.ModuleForm', group:{subtitle:'GROUPS', iconCls:'x-fa fa-send', prefilled:[], fillables:['id', 'name', 'description'], createUrl:Xolens.module.enquery.Api.group.storeUrl, updateUrl:Xolens.module.enquery.Api.group.singleUrl, fieldTypes:['hiddentoken', 'hiddenid', 'rname', 'bdescription']}, form:{subtitle:'FORMS', iconCls:'x-fa fa-send', prefilled:[], fillables:['id', 'name', 'description'], createUrl:Xolens.module.enquery.Api.form.storeUrl, 
updateUrl:Xolens.module.enquery.Api.form.singleUrl, fieldTypes:['hiddentoken', 'hiddenid', 'rname', 'bdescription']}, field:{subtitle:'FIELDS', iconCls:'x-fa fa-send', prefilled:[], fillables:['id', 'type', 'name', 'display_text', 'required', 'value_list', 'description'], createUrl:Xolens.module.enquery.Api.field.storeUrl, updateUrl:Xolens.module.enquery.Api.field.singleUrl, fieldTypes:['hiddentoken', 'hiddenid', 'rtype', 'rname', 'rdisplaytext', 'rrequired', 'bvaluelist', 'bdescription']}, participant:{subtitle:'PARTICIPANTS', 
iconCls:'x-fa fa-send', prefilled:[], fillables:['id', 'name', 'description'], createUrl:Xolens.module.enquery.Api.participant.storeUrl, updateUrl:Xolens.module.enquery.Api.participant.singleUrl, fieldTypes:['hiddentoken', 'hiddenid', 'rname', 'bdescription']}, groupparticipant:{subtitle:'GROUPPARTICIPANTS', iconCls:'x-fa fa-send', prefilled:[], fillables:['id', 'group_id', 'group'], createUrl:Xolens.module.enquery.Api.groupparticipant.storeUrl, updateUrl:Xolens.module.enquery.Api.groupparticipant.singleUrl, 
fieldTypes:['hiddentoken', 'hiddenid', 'rselectXolens.module.enquery.formgroup']}, tablefield:{subtitle:'TABLEFIELDS', iconCls:'x-fa fa-send', prefilled:[], fillables:['id', 'name', 'max_records', 'description', 'field_id', 'field'], createUrl:Xolens.module.enquery.Api.tablefield.storeUrl, updateUrl:Xolens.module.enquery.Api.tablefield.singleUrl, fieldTypes:['hiddentoken', 'hiddenid', 'rname', 'rmaxrecords', 'bdescription', 'rselectXolens.module.enquery.formfield']}, section:{subtitle:'SECTIONS', 
iconCls:'x-fa fa-send', prefilled:[], fillables:['id', 'name', 'description'], createUrl:Xolens.module.enquery.Api.section.storeUrl, updateUrl:Xolens.module.enquery.Api.section.singleUrl, fieldTypes:['hiddentoken', 'hiddenid', 'rname', 'bdescription']}, enquiry:{subtitle:'ENQUIRYS', iconCls:'x-fa fa-send', prefilled:[], fillables:['id', 'name', 'title', 'description', 'group_id', 'group', 'form_id', 'form'], createUrl:Xolens.module.enquery.Api.enquiry.storeUrl, updateUrl:Xolens.module.enquery.Api.enquiry.singleUrl, 
fieldTypes:['hiddentoken', 'hiddenid', 'rname', 'rtitle', 'bdescription', 'rselectXolens.module.enquery.formgroup', 'rselectXolens.module.enquery.formform']}, fieldvalue:{subtitle:'FIELDVALUES', iconCls:'x-fa fa-send', prefilled:[], fillables:['id', 'section_field_id', 'section_field'], createUrl:Xolens.module.enquery.Api.fieldvalue.storeUrl, updateUrl:Xolens.module.enquery.Api.fieldvalue.singleUrl, fieldTypes:['hiddentoken', 'hiddenid', 'rselectXolens.module.enquery.formsectionfield']}, formsection:{subtitle:'FORMSECTIONS', 
iconCls:'x-fa fa-send', prefilled:[], fillables:['id', 'position', 'section_id', 'section', 'form_id', 'form'], createUrl:Xolens.module.enquery.Api.formsection.storeUrl, updateUrl:Xolens.module.enquery.Api.formsection.singleUrl, fieldTypes:['hiddentoken', 'hiddenid', 'rposition', 'rselectXolens.module.enquery.formsection', 'rselectXolens.module.enquery.formform']}, participantenquiry:{subtitle:'PARTICIPANTENQUIRYS', iconCls:'x-fa fa-send', prefilled:[], fillables:['id', 'participant_id', 'participant', 
'enquiry_id', 'enquiry', 'state', 'create_time', 'update_time', 'validation_time'], createUrl:Xolens.module.enquery.Api.participantenquiry.storeUrl, updateUrl:Xolens.module.enquery.Api.participantenquiry.singleUrl, fieldTypes:['hiddentoken', 'hiddenid', 'rselectXolens.module.enquery.formparticipant', 'rselectXolens.module.enquery.formenquiry', 'bstate', 'rcreatetime', 'bupdatetime', 'bvalidationtime']}, tablecolumn:{subtitle:'TABLECOLUMNS', iconCls:'x-fa fa-send', prefilled:[], fillables:['id', 'position', 
'table_field_id', 'table_field', 'field_id', 'field'], createUrl:Xolens.module.enquery.Api.tablecolumn.storeUrl, updateUrl:Xolens.module.enquery.Api.tablecolumn.singleUrl, fieldTypes:['hiddentoken', 'hiddenid', 'rposition', 'rselectXolens.module.enquery.formtablefield', 'rselectXolens.module.enquery.formfield']}, sectionfield:{subtitle:'SECTIONFIELDS', iconCls:'x-fa fa-send', prefilled:[], fillables:['id', 'position', 'field_id', 'field', 'section_id', 'section'], createUrl:Xolens.module.enquery.Api.sectionfield.storeUrl, 
updateUrl:Xolens.module.enquery.Api.sectionfield.singleUrl, fieldTypes:['hiddentoken', 'hiddenid', 'rposition', 'rselectXolens.module.enquery.formfield', 'rselectXolens.module.enquery.formsection']}});
Ext.define('Xolens.module.enquery.Dialog', {extend:'Xolens.module.ModuleDialog', group:{subtitle:'GROUP', dataProperties:{name:'Name', description:'Description'}, tabitems:[{viewtype:'Xolens.module.enquery.dialoggroupparticipant', config:{title:'GroupParticipant'}, overrides:{content:{storeUrl:Xolens.module.enquery.Api.group.groupparticipant.storeUrl, deleteUrl:Xolens.module.enquery.Api.group.groupparticipant.deleteUrl}, form:{createUrl:Xolens.module.enquery.Api.group.groupparticipant.storeUrl, updateUrl:Xolens.module.enquery.Api.group.groupparticipant.singleUrl, 
fieldTypes:['hiddentoken', 'hiddenid']}}}, {viewtype:'Xolens.module.enquery.dialogenquiry', config:{title:'Enquiry'}, overrides:{content:{storeUrl:Xolens.module.enquery.Api.group.enquiry.storeUrl, deleteUrl:Xolens.module.enquery.Api.group.enquiry.deleteUrl}, form:{createUrl:Xolens.module.enquery.Api.group.enquiry.storeUrl, updateUrl:Xolens.module.enquery.Api.group.enquiry.singleUrl, fieldTypes:['hiddentoken', 'hiddenid', 'rname', 'rtitle', 'bdescription', 'rselectXolens.module.enquery.Dialogform']}}}]}, 
form:{subtitle:'FORM', dataProperties:{name:'Name', description:'Description'}, tabitems:[{viewtype:'Xolens.module.enquery.dialogenquiry', config:{title:'Enquiry'}, overrides:{content:{storeUrl:Xolens.module.enquery.Api.form.enquiry.storeUrl, deleteUrl:Xolens.module.enquery.Api.form.enquiry.deleteUrl}, form:{createUrl:Xolens.module.enquery.Api.form.enquiry.storeUrl, updateUrl:Xolens.module.enquery.Api.form.enquiry.singleUrl, fieldTypes:['hiddentoken', 'hiddenid', 'rname', 'rtitle', 'bdescription', 
'rselectXolens.module.enquery.Dialoggroup']}}}, {viewtype:'Xolens.module.enquery.dialogformsection', config:{title:'FormSection'}, overrides:{content:{storeUrl:Xolens.module.enquery.Api.form.formsection.storeUrl, deleteUrl:Xolens.module.enquery.Api.form.formsection.deleteUrl}, form:{createUrl:Xolens.module.enquery.Api.form.formsection.storeUrl, updateUrl:Xolens.module.enquery.Api.form.formsection.singleUrl, fieldTypes:['hiddentoken', 'hiddenid', 'rposition', 'rselectXolens.module.enquery.Dialogsection']}}}]}, 
field:{subtitle:'FIELD', dataProperties:{type:'Type', name:'Name', display_text:'DisplayText', required:'Required', value_list:'ValueList', description:'Description'}, tabitems:[{viewtype:'Xolens.module.enquery.dialogtablefield', config:{title:'TableField'}, overrides:{content:{storeUrl:Xolens.module.enquery.Api.field.tablefield.storeUrl, deleteUrl:Xolens.module.enquery.Api.field.tablefield.deleteUrl}, form:{createUrl:Xolens.module.enquery.Api.field.tablefield.storeUrl, updateUrl:Xolens.module.enquery.Api.field.tablefield.singleUrl, 
fieldTypes:['hiddentoken', 'hiddenid', 'rname', 'rmaxrecords', 'bdescription']}}}, {viewtype:'Xolens.module.enquery.dialogtablecolumn', config:{title:'TableColumn'}, overrides:{content:{storeUrl:Xolens.module.enquery.Api.field.tablecolumn.storeUrl, deleteUrl:Xolens.module.enquery.Api.field.tablecolumn.deleteUrl}, form:{createUrl:Xolens.module.enquery.Api.field.tablecolumn.storeUrl, updateUrl:Xolens.module.enquery.Api.field.tablecolumn.singleUrl, fieldTypes:['hiddentoken', 'hiddenid', 'rposition', 
'rselectXolens.module.enquery.Dialogtablefield']}}}, {viewtype:'Xolens.module.enquery.dialogsectionfield', config:{title:'SectionField'}, overrides:{content:{storeUrl:Xolens.module.enquery.Api.field.sectionfield.storeUrl, deleteUrl:Xolens.module.enquery.Api.field.sectionfield.deleteUrl}, form:{createUrl:Xolens.module.enquery.Api.field.sectionfield.storeUrl, updateUrl:Xolens.module.enquery.Api.field.sectionfield.singleUrl, fieldTypes:['hiddentoken', 'hiddenid', 'rposition', 'rselectXolens.module.enquery.Dialogsection']}}}]}, 
participant:{subtitle:'PARTICIPANT', dataProperties:{name:'Name', description:'Description'}, tabitems:[{viewtype:'Xolens.module.enquery.dialogparticipantenquiry', config:{title:'ParticipantEnquiry'}, overrides:{content:{storeUrl:Xolens.module.enquery.Api.participant.participantenquiry.storeUrl, deleteUrl:Xolens.module.enquery.Api.participant.participantenquiry.deleteUrl}, form:{createUrl:Xolens.module.enquery.Api.participant.participantenquiry.storeUrl, updateUrl:Xolens.module.enquery.Api.participant.participantenquiry.singleUrl, 
fieldTypes:['hiddentoken', 'hiddenid', 'rselectXolens.module.enquery.Dialogenquiry', 'bstate', 'rcreatetime', 'bupdatetime', 'bvalidationtime']}}}]}, tablefield:{subtitle:'TABLEFIELD', dataProperties:{name:'Name', max_records:'MaxRecords', description:'Description'}, tabitems:[{viewtype:'Xolens.module.enquery.dialogtablecolumn', config:{title:'TableColumn'}, overrides:{content:{storeUrl:Xolens.module.enquery.Api.tablefield.tablecolumn.storeUrl, deleteUrl:Xolens.module.enquery.Api.tablefield.tablecolumn.deleteUrl}, 
form:{createUrl:Xolens.module.enquery.Api.tablefield.tablecolumn.storeUrl, updateUrl:Xolens.module.enquery.Api.tablefield.tablecolumn.singleUrl, fieldTypes:['hiddentoken', 'hiddenid', 'rposition', 'rselectXolens.module.enquery.Dialogfield']}}}]}, section:{subtitle:'SECTION', dataProperties:{name:'Name', description:'Description'}, tabitems:[{viewtype:'Xolens.module.enquery.dialogformsection', config:{title:'FormSection'}, overrides:{content:{storeUrl:Xolens.module.enquery.Api.section.formsection.storeUrl, 
deleteUrl:Xolens.module.enquery.Api.section.formsection.deleteUrl}, form:{createUrl:Xolens.module.enquery.Api.section.formsection.storeUrl, updateUrl:Xolens.module.enquery.Api.section.formsection.singleUrl, fieldTypes:['hiddentoken', 'hiddenid', 'rposition', 'rselectXolens.module.enquery.Dialogform']}}}, {viewtype:'Xolens.module.enquery.dialogsectionfield', config:{title:'SectionField'}, overrides:{content:{storeUrl:Xolens.module.enquery.Api.section.sectionfield.storeUrl, deleteUrl:Xolens.module.enquery.Api.section.sectionfield.deleteUrl}, 
form:{createUrl:Xolens.module.enquery.Api.section.sectionfield.storeUrl, updateUrl:Xolens.module.enquery.Api.section.sectionfield.singleUrl, fieldTypes:['hiddentoken', 'hiddenid', 'rposition', 'rselectXolens.module.enquery.Dialogfield']}}}]}, enquiry:{subtitle:'ENQUIRY', dataProperties:{name:'Name', title:'Title', description:'Description'}, tabitems:[{viewtype:'Xolens.module.enquery.dialogparticipantenquiry', config:{title:'ParticipantEnquiry'}, overrides:{content:{storeUrl:Xolens.module.enquery.Api.enquiry.participantenquiry.storeUrl, 
deleteUrl:Xolens.module.enquery.Api.enquiry.participantenquiry.deleteUrl}, form:{createUrl:Xolens.module.enquery.Api.enquiry.participantenquiry.storeUrl, updateUrl:Xolens.module.enquery.Api.enquiry.participantenquiry.singleUrl, fieldTypes:['hiddentoken', 'hiddenid', 'rselectXolens.module.enquery.Dialogparticipant', 'bstate', 'rcreatetime', 'bupdatetime', 'bvalidationtime']}}}]}, sectionfield:{subtitle:'SECTIONFIELD', dataProperties:{position:'Position'}, tabitems:[{viewtype:'Xolens.module.enquery.dialogfieldvalue', 
config:{title:'FieldValue'}, overrides:{content:{storeUrl:Xolens.module.enquery.Api.sectionfield.fieldvalue.storeUrl, deleteUrl:Xolens.module.enquery.Api.sectionfield.fieldvalue.deleteUrl}, form:{createUrl:Xolens.module.enquery.Api.sectionfield.fieldvalue.storeUrl, updateUrl:Xolens.module.enquery.Api.sectionfield.fieldvalue.singleUrl, fieldTypes:['hiddentoken', 'hiddenid']}}}]}});
Ext.define('Xolens.module.enquery.Content', {extend:'Xolens.module.ModuleContent', group:{paging:true, searchtool:true, title:'Gestion des groups', subtitle:'GROUPS', iconCls:'x-fa fa-send', storeUrl:Xolens.module.enquery.Api.group.storeUrl, deleteUrl:Xolens.module.enquery.Api.group.deleteUrl, form:Xolens.module.enquery.Form.group, dialog:Xolens.module.enquery.Dialog.group, columns:['name', 'description', 'editAction', 'deleteAction'], buttons:['deletebtn', 'updatebtn', 'exportmenu', 'addbtn', 'plusmenu'], 
dialogs:[], extraConfig:{}}, form:{paging:true, searchtool:true, title:'Gestion des forms', subtitle:'FORMS', iconCls:'x-fa fa-send', storeUrl:Xolens.module.enquery.Api.form.storeUrl, deleteUrl:Xolens.module.enquery.Api.form.deleteUrl, form:Xolens.module.enquery.Form.form, dialog:Xolens.module.enquery.Dialog.form, columns:['name', 'description', 'editAction', 'deleteAction'], buttons:['deletebtn', 'updatebtn', 'exportmenu', 'addbtn', 'plusmenu'], dialogs:[], extraConfig:{}}, field:{paging:true, searchtool:true, 
title:'Gestion des fields', subtitle:'FIELDS', iconCls:'x-fa fa-send', storeUrl:Xolens.module.enquery.Api.field.storeUrl, deleteUrl:Xolens.module.enquery.Api.field.deleteUrl, form:Xolens.module.enquery.Form.field, dialog:Xolens.module.enquery.Dialog.field, columns:['type', 'name', 'displaytext', 'required', 'valuelist', 'description', 'editAction', 'deleteAction'], buttons:['deletebtn', 'updatebtn', 'exportmenu', 'addbtn', 'plusmenu'], dialogs:[], extraConfig:{}}, participant:{paging:true, searchtool:true, 
title:'Gestion des participants', subtitle:'PARTICIPANTS', iconCls:'x-fa fa-send', storeUrl:Xolens.module.enquery.Api.participant.storeUrl, deleteUrl:Xolens.module.enquery.Api.participant.deleteUrl, form:Xolens.module.enquery.Form.participant, dialog:Xolens.module.enquery.Dialog.participant, columns:['name', 'description', 'editAction', 'deleteAction'], buttons:['deletebtn', 'updatebtn', 'exportmenu', 'addbtn', 'plusmenu'], dialogs:[], extraConfig:{}}, groupparticipant:{paging:true, searchtool:true, 
title:'Gestion des groupparticipants', subtitle:'GROUPPARTICIPANTS', iconCls:'x-fa fa-send', storeUrl:Xolens.module.enquery.Api.groupparticipant.storeUrl, deleteUrl:Xolens.module.enquery.Api.groupparticipant.deleteUrl, form:Xolens.module.enquery.Form.groupparticipant, dialog:Xolens.module.enquery.Dialog.groupparticipant, columns:['group', 'editAction', 'deleteAction'], buttons:['deletebtn', 'updatebtn', 'exportmenu', 'addbtn', 'plusmenu'], dialogs:[], extraConfig:{}}, tablefield:{paging:true, searchtool:true, 
title:'Gestion des tablefields', subtitle:'TABLEFIELDS', iconCls:'x-fa fa-send', storeUrl:Xolens.module.enquery.Api.tablefield.storeUrl, deleteUrl:Xolens.module.enquery.Api.tablefield.deleteUrl, form:Xolens.module.enquery.Form.tablefield, dialog:Xolens.module.enquery.Dialog.tablefield, columns:['name', 'maxrecords', 'description', 'field', 'editAction', 'deleteAction'], buttons:['deletebtn', 'updatebtn', 'exportmenu', 'addbtn', 'plusmenu'], dialogs:[], extraConfig:{}}, section:{paging:true, searchtool:true, 
title:'Gestion des sections', subtitle:'SECTIONS', iconCls:'x-fa fa-send', storeUrl:Xolens.module.enquery.Api.section.storeUrl, deleteUrl:Xolens.module.enquery.Api.section.deleteUrl, form:Xolens.module.enquery.Form.section, dialog:Xolens.module.enquery.Dialog.section, columns:['name', 'description', 'editAction', 'deleteAction'], buttons:['deletebtn', 'updatebtn', 'exportmenu', 'addbtn', 'plusmenu'], dialogs:[], extraConfig:{}}, enquiry:{paging:true, searchtool:true, title:'Gestion des enquirys', 
subtitle:'ENQUIRYS', iconCls:'x-fa fa-send', storeUrl:Xolens.module.enquery.Api.enquiry.storeUrl, deleteUrl:Xolens.module.enquery.Api.enquiry.deleteUrl, form:Xolens.module.enquery.Form.enquiry, dialog:Xolens.module.enquery.Dialog.enquiry, columns:['name', 'title', 'description', 'group', 'form', 'editAction', 'deleteAction'], buttons:['deletebtn', 'updatebtn', 'exportmenu', 'addbtn', 'plusmenu'], dialogs:[], extraConfig:{}}, fieldvalue:{paging:true, searchtool:true, title:'Gestion des fieldvalues', 
subtitle:'FIELDVALUES', iconCls:'x-fa fa-send', storeUrl:Xolens.module.enquery.Api.fieldvalue.storeUrl, deleteUrl:Xolens.module.enquery.Api.fieldvalue.deleteUrl, form:Xolens.module.enquery.Form.fieldvalue, dialog:Xolens.module.enquery.Dialog.fieldvalue, columns:['sectionfield', 'editAction', 'deleteAction'], buttons:['deletebtn', 'updatebtn', 'exportmenu', 'addbtn', 'plusmenu'], dialogs:[], extraConfig:{}}, formsection:{paging:true, searchtool:true, title:'Gestion des formsections', subtitle:'FORMSECTIONS', 
iconCls:'x-fa fa-send', storeUrl:Xolens.module.enquery.Api.formsection.storeUrl, deleteUrl:Xolens.module.enquery.Api.formsection.deleteUrl, form:Xolens.module.enquery.Form.formsection, dialog:Xolens.module.enquery.Dialog.formsection, columns:['position', 'section', 'form', 'editAction', 'deleteAction'], buttons:['deletebtn', 'updatebtn', 'exportmenu', 'addbtn', 'plusmenu'], dialogs:[], extraConfig:{}}, participantenquiry:{paging:true, searchtool:true, title:'Gestion des participantenquirys', subtitle:'PARTICIPANTENQUIRYS', 
iconCls:'x-fa fa-send', storeUrl:Xolens.module.enquery.Api.participantenquiry.storeUrl, deleteUrl:Xolens.module.enquery.Api.participantenquiry.deleteUrl, form:Xolens.module.enquery.Form.participantenquiry, dialog:Xolens.module.enquery.Dialog.participantenquiry, columns:['participant', 'enquiry', 'state', 'createtime', 'updatetime', 'validationtime', 'editAction', 'deleteAction'], buttons:['deletebtn', 'updatebtn', 'exportmenu', 'addbtn', 'plusmenu'], dialogs:[], extraConfig:{}}, tablecolumn:{paging:true, 
searchtool:true, title:'Gestion des tablecolumns', subtitle:'TABLECOLUMNS', iconCls:'x-fa fa-send', storeUrl:Xolens.module.enquery.Api.tablecolumn.storeUrl, deleteUrl:Xolens.module.enquery.Api.tablecolumn.deleteUrl, form:Xolens.module.enquery.Form.tablecolumn, dialog:Xolens.module.enquery.Dialog.tablecolumn, columns:['position', 'tablefield', 'field', 'editAction', 'deleteAction'], buttons:['deletebtn', 'updatebtn', 'exportmenu', 'addbtn', 'plusmenu'], dialogs:[], extraConfig:{}}, sectionfield:{paging:true, 
searchtool:true, title:'Gestion des sectionfields', subtitle:'SECTIONFIELDS', iconCls:'x-fa fa-send', storeUrl:Xolens.module.enquery.Api.sectionfield.storeUrl, deleteUrl:Xolens.module.enquery.Api.sectionfield.deleteUrl, form:Xolens.module.enquery.Form.sectionfield, dialog:Xolens.module.enquery.Dialog.sectionfield, columns:['position', 'field', 'section', 'editAction', 'deleteAction'], buttons:['deletebtn', 'updatebtn', 'exportmenu', 'addbtn', 'plusmenu'], dialogs:[], extraConfig:{}}});
Ext.define('Xolens.module.enquery.Field', {extend:'Xolens.module.ModuleField', hiddentoken:{xtype:'hiddenfield', name:'token'}, hiddenid:{xtype:'hiddenfield', name:'id'}, rName:{fieldType:'rtextfield', name:'name', fieldLabel:'Name'}, bDescription:{fieldType:'textfield', name:'description', fieldLabel:'Description'}, rType:{fieldType:'rcombofield', name:'type', fieldLabel:'Type', storeUrl:Xolens.module.enquery.Api.listUrl}, rDisplayText:{fieldType:'rtextfield', name:'display_text', fieldLabel:'DisplayText'}, 
rRequired:{fieldType:'rcombofield', name:'required', fieldLabel:'Required', storeUrl:Xolens.module.enquery.Api.listUrl}, bValueList:{fieldType:'null', name:'value_list', fieldLabel:'ValueList'}, rSelectGroup:{fieldType:'select', hiddenField:{name:'group'}, selectField:{name:'group_id', targetDialog:'Xolens.module.enquery.fieldgroup', fieldLabel:'Group'}}, rMaxRecords:{fieldType:'rnumberfield', name:'max_records', fieldLabel:'MaxRecords'}, rSelectField:{fieldType:'select', hiddenField:{name:'field'}, 
selectField:{name:'field_id', targetDialog:'Xolens.module.enquery.fieldfield', fieldLabel:'Field'}}, rTitle:{fieldType:'rtextfield', name:'title', fieldLabel:'Title'}, rSelectForm:{fieldType:'select', hiddenField:{name:'form'}, selectField:{name:'form_id', targetDialog:'Xolens.module.enquery.fieldform', fieldLabel:'Form'}}, rSelectSectionField:{fieldType:'select', hiddenField:{name:'section_field'}, selectField:{name:'section_field_id', targetDialog:'Xolens.module.enquery.fieldsectionField', fieldLabel:'SectionField'}}, 
rPosition:{fieldType:'rnumberfield', name:'position', fieldLabel:'Position'}, rSelectSection:{fieldType:'select', hiddenField:{name:'section'}, selectField:{name:'section_id', targetDialog:'Xolens.module.enquery.fieldsection', fieldLabel:'Section'}}, rSelectParticipant:{fieldType:'select', hiddenField:{name:'participant'}, selectField:{name:'participant_id', targetDialog:'Xolens.module.enquery.fieldparticipant', fieldLabel:'Participant'}}, rSelectEnquiry:{fieldType:'select', hiddenField:{name:'enquiry'}, 
selectField:{name:'enquiry_id', targetDialog:'Xolens.module.enquery.fieldenquiry', fieldLabel:'Enquiry'}}, bState:{fieldType:'combofield', name:'state', fieldLabel:'State', storeUrl:Xolens.module.enquery.Api.listUrl}, rCreateTime:{fieldType:'null', name:'create_time', fieldLabel:'CreateTime'}, bUpdateTime:{fieldType:'null', name:'update_time', fieldLabel:'UpdateTime'}, bValidationTime:{fieldType:'null', name:'validation_time', fieldLabel:'ValidationTime'}, rSelectTableField:{fieldType:'select', hiddenField:{name:'table_field'}, 
selectField:{name:'table_field_id', targetDialog:'Xolens.module.enquery.fieldtableField', fieldLabel:'TableField'}}});
Ext.define('Xolens.util.storage.Storage', {singleton:true});
Ext.define('Xolens.util.validation.Regex', {singleton:true});

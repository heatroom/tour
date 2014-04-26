var utils = {
	/*
	* add Class
	*/
	addClass: function() {

	},

	removeClass: function() {

	},

	hasClass: function() {

	},

	getPixelValue: function(val) {
		var valType = typeof val;
		if (valType === 'number') return val;
		if (valType === 'string') return parseInt(val, 10);
		return 0;
	},

	valOrDefault = function(val, valDefault) {
		return typeof val !== 'undefined' ? val : valDefault;
	},

	invokeCallbackArrayHelper: function(arr) {
		var fn;
		if (Array.isArray(arr)) {
			fn = helpers[arr[0]];
			if (typeof fn === 'function') {
				return fn.apply(this, arr.slice(1));
			}
		}
	},

	invokeCallbackArray: function(arr) {
		var i, len;
		if (Array.isArray(arr)) {
			if (typeof arr[0] === 'string') {
				return invokeCallbackArrayHelper(arr);
			}
		} else {
			for (i = 0, len = arr.length; i < len; i++) {
				this.invokeCallback(arr[i]);
			}
		}
	},

	invokeCallback: function(cb) {
		if (typeof cb === 'function') {
			return cb();
		}
		if (typeof cb === 'string' && helpers[cb]) {
			return helpers[cb]();
		}
		else { // assuming array
			return this.invokeCallbackArray(cb);	
		}
	},

	invokeEventCallbacks: function(evtType, stepCb) {
		var cbArr = callbacks[evtType],
		    callback,
		    fn,
		    i,
		    len;
		if (stepCb) {
			return this.invokeCallback(stepCb);
		}

		for (i = 0, len = cbArr.length; i < len; i++) {
			this.invokeCallback(cbArr[i].cb);
		}
	},

	/**
	 * Private
	 */
	getScrollTop: function() {
		var scrollTop;
		if (typeof window.pageYOffset !== 'undefined') {
			scrollTop = window.pageYOffset;
		} else {
			scrollTop = document.documentElement.scrollTop;
		}
		return scrollTop;
	},

	getScrollLeft: function() {
		var scrollLeft;
		if (typeof window.pageXOffset !== 'undefined') {
			scrollLeft = window.pageXOffset;
		} else {
			scrollLeft = document.documentElement.scrollLeft;
		}
		return scrollLeft;
	},

	getWindowHeight: function() {
		return window.innerHeight || document.documentElement.clientHeight;
	},

	getWindowWidth: function() {
		return window.innderWidth || document.documentElement.clientWidth;
	},

	addEventListener: function(el, evtName, fn) {
		return el.addEventListener ?
			el.addEventListener(evtName, fn, false) :
			el.attachEvent('on' + evtName, fn);
	},

	removeEvtListener: function(el, evtName, fn) {
		return el.removeEventListener ?
			el.removeEventListener(evtName, fn, false) :
			el.detachEvent('on' + evtName, fn);
	},

	documentIsReady: function() {
		return document.readyState === 'complete' || document.readyState === 'interactive';
	},

	evtPreventDefault: function(evt) {
		if (evt.preventDefault) {
			evt.preventDefault();
		} else if (event) {
			event.returnValue = false;
		}
	},

	extend: function(obj1, obj2) {
		var prop;
		for (prop in obj2) {
			if (obj2.hasOwnProperty(prop)) {
				obj1[prop] = obj2[prop];
			}
		}
	},

};





























module.exports = utils;
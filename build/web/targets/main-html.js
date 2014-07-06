(function () { "use strict";
var $estr = function() { return js.Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function inherit() {}; inherit.prototype = from; var proto = new inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
EReg.__name__ = true;
EReg.prototype = {
	match: function(s) {
		if(this.r.global) this.r.lastIndex = 0;
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,__class__: EReg
}
var HxOverrides = function() { }
HxOverrides.__name__ = true;
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
}
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
}
HxOverrides.remove = function(a,obj) {
	var i = 0;
	var l = a.length;
	while(i < l) {
		if(a[i] == obj) {
			a.splice(i,1);
			return true;
		}
		i++;
	}
	return false;
}
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
}
var Lambda = function() { }
Lambda.__name__ = true;
Lambda.array = function(it) {
	var a = new Array();
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var i = $it0.next();
		a.push(i);
	}
	return a;
}
Lambda.count = function(it,pred) {
	var n = 0;
	if(pred == null) {
		var $it0 = $iterator(it)();
		while( $it0.hasNext() ) {
			var _ = $it0.next();
			n++;
		}
	} else {
		var $it1 = $iterator(it)();
		while( $it1.hasNext() ) {
			var x = $it1.next();
			if(pred(x)) n++;
		}
	}
	return n;
}
var IMap = function() { }
IMap.__name__ = true;
var Reflect = function() { }
Reflect.__name__ = true;
Reflect.hasField = function(o,field) {
	return Object.prototype.hasOwnProperty.call(o,field);
}
Reflect.field = function(o,field) {
	var v = null;
	try {
		v = o[field];
	} catch( e ) {
	}
	return v;
}
Reflect.setField = function(o,field,value) {
	o[field] = value;
}
var Std = function() { }
Std.__name__ = true;
Std["is"] = function(v,t) {
	return js.Boot.__instanceof(v,t);
}
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
}
Std["int"] = function(x) {
	return x | 0;
}
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
}
Std.parseFloat = function(x) {
	return parseFloat(x);
}
var StringBuf = function() {
	this.b = "";
};
StringBuf.__name__ = true;
StringBuf.prototype = {
	toString: function() {
		return this.b;
	}
	,addSub: function(s,pos,len) {
		this.b += len == null?HxOverrides.substr(s,pos,null):HxOverrides.substr(s,pos,len);
	}
	,addChar: function(c) {
		this.b += String.fromCharCode(c);
	}
	,__class__: StringBuf
}
var StringTools = function() { }
StringTools.__name__ = true;
StringTools.startsWith = function(s,start) {
	return s.length >= start.length && HxOverrides.substr(s,0,start.length) == start;
}
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
}
StringTools.fastCodeAt = function(s,index) {
	return s.charCodeAt(index);
}
StringTools.isEof = function(c) {
	return c != c;
}
var app = {}
app.Main = function() { }
app.Main.__name__ = true;
app.Main.main = function() {
	flambe.System.init();
	flambepowertools.system.MainStage.init(960,560);
	var manifest = flambe.asset.Manifest.fromAssets("bootstrap");
	var loader = flambe.System.loadAssetPack(manifest);
	loader.get(app.Main.onSuccess);
}
app.Main.onSuccess = function(pack) {
	var background = new flambe.display.FillSprite(2105376,flambe.System.get_stage().get_width(),flambe.System.get_stage().get_height());
	flambe.System.root.addChild(new flambe.Entity().add(background));
	var plane = new flambe.display.ImageSprite(pack.getTexture("plane"));
	plane.x.set__(30);
	plane.y.animateTo(200,6);
	flambe.System.root.addChild(new flambe.Entity().add(plane));
}
var flambe = {}
flambe.util = {}
flambe.util.Disposable = function() { }
flambe.util.Disposable.__name__ = true;
flambe.Component = function() { }
flambe.Component.__name__ = true;
flambe.Component.__interfaces__ = [flambe.util.Disposable];
flambe.Component.prototype = {
	setNext: function(next) {
		this.next = next;
	}
	,init: function(owner,next) {
		this.owner = owner;
		this.next = next;
	}
	,get_name: function() {
		return null;
	}
	,dispose: function() {
		if(this.owner != null) this.owner.remove(this);
	}
	,onUpdate: function(dt) {
	}
	,onRemoved: function() {
	}
	,onAdded: function() {
	}
	,__class__: flambe.Component
}
flambe.Entity = function() {
	this.firstComponent = null;
	this.next = null;
	this.firstChild = null;
	this.parent = null;
	this._compMap = { };
};
flambe.Entity.__name__ = true;
flambe.Entity.__interfaces__ = [flambe.util.Disposable];
flambe.Entity.prototype = {
	toStringImpl: function(indent) {
		var output = "";
		var p = this.firstComponent;
		while(p != null) {
			output += p.get_name();
			if(p.next != null) output += ", ";
			p = p.next;
		}
		output += "\n";
		var u2514 = String.fromCharCode(9492);
		var u241c = String.fromCharCode(9500);
		var u2500 = String.fromCharCode(9472);
		var u2502 = String.fromCharCode(9474);
		var p1 = this.firstChild;
		while(p1 != null) {
			var last = p1.next == null;
			output += indent + (last?u2514:u241c) + u2500 + u2500 + " ";
			output += p1.toStringImpl(indent + (last?" ":u2502) + "   ");
			p1 = p1.next;
		}
		return output;
	}
	,toString: function() {
		return this.toStringImpl("");
	}
	,dispose: function() {
		if(this.parent != null) this.parent.removeChild(this);
		while(this.firstComponent != null) this.firstComponent.dispose();
		this.disposeChildren();
	}
	,disposeChildren: function() {
		while(this.firstChild != null) this.firstChild.dispose();
	}
	,removeChild: function(entity) {
		var prev = null, p = this.firstChild;
		while(p != null) {
			var next = p.next;
			if(p == entity) {
				if(prev == null) this.firstChild = next; else prev.next = next;
				p.parent = null;
				p.next = null;
				return;
			}
			prev = p;
			p = next;
		}
	}
	,addChild: function(entity,append) {
		if(append == null) append = true;
		if(entity.parent != null) entity.parent.removeChild(entity);
		entity.parent = this;
		if(append) {
			var tail = null, p = this.firstChild;
			while(p != null) {
				tail = p;
				p = p.next;
			}
			if(tail != null) tail.next = entity; else this.firstChild = entity;
		} else {
			entity.next = this.firstChild;
			this.firstChild = entity;
		}
		return this;
	}
	,getComponent: function(name) {
		return this._compMap[name];
	}
	,remove: function(component) {
		var prev = null, p = this.firstComponent;
		while(p != null) {
			var next = p.next;
			if(p == component) {
				if(prev == null) this.firstComponent = next; else prev.init(this,next);
				delete(this._compMap[p.get_name()]);
				p.onRemoved();
				p.init(null,null);
				return true;
			}
			prev = p;
			p = next;
		}
		return false;
	}
	,add: function(component) {
		if(component.owner != null) component.owner.remove(component);
		var name = component.get_name();
		var prev = this.getComponent(name);
		if(prev != null) this.remove(prev);
		this._compMap[name] = component;
		var tail = null, p = this.firstComponent;
		while(p != null) {
			tail = p;
			p = p.next;
		}
		if(tail != null) tail.setNext(component); else this.firstComponent = component;
		component.init(this,null);
		component.onAdded();
		return this;
	}
	,__class__: flambe.Entity
}
flambe.util.PackageLog = function() { }
flambe.util.PackageLog.__name__ = true;
flambe.platform = {}
flambe.platform.Platform = function() { }
flambe.platform.Platform.__name__ = true;
flambe.platform.Platform.prototype = {
	__class__: flambe.platform.Platform
}
flambe.platform.html = {}
flambe.platform.html.HtmlPlatform = function() {
};
flambe.platform.html.HtmlPlatform.__name__ = true;
flambe.platform.html.HtmlPlatform.__interfaces__ = [flambe.platform.Platform];
flambe.platform.html.HtmlPlatform.prototype = {
	createRenderer: function(canvas) {
		try {
			var gl = js.html._CanvasElement.CanvasUtil.getContextWebGL(canvas,{ alpha : false, depth : false, failIfMajorPerformanceCaveat : true});
			if(gl != null) {
				if(flambe.platform.html.HtmlUtil.detectSlowDriver(gl)) flambe.Log.warn("Detected a slow WebGL driver, falling back to canvas"); else return new flambe.platform.html.WebGLRenderer(this._stage,gl);
			}
		} catch( _ ) {
		}
		return new flambe.platform.html.CanvasRenderer(canvas);
		flambe.Log.error("No renderer available!");
		return null;
	}
	,getY: function(event,bounds) {
		return (event.clientY - bounds.top) * this._stage.get_height() / bounds.height;
	}
	,getX: function(event,bounds) {
		return (event.clientX - bounds.left) * this._stage.get_width() / bounds.width;
	}
	,getRenderer: function() {
		return this._renderer;
	}
	,getKeyboard: function() {
		var _g = this;
		if(this._keyboard == null) {
			this._keyboard = new flambe.platform.BasicKeyboard();
			var onKey = function(event) {
				switch(event.type) {
				case "keydown":
					if(_g._keyboard.submitDown(event.keyCode)) event.preventDefault();
					break;
				case "keyup":
					_g._keyboard.submitUp(event.keyCode);
					break;
				}
			};
			this._canvas.addEventListener("keydown",onKey,false);
			this._canvas.addEventListener("keyup",onKey,false);
		}
		return this._keyboard;
	}
	,getPointer: function() {
		return this._pointer;
	}
	,update: function(now) {
		var dt = (now - this._lastUpdate) / 1000;
		this._lastUpdate = now;
		if(flambe.System.hidden.get__()) return;
		if(this._skipFrame) {
			this._skipFrame = false;
			return;
		}
		this.mainLoop.update(dt);
		this.mainLoop.render(this._renderer);
	}
	,getCatapultClient: function() {
		return this._catapult;
	}
	,createLogHandler: function(tag) {
		if(flambe.platform.html.HtmlLogHandler.isSupported()) return new flambe.platform.html.HtmlLogHandler(tag);
		return null;
	}
	,getStage: function() {
		return this._stage;
	}
	,loadAssetPack: function(manifest) {
		return new flambe.platform.html.HtmlAssetPackLoader(this,manifest).promise;
	}
	,init: function() {
		var _g = this;
		flambe.platform.html.HtmlUtil.fixAndroidMath();
		var canvas = null;
		try {
			canvas = js.Browser.window.flambe.canvas;
		} catch( error ) {
		}
		flambe.util.Assert.that(canvas != null,"Could not find a Flambe canvas! Are you embedding with flambe.js?");
		canvas.setAttribute("tabindex","0");
		canvas.style.outlineStyle = "none";
		canvas.style.webkitTapHighlightColor = "transparent";
		canvas.setAttribute("moz-opaque","true");
		this._stage = new flambe.platform.html.HtmlStage(canvas);
		this._pointer = new flambe.platform.BasicPointer();
		this._mouse = new flambe.platform.html.HtmlMouse(this._pointer,canvas);
		this._renderer = this.createRenderer(canvas);
		this.mainLoop = new flambe.platform.MainLoop();
		this.musicPlaying = false;
		this._canvas = canvas;
		this._container = canvas.parentElement;
		this._container.style.overflow = "hidden";
		this._container.style.position = "relative";
		this._container.style.msTouchAction = "none";
		var lastTouchTime = 0;
		var onMouse = function(event) {
			if(event.timeStamp - lastTouchTime < 1000) return;
			var bounds = canvas.getBoundingClientRect();
			var x = _g.getX(event,bounds);
			var y = _g.getY(event,bounds);
			switch(event.type) {
			case "mousedown":
				if(event.target == canvas) {
					event.preventDefault();
					_g._mouse.submitDown(x,y,event.button);
					canvas.focus();
				}
				break;
			case "mousemove":
				_g._mouse.submitMove(x,y);
				break;
			case "mouseup":
				_g._mouse.submitUp(x,y,event.button);
				break;
			case "mousewheel":case "DOMMouseScroll":
				var velocity = event.type == "mousewheel"?event.wheelDelta / 40:-event.detail;
				if(_g._mouse.submitScroll(x,y,velocity)) event.preventDefault();
				break;
			}
		};
		js.Browser.window.addEventListener("mousedown",onMouse,false);
		js.Browser.window.addEventListener("mousemove",onMouse,false);
		js.Browser.window.addEventListener("mouseup",onMouse,false);
		canvas.addEventListener("mousewheel",onMouse,false);
		canvas.addEventListener("DOMMouseScroll",onMouse,false);
		canvas.addEventListener("contextmenu",function(event) {
			event.preventDefault();
		},false);
		var standardTouch = typeof(js.Browser.window.ontouchstart) != "undefined";
		var msTouch = 'msMaxTouchPoints' in window.navigator && (window.navigator.msMaxTouchPoints > 1);
		if(standardTouch || msTouch) {
			var basicTouch = new flambe.platform.BasicTouch(this._pointer,standardTouch?4:js.Browser.navigator.msMaxTouchPoints);
			this._touch = basicTouch;
			var onTouch = function(event) {
				var changedTouches = standardTouch?event.changedTouches:[event];
				var bounds = event.target.getBoundingClientRect();
				lastTouchTime = event.timeStamp;
				switch(event.type) {
				case "touchstart":case "MSPointerDown":case "pointerdown":
					event.preventDefault();
					if(flambe.platform.html.HtmlUtil.SHOULD_HIDE_MOBILE_BROWSER) flambe.platform.html.HtmlUtil.hideMobileBrowser();
					var _g1 = 0;
					while(_g1 < changedTouches.length) {
						var touch = changedTouches[_g1];
						++_g1;
						var x = _g.getX(touch,bounds);
						var y = _g.getY(touch,bounds);
						var id = Std["int"](standardTouch?touch.identifier:touch.pointerId);
						basicTouch.submitDown(id,x,y);
					}
					break;
				case "touchmove":case "MSPointerMove":case "pointermove":
					event.preventDefault();
					var _g1 = 0;
					while(_g1 < changedTouches.length) {
						var touch = changedTouches[_g1];
						++_g1;
						var x = _g.getX(touch,bounds);
						var y = _g.getY(touch,bounds);
						var id = Std["int"](standardTouch?touch.identifier:touch.pointerId);
						basicTouch.submitMove(id,x,y);
					}
					break;
				case "touchend":case "touchcancel":case "MSPointerUp":case "pointerup":
					var _g1 = 0;
					while(_g1 < changedTouches.length) {
						var touch = changedTouches[_g1];
						++_g1;
						var x = _g.getX(touch,bounds);
						var y = _g.getY(touch,bounds);
						var id = Std["int"](standardTouch?touch.identifier:touch.pointerId);
						basicTouch.submitUp(id,x,y);
					}
					break;
				}
			};
			if(standardTouch) {
				canvas.addEventListener("touchstart",onTouch,false);
				canvas.addEventListener("touchmove",onTouch,false);
				canvas.addEventListener("touchend",onTouch,false);
				canvas.addEventListener("touchcancel",onTouch,false);
			} else {
				canvas.addEventListener("MSPointerDown",onTouch,false);
				canvas.addEventListener("MSPointerMove",onTouch,false);
				canvas.addEventListener("MSPointerUp",onTouch,false);
			}
		} else this._touch = new flambe.platform.DummyTouch();
		var oldErrorHandler = js.Browser.window.onerror;
		js.Browser.window.onerror = function(message,url,line) {
			flambe.System.uncaughtError.emit(message);
			return oldErrorHandler != null?oldErrorHandler(message,url,line):false;
		};
		var hiddenApi = flambe.platform.html.HtmlUtil.loadExtension("hidden",js.Browser.document);
		if(hiddenApi.value != null) {
			var onVisibilityChanged = function(_) {
				flambe.System.hidden.set__(Reflect.field(js.Browser.document,hiddenApi.field));
			};
			onVisibilityChanged(null);
			js.Browser.document.addEventListener(hiddenApi.prefix + "visibilitychange",onVisibilityChanged,false);
		} else {
			var onPageTransitionChange = function(event) {
				flambe.System.hidden.set__(event.type == "pagehide");
			};
			js.Browser.window.addEventListener("pageshow",onPageTransitionChange,false);
			js.Browser.window.addEventListener("pagehide",onPageTransitionChange,false);
		}
		flambe.System.hidden.get_changed().connect(function(hidden,_) {
			if(!hidden) _g._skipFrame = true;
		});
		this._skipFrame = false;
		this._lastUpdate = flambe.platform.html.HtmlUtil.now();
		var requestAnimationFrame = flambe.platform.html.HtmlUtil.loadExtension("requestAnimationFrame").value;
		if(requestAnimationFrame != null) {
			var performance = js.Browser.window.performance;
			var hasPerfNow = performance != null && flambe.platform.html.HtmlUtil.polyfill("now",performance);
			if(hasPerfNow) this._lastUpdate = performance.now(); else flambe.Log.warn("No monotonic timer support, falling back to the system date");
			var updateFrame = null;
			updateFrame = function(now) {
				_g.update(hasPerfNow?performance.now():now);
				requestAnimationFrame(updateFrame,canvas);
			};
			requestAnimationFrame(updateFrame,canvas);
		} else {
			flambe.Log.warn("No requestAnimationFrame support, falling back to setInterval");
			js.Browser.window.setInterval(function() {
				_g.update(flambe.platform.html.HtmlUtil.now());
			},16);
		}
		new flambe.platform.DebugLogic(this);
		this._catapult = flambe.platform.html.HtmlCatapultClient.canUse()?new flambe.platform.html.HtmlCatapultClient():null;
		flambe.Log.info("Initialized HTML platform",["renderer",this._renderer.get_type()]);
	}
	,__class__: flambe.platform.html.HtmlPlatform
}
flambe.util.Value = function(value,listener) {
	this._value = value;
	this._changed = listener != null?new flambe.util.Signal2(listener):null;
};
flambe.util.Value.__name__ = true;
flambe.util.Value.prototype = {
	toString: function() {
		return this._value;
	}
	,get_changed: function() {
		if(this._changed == null) this._changed = new flambe.util.Signal2();
		return this._changed;
	}
	,set__: function(newValue) {
		var oldValue = this._value;
		if(newValue != oldValue) {
			this._value = newValue;
			if(this._changed != null) this._changed.emit(newValue,oldValue);
		}
		return newValue;
	}
	,get__: function() {
		return this._value;
	}
	,watch: function(listener) {
		listener(this._value,this._value);
		return this.get_changed().connect(listener);
	}
	,__class__: flambe.util.Value
}
flambe.util.SignalConnection = function(signal,listener) {
	this._next = null;
	this._signal = signal;
	this._listener = listener;
	this.stayInList = true;
};
flambe.util.SignalConnection.__name__ = true;
flambe.util.SignalConnection.__interfaces__ = [flambe.util.Disposable];
flambe.util.SignalConnection.prototype = {
	dispose: function() {
		if(this._signal != null) {
			this._signal.disconnect(this);
			this._signal = null;
		}
	}
	,once: function() {
		this.stayInList = false;
		return this;
	}
	,__class__: flambe.util.SignalConnection
}
flambe.util.SignalBase = function(listener) {
	this._head = listener != null?new flambe.util.SignalConnection(this,listener):null;
	this._deferredTasks = null;
};
flambe.util.SignalBase.__name__ = true;
flambe.util.SignalBase.prototype = {
	dispatching: function() {
		return this._head == flambe.util.SignalBase.DISPATCHING_SENTINEL;
	}
	,listRemove: function(conn) {
		var prev = null, p = this._head;
		while(p != null) {
			if(p == conn) {
				var next = p._next;
				if(prev == null) this._head = next; else prev._next = next;
				return;
			}
			prev = p;
			p = p._next;
		}
	}
	,listAdd: function(conn,prioritize) {
		if(prioritize) {
			conn._next = this._head;
			this._head = conn;
		} else {
			var tail = null, p = this._head;
			while(p != null) {
				tail = p;
				p = p._next;
			}
			if(tail != null) tail._next = conn; else this._head = conn;
		}
	}
	,didEmit: function(head) {
		this._head = head;
		var snapshot = this._deferredTasks;
		this._deferredTasks = null;
		while(snapshot != null) {
			snapshot.fn();
			snapshot = snapshot.next;
		}
	}
	,willEmit: function() {
		flambe.util.Assert.that(!this.dispatching());
		var snapshot = this._head;
		this._head = flambe.util.SignalBase.DISPATCHING_SENTINEL;
		return snapshot;
	}
	,defer: function(fn) {
		var tail = null, p = this._deferredTasks;
		while(p != null) {
			tail = p;
			p = p.next;
		}
		var task = new flambe.util._SignalBase.Task(fn);
		if(tail != null) tail.next = task; else this._deferredTasks = task;
	}
	,disconnect: function(conn) {
		var _g = this;
		if(this.dispatching()) this.defer(function() {
			_g.listRemove(conn);
		}); else this.listRemove(conn);
	}
	,connectImpl: function(listener,prioritize) {
		var _g = this;
		var conn = new flambe.util.SignalConnection(this,listener);
		if(this.dispatching()) this.defer(function() {
			_g.listAdd(conn,prioritize);
		}); else this.listAdd(conn,prioritize);
		return conn;
	}
	,hasListeners: function() {
		return this._head != null;
	}
	,__class__: flambe.util.SignalBase
}
flambe.util.Signal2 = function(listener) {
	flambe.util.SignalBase.call(this,listener);
};
flambe.util.Signal2.__name__ = true;
flambe.util.Signal2.__super__ = flambe.util.SignalBase;
flambe.util.Signal2.prototype = $extend(flambe.util.SignalBase.prototype,{
	emitImpl: function(arg1,arg2) {
		var head = this.willEmit();
		var p = head;
		while(p != null) {
			p._listener(arg1,arg2);
			if(!p.stayInList) p.dispose();
			p = p._next;
		}
		this.didEmit(head);
	}
	,emit: function(arg1,arg2) {
		var _g = this;
		if(this.dispatching()) this.defer(function() {
			_g.emitImpl(arg1,arg2);
		}); else this.emitImpl(arg1,arg2);
	}
	,connect: function(listener,prioritize) {
		if(prioritize == null) prioritize = false;
		return this.connectImpl(listener,prioritize);
	}
	,__class__: flambe.util.Signal2
});
flambe.util.Signal1 = function(listener) {
	flambe.util.SignalBase.call(this,listener);
};
flambe.util.Signal1.__name__ = true;
flambe.util.Signal1.__super__ = flambe.util.SignalBase;
flambe.util.Signal1.prototype = $extend(flambe.util.SignalBase.prototype,{
	emitImpl: function(arg1) {
		var head = this.willEmit();
		var p = head;
		while(p != null) {
			p._listener(arg1);
			if(!p.stayInList) p.dispose();
			p = p._next;
		}
		this.didEmit(head);
	}
	,emit: function(arg1) {
		var _g = this;
		if(this.dispatching()) this.defer(function() {
			_g.emitImpl(arg1);
		}); else this.emitImpl(arg1);
	}
	,connect: function(listener,prioritize) {
		if(prioritize == null) prioritize = false;
		return this.connectImpl(listener,prioritize);
	}
	,__class__: flambe.util.Signal1
});
flambe.animation = {}
flambe.animation.AnimatedFloat = function(value,listener) {
	this._behavior = null;
	flambe.util.Value.call(this,value,listener);
};
flambe.animation.AnimatedFloat.__name__ = true;
flambe.animation.AnimatedFloat.__super__ = flambe.util.Value;
flambe.animation.AnimatedFloat.prototype = $extend(flambe.util.Value.prototype,{
	set_behavior: function(behavior) {
		this._behavior = behavior;
		this.update(0);
		return behavior;
	}
	,animateTo: function(to,seconds,easing) {
		this.set_behavior(new flambe.animation.Tween(this._value,to,seconds,easing));
	}
	,update: function(dt) {
		if(this._behavior != null) {
			flambe.util.Value.prototype.set__.call(this,this._behavior.update(dt));
			if(this._behavior.isComplete()) this._behavior = null;
		}
	}
	,set__: function(value) {
		this._behavior = null;
		return flambe.util.Value.prototype.set__.call(this,value);
	}
	,__class__: flambe.animation.AnimatedFloat
});
flambe.System = function() { }
flambe.System.__name__ = true;
flambe.System.init = function() {
	if(!flambe.System._calledInit) {
		flambe.System._platform.init();
		flambe.System._calledInit = true;
	}
}
flambe.System.loadAssetPack = function(manifest) {
	flambe.System.assertCalledInit();
	return flambe.System._platform.loadAssetPack(manifest);
}
flambe.System.createLogger = function(tag) {
	return new flambe.util.Logger(flambe.System._platform.createLogHandler(tag));
}
flambe.System.get_stage = function() {
	flambe.System.assertCalledInit();
	return flambe.System._platform.getStage();
}
flambe.System.get_pointer = function() {
	flambe.System.assertCalledInit();
	return flambe.System._platform.getPointer();
}
flambe.System.assertCalledInit = function() {
	flambe.util.Assert.that(flambe.System._calledInit,"You must call System.init() first");
}
flambe.util.Logger = function(handler) {
	this._handler = handler;
};
flambe.util.Logger.__name__ = true;
flambe.util.Logger.prototype = {
	log: function(level,text,args) {
		if(this._handler == null) return;
		if(text == null) text = "";
		if(args != null) text = flambe.util.Strings.withFields(text,args);
		this._handler.log(level,text);
	}
	,error: function(text,args) {
		this.log(flambe.util.LogLevel.Error,text,args);
	}
	,warn: function(text,args) {
		this.log(flambe.util.LogLevel.Warn,text,args);
	}
	,info: function(text,args) {
		this.log(flambe.util.LogLevel.Info,text,args);
	}
	,__class__: flambe.util.Logger
}
flambe.Log = function() { }
flambe.Log.__name__ = true;
flambe.Log.info = function(text,args) {
	flambe.Log.logger.info(text,args);
}
flambe.Log.warn = function(text,args) {
	flambe.Log.logger.warn(text,args);
}
flambe.Log.error = function(text,args) {
	flambe.Log.logger.error(text,args);
}
flambe.Log.__super__ = flambe.util.PackageLog;
flambe.Log.prototype = $extend(flambe.util.PackageLog.prototype,{
	__class__: flambe.Log
});
flambe.SpeedAdjuster = function() {
	this._realDt = 0;
};
flambe.SpeedAdjuster.__name__ = true;
flambe.SpeedAdjuster.__super__ = flambe.Component;
flambe.SpeedAdjuster.prototype = $extend(flambe.Component.prototype,{
	onUpdate: function(dt) {
		if(this._realDt > 0) {
			dt = this._realDt;
			this._realDt = 0;
		}
		this.scale.update(dt);
	}
	,get_name: function() {
		return "SpeedAdjuster_2";
	}
	,__class__: flambe.SpeedAdjuster
});
flambe.animation.Behavior = function() { }
flambe.animation.Behavior.__name__ = true;
flambe.animation.Behavior.prototype = {
	__class__: flambe.animation.Behavior
}
flambe.animation.Ease = function() { }
flambe.animation.Ease.__name__ = true;
flambe.animation.Ease.linear = function(t) {
	return t;
}
flambe.animation.Tween = function(from,to,seconds,easing) {
	this._from = from;
	this._to = to;
	this._duration = seconds;
	this.elapsed = 0;
	this._easing = easing != null?easing:flambe.animation.Ease.linear;
};
flambe.animation.Tween.__name__ = true;
flambe.animation.Tween.__interfaces__ = [flambe.animation.Behavior];
flambe.animation.Tween.prototype = {
	isComplete: function() {
		return this.elapsed >= this._duration;
	}
	,update: function(dt) {
		this.elapsed += dt;
		if(this.elapsed >= this._duration) return this._to; else return this._from + (this._to - this._from) * this._easing(this.elapsed / this._duration);
	}
	,__class__: flambe.animation.Tween
}
flambe.asset = {}
flambe.asset.Asset = function() { }
flambe.asset.Asset.__name__ = true;
flambe.asset.Asset.__interfaces__ = [flambe.util.Disposable];
flambe.asset.AssetFormat = { __ename__ : true, __constructs__ : ["WEBP","JXR","PNG","JPG","GIF","DDS","PVR","PKM","MP3","M4A","OPUS","OGG","WAV","Data"] }
flambe.asset.AssetFormat.WEBP = ["WEBP",0];
flambe.asset.AssetFormat.WEBP.toString = $estr;
flambe.asset.AssetFormat.WEBP.__enum__ = flambe.asset.AssetFormat;
flambe.asset.AssetFormat.JXR = ["JXR",1];
flambe.asset.AssetFormat.JXR.toString = $estr;
flambe.asset.AssetFormat.JXR.__enum__ = flambe.asset.AssetFormat;
flambe.asset.AssetFormat.PNG = ["PNG",2];
flambe.asset.AssetFormat.PNG.toString = $estr;
flambe.asset.AssetFormat.PNG.__enum__ = flambe.asset.AssetFormat;
flambe.asset.AssetFormat.JPG = ["JPG",3];
flambe.asset.AssetFormat.JPG.toString = $estr;
flambe.asset.AssetFormat.JPG.__enum__ = flambe.asset.AssetFormat;
flambe.asset.AssetFormat.GIF = ["GIF",4];
flambe.asset.AssetFormat.GIF.toString = $estr;
flambe.asset.AssetFormat.GIF.__enum__ = flambe.asset.AssetFormat;
flambe.asset.AssetFormat.DDS = ["DDS",5];
flambe.asset.AssetFormat.DDS.toString = $estr;
flambe.asset.AssetFormat.DDS.__enum__ = flambe.asset.AssetFormat;
flambe.asset.AssetFormat.PVR = ["PVR",6];
flambe.asset.AssetFormat.PVR.toString = $estr;
flambe.asset.AssetFormat.PVR.__enum__ = flambe.asset.AssetFormat;
flambe.asset.AssetFormat.PKM = ["PKM",7];
flambe.asset.AssetFormat.PKM.toString = $estr;
flambe.asset.AssetFormat.PKM.__enum__ = flambe.asset.AssetFormat;
flambe.asset.AssetFormat.MP3 = ["MP3",8];
flambe.asset.AssetFormat.MP3.toString = $estr;
flambe.asset.AssetFormat.MP3.__enum__ = flambe.asset.AssetFormat;
flambe.asset.AssetFormat.M4A = ["M4A",9];
flambe.asset.AssetFormat.M4A.toString = $estr;
flambe.asset.AssetFormat.M4A.__enum__ = flambe.asset.AssetFormat;
flambe.asset.AssetFormat.OPUS = ["OPUS",10];
flambe.asset.AssetFormat.OPUS.toString = $estr;
flambe.asset.AssetFormat.OPUS.__enum__ = flambe.asset.AssetFormat;
flambe.asset.AssetFormat.OGG = ["OGG",11];
flambe.asset.AssetFormat.OGG.toString = $estr;
flambe.asset.AssetFormat.OGG.__enum__ = flambe.asset.AssetFormat;
flambe.asset.AssetFormat.WAV = ["WAV",12];
flambe.asset.AssetFormat.WAV.toString = $estr;
flambe.asset.AssetFormat.WAV.__enum__ = flambe.asset.AssetFormat;
flambe.asset.AssetFormat.Data = ["Data",13];
flambe.asset.AssetFormat.Data.toString = $estr;
flambe.asset.AssetFormat.Data.__enum__ = flambe.asset.AssetFormat;
flambe.asset.AssetEntry = function(name,url,format,bytes) {
	this.name = name;
	this.url = url;
	this.format = format;
	this.bytes = bytes;
};
flambe.asset.AssetEntry.__name__ = true;
flambe.asset.AssetEntry.prototype = {
	__class__: flambe.asset.AssetEntry
}
flambe.asset.AssetPack = function() { }
flambe.asset.AssetPack.__name__ = true;
flambe.asset.AssetPack.__interfaces__ = [flambe.util.Disposable];
flambe.asset.AssetPack.prototype = {
	__class__: flambe.asset.AssetPack
}
flambe.asset.File = function() { }
flambe.asset.File.__name__ = true;
flambe.asset.File.__interfaces__ = [flambe.asset.Asset];
var js = {}
js.Browser = function() { }
js.Browser.__name__ = true;
flambe.asset.Manifest = function() {
	this._remoteBase = null;
	this._localBase = null;
	this._entries = [];
};
flambe.asset.Manifest.__name__ = true;
flambe.asset.Manifest.fromAssets = function(packName,required) {
	if(required == null) required = true;
	var packData = Reflect.field(haxe.rtti.Meta.getType(flambe.asset.Manifest).assets[0],packName);
	if(packData == null) {
		if(required) throw flambe.util.Strings.withFields("Missing asset pack",["name",packName]);
		return null;
	}
	var manifest = new flambe.asset.Manifest();
	manifest.set_localBase("assets");
	var _g = 0;
	while(_g < packData.length) {
		var asset = packData[_g];
		++_g;
		var name = asset.name;
		var path = packName + "/" + name + "?v=" + Std.string(asset.md5);
		var format = flambe.asset.Manifest.inferFormat(name);
		if(format != flambe.asset.AssetFormat.Data) name = flambe.util.Strings.removeFileExtension(name);
		manifest.add(name,path,asset.bytes,format);
	}
	return manifest;
}
flambe.asset.Manifest.inferFormat = function(url) {
	var extension = flambe.util.Strings.getUrlExtension(url);
	if(extension != null) {
		var _g = extension.toLowerCase();
		switch(_g) {
		case "gif":
			return flambe.asset.AssetFormat.GIF;
		case "jpg":case "jpeg":
			return flambe.asset.AssetFormat.JPG;
		case "jxr":case "wdp":
			return flambe.asset.AssetFormat.JXR;
		case "png":
			return flambe.asset.AssetFormat.PNG;
		case "webp":
			return flambe.asset.AssetFormat.WEBP;
		case "dds":
			return flambe.asset.AssetFormat.DDS;
		case "pvr":
			return flambe.asset.AssetFormat.PVR;
		case "pkm":
			return flambe.asset.AssetFormat.PKM;
		case "m4a":
			return flambe.asset.AssetFormat.M4A;
		case "mp3":
			return flambe.asset.AssetFormat.MP3;
		case "ogg":
			return flambe.asset.AssetFormat.OGG;
		case "opus":
			return flambe.asset.AssetFormat.OPUS;
		case "wav":
			return flambe.asset.AssetFormat.WAV;
		}
	} else flambe.Log.warn("No file extension for asset, it will be loaded as data",["url",url]);
	return flambe.asset.AssetFormat.Data;
}
flambe.asset.Manifest.prototype = {
	get_remoteBase: function() {
		return this._remoteBase;
	}
	,set_localBase: function(localBase) {
		if(localBase != null) flambe.util.Assert.that(!StringTools.startsWith(localBase,"http://") && !StringTools.startsWith(localBase,"https://"),"localBase must be a path on the same domain, NOT starting with http(s)://");
		return this._localBase = localBase;
	}
	,get_localBase: function() {
		return this._localBase;
	}
	,getFullURL: function(entry) {
		var basePath = this.get_remoteBase() != null && flambe.asset.Manifest._supportsCrossOrigin?this.get_remoteBase():this.get_localBase();
		return basePath != null?flambe.util.Strings.joinPath(basePath,entry.url):entry.url;
	}
	,iterator: function() {
		return HxOverrides.iter(this._entries);
	}
	,add: function(name,url,bytes,format) {
		if(bytes == null) bytes = 0;
		if(format == null) format = flambe.asset.Manifest.inferFormat(url);
		var entry = new flambe.asset.AssetEntry(name,url,format,bytes);
		this._entries.push(entry);
		return entry;
	}
	,__class__: flambe.asset.Manifest
}
flambe.display = {}
flambe.display.BlendMode = { __ename__ : true, __constructs__ : ["Normal","Add","Mask","Copy"] }
flambe.display.BlendMode.Normal = ["Normal",0];
flambe.display.BlendMode.Normal.toString = $estr;
flambe.display.BlendMode.Normal.__enum__ = flambe.display.BlendMode;
flambe.display.BlendMode.Add = ["Add",1];
flambe.display.BlendMode.Add.toString = $estr;
flambe.display.BlendMode.Add.__enum__ = flambe.display.BlendMode;
flambe.display.BlendMode.Mask = ["Mask",2];
flambe.display.BlendMode.Mask.toString = $estr;
flambe.display.BlendMode.Mask.__enum__ = flambe.display.BlendMode;
flambe.display.BlendMode.Copy = ["Copy",3];
flambe.display.BlendMode.Copy.toString = $estr;
flambe.display.BlendMode.Copy.__enum__ = flambe.display.BlendMode;
flambe.math = {}
flambe.math.Point = function(x,y) {
	if(y == null) y = 0;
	if(x == null) x = 0;
	this.x = x;
	this.y = y;
};
flambe.math.Point.__name__ = true;
flambe.math.Point.prototype = {
	toString: function() {
		return "(" + this.x + "," + this.y + ")";
	}
	,__class__: flambe.math.Point
}
flambe.display.Sprite = function() {
	this.scissor = null;
	this.blendMode = null;
	var _g = this;
	this._flags = 1 | 2 | 8 | 128;
	this._localMatrix = new flambe.math.Matrix();
	var dirtyMatrix = function(_,_1) {
		_g._flags = flambe.util.BitSets.add(_g._flags,4 | 8);
	};
	this.x = new flambe.animation.AnimatedFloat(0,dirtyMatrix);
	this.y = new flambe.animation.AnimatedFloat(0,dirtyMatrix);
	this.rotation = new flambe.animation.AnimatedFloat(0,dirtyMatrix);
	this.scaleX = new flambe.animation.AnimatedFloat(1,dirtyMatrix);
	this.scaleY = new flambe.animation.AnimatedFloat(1,dirtyMatrix);
	this.anchorX = new flambe.animation.AnimatedFloat(0,dirtyMatrix);
	this.anchorY = new flambe.animation.AnimatedFloat(0,dirtyMatrix);
	this.alpha = new flambe.animation.AnimatedFloat(1);
};
flambe.display.Sprite.__name__ = true;
flambe.display.Sprite.hitTest = function(entity,x,y) {
	var sprite = entity.getComponent("Sprite_0");
	if(sprite != null) {
		if(!flambe.util.BitSets.containsAll(sprite._flags,1 | 2)) return null;
		if(sprite.getLocalMatrix().inverseTransform(x,y,flambe.display.Sprite._scratchPoint)) {
			x = flambe.display.Sprite._scratchPoint.x;
			y = flambe.display.Sprite._scratchPoint.y;
		}
		var scissor = sprite.scissor;
		if(scissor != null && !scissor.contains(x,y)) return null;
	}
	var result = flambe.display.Sprite.hitTestBackwards(entity.firstChild,x,y);
	if(result != null) return result;
	return sprite != null && sprite.containsLocal(x,y)?sprite:null;
}
flambe.display.Sprite.render = function(entity,g) {
	var sprite = entity.getComponent("Sprite_0");
	if(sprite != null) {
		var alpha = sprite.alpha.get__();
		if(!sprite.get_visible() || alpha <= 0) return;
		g.save();
		if(alpha < 1) g.multiplyAlpha(alpha);
		if(sprite.blendMode != null) g.setBlendMode(sprite.blendMode);
		var matrix = sprite.getLocalMatrix();
		var m02 = matrix.m02;
		var m12 = matrix.m12;
		if(sprite.get_pixelSnapping()) {
			m02 = Math.round(m02);
			m12 = Math.round(m12);
		}
		g.transform(matrix.m00,matrix.m10,matrix.m01,matrix.m11,m02,m12);
		var scissor = sprite.scissor;
		if(scissor != null) g.applyScissor(scissor.x,scissor.y,scissor.width,scissor.height);
		sprite.draw(g);
	}
	var director = entity.getComponent("Director_1");
	if(director != null) {
		var scenes = director.occludedScenes;
		var _g = 0;
		while(_g < scenes.length) {
			var scene = scenes[_g];
			++_g;
			flambe.display.Sprite.render(scene,g);
		}
	}
	var p = entity.firstChild;
	while(p != null) {
		var next = p.next;
		flambe.display.Sprite.render(p,g);
		p = next;
	}
	if(sprite != null) g.restore();
}
flambe.display.Sprite.hitTestBackwards = function(entity,x,y) {
	if(entity != null) {
		var result = flambe.display.Sprite.hitTestBackwards(entity.next,x,y);
		return result != null?result:flambe.display.Sprite.hitTest(entity,x,y);
	}
	return null;
}
flambe.display.Sprite.__super__ = flambe.Component;
flambe.display.Sprite.prototype = $extend(flambe.Component.prototype,{
	onPointerUp: function(event) {
		var $e = (event.source);
		switch( $e[1] ) {
		case 1:
			var point = $e[2];
			if(this._pointerOut != null && flambe.util.BitSets.contains(this._flags,256)) this._pointerOut.emit(event);
			this._flags = flambe.util.BitSets.remove(this._flags,256);
			if(this._hoverConnection != null) {
				this._hoverConnection.dispose();
				this._hoverConnection = null;
			}
			break;
		default:
		}
		if(this._pointerUp != null) this._pointerUp.emit(event);
	}
	,onHover: function(event) {
		if(flambe.util.BitSets.contains(this._flags,256)) return;
		this._flags = flambe.util.BitSets.add(this._flags,256);
		if(this._pointerIn != null || this._pointerOut != null) {
			if(this._pointerIn != null) this._pointerIn.emit(event);
			this.connectHover();
		}
	}
	,onPointerMove: function(event) {
		this.onHover(event);
		if(this._pointerMove != null) this._pointerMove.emit(event);
	}
	,onPointerDown: function(event) {
		this.onHover(event);
		if(this._pointerDown != null) this._pointerDown.emit(event);
	}
	,get_pixelSnapping: function() {
		return flambe.util.BitSets.contains(this._flags,128);
	}
	,get_visible: function() {
		return flambe.util.BitSets.contains(this._flags,1);
	}
	,connectHover: function() {
		var _g = this;
		if(this._hoverConnection != null) return;
		this._hoverConnection = flambe.System.get_pointer().move.connect(function(event) {
			var hit = event.hit;
			while(hit != null) {
				if(hit == _g) return;
				hit = hit.getParentSprite();
			}
			if(_g._pointerOut != null && flambe.util.BitSets.contains(_g._flags,256)) _g._pointerOut.emit(event);
			_g._flags = flambe.util.BitSets.remove(_g._flags,256);
			_g._hoverConnection.dispose();
			_g._hoverConnection = null;
		});
	}
	,getParentSprite: function() {
		if(this.owner == null) return null;
		var entity = this.owner.parent;
		while(entity != null) {
			var sprite = entity.getComponent("Sprite_0");
			if(sprite != null) return sprite;
			entity = entity.parent;
		}
		return null;
	}
	,draw: function(g) {
	}
	,onUpdate: function(dt) {
		this.x.update(dt);
		this.y.update(dt);
		this.rotation.update(dt);
		this.scaleX.update(dt);
		this.scaleY.update(dt);
		this.alpha.update(dt);
		this.anchorX.update(dt);
		this.anchorY.update(dt);
	}
	,onRemoved: function() {
		if(this._hoverConnection != null) {
			this._hoverConnection.dispose();
			this._hoverConnection = null;
		}
	}
	,onAdded: function() {
		if(flambe.util.BitSets.contains(this._flags,256)) this.connectHover();
	}
	,setScale: function(scale) {
		this.scaleX.set__(scale);
		this.scaleY.set__(scale);
		return this;
	}
	,getLocalMatrix: function() {
		if(flambe.util.BitSets.contains(this._flags,4)) {
			this._flags = flambe.util.BitSets.remove(this._flags,4);
			this._localMatrix.compose(this.x.get__(),this.y.get__(),this.scaleX.get__(),this.scaleY.get__(),flambe.math.FMath.toRadians(this.rotation.get__()));
			this._localMatrix.translate(-this.anchorX.get__(),-this.anchorY.get__());
		}
		return this._localMatrix;
	}
	,containsLocal: function(localX,localY) {
		return localX >= 0 && localX < this.getNaturalWidth() && localY >= 0 && localY < this.getNaturalHeight();
	}
	,getNaturalHeight: function() {
		return 0;
	}
	,getNaturalWidth: function() {
		return 0;
	}
	,get_name: function() {
		return "Sprite_0";
	}
	,__class__: flambe.display.Sprite
});
flambe.display.FillSprite = function(color,width,height) {
	flambe.display.Sprite.call(this);
	this.color = color;
	this.width = new flambe.animation.AnimatedFloat(width);
	this.height = new flambe.animation.AnimatedFloat(height);
};
flambe.display.FillSprite.__name__ = true;
flambe.display.FillSprite.__super__ = flambe.display.Sprite;
flambe.display.FillSprite.prototype = $extend(flambe.display.Sprite.prototype,{
	onUpdate: function(dt) {
		flambe.display.Sprite.prototype.onUpdate.call(this,dt);
		this.width.update(dt);
		this.height.update(dt);
	}
	,getNaturalHeight: function() {
		return this.height.get__();
	}
	,getNaturalWidth: function() {
		return this.width.get__();
	}
	,draw: function(g) {
		g.fillRect(this.color,0,0,this.width.get__(),this.height.get__());
	}
	,__class__: flambe.display.FillSprite
});
flambe.display.Graphics = function() { }
flambe.display.Graphics.__name__ = true;
flambe.display.Graphics.prototype = {
	__class__: flambe.display.Graphics
}
flambe.display.ImageSprite = function(texture) {
	flambe.display.Sprite.call(this);
	this.texture = texture;
};
flambe.display.ImageSprite.__name__ = true;
flambe.display.ImageSprite.__super__ = flambe.display.Sprite;
flambe.display.ImageSprite.prototype = $extend(flambe.display.Sprite.prototype,{
	getNaturalHeight: function() {
		return this.texture != null?this.texture.get_height():0;
	}
	,getNaturalWidth: function() {
		return this.texture != null?this.texture.get_width():0;
	}
	,draw: function(g) {
		if(this.texture != null) g.drawTexture(this.texture,0,0);
	}
	,__class__: flambe.display.ImageSprite
});
flambe.display.Orientation = { __ename__ : true, __constructs__ : ["Portrait","Landscape"] }
flambe.display.Orientation.Portrait = ["Portrait",0];
flambe.display.Orientation.Portrait.toString = $estr;
flambe.display.Orientation.Portrait.__enum__ = flambe.display.Orientation;
flambe.display.Orientation.Landscape = ["Landscape",1];
flambe.display.Orientation.Landscape.toString = $estr;
flambe.display.Orientation.Landscape.__enum__ = flambe.display.Orientation;
flambe.display.Texture = function() { }
flambe.display.Texture.__name__ = true;
flambe.display.Texture.__interfaces__ = [flambe.asset.Asset];
flambe.display.Texture.prototype = {
	__class__: flambe.display.Texture
}
flambe.display.SubTexture = function() { }
flambe.display.SubTexture.__name__ = true;
flambe.display.SubTexture.__interfaces__ = [flambe.display.Texture];
flambe.input = {}
flambe.input.Key = { __ename__ : true, __constructs__ : ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","Number0","Number1","Number2","Number3","Number4","Number5","Number6","Number7","Number8","Number9","Numpad0","Numpad1","Numpad2","Numpad3","Numpad4","Numpad5","Numpad6","Numpad7","Numpad8","Numpad9","NumpadAdd","NumpadDecimal","NumpadDivide","NumpadEnter","NumpadMultiply","NumpadSubtract","F1","F2","F3","F4","F5","F6","F7","F8","F9","F10","F11","F12","F13","F14","F15","Left","Up","Right","Down","Alt","Backquote","Backslash","Backspace","CapsLock","Comma","Command","Control","Delete","End","Enter","Equals","Escape","Home","Insert","LeftBracket","Minus","PageDown","PageUp","Period","Quote","RightBracket","Semicolon","Shift","Slash","Space","Tab","Menu","Search","Unknown"] }
flambe.input.Key.A = ["A",0];
flambe.input.Key.A.toString = $estr;
flambe.input.Key.A.__enum__ = flambe.input.Key;
flambe.input.Key.B = ["B",1];
flambe.input.Key.B.toString = $estr;
flambe.input.Key.B.__enum__ = flambe.input.Key;
flambe.input.Key.C = ["C",2];
flambe.input.Key.C.toString = $estr;
flambe.input.Key.C.__enum__ = flambe.input.Key;
flambe.input.Key.D = ["D",3];
flambe.input.Key.D.toString = $estr;
flambe.input.Key.D.__enum__ = flambe.input.Key;
flambe.input.Key.E = ["E",4];
flambe.input.Key.E.toString = $estr;
flambe.input.Key.E.__enum__ = flambe.input.Key;
flambe.input.Key.F = ["F",5];
flambe.input.Key.F.toString = $estr;
flambe.input.Key.F.__enum__ = flambe.input.Key;
flambe.input.Key.G = ["G",6];
flambe.input.Key.G.toString = $estr;
flambe.input.Key.G.__enum__ = flambe.input.Key;
flambe.input.Key.H = ["H",7];
flambe.input.Key.H.toString = $estr;
flambe.input.Key.H.__enum__ = flambe.input.Key;
flambe.input.Key.I = ["I",8];
flambe.input.Key.I.toString = $estr;
flambe.input.Key.I.__enum__ = flambe.input.Key;
flambe.input.Key.J = ["J",9];
flambe.input.Key.J.toString = $estr;
flambe.input.Key.J.__enum__ = flambe.input.Key;
flambe.input.Key.K = ["K",10];
flambe.input.Key.K.toString = $estr;
flambe.input.Key.K.__enum__ = flambe.input.Key;
flambe.input.Key.L = ["L",11];
flambe.input.Key.L.toString = $estr;
flambe.input.Key.L.__enum__ = flambe.input.Key;
flambe.input.Key.M = ["M",12];
flambe.input.Key.M.toString = $estr;
flambe.input.Key.M.__enum__ = flambe.input.Key;
flambe.input.Key.N = ["N",13];
flambe.input.Key.N.toString = $estr;
flambe.input.Key.N.__enum__ = flambe.input.Key;
flambe.input.Key.O = ["O",14];
flambe.input.Key.O.toString = $estr;
flambe.input.Key.O.__enum__ = flambe.input.Key;
flambe.input.Key.P = ["P",15];
flambe.input.Key.P.toString = $estr;
flambe.input.Key.P.__enum__ = flambe.input.Key;
flambe.input.Key.Q = ["Q",16];
flambe.input.Key.Q.toString = $estr;
flambe.input.Key.Q.__enum__ = flambe.input.Key;
flambe.input.Key.R = ["R",17];
flambe.input.Key.R.toString = $estr;
flambe.input.Key.R.__enum__ = flambe.input.Key;
flambe.input.Key.S = ["S",18];
flambe.input.Key.S.toString = $estr;
flambe.input.Key.S.__enum__ = flambe.input.Key;
flambe.input.Key.T = ["T",19];
flambe.input.Key.T.toString = $estr;
flambe.input.Key.T.__enum__ = flambe.input.Key;
flambe.input.Key.U = ["U",20];
flambe.input.Key.U.toString = $estr;
flambe.input.Key.U.__enum__ = flambe.input.Key;
flambe.input.Key.V = ["V",21];
flambe.input.Key.V.toString = $estr;
flambe.input.Key.V.__enum__ = flambe.input.Key;
flambe.input.Key.W = ["W",22];
flambe.input.Key.W.toString = $estr;
flambe.input.Key.W.__enum__ = flambe.input.Key;
flambe.input.Key.X = ["X",23];
flambe.input.Key.X.toString = $estr;
flambe.input.Key.X.__enum__ = flambe.input.Key;
flambe.input.Key.Y = ["Y",24];
flambe.input.Key.Y.toString = $estr;
flambe.input.Key.Y.__enum__ = flambe.input.Key;
flambe.input.Key.Z = ["Z",25];
flambe.input.Key.Z.toString = $estr;
flambe.input.Key.Z.__enum__ = flambe.input.Key;
flambe.input.Key.Number0 = ["Number0",26];
flambe.input.Key.Number0.toString = $estr;
flambe.input.Key.Number0.__enum__ = flambe.input.Key;
flambe.input.Key.Number1 = ["Number1",27];
flambe.input.Key.Number1.toString = $estr;
flambe.input.Key.Number1.__enum__ = flambe.input.Key;
flambe.input.Key.Number2 = ["Number2",28];
flambe.input.Key.Number2.toString = $estr;
flambe.input.Key.Number2.__enum__ = flambe.input.Key;
flambe.input.Key.Number3 = ["Number3",29];
flambe.input.Key.Number3.toString = $estr;
flambe.input.Key.Number3.__enum__ = flambe.input.Key;
flambe.input.Key.Number4 = ["Number4",30];
flambe.input.Key.Number4.toString = $estr;
flambe.input.Key.Number4.__enum__ = flambe.input.Key;
flambe.input.Key.Number5 = ["Number5",31];
flambe.input.Key.Number5.toString = $estr;
flambe.input.Key.Number5.__enum__ = flambe.input.Key;
flambe.input.Key.Number6 = ["Number6",32];
flambe.input.Key.Number6.toString = $estr;
flambe.input.Key.Number6.__enum__ = flambe.input.Key;
flambe.input.Key.Number7 = ["Number7",33];
flambe.input.Key.Number7.toString = $estr;
flambe.input.Key.Number7.__enum__ = flambe.input.Key;
flambe.input.Key.Number8 = ["Number8",34];
flambe.input.Key.Number8.toString = $estr;
flambe.input.Key.Number8.__enum__ = flambe.input.Key;
flambe.input.Key.Number9 = ["Number9",35];
flambe.input.Key.Number9.toString = $estr;
flambe.input.Key.Number9.__enum__ = flambe.input.Key;
flambe.input.Key.Numpad0 = ["Numpad0",36];
flambe.input.Key.Numpad0.toString = $estr;
flambe.input.Key.Numpad0.__enum__ = flambe.input.Key;
flambe.input.Key.Numpad1 = ["Numpad1",37];
flambe.input.Key.Numpad1.toString = $estr;
flambe.input.Key.Numpad1.__enum__ = flambe.input.Key;
flambe.input.Key.Numpad2 = ["Numpad2",38];
flambe.input.Key.Numpad2.toString = $estr;
flambe.input.Key.Numpad2.__enum__ = flambe.input.Key;
flambe.input.Key.Numpad3 = ["Numpad3",39];
flambe.input.Key.Numpad3.toString = $estr;
flambe.input.Key.Numpad3.__enum__ = flambe.input.Key;
flambe.input.Key.Numpad4 = ["Numpad4",40];
flambe.input.Key.Numpad4.toString = $estr;
flambe.input.Key.Numpad4.__enum__ = flambe.input.Key;
flambe.input.Key.Numpad5 = ["Numpad5",41];
flambe.input.Key.Numpad5.toString = $estr;
flambe.input.Key.Numpad5.__enum__ = flambe.input.Key;
flambe.input.Key.Numpad6 = ["Numpad6",42];
flambe.input.Key.Numpad6.toString = $estr;
flambe.input.Key.Numpad6.__enum__ = flambe.input.Key;
flambe.input.Key.Numpad7 = ["Numpad7",43];
flambe.input.Key.Numpad7.toString = $estr;
flambe.input.Key.Numpad7.__enum__ = flambe.input.Key;
flambe.input.Key.Numpad8 = ["Numpad8",44];
flambe.input.Key.Numpad8.toString = $estr;
flambe.input.Key.Numpad8.__enum__ = flambe.input.Key;
flambe.input.Key.Numpad9 = ["Numpad9",45];
flambe.input.Key.Numpad9.toString = $estr;
flambe.input.Key.Numpad9.__enum__ = flambe.input.Key;
flambe.input.Key.NumpadAdd = ["NumpadAdd",46];
flambe.input.Key.NumpadAdd.toString = $estr;
flambe.input.Key.NumpadAdd.__enum__ = flambe.input.Key;
flambe.input.Key.NumpadDecimal = ["NumpadDecimal",47];
flambe.input.Key.NumpadDecimal.toString = $estr;
flambe.input.Key.NumpadDecimal.__enum__ = flambe.input.Key;
flambe.input.Key.NumpadDivide = ["NumpadDivide",48];
flambe.input.Key.NumpadDivide.toString = $estr;
flambe.input.Key.NumpadDivide.__enum__ = flambe.input.Key;
flambe.input.Key.NumpadEnter = ["NumpadEnter",49];
flambe.input.Key.NumpadEnter.toString = $estr;
flambe.input.Key.NumpadEnter.__enum__ = flambe.input.Key;
flambe.input.Key.NumpadMultiply = ["NumpadMultiply",50];
flambe.input.Key.NumpadMultiply.toString = $estr;
flambe.input.Key.NumpadMultiply.__enum__ = flambe.input.Key;
flambe.input.Key.NumpadSubtract = ["NumpadSubtract",51];
flambe.input.Key.NumpadSubtract.toString = $estr;
flambe.input.Key.NumpadSubtract.__enum__ = flambe.input.Key;
flambe.input.Key.F1 = ["F1",52];
flambe.input.Key.F1.toString = $estr;
flambe.input.Key.F1.__enum__ = flambe.input.Key;
flambe.input.Key.F2 = ["F2",53];
flambe.input.Key.F2.toString = $estr;
flambe.input.Key.F2.__enum__ = flambe.input.Key;
flambe.input.Key.F3 = ["F3",54];
flambe.input.Key.F3.toString = $estr;
flambe.input.Key.F3.__enum__ = flambe.input.Key;
flambe.input.Key.F4 = ["F4",55];
flambe.input.Key.F4.toString = $estr;
flambe.input.Key.F4.__enum__ = flambe.input.Key;
flambe.input.Key.F5 = ["F5",56];
flambe.input.Key.F5.toString = $estr;
flambe.input.Key.F5.__enum__ = flambe.input.Key;
flambe.input.Key.F6 = ["F6",57];
flambe.input.Key.F6.toString = $estr;
flambe.input.Key.F6.__enum__ = flambe.input.Key;
flambe.input.Key.F7 = ["F7",58];
flambe.input.Key.F7.toString = $estr;
flambe.input.Key.F7.__enum__ = flambe.input.Key;
flambe.input.Key.F8 = ["F8",59];
flambe.input.Key.F8.toString = $estr;
flambe.input.Key.F8.__enum__ = flambe.input.Key;
flambe.input.Key.F9 = ["F9",60];
flambe.input.Key.F9.toString = $estr;
flambe.input.Key.F9.__enum__ = flambe.input.Key;
flambe.input.Key.F10 = ["F10",61];
flambe.input.Key.F10.toString = $estr;
flambe.input.Key.F10.__enum__ = flambe.input.Key;
flambe.input.Key.F11 = ["F11",62];
flambe.input.Key.F11.toString = $estr;
flambe.input.Key.F11.__enum__ = flambe.input.Key;
flambe.input.Key.F12 = ["F12",63];
flambe.input.Key.F12.toString = $estr;
flambe.input.Key.F12.__enum__ = flambe.input.Key;
flambe.input.Key.F13 = ["F13",64];
flambe.input.Key.F13.toString = $estr;
flambe.input.Key.F13.__enum__ = flambe.input.Key;
flambe.input.Key.F14 = ["F14",65];
flambe.input.Key.F14.toString = $estr;
flambe.input.Key.F14.__enum__ = flambe.input.Key;
flambe.input.Key.F15 = ["F15",66];
flambe.input.Key.F15.toString = $estr;
flambe.input.Key.F15.__enum__ = flambe.input.Key;
flambe.input.Key.Left = ["Left",67];
flambe.input.Key.Left.toString = $estr;
flambe.input.Key.Left.__enum__ = flambe.input.Key;
flambe.input.Key.Up = ["Up",68];
flambe.input.Key.Up.toString = $estr;
flambe.input.Key.Up.__enum__ = flambe.input.Key;
flambe.input.Key.Right = ["Right",69];
flambe.input.Key.Right.toString = $estr;
flambe.input.Key.Right.__enum__ = flambe.input.Key;
flambe.input.Key.Down = ["Down",70];
flambe.input.Key.Down.toString = $estr;
flambe.input.Key.Down.__enum__ = flambe.input.Key;
flambe.input.Key.Alt = ["Alt",71];
flambe.input.Key.Alt.toString = $estr;
flambe.input.Key.Alt.__enum__ = flambe.input.Key;
flambe.input.Key.Backquote = ["Backquote",72];
flambe.input.Key.Backquote.toString = $estr;
flambe.input.Key.Backquote.__enum__ = flambe.input.Key;
flambe.input.Key.Backslash = ["Backslash",73];
flambe.input.Key.Backslash.toString = $estr;
flambe.input.Key.Backslash.__enum__ = flambe.input.Key;
flambe.input.Key.Backspace = ["Backspace",74];
flambe.input.Key.Backspace.toString = $estr;
flambe.input.Key.Backspace.__enum__ = flambe.input.Key;
flambe.input.Key.CapsLock = ["CapsLock",75];
flambe.input.Key.CapsLock.toString = $estr;
flambe.input.Key.CapsLock.__enum__ = flambe.input.Key;
flambe.input.Key.Comma = ["Comma",76];
flambe.input.Key.Comma.toString = $estr;
flambe.input.Key.Comma.__enum__ = flambe.input.Key;
flambe.input.Key.Command = ["Command",77];
flambe.input.Key.Command.toString = $estr;
flambe.input.Key.Command.__enum__ = flambe.input.Key;
flambe.input.Key.Control = ["Control",78];
flambe.input.Key.Control.toString = $estr;
flambe.input.Key.Control.__enum__ = flambe.input.Key;
flambe.input.Key.Delete = ["Delete",79];
flambe.input.Key.Delete.toString = $estr;
flambe.input.Key.Delete.__enum__ = flambe.input.Key;
flambe.input.Key.End = ["End",80];
flambe.input.Key.End.toString = $estr;
flambe.input.Key.End.__enum__ = flambe.input.Key;
flambe.input.Key.Enter = ["Enter",81];
flambe.input.Key.Enter.toString = $estr;
flambe.input.Key.Enter.__enum__ = flambe.input.Key;
flambe.input.Key.Equals = ["Equals",82];
flambe.input.Key.Equals.toString = $estr;
flambe.input.Key.Equals.__enum__ = flambe.input.Key;
flambe.input.Key.Escape = ["Escape",83];
flambe.input.Key.Escape.toString = $estr;
flambe.input.Key.Escape.__enum__ = flambe.input.Key;
flambe.input.Key.Home = ["Home",84];
flambe.input.Key.Home.toString = $estr;
flambe.input.Key.Home.__enum__ = flambe.input.Key;
flambe.input.Key.Insert = ["Insert",85];
flambe.input.Key.Insert.toString = $estr;
flambe.input.Key.Insert.__enum__ = flambe.input.Key;
flambe.input.Key.LeftBracket = ["LeftBracket",86];
flambe.input.Key.LeftBracket.toString = $estr;
flambe.input.Key.LeftBracket.__enum__ = flambe.input.Key;
flambe.input.Key.Minus = ["Minus",87];
flambe.input.Key.Minus.toString = $estr;
flambe.input.Key.Minus.__enum__ = flambe.input.Key;
flambe.input.Key.PageDown = ["PageDown",88];
flambe.input.Key.PageDown.toString = $estr;
flambe.input.Key.PageDown.__enum__ = flambe.input.Key;
flambe.input.Key.PageUp = ["PageUp",89];
flambe.input.Key.PageUp.toString = $estr;
flambe.input.Key.PageUp.__enum__ = flambe.input.Key;
flambe.input.Key.Period = ["Period",90];
flambe.input.Key.Period.toString = $estr;
flambe.input.Key.Period.__enum__ = flambe.input.Key;
flambe.input.Key.Quote = ["Quote",91];
flambe.input.Key.Quote.toString = $estr;
flambe.input.Key.Quote.__enum__ = flambe.input.Key;
flambe.input.Key.RightBracket = ["RightBracket",92];
flambe.input.Key.RightBracket.toString = $estr;
flambe.input.Key.RightBracket.__enum__ = flambe.input.Key;
flambe.input.Key.Semicolon = ["Semicolon",93];
flambe.input.Key.Semicolon.toString = $estr;
flambe.input.Key.Semicolon.__enum__ = flambe.input.Key;
flambe.input.Key.Shift = ["Shift",94];
flambe.input.Key.Shift.toString = $estr;
flambe.input.Key.Shift.__enum__ = flambe.input.Key;
flambe.input.Key.Slash = ["Slash",95];
flambe.input.Key.Slash.toString = $estr;
flambe.input.Key.Slash.__enum__ = flambe.input.Key;
flambe.input.Key.Space = ["Space",96];
flambe.input.Key.Space.toString = $estr;
flambe.input.Key.Space.__enum__ = flambe.input.Key;
flambe.input.Key.Tab = ["Tab",97];
flambe.input.Key.Tab.toString = $estr;
flambe.input.Key.Tab.__enum__ = flambe.input.Key;
flambe.input.Key.Menu = ["Menu",98];
flambe.input.Key.Menu.toString = $estr;
flambe.input.Key.Menu.__enum__ = flambe.input.Key;
flambe.input.Key.Search = ["Search",99];
flambe.input.Key.Search.toString = $estr;
flambe.input.Key.Search.__enum__ = flambe.input.Key;
flambe.input.Key.Unknown = function(keyCode) { var $x = ["Unknown",100,keyCode]; $x.__enum__ = flambe.input.Key; $x.toString = $estr; return $x; }
flambe.input.KeyboardEvent = function() {
	this.init(0,null);
};
flambe.input.KeyboardEvent.__name__ = true;
flambe.input.KeyboardEvent.prototype = {
	init: function(id,key) {
		this.id = id;
		this.key = key;
	}
	,__class__: flambe.input.KeyboardEvent
}
flambe.input.MouseButton = { __ename__ : true, __constructs__ : ["Left","Middle","Right","Unknown"] }
flambe.input.MouseButton.Left = ["Left",0];
flambe.input.MouseButton.Left.toString = $estr;
flambe.input.MouseButton.Left.__enum__ = flambe.input.MouseButton;
flambe.input.MouseButton.Middle = ["Middle",1];
flambe.input.MouseButton.Middle.toString = $estr;
flambe.input.MouseButton.Middle.__enum__ = flambe.input.MouseButton;
flambe.input.MouseButton.Right = ["Right",2];
flambe.input.MouseButton.Right.toString = $estr;
flambe.input.MouseButton.Right.__enum__ = flambe.input.MouseButton;
flambe.input.MouseButton.Unknown = function(buttonCode) { var $x = ["Unknown",3,buttonCode]; $x.__enum__ = flambe.input.MouseButton; $x.toString = $estr; return $x; }
flambe.input.MouseCursor = { __ename__ : true, __constructs__ : ["Default","Button","None"] }
flambe.input.MouseCursor.Default = ["Default",0];
flambe.input.MouseCursor.Default.toString = $estr;
flambe.input.MouseCursor.Default.__enum__ = flambe.input.MouseCursor;
flambe.input.MouseCursor.Button = ["Button",1];
flambe.input.MouseCursor.Button.toString = $estr;
flambe.input.MouseCursor.Button.__enum__ = flambe.input.MouseCursor;
flambe.input.MouseCursor.None = ["None",2];
flambe.input.MouseCursor.None.toString = $estr;
flambe.input.MouseCursor.None.__enum__ = flambe.input.MouseCursor;
flambe.input.MouseEvent = function() {
	this.init(0,0,0,null);
};
flambe.input.MouseEvent.__name__ = true;
flambe.input.MouseEvent.prototype = {
	init: function(id,viewX,viewY,button) {
		this.id = id;
		this.viewX = viewX;
		this.viewY = viewY;
		this.button = button;
	}
	,__class__: flambe.input.MouseEvent
}
flambe.input.EventSource = { __ename__ : true, __constructs__ : ["Mouse","Touch"] }
flambe.input.EventSource.Mouse = function(event) { var $x = ["Mouse",0,event]; $x.__enum__ = flambe.input.EventSource; $x.toString = $estr; return $x; }
flambe.input.EventSource.Touch = function(point) { var $x = ["Touch",1,point]; $x.__enum__ = flambe.input.EventSource; $x.toString = $estr; return $x; }
flambe.input.PointerEvent = function() {
	this.init(0,0,0,null,null);
};
flambe.input.PointerEvent.__name__ = true;
flambe.input.PointerEvent.prototype = {
	init: function(id,viewX,viewY,hit,source) {
		this.id = id;
		this.viewX = viewX;
		this.viewY = viewY;
		this.hit = hit;
		this.source = source;
		this._stopped = false;
	}
	,__class__: flambe.input.PointerEvent
}
flambe.input.TouchPoint = function(id) {
	this.id = id;
	this._source = flambe.input.EventSource.Touch(this);
};
flambe.input.TouchPoint.__name__ = true;
flambe.input.TouchPoint.prototype = {
	init: function(viewX,viewY) {
		this.viewX = viewX;
		this.viewY = viewY;
	}
	,__class__: flambe.input.TouchPoint
}
flambe.math.FMath = function() { }
flambe.math.FMath.__name__ = true;
flambe.math.FMath.toRadians = function(degrees) {
	return degrees * 3.141592653589793 / 180;
}
flambe.math.FMath.max = function(a,b) {
	return a > b?a:b;
}
flambe.math.FMath.min = function(a,b) {
	return a < b?a:b;
}
flambe.math.Matrix = function() {
	this.identity();
};
flambe.math.Matrix.__name__ = true;
flambe.math.Matrix.multiply = function(lhs,rhs,result) {
	if(result == null) result = new flambe.math.Matrix();
	var a = lhs.m00 * rhs.m00 + lhs.m01 * rhs.m10;
	var b = lhs.m00 * rhs.m01 + lhs.m01 * rhs.m11;
	var c = lhs.m00 * rhs.m02 + lhs.m01 * rhs.m12 + lhs.m02;
	result.m00 = a;
	result.m01 = b;
	result.m02 = c;
	a = lhs.m10 * rhs.m00 + lhs.m11 * rhs.m10;
	b = lhs.m10 * rhs.m01 + lhs.m11 * rhs.m11;
	c = lhs.m10 * rhs.m02 + lhs.m11 * rhs.m12 + lhs.m12;
	result.m10 = a;
	result.m11 = b;
	result.m12 = c;
	return result;
}
flambe.math.Matrix.prototype = {
	toString: function() {
		return this.m00 + " " + this.m01 + " " + this.m02 + " \\ " + this.m10 + " " + this.m11 + " " + this.m12;
	}
	,clone: function(result) {
		if(result == null) result = new flambe.math.Matrix();
		result.set(this.m00,this.m10,this.m01,this.m11,this.m02,this.m12);
		return result;
	}
	,inverseTransform: function(x,y,result) {
		var det = this.determinant();
		if(det == 0) return false;
		x -= this.m02;
		y -= this.m12;
		result.x = (x * this.m11 - y * this.m01) / det;
		result.y = (y * this.m00 - x * this.m10) / det;
		return true;
	}
	,determinant: function() {
		return this.m00 * this.m11 - this.m01 * this.m10;
	}
	,transformArray: function(points,length,result) {
		var ii = 0;
		while(ii < length) {
			var x = points[ii], y = points[ii + 1];
			result[ii++] = x * this.m00 + y * this.m01 + this.m02;
			result[ii++] = x * this.m10 + y * this.m11 + this.m12;
		}
	}
	,invert: function() {
		var det = this.determinant();
		if(det == 0) return false;
		this.set(this.m11 / det,-this.m01 / det,-this.m10 / det,this.m00 / det,(this.m01 * this.m12 - this.m11 * this.m02) / det,(this.m10 * this.m02 - this.m00 * this.m12) / det);
		return true;
	}
	,translate: function(x,y) {
		this.m02 += this.m00 * x + this.m01 * y;
		this.m12 += this.m11 * y + this.m10 * x;
	}
	,compose: function(x,y,scaleX,scaleY,rotation) {
		var sin = Math.sin(rotation);
		var cos = Math.cos(rotation);
		this.set(cos * scaleX,sin * scaleX,-sin * scaleY,cos * scaleY,x,y);
	}
	,identity: function() {
		this.set(1,0,0,1,0,0);
	}
	,set: function(m00,m10,m01,m11,m02,m12) {
		this.m00 = m00;
		this.m01 = m01;
		this.m02 = m02;
		this.m10 = m10;
		this.m11 = m11;
		this.m12 = m12;
	}
	,__class__: flambe.math.Matrix
}
flambe.math.Rectangle = function(x,y,width,height) {
	if(height == null) height = 0;
	if(width == null) width = 0;
	if(y == null) y = 0;
	if(x == null) x = 0;
	this.set(x,y,width,height);
};
flambe.math.Rectangle.__name__ = true;
flambe.math.Rectangle.prototype = {
	toString: function() {
		return "(" + this.x + "," + this.y + " " + this.width + "x" + this.height + ")";
	}
	,equals: function(other) {
		return this.x == other.x && this.y == other.y && this.width == other.width && this.height == other.height;
	}
	,clone: function(result) {
		if(result == null) result = new flambe.math.Rectangle();
		result.set(this.x,this.y,this.width,this.height);
		return result;
	}
	,contains: function(x,y) {
		x -= this.x;
		if(this.width >= 0) {
			if(x < 0 || x > this.width) return false;
		} else if(x > 0 || x < this.width) return false;
		y -= this.y;
		if(this.height >= 0) {
			if(y < 0 || y > this.height) return false;
		} else if(y > 0 || y < this.height) return false;
		return true;
	}
	,set: function(x,y,width,height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}
	,__class__: flambe.math.Rectangle
}
flambe.platform.BasicAsset = function() {
	this._reloadCount = null;
	this._disposed = false;
};
flambe.platform.BasicAsset.__name__ = true;
flambe.platform.BasicAsset.__interfaces__ = [flambe.asset.Asset];
flambe.platform.BasicAsset.prototype = {
	get_reloadCount: function() {
		if(this._reloadCount == null) this._reloadCount = new flambe.util.Value(0);
		return this._reloadCount;
	}
	,copyFrom: function(asset) {
		flambe.util.Assert.fail();
	}
	,reload: function(asset) {
		this.copyFrom(asset);
		var _g = this.get_reloadCount();
		_g.set__(_g.get__() + 1);
	}
	,assertNotDisposed: function() {
		flambe.util.Assert.that(!this._disposed,"Asset cannot be used after being disposed");
	}
	,__class__: flambe.platform.BasicAsset
}
flambe.platform.BasicAssetPackLoader = function(platform,manifest) {
	var _g = this;
	this.manifest = manifest;
	this._platform = platform;
	this.promise = new flambe.util.Promise();
	this._bytesLoaded = new haxe.ds.StringMap();
	this._pack = new flambe.platform._BasicAssetPackLoader.BasicAssetPack(manifest,this);
	var entries = Lambda.array(manifest);
	if(entries.length == 0) this.handleSuccess(); else {
		var groups = new haxe.ds.StringMap();
		var _g1 = 0;
		while(_g1 < entries.length) {
			var entry = entries[_g1];
			++_g1;
			var group = groups.get(entry.name);
			if(group == null) {
				group = [];
				groups.set(entry.name,group);
			}
			group.push(entry);
		}
		this._assetsRemaining = Lambda.count(groups);
		var $it0 = (((function() {
			return function(_e) {
				return (function() {
					return function() {
						return _e.iterator();
					};
				})();
			};
		})())(groups))();
		while( $it0.hasNext() ) {
			var group = $it0.next();
			var group1 = [group];
			this.pickBestEntry(group1[0],(function(group1) {
				return function(bestEntry) {
					if(bestEntry != null) {
						var url = manifest.getFullURL(bestEntry);
						try {
							_g.loadEntry(url,bestEntry);
						} catch( error ) {
							_g.handleError(bestEntry,"Unexpected error: " + Std.string(error));
						}
						var _g1 = _g.promise;
						_g1.set_total(_g1.get_total() + bestEntry.bytes);
					} else {
						var badEntry = group1[0][0];
						if(flambe.platform.BasicAssetPackLoader.isAudio(badEntry.format)) {
							flambe.Log.warn("Could not find a supported audio format to load",["name",badEntry.name]);
							_g.handleLoad(badEntry,flambe.platform.DummySound.getInstance());
						} else _g.handleError(badEntry,"Could not find a supported format to load");
					}
				};
			})(group1));
		}
	}
	var catapult = this._platform.getCatapultClient();
	if(catapult != null) catapult.add(this);
};
flambe.platform.BasicAssetPackLoader.__name__ = true;
flambe.platform.BasicAssetPackLoader.removeUrlParams = function(url) {
	var query = url.indexOf("?");
	return query > 0?HxOverrides.substr(url,0,query):url;
}
flambe.platform.BasicAssetPackLoader.isAudio = function(format) {
	switch( (format)[1] ) {
	case 8:
	case 9:
	case 10:
	case 11:
	case 12:
		return true;
	default:
		return false;
	}
}
flambe.platform.BasicAssetPackLoader.prototype = {
	handleTextureError: function(entry) {
		this.handleError(entry,"Failed to create texture. Is the GPU context unavailable?");
	}
	,handleError: function(entry,message) {
		flambe.Log.warn("Error loading asset pack",["error",message,"url",entry.url]);
		this.promise.error.emit(flambe.util.Strings.withFields(message,["url",entry.url]));
	}
	,handleSuccess: function() {
		this.promise.set_result(this._pack);
	}
	,handleProgress: function(entry,bytesLoaded) {
		this._bytesLoaded.set(entry.name,bytesLoaded);
		var bytesTotal = 0;
		var $it0 = ((function(_e) {
			return function() {
				return _e.iterator();
			};
		})(this._bytesLoaded))();
		while( $it0.hasNext() ) {
			var bytes = $it0.next();
			bytesTotal += bytes;
		}
		this.promise.set_progress(bytesTotal);
	}
	,handleLoad: function(entry,asset) {
		if(this._pack.disposed) return;
		this.handleProgress(entry,entry.bytes);
		var map;
		switch( (entry.format)[1] ) {
		case 0:
		case 1:
		case 2:
		case 3:
		case 4:
		case 5:
		case 6:
		case 7:
			map = this._pack.textures;
			break;
		case 8:
		case 9:
		case 10:
		case 11:
		case 12:
			map = this._pack.sounds;
			break;
		case 13:
			map = this._pack.files;
			break;
		}
		var oldAsset = map.get(entry.name);
		if(oldAsset != null) {
			flambe.Log.info("Reloaded asset",["url",entry.url]);
			oldAsset.reload(asset);
		} else {
			map.set(entry.name,asset);
			this._assetsRemaining -= 1;
			if(this._assetsRemaining == 0) this.handleSuccess();
		}
	}
	,getAssetFormats: function(fn) {
		flambe.util.Assert.fail();
	}
	,loadEntry: function(url,entry) {
		flambe.util.Assert.fail();
	}
	,pickBestEntry: function(entries,fn) {
		var onFormatsAvailable = function(formats) {
			var _g = 0;
			while(_g < formats.length) {
				var format = formats[_g];
				++_g;
				var _g1 = 0;
				while(_g1 < entries.length) {
					var entry = entries[_g1];
					++_g1;
					if(entry.format == format) {
						fn(entry);
						return;
					}
				}
			}
			fn(null);
		};
		this.getAssetFormats(onFormatsAvailable);
	}
	,reload: function(url) {
		var _g = this;
		var baseUrl = flambe.platform.BasicAssetPackLoader.removeUrlParams(url);
		var foundEntry = null;
		var $it0 = this.manifest.iterator();
		while( $it0.hasNext() ) {
			var entry = $it0.next();
			if(baseUrl == flambe.platform.BasicAssetPackLoader.removeUrlParams(entry.url)) {
				foundEntry = entry;
				break;
			}
		}
		if(foundEntry != null) this.getAssetFormats(function(formats) {
			if(flambe.util.Arrays.indexOf(formats,foundEntry.format) >= 0) {
				var entry = new flambe.asset.AssetEntry(foundEntry.name,url,foundEntry.format,0);
				_g.loadEntry(_g.manifest.getFullURL(entry),entry);
			}
		});
	}
	,__class__: flambe.platform.BasicAssetPackLoader
}
flambe.platform._BasicAssetPackLoader = {}
flambe.platform._BasicAssetPackLoader.BasicAssetPack = function(manifest,loader) {
	this.disposed = false;
	this._manifest = manifest;
	this.loader = loader;
	this.textures = new haxe.ds.StringMap();
	this.sounds = new haxe.ds.StringMap();
	this.files = new haxe.ds.StringMap();
};
flambe.platform._BasicAssetPackLoader.BasicAssetPack.__name__ = true;
flambe.platform._BasicAssetPackLoader.BasicAssetPack.__interfaces__ = [flambe.asset.AssetPack];
flambe.platform._BasicAssetPackLoader.BasicAssetPack.warnOnExtension = function(path) {
	var ext = flambe.util.Strings.getFileExtension(path);
	if(ext != null && ext.length == 3) flambe.Log.warn("Requested asset \"" + path + "\" should not have a file extension," + " did you mean \"" + flambe.util.Strings.removeFileExtension(path) + "\"?");
}
flambe.platform._BasicAssetPackLoader.BasicAssetPack.prototype = {
	assertNotDisposed: function() {
		flambe.util.Assert.that(!this.disposed,"AssetPack cannot be used after being disposed");
	}
	,getTexture: function(name,required) {
		if(required == null) required = true;
		this.assertNotDisposed();
		flambe.platform._BasicAssetPackLoader.BasicAssetPack.warnOnExtension(name);
		var texture = this.textures.get(name);
		if(texture == null && required) throw flambe.util.Strings.withFields("Missing texture",["name",name]);
		return texture;
	}
	,__class__: flambe.platform._BasicAssetPackLoader.BasicAssetPack
}
flambe.platform.BasicFile = function(content) {
	flambe.platform.BasicAsset.call(this);
	this._content = content;
};
flambe.platform.BasicFile.__name__ = true;
flambe.platform.BasicFile.__interfaces__ = [flambe.asset.File];
flambe.platform.BasicFile.__super__ = flambe.platform.BasicAsset;
flambe.platform.BasicFile.prototype = $extend(flambe.platform.BasicAsset.prototype,{
	copyFrom: function(that) {
		this._content = that._content;
	}
	,__class__: flambe.platform.BasicFile
});
flambe.subsystem = {}
flambe.subsystem.KeyboardSystem = function() { }
flambe.subsystem.KeyboardSystem.__name__ = true;
flambe.subsystem.KeyboardSystem.prototype = {
	__class__: flambe.subsystem.KeyboardSystem
}
flambe.platform.BasicKeyboard = function() {
	this.down = new flambe.util.Signal1();
	this.up = new flambe.util.Signal1();
	this.backButton = new flambe.util.Signal0();
	this._keyStates = new haxe.ds.IntMap();
};
flambe.platform.BasicKeyboard.__name__ = true;
flambe.platform.BasicKeyboard.__interfaces__ = [flambe.subsystem.KeyboardSystem];
flambe.platform.BasicKeyboard.prototype = {
	submitUp: function(keyCode) {
		if(this.isCodeDown(keyCode)) {
			this._keyStates.remove(keyCode);
			flambe.platform.BasicKeyboard._sharedEvent.init(flambe.platform.BasicKeyboard._sharedEvent.id + 1,flambe.platform.KeyCodes.toKey(keyCode));
			this.up.emit(flambe.platform.BasicKeyboard._sharedEvent);
		}
	}
	,submitDown: function(keyCode) {
		if(keyCode == 16777238) {
			if(this.backButton.hasListeners()) {
				this.backButton.emit();
				return true;
			}
			return false;
		}
		if(!this.isCodeDown(keyCode)) {
			this._keyStates.set(keyCode,true);
			flambe.platform.BasicKeyboard._sharedEvent.init(flambe.platform.BasicKeyboard._sharedEvent.id + 1,flambe.platform.KeyCodes.toKey(keyCode));
			this.down.emit(flambe.platform.BasicKeyboard._sharedEvent);
		}
		return true;
	}
	,isCodeDown: function(keyCode) {
		return this._keyStates.exists(keyCode);
	}
	,isDown: function(key) {
		return this.isCodeDown(flambe.platform.KeyCodes.toKeyCode(key));
	}
	,__class__: flambe.platform.BasicKeyboard
}
flambe.subsystem.MouseSystem = function() { }
flambe.subsystem.MouseSystem.__name__ = true;
flambe.platform.BasicMouse = function(pointer) {
	this._pointer = pointer;
	this._source = flambe.input.EventSource.Mouse(flambe.platform.BasicMouse._sharedEvent);
	this.down = new flambe.util.Signal1();
	this.move = new flambe.util.Signal1();
	this.up = new flambe.util.Signal1();
	this.scroll = new flambe.util.Signal1();
	this._x = 0;
	this._y = 0;
	this._cursor = flambe.input.MouseCursor.Default;
	this._buttonStates = new haxe.ds.IntMap();
};
flambe.platform.BasicMouse.__name__ = true;
flambe.platform.BasicMouse.__interfaces__ = [flambe.subsystem.MouseSystem];
flambe.platform.BasicMouse.prototype = {
	prepare: function(viewX,viewY,button) {
		this._x = viewX;
		this._y = viewY;
		flambe.platform.BasicMouse._sharedEvent.init(flambe.platform.BasicMouse._sharedEvent.id + 1,viewX,viewY,button);
	}
	,isCodeDown: function(buttonCode) {
		return this._buttonStates.exists(buttonCode);
	}
	,submitScroll: function(viewX,viewY,velocity) {
		this._x = viewX;
		this._y = viewY;
		if(!this.scroll.hasListeners()) return false;
		this.scroll.emit(velocity);
		return true;
	}
	,submitUp: function(viewX,viewY,buttonCode) {
		if(this.isCodeDown(buttonCode)) {
			this._buttonStates.remove(buttonCode);
			this.prepare(viewX,viewY,flambe.platform.MouseCodes.toButton(buttonCode));
			this._pointer.submitUp(viewX,viewY,this._source);
			this.up.emit(flambe.platform.BasicMouse._sharedEvent);
		}
	}
	,submitMove: function(viewX,viewY) {
		this.prepare(viewX,viewY,null);
		this._pointer.submitMove(viewX,viewY,this._source);
		this.move.emit(flambe.platform.BasicMouse._sharedEvent);
	}
	,submitDown: function(viewX,viewY,buttonCode) {
		if(!this.isCodeDown(buttonCode)) {
			this._buttonStates.set(buttonCode,true);
			this.prepare(viewX,viewY,flambe.platform.MouseCodes.toButton(buttonCode));
			this._pointer.submitDown(viewX,viewY,this._source);
			this.down.emit(flambe.platform.BasicMouse._sharedEvent);
		}
	}
	,__class__: flambe.platform.BasicMouse
}
flambe.subsystem.PointerSystem = function() { }
flambe.subsystem.PointerSystem.__name__ = true;
flambe.subsystem.PointerSystem.prototype = {
	__class__: flambe.subsystem.PointerSystem
}
flambe.platform.BasicPointer = function(x,y,isDown) {
	if(isDown == null) isDown = false;
	if(y == null) y = 0;
	if(x == null) x = 0;
	this.down = new flambe.util.Signal1();
	this.move = new flambe.util.Signal1();
	this.up = new flambe.util.Signal1();
	this._x = x;
	this._y = y;
	this._isDown = isDown;
};
flambe.platform.BasicPointer.__name__ = true;
flambe.platform.BasicPointer.__interfaces__ = [flambe.subsystem.PointerSystem];
flambe.platform.BasicPointer.prototype = {
	prepare: function(viewX,viewY,hit,source) {
		this._x = viewX;
		this._y = viewY;
		flambe.platform.BasicPointer._sharedEvent.init(flambe.platform.BasicPointer._sharedEvent.id + 1,viewX,viewY,hit,source);
	}
	,submitUp: function(viewX,viewY,source) {
		if(!this._isDown) return;
		this.submitMove(viewX,viewY,source);
		this._isDown = false;
		var chain = [];
		var hit = flambe.display.Sprite.hitTest(flambe.System.root,viewX,viewY);
		if(hit != null) {
			var entity = hit.owner;
			do {
				var sprite = entity.getComponent("Sprite_0");
				if(sprite != null) chain.push(sprite);
				entity = entity.parent;
			} while(entity != null);
		}
		this.prepare(viewX,viewY,hit,source);
		var _g = 0;
		while(_g < chain.length) {
			var sprite = chain[_g];
			++_g;
			sprite.onPointerUp(flambe.platform.BasicPointer._sharedEvent);
			if(flambe.platform.BasicPointer._sharedEvent._stopped) return;
		}
		this.up.emit(flambe.platform.BasicPointer._sharedEvent);
	}
	,submitMove: function(viewX,viewY,source) {
		if(viewX == this._x && viewY == this._y) return;
		var chain = [];
		var hit = flambe.display.Sprite.hitTest(flambe.System.root,viewX,viewY);
		if(hit != null) {
			var entity = hit.owner;
			do {
				var sprite = entity.getComponent("Sprite_0");
				if(sprite != null) chain.push(sprite);
				entity = entity.parent;
			} while(entity != null);
		}
		this.prepare(viewX,viewY,hit,source);
		var _g = 0;
		while(_g < chain.length) {
			var sprite = chain[_g];
			++_g;
			sprite.onPointerMove(flambe.platform.BasicPointer._sharedEvent);
			if(flambe.platform.BasicPointer._sharedEvent._stopped) return;
		}
		this.move.emit(flambe.platform.BasicPointer._sharedEvent);
	}
	,submitDown: function(viewX,viewY,source) {
		if(this._isDown) return;
		this.submitMove(viewX,viewY,source);
		this._isDown = true;
		var chain = [];
		var hit = flambe.display.Sprite.hitTest(flambe.System.root,viewX,viewY);
		if(hit != null) {
			var entity = hit.owner;
			do {
				var sprite = entity.getComponent("Sprite_0");
				if(sprite != null) chain.push(sprite);
				entity = entity.parent;
			} while(entity != null);
		}
		this.prepare(viewX,viewY,hit,source);
		var _g = 0;
		while(_g < chain.length) {
			var sprite = chain[_g];
			++_g;
			sprite.onPointerDown(flambe.platform.BasicPointer._sharedEvent);
			if(flambe.platform.BasicPointer._sharedEvent._stopped) return;
		}
		this.down.emit(flambe.platform.BasicPointer._sharedEvent);
	}
	,__class__: flambe.platform.BasicPointer
}
flambe.platform.BasicTexture = function(root,width,height) {
	this._y = 0;
	this._x = 0;
	this.rootY = 0;
	this.rootX = 0;
	flambe.platform.BasicAsset.call(this);
	this.root = root;
	this._width = width;
	this._height = height;
};
flambe.platform.BasicTexture.__name__ = true;
flambe.platform.BasicTexture.__interfaces__ = [flambe.display.SubTexture];
flambe.platform.BasicTexture.__super__ = flambe.platform.BasicAsset;
flambe.platform.BasicTexture.prototype = $extend(flambe.platform.BasicAsset.prototype,{
	get_height: function() {
		return this._height;
	}
	,get_width: function() {
		return this._width;
	}
	,get_reloadCount: function() {
		return this.root.get_reloadCount();
	}
	,copyFrom: function(that) {
		this.root.copyFrom(that.root);
		this._width = that._width;
		this._height = that._height;
		flambe.util.Assert.that(this.rootX == that.rootX && this.rootY == that.rootY && this._x == that._x && this._y == that._y);
	}
	,__class__: flambe.platform.BasicTexture
});
flambe.subsystem.TouchSystem = function() { }
flambe.subsystem.TouchSystem.__name__ = true;
flambe.platform.BasicTouch = function(pointer,maxPoints) {
	if(maxPoints == null) maxPoints = 4;
	this._pointer = pointer;
	this._maxPoints = maxPoints;
	this._pointMap = new haxe.ds.IntMap();
	this._points = [];
	this.down = new flambe.util.Signal1();
	this.move = new flambe.util.Signal1();
	this.up = new flambe.util.Signal1();
};
flambe.platform.BasicTouch.__name__ = true;
flambe.platform.BasicTouch.__interfaces__ = [flambe.subsystem.TouchSystem];
flambe.platform.BasicTouch.prototype = {
	submitUp: function(id,viewX,viewY) {
		var point = this._pointMap.get(id);
		if(point != null) {
			point.init(viewX,viewY);
			this._pointMap.remove(id);
			HxOverrides.remove(this._points,point);
			if(this._pointerTouch == point) {
				this._pointerTouch = null;
				this._pointer.submitUp(viewX,viewY,point._source);
			}
			this.up.emit(point);
		}
	}
	,submitMove: function(id,viewX,viewY) {
		var point = this._pointMap.get(id);
		if(point != null) {
			point.init(viewX,viewY);
			if(this._pointerTouch == point) this._pointer.submitMove(viewX,viewY,point._source);
			this.move.emit(point);
		}
	}
	,submitDown: function(id,viewX,viewY) {
		if(!this._pointMap.exists(id)) {
			var point = new flambe.input.TouchPoint(id);
			point.init(viewX,viewY);
			this._pointMap.set(id,point);
			this._points.push(point);
			if(this._pointerTouch == null) {
				this._pointerTouch = point;
				this._pointer.submitDown(viewX,viewY,point._source);
			}
			this.down.emit(point);
		}
	}
	,__class__: flambe.platform.BasicTouch
}
flambe.platform.CatapultClient = function() {
	this._loaders = [];
};
flambe.platform.CatapultClient.__name__ = true;
flambe.platform.CatapultClient.prototype = {
	onRestart: function() {
		flambe.util.Assert.fail();
	}
	,onMessage: function(message) {
		var message1 = haxe.Json.parse(message);
		switch(message1.type) {
		case "file_changed":
			var url = message1.name + "?v=" + message1.md5;
			url = StringTools.replace(url,"\\","/");
			var _g = 0, _g1 = this._loaders;
			while(_g < _g1.length) {
				var loader = _g1[_g];
				++_g;
				loader.reload(url);
			}
			break;
		case "restart":
			this.onRestart();
			break;
		}
	}
	,onError: function(cause) {
		flambe.Log.warn("Unable to connect to Catapult",["cause",cause]);
	}
	,add: function(loader) {
		if(loader.manifest.get_localBase() == "assets") this._loaders.push(loader);
	}
	,__class__: flambe.platform.CatapultClient
}
flambe.platform.DebugLogic = function(platform) {
	var _g = this;
	this._platform = platform;
	platform.getKeyboard().down.connect(function(event) {
		if(event.key == flambe.input.Key.O && platform.getKeyboard().isDown(flambe.input.Key.Control)) {
			if(_g.toggleOverdrawGraphics()) flambe.Log.info("Enabled overdraw visualizer, press Ctrl-O again to disable");
		}
	});
};
flambe.platform.DebugLogic.__name__ = true;
flambe.platform.DebugLogic.prototype = {
	toggleOverdrawGraphics: function() {
		var renderer = this._platform.getRenderer();
		if(this._savedGraphics != null) {
			renderer.graphics = this._savedGraphics;
			this._savedGraphics = null;
		} else if(renderer.graphics != null) {
			this._savedGraphics = renderer.graphics;
			renderer.graphics = new flambe.platform.OverdrawGraphics(this._savedGraphics);
			return true;
		}
		return false;
	}
	,__class__: flambe.platform.DebugLogic
}
flambe.sound = {}
flambe.sound.Sound = function() { }
flambe.sound.Sound.__name__ = true;
flambe.sound.Sound.__interfaces__ = [flambe.asset.Asset];
flambe.platform.DummySound = function() {
	flambe.platform.BasicAsset.call(this);
	this._playback = new flambe.platform.DummyPlayback(this);
};
flambe.platform.DummySound.__name__ = true;
flambe.platform.DummySound.__interfaces__ = [flambe.sound.Sound];
flambe.platform.DummySound.getInstance = function() {
	if(flambe.platform.DummySound._instance == null) flambe.platform.DummySound._instance = new flambe.platform.DummySound();
	return flambe.platform.DummySound._instance;
}
flambe.platform.DummySound.__super__ = flambe.platform.BasicAsset;
flambe.platform.DummySound.prototype = $extend(flambe.platform.BasicAsset.prototype,{
	copyFrom: function(asset) {
	}
	,__class__: flambe.platform.DummySound
});
flambe.sound.Playback = function() { }
flambe.sound.Playback.__name__ = true;
flambe.sound.Playback.__interfaces__ = [flambe.util.Disposable];
flambe.platform.DummyPlayback = function(sound) {
	this._sound = sound;
	this.volume = new flambe.animation.AnimatedFloat(0);
	this._complete = new flambe.util.Value(true);
};
flambe.platform.DummyPlayback.__name__ = true;
flambe.platform.DummyPlayback.__interfaces__ = [flambe.sound.Playback];
flambe.platform.DummyPlayback.prototype = {
	__class__: flambe.platform.DummyPlayback
}
flambe.platform.DummyTouch = function() {
	this.down = new flambe.util.Signal1();
	this.move = new flambe.util.Signal1();
	this.up = new flambe.util.Signal1();
};
flambe.platform.DummyTouch.__name__ = true;
flambe.platform.DummyTouch.__interfaces__ = [flambe.subsystem.TouchSystem];
flambe.platform.DummyTouch.prototype = {
	__class__: flambe.platform.DummyTouch
}
flambe.platform.EventGroup = function() {
	this._entries = [];
};
flambe.platform.EventGroup.__name__ = true;
flambe.platform.EventGroup.__interfaces__ = [flambe.util.Disposable];
flambe.platform.EventGroup.prototype = {
	dispose: function() {
		var _g = 0, _g1 = this._entries;
		while(_g < _g1.length) {
			var entry = _g1[_g];
			++_g;
			entry.dispatcher.removeEventListener(entry.type,entry.listener,false);
		}
		this._entries = [];
	}
	,addDisposingListener: function(dispatcher,type,listener) {
		var _g = this;
		this.addListener(dispatcher,type,function(event) {
			_g.dispose();
			listener(event);
		});
	}
	,addListener: function(dispatcher,type,listener) {
		dispatcher.addEventListener(type,listener,false);
		this._entries.push(new flambe.platform._EventGroup.Entry(dispatcher,type,listener));
	}
	,__class__: flambe.platform.EventGroup
}
flambe.platform._EventGroup = {}
flambe.platform._EventGroup.Entry = function(dispatcher,type,listener) {
	this.dispatcher = dispatcher;
	this.type = type;
	this.listener = listener;
};
flambe.platform._EventGroup.Entry.__name__ = true;
flambe.platform._EventGroup.Entry.prototype = {
	__class__: flambe.platform._EventGroup.Entry
}
flambe.platform.InternalGraphics = function() { }
flambe.platform.InternalGraphics.__name__ = true;
flambe.platform.InternalGraphics.__interfaces__ = [flambe.display.Graphics];
flambe.platform.InternalGraphics.prototype = {
	__class__: flambe.platform.InternalGraphics
}
flambe.subsystem.RendererSystem = function() { }
flambe.subsystem.RendererSystem.__name__ = true;
flambe.subsystem.RendererSystem.prototype = {
	__class__: flambe.subsystem.RendererSystem
}
flambe.platform.InternalRenderer = function() { }
flambe.platform.InternalRenderer.__name__ = true;
flambe.platform.InternalRenderer.__interfaces__ = [flambe.subsystem.RendererSystem];
flambe.platform.InternalRenderer.prototype = {
	__class__: flambe.platform.InternalRenderer
}
flambe.platform.KeyCodes = function() { }
flambe.platform.KeyCodes.__name__ = true;
flambe.platform.KeyCodes.toKey = function(keyCode) {
	switch(keyCode) {
	case 65:
		return flambe.input.Key.A;
	case 66:
		return flambe.input.Key.B;
	case 67:
		return flambe.input.Key.C;
	case 68:
		return flambe.input.Key.D;
	case 69:
		return flambe.input.Key.E;
	case 70:
		return flambe.input.Key.F;
	case 71:
		return flambe.input.Key.G;
	case 72:
		return flambe.input.Key.H;
	case 73:
		return flambe.input.Key.I;
	case 74:
		return flambe.input.Key.J;
	case 75:
		return flambe.input.Key.K;
	case 76:
		return flambe.input.Key.L;
	case 77:
		return flambe.input.Key.M;
	case 78:
		return flambe.input.Key.N;
	case 79:
		return flambe.input.Key.O;
	case 80:
		return flambe.input.Key.P;
	case 81:
		return flambe.input.Key.Q;
	case 82:
		return flambe.input.Key.R;
	case 83:
		return flambe.input.Key.S;
	case 84:
		return flambe.input.Key.T;
	case 85:
		return flambe.input.Key.U;
	case 86:
		return flambe.input.Key.V;
	case 87:
		return flambe.input.Key.W;
	case 88:
		return flambe.input.Key.X;
	case 89:
		return flambe.input.Key.Y;
	case 90:
		return flambe.input.Key.Z;
	case 48:
		return flambe.input.Key.Number0;
	case 49:
		return flambe.input.Key.Number1;
	case 50:
		return flambe.input.Key.Number2;
	case 51:
		return flambe.input.Key.Number3;
	case 52:
		return flambe.input.Key.Number4;
	case 53:
		return flambe.input.Key.Number5;
	case 54:
		return flambe.input.Key.Number6;
	case 55:
		return flambe.input.Key.Number7;
	case 56:
		return flambe.input.Key.Number8;
	case 57:
		return flambe.input.Key.Number9;
	case 96:
		return flambe.input.Key.Numpad0;
	case 97:
		return flambe.input.Key.Numpad1;
	case 98:
		return flambe.input.Key.Numpad2;
	case 99:
		return flambe.input.Key.Numpad3;
	case 100:
		return flambe.input.Key.Numpad4;
	case 101:
		return flambe.input.Key.Numpad5;
	case 102:
		return flambe.input.Key.Numpad6;
	case 103:
		return flambe.input.Key.Numpad7;
	case 104:
		return flambe.input.Key.Numpad8;
	case 105:
		return flambe.input.Key.Numpad9;
	case 107:
		return flambe.input.Key.NumpadAdd;
	case 110:
		return flambe.input.Key.NumpadDecimal;
	case 111:
		return flambe.input.Key.NumpadDivide;
	case 108:
		return flambe.input.Key.NumpadEnter;
	case 106:
		return flambe.input.Key.NumpadMultiply;
	case 109:
		return flambe.input.Key.NumpadSubtract;
	case 112:
		return flambe.input.Key.F1;
	case 113:
		return flambe.input.Key.F2;
	case 114:
		return flambe.input.Key.F3;
	case 115:
		return flambe.input.Key.F4;
	case 116:
		return flambe.input.Key.F5;
	case 117:
		return flambe.input.Key.F6;
	case 118:
		return flambe.input.Key.F7;
	case 119:
		return flambe.input.Key.F8;
	case 120:
		return flambe.input.Key.F9;
	case 121:
		return flambe.input.Key.F10;
	case 122:
		return flambe.input.Key.F11;
	case 123:
		return flambe.input.Key.F12;
	case 37:
		return flambe.input.Key.Left;
	case 38:
		return flambe.input.Key.Up;
	case 39:
		return flambe.input.Key.Right;
	case 40:
		return flambe.input.Key.Down;
	case 18:
		return flambe.input.Key.Alt;
	case 192:
		return flambe.input.Key.Backquote;
	case 220:
		return flambe.input.Key.Backslash;
	case 8:
		return flambe.input.Key.Backspace;
	case 20:
		return flambe.input.Key.CapsLock;
	case 188:
		return flambe.input.Key.Comma;
	case 15:
		return flambe.input.Key.Command;
	case 17:
		return flambe.input.Key.Control;
	case 46:
		return flambe.input.Key.Delete;
	case 35:
		return flambe.input.Key.End;
	case 13:
		return flambe.input.Key.Enter;
	case 187:
		return flambe.input.Key.Equals;
	case 27:
		return flambe.input.Key.Escape;
	case 36:
		return flambe.input.Key.Home;
	case 45:
		return flambe.input.Key.Insert;
	case 219:
		return flambe.input.Key.LeftBracket;
	case 189:
		return flambe.input.Key.Minus;
	case 34:
		return flambe.input.Key.PageDown;
	case 33:
		return flambe.input.Key.PageUp;
	case 190:
		return flambe.input.Key.Period;
	case 222:
		return flambe.input.Key.Quote;
	case 221:
		return flambe.input.Key.RightBracket;
	case 186:
		return flambe.input.Key.Semicolon;
	case 16:
		return flambe.input.Key.Shift;
	case 191:
		return flambe.input.Key.Slash;
	case 32:
		return flambe.input.Key.Space;
	case 9:
		return flambe.input.Key.Tab;
	case 16777234:
		return flambe.input.Key.Menu;
	case 16777247:
		return flambe.input.Key.Search;
	}
	return flambe.input.Key.Unknown(keyCode);
}
flambe.platform.KeyCodes.toKeyCode = function(key) {
	var $e = (key);
	switch( $e[1] ) {
	case 0:
		return 65;
	case 1:
		return 66;
	case 2:
		return 67;
	case 3:
		return 68;
	case 4:
		return 69;
	case 5:
		return 70;
	case 6:
		return 71;
	case 7:
		return 72;
	case 8:
		return 73;
	case 9:
		return 74;
	case 10:
		return 75;
	case 11:
		return 76;
	case 12:
		return 77;
	case 13:
		return 78;
	case 14:
		return 79;
	case 15:
		return 80;
	case 16:
		return 81;
	case 17:
		return 82;
	case 18:
		return 83;
	case 19:
		return 84;
	case 20:
		return 85;
	case 21:
		return 86;
	case 22:
		return 87;
	case 23:
		return 88;
	case 24:
		return 89;
	case 25:
		return 90;
	case 26:
		return 48;
	case 27:
		return 49;
	case 28:
		return 50;
	case 29:
		return 51;
	case 30:
		return 52;
	case 31:
		return 53;
	case 32:
		return 54;
	case 33:
		return 55;
	case 34:
		return 56;
	case 35:
		return 57;
	case 36:
		return 96;
	case 37:
		return 97;
	case 38:
		return 98;
	case 39:
		return 99;
	case 40:
		return 100;
	case 41:
		return 101;
	case 42:
		return 102;
	case 43:
		return 103;
	case 44:
		return 104;
	case 45:
		return 105;
	case 46:
		return 107;
	case 47:
		return 110;
	case 48:
		return 111;
	case 49:
		return 108;
	case 50:
		return 106;
	case 51:
		return 109;
	case 52:
		return 112;
	case 53:
		return 113;
	case 54:
		return 114;
	case 55:
		return 115;
	case 56:
		return 116;
	case 57:
		return 117;
	case 58:
		return 118;
	case 59:
		return 119;
	case 60:
		return 120;
	case 61:
		return 121;
	case 62:
		return 122;
	case 63:
		return 123;
	case 64:
		return 124;
	case 65:
		return 125;
	case 66:
		return 126;
	case 67:
		return 37;
	case 68:
		return 38;
	case 69:
		return 39;
	case 70:
		return 40;
	case 71:
		return 18;
	case 72:
		return 192;
	case 73:
		return 220;
	case 74:
		return 8;
	case 75:
		return 20;
	case 76:
		return 188;
	case 77:
		return 15;
	case 78:
		return 17;
	case 79:
		return 46;
	case 80:
		return 35;
	case 81:
		return 13;
	case 82:
		return 187;
	case 83:
		return 27;
	case 84:
		return 36;
	case 85:
		return 45;
	case 86:
		return 219;
	case 87:
		return 189;
	case 88:
		return 34;
	case 89:
		return 33;
	case 90:
		return 190;
	case 91:
		return 222;
	case 92:
		return 221;
	case 93:
		return 186;
	case 94:
		return 16;
	case 95:
		return 191;
	case 96:
		return 32;
	case 97:
		return 9;
	case 98:
		return 16777234;
	case 99:
		return 16777247;
	case 100:
		var keyCode = $e[2];
		return keyCode;
	}
}
flambe.platform.MainLoop = function() {
	this._tickables = [];
};
flambe.platform.MainLoop.__name__ = true;
flambe.platform.MainLoop.updateEntity = function(entity,dt) {
	var speed = entity.getComponent("SpeedAdjuster_2");
	if(speed != null) {
		speed._realDt = dt;
		dt *= speed.scale.get__();
		if(dt <= 0) {
			speed.onUpdate(dt);
			return;
		}
	}
	var p = entity.firstComponent;
	while(p != null) {
		var next = p.next;
		p.onUpdate(dt);
		p = next;
	}
	var p1 = entity.firstChild;
	while(p1 != null) {
		var next = p1.next;
		flambe.platform.MainLoop.updateEntity(p1,dt);
		p1 = next;
	}
}
flambe.platform.MainLoop.prototype = {
	render: function(renderer) {
		var graphics = renderer.graphics;
		if(graphics != null) {
			renderer.willRender();
			flambe.display.Sprite.render(flambe.System.root,graphics);
			renderer.didRender();
		}
	}
	,update: function(dt) {
		if(dt <= 0) {
			flambe.Log.warn("Zero or negative time elapsed since the last frame!",["dt",dt]);
			return;
		}
		if(dt > 1) dt = 1;
		var ii = 0;
		while(ii < this._tickables.length) {
			var t = this._tickables[ii];
			if(t == null || t.update(dt)) this._tickables.splice(ii,1); else ++ii;
		}
		flambe.System.volume.update(dt);
		flambe.platform.MainLoop.updateEntity(flambe.System.root,dt);
	}
	,__class__: flambe.platform.MainLoop
}
flambe.platform.MathUtil = function() { }
flambe.platform.MathUtil.__name__ = true;
flambe.platform.MathUtil.nextPowerOfTwo = function(n) {
	var p = 1;
	while(p < n) p <<= 1;
	return p;
}
flambe.platform.MouseCodes = function() { }
flambe.platform.MouseCodes.__name__ = true;
flambe.platform.MouseCodes.toButton = function(buttonCode) {
	switch(buttonCode) {
	case 0:
		return flambe.input.MouseButton.Left;
	case 1:
		return flambe.input.MouseButton.Middle;
	case 2:
		return flambe.input.MouseButton.Right;
	}
	return flambe.input.MouseButton.Unknown(buttonCode);
}
flambe.platform.OverdrawGraphics = function(impl) {
	this._impl = impl;
};
flambe.platform.OverdrawGraphics.__name__ = true;
flambe.platform.OverdrawGraphics.__interfaces__ = [flambe.platform.InternalGraphics];
flambe.platform.OverdrawGraphics.prototype = {
	drawRegion: function(x,y,width,height) {
		this._impl.fillRect(1052680,x,y,width,height);
	}
	,onResize: function(width,height) {
		this._impl.onResize(width,height);
	}
	,didRender: function() {
		this._impl.restore();
		this._impl.didRender();
	}
	,willRender: function() {
		this._impl.willRender();
		this._impl.save();
		this._impl.setBlendMode(flambe.display.BlendMode.Add);
	}
	,fillRect: function(color,x,y,width,height) {
		this.drawRegion(x,y,width,height);
	}
	,drawTexture: function(texture,destX,destY) {
		this.drawRegion(destX,destY,texture.get_width(),texture.get_height());
	}
	,restore: function() {
		this._impl.restore();
	}
	,applyScissor: function(x,y,width,height) {
		this._impl.applyScissor(x,y,width,height);
	}
	,setBlendMode: function(blendMode) {
	}
	,multiplyAlpha: function(factor) {
	}
	,transform: function(m00,m10,m01,m11,m02,m12) {
		this._impl.transform(m00,m10,m01,m11,m02,m12);
	}
	,save: function() {
		this._impl.save();
	}
	,__class__: flambe.platform.OverdrawGraphics
}
flambe.platform.TextureRoot = function() { }
flambe.platform.TextureRoot.__name__ = true;
flambe.platform.Tickable = function() { }
flambe.platform.Tickable.__name__ = true;
flambe.platform.Tickable.prototype = {
	__class__: flambe.platform.Tickable
}
flambe.platform.html.CanvasGraphics = function(canvas) {
	this._firstDraw = false;
	this._canvasCtx = canvas.getContext("2d");
};
flambe.platform.html.CanvasGraphics.__name__ = true;
flambe.platform.html.CanvasGraphics.__interfaces__ = [flambe.platform.InternalGraphics];
flambe.platform.html.CanvasGraphics.prototype = {
	onResize: function(width,height) {
	}
	,didRender: function() {
	}
	,willRender: function() {
		this._firstDraw = true;
	}
	,applyScissor: function(x,y,width,height) {
		this._canvasCtx.beginPath();
		this._canvasCtx.rect(Std["int"](x),Std["int"](y),Std["int"](width),Std["int"](height));
		this._canvasCtx.clip();
	}
	,setBlendMode: function(blendMode) {
		var op;
		switch( (blendMode)[1] ) {
		case 0:
			op = "source-over";
			break;
		case 1:
			op = "lighter";
			break;
		case 2:
			op = "destination-in";
			break;
		case 3:
			op = "copy";
			break;
		}
		this._canvasCtx.globalCompositeOperation = op;
	}
	,multiplyAlpha: function(factor) {
		this._canvasCtx.globalAlpha *= factor;
	}
	,fillRect: function(color,x,y,width,height) {
		if(this._firstDraw) {
			this._firstDraw = false;
			this._canvasCtx.globalCompositeOperation = "copy";
			this.fillRect(color,x,y,width,height);
			this._canvasCtx.globalCompositeOperation = "source-over";
			return;
		}
		var hex = (16777215 & color).toString(16);
		while(hex.length < 6) hex = "0" + Std.string(hex);
		this._canvasCtx.fillStyle = "#" + Std.string(hex);
		this._canvasCtx.fillRect(Std["int"](x),Std["int"](y),Std["int"](width),Std["int"](height));
	}
	,drawSubTexture: function(texture,destX,destY,sourceX,sourceY,sourceW,sourceH) {
		if(this._firstDraw) {
			this._firstDraw = false;
			this._canvasCtx.globalCompositeOperation = "copy";
			this.drawSubTexture(texture,destX,destY,sourceX,sourceY,sourceW,sourceH);
			this._canvasCtx.globalCompositeOperation = "source-over";
			return;
		}
		var texture1 = texture;
		var root = texture1.root;
		root.assertNotDisposed();
		this._canvasCtx.drawImage(root.image,Std["int"](texture1.rootX + sourceX),Std["int"](texture1.rootY + sourceY),Std["int"](sourceW),Std["int"](sourceH),Std["int"](destX),Std["int"](destY),Std["int"](sourceW),Std["int"](sourceH));
	}
	,drawTexture: function(texture,destX,destY) {
		this.drawSubTexture(texture,destX,destY,0,0,texture.get_width(),texture.get_height());
	}
	,restore: function() {
		this._canvasCtx.restore();
	}
	,transform: function(m00,m10,m01,m11,m02,m12) {
		this._canvasCtx.transform(m00,m10,m01,m11,m02,m12);
	}
	,save: function() {
		this._canvasCtx.save();
	}
	,__class__: flambe.platform.html.CanvasGraphics
}
flambe.platform.html.CanvasRenderer = function(canvas) {
	this.graphics = new flambe.platform.html.CanvasGraphics(canvas);
	this._hasGPU = new flambe.util.Value(true);
};
flambe.platform.html.CanvasRenderer.__name__ = true;
flambe.platform.html.CanvasRenderer.__interfaces__ = [flambe.platform.InternalRenderer];
flambe.platform.html.CanvasRenderer.prototype = {
	didRender: function() {
		this.graphics.didRender();
	}
	,willRender: function() {
		this.graphics.willRender();
	}
	,createCompressedTexture: function(format,data) {
		flambe.util.Assert.fail();
		return null;
	}
	,getCompressedTextureFormats: function() {
		return [];
	}
	,createTextureFromImage: function(image) {
		var root = new flambe.platform.html.CanvasTextureRoot(flambe.platform.html.CanvasRenderer.CANVAS_TEXTURES?flambe.platform.html.HtmlUtil.createCanvas(image):image);
		return root.createTexture(root.width,root.height);
	}
	,get_type: function() {
		return flambe.subsystem.RendererType.Canvas;
	}
	,__class__: flambe.platform.html.CanvasRenderer
}
flambe.platform.html.CanvasTexture = function(root,width,height) {
	flambe.platform.BasicTexture.call(this,root,width,height);
};
flambe.platform.html.CanvasTexture.__name__ = true;
flambe.platform.html.CanvasTexture.__super__ = flambe.platform.BasicTexture;
flambe.platform.html.CanvasTexture.prototype = $extend(flambe.platform.BasicTexture.prototype,{
	__class__: flambe.platform.html.CanvasTexture
});
flambe.platform.html.CanvasTextureRoot = function(image) {
	this._graphics = null;
	this.updateCount = 0;
	flambe.platform.BasicAsset.call(this);
	this.image = image;
	this.width = image.width;
	this.height = image.height;
};
flambe.platform.html.CanvasTextureRoot.__name__ = true;
flambe.platform.html.CanvasTextureRoot.__interfaces__ = [flambe.platform.TextureRoot];
flambe.platform.html.CanvasTextureRoot.__super__ = flambe.platform.BasicAsset;
flambe.platform.html.CanvasTextureRoot.prototype = $extend(flambe.platform.BasicAsset.prototype,{
	copyFrom: function(that) {
		this.image = that.image;
		this._graphics = that._graphics;
		this.dirtyContents();
	}
	,dirtyContents: function() {
		++this.updateCount;
	}
	,createTexture: function(width,height) {
		return new flambe.platform.html.CanvasTexture(this,width,height);
	}
	,__class__: flambe.platform.html.CanvasTextureRoot
});
flambe.platform.html.HtmlAssetPackLoader = function(platform,manifest) {
	flambe.platform.BasicAssetPackLoader.call(this,platform,manifest);
};
flambe.platform.html.HtmlAssetPackLoader.__name__ = true;
flambe.platform.html.HtmlAssetPackLoader.detectImageFormats = function(fn) {
	var formats = [flambe.asset.AssetFormat.PNG,flambe.asset.AssetFormat.JPG,flambe.asset.AssetFormat.GIF];
	var formatTests = 2;
	var checkRemaining = function() {
		--formatTests;
		if(formatTests == 0) fn(formats);
	};
	var webp = js.Browser.document.createElement("img");
	webp.onload = webp.onerror = function(_) {
		if(webp.width == 1) formats.unshift(flambe.asset.AssetFormat.WEBP);
		checkRemaining();
	};
	webp.src = "data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==";
	var jxr = js.Browser.document.createElement("img");
	jxr.onload = jxr.onerror = function(_) {
		if(jxr.width == 1) formats.unshift(flambe.asset.AssetFormat.JXR);
		checkRemaining();
	};
	jxr.src = "data:image/vnd.ms-photo;base64,SUm8AQgAAAAFAAG8AQAQAAAASgAAAIC8BAABAAAAAQAAAIG8BAABAAAAAQAAAMC8BAABAAAAWgAAAMG8BAABAAAAHwAAAAAAAAAkw91vA07+S7GFPXd2jckNV01QSE9UTwAZAYBxAAAAABP/gAAEb/8AAQAAAQAAAA==";
}
flambe.platform.html.HtmlAssetPackLoader.detectAudioFormats = function() {
	var audio = js.Browser.document.createElement("audio");
	if(audio == null || $bind(audio,audio.canPlayType) == null) {
		flambe.Log.warn("Audio is not supported at all in this browser!");
		return [];
	}
	var blacklist = new EReg("\\b(iPhone|iPod|iPad|Android|Windows Phone)\\b","");
	var userAgent = js.Browser.navigator.userAgent;
	if(!flambe.platform.html.WebAudioSound.get_supported() && blacklist.match(userAgent)) {
		flambe.Log.warn("HTML5 audio is blacklisted for this browser",["userAgent",userAgent]);
		return [];
	}
	var types = [{ format : flambe.asset.AssetFormat.M4A, mimeType : "audio/mp4; codecs=mp4a"},{ format : flambe.asset.AssetFormat.MP3, mimeType : "audio/mpeg"},{ format : flambe.asset.AssetFormat.OPUS, mimeType : "audio/ogg; codecs=opus"},{ format : flambe.asset.AssetFormat.OGG, mimeType : "audio/ogg; codecs=vorbis"},{ format : flambe.asset.AssetFormat.WAV, mimeType : "audio/wav"}];
	var result = [];
	var _g = 0;
	while(_g < types.length) {
		var type = types[_g];
		++_g;
		var canPlayType = "";
		try {
			canPlayType = audio.canPlayType(type.mimeType);
		} catch( _ ) {
		}
		if(canPlayType != "") result.push(type.format);
	}
	return result;
}
flambe.platform.html.HtmlAssetPackLoader.supportsBlob = function() {
	if(flambe.platform.html.HtmlAssetPackLoader._detectBlobSupport) {
		flambe.platform.html.HtmlAssetPackLoader._detectBlobSupport = false;
		if(new EReg("\\bSilk\\b","").match(js.Browser.navigator.userAgent)) return false;
		if(js.Browser.window.Blob == null) return false;
		var xhr = new XMLHttpRequest();
		xhr.open("GET",".",true);
		if(xhr.responseType != "") return false;
		xhr.responseType = "blob";
		if(xhr.responseType != "blob") return false;
		flambe.platform.html.HtmlAssetPackLoader._URL = flambe.platform.html.HtmlUtil.loadExtension("URL").value;
	}
	return flambe.platform.html.HtmlAssetPackLoader._URL != null && flambe.platform.html.HtmlAssetPackLoader._URL.createObjectURL != null;
}
flambe.platform.html.HtmlAssetPackLoader.__super__ = flambe.platform.BasicAssetPackLoader;
flambe.platform.html.HtmlAssetPackLoader.prototype = $extend(flambe.platform.BasicAssetPackLoader.prototype,{
	download: function(url,entry,responseType,onLoad) {
		var _g = this;
		var xhr = null;
		var start = null;
		var intervalId = 0;
		var hasInterval = false;
		var clearRetryInterval = function() {
			if(hasInterval) {
				hasInterval = false;
				js.Browser.window.clearInterval(intervalId);
			}
		};
		var retries = 3;
		var maybeRetry = function() {
			--retries;
			if(retries >= 0) {
				flambe.Log.warn("Retrying asset download",["url",entry.url]);
				start();
				return true;
			}
			return false;
		};
		start = function() {
			clearRetryInterval();
			if(xhr != null) xhr.abort();
			xhr = new XMLHttpRequest();
			xhr.open("GET",url,true);
			xhr.responseType = responseType;
			var lastProgress = 0.0;
			xhr.onprogress = function(event) {
				if(!hasInterval) {
					hasInterval = true;
					intervalId = js.Browser.window.setInterval(function() {
						if(xhr.readyState != 4 && flambe.platform.html.HtmlUtil.now() - lastProgress > 5000) {
							if(!maybeRetry()) {
								clearRetryInterval();
								_g.handleError(entry,"Download stalled");
							}
						}
					},1000);
				}
				lastProgress = flambe.platform.html.HtmlUtil.now();
				_g.handleProgress(entry,event.loaded);
			};
			xhr.onerror = function(_) {
				if(xhr.status != 0 || !maybeRetry()) {
					clearRetryInterval();
					_g.handleError(entry,"HTTP error " + xhr.status);
				}
			};
			xhr.onload = function(_) {
				var response = xhr.response;
				if(response == null) response = xhr.responseText;
				clearRetryInterval();
				onLoad(response);
			};
			xhr.send();
		};
		start();
	}
	,downloadText: function(url,entry,onLoad) {
		this.download(url,entry,"text",onLoad);
	}
	,downloadBlob: function(url,entry,onLoad) {
		this.download(url,entry,"blob",onLoad);
	}
	,downloadArrayBuffer: function(url,entry,onLoad) {
		this.download(url,entry,"arraybuffer",onLoad);
	}
	,getAssetFormats: function(fn) {
		var _g = this;
		if(flambe.platform.html.HtmlAssetPackLoader._supportedFormats == null) {
			flambe.platform.html.HtmlAssetPackLoader._supportedFormats = new flambe.util.Promise();
			flambe.platform.html.HtmlAssetPackLoader.detectImageFormats(function(imageFormats) {
				flambe.platform.html.HtmlAssetPackLoader._supportedFormats.set_result(_g._platform.getRenderer().getCompressedTextureFormats().concat(imageFormats).concat(flambe.platform.html.HtmlAssetPackLoader.detectAudioFormats()).concat([flambe.asset.AssetFormat.Data]));
			});
		}
		flambe.platform.html.HtmlAssetPackLoader._supportedFormats.get(fn);
	}
	,loadEntry: function(url,entry) {
		var _g = this;
		switch( (entry.format)[1] ) {
		case 0:
		case 1:
		case 2:
		case 3:
		case 4:
			var image = js.Browser.document.createElement("img");
			var events = new flambe.platform.EventGroup();
			events.addDisposingListener(image,"load",function(_) {
				if(image.width > 1024 || image.height > 1024) flambe.Log.warn("Images larger than 1024px on a side will prevent GPU acceleration" + " on some platforms (iOS)",["url",url,"width",image.width,"height",image.height]);
				if(flambe.platform.html.HtmlAssetPackLoader.supportsBlob()) flambe.platform.html.HtmlAssetPackLoader._URL.revokeObjectURL(image.src);
				var texture = _g._platform.getRenderer().createTextureFromImage(image);
				if(texture != null) _g.handleLoad(entry,texture); else _g.handleTextureError(entry);
			});
			events.addDisposingListener(image,"error",function(_) {
				_g.handleError(entry,"Failed to load image");
			});
			if(flambe.platform.html.HtmlAssetPackLoader.supportsBlob()) this.downloadBlob(url,entry,function(blob) {
				image.src = flambe.platform.html.HtmlAssetPackLoader._URL.createObjectURL(blob);
			}); else image.src = url;
			break;
		case 5:
		case 6:
		case 7:
			this.downloadArrayBuffer(url,entry,function(buffer) {
				var texture = _g._platform.getRenderer().createCompressedTexture(entry.format,null);
				if(texture != null) _g.handleLoad(entry,texture); else _g.handleTextureError(entry);
			});
			break;
		case 8:
		case 9:
		case 10:
		case 11:
		case 12:
			if(flambe.platform.html.WebAudioSound.get_supported()) this.downloadArrayBuffer(url,entry,function(buffer) {
				flambe.platform.html.WebAudioSound.ctx.decodeAudioData(buffer,function(decoded) {
					_g.handleLoad(entry,new flambe.platform.html.WebAudioSound(decoded));
				},function() {
					flambe.Log.warn("Couldn't decode Web Audio, ignoring this asset",["url",url]);
					_g.handleLoad(entry,flambe.platform.DummySound.getInstance());
				});
			}); else {
				var audio = js.Browser.document.createElement("audio");
				audio.preload = "auto";
				var ref = ++flambe.platform.html.HtmlAssetPackLoader._mediaRefCount;
				if(flambe.platform.html.HtmlAssetPackLoader._mediaElements == null) flambe.platform.html.HtmlAssetPackLoader._mediaElements = new haxe.ds.IntMap();
				flambe.platform.html.HtmlAssetPackLoader._mediaElements.set(ref,audio);
				var events = new flambe.platform.EventGroup();
				events.addDisposingListener(audio,"canplaythrough",function(_) {
					flambe.platform.html.HtmlAssetPackLoader._mediaElements.remove(ref);
					_g.handleLoad(entry,new flambe.platform.html.HtmlSound(audio));
				});
				events.addDisposingListener(audio,"error",function(_) {
					flambe.platform.html.HtmlAssetPackLoader._mediaElements.remove(ref);
					var code = audio.error.code;
					if(code == 3 || code == 4) {
						flambe.Log.warn("Couldn't decode HTML5 audio, ignoring this asset",["url",url,"code",code]);
						_g.handleLoad(entry,flambe.platform.DummySound.getInstance());
					} else _g.handleError(entry,"Failed to load audio: " + audio.error.code);
				});
				events.addListener(audio,"progress",function(_) {
					if(audio.buffered.length > 0 && audio.duration > 0) {
						var progress = audio.buffered.end(0) / audio.duration;
						_g.handleProgress(entry,Std["int"](progress * entry.bytes));
					}
				});
				audio.src = url;
				audio.load();
			}
			break;
		case 13:
			this.downloadText(url,entry,function(text) {
				_g.handleLoad(entry,new flambe.platform.BasicFile(text));
			});
			break;
		}
	}
	,__class__: flambe.platform.html.HtmlAssetPackLoader
});
flambe.platform.html.HtmlCatapultClient = function() {
	var _g = this;
	flambe.platform.CatapultClient.call(this);
	this._socket = new WebSocket("ws://" + js.Browser.location.host);
	this._socket.onerror = function(event) {
		_g.onError("unknown");
	};
	this._socket.onopen = function(event) {
		flambe.Log.info("Catapult connected");
	};
	this._socket.onmessage = function(event) {
		_g.onMessage(event.data);
	};
};
flambe.platform.html.HtmlCatapultClient.__name__ = true;
flambe.platform.html.HtmlCatapultClient.canUse = function() {
	return Reflect.hasField(js.Browser.window,"WebSocket");
}
flambe.platform.html.HtmlCatapultClient.__super__ = flambe.platform.CatapultClient;
flambe.platform.html.HtmlCatapultClient.prototype = $extend(flambe.platform.CatapultClient.prototype,{
	onRestart: function() {
		js.Browser.window.top.location.reload();
	}
	,__class__: flambe.platform.html.HtmlCatapultClient
});
flambe.util.LogHandler = function() { }
flambe.util.LogHandler.__name__ = true;
flambe.util.LogHandler.prototype = {
	__class__: flambe.util.LogHandler
}
flambe.platform.html.HtmlLogHandler = function(tag) {
	this._tagPrefix = tag + ": ";
};
flambe.platform.html.HtmlLogHandler.__name__ = true;
flambe.platform.html.HtmlLogHandler.__interfaces__ = [flambe.util.LogHandler];
flambe.platform.html.HtmlLogHandler.isSupported = function() {
	return typeof console == "object" && console.info != null;
}
flambe.platform.html.HtmlLogHandler.prototype = {
	log: function(level,message) {
		message = this._tagPrefix + message;
		switch( (level)[1] ) {
		case 0:
			console.info(message);
			break;
		case 1:
			console.warn(message);
			break;
		case 2:
			console.error(message);
			break;
		}
	}
	,__class__: flambe.platform.html.HtmlLogHandler
}
flambe.platform.html.HtmlMouse = function(pointer,canvas) {
	flambe.platform.BasicMouse.call(this,pointer);
	this._canvas = canvas;
};
flambe.platform.html.HtmlMouse.__name__ = true;
flambe.platform.html.HtmlMouse.__super__ = flambe.platform.BasicMouse;
flambe.platform.html.HtmlMouse.prototype = $extend(flambe.platform.BasicMouse.prototype,{
	__class__: flambe.platform.html.HtmlMouse
});
flambe.platform.html.HtmlSound = function(audioElement) {
	flambe.platform.BasicAsset.call(this);
	this.audioElement = audioElement;
};
flambe.platform.html.HtmlSound.__name__ = true;
flambe.platform.html.HtmlSound.__interfaces__ = [flambe.sound.Sound];
flambe.platform.html.HtmlSound.__super__ = flambe.platform.BasicAsset;
flambe.platform.html.HtmlSound.prototype = $extend(flambe.platform.BasicAsset.prototype,{
	copyFrom: function(that) {
		this.audioElement = that.audioElement;
	}
	,__class__: flambe.platform.html.HtmlSound
});
flambe.subsystem.StageSystem = function() { }
flambe.subsystem.StageSystem.__name__ = true;
flambe.subsystem.StageSystem.prototype = {
	__class__: flambe.subsystem.StageSystem
}
flambe.platform.html.HtmlStage = function(canvas) {
	var _g = this;
	this._canvas = canvas;
	this.resize = new flambe.util.Signal0();
	this.scaleFactor = flambe.platform.html.HtmlStage.computeScaleFactor();
	if(this.scaleFactor != 1) {
		flambe.Log.info("Reversing device DPI scaling",["scaleFactor",this.scaleFactor]);
		flambe.platform.html.HtmlUtil.setVendorStyle(this._canvas,"transform-origin","top left");
		flambe.platform.html.HtmlUtil.setVendorStyle(this._canvas,"transform","scale(" + 1 / this.scaleFactor + ")");
	}
	if(flambe.platform.html.HtmlUtil.SHOULD_HIDE_MOBILE_BROWSER) {
		js.Browser.window.addEventListener("orientationchange",function(_) {
			flambe.platform.html.HtmlUtil.callLater($bind(_g,_g.hideMobileBrowser),200);
		},false);
		this.hideMobileBrowser();
	}
	js.Browser.window.addEventListener("resize",$bind(this,this.onWindowResize),false);
	this.onWindowResize(null);
	this.orientation = new flambe.util.Value(null);
	if(js.Browser.window.orientation != null) {
		js.Browser.window.addEventListener("orientationchange",$bind(this,this.onOrientationChange),false);
		this.onOrientationChange(null);
	}
	this.fullscreen = new flambe.util.Value(false);
	flambe.platform.html.HtmlUtil.addVendorListener(js.Browser.document,"fullscreenchange",function(_) {
		_g.updateFullscreen();
	},false);
	flambe.platform.html.HtmlUtil.addVendorListener(js.Browser.document,"fullscreenerror",function(_) {
		flambe.Log.warn("Error when requesting fullscreen");
	},false);
	this.updateFullscreen();
};
flambe.platform.html.HtmlStage.__name__ = true;
flambe.platform.html.HtmlStage.__interfaces__ = [flambe.subsystem.StageSystem];
flambe.platform.html.HtmlStage.computeScaleFactor = function() {
	var devicePixelRatio = js.Browser.window.devicePixelRatio;
	if(devicePixelRatio == null) devicePixelRatio = 1;
	var canvas = js.Browser.document.createElement("canvas");
	var ctx = canvas.getContext("2d");
	var backingStorePixelRatio = flambe.platform.html.HtmlUtil.loadExtension("backingStorePixelRatio",ctx).value;
	if(backingStorePixelRatio == null) backingStorePixelRatio = 1;
	var scale = devicePixelRatio / backingStorePixelRatio;
	var screenWidth = js.Browser.window.screen.width;
	var screenHeight = js.Browser.window.screen.height;
	if(scale * screenWidth > 1136 || scale * screenHeight > 1136) return 1;
	return scale;
}
flambe.platform.html.HtmlStage.prototype = {
	updateFullscreen: function() {
		var state = flambe.platform.html.HtmlUtil.loadFirstExtension(["fullscreen","fullScreen","isFullScreen"],js.Browser.document).value;
		this.fullscreen.set__(state == true);
	}
	,onOrientationChange: function(_) {
		var value = flambe.platform.html.HtmlUtil.orientation(js.Browser.window.orientation);
		this.orientation.set__(value);
	}
	,hideMobileBrowser: function() {
		var _g = this;
		var mobileAddressBar = 100;
		var htmlStyle = js.Browser.document.documentElement.style;
		htmlStyle.height = js.Browser.window.innerHeight + mobileAddressBar + "px";
		htmlStyle.width = js.Browser.window.innerWidth + "px";
		htmlStyle.overflow = "visible";
		flambe.platform.html.HtmlUtil.callLater(function() {
			flambe.platform.html.HtmlUtil.hideMobileBrowser();
			flambe.platform.html.HtmlUtil.callLater(function() {
				htmlStyle.height = js.Browser.window.innerHeight + "px";
				_g.onWindowResize(null);
			},100);
		});
	}
	,resizeCanvas: function(width,height) {
		var scaledWidth = this.scaleFactor * width;
		var scaledHeight = this.scaleFactor * height;
		if(this._canvas.width == scaledWidth && this._canvas.height == scaledHeight) return false;
		this._canvas.width = Std["int"](scaledWidth);
		this._canvas.height = Std["int"](scaledHeight);
		this.resize.emit();
		return true;
	}
	,onWindowResize: function(_) {
		var container = this._canvas.parentElement;
		var rect = container.getBoundingClientRect();
		this.resizeCanvas(rect.width,rect.height);
	}
	,get_height: function() {
		return this._canvas.height;
	}
	,get_width: function() {
		return this._canvas.width;
	}
	,__class__: flambe.platform.html.HtmlStage
}
flambe.platform.html.HtmlUtil = function() { }
flambe.platform.html.HtmlUtil.__name__ = true;
flambe.platform.html.HtmlUtil.callLater = function(func,delay) {
	if(delay == null) delay = 0;
	js.Browser.window.setTimeout(func,delay);
}
flambe.platform.html.HtmlUtil.hideMobileBrowser = function() {
	js.Browser.window.scrollTo(1,0);
}
flambe.platform.html.HtmlUtil.loadExtension = function(name,obj) {
	if(obj == null) obj = js.Browser.window;
	var extension = Reflect.field(obj,name);
	if(extension != null) return { prefix : "", field : name, value : extension};
	var capitalized = name.charAt(0).toUpperCase() + HxOverrides.substr(name,1,null);
	var _g = 0, _g1 = flambe.platform.html.HtmlUtil.VENDOR_PREFIXES;
	while(_g < _g1.length) {
		var prefix = _g1[_g];
		++_g;
		var field = prefix + capitalized;
		var extension1 = Reflect.field(obj,field);
		if(extension1 != null) return { prefix : prefix, field : field, value : extension1};
	}
	return { prefix : null, field : null, value : null};
}
flambe.platform.html.HtmlUtil.loadFirstExtension = function(names,obj) {
	var _g = 0;
	while(_g < names.length) {
		var name = names[_g];
		++_g;
		var extension = flambe.platform.html.HtmlUtil.loadExtension(name,obj);
		if(extension.field != null) return extension;
	}
	return { prefix : null, field : null, value : null};
}
flambe.platform.html.HtmlUtil.polyfill = function(name,obj) {
	if(obj == null) obj = js.Browser.window;
	var value = flambe.platform.html.HtmlUtil.loadExtension(name,obj).value;
	if(value == null) return false;
	Reflect.setField(obj,name,value);
	return true;
}
flambe.platform.html.HtmlUtil.setVendorStyle = function(element,name,value) {
	var style = element.style;
	var _g = 0, _g1 = flambe.platform.html.HtmlUtil.VENDOR_PREFIXES;
	while(_g < _g1.length) {
		var prefix = _g1[_g];
		++_g;
		style.setProperty("-" + prefix + "-" + name,value);
	}
	style.setProperty(name,value);
}
flambe.platform.html.HtmlUtil.addVendorListener = function(dispatcher,type,listener,useCapture) {
	var _g = 0, _g1 = flambe.platform.html.HtmlUtil.VENDOR_PREFIXES;
	while(_g < _g1.length) {
		var prefix = _g1[_g];
		++_g;
		dispatcher.addEventListener(prefix + type,listener,useCapture);
	}
	dispatcher.addEventListener(type,listener,useCapture);
}
flambe.platform.html.HtmlUtil.orientation = function(angle) {
	switch(angle) {
	case -90:case 90:
		return flambe.display.Orientation.Landscape;
	default:
		return flambe.display.Orientation.Portrait;
	}
}
flambe.platform.html.HtmlUtil.now = function() {
	return Date.now();
}
flambe.platform.html.HtmlUtil.createEmptyCanvas = function(width,height) {
	var canvas = js.Browser.document.createElement("canvas");
	canvas.width = width;
	canvas.height = height;
	return canvas;
}
flambe.platform.html.HtmlUtil.createCanvas = function(source) {
	var canvas = flambe.platform.html.HtmlUtil.createEmptyCanvas(source.width,source.height);
	var ctx = canvas.getContext("2d");
	ctx.save();
	ctx.globalCompositeOperation = "copy";
	ctx.drawImage(source,0,0);
	ctx.restore();
	return canvas;
}
flambe.platform.html.HtmlUtil.detectSlowDriver = function(gl) {
	var windows = js.Browser.navigator.platform.indexOf("Win") >= 0;
	if(windows) {
		var chrome = js.Browser.window.chrome != null;
		if(chrome) {
			var _g = 0, _g1 = gl.getSupportedExtensions();
			while(_g < _g1.length) {
				var ext = _g1[_g];
				++_g;
				if(ext.indexOf("WEBGL_compressed_texture") >= 0) return false;
			}
			return true;
		}
	}
	return false;
}
flambe.platform.html.HtmlUtil.fixAndroidMath = function() {
	if(js.Browser.navigator.userAgent.indexOf("Linux; U; Android 4") >= 0) {
		flambe.Log.warn("Monkey patching around Android sin/cos bug");
		var sin = Math.sin, cos = Math.cos;
		Math.sin = function(x) {
			return x == 0?0:sin(x);
		};
		Math.cos = function(x) {
			return x == 0?1:cos(x);
		};
	}
}
flambe.platform.html.WebAudioSound = function(buffer) {
	flambe.platform.BasicAsset.call(this);
	this.buffer = buffer;
};
flambe.platform.html.WebAudioSound.__name__ = true;
flambe.platform.html.WebAudioSound.__interfaces__ = [flambe.sound.Sound];
flambe.platform.html.WebAudioSound.get_supported = function() {
	if(flambe.platform.html.WebAudioSound._detectSupport) {
		flambe.platform.html.WebAudioSound._detectSupport = false;
		var AudioContext = flambe.platform.html.HtmlUtil.loadExtension("AudioContext").value;
		if(AudioContext != null) {
			flambe.platform.html.WebAudioSound.ctx = new AudioContext();
			flambe.platform.html.WebAudioSound.gain = flambe.platform.html.WebAudioSound.createGain();
			flambe.platform.html.WebAudioSound.gain.connect(flambe.platform.html.WebAudioSound.ctx.destination);
			flambe.System.volume.watch(function(volume,_) {
				flambe.platform.html.WebAudioSound.gain.gain.value = volume;
			});
		}
	}
	return flambe.platform.html.WebAudioSound.ctx != null;
}
flambe.platform.html.WebAudioSound.createGain = function() {
	return flambe.platform.html.WebAudioSound.ctx.createGain != null?flambe.platform.html.WebAudioSound.ctx.createGain():flambe.platform.html.WebAudioSound.ctx.createGainNode();
}
flambe.platform.html.WebAudioSound.__super__ = flambe.platform.BasicAsset;
flambe.platform.html.WebAudioSound.prototype = $extend(flambe.platform.BasicAsset.prototype,{
	copyFrom: function(that) {
		this.buffer = that.buffer;
	}
	,__class__: flambe.platform.html.WebAudioSound
});
flambe.platform.html.WebGLBatcher = function(gl) {
	this._backbufferHeight = 0;
	this._backbufferWidth = 0;
	this._dataOffset = 0;
	this._maxQuads = 0;
	this._quads = 0;
	this._pendingSetScissor = false;
	this._currentRenderTarget = null;
	this._currentTexture = null;
	this._currentShader = null;
	this._currentBlendMode = null;
	this._lastScissor = null;
	this._lastTexture = null;
	this._lastShader = null;
	this._lastRenderTarget = null;
	this._lastBlendMode = null;
	this._gl = gl;
	gl.clearColor(0,0,0,0);
	gl.enable(3042);
	gl.pixelStorei(37441,1);
	this._vertexBuffer = gl.createBuffer();
	gl.bindBuffer(34962,this._vertexBuffer);
	this._quadIndexBuffer = gl.createBuffer();
	gl.bindBuffer(34963,this._quadIndexBuffer);
	this._drawTextureShader = new flambe.platform.shader.DrawTextureGL(gl);
	this._drawPatternShader = new flambe.platform.shader.DrawPatternGL(gl);
	this._fillRectShader = new flambe.platform.shader.FillRectGL(gl);
	this.resize(16);
};
flambe.platform.html.WebGLBatcher.__name__ = true;
flambe.platform.html.WebGLBatcher.prototype = {
	bindRenderTarget: function(texture) {
		if(texture != null) {
			this._gl.bindFramebuffer(36160,texture.framebuffer);
			this._gl.viewport(0,0,texture.width,texture.height);
		} else {
			this._gl.bindFramebuffer(36160,null);
			this._gl.viewport(0,0,this._backbufferWidth,this._backbufferHeight);
		}
		this._currentRenderTarget = texture;
		this._lastRenderTarget = texture;
	}
	,resize: function(maxQuads) {
		this.flush();
		if(maxQuads > 1024) return;
		this._maxQuads = maxQuads;
		this.data = new Float32Array(maxQuads * 4 * 6);
		this._gl.bufferData(34962,this.data.length * 4,35040);
		var indices = new Uint16Array(6 * maxQuads);
		var _g = 0;
		while(_g < maxQuads) {
			var ii = _g++;
			indices[ii * 6 + 0] = ii * 4 + 0;
			indices[ii * 6 + 1] = ii * 4 + 1;
			indices[ii * 6 + 2] = ii * 4 + 2;
			indices[ii * 6 + 3] = ii * 4 + 2;
			indices[ii * 6 + 4] = ii * 4 + 3;
			indices[ii * 6 + 5] = ii * 4 + 0;
		}
		this._gl.bufferData(34963,indices,35044);
	}
	,flush: function() {
		if(this._quads < 1) return;
		if(this._lastRenderTarget != this._currentRenderTarget) this.bindRenderTarget(this._lastRenderTarget);
		if(this._lastBlendMode != this._currentBlendMode) {
			var _g = this;
			switch( (_g._lastBlendMode)[1] ) {
			case 0:
				this._gl.blendFunc(1,771);
				break;
			case 1:
				this._gl.blendFunc(1,1);
				break;
			case 2:
				this._gl.blendFunc(0,770);
				break;
			case 3:
				this._gl.blendFunc(1,0);
				break;
			}
			this._currentBlendMode = this._lastBlendMode;
		}
		if(this._pendingSetScissor) {
			if(this._lastScissor != null) {
				this._gl.enable(3089);
				this._gl.scissor(Std["int"](this._lastScissor.x),Std["int"](this._lastScissor.y),Std["int"](this._lastScissor.width),Std["int"](this._lastScissor.height));
			} else this._gl.disable(3089);
			this._pendingSetScissor = false;
		}
		if(this._lastTexture != this._currentTexture) {
			this._gl.bindTexture(3553,this._lastTexture.root.nativeTexture);
			this._currentTexture = this._lastTexture;
		}
		if(this._lastShader != this._currentShader) {
			this._lastShader.useProgram();
			this._lastShader.prepare();
			this._currentShader = this._lastShader;
		}
		if(this._lastShader == this._drawPatternShader) {
			var texture = this._lastTexture;
			var root = texture.root;
			this._drawPatternShader.setRegion(texture.rootX / root.width,texture.rootY / root.height,texture.get_width() / root.width,texture.get_height() / root.height);
		}
		this._gl.bufferData(34962,this.data.subarray(0,this._dataOffset),35040);
		this._gl.drawElements(4,6 * this._quads,5123,0);
		this._quads = 0;
		this._dataOffset = 0;
	}
	,prepareQuad: function(elementsPerVertex,renderTarget,blendMode,scissor,shader) {
		if(renderTarget != this._lastRenderTarget) {
			this.flush();
			this._lastRenderTarget = renderTarget;
		}
		if(blendMode != this._lastBlendMode) {
			this.flush();
			this._lastBlendMode = blendMode;
		}
		if(shader != this._lastShader) {
			this.flush();
			this._lastShader = shader;
		}
		if(scissor != null || this._lastScissor != null) {
			if(scissor == null || this._lastScissor == null || !this._lastScissor.equals(scissor)) {
				this.flush();
				this._lastScissor = scissor != null?scissor.clone(this._lastScissor):null;
				this._pendingSetScissor = true;
			}
		}
		if(this._quads >= this._maxQuads) this.resize(2 * this._maxQuads);
		++this._quads;
		var offset = this._dataOffset;
		this._dataOffset += 4 * elementsPerVertex;
		return offset;
	}
	,prepareFillRect: function(renderTarget,blendMode,scissor) {
		return this.prepareQuad(6,renderTarget,blendMode,scissor,this._fillRectShader);
	}
	,prepareDrawTexture: function(renderTarget,blendMode,scissor,texture) {
		if(texture != this._lastTexture) {
			this.flush();
			this._lastTexture = texture;
		}
		return this.prepareQuad(5,renderTarget,blendMode,scissor,this._drawTextureShader);
	}
	,bindTexture: function(texture) {
		this.flush();
		this._lastTexture = null;
		this._currentTexture = null;
		this._gl.bindTexture(3553,texture);
	}
	,didRender: function() {
		this.flush();
	}
	,willRender: function() {
	}
	,resizeBackbuffer: function(width,height) {
		this._gl.viewport(0,0,width,height);
		this._backbufferWidth = width;
		this._backbufferHeight = height;
	}
	,__class__: flambe.platform.html.WebGLBatcher
}
flambe.platform.html.WebGLGraphics = function(batcher,renderTarget) {
	this._stateList = null;
	this._inverseProjection = null;
	if(flambe.platform.html.WebGLGraphics._scratchQuadArray == null) flambe.platform.html.WebGLGraphics._scratchQuadArray = new Float32Array(8);
	this._batcher = batcher;
	this._renderTarget = renderTarget;
};
flambe.platform.html.WebGLGraphics.__name__ = true;
flambe.platform.html.WebGLGraphics.__interfaces__ = [flambe.platform.InternalGraphics];
flambe.platform.html.WebGLGraphics.prototype = {
	transformQuad: function(x,y,width,height) {
		var x2 = x + width;
		var y2 = y + height;
		var pos = flambe.platform.html.WebGLGraphics._scratchQuadArray;
		pos[0] = x;
		pos[1] = y;
		pos[2] = x2;
		pos[3] = y;
		pos[4] = x2;
		pos[5] = y2;
		pos[6] = x;
		pos[7] = y2;
		this.getTopState().matrix.transformArray(pos,8,pos);
		return pos;
	}
	,getTopState: function() {
		return this._stateList;
	}
	,onResize: function(width,height) {
		this._stateList = new flambe.platform.html._WebGLGraphics.DrawingState();
		var flip = this._renderTarget != null?-1:1;
		this._stateList.matrix.set(2 / width,0,0,flip * -2 / height,-1,flip);
		this._inverseProjection = new flambe.math.Matrix();
		this._inverseProjection.set(2 / width,0,0,2 / height,-1,-1);
		this._inverseProjection.invert();
	}
	,didRender: function() {
		this._batcher.didRender();
	}
	,willRender: function() {
		this._batcher.willRender();
	}
	,applyScissor: function(x,y,width,height) {
		var state = this.getTopState();
		var rect = flambe.platform.html.WebGLGraphics._scratchQuadArray;
		rect[0] = x;
		rect[1] = y;
		rect[2] = x + width;
		rect[3] = y + height;
		state.matrix.transformArray(rect,4,rect);
		this._inverseProjection.transformArray(rect,4,rect);
		x = rect[0];
		y = rect[1];
		width = rect[2] - x;
		height = rect[3] - y;
		if(width < 0) {
			x += width;
			width = -width;
		}
		if(height < 0) {
			y += height;
			height = -height;
		}
		state.applyScissor(x,y,width,height);
	}
	,setBlendMode: function(blendMode) {
		this.getTopState().blendMode = blendMode;
	}
	,multiplyAlpha: function(factor) {
		this.getTopState().alpha *= factor;
	}
	,fillRect: function(color,x,y,width,height) {
		var state = this.getTopState();
		var pos = this.transformQuad(x,y,width,height);
		var r = (color & 16711680) / 16711680;
		var g = (color & 65280) / 65280;
		var b = (color & 255) / 255;
		var a = state.alpha;
		var offset = this._batcher.prepareFillRect(this._renderTarget,state.blendMode,state.scissor);
		var data = this._batcher.data;
		data[offset] = pos[0];
		data[++offset] = pos[1];
		data[++offset] = r;
		data[++offset] = g;
		data[++offset] = b;
		data[++offset] = a;
		data[++offset] = pos[2];
		data[++offset] = pos[3];
		data[++offset] = r;
		data[++offset] = g;
		data[++offset] = b;
		data[++offset] = a;
		data[++offset] = pos[4];
		data[++offset] = pos[5];
		data[++offset] = r;
		data[++offset] = g;
		data[++offset] = b;
		data[++offset] = a;
		data[++offset] = pos[6];
		data[++offset] = pos[7];
		data[++offset] = r;
		data[++offset] = g;
		data[++offset] = b;
		data[++offset] = a;
	}
	,drawSubTexture: function(texture,destX,destY,sourceX,sourceY,sourceW,sourceH) {
		var state = this.getTopState();
		var texture1 = texture;
		var root = texture1.root;
		root.assertNotDisposed();
		var pos = this.transformQuad(destX,destY,sourceW,sourceH);
		var rootWidth = root.width;
		var rootHeight = root.height;
		var u1 = (texture1.rootX + sourceX) / rootWidth;
		var v1 = (texture1.rootY + sourceY) / rootHeight;
		var u2 = u1 + sourceW / rootWidth;
		var v2 = v1 + sourceH / rootHeight;
		var alpha = state.alpha;
		var offset = this._batcher.prepareDrawTexture(this._renderTarget,state.blendMode,state.scissor,texture1);
		var data = this._batcher.data;
		data[offset] = pos[0];
		data[++offset] = pos[1];
		data[++offset] = u1;
		data[++offset] = v1;
		data[++offset] = alpha;
		data[++offset] = pos[2];
		data[++offset] = pos[3];
		data[++offset] = u2;
		data[++offset] = v1;
		data[++offset] = alpha;
		data[++offset] = pos[4];
		data[++offset] = pos[5];
		data[++offset] = u2;
		data[++offset] = v2;
		data[++offset] = alpha;
		data[++offset] = pos[6];
		data[++offset] = pos[7];
		data[++offset] = u1;
		data[++offset] = v2;
		data[++offset] = alpha;
	}
	,drawTexture: function(texture,x,y) {
		this.drawSubTexture(texture,x,y,0,0,texture.get_width(),texture.get_height());
	}
	,restore: function() {
		flambe.util.Assert.that(this._stateList.prev != null,"Can't restore without a previous save");
		this._stateList = this._stateList.prev;
	}
	,transform: function(m00,m10,m01,m11,m02,m12) {
		var state = this.getTopState();
		flambe.platform.html.WebGLGraphics._scratchMatrix.set(m00,m10,m01,m11,m02,m12);
		flambe.math.Matrix.multiply(state.matrix,flambe.platform.html.WebGLGraphics._scratchMatrix,state.matrix);
	}
	,save: function() {
		var current = this._stateList;
		var state = this._stateList.next;
		if(state == null) {
			state = new flambe.platform.html._WebGLGraphics.DrawingState();
			state.prev = current;
			current.next = state;
		}
		current.matrix.clone(state.matrix);
		state.alpha = current.alpha;
		state.blendMode = current.blendMode;
		state.scissor = current.scissor != null?current.scissor.clone(state.scissor):null;
		this._stateList = state;
	}
	,__class__: flambe.platform.html.WebGLGraphics
}
flambe.platform.html._WebGLGraphics = {}
flambe.platform.html._WebGLGraphics.DrawingState = function() {
	this.next = null;
	this.prev = null;
	this.scissor = null;
	this.matrix = new flambe.math.Matrix();
	this.alpha = 1;
	this.blendMode = flambe.display.BlendMode.Normal;
};
flambe.platform.html._WebGLGraphics.DrawingState.__name__ = true;
flambe.platform.html._WebGLGraphics.DrawingState.prototype = {
	applyScissor: function(x,y,width,height) {
		if(this.scissor != null) {
			var x1 = flambe.math.FMath.max(this.scissor.x,x);
			var y1 = flambe.math.FMath.max(this.scissor.y,y);
			var x2 = flambe.math.FMath.min(this.scissor.x + this.scissor.width,x + width);
			var y2 = flambe.math.FMath.min(this.scissor.y + this.scissor.height,y + height);
			x = x1;
			y = y1;
			width = x2 - x1;
			height = y2 - y1;
		} else this.scissor = new flambe.math.Rectangle();
		this.scissor.set(Math.round(x),Math.round(y),Math.round(width),Math.round(height));
	}
	,__class__: flambe.platform.html._WebGLGraphics.DrawingState
}
flambe.platform.html.WebGLRenderer = function(stage,gl) {
	var _g = this;
	this._hasGPU = new flambe.util.Value(true);
	this.gl = gl;
	gl.canvas.addEventListener("webglcontextlost",function(event) {
		event.preventDefault();
		flambe.Log.warn("WebGL context lost");
		_g._hasGPU.set__(false);
	},false);
	gl.canvas.addEventListener("webglcontextrestore",function(event) {
		flambe.Log.warn("WebGL context restored");
		_g.init();
		_g._hasGPU.set__(true);
	},false);
	stage.resize.connect($bind(this,this.onResize));
	this.init();
};
flambe.platform.html.WebGLRenderer.__name__ = true;
flambe.platform.html.WebGLRenderer.__interfaces__ = [flambe.platform.InternalRenderer];
flambe.platform.html.WebGLRenderer.prototype = {
	init: function() {
		this.batcher = new flambe.platform.html.WebGLBatcher(this.gl);
		this.graphics = new flambe.platform.html.WebGLGraphics(this.batcher,null);
		this.onResize();
	}
	,onResize: function() {
		var width = this.gl.canvas.width, height = this.gl.canvas.height;
		this.batcher.resizeBackbuffer(width,height);
		this.graphics.onResize(width,height);
	}
	,didRender: function() {
		this.graphics.didRender();
	}
	,willRender: function() {
		this.graphics.willRender();
	}
	,createCompressedTexture: function(format,data) {
		if(this.gl.isContextLost()) return null;
		flambe.util.Assert.fail();
		return null;
	}
	,getCompressedTextureFormats: function() {
		return [];
	}
	,createTextureFromImage: function(image) {
		if(this.gl.isContextLost()) return null;
		var root = new flambe.platform.html.WebGLTextureRoot(this,image.width,image.height);
		root.uploadImageData(image);
		return root.createTexture(image.width,image.height);
	}
	,get_type: function() {
		return flambe.subsystem.RendererType.WebGL;
	}
	,__class__: flambe.platform.html.WebGLRenderer
}
flambe.platform.html.WebGLTexture = function(root,width,height) {
	flambe.platform.BasicTexture.call(this,root,width,height);
};
flambe.platform.html.WebGLTexture.__name__ = true;
flambe.platform.html.WebGLTexture.__super__ = flambe.platform.BasicTexture;
flambe.platform.html.WebGLTexture.prototype = $extend(flambe.platform.BasicTexture.prototype,{
	__class__: flambe.platform.html.WebGLTexture
});
flambe.platform.html.WebGLTextureRoot = function(renderer,width,height) {
	this._graphics = null;
	this.framebuffer = null;
	flambe.platform.BasicAsset.call(this);
	this._renderer = renderer;
	this.width = flambe.math.FMath.max(2,flambe.platform.MathUtil.nextPowerOfTwo(width));
	this.height = flambe.math.FMath.max(2,flambe.platform.MathUtil.nextPowerOfTwo(height));
	var gl = renderer.gl;
	this.nativeTexture = gl.createTexture();
	renderer.batcher.bindTexture(this.nativeTexture);
	gl.texParameteri(3553,10242,33071);
	gl.texParameteri(3553,10243,33071);
	gl.texParameteri(3553,10240,9729);
	gl.texParameteri(3553,10241,9728);
};
flambe.platform.html.WebGLTextureRoot.__name__ = true;
flambe.platform.html.WebGLTextureRoot.__interfaces__ = [flambe.platform.TextureRoot];
flambe.platform.html.WebGLTextureRoot.drawBorder = function(canvas,width,height) {
	var ctx = canvas.getContext("2d");
	ctx.drawImage(canvas,width - 1,0,1,height,width,0,1,height);
	ctx.drawImage(canvas,0,height - 1,width,1,0,height,width,1);
}
flambe.platform.html.WebGLTextureRoot.__super__ = flambe.platform.BasicAsset;
flambe.platform.html.WebGLTextureRoot.prototype = $extend(flambe.platform.BasicAsset.prototype,{
	copyFrom: function(that) {
		this.nativeTexture = that.nativeTexture;
		this.framebuffer = that.framebuffer;
		this.width = that.width;
		this.height = that.height;
		this._graphics = that._graphics;
	}
	,uploadImageData: function(image) {
		this.assertNotDisposed();
		if(this.width != image.width || this.height != image.height) {
			var resized = flambe.platform.html.HtmlUtil.createEmptyCanvas(this.width,this.height);
			resized.getContext("2d").drawImage(image,0,0);
			flambe.platform.html.WebGLTextureRoot.drawBorder(resized,image.width,image.height);
			image = resized;
		}
		this._renderer.batcher.bindTexture(this.nativeTexture);
		var gl = this._renderer.gl;
		gl.texImage2D(3553,0,6408,6408,5121,image);
	}
	,createTexture: function(width,height) {
		return new flambe.platform.html.WebGLTexture(this,width,height);
	}
	,__class__: flambe.platform.html.WebGLTextureRoot
});
flambe.platform.shader = {}
flambe.platform.shader.ShaderGL = function(gl,vertSource,fragSource) {
	fragSource = ["#ifdef GL_ES","precision mediump float;","#endif"].join("\n") + "\n" + fragSource;
	this._gl = gl;
	this._program = gl.createProgram();
	gl.attachShader(this._program,flambe.platform.shader.ShaderGL.createShader(gl,35633,vertSource));
	gl.attachShader(this._program,flambe.platform.shader.ShaderGL.createShader(gl,35632,fragSource));
	gl.linkProgram(this._program);
	gl.useProgram(this._program);
	if(!gl.getProgramParameter(this._program,35714)) flambe.Log.error("Error linking shader program",["log",gl.getProgramInfoLog(this._program)]);
};
flambe.platform.shader.ShaderGL.__name__ = true;
flambe.platform.shader.ShaderGL.createShader = function(gl,type,source) {
	var shader = gl.createShader(type);
	gl.shaderSource(shader,source);
	gl.compileShader(shader);
	if(!gl.getShaderParameter(shader,35713)) {
		var typeName = type == 35633?"vertex":"fragment";
		flambe.Log.error("Error compiling " + typeName + " shader",["log",gl.getShaderInfoLog(shader)]);
	}
	return shader;
}
flambe.platform.shader.ShaderGL.prototype = {
	getUniformLocation: function(name) {
		var loc = this._gl.getUniformLocation(this._program,name);
		flambe.util.Assert.that(loc != null,"Missing uniform",["name",name]);
		return loc;
	}
	,getAttribLocation: function(name) {
		var loc = this._gl.getAttribLocation(this._program,name);
		flambe.util.Assert.that(loc >= 0,"Missing attribute",["name",name]);
		return loc;
	}
	,prepare: function() {
		flambe.util.Assert.fail("abstract");
	}
	,useProgram: function() {
		this._gl.useProgram(this._program);
	}
	,__class__: flambe.platform.shader.ShaderGL
}
flambe.platform.shader.DrawPatternGL = function(gl) {
	flambe.platform.shader.ShaderGL.call(this,gl,["attribute highp vec2 a_pos;","attribute mediump vec2 a_uv;","attribute lowp float a_alpha;","varying mediump vec2 v_uv;","varying lowp float v_alpha;","void main (void) {","v_uv = a_uv;","v_alpha = a_alpha;","gl_Position = vec4(a_pos, 0, 1);","}"].join("\n"),["varying mediump vec2 v_uv;","varying lowp float v_alpha;","uniform lowp sampler2D u_texture;","uniform mediump vec4 u_region;","void main (void) {","gl_FragColor = texture2D(u_texture, u_region.xy + mod(v_uv, u_region.zw)) * v_alpha;","}"].join("\n"));
	this.a_pos = this.getAttribLocation("a_pos");
	this.a_uv = this.getAttribLocation("a_uv");
	this.a_alpha = this.getAttribLocation("a_alpha");
	this.u_texture = this.getUniformLocation("u_texture");
	this.u_region = this.getUniformLocation("u_region");
	this.setTexture(0);
};
flambe.platform.shader.DrawPatternGL.__name__ = true;
flambe.platform.shader.DrawPatternGL.__super__ = flambe.platform.shader.ShaderGL;
flambe.platform.shader.DrawPatternGL.prototype = $extend(flambe.platform.shader.ShaderGL.prototype,{
	prepare: function() {
		this._gl.enableVertexAttribArray(this.a_pos);
		this._gl.enableVertexAttribArray(this.a_uv);
		this._gl.enableVertexAttribArray(this.a_alpha);
		var bytesPerFloat = 4;
		var stride = 5 * bytesPerFloat;
		this._gl.vertexAttribPointer(this.a_pos,2,5126,false,stride,0 * bytesPerFloat);
		this._gl.vertexAttribPointer(this.a_uv,2,5126,false,stride,2 * bytesPerFloat);
		this._gl.vertexAttribPointer(this.a_alpha,1,5126,false,stride,4 * bytesPerFloat);
	}
	,setRegion: function(x,y,width,height) {
		this._gl.uniform4f(this.u_region,x,y,width,height);
	}
	,setTexture: function(unit) {
		this._gl.uniform1i(this.u_texture,unit);
	}
	,__class__: flambe.platform.shader.DrawPatternGL
});
flambe.platform.shader.DrawTextureGL = function(gl) {
	flambe.platform.shader.ShaderGL.call(this,gl,["attribute highp vec2 a_pos;","attribute mediump vec2 a_uv;","attribute lowp float a_alpha;","varying mediump vec2 v_uv;","varying lowp float v_alpha;","void main (void) {","v_uv = a_uv;","v_alpha = a_alpha;","gl_Position = vec4(a_pos, 0, 1);","}"].join("\n"),["varying mediump vec2 v_uv;","varying lowp float v_alpha;","uniform lowp sampler2D u_texture;","void main (void) {","gl_FragColor = texture2D(u_texture, v_uv) * v_alpha;","}"].join("\n"));
	this.a_pos = this.getAttribLocation("a_pos");
	this.a_uv = this.getAttribLocation("a_uv");
	this.a_alpha = this.getAttribLocation("a_alpha");
	this.u_texture = this.getUniformLocation("u_texture");
	this.setTexture(0);
};
flambe.platform.shader.DrawTextureGL.__name__ = true;
flambe.platform.shader.DrawTextureGL.__super__ = flambe.platform.shader.ShaderGL;
flambe.platform.shader.DrawTextureGL.prototype = $extend(flambe.platform.shader.ShaderGL.prototype,{
	prepare: function() {
		this._gl.enableVertexAttribArray(this.a_pos);
		this._gl.enableVertexAttribArray(this.a_uv);
		this._gl.enableVertexAttribArray(this.a_alpha);
		var bytesPerFloat = 4;
		var stride = 5 * bytesPerFloat;
		this._gl.vertexAttribPointer(this.a_pos,2,5126,false,stride,0 * bytesPerFloat);
		this._gl.vertexAttribPointer(this.a_uv,2,5126,false,stride,2 * bytesPerFloat);
		this._gl.vertexAttribPointer(this.a_alpha,1,5126,false,stride,4 * bytesPerFloat);
	}
	,setTexture: function(unit) {
		this._gl.uniform1i(this.u_texture,unit);
	}
	,__class__: flambe.platform.shader.DrawTextureGL
});
flambe.platform.shader.FillRectGL = function(gl) {
	flambe.platform.shader.ShaderGL.call(this,gl,["attribute highp vec2 a_pos;","attribute lowp vec3 a_rgb;","attribute lowp float a_alpha;","varying lowp vec4 v_color;","void main (void) {","v_color = vec4(a_rgb*a_alpha, a_alpha);","gl_Position = vec4(a_pos, 0, 1);","}"].join("\n"),["varying lowp vec4 v_color;","void main (void) {","gl_FragColor = v_color;","}"].join("\n"));
	this.a_pos = this.getAttribLocation("a_pos");
	this.a_rgb = this.getAttribLocation("a_rgb");
	this.a_alpha = this.getAttribLocation("a_alpha");
};
flambe.platform.shader.FillRectGL.__name__ = true;
flambe.platform.shader.FillRectGL.__super__ = flambe.platform.shader.ShaderGL;
flambe.platform.shader.FillRectGL.prototype = $extend(flambe.platform.shader.ShaderGL.prototype,{
	prepare: function() {
		this._gl.enableVertexAttribArray(this.a_pos);
		this._gl.enableVertexAttribArray(this.a_rgb);
		this._gl.enableVertexAttribArray(this.a_alpha);
		var bytesPerFloat = 4;
		var stride = 6 * bytesPerFloat;
		this._gl.vertexAttribPointer(this.a_pos,2,5126,false,stride,0 * bytesPerFloat);
		this._gl.vertexAttribPointer(this.a_rgb,3,5126,false,stride,2 * bytesPerFloat);
		this._gl.vertexAttribPointer(this.a_alpha,1,5126,false,stride,5 * bytesPerFloat);
	}
	,__class__: flambe.platform.shader.FillRectGL
});
flambe.scene = {}
flambe.scene.Director = function() {
	this._transitor = null;
};
flambe.scene.Director.__name__ = true;
flambe.scene.Director.__super__ = flambe.Component;
flambe.scene.Director.prototype = $extend(flambe.Component.prototype,{
	completeTransition: function() {
		if(this._transitor != null) {
			this._transitor.complete();
			this._transitor = null;
			this.invalidateVisibility();
		}
	}
	,invalidateVisibility: function() {
		var ii = this.scenes.length;
		while(ii > 0) {
			var scene = this.scenes[--ii];
			var comp = scene.getComponent("Scene_3");
			if(comp == null || comp.opaque) break;
		}
		this.occludedScenes = this.scenes.length > 0?this.scenes.slice(ii,this.scenes.length - 1):[];
		var scene = this.get_topScene();
		if(scene != null) this.show(scene);
	}
	,show: function(scene) {
		var events = scene.getComponent("Scene_3");
		if(events != null) events.shown.emit();
	}
	,get_topScene: function() {
		var ll = this.scenes.length;
		return ll > 0?this.scenes[ll - 1]:null;
	}
	,onUpdate: function(dt) {
		if(this._transitor != null && this._transitor.update(dt)) this.completeTransition();
	}
	,onRemoved: function() {
		this.completeTransition();
		var _g = 0, _g1 = this.scenes;
		while(_g < _g1.length) {
			var scene = _g1[_g];
			++_g;
			scene.dispose();
		}
		this.scenes = [];
		this.occludedScenes = [];
		this._root.dispose();
	}
	,onAdded: function() {
		this.owner.addChild(this._root);
	}
	,get_name: function() {
		return "Director_1";
	}
	,__class__: flambe.scene.Director
});
flambe.scene._Director = {}
flambe.scene._Director.Transitor = function() { }
flambe.scene._Director.Transitor.__name__ = true;
flambe.scene._Director.Transitor.prototype = {
	complete: function() {
		this._transition.complete();
		this._onComplete();
	}
	,update: function(dt) {
		return this._transition.update(dt);
	}
	,__class__: flambe.scene._Director.Transitor
}
flambe.scene.Scene = function() { }
flambe.scene.Scene.__name__ = true;
flambe.scene.Scene.__super__ = flambe.Component;
flambe.scene.Scene.prototype = $extend(flambe.Component.prototype,{
	get_name: function() {
		return "Scene_3";
	}
	,__class__: flambe.scene.Scene
});
flambe.scene.Transition = function() { }
flambe.scene.Transition.__name__ = true;
flambe.scene.Transition.prototype = {
	complete: function() {
	}
	,update: function(dt) {
		return true;
	}
	,__class__: flambe.scene.Transition
}
flambe.subsystem.RendererType = { __ename__ : true, __constructs__ : ["Stage3D","WebGL","Canvas"] }
flambe.subsystem.RendererType.Stage3D = ["Stage3D",0];
flambe.subsystem.RendererType.Stage3D.toString = $estr;
flambe.subsystem.RendererType.Stage3D.__enum__ = flambe.subsystem.RendererType;
flambe.subsystem.RendererType.WebGL = ["WebGL",1];
flambe.subsystem.RendererType.WebGL.toString = $estr;
flambe.subsystem.RendererType.WebGL.__enum__ = flambe.subsystem.RendererType;
flambe.subsystem.RendererType.Canvas = ["Canvas",2];
flambe.subsystem.RendererType.Canvas.toString = $estr;
flambe.subsystem.RendererType.Canvas.__enum__ = flambe.subsystem.RendererType;
flambe.util.Arrays = function() { }
flambe.util.Arrays.__name__ = true;
flambe.util.Arrays.indexOf = function(arr,element,fromIndex) {
	return arr.indexOf(element,fromIndex);
}
flambe.util.Assert = function() { }
flambe.util.Assert.__name__ = true;
flambe.util.Assert.that = function(condition,message,fields) {
	if(!condition) flambe.util.Assert.fail(message,fields);
}
flambe.util.Assert.fail = function(message,fields) {
	var error = "Assertion failed!";
	if(message != null) error += " " + message;
	if(fields != null) error = flambe.util.Strings.withFields(error,fields);
	throw error;
}
flambe.util.BitSets = function() { }
flambe.util.BitSets.__name__ = true;
flambe.util.BitSets.add = function(bits,mask) {
	return bits | mask;
}
flambe.util.BitSets.remove = function(bits,mask) {
	return bits & ~mask;
}
flambe.util.BitSets.contains = function(bits,mask) {
	return (bits & mask) != 0;
}
flambe.util.BitSets.containsAll = function(bits,mask) {
	return (bits & mask) == mask;
}
flambe.util.LogLevel = { __ename__ : true, __constructs__ : ["Info","Warn","Error"] }
flambe.util.LogLevel.Info = ["Info",0];
flambe.util.LogLevel.Info.toString = $estr;
flambe.util.LogLevel.Info.__enum__ = flambe.util.LogLevel;
flambe.util.LogLevel.Warn = ["Warn",1];
flambe.util.LogLevel.Warn.toString = $estr;
flambe.util.LogLevel.Warn.__enum__ = flambe.util.LogLevel;
flambe.util.LogLevel.Error = ["Error",2];
flambe.util.LogLevel.Error.toString = $estr;
flambe.util.LogLevel.Error.__enum__ = flambe.util.LogLevel;
flambe.util.Promise = function() {
	this.success = new flambe.util.Signal1();
	this.error = new flambe.util.Signal1();
	this.progressChanged = new flambe.util.Signal0();
	this.hasResult = false;
	this._progress = 0;
	this._total = 0;
};
flambe.util.Promise.__name__ = true;
flambe.util.Promise.prototype = {
	get_total: function() {
		return this._total;
	}
	,set_total: function(total) {
		if(this._total != total) {
			this._total = total;
			this.progressChanged.emit();
		}
		return total;
	}
	,set_progress: function(progress) {
		if(this._progress != progress) {
			this._progress = progress;
			this.progressChanged.emit();
		}
		return progress;
	}
	,get: function(fn) {
		if(this.hasResult) {
			fn(this._result);
			return null;
		}
		return this.success.connect(fn).once();
	}
	,set_result: function(result) {
		if(this.hasResult) throw "Promise result already assigned";
		this._result = result;
		this.hasResult = true;
		this.success.emit(result);
		return result;
	}
	,__class__: flambe.util.Promise
}
flambe.util.Signal0 = function(listener) {
	flambe.util.SignalBase.call(this,listener);
};
flambe.util.Signal0.__name__ = true;
flambe.util.Signal0.__super__ = flambe.util.SignalBase;
flambe.util.Signal0.prototype = $extend(flambe.util.SignalBase.prototype,{
	emitImpl: function() {
		var head = this.willEmit();
		var p = head;
		while(p != null) {
			p._listener();
			if(!p.stayInList) p.dispose();
			p = p._next;
		}
		this.didEmit(head);
	}
	,emit: function() {
		var _g = this;
		if(this.dispatching()) this.defer(function() {
			_g.emitImpl();
		}); else this.emitImpl();
	}
	,connect: function(listener,prioritize) {
		if(prioritize == null) prioritize = false;
		return this.connectImpl(listener,prioritize);
	}
	,__class__: flambe.util.Signal0
});
flambe.util._SignalBase = {}
flambe.util._SignalBase.Task = function(fn) {
	this.next = null;
	this.fn = fn;
};
flambe.util._SignalBase.Task.__name__ = true;
flambe.util._SignalBase.Task.prototype = {
	__class__: flambe.util._SignalBase.Task
}
flambe.util.Strings = function() { }
flambe.util.Strings.__name__ = true;
flambe.util.Strings.getFileExtension = function(fileName) {
	var dot = fileName.lastIndexOf(".");
	return dot > 0?HxOverrides.substr(fileName,dot + 1,null):null;
}
flambe.util.Strings.removeFileExtension = function(fileName) {
	var dot = fileName.lastIndexOf(".");
	return dot > 0?HxOverrides.substr(fileName,0,dot):fileName;
}
flambe.util.Strings.getUrlExtension = function(url) {
	var question = url.lastIndexOf("?");
	if(question >= 0) url = HxOverrides.substr(url,0,question);
	var slash = url.lastIndexOf("/");
	if(slash >= 0) url = HxOverrides.substr(url,slash + 1,null);
	return flambe.util.Strings.getFileExtension(url);
}
flambe.util.Strings.joinPath = function(base,relative) {
	if(base.length > 0 && StringTools.fastCodeAt(base,base.length - 1) != 47) base += "/";
	return base + relative;
}
flambe.util.Strings.withFields = function(message,fields) {
	var ll = fields.length;
	if(ll > 0) {
		message += message.length > 0?" [":"[";
		var ii = 0;
		while(ii < ll) {
			if(ii > 0) message += ", ";
			var name = fields[ii];
			var value = fields[ii + 1];
			if(Std["is"](value,Error)) {
				var stack = value.stack;
				if(stack != null) value = stack;
			}
			message += name + "=" + Std.string(value);
			ii += 2;
		}
		message += "]";
	}
	return message;
}
var flambepowertools = {}
flambepowertools.system = {}
flambepowertools.system.MainStage = function() { }
flambepowertools.system.MainStage.__name__ = true;
flambepowertools.system.MainStage.init = function(designSizeWidth,designSizeHeight) {
	flambepowertools.system.MainStage._designSizeWidth = designSizeWidth;
	flambepowertools.system.MainStage._designSizeHeight = designSizeHeight;
	flambepowertools.system.MainStage.setupMainStageSprite();
	flambepowertools.system.MainStage.setupStageResizeListener();
	flambepowertools.system.MainStage.resizeStage();
}
flambepowertools.system.MainStage.setupMainStageSprite = function() {
	flambepowertools.system.MainStage._mainStageSprite = new flambe.display.Sprite();
	flambepowertools.system.MainStage._mainStageSprite.scissor = new flambe.math.Rectangle(0,0,flambepowertools.system.MainStage._designSizeWidth,flambepowertools.system.MainStage._designSizeHeight);
	flambe.System.root.add(flambepowertools.system.MainStage._mainStageSprite);
}
flambepowertools.system.MainStage.setupStageResizeListener = function() {
	flambe.System.get_stage().resize.connect(flambepowertools.system.MainStage.onStageResize);
}
flambepowertools.system.MainStage.onStageResize = function() {
	flambepowertools.system.MainStage.resizeStage();
}
flambepowertools.system.MainStage.resizeStage = function() {
	flambepowertools.system.MainStage._computedStageScale = flambepowertools.system.MainStage.computeScaleAccordingToNewStageDimensions();
	flambepowertools.system.MainStage._mainStageSprite.setScale(flambepowertools.system.MainStage._computedStageScale);
	flambepowertools.system.MainStage.centerStage();
}
flambepowertools.system.MainStage.computeScaleAccordingToNewStageDimensions = function() {
	var currentStageWidth = flambe.System.get_stage().get_width();
	var currentStageHeight = flambe.System.get_stage().get_height();
	var idealWidth = flambepowertools.system.MainStage._designSizeWidth;
	var idealHeight = flambepowertools.system.MainStage._designSizeHeight;
	var computedScale = 1;
	if(currentStageWidth / idealWidth < currentStageHeight / idealHeight) computedScale = currentStageWidth / idealWidth; else computedScale = currentStageHeight / idealHeight;
	return computedScale;
}
flambepowertools.system.MainStage.centerStage = function() {
	var xDiff = flambe.System.get_stage().get_width() - flambepowertools.system.MainStage._designSizeWidth * flambepowertools.system.MainStage._computedStageScale;
	var yDiff = flambe.System.get_stage().get_height() - flambepowertools.system.MainStage._designSizeHeight * flambepowertools.system.MainStage._computedStageScale;
	flambepowertools.system.MainStage._mainStageSprite.x.set__(xDiff / 2);
	flambepowertools.system.MainStage._mainStageSprite.y.set__(yDiff / 2);
}
var haxe = {}
haxe.Json = function() {
};
haxe.Json.__name__ = true;
haxe.Json.parse = function(text) {
	return new haxe.Json().doParse(text);
}
haxe.Json.prototype = {
	parseNumber: function(c) {
		var start = this.pos - 1;
		var minus = c == 45, digit = !minus, zero = c == 48;
		var point = false, e = false, pm = false, end = false;
		while(true) {
			c = this.nextChar();
			switch(c) {
			case 48:
				if(zero && !point) this.invalidNumber(start);
				if(minus) {
					minus = false;
					zero = true;
				}
				digit = true;
				break;
			case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:
				if(zero && !point) this.invalidNumber(start);
				if(minus) minus = false;
				digit = true;
				zero = false;
				break;
			case 46:
				if(minus || point) this.invalidNumber(start);
				digit = false;
				point = true;
				break;
			case 101:case 69:
				if(minus || zero || e) this.invalidNumber(start);
				digit = false;
				e = true;
				break;
			case 43:case 45:
				if(!e || pm) this.invalidNumber(start);
				digit = false;
				pm = true;
				break;
			default:
				if(!digit) this.invalidNumber(start);
				this.pos--;
				end = true;
			}
			if(end) break;
		}
		var f = Std.parseFloat(HxOverrides.substr(this.str,start,this.pos - start));
		var i = Std["int"](f);
		return i == f?i:f;
	}
	,invalidNumber: function(start) {
		throw "Invalid number at position " + start + ": " + HxOverrides.substr(this.str,start,this.pos - start);
	}
	,parseString: function() {
		var start = this.pos;
		var buf = new StringBuf();
		while(true) {
			var c = this.nextChar();
			if(c == 34) break;
			if(c == 92) {
				buf.addSub(this.str,start,this.pos - start - 1);
				c = this.nextChar();
				switch(c) {
				case 114:
					buf.addChar(13);
					break;
				case 110:
					buf.addChar(10);
					break;
				case 116:
					buf.addChar(9);
					break;
				case 98:
					buf.addChar(8);
					break;
				case 102:
					buf.addChar(12);
					break;
				case 47:case 92:case 34:
					buf.addChar(c);
					break;
				case 117:
					var uc = Std.parseInt("0x" + HxOverrides.substr(this.str,this.pos,4));
					this.pos += 4;
					buf.addChar(uc);
					break;
				default:
					throw "Invalid escape sequence \\" + String.fromCharCode(c) + " at position " + (this.pos - 1);
				}
				start = this.pos;
			} else if(StringTools.isEof(c)) throw "Unclosed string";
		}
		buf.addSub(this.str,start,this.pos - start - 1);
		return buf.toString();
	}
	,parseRec: function() {
		while(true) {
			var c = this.nextChar();
			switch(c) {
			case 32:case 13:case 10:case 9:
				break;
			case 123:
				var obj = { }, field = null, comma = null;
				while(true) {
					var c1 = this.nextChar();
					switch(c1) {
					case 32:case 13:case 10:case 9:
						break;
					case 125:
						if(field != null || comma == false) this.invalidChar();
						return obj;
					case 58:
						if(field == null) this.invalidChar();
						Reflect.setField(obj,field,this.parseRec());
						field = null;
						comma = true;
						break;
					case 44:
						if(comma) comma = false; else this.invalidChar();
						break;
					case 34:
						if(comma) this.invalidChar();
						field = this.parseString();
						break;
					default:
						this.invalidChar();
					}
				}
				break;
			case 91:
				var arr = [], comma = null;
				while(true) {
					var c1 = this.nextChar();
					switch(c1) {
					case 32:case 13:case 10:case 9:
						break;
					case 93:
						if(comma == false) this.invalidChar();
						return arr;
					case 44:
						if(comma) comma = false; else this.invalidChar();
						break;
					default:
						if(comma) this.invalidChar();
						this.pos--;
						arr.push(this.parseRec());
						comma = true;
					}
				}
				break;
			case 116:
				var save = this.pos;
				if(this.nextChar() != 114 || this.nextChar() != 117 || this.nextChar() != 101) {
					this.pos = save;
					this.invalidChar();
				}
				return true;
			case 102:
				var save = this.pos;
				if(this.nextChar() != 97 || this.nextChar() != 108 || this.nextChar() != 115 || this.nextChar() != 101) {
					this.pos = save;
					this.invalidChar();
				}
				return false;
			case 110:
				var save = this.pos;
				if(this.nextChar() != 117 || this.nextChar() != 108 || this.nextChar() != 108) {
					this.pos = save;
					this.invalidChar();
				}
				return null;
			case 34:
				return this.parseString();
			case 48:case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:case 45:
				return this.parseNumber(c);
			default:
				this.invalidChar();
			}
		}
	}
	,nextChar: function() {
		return StringTools.fastCodeAt(this.str,this.pos++);
	}
	,invalidChar: function() {
		this.pos--;
		throw "Invalid char " + StringTools.fastCodeAt(this.str,this.pos) + " at position " + this.pos;
	}
	,doParse: function(str) {
		this.str = str;
		this.pos = 0;
		return this.parseRec();
	}
	,__class__: haxe.Json
}
haxe.ds = {}
haxe.ds.IntMap = function() {
	this.h = { };
};
haxe.ds.IntMap.__name__ = true;
haxe.ds.IntMap.__interfaces__ = [IMap];
haxe.ds.IntMap.prototype = {
	remove: function(key) {
		if(!this.h.hasOwnProperty(key)) return false;
		delete(this.h[key]);
		return true;
	}
	,exists: function(key) {
		return this.h.hasOwnProperty(key);
	}
	,get: function(key) {
		return this.h[key];
	}
	,set: function(key,value) {
		this.h[key] = value;
	}
	,__class__: haxe.ds.IntMap
}
haxe.ds.StringMap = function() {
	this.h = { };
};
haxe.ds.StringMap.__name__ = true;
haxe.ds.StringMap.__interfaces__ = [IMap];
haxe.ds.StringMap.prototype = {
	iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref["$" + i];
		}};
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key.substr(1));
		}
		return HxOverrides.iter(a);
	}
	,get: function(key) {
		return this.h["$" + key];
	}
	,set: function(key,value) {
		this.h["$" + key] = value;
	}
	,__class__: haxe.ds.StringMap
}
haxe.io = {}
haxe.io.Bytes = function() { }
haxe.io.Bytes.__name__ = true;
haxe.rtti = {}
haxe.rtti.Meta = function() { }
haxe.rtti.Meta.__name__ = true;
haxe.rtti.Meta.getType = function(t) {
	var meta = t.__meta__;
	return meta == null || meta.obj == null?{ }:meta.obj;
}
js.Boot = function() { }
js.Boot.__name__ = true;
js.Boot.isClass = function(o) {
	return o.__name__;
}
js.Boot.isEnum = function(e) {
	return e.__ename__;
}
js.Boot.getClass = function(o) {
	return o.__class__;
}
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (js.Boot.isClass(o) || js.Boot.isEnum(o))) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2, _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i;
			var str = "[";
			s += "\t";
			var _g = 0;
			while(_g < l) {
				var i1 = _g++;
				str += (i1 > 0?",":"") + js.Boot.__string_rec(o[i1],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) { ;
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
}
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0, _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
}
js.Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) {
					if(cl == Array) return o.__enum__ == null;
					return true;
				}
				if(js.Boot.__interfLoop(js.Boot.getClass(o),cl)) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
}
js.html = {}
js.html._CanvasElement = {}
js.html._CanvasElement.CanvasUtil = function() { }
js.html._CanvasElement.CanvasUtil.__name__ = true;
js.html._CanvasElement.CanvasUtil.getContextWebGL = function(canvas,attribs) {
	var _g = 0, _g1 = ["webgl","experimental-webgl"];
	while(_g < _g1.length) {
		var name = _g1[_g];
		++_g;
		var ctx = canvas.getContext(name,attribs);
		if(ctx != null) return ctx;
	}
	return null;
}
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; };
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; };
if(Array.prototype.indexOf) HxOverrides.remove = function(a,o) {
	var i = a.indexOf(o);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
};
Math.__name__ = ["Math"];
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i) {
	return isNaN(i);
};
String.prototype.__class__ = String;
String.__name__ = true;
Array.prototype.__class__ = Array;
Array.__name__ = true;
Date.prototype.__class__ = Date;
Date.__name__ = ["Date"];
var Int = { __name__ : ["Int"]};
var Dynamic = { __name__ : ["Dynamic"]};
var Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = { __name__ : ["Class"]};
var Enum = { };
if(typeof(JSON) != "undefined") haxe.Json = JSON;
flambe.platform.html.HtmlPlatform.instance = new flambe.platform.html.HtmlPlatform();
flambe.util.SignalBase.DISPATCHING_SENTINEL = new flambe.util.SignalConnection(null,null);
flambe.System.root = new flambe.Entity();
flambe.System.uncaughtError = new flambe.util.Signal1();
flambe.System.hidden = new flambe.util.Value(false);
flambe.System.volume = new flambe.animation.AnimatedFloat(1);
flambe.System._platform = flambe.platform.html.HtmlPlatform.instance;
flambe.System._calledInit = false;
flambe.Log.logger = flambe.System.createLogger("flambe");
js.Browser.window = typeof window != "undefined" ? window : null;
js.Browser.document = typeof window != "undefined" ? window.document : null;
js.Browser.location = typeof window != "undefined" ? window.location : null;
js.Browser.navigator = typeof window != "undefined" ? window.navigator : null;
flambe.asset.Manifest.__meta__ = { obj : { assets : [{ bootstrap : [{ bytes : 3822, md5 : "8f6c1133edf354da44b4d1a3e3377c6c", name : "plane.png"}]}]}};
flambe.asset.Manifest._supportsCrossOrigin = (function() {
	var detected = (function() {
		if(js.Browser.navigator.userAgent.indexOf("Linux; U; Android") >= 0) return false;
		var xhr = new XMLHttpRequest();
		return xhr.withCredentials != null;
	})();
	if(!detected) flambe.Log.warn("This browser does not support cross-domain asset loading, any Manifest.remoteBase setting will be ignored.");
	return detected;
})();
flambe.display.Sprite._scratchPoint = new flambe.math.Point();
flambe.platform.BasicKeyboard._sharedEvent = new flambe.input.KeyboardEvent();
flambe.platform.BasicMouse._sharedEvent = new flambe.input.MouseEvent();
flambe.platform.BasicPointer._sharedEvent = new flambe.input.PointerEvent();
flambe.platform.html.CanvasRenderer.CANVAS_TEXTURES = (function() {
	var pattern = new EReg("(iPhone|iPod|iPad)","");
	return pattern.match(js.Browser.window.navigator.userAgent);
})();
flambe.platform.html.HtmlAssetPackLoader._mediaRefCount = 0;
flambe.platform.html.HtmlAssetPackLoader._detectBlobSupport = true;
flambe.platform.html.HtmlUtil.VENDOR_PREFIXES = ["webkit","moz","ms","o","khtml"];
flambe.platform.html.HtmlUtil.SHOULD_HIDE_MOBILE_BROWSER = js.Browser.window.top == js.Browser.window && new EReg("Mobile(/.*)? Safari","").match(js.Browser.navigator.userAgent);
flambe.platform.html.WebAudioSound._detectSupport = true;
flambe.platform.html.WebGLGraphics._scratchMatrix = new flambe.math.Matrix();
app.Main.main();
})();

//@ sourceMappingURL=main-html.js.map
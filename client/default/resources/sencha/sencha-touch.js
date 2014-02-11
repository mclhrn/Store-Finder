if (typeof Ext === "undefined") {
    Ext = {}
}
Ext.apply = (function () {
    for (var a in {
        valueOf: 1
    }) {
        return function (c, b, e) {
            if (e) {
                Ext.apply(c, e)
            }
            if (c && b && typeof b === "object") {
                for (var d in b) {
                    c[d] = b[d]
                }
            }
            return c
        }
    }
    return function (c, b, e) {
        if (e) {
            Ext.apply(c, e)
        }
        if (c && b && typeof b === "object") {
            for (var d in b) {
                c[d] = b[d]
            }
            if (b.toString !== Object.prototype.toString) {
                c.toString = b.toString
            }
            if (b.valueOf !== Object.prototype.valueOf) {
                c.valueOf = b.valueOf
            }
        }
        return c
    }
})();
Ext.apply(Ext, {
    platformVersion: "1.0",
    platformVersionDetail: {
        major: 1,
        minor: 0,
        patch: 3
    },
    userAgent: navigator.userAgent.toLowerCase(),
    cache: {},
    idSeed: 1000,
    BLANK_IMAGE_URL: "data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==",
    isStrict: document.compatMode == "CSS1Compat",
    windowId: "ext-window",
    documentId: "ext-document",
    emptyFn: function () {},
    isSecure: /^https/i.test(window.location.protocol),
    isReady: false,
    enableGarbageCollector: true,
    enableListenerCollection: true,
    applyIf: function (b, a) {
        var c, d;
        if (b) {
            for (c in a) {
                if (b[c] === d) {
                    b[c] = a[c]
                }
            }
        }
        return b
    },
    repaint: function () {
        var a = Ext.getBody().createChild({
            cls: "x-mask x-mask-transparent"
        });
        setTimeout(function () {
            a.remove()
        }, 0)
    },
    id: function (a, b) {
        a = Ext.getDom(a) || {};
        if (a === document) {
            a.id = this.documentId
        } else {
            if (a === window) {
                a.id = this.windowId
            }
        }
        a.id = a.id || ((b || "ext-gen") + (++Ext.idSeed));
        return a.id
    },
    extend: function () {
        var b = function (d) {
                for (var c in d) {
                    if (!d.hasOwnProperty(c)) {
                        continue
                    }
                    this[c] = d[c]
                }
            };
        var a = Object.prototype.constructor;
        return function (c, h, f) {
            if (Ext.isObject(h)) {
                f = h;
                h = c;
                c = f.constructor != a ? f.constructor : function () {
                    h.apply(this, arguments)
                }
            }
            if (!h) {
                throw "Attempting to extend from a class which has not been loaded on the page."
            }
            var e = function () {},
                d, g = h.prototype;
            e.prototype = g;
            d = c.prototype = new e();
            d.constructor = c;
            c.superclass = g;
            if (g.constructor == a) {
                g.constructor = h
            }
            c.override = function (i) {
                Ext.override(c, i)
            };
            d.superclass = d.supr = (function () {
                return g
            });
            d.override = b;
            d.proto = d;
            c.override(f);
            c.extend = function (i) {
                return Ext.extend(c, i)
            };
            return c
        }
    }(),
    override: function (a, b) {
        Ext.apply(a.prototype, b)
    },
    namespace: function () {
        var e = arguments.length,
            d, f, c, a, h, g, b;
        for (d = 0; d < e; d++) {
            f = arguments[d];
            g = f.split(".");
            if (window.Ext) {
                b = window[g[0]] = Object(window[g[0]])
            } else {
                b = arguments.callee.caller.arguments[0]
            }
            for (a = 1, h = g.length; a < h; a++) {
                b = b[g[a]] = Object(b[g[a]])
            }
        }
        return b
    },
    urlEncode: function (f, d) {
        var b, a = [],
            c = encodeURIComponent;
        Ext.iterate(f, function (e, g) {
            b = Ext.isEmpty(g);
            Ext.each(b ? e : g, function (h) {
                a.push("&", c(e), "=", (!Ext.isEmpty(h) && (h != e || !b)) ? (Ext.isDate(h) ? Ext.encode(h).replace(/"/g, "") : c(h)) : "")
            })
        });
        if (!d) {
            a.shift();
            d = ""
        }
        return d + a.join("")
    },
    urlDecode: function (c, b) {
        if (Ext.isEmpty(c)) {
            return {}
        }
        var g = {},
            f = c.split("&"),
            h = decodeURIComponent,
            a, e;
        Ext.each(f, function (d) {
            d = d.split("=");
            a = h(d[0]);
            e = h(d[1]);
            g[a] = b || !g[a] ? e : [].concat(g[a]).concat(e)
        });
        return g
    },
    htmlEncode: function (a) {
        return Ext.util.Format.htmlEncode(a)
    },
    htmlDecode: function (a) {
        return Ext.util.Format.htmlDecode(a)
    },
    urlAppend: function (a, b) {
        if (!Ext.isEmpty(b)) {
            return a + (a.indexOf("?") === -1 ? "?" : "&") + b
        }
        return a
    },
    toArray: function (c, b, a) {
        return Array.prototype.slice.call(c, b || 0, a || c.length)
    },
    each: function (e, d, c) {
        if (Ext.isEmpty(e, true)) {
            return 0
        }
        if (!Ext.isIterable(e) || Ext.isPrimitive(e)) {
            e = [e]
        }
        for (var b = 0, a = e.length; b < a; b++) {
            if (d.call(c || e[b], e[b], b, e) === false) {
                return b
            }
        }
        return true
    },
    iterate: function (c, b, a) {
        if (Ext.isEmpty(c)) {
            return
        }
        if (Ext.isIterable(c)) {
            Ext.each(c, b, a);
            return
        } else {
            if (Ext.isObject(c)) {
                for (var d in c) {
                    if (c.hasOwnProperty(d)) {
                        if (b.call(a || c, d, c[d], c) === false) {
                            return
                        }
                    }
                }
            }
        }
    },
    pluck: function (a, c) {
        var b = [];
        Ext.each(a, function (d) {
            b.push(d[c])
        });
        return b
    },
    getBody: function () {
        return Ext.get(document.body || false)
    },
    getHead: function () {
        var a;
        return function () {
            if (a == undefined) {
                a = Ext.get(DOC.getElementsByTagName("head")[0])
            }
            return a
        }
    }(),
    getDoc: function () {
        return Ext.get(document)
    },
    getCmp: function (a) {
        return Ext.ComponentMgr.get(a)
    },
    getOrientation: function () {
        return window.innerHeight > window.innerWidth ? "portrait" : "landscape"
    },
    isIterable: function (a) {
        if (!a) {
            return false
        }
        if (Ext.isArray(a) || a.callee) {
            return true
        }
        if (/NodeList|HTMLCollection/.test(Object.prototype.toString.call(a))) {
            return true
        }
        return ((typeof a.nextNode != "undefined" || a.item) && Ext.isNumber(a.length)) || false
    },
    num: function (b, a) {
        b = Number(Ext.isEmpty(b) || Ext.isArray(b) || typeof b == "boolean" || (typeof b == "string" && Ext.util.Format.trim(b).length == 0) ? NaN : b);
        return isNaN(b) ? a : b
    },
    isEmpty: function (d, a) {
        var b = d == null,
            c = (Ext.isArray(d) && !d.length),
            e = !a ? d === "" : false;
        return b || c || e
    },
    isArray: function (a) {
        return Object.prototype.toString.apply(a) === "[object Array]"
    },
    isDate: function (a) {
        return Object.prototype.toString.apply(a) === "[object Date]"
    },
    isObject: function (a) {
        return !!a && !a.tagName && Object.prototype.toString.call(a) === "[object Object]"
    },
    isPrimitive: function (a) {
        return Ext.isString(a) || Ext.isNumber(a) || Ext.isBoolean(a)
    },
    isFunction: function (a) {
        return Object.prototype.toString.apply(a) === "[object Function]"
    },
    isNumber: function (a) {
        return Object.prototype.toString.apply(a) === "[object Number]" && isFinite(a)
    },
    isString: function (a) {
        return typeof a === "string"
    },
    isBoolean: function (a) {
        return Object.prototype.toString.apply(a) === "[object Boolean]"
    },
    isElement: function (a) {
        return a ? !! a.tagName : false
    },
    isDefined: function (a) {
        return typeof a !== "undefined"
    },
    destroy: function () {
        var c = arguments.length,
            b, a;
        for (b = 0; b < c; b++) {
            a = arguments[b];
            if (a) {
                if (Ext.isArray(a)) {
                    this.destroy.apply(this, a)
                } else {
                    if (Ext.isFunction(a.destroy)) {
                        a.destroy()
                    } else {
                        if (a.dom) {
                            a.remove()
                        }
                    }
                }
            }
        }
    }
});
Ext.SSL_SECURE_URL = Ext.isSecure && "about:blank";
Ext.ns = Ext.namespace;
Ext.ns("Ext.util", "Ext.data", "Ext.list", "Ext.form", "Ext.menu", "Ext.state", "Ext.layout", "Ext.app", "Ext.ux", "Ext.plugins", "Ext.direct", "Ext.lib", "Ext.gesture");
Ext.util.Observable = Ext.extend(Object, {
    isObservable: true,
    constructor: function (a) {
        var b = this;
        Ext.apply(b, a);
        if (b.listeners) {
            b.on(b.listeners);
            delete b.listeners
        }
        b.events = b.events || {};
        if (this.bubbleEvents) {
            this.enableBubble(this.bubbleEvents)
        }
    },
    eventOptionsRe: /^(?:scope|delay|buffer|single|stopEvent|preventDefault|stopPropagation|normalized|args|delegate|element|vertical|horizontal)$/,
    addManagedListener: function (h, d, f, e, c) {
        var g = this,
            a = g.managedListeners = g.managedListeners || [],
            b;
        if (Ext.isObject(d)) {
            c = d;
            for (d in c) {
                if (!c.hasOwnProperty(d)) {
                    continue
                }
                b = c[d];
                if (!g.eventOptionsRe.test(d)) {
                    g.addManagedListener(h, d, b.fn || b, b.scope || c.scope, b.fn ? b : c)
                }
            }
        } else {
            a.push({
                item: h,
                ename: d,
                fn: f,
                scope: e,
                options: c
            });
            h.on(d, f, e, c)
        }
    },
    removeManagedListener: function (k, e, h, l) {
        var g = this,
            b, d, j, c, a, f;
        if (Ext.isObject(e)) {
            b = e;
            for (e in b) {
                if (!b.hasOwnProperty(e)) {
                    continue
                }
                d = b[e];
                if (!g.eventOptionsRe.test(e)) {
                    g.removeManagedListener(k, e, d.fn || d, d.scope || b.scope)
                }
            }
        }
        j = this.managedListeners ? this.managedListeners.slice() : [];
        a = j.length;
        for (f = 0; f < a; f++) {
            c = j[f];
            if (c.item === k && c.ename === e && (!h || c.fn === h) && (!l || c.scope === l)) {
                this.managedListeners.remove(c);
                k.un(c.ename, c.fn, c.scope)
            }
        }
    },
    fireEvent: function () {
        var h = this,
            c = Ext.toArray(arguments),
            e = c[0].toLowerCase(),
            d = true,
            g = h.events[e],
            b = h.eventQueue,
            f;
        if (h.eventsSuspended === true) {
            if (b) {
                b.push(c)
            }
            return false
        } else {
            if (g && Ext.isObject(g) && g.bubble) {
                if (g.fire.apply(g, c.slice(1)) === false) {
                    return false
                }
                f = h.getBubbleTarget && h.getBubbleTarget();
                if (f && f.isObservable) {
                    if (!f.events[e] || !Ext.isObject(f.events[e]) || !f.events[e].bubble) {
                        f.enableBubble(e)
                    }
                    return f.fireEvent.apply(f, c)
                }
            } else {
                if (g && Ext.isObject(g)) {
                    c.shift();
                    d = g.fire.apply(g, c)
                }
            }
        }
        return d
    },
    addListener: function (b, d, c, g) {
        var f = this,
            a, e;
        if (Ext.isObject(b)) {
            g = b;
            for (b in g) {
                if (!g.hasOwnProperty(b)) {
                    continue
                }
                a = g[b];
                if (!f.eventOptionsRe.test(b)) {
                    f.addListener(b, a.fn || a, a.scope || g.scope, a.fn ? a : g)
                }
            }
        } else {
            b = b.toLowerCase();
            f.events[b] = f.events[b] || true;
            e = f.events[b] || true;
            if (Ext.isBoolean(e)) {
                f.events[b] = e = new Ext.util.Event(f, b)
            }
            e.addListener(d, c, Ext.isObject(g) ? g : {})
        }
    },
    removeListener: function (b, d, c) {
        var f = this,
            a, e;
        if (Ext.isObject(b)) {
            var g = b;
            for (b in g) {
                if (!g.hasOwnProperty(b)) {
                    continue
                }
                a = g[b];
                if (!f.eventOptionsRe.test(b)) {
                    f.removeListener(b, a.fn || a, a.scope || g.scope)
                }
            }
        } else {
            b = b.toLowerCase();
            e = f.events[b];
            if (e.isEvent) {
                e.removeListener(d, c)
            }
        }
    },
    clearListeners: function () {
        var b = this.events,
            c, a;
        for (a in b) {
            if (!b.hasOwnProperty(a)) {
                continue
            }
            c = b[a];
            if (c.isEvent) {
                c.clearListeners()
            }
        }
        this.clearManagedListeners()
    },
    purgeListeners: function () {
        console.warn("MixedCollection: purgeListeners has been deprecated. Please use clearListeners.");
        return this.clearListeners.apply(this, arguments)
    },
    clearManagedListeners: function () {
        var b = this.managedListeners || [],
            d = b.length,
            c, a;
        for (c = 0; c < d; c++) {
            a = b[c];
            a.item.un(a.ename, a.fn, a.scope)
        }
        this.managedListener = []
    },
    purgeManagedListeners: function () {
        console.warn("MixedCollection: purgeManagedListeners has been deprecated. Please use clearManagedListeners.");
        return this.clearManagedListeners.apply(this, arguments)
    },
    addEvents: function (e) {
        var d = this;
        d.events = d.events || {};
        if (Ext.isString(e)) {
            var b = arguments,
                c = b.length;
            while (c--) {
                d.events[b[c]] = d.events[b[c]] || true
            }
        } else {
            Ext.applyIf(d.events, e)
        }
    },
    hasListener: function (a) {
        var b = this.events[a];
        return b.isEvent === true && b.listeners.length > 0
    },
    suspendEvents: function (a) {
        this.eventsSuspended = true;
        if (a && !this.eventQueue) {
            this.eventQueue = []
        }
    },
    resumeEvents: function () {
        var a = this,
            b = a.eventQueue || [];
        a.eventsSuspended = false;
        delete a.eventQueue;
        Ext.each(b, function (c) {
            a.fireEvent.apply(a, c)
        })
    },
    relayEvents: function (b, e, h) {
        h = h || "";
        var g = this,
            a = e.length,
            d, c;

        function f(i) {
            return function () {
                return g.fireEvent.apply(g, [h + i].concat(Array.prototype.slice.call(arguments, 0, -1)))
            }
        }
        for (d = 0, a = e.length; d < a; d++) {
            c = e[d].substr(h.length);
            g.events[c] = g.events[c] || true;
            b.on(c, f(c), g)
        }
    },
    enableBubble: function (a) {
        var b = this;
        if (!Ext.isEmpty(a)) {
            a = Ext.isArray(a) ? a : Ext.toArray(arguments);
            Ext.each(a, function (c) {
                c = c.toLowerCase();
                var d = b.events[c] || true;
                if (Ext.isBoolean(d)) {
                    d = new Ext.util.Event(b, c);
                    b.events[c] = d
                }
                d.bubble = true
            })
        }
    }
});
Ext.override(Ext.util.Observable, {
    on: Ext.util.Observable.prototype.addListener,
    un: Ext.util.Observable.prototype.removeListener,
    mon: Ext.util.Observable.prototype.addManagedListener,
    mun: Ext.util.Observable.prototype.removeManagedListener
});
Ext.util.Observable.releaseCapture = function (a) {
    a.fireEvent = Ext.util.Observable.prototype.fireEvent
};
Ext.util.Observable.capture = function (c, b, a) {
    c.fireEvent = Ext.createInterceptor(c.fireEvent, b, a)
};
Ext.util.Observable.observe = function (a, b) {
    if (a) {
        if (!a.isObservable) {
            Ext.applyIf(a, new Ext.util.Observable());
            Ext.util.Observable.capture(a.prototype, a.fireEvent, a)
        }
        if (typeof b == "object") {
            a.on(b)
        }
        return a
    }
};
Ext.util.Observable.observeClass = Ext.util.Observable.observe;
Ext.util.Event = Ext.extend(Object, (function () {
    function b(e, f, g, d) {
        f.task = new Ext.util.DelayedTask();
        return function () {
            f.task.delay(g.buffer, e, d, Ext.toArray(arguments))
        }
    }
    function a(e, f, g, d) {
        return function () {
            var h = new Ext.util.DelayedTask();
            if (!f.tasks) {
                f.tasks = []
            }
            f.tasks.push(h);
            h.delay(g.delay || 10, e, d, Ext.toArray(arguments))
        }
    }
    function c(e, f, g, d) {
        return function () {
            f.ev.removeListener(f.fn, d);
            return e.apply(d, arguments)
        }
    }
    return {
        isEvent: true,
        constructor: function (e, d) {
            this.name = d;
            this.observable = e;
            this.listeners = []
        },
        addListener: function (f, e, d) {
            var g = this,
                h;
            e = e || g.observable;
            if (!g.isListening(f, e)) {
                h = g.createListener(f, e, d);
                if (g.firing) {
                    g.listeners = g.listeners.slice(0)
                }
                g.listeners.push(h)
            }
        },
        createListener: function (f, e, h) {
            h = h || {};
            e = e || this.observable;
            var g = {
                fn: f,
                scope: e,
                o: h,
                ev: this
            },
                d = f;
            if (h.delay) {
                d = a(d, g, h, e)
            }
            if (h.buffer) {
                d = b(d, g, h, e)
            }
            if (h.single) {
                d = c(d, g, h, e)
            }
            g.fireFn = d;
            return g
        },
        findListener: function (h, g) {
            var f = this.listeners,
                d = f.length,
                j, e;
            while (d--) {
                j = f[d];
                if (j) {
                    e = j.scope;
                    if (j.fn == h && (e == g || e == this.observable)) {
                        return d
                    }
                }
            }
            return -1
        },
        isListening: function (e, d) {
            return this.findListener(e, d) !== -1
        },
        removeListener: function (g, f) {
            var h = this,
                e, i, d;
            e = h.findListener(g, f);
            if (e != -1) {
                i = h.listeners[e];
                if (h.firing) {
                    h.listeners = h.listeners.slice(0)
                }
                if (i.task) {
                    i.task.cancel();
                    delete i.task
                }
                d = i.tasks && i.tasks.length;
                if (d) {
                    while (d--) {
                        i.tasks[d].cancel()
                    }
                    delete i.tasks
                }
                h.listeners.splice(e, 1);
                return true
            }
            return false
        },
        clearListeners: function () {
            var e = this.listeners,
                d = e.length;
            while (d--) {
                this.removeListener(e[d].fn, e[d].scope)
            }
        },
        fire: function () {
            var h = this,
                f = h.listeners,
                g = f.length,
                e, d, j;
            if (g > 0) {
                h.firing = true;
                for (e = 0; e < g; e++) {
                    j = f[e];
                    d = arguments.length ? Array.prototype.slice.call(arguments, 0) : [];
                    if (j.o) {
                        d.push(j.o)
                    }
                    if (j && j.fireFn.apply(j.scope || h.observable, d) === false) {
                        return (h.firing = false)
                    }
                }
            }
            h.firing = false;
            return true
        }
    }
})());
Ext.util.Stateful = Ext.extend(Ext.util.Observable, {
    editing: false,
    dirty: false,
    persistanceProperty: "data",
    constructor: function (a) {
        Ext.applyIf(this, {
            data: {}
        });
        this.modified = {};
        this[this.persistanceProperty] = {};
        Ext.util.Stateful.superclass.constructor.call(this, a)
    },
    get: function (a) {
        return this[this.persistanceProperty][a]
    },
    set: function (g, e) {
        var a = this.fields,
            d = [],
            f, c, b;
        if (arguments.length == 1 && Ext.isObject(g)) {
            for (c in g) {
                if (!g.hasOwnProperty(c)) {
                    continue
                }
                f = a.get(c);
                if (f && f.convert !== f.type.convert) {
                    d.push(c);
                    continue
                }
                this.set(c, g[c])
            }
            for (b = 0; b < d.length; b++) {
                f = d[b];
                this.set(f, g[f])
            }
        } else {
            if (a) {
                f = a.get(g);
                if (f && f.convert) {
                    e = f.convert(e, this)
                }
            }
            this[this.persistanceProperty][g] = e;
            this.dirty = true;
            if (!this.editing) {
                this.afterEdit()
            }
        }
    },
    getChanges: function () {
        var a = this.modified,
            b = {},
            c;
        for (c in a) {
            if (a.hasOwnProperty(c)) {
                b[c] = this[this.persistanceProperty][c]
            }
        }
        return b
    },
    isModified: function (a) {
        return !!(this.modified && this.modified.hasOwnProperty(a))
    },
    setDirty: function () {
        this.dirty = true;
        if (!this.modified) {
            this.modified = {}
        }
        this.fields.each(function (a) {
            this.modified[a.name] = this[this.persistanceProperty][a.name]
        }, this)
    },
    markDirty: function () {
        throw new Error("Stateful: markDirty has been deprecated. Please use setDirty.")
    },
    reject: function (a) {
        var b = this.modified,
            c;
        for (c in b) {
            if (!b.hasOwnProperty(c)) {
                continue
            }
            if (typeof b[c] != "function") {
                this[this.persistanceProperty][c] = b[c]
            }
        }
        this.dirty = false;
        this.editing = false;
        delete this.modified;
        if (a !== true) {
            this.afterReject()
        }
    },
    commit: function (a) {
        this.dirty = false;
        this.editing = false;
        delete this.modified;
        if (a !== true) {
            this.afterCommit()
        }
    },
    copy: function (a) {
        return new this.constructor(Ext.apply({}, this[this.persistanceProperty]), a || this.internalId)
    }
});
Ext.util.HashMap = Ext.extend(Ext.util.Observable, {
    constructor: function (a) {
        this.addEvents("add", "clear", "remove", "replace");
        Ext.util.HashMap.superclass.constructor.call(this, a);
        this.clear(true)
    },
    getCount: function () {
        return this.length
    },
    getData: function (a, b) {
        if (b === undefined) {
            b = a;
            a = this.getKey(b)
        }
        return [a, b]
    },
    getKey: function (a) {
        return a.id
    },
    add: function (a, d) {
        var b = this,
            c;
        if (b.containsKey(a)) {
            throw new Error("This key already exists in the HashMap")
        }
        c = this.getData(a, d);
        a = c[0];
        d = c[1];
        b.map[a] = d;
        ++b.length;
        b.fireEvent("add", b, a, d);
        return d
    },
    replace: function (b, d) {
        var c = this,
            e = c.map,
            a;
        if (!c.containsKey(b)) {
            c.add(b, d)
        }
        a = e[b];
        e[b] = d;
        c.fireEvent("replace", c, b, d, a);
        return d
    },
    remove: function (b) {
        var a = this.findKey(b);
        if (a !== undefined) {
            return this.removeByKey(a)
        }
        return false
    },
    removeByKey: function (a) {
        var b = this,
            c;
        if (b.containsKey(a)) {
            c = b.map[a];
            delete b.map[a];
            --b.length;
            b.fireEvent("remove", b, a, c);
            return true
        }
        return false
    },
    get: function (a) {
        return this.map[a]
    },
    clear: function (a) {
        var b = this;
        b.map = {};
        b.length = 0;
        if (a !== true) {
            b.fireEvent("clear", b)
        }
        return b
    },
    containsKey: function (a) {
        return this.map[a] !== undefined
    },
    contains: function (a) {
        return this.containsKey(this.findKey(a))
    },
    getKeys: function () {
        return this.getArray(true)
    },
    getValues: function () {
        return this.getArray(false)
    },
    getArray: function (d) {
        var a = [],
            b, c = this.map;
        for (b in c) {
            if (c.hasOwnProperty(b)) {
                a.push(d ? b : c[b])
            }
        }
        return a
    },
    each: function (d, c) {
        var a = Ext.apply({}, this.map),
            b, e = this.length;
        c = c || this;
        for (b in a) {
            if (a.hasOwnProperty(b)) {
                if (d.call(c, b, a[b], e) === false) {
                    break
                }
            }
        }
        return this
    },
    clone: function () {
        var c = new Ext.util.HashMap(),
            b = this.map,
            a;
        c.suspendEvents();
        for (a in b) {
            if (b.hasOwnProperty(a)) {
                c.add(a, b[a])
            }
        }
        c.resumeEvents();
        return c
    },
    findKey: function (b) {
        var a, c = this.map;
        for (a in c) {
            if (c.hasOwnProperty(a) && c[a] === b) {
                return a
            }
        }
        return undefined
    }
});
Ext.util.MixedCollection = function (b, a) {
    this.items = [];
    this.map = {};
    this.keys = [];
    this.length = 0;
    this.addEvents("clear", "add", "replace", "remove", "sort");
    this.allowFunctions = b === true;
    if (a) {
        this.getKey = a
    }
    Ext.util.MixedCollection.superclass.constructor.call(this)
};
Ext.extend(Ext.util.MixedCollection, Ext.util.Observable, {
    allowFunctions: false,
    add: function (b, d) {
        var e = d,
            c = b;
        if (arguments.length == 1) {
            e = c;
            c = this.getKey(e)
        }
        if (typeof c != "undefined" && c !== null) {
            var a = this.map[c];
            if (typeof a != "undefined") {
                return this.replace(c, e)
            }
            this.map[c] = e
        }
        this.length++;
        this.items.push(e);
        this.keys.push(c);
        this.fireEvent("add", this.length - 1, e, c);
        return e
    },
    getKey: function (a) {
        return a.id
    },
    replace: function (c, d) {
        if (arguments.length == 1) {
            d = arguments[0];
            c = this.getKey(d)
        }
        var a = this.map[c];
        if (typeof c == "undefined" || c === null || typeof a == "undefined") {
            return this.add(c, d)
        }
        var b = this.indexOfKey(c);
        this.items[b] = d;
        this.map[c] = d;
        this.fireEvent("replace", c, a, d);
        return d
    },
    addAll: function (e) {
        if (arguments.length > 1 || Ext.isArray(e)) {
            var b = arguments.length > 1 ? arguments : e;
            for (var d = 0, a = b.length; d < a; d++) {
                this.add(b[d])
            }
        } else {
            for (var c in e) {
                if (!e.hasOwnProperty(c)) {
                    continue
                }
                if (this.allowFunctions || typeof e[c] != "function") {
                    this.add(c, e[c])
                }
            }
        }
    },
    each: function (e, d) {
        var b = [].concat(this.items);
        for (var c = 0, a = b.length; c < a; c++) {
            if (e.call(d || b[c], b[c], c, a) === false) {
                break
            }
        }
    },
    eachKey: function (d, c) {
        for (var b = 0, a = this.keys.length; b < a; b++) {
            d.call(c || window, this.keys[b], this.items[b], b, a)
        }
    },
    findBy: function (d, c) {
        for (var b = 0, a = this.items.length; b < a; b++) {
            if (d.call(c || window, this.items[b], this.keys[b])) {
                return this.items[b]
            }
        }
        return null
    },
    insert: function (a, b, d) {
        var c = b,
            e = d;
        if (arguments.length == 2) {
            e = c;
            c = this.getKey(e)
        }
        if (this.containsKey(c)) {
            this.suspendEvents();
            this.removeByKey(c);
            this.resumeEvents()
        }
        if (a >= this.length) {
            return this.add(c, e)
        }
        this.length++;
        this.items.splice(a, 0, e);
        if (typeof c != "undefined" && c !== null) {
            this.map[c] = e
        }
        this.keys.splice(a, 0, c);
        this.fireEvent("add", a, e, c);
        return e
    },
    remove: function (a) {
        return this.removeAt(this.indexOf(a))
    },
    removeAll: function (a) {
        Ext.each(a || [], function (b) {
            this.remove(b)
        }, this);
        return this
    },
    removeAt: function (a) {
        if (a < this.length && a >= 0) {
            this.length--;
            var c = this.items[a];
            this.items.splice(a, 1);
            var b = this.keys[a];
            if (typeof b != "undefined") {
                delete this.map[b]
            }
            this.keys.splice(a, 1);
            this.fireEvent("remove", c, b);
            return c
        }
        return false
    },
    removeByKey: function (a) {
        return this.removeAt(this.indexOfKey(a))
    },
    removeKey: function () {
        console.warn("MixedCollection: removeKey has been deprecated. Please use removeByKey.");
        return this.removeByKey.apply(this, arguments)
    },
    getCount: function () {
        return this.length
    },
    indexOf: function (a) {
        return this.items.indexOf(a)
    },
    indexOfKey: function (a) {
        return this.keys.indexOf(a)
    },
    get: function (b) {
        var a = this.map[b],
            c = a !== undefined ? a : (typeof b == "number") ? this.items[b] : undefined;
        return typeof c != "function" || this.allowFunctions ? c : null
    },
    item: function () {
        console.warn("MixedCollection: item has been deprecated. Please use get.");
        return this.get.apply(this, arguments)
    },
    getAt: function (a) {
        return this.items[a]
    },
    itemAt: function () {
        console.warn("MixedCollection: itemAt has been deprecated. Please use getAt.");
        return this.getAt.apply(this, arguments)
    },
    getByKey: function (a) {
        return this.map[a]
    },
    key: function () {
        console.warn("MixedCollection: key has been deprecated. Please use getByKey.");
        return this.getByKey.apply(this, arguments)
    },
    contains: function (a) {
        return this.indexOf(a) != -1
    },
    containsKey: function (a) {
        return typeof this.map[a] != "undefined"
    },
    clear: function () {
        this.length = 0;
        this.items = [];
        this.keys = [];
        this.map = {};
        this.fireEvent("clear")
    },
    first: function () {
        return this.items[0]
    },
    last: function () {
        return this.items[this.length - 1]
    },
    _sort: function (j, a, h) {
        var d, e, b = String(a).toUpperCase() == "DESC" ? -1 : 1,
            g = [],
            k = this.keys,
            f = this.items;
        h = h ||
        function (i, c) {
            return i - c
        };
        for (d = 0, e = f.length; d < e; d++) {
            g[g.length] = {
                key: k[d],
                value: f[d],
                index: d
            }
        }
        g.sort(function (i, c) {
            var l = h(i[j], c[j]) * b;
            if (l === 0) {
                l = (i.index < c.index ? -1 : 1)
            }
            return l
        });
        for (d = 0, e = g.length; d < e; d++) {
            f[d] = g[d].value;
            k[d] = g[d].key
        }
        this.fireEvent("sort", this)
    },
    sort: function (c, e) {
        var d = c;
        if (Ext.isString(c)) {
            d = [new Ext.util.Sorter({
                property: c,
                direction: e || "ASC"
            })]
        } else {
            if (c instanceof Ext.util.Sorter) {
                d = [c]
            } else {
                if (Ext.isObject(c)) {
                    d = [new Ext.util.Sorter(c)]
                }
            }
        }
        var b = d.length;
        if (b == 0) {
            return
        }
        var a = function (h, g) {
                var f = d[0].sort(h, g),
                    k = d.length,
                    j;
                for (j = 1; j < k; j++) {
                    f = f || d[j].sort.call(this, h, g)
                }
                return f
            };
        this.sortBy(a)
    },
    sortBy: function (c) {
        var b = this.items,
            f = this.keys,
            e = b.length,
            a = [],
            d;
        for (d = 0; d < e; d++) {
            a[d] = {
                key: f[d],
                value: b[d],
                index: d
            }
        }
        a.sort(function (h, g) {
            var i = c(h.value, g.value);
            if (i === 0) {
                i = (h.index < g.index ? -1 : 1)
            }
            return i
        });
        for (d = 0; d < e; d++) {
            b[d] = a[d].value;
            f[d] = a[d].key
        }
        this.fireEvent("sort", this)
    },
    reorder: function (d) {
        this.suspendEvents();
        var b = this.items,
            c = 0,
            f = b.length,
            a = [],
            e = [],
            g;
        for (g in d) {
            a[d[g]] = b[g]
        }
        for (c = 0; c < f; c++) {
            if (d[c] == undefined) {
                e.push(b[c])
            }
        }
        for (c = 0; c < f; c++) {
            if (a[c] == undefined) {
                a[c] = e.shift()
            }
        }
        this.clear();
        this.addAll(a);
        this.resumeEvents();
        this.fireEvent("sort", this)
    },
    sortByKey: function (a, b) {
        this._sort("key", a, b ||
        function (d, c) {
            var f = String(d).toUpperCase(),
                e = String(c).toUpperCase();
            return f > e ? 1 : (f < e ? -1 : 0)
        })
    },
    keySort: function () {
        console.warn("MixedCollection: keySort has been deprecated. Please use sortByKey.");
        return this.sortByKey.apply(this, arguments)
    },
    getRange: function (e, a) {
        var b = this.items;
        if (b.length < 1) {
            return []
        }
        e = e || 0;
        a = Math.min(typeof a == "undefined" ? this.length - 1 : a, this.length - 1);
        var c, d = [];
        if (e <= a) {
            for (c = e; c <= a; c++) {
                d[d.length] = b[c]
            }
        } else {
            for (c = e; c >= a; c--) {
                d[d.length] = b[c]
            }
        }
        return d
    },
    filter: function (d, c, f, a) {
        var b = [];
        if (Ext.isString(d)) {
            b.push(new Ext.util.Filter({
                property: d,
                value: c,
                anyMatch: f,
                caseSensitive: a
            }))
        } else {
            if (Ext.isArray(d) || d instanceof Ext.util.Filter) {
                b = b.concat(d)
            }
        }
        var e = function (g) {
                var m = true,
                    n = b.length,
                    h;
                for (h = 0; h < n; h++) {
                    var l = b[h],
                        k = l.filterFn,
                        j = l.scope;
                    m = m && k.call(j, g)
                }
                return m
            };
        return this.filterBy(e)
    },
    filterBy: function (e, d) {
        var a = new Ext.util.MixedCollection(),
            g = this.keys,
            b = this.items,
            f = b.length,
            c;
        a.getKey = this.getKey;
        for (c = 0; c < f; c++) {
            if (e.call(d || this, b[c], g[c])) {
                a.add(g[c], b[c])
            }
        }
        return a
    },
    findIndex: function (c, b, e, d, a) {
        if (Ext.isEmpty(b, false)) {
            return -1
        }
        b = this.createValueMatcher(b, d, a);
        return this.findIndexBy(function (f) {
            return f && b.test(f[c])
        }, null, e)
    },
    findIndexBy: function (f, e, g) {
        var b = this.keys,
            d = this.items;
        for (var c = (g || 0), a = d.length; c < a; c++) {
            if (f.call(e || this, d[c], b[c])) {
                return c
            }
        }
        return -1
    },
    createValueMatcher: function (c, e, a, b) {
        if (!c.exec) {
            var d = Ext.util.Format.escapeRegex;
            c = String(c);
            if (e === true) {
                c = d(c)
            } else {
                c = "^" + d(c);
                if (b === true) {
                    c += "$"
                }
            }
            c = new RegExp(c, a ? "" : "i")
        }
        return c
    },
    clone: function () {
        var e = new Ext.util.MixedCollection();
        var b = this.keys,
            d = this.items;
        for (var c = 0, a = d.length; c < a; c++) {
            e.add(b[c], d[c])
        }
        e.getKey = this.getKey;
        return e
    }
});
Ext.AbstractManager = Ext.extend(Object, {
    typeName: "type",
    constructor: function (a) {
        Ext.apply(this, a || {});
        this.all = new Ext.util.HashMap();
        this.types = {}
    },
    get: function (a) {
        return this.all.get(a)
    },
    register: function (a) {
        this.all.add(a)
    },
    unregister: function (a) {
        this.all.remove(a)
    },
    registerType: function (b, a) {
        this.types[b] = a;
        a[this.typeName] = b
    },
    isRegistered: function (a) {
        return this.types[a] !== undefined
    },
    create: function (a, d) {
        var b = a[this.typeName] || a.type || d,
            c = this.types[b];
        if (c == undefined) {
            throw new Error(Ext.util.Format.format("The '{0}' type has not been registered with this manager", b))
        }
        return new c(a)
    },
    onAvailable: function (d, c, b) {
        var a = this.all;
        a.on("add", function (e, f) {
            if (f.id == d) {
                c.call(b || f, f);
                a.un("add", c, b)
            }
        })
    },
    each: function (b, a) {
        this.all.each(b, a || this)
    },
    getCount: function () {
        return this.all.getCount()
    }
});
Ext.util.DelayedTask = function (d, c, a) {
    var e = this,
        f, b = function () {
            clearInterval(f);
            f = null;
            d.apply(c, a || [])
        };
    this.delay = function (h, j, i, g) {
        e.cancel();
        d = j || d;
        c = i || c;
        a = g || a;
        f = setInterval(b, h)
    };
    this.cancel = function () {
        if (f) {
            clearInterval(f);
            f = null
        }
    }
};
Ext.util.GeoLocation = Ext.extend(Ext.util.Observable, {
    autoUpdate: true,
    latitude: null,
    longitude: null,
    accuracy: null,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    speed: null,
    timestamp: null,
    allowHighAccuracy: false,
    timeout: Infinity,
    maximumAge: 0,
    setMaximumAge: function (a) {
        this.maximumAge = a;
        this.setAutoUpdate(this.autoUpdate)
    },
    setTimeout: function (a) {
        this.timeout = a;
        this.setAutoUpdate(this.autoUpdate)
    },
    setAllowHighAccuracy: function (a) {
        this.allowHighAccuracy = a;
        this.setAutoUpdate(this.autoUpdate)
    },
    provider: null,
    watchOperation: null,
    constructor: function (a) {
        Ext.apply(this, a);
        this.coords = this;
        if (Ext.supports.GeoLocation) {
            this.provider = this.provider || (navigator.geolocation ? navigator.geolocation : (window.google || {}).gears ? google.gears.factory.create("beta.geolocation") : null)
        }
        this.addEvents("update", "locationerror", "locationupdate");
        Ext.util.GeoLocation.superclass.constructor.call(this);
        if (this.autoUpdate) {
            var b = this;
            setTimeout(function () {
                b.setAutoUpdate(b.autoUpdate)
            }, 0)
        }
    },
    setAutoUpdate: function (a) {
        if (this.watchOperation !== null) {
            this.provider.clearWatch(this.watchOperation);
            this.watchOperation = null
        }
        if (!a) {
            return true
        }
        if (!Ext.supports.GeoLocation) {
            this.fireEvent("locationerror", this, false, false, true, null);
            return false
        }
        try {
            this.watchOperation = this.provider.watchPosition(Ext.createDelegate(this.fireUpdate, this), Ext.createDelegate(this.fireError, this), this.parseOptions())
        } catch (b) {
            this.autoUpdate = false;
            this.fireEvent("locationerror", this, false, false, true, b.message);
            return false
        }
        return true
    },
    updateLocation: function (g, a, c) {
        var b = this;
        var f = function (h, e) {
                if (e) {
                    b.fireError(e)
                } else {
                    b.fireEvent("locationerror", b, false, false, true, h)
                }
                if (g) {
                    g.call(a || b, null, b)
                }
                b.fireEvent("update", false, b)
            };
        if (!Ext.supports.GeoLocation) {
            setTimeout(function () {
                f(null)
            }, 0);
            return
        }
        try {
            this.provider.getCurrentPosition(function (e) {
                b.fireUpdate(e);
                if (g) {
                    g.call(a || b, b, b)
                }
                b.fireEvent("update", b, b)
            }, function (e) {
                f(null, e)
            }, c ? c : this.parseOptions())
        } catch (d) {
            setTimeout(function () {
                f(d.message)
            }, 0)
        }
    },
    fireUpdate: function (a) {
        this.timestamp = a.timestamp;
        this.latitude = a.coords.latitude;
        this.longitude = a.coords.longitude;
        this.accuracy = a.coords.accuracy;
        this.altitude = a.coords.altitude;
        this.altitudeAccuracy = a.coords.altitudeAccuracy;
        this.heading = typeof a.coords.heading == "undefined" ? null : a.coords.heading;
        this.speed = typeof a.coords.speed == "undefined" ? null : a.coords.speed;
        this.fireEvent("locationupdate", this)
    },
    fireError: function (a) {
        this.fireEvent("locationerror", this, a.code == a.TIMEOUT, a.code == a.PERMISSION_DENIED, a.code == a.POSITION_UNAVAILABLE, a.message == undefined ? null : a.message)
    },
    parseOptions: function () {
        var a = {
            maximumAge: this.maximumAge,
            allowHighAccuracy: this.allowHighAccuracy
        };
        if (this.timeout !== Infinity) {
            a.timeout = this.timeout
        }
        return a
    },
    getLocation: function (c, a) {
        var b = this;
        if (this.latitude !== null) {
            c.call(a || b, b, b)
        } else {
            b.updateLocation(c, a)
        }
    }
});
Ext.util.Region = Ext.extend(Object, {
    constructor: function (d, f, a, c) {
        var e = this;
        e.top = d;
        e[1] = d;
        e.right = f;
        e.bottom = a;
        e.left = c;
        e[0] = c
    },
    contains: function (b) {
        var a = this;
        return (b.left >= a.left && b.right <= a.right && b.top >= a.top && b.bottom <= a.bottom)
    },
    intersect: function (g) {
        var f = this,
            d = Math.max(f.top, g.top),
            e = Math.min(f.right, g.right),
            a = Math.min(f.bottom, g.bottom),
            c = Math.max(f.left, g.left);
        if (a > d && e > c) {
            return new Ext.util.Region(d, e, a, c)
        } else {
            return false
        }
    },
    union: function (g) {
        var f = this,
            d = Math.min(f.top, g.top),
            e = Math.max(f.right, g.right),
            a = Math.max(f.bottom, g.bottom),
            c = Math.min(f.left, g.left);
        return new Ext.util.Region(d, e, a, c)
    },
    constrainTo: function (b) {
        var a = this,
            c = Ext.util.Numbers.constrain;
        a.top = c(a.top, b.top, b.bottom);
        a.bottom = c(a.bottom, b.top, b.bottom);
        a.left = c(a.left, b.left, b.right);
        a.right = c(a.right, b.left, b.right);
        return a
    },
    adjust: function (d, f, a, c) {
        var e = this;
        e.top += d;
        e.left += c;
        e.right += f;
        e.bottom += a;
        return e
    },
    getOutOfBoundOffset: function (a, b) {
        if (!Ext.isObject(a)) {
            if (a == "x") {
                return this.getOutOfBoundOffsetX(b)
            } else {
                return this.getOutOfBoundOffsetY(b)
            }
        } else {
            b = a;
            var c = new Ext.util.Offset();
            c.x = this.getOutOfBoundOffsetX(b.x);
            c.y = this.getOutOfBoundOffsetY(b.y);
            return c
        }
    },
    getOutOfBoundOffsetX: function (a) {
        if (a <= this.left) {
            return this.left - a
        } else {
            if (a >= this.right) {
                return this.right - a
            }
        }
        return 0
    },
    getOutOfBoundOffsetY: function (a) {
        if (a <= this.top) {
            return this.top - a
        } else {
            if (a >= this.bottom) {
                return this.bottom - a
            }
        }
        return 0
    },
    isOutOfBound: function (a, b) {
        if (!Ext.isObject(a)) {
            if (a == "x") {
                return this.isOutOfBoundX(b)
            } else {
                return this.isOutOfBoundY(b)
            }
        } else {
            b = a;
            return (this.isOutOfBoundX(b.x) || this.isOutOfBoundY(b.y))
        }
    },
    isOutOfBoundX: function (a) {
        return (a < this.left || a > this.right)
    },
    isOutOfBoundY: function (a) {
        return (a < this.top || a > this.bottom)
    },
    restrict: function (b, d, a) {
        if (Ext.isObject(b)) {
            var c;
            a = d;
            d = b;
            if (d.copy) {
                c = d.copy()
            } else {
                c = {
                    x: d.x,
                    y: d.y
                }
            }
            c.x = this.restrictX(d.x, a);
            c.y = this.restrictY(d.y, a);
            return c
        } else {
            if (b == "x") {
                return this.restrictX(d, a)
            } else {
                return this.restrictY(d, a)
            }
        }
    },
    restrictX: function (b, a) {
        if (!a) {
            a = 1
        }
        if (b <= this.left) {
            b -= (b - this.left) * a
        } else {
            if (b >= this.right) {
                b -= (b - this.right) * a
            }
        }
        return b
    },
    restrictY: function (b, a) {
        if (!a) {
            a = 1
        }
        if (b <= this.top) {
            b -= (b - this.top) * a
        } else {
            if (b >= this.bottom) {
                b -= (b - this.bottom) * a
            }
        }
        return b
    },
    getSize: function () {
        return {
            width: this.right - this.left,
            height: this.bottom - this.top
        }
    },
    copy: function () {
        return new Ext.util.Region(this.top, this.right, this.bottom, this.left)
    },
    toString: function () {
        return "Region[" + this.top + "," + this.right + "," + this.bottom + "," + this.left + "]"
    },
    translateBy: function (a) {
        this.left += a.x;
        this.right += a.x;
        this.top += a.y;
        this.bottom += a.y;
        return this
    },
    round: function () {
        this.top = Math.round(this.top);
        this.right = Math.round(this.right);
        this.bottom = Math.round(this.bottom);
        this.left = Math.round(this.left);
        return this
    },
    equals: function (a) {
        return (this.top == a.top && this.right == a.right && this.bottom == a.bottom && this.left == a.left)
    }
});
Ext.util.Region.getRegion = function (a) {
    return Ext.fly(a).getPageBox(true)
};
Ext.util.Region.from = function (a) {
    return new Ext.util.Region(a.top, a.right, a.bottom, a.left)
};
Ext.util.Point = Ext.extend(Object, {
    constructor: function (a, b) {
        this.x = (a != null && !isNaN(a)) ? a : 0;
        this.y = (b != null && !isNaN(b)) ? b : 0;
        return this
    },
    copy: function () {
        return new Ext.util.Point(this.x, this.y)
    },
    copyFrom: function (a) {
        this.x = a.x;
        this.y = a.y;
        return this
    },
    toString: function () {
        return "Point[" + this.x + "," + this.y + "]"
    },
    equals: function (a) {
        return (this.x == a.x && this.y == a.y)
    },
    isWithin: function (b, a) {
        if (!Ext.isObject(a)) {
            a = {
                x: a
            };
            a.y = a.x
        }
        return (this.x <= b.x + a.x && this.x >= b.x - a.x && this.y <= b.y + a.y && this.y >= b.y - a.y)
    },
    translate: function (a, b) {
        if (a != null && !isNaN(a)) {
            this.x += a
        }
        if (b != null && !isNaN(b)) {
            this.y += b
        }
    },
    roundedEquals: function (a) {
        return (Math.round(this.x) == Math.round(a.x) && Math.round(this.y) == Math.round(a.y))
    }
});
Ext.util.Point.fromEvent = function (c) {
    var b = (c.changedTouches && c.changedTouches.length > 0) ? c.changedTouches[0] : c;
    return new Ext.util.Point(b.pageX, b.pageY)
};
Ext.util.Offset = Ext.extend(Object, {
    constructor: function (a, b) {
        this.x = (a != null && !isNaN(a)) ? a : 0;
        this.y = (b != null && !isNaN(b)) ? b : 0;
        return this
    },
    copy: function () {
        return new Ext.util.Offset(this.x, this.y)
    },
    copyFrom: function (a) {
        this.x = a.x;
        this.y = a.y
    },
    toString: function () {
        return "Offset[" + this.x + "," + this.y + "]"
    },
    equals: function (a) {
        if (!(a instanceof Ext.util.Offset)) {
            throw new Error("offset must be an instance of Ext.util.Offset")
        }
        return (this.x == a.x && this.y == a.y)
    },
    round: function (b) {
        if (!isNaN(b)) {
            var a = Math.pow(10, b);
            this.x = Math.round(this.x * a) / a;
            this.y = Math.round(this.y * a) / a
        } else {
            this.x = Math.round(this.x);
            this.y = Math.round(this.y)
        }
    },
    isZero: function () {
        return this.x == 0 && this.y == 0
    }
});
Ext.util.Offset.fromObject = function (a) {
    return new Ext.util.Offset(a.x, a.y)
};
Ext.Template = Ext.extend(Object, {
    constructor: function (d) {
        var f = this,
            b = arguments,
            a = [],
            g, c, e;
        f.initialConfig = {};
        if (Ext.isArray(d)) {
            d = d.join("")
        } else {
            if (b.length > 1) {
                for (c = 0, e = b.length; c < e; c++) {
                    g = b[c];
                    if (typeof g == "object") {
                        Ext.apply(f.initialConfig, g);
                        Ext.apply(f, g)
                    } else {
                        a.push(g)
                    }
                }
                d = a.join("")
            }
        }
        f.html = d;
        if (f.compiled) {
            f.compile()
        }
    },
    isTemplate: true,
    disableFormats: false,
    re: /\{([\w-]+)(?:\:([\w\.]*)(?:\((.*?)?\))?)?\}/g,
    applyTemplate: function (a) {
        var f = this,
            c = f.disableFormats !== true,
            e = Ext.util.Format,
            b = f;
        if (f.compiled) {
            return f.compiled(a)
        }
        function d(g, i, j, h) {
            if (j && c) {
                if (h) {
                    h = [a[i]].concat(new Function("return [" + h + "];")())
                } else {
                    h = [a[i]]
                }
                if (j.substr(0, 5) == "this.") {
                    return b[j.substr(5)].apply(b, h)
                } else {
                    return e[j].apply(e, h)
                }
            } else {
                return a[i] !== undefined ? a[i] : ""
            }
        }
        return f.html.replace(f.re, d)
    },
    set: function (a, c) {
        var b = this;
        b.html = a;
        b.compiled = null;
        return c ? b.compile() : b
    },
    compileARe: /\\/g,
    compileBRe: /(\r\n|\n)/g,
    compileCRe: /'/g,
    compile: function () {
        var me = this,
            fm = Ext.util.Format,
            useFormat = me.disableFormats !== true,
            body, bodyReturn;

        function fn(m, name, format, args) {
            if (format && useFormat) {
                args = args ? "," + args : "";
                if (format.substr(0, 5) != "this.") {
                    format = "fm." + format + "("
                } else {
                    format = "this." + format.substr(5) + "("
                }
            } else {
                args = "";
                format = "(values['" + name + "'] == undefined ? '' : "
            }
            return "'," + format + "values['" + name + "']" + args + ") ,'"
        }
        bodyReturn = me.html.replace(me.compileARe, "\\\\").replace(me.compileBRe, "\\n").replace(me.compileCRe, "\\'").replace(me.re, fn);
        body = "this.compiled = function(values){ return ['" + bodyReturn + "'].join('');};";
        eval(body);
        return me
    },
    insertFirst: function (b, a, c) {
        return this.doInsert("afterBegin", b, a, c)
    },
    insertBefore: function (b, a, c) {
        return this.doInsert("beforeBegin", b, a, c)
    },
    insertAfter: function (b, a, c) {
        return this.doInsert("afterEnd", b, a, c)
    },
    append: function (b, a, c) {
        return this.doInsert("beforeEnd", b, a, c)
    },
    doInsert: function (c, e, b, a) {
        e = Ext.getDom(e);
        var d = Ext.DomHelper.insertHtml(c, e, this.applyTemplate(b));
        return a ? Ext.get(d, true) : d
    },
    overwrite: function (b, a, c) {
        b = Ext.getDom(b);
        b.innerHTML = this.applyTemplate(a);
        return c ? Ext.get(b.firstChild, true) : b.firstChild
    }
});
Ext.Template.prototype.apply = Ext.Template.prototype.applyTemplate;
Ext.Template.from = function (b, a) {
    b = Ext.getDom(b);
    return new Ext.Template(b.value || b.innerHTML, a || "")
};
Ext.XTemplate = Ext.extend(Ext.Template, {
    argsRe: /<tpl\b[^>]*>((?:(?=([^<]+))\2|<(?!tpl\b[^>]*>))*?)<\/tpl>/,
    nameRe: /^<tpl\b[^>]*?for="(.*?)"/,
    ifRe: /^<tpl\b[^>]*?if="(.*?)"/,
    execRe: /^<tpl\b[^>]*?exec="(.*?)"/,
    constructor: function () {
        Ext.XTemplate.superclass.constructor.apply(this, arguments);
        var y = this,
            h = y.html,
            v = y.argsRe,
            c = y.nameRe,
            t = y.ifRe,
            x = y.execRe,
            o = 0,
            j = [],
            n = "values",
            w = "parent",
            k = "xindex",
            l = "xcount",
            d = "return ",
            b = "with(values){ ",
            p, f, u, a, e, g, q, z, s;
        h = ["<tpl>", h, "</tpl>"].join("");
        while ((p = h.match(v))) {
            e = null;
            g = null;
            q = null;
            f = p[0].match(c);
            u = p[0].match(t);
            a = p[0].match(x);
            e = u ? u[1] : null;
            if (e) {
                g = new Function(n, w, k, l, b + "try{" + d + Ext.util.Format.htmlDecode(e) + ";}catch(e){return;}}")
            }
            e = a ? a[1] : null;
            if (e) {
                q = new Function(n, w, k, l, b + Ext.util.Format.htmlDecode(e) + ";}")
            }
            z = f ? f[1] : null;
            if (z) {
                if (z === ".") {
                    z = n
                } else {
                    if (z === "..") {
                        z = w
                    }
                }
                z = new Function(n, w, "try{" + b + d + z + ";}}catch(e){return;}")
            }
            j.push({
                id: o,
                target: z,
                exec: q,
                test: g,
                body: p[1] || ""
            });
            h = h.replace(p[0], "{xtpl" + o + "}");
            o = o + 1
        }
        for (s = j.length - 1; s >= 0; --s) {
            y.compileTpl(j[s])
        }
        y.master = j[j.length - 1];
        y.tpls = j
    },
    applySubTemplate: function (g, a, c, e, f) {
        var d = this,
            b = d.tpls[g];
        return b.compiled.call(d, a, c, e, f)
    },
    codeRe: /\{\[((?:\\\]|.|\n)*?)\]\}/g,
    re: /\{([\w-\.\#]+)(?:\:([\w\.]*)(?:\((.*?)?\))?)?(\s?[\+\-\*\/]\s?[\d\.\+\-\*\/\(\)]+)?\}/g,
    compileTpl: function (tpl) {
        var fm = Ext.util.Format,
            me = this,
            useFormat = me.disableFormats !== true,
            body, bodyReturn, evaluatedFn;

        function fn(m, name, format, args, math) {
            var v;
            if (name.substr(0, 4) == "xtpl") {
                return "',this.applySubTemplate(" + name.substr(4) + ", values, parent, xindex, xcount),'"
            }
            if (name == ".") {
                v = 'typeof values == "string" ? values : ""'
            } else {
                if (name == "#") {
                    v = "xindex"
                } else {
                    if (name.substr(0, 7) == "parent.") {
                        v = name
                    } else {
                        if (name.indexOf(".") != -1) {
                            v = "values." + name
                        } else {
                            v = "values['" + name + "']"
                        }
                    }
                }
            }
            if (math) {
                v = "(" + v + math + ")"
            }
            if (format && useFormat) {
                args = args ? "," + args : "";
                if (format.substr(0, 5) != "this.") {
                    format = "fm." + format + "("
                } else {
                    format = "this." + format.substr(5) + "("
                }
            } else {
                args = "";
                format = "(" + v + " === undefined ? '' : "
            }
            return "'," + format + v + args + "),'"
        }
        function codeFn(m, code) {
            return "',(" + code.replace(me.compileARe, "'") + "),'"
        }
        bodyReturn = tpl.body.replace(me.compileBRe, "\\n").replace(me.compileCRe, "\\'").replace(me.re, fn).replace(me.codeRe, codeFn);
        body = "evaluatedFn = function(values, parent, xindex, xcount){return ['" + bodyReturn + "'].join('');};";
        eval(body);
        tpl.compiled = function (values, parent, xindex, xcount) {
            var vs, length, buffer, i;
            if (tpl.test && !tpl.test.call(me, values, parent, xindex, xcount)) {
                return ""
            }
            vs = tpl.target ? tpl.target.call(me, values, parent) : values;
            if (!vs) {
                return ""
            }
            parent = tpl.target ? values : parent;
            if (tpl.target && Ext.isArray(vs)) {
                buffer = [], length = vs.length;
                if (tpl.exec) {
                    for (i = 0; i < length; i++) {
                        buffer[buffer.length] = evaluatedFn.call(me, vs[i], parent, i + 1, length);
                        tpl.exec.call(me, vs[i], parent, i + 1, length)
                    }
                } else {
                    for (i = 0; i < length; i++) {
                        buffer[buffer.length] = evaluatedFn.call(me, vs[i], parent, i + 1, length)
                    }
                }
                return buffer.join("")
            }
            if (tpl.exec) {
                tpl.exec.call(me, vs, parent, xindex, xcount)
            }
            return evaluatedFn.call(me, vs, parent, xindex, xcount)
        };
        return this
    },
    applyTemplate: function (a) {
        return this.master.compiled.call(this, a, {}, 1, 1)
    },
    compile: function () {
        return this
    }
});
Ext.XTemplate.prototype.apply = Ext.XTemplate.prototype.applyTemplate;
Ext.XTemplate.from = function (b, a) {
    b = Ext.getDom(b);
    return new Ext.XTemplate(b.value || b.innerHTML, a || {})
};
Ext.util.Sorter = Ext.extend(Object, {
    direction: "ASC",
    constructor: function (a) {
        Ext.apply(this, a);
        if (this.property == undefined && this.sorterFn == undefined) {
            throw "A Sorter requires either a property or a sorter function"
        }
        this.sort = this.createSortFunction(this.sorterFn || this.defaultSorterFn)
    },
    createSortFunction: function (b) {
        var c = this,
            d = c.property,
            e = c.direction,
            a = e.toUpperCase() == "DESC" ? -1 : 1;
        return function (g, f) {
            return a * b.call(c, g, f)
        }
    },
    defaultSorterFn: function (b, a) {
        var d = this.getRoot(b)[this.property],
            c = this.getRoot(a)[this.property];
        return d > c ? 1 : (d < c ? -1 : 0)
    },
    getRoot: function (a) {
        return this.root == undefined ? a : a[this.root]
    }
});
Ext.util.Filter = Ext.extend(Object, {
    anyMatch: false,
    exactMatch: false,
    caseSensitive: false,
    constructor: function (a) {
        Ext.apply(this, a);
        this.filter = this.filter || this.filterFn;
        if (this.filter == undefined) {
            if (this.property == undefined || this.value == undefined) {} else {
                this.filter = this.createFilterFn()
            }
            this.filterFn = this.filter
        }
    },
    createFilterFn: function () {
        var a = this,
            c = a.createValueMatcher(),
            b = a.property;
        return function (d) {
            return c.test(a.getRoot.call(a, d)[b])
        }
    },
    getRoot: function (a) {
        return this.root == undefined ? a : a[this.root]
    },
    createValueMatcher: function () {
        var d = this,
            e = d.value,
            f = d.anyMatch,
            c = d.exactMatch,
            a = d.caseSensitive,
            b = Ext.util.Format.escapeRegex;
        if (!e.exec) {
            e = String(e);
            if (f === true) {
                e = b(e)
            } else {
                e = "^" + b(e);
                if (c === true) {
                    e += "$"
                }
            }
            e = new RegExp(e, a ? "" : "i")
        }
        return e
    }
});
Ext.util.Functions = {
    createInterceptor: function (d, c, b, a) {
        var e = d;
        if (!Ext.isFunction(c)) {
            return d
        } else {
            return function () {
                var g = this,
                    f = arguments;
                c.target = g;
                c.method = d;
                return (c.apply(b || g || window, f) !== false) ? d.apply(g || window, f) : a || null
            }
        }
    },
    createDelegate: function (c, d, b, a) {
        if (!Ext.isFunction(c)) {
            return c
        }
        return function () {
            var f = b || arguments;
            if (a === true) {
                f = Array.prototype.slice.call(arguments, 0);
                f = f.concat(b)
            } else {
                if (Ext.isNumber(a)) {
                    f = Array.prototype.slice.call(arguments, 0);
                    var e = [a, 0].concat(b);
                    Array.prototype.splice.apply(f, e)
                }
            }
            return c.apply(d || window, f)
        }
    },
    defer: function (d, c, e, b, a) {
        d = Ext.util.Functions.createDelegate(d, e, b, a);
        if (c > 0) {
            return setTimeout(d, c)
        }
        d();
        return 0
    },
    createSequence: function (c, b, a) {
        if (!Ext.isFunction(b)) {
            return c
        } else {
            return function () {
                var d = c.apply(this || window, arguments);
                b.apply(a || this || window, arguments);
                return d
            }
        }
    }
};
Ext.defer = Ext.util.Functions.defer;
Ext.createInterceptor = Ext.util.Functions.createInterceptor;
Ext.createSequence = Ext.util.Functions.createSequence;
Ext.createDelegate = Ext.util.Functions.createDelegate;
Ext.util.Date = {
    getElapsed: function (b, a) {
        return Math.abs(b - (a || new Date))
    }
};
Ext.util.Numbers = {
    toFixedBroken: (0.9).toFixed() != 1,
    constrain: function (c, b, a) {
        c = parseFloat(c);
        if (!isNaN(b)) {
            c = Math.max(c, b)
        }
        if (!isNaN(a)) {
            c = Math.min(c, a)
        }
        return c
    },
    toFixed: function (c, a) {
        if (Ext.util.Numbers.toFixedBroken) {
            a = a || 0;
            var b = Math.pow(10, a);
            return Math.round(c * b) / b
        }
        return c.toFixed(a)
    }
};
Ext.util.Format = {
    defaultDateFormat: "m/d/Y",
    escapeRe: /('|\\)/g,
    trimRe: /^[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u2028\u2029\u202f\u205f\u3000]+|[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u2028\u2029\u202f\u205f\u3000]+$/g,
    formatRe: /\{(\d+)\}/g,
    escapeRegexRe: /([-.*+?^${}()|[\]\/\\])/g,
    ellipsis: function (c, a, d) {
        if (c && c.length > a) {
            if (d) {
                var e = c.substr(0, a - 2),
                    b = Math.max(e.lastIndexOf(" "), e.lastIndexOf("."), e.lastIndexOf("!"), e.lastIndexOf("?"));
                if (b != -1 && b >= (a - 15)) {
                    return e.substr(0, b) + "..."
                }
            }
            return c.substr(0, a - 3) + "..."
        }
        return c
    },
    escapeRegex: function (a) {
        return a.replace(Ext.util.Format.escapeRegexRe, "\\$1")
    },
    escape: function (a) {
        return a.replace(Ext.util.Format.escapeRe, "\\$1")
    },
    toggle: function (b, c, a) {
        return b == c ? a : c
    },
    trim: function (a) {
        return a.replace(Ext.util.Format.trimRe, "")
    },
    leftPad: function (d, b, c) {
        var a = String(d);
        c = c || " ";
        while (a.length < b) {
            a = c + a
        }
        return a
    },
    format: function (b) {
        var a = Ext.toArray(arguments, 1);
        return b.replace(Ext.util.Format.formatRe, function (c, d) {
            return a[d]
        })
    },
    htmlEncode: function (a) {
        return !a ? a : String(a).replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;")
    },
    htmlDecode: function (a) {
        return !a ? a : String(a).replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&amp;/g, "&")
    },
    date: function (a, b) {
        if (!a) {
            return ""
        }
        if (!Ext.isDate(a)) {
            a = new Date(Date.parse(a))
        }
        return a.dateFormat(b || Ext.util.Format.defaultDateFormat)
    }
};
Ext.LoadMask = Ext.extend(Ext.util.Observable, {
    msg: "Loading...",
    msgCls: "x-mask-loading",
    disabled: false,
    constructor: function (b, a) {
        this.el = Ext.get(b);
        Ext.apply(this, a);
        this.addEvents("show", "hide");
        if (this.store) {
            this.bindStore(this.store, true)
        }
        Ext.LoadMask.superclass.constructor.call(this)
    },
    bindStore: function (a, b) {
        if (!b && this.store) {
            this.mun(this.store, {
                scope: this,
                beforeload: this.onBeforeLoad,
                load: this.onLoad,
                exception: this.onLoad
            });
            if (!a) {
                this.store = null
            }
        }
        if (a) {
            a = Ext.StoreMgr.lookup(a);
            this.mon(a, {
                scope: this,
                beforeload: this.onBeforeLoad,
                load: this.onLoad,
                exception: this.onLoad
            })
        }
        this.store = a;
        if (a && a.isLoading()) {
            this.onBeforeLoad()
        }
    },
    disable: function () {
        this.disabled = true
    },
    enable: function () {
        this.disabled = false
    },
    isDisabled: function () {
        return this.disabled
    },
    onLoad: function () {
        this.el.unmask();
        this.fireEvent("hide", this, this.el, this.store)
    },
    onBeforeLoad: function () {
        if (!this.disabled) {
            this.el.mask(Ext.LoadingSpinner + '<div class="x-loading-msg">' + this.msg + "</div>", this.msgCls, false);
            this.fireEvent("show", this, this.el, this.store)
        }
    },
    show: function () {
        this.onBeforeLoad()
    },
    hide: function () {
        this.onLoad()
    },
    destroy: function () {
        this.hide();
        this.clearListeners()
    }
});
Ext.LoadingSpinner = '<div class="x-loading-spinner"><span class="x-loading-top"></span><span class="x-loading-right"></span><span class="x-loading-bottom"></span><span class="x-loading-left"></span></div>';
Ext.applyIf(Array.prototype, {
    indexOf: function (b, c) {
        var a = this.length;
        c = c || 0;
        c += (c < 0) ? a : 0;
        for (; c < a; ++c) {
            if (this[c] === b) {
                return c
            }
        }
        return -1
    },
    remove: function (b) {
        var a = this.indexOf(b);
        if (a != -1) {
            this.splice(a, 1)
        }
        return this
    },
    contains: function (a) {
        return this.indexOf(a) !== -1
    }
});
Ext.ComponentMgr = new Ext.AbstractManager({
    typeName: "xtype",
    create: function (b, d) {
        if (b.isComponent) {
            return b
        } else {
            var c = b.xtype || d,
                a = this.types[c];
            if (!a) {
                throw "Attempting to create a component with an xtype that has not been registered: " + c
            }
            return new a(b)
        }
        return b.render ? b : new(b)
    },
    registerType: function (b, a) {
        this.types[b] = a;
        a[this.typeName] = b;
        a.prototype[this.typeName] = b
    }
});
Ext.reg = function () {
    return Ext.ComponentMgr.registerType.apply(Ext.ComponentMgr, arguments)
};
Ext.create = function () {
    return Ext.ComponentMgr.create.apply(Ext.ComponentMgr, arguments)
};
Ext.ComponentQuery = new function () {
    var g = this,
        j = ["var r = [],", "i = 0,", "it = arguments[0],", "l = it.length,", "c;", "for (; i < l; i++) {", "c = it[i].{0};", "if (c) {", "r.push(c);", "}", "}", "return r;"].join(""),
        e = function (o, n) {
            return n.method.apply(this, [o].concat(n.args))
        },
        a = function (p, u) {
            var n = [],
                q, t = p.length,
                s, o = u != ">";
            for (q = 0; q < t; q++) {
                s = p[q];
                if (s.getRefItems) {
                    n = n.concat(s.getRefItems(o))
                }
            }
            return n
        },
        f = function (o) {
            var n = [],
                p, s = o.length,
                q;
            for (p = 0; p < s; p++) {
                q = o[p];
                while ( !! (q = q.ownerCt)) {
                    n.push(q)
                }
            }
            return n
        },
        l = function (o, u, t) {
            if (u == "*") {
                return o.slice()
            } else {
                var n = [],
                    p, s = o.length,
                    q;
                for (p = 0; p < s; p++) {
                    q = o[p];
                    if (q.isXType(u, t)) {
                        n.push(q)
                    }
                }
                return n
            }
        },
        i = function (o, s) {
            var n = [],
                p, t = o.length,
                q;
            for (p = 0; p < t; p++) {
                q = o[p];
                if (q.el ? q.el.hasCls(s) : q.initCls().contains(s)) {
                    n.push(q)
                }
            }
            return n
        },
        m = function (p, v, o, u) {
            var n = [],
                q, t = p.length,
                s;
            for (q = 0; q < t; q++) {
                s = p[q];
                if ((u === undefined) ? !! s[v] : (s[v] == u)) {
                    n.push(s)
                }
            }
            return n
        },
        d = function (o, t) {
            var n = [],
                p, s = o.length,
                q;
            for (p = 0; p < s; p++) {
                q = o[p];
                if (q.getItemId() == t) {
                    n.push(q)
                }
            }
            return n
        },
        k = function (n, o, p) {
            return g.pseudos[o](n, p)
        },
        h = /^(\s?([>\^])\s?|\s|$)/,
        c = /^(?:(#)?([\w-]+|\*)(?:\((true|false)\))?)|(?:\{([^\}]+)\})/,
        b = [{
            re: /^\.([\w-]+)(?:\((true|false)\))?/,
            method: l
        }, {
            re: /^(?:[\[\{](?:@)?([\w-]+)\s?(?:(=|.=)\s?['"]?(.*?)["']?)?[\]\}])/,
            method: m
        }, {
            re: /^#([\w-]+)/,
            method: d
        }, {
            re: /^\:([\w-]+)(?:\(((?:[^\s>\/]*|.*?))\))?/,
            method: k
        }];
    g.Query = Ext.extend(Object, {
        constructor: function (n) {
            n = n || {};
            Ext.apply(this, n)
        },
        execute: function (o) {
            var q = this.operations,
                t = q.length,
                p, s, n;
            if (!o) {
                n = Ext.ComponentMgr.all.items.slice()
            }
            for (s = 0; s < t; s++) {
                p = q[s];
                if (p.mode == "^") {
                    n = f(n || [o])
                } else {
                    if (p.mode) {
                        n = a(n || [o], p.mode)
                    } else {
                        n = e(n || a([o]), p)
                    }
                }
                if (s == t - 1) {
                    return n
                }
            }
            return []
        },
        is: function (p) {
            var o = this.operations,
                s = o.length,
                q, n = Ext.isArray(p) ? p : [p];
            for (q = 0; q < s && n.length; q++) {
                n = e(n, o[q])
            }
            return n.length != 0
        }
    });
    Ext.apply(this, {
        cache: {},
        pseudos: {},
        query: function (n, w) {
            var x = n.split(","),
                q = x.length,
                o, t, p = [],
                y = [],
                v = {},
                s, u;
            for (o = 0; o < q; o++) {
                n = Ext.util.Format.trim(x[o]);
                t = this.cache[n];
                if (!t) {
                    this.cache[n] = t = this.parse(n)
                }
                p = p.concat(t.execute(w))
            }
            if (q > 1) {
                s = p.length;
                for (o = 0; o < s; o++) {
                    u = p[o];
                    if (!v[u.id]) {
                        y.push(u);
                        v[u.id] = true
                    }
                }
                p = y
            }
            return p
        },
        is: function (o, n) {
            if (!n) {
                return true
            }
            var p = this.cache[n];
            if (!p) {
                this.cache[n] = p = this.parse(n)
            }
            return p.is(o)
        },
        parse: function (o) {
            var n = [],
                u = b.length,
                v, p, w, x, y, t, q, s;
            while (o && v != o) {
                v = o;
                p = o.match(c);
                if (p) {
                    w = p[1];
                    if (w == "#") {
                        n.push({
                            method: d,
                            args: [Ext.util.Format.trim(p[2])]
                        })
                    } else {
                        if (w == ".") {
                            n.push({
                                method: i,
                                args: [Ext.util.Format.trim(p[2])]
                            })
                        } else {
                            if (p[4]) {
                                n.push({
                                    method: new Function(Ext.util.Format.format(j, p[4])),
                                    args: []
                                })
                            } else {
                                n.push({
                                    method: l,
                                    args: [Ext.util.Format.trim(p[2]), Boolean(p[3])]
                                })
                            }
                        }
                    }
                    o = o.replace(p[0], "")
                }
                while (!(x = o.match(h))) {
                    for (q = 0; o && q < u; q++) {
                        s = b[q];
                        y = o.match(s.re);
                        if (y) {
                            n.push({
                                method: s.method,
                                args: y.splice(1)
                            });
                            o = o.replace(y[0], "");
                            break
                        }
                        if (q == (u - 1)) {
                            throw 'Invalid ComponentQuery selector: "' + arguments[0] + '"'
                        }
                    }
                }
                if (x[1]) {
                    n.push({
                        mode: x[2] || x[1]
                    });
                    o = o.replace(x[0], "")
                }
            }
            return new g.Query({
                operations: n
            })
        }
    })
};
Ext.PluginMgr = new Ext.AbstractManager({
    typeName: "ptype",
    create: function (b, c) {
        var a = this.types[b.ptype || c];
        if (a.init) {
            return a
        } else {
            return new a(b)
        }
    },
    findByType: function (c, f) {
        var e = [],
            b = this.types;
        for (var a in b) {
            if (!b.hasOwnProperty(a)) {
                continue
            }
            var d = b[a];
            if (d.type == c && (!f || (f === true && d.isDefault))) {
                e.push(d)
            }
        }
        return e
    }
});
Ext.preg = function () {
    return Ext.PluginMgr.registerType.apply(Ext.PluginMgr, arguments)
};
Ext.EventManager = {
    optionsRe: /^(?:capture|scope|delay|buffer|single|stopEvent|disableLocking|preventDefault|stopPropagation|normalized|args|delegate|horizontal|vertical|dragThreshold|holdThreshold|doubleTapThreshold|cancelThreshold|singleTapThreshold|fireClickEvent)$/,
    touchRe: /^(?:pinch|pinchstart|pinchend|tap|singletap|doubletap|swipe|swipeleft|swiperight|drag|dragstart|dragend|touchdown|touchstart|touchmove|touchend|taphold|tapstart|tapcancel)$/i,
    addListener: function (b, a, e, d, g) {
        if (Ext.isObject(a)) {
            this.handleListenerConfig(b, a);
            return
        }
        var f = Ext.getDom(b);
        if (!f) {
            throw 'Error listening for "' + a + '". Element "' + b + "\" doesn't exist."
        }
        if (!e) {
            throw 'Error listening for "' + a + '". No handler function specified'
        }
        var h = this.touchRe.test(a);
        var c = this.createListenerWrap(f, a, e, d, g, h);
        this.getEventListenerCache(f, a).push({
            fn: e,
            wrap: c,
            scope: d
        });
        if (h) {
            Ext.gesture.Manager.addEventListener(f, a, c, g)
        } else {
            g = g || {};
            f.addEventListener(a, c, g.capture || false)
        }
    },
    removeListener: function (g, k, l, m) {
        if (Ext.isObject(k)) {
            this.handleListenerConfig(g, k, true);
            return
        }
        var e = Ext.getDom(g),
            a = this.getEventListenerCache(e, k),
            h = a.length,
            f, c, b, d;
        while (h--) {
            c = a[h];
            if (c && (!l || c.fn == l) && (!m || c.scope === m)) {
                b = c.wrap;
                if (b.task) {
                    clearTimeout(b.task);
                    delete b.task
                }
                f = b.tasks && b.tasks.length;
                if (f) {
                    while (f--) {
                        clearTimeout(b.tasks[f])
                    }
                    delete b.tasks
                }
                if (this.touchRe.test(k)) {
                    Ext.gesture.Manager.removeEventListener(e, k, b)
                } else {
                    e.removeEventListener(k, b, false)
                }
                a.splice(h, 1)
            }
        }
    },
    removeAll: function (b) {
        var d = Ext.getDom(b),
            a = this.getElementEventCache(d),
            c;
        for (c in a) {
            if (!a.hasOwnProperty(c)) {
                continue
            }
            this.removeListener(d, c)
        }
        Ext.cache[d.id].events = {}
    },
    purgeElement: function (d, e, b) {
        var f = Ext.getDom(d),
            c = 0,
            a;
        if (b) {
            this.removeListener(f, b)
        } else {
            this.removeAll(f)
        }
        if (e && f && f.childNodes) {
            for (a = d.childNodes.length; c < a; c++) {
                this.purgeElement(d.childNodes[c], e, b)
            }
        }
    },
    handleListenerConfig: function (d, b, a) {
        var c, e;
        for (c in b) {
            if (!b.hasOwnProperty(c)) {
                continue
            }
            if (!this.optionsRe.test(c)) {
                e = b[c];
                if (Ext.isFunction(e)) {
                    this[(a ? "remove" : "add") + "Listener"](d, c, e, b.scope, b)
                } else {
                    this[(a ? "remove" : "add") + "Listener"](d, c, b.fn, b.scope, b)
                }
            }
        }
    },
    getId: function (a) {
        var b = false,
            c;
        a = Ext.getDom(a);
        if (a === document || a === window) {
            b = true
        }
        c = Ext.id(a);
        if (!Ext.cache[c]) {
            Ext.Element.addToCache(new Ext.Element(a), c);
            if (b) {
                Ext.cache[c].skipGarbageCollection = true
            }
        }
        return c
    },
    createListenerWrap: function (h, a, c, b, g, i) {
        g = !Ext.isObject(g) ? {} : g;
        var d = ["if(!window.Ext) {return;}"];
        if (i) {
            d.push("e = new Ext.TouchEventObjectImpl(e, args);")
        } else {
            if (g.buffer || g.delay) {
                d.push("e = new Ext.EventObjectImpl(e);")
            } else {
                d.push("e = Ext.EventObject.setEvent(e);")
            }
        }
        if (g.delegate) {
            d.push('var t = e.getTarget("' + g.delegate + '", this);');
            d.push("if(!t) {return;}")
        } else {
            d.push("var t = e.target;")
        }
        if (g.target) {
            d.push("if(e.target !== o.target) {return;}")
        }
        if (g.stopEvent) {
            d.push("e.stopEvent();")
        } else {
            if (g.preventDefault) {
                d.push("e.preventDefault();")
            }
            if (g.stopPropagation) {
                d.push("e.stopPropagation();")
            }
        }
        if (g.normalized === false) {
            d.push("e = e.browserEvent;")
        }
        if (g.buffer) {
            d.push("(wrap.task && clearTimeout(wrap.task));");
            d.push("wrap.task = setTimeout(function(){")
        }
        if (g.delay) {
            d.push("wrap.tasks = wrap.tasks || [];");
            d.push("wrap.tasks.push(setTimeout(function(){")
        }
        d.push("fn.call(scope || dom, e, t, o);");
        if (g.single) {
            d.push("Ext.EventManager.removeListener(dom, ename, fn, scope);")
        }
        if (g.delay) {
            d.push("}, " + g.delay + "));")
        }
        if (g.buffer) {
            d.push("}, " + g.buffer + ");")
        }
        var e = new Function("e", "o", "fn", "scope", "ename", "dom", "wrap", "args", d.join("\n"));
        return function (j, f) {
            e.call(h, j, g, c, b, a, h, arguments.callee, f)
        }
    },
    getEventListenerCache: function (c, a) {
        var b = this.getElementEventCache(c);
        return b[a] || (b[a] = [])
    },
    getElementEventCache: function (b) {
        var a = Ext.cache[this.getId(b)];
        return a.events || (a.events = {})
    },
    onDocumentReady: function (d, c, b) {
        var f = this,
            g = f.readyEvent,
            e;
        if (Ext.isReady) {
            g || (g = new Ext.util.Event());
            g.addListener(d, c, b);
            g.fire();
            g.listeners = []
        } else {
            if (!g) {
                g = f.readyEvent = new Ext.util.Event();
                var a = function () {
                        Ext.isReady = true;
                        window.removeEventListener("load", arguments.callee, false);
                        if (e) {
                            clearInterval(e)
                        }
                        setTimeout(function () {
                            Ext.supports.init();
                            Ext.gesture.Manager.init();
                            Ext.orientation = Ext.Element.getOrientation();
                            g.fire({
                                orientation: Ext.orientation,
                                width: Ext.Element.getViewportWidth(),
                                height: Ext.Element.getViewportHeight()
                            });
                            g.listeners = []
                        }, 50)
                    };
                e = setInterval(function () {
                    if (/loaded|complete/.test(document.readyState)) {
                        clearInterval(e);
                        e = null;
                        a()
                    }
                }, 10);
                window.addEventListener("load", a, false)
            }
            b = b || {};
            b.delay = b.delay || 1;
            g.addListener(d, c, b)
        }
    },
    onWindowResize: function (c, b, a) {
        var e = this,
            f = e.resizeEvent;
        if (!f) {
            e.resizeEvent = f = new Ext.util.Event();
            var d = function () {
                    f.fire(Ext.Element.getViewportWidth(), Ext.Element.getViewportHeight())
                };
            this.addListener(window, "resize", d, this)
        }
        f.addListener(c, b, a)
    },
    onOrientationChange: function (c, b, a) {
        var e = this,
            d = e.orientationEvent;
        if (!d) {
            e.orientationEvent = d = new Ext.util.Event();
            var f = function (g, h) {
                    Ext.orientation = Ext.Viewport.getOrientation();
                    d.fire(Ext.orientation, h.width, h.height)
                };
            Ext.Viewport.on("resize", f, this)
        }
        d.addListener(c, b, a)
    },
    unOrientationChange: function (c, b, a) {
        var e = this,
            d = e.orientationEvent;
        if (d) {
            d.removeListener(c, b, a)
        }
    }
};
Ext.EventManager.on = Ext.EventManager.addListener;
Ext.EventManager.un = Ext.EventManager.removeListener;
Ext.onReady = Ext.EventManager.onDocumentReady;
Ext.EventObjectImpl = Ext.extend(Object, {
    constructor: function (a) {
        if (a) {
            this.setEvent(a.browserEvent || a)
        }
    },
    setEvent: function (c) {
        var b = this;
        if (c == b || (c && c.browserEvent)) {
            return c
        }
        b.browserEvent = c;
        if (c) {
            b.type = c.type;
            var a = c.target;
            b.target = a && a.nodeType == 3 ? a.parentNode : a;
            b.xy = [c.pageX, c.pageY];
            b.timestamp = c.timeStamp
        } else {
            b.target = null;
            b.xy = [0, 0]
        }
        return b
    },
    stopEvent: function () {
        this.stopPropagation();
        this.preventDefault()
    },
    preventDefault: function () {
        if (this.browserEvent) {
            this.browserEvent.preventDefault()
        }
    },
    stopPropagation: function () {
        if (this.browserEvent) {
            this.browserEvent.stopPropagation()
        }
    },
    getPageX: function () {
        return this.xy[0]
    },
    getPageY: function () {
        return this.xy[1]
    },
    getXY: function () {
        return this.xy
    },
    getTarget: function (b, c, a) {
        return b ? Ext.fly(this.target).findParent(b, c, a) : (a ? Ext.get(this.target) : this.target)
    },
    getTime: function () {
        return this.timestamp
    }
});
Ext.EventObject = new Ext.EventObjectImpl();
Ext.is = {
    init: function (b) {
        var c = this.platforms,
            e = c.length,
            d, a;
        b = b || window.navigator;
        for (d = 0; d < e; d++) {
            a = c[d];
            this[a.identity] = a.regex.test(b[a.property])
        }
        this.Desktop = this.Mac || this.Windows || (this.Linux && !this.Android);
        this.Tablet = this.iPad;
        this.Phone = !this.Desktop && !this.Tablet;
        this.iOS = this.iPhone || this.iPad || this.iPod;
        this.Standalone = !! window.navigator.standalone
    },
    platforms: [{
        property: "platform",
        regex: /iPhone/i,
        identity: "iPhone"
    }, {
        property: "platform",
        regex: /iPod/i,
        identity: "iPod"
    }, {
        property: "userAgent",
        regex: /iPad/i,
        identity: "iPad"
    }, {
        property: "userAgent",
        regex: /Blackberry/i,
        identity: "Blackberry"
    }, {
        property: "userAgent",
        regex: /Android/i,
        identity: "Android"
    }, {
        property: "platform",
        regex: /Mac/i,
        identity: "Mac"
    }, {
        property: "platform",
        regex: /Win/i,
        identity: "Windows"
    }, {
        property: "platform",
        regex: /Linux/i,
        identity: "Linux"
    }]
};
Ext.is.init();
Ext.supports = {
    init: function () {
        var d = document,
            f = d.createElement("div"),
            b = this.tests,
            c = b.length,
            a, e;
        f.innerHTML = ['<div style="height:30px;width:50px;">', '<div style="height:20px;width:20px;"></div>', "</div>", '<div style="float:left; background-color:transparent;"></div>'].join("");
        d.body.appendChild(f);
        for (a = 0; a < c; a++) {
            e = b[a];
            this[e.identity] = e.fn.call(this, d, f)
        }
        d.body.removeChild(f)
    },
    OrientationChange: ((typeof window.orientation != "undefined") && ("onorientationchange" in window)),
    DeviceMotion: ("ondevicemotion" in window),
    Touch: ("ontouchstart" in window) && (!Ext.is.Desktop),
    tests: [{
        identity: "Transitions",
        fn: function (f, h) {
            var e = ["webkit", "Moz", "o", "ms", "khtml"],
                g = "TransitionEnd",
                a = [e[0] + g, "transitionend", e[2] + g, e[3] + g, e[4] + g],
                d = e.length,
                c = 0,
                b = false;
            h = Ext.get(h);
            for (; c < d; c++) {
                if (h.getStyle(e[c] + "TransitionProperty")) {
                    Ext.supports.CSS3Prefix = e[c];
                    Ext.supports.CSS3TransitionEnd = a[c];
                    b = true;
                    break
                }
            }
            return b
        }
    }, {
        identity: "RightMargin",
        fn: function (b, c, a) {
            a = b.defaultView;
            return !(a && a.getComputedStyle(c.firstChild.firstChild, null).marginRight != "0px")
        }
    }, {
        identity: "TransparentColor",
        fn: function (b, c, a) {
            a = b.defaultView;
            return !(a && a.getComputedStyle(c.lastChild, null).backgroundColor != "transparent")
        }
    }, {
        identity: "SVG",
        fn: function (a) {
            return !!a.createElementNS && !! a.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect
        }
    }, {
        identity: "Canvas",
        fn: function (a) {
            return !!a.createElement("canvas").getContext
        }
    }, {
        identity: "VML",
        fn: function (a) {
            var b = a.createElement("div");
            b.innerHTML = "<!--[if vml]><br><br><![endif]-->";
            return (b.childNodes.length == 2)
        }
    }, {
        identity: "Float",
        fn: function (a, b) {
            return !!b.lastChild.style.cssFloat
        }
    }, {
        identity: "AudioTag",
        fn: function (a) {
            return !!a.createElement("audio").canPlayType
        }
    }, {
        identity: "History",
        fn: function () {
            return !!(window.history && history.pushState)
        }
    }, {
        identity: "CSS3DTransform",
        fn: function () {
            return (typeof WebKitCSSMatrix != "undefined" && new WebKitCSSMatrix().hasOwnProperty("m41"))
        }
    }, {
        identity: "CSS3LinearGradient",
        fn: function (e, g) {
            var d = "background-image:",
                b = "-webkit-gradient(linear, left top, right bottom, from(black), to(white))",
                f = "linear-gradient(left top, black, white)",
                c = "-moz-" + f,
                a = [d + b, d + f, d + c];
            g.style.cssText = a.join(";");
            return ("" + g.style.backgroundImage).indexOf("gradient") !== -1
        }
    }, {
        identity: "CSS3BorderRadius",
        fn: function (d, e) {
            var b = ["borderRadius", "BorderRadius", "MozBorderRadius", "WebkitBorderRadius", "OBorderRadius", "KhtmlBorderRadius"],
                c = false,
                a;
            for (a = 0; a < b.length; a++) {
                if (document.body.style[b[a]] !== undefined) {
                    return c = true
                }
            }
            return c
        }
    }, {
        identity: "GeoLocation",
        fn: function () {
            return (typeof navigator != "undefined" && typeof navigator.geolocation != "undefined") || (typeof google != "undefined" && typeof google.gears != "undefined")
        }
    }]
};
Ext.data.Batch = Ext.extend(Ext.util.Observable, {
    autoStart: false,
    current: -1,
    total: 0,
    isRunning: false,
    isComplete: false,
    hasException: false,
    pauseOnException: true,
    constructor: function (a) {
        this.addEvents("complete", "exception", "operationcomplete", "operation-complete");
        Ext.data.Batch.superclass.constructor.call(this, a);
        this.operations = []
    },
    add: function (a) {
        this.total++;
        a.setBatch(this);
        this.operations.push(a)
    },
    start: function () {
        this.hasException = false;
        this.isRunning = true;
        this.runNextOperation()
    },
    runNextOperation: function () {
        this.runOperation(this.current + 1)
    },
    pause: function () {
        this.isRunning = false
    },
    runOperation: function (d) {
        var c = this.operations,
            b = c[d];
        if (b == undefined) {
            this.isRunning = false;
            this.isComplete = true;
            this.fireEvent("complete", this, c[c.length - 1])
        } else {
            this.current = d;
            var a = function (e) {
                    var f = e.hasException();
                    if (f) {
                        this.hasException = true;
                        this.fireEvent("exception", this, e)
                    } else {
                        this.fireEvent("operation-complete", this, e);
                        this.fireEvent("operationcomplete", this, e)
                    }
                    if (f && this.pauseOnException) {
                        this.pause()
                    } else {
                        e.setCompleted();
                        this.runNextOperation()
                    }
                };
            b.setStarted();
            this.proxy[b.action](b, a, this)
        }
    }
});
Ext.data.Model = Ext.extend(Ext.util.Stateful, {
    evented: false,
    isModel: true,
    phantom: false,
    idProperty: "id",
    constructor: function (e, g) {
        e = e || {};
        this.internalId = (g || g === 0) ? g : Ext.data.Model.id(this);
        Ext.data.Model.superclass.constructor.apply(this);
        var a = this.fields.items,
            d = a.length,
            f, b, c;
        for (c = 0; c < d; c++) {
            f = a[c];
            b = f.name;
            if (e[b] == undefined) {
                e[b] = f.defaultValue
            }
        }
        this.set(e);
        this.dirty = false;
        if (this.getId()) {
            this.phantom = false
        }
        if (typeof this.init == "function") {
            this.init()
        }
    },
    validate: function () {
        var j = new Ext.data.Errors(),
            c = this.validations,
            e = Ext.data.validations,
            b, d, h, a, g, f;
        if (c) {
            b = c.length;
            for (f = 0; f < b; f++) {
                d = c[f];
                h = d.field || d.name;
                g = d.type;
                a = e[g](d, this.get(h));
                if (!a) {
                    j.add({
                        field: h,
                        message: d.message || e[g + "Message"]
                    })
                }
            }
        }
        return j
    },
    getProxy: function () {
        return this.constructor.proxy
    },
    save: function (j) {
        var f = this,
            a = f.phantom ? "create" : "update";
        j = j || {};
        Ext.apply(j, {
            records: [f],
            action: a
        });
        var b = new Ext.data.Operation(j),
            h = j.success,
            d = j.failure,
            e = j.callback,
            i = j.scope,
            c;
        var g = function (k) {
                c = k.getRecords()[0];
                if (k.wasSuccessful()) {
                    f.set(c.data);
                    c.dirty = false;
                    if (typeof h == "function") {
                        h.call(i, c, k)
                    }
                } else {
                    if (typeof d == "function") {
                        d.call(i, c, k)
                    }
                }
                if (typeof e == "function") {
                    e.call(i, c, k)
                }
            };
        f.getProxy()[a](b, g, f);
        return f
    },
    getId: function () {
        return this.get(this.idProperty)
    },
    setId: function (a) {
        this.set(this.idProperty, a)
    },
    join: function (a) {
        this.store = a
    },
    unjoin: function (a) {
        delete this.store
    },
    afterEdit: function () {
        this.callStore("afterEdit")
    },
    afterReject: function () {
        this.callStore("afterReject")
    },
    afterCommit: function () {
        this.callStore("afterCommit")
    },
    callStore: function (b) {
        var a = this.store;
        if (a != undefined && typeof a[b] == "function") {
            a[b](this)
        }
    }
});
Ext.apply(Ext.data.Model, {
    setProxy: function (a) {
        a = Ext.data.ProxyMgr.create(a);
        a.setModel(this);
        this.proxy = a;
        return a
    },
    load: function (a, b) {
        b = Ext.applyIf(b || {}, {
            action: "read",
            id: a
        });
        var c = new Ext.data.Operation(b),
            f = b.callback,
            h = b.success,
            e = b.failure,
            i = b.scope,
            d, g;
        g = function (j) {
            d = j.getRecords()[0];
            if (j.wasSuccessful()) {
                if (typeof h == "function") {
                    h.call(i, d, j)
                }
            } else {
                if (typeof e == "function") {
                    e.call(i, d, j)
                }
            }
            if (typeof f == "function") {
                f.call(i, d, j)
            }
        };
        this.proxy.read(c, g, this)
    }
});
Ext.data.Model.id = function (a) {
    a.phantom = true;
    return [Ext.data.Model.PREFIX, "-", Ext.data.Model.AUTO_ID++].join("")
};
Ext.ns("Ext.data.Record");
Ext.data.Record.id = Ext.data.Model.id;
Ext.data.Model.PREFIX = "ext-record";
Ext.data.Model.AUTO_ID = 1;
Ext.data.Model.EDIT = "edit";
Ext.data.Model.REJECT = "reject";
Ext.data.Model.COMMIT = "commit";
Ext.data.Association = Ext.extend(Object, {
    primaryKey: "id",
    constructor: function (b) {
        Ext.apply(this, b);
        var c = Ext.ModelMgr.types,
            d = b.ownerModel,
            f = b.associatedModel,
            e = c[d],
            g = c[f],
            a;
        if (e == undefined) {
            throw new Error("The configured ownerModel was not valid (you tried " + d + ")")
        }
        if (g == undefined) {
            throw new Error("The configured associatedModel was not valid (you tried " + f + ")")
        }
        this.ownerModel = e;
        this.associatedModel = g;
        Ext.applyIf(this, {
            ownerName: d,
            associatedName: f
        })
    }
});
Ext.data.HasManyAssociation = Ext.extend(Ext.data.Association, {
    constructor: function (c) {
        Ext.data.HasManyAssociation.superclass.constructor.apply(this, arguments);
        var a = this.ownerModel.prototype,
            b = this.name;
        Ext.applyIf(this, {
            storeName: b + "Store",
            foreignKey: this.ownerName.toLowerCase() + "_id"
        });
        a[b] = this.createStore()
    },
    createStore: function () {
        var f = this.associatedModel,
            b = this.storeName,
            c = this.foreignKey,
            a = this.primaryKey,
            e = this.filterProperty,
            d = this.storeConfig || {};
        return function () {
            var j = this,
                h, i, g = {};
            if (j[b] == undefined) {
                if (e) {
                    i = {
                        property: e,
                        value: j.get(e),
                        exactMatch: true
                    }
                } else {
                    i = {
                        property: c,
                        value: j.get(a),
                        exactMatch: true
                    }
                }
                g[c] = j.get(a);
                h = Ext.apply({}, d, {
                    model: f,
                    filters: [i],
                    remoteFilter: false,
                    modelDefaults: g
                });
                j[b] = new Ext.data.Store(h)
            }
            return j[b]
        }
    }
});
Ext.data.BelongsToAssociation = Ext.extend(Ext.data.Association, {
    constructor: function (c) {
        Ext.data.BelongsToAssociation.superclass.constructor.apply(this, arguments);
        var e = this,
            a = e.ownerModel.prototype,
            f = e.associatedName,
            d = e.getterName || "get" + f,
            b = e.setterName || "set" + f;
        Ext.applyIf(e, {
            name: f,
            foreignKey: f.toLowerCase() + "_id",
            instanceName: f + "BelongsToInstance"
        });
        a[d] = e.createGetter();
        a[b] = e.createSetter()
    },
    createSetter: function () {
        var c = this,
            d = c.ownerModel,
            e = c.associatedModel,
            b = c.foreignKey,
            a = c.primaryKey;
        return function (h, f, g) {
            this.set(b, h);
            if (typeof f == "function") {
                f = {
                    callback: f,
                    scope: g || this
                }
            }
            if (Ext.isObject(f)) {
                return this.save(f)
            }
        }
    },
    createGetter: function () {
        var d = this,
            f = d.ownerModel,
            e = d.associatedName,
            g = d.associatedModel,
            c = d.foreignKey,
            b = d.primaryKey,
            a = d.instanceName;
        return function (j, k) {
            j = j || {};
            var l = this.get(c),
                h, i;
            if (this[a] == undefined) {
                h = Ext.ModelMgr.create({}, e);
                h.set(b, l);
                if (typeof j == "function") {
                    j = {
                        callback: j,
                        scope: k || this
                    }
                }
                g.load(l, j)
            } else {
                h = this[a];
                if (typeof j == "function") {
                    j.call(k || this, h)
                }
                if (j.success) {
                    j.success.call(k || this, h)
                }
                if (j.callback) {
                    j.callback.call(k || this, h)
                }
                return h
            }
        }
    }
});
Ext.data.PolymorphicAssociation = Ext.extend(Ext.data.Association, {
    constructor: function (c) {
        Ext.data.PolymorphicAssociation.superclass.constructor.call(this, c);
        var a = this.ownerModel.prototype,
            b = this.name;
        Ext.applyIf(this, {
            associationIdField: this.ownerName.toLowerCase() + "_id"
        });
        a[b] = this.createStore()
    },
    createStore: function () {
        var b = this,
            f = this.ownerName,
            d = this.name + "Store",
            g = this.associatedModel,
            c = this.primaryKey,
            a = "associated_id",
            e = "associated_model";
        return function () {
            var k = this,
                h = {},
                i, j;
            if (k[d] == undefined) {
                j = [{
                    property: a,
                    value: k.get(c),
                    exactMatch: true
                }, {
                    property: e,
                    value: f,
                    exactMatch: true
                }];
                h[a] = k.get(c);
                h[e] = f;
                i = Ext.apply({}, b.storeConfig || {}, {
                    model: g,
                    filters: j,
                    remoteFilter: false,
                    modelDefaults: h
                });
                k[d] = new Ext.data.Store(i)
            }
            return k[d]
        }
    }
});
Ext.data.validations = {
    presenceMessage: "must be present",
    lengthMessage: "is the wrong length",
    formatMessage: "is the wrong format",
    inclusionMessage: "is not included in the list of acceptable values",
    exclusionMessage: "is not an acceptable value",
    presence: function (a, b) {
        if (b == undefined) {
            b = a
        }
        return !!b
    },
    length: function (b, e) {
        if (e == undefined) {
            return false
        }
        var d = e.length,
            c = b.min,
            a = b.max;
        if ((c && d < c) || (a && d > a)) {
            return false
        } else {
            return true
        }
    },
    format: function (a, b) {
        return !!(a.matcher && a.matcher.test(b))
    },
    inclusion: function (a, b) {
        return a.list && a.list.indexOf(b) != -1
    },
    exclusion: function (a, b) {
        return a.list && a.list.indexOf(b) == -1
    }
};
Ext.data.Errors = Ext.extend(Ext.util.MixedCollection, {
    isValid: function () {
        return this.length == 0
    },
    getByField: function (e) {
        var d = [],
            a, c, b;
        for (b = 0; b < this.length; b++) {
            a = this.items[b];
            if (a.field == e) {
                d.push(a)
            }
        }
        return d
    }
});
Ext.data.Field = Ext.extend(Object, {
    constructor: function (b) {
        if (Ext.isString(b)) {
            b = {
                name: b
            }
        }
        Ext.apply(this, b);
        var d = Ext.data.Types,
            a = this.sortType,
            c;
        if (this.type) {
            if (Ext.isString(this.type)) {
                this.type = d[this.type.toUpperCase()] || d.AUTO
            }
        } else {
            this.type = d.AUTO
        }
        if (Ext.isString(a)) {
            this.sortType = Ext.data.SortTypes[a]
        } else {
            if (Ext.isEmpty(a)) {
                this.sortType = this.type.sortType
            }
        }
        if (!this.convert) {
            this.convert = this.type.convert
        }
    },
    dateFormat: null,
    useNull: false,
    defaultValue: "",
    mapping: null,
    sortType: null,
    sortDir: "ASC",
    allowBlank: true
});
Ext.data.SortTypes = {
    none: function (a) {
        return a
    },
    stripTagsRE: /<\/?[^>]+>/gi,
    asText: function (a) {
        return String(a).replace(this.stripTagsRE, "")
    },
    asUCText: function (a) {
        return String(a).toUpperCase().replace(this.stripTagsRE, "")
    },
    asUCString: function (a) {
        return String(a).toUpperCase()
    },
    asDate: function (a) {
        if (!a) {
            return 0
        }
        if (Ext.isDate(a)) {
            return a.getTime()
        }
        return Date.parse(String(a))
    },
    asFloat: function (a) {
        var b = parseFloat(String(a).replace(/,/g, ""));
        return isNaN(b) ? 0 : b
    },
    asInt: function (a) {
        var b = parseInt(String(a).replace(/,/g, ""), 10);
        return isNaN(b) ? 0 : b
    }
};
Ext.data.Types = new function () {
    var a = Ext.data.SortTypes;
    Ext.apply(this, {
        stripRe: /[\$,%]/g,
        AUTO: {
            convert: function (b) {
                return b
            },
            sortType: a.none,
            type: "auto"
        },
        STRING: {
            convert: function (b) {
                return (b === undefined || b === null) ? "" : String(b)
            },
            sortType: a.asUCString,
            type: "string"
        },
        INT: {
            convert: function (b) {
                return b !== undefined && b !== null && b !== "" ? parseInt(String(b).replace(Ext.data.Types.stripRe, ""), 10) : (this.useNull ? null : 0)
            },
            sortType: a.none,
            type: "int"
        },
        FLOAT: {
            convert: function (b) {
                return b !== undefined && b !== null && b !== "" ? parseFloat(String(b).replace(Ext.data.Types.stripRe, ""), 10) : (this.useNull ? null : 0)
            },
            sortType: a.none,
            type: "float"
        },
        BOOL: {
            convert: function (b) {
                return b === true || b === "true" || b == 1
            },
            sortType: a.none,
            type: "bool"
        },
        DATE: {
            convert: function (c) {
                var d = this.dateFormat;
                if (!c) {
                    return null
                }
                if (Ext.isDate(c)) {
                    return c
                }
                if (d) {
                    if (d == "timestamp") {
                        return new Date(c * 1000)
                    }
                    if (d == "time") {
                        return new Date(parseInt(c, 10))
                    }
                    return Date.parseDate(c, d)
                }
                var b = Date.parse(c);
                return b ? new Date(b) : null
            },
            sortType: a.asDate,
            type: "date"
        }
    });
    Ext.apply(this, {
        BOOLEAN: this.BOOL,
        INTEGER: this.INT,
        NUMBER: this.FLOAT
    })
};
Ext.ModelMgr = new Ext.AbstractManager({
    typeName: "mtype",
    defaultProxyType: "ajax",
    associationStack: [],
    registerType: function (t, s) {
        var e = Ext.PluginMgr,
            l = e.findByType("model", true),
            k = s.fields || [],
            p = s.associations || [],
            o = s.belongsTo,
            h = s.hasMany,
            q = s.extend,
            j = s.plugins || [],
            b, c, d, n, f, a, g, m;
        if (o) {
            if (!Ext.isArray(o)) {
                o = [o]
            }
            for (n = 0; n < o.length; n++) {
                b = o[n];
                if (!Ext.isObject(b)) {
                    b = {
                        model: b
                    }
                }
                Ext.apply(b, {
                    type: "belongsTo"
                });
                p.push(b)
            }
            delete s.belongsTo
        }
        if (h) {
            if (!Ext.isArray(h)) {
                h = [h]
            }
            for (n = 0; n < h.length; n++) {
                b = h[n];
                if (!Ext.isObject(b)) {
                    b = {
                        model: b
                    }
                }
                Ext.apply(b, {
                    type: "hasMany"
                });
                p.push(b)
            }
            delete s.hasMany
        }
        if (q) {
            f = this.types[q];
            a = f.prototype;
            g = a.validations;
            m = f.proxy;
            k = a.fields.items.concat(k);
            p = a.associations.items.concat(p);
            s.validations = g ? g.concat(s.validations) : s.validations
        } else {
            f = Ext.data.Model;
            m = s.proxy
        }
        c = Ext.extend(f, s);
        for (n = 0, d = j.length; n < d; n++) {
            l.push(e.create(j[n]))
        }
        this.types[t] = c;
        Ext.override(c, {
            plugins: l,
            fields: this.createFields(k),
            associations: this.createAssociations(p, t)
        });
        c.modelName = t;
        Ext.data.Model.setProxy.call(c, m || this.defaultProxyType);
        c.getProxy = c.prototype.getProxy;
        c.load = function () {
            Ext.data.Model.load.apply(this, arguments)
        };
        for (n = 0, d = l.length; n < d; n++) {
            l[n].bootstrap(c, s)
        }
        c.defined = true;
        this.onModelDefined(c);
        return c
    },
    onModelDefined: function (c) {
        var a = this.associationStack,
            f = a.length,
            e = [],
            b, d;
        for (d = 0; d < f; d++) {
            b = a[d];
            if (b.associatedModel == c.modelName) {
                e.push(b)
            }
        }
        f = e.length;
        for (d = 0; d < f; d++) {
            this.addAssociation(e[d], this.types[e[d].ownerModel].prototype.associations);
            a.remove(e[d])
        }
    },
    createAssociations: function (e, b) {
        var f = e.length,
            d, c, a;
        c = new Ext.util.MixedCollection(false, function (g) {
            return g.name
        });
        for (d = 0; d < f; d++) {
            a = e[d];
            Ext.apply(a, {
                ownerModel: b,
                associatedModel: a.model
            });
            if (this.types[a.model] == undefined) {
                this.associationStack.push(a)
            } else {
                this.addAssociation(a, c)
            }
        }
        return c
    },
    addAssociation: function (a, b) {
        var c = a.type;
        if (c == "belongsTo") {
            b.add(new Ext.data.BelongsToAssociation(a))
        }
        if (c == "hasMany") {
            b.add(new Ext.data.HasManyAssociation(a))
        }
        if (c == "polymorphic") {
            b.add(new Ext.data.PolymorphicAssociation(a))
        }
    },
    createFields: function (a) {
        var d = a.length,
            c, b;
        b = new Ext.util.MixedCollection(false, function (e) {
            return e.name
        });
        for (c = 0; c < d; c++) {
            b.add(new Ext.data.Field(a[c]))
        }
        return b
    },
    getModel: function (b) {
        var a = b;
        if (typeof a == "string") {
            a = this.types[a]
        }
        return a
    },
    create: function (c, b, d) {
        var a = typeof b == "function" ? b : this.types[b || c.name];
        return new a(c, d)
    }
});
Ext.regModel = function () {
    return Ext.ModelMgr.registerType.apply(Ext.ModelMgr, arguments)
};
Ext.data.Operation = Ext.extend(Object, {
    synchronous: true,
    action: undefined,
    filters: undefined,
    sorters: undefined,
    group: undefined,
    start: undefined,
    limit: undefined,
    batch: undefined,
    started: false,
    running: false,
    complete: false,
    success: undefined,
    exception: false,
    error: undefined,
    constructor: function (a) {
        Ext.apply(this, a || {})
    },
    setStarted: function () {
        this.started = true;
        this.running = true
    },
    setCompleted: function () {
        this.complete = true;
        this.running = false
    },
    setSuccessful: function () {
        this.success = true
    },
    setException: function (a) {
        this.exception = true;
        this.success = false;
        this.running = false;
        this.error = a
    },
    markStarted: function () {
        console.warn("Operation: markStarted has been deprecated. Please use setStarted");
        return this.setStarted()
    },
    markCompleted: function () {
        console.warn("Operation: markCompleted has been deprecated. Please use setCompleted");
        return this.setCompleted()
    },
    markSuccessful: function () {
        console.warn("Operation: markSuccessful has been deprecated. Please use setSuccessful");
        return this.setSuccessful()
    },
    markException: function () {
        console.warn("Operation: markException has been deprecated. Please use setException");
        return this.setException()
    },
    hasException: function () {
        return this.exception === true
    },
    getError: function () {
        return this.error
    },
    getRecords: function () {
        var a = this.getResultSet();
        return (a == undefined ? this.records : a.records)
    },
    getResultSet: function () {
        return this.resultSet
    },
    isStarted: function () {
        return this.started === true
    },
    isRunning: function () {
        return this.running === true
    },
    isComplete: function () {
        return this.complete === true
    },
    wasSuccessful: function () {
        return this.isComplete() && this.success === true
    },
    setBatch: function (a) {
        this.batch = a
    },
    allowWrite: function () {
        return this.action != "read"
    }
});
Ext.data.ProxyMgr = new Ext.AbstractManager({
    create: function (a) {
        if (a == undefined || typeof a == "string") {
            a = {
                type: a
            }
        }
        if (!(a instanceof Ext.data.Proxy)) {
            Ext.applyIf(a, {
                type: this.defaultProxyType,
                model: this.model
            });
            var b = a[this.typeName] || a.type,
                c = this.types[b];
            if (c == undefined) {
                throw new Error(Ext.util.Format.format("The '{0}' type has not been registered with this manager", b))
            }
            return new c(a)
        } else {
            return a
        }
    }
});
Ext.data.ReaderMgr = new Ext.AbstractManager({
    typeName: "rtype"
});
Ext.data.Request = Ext.extend(Object, {
    action: undefined,
    params: undefined,
    method: "GET",
    url: undefined,
    constructor: function (a) {
        Ext.apply(this, a)
    }
});
Ext.data.ResultSet = Ext.extend(Object, {
    loaded: true,
    count: 0,
    total: 0,
    success: false,
    constructor: function (a) {
        Ext.apply(this, a);
        this.totalRecords = this.total;
        if (a.count == undefined) {
            this.count = this.records.length
        }
    }
});
Ext.data.AbstractStore = Ext.extend(Ext.util.Observable, {
    remoteSort: false,
    remoteFilter: false,
    autoLoad: false,
    autoSave: false,
    batchUpdateMode: "operation",
    filterOnLoad: true,
    sortOnLoad: true,
    defaultSortDirection: "ASC",
    implicitModel: false,
    defaultProxyType: "memory",
    isDestroyed: false,
    isStore: true,
    constructor: function (a) {
        this.addEvents("add", "remove", "update", "datachanged", "beforeload", "load", "beforesync");
        Ext.apply(this, a);
        this.removed = [];
        this.sortToggle = {};
        Ext.data.AbstractStore.superclass.constructor.apply(this, arguments);
        this.model = Ext.ModelMgr.getModel(a.model);
        Ext.applyIf(this, {
            modelDefaults: {}
        });
        if (!this.model && a.fields) {
            this.model = Ext.regModel("ImplicitModel-" + this.storeId || Ext.id(), {
                fields: a.fields
            });
            delete this.fields;
            this.implicitModel = true
        }
        this.setProxy(a.proxy || this.model.proxy);
        if (this.id && !this.storeId) {
            this.storeId = this.id;
            delete this.id
        }
        if (this.storeId) {
            Ext.StoreMgr.register(this)
        }
        this.sorters = new Ext.util.MixedCollection();
        this.sorters.addAll(this.decodeSorters(a.sorters));
        this.filters = new Ext.util.MixedCollection();
        this.filters.addAll(this.decodeFilters(a.filters))
    },
    setProxy: function (a) {
        if (a instanceof Ext.data.Proxy) {
            a.setModel(this.model)
        } else {
            Ext.applyIf(a, {
                model: this.model
            });
            a = Ext.data.ProxyMgr.create(a)
        }
        this.proxy = a;
        return this.proxy
    },
    getProxy: function () {
        return this.proxy
    },
    create: function (d, c) {
        var a = Ext.ModelMgr.create(Ext.applyIf(d, this.modelDefaults), this.model.modelName),
            b;
        c = c || {};
        Ext.applyIf(c, {
            action: "create",
            records: [a]
        });
        b = new Ext.data.Operation(c);
        this.proxy.create(b, this.onProxyWrite, this);
        return a
    },
    read: function () {
        return this.load.apply(this, arguments)
    },
    onProxyRead: Ext.emptyFn,
    update: function (b) {
        b = b || {};
        Ext.applyIf(b, {
            action: "update",
            records: this.getUpdatedRecords()
        });
        var a = new Ext.data.Operation(b);
        return this.proxy.update(a, this.onProxyWrite, this)
    },
    onProxyWrite: Ext.emptyFn,
    destroy: function (b) {
        b = b || {};
        Ext.applyIf(b, {
            action: "destroy",
            records: this.getRemovedRecords()
        });
        var a = new Ext.data.Operation(b);
        return this.proxy.destroy(a, this.onProxyWrite, this)
    },
    onBatchOperationComplete: function (b, a) {
        return this.onProxyWrite(a)
    },
    onBatchComplete: function (c, a) {
        var b = c.operations,
            e = b.length,
            d;
        this.suspendEvents();
        for (d = 0; d < e; d++) {
            this.onProxyWrite(b[d])
        }
        this.resumeEvents();
        this.fireEvent("datachanged", this)
    },
    onBatchException: function (b, a) {},
    filterNew: function (a) {
        return a.phantom == true || a.needsAdd == true
    },
    getNewRecords: function () {
        return []
    },
    getUpdatedRecords: function () {
        return []
    },
    filterDirty: function (a) {
        return a.dirty == true
    },
    getRemovedRecords: function () {
        return this.removed
    },
    sort: function (b, a) {},
    decodeSorters: function (d) {
        if (!Ext.isArray(d)) {
            if (d == undefined) {
                d = []
            } else {
                d = [d]
            }
        }
        var c = d.length,
            e = Ext.util.Sorter,
            a, b;
        for (b = 0; b < c; b++) {
            a = d[b];
            if (!(a instanceof e)) {
                if (Ext.isString(a)) {
                    a = {
                        property: a
                    }
                }
                Ext.applyIf(a, {
                    root: "data",
                    direction: "ASC"
                });
                if (a.fn) {
                    a.sorterFn = a.fn
                }
                if (typeof a == "function") {
                    a = {
                        sorterFn: a
                    }
                }
                d[b] = new e(a)
            }
        }
        return d
    },
    filter: function (a, b) {},
    createSortFunction: function (d, c) {
        c = c || "ASC";
        var b = c.toUpperCase() == "DESC" ? -1 : 1;
        var a = this.model.prototype.fields,
            e = a.get(d).sortType;
        return function (g, f) {
            var i = e(g.data[d]),
                h = e(f.data[d]);
            return b * (i > h ? 1 : (i < h ? -1 : 0))
        }
    },
    decodeFilters: function (e) {
        if (!Ext.isArray(e)) {
            if (e == undefined) {
                e = []
            } else {
                e = [e]
            }
        }
        var d = e.length,
            a = Ext.util.Filter,
            b, c;
        for (c = 0; c < d; c++) {
            b = e[c];
            if (!(b instanceof a)) {
                Ext.apply(b, {
                    root: "data"
                });
                if (b.fn) {
                    b.filterFn = b.fn
                }
                if (typeof b == "function") {
                    b = {
                        filterFn: b
                    }
                }
                e[c] = new a(b)
            }
        }
        return e
    },
    clearFilter: function (a) {},
    isFiltered: function () {},
    filterBy: function (b, a) {},
    sync: function () {
        var d = this,
            b = {},
            e = d.getNewRecords(),
            c = d.getUpdatedRecords(),
            a = d.getRemovedRecords(),
            f = false;
        if (e.length > 0) {
            b.create = e;
            f = true
        }
        if (c.length > 0) {
            b.update = c;
            f = true
        }
        if (a.length > 0) {
            b.destroy = a;
            f = true
        }
        if (f && d.fireEvent("beforesync", b) !== false) {
            d.proxy.batch(b, d.getBatchListeners())
        }
    },
    getBatchListeners: function () {
        var a = {
            scope: this,
            exception: this.onBatchException
        };
        if (this.batchUpdateMode == "operation") {
            a.operationcomplete = this.onBatchOperationComplete
        } else {
            a.complete = this.onBatchComplete
        }
        return a
    },
    save: function () {
        return this.sync.apply(this, arguments)
    },
    load: function (b) {
        var c = this,
            a;
        b = b || {};
        Ext.applyIf(b, {
            action: "read",
            filters: c.filters.items,
            sorters: c.sorters.items
        });
        a = new Ext.data.Operation(b);
        if (c.fireEvent("beforeload", c, a) !== false) {
            c.loading = true;
            c.proxy.read(a, c.onProxyLoad, c)
        }
        return c
    },
    afterEdit: function (a) {
        this.fireEvent("update", this, a, Ext.data.Model.EDIT)
    },
    afterReject: function (a) {
        this.fireEvent("update", this, a, Ext.data.Model.REJECT)
    },
    afterCommit: function (a) {
        if (this.autoSave) {
            this.sync()
        }
        this.fireEvent("update", this, a, Ext.data.Model.COMMIT)
    },
    clearData: Ext.emptyFn,
    destroyStore: function () {
        if (!this.isDestroyed) {
            if (this.storeId) {
                Ext.StoreMgr.unregister(this)
            }
            this.clearData();
            this.data = null;
            this.tree = null;
            this.reader = this.writer = null;
            this.clearListeners();
            this.isDestroyed = true;
            if (this.implicitModel) {
                Ext.destroy(this.model)
            }
        }
    },
    getSortState: function () {
        return this.sortInfo
    },
    getCount: function () {},
    getById: function (a) {},
    removeAll: function () {}
});
Ext.data.Store = Ext.extend(Ext.data.AbstractStore, {
    remoteSort: false,
    remoteFilter: false,
    groupField: undefined,
    groupDir: "ASC",
    pageSize: 25,
    currentPage: 1,
    clearOnPageLoad: true,
    implicitModel: false,
    loading: false,
    sortOnFilter: true,
    isStore: true,
    constructor: function (a) {
        a = a || {};
        this.data = new Ext.util.MixedCollection(false, function (d) {
            return d.internalId
        });
        if (a.data) {
            this.inlineData = a.data;
            delete a.data
        }
        Ext.data.Store.superclass.constructor.call(this, a);
        var b = this.proxy,
            c = this.inlineData;
        if (c) {
            if (b instanceof Ext.data.MemoryProxy) {
                b.data = c;
                this.read()
            } else {
                this.add.apply(this, c)
            }
            this.sort();
            delete this.inlineData
        } else {
            if (this.autoLoad) {
                Ext.defer(this.load, 10, this, [typeof this.autoLoad == "object" ? this.autoLoad : undefined])
            }
        }
    },
    getGroups: function () {
        var d = this.data.items,
            f = d.length,
            a = [],
            c = {},
            b, g, h, e;
        for (e = 0; e < f; e++) {
            b = d[e];
            g = this.getGroupString(b);
            h = c[g];
            if (h == undefined) {
                h = {
                    name: g,
                    children: []
                };
                a.push(h);
                c[g] = h
            }
            h.children.push(b)
        }
        return a
    },
    getGroupString: function (a) {
        return a.get(this.groupField)
    },
    first: function () {
        return this.data.first()
    },
    last: function () {
        return this.data.last()
    },
    insert: function (d, c) {
        var e, b, a;
        c = [].concat(c);
        for (e = 0, a = c.length; e < a; e++) {
            b = this.createModel(c[e]);
            b.set(this.modelDefaults);
            this.data.insert(d + e, b);
            b.join(this)
        }
        if (this.snapshot) {
            this.snapshot.addAll(c)
        }
        this.fireEvent("add", this, c, d);
        this.fireEvent("datachanged", this)
    },
    add: function (b) {
        if (!Ext.isArray(b)) {
            b = Array.prototype.slice.apply(arguments)
        }
        var d = b.length,
            a, c;
        for (c = 0; c < d; c++) {
            a = this.createModel(b[c]);
            if (a.phantom == false) {
                a.needsAdd = true
            }
            b[c] = a
        }
        this.insert(this.data.length, b);
        return b
    },
    createModel: function (a) {
        if (!(a instanceof Ext.data.Model)) {
            a = Ext.ModelMgr.create(a, this.model)
        }
        return a
    },
    each: function (b, a) {
        this.data.each(b, a)
    },
    remove: function (b) {
        if (!Ext.isArray(b)) {
            b = [b]
        }
        var e = b.length,
            d, c, a;
        for (d = 0; d < e; d++) {
            a = b[d];
            c = this.data.indexOf(a);
            if (c > -1) {
                this.removed.push(a);
                if (this.snapshot) {
                    this.snapshot.remove(a)
                }
                a.unjoin(this);
                this.data.remove(a);
                this.fireEvent("remove", this, a, c)
            }
        }
        this.fireEvent("datachanged", this)
    },
    removeAt: function (b) {
        var a = this.getAt(b);
        if (a) {
            this.remove(a)
        }
    },
    load: function (a) {
        a = a || {};
        if (Ext.isFunction(a)) {
            a = {
                callback: a
            }
        }
        Ext.applyIf(a, {
            group: {
                field: this.groupField,
                direction: this.groupDir
            },
            start: 0,
            limit: this.pageSize,
            addRecords: false
        });
        return Ext.data.Store.superclass.load.call(this, a)
    },
    isLoading: function () {
        return this.loading
    },
    onProxyLoad: function (b) {
        var a = b.getRecords();
        this.loadRecords(a, b.addRecords);
        this.loading = false;
        this.fireEvent("load", this, a, b.wasSuccessful());
        this.fireEvent("read", this, a, b.wasSuccessful());
        var c = b.callback;
        if (typeof c == "function") {
            c.call(b.scope || this, a, b, b.wasSuccessful())
        }
    },
    onProxyWrite: function (c) {
        var g = this.data,
            f = c.action,
            b = c.getRecords(),
            e = b.length,
            h = c.callback,
            a, d;
        if (c.wasSuccessful()) {
            if (f == "create" || f == "update") {
                for (d = 0; d < e; d++) {
                    a = b[d];
                    a.phantom = false;
                    a.join(this);
                    g.replace(a)
                }
            } else {
                if (f == "destroy") {
                    for (d = 0; d < e; d++) {
                        a = b[d];
                        a.unjoin(this);
                        g.remove(a)
                    }
                    this.removed = []
                }
            }
            this.fireEvent("datachanged")
        }
        if (typeof h == "function") {
            h.call(c.scope || this, b, c, c.wasSuccessful())
        }
    },
    getNewRecords: function () {
        return this.data.filterBy(this.filterNew).items
    },
    getUpdatedRecords: function () {
        return this.data.filterBy(this.filterDirty).items
    },
    sort: function (e, d) {
        if (Ext.isString(e)) {
            var c = e,
                b = this.sortToggle,
                a = Ext.util.Format.toggle;
            if (d == undefined) {
                b[c] = a(b[c] || "", "ASC", "DESC");
                d = b[c]
            }
            e = {
                property: c,
                direction: d
            }
        }
        if (arguments.length != 0) {
            this.sorters.clear()
        }
        this.sorters.addAll(this.decodeSorters(e));
        if (this.remoteSort) {
            this.load()
        } else {
            this.data.sort(this.sorters.items);
            this.fireEvent("datachanged", this)
        }
    },
    filter: function (a, b) {
        if (Ext.isString(a)) {
            a = {
                property: a,
                value: b
            }
        }
        this.filters.addAll(this.decodeFilters(a));
        if (this.remoteFilter) {
            this.load()
        } else {
            this.snapshot = this.snapshot || this.data.clone();
            this.data = this.data.filter(this.filters.items);
            if (this.sortOnFilter && !this.remoteSort) {
                this.sort()
            } else {
                this.fireEvent("datachanged", this)
            }
        }
    },
    clearFilter: function (a) {
        this.filters.clear();
        if (this.isFiltered()) {
            this.data = this.snapshot.clone();
            delete this.snapshot;
            if (a !== true) {
                this.fireEvent("datachanged", this)
            }
        }
    },
    isFiltered: function () {
        return !!this.snapshot && this.snapshot != this.data
    },
    filterBy: function (b, a) {
        this.snapshot = this.snapshot || this.data.clone();
        this.data = this.queryBy(b, a || this);
        this.fireEvent("datachanged", this)
    },
    queryBy: function (b, a) {
        var c = this.snapshot || this.data;
        return c.filterBy(b, a || this)
    },
    loadData: function (f, a) {
        var c = this.model,
            e = f.length,
            d, b;
        for (d = 0; d < e; d++) {
            b = f[d];
            if (!(b instanceof Ext.data.Model)) {
                f[d] = Ext.ModelMgr.create(b, c)
            }
        }
        this.loadRecords(f, a)
    },
    loadRecords: function (a, d) {
        if (!d) {
            this.data.clear()
        }
        this.data.addAll(a);
        for (var b = 0, c = a.length; b < c; b++) {
            a[b].needsAdd = false;
            a[b].join(this)
        }
        this.suspendEvents();
        if (this.filterOnLoad && !this.remoteFilter) {
            this.filter()
        }
        if (this.sortOnLoad && !this.remoteSort) {
            this.sort()
        }
        this.resumeEvents();
        this.fireEvent("datachanged", this, a)
    },
    loadPage: function (a) {
        this.currentPage = a;
        this.read({
            page: a,
            start: (a - 1) * this.pageSize,
            limit: this.pageSize,
            addRecords: !this.clearOnPageLoad
        })
    },
    nextPage: function () {
        this.loadPage(this.currentPage + 1)
    },
    previousPage: function () {
        this.loadPage(this.currentPage - 1)
    },
    clearData: function () {
        this.data.each(function (a) {
            a.unjoin()
        });
        this.data.clear()
    },
    find: function (e, d, g, f, a, c) {
        var b = this.createFilterFn(e, d, f, a, c);
        return b ? this.data.findIndexBy(b, null, g) : -1
    },
    findRecord: function () {
        var a = this.find.apply(this, arguments);
        return a != -1 ? this.getAt(a) : null
    },
    createFilterFn: function (d, c, e, a, b) {
        if (Ext.isEmpty(c)) {
            return false
        }
        c = this.data.createValueMatcher(c, e, a, b);
        return function (f) {
            return c.test(f.data[d])
        }
    },
    findExact: function (b, a, c) {
        return this.data.findIndexBy(function (d) {
            return d.get(b) === a
        }, this, c)
    },
    findBy: function (b, a, c) {
        return this.data.findIndexBy(b, a, c)
    },
    collect: function (f, g, a) {
        var k = [],
            h = {},
            b, j, e, d, c;
        if (a === true && this.snapshot) {
            d = this.snapshot.items
        } else {
            d = this.data.items
        }
        b = d.length;
        for (c = 0; c < b; c++) {
            j = d[c].data[f];
            e = String(j);
            if ((g || !Ext.isEmpty(j)) && !h[e]) {
                h[e] = true;
                k[k.length] = j
            }
        }
        return k
    },
    sum: function (e, f, a) {
        var b = this.data.items,
            d = 0,
            c;
        f = f || 0;
        a = (a || a === 0) ? a : b.length - 1;
        for (c = f; c <= a; c++) {
            d += (b[c].data[e] || 0)
        }
        return d
    },
    getCount: function () {
        return this.data.length || 0
    },
    getAt: function (a) {
        return this.data.getAt(a)
    },
    getRange: function (b, a) {
        return this.data.getRange(b, a)
    },
    getById: function (a) {
        return (this.snapshot || this.data).findBy(function (b) {
            return b.getId() === a
        })
    },
    indexOf: function (a) {
        return this.data.indexOf(a)
    },
    indexOfId: function (a) {
        return this.data.indexOfKey(a)
    },
    removeAll: function (b) {
        var a = [];
        this.each(function (c) {
            a.push(c)
        });
        this.clearData();
        if (this.snapshot) {
            this.snapshot.clear()
        }
        if (b !== true) {
            this.fireEvent("clear", this, a)
        }
    }
});
Ext.data.TreeStore = Ext.extend(Ext.data.AbstractStore, {
    clearOnLoad: true,
    nodeParam: "node",
    defaultRootId: "root",
    constructor: function (c) {
        c = c || {};
        var a = c.root || {};
        a.id = a.id || this.defaultRootId;
        var b = new Ext.data.RecordNode(a);
        this.tree = new Ext.data.Tree(b);
        this.tree.treeStore = this;
        Ext.data.TreeStore.superclass.constructor.call(this, c);
        if (c.root) {
            this.read({
                node: b,
                doPreload: true
            })
        }
    },
    getRootNode: function () {
        return this.tree.getRootNode()
    },
    getNodeById: function (a) {
        return this.tree.getNodeById(a)
    },
    load: function (e) {
        e = e || {};
        e.params = e.params || {};
        var f = e.node || this.tree.getRootNode(),
            d, c, a = this.proxy.reader,
            b;
        if (this.clearOnLoad) {
            while (f.firstChild) {
                f.removeChild(f.firstChild)
            }
        }
        if (!e.doPreload) {
            Ext.applyIf(e, {
                node: f
            });
            c = f.getRecord();
            e.params[this.nodeParam] = c ? c.getId() : "root";
            return Ext.data.TreeStore.superclass.load.call(this, e)
        } else {
            b = a.getRoot(f.isRoot ? f.attributes : f.getRecord().raw);
            d = a.extractData(b, true);
            this.fillNode(f, d);
            return true
        }
    },
    fillNode: function (g, c) {
        g.loaded = true;
        var f = c.length,
            a, e = 0,
            d, b = g.subStore;
        for (; e < f; e++) {
            d = c[e].raw;
            c[e].data.leaf = d.leaf;
            a = new Ext.data.RecordNode({
                id: c[e].getId(),
                leaf: d.leaf,
                record: c[e],
                expanded: d.expanded
            });
            g.appendChild(a);
            if (c[e].doPreload) {
                this.load({
                    node: a,
                    doPreload: true
                })
            }
        }
        if (b) {
            if (this.clearOnLoad) {
                b.removeAll()
            }
            b.add.apply(b, c)
        }
    },
    onProxyLoad: function (b) {
        var a = b.getRecords();
        this.fillNode(b.node, a);
        this.fireEvent("read", this, b.node, a, b.wasSuccessful());
        var c = b.callback;
        if (typeof c == "function") {
            c.call(b.scope || this, a, b, b.wasSuccessful())
        }
    },
    getSubStore: function (a) {
        if (a && a.node) {
            a = a.node
        }
        return a.getSubStore()
    },
    removeAll: function () {
        var a = this.getRootNode();
        a.destroy()
    }
});
Ext.StoreMgr = Ext.apply(new Ext.util.MixedCollection(), {
    register: function () {
        for (var a = 0, b;
        (b = arguments[a]); a++) {
            this.add(b)
        }
    },
    unregister: function () {
        for (var a = 0, b;
        (b = arguments[a]); a++) {
            this.remove(this.lookup(b))
        }
    },
    lookup: function (e) {
        if (Ext.isArray(e)) {
            var b = ["field1"],
                d = !Ext.isArray(e[0]);
            if (!d) {
                for (var c = 2, a = e[0].length; c <= a; ++c) {
                    b.push("field" + c)
                }
            }
            return new Ext.data.ArrayStore({
                data: e,
                fields: b,
                expandData: d,
                autoDestroy: true,
                autoCreated: true
            })
        }
        return Ext.isObject(e) ? (e.events ? e : Ext.create(e, "store")) : this.get(e)
    },
    getKey: function (a) {
        return a.storeId
    }
});
Ext.regStore = function (c, b) {
    var a;
    if (Ext.isObject(c)) {
        b = c
    } else {
        b.storeId = c
    }
    if (b instanceof Ext.data.Store) {
        a = b
    } else {
        a = new Ext.data.Store(b)
    }
    return Ext.StoreMgr.register(a)
};
Ext.getStore = function (a) {
    return Ext.StoreMgr.lookup(a)
};
Ext.data.WriterMgr = new Ext.AbstractManager({});
Ext.data.Tree = Ext.extend(Ext.util.Observable, {
    constructor: function (a) {
        this.nodeHash = {};
        this.root = null;
        if (a) {
            this.setRootNode(a)
        }
        this.addEvents("append", "remove", "move", "insert", "beforeappend", "beforeremove", "beforemove", "beforeinsert");
        Ext.data.Tree.superclass.constructor.call(this)
    },
    pathSeparator: "/",
    proxyNodeEvent: function () {
        return this.fireEvent.apply(this, arguments)
    },
    getRootNode: function () {
        return this.root
    },
    setRootNode: function (a) {
        this.root = a;
        a.ownerTree = this;
        a.isRoot = true;
        this.registerNode(a);
        return a
    },
    getNodeById: function (a) {
        return this.nodeHash[a]
    },
    registerNode: function (a) {
        this.nodeHash[a.id] = a
    },
    unregisterNode: function (a) {
        delete this.nodeHash[a.id]
    },
    toString: function () {
        return "[Tree" + (this.id ? " " + this.id : "") + "]"
    }
});
Ext.data.Node = Ext.extend(Ext.util.Observable, {
    constructor: function (a) {
        this.attributes = a || {};
        this.leaf = !! this.attributes.leaf;
        this.id = this.attributes.id;
        if (!this.id) {
            this.id = Ext.id(null, "xnode-");
            this.attributes.id = this.id
        }
        this.childNodes = [];
        this.parentNode = null;
        this.firstChild = null;
        this.lastChild = null;
        this.previousSibling = null;
        this.nextSibling = null;
        this.addEvents({
            append: true,
            remove: true,
            move: true,
            insert: true,
            beforeappend: true,
            beforeremove: true,
            beforemove: true,
            beforeinsert: true
        });
        this.listeners = this.attributes.listeners;
        Ext.data.Node.superclass.constructor.call(this)
    },
    fireEvent: function (b) {
        if (Ext.data.Node.superclass.fireEvent.apply(this, arguments) === false) {
            return false
        }
        var a = this.getOwnerTree();
        if (a) {
            if (a.proxyNodeEvent.apply(a, arguments) === false) {
                return false
            }
        }
        return true
    },
    isLeaf: function () {
        return this.leaf === true
    },
    setFirstChild: function (a) {
        this.firstChild = a
    },
    setLastChild: function (a) {
        this.lastChild = a
    },
    isLast: function () {
        return (!this.parentNode ? true : this.parentNode.lastChild == this)
    },
    isFirst: function () {
        return (!this.parentNode ? true : this.parentNode.firstChild == this)
    },
    hasChildNodes: function () {
        return !this.isLeaf() && this.childNodes.length > 0
    },
    isExpandable: function () {
        return this.attributes.expandable || this.hasChildNodes()
    },
    appendChild: function (e) {
        var f = false,
            d, a;
        if (Ext.isArray(e)) {
            f = e
        } else {
            if (arguments.length > 1) {
                f = arguments
            }
        }
        if (f) {
            a = f.length;
            for (d = 0; d < a; d++) {
                this.appendChild(f[d])
            }
        } else {
            if (this.fireEvent("beforeappend", this.ownerTree, this, e) === false) {
                return false
            }
            var b = this.childNodes.length;
            var c = e.parentNode;
            if (c) {
                if (e.fireEvent("beforemove", e.getOwnerTree(), e, c, this, b) === false) {
                    return false
                }
                c.removeChild(e)
            }
            b = this.childNodes.length;
            if (b === 0) {
                this.setFirstChild(e)
            }
            this.childNodes.push(e);
            e.parentNode = this;
            var g = this.childNodes[b - 1];
            if (g) {
                e.previousSibling = g;
                g.nextSibling = e
            } else {
                e.previousSibling = null
            }
            e.nextSibling = null;
            this.setLastChild(e);
            e.setOwnerTree(this.getOwnerTree());
            this.fireEvent("append", this.ownerTree, this, e, b);
            if (c) {
                e.fireEvent("move", this.ownerTree, e, c, this, b)
            }
            return e
        }
    },
    removeChild: function (c, b) {
        var a = this.indexOf(c);
        if (a == -1) {
            return false
        }
        if (this.fireEvent("beforeremove", this.ownerTree, this, c) === false) {
            return false
        }
        this.childNodes.splice(a, 1);
        if (c.previousSibling) {
            c.previousSibling.nextSibling = c.nextSibling
        }
        if (c.nextSibling) {
            c.nextSibling.previousSibling = c.previousSibling
        }
        if (this.firstChild == c) {
            this.setFirstChild(c.nextSibling)
        }
        if (this.lastChild == c) {
            this.setLastChild(c.previousSibling)
        }
        this.fireEvent("remove", this.ownerTree, this, c);
        if (b) {
            c.destroy(true)
        } else {
            c.clear()
        }
        return c
    },
    clear: function (a) {
        this.setOwnerTree(null, a);
        this.parentNode = this.previousSibling = this.nextSibling = null;
        if (a) {
            this.firstChild = this.lastChild = null
        }
    },
    destroy: function (a) {
        if (a === true) {
            this.clearListeners();
            this.clear(true);
            Ext.each(this.childNodes, function (b) {
                b.destroy(true)
            });
            this.childNodes = null
        } else {
            this.remove(true)
        }
    },
    insertBefore: function (d, a) {
        if (!a) {
            return this.appendChild(d)
        }
        if (d == a) {
            return false
        }
        if (this.fireEvent("beforeinsert", this.ownerTree, this, d, a) === false) {
            return false
        }
        var b = this.indexOf(a),
            c = d.parentNode,
            e = b;
        if (c == this && this.indexOf(d) < b) {
            e--
        }
        if (c) {
            if (d.fireEvent("beforemove", d.getOwnerTree(), d, c, this, b, a) === false) {
                return false
            }
            c.removeChild(d)
        }
        if (e === 0) {
            this.setFirstChild(d)
        }
        this.childNodes.splice(e, 0, d);
        d.parentNode = this;
        var f = this.childNodes[e - 1];
        if (f) {
            d.previousSibling = f;
            f.nextSibling = d
        } else {
            d.previousSibling = null
        }
        d.nextSibling = a;
        a.previousSibling = d;
        d.setOwnerTree(this.getOwnerTree());
        this.fireEvent("insert", this.ownerTree, this, d, a);
        if (c) {
            d.fireEvent("move", this.ownerTree, d, c, this, e, a)
        }
        return d
    },
    remove: function (b) {
        var a = this.parentNode;
        if (a) {
            a.removeChild(this, b)
        }
        return this
    },
    removeAll: function (a) {
        var c = this.childNodes,
            b;
        while ((b = c[0])) {
            this.removeChild(b, a)
        }
        return this
    },
    getChildAt: function (a) {
        return this.childNodes[a]
    },
    replaceChild: function (a, c) {
        var b = c ? c.nextSibling : null;
        this.removeChild(c);
        this.insertBefore(a, b);
        return c
    },
    indexOf: function (a) {
        return this.childNodes.indexOf(a)
    },
    getOwnerTree: function () {
        if (!this.ownerTree) {
            var a = this;
            while (a) {
                if (a.ownerTree) {
                    this.ownerTree = a.ownerTree;
                    break
                }
                a = a.parentNode
            }
        }
        return this.ownerTree
    },
    getDepth: function () {
        var b = 0,
            a = this;
        while (a.parentNode) {
            ++b;
            a = a.parentNode
        }
        return b
    },
    setOwnerTree: function (a, b) {
        if (a != this.ownerTree) {
            if (this.ownerTree) {
                this.ownerTree.unregisterNode(this)
            }
            this.ownerTree = a;
            if (b !== true) {
                Ext.each(this.childNodes, function (c) {
                    c.setOwnerTree(a)
                })
            }
            if (a) {
                a.registerNode(this)
            }
        }
    },
    setId: function (b) {
        if (b !== this.id) {
            var a = this.ownerTree;
            if (a) {
                a.unregisterNode(this)
            }
            this.id = this.attributes.id = b;
            if (a) {
                a.registerNode(this)
            }
            this.onIdChange(b)
        }
    },
    onIdChange: Ext.emptyFn,
    getPath: function (c) {
        c = c || "id";
        var e = this.parentNode,
            a = [this.attributes[c]];
        while (e) {
            a.unshift(e.attributes[c]);
            e = e.parentNode
        }
        var d = this.getOwnerTree().pathSeparator;
        return d + a.join(d)
    },
    bubble: function (c, b, a) {
        var d = this;
        while (d) {
            if (c.apply(b || d, a || [d]) === false) {
                break
            }
            d = d.parentNode
        }
    },
    cascadeBy: function (d, c, a) {
        if (d.apply(c || this, a || [this]) !== false) {
            var f = this.childNodes,
                e = f.length,
                b;
            for (b = 0; b < e; b++) {
                f[b].cascadeBy(d, c, a)
            }
        }
    },
    eachChild: function (d, c, a) {
        var f = this.childNodes,
            e = f.length,
            b;
        for (b = 0; b < e; b++) {
            if (d.apply(c || this, a || [f[b]]) === false) {
                break
            }
        }
    },
    findChild: function (b, c, a) {
        return this.findChildBy(function () {
            return this.attributes[b] == c
        }, null, a)
    },
    findChildBy: function (g, f, b) {
        var e = this.childNodes,
            a = e.length,
            d = 0,
            h, c;
        for (; d < a; d++) {
            h = e[d];
            if (g.call(f || h, h) === true) {
                return h
            } else {
                if (b) {
                    c = h.findChildBy(g, f, b);
                    if (c != null) {
                        return c
                    }
                }
            }
        }
        return null
    },
    sort: function (e, d) {
        var c = this.childNodes,
            a = c.length,
            b, g;
        if (a > 0) {
            var f = d ?
            function () {
                return e.apply(d, arguments)
            } : e;
            c.sort(f);
            for (b = 0; b < a; b++) {
                g = c[b];
                g.previousSibling = c[b - 1];
                g.nextSibling = c[b + 1];
                if (b === 0) {
                    this.setFirstChild(g)
                }
                if (b == a - 1) {
                    this.setLastChild(g)
                }
            }
        }
    },
    contains: function (a) {
        return a.isAncestor(this)
    },
    isAncestor: function (a) {
        var b = this.parentNode;
        while (b) {
            if (b == a) {
                return true
            }
            b = b.parentNode
        }
        return false
    },
    toString: function () {
        return "[Node" + (this.id ? " " + this.id : "") + "]"
    }
});
Ext.data.RecordNode = Ext.extend(Ext.data.Node, {
    constructor: function (a) {
        a = a || {};
        if (a.record) {
            a.record.node = this
        }
        Ext.data.RecordNode.superclass.constructor.call(this, a)
    },
    getChildRecords: function () {
        var e = this.childNodes,
            d = e.length,
            b = 0,
            a = [],
            c;
        for (; b < d; b++) {
            c = e[b].attributes.record;
            c.data.leaf = e[b].leaf;
            a.push(c)
        }
        return a
    },
    getRecord: function () {
        return this.attributes.record
    },
    getSubStore: function () {
        if (this.isLeaf()) {
            throw "Attempted to get a substore of a leaf node."
        }
        var b = this.getOwnerTree().treeStore;
        if (!this.subStore) {
            this.subStore = new Ext.data.Store({
                model: b.model
            });
            var a = this.getChildRecords();
            this.subStore.add.apply(this.subStore, a)
        }
        if (!this.loaded) {
            b.load({
                node: this
            })
        }
        return this.subStore
    },
    destroy: function (b) {
        if (this.subStore) {
            this.subStore.destroyStore()
        }
        var a = this.attributes;
        if (a.record) {
            delete a.record.node;
            delete a.record
        }
        return Ext.data.RecordNode.superclass.destroy.call(this, b)
    }
});
Ext.data.Proxy = Ext.extend(Ext.util.Observable, {
    batchOrder: "create,update,destroy",
    defaultReaderType: "json",
    defaultWriterType: "json",
    constructor: function (a) {
        a = a || {};
        if (a.model == undefined) {
            delete a.model
        }
        Ext.data.Proxy.superclass.constructor.call(this, a);
        if (this.model != undefined && !(this.model instanceof Ext.data.Model)) {
            this.setModel(this.model)
        }
    },
    setModel: function (b, c) {
        this.model = Ext.ModelMgr.getModel(b);
        var a = this.reader,
            d = this.writer;
        this.setReader(a);
        this.setWriter(d);
        if (c && this.store) {
            this.store.setModel(this.model)
        }
    },
    getModel: function () {
        return this.model
    },
    setReader: function (a) {
        if (a == undefined || typeof a == "string") {
            a = {
                type: a
            }
        }
        if (a instanceof Ext.data.Reader) {
            a.setModel(this.model)
        } else {
            Ext.applyIf(a, {
                proxy: this,
                model: this.model,
                type: this.defaultReaderType
            });
            a = Ext.data.ReaderMgr.create(a)
        }
        this.reader = a;
        return this.reader
    },
    getReader: function () {
        return this.reader
    },
    setWriter: function (a) {
        if (a == undefined || typeof a == "string") {
            a = {
                type: a
            }
        }
        if (!(a instanceof Ext.data.Writer)) {
            Ext.applyIf(a, {
                model: this.model,
                type: this.defaultWriterType
            });
            a = Ext.data.WriterMgr.create(a)
        }
        this.writer = a;
        return this.writer
    },
    getWriter: function () {
        return this.writer
    },
    create: Ext.emptyFn,
    read: Ext.emptyFn,
    update: Ext.emptyFn,
    destroy: Ext.emptyFn,
    batch: function (b, c) {
        var a = new Ext.data.Batch({
            proxy: this,
            listeners: c || {}
        });
        Ext.each(this.batchOrder.split(","), function (d) {
            if (b[d]) {
                a.add(new Ext.data.Operation({
                    action: d,
                    records: b[d]
                }))
            }
        }, this);
        a.start();
        return a
    }
});
Ext.data.DataProxy = Ext.data.Proxy;
Ext.data.ProxyMgr.registerType("proxy", Ext.data.Proxy);
Ext.data.ServerProxy = Ext.extend(Ext.data.Proxy, {
    pageParam: "page",
    startParam: "start",
    limitParam: "limit",
    groupParam: "group",
    sortParam: "sort",
    filterParam: "filter",
    noCache: true,
    cacheString: "_dc",
    timeout: 30000,
    constructor: function (a) {
        a = a || {};
        Ext.data.ServerProxy.superclass.constructor.call(this, a);
        this.extraParams = a.extraParams || {};
        this.nocache = this.noCache
    },
    create: function () {
        return this.doRequest.apply(this, arguments)
    },
    read: function () {
        return this.doRequest.apply(this, arguments)
    },
    update: function () {
        return this.doRequest.apply(this, arguments)
    },
    destroy: function () {
        return this.doRequest.apply(this, arguments)
    },
    buildRequest: function (a) {
        var c = Ext.applyIf(a.params || {}, this.extraParams || {});
        c = Ext.applyIf(c, this.getParams(c, a));
        var b = new Ext.data.Request({
            params: c,
            action: a.action,
            records: a.records,
            operation: a
        });
        b.url = this.buildUrl(b);
        a.request = b;
        return b
    },
    encodeSorters: function (d) {
        var b = [],
            c = d.length,
            a;
        for (a = 0; a < c; a++) {
            b[a] = {
                property: d[a].property,
                direction: d[a].direction
            }
        }
        return Ext.encode(b)
    },
    encodeFilters: function (d) {
        var b = [],
            c = d.length,
            a;
        for (a = 0; a < c; a++) {
            b[a] = {
                property: d[a].property,
                value: d[a].value
            }
        }
        return Ext.encode(b)
    },
    encodeGroupers: function (a) {
        return Ext.encode(a)
    },
    getParams: function (e, f) {
        e = e || {};
        var l = f.group,
            k = f.sorters,
            d = f.filters,
            j = f.page,
            b = f.start,
            g = f.limit,
            n = this.pageParam,
            i = this.startParam,
            m = this.limitParam,
            h = this.groupParam,
            c = this.sortParam,
            a = this.filterParam;
        if (n && j) {
            e[n] = j
        }
        if (i && b) {
            e[i] = b
        }
        if (m && g) {
            e[m] = g
        }
        if (h && l && l.field) {
            e[h] = this.encodeGroupers(l)
        }
        if (c && k && k.length > 0) {
            e[c] = this.encodeSorters(k)
        }
        if (a && d && d.length > 0) {
            e[a] = this.encodeFilters(d)
        }
        return e
    },
    buildUrl: function (b) {
        var a = b.url || this.url;
        if (!a) {
            throw new Error("You are using a ServerProxy but have not supplied it with a url.")
        }
        if (this.noCache) {
            a = Ext.urlAppend(a, Ext.util.Format.format("{0}={1}", this.cacheString, (new Date().getTime())))
        }
        return a
    },
    doRequest: function (a, c, b) {
        throw new Error("The doRequest function has not been implemented on your Ext.data.ServerProxy subclass. See src/data/ServerProxy.js for details")
    },
    afterRequest: Ext.emptyFn,
    onDestroy: function () {
        Ext.destroy(this.reader, this.writer);
        Ext.data.ServerProxy.superclass.destroy.apply(this, arguments)
    }
});
Ext.data.AjaxProxy = Ext.extend(Ext.data.ServerProxy, {
    actionMethods: {
        create: "POST",
        read: "GET",
        update: "POST",
        destroy: "POST"
    },
    constructor: function () {
        this.addEvents("exception");
        Ext.data.AjaxProxy.superclass.constructor.apply(this, arguments)
    },
    doRequest: function (a, e, b) {
        var d = this.getWriter(),
            c = this.buildRequest(a, e, b);
        if (a.allowWrite()) {
            c = d.write(c)
        }
        Ext.apply(c, {
            headers: this.headers,
            timeout: this.timeout,
            scope: this,
            callback: this.createRequestCallback(c, a, e, b),
            method: this.getMethod(c),
            disableCaching: false
        });
        Ext.Ajax.request(c);
        return c
    },
    getMethod: function (a) {
        return this.actionMethods[a.action]
    },
    createRequestCallback: function (d, a, e, b) {
        var c = this;
        return function (o, n, h) {
            if (n === true) {
                var l = c.getReader(),
                    p = l.read(h),
                    g = p.records,
                    f = g.length,
                    m = new Ext.util.MixedCollection(true, function (i) {
                        return i.getId()
                    }),
                    k, j;
                m.addAll(a.records);
                for (j = 0; j < f; j++) {
                    k = m.get(g[j].getId());
                    if (k) {
                        k.set(k.data)
                    }
                }
                Ext.apply(a, {
                    response: h,
                    resultSet: p
                });
                a.setCompleted();
                a.setSuccessful()
            } else {
                c.fireEvent("exception", this, h, a);
                a.setException()
            }
            if (typeof e == "function") {
                e.call(b || c, a)
            }
            c.afterRequest(d, true)
        }
    }
});
Ext.data.ProxyMgr.registerType("ajax", Ext.data.AjaxProxy);
Ext.data.HttpProxy = Ext.data.AjaxProxy;
Ext.data.RestProxy = Ext.extend(Ext.data.AjaxProxy, {
    appendId: true,
    actionMethods: {
        create: "POST",
        read: "GET",
        update: "PUT",
        destroy: "DELETE"
    },
    api: {
        create: "create",
        read: "read",
        update: "update",
        destroy: "destroy"
    },
    buildUrl: function (d) {
        var b = d.operation.records || [],
            a = b[0],
            e = this.format,
            c = d.url || this.url;
        if (this.appendId && a) {
            if (!c.match(/\/$/)) {
                c += "/"
            }
            c += a.getId()
        }
        if (e) {
            if (!c.match(/\.$/)) {
                c += "."
            }
            c += e
        }
        d.url = c;
        return Ext.data.RestProxy.superclass.buildUrl.apply(this, arguments)
    }
});
Ext.data.ProxyMgr.registerType("rest", Ext.data.RestProxy);
Ext.apply(Ext, {
    getHead: function () {
        var a;
        return function () {
            if (a == undefined) {
                a = Ext.get(document.getElementsByTagName("head")[0])
            }
            return a
        }
    }()
});
Ext.data.ScriptTagProxy = Ext.extend(Ext.data.ServerProxy, {
    defaultWriterType: "base",
    callbackParam: "callback",
    scriptIdPrefix: "stcScript",
    callbackPrefix: "stcCallback",
    recordParam: "records",
    lastRequest: undefined,
    autoAppendParams: true,
    constructor: function () {
        this.addEvents("exception");
        Ext.data.ScriptTagProxy.superclass.constructor.apply(this, arguments)
    },
    doRequest: function (f, j, k) {
        var i = Ext.util.Format.format,
            a = ++Ext.data.ScriptTagProxy.TRANS_ID,
            c = i("{0}{1}", this.scriptIdPrefix, a),
            d = i("{0}{1}", this.callbackPrefix, a);
        var e = this.getWriter(),
            g = this.buildRequest(f),
            b = Ext.urlAppend(g.url, i("{0}={1}", this.callbackParam, d));
        if (f.allowWrite()) {
            g = e.write(g)
        }
        Ext.apply(g, {
            url: b,
            transId: a,
            scriptId: c,
            stCallback: d
        });
        g.timeoutId = Ext.defer(this.createTimeoutHandler, this.timeout, this, [g, f]);
        window[d] = this.createRequestCallback(g, f, j, k);
        var h = document.createElement("script");
        h.setAttribute("src", b);
        h.setAttribute("async", true);
        h.setAttribute("type", "text/javascript");
        h.setAttribute("id", c);
        Ext.getHead().appendChild(h);
        f.setStarted();
        this.lastRequest = g;
        return g
    },
    createRequestCallback: function (d, a, e, b) {
        var c = this;
        return function (h) {
            var g = c.getReader(),
                f = g.read(h);
            Ext.apply(a, {
                response: h,
                resultSet: f
            });
            a.setCompleted();
            a.setSuccessful();
            if (typeof e == "function") {
                e.call(b || c, a)
            }
            c.afterRequest(d, true)
        }
    },
    afterRequest: function () {
        var a = function (b) {
                return function () {
                    window[b] = undefined;
                    try {
                        delete window[b]
                    } catch (c) {}
                }
            };
        return function (c, b) {
            Ext.get(c.scriptId).remove();
            clearTimeout(c.timeoutId);
            var d = c.stCallback;
            if (b) {
                a(d)();
                this.lastRequest.completed = true
            } else {
                window[d] = a(d)
            }
        }
    }(),
    buildUrl: function (f) {
        var b = Ext.data.ScriptTagProxy.superclass.buildUrl.call(this, f),
            g = Ext.apply({}, f.params),
            e = g.filters,
            d, c;
        delete g.filters;
        if (this.autoAppendParams) {
            b = Ext.urlAppend(b, Ext.urlEncode(g))
        }
        if (e && e.length) {
            for (c = 0; c < e.length; c++) {
                d = e[c];
                if (d.value) {
                    b = Ext.urlAppend(b, d.property + "=" + d.value)
                }
            }
        }
        var a = f.records;
        if (Ext.isArray(a) && a.length > 0) {
            b = Ext.urlAppend(b, Ext.util.Format.format("{0}={1}", this.recordParam, this.encodeRecords(a)))
        }
        return b
    },
    destroy: function () {
        this.abort();
        Ext.data.ScriptTagProxy.superclass.destroy.apply(this, arguments)
    },
    isLoading: function () {
        var a = this.lastRequest;
        return (a != undefined && !a.completed)
    },
    abort: function () {
        if (this.isLoading()) {
            this.afterRequest(this.lastRequest)
        }
    },
    encodeRecords: function (a) {
        var d = "";
        for (var b = 0, c = a.length; b < c; b++) {
            d += Ext.urlEncode(a[b].data)
        }
        return d
    },
    createTimeoutHandler: function (b, a) {
        this.afterRequest(b, false);
        this.fireEvent("exception", this, b, a);
        if (typeof b.callback == "function") {
            b.callback.call(b.scope || window, null, b.options, false)
        }
    }
});
Ext.data.ScriptTagProxy.TRANS_ID = 1000;
Ext.data.ProxyMgr.registerType("scripttag", Ext.data.ScriptTagProxy);
Ext.data.ClientProxy = Ext.extend(Ext.data.Proxy, {
    clear: function () {
        throw new Error("The Ext.data.ClientProxy subclass that you are using has not defined a 'clear' function. See src/data/ClientProxy.js for details.")
    }
});
Ext.data.MemoryProxy = Ext.extend(Ext.data.ClientProxy, {
    constructor: function (a) {
        Ext.data.MemoryProxy.superclass.constructor.call(this, a);
        this.setReader(this.reader)
    },
    read: function (c, e, d) {
        var b = this.getReader(),
            a = b.read(this.data);
        Ext.apply(c, {
            resultSet: a
        });
        c.setCompleted();
        if (typeof e == "function") {
            e.call(d || this, c)
        }
    },
    clear: Ext.emptyFn
});
Ext.data.ProxyMgr.registerType("memory", Ext.data.MemoryProxy);
Ext.data.WebStorageProxy = Ext.extend(Ext.data.ClientProxy, {
    id: undefined,
    constructor: function (a) {
        Ext.data.WebStorageProxy.superclass.constructor.call(this, a);
        this.cache = {};
        if (this.getStorageObject() == undefined) {
            throw "Local Storage is not supported in this browser, please use another type of data proxy"
        }
        this.id = this.id || (this.store ? this.store.storeId : undefined);
        if (this.id == undefined) {
            throw "No unique id was provided to the local storage proxy. See Ext.data.LocalStorageProxy documentation for details"
        }
        this.initialize()
    },
    create: function (e, h, j) {
        var d = e.records,
            c = d.length,
            a = this.getIds(),
            b, g, f;
        e.setStarted();
        for (f = 0; f < c; f++) {
            g = d[f];
            if (g.phantom) {
                g.phantom = false;
                b = this.getNextId()
            } else {
                b = g.getId()
            }
            this.setRecord(g, b);
            a.push(b)
        }
        this.setIds(a);
        e.setCompleted();
        e.setSuccessful();
        if (typeof h == "function") {
            h.call(j || this, e)
        }
    },
    read: function (e, h, j) {
        var d = [],
            a = this.getIds(),
            c = a.length,
            f, b, g;
        if (e.id) {
            g = this.getRecord(e.id);
            if (g) {
                d.push(g);
                e.setSuccessful()
            }
        } else {
            for (f = 0; f < c; f++) {
                d.push(this.getRecord(a[f]))
            }
            e.setSuccessful()
        }
        e.setCompleted();
        e.resultSet = new Ext.data.ResultSet({
            records: d,
            total: d.length,
            loaded: true
        });
        if (typeof h == "function") {
            h.call(j || this, e)
        }
    },
    update: function (e, h, j) {
        var d = e.records,
            c = d.length,
            a = this.getIds(),
            g, b, f;
        e.setStarted();
        for (f = 0; f < c; f++) {
            g = d[f];
            this.setRecord(g);
            b = g.getId();
            if (b !== undefined && a.indexOf(b) == -1) {
                a.push(b)
            }
        }
        this.setIds(a);
        e.setCompleted();
        e.setSuccessful();
        if (typeof h == "function") {
            h.call(j || this, e)
        }
    },
    destroy: function (b, h, e) {
        var a = b.records,
            f = a.length,
            d = this.getIds(),
            g = [].concat(d),
            c;
        for (c = 0; c < f; c++) {
            g.remove(a[c].getId());
            this.removeRecord(a[c], false)
        }
        this.setIds(g);
        if (typeof h == "function") {
            h.call(e || this, b)
        }
    },
    getRecord: function (c) {
        if (this.cache[c] == undefined) {
            var a = Ext.decode(this.getStorageObject().getItem(this.getRecordKey(c))),
                f = {},
                e = this.model,
                j = e.prototype.fields.items,
                d = j.length,
                g, k, b, h;
            for (g = 0; g < d; g++) {
                k = j[g];
                b = k.name;
                if (typeof k.decode == "function") {
                    f[b] = k.decode(a[b])
                } else {
                    f[b] = a[b]
                }
            }
            h = new e(f, c);
            h.phantom = false;
            this.cache[c] = h
        }
        return this.cache[c]
    },
    setRecord: function (j, c) {
        if (c) {
            j.setId(c)
        } else {
            c = j.getId()
        }
        var a = j.data,
            f = {},
            h = this.model,
            k = h.prototype.fields.items,
            d = k.length,
            g, l, b;
        for (g = 0; g < d; g++) {
            l = k[g];
            b = l.name;
            if (typeof l.encode == "function") {
                f[b] = l.encode(a[b], j)
            } else {
                f[b] = a[b]
            }
        }
        var e = this.getStorageObject(),
            m = this.getRecordKey(c);
        this.cache[c] = j;
        e.removeItem(m);
        e.setItem(m, Ext.encode(f))
    },
    removeRecord: function (c, b) {
        if (c instanceof Ext.data.Model) {
            c = c.getId()
        }
        if (b !== false) {
            var a = this.getIds();
            a.remove(c);
            this.setIds(a)
        }
        this.getStorageObject().removeItem(this.getRecordKey(c))
    },
    getRecordKey: function (a) {
        if (a instanceof Ext.data.Model) {
            a = a.getId()
        }
        return Ext.util.Format.format("{0}-{1}", this.id, a)
    },
    getRecordCounterKey: function () {
        return Ext.util.Format.format("{0}-counter", this.id)
    },
    getIds: function () {
        var b = (this.getStorageObject().getItem(this.id) || "").split(","),
            c = b.length,
            a;
        if (c == 1 && b[0] == "") {
            b = []
        } else {
            for (a = 0; a < c; a++) {
                b[a] = parseInt(b[a], 10)
            }
        }
        return b
    },
    setIds: function (a) {
        var b = this.getStorageObject(),
            c = a.join(",");
        b.removeItem(this.id);
        if (!Ext.isEmpty(c)) {
            b.setItem(this.id, c)
        }
    },
    getNextId: function () {
        var d = this.getStorageObject(),
            a = this.getRecordCounterKey(),
            c = d[a],
            b, e;
        if (c == undefined) {
            b = this.getIds();
            c = b[b.length - 1] || 0
        }
        e = parseInt(c, 10) + 1;
        d.setItem(a, e);
        return e
    },
    initialize: function () {
        var a = this.getStorageObject();
        a.setItem(this.id, a.getItem(this.id) || "")
    },
    clear: function () {
        var d = this.getStorageObject(),
            c = this.getIds(),
            a = c.length,
            b;
        for (b = 0; b < a; b++) {
            this.removeRecord(c[b])
        }
        d.removeItem(this.getRecordCounterKey());
        d.removeItem(this.id)
    },
    getStorageObject: function () {
        throw new Error("The getStorageObject function has not been defined in your Ext.data.WebStorageProxy subclass")
    }
});
Ext.data.LocalStorageProxy = Ext.extend(Ext.data.WebStorageProxy, {
    getStorageObject: function () {
        return window.localStorage
    }
});
Ext.data.ProxyMgr.registerType("localstorage", Ext.data.LocalStorageProxy);
Ext.data.SessionStorageProxy = Ext.extend(Ext.data.WebStorageProxy, {
    getStorageObject: function () {
        return window.sessionStorage
    }
});
Ext.data.ProxyMgr.registerType("sessionstorage", Ext.data.SessionStorageProxy);
Ext.data.Reader = Ext.extend(Object, {
    idProperty: "id",
    totalProperty: "total",
    successProperty: "success",
    root: "",
    implicitIncludes: true,
    nullResultSet: new Ext.data.ResultSet({
        total: 0,
        count: 0,
        records: [],
        success: true
    }),
    constructor: function (a) {
        Ext.apply(this, a || {});
        this.model = Ext.ModelMgr.getModel(a.model);
        if (this.model) {
            this.buildExtractors()
        }
    },
    setModel: function (a, b) {
        this.model = Ext.ModelMgr.getModel(a);
        this.buildExtractors(true);
        if (b && this.proxy) {
            this.proxy.setModel(this.model, true)
        }
    },
    read: function (a) {
        var b = a;
        if (a && a.responseText) {
            b = this.getResponseData(a)
        }
        if (b) {
            return this.readRecords(b)
        } else {
            return this.nullResultSet
        }
    },
    readRecords: function (f) {
        this.rawData = f;
        f = this.getData(f);
        var a = this.getRoot(f),
            d = a.length,
            g = true,
            e, b, c;
        if (this.totalProperty) {
            e = parseInt(this.getTotal(f), 10);
            if (!isNaN(e)) {
                d = e
            }
        }
        if (this.successProperty) {
            e = this.getSuccess(f);
            if (e === false || e === "false") {
                g = false
            }
        }
        b = this.extractData(a, true);
        c = b.length;
        return new Ext.data.ResultSet({
            total: d || c,
            count: c,
            records: b,
            success: g
        })
    },
    extractData: function (j, a) {
        var k = [],
            f = [],
            d = this.model,
            c = j.length,
            l = this.idProperty,
            e, b, h, g;
        for (g = 0; g < c; g++) {
            e = j[g];
            k = this.extractValues(e);
            b = this.getId(e);
            if (a === true) {
                h = new d(k, b);
                h.raw = e;
                f.push(h);
                if (this.implicitIncludes) {
                    this.readAssociated(h, e)
                }
            } else {
                k[l] = b;
                f.push(k)
            }
        }
        return f
    },
    readAssociated: function (h, g) {
        var e = h.associations.items,
            a = e.length,
            d, m, n, c, b, k, j, l, f;
        for (f = 0; f < a; f++) {
            d = e[f];
            m = d.name;
            c = this.getAssociatedDataRoot(g, d.associationKey || m);
            n = d.associatedModel;
            if (c) {
                k = n.proxy;
                if (k) {
                    j = k.getReader()
                } else {
                    j = new this.constructor({
                        model: d.associatedName
                    })
                }
                if (d.type == "hasMany") {
                    l = h[m]();
                    l.add.apply(l, j.read(c).records);
                    b = n.prototype.associations.findBy(function (i) {
                        return i.type == "belongsTo" && i.associatedName == h.constructor.modelName
                    });
                    if (b) {
                        l.data.each(function (i) {
                            i[b.instanceName] = h
                        })
                    }
                } else {
                    if (d.type == "belongsTo") {
                        h[d.instanceName] = j.read([c]).records[0]
                    }
                }
            }
        }
    },
    getAssociatedDataRoot: function (b, a) {
        return b[a]
    },
    extractValues: function (f) {
        var a = this.model.prototype.fields.items,
            d = a.length,
            b = {},
            g, e, c;
        for (c = 0; c < d; c++) {
            g = a[c];
            e = this.extractorFunctions[c](f) || g.defaultValue;
            b[g.name] = e
        }
        return b
    },
    getData: function (a) {
        return a
    },
    getRoot: function (a) {
        return a
    },
    getResponseData: function (a) {
        throw new Error("getResponseData must be implemented in the Ext.data.Reader subclass")
    },
    onMetaChange: function (c) {
        var a = c.fields,
            b;
        Ext.apply(this, c);
        if (a) {
            b = Ext.regModel("JsonReader-Model" + Ext.id(), {
                fields: a
            });
            this.setModel(b, true)
        } else {
            this.buildExtractors(true)
        }
    },
    buildExtractors: function (d) {
        if (d === true) {
            delete this.extractorFunctions
        }
        if (this.extractorFunctions) {
            return
        }
        var f = this.id || this.idProperty,
            c = this.totalProperty,
            b = this.successProperty,
            e = this.messageProperty;
        if (c) {
            this.getTotal = this.createAccessor(c)
        }
        if (b) {
            this.getSuccess = this.createAccessor(b)
        }
        if (e) {
            this.getMessage = this.createAccessor(e)
        }
        if (f) {
            var a = this.createAccessor(f);
            this.getId = function (g) {
                var h = a(g);
                return (h == undefined || h == "") ? null : h
            }
        } else {
            this.getId = function () {
                return null
            }
        }
        this.buildFieldExtractors()
    },
    buildFieldExtractors: function () {
        var a = this.model.prototype.fields.items,
            c = a.length,
            b = 0,
            f = [],
            e, d;
        for (; b < c; b++) {
            e = a[b];
            d = (e.mapping !== undefined && e.mapping !== null) ? e.mapping : e.name;
            f.push(this.createAccessor(d))
        }
        this.extractorFunctions = f
    }
});
Ext.data.Writer = Ext.extend(Object, {
    constructor: function (a) {
        Ext.apply(this, a)
    },
    write: function (e) {
        var b = e.operation,
            a = b.records || [],
            d = a.length,
            c = 0,
            f = [];
        for (; c < d; c++) {
            f.push(this.getRecordData(a[c]))
        }
        return this.writeRecords(e, f)
    },
    getRecordData: function (a) {
        return a.data
    }
});
Ext.data.WriterMgr.registerType("base", Ext.data.Writer);
Ext.data.JsonWriter = Ext.extend(Ext.data.Writer, {
    root: "records",
    encode: false,
    writeRecords: function (a, b) {
        if (this.encode === true) {
            b = Ext.encode(b)
        }
        a.jsonData = a.jsonData || {};
        a.jsonData[this.root] = b;
        return a
    }
});
Ext.data.WriterMgr.registerType("json", Ext.data.JsonWriter);
Ext.data.JsonReader = Ext.extend(Ext.data.Reader, {
    root: "",
    readRecords: function (a) {
        if (a.metaData) {
            this.onMetaChange(a.metaData)
        }
        this.jsonData = a;
        return Ext.data.JsonReader.superclass.readRecords.call(this, a)
    },
    getResponseData: function (a) {
        try {
            var c = Ext.decode(a.responseText)
        } catch (b) {
            throw "Ext.data.JsonReader.getResponseData: Unable to parse JSON returned by Server."
        }
        if (!c) {
            throw "Ext.data.JsonReader.getResponseData: JSON object not found"
        }
        return c
    },
    buildExtractors: function () {
        Ext.data.JsonReader.superclass.buildExtractors.apply(this, arguments);
        if (this.root) {
            this.getRoot = this.createAccessor(this.root)
        } else {
            this.getRoot = function (a) {
                return a
            }
        }
    },
    extractData: function (a, c) {
        var f = this.record,
            e = [],
            d, b;
        if (f) {
            d = a.length;
            for (b = 0; b < d; b++) {
                e[b] = a[b][f]
            }
        } else {
            e = a
        }
        return Ext.data.JsonReader.superclass.extractData.call(this, e, c)
    },
    createAccessor: function () {
        var a = /[\[\.]/;
        return function (c) {
            if (Ext.isEmpty(c)) {
                return Ext.emptyFn
            }
            if (Ext.isFunction(c)) {
                return c
            }
            var b = String(c).search(a);
            if (b >= 0) {
                return new Function("obj", "return obj" + (b > 0 ? "." : "") + c)
            }
            return function (d) {
                return d[c]
            }
        }
    }()
});
Ext.data.ReaderMgr.registerType("json", Ext.data.JsonReader);
Ext.data.TreeReader = Ext.extend(Ext.data.JsonReader, {
    extractData: function (b, e) {
        var c = Ext.data.TreeReader.superclass.extractData.call(this, b, e),
            f = c.length,
            d = 0,
            a;
        if (e) {
            for (; d < f; d++) {
                a = c[d];
                a.doPreload = !! this.getRoot(a.raw)
            }
        }
        return c
    }
});
Ext.data.ReaderMgr.registerType("tree", Ext.data.TreeReader);
Ext.data.ArrayReader = Ext.extend(Ext.data.JsonReader, {
    buildExtractors: function () {
        Ext.data.ArrayReader.superclass.buildExtractors.apply(this, arguments);
        var a = this.model.prototype.fields.items,
            c = a.length,
            d = [],
            b;
        for (b = 0; b < c; b++) {
            d.push(function (e) {
                return function (f) {
                    return f[e]
                }
            }(a[b].mapping || b))
        }
        this.extractorFunctions = d
    }
});
Ext.data.ReaderMgr.registerType("array", Ext.data.ArrayReader);
Ext.data.ArrayStore = Ext.extend(Ext.data.Store, {
    constructor: function (a) {
        a = a || {};
        Ext.applyIf(a, {
            proxy: {
                type: "memory",
                reader: "array"
            }
        });
        Ext.data.ArrayStore.superclass.constructor.call(this, a)
    },
    loadData: function (e, a) {
        if (this.expandData === true) {
            var d = [],
                b = 0,
                c = e.length;
            for (; b < c; b++) {
                d[d.length] = [e[b]]
            }
            e = d
        }
        Ext.data.ArrayStore.superclass.loadData.call(this, e, a)
    }
});
Ext.reg("arraystore", Ext.data.ArrayStore);
Ext.data.SimpleStore = Ext.data.ArrayStore;
Ext.reg("simplestore", Ext.data.SimpleStore);
Ext.data.JsonStore = Ext.extend(Ext.data.Store, {
    constructor: function (a) {
        a = a || {};
        Ext.applyIf(a, {
            proxy: {
                type: "ajax",
                reader: "json",
                writer: "json"
            }
        });
        Ext.data.JsonStore.superclass.constructor.call(this, a)
    }
});
Ext.reg("jsonstore", Ext.data.JsonStore);
Ext.data.JsonPStore = Ext.extend(Ext.data.Store, {
    constructor: function (a) {
        Ext.data.JsonPStore.superclass.constructor.call(this, Ext.apply(a, {
            reader: new Ext.data.JsonReader(a),
            proxy: new Ext.data.ScriptTagProxy(a)
        }))
    }
});
Ext.reg("jsonpstore", Ext.data.JsonPStore);
Ext.data.XmlWriter = Ext.extend(Ext.data.Writer, {
    documentRoot: "xmlData",
    header: "",
    record: "record",
    writeRecords: function (b, c) {
        var a = this.buildTpl(b, c);
        b.xmlData = a.apply(c);
        return b
    },
    buildTpl: function (e, f) {
        if (this.tpl) {
            return this.tpl
        }
        var c = [],
            b = this.documentRoot,
            a = this.record,
            g, d;
        if (this.header) {
            c.push(this.header)
        }
        c.push("<", b, ">");
        if (f.length > 0) {
            c.push('<tpl for="."><', a, ">");
            g = f[0];
            for (d in g) {
                if (g.hasOwnProperty(d)) {
                    c.push("<", d, ">{", d, "}</", d, ">")
                }
            }
            c.push("</", a, "></tpl>")
        }
        c.push("</", b, ">");
        this.tpl = new Ext.XTemplate(c.join(""));
        return this.tpl
    }
});
Ext.data.WriterMgr.registerType("xml", Ext.data.XmlWriter);
Ext.data.XmlReader = Ext.extend(Ext.data.Reader, {
    createAccessor: function () {
        var a = function (d, c, b) {
                var e = Ext.DomQuery.selectNode(d, c),
                    f;
                if (e && e.firstChild) {
                    f = e.firstChild.nodeValue
                }
                return Ext.isEmpty(f) ? b : f
            };
        return function (b) {
            var c;
            if (b == this.totalProperty) {
                c = function (e, d) {
                    var f = a(b, e, d);
                    return parseFloat(f)
                }
            } else {
                if (b == this.successProperty) {
                    c = function (e, d) {
                        var f = a(b, e, true);
                        return (f !== false && f !== "false")
                    }
                } else {
                    c = function (e, d) {
                        return a(b, e, d)
                    }
                }
            }
            return c
        }
    }(),
    getResponseData: function (a) {
        var b = a.responseXML;
        if (!b) {
            throw {
                message: "Ext.data.XmlReader.read: XML data not found"
            }
        }
        return b
    },
    getData: function (a) {
        return a.documentElement || a
    },
    getRoot: function (b) {
        var c = b.nodeName,
            a = this.root;
        if (!a || (c && c == a)) {
            return b
        } else {
            return Ext.DomQuery.selectNode(a, b)
        }
    },
    constructor: function (a) {
        a = a || {};
        Ext.applyIf(a, {
            idProperty: a.idPath || a.id,
            successProperty: a.success
        });
        Ext.data.XmlReader.superclass.constructor.call(this, a)
    },
    extractData: function (a, b) {
        var c = this.record;
        if (c != a.nodeName) {
            a = Ext.DomQuery.select(c, a)
        } else {
            a = [a]
        }
        return Ext.data.XmlReader.superclass.extractData.call(this, a, b)
    },
    getAssociatedDataRoot: function (b, a) {
        return Ext.DomQuery.select(a, b)[0]
    },
    readRecords: function (a) {
        if (Ext.isArray(a)) {
            a = a[0]
        }
        this.xmlData = a;
        return Ext.data.XmlReader.superclass.readRecords.call(this, a)
    }
});
Ext.data.ReaderMgr.registerType("xml", Ext.data.XmlReader);
Ext.data.XmlStore = Ext.extend(Ext.data.Store, {
    constructor: function (a) {
        a = a || {};
        a = a || {};
        Ext.applyIf(a, {
            proxy: {
                type: "ajax",
                reader: "xml",
                writer: "xml"
            }
        });
        Ext.data.XmlStore.superclass.constructor.call(this, a)
    }
});
Ext.reg("xmlstore", Ext.data.XmlStore);
Ext.History = new Ext.util.Observable({
    constructor: function () {
        Ext.History.superclass.constructor.call(this, config);
        this.addEvents("change")
    },
    init: function () {
        var a = this;
        a.setToken(window.location.hash);
        if (Ext.supports.History) {
            window.addEventListener("hashchange", this.onChange)
        } else {
            setInterval(function () {
                var c = a.cleanToken(window.location.hash),
                    b = a.getToken();
                if (c != b) {
                    a.onChange()
                }
            }, 50)
        }
    },
    onChange: function () {
        var b = Ext.History,
            a = b.cleanToken(window.location.hash);
        if (b.token != a) {
            b.fireEvent("change", a)
        }
        b.setToken(a)
    },
    setToken: function (a) {
        return this.token = this.cleanToken(a)
    },
    cleanToken: function (a) {
        return a[0] == "#" ? a.substr(1) : a
    },
    getToken: function () {
        return this.token
    },
    add: function (a) {
        window.location.hash = this.setToken(a);
        if (!Ext.supports.History) {
            this.onChange()
        }
    }
});
Ext.ControllerManager = new Ext.AbstractManager({
    register: function (c, b) {
        b.id = c;
        Ext.applyIf(b, {
            application: Ext.ApplicationManager.currentApplication
        });
        var a = new Ext.Controller(b);
        if (a.init) {
            a.init()
        }
        this.all.add(a);
        return a
    }
});
Ext.regController = function () {
    return Ext.ControllerManager.register.apply(Ext.ControllerManager, arguments)
};
Ext.Controller = Ext.extend(Ext.util.Observable, {
    constructor: function (a) {
        this.addEvents("instance-created", "instance-creation-failed", "instance-updated", "instance-update-failed", "instance-destroyed", "instance-destruction-failed");
        Ext.Controller.superclass.constructor.call(this, a);
        Ext.apply(this, a || {});
        if (typeof this.model == "string") {
            this.model = Ext.ModelMgr.getModel(this.model)
        }
    },
    index: function () {
        this.render("index", {
            listeners: {
                scope: this,
                edit: this.edit,
                build: this.build,
                create: this.onCreateInstance,
                destroy: this.onDestroyInstance
            }
        })
    },
    edit: function (a) {
        var b = this.render("edit", {
            listeners: this.getEditListeners()
        });
        b.loadModel(a)
    },
    build: function () {
        this.render("build", {
            listeners: this.getBuildListeners()
        })
    },
    create: function (f, c) {
        c = c || {};
        var b = this.getModel(),
            a = new b(f),
            e = c.success,
            g = c.failure,
            d = c.scope || this;
        a.save({
            scope: this,
            success: function (h) {
                if (typeof e == "function") {
                    e.call(d, h)
                }
                this.fireEvent("instance-created", h)
            },
            failure: function (h, i) {
                if (typeof g == "function") {
                    g.call(d, h, i)
                }
                this.fireEvent("instance-creation-failed", h, i)
            }
        })
    },
    update: function (a, e, b) {
        b = b || {};
        var d = b.success,
            f = b.failure,
            c = b.scope || this;
        if (Ext.isObject(e)) {
            a.set(e)
        }
        a.save({
            scope: this,
            success: function (g) {
                if (typeof d == "function") {
                    d.call(c, g)
                }
                this.fireEvent("instance-updated", g)
            },
            failure: function (g, h) {
                if (typeof f == "function") {
                    f.call(c, g, h)
                }
                this.fireEvent("instance-update-failed", g, h)
            }
        })
    },
    destroy: function (a, b) {
        b = b || {};
        var d = b.success,
            e = b.failure,
            c = b.scope || this;
        a.destroy({
            scope: this,
            success: function (f) {
                if (typeof d == "function") {
                    d.call(c, f)
                }
                this.fireEvent("instance-destroyed", f)
            },
            failure: function (f, g) {
                if (typeof e == "function") {
                    e.call(c, f, g)
                }
                this.fireEvent("instance-destruction-failed", f, g)
            }
        })
    },
    getBuildListeners: function () {
        return {
            scope: this,
            save: this.onCreateInstance,
            cancel: this.onCancelBuild
        }
    },
    getEditListeners: function () {
        return {
            scope: this,
            save: this.onUpdateInstance,
            cancel: this.onCancelEdit
        }
    },
    onCancelEdit: function (a) {
        return this.closeView(a)
    },
    onCancelBuild: function (a) {
        return this.closeView(a)
    },
    onCreateInstance: function (a) {
        this.create(a.getValues(), {
            scope: this,
            success: function (b) {
                this.closeView(a)
            },
            failure: function (b, c) {
                console.log("fail")
            }
        })
    },
    onUpdateInstance: function (a) {
        this.update(a.getRecord(), a.getValues(), {
            scope: this,
            success: function (b) {
                this.closeView(a)
            },
            failure: function (b, c) {}
        })
    },
    onDestroyInstance: function (a, b) {
        this.destroy(a, {
            scope: this,
            success: function (c) {},
            failure: function (c, d) {}
        })
    },
    setRenderTarget: function (a) {
        Ext.Controller.renderTarget = a
    },
    render: function (c, g) {
        var f = Ext.Controller,
            b = this.application,
            d = b ? b.currentProfile : undefined,
            e, a;
        Ext.applyIf(c, {
            profile: d
        });
        a = Ext.ComponentMgr.create(c);
        if (g !== false) {
            e = d ? d.getRenderTarget(c, b) : g;
            if (g == undefined) {
                g = e || (b ? b.defaultTarget : undefined)
            }
            if (typeof g == "string") {
                g = Ext.getCmp(g)
            }
            if (g != undefined && g.add) {
                if (d) {
                    d.beforeLayout(a, g, b)
                }
                g.add(a);
                if (g.layout && g.layout.setActiveItem) {
                    g.layout.setActiveItem(a)
                }
                g.doComponentLayout();
                if (d) {
                    d.afterLayout(a, g, b)
                }
            }
        }
        return a
    },
    control: function (e, d, i) {
        if (!e || !e.isView) {
            throw "Trying to control a view that doesnt exist"
        }
        var h = i ? e.refs[i] : e,
            g, f, a, b, c;
        if (!h) {
            throw "No item called " + i + " found inside the " + e.name + " view."
        }
        for (g in d) {
            f = d[g];
            if (Ext.isObject(f) && !f.fn) {
                this.control(e, f, g)
            } else {
                if (h.refs) {
                    for (a in h.refs) {
                        b = h.refs[a];
                        if (b.isObservable && b.events[g]) {
                            b.enableBubble(g)
                        }
                    }
                }
                if (!f.fn) {
                    c = {};
                    c[g] = f;
                    c.scope = this
                } else {
                    c = f;
                    if (c.scope === undefined) {
                        c.scope = this
                    }
                }
                h.addListener(c)
            }
        }
        return e
    },
    getModel: function () {
        return Ext.ModelMgr.getModel(this.model)
    },
    closeView: function (a) {
        var b = a.ownerCt;
        if (b) {
            b.remove(a);
            b.doLayout();
            b.setActiveItem(b.items.last())
        }
    }
});
Ext.util.Dispatcher = Ext.extend(Ext.util.Observable, {
    constructor: function (a) {
        this.addEvents("before-dispatch", "dispatch");
        Ext.util.Dispatcher.superclass.constructor.call(this, a)
    },
    dispatch: function (c) {
        var b = new Ext.Interaction(c),
            a = b.controller,
            e = b.action,
            d = Ext.History;
        if (this.fireEvent("before-dispatch", b) !== false) {
            if (d && c.historyUrl) {
                d.suspendEvents(false);
                d.add(c.historyUrl);
                Ext.defer(d.resumeEvents, 100, d)
            }
            if (a && e) {
                a[e].call(a, b);
                b.dispatched = true
            }
            this.fireEvent("dispatch", b)
        }
    },
    redirect: function (b) {
        if (b instanceof Ext.data.Model) {} else {
            if (typeof b == "string") {
                var a = Ext.Router.recognize(b);
                if (a) {
                    return this.dispatch(a)
                }
            }
        }
        return null
    },
    createRedirect: function (a) {
        return function () {
            Ext.Dispatcher.redirect(a)
        }
    }
});
Ext.Dispatcher = new Ext.util.Dispatcher();
Ext.dispatch = function () {
    return Ext.Dispatcher.dispatch.apply(Ext.Dispatcher, arguments)
};
Ext.redirect = function () {
    return Ext.Dispatcher.redirect.apply(Ext.Dispatcher, arguments)
};
Ext.createRedirect = Ext.Dispatcher.createRedirect;
Ext.util.Router = Ext.extend(Ext.util.Observable, {
    constructor: function (a) {
        a = a || {};
        Ext.apply(this, a, {
            defaults: {
                action: "index"
            }
        });
        this.routes = [];
        Ext.util.Router.superclass.constructor.call(this, a)
    },
    connect: function (b, c) {
        c = Ext.apply({
            url: b
        }, c || {}, this.defaults);
        var a = new Ext.util.Route(c);
        this.routes.push(a);
        return a
    },
    recognize: function (c) {
        var b = this.routes,
            e = b.length,
            d, a;
        for (d = 0; d < e; d++) {
            a = b[d].recognize(c);
            if (a != undefined) {
                return a
            }
        }
        return undefined
    },
    draw: function (a) {
        a.call(this, this)
    }
});
Ext.Router = new Ext.util.Router();
Ext.util.Route = Ext.extend(Object, {
    constructor: function (a) {
        Ext.apply(this, a, {
            conditions: {}
        });
        this.paramMatchingRegex = new RegExp(/:([0-9A-Za-z\_]*)/g);
        this.paramsInMatchString = this.url.match(this.paramMatchingRegex) || [];
        this.matcherRegex = this.createMatcherRegex(this.url)
    },
    recognize: function (a) {
        if (this.recognizes(a)) {
            var b = this.matchesFor(a);
            return Ext.applyIf(b, {
                controller: this.controller,
                action: this.action,
                historyUrl: a
            })
        }
    },
    recognizes: function (a) {
        return this.matcherRegex.test(a)
    },
    matchesFor: function (b) {
        var f = {},
            e = this.paramsInMatchString,
            a = b.match(this.matcherRegex),
            d = e.length,
            c;
        a.shift();
        for (c = 0; c < d; c++) {
            f[e[c].replace(":", "")] = a[c]
        }
        return f
    },
    urlFor: function (a) {},
    createMatcherRegex: function (a) {
        var e = this.paramsInMatchString,
            d = e.length,
            b, c, f;
        for (b = 0; b < d; b++) {
            c = this.conditions[e[b]];
            f = Ext.util.Format.format("({0})", c || "[%a-zA-Z0-9\\_\\s,]+");
            a = a.replace(new RegExp(e[b]), f)
        }
        return new RegExp("^" + a + "$")
    }
});
Ext.Interaction = Ext.extend(Ext.util.Observable, {
    controller: "",
    action: "",
    dispatched: false,
    constructor: function (a) {
        Ext.Interaction.superclass.constructor.apply(this, arguments);
        a = a || {};
        Ext.applyIf(a, {
            scope: this
        });
        Ext.apply(this, a);
        if (typeof this.controller == "string") {
            this.controller = Ext.ControllerManager.get(this.controller)
        }
    }
});
Ext.Application = Ext.extend(Ext.util.Observable, {
    scope: undefined,
    useHistory: true,
    autoUpdateComponentProfiles: true,
    setProfilesOnLaunch: true,
    constructor: function (b) {
        this.addEvents("launch", "beforeprofilechange", "profilechange");
        Ext.Application.superclass.constructor.call(this, b);
        this.bindReady();
        var a = this.name;
        if (a) {
            window[a] = this;
            Ext.ns(a, a + ".views", a + ".stores", a + ".models", a + ".controllers")
        }
        if (Ext.addMetaTags) {
            Ext.addMetaTags(b)
        }
    },
    bindReady: function () {
        Ext.onReady(this.onReady, this)
    },
    launch: Ext.emptyFn,
    useLoadMask: false,
    loadMaskFadeDuration: 1000,
    loadMaskRemoveDuration: 1050,
    autoInitViewport: true,
    dispatch: function (a) {
        return Ext.dispatch(a)
    },
    initLoadMask: function () {
        var c = this.useLoadMask,
            a = "loading-mask",
            b = typeof c == "string" ? c : a;
        if (c) {
            if (b == a) {
                Ext.getBody().createChild({
                    id: a
                })
            }
            var e = Ext.get("loading-mask"),
                d = this.loadMaskFadeDuration,
                f = this.loadMaskRemoveDuration;
            Ext.defer(function () {
                e.addCls("fadeout");
                Ext.defer(function () {
                    e.remove()
                }, f)
            }, d)
        }
    },
    onBeforeLaunch: function () {
        var d = Ext.History,
            c = d && this.useHistory,
            b = this.determineProfile(true);
        if (c) {
            this.historyForm = Ext.getBody().createChild({
                id: "history-form",
                cls: "x-hide-display",
                style: "display: none;",
                tag: "form",
                action: "#",
                children: [{
                    tag: "div",
                    children: [{
                        tag: "input",
                        id: d.fieldId,
                        type: "hidden"
                    }, {
                        tag: "iframe",
                        id: d.iframeId
                    }]
                }]
            });
            d.init();
            d.on("change", this.onHistoryChange, this);
            var a = d.getToken();
            if (this.launch.call(this.scope || this, b) !== false) {
                Ext.redirect(a || this.defaultUrl || {
                    controller: "application",
                    action: "index"
                })
            }
        } else {
            this.launch.call(this.scope || this, b)
        }
        this.launched = true;
        this.fireEvent("launch", this);
        if (this.setProfilesOnLaunch) {
            this.updateComponentProfiles(b)
        }
    },
    onReady: function () {
        if (this.useLoadMask) {
            this.initLoadMask()
        }
        Ext.EventManager.onOrientationChange(this.determineProfile, this);
        if (this.autoInitViewport) {
            Ext.Viewport.init(this.onBeforeLaunch, this)
        } else {
            this.onBeforeLaunch()
        }
        return this
    },
    determineProfile: function (b) {
        var d = this.currentProfile,
            a = this.profiles,
            c;
        for (c in a) {
            if (a[c]() === true) {
                if (c != d && this.fireEvent("beforeprofilechange", c, d) !== false) {
                    if (this.autoUpdateComponentProfiles) {
                        this.updateComponentProfiles(c)
                    }
                    if (b !== true) {
                        this.fireEvent("profilechange", c, d)
                    }
                }
                this.currentProfile = c;
                break
            }
        }
        return this.currentProfile
    },
    updateComponentProfiles: function (a) {
        Ext.ComponentMgr.each(function (c, b) {
            if (b.setProfile) {
                b.setProfile(a)
            }
        })
    },
    getProfile: function () {
        return this.currentProfile
    },
    onHistoryChange: function (a) {
        return Ext.redirect(a)
    }
});
Ext.ApplicationManager = new Ext.AbstractManager({
    register: function (c, b) {
        if (Ext.isObject(c)) {
            b = c
        } else {
            b.name = c
        }
        var a = new Ext.Application(b);
        this.all.add(a);
        this.currentApplication = a;
        return a
    }
});
Ext.regApplication = function () {
    return Ext.ApplicationManager.register.apply(Ext.ApplicationManager, arguments)
};
(function () {
    var c = Ext.Element = Ext.extend(Object, {
        defaultUnit: "px",
        constructor: function (d, e) {
            var f = typeof d == "string" ? document.getElementById(d) : d,
                g;
            if (!f) {
                return null
            }
            g = f.id;
            if (!e && g && Ext.cache[g]) {
                return Ext.cache[g].el
            }
            this.dom = f;
            this.id = g || Ext.id(f);
            return this
        },
        set: function (h, e) {
            var f = this.dom,
                d, g;
            for (d in h) {
                if (h.hasOwnProperty(d)) {
                    g = h[d];
                    if (d == "style") {
                        this.applyStyles(g)
                    } else {
                        if (d == "cls") {
                            f.className = g
                        } else {
                            if (e !== false) {
                                f.setAttribute(d, g)
                            } else {
                                f[d] = g
                            }
                        }
                    }
                }
            }
            return this
        },
        is: function (d) {
            return Ext.DomQuery.is(this.dom, d)
        },
        getValue: function (d) {
            var e = this.dom.value;
            return d ? parseInt(e, 10) : e
        },
        addListener: function (d, g, f, e) {
            Ext.EventManager.on(this.dom, d, g, f || this, e);
            return this
        },
        removeListener: function (d, f, e) {
            Ext.EventManager.un(this.dom, d, f, e);
            return this
        },
        removeAllListeners: function () {
            Ext.EventManager.removeAll(this.dom);
            return this
        },
        purgeAllListeners: function () {
            Ext.EventManager.purgeElement(this, true);
            return this
        },
        remove: function () {
            var d = this,
                e = d.dom;
            if (e) {
                delete d.dom;
                Ext.removeNode(e)
            }
        },
        isAncestor: function (e) {
            var d = this.dom;
            e = Ext.getDom(e);
            if (d && e) {
                return d.contains(e)
            }
            return false
        },
        isDescendent: function (d) {
            return Ext.fly(d, "_internal").isAncestor(this)
        },
        contains: function (d) {
            return !d ? false : this.isAncestor(d)
        },
        getAttribute: function (e, f) {
            var g = this.dom;
            return g.getAttributeNS(f, e) || g.getAttribute(f + ":" + e) || g.getAttribute(e) || g[e]
        },
        setHTML: function (d) {
            if (this.dom) {
                this.dom.innerHTML = d
            }
            return this
        },
        getHTML: function () {
            return this.dom ? this.dom.innerHTML : ""
        },
        hide: function () {
            this.setVisible(false);
            return this
        },
        show: function () {
            this.setVisible(true);
            return this
        },
        setVisible: function (h, d) {
            var e = this,
                g = e.dom,
                f = this.getVisibilityMode();
            switch (f) {
            case c.VISIBILITY:
                this.removeCls(["x-hidden-display", "x-hidden-offsets"]);
                this[h ? "removeCls" : "addCls"]("x-hidden-visibility");
                break;
            case c.DISPLAY:
                this.removeCls(["x-hidden-visibility", "x-hidden-offsets"]);
                this[h ? "removeCls" : "addCls"]("x-hidden-display");
                break;
            case c.OFFSETS:
                this.removeCls(["x-hidden-visibility", "x-hidden-display"]);
                this[h ? "removeCls" : "addCls"]("x-hidden-offsets");
                break
            }
            return e
        },
        getVisibilityMode: function () {
            var e = this.dom,
                d = c.data(e, "visibilityMode");
            if (d === undefined) {
                c.data(e, "visibilityMode", d = c.DISPLAY)
            }
            return d
        },
        setVisibilityMode: function (d) {
            c.data(this.dom, "visibilityMode", d);
            return this
        }
    });
    var a = c.prototype;
    c.VISIBILITY = 1;
    c.DISPLAY = 2;
    c.OFFSETS = 3;
    c.addMethods = function (d) {
        Ext.apply(a, d)
    };
    a.on = a.addListener;
    a.un = a.removeListener;
    a.update = a.setHTML;
    c.get = function (d) {
        var g, f, h;
        if (!d) {
            return null
        }
        if (typeof d == "string") {
            if (!(f = document.getElementById(d))) {
                return null
            }
            if (Ext.cache[d] && Ext.cache[d].el) {
                g = Ext.cache[d].el;
                g.dom = f
            } else {
                g = c.addToCache(new c(f))
            }
            return g
        } else {
            if (d.tagName) {
                if (!(h = d.id)) {
                    h = Ext.id(d)
                }
                if (Ext.cache[h] && Ext.cache[h].el) {
                    g = Ext.cache[h].el;
                    g.dom = d
                } else {
                    g = c.addToCache(new c(d))
                }
                return g
            } else {
                if (d instanceof c) {
                    if (d != c.docEl) {
                        d.dom = document.getElementById(d.id) || d.dom
                    }
                    return d
                } else {
                    if (d.isComposite) {
                        return d
                    } else {
                        if (Ext.isArray(d)) {
                            return c.select(d)
                        } else {
                            if (d == document) {
                                if (!c.docEl) {
                                    var e = function () {};
                                    e.prototype = a;
                                    c.docEl = new e();
                                    c.docEl.dom = document;
                                    c.docEl.id = Ext.id(document)
                                }
                                return c.docEl
                            }
                        }
                    }
                }
            }
        }
        return null
    };
    c.addToCache = function (d, e) {
        e = e || d.id;
        Ext.cache[e] = {
            el: d,
            data: {},
            events: {}
        };
        return d
    };
    c.data = function (e, d, f) {
        e = c.get(e);
        if (!e) {
            return null
        }
        var g = Ext.cache[e.id].data;
        if (arguments.length == 2) {
            return g[d]
        } else {
            return (g[d] = f)
        }
    };
    c.garbageCollect = function () {
        if (!Ext.enableGarbageCollector) {
            clearInterval(c.collectorThreadId)
        } else {
            var f, e, d = Ext.cache;
            for (f in d) {
                if (!d.hasOwnProperty(f)) {
                    continue
                }
                if (d[f].skipGarbageCollection) {
                    continue
                }
                e = d[f].el.dom;
                if (!e || !e.parentNode || (!e.offsetParent && !document.getElementById(f))) {
                    if (Ext.enableListenerCollection) {
                        Ext.EventManager.removeAll(e)
                    }
                    delete d[f]
                }
            }
        }
    };
    c.Flyweight = function (d) {
        this.dom = d
    };
    var b = function () {};
    b.prototype = a;
    c.Flyweight.prototype = new b;
    c.Flyweight.prototype.isFlyweight = true;
    c._flyweights = {};
    c.fly = function (f, d) {
        var e = null;
        d = d || "_global";
        f = Ext.getDom(f);
        if (f) {
            (c._flyweights[d] = c._flyweights[d] || new c.Flyweight()).dom = f;
            e = c._flyweights[d]
        }
        return e
    };
    Ext.get = c.get;
    Ext.fly = c.fly
})();
Ext.applyIf(Ext.Element, {
    unitRe: /\d+(px|em|%|en|ex|pt|in|cm|mm|pc)$/i,
    camelRe: /(-[a-z])/gi,
    opacityRe: /alpha\(opacity=(.*)\)/i,
    propertyCache: {},
    defaultUnit: "px",
    borders: {
        l: "border-left-width",
        r: "border-right-width",
        t: "border-top-width",
        b: "border-bottom-width"
    },
    paddings: {
        l: "padding-left",
        r: "padding-right",
        t: "padding-top",
        b: "padding-bottom"
    },
    margins: {
        l: "margin-left",
        r: "margin-right",
        t: "margin-top",
        b: "margin-bottom"
    },
    addUnits: function (b, a) {
        if (b === "" || b == "auto" || b === null || b === undefined) {
            b = b || ""
        } else {
            if (!isNaN(b) || !this.unitRe.test(b)) {
                b = b + (a || this.defaultUnit || "px")
            }
        }
        return b
    },
    parseBox: function (b) {
        if (typeof b != "string") {
            b = b.toString()
        }
        var c = b.split(" "),
            a = c.length;
        if (a == 1) {
            c[1] = c[2] = c[3] = c[0]
        } else {
            if (a == 2) {
                c[2] = c[0];
                c[3] = c[1]
            } else {
                if (a == 3) {
                    c[3] = c[1]
                }
            }
        }
        return {
            top: parseFloat(c[0]) || 0,
            right: parseFloat(c[1]) || 0,
            bottom: parseFloat(c[2]) || 0,
            left: parseFloat(c[3]) || 0
        }
    },
    unitizeBox: function (c, b) {
        var a = this.addUnits,
            d = this.parseBox(c);
        return a(d.top, b) + " " + a(d.right, b) + " " + a(d.bottom, b) + " " + a(d.left, b)
    },
    camelReplaceFn: function (b, c) {
        return c.charAt(1).toUpperCase()
    },
    normalize: function (a) {
        return this.propertyCache[a] || (this.propertyCache[a] = a == "float" ? "cssFloat" : a.replace(this.camelRe, this.camelReplaceFn))
    },
    getDocumentHeight: function () {
        return Math.max(!Ext.isStrict ? document.body.scrollHeight : document.documentElement.scrollHeight, this.getViewportHeight())
    },
    getDocumentWidth: function () {
        return Math.max(!Ext.isStrict ? document.body.scrollWidth : document.documentElement.scrollWidth, this.getViewportWidth())
    },
    getViewportHeight: function () {
        return window.innerHeight
    },
    getViewportWidth: function () {
        return window.innerWidth
    },
    getViewSize: function () {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        }
    },
    getOrientation: function () {
        if (Ext.supports.OrientationChange) {
            return (window.orientation == 0) ? "portrait" : "landscape"
        }
        return (window.innerHeight > window.innerWidth) ? "portrait" : "landscape"
    },
    fromPoint: function (a, b) {
        return Ext.get(document.elementFromPoint(a, b))
    }
});
Ext.applyIf(Ext.Element, {
    getComputedTransformOffset: function (c) {
        if (c instanceof Ext.Element) {
            c = c.dom
        }
        var a = window.getComputedStyle(c).webkitTransform,
            b = a != "none" ? new WebKitCSSMatrix(a) : new WebKitCSSMatrix();
        if (typeof b.m41 != "undefined") {
            return new Ext.util.Offset(b.m41, b.m42)
        } else {
            if (typeof b.d != "undefined") {
                return new Ext.util.Offset(b.d, b.e)
            }
        }
        return new Ext.util.Offset(0, 0)
    },
    cssTransform: function (c, b) {
        if (c instanceof Ext.Element) {
            c = c.dom
        }
        var a = new WebKitCSSMatrix();
        Ext.iterate(b, function (e, d) {
            d = Ext.isArray(d) ? d : [d];
            a = a[e].apply(a, d)
        });
        if (Ext.supports.CSS3DTransform) {
            c.style.webkitTransform = "matrix3d(" + a.m11 + ", " + a.m12 + ", " + a.m13 + ", " + a.m14 + ", " + a.m21 + ", " + a.m22 + ", " + a.m23 + ", " + a.m24 + ", " + a.m31 + ", " + a.m32 + ", " + a.m33 + ", " + a.m34 + ", " + a.m41 + ", " + a.m42 + ", " + a.m43 + ", " + a.m44 + ")"
        } else {
            c.style.webkitTransform = a
        }
    },
    cssTranslate: function (a, b) {
        if (a instanceof Ext.Element) {
            a = a.dom
        }
        if (Ext.supports.CSS3DTransform) {
            a.style.webkitTransform = "translate3d(" + b.x + "px, " + b.y + "px, 0px)"
        } else {
            a.style.webkitTransform = "translate(" + b.x + "px, " + b.y + "px)"
        }
    }
});
Ext.Element.addMethods({
    getY: function (a) {
        return this.getXY(a)[1]
    },
    getX: function (a) {
        return this.getXY(a)[0]
    },
    getXY: function () {
        var a = window.webkitConvertPointFromNodeToPage(this.dom, new WebKitPoint(0, 0));
        return [a.x, a.y]
    },
    getOffsetsTo: function (a) {
        var c = this.getXY(),
            b = Ext.fly(a, "_internal").getXY();
        return [c[0] - b[0], c[1] - b[1]]
    },
    setXY: function (d) {
        var b = this;
        if (arguments.length > 1) {
            d = [d, arguments[1]]
        }
        var c = b.translatePoints(d),
            a = b.dom.style;
        for (d in c) {
            if (!c.hasOwnProperty(d)) {
                continue
            }
            if (!isNaN(c[d])) {
                a[d] = c[d] + "px"
            }
        }
        return b
    },
    setX: function (a) {
        return this.setXY([a, this.getY()])
    },
    setY: function (a) {
        return this.setXY([this.getX(), a])
    },
    setLeft: function (a) {
        this.setStyle("left", Ext.Element.addUnits(a));
        return this
    },
    setTop: function (a) {
        this.setStyle("top", Ext.Element.addUnits(a));
        return this
    },
    setTopLeft: function (c, b) {
        var a = Ext.Element.addUnits;
        this.setStyle("top", a(c));
        this.setStyle("left", a(b));
        return this
    },
    setRight: function (a) {
        this.setStyle("right", Ext.Element.addUnits(a));
        return this
    },
    setBottom: function (a) {
        this.setStyle("bottom", Ext.Element.addUnits(a));
        return this
    },
    getLeft: function (a) {
        return parseInt(this.getStyle("left"), 10) || 0
    },
    getRight: function (a) {
        return parseInt(this.getStyle("right"), 10) || 0
    },
    getTop: function (a) {
        return parseInt(this.getStyle("top"), 10) || 0
    },
    getBottom: function (a) {
        return parseInt(this.getStyle("bottom"), 10) || 0
    },
    setBox: function (d, c, b, a) {
        var e;
        if (Ext.isObject(d)) {
            b = d.width;
            a = d.height;
            c = d.top;
            d = d.left
        }
        if (d !== e) {
            this.setLeft(d)
        }
        if (c !== e) {
            this.setTop(c)
        }
        if (b !== e) {
            this.setWidth(b)
        }
        if (a !== e) {
            this.setHeight(a)
        }
        return this
    },
    getBox: function (g, j) {
        var h = this,
            e = h.dom,
            c = e.offsetWidth,
            k = e.offsetHeight,
            n, f, d, a, m, i;
        if (!j) {
            n = h.getXY()
        } else {
            if (g) {
                n = [0, 0]
            } else {
                n = [parseInt(h.getStyle("left"), 10) || 0, parseInt(h.getStyle("top"), 10) || 0]
            }
        }
        if (!g) {
            f = {
                x: n[0],
                y: n[1],
                0: n[0],
                1: n[1],
                width: c,
                height: k
            }
        } else {
            d = h.getBorderWidth.call(h, "l") + h.getPadding.call(h, "l");
            a = h.getBorderWidth.call(h, "r") + h.getPadding.call(h, "r");
            m = h.getBorderWidth.call(h, "t") + h.getPadding.call(h, "t");
            i = h.getBorderWidth.call(h, "b") + h.getPadding.call(h, "b");
            f = {
                x: n[0] + d,
                y: n[1] + m,
                0: n[0] + d,
                1: n[1] + m,
                width: c - (d + a),
                height: k - (m + i)
            }
        }
        f.left = f.x;
        f.top = f.y;
        f.right = f.x + f.width;
        f.bottom = f.y + f.height;
        return f
    },
    getPageBox: function (e) {
        var g = this,
            c = g.dom,
            j = c.offsetWidth,
            f = c.offsetHeight,
            m = g.getXY(),
            k = m[1],
            a = m[0] + j,
            i = m[1] + f,
            d = m[0];
        if (!c) {
            return new Ext.util.Region()
        }
        if (e) {
            return new Ext.util.Region(k, a, i, d)
        } else {
            return {
                left: d,
                top: k,
                width: j,
                height: f,
                right: a,
                bottom: i
            }
        }
    },
    translatePoints: function (a, g) {
        g = isNaN(a[1]) ? g : a[1];
        a = isNaN(a[0]) ? a : a[0];
        var d = this,
            e = d.isStyle("position", "relative"),
            f = d.getXY(),
            b = parseInt(d.getStyle("left"), 10),
            c = parseInt(d.getStyle("top"), 10);
        b = !isNaN(b) ? b : (e ? 0 : d.dom.offsetLeft);
        c = !isNaN(c) ? c : (e ? 0 : d.dom.offsetTop);
        return {
            left: (a - f[0] + b),
            top: (g - f[1] + c)
        }
    }
});
(function () {
    Ext.Element.classReCache = {};
    var b = Ext.Element,
        a = document.defaultView;
    b.addMethods({
        marginRightRe: /marginRight/i,
        trimRe: /^\s+|\s+$/g,
        spacesRe: /\s+/,
        addCls: function (g) {
            var h = this,
                f, c, e, d = [];
            if (!Ext.isArray(g)) {
                if (g && !this.hasCls(g)) {
                    h.dom.className += " " + g
                }
            } else {
                for (f = 0, c = g.length; f < c; f++) {
                    e = g[f];
                    if (e && !h.hasCls(e)) {
                        d.push(e)
                    }
                }
                if (d.length) {
                    h.dom.className += " " + d.join(" ")
                }
            }
            return h
        },
        addClass: function () {
            throw new Error("Component: addClass has been deprecated. Please use addCls.")
        },
        removeCls: function (h) {
            var j = this,
                g, d, c, f, e;
            if (!Ext.isArray(h)) {
                h = [h]
            }
            if (j.dom && j.dom.className) {
                e = j.dom.className.replace(this.trimRe, "").split(this.spacesRe);
                for (g = 0, c = h.length; g < c; g++) {
                    f = h[g];
                    if (typeof f == "string") {
                        f = f.replace(this.trimRe, "");
                        d = e.indexOf(f);
                        if (d != -1) {
                            e.splice(d, 1)
                        }
                    }
                }
                j.dom.className = e.join(" ")
            }
            return j
        },
        removeClass: function () {
            throw new Error("Component: removeClass has been deprecated. Please use removeCls.")
        },
        mask: function (d, f, i) {
            var g = this,
                e = g.dom,
                c = Ext.Element.data(e, "mask"),
                k, j, h = "";
            g.addCls("x-masked");
            if (g.getStyle("position") == "static") {
                g.addCls("x-masked-relative")
            }
            if (c) {
                c.remove()
            }
            if (Ext.isString(f) && !Ext.isEmpty(f)) {
                h = " " + f
            } else {
                if (f) {
                    h = " x-mask-gray"
                }
            }
            k = g.createChild({
                cls: "x-mask" + ((i !== false) ? "" : " x-mask-gray"),
                html: d ? ('<div class="' + (f || "x-mask-message") + '">' + d + "</div>") : ""
            });
            j = g.getSize();
            Ext.Element.data(e, "mask", k);
            if (e === document.body) {
                j.height = window.innerHeight;
                if (g.orientationHandler) {
                    Ext.EventManager.unOrientationChange(g.orientationHandler, g)
                }
                g.orientationHandler = function () {
                    j = g.getSize();
                    j.height = window.innerHeight;
                    k.setSize(j)
                };
                Ext.EventManager.onOrientationChange(g.orientationHandler, g)
            }
            k.setSize(j);
            if (Ext.is.iPad) {
                Ext.repaint()
            }
        },
        unmask: function () {
            var d = this,
                e = d.dom,
                c = Ext.Element.data(e, "mask");
            if (c) {
                c.remove();
                Ext.Element.data(e, "mask", undefined)
            }
            d.removeCls(["x-masked", "x-masked-relative"]);
            if (e === document.body) {
                Ext.EventManager.unOrientationChange(d.orientationHandler, d);
                delete d.orientationHandler
            }
        },
        radioCls: function (f) {
            var g = this.dom.parentNode.childNodes,
                d;
            f = Ext.isArray(f) ? f : [f];
            for (var e = 0, c = g.length; e < c; e++) {
                d = g[e];
                if (d && d.nodeType == 1) {
                    Ext.fly(d, "_internal").removeCls(f)
                }
            }
            return this.addCls(f)
        },
        radioClass: function () {
            throw new Error("Component: radioClass has been deprecated. Please use radioCls.")
        },
        toggleCls: function (c) {
            return this.hasCls(c) ? this.removeCls(c) : this.addCls(c)
        },
        toggleClass: function () {
            throw new Error("Component: toggleClass has been deprecated. Please use toggleCls.")
        },
        hasCls: function (c) {
            return c && (" " + this.dom.className + " ").indexOf(" " + c + " ") != -1
        },
        hasClass: function () {
            throw new Error("Element: hasClass has been deprecated. Please use hasCls.");
            return this.hasCls.apply(this, arguments)
        },
        replaceCls: function (d, c) {
            return this.removeCls(d).addCls(c)
        },
        replaceClass: function () {
            throw new Error("Component: replaceClass has been deprecated. Please use replaceCls.")
        },
        isStyle: function (c, d) {
            return this.getStyle(c) == d
        },
        getStyle: function (i) {
            var h = this.dom,
                d, g, f, c = Ext.is,
                e = h.style;
            i = b.normalize(i);
            f = (a) ? a.getComputedStyle(h, "") : h.currentStyle;
            d = (f) ? f[i] : null;
            if (d && !c.correctRightMargin && this.marginRightRe.test(i) && e.position != "absolute" && d != "0px") {
                g = e.display;
                e.display = "inline-block";
                d = a.getComputedStyle(h, null)[i];
                e.display = g
            }
            d || (d = e[i]);
            if (!c.correctTransparentColor && d == "rgba(0, 0, 0, 0)") {
                d = "transparent"
            }
            return d
        },
        setStyle: function (f, e) {
            var c, d;
            if (typeof f == "string") {
                c = {};
                c[f] = e;
                f = c
            }
            for (d in f) {
                if (f.hasOwnProperty(d)) {
                    this.dom.style[b.normalize(d)] = f[d]
                }
            }
            return this
        },
        applyStyles: function (e) {
            if (e) {
                var d, c, f = this.dom;
                if (typeof e == "function") {
                    e = e.call()
                }
                if (typeof e == "string") {
                    e = Ext.util.Format.trim(e).split(/\s*(?::|;)\s*/);
                    for (d = 0, c = e.length; d < c;) {
                        f.style[b.normalize(e[d++])] = e[d++]
                    }
                } else {
                    if (typeof e == "object") {
                        this.setStyle(e)
                    }
                }
            }
        },
        getHeight: function (d) {
            var e = this.dom,
                c = d ? (e.clientHeight - this.getPadding("tb")) : e.offsetHeight;
            return c > 0 ? c : 0
        },
        getWidth: function (c) {
            var e = this.dom,
                d = c ? (e.clientWidth - this.getPadding("lr")) : e.offsetWidth;
            return d > 0 ? d : 0
        },
        setWidth: function (c) {
            var d = this;
            d.dom.style.width = b.addUnits(c);
            return d
        },
        setHeight: function (c) {
            var d = this;
            d.dom.style.height = b.addUnits(c);
            return d
        },
        setSize: function (e, c) {
            var f = this,
                d = f.dom.style;
            if (Ext.isObject(e)) {
                c = e.height;
                e = e.width
            }
            d.width = b.addUnits(e);
            d.height = b.addUnits(c);
            return f
        },
        getBorderWidth: function (c) {
            return this.sumStyles(c, b.borders)
        },
        getPadding: function (c) {
            return this.sumStyles(c, b.paddings)
        },
        getMargin: function (c) {
            return this.sumStyles(c, b.margins)
        },
        getViewSize: function () {
            var c = document,
                d = this.dom;
            if (d == c || d == c.body) {
                return {
                    width: b.getViewportWidth(),
                    height: b.getViewportHeight()
                }
            } else {
                return {
                    width: d.clientWidth,
                    height: d.clientHeight
                }
            }
        },
        getSize: function (d) {
            var c = this.dom;
            return {
                width: Math.max(0, d ? (c.clientWidth - this.getPadding("lr")) : c.offsetWidth),
                height: Math.max(0, d ? (c.clientHeight - this.getPadding("tb")) : c.offsetHeight)
            }
        },
        repaint: function () {
            var c = this.dom;
            this.addCls("x-repaint");
            c.style.background = "transparent none";
            setTimeout(function () {
                c.style.background = null;
                Ext.get(c).removeCls("x-repaint")
            }, 1);
            return this
        },
        getOuterWidth: function () {
            return this.getWidth() + this.getMargin("lr")
        },
        getOuterHeight: function () {
            return this.getHeight() + this.getMargin("tb")
        },
        sumStyles: function (h, g) {
            var j = 0,
                d = h.match(/\w/g),
                c = d.length,
                f, e;
            for (e = 0; e < c; e++) {
                f = d[e] && parseFloat(this.getStyle(g[d[e]])) || 0;
                if (f) {
                    j += Math.abs(f)
                }
            }
            return j
        }
    })
})();
Ext.Element.addMethods({
    findParent: function (h, g, c) {
        var e = this.dom,
            a = document.body,
            f = 0,
            d;
        g = g || 50;
        if (isNaN(g)) {
            d = Ext.getDom(g);
            g = Number.MAX_VALUE
        }
        while (e && e.nodeType == 1 && f < g && e != a && e != d) {
            if (Ext.DomQuery.is(e, h)) {
                return c ? Ext.get(e) : e
            }
            f++;
            e = e.parentNode
        }
        return null
    },
    findParentNode: function (d, c, a) {
        var b = Ext.fly(this.dom.parentNode, "_internal");
        return b ? b.findParent(d, c, a) : null
    },
    up: function (b, a) {
        return this.findParentNode(b, a, true)
    },
    select: function (a, b) {
        return Ext.Element.select(a, this.dom, b)
    },
    query: function (a) {
        return Ext.DomQuery.select(a, this.dom)
    },
    down: function (a, b) {
        var c = Ext.DomQuery.selectNode(a, this.dom);
        return b ? c : Ext.get(c)
    },
    child: function (a, b) {
        var d, c = this,
            e;
        e = Ext.get(c).id;
        e = e.replace(/[\.:]/g, "\\$0");
        d = Ext.DomQuery.selectNode("#" + e + " > " + a, c.dom);
        return b ? d : Ext.get(d)
    },
    parent: function (a, b) {
        return this.matchNode("parentNode", "parentNode", a, b)
    },
    next: function (a, b) {
        return this.matchNode("nextSibling", "nextSibling", a, b)
    },
    prev: function (a, b) {
        return this.matchNode("previousSibling", "previousSibling", a, b)
    },
    first: function (a, b) {
        return this.matchNode("nextSibling", "firstChild", a, b)
    },
    last: function (a, b) {
        return this.matchNode("previousSibling", "lastChild", a, b)
    },
    matchNode: function (b, e, a, c) {
        if (!this.dom) {
            return null
        }
        var d = this.dom[e];
        while (d) {
            if (d.nodeType == 1 && (!a || Ext.DomQuery.is(d, a))) {
                return !c ? Ext.get(d) : d
            }
            d = d[b]
        }
        return null
    }
});
Ext.Element.addMethods({
    getScrollParent: function () {
        var b = this.dom,
            a;
        while (b && b != document.body) {
            if (b.id && (a = Ext.ScrollManager.get(b.id))) {
                return a
            }
            b = b.parentNode
        }
        return null
    }
});
Ext.Element.addMethods({
    appendChild: function (a) {
        return Ext.get(a).appendTo(this)
    },
    appendTo: function (a) {
        Ext.getDom(a).appendChild(this.dom);
        return this
    },
    insertBefore: function (a) {
        a = Ext.getDom(a);
        a.parentNode.insertBefore(this.dom, a);
        return this
    },
    insertAfter: function (a) {
        a = Ext.getDom(a);
        a.parentNode.insertBefore(this.dom, a.nextSibling);
        return this
    },
    insertFirst: function (b, a) {
        b = b || {};
        if (b.nodeType || b.dom || typeof b == "string") {
            b = Ext.getDom(b);
            this.dom.insertBefore(b, this.dom.firstChild);
            return !a ? Ext.get(b) : b
        } else {
            return this.createChild(b, this.dom.firstChild, a)
        }
    },
    insertSibling: function (e, c, d) {
        var f = this,
            b, a = (c || "before").toLowerCase() == "after",
            g;
        if (Ext.isArray(e)) {
            g = f;
            Ext.each(e, function (h) {
                b = Ext.fly(g, "_internal").insertSibling(h, c, d);
                if (a) {
                    g = b
                }
            });
            return b
        }
        e = e || {};
        if (e.nodeType || e.dom) {
            b = f.dom.parentNode.insertBefore(Ext.getDom(e), a ? f.dom.nextSibling : f.dom);
            if (!d) {
                b = Ext.get(b)
            }
        } else {
            if (a && !f.dom.nextSibling) {
                b = Ext.DomHelper.append(f.dom.parentNode, e, !d)
            } else {
                b = Ext.DomHelper[a ? "insertAfter" : "insertBefore"](f.dom, e, !d)
            }
        }
        return b
    },
    replace: function (a) {
        a = Ext.get(a);
        this.insertBefore(a);
        a.remove();
        return this
    },
    replaceWith: function (a) {
        var b = this;
        if (a.nodeType || a.dom || typeof a == "string") {
            a = Ext.get(a);
            b.dom.parentNode.insertBefore(a, b.dom)
        } else {
            a = Ext.DomHelper.insertBefore(b.dom, a)
        }
        delete Ext.cache[b.id];
        Ext.removeNode(b.dom);
        b.id = Ext.id(b.dom = a);
        Ext.Element.addToCache(b.isFlyweight ? new Ext.Element(b.dom) : b);
        return b
    },
    createChild: function (b, a, c) {
        b = b || {
            tag: "div"
        };
        if (a) {
            return Ext.DomHelper.insertBefore(a, b, c !== true)
        } else {
            return Ext.DomHelper[!this.dom.firstChild ? "overwrite" : "append"](this.dom, b, c !== true)
        }
    },
    wrap: function (a, b) {
        var c = Ext.DomHelper.insertBefore(this.dom, a || {
            tag: "div"
        }, !b);
        c.dom ? c.dom.appendChild(this.dom) : c.appendChild(this.dom);
        return c
    },
    insertHtml: function (b, c, a) {
        var d = Ext.DomHelper.insertHtml(b, this.dom, c);
        return a ? Ext.get(d) : d
    }
});
Ext.Element.addMethods({
    getAnchorXY: function (f, j, m) {
        f = (f || "tl").toLowerCase();
        m = m || {};
        var i = this,
            a = i.dom == document.body || i.dom == document,
            b = m.width || a ? window.innerWidth : i.getWidth(),
            k = m.height || a ? window.innerHeight : i.getHeight(),
            l, c = Math.round,
            d = i.getXY(),
            h = a ? 0 : !j ? d[0] : 0,
            g = a ? 0 : !j ? d[1] : 0,
            e = {
                c: [c(b * 0.5), c(k * 0.5)],
                t: [c(b * 0.5), 0],
                l: [0, c(k * 0.5)],
                r: [b, c(k * 0.5)],
                b: [c(b * 0.5), k],
                tl: [0, 0],
                bl: [0, k],
                br: [b, k],
                tr: [b, 0]
            };
        l = e[f];
        return [l[0] + h, l[1] + g]
    },
    getAlignToXY: function (e, w, h) {
        e = Ext.get(e);
        if (!e || !e.dom) {
            throw new Error("Element.alignToXY with an element that doesn't exist")
        }
        h = h || [0, 0];
        if (!w || w == "?") {
            w = "tl-bl?"
        } else {
            if (!(/-/).test(w) && w !== "") {
                w = "tl-" + w
            }
        }
        w = w.toLowerCase();
        var u = this,
            d = w.match(/^([a-z]+)-([a-z]+)(\?)?$/),
            m = window.innerWidth,
            t = window.innerHeight,
            c = "",
            a = "",
            z, v, l, k, p, n, f, b, j, i, q, o, g, s;
        if (!d) {
            throw "Element.alignTo with an invalid alignment " + w
        }
        c = d[1];
        a = d[2];
        s = !! d[3];
        z = u.getAnchorXY(c, true);
        v = e.getAnchorXY(a, false);
        l = v[0] - z[0] + h[0];
        k = v[1] - z[1] + h[1];
        if (s) {
            q = u.getWidth();
            o = u.getHeight();
            g = e.getPageBox();
            b = c.charAt(0);
            f = c.charAt(c.length - 1);
            i = a.charAt(0);
            j = a.charAt(a.length - 1);
            n = ((b == "t" && i == "b") || (b == "b" && i == "t"));
            p = ((f == "r" && j == "l") || (f == "l" && j == "r"));
            if (l + q > m) {
                l = p ? g.left - q : m - q
            }
            if (l < 0) {
                l = p ? g.right : 0
            }
            if (k + o > t) {
                k = n ? g.top - o : t - o
            }
            if (k < 0) {
                k = n ? g.bottom : 0
            }
        }
        return [l, k]
    }
});
Ext.CompositeElement = function (b, a) {
    this.elements = [];
    this.add(b, a);
    this.el = new Ext.Element.Flyweight()
};
Ext.CompositeElement.prototype = {
    isComposite: true,
    getElement: function (a) {
        var b = this.el;
        b.dom = a;
        b.id = a.id;
        return b
    },
    transformElement: function (a) {
        return Ext.getDom(a)
    },
    getCount: function () {
        return this.elements.length
    },
    add: function (d, b) {
        var e = this,
            f = e.elements;
        if (!d) {
            return this
        }
        if (typeof d == "string") {
            d = Ext.Element.selectorFunction(d, b)
        } else {
            if (d.isComposite) {
                d = d.elements
            } else {
                if (!Ext.isIterable(d)) {
                    d = [d]
                }
            }
        }
        for (var c = 0, a = d.length; c < a; ++c) {
            f.push(e.transformElement(d[c]))
        }
        return e
    },
    invoke: function (f, b) {
        var g = this,
            d = g.elements,
            a = d.length,
            h, c;
        for (c = 0; c < a; c++) {
            h = d[c];
            if (h) {
                Ext.Element.prototype[f].apply(g.getElement(h), b)
            }
        }
        return g
    },
    item: function (b) {
        var d = this,
            c = d.elements[b],
            a = null;
        if (c) {
            a = d.getElement(c)
        }
        return a
    },
    addListener: function (b, h, g, f) {
        var d = this.elements,
            a = d.length,
            c, j;
        for (c = 0; c < a; c++) {
            j = d[c];
            if (j) {
                Ext.EventManager.on(j, b, h, g || j, f)
            }
        }
        return this
    },
    each: function (f, d) {
        var g = this,
            c = g.elements,
            a = c.length,
            b, h;
        for (b = 0; b < a; b++) {
            h = c[b];
            if (h) {
                h = this.getElement(h);
                if (f.call(d || h, h, g, b)) {
                    break
                }
            }
        }
        return g
    },
    fill: function (a) {
        var b = this;
        b.elements = [];
        b.add(a);
        return b
    },
    filter: function (a) {
        var b = [],
            d = this,
            e = d.elements,
            c = Ext.isFunction(a) ? a : function (f) {
                return f.is(a)
            };
        d.each(function (h, f, g) {
            if (c(h, g) !== false) {
                b[b.length] = d.transformElement(h)
            }
        });
        d.elements = b;
        return d
    },
    first: function () {
        return this.item(0)
    },
    last: function () {
        return this.item(this.getCount() - 1)
    },
    contains: function (a) {
        return this.indexOf(a) != -1
    },
    indexOf: function (a) {
        return this.elements.indexOf(this.transformElement(a))
    },
    clear: function () {
        this.elements = []
    }
};
Ext.CompositeElement.prototype.on = Ext.CompositeElement.prototype.addListener;
(function () {
    var c, b = Ext.Element.prototype,
        a = Ext.CompositeElement.prototype;
    for (c in b) {
        if (Ext.isFunction(b[c])) {
            (function (d) {
                a[d] = a[d] ||
                function () {
                    return this.invoke(d, arguments)
                }
            }).call(a, c)
        }
    }
})();
if (Ext.DomQuery) {
    Ext.Element.selectorFunction = Ext.DomQuery.select
}
Ext.Element.select = function (a, b, d) {
    var c;
    d = (d === false) ? false : true;
    if (typeof a == "string") {
        c = Ext.Element.selectorFunction(a, b)
    } else {
        if (a.length !== undefined) {
            c = a
        } else {
            throw new Error("Invalid selector")
        }
    }
    return d ? new Ext.CompositeElement(c) : c
};
Ext.select = Ext.Element.select;
Ext.CompositeElementLite = Ext.CompositeElement;
Ext.apply(Ext.CompositeElementLite.prototype, {
    addElements: function (c, a) {
        if (!c) {
            return this
        }
        if (typeof c == "string") {
            c = Ext.Element.selectorFunction(c, a)
        }
        var b = this.elements;
        Ext.each(c, function (d) {
            b.push(Ext.get(d))
        });
        return this
    },
    removeElement: function (d, e) {
        var c = this,
            a = this.elements,
            b;
        Ext.each(d, function (f) {
            if ((b = (a[f] || a[f = c.indexOf(f)]))) {
                if (e) {
                    if (b.dom) {
                        b.remove()
                    } else {
                        Ext.removeNode(b)
                    }
                }
                a.splice(f, 1)
            }
        });
        return this
    },
    replaceElement: function (e, c, a) {
        var b = !isNaN(e) ? e : this.indexOf(e),
            f;
        if (b > -1) {
            c = Ext.getDom(c);
            if (a) {
                f = this.elements[b];
                f.parentNode.insertBefore(c, f);
                Ext.removeNode(f)
            }
            this.elements.splice(b, 1, c)
        }
        return this
    }
});
Ext.DomHelper = {
    emptyTags: /^(?:br|frame|hr|img|input|link|meta|range|spacer|wbr|area|param|col)$/i,
    confRe: /tag|children|cn|html$/i,
    endRe: /end/i,
    markup: function (h) {
        var d = "",
            c, g, f, a, j;
        if (typeof h == "string") {
            d = h
        } else {
            if (Ext.isArray(h)) {
                for (var e = 0; e < h.length; e++) {
                    if (h[e]) {
                        d += this.markup(h[e])
                    }
                }
            } else {
                d += "<" + (h.tag = h.tag || "div");
                for (c in h) {
                    if (!h.hasOwnProperty(c)) {
                        continue
                    }
                    g = h[c];
                    if (!this.confRe.test(c)) {
                        if (typeof g == "object") {
                            d += " " + c + '="';
                            for (f in g) {
                                if (!g.hasOwnProperty(f)) {
                                    continue
                                }
                                d += f + ":" + g[f] + ";"
                            }
                            d += '"'
                        } else {
                            d += " " + ({
                                cls: "class",
                                htmlFor: "for"
                            }[c] || c) + '="' + g + '"'
                        }
                    }
                }
                if (this.emptyTags.test(h.tag)) {
                    d += "/>"
                } else {
                    d += ">";
                    if ((j = h.children || h.cn)) {
                        d += this.markup(j)
                    } else {
                        if (h.html) {
                            d += h.html
                        }
                    }
                    d += "</" + h.tag + ">"
                }
            }
        }
        return d
    },
    applyStyles: function (d, e) {
        if (e) {
            var b = 0,
                a, c;
            d = Ext.fly(d);
            if (typeof e == "function") {
                e = e.call()
            }
            if (typeof e == "string") {
                e = Ext.util.Format.trim(e).split(/\s*(?::|;)\s*/);
                for (a = e.length; b < a;) {
                    d.setStyle(e[b++], e[b++])
                }
            } else {
                if (Ext.isObject(e)) {
                    d.setStyle(e)
                }
            }
        }
    },
    insertHtml: function (f, a, g) {
        var e = {},
            c, i, h, j, d, b;
        f = f.toLowerCase();
        e.beforebegin = ["BeforeBegin", "previousSibling"];
        e.afterend = ["AfterEnd", "nextSibling"];
        h = a.ownerDocument.createRange();
        i = "setStart" + (this.endRe.test(f) ? "After" : "Before");
        if (e[f]) {
            h[i](a);
            j = h.createContextualFragment(g);
            a.parentNode.insertBefore(j, f == "beforebegin" ? a : a.nextSibling);
            return a[(f == "beforebegin" ? "previous" : "next") + "Sibling"]
        } else {
            d = (f == "afterbegin" ? "first" : "last") + "Child";
            if (a.firstChild) {
                h[i](a[d]);
                j = h.createContextualFragment(g);
                if (f == "afterbegin") {
                    a.insertBefore(j, a.firstChild)
                } else {
                    a.appendChild(j)
                }
            } else {
                a.innerHTML = g
            }
            return a[d]
        }
        throw 'Illegal insertion point -> "' + f + '"'
    },
    insertBefore: function (a, c, b) {
        return this.doInsert(a, c, b, "beforebegin")
    },
    insertAfter: function (a, c, b) {
        return this.doInsert(a, c, b, "afterend", "nextSibling")
    },
    insertFirst: function (a, c, b) {
        return this.doInsert(a, c, b, "afterbegin", "firstChild")
    },
    append: function (a, c, b) {
        return this.doInsert(a, c, b, "beforeend", "", true)
    },
    overwrite: function (a, c, b) {
        a = Ext.getDom(a);
        a.innerHTML = this.markup(c);
        return b ? Ext.get(a.firstChild) : a.firstChild
    },
    doInsert: function (d, f, e, g, c, a) {
        var b = this.insertHtml(g, Ext.getDom(d), this.markup(f));
        return e ? Ext.get(b, true) : b
    }
};
Ext.DomQuery = {
    select: function (h, b) {
        var g = [],
            d, f, e, c, a;
        b = b || document;
        if (typeof b == "string") {
            b = document.getElementById(b)
        }
        h = h.split(",");
        for (f = 0, c = h.length; f < c; f++) {
            if (typeof h[f] == "string") {
                d = b.querySelectorAll(h[f]);
                for (e = 0, a = d.length; e < a; e++) {
                    g.push(d[e])
                }
            }
        }
        return g
    },
    selectNode: function (b, a) {
        return Ext.DomQuery.select(b, a)[0]
    },
    is: function (a, b) {
        if (typeof a == "string") {
            a = document.getElementById(a)
        }
        return Ext.DomQuery.select(b).indexOf(a) !== -1
    }
};
Ext.Element.selectorFunction = Ext.DomQuery.select;
Ext.query = Ext.DomQuery.select;
Ext.Anim = Ext.extend(Object, {
    isAnim: true,
    disableAnimations: false,
    defaultConfig: {
        from: {},
        to: {},
        duration: 250,
        delay: 0,
        easing: "ease-in-out",
        autoClear: true,
        out: true,
        direction: null,
        reverse: false
    },
    opposites: {
        left: "right",
        right: "left",
        up: "down",
        down: "up"
    },
    constructor: function (a) {
        a = Ext.apply({}, a || {}, this.defaultConfig);
        this.config = a;
        Ext.Anim.superclass.constructor.call(this);
        this.running = []
    },
    initConfig: function (c, b) {
        var e = this,
            d = {},
            a = Ext.apply({}, b || {}, e.config);
        a.el = c = Ext.get(c);
        if (a.reverse && e.opposites[a.direction]) {
            a.direction = e.opposites[a.direction]
        }
        if (e.config.before) {
            e.config.before.call(a, c, a)
        }
        if (b.before) {
            b.before.call(a.scope || a, c, a)
        }
        return a
    },
    run: function (c, a) {
        c = Ext.get(c);
        a = a || {};
        var d = this,
            b = c.dom.style,
            e, f = a.after;
        if (d.running[c.id]) {
            d.onTransitionEnd(null, c, {
                config: a,
                after: f
            })
        }
        a = this.initConfig(c, a);
        if (this.disableAnimations) {
            for (e in a.to) {
                if (!a.to.hasOwnProperty(e)) {
                    continue
                }
                b[e] = a.to[e]
            }
            this.onTransitionEnd(null, c, {
                config: a,
                after: f
            });
            return d
        }
        c.un("webkitTransitionEnd", d.onTransitionEnd, d);
        b.webkitTransitionDuration = "0ms";
        for (e in a.from) {
            if (!a.from.hasOwnProperty(e)) {
                continue
            }
            b[e] = a.from[e]
        }
        setTimeout(function () {
            if (!c.dom) {
                return
            }
            if (a.is3d === true) {
                c.parent().setStyle({
                    "-webkit-perspective": "1200",
                    "-webkit-transform-style": "preserve-3d"
                })
            }
            b.webkitTransitionDuration = a.duration + "ms";
            b.webkitTransitionProperty = "all";
            b.webkitTransitionTimingFunction = a.easing;
            c.on("webkitTransitionEnd", d.onTransitionEnd, d, {
                single: true,
                config: a,
                after: f
            });
            for (e in a.to) {
                if (!a.to.hasOwnProperty(e)) {
                    continue
                }
                b[e] = a.to[e]
            }
        }, a.delay || 5);
        d.running[c.id] = a;
        return d
    },
    onTransitionEnd: function (e, c, g) {
        c = Ext.get(c);
        if (this.running[c.id] === undefined) {
            return
        }
        var b = c.dom.style,
            a = g.config,
            f, d = this;
        if (a.autoClear) {
            for (f in a.to) {
                if (!a.to.hasOwnProperty(f)) {
                    continue
                }
                b[f] = ""
            }
        }
        b.webkitTransitionDuration = null;
        b.webkitTransitionProperty = null;
        b.webkitTransitionTimingFunction = null;
        if (a.is3d) {
            c.parent().setStyle({
                "-webkit-perspective": "",
                "-webkit-transform-style": ""
            })
        }
        if (d.config.after) {
            d.config.after.call(a, c, a)
        }
        if (g.after) {
            g.after.call(a.scope || d, c, a)
        }
        delete d.running[c.id]
    }
});
Ext.Anim.seed = 1000;
Ext.Anim.run = function (b, c, a) {
    if (b.isComponent) {
        b = b.el
    }
    a = a || {};
    if (c.isAnim) {
        c.run(b, a)
    } else {
        if (Ext.isObject(c)) {
            if (a.before && c.before) {
                a.before = Ext.createInterceptor(a.before, c.before, c.scope)
            }
            if (a.after && c.after) {
                a.after = Ext.createInterceptor(a.after, c.after, c.scope)
            }
            a = Ext.apply({}, a, c);
            c = c.type
        }
        if (!Ext.anims[c]) {
            throw c + " is not a valid animation type."
        } else {
            if (b && b.dom) {
                Ext.anims[c].run(b, a)
            }
        }
    }
};
Ext.anims = {
    fade: new Ext.Anim({
        before: function (b) {
            var c = 1,
                a = 1,
                e = b.getStyle("z-index") == "auto" ? 0 : b.getStyle("z-index"),
                d = e;
            if (this.out) {
                a = 0
            } else {
                d = e + 1;
                c = 0
            }
            this.from = {
                opacity: c,
                "z-index": d
            };
            this.to = {
                opacity: a,
                "z-index": d
            }
        }
    }),
    slide: new Ext.Anim({
        direction: "left",
        cover: false,
        reveal: false,
        before: function (b) {
            var a = b.getStyle("z-index") == "auto" ? 0 : b.getStyle("z-index"),
                e = a + 1,
                h = 0,
                f = 0,
                i = 0,
                g = 0,
                c = b.getHeight(),
                d = b.getWidth();
            if (this.direction == "left" || this.direction == "right") {
                if (this.out == true) {
                    h = -d
                } else {
                    i = d
                }
            } else {
                if (this.direction == "up" || this.direction == "down") {
                    if (this.out == true) {
                        f = -c
                    } else {
                        g = c
                    }
                }
            }
            if (this.direction == "right" || this.direction == "down") {
                f *= -1;
                h *= -1;
                g *= -1;
                i *= -1
            }
            if (this.cover && this.out) {
                h = 0;
                f = 0;
                e = a
            } else {
                if (this.reveal && !this.out) {
                    i = 0;
                    g = 0;
                    e = a
                }
            }
            this.from = {
                "-webkit-transform": "translate3d(" + i + "px, " + g + "px, 0)",
                "z-index": e,
                opacity: 0.99
            };
            this.to = {
                "-webkit-transform": "translate3d(" + h + "px, " + f + "px, 0)",
                "z-index": e,
                opacity: 1
            }
        }
    }),
    pop: new Ext.Anim({
        scaleOnExit: true,
        before: function (d) {
            var b = 1,
                c = 1,
                g = 1,
                a = 1,
                h = d.getStyle("z-index") == "auto" ? 0 : d.getStyle("z-index"),
                f = h,
                e = h;
            if (!this.out) {
                b = 0.01;
                f = h + 1;
                e = h + 1;
                g = 0
            } else {
                if (this.scaleOnExit) {
                    c = 0.01;
                    a = 0
                } else {
                    a = 0.8
                }
            }
            this.from = {
                "-webkit-transform": "scale(" + b + ")",
                "-webkit-transform-origin": "50% 50%",
                opacity: g,
                "z-index": f
            };
            this.to = {
                "-webkit-transform": "scale(" + c + ")",
                "-webkit-transform-origin": "50% 50%",
                opacity: a,
                "z-index": e
            }
        }
    })
};
Ext.apply(Ext.anims, {
    flip: new Ext.Anim({
        is3d: true,
        direction: "left",
        before: function (c) {
            var f = "Y",
                a = 1,
                b = 1,
                e = 0,
                d = 0;
            if (this.out) {
                d = -180;
                b = 0.8
            } else {
                e = 180;
                a = 0.8
            }
            if (this.direction == "up" || this.direction == "down") {
                f = "X"
            }
            if (this.direction == "right" || this.direction == "left") {
                d *= -1;
                e *= -1
            }
            this.from = {
                "-webkit-transform": "rotate" + f + "(" + e + "deg) scale(" + a + ")",
                "-webkit-backface-visibility": "hidden"
            };
            this.to = {
                "-webkit-transform": "rotate" + f + "(" + d + "deg) scale(" + b + ")",
                "-webkit-backface-visibility": "hidden"
            }
        }
    }),
    cube: new Ext.Anim({
        is3d: true,
        direction: "left",
        style: "outer",
        before: function (b) {
            var n = "0% 0%",
                o = 0,
                a = 0,
                k = "Y",
                h = 0,
                i = 0,
                l = 1,
                e = 1,
                g, f = b.getWidth(),
                d = b.getHeight(),
                m = true,
                c = " translateX(0)",
                j = "";
            if (this.direction == "left" || this.direction == "right") {
                if (this.out) {
                    n = "100% 100%";
                    i = f;
                    e = 0.5;
                    a = -90
                } else {
                    n = "0% 0%";
                    h = f;
                    l = 0.5;
                    o = 90
                }
            } else {
                if (this.direction == "up" || this.direction == "down") {
                    k = "X";
                    if (this.out) {
                        n = "100% 100%";
                        i = d;
                        a = 90
                    } else {
                        n = "0% 0%";
                        h = d;
                        o = -90
                    }
                }
            }
            if (this.direction == "down" || this.direction == "right") {
                o *= -1;
                a *= -1;
                n = (n == "0% 0%") ? "100% 100%" : "0% 0%"
            }
            if (this.style == "inner") {
                h *= -1;
                i *= -1;
                o *= -1;
                a *= -1;
                if (!this.out) {
                    j = " translateX(0px)";
                    n = "0% 50%"
                } else {
                    j = c;
                    n = "100% 50%"
                }
            }
            this.from = {
                "-webkit-transform": "rotate" + k + "(" + o + "deg)" + (m ? " translateZ(" + h + "px)" : "") + c,
                "-webkit-transform-origin": n
            };
            this.to = {
                "-webkit-transform": "rotate" + k + "(" + a + "deg) translateZ(" + i + "px)" + j,
                "-webkit-transform-origin": n
            }
        },
        duration: 250
    }),
    wipe: new Ext.Anim({
        before: function (d) {
            var e = d.getStyle("z-index"),
                a = "",
                b = "100%",
                c = "100%";
            if (!this.out) {
                zIndex = e + 1;
                a = "-webkit-gradient(linear, left bottom, right bottom, from(transparent), to(#000), color-stop(66%, #000), color-stop(33%, transparent))";
                b = d.getHeight() * 100 + "px";
                c = d.getHeight();
                this.from = {
                    "-webkit-mask-image": a,
                    "-webkit-mask-size": d.getWidth() * 3 + "px " + d.getHeight() + "px",
                    "z-index": zIndex,
                    "-webkit-mask-position-x": 0
                };
                this.to = {
                    "-webkit-mask-image": a,
                    "-webkit-mask-size": d.getWidth() * 3 + "px " + d.getHeight() + "px",
                    "z-index": zIndex,
                    "-webkit-mask-position-x": -d.getWidth() * 2 + "px"
                }
            }
        },
        duration: 500
    })
});
Ext.apply(Ext, {
    version: "1.1.0",
    versionDetail: {
        major: 1,
        minor: 1,
        patch: 0
    },
    setup: function (a) {
        if (a && typeof a == "object") {
            if (a.addMetaTags !== false) {
                this.addMetaTags(a)
            }
            if (Ext.isFunction(a.onReady)) {
                var b = this;
                Ext.onReady(function () {
                    var c = arguments;
                    if (a.fullscreen !== false) {
                        Ext.Viewport.init(function () {
                            a.onReady.apply(b, c)
                        })
                    } else {
                        a.onReady.apply(this, c)
                    }
                }, a.scope)
            }
        }
    },
    getDom: function (a) {
        if (!a || !document) {
            return null
        }
        return a.dom ? a.dom : (typeof a == "string" ? document.getElementById(a) : a)
    },
    removeNode: function (a) {
        if (a && a.parentNode && a.tagName != "BODY") {
            Ext.EventManager.removeAll(a);
            a.parentNode.removeChild(a);
            delete Ext.cache[a.id]
        }
    },
    addMetaTags: function (b) {
        if (!Ext.isObject(b)) {
            return
        }
        var c = Ext.get(document.getElementsByTagName("head")[0]),
            a, d;
        if (!Ext.is.Desktop) {
            a = Ext.get(document.createElement("meta"));
            a.set({
                name: "viewport",
                content: "width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0;"
            });
            c.appendChild(a)
        }
        if (Ext.is.iOS) {
            if (b.fullscreen !== false) {
                a = Ext.get(document.createElement("meta"));
                a.set({
                    name: "apple-mobile-web-app-capable",
                    content: "yes"
                });
                c.appendChild(a);
                if (Ext.isString(b.statusBarStyle)) {
                    a = Ext.get(document.createElement("meta"));
                    a.set({
                        name: "apple-mobile-web-app-status-bar-style",
                        content: b.statusBarStyle
                    });
                    c.appendChild(a)
                }
            }
            if (b.tabletStartupScreen && Ext.is.iPad) {
                a = Ext.get(document.createElement("link"));
                a.set({
                    rel: "apple-touch-startup-image",
                    href: b.tabletStartupScreen
                });
                c.appendChild(a)
            }
            if (b.phoneStartupScreen && !Ext.is.iPad) {
                a = Ext.get(document.createElement("link"));
                a.set({
                    rel: "apple-touch-startup-image",
                    href: b.phoneStartupScreen
                });
                c.appendChild(a)
            }
            if (b.icon) {
                b.phoneIcon = b.tabletIcon = b.icon
            }
            d = (b.glossOnIcon === false) ? "-precomposed" : "";
            if (Ext.is.iPad && Ext.isString(b.tabletIcon)) {
                a = Ext.get(document.createElement("link"));
                a.set({
                    rel: "apple-touch-icon" + d,
                    href: b.tabletIcon
                });
                c.appendChild(a)
            } else {
                if (!Ext.is.iPad && Ext.isString(b.phoneIcon)) {
                    a = Ext.get(document.createElement("link"));
                    a.set({
                        rel: "apple-touch-icon" + d,
                        href: b.phoneIcon
                    });
                    c.appendChild(a)
                }
            }
        }
    }
});
(function () {
    var a = function () {
            var c = Ext.getBody(),
                b = [];
            if (!c) {
                return false
            }
            var d = Ext.is;
            if (d.Phone) {
                b.push("x-phone")
            } else {
                if (d.Tablet) {
                    b.push("x-tablet")
                } else {
                    if (d.Desktop) {
                        b.push("x-desktop")
                    }
                }
            }
            if (d.iPad) {
                b.push("x-ipad")
            }
            if (d.iOS) {
                b.push("x-ios")
            }
            if (d.Android) {
                b.push("x-android")
            }
            if (d.Blackberry) {
                b.push("x-bb")
            }
            if (d.Standalone) {
                b.push("x-standalone")
            }
            if (b.length) {
                c.addCls(b)
            }
            return true
        };
    if (!a()) {
        Ext.onReady(a)
    }
})();
Ext.Viewport = new(Ext.extend(Ext.util.Observable, {
    constructor: function () {
        var a = this;
        this.addEvents("orientationchange", "resize");
        this.stretchSizes = {};
        if (Ext.supports.OrientationChange) {
            window.addEventListener("orientationchange", Ext.createDelegate(a.onOrientationChange, a), false)
        } else {
            window.addEventListener("resize", Ext.createDelegate(a.onResize, a), false)
        }
        if (!Ext.desktop) {
            document.addEventListener("touchstart", Ext.createDelegate(a.onTouchStartCapturing, a), true);
        }
    },
    init: function (c, b) {
        var d = this,
            e = Math.max(window.innerHeight, window.innerWidth) * 2,
            a = Ext.getBody();
        d.updateOrientation();
        this.initialHeight = window.innerHeight;
        this.initialOrientation = this.orientation;
        a.setHeight(e);
        Ext.gesture.Manager.freeze();
        this.scrollToTop();
        setTimeout(function () {
            d.scrollToTop();
            setTimeout(function () {
                d.scrollToTop();
                d.initialHeight = Math.max(d.initialHeight, window.innerHeight);
                if (c) {
                    c.apply(b || window)
                }
                d.updateBodySize();
                Ext.gesture.Manager.thaw()
            }, 500)
        }, 500)
    },
    scrollToTop: function () {
        if (Ext.is.iOS) {
            if (Ext.is.Phone) {
                document.body.scrollTop = document.body.scrollHeight
            }
        } else {
            if (Ext.is.Blackberry) {
                window.scrollTo(0, 1000)
            } else {
                window.scrollTo(0, 1)
            }
        }
    },
    updateBodySize: function () {
        Ext.getBody().setSize(window.innerWidth, window.innerHeight)
    },
    updateOrientation: function () {
        this.lastSize = this.getSize();
        this.orientation = this.getOrientation()
    },
    onTouchStartCapturing: function (a) {
        if (!Ext.currentlyFocusedField && Ext.is.iOS) {
            this.scrollToTop()
        }
    },
    onOrientationChange: function () {
        var b = this,
            a = Ext.getBody();
        if (!Ext.is.Phone) {
            a.setHeight(a.getWidth());
            this.updateOrientation();
            this.fireEvent("orientationchange", this, this.orientation);
            b.scrollToTop();
            b.updateBodySize();
            b.fireResizeEvent();
            Ext.repaint();
            return
        }
        Ext.gesture.Manager.freeze();
        a.setHeight(a.getWidth());
        this.updateOrientation();
        this.fireEvent("orientationchange", this, this.orientation);
        setTimeout(function () {
            b.scrollToTop();
            setTimeout(function () {
                b.updateBodySize();
                b.fireResizeEvent();
                Ext.gesture.Manager.thaw();
                Ext.repaint()
            }, 200)
        }, 200)
    },
    fireResizeEvent: function () {
        var a = this;
        if (!Ext.is.iOS) {
            if (this.resizeEventTimer) {
                clearTimeout(this.resizeEventTimer)
            }
            this.resizeEventTimer = setTimeout(function () {
                a.fireEvent("resize", a, a.getSize())
            }, 500)
        } else {
            a.fireEvent("resize", a, a.getSize())
        }
    },
    onResize: function () {
        if (this.orientation != this.getOrientation()) {
            this.onOrientationChange()
        } else {
            var a = this.getSize();
            if (!Ext.is.iOS && !Ext.is.Desktop) {
                if ((a.width == this.lastSize.width && a.height > this.lastSize.height) || (a.height == this.lastSize.height && a.width > this.lastSize.width)) {
                    this.fireEvent("resize", this, a)
                }
            } else {
                this.fireEvent("resize", this, a)
            }
        }
    },
    getSize: function () {
        var a = {
            width: window.innerWidth,
            height: window.innerHeight
        };
        if (!Ext.is.Desktop) {
            a.height = (this.orientation == this.initialOrientation) ? Math.max(this.initialHeight, a.height) : a.height
        }
        return a
    },
    getOffset: function () {
        return {
            x: window.pageXOffset,
            y: window.pageYOffset
        }
    },
    getOrientation: function () {
        var a = this.getSize();
        if (window.hasOwnProperty("orientation")) {
            return (window.orientation == 0 || window.orientation == 180) ? "portrait" : "landscape"
        } else {
            if (!Ext.is.iOS && !Ext.is.Desktop) {
                if ((a.width == this.lastSize.width && a.height < this.lastSize.height) || (a.height == this.lastSize.height && a.width < this.lastSize.width)) {
                    return this.orientation
                }
            }
            return (window.innerHeight > window.innerWidth) ? "portrait" : "landscape"
        }
    }
}));
Ext.util.TapRepeater = Ext.extend(Ext.util.Observable, {
    constructor: function (b, a) {
        this.el = Ext.get(b);
        Ext.apply(this, a);
        this.addEvents("touchstart", "tap", "touchend");
        this.el.on({
            touchstart: this.onTouchStart,
            touchend: this.onTouchEnd,
            scope: this
        });
        if (this.preventDefault || this.stopDefault) {
            this.el.on("tap", this.eventOptions, this)
        }
        Ext.util.TapRepeater.superclass.constructor.call(this)
    },
    interval: 10,
    delay: 250,
    preventDefault: true,
    stopDefault: false,
    timer: 0,
    eventOptions: function (a) {
        if (this.preventDefault) {
            a.preventDefault()
        }
        if (this.stopDefault) {
            a.stopEvent()
        }
    },
    destroy: function () {
        Ext.destroy(this.el);
        this.clearListeners()
    },
    onTouchStart: function (a) {
        clearTimeout(this.timer);
        if (this.pressClass) {
            this.el.addCls(this.pressClass)
        }
        this.tapStartTime = new Date();
        this.fireEvent("touchstart", this, a);
        this.fireEvent("tap", this, a);
        if (this.accelerate) {
            this.delay = 400
        }
        this.timer = Ext.defer(this.tap, this.delay || this.interval, this, [a])
    },
    tap: function (a) {
        this.fireEvent("tap", this, a);
        this.timer = Ext.defer(this.tap, this.accelerate ? this.easeOutExpo(Ext.util.Date.getElapsed(this.tapStartTime), 400, -390, 12000) : this.interval, this, [a])
    },
    easeOutExpo: function (e, a, g, f) {
        return (e == f) ? a + g : g * (-Math.pow(2, -10 * e / f) + 1) + a
    },
    onTouchEnd: function (a) {
        clearTimeout(this.timer);
        this.el.removeCls(this.pressClass);
        this.fireEvent("touchend", this, a)
    }
});
if (!this.JSON) {
    this.JSON = {}
}(function () {
    function f(n) {
        return n < 10 ? "0" + n : n
    }
    if (typeof Date.prototype.toJSON !== "function") {
        Date.prototype.toJSON = function (key) {
            return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
        };
        String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function (key) {
            return this.valueOf()
        }
    }
    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap, indent, meta = {
            "\b": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\"
        },
        rep;

    function quote(string) {
        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c === "string" ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
        }) + '"' : '"' + string + '"'
    }
    function str(key, holder) {
        var i, k, v, length, mind = gap,
            partial, value = holder[key];
        if (value && typeof value === "object" && typeof value.toJSON === "function") {
            value = value.toJSON(key)
        }
        if (typeof rep === "function") {
            value = rep.call(holder, key, value)
        }
        switch (typeof value) {
        case "string":
            return quote(value);
        case "number":
            return isFinite(value) ? String(value) : "null";
        case "boolean":
        case "null":
            return String(value);
        case "object":
            if (!value) {
                return "null"
            }
            gap += indent;
            partial = [];
            if (Object.prototype.toString.apply(value) === "[object Array]") {
                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || "null"
                }
                v = partial.length === 0 ? "[]" : gap ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]" : "[" + partial.join(",") + "]";
                gap = mind;
                return v
            }
            if (rep && typeof rep === "object") {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    k = rep[i];
                    if (typeof k === "string") {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ": " : ":") + v)
                        }
                    }
                }
            } else {
                for (k in value) {
                    if (Object.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ": " : ":") + v)
                        }
                    }
                }
            }
            v = partial.length === 0 ? "{}" : gap ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}" : "{" + partial.join(",") + "}";
            gap = mind;
            return v
        }
        return v
    }
    if (typeof JSON.stringify !== "function") {
        JSON.stringify = function (value, replacer, space) {
            var i;
            gap = "";
            indent = "";
            if (typeof space === "number") {
                for (i = 0; i < space; i += 1) {
                    indent += " "
                }
            } else {
                if (typeof space === "string") {
                    indent = space
                }
            }
            rep = replacer;
            if (replacer && typeof replacer !== "function" && (typeof replacer !== "object" || typeof replacer.length !== "number")) {
                throw new Error("JSON.stringify")
            }
            return str("", {
                "": value
            })
        }
    }
    if (typeof JSON.parse !== "function") {
        JSON.parse = function (text, reviver) {
            var j;

            function walk(holder, key) {
                var k, v, value = holder[key];
                if (value && typeof value === "object") {
                    for (k in value) {
                        if (Object.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v
                            } else {
                                delete value[k]
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value)
            }
            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
                })
            }
            if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
                j = eval("(" + text + ")");
                return typeof reviver === "function" ? walk({
                    "": j
                }, "") : j
            }
            throw new SyntaxError("JSON.parse")
        }
    }
}());
Ext.util.JSON = {
    encode: function (a) {
        return JSON.stringify(a)
    },
    decode: function (a) {
        return JSON.parse(a)
    }
};
Ext.encode = Ext.util.JSON.encode;
Ext.decode = Ext.util.JSON.decode;
Ext.util.JSONP = {
    queue: [],
    current: null,
    request: function (d) {
        d = d || {};
        if (!d.url) {
            return
        }
        var b = this;
        d.params = d.params || {};
        if (d.callbackKey) {
            d.params[d.callbackKey] = "Ext.util.JSONP.callback"
        }
        var c = Ext.urlEncode(d.params);
        var a = document.createElement("script");
        a.type = "text/javascript";
        this.queue.push({
            url: d.url,
            script: a,
            callback: d.callback ||
            function () {},
            scope: d.scope || window,
            params: c || null
        });
        if (!this.current) {
            this.next()
        }
    },
    next: function () {
        this.current = null;
        if (this.queue.length) {
            this.current = this.queue.shift();
            this.current.script.src = this.current.url + (this.current.params ? ("?" + this.current.params) : "");
            document.getElementsByTagName("head")[0].appendChild(this.current.script)
        }
    },
    callback: function (a) {
        this.current.callback.call(this.current.scope, a);
        document.getElementsByTagName("head")[0].removeChild(this.current.script);
        this.next()
    }
};
Ext.util.Draggable = Ext.extend(Ext.util.Observable, {
    baseCls: "x-draggable",
    draggingCls: "x-dragging",
    proxyCls: "x-draggable-proxy",
    outOfBoundRestrictFactor: 1,
    direction: "both",
    fps: Ext.is.Blackberry ? 25 : ((Ext.is.iOS || Ext.is.Desktop) ? 80 : 50),
    constrain: window,
    threshold: 0,
    delay: 0,
    cancelSelector: null,
    disabled: false,
    revert: false,
    group: "base",
    useCssTransform: true,
    grid: null,
    snap: null,
    proxy: null,
    stack: false,
    animationDuration: 300,
    updateBoundaryOnTouchStart: true,
    offsetBoundary: null,
    dragging: false,
    vertical: false,
    horizontal: false,
    monitorOrientation: true,
    constructor: function (b, a) {
        this.el = Ext.get(b);
        this.id = b.id;
        a = a || {};
        Ext.apply(this, a);
        this.addEvents("offsetchange", "offsetboundaryupdate");
        Ext.util.Draggable.superclass.constructor.call(this, a);
        if (this.eventTarget === "parent") {
            this.eventTarget = this.el.parent()
        } else {
            this.eventTarget = (this.eventTarget) ? Ext.get(this.eventTarget) : this.el
        }
        if (this.direction == "both") {
            this.horizontal = true;
            this.vertical = true
        } else {
            if (this.direction == "horizontal") {
                this.horizontal = true
            } else {
                this.vertical = true
            }
        }
        this.el.addCls(this.baseCls);
        if (this.proxy) {
            this.getProxyEl().addCls(this.proxyCls)
        }
        this.startEventName = (this.delay > 0) ? "taphold" : "dragstart";
        this.dragOptions = (this.delay > 0) ? {
            holdThreshold: this.delay
        } : {
            direction: this.direction,
            dragThreshold: this.threshold
        };
        this.container = window;
        if (this.constrain) {
            if (this.constrain === "parent") {
                this.container = this.el.parent()
            } else {
                if (this.constrain !== window) {
                    this.container = Ext.get(this.constrain)
                }
            }
        }
        this.offset = new Ext.util.Offset();
        this.linearAnimation = {
            x: new Ext.util.Draggable.Animation.Linear(),
            y: new Ext.util.Draggable.Animation.Linear()
        };
        this.updateBoundary(true);
        this.setDragging(false);
        if (!this.disabled) {
            this.enable()
        }
        return this
    },
    enable: function () {
        return this.setEnabled(true)
    },
    disable: function () {
        return this.setEnabled(false)
    },
    setEnabled: function (a) {
        this.eventTarget[a ? "on" : "un"](this.startEventName, this.onStart, this, this.dragOptions);
        this.eventTarget[a ? "on" : "un"]("drag", this.onDrag, this, this.dragOptions);
        this.eventTarget[a ? "on" : "un"]("dragend", this.onDragEnd, this, this.dragOptions);
        this.eventTarget[a ? "on" : "un"]("touchstart", this.onTouchStart, this);
        if (a) {
            Ext.EventManager.onOrientationChange(this.onOrientationChange, this)
        } else {
            Ext.EventManager.orientationEvent.removeListener(this.onOrientationChange, this)
        }
        this.disabled = !a;
        return this
    },
    setUseCssTransform: function (a) {
        if (typeof a == "undefined") {
            a = true
        }
        if (a != this.useCssTransform) {
            this.useCssTransform = a;
            var b = new Ext.util.Offset();
            if (a == false) {
                this.setStyleOffset(this.offset);
                this.setTransformOffset(b, true)
            } else {
                this.setTransformOffset(this.offset);
                this.setStyleOffset(b)
            }
        }
        return this
    },
    setOffset: function (b, a) {
        if (!this.horizontal) {
            b.x = 0
        }
        if (!this.vertical) {
            b.y = 0
        }
        if (!(b instanceof Ext.util.Offset)) {
            b = Ext.util.Offset.fromObject(b)
        }
        b.round();
        if (!this.offset.equals(b)) {
            if (a) {
                this.startAnimation(b, a)
            } else {
                this.offset = b;
                this.region = new Ext.util.Region(this.initialRegion.top + b.y, this.initialRegion.right + b.x, this.initialRegion.bottom + b.y, this.initialRegion.left + b.x);
                if (this.useCssTransform) {
                    this.setTransformOffset(b)
                } else {
                    this.setStyleOffset(b)
                }
                this.fireEvent("offsetchange", this, this.offset)
            }
        }
        return this
    },
    setTransformOffset: function (b, a) {
        if (a) {
            this.getProxyEl().dom.style.webkitTransform = ""
        } else {
            Ext.Element.cssTranslate(this.getProxyEl(), b)
        }
        return this
    },
    setStyleOffset: function (b) {
        var a = this.getProxyEl();
        a.dom.style.left = b.x + "px";
        a.dom.style.top = b.y + "px";
        return this
    },
    startAnimation: function (d, a) {
        var c = this;
        this.stopAnimation();
        var b = Date.now();
        a = Ext.isNumber(a) ? a : this.animationDuration;
        this.linearAnimation.x.set({
            startOffset: this.offset.x,
            endOffset: d.x,
            startTime: b,
            duration: a
        });
        this.linearAnimation.y.set({
            startOffset: this.offset.y,
            endOffset: d.y,
            startTime: b,
            duration: a
        });
        this.isAnimating = true;
        this.animationTimer = setInterval(function () {
            c.handleAnimationFrame()
        }, this.getFrameDuration());
        return this
    },
    getFrameDuration: function () {
        return 1000 / this.fps
    },
    stopAnimation: function () {
        if (this.isAnimating) {
            clearInterval(this.animationTimer);
            this.isAnimating = false;
            this.setDragging(false)
        }
        return this
    },
    handleAnimationFrame: function () {
        if (!this.isAnimating) {
            return
        }
        var a = new Ext.util.Offset();
        a.x = this.linearAnimation.x.getOffset();
        a.y = this.linearAnimation.y.getOffset();
        this.setOffset(a);
        if ((a.x === this.linearAnimation.x.endOffset) && (a.y === this.linearAnimation.y.endOffset)) {
            this.stopAnimation()
        }
    },
    getOffset: function () {
        var a = this.offset.copy();
        a.y = -a.y;
        a.x = -a.x;
        return a
    },
    updateBoundary: function (f) {
        var h;
        if (typeof f == "undefined") {
            f = false
        }
        this.size = {
            width: this.el.dom.scrollWidth,
            height: this.el.dom.scrollHeight
        };
        if (this.container === window) {
            this.containerBox = {
                left: 0,
                top: 0,
                right: this.container.innerWidth,
                bottom: this.container.innerHeight,
                width: this.container.innerWidth,
                height: this.container.innerHeight
            }
        } else {
            this.containerBox = this.container.getPageBox()
        }
        var a = this.el.getXY();
        this.elBox = {
            left: a[0] - this.offset.x,
            top: a[1] - this.offset.y,
            width: this.size.width,
            height: this.size.height
        };
        this.elBox.bottom = this.elBox.top + this.elBox.height;
        this.elBox.right = this.elBox.left + this.elBox.width;
        this.initialRegion = this.region = new Ext.util.Region(a[1], a[0] + this.elBox.width, a[1] + this.elBox.height, a[0]);
        var e = 0,
            c = 0,
            b = 0,
            d = 0;
        if (this.elBox.left < this.containerBox.left) {
            c += this.containerBox.left - this.elBox.left
        } else {
            d -= this.elBox.left - this.containerBox.left
        }
        if (this.elBox.right > this.containerBox.right) {
            d -= this.elBox.right - this.containerBox.right
        } else {
            c += this.containerBox.right - this.elBox.right
        }
        if (this.elBox.top < this.containerBox.top) {
            b += this.containerBox.top - this.elBox.top
        } else {
            e -= this.elBox.top - this.containerBox.top
        }
        if (this.elBox.bottom > this.containerBox.bottom) {
            e -= this.elBox.bottom - this.containerBox.bottom
        } else {
            b += this.containerBox.bottom - this.elBox.bottom
        }
        h = new Ext.util.Region(e, c, b, d).round();
        if (this.offsetBoundary && this.offsetBoundary.equals(h)) {
            return this
        }
        this.offsetBoundary = h;
        this.fireEvent("offsetboundaryupdate", this, this.offsetBoundary);
        var g;
        if (this.useCssTransform) {
            g = Ext.Element.getComputedTransformOffset(this.getProxyEl());
            if (!this.offset.equals(g) || f) {
                this.setOffset(g)
            }
        }
        return this
    },
    onTouchStart: function () {},
    onStart: function (a) {
        if (this.updateBoundaryOnTouchStart) {
            this.updateBoundary()
        }
        this.stopAnimation();
        this.setDragging(true);
        this.startTouchPoint = new Ext.util.Point(a.startX, a.startY);
        this.startOffset = this.offset.copy();
        this.fireEvent("dragstart", this, a);
        return true
    },
    getNewOffsetFromTouchPoint: function (a) {
        var c = a.x - this.startTouchPoint.x,
            b = a.y - this.startTouchPoint.y,
            d = this.offset.copy();
        if (c == 0 && b == 0) {
            return d
        }
        if (this.horizontal) {
            d.x = this.startOffset.x + c
        }
        if (this.vertical) {
            d.y = this.startOffset.y + b
        }
        return d
    },
    onDrag: function (a) {
        if (!this.dragging) {
            return
        }
        this.lastTouchPoint = Ext.util.Point.fromEvent(a);
        var b = this.getNewOffsetFromTouchPoint(this.lastTouchPoint);
        if (this.offsetBoundary != null) {
            b = this.offsetBoundary.restrict(b, this.outOfBoundRestrictFactor)
        }
        this.setOffset(b);
        this.fireEvent("drag", this, a);
        return true
    },
    onDragEnd: function (a) {
        if (this.dragging) {
            this.fireEvent("beforedragend", this, a);
            if (this.revert && !this.cancelRevert) {
                this.setOffset(this.startOffset, true)
            } else {
                this.setDragging(false)
            }
            this.fireEvent("dragend", this, a)
        }
        return true
    },
    onOrientationChange: function () {
        this.updateBoundary()
    },
    setDragging: function (a) {
        if (a) {
            if (!this.dragging) {
                this.dragging = true;
                this.getProxyEl().addCls(this.draggingCls)
            }
        } else {
            if (this.dragging) {
                this.dragging = false;
                this.getProxyEl().removeCls(this.draggingCls)
            }
        }
        return this
    },
    getProxyEl: function () {
        return this.proxy || this.el
    },
    destroy: function () {
        this.el.removeCls(this.baseCls);
        this.getProxyEl().removeCls(this.proxyCls);
        this.clearListeners();
        this.disable()
    },
    reset: function () {
        this.startOffset = new Ext.util.Offset(0, 0);
        this.setOffset(this.startOffset);
        var a = this.initialRegion.copy();
        this.updateBoundary();
        this.initialRegion = this.region = this.getProxyEl().getPageBox(true);
        this.startTouchPoint.x += this.initialRegion.left - a.left;
        this.startTouchPoint.y += this.initialRegion.top - a.top
    },
    moveTo: function (a, b) {
        this.setOffset(new Ext.util.Offset(a - this.initialRegion.left, b - this.initialRegion.top));
        return this
    },
    isDragging: function () {
        return this.dragging
    },
    isVertical: function () {
        return this.vertical
    },
    isHorizontal: function () {
        return this.horizontal
    }
});
Ext.util.Draggable.Animation = {};
Ext.util.Draggable.Animation.Abstract = Ext.extend(Object, {
    startTime: null,
    startOffset: 0,
    constructor: function (a) {
        a = a || {};
        this.set(a);
        if (!this.startTime) {
            this.startTime = Date.now()
        }
    },
    set: function (a, b) {
        if (Ext.isObject(a)) {
            Ext.apply(this, a)
        } else {
            this[a] = b
        }
        return this
    },
    getOffset: Ext.emptyFn
});
Ext.util.Draggable.Animation.Linear = Ext.extend(Ext.util.Draggable.Animation.Abstract, {
    duration: 0,
    endOffset: 0,
    getOffset: function () {
        var c = this.endOffset - this.startOffset,
            a = Date.now() - this.startTime,
            b = Math.min(1, (a / this.duration));
        return this.startOffset + (b * c)
    }
});
Ext.util.Droppable = Ext.extend(Ext.util.Observable, {
    baseCls: "x-droppable",
    activeCls: "x-drop-active",
    invalidCls: "x-drop-invalid",
    hoverCls: "x-drop-hover",
    validDropMode: "intersect",
    disabled: false,
    group: "base",
    tolerance: null,
    monitoring: false,
    constructor: function (b, a) {
        a = a || {};
        Ext.apply(this, a);
        this.addEvents("dropactivate", "dropdeactivate", "dropenter", "dropleave", "drop");
        this.el = Ext.get(b);
        Ext.util.Droppable.superclass.constructor.call(this);
        if (!this.disabled) {
            this.enable()
        }
        this.el.addCls(this.baseCls)
    },
    onDragStart: function (a, b) {
        if (a.group === this.group) {
            this.monitoring = true;
            this.el.addCls(this.activeCls);
            this.region = this.el.getPageBox(true);
            a.on({
                drag: this.onDrag,
                beforedragend: this.onBeforeDragEnd,
                dragend: this.onDragEnd,
                scope: this
            });
            if (this.isDragOver(a)) {
                this.setCanDrop(true, a, b)
            }
            this.fireEvent("dropactivate", this, a, b)
        } else {
            a.on({
                dragend: function () {
                    this.el.removeCls(this.invalidCls)
                },
                scope: this,
                single: true
            });
            this.el.addCls(this.invalidCls)
        }
    },
    isDragOver: function (a, b) {
        return this.region[this.validDropMode](a.region)
    },
    onDrag: function (a, b) {
        this.setCanDrop(this.isDragOver(a), a, b)
    },
    setCanDrop: function (c, a, b) {
        if (c && !this.canDrop) {
            this.canDrop = true;
            this.el.addCls(this.hoverCls);
            this.fireEvent("dropenter", this, a, b)
        } else {
            if (!c && this.canDrop) {
                this.canDrop = false;
                this.el.removeCls(this.hoverCls);
                this.fireEvent("dropleave", this, a, b)
            }
        }
    },
    onBeforeDragEnd: function (a, b) {
        a.cancelRevert = this.canDrop
    },
    onDragEnd: function (a, b) {
        this.monitoring = false;
        this.el.removeCls(this.activeCls);
        a.un({
            drag: this.onDrag,
            beforedragend: this.onBeforeDragEnd,
            dragend: this.onDragEnd,
            scope: this
        });
        if (this.canDrop) {
            this.canDrop = false;
            this.el.removeCls(this.hoverCls);
            this.fireEvent("drop", this, a, b)
        }
        this.fireEvent("dropdeactivate", this, a, b)
    },
    enable: function () {
        if (!this.mgr) {
            this.mgr = Ext.util.Observable.observe(Ext.util.Draggable)
        }
        this.mgr.on({
            dragstart: this.onDragStart,
            scope: this
        });
        this.disabled = false
    },
    disable: function () {
        this.mgr.un({
            dragstart: this.onDragStart,
            scope: this
        });
        this.disabled = true
    },
    isDisabled: function () {
        return this.disabled
    },
    isMonitoring: function () {
        return this.monitoring
    }
});
(function () {
    Ext.ScrollManager = new Ext.AbstractManager();
    Ext.util.ScrollView = Ext.extend(Ext.util.Observable, {
        useIndicators: true,
        indicatorConfig: {},
        indicatorMargin: 4,
        constructor: function (b, a) {
            var c = [],
                d = ["vertical", "horizontal"];
            Ext.util.ScrollView.superclass.constructor.call(this);
            ["useIndicators", "indicatorConfig", "indicatorMargin"].forEach(function (e) {
                if (a.hasOwnProperty(e)) {
                    this[e] = a[e];
                    delete a[e]
                }
            }, this);
            a.scrollView = this;
            this.scroller = new Ext.util.Scroller(b, a);
            if (this.useIndicators === true) {
                d.forEach(function (e) {
                    if (this.scroller[e]) {
                        c.push(e)
                    }
                }, this)
            } else {
                if (d.indexOf(this.useIndicators) !== -1) {
                    c.push(this.useIndicators)
                }
            }
            this.indicators = {};
            this.indicatorOffsetExtras = {};
            c.forEach(function (e) {
                this.indicators[e] = new Ext.util.Scroller.Indicator(this.scroller.container, Ext.apply({}, this.indicatorConfig, {
                    type: e
                }))
            }, this);
            this.mon(this.scroller, {
                scrollstart: this.onScrollStart,
                scrollend: this.onScrollEnd,
                scroll: this.onScroll,
                scope: this
            })
        },
        onScrollStart: function () {
            this.showIndicators()
        },
        onScrollEnd: function () {
            this.hideIndicators()
        },
        onScroll: function (a) {
            if (a.offsetBoundary == null || (!this.indicators.vertical && !this.indicators.horizontal)) {
                return
            }
            var c, b, e, f = a.offsetBoundary,
                d = a.offset;
            this.containerSize = a.containerBox;
            this.scrollerSize = a.size;
            this.outOfBoundOffset = f.getOutOfBoundOffset(d);
            this.restrictedOffset = f.restrict(d);
            this.boundarySize = f.getSize();
            if (!this.indicatorSizes) {
                this.indicatorSizes = {
                    vertical: 0,
                    horizontal: 0
                }
            }
            if (!this.indicatorOffsets) {
                this.indicatorOffsets = {
                    vertical: 0,
                    horizontal: 0
                }
            }
            Ext.iterate(this.indicators, function (h, g) {
                c = (h == "vertical") ? "height" : "width";
                b = (h == "vertical") ? "y" : "x";
                e = (h == "vertical") ? "bottom" : "right";
                if (this.scrollerSize[c] < this.containerSize[c]) {
                    this.indicatorSizes[h] = this.containerSize[c] * (this.scrollerSize[c] / this.containerSize[c])
                } else {
                    this.indicatorSizes[h] = this.containerSize[c] * (this.containerSize[c] / this.scrollerSize[c])
                }
                this.indicatorSizes[h] -= Math.abs(this.outOfBoundOffset[b]);
                this.indicatorSizes[h] = Math.max(this.indicatorMargin * 4, this.indicatorSizes[h]);
                if (this.boundarySize[c] != 0) {
                    this.indicatorOffsets[h] = (((f[e] - this.restrictedOffset[b]) / this.boundarySize[c]) * (this.containerSize[c] - this.indicatorSizes[h]))
                } else {
                    if (d[b] < f[e]) {
                        this.indicatorOffsets[h] = this.containerSize[c] - this.indicatorSizes[h]
                    } else {
                        this.indicatorOffsets[h] = 0
                    }
                }
                g.setOffset(this.indicatorOffsetExtras[h] + this.indicatorOffsets[h] + this.indicatorMargin);
                g.setSize(this.indicatorSizes[h] - (this.indicatorMargin * 2))
            }, this)
        },
        showIndicators: function () {
            Ext.iterate(this.indicators, function (b, a) {
                a.show();
                this.indicatorOffsetExtras[b] = a.el.dom.parentNode[b === "vertical" ? "scrollTop" : "scrollLeft"]
            }, this);
            return this
        },
        hideIndicators: function () {
            Ext.iterate(this.indicators, function (b, a) {
                a.hide()
            }, this)
        },
        destroy: function () {
            this.scroller.destroy();
            if (this.indicators) {
                Ext.iterate(this.indicators, function (b, a) {
                    a.destroy()
                }, this)
            }
            return Ext.util.ScrollView.superclass.destroy.apply(this, arguments)
        }
    });
    Ext.util.Scroller = Ext.extend(Ext.util.Draggable, {
        baseCls: "",
        draggingCls: "",
        direction: "both",
        constrain: "parent",
        outOfBoundRestrictFactor: 0.5,
        acceleration: 20,
        autoAdjustFps: false,
        friction: 0.5,
        startMomentumResetTime: 350,
        springTension: 0.3,
        minVelocityForAnimation: 1,
        bounces: true,
        momentum: true,
        cancelRevert: true,
        threshold: 5,
        constructor: function (f, d) {
            f = Ext.get(f);
            var a = Ext.ScrollManager.get(f.id);
            if (a) {
                return Ext.apply(a, d)
            }
            Ext.util.Scroller.superclass.constructor.apply(this, arguments);
            this.addEvents("scrollstart", "scroll", "scrollend", "bouncestart", "bounceend");
            this.on({
                dragstart: this.onDragStart,
                offsetchange: this.onOffsetChange,
                scope: this
            });
            Ext.ScrollManager.register(this);
            this.el.addCls("x-scroller");
            this.container.addCls("x-scroller-parent");
            if (this.bounces !== false) {
                var e = this.bounces === "both" || this.bounces === true,
                    b = e || this.bounces === "horizontal",
                    c = e || this.bounces === "vertical";
                this.bounces = {
                    x: b,
                    y: c
                }
            }
            this.theta = Math.log(1 - (this.friction / 10));
            this.bouncingVelocityFactor = this.springTension * Math.E;
            this.bouncingTimeFactor = ((1 / this.springTension) * this.acceleration);
            if (!this.decelerationAnimation) {
                this.decelerationAnimation = {}
            }
            if (!this.bouncingAnimation) {
                this.bouncingAnimation = {}
            }["x", "y"].forEach(function (g) {
                if (!this.decelerationAnimation[g]) {
                    this.decelerationAnimation[g] = new Ext.util.Scroller.Animation.Deceleration({
                        acceleration: this.acceleration,
                        theta: this.theta
                    })
                }
                if (!this.bouncingAnimation[g]) {
                    this.bouncingAnimation[g] = new Ext.util.Scroller.Animation.Bouncing({
                        acceleration: this.acceleration,
                        springTension: this.springTension
                    })
                }
            }, this);
            return this
        },
        updateBoundary: function (a) {
            Ext.util.Scroller.superclass.updateBoundary.apply(this, arguments);
            this.snapToBoundary(a);
            return this
        },
        onOffsetChange: function (a, b) {
            this.fireEvent("scroll", a, {
                x: -b.x,
                y: -b.y
            })
        },
        onTouchStart: function (a) {
            Ext.util.Scroller.superclass.onTouchStart.apply(this, arguments);
            this.stopMomentumAnimation()
        },
        onDragStart: function (a) {
            this.fireEvent("scrollstart", this, a)
        },
        setStartTime: function (a) {
            this.startTime = a.time;
            this.originalStartTime = (a.event.originalTimeStamp) ? a.event.originalTimeStamp : a.time
        },
        onStart: function (a) {
            if (Ext.util.Scroller.superclass.onStart.apply(this, arguments) !== true) {
                return
            }
            this.setStartTime(a);
            this.lastEventTime = a.time;
            this.startTimeOffset = this.offset.copy();
            this.isScrolling = true;
            this.momentumAnimationFramesHandled = 0
        },
        onDrag: function (a) {
            if (Ext.util.Scroller.superclass.onDrag.apply(this, arguments) !== true) {
                return
            }
            this.lastEventTime = a.time;
            if (this.lastEventTime - this.startTime > this.startMomentumResetTime) {
                this.setStartTime(a);
                this.startTimeOffset = this.offset.copy()
            }
        },
        onDragEnd: function (a) {
            if (Ext.util.Scroller.superclass.onDragEnd.apply(this, arguments) !== true) {
                return
            }
            if (!this.startMomentumAnimation(a)) {
                this.fireScrollEndEvent()
            }
        },
        onOrientationChange: function () {
            Ext.util.Scroller.superclass.onOrientationChange.apply(this, arguments);
            this.snapToBoundary()
        },
        fireScrollEndEvent: function () {
            this.isScrolling = false;
            this.isMomentumAnimating = false;
            this.snapToBoundary();
            this.fireEvent("scrollend", this, this.getOffset());
            this.snapToSlot()
        },
        getLastActualFps: function () {
            var a = (this.momentumAnimationEndTime - this.momentumAnimationStartTime - this.momentumAnimationProcessingTime) / 1000;
            return this.momentumAnimationFramesHandled / a
        },
        scrollTo: function (c, a) {
            this.stopMomentumAnimation();
            var b = this.offsetBoundary.restrict(new Ext.util.Offset(-c.x, -c.y));
            this.setOffset(b, a);
            return this
        },
        scrollBy: function (b, a) {
            this.stopMomentumAnimation();
            var c = this.offset.copy();
            c.x += b.x;
            c.y += b.y;
            this.setOffset(c, a);
            return this
        },
        setSnap: function (a) {
            this.snap = a
        },
        snapToBoundary: function (a) {
            var b = this.offsetBoundary.restrict(this.offset);
            this.setOffset(b, a);
            return this
        },
        snapToSlot: function () {
            var a = this.offsetBoundary.restrict(this.offset);
            a.round();
            if (this.snap) {
                if (this.snap === true) {
                    this.snap = {
                        x: 50,
                        y: 50
                    }
                } else {
                    if (Ext.isNumber(this.snap)) {
                        this.snap = {
                            x: this.snap,
                            y: this.snap
                        }
                    }
                }
                if (this.snap.y) {
                    a.y = Math.round(a.y / this.snap.y) * this.snap.y
                }
                if (this.snap.x) {
                    a.x = Math.round(a.x / this.snap.x) * this.snap.x
                }
                if (!this.offset.equals(a)) {
                    this.scrollTo({
                        x: -a.x,
                        y: -a.y
                    }, this.snapDuration)
                }
            }
        },
        startMomentumAnimation: function (g) {
            var i = this,
                j = (g.event.originalTimeStamp) ? g.event.originalTimeStamp : g.time,
                c = Math.max(40, j - this.originalStartTime);
            this.fireEvent("beforemomentumanimationstart");
            if ((!this.momentum || !(c <= this.startMomentumResetTime)) && !this.offsetBoundary.isOutOfBound(this.offset)) {
                return false
            }
            var d = this.minVelocityForAnimation,
                f, h = this.offset.copy(),
                a, b = (c / this.acceleration);
            this.isBouncing = {
                x: false,
                y: false
            };
            this.isDecelerating = {
                x: false,
                y: false
            };
            this.momentumAnimationStartTime = g.time;
            this.momentumAnimationProcessingTime = 0;
            this.bouncingData = {
                x: null,
                y: null
            };
            this.momentumAnimationStartVelocity = {
                x: (this.offset.x - this.startTimeOffset.x) / b,
                y: (this.offset.y - this.startTimeOffset.y) / b
            };
            this.momentumAnimationStartOffset = h;
            ["x", "y"].forEach(function (e) {
                this.isDecelerating[e] = (Math.abs(this.momentumAnimationStartVelocity[e]) > d);
                if (this.bounces && this.bounces[e]) {
                    a = this.offsetBoundary.restrict(e, h[e]);
                    if (a !== h[e]) {
                        f = (h[e] - a) * this.bouncingVelocityFactor;
                        this.bouncingData[e] = {
                            axis: e,
                            offset: a,
                            time: this.momentumAnimationStartTime,
                            velocity: f
                        };
                        this.isBouncing[e] = true;
                        this.isDecelerating[e] = false;
                        this.fireEvent("bouncestart", this, this.bouncingData[e]);
                        this.bouncingAnimation[e].set({
                            startTime: this.bouncingData[e].time - this.bouncingTimeFactor,
                            startOffset: this.bouncingData[e].offset,
                            startVelocity: this.bouncingData[e].velocity
                        })
                    }
                }
                if (this.isDecelerating[e]) {
                    this.decelerationAnimation[e].set({
                        startVelocity: this.momentumAnimationStartVelocity[e],
                        startOffset: this.momentumAnimationStartOffset[e],
                        startTime: this.momentumAnimationStartTime
                    })
                }
            }, this);
            if (this.isDecelerating.x || this.isDecelerating.y || this.isBouncing.x || this.isBouncing.y) {
                this.isMomentumAnimating = true;
                this.momentumAnimationFramesHandled = 0;
                this.fireEvent("momentumanimationstart");
                i.handleMomentumAnimationFrame();
                this.momentumAnimationTimer = setInterval(function () {
                    i.handleMomentumAnimationFrame()
                }, this.getFrameDuration());
                return true
            }
            return false
        },
        stopMomentumAnimation: function () {
            if (this.isMomentumAnimating) {
                if (this.momentumAnimationTimer) {
                    clearInterval(this.momentumAnimationTimer)
                }
                this.momentumAnimationEndTime = Date.now();
                var a = this.getLastActualFps();
                if (!this.maxFps || a > this.maxFps) {
                    this.maxFps = a
                }
                if (this.autoAdjustFps) {
                    this.fps = this.maxFps
                }
                this.isDecelerating = {};
                this.isBouncing = {};
                this.fireEvent("momentumanimationend");
                this.fireScrollEndEvent()
            }
            return this
        },
        handleMomentumAnimationFrame: function () {
            if (!this.isMomentumAnimating) {
                return
            }
            var c = Date.now(),
                f = this.offset.copy(),
                e = this.offsetBoundary,
                b, a, d;
            ["x", "y"].forEach(function (g) {
                if (this.isDecelerating[g]) {
                    f[g] = this.decelerationAnimation[g].getOffset();
                    b = this.momentumAnimationStartVelocity[g] * this.decelerationAnimation[g].getFrictionFactor();
                    d = e.getOutOfBoundOffset(g, f[g]);
                    if (d !== 0) {
                        a = e.restrict(g, f[g]);
                        if (this.bounces && this.bounces[g]) {
                            this.bouncingData[g] = {
                                axis: g,
                                offset: a,
                                time: c,
                                velocity: b
                            };
                            this.fireEvent("bouncestart", this, this.bouncingData[g]);
                            this.bouncingAnimation[g].set({
                                startTime: this.bouncingData[g].time,
                                startOffset: this.bouncingData[g].offset,
                                startVelocity: this.bouncingData[g].velocity
                            });
                            this.isBouncing[g] = true
                        }
                        this.isDecelerating[g] = false
                    } else {
                        if (Math.abs(b) <= 1) {
                            this.isDecelerating[g] = false
                        }
                    }
                } else {
                    if (this.isBouncing[g]) {
                        f[g] = this.bouncingAnimation[g].getOffset();
                        a = e.restrict(g, f[g]);
                        if (Math.abs(f[g] - a) <= 1) {
                            this.isBouncing[g] = false;
                            this.fireEvent("bounceend", this, {
                                axis: g
                            });
                            f[g] = a
                        }
                    }
                }
            }, this);
            if (!this.isDecelerating.x && !this.isDecelerating.y && !this.isBouncing.x && !this.isBouncing.y) {
                this.stopMomentumAnimation();
                return
            }
            this.momentumAnimationFramesHandled++;
            this.momentumAnimationProcessingTime += Date.now() - c;
            this.setOffset(f)
        },
        destroy: function () {
            Ext.ScrollManager.unregister(this);
            return Ext.util.Scroller.superclass.destroy.apply(this, arguments)
        }
    });
    Ext.util.Scroller.Animation = {};
    Ext.util.Scroller.Animation.Deceleration = Ext.extend(Ext.util.Draggable.Animation.Abstract, {
        acceleration: 30,
        theta: null,
        startVelocity: null,
        getOffset: function () {
            return this.startOffset - this.startVelocity * (1 - this.getFrictionFactor()) / this.theta
        },
        getFrictionFactor: function () {
            var a = Date.now() - this.startTime;
            return Math.exp(a / this.acceleration * this.theta)
        }
    });
    Ext.util.Scroller.Animation.Bouncing = Ext.extend(Ext.util.Draggable.Animation.Abstract, {
        springTension: 0.3,
        acceleration: 30,
        startVelocity: null,
        getOffset: function () {
            var b = (Date.now() - this.startTime),
                a = (b / this.acceleration) * Math.pow(Math.E, -this.springTension * (b / this.acceleration));
            return this.startOffset + (this.startVelocity * a)
        }
    });
    Ext.util.Scroller.Indicator = Ext.extend(Object, {
        baseCls: "x-scrollbar",
        ui: "dark",
        type: "horizontal",
        constructor: function (a, b) {
            this.container = a;
            Ext.apply(this, b);
            this.el = this.container.createChild({
                cls: [this.baseCls, this.baseCls + "-" + this.type, this.baseCls + "-" + this.ui].join(" ")
            });
            this.offset = new Ext.util.Offset();
            this.hide()
        },
        hide: function () {
            var a = this;
            if (this.hideTimer) {
                clearTimeout(this.hideTimer)
            }
            this.hideTimer = setTimeout(function () {
                a.el.setStyle("opacity", 0)
            }, 100);
            return this
        },
        show: function () {
            if (this.hideTimer) {
                clearTimeout(this.hideTimer)
            }
            this.el.setStyle("opacity", 1);
            return this
        },
        setVisibility: function (a) {
            return this[a ? "show" : "hide"]()
        },
        setSize: function (a) {
            if (this.size && a > this.size) {
                a = Math.round(a)
            }
            this.el.dom.style[(this.type == "horizontal") ? "width" : "height"] = a + "px";
            this.size = a;
            return this
        },
        setOffset: function (a) {
            if (this.type == "vertical") {
                this.offset.y = a
            } else {
                this.offset.x = a
            }
            if (!Ext.is.iOS && !Ext.is.Desktop) {
                if (this.type == "vertical") {
                    this.el.dom.style.top = this.offset.y + "px"
                } else {
                    this.el.dom.style.left = this.offset.x + "px"
                }
            } else {
                Ext.Element.cssTranslate(this.el, this.offset)
            }
            return this
        }
    })
})();
Ext.util.Sortable = Ext.extend(Ext.util.Observable, {
    baseCls: "x-sortable",
    direction: "vertical",
    cancelSelector: null,
    constrain: window,
    group: "base",
    revert: true,
    itemSelector: null,
    handleSelector: null,
    disabled: false,
    delay: 0,
    sorting: false,
    vertical: false,
    vertical: false,
    constructor: function (b, a) {
        a = a || {};
        Ext.apply(this, a);
        this.addEvents("sortstart", "sortend", "sortchange");
        this.el = Ext.get(b);
        Ext.util.Sortable.superclass.constructor.call(this);
        if (this.direction == "horizontal") {
            this.horizontal = true
        } else {
            if (this.direction == "vertical") {
                this.vertical = true
            } else {
                this.horizontal = this.vertical = true
            }
        }
        this.el.addCls(this.baseCls);
        this.startEventName = (this.delay > 0) ? "taphold" : "tapstart";
        if (!this.disabled) {
            this.enable()
        }
    },
    onStart: function (b, a) {
        if (this.cancelSelector && b.getTarget(this.cancelSelector)) {
            return
        }
        if (this.handleSelector && !b.getTarget(this.handleSelector)) {
            return
        }
        if (!this.sorting) {
            this.onSortStart(b, a)
        }
    },
    onSortStart: function (c, b) {
        this.sorting = true;
        var a = new Ext.util.Draggable(b, {
            threshold: 0,
            revert: this.revert,
            direction: this.direction,
            constrain: this.constrain === true ? this.el : this.constrain,
            animationDuration: 100
        });
        a.on({
            drag: this.onDrag,
            dragend: this.onDragEnd,
            scope: this
        });
        this.dragEl = b;
        this.calculateBoxes();
        if (!a.dragging) {
            a.onStart(c)
        }
        this.fireEvent("sortstart", this, c)
    },
    calculateBoxes: function () {
        this.items = [];
        var b = this.el.select(this.itemSelector, false),
            f = b.length,
            a, e, c, d;
        for (a = 0; a < f; a++) {
            c = b[a];
            if (c != this.dragEl) {
                e = Ext.fly(c).getPageBox(true);
                e.el = c;
                this.items.push(e)
            }
        }
    },
    onDrag: function (l, c) {
        var g = this.items,
            f = g.length,
            h = l.region,
            d = false,
            b, a, j, k;
        for (b = 0; b < f; b++) {
            k = g[b];
            a = h.intersect(k);
            if (a) {
                if (this.vertical && Math.abs(a.top - a.bottom) > (h.bottom - h.top) / 2) {
                    if (h.bottom > k.top && k.top > h.top) {
                        l.el.insertAfter(k.el)
                    } else {
                        l.el.insertBefore(k.el)
                    }
                    d = true
                } else {
                    if (this.horizontal && Math.abs(a.left - a.right) > (h.right - h.left) / 2) {
                        if (h.right > k.left && k.left > h.left) {
                            l.el.insertAfter(k.el)
                        } else {
                            l.el.insertBefore(k.el)
                        }
                        d = true
                    }
                }
                if (d) {
                    l.reset();
                    l.moveTo(h.left, h.top);
                    this.calculateBoxes();
                    this.fireEvent("sortchange", this, l.el, this.el.select(this.itemSelector, false).indexOf(l.el.dom));
                    return
                }
            }
        }
    },
    onDragEnd: function (a, b) {
        a.destroy();
        this.sorting = false;
        this.fireEvent("sortend", this, a, b)
    },
    enable: function () {
        this.el.on(this.startEventName, this.onStart, this, {
            delegate: this.itemSelector,
            holdThreshold: this.delay
        });
        this.disabled = false
    },
    disable: function () {
        this.el.un(this.startEventName, this.onStart, this);
        this.disabled = true
    },
    isDisabled: function () {
        return this.disabled
    },
    isSorting: function () {
        return this.sorting
    },
    isVertical: function () {
        return this.vertical
    },
    isHorizontal: function () {
        return this.horizontal
    }
});
(function () {
    Date.useStrict = false;

    function b(d) {
        var c = Array.prototype.slice.call(arguments, 1);
        return d.replace(/\{(\d+)\}/g, function (e, f) {
            return c[f]
        })
    }
    Date.formatCodeToRegex = function (d, c) {
        var e = Date.parseCodes[d];
        if (e) {
            e = typeof e == "function" ? e() : e;
            Date.parseCodes[d] = e
        }
        return e ? Ext.applyIf({
            c: e.c ? b(e.c, c || "{0}") : e.c
        }, e) : {
            g: 0,
            c: null,
            s: Ext.util.Format.escapeRegex(d)
        }
    };
    var a = Date.formatCodeToRegex;
    Ext.apply(Date, {
        parseFunctions: {
            "M$": function (d, c) {
                var e = new RegExp("\\/Date\\(([-+])?(\\d+)(?:[+-]\\d{4})?\\)\\/");
                var f = (d || "").match(e);
                return f ? new Date(((f[1] || "") + f[2]) * 1) : null
            }
        },
        parseRegexes: [],
        formatFunctions: {
            "M$": function () {
                return "\\/Date(" + this.getTime() + ")\\/"
            }
        },
        y2kYear: 50,
        MILLI: "ms",
        SECOND: "s",
        MINUTE: "mi",
        HOUR: "h",
        DAY: "d",
        MONTH: "mo",
        YEAR: "y",
        defaults: {},
        dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        monthNumbers: {
            Jan: 0,
            Feb: 1,
            Mar: 2,
            Apr: 3,
            May: 4,
            Jun: 5,
            Jul: 6,
            Aug: 7,
            Sep: 8,
            Oct: 9,
            Nov: 10,
            Dec: 11
        },
        getShortMonthName: function (c) {
            return Date.monthNames[c].substring(0, 3)
        },
        getShortDayName: function (c) {
            return Date.dayNames[c].substring(0, 3)
        },
        getMonthNumber: function (c) {
            return Date.monthNumbers[c.substring(0, 1).toUpperCase() + c.substring(1, 3).toLowerCase()]
        },
        formatCodes: {
            d: "Ext.util.Format.leftPad(this.getDate(), 2, '0')",
            D: "Date.getShortDayName(this.getDay())",
            j: "this.getDate()",
            l: "Date.dayNames[this.getDay()]",
            N: "(this.getDay() ? this.getDay() : 7)",
            S: "this.getSuffix()",
            w: "this.getDay()",
            z: "this.getDayOfYear()",
            W: "Ext.util.Format.leftPad(this.getWeekOfYear(), 2, '0')",
            F: "Date.monthNames[this.getMonth()]",
            m: "Ext.util.Format.leftPad(this.getMonth() + 1, 2, '0')",
            M: "Date.getShortMonthName(this.getMonth())",
            n: "(this.getMonth() + 1)",
            t: "this.getDaysInMonth()",
            L: "(this.isLeapYear() ? 1 : 0)",
            o: "(this.getFullYear() + (this.getWeekOfYear() == 1 && this.getMonth() > 0 ? +1 : (this.getWeekOfYear() >= 52 && this.getMonth() < 11 ? -1 : 0)))",
            Y: "this.getFullYear()",
            y: "('' + this.getFullYear()).substring(2, 4)",
            a: "(this.getHours() < 12 ? 'am' : 'pm')",
            A: "(this.getHours() < 12 ? 'AM' : 'PM')",
            g: "((this.getHours() % 12) ? this.getHours() % 12 : 12)",
            G: "this.getHours()",
            h: "Ext.util.Format.leftPad((this.getHours() % 12) ? this.getHours() % 12 : 12, 2, '0')",
            H: "Ext.util.Format.leftPad(this.getHours(), 2, '0')",
            i: "Ext.util.Format.leftPad(this.getMinutes(), 2, '0')",
            s: "Ext.util.Format.leftPad(this.getSeconds(), 2, '0')",
            u: "Ext.util.Format.leftPad(this.getMilliseconds(), 3, '0')",
            O: "this.getGMTOffset()",
            P: "this.getGMTOffset(true)",
            T: "this.getTimezone()",
            Z: "(this.getTimezoneOffset() * -60)",
            c: function () {
                for (var j = "Y-m-dTH:i:sP", g = [], f = 0, d = j.length; f < d; ++f) {
                    var h = j.charAt(f);
                    g.push(h == "T" ? "'T'" : Date.getFormatCode(h))
                }
                return g.join(" + ")
            },
            U: "Math.round(this.getTime() / 1000)"
        },
        isValid: function (n, c, l, j, f, g, e) {
            j = j || 0;
            f = f || 0;
            g = g || 0;
            e = e || 0;
            var k = new Date(n, c - 1, l, j, f, g, e);
            return n == k.getFullYear() && c == k.getMonth() + 1 && l == k.getDate() && j == k.getHours() && f == k.getMinutes() && g == k.getSeconds() && e == k.getMilliseconds()
        },
        parseDate: function (d, f, c) {
            var e = Date.parseFunctions;
            if (e[f] == null) {
                Date.createParser(f)
            }
            return e[f](d, Ext.isDefined(c) ? c : Date.useStrict)
        },
        getFormatCode: function (d) {
            var c = Date.formatCodes[d];
            if (c) {
                c = typeof c == "function" ? c() : c;
                Date.formatCodes[d] = c
            }
            return c || ("'" + Ext.util.Format.escape(d) + "'")
        },
        createFormat: function (g) {
            var f = [],
                c = false,
                e = "";
            for (var d = 0; d < g.length; ++d) {
                e = g.charAt(d);
                if (!c && e == "\\") {
                    c = true
                } else {
                    if (c) {
                        c = false;
                        f.push("'" + Ext.util.Format.escape(e) + "'")
                    } else {
                        f.push(Date.getFormatCode(e))
                    }
                }
            }
            Date.formatFunctions[g] = new Function("return " + f.join("+"))
        },
        createParser: function () {
            var c = ["var dt, y, m, d, h, i, s, ms, o, z, zz, u, v,", "def = Date.defaults,", "results = String(input).match(Date.parseRegexes[{0}]);", "if(results){", "{1}", "if(u != null){", "v = new Date(u * 1000);", "}else{", "dt = (new Date()).clearTime();", "y = Ext.num(y, Ext.num(def.y, dt.getFullYear()));", "m = Ext.num(m, Ext.num(def.m - 1, dt.getMonth()));", "d = Ext.num(d, Ext.num(def.d, dt.getDate()));", "h  = Ext.num(h, Ext.num(def.h, dt.getHours()));", "i  = Ext.num(i, Ext.num(def.i, dt.getMinutes()));", "s  = Ext.num(s, Ext.num(def.s, dt.getSeconds()));", "ms = Ext.num(ms, Ext.num(def.ms, dt.getMilliseconds()));", "if(z >= 0 && y >= 0){", "v = new Date(y, 0, 1, h, i, s, ms);", "v = !strict? v : (strict === true && (z <= 364 || (v.isLeapYear() && z <= 365))? v.add(Date.DAY, z) : null);", "}else if(strict === true && !Date.isValid(y, m + 1, d, h, i, s, ms)){", "v = null;", "}else{", "v = new Date(y, m, d, h, i, s, ms);", "}", "}", "}", "if(v){", "if(zz != null){", "v = v.add(Date.SECOND, -v.getTimezoneOffset() * 60 - zz);", "}else if(o){", "v = v.add(Date.MINUTE, -v.getTimezoneOffset() + (sn == '+'? -1 : 1) * (hr * 60 + mn));", "}", "}", "return v;"].join("\n");
            return function (l) {
                var e = Date.parseRegexes.length,
                    n = 1,
                    f = [],
                    k = [],
                    j = false,
                    d = "",
                    h = 0,
                    g, m;
                for (; h < l.length; ++h) {
                    d = l.charAt(h);
                    if (!j && d == "\\") {
                        j = true
                    } else {
                        if (j) {
                            j = false;
                            k.push(Ext.util.Format.escape(d))
                        } else {
                            g = a(d, n);
                            n += g.g;
                            k.push(g.s);
                            if (g.g && g.c) {
                                if (g.last) {
                                    m = g
                                } else {
                                    f.push(g.c)
                                }
                            }
                        }
                    }
                }
                if (m) {
                    f.push(m)
                }
                Date.parseRegexes[e] = new RegExp("^" + k.join("") + "$");
                Date.parseFunctions[l] = new Function("input", "strict", b(c, e, f.join("")))
            }
        }(),
        parseCodes: {
            d: {
                g: 1,
                c: "d = parseInt(results[{0}], 10);\n",
                s: "(\\d{2})"
            },
            j: {
                g: 1,
                c: "d = parseInt(results[{0}], 10);\n",
                s: "(\\d{1,2})"
            },
            D: function () {
                for (var c = [], d = 0; d < 7; c.push(Date.getShortDayName(d)), ++d) {}
                return {
                    g: 0,
                    c: null,
                    s: "(?:" + c.join("|") + ")"
                }
            },
            l: function () {
                return {
                    g: 0,
                    c: null,
                    s: "(?:" + Date.dayNames.join("|") + ")"
                }
            },
            N: {
                g: 0,
                c: null,
                s: "[1-7]"
            },
            S: {
                g: 0,
                c: null,
                s: "(?:st|nd|rd|th)"
            },
            w: {
                g: 0,
                c: null,
                s: "[0-6]"
            },
            z: {
                g: 1,
                c: "z = parseInt(results[{0}], 10);\n",
                s: "(\\d{1,3})"
            },
            W: {
                g: 0,
                c: null,
                s: "(?:\\d{2})"
            },
            F: function () {
                return {
                    g: 1,
                    c: "m = parseInt(Date.getMonthNumber(results[{0}]), 10);\n",
                    s: "(" + Date.monthNames.join("|") + ")"
                }
            },
            M: function () {
                for (var c = [], d = 0; d < 12; c.push(Date.getShortMonthName(d)), ++d) {}
                return Ext.applyIf({
                    s: "(" + c.join("|") + ")"
                }, a("F"))
            },
            m: {
                g: 1,
                c: "m = parseInt(results[{0}], 10) - 1;\n",
                s: "(\\d{2})"
            },
            n: {
                g: 1,
                c: "m = parseInt(results[{0}], 10) - 1;\n",
                s: "(\\d{1,2})"
            },
            t: {
                g: 0,
                c: null,
                s: "(?:\\d{2})"
            },
            L: {
                g: 0,
                c: null,
                s: "(?:1|0)"
            },
            o: function () {
                return a("Y")
            },
            Y: {
                g: 1,
                c: "y = parseInt(results[{0}], 10);\n",
                s: "(\\d{4})"
            },
            y: {
                g: 1,
                c: "var ty = parseInt(results[{0}], 10);\ny = ty > Date.y2kYear ? 1900 + ty : 2000 + ty;\n",
                s: "(\\d{1,2})"
            },
            a: function () {
                return a("A")
            },
            A: {
                calcLast: true,
                g: 1,
                c: "if (results[{0}] == 'AM') {\nif (!h || h == 12) { h = 0; }\n} else { if (!h || h < 12) { h = (h || 0) + 12; }}",
                s: "(AM|PM)"
            },
            g: function () {
                return a("G")
            },
            G: {
                g: 1,
                c: "h = parseInt(results[{0}], 10);\n",
                s: "(\\d{1,2})"
            },
            h: function () {
                return a("H")
            },
            H: {
                g: 1,
                c: "h = parseInt(results[{0}], 10);\n",
                s: "(\\d{2})"
            },
            i: {
                g: 1,
                c: "i = parseInt(results[{0}], 10);\n",
                s: "(\\d{2})"
            },
            s: {
                g: 1,
                c: "s = parseInt(results[{0}], 10);\n",
                s: "(\\d{2})"
            },
            u: {
                g: 1,
                c: "ms = results[{0}]; ms = parseInt(ms, 10)/Math.pow(10, ms.length - 3);\n",
                s: "(\\d+)"
            },
            O: {
                g: 1,
                c: ["o = results[{0}];", "var sn = o.substring(0,1),", "hr = o.substring(1,3)*1 + Math.floor(o.substring(3,5) / 60),", "mn = o.substring(3,5) % 60;", "o = ((-12 <= (hr*60 + mn)/60) && ((hr*60 + mn)/60 <= 14))? (sn + Ext.util.Format.leftPad(hr, 2, '0') + Ext.util.Format.leftPad(mn, 2, '0')) : null;\n"].join("\n"),
                s: "([+-]\\d{4})"
            },
            P: {
                g: 1,
                c: ["o = results[{0}];", "var sn = o.substring(0,1),", "hr = o.substring(1,3)*1 + Math.floor(o.substring(4,6) / 60),", "mn = o.substring(4,6) % 60;", "o = ((-12 <= (hr*60 + mn)/60) && ((hr*60 + mn)/60 <= 14))? (sn + Ext.util.Format.leftPad(hr, 2, '0') + Ext.util.Format.leftPad(mn, 2, '0')) : null;\n"].join("\n"),
                s: "([+-]\\d{2}:\\d{2})"
            },
            T: {
                g: 0,
                c: null,
                s: "[A-Z]{1,4}"
            },
            Z: {
                g: 1,
                c: "zz = results[{0}] * 1;\nzz = (-43200 <= zz && zz <= 50400)? zz : null;\n",
                s: "([+-]?\\d{1,5})"
            },
            c: function () {
                var e = [],
                    c = [a("Y", 1), a("m", 2), a("d", 3), a("h", 4), a("i", 5), a("s", 6),
                    {
                        c: "ms = results[7] || '0'; ms = parseInt(ms, 10)/Math.pow(10, ms.length - 3);\n"
                    }, {
                        c: ["if(results[8]) {", "if(results[8] == 'Z'){", "zz = 0;", "}else if (results[8].indexOf(':') > -1){", a("P", 8).c, "}else{", a("O", 8).c, "}", "}"].join("\n")
                    }];
                for (var f = 0, d = c.length; f < d; ++f) {
                    e.push(c[f].c)
                }
                return {
                    g: 1,
                    c: e.join(""),
                    s: [c[0].s, "(?:", "-", c[1].s, "(?:", "-", c[2].s, "(?:", "(?:T| )?", c[3].s, ":", c[4].s, "(?::", c[5].s, ")?", "(?:(?:\\.|,)(\\d+))?", "(Z|(?:[-+]\\d{2}(?::)?\\d{2}))?", ")?", ")?", ")?"].join("")
                }
            },
            U: {
                g: 1,
                c: "u = parseInt(results[{0}], 10);\n",
                s: "(-?\\d+)"
            }
        }
    })
}());
Ext.apply(Date.prototype, {
    dateFormat: function (a) {
        if (Date.formatFunctions[a] == null) {
            Date.createFormat(a)
        }
        return Date.formatFunctions[a].call(this)
    },
    getTimezone: function () {
        return this.toString().replace(/^.* (?:\((.*)\)|([A-Z]{1,4})(?:[\-+][0-9]{4})?(?: -?\d+)?)$/, "$1$2").replace(/[^A-Z]/g, "")
    },
    getGMTOffset: function (a) {
        return (this.getTimezoneOffset() > 0 ? "-" : "+") + Ext.util.Format.leftPad(Math.floor(Math.abs(this.getTimezoneOffset()) / 60), 2, "0") + (a ? ":" : "") + Ext.util.Format.leftPad(Math.abs(this.getTimezoneOffset() % 60), 2, "0")
    },
    getDayOfYear: function () {
        var b = 0,
            e = this.clone(),
            a = this.getMonth(),
            c;
        for (c = 0, e.setDate(1), e.setMonth(0); c < a; e.setMonth(++c)) {
            b += e.getDaysInMonth()
        }
        return b + this.getDate() - 1
    },
    getWeekOfYear: function () {
        var a = 86400000,
            b = 7 * a;
        return function () {
            var d = Date.UTC(this.getFullYear(), this.getMonth(), this.getDate() + 3) / a,
                c = Math.floor(d / 7),
                e = new Date(c * b).getUTCFullYear();
            return c - Math.floor(Date.UTC(e, 0, 7) / b) + 1
        }
    }(),
    isLeapYear: function () {
        var a = this.getFullYear();
        return !!((a & 3) == 0 && (a % 100 || (a % 400 == 0 && a)))
    },
    getFirstDayOfMonth: function () {
        var a = (this.getDay() - (this.getDate() - 1)) % 7;
        return (a < 0) ? (a + 7) : a
    },
    getLastDayOfMonth: function () {
        return this.getLastDateOfMonth().getDay()
    },
    getFirstDateOfMonth: function () {
        return new Date(this.getFullYear(), this.getMonth(), 1)
    },
    getLastDateOfMonth: function () {
        return new Date(this.getFullYear(), this.getMonth(), this.getDaysInMonth())
    },
    getDaysInMonth: function () {
        var a = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        return function () {
            var b = this.getMonth();
            return b == 1 && this.isLeapYear() ? 29 : a[b]
        }
    }(),
    getSuffix: function () {
        switch (this.getDate()) {
        case 1:
        case 21:
        case 31:
            return "st";
        case 2:
        case 22:
            return "nd";
        case 3:
        case 23:
            return "rd";
        default:
            return "th"
        }
    },
    clone: function () {
        return new Date(this.getTime())
    },
    isDST: function () {
        return new Date(this.getFullYear(), 0, 1).getTimezoneOffset() != this.getTimezoneOffset()
    },
    clearTime: function (f) {
        if (f) {
            return this.clone().clearTime()
        }
        var b = this.getDate();
        this.setHours(0);
        this.setMinutes(0);
        this.setSeconds(0);
        this.setMilliseconds(0);
        if (this.getDate() != b) {
            for (var a = 1, e = this.add(Date.HOUR, a); e.getDate() != b; a++, e = this.add(Date.HOUR, a)) {}
            this.setDate(b);
            this.setHours(e.getHours())
        }
        return this
    },
    add: function (b, c) {
        var e = this.clone();
        if (!b || c === 0) {
            return e
        }
        switch (b.toLowerCase()) {
        case Date.MILLI:
            e.setMilliseconds(this.getMilliseconds() + c);
            break;
        case Date.SECOND:
            e.setSeconds(this.getSeconds() + c);
            break;
        case Date.MINUTE:
            e.setMinutes(this.getMinutes() + c);
            break;
        case Date.HOUR:
            e.setHours(this.getHours() + c);
            break;
        case Date.DAY:
            e.setDate(this.getDate() + c);
            break;
        case Date.MONTH:
            var a = this.getDate();
            if (a > 28) {
                a = Math.min(a, this.getFirstDateOfMonth().add("mo", c).getLastDateOfMonth().getDate())
            }
            e.setDate(a);
            e.setMonth(this.getMonth() + c);
            break;
        case Date.YEAR:
            e.setFullYear(this.getFullYear() + c);
            break
        }
        return e
    },
    between: function (c, a) {
        var b = this.getTime();
        return c.getTime() <= b && b <= a.getTime()
    }
});
Date.prototype.format = Date.prototype.dateFormat;
Ext.data.Connection = Ext.extend(Ext.util.Observable, {
    method: "post",
    url: null,
    disableCaching: true,
    disableCachingParam: "_dc",
    timeout: 30000,
    useDefaultHeader: true,
    defaultPostHeader: "application/x-www-form-urlencoded; charset=UTF-8",
    useDefaultXhrHeader: true,
    defaultXhrHeader: "XMLHttpRequest",
    constructor: function (a) {
        a = a || {};
        Ext.apply(this, a);
        this.addEvents("beforerequest", "requestcomplete", "requestexception");
        this.requests = {};
        Ext.data.Connection.superclass.constructor.call(this)
    },
    request: function (d) {
        var m = this;
        if (m.fireEvent("beforerequest", m, d) !== false) {
            var h = d.params,
                c = d.url || m.url,
                f = d.urlParams,
                l = m.extraParams,
                i, j, g, b, q, s;
            if (Ext.isFunction(h)) {
                h = h.call(d.scope || window, d)
            }
            if (Ext.isFunction(c)) {
                c = c.call(d.scope || window, d)
            }
            j = d.rawData || d.xmlData || d.jsonData || null;
            if (d.jsonData && !Ext.isPrimitive(d.jsonData)) {
                j = Ext.encode(j)
            }
            h = Ext.urlEncode(l, Ext.isObject(h) ? Ext.urlEncode(h) : h);
            f = Ext.isObject(f) ? Ext.urlEncode(f) : f;
            b = (d.method || ((h || j) ? "POST" : "GET")).toUpperCase();
            if (b === "GET" && d.disableCaching !== false && m.disableCaching) {
                c = Ext.urlAppend(c, d.disableCachingParam || m.disableCachingParam + "=" + (new Date().getTime()))
            }
            if ((b == "GET" || j) && h) {
                c = Ext.urlAppend(c, h);
                h = null
            }
            if (f) {
                c = Ext.urlAppend(c, f)
            }
            if (d.autoAbort === true || m.autoAbort) {
                m.abort()
            }
            s = this.getXhrInstance();
            s.open(b.toUpperCase(), c, true);
            g = Ext.apply({}, d.headers || {}, m.defaultHeaders || {});
            if (!g["Content-Type"] && (j || h)) {
                var p = m.defaultPostHeader,
                    n = d.jsonData,
                    a = d.xmlData;
                if (j) {
                    if (d.rawData) {
                        p = "text/plain"
                    } else {
                        if (a && Ext.isDefined(a)) {
                            p = "text/xml"
                        } else {
                            if (n && Ext.isDefined(n)) {
                                p = "application/json"
                            }
                        }
                    }
                }
                g["Content-Type"] = p
            }
            if (m.useDefaultXhrHeader && !g["X-Requested-With"]) {
                g["X-Requested-With"] = m.defaultXhrHeader
            }
            for (q in g) {
                if (g.hasOwnProperty(q)) {
                    try {
                        s.setRequestHeader(q, g[q])
                    } catch (k) {
                        m.fireEvent("exception", q, g[q])
                    }
                }
            }
            i = {
                id: ++Ext.data.Connection.requestId,
                xhr: s,
                headers: g,
                options: d,
                timeout: setTimeout(function () {
                    i.timedout = true;
                    m.abort(i)
                }, d.timeout || m.timeout)
            };
            m.requests[i.id] = i;
            s.onreadystatechange = Ext.createDelegate(m.onStateChange, m, [i]);
            s.send(j || h || null);
            return i
        } else {
            return d.callback ? d.callback.apply(d.scope, [d, undefined, undefined]) : null
        }
    },
    getXhrInstance: function () {
        return new XMLHttpRequest()
    },
    isLoading: function (a) {
        return a && !{
            0: true,
            4: true
        }[a.xhr.readyState]
    },
    abort: function (a) {
        if (a && this.isLoading(a)) {
            if (!request.timedout) {
                request.aborted = true
            }
            a.xhr.abort()
        } else {
            if (!a) {
                var b;
                for (b in this.requests) {
                    if (!this.requests.hasOwnProperty(b)) {
                        continue
                    }
                    this.abort(this.requests[b])
                }
            }
        }
    },
    onStateChange: function (a) {
        if (a.xhr.readyState == 4) {
            clearTimeout(a.timeout);
            delete a.timeout;
            this.onComplete(a)
        }
    },
    onComplete: function (d) {
        var a = d.xhr.status,
            c = d.options,
            e = true,
            b;
        if ((a >= 200 && a < 300) || a == 304) {
            b = this.createResponse(d);
            this.fireEvent("requestcomplete", this, b, c);
            if (c.success) {
                if (!c.scope) {
                    c.success(b, c)
                } else {
                    c.success.call(c.scope, b, c)
                }
            }
        } else {
            e = false;
            switch (a) {
            case 12002:
            case 12029:
            case 12030:
            case 12031:
            case 12152:
            case 13030:
                b = this.createException(d);
                break;
            default:
                b = this.createResponse(d)
            }
            this.fireEvent("requestexception", this, b, c);
            if (c.failure) {
                if (!c.scope) {
                    c.failure(b, c)
                } else {
                    c.failure.call(c.scope, b, c)
                }
            }
        }
        if (c.callback) {
            if (!c.scope) {
                c.callback(c, e, b)
            } else {
                c.callback.call(c.scope, c, e, b)
            }
        }
        delete this.requests[d.id]
    },
    createResponse: function (a) {
        var g = a.xhr,
            b = {},
            h = g.getAllResponseHeaders().replace(/\r\n/g, "\n").split("\n"),
            c = h.length,
            i, d, f, e;
        while (c--) {
            i = h[c];
            d = i.indexOf(":");
            if (d >= 0) {
                f = i.substr(0, d).toLowerCase();
                if (i.charAt(d + 1) == " ") {
                    ++d
                }
                b[f] = i.substr(d + 1)
            }
        }
        delete a.xhr;
        return {
            request: a,
            requestId: a.id,
            status: g.status,
            statusText: g.statusText,
            getResponseHeader: function (j) {
                return b[j.toLowerCase()]
            },
            getAllResponseHeaders: function () {
                return b
            },
            responseText: g.responseText,
            responseXML: g.responseXML
        }
    },
    createException: function (a) {
        return {
            request: a,
            requestId: a.id,
            status: a.aborted ? -1 : 0,
            statusText: a.aborted ? "transaction aborted" : "communication failure",
            aborted: a.aborted,
            timedout: a.timedout
        }
    }
});
Ext.data.Connection.requestId = 0;
Ext.Ajax = new Ext.data.Connection({
    autoAbort: false
});
Ext.util.EventSimulator = Ext.extend(Object, {
    supportedEvents: {
        touch: ["touchstart", "touchmove", "touchend", "gesturestart", "gesturechange", "gestureend"],
        mouse: ["mousedown", "mousemove", "mouseup", "click"]
    },
    getEventTypeByName: function (b) {
        var a = null;
        Ext.iterate(this.supportedEvents, function (d, c) {
            if (c.indexOf(b) != -1) {
                a = d
            }
        });
        return a
    },
    fire: function (b, c, a) {
        b = b.toLowerCase();
        if (arguments.length == 2) {
            a = c;
            c = document
        }
        switch (this.getEventTypeByName(b)) {
        case "touch":
            this.fireTouchEvent.call(this, b, c, a);
            break;
        case "mouse":
            this.fireMouseEvent.call(this, b, c, a);
            break;
        default:
            throw new Error("Event type " + b + " is currently not supported")
        }
        return this
    },
    createEvent: function (b, a) {},
    createEventData: function (b, a) {
        switch (this.getEventTypeByName(b.type)) {
        case "touch":
            return this.createTouchEventData(b.type, b.target, b, a);
            break;
        case "mouse":
            return this.createMouseEventData(b.type, b.target, b, a);
            break;
        default:
            throw new Error("Event type " + b.type + " is currently not supported")
        }
    },
    fireTouchEvent: function (c, d, b) {
        var e = this.createTouchEventData(c, d, b);
        var a = this.createTouchEvent(c, e);
        a.isSimulated = true;
        return d.dispatchEvent(a)
    },
    createTouchEventData: function (c, d, a, b) {
        var e = {
            type: c,
            timeStamp: Date.now(),
            bubbles: true,
            cancelable: true,
            detail: 1,
            screenX: 0,
            screenY: 0,
            pageX: 0,
            pageY: 0,
            clientX: 0,
            clientY: 0,
            ctrlKey: false,
            altKey: false,
            shiftKey: false,
            metaKey: false,
            scale: 1,
            rotation: 0
        };
        if (!b) {
            e.target = d;
            e.view = document.defaultView
        }
        if (a) {
            Ext.iterate(e, function (f, g) {
                if (a.hasOwnProperty(f)) {
                    e[f] = a[f]
                }
            })
        }["touches", "targetTouches", "changedTouches"].forEach(function (f) {
            if (a.hasOwnProperty(f)) {
                e[f] = this.createTouchList(a[f], d, b)
            } else {
                e[f] = this.createTouchList(e, d, b)
            }
        }, this);
        return e
    },
    createTouchEvent: function (b, c) {
        if (typeof b != "string") {
            c = b;
            b = b.type
        }
        var a = document.createEvent("TouchEvent");
        if (a.initTouchEvent.length == 9) {
            a.initTouchEvent(c.touches, c.targetTouches, c.changedTouches, b, c.view, c.screenX, c.screenY, c.clientX, c.clientY)
        } else {
            a.initTouchEvent(b, c.bubbles, c.cancelable, c.view, c.detail, c.screenX, c.screenY, c.pageX, c.pageY, c.ctrlKey, c.altKey, c.shiftKey, c.metaKey, c.touches, c.targetTouches, c.changedTouches, c.scale, c.rotation)
        }
        return a
    },
    createTouch: function (c, a, b) {
        if (!document.createTouch || b) {
            return {
                pageX: a.pageX,
                pageY: a.pageY,
                clientX: a.pageX,
                clientY: a.pageY,
                screenX: a.pageX,
                screenY: a.pageY,
                identifier: +a.identifier || 0
            }
        }
        return document.createTouch(document.defaultView, c, +a.identifier || 0, +a.pageX || 0, +a.pageY || 0, +a.screenX || 0, +a.screenY || 0)
    },
    createTouchList: function (c, e, b) {
        var f, d = [];
        if (Ext.isObject(c) && typeof c.target != "undefined") {
            c = [c]
        }
        if (c) {
            for (var a = 0; a < c.length; a++) {
                if (!b && !c[a].target) {
                    c[a].target = e
                }
                f = this.createTouch(c[a].target, c[a], b);
                d.push(f)
            }
        }
        if (!document.createTouchList || b) {
            return d
        }
        return document.createTouchList.apply(document, d)
    },
    fireMouseEvent: function (b, e, a) {
        var d = this.createMouseEventData(b, e, a);
        var c = this.createMouseEvent(b, d);
        c.isSimulated = true;
        c.originalTimeStamp = d.timeStamp;
        return e.dispatchEvent(c)
    },
    createMouseEventData: function (c, g, a, b) {
        var f = {
            type: c,
            timeStamp: Date.now(),
            bubbles: true,
            cancelable: (c != "mousemove"),
            detail: 1,
            screenX: 0,
            screenY: 0,
            pageX: 0,
            pageY: 0,
            clientX: 0,
            clientY: 0,
            ctrlKey: false,
            altKey: false,
            shiftKey: false,
            metaKey: false,
            button: 0,
            relatedTarget: null
        },
            e = ["screen", "client", "page"],
            d = {
                x: 0,
                y: 0
            };
        if (!b) {
            f.target = g;
            f.view = window
        }
        if (a) {
            Ext.iterate(f, function (h, i) {
                if (a.hasOwnProperty(h)) {
                    f[h] = a[h]
                }
            })
        }
        e.forEach(function (h) {
            if (f[h + "X"] != 0) {
                d.x = f[h + "X"]
            }
            if (f[h + "Y"] != 0) {
                d.y = f[h + "Y"]
            }
        });
        e.forEach(function (h) {
            if (f[h + "X"] == 0 && d.x != 0) {
                f[h + "X"] = d.x
            }
            if (f[h + "Y"] == 0 && d.y != 0) {
                f[h + "Y"] = d.y
            }
        });
        return f
    },
    createMouseEvent: function (a, b) {
        var c = document.createEvent("MouseEvents");
        c.initMouseEvent(a, b.bubbles, b.cancelable, b.view, b.detail, b.screenX, b.screenY, b.clientX, b.clientY, b.ctrlKey, b.altKey, b.shiftKey, b.metaKey, b.button, b.relatedTarget);
        return c
    }
});
Ext.util.EventRecorder = Ext.extend(Ext.util.Observable, {
    eventCollection: null,
    currentEventSetName: null,
    constructor: function () {
        this.addEvents("replaystart", "beforecalculatetarget", "beforefire", "afterfire", "aftercalculatetarget", "replayend", "interrupted");
        this.eventSets = {};
        this.interruptedIndexes = {};
        return this
    },
    getEventSet: function (a) {
        if (typeof a != "string") {
            if (this.currentEventSetName == null) {
                throw new Error("No EventSet is currently used")
            }
            a = this.currentEventSetName
        }
        if (typeof this.eventSets[a] == "undefined") {
            this.eventSets[a] = []
        }
        return this.eventSets[a]
    },
    start: function (a) {
        this.currentEventSetName = a
    },
    record: function (a, c) {
        if (typeof a != "string") {
            if (this.currentEventSetName == null) {
                return
            }
            c = a;
            a = this.currentEventSetName
        }
        var b = this.getEventSimulator().createEventData(c, true);
        this.getEventSet(a).push(b)
    },
    setEventSet: function (a, b) {
        this.eventSets[a] = b
    },
    erase: function (a) {
        this.getEventSet(a).length = 0
    },
    stopReplay: function () {
        this.interruptFlag = true
    },
    resumeReplay: function (b) {
        var a = this.interruptedIndexes[b] || 0;
        this.replay(b, a)
    },
    replay: function (c, j) {
        var l = this.getEventSimulator(),
            k = this.getEventSet(c),
            i, d = 0,
            e = 0,
            b, h, f, a = ["touchmove", "touchend", "mousemove", "mouseup"],
            g = this;
        if (typeof j == "undefined") {
            j = 0
        }
        e = j;
        i = k.length;
        this.interruptFlag = false;
        if (i > 0) {
            this.fireEvent("replaystart", c, j);
            setTimeout(function () {
                b = k[e];
                if (b) {
                    if (a.indexOf(b.type) === -1) {
                        g.fireEvent("beforecalculatetarget", b.type, b);
                        h = Ext.util.Point.fromEvent(b);
                        f = document.elementFromPoint(h.x, h.y);
                        g.fireEvent("aftercalculatetarget", b.type, f, b)
                    }
                    if (f) {
                        if (g.interruptFlag === true) {
                            g.interruptFlag = false;
                            g.interruptedIndexes[c] = e;
                            g.fireEvent("interrupted", e);
                            g.fireEvent("replayend", c, true);
                            return
                        }
                        g.fireEvent("beforefire", b.type, f, b);
                        l.fire(b.type, f, b);
                        g.fireEvent("afterfire", b.type, f, b)
                    }
                    if (++e < i) {
                        setTimeout(arguments.callee, k[e].timeStamp - b.timeStamp)
                    } else {
                        g.fireEvent("replayend", c, false)
                    }
                }
            }, d)
        }
    },
    end: function () {
        this.currentEventSetName = null
    },
    getEventSimulator: function () {
        if (!this._eventSimulator) {
            this._eventSimulator = new Ext.util.EventSimulator()
        }
        return this._eventSimulator
    },
    setEventSimulator: function (a) {
        if (!(a instanceof Ext.util.EventSimulator)) {
            throw new Error("eventSimulator must be an instance of Ext.util.EventSimulator")
        }
        this._eventSimulator = a
    },
    save: function (a) {}
});
Ext.gesture.Manager = new Ext.AbstractManager({
    eventNames: {
        start: "touchstart",
        move: "touchmove",
        end: "touchend"
    },
    defaultPreventedMouseEvents: ["click"],
    clickMoveThreshold: 5,
    init: function () {
        this.targets = [];
        this.followTouches = [];
        this.currentGestures = [];
        this.currentTargets = [];
        if (!Ext.supports.Touch) {
            Ext.apply(this.eventNames, {
                start: "mousedown",
                move: "mousemove",
                end: "mouseup"
            })
        }
        this.listenerWrappers = {
            start: Ext.createDelegate(this.onTouchStart, this),
            move: Ext.createDelegate(this.onTouchMove, this),
            end: Ext.createDelegate(this.onTouchEnd, this),
            mouse: Ext.createDelegate(this.onMouseEvent, this)
        };
        this.attachListeners()
    },
    freeze: function () {
        this.isFrozen = true
    },
    thaw: function () {
        this.isFrozen = false
    },
    getEventSimulator: function () {
        if (!this.eventSimulator) {
            this.eventSimulator = new Ext.util.EventSimulator()
        }
        return this.eventSimulator
    },
    attachListeners: function () {
        Ext.iterate(this.eventNames, function (b, a) {
            document.addEventListener(a, this.listenerWrappers[b], false)
        }, this);
        if (Ext.supports.Touch) {
            this.defaultPreventedMouseEvents.forEach(function (a) {
                document.addEventListener(a, this.listenerWrappers.mouse, true)
            }, this)
        }
    },
    detachListeners: function () {
        Ext.iterate(this.eventNames, function (b, a) {
            document.removeEventListener(a, this.listenerWrappers[b], false)
        }, this);
        if (Ext.supports.Touch) {
            this.defaultPreventedMouseEvents.forEach(function (a) {
                document.removeEventListener(a, this.listenerWrappers.mouse, true)
            }, this)
        }
    },
    onMouseEvent: function (a) {
        if (!a.isSimulated) {
            a.preventDefault();
            a.stopPropagation()
        }
    },
    onTouchStart: function (c) {
        var a = [],
            b = c.target;
        if (c.stopped === true) {
            return
        }
        if (Ext.is.Android) {
            if (!(b.tagName && ["input", "textarea", "select"].indexOf(b.tagName.toLowerCase()) !== -1)) {
                c.preventDefault()
            }
        }
        if (this.isFrozen) {
            return
        }
        if (this.startEvent) {
            this.onTouchEnd(c)
        }
        this.locks = {};
        this.currentTargets = [b];
        while (b) {
            if (this.targets.indexOf(b) !== -1) {
                a.unshift(b)
            }
            b = b.parentNode;
            this.currentTargets.push(b)
        }
        this.startEvent = c;
        this.startPoint = Ext.util.Point.fromEvent(c);
        this.lastMovePoint = null;
        this.isClick = true;
        this.handleTargets(a, c)
    },
    onTouchMove: function (c) {
        if (!Ext.is.Android) {
            c.preventDefault()
        }
        if (!this.startEvent) {
            return
        }
        if (Ext.is.Desktop) {
            c.target = this.startEvent.target
        }
        if (this.isFrozen) {
            return
        }
        var d = this.currentGestures,
            b, f = c.changedTouches ? c.changedTouches[0] : c;
        this.lastMovePoint = Ext.util.Point.fromEvent(c);
        if (Ext.supports.Touch && this.isClick && !this.lastMovePoint.isWithin(this.startPoint, this.clickMoveThreshold)) {
            this.isClick = false
        }
        for (var a = 0; a < d.length; a++) {
            if (c.stopped) {
                break
            }
            b = d[a];
            if (b.listenForMove) {
                b.onTouchMove(c, f)
            }
        }
    },
    onTouchEnd: function (g) {
        if (Ext.is.Blackberry) {
            g.preventDefault()
        }
        if (this.isFrozen) {
            return
        }
        var h = this.currentGestures.slice(0),
            d = h.length,
            c, b, a, f = false,
            j = g.changedTouches ? g.changedTouches[0] : g;
        if (this.startPoint) {
            a = Ext.util.Point.fromEvent(g);
            if (!(this.lastMovePoint || this.startPoint)["equals"](a)) {
                f = true
            }
        }
        for (c = 0; c < d; c++) {
            b = h[c];
            if (!g.stopped && b.listenForEnd) {
                if (f) {
                    b.onTouchMove(g, j)
                }
                b.onTouchEnd(g, j)
            }
            this.stopGesture(b)
        }
        if (Ext.supports.Touch && this.isClick) {
            this.isClick = false;
            this.getEventSimulator().fire("click", this.startEvent.target, j)
        }
        this.lastMovePoint = null;
        this.followTouches = [];
        this.startedChangedTouch = false;
        this.currentTargets = [];
        this.startEvent = null;
        this.startPoint = null
    },
    handleTargets: function (a, d) {
        var c = a.length,
            b;
        this.startedChangedTouch = false;
        this.startedTouches = Ext.supports.Touch ? d.touches : [d];
        for (b = 0; b < c; b++) {
            if (d.stopped) {
                break
            }
            this.handleTarget(a[b], d, true)
        }
        for (b = c - 1; b >= 0; b--) {
            if (d.stopped) {
                break
            }
            this.handleTarget(a[b], d, false)
        }
        if (this.startedChangedTouch) {
            this.followTouches = this.followTouches.concat((Ext.supports.Touch && d.targetTouches) ? Ext.toArray(d.targetTouches) : [d])
        }
    },
    handleTarget: function (g, f, a) {
        var h = Ext.Element.data(g, "x-gestures") || [],
            d = h.length,
            c, b;
        for (c = 0; c < d; c++) {
            b = h[c];
            if (( !! b.capture === !! a) && (this.followTouches.length < b.touches) && ((Ext.supports.Touch && f.targetTouches) ? (f.targetTouches.length === b.touches) : true)) {
                this.startedChangedTouch = true;
                this.startGesture(b);
                if (b.listenForStart) {
                    b.onTouchStart(f, f.changedTouches ? f.changedTouches[0] : f)
                }
                if (f.stopped) {
                    break
                }
            }
        }
    },
    startGesture: function (a) {
        a.started = true;
        this.currentGestures.push(a)
    },
    stopGesture: function (a) {
        a.started = false;
        this.currentGestures.remove(a)
    },
    addEventListener: function (g, b, f, d) {
        g = Ext.getDom(g);
        d = d || {};
        var a = this.targets,
            c = this.getGestureName(b),
            h = Ext.Element.data(g, "x-gestures"),
            e;
        if (!h) {
            h = [];
            Ext.Element.data(g, "x-gestures", h)
        }
        if (!c) {
            throw new Error("Trying to subscribe to unknown event " + b)
        }
        if (a.indexOf(g) === -1) {
            this.targets.push(g)
        }
        e = this.get(g.id + "-" + c);
        if (!e) {
            e = this.create(Ext.apply({}, d, {
                target: g,
                type: c
            }));
            h.push(e)
        }
        e.addListener(b, f);
        if (this.startedChangedTouch && this.currentTargets.contains(g) && !e.started && !d.subsequent) {
            this.startGesture(e);
            if (e.listenForStart) {
                e.onTouchStart(this.startEvent, this.startedTouches[0])
            }
        }
    },
    removeEventListener: function (e, a, d) {
        e = Ext.getDom(e);
        var b = this.getGestureName(a),
            f = Ext.Element.data(e, "x-gestures") || [],
            c;
        c = this.get(e.id + "-" + b);
        if (c) {
            c.removeListener(a, d);
            for (b in c.listeners) {
                return
            }
            c.destroy();
            f.remove(c);
            Ext.Element.data(e, "x-gestures", f)
        }
    },
    getGestureName: function (a) {
        return this.names && this.names[a]
    },
    registerType: function (d, a) {
        var c = a.prototype.handles,
            b, e;
        this.types[d] = a;
        a[this.typeName] = d;
        if (!c) {
            c = a.prototype.handles = [d]
        }
        this.names = this.names || {};
        for (b = 0, e = c.length; b < e; b++) {
            this.names[c[b]] = d
        }
    }
});
Ext.regGesture = function () {
    return Ext.gesture.Manager.registerType.apply(Ext.gesture.Manager, arguments)
};
Ext.TouchEventObjectImpl = Ext.extend(Object, {
    constructor: function (b, a) {
        if (b) {
            this.setEvent(b, a)
        }
    },
    setEvent: function (b, a) {
        Ext.apply(this, {
            event: b,
            time: b.timeStamp
        });
        this.touches = b.touches || [b];
        this.changedTouches = b.changedTouches || [b];
        this.targetTouches = b.targetTouches || [b];
        if (a) {
            this.target = a.target;
            Ext.apply(this, a)
        } else {
            this.target = b.target
        }
        return this
    },
    stopEvent: function () {
        this.stopPropagation();
        this.preventDefault()
    },
    stopPropagation: function () {
        this.event.stopped = true
    },
    preventDefault: function () {
        this.event.preventDefault()
    },
    getTarget: function (b, c, a) {
        if (b) {
            return Ext.fly(this.target).findParent(b, c, a)
        } else {
            return a ? Ext.get(this.target) : this.target
        }
    }
});
Ext.TouchEventObject = new Ext.TouchEventObjectImpl();
Ext.gesture.Gesture = Ext.extend(Object, {
    listenForStart: true,
    listenForEnd: true,
    listenForMove: true,
    disableLocking: false,
    touches: 1,
    constructor: function (a) {
        a = a || {};
        Ext.apply(this, a);
        this.target = Ext.getDom(this.target);
        this.listeners = {};
        if (!this.target) {
            throw new Error("Trying to bind a " + this.type + " event to element that does'nt exist: " + this.target)
        }
        this.id = this.target.id + "-" + this.type;
        Ext.gesture.Gesture.superclass.constructor.call(this);
        Ext.gesture.Manager.register(this)
    },
    addListener: function (a, b) {
        this.listeners[a] = this.listeners[a] || [];
        this.listeners[a].push(b)
    },
    removeListener: function (a, c) {
        var b = this.listeners[a];
        if (b) {
            b.remove(c);
            if (b.length == 0) {
                delete this.listeners[a]
            }
            for (a in this.listeners) {
                if (this.listeners.hasOwnProperty(a)) {
                    return
                }
            }
            this.listeners = {}
        }
    },
    fire: function (d, g, a) {
        var c = this.listeners && this.listeners[d],
            f = c && c.length,
            b;
        if (!this.disableLocking && this.isLocked(d)) {
            return false
        }
        if (f) {
            a = Ext.apply(a || {}, {
                time: g.timeStamp,
                type: d,
                gesture: this,
                target: (g.target.nodeType == 3) ? g.target.parentNode : g.target
            });
            for (b = 0; b < f; b++) {
                c[b](g, a)
            }
        }
        return true
    },
    stop: function () {
        Ext.gesture.Manager.stopGesture(this)
    },
    lock: function () {
        if (!this.disableLocking) {
            var a = arguments,
                c = a.length,
                b;
            for (b = 0; b < c; b++) {
                Ext.gesture.Manager.locks[a[b]] = this.id
            }
        }
    },
    unlock: function () {
        if (!this.disableLocking) {
            var a = arguments,
                c = a.length,
                b;
            for (b = 0; b < c; b++) {
                if (Ext.gesture.Manager.locks[a[b]] == this.id) {
                    delete Ext.gesture.Manager.locks[a[b]]
                }
            }
        }
    },
    isLocked: function (b) {
        var a = Ext.gesture.Manager.locks[b];
        return !!(a && a !== this.id)
    },
    getLockingGesture: function (b) {
        var a = Ext.gesture.Manager.locks[b];
        if (a) {
            return Ext.gesture.Manager.get(a) || null
        }
        return null
    },
    onTouchStart: Ext.emptyFn,
    onTouchMove: Ext.emptyFn,
    onTouchEnd: Ext.emptyFn,
    destroy: function () {
        this.stop();
        this.listeners = null;
        Ext.gesture.Manager.unregister(this)
    }
});
Ext.gesture.Touch = Ext.extend(Ext.gesture.Gesture, {
    handles: ["touchstart", "touchmove", "touchend", "touchdown"],
    touchDownInterval: 500,
    onTouchStart: function (a, b) {
        this.startX = this.previousX = b.pageX;
        this.startY = this.previousY = b.pageY;
        this.startTime = this.previousTime = a.timeStamp;
        this.fire("touchstart", a);
        this.lastEvent = a;
        if (this.listeners && this.listeners.touchdown) {
            this.touchDownIntervalId = setInterval(Ext.createDelegate(this.touchDownHandler, this), this.touchDownInterval)
        }
    },
    onTouchMove: function (a, b) {
        this.fire("touchmove", a, this.getInfo(b));
        this.lastEvent = a
    },
    onTouchEnd: function (a) {
        this.fire("touchend", a, this.lastInfo);
        clearInterval(this.touchDownIntervalId)
    },
    touchDownHandler: function () {
        this.fire("touchdown", this.lastEvent, this.lastInfo)
    },
    getInfo: function (e) {
        var d = Date.now(),
            b = e.pageX - this.startX,
            a = e.pageY - this.startY,
            c = {
                startX: this.startX,
                startY: this.startY,
                previousX: this.previousX,
                previousY: this.previousY,
                pageX: e.pageX,
                pageY: e.pageY,
                deltaX: b,
                deltaY: a,
                absDeltaX: Math.abs(b),
                absDeltaY: Math.abs(a),
                previousDeltaX: e.pageX - this.previousX,
                previousDeltaY: e.pageY - this.previousY,
                time: d,
                startTime: this.startTime,
                previousTime: this.previousTime,
                deltaTime: d - this.startTime,
                previousDeltaTime: d - this.previousTime
            };
        this.previousTime = c.time;
        this.previousX = c.pageX;
        this.previousY = c.pageY;
        this.lastInfo = c;
        return c
    }
});
Ext.regGesture("touch", Ext.gesture.Touch);
Ext.gesture.Tap = Ext.extend(Ext.gesture.Gesture, {
    handles: ["tapstart", "tapcancel", "tap", "doubletap", "taphold", "singletap"],
    cancelThreshold: 10,
    doubleTapThreshold: 800,
    singleTapThreshold: 400,
    holdThreshold: 1000,
    fireClickEvent: false,
    onTouchStart: function (b, c) {
        var a = this;
        a.startX = c.pageX;
        a.startY = c.pageY;
        a.fire("tapstart", b, a.getInfo(c));
        if (this.listeners.taphold) {
            a.timeout = setTimeout(function () {
                a.fire("taphold", b, a.getInfo(c));
                delete a.timeout
            }, a.holdThreshold)
        }
        a.lastTouch = c
    },
    onTouchMove: function (b, c) {
        var a = this;
        if (a.isCancel(c)) {
            a.fire("tapcancel", b, a.getInfo(c));
            if (a.timeout) {
                clearTimeout(a.timeout);
                delete a.timeout
            }
            a.stop()
        }
        a.lastTouch = c
    },
    onTouchEnd: function (c) {
        var a = this,
            b = a.getInfo(a.lastTouch);
        this.fireTapEvent(c, b);
        if (a.lastTapTime && c.timeStamp - a.lastTapTime <= a.doubleTapThreshold) {
            a.lastTapTime = null;
            c.preventDefault();
            a.fire("doubletap", c, b)
        } else {
            a.lastTapTime = c.timeStamp
        }
        if (a.listeners && a.listeners.singletap && a.singleTapThreshold && !a.preventSingleTap) {
            a.fire("singletap", c, b);
            a.preventSingleTap = true;
            setTimeout(function () {
                a.preventSingleTap = false
            }, a.singleTapThreshold)
        }
        if (a.timeout) {
            clearTimeout(a.timeout);
            delete a.timeout
        }
    },
    fireTapEvent: function (d, c) {
        this.fire("tap", d, c);
        if (d.event) {
            d = d.event
        }
        var b = (d.changedTouches ? d.changedTouches[0] : d).target;
        if (!b.disabled && this.fireClickEvent) {
            var a = document.createEvent("MouseEvent");
            a.initMouseEvent("click", d.bubbles, d.cancelable, document.defaultView, d.detail, d.screenX, d.screenY, d.clientX, d.clientY, d.ctrlKey, d.altKey, d.shiftKey, d.metaKey, d.metaKey, d.button, d.relatedTarget);
            a.isSimulated = true;
            b.dispatchEvent(a)
        }
    },
    getInfo: function (c) {
        var a = c.pageX,
            b = c.pageY;
        return {
            pageX: a,
            pageY: b,
            startX: a,
            startY: b
        }
    },
    isCancel: function (b) {
        var a = this;
        return (Math.abs(b.pageX - a.startX) >= a.cancelThreshold || Math.abs(b.pageY - a.startY) >= a.cancelThreshold)
    }
});
Ext.regGesture("tap", Ext.gesture.Tap);
Ext.gesture.Swipe = Ext.extend(Ext.gesture.Gesture, {
    listenForEnd: false,
    swipeThreshold: 35,
    swipeTime: 1000,
    onTouchStart: function (a, b) {
        this.startTime = a.timeStamp;
        this.startX = b.pageX;
        this.startY = b.pageY;
        this.lock("scroll", "scrollstart", "scrollend")
    },
    onTouchMove: function (g, h) {
        var b = h.pageY - this.startY,
            d = h.pageX - this.startX,
            a = Math.abs(b),
            c = Math.abs(d),
            f = g.timeStamp - this.startTime;
        if (a - c > 3 || f > this.swipeTime) {
            this.unlock("drag", "dragstart", "dragend");
            this.stop()
        } else {
            if (c > this.swipeThreshold && c > a) {
                this.fire("swipe", g, {
                    direction: (d < 0) ? "left" : "right",
                    distance: c,
                    deltaTime: f,
                    deltaX: d
                });
                this.stop()
            }
        }
    }
});
Ext.regGesture("swipe", Ext.gesture.Swipe);
Ext.gesture.Drag = Ext.extend(Ext.gesture.Touch, {
    handles: ["dragstart", "drag", "dragend"],
    dragThreshold: 5,
    direction: "both",
    horizontal: false,
    vertical: false,
    constructor: function () {
        Ext.gesture.Drag.superclass.constructor.apply(this, arguments);
        if (this.direction == "both") {
            this.horizontal = true;
            this.vertical = true
        } else {
            if (this.direction == "horizontal") {
                this.horizontal = true
            } else {
                this.vertical = true
            }
        }
        return this
    },
    onTouchStart: function (a, b) {
        this.startX = this.previousX = b.pageX;
        this.startY = this.previousY = b.pageY;
        this.startTime = this.previousTime = a.timeStamp;
        this.dragging = false
    },
    onTouchMove: function (b, c) {
        if (this.isLocked("drag")) {
            return
        }
        var a = this.getInfo(c);
        if (!this.dragging) {
            if (this.isDragging(a) && this.fire("dragstart", b, a)) {
                this.dragging = true;
                this.lock("drag", "dragstart", "dragend");
                this.fire("drag", b, a)
            }
        } else {
            this.fire("drag", b, a)
        }
    },
    onTouchEnd: function (a) {
        if (this.dragging) {
            this.fire("dragend", a, this.lastInfo)
        }
        this.dragging = false
    },
    isDragging: function (a) {
        return ((this.horizontal && a.absDeltaX >= this.dragThreshold) || (this.vertical && a.absDeltaY >= this.dragThreshold))
    },
    isVertical: function () {
        return this.vertical
    },
    isHorizontal: function () {
        return this.horizontal
    }
});
Ext.regGesture("drag", Ext.gesture.Drag);
Ext.gesture.Pinch = Ext.extend(Ext.gesture.Gesture, {
    handles: ["pinchstart", "pinch", "pinchend"],
    touches: 2,
    onTouchStart: function (f) {
        var b = this;
        if (Ext.supports.Touch && f.targetTouches.length >= 2) {
            b.lock("swipe", "scroll", "scrollstart", "scrollend", "touchmove", "touchend", "touchstart", "tap", "tapstart", "taphold", "tapcancel", "doubletap");
            b.pinching = true;
            var c = f.targetTouches,
                d = b.firstTouch = c[0],
                a = b.secondTouch = c[1];
            b.previousDistance = b.startDistance = b.getDistance();
            b.previousScale = 1;
            b.fire("pinchstart", f, {
                distance: b.startDistance,
                scale: b.previousScale
            })
        } else {
            if (b.pinching) {
                b.unlock("swipe", "scroll", "scrollstart", "scrollend", "touchmove", "touchend", "touchstart", "tap", "tapstart", "taphold", "tapcancel", "doubletap");
                b.pinching = false
            }
        }
    },
    onTouchMove: function (a) {
        if (this.pinching) {
            this.fire("pinch", a, this.getPinchInfo())
        }
    },
    onTouchEnd: function (a) {
        if (this.pinching) {
            this.fire("pinchend", a, this.getPinchInfo())
        }
    },
    getPinchInfo: function () {
        var b = this,
            f = b.getDistance(),
            e = f / b.startDistance,
            d = b.firstTouch,
            a = b.secondTouch,
            c = {
                scale: e,
                deltaScale: e - 1,
                previousScale: b.previousScale,
                previousDeltaScale: e - b.previousScale,
                distance: f,
                deltaDistance: f - b.startDistance,
                startDistance: b.startDistance,
                previousDistance: b.previousDistance,
                previousDeltaDistance: f - b.previousDistance,
                firstTouch: d,
                secondTouch: a,
                firstPageX: d.pageX,
                firstPageY: d.pageY,
                secondPageX: a.pageX,
                secondPageY: a.pageY,
                midPointX: (d.pageX + a.pageX) / 2,
                midPointY: (d.pageY + a.pageY) / 2
            };
        b.previousScale = e;
        b.previousDistance = f;
        return c
    },
    getDistance: function () {
        var a = this;
        return Math.sqrt(Math.pow(Math.abs(a.firstTouch.pageX - a.secondTouch.pageX), 2) + Math.pow(Math.abs(a.firstTouch.pageY - a.secondTouch.pageY), 2))
    }
});
Ext.regGesture("pinch", Ext.gesture.Pinch);
Ext.lib.Component = Ext.extend(Ext.util.Observable, {
    isComponent: true,
    renderTpl: null,
    tplWriteMode: "overwrite",
    baseCls: "x-component",
    disabledCls: "x-item-disabled",
    hidden: false,
    disabled: false,
    draggable: false,
    floating: false,
    styleHtmlContent: false,
    styleHtmlCls: "x-html",
    allowDomMove: true,
    autoShow: false,
    autoRender: false,
    needsLayout: false,
    rendered: false,
    constructor: function (b) {
        b = b || {};
        this.initialConfig = b;
        Ext.apply(this, b);
        this.addEvents("beforeactivate", "activate", "beforedeactivate", "deactivate", "added", "disable", "enable", "beforeshow", "show", "beforehide", "hide", "removed", "beforerender", "render", "afterrender", "beforedestroy", "destroy", "resize", "move", "beforestaterestore", "staterestore", "beforestatesave", "statesave");
        this.getId();
        this.mons = [];
        this.additionalCls = [];
        this.renderData = this.renderData || {};
        this.renderSelectors = this.renderSelectors || {};
        this.initComponent();
        Ext.ComponentMgr.register(this);
        Ext.lib.Component.superclass.constructor.call(this);
        if (this.plugins) {
            this.plugins = [].concat(this.plugins);
            for (var c = 0, a = this.plugins.length; c < a; c++) {
                this.plugins[c] = this.initPlugin(this.plugins[c])
            }
        }
        if (this.applyTo) {
            this.applyToMarkup(this.applyTo);
            delete this.applyTo
        } else {
            if (this.renderTo) {
                this.render(this.renderTo);
                delete this.renderTo
            }
        }
        if (Ext.isDefined(this.disabledClass)) {
            throw "Component: disabledClass has been deprecated. Please use disabledCls."
        }
    },
    initComponent: Ext.emptyFn,
    applyToMarkup: Ext.emptyFn,
    show: Ext.emptyFn,
    onShow: function () {
        var a = this.needsLayout;
        if (Ext.isObject(a)) {
            this.doComponentLayout(a.width, a.height, a.isSetSize)
        }
    },
    initPlugin: function (a) {
        if (a.ptype && typeof a.init != "function") {
            a = Ext.PluginMgr.create(a)
        } else {
            if (typeof a == "string") {
                a = Ext.PluginMgr.create({
                    ptype: a
                })
            }
        }
        a.init(this);
        return a
    },
    render: function (b, a) {
        if (!this.rendered && this.fireEvent("beforerender", this) !== false) {
            if (this.el) {
                this.el = Ext.get(this.el)
            }
            b = this.initContainer(b);
            this.onRender(b, a);
            this.fireEvent("render", this);
            this.initContent();
            this.afterRender(b);
            this.fireEvent("afterrender", this);
            this.initEvents();
            if (this.autoShow) {
                this.show()
            }
            if (this.hidden) {
                this.onHide(false)
            }
            if (this.disabled) {
                this.disable(true)
            }
        }
        return this
    },
    onRender: function (b, a) {
        var c = this.el,
            e, d;
        a = this.getInsertPosition(a);
        if (!c) {
            if (a) {
                c = Ext.DomHelper.insertBefore(a, this.getElConfig(), true)
            } else {
                c = Ext.DomHelper.append(b, this.getElConfig(), true)
            }
        } else {
            if (this.allowDomMove !== false) {
                b.dom.insertBefore(c.dom, a)
            }
        }
        c.addCls(this.initCls());
        c.setStyle(this.initStyles());
        e = this.initRenderTpl();
        if (e) {
            d = this.initRenderData();
            e.append(c, d)
        }
        this.el = c;
        this.applyRenderSelectors();
        this.rendered = true
    },
    initCls: function () {
        var a = [this.baseCls];
        if (this.componentCls) {
            a.push(this.componentCls)
        } else {
            this.componentCls = this.baseCls
        }
        if (this.cls) {
            a.push(this.cls);
            delete this.cls
        }
        if (this.ui) {
            a.push(this.componentCls + "-" + this.ui)
        }
        return a.concat(this.additionalCls)
    },
    afterRender: function () {
        this.getComponentLayout();
        if (this.x || this.y) {
            this.setPosition(this.x, this.y)
        }
        if (this.styleHtmlContent) {
            this.getTargetEl().addCls(this.styleHtmlCls)
        }
        if (!this.ownerCt) {
            this.setSize(this.width, this.height)
        }
    },
    getElConfig: function () {
        return {
            tag: "div",
            id: this.id
        }
    },
    getInsertPosition: function (a) {
        if (a !== undefined) {
            if (Ext.isNumber(a)) {
                a = this.container.dom.childNodes[a]
            } else {
                a = Ext.getDom(a)
            }
        }
        return a
    },
    initContainer: function (a) {
        if (!a && this.el) {
            a = this.el.dom.parentNode;
            this.allowDomMove = false
        }
        this.container = Ext.get(a);
        if (this.ctCls) {
            this.container.addCls(this.ctCls)
        }
        return this.container
    },
    initRenderData: function () {
        return Ext.applyIf(this.renderData, {
            baseCls: this.baseCls,
            componentCls: this.componentCls
        })
    },
    initRenderTpl: function () {
        var a = this.renderTpl;
        if (a) {
            if (this.proto.renderTpl !== a) {
                if (Ext.isArray(a) || typeof a === "string") {
                    a = new Ext.XTemplate(a)
                }
            } else {
                if (Ext.isArray(this.proto.renderTpl)) {
                    a = this.proto.renderTpl = new Ext.XTemplate(a)
                }
            }
        }
        return a
    },
    initStyles: function () {
        var d = {},
            a = Ext.Element,
            c, e, b, f;
        if (Ext.isString(this.style)) {
            b = this.style.split(";");
            for (c = 0, e = b.length; c < e; c++) {
                if (!Ext.isEmpty(b[c])) {
                    f = b[c].split(":");
                    d[Ext.util.Format.trim(f[0])] = Ext.util.Format.trim(f[1])
                }
            }
        } else {
            d = Ext.apply({}, this.style)
        }
        if (this.padding != undefined) {
            d.padding = a.unitizeBox((this.padding === true) ? 5 : this.padding)
        }
        if (this.margin != undefined) {
            d.margin = a.unitizeBox((this.margin === true) ? 5 : this.margin)
        }
        if (this.border != undefined) {
            d.borderWidth = a.unitizeBox((this.border === true) ? 1 : this.border)
        }
        delete this.style;
        return d
    },
    initContent: function () {
        var b = this.getTargetEl();
        if (this.html) {
            b.update(Ext.DomHelper.markup(this.html));
            delete this.html
        }
        if (this.contentEl) {
            var a = Ext.get(this.contentEl);
            a.show();
            b.appendChild(a.dom)
        }
        if (this.tpl) {
            if (!this.tpl.isTemplate) {
                this.tpl = new Ext.XTemplate(this.tpl)
            }
            if (this.data) {
                this.tpl[this.tplWriteMode](b, this.data);
                delete this.data
            }
        }
    },
    initEvents: function () {
        var c = this.afterRenderEvents,
            b, a;
        if (c) {
            for (b in c) {
                if (!c.hasOwnProperty(b)) {
                    continue
                }
                a = c[b];
                if (this[b] && this[b].on) {
                    this.mon(this[b], a)
                }
            }
        }
    },
    applyRenderSelectors: function () {
        var b = this.renderSelectors || {},
            c = this.el.dom,
            a;
        for (a in b) {
            if (!b.hasOwnProperty(a)) {
                continue
            }
            this[a] = Ext.get(Ext.DomQuery.selectNode(b[a], c))
        }
    },
    is: function (a) {
        return Ext.ComponentQuery.is(this, a)
    },
    up: function (b) {
        var a = this.ownerCt;
        if (b) {
            for (; a; a = a.ownerCt) {
                if (Ext.ComponentQuery.is(a, b)) {
                    return a
                }
            }
        }
        return a
    },
    nextSibling: function (b) {
        var f = this.ownerCt,
            d, e, a, g;
        if (f) {
            d = f.items;
            a = d.indexOf(this) + 1;
            if (a) {
                if (b) {
                    for (e = d.getCount(); a < e; a++) {
                        if ((g = d.getAt(a)).is(b)) {
                            return g
                        }
                    }
                } else {
                    if (a < d.getCount()) {
                        return d.getAt(a)
                    }
                }
            }
        }
        return null
    },
    previousSibling: function (b) {
        var e = this.ownerCt,
            d, a, f;
        if (e) {
            d = e.items;
            a = d.indexOf(this);
            if (a != -1) {
                if (b) {
                    for (--a; a >= 0; a--) {
                        if ((f = d.getAt(a)).is(b)) {
                            return f
                        }
                    }
                } else {
                    if (a) {
                        return d.getAt(--a)
                    }
                }
            }
        }
        return null
    },
    getId: function () {
        return this.id || (this.id = "ext-comp-" + (++Ext.lib.Component.AUTO_ID))
    },
    getItemId: function () {
        return this.itemId || this.id
    },
    getEl: function () {
        return this.el
    },
    getTargetEl: function () {
        return this.el
    },
    isXType: function (b, a) {
        if (Ext.isFunction(b)) {
            b = b.xtype
        } else {
            if (Ext.isObject(b)) {
                b = b.constructor.xtype
            }
        }
        return !a ? ("/" + this.getXTypes() + "/").indexOf("/" + b + "/") != -1 : this.constructor.xtype == b
    },
    getXTypes: function () {
        var a = this.constructor,
            b = [],
            d = this,
            c;
        if (!a.xtypes) {
            while (d) {
                c = d.constructor.xtype;
                if (c != undefined) {
                    b.unshift(c)
                }
                d = d.constructor.superclass
            }
            a.xtypeChain = b;
            a.xtypes = b.join("/")
        }
        return a.xtypes
    },
    update: function (b, c, a) {
        if (this.tpl && !Ext.isString(b)) {
            this.data = b;
            if (this.rendered) {
                this.tpl[this.tplWriteMode](this.getTargetEl(), b || {})
            }
        } else {
            this.html = Ext.isObject(b) ? Ext.DomHelper.markup(b) : b;
            if (this.rendered) {
                this.getTargetEl().update(this.html, c, a)
            }
        }
        if (this.rendered) {
            this.doComponentLayout()
        }
    },
    setVisible: function (a) {
        return this[a ? "show" : "hide"]()
    },
    isVisible: function () {
        var b = !this.hidden,
            a = this.ownerCt;
        this.hiddenOwnerCt = false;
        if (this.destroyed) {
            return false
        }
        if (b && this.rendered && a) {
            while (a) {
                if (a.hidden || a.collapsed) {
                    this.hiddenOwnerCt = a;
                    b = false;
                    break
                }
                a = a.ownerCt
            }
        }
        return b
    },
    enable: function (a) {
        if (this.rendered) {
            this.el.removeCls(this.disabledCls);
            this.el.dom.disabled = false;
            this.onEnable()
        }
        this.disabled = false;
        if (a !== true) {
            this.fireEvent("enable", this)
        }
        return this
    },
    disable: function (a) {
        if (this.rendered) {
            this.el.addCls(this.disabledCls);
            this.el.dom.disabled = true;
            this.onDisable()
        }
        this.disabled = true;
        if (a !== true) {
            this.fireEvent("disable", this)
        }
        return this
    },
    isDisabled: function () {
        return this.disabled
    },
    setDisabled: function (a) {
        return this[a ? "disable" : "enable"]()
    },
    isHidden: function () {
        return this.hidden
    },
    addCls: function () {
        var b = this,
            a = Ext.toArray(arguments);
        if (b.rendered) {
            b.el.addCls(a)
        } else {
            b.additionalCls = b.additionalCls.concat(a)
        }
        return b
    },
    addClass: function () {
        throw "Component: addClass has been deprecated. Please use addCls."
    },
    removeCls: function () {
        var b = this,
            a = Ext.toArray(arguments);
        if (b.rendered) {
            b.el.removeCls(a)
        } else {
            if (b.additionalCls.length) {
                Ext.each(a, function (c) {
                    b.additionalCls.remove(c)
                })
            }
        }
        return b
    },
    removeClass: function () {
        throw "Component: removeClass has been deprecated. Please use removeCls."
    },
    addListener: function (b, f, e, a) {
        if (Ext.isString(b) && (Ext.isObject(f) || a && a.element)) {
            if (a.element) {
                var d = f,
                    c;
                f = {};
                f[b] = d;
                b = a.element;
                if (e) {
                    f.scope = e
                }
                for (c in a) {
                    if (!a.hasOwnProperty(c)) {
                        continue
                    }
                    if (this.eventOptionsRe.test(c)) {
                        f[c] = a[c]
                    }
                }
            }
            if (this[b] && this[b].on) {
                this.mon(this[b], f)
            } else {
                this.afterRenderEvents = this.afterRenderEvents || {};
                this.afterRenderEvents[b] = f
            }
        }
        return Ext.lib.Component.superclass.addListener.apply(this, arguments)
    },
    getBubbleTarget: function () {
        return this.ownerCt
    },
    isFloating: function () {
        return this.floating
    },
    isDraggable: function () {
        return !!this.draggable
    },
    isDroppable: function () {
        return !!this.droppable
    },
    onAdded: function (a, b) {
        this.ownerCt = a;
        this.fireEvent("added", this, a, b)
    },
    onRemoved: function () {
        this.fireEvent("removed", this, this.ownerCt);
        delete this.ownerCt
    },
    onEnable: Ext.emptyFn,
    onDisable: Ext.emptyFn,
    beforeDestroy: Ext.emptyFn,
    onResize: Ext.emptyFn,
    setSize: function (b, a) {
        if (Ext.isObject(b)) {
            a = b.height;
            b = b.width
        }
        if (!this.rendered || !this.isVisible()) {
            if (this.hiddenOwnerCt) {
                var c = this.hiddenOwnerCt.layoutOnShow;
                c.remove(this);
                c.add(this)
            }
            this.needsLayout = {
                width: b,
                height: a,
                isSetSize: true
            };
            if (!this.rendered) {
                this.width = (b !== undefined) ? b : this.width;
                this.height = (a !== undefined) ? a : this.height
            }
            return this
        }
        this.doComponentLayout(b, a, true);
        return this
    },
    setCalculatedSize: function (b, a) {
        if (Ext.isObject(b)) {
            a = b.height;
            b = b.width
        }
        if (!this.rendered || !this.isVisible()) {
            if (this.hiddenOwnerCt) {
                var c = this.hiddenOwnerCt.layoutOnShow;
                c.remove(this);
                c.add(this)
            }
            this.needsLayout = {
                width: b,
                height: a,
                isSetSize: false
            };
            return this
        }
        this.doComponentLayout(b, a);
        return this
    },
    doComponentLayout: function (d, a, b) {
        var c = this.getComponentLayout();
        if (this.rendered && c) {
            d = (d !== undefined || this.collapsed === true) ? d : this.width;
            a = (a !== undefined || this.collapsed === true) ? a : this.height;
            if (b) {
                this.width = d;
                this.height = a
            }
            c.layout(d, a)
        }
        return this
    },
    setComponentLayout: function (b) {
        var a = this.componentLayout;
        if (a && a.isLayout && a != b) {
            a.setOwner(null)
        }
        this.componentLayout = b;
        b.setOwner(this)
    },
    getComponentLayout: function () {
        if (!this.componentLayout || !this.componentLayout.isLayout) {
            this.setComponentLayout(Ext.layout.LayoutManager.create(this.componentLayout, "autocomponent"))
        }
        return this.componentLayout
    },
    afterComponentLayout: Ext.emptyFn,
    setPosition: function (a, b) {
        if (Ext.isObject(a)) {
            b = a.y;
            a = a.x
        }
        if (!this.rendered) {
            return this
        }
        if (a !== undefined || b !== undefined) {
            this.el.setBox(a, b);
            this.onPosition(a, b);
            this.fireEvent("move", this, a, b)
        }
        return this
    },
    onPosition: Ext.emptyFn,
    setWidth: function (a) {
        return this.setSize(a)
    },
    setHeight: function (a) {
        return this.setSize(undefined, a)
    },
    getSize: function () {
        return this.el.getSize()
    },
    getWidth: function () {
        return this.el.getWidth()
    },
    getHeight: function () {
        return this.el.getHeight()
    },
    setLoading: function (a, b) {
        if (this.rendered) {
            if (a) {
                this.loadMask = this.loadMask || new Ext.LoadMask(b ? this.getTargetEl() : this.el, Ext.applyIf(Ext.isObject(a) ? a : {}));
                this.loadMask.show()
            } else {
                Ext.destroy(this.loadMask);
                this.loadMask = null
            }
        }
        return this.loadMask
    },
    setDocked: function (a, b) {
        this.dock = a;
        if (b && this.ownerCt && this.rendered) {
            this.ownerCt.doComponentLayout()
        }
        return this
    },
    onDestroy: function () {
        if (this.monitorResize && Ext.EventManager.resizeEvent) {
            Ext.EventManager.resizeEvent.removeListener(this.setSize, this)
        }
        Ext.destroy(this.componentLayout, this.loadMask)
    },
    destroy: function () {
        if (!this.isDestroyed) {
            if (this.fireEvent("beforedestroy", this) !== false) {
                this.destroying = true;
                this.beforeDestroy();
                if (this.ownerCt && this.ownerCt.remove) {
                    this.ownerCt.remove(this, false)
                }
                if (this.rendered) {
                    this.el.remove()
                }
                this.onDestroy();
                Ext.ComponentMgr.unregister(this);
                this.fireEvent("destroy", this);
                this.clearListeners();
                this.destroying = false;
                this.isDestroyed = true
            }
        }
    }
});
Ext.lib.Component.prototype.on = Ext.lib.Component.prototype.addListener;
Ext.lib.Component.prototype.prev = Ext.lib.Component.prototype.previousSibling;
Ext.lib.Component.prototype.next = Ext.lib.Component.prototype.nextSibling;
Ext.lib.Component.AUTO_ID = 1000;
Ext.Component = Ext.extend(Ext.lib.Component, {});
Ext.reg("component", Ext.Component);
Ext.Component = Ext.extend(Ext.lib.Component, {
    showAnimation: null,
    monitorOrientation: false,
    floatingCls: "x-floating",
    hideOnMaskTap: true,
    stopMaskTapEvent: true,
    centered: false,
    modal: false,
    fullscreen: false,
    layoutOnOrientationChange: null,
    initComponent: function () {
        this.addEvents("beforeorientationchange", "orientationchange");
        if (this.fullscreen || this.floating) {
            this.monitorOrientation = true;
            this.autoRender = true
        }
        if (this.fullscreen) {
            var a = Ext.Viewport.getSize();
            this.width = a.width;
            this.height = a.height;
            this.cls = (this.cls || "") + " x-fullscreen";
            this.renderTo = document.body
        }
    },
    onRender: function () {
        Ext.Component.superclass.onRender.apply(this, arguments);
        if (this.monitorOrientation) {
            this.el.addCls("x-" + Ext.Viewport.orientation)
        }
        if (this.floating) {
            this.setFloating(true)
        }
        if (this.draggable) {
            this.setDraggable(this.draggable)
        }
        if (this.scroll) {
            this.setScrollable(this.scroll)
        }
    },
    afterRender: function () {
        if (this.fullscreen) {
            this.layoutOrientation(Ext.Viewport.orientation, this.width, this.height)
        }
        Ext.Component.superclass.afterRender.call(this)
    },
    initEvents: function () {
        Ext.Component.superclass.initEvents.call(this);
        if (this.monitorOrientation) {
            Ext.EventManager.onOrientationChange(this.setOrientation, this)
        }
    },
    afterComponentLayout: function () {
        var c = this.scrollEl,
            a = this.scroller,
            b;
        if (c) {
            b = c.parent();
            if (a.horizontal) {
                c.setStyle("min-width", b.getWidth(true) + "px");
                c.setHeight(b.getHeight(true) || null)
            }
            if (a.vertical) {
                c.setStyle("min-height", b.getHeight(true) + "px");
                c.setWidth(b.getWidth(true) || null)
            }
            a.updateBoundary(true)
        }
        if (this.fullscreen && Ext.is.iPad) {
            Ext.repaint()
        }
    },
    layoutOrientation: Ext.emptyFn,
    update: function () {
        Ext.Component.superclass.update.apply(this, arguments);
        var a = this.scroller;
        if (a && a.updateBoundary) {
            a.updateBoundary(true)
        }
    },
    show: function (a) {
        var b = this.rendered;
        if ((this.hidden || !b) && this.fireEvent("beforeshow", this) !== false) {
            if (this.anchorEl) {
                this.anchorEl.hide()
            }
            if (!b && this.autoRender) {
                this.render(Ext.isBoolean(this.autoRender) ? Ext.getBody() : this.autoRender)
            }
            this.hidden = false;
            if (this.rendered) {
                this.onShow(a);
                this.fireEvent("show", this)
            }
        }
        return this
    },
    showBy: function (b, c, d, a) {
        if (!this.floating) {
            return this
        }
        if (b.isComponent) {
            b = b.el
        } else {
            b = Ext.get(b)
        }
        this.x = 0;
        this.y = 0;
        this.show(c);
        if (a !== false) {
            if (!this.anchorEl) {
                this.anchorEl = this.el.createChild({
                    cls: "x-anchor"
                })
            }
            this.anchorEl.show()
        }
        this.alignTo(b, d, 20)
    },
    alignTo: function (f, e, g) {
        var b = f.getPageBox(),
            q = {
                width: window.innerWidth,
                height: window.innerHeight
            },
            l = this.getSize(),
            a = {
                width: Math.min(l.width, q.width),
                height: Math.min(l.height, q.height)
            },
            s, j = 2,
            d = ["tl-bl", "t-b", "tr-br", "l-r", "l-r", "r-l", "bl-tl", "b-t", "br-tr"],
            p = this.anchorEl,
            h = [0, g],
            i, c, k = false,
            n = [0, 0],
            o = b.left + (b.width / 2),
            m = b.top + (b.height / 2);
        if (o <= q.width * (1 / 3)) {
            j = 1;
            n[0] = 25
        } else {
            if (o >= q.width * (2 / 3)) {
                j = 3;
                n[0] = -30
            }
        }
        if (m >= q.height * (2 / 3)) {
            j += 6;
            h = [0, -g];
            n[1] = -10
        } else {
            if (e !== false && m >= q.height * (1 / 3)) {
                j += 3;
                h = (j <= 5) ? [g, 0] : [-g, 0];
                n = (j <= 5) ? [10, 0] : [-10, 0];
                k = true
            } else {
                n[1] = 10
            }
        }
        s = d[j - 1];
        i = this.el.getAlignToXY(f, s, h);
        if (k) {
            if (i[0] < 0) {
                a.width = b.left - g
            } else {
                if (i[0] + a.width > q.width) {
                    a.width = q.width - b.right - g
                }
            }
        } else {
            if (i[1] < 0) {
                a.height = b.top - g
            } else {
                if (i[1] + a.height > q.height) {
                    a.height = q.height - b.bottom - g
                }
            }
        }
        if (a.width != l.width) {
            this.setSize(a.width)
        } else {
            if (a.height != l.height) {
                this.setSize(undefined, a.height)
            }
        }
        i = this.el.getAlignToXY(f, s, h);
        this.setPosition(i[0], i[1]);
        if (p) {
            p.removeCls(["x-anchor-bottom", "x-anchor-left", "x-anchor-right", "x-anchor-top"]);
            if (h[1] == g) {
                c = "x-anchor-top"
            } else {
                if (h[1] == -g) {
                    c = "x-anchor-bottom"
                } else {
                    if (h[0] == g) {
                        c = "x-anchor-left"
                    } else {
                        c = "x-anchor-right"
                    }
                }
            }
            i = p.getAlignToXY(f, s, n);
            p.setXY(i);
            p.addCls(c)
        }
        return s
    },
    setCentered: function (b, d) {
        this.centered = b;
        if (this.rendered && d) {
            var a, c;
            if (!this.ownerCt) {
                a = (Ext.Element.getViewportWidth() / 2) - (this.getWidth() / 2);
                c = (Ext.Element.getViewportHeight() / 2) - (this.getHeight() / 2)
            } else {
                a = (this.ownerCt.getTargetEl().getWidth() / 2) - (this.getWidth() / 2);
                c = (this.ownerCt.getTargetEl().getHeight() / 2) - (this.getHeight() / 2)
            }
            this.setPosition(a, c)
        }
        return this
    },
    hide: function (a) {
        if (!this.hidden && this.fireEvent("beforehide", this) !== false) {
            this.hidden = true;
            if (this.rendered) {
                this.onHide(a, true)
            }
        }
        return this
    },
    onShow: function (a) {
        this.el.show();
        Ext.Component.superclass.onShow.call(this, a);
        if (a === undefined || a === true) {
            a = this.showAnimation
        }
        if (this.floating) {
            this.el.dom.parentNode || this.el.appendTo(document.body);
            if (a) {
                this.el.setStyle("opacity", 0.01)
            }
            if (this.centered) {
                this.setCentered(true, true)
            } else {
                this.setPosition(this.x, this.y)
            }
            if (this.modal) {
                this.el.parent().mask(null, "x-mask-gray")
            }
            if (this.hideOnMaskTap) {
                Ext.getDoc().on("touchstart", this.onFloatingTouchStart, this, {
                    capture: true,
                    subsequent: true
                })
            }
        }
        if (a) {
            Ext.Anim.run(this, a, {
                out: false,
                autoClear: true
            });
            this.showAnimation = a
        }
    },
    onFloatingTouchStart: function (a) {
        if (!this.el.contains(a.target)) {
            this.hide();
            if (this.stopMaskTapEvent || Ext.fly(a.target).hasCls("x-mask")) {
                a.stopEvent()
            }
        }
    },
    onHide: function (b, a) {
        if (b === undefined || b === true) {
            b = this.showAnimation
        }
        if (this.hideOnMaskTap && this.floating) {
            Ext.getDoc().un("touchstart", this.onFloatingTouchStart, this, {
                capture: true,
                subsequent: true
            })
        }
        if (b) {
            Ext.Anim.run(this, b, {
                out: true,
                reverse: true,
                autoClear: true,
                scope: this,
                fireHideEvent: a,
                after: this.doHide
            })
        } else {
            this.doHide(null, {
                fireHideEvent: a
            })
        }
    },
    doHide: function (c, a) {
        var b = this.el.parent();
        this.el.hide();
        if (b && this.floating && this.modal) {
            b.unmask()
        }
        if (a && a.fireHideEvent) {
            this.fireEvent("hide", this)
        }
    },
    setScrollable: function (a) {
        var b = this,
            c;
        if (!b.rendered) {
            b.scroll = a;
            return
        }
        Ext.destroy(b.scroller);
        b.scroller = null;
        if (b.originalGetTargetEl) {
            b.getTargetEl = b.originalGetTargetEl
        }
        if (a !== false) {
            c = Ext.isObject(a) ? a.direction : a;
            a = Ext.apply({}, Ext.isObject(a) ? a : {}, {
                direction: c
            });
            if (!b.scrollEl) {
                b.scrollEl = b.getTargetEl().createChild()
            }
            b.originalGetTargetEl = b.getTargetEl;
            b.getTargetEl = function () {
                return b.scrollEl
            };
            b.scroller = (new Ext.util.ScrollView(b.scrollEl, a)).scroller
        }
    },
    setFloating: function (b, a) {
        this.floating = !! b;
        this.hidden = true;
        if (this.rendered) {
            if (b !== false) {
                this.el.addCls(this.floatingCls);
                if (a) {
                    this.show()
                }
            } else {
                this.el.removeCls(this.floatingCls);
                Ext.getDoc().un("touchstart", this.onFloatingTouchStart, this)
            }
        } else {
            if (b !== false) {
                if (this.layoutOnOrientationChange !== false) {
                    this.layoutOnOrientationChange = true
                }
                this.autoRender = true
            }
        }
    },
    setDraggable: function (a, b) {
        this.isDraggable = a;
        if (this.rendered) {
            if (a === false) {
                if (this.dragObj) {
                    this.dragObj.disable()
                }
            } else {
                if (b) {
                    this.show()
                }
                if (this.dragObj) {
                    this.dragObj.enable()
                } else {
                    this.dragObj = new Ext.util.Draggable(this.el, Ext.apply({}, this.draggable || {}));
                    this.relayEvents(this.dragObj, ["dragstart", "beforedragend", "drag", "dragend"])
                }
            }
        }
    },
    setOrientation: function (b, a, c) {
        if (this.fireEvent("beforeorientationchange", this, b, a, c) !== false) {
            if (this.orientation != b) {
                this.el.removeCls("x-" + this.orientation);
                this.el.addCls("x-" + b)
            }
            this.orientation = b;
            this.layoutOrientation(b, a, c);
            if (this.fullscreen) {
                this.setSize(a, c)
            } else {
                if (this.layoutOnOrientationChange) {
                    this.doComponentLayout()
                }
            }
            if (this.floating && this.centered) {
                this.setCentered(true, true)
            }
            this.onOrientationChange(b, a, c);
            this.fireEvent("orientationchange", this, b, a, c)
        }
    },
    onOrientationChange: Ext.emptyFn,
    beforeDestroy: function () {
        if (this.floating && this.modal && !this.hidden) {
            this.el.parent().unmask()
        }
        Ext.destroy(this.scroller);
        Ext.Component.superclass.beforeDestroy.call(this)
    },
    onDestroy: function () {
        if (this.monitorOrientation && Ext.EventManager.orientationEvent) {
            Ext.EventManager.orientationEvent.removeListener(this.setOrientation, this)
        }
        Ext.Component.superclass.onDestroy.call(this)
    }
});
Ext.BoxComponent = Ext.Component;
Ext.reg("component", Ext.Component);
Ext.reg("box", Ext.BoxComponent);
Ext.lib.Container = Ext.extend(Ext.Component, {
    autoDestroy: true,
    defaultType: "panel",
    isContainer: true,
    baseCls: "x-container",
    bubbleEvents: ["add", "remove"],
    initComponent: function () {
        this.addEvents("afterlayout", "beforeadd", "beforeremove", "add", "remove", "beforecardswitch", "cardswitch");
        this.layoutOnShow = new Ext.util.MixedCollection();
        Ext.lib.Container.superclass.initComponent.call(this);
        this.initItems()
    },
    initItems: function () {
        var a = this.items;
        this.items = new Ext.util.MixedCollection(false, this.getComponentId);
        if (a) {
            if (!Ext.isArray(a)) {
                a = [a]
            }
            this.add(a)
        }
    },
    afterRender: function () {
        this.getLayout();
        Ext.lib.Container.superclass.afterRender.apply(this, arguments)
    },
    setLayout: function (b) {
        var a = this.layout;
        if (a && a.isLayout && a != b) {
            a.setOwner(null)
        }
        this.layout = b;
        b.setOwner(this)
    },
    getLayout: function () {
        if (!this.layout || !this.layout.isLayout) {
            this.setLayout(Ext.layout.LayoutManager.create(this.layout, "autocontainer"))
        }
        return this.layout
    },
    doLayout: function () {
        var a = this.getLayout();
        if (this.rendered && a) {
            a.layout()
        }
        return this
    },
    afterLayout: function (a) {
        this.fireEvent("afterlayout", this, a)
    },
    prepareItems: function (a, c) {
        if (!Ext.isArray(a)) {
            a = [a]
        }
        var e, b, d;
        for (b = 0, d = a.length; b < d; b++) {
            e = a[b];
            if (c) {
                e = this.applyDefaults(e)
            }
            a[b] = this.lookupComponent(e)
        }
        return a
    },
    applyDefaults: function (a) {
        var b = this.defaults;
        if (b) {
            if (Ext.isFunction(b)) {
                b = b.call(this, a)
            }
            if (Ext.isString(a)) {
                a = Ext.ComponentMgr.get(a);
                Ext.apply(a, b)
            } else {
                if (!a.isComponent) {
                    Ext.applyIf(a, b)
                } else {
                    Ext.apply(a, b)
                }
            }
        }
        return a
    },
    lookupComponent: function (a) {
        if (Ext.isString(a)) {
            return Ext.ComponentMgr.get(a)
        } else {
            return this.createComponent(a)
        }
        return a
    },
    createComponent: function (a, b) {
        if (a.isComponent) {
            return a
        }
        return Ext.create(a, b || this.defaultType)
    },
    getComponentId: function (a) {
        return a.getItemId()
    },
    add: function () {
        var f = Array.prototype.slice.call(arguments),
            d = -1;
        if (typeof f[0] == "number") {
            d = f.shift()
        }
        var a = f.length > 1;
        if (a || Ext.isArray(f[0])) {
            var g = a ? f : f[0],
                b = [],
                c, e, j;
            for (c = 0, e = g.length; c < e; c++) {
                j = g[c];
                if (!j) {
                    throw "Trying to add a null item as a child of Container with itemId/id: " + this.getItemId()
                }
                if (d != -1) {
                    j = this.add(d + c, j)
                } else {
                    j = this.add(j)
                }
                b.push(j)
            }
            return b
        }
        var h = this.prepareItems(f[0], true)[0];
        d = (d !== -1) ? d : this.items.length;
        if (this.fireEvent("beforeadd", this, h, d) !== false && this.onBeforeAdd(h) !== false) {
            this.items.insert(d, h);
            h.onAdded(this, d);
            this.onAdd(h, d);
            this.fireEvent("add", this, h, d)
        }
        return h
    },
    onAdd: Ext.emptyFn,
    onRemove: Ext.emptyFn,
    insert: function (b, a) {
        return this.add(b, a)
    },
    onBeforeAdd: function (a) {
        if (a.ownerCt) {
            a.ownerCt.remove(a, false)
        }
        if (this.hideBorders === true) {
            a.border = (a.border === true)
        }
    },
    remove: function (a, b) {
        var d = this.getComponent(a);
        if (!d) {
            console.warn("Attempted to remove a component that does not exist. Ext.Container: remove takes an argument of the component to remove. cmp.remove() is incorrect usage.")
        }
        if (d && this.fireEvent("beforeremove", this, d) !== false) {
            this.doRemove(d, b);
            this.fireEvent("remove", this, d)
        }
        return d
    },
    doRemove: function (c, b) {
        var d = this.layout,
            a = d && this.rendered;
        this.items.remove(c);
        c.onRemoved();
        if (a) {
            d.onRemove(c)
        }
        this.onRemove(c, b);
        if (b === true || (b !== false && this.autoDestroy)) {
            c.destroy()
        }
        if (a && !b) {
            d.afterRemove(c)
        }
    },
    removeAll: function (b) {
        var f, d = this.items.items.slice(),
            a = [],
            e = d.length,
            c;
        for (c = 0; c < e; c++) {
            f = d[c];
            this.remove(f, b);
            if (f.ownerCt !== this) {
                a.push(f)
            }
        }
        return a
    },
    getRefItems: function (a) {
        var b = this.items.items.slice(),
            e = b.length,
            c, d;
        if (a) {
            for (c = 0; c < e; c++) {
                d = b[c];
                if (d.getRefItems) {
                    b = b.concat(d.getRefItems(true))
                }
            }
        }
        return b
    },
    getComponent: function (a) {
        if (Ext.isObject(a)) {
            a = a.getItemId()
        }
        return this.items.get(a)
    },
    query: function (a) {
        return Ext.ComponentQuery.query(a, this)
    },
    child: function (a) {
        return this.query("> " + a)[0] || null
    },
    down: function (a) {
        return this.query(a)[0] || null
    },
    show: function () {
        Ext.lib.Container.superclass.show.apply(this, arguments);
        var e = this.layoutOnShow,
            d = e.getCount(),
            b = 0,
            a, c;
        for (; b < d; b++) {
            c = e.get(b);
            a = c.needsLayout;
            if (Ext.isObject(a)) {
                c.doComponentLayout(a.width, a.height, a.isSetSize)
            }
        }
        e.clear()
    },
    beforeDestroy: function () {
        var a = this.items,
            b;
        if (a) {
            while ((b = a.first())) {
                this.doRemove(b, true)
            }
        }
        Ext.destroy(this.layout);
        Ext.lib.Container.superclass.beforeDestroy.call(this)
    }
});
Ext.Container = Ext.extend(Ext.lib.Container, {});
Ext.reg("container", Ext.Container);
Ext.Container = Ext.extend(Ext.lib.Container, {
    cardSwitchAnimation: null,
    initComponent: function () {
        if (this.scroll) {
            this.fields = new Ext.util.MixedCollection();
            if (!Ext.is.Blackberry) {
                this.fields.on({
                    add: this.onFieldAdd,
                    remove: this.onFieldRemove,
                    scope: this
                })
            }
            this.on({
                add: this.onItemAdd,
                remove: this.onItemRemove,
                scope: this
            })
        }
        Ext.Container.superclass.initComponent.apply(this, arguments)
    },
    afterRender: function () {
        Ext.Container.superclass.afterRender.apply(this, arguments);
        if (this.scroller) {
            if ((Ext.is.Android) && this.containsFormFields) {
                this.scroller.setUseCssTransform(false)
            }
            this.scroller.on("scrollstart", this.onFieldScrollStart, this)
        }
    },
    onFieldScrollStart: function () {
        var a = this.focusedField;
        if (a && Ext.is.iOS) {
            a.blur()
        }
    },
    onItemAdd: function (b, a) {
        this.fields.addAll(Ext.ComponentQuery.query("[isField]", a))
    },
    onItemRemove: function (b, a) {
        this.fields.removeAll(Ext.ComponentQuery.query("[isField]", a))
    },
    onFieldAdd: function (a, b) {
        this.handleFieldEventListener(true, b)
    },
    onFieldRemove: function (a, b) {
        this.handleFieldEventListener(false, b)
    },
    handleFieldEventListener: function (b, a) {
        if (!this.fieldEventWrap) {
            this.fieldEventWrap = {}
        }
        if (["textfield", "passwordfield", "emailfield", "textareafield", "searchfield", "urlfield", "numberfield", "spinnerfield"].indexOf(a.xtype) !== -1) {
            if (b) {
                this.fieldEventWrap[a.id] = {
                    beforefocus: function (c) {
                        this.onFieldBeforeFocus(a, c)
                    },
                    focus: function (c) {
                        this.onFieldFocus(a, c)
                    },
                    blur: function (c) {
                        this.onFieldBlur(a, c)
                    },
                    keyup: function (c) {
                        this.onFieldKeyUp(a, c)
                    },
                    scope: this
                };
                this.containsFormFields = true
            }
            a[b ? "on" : "un"](this.fieldEventWrap[a.id]);
            if (!b) {
                delete this.fieldEventWrap[a.id]
            }
        }
    },
    onFieldKeyUp: function (b, a) {
        if (Ext.is.iOS || Ext.is.Desktop) {
            this.resetLastWindowScroll()
        }
    },
    onFieldBeforeFocus: function (b, a) {
        this.focusingField = b
    },
    getLastWindowScroll: function () {
        if (!this.lastWindowScroll) {
            this.resetLastWindowScroll()
        }
        return {
            x: this.lastWindowScroll.x,
            y: this.lastWindowScroll.y
        }
    },
    resetLastWindowScroll: function () {
        this.lastWindowScroll = {
            x: window.pageXOffset,
            y: window.pageYOffset
        }
    },
    adjustScroller: function (b) {
        var a = this.getClosestScroller(),
            c = this.getLastWindowScroll();
        a.setOffset(b);
        if (Ext.is.iOS) {
            window.scrollTo(c.x, c.y)
        }
        this.resetLastWindowScroll()
    },
    onFieldFocus: function (h, g) {
        if (!Ext.is.iOS && !Ext.is.Desktop) {
            var b = h.fieldEl.dom;
            if (b.scrollIntoViewIfNeeded) {
                b.scrollIntoViewIfNeeded(true)
            }
        } else {
            var f = this.getClosestScroller(),
                i = Ext.util.Region.from(f.containerBox),
                l = h.fieldEl.getPageBox(true);
            if (this.focusingField == h || !Ext.is.iOS) {
                if (Ext.is.iOS && window.pageYOffset == 0) {
                    window.scrollTo(0, 0)
                }
                var j = new Ext.util.Offset();
                if (l.left < i.left) {
                    j.x = i.left - l.left
                }
                if (l.top < i.top) {
                    j.y = i.top - l.top
                }
                if (!j.isZero()) {
                    var k = this.getLastWindowScroll();
                    f.scrollBy(j);
                    if (Ext.is.iOS) {
                        window.scrollTo(k.x, k.y)
                    }
                    this.resetLastWindowScroll()
                }
            } else {
                if (this.lastFocusedField) {
                    var a = l.top - this.lastFocusedField.fieldEl.getY(),
                        c = f.offset.y - a,
                        d = false;
                    if (!i.contains(l) && (c != 0 || (c == 0 && f.offset.y != 0))) {
                        d = true
                    }
                    if (c > 0) {
                        c = 0
                    }
                    if (d) {
                        this.adjustScroller(new Ext.util.Offset(f.offset.x, c))
                    }
                }
            }
            this.resetLastWindowScroll()
        }
        this.lastFocusedField = h;
        this.focusedField = h;
        this.focusingField = null
    },
    getClosestScroller: function () {
        if (!this.closestScroller) {
            this.closestScroller = this.scroller || this.el.getScrollParent()
        }
        return this.closestScroller
    },
    onFieldBlur: function (b, a) {
        if (this.focusingField == b) {
            this.focusingField = null
        }
        if (this.focusedField == b) {
            this.focusedField = null
        }
    },
    afterLayout: function (a) {
        if (this.floating && this.centered) {
            this.setCentered(true, true)
        }
        if (this.scroller) {
            this.scroller.updateBoundary()
        }
        Ext.Container.superclass.afterLayout.call(this, a)
    },
    getActiveItem: function () {
        if (this.layout && this.layout.type == "card") {
            return this.layout.activeItem
        } else {
            return null
        }
    },
    setActiveItem: function (a, b) {
        this.layout.setActiveItem(a, b);
        return this
    },
    onBeforeCardSwitch: function (a, c, b, d) {
        return this.fireEvent("beforecardswitch", this, a, c, b, d)
    },
    onCardSwitch: function (a, c, b, d) {
        return this.fireEvent("cardswitch", this, a, c, b, d)
    },
    disable: function () {
        Ext.Container.superclass.disable.call(this);
        this.el.mask(null, "x-mask-gray")
    },
    enable: function () {
        Ext.Container.superclass.enable.call(this);
        this.el.unmask()
    }
});
Ext.reg("container", Ext.Container);
Ext.lib.Panel = Ext.extend(Ext.Container, {
    baseCls: "x-panel",
    isPanel: true,
    componentLayout: "dock",
    renderTpl: ['<div class="{baseCls}-body<tpl if="bodyCls"> {bodyCls}</tpl>"<tpl if="bodyStyle"> style="{bodyStyle}"</tpl>></div>'],
    initComponent: function () {
        this.addEvents("bodyresize");
        Ext.applyIf(this.renderSelectors, {
            body: "." + this.baseCls + "-body"
        });
        Ext.lib.Panel.superclass.initComponent.call(this)
    },
    initItems: function () {
        Ext.lib.Panel.superclass.initItems.call(this);
        var a = this.dockedItems;
        this.dockedItems = new Ext.util.MixedCollection(false, this.getComponentId);
        if (a) {
            this.addDocked(a)
        }
    },
    getDockedComponent: function (a) {
        if (Ext.isObject(a)) {
            a = a.getItemId()
        }
        return this.dockedItems.get(a)
    },
    getComponent: function (a) {
        var b = Ext.lib.Panel.superclass.getComponent.call(this, a);
        if (b == undefined) {
            b = this.getDockedComponent(a)
        }
        return b
    },
    initBodyStyles: function () {
        var a = Ext.isString(this.bodyStyle) ? this.bodyStyle.split(";") : [],
            b = Ext.Element;
        if (this.bodyPadding != undefined) {
            a.push("padding: " + b.unitizeBox((this.bodyPadding === true) ? 5 : this.bodyPadding))
        }
        if (this.bodyMargin != undefined) {
            a.push("margin: " + b.unitizeBox((this.bodyMargin === true) ? 5 : this.bodyMargin))
        }
        if (this.bodyBorder != undefined) {
            a.push("border-width: " + b.unitizeBox((this.bodyBorder === true) ? 1 : this.bodyBorder))
        }
        delete this.bodyStyle;
        return a.length ? a.join(";") : undefined
    },
    initRenderData: function () {
        return Ext.applyIf(Ext.lib.Panel.superclass.initRenderData.call(this), {
            bodyStyle: this.initBodyStyles(),
            bodyCls: this.bodyCls
        })
    },
    addDocked: function (a, e) {
        a = this.prepareItems(a);
        var d, b, c;
        for (b = 0, c = a.length; b < c; b++) {
            d = a[b];
            d.dock = d.dock || "top";
            if (e !== undefined) {
                this.dockedItems.insert(e + b, d)
            } else {
                this.dockedItems.add(d)
            }
            d.onAdded(this, b);
            this.onDockedAdd(d)
        }
        if (this.rendered) {
            this.doComponentLayout()
        }
    },
    onDockedAdd: Ext.emptyFn,
    onDockedRemove: Ext.emptyFn,
    insertDocked: function (b, a) {
        this.addDocked(a, b)
    },
    removeDocked: function (d, b) {
        if (!this.dockedItems.contains(d)) {
            return d
        }
        var c = this.componentLayout,
            a = c && this.rendered;
        if (a) {
            c.onRemove(d)
        }
        this.dockedItems.remove(d);
        d.onRemoved();
        this.onDockedRemove(d);
        if (b === true || (b !== false && this.autoDestroy)) {
            d.destroy()
        }
        if (a && !b) {
            c.afterRemove(d)
        }
        this.doComponentLayout();
        return d
    },
    getDockedItems: function () {
        if (this.dockedItems && this.dockedItems.items.length) {
            return this.dockedItems.items.slice()
        }
        return []
    },
    getTargetEl: function () {
        return this.body
    },
    getRefItems: function (a) {
        var f = Ext.lib.Panel.superclass.getRefItems.call(this, a),
            c = this.getDockedItems(),
            e = c.length,
            b = 0,
            d;
        f = f.concat(c);
        if (a) {
            for (; b < e; b++) {
                d = c[b];
                if (d.getRefItems) {
                    f = f.concat(d.getRefItems(true))
                }
            }
        }
        return f
    },
    beforeDestroy: function () {
        var b = this.dockedItems,
            a;
        if (b) {
            while ((a = b.first())) {
                this.removeDocked(a, true)
            }
        }
        Ext.lib.Panel.superclass.beforeDestroy.call(this)
    }
});
Ext.Panel = Ext.extend(Ext.lib.Panel, {});
Ext.reg("panel", Ext.Panel);
Ext.Panel = Ext.extend(Ext.lib.Panel, {
    scroll: false
});
Ext.reg("panel", Ext.Panel);
Ext.Button = Ext.extend(Ext.Component, {
    initComponent: function () {
        this.addEvents("tap", "beforetap");
        Ext.Button.superclass.initComponent.call(this);
        this.createAutoHandler()
    },
    iconAlign: "left",
    baseCls: "x-button",
    pressedCls: "x-button-pressed",
    badgeText: "",
    badgeCls: "x-badge",
    hasBadgeCls: "x-hasbadge",
    labelCls: "x-button-label",
    ui: "normal",
    isButton: true,
    pressedDelay: 0,
    iconMaskCls: "x-icon-mask",
    iconMask: false,
    afterRender: function (c, a) {
        var e = this;
        Ext.Button.superclass.afterRender.call(e, c, a);
        var g = e.text,
            d = e.icon,
            b = e.iconCls,
            f = e.badgeText;
        e.text = e.icon = e.iconCls = e.badgeText = null;
        e.setText(g);
        e.setIcon(d);
        e.setIconClass(b);
        if (e.iconMask && e.iconEl) {
            e.iconEl.addCls(e.iconMaskCls)
        }
        e.setBadge(f)
    },
    initEvents: function () {
        var a = this;
        Ext.Button.superclass.initEvents.call(a);
        a.mon(a.el, {
            scope: a,
            tap: a.onPress,
            tapstart: a.onTapStart,
            tapcancel: a.onTapCancel
        })
    },
    onTapStart: function () {
        var a = this;
        if (!a.disabled) {
            if (a.pressedDelay) {
                a.pressedTimeout = setTimeout(function () {
                    a.el.addCls(a.pressedCls)
                }, Ext.isNumber(a.pressedDelay) ? a.pressedDelay : 100)
            } else {
                a.el.addCls(a.pressedCls)
            }
        }
    },
    onTapCancel: function () {
        var a = this;
        if (a.pressedTimeout) {
            clearTimeout(a.pressedTimeout);
            delete a.pressedTimeout
        }
        a.el.removeCls(a.pressedCls)
    },
    setHandler: function (b, a) {
        this.handler = b;
        this.scope = a;
        return this
    },
    setText: function (b) {
        var a = this;
        if (a.rendered) {
            if (!a.textEl && b) {
                a.textEl = a.el.createChild({
                    tag: "span",
                    html: b,
                    cls: this.labelCls
                })
            } else {
                if (a.textEl && b != a.text) {
                    if (b) {
                        a.textEl.setHTML(b)
                    } else {
                        a.textEl.remove();
                        a.textEl = null
                    }
                }
            }
        }
        a.text = b;
        return a
    },
    setIcon: function (a) {
        var b = this;
        if (b.rendered) {
            if (!b.iconEl && a) {
                b.iconEl = b.el.createChild({
                    tag: "img",
                    src: Ext.BLANK_IMAGE_URL,
                    style: "background-image: " + (a ? "url(" + a + ")" : "")
                });
                b.setIconAlign(b.iconAlign)
            } else {
                if (b.iconEl && a != b.icon) {
                    if (a) {
                        b.iconEl.setStyle("background-image", a ? "url(" + a + ")" : "");
                        b.setIconAlign(b.iconAlign)
                    } else {
                        b.setIconAlign(false);
                        b.iconEl.remove();
                        b.iconEl = null
                    }
                }
            }
        }
        b.icon = a;
        return b
    },
    setIconClass: function (a) {
        var b = this;
        if (b.rendered) {
            if (!b.iconEl && a) {
                b.iconEl = b.el.createChild({
                    tag: "img",
                    src: Ext.BLANK_IMAGE_URL,
                    cls: a
                });
                b.setIconAlign(b.iconAlign)
            } else {
                if (b.iconEl && a != b.iconCls) {
                    if (a) {
                        if (b.iconCls) {
                            b.iconEl.removeCls(b.iconCls)
                        }
                        b.iconEl.addCls(a);
                        b.setIconAlign(b.iconAlign)
                    } else {
                        b.setIconAlign(false);
                        b.iconEl.remove();
                        b.iconEl = null
                    }
                }
            }
        }
        b.iconCls = a;
        return b
    },
    setIconAlign: function (d) {
        var c = this,
            a = ["top", "right", "bottom", "left"],
            d = ((a.indexOf(d) == -1 || !d) && d !== false) ? c.iconAlign : d,
            b;
        if (c.rendered && c.iconEl) {
            c.el.removeCls("x-iconalign-" + c.iconAlign);
            if (d) {
                c.el.addCls("x-iconalign-" + d)
            }
        }
        c.iconAlign = (d === false) ? c.iconAlign : d;
        return c
    },
    setBadge: function (b) {
        var a = this;
        if (a.rendered) {
            if (!a.badgeEl && b) {
                a.badgeEl = a.el.createChild({
                    tag: "span",
                    cls: a.badgeCls,
                    html: b
                });
                a.el.addCls(a.hasBadgeCls)
            } else {
                if (a.badgeEl && b != a.badgeText) {
                    if (b) {
                        a.badgeEl.setHTML(b);
                        a.el.addCls(a.hasBadgeCls)
                    } else {
                        a.badgeEl.remove();
                        a.badgeEl = null;
                        a.el.removeCls(a.hasBadgeCls)
                    }
                }
            }
        }
        a.badgeText = b;
        return a
    },
    getText: function () {
        return this.text
    },
    getBadgeText: function () {
        return this.badgeText
    },
    onDisable: function () {
        this.onDisableChange(true)
    },
    onEnable: function () {
        this.onDisableChange(false)
    },
    onDisableChange: function (a) {
        var b = this;
        if (b.el) {
            b.el[a ? "addCls" : "removeCls"](b.disabledCls);
            b.el.dom.disabled = a
        }
        b.disabled = a
    },
    onPress: function (b) {
        var a = this;
        if (!a.disabled && this.fireEvent("beforetap") !== false) {
            setTimeout(function () {
                if (!a.preventCancel) {
                    a.onTapCancel()
                }
                a.callHandler(b);
                a.fireEvent("tap", a, b)
            }, 10)
        }
    },
    callHandler: function (b) {
        var a = this;
        if (a.handler) {
            a.handler.call(a.scope || a, a, b)
        }
    },
    createAutoHandler: function () {
        var a = this,
            b = a.autoEvent;
        if (b) {
            if (typeof b == "string") {
                b = {
                    name: b,
                    scope: a.scope || a
                }
            }
            a.addEvents(b.name);
            a.setHandler(function () {
                b.scope.fireEvent(b.name, b.scope, a)
            }, b.scope)
        }
    }
});
Ext.reg("button", Ext.Button);
Ext.SegmentedButton = Ext.extend(Ext.Container, {
    defaultType: "button",
    componentCls: "x-segmentedbutton",
    pressedCls: "x-button-pressed",
    allowMultiple: false,
    initComponent: function () {
        this.layout = Ext.apply({}, this.layout || {}, {
            type: "hbox",
            align: "stretch"
        });
        Ext.SegmentedButton.superclass.initComponent.call(this);
        if (this.allowDepress === undefined) {
            this.allowDepress = this.allowMultiple
        }
        this.addEvents("toggle")
    },
    initEvents: function () {
        Ext.SegmentedButton.superclass.initEvents.call(this);
        this.mon(this.el, {
            tap: this.onTap,
            capture: true,
            scope: this
        })
    },
    afterLayout: function (b) {
        var a = this;
        Ext.SegmentedButton.superclass.afterLayout.call(a, b);
        if (!a.initialized) {
            a.items.each(function (d, c) {
                a.setPressed(d, !! d.pressed, true)
            });
            if (a.allowMultiple) {
                a.pressedButtons = a.getPressedButtons()
            }
            a.initialized = true
        }
    },
    onTap: function (b, a) {
        if (!this.disabled && (a = b.getTarget(".x-button"))) {
            this.setPressed(a.id, this.allowDepress ? undefined : true)
        }
    },
    getPressed: function () {
        return this.allowMultiple ? this.getPressedButtons() : this.pressedButton
    },
    setPressed: function (a, d, b) {
        var c = this;
        a = c.getComponent(a);
        if (!a || !a.isButton || a.disabled) {
            if (!c.allowMultiple && c.pressedButton) {
                c.setPressed(c.pressedButton, false)
            }
            return
        }
        if (!Ext.isBoolean(d)) {
            d = !a.pressed
        }
        if (d) {
            if (!c.allowMultiple) {
                if (c.pressedButton && c.pressedButton !== a) {
                    c.pressedButton.el.removeCls(c.pressedCls);
                    c.pressedButton.pressed = false;
                    if (b !== true) {
                        c.fireEvent("toggle", c, c.pressedButton, false)
                    }
                }
                c.pressedButton = a
            }
            a.el.addCls(c.pressedCls);
            a.pressed = true;
            a.preventCancel = true;
            if (c.initialized && b !== true) {
                c.fireEvent("toggle", c, a, true)
            }
        } else {
            if (!d) {
                if (!c.allowMultiple && a === c.pressedButton) {
                    c.pressedButton = null
                }
                if (a.pressed) {
                    a.el.removeCls(c.pressedCls);
                    a.pressed = false;
                    if (b !== true) {
                        c.fireEvent("toggle", c, a, false)
                    }
                }
            }
        }
        if (c.allowMultiple && c.initialized) {
            c.pressedButtons = c.getPressedButtons()
        }
    },
    getPressedButtons: function (b) {
        var a = this.items.filterBy(function (c) {
            return c.isButton && !c.disabled && c.pressed
        });
        return a.items
    },
    disable: function () {
        this.items.each(function (a) {
            a.disable()
        });
        Ext.SegmentedButton.superclass.disable.apply(this, arguments)
    },
    enable: function () {
        this.items.each(function (a) {
            a.enable()
        }, this);
        Ext.SegmentedButton.superclass.enable.apply(this, arguments)
    }
});
Ext.reg("segmentedbutton", Ext.SegmentedButton);
Ext.AbstractStoreSelectionModel = Ext.extend(Ext.util.Observable, {
    allowDeselect: false,
    selected: null,
    constructor: function (a) {
        a = a || {};
        Ext.apply(this, a);
        this.modes = {
            SINGLE: true,
            SIMPLE: true,
            MULTI: true
        };
        this.setSelectionMode(a.mode);
        this.selected = new Ext.util.MixedCollection();
        Ext.AbstractStoreSelectionModel.superclass.constructor.call(this, a)
    },
    bind: function (a, b) {
        if (!b && this.store) {
            if (a !== this.store && this.store.autoDestroy) {
                this.store.destroy()
            } else {
                this.store.un("add", this.onStoreAdd, this);
                this.store.un("clear", this.onStoreClear, this);
                this.store.un("remove", this.onStoreRemove, this);
                this.store.un("update", this.onStoreUpdate, this)
            }
        }
        if (a) {
            a = Ext.StoreMgr.lookup(a);
            a.on({
                add: this.onStoreAdd,
                clear: this.onStoreClear,
                remove: this.onStoreRemove,
                update: this.onStoreUpdate,
                scope: this
            })
        }
        this.store = a;
        if (a && !b) {
            this.refresh()
        }
    },
    selectAll: function (a) {
        var c = this.store.getRange();
        for (var b = 0, d = c.length; b < d; b++) {
            this.doSelect(c[b], true, a)
        }
    },
    deselectAll: function () {
        var b = this.getSelection();
        for (var a = 0, c = b.length; a < c; a++) {
            this.doDeselect(b[a])
        }
    },
    selectWithEvent: function (a, b) {
        switch (this.selectionMode) {
        case "MULTI":
            if (b.ctrlKey && this.isSelected(a)) {
                this.doDeselect(a, false)
            } else {
                if (b.shiftKey && this.lastFocused) {
                    this.selectRange(this.lastFocused, a, b.ctrlKey)
                } else {
                    if (b.ctrlKey) {
                        this.doSelect(a, true, false)
                    } else {
                        if (this.isSelected(a) && !b.shiftKey && !b.ctrlKey && this.selected.getCount() > 1) {
                            this.doSelect(a, false, false)
                        } else {
                            this.doSelect(a, false)
                        }
                    }
                }
            }
            break;
        case "SIMPLE":
            if (this.isSelected(a)) {
                this.doDeselect(a)
            } else {
                this.doSelect(a, true)
            }
            break;
        case "SINGLE":
            if (this.allowDeselect && this.isSelected(a)) {
                this.doDeselect(a)
            } else {
                this.doSelect(a, false)
            }
            break
        }
    },
    selectRange: function (g, h, k, b) {
        var e, j = this.store.indexOf(g),
            d = this.store.indexOf(h),
            f, c = 0,
            a;
        if (this.isLocked()) {
            return
        }
        if (j > d) {
            f = d;
            d = j;
            j = f
        }
        for (e = j; e <= d; e++) {
            if (this.isSelected(this.store.getAt(e))) {
                c++
            }
        }
        if (!b) {
            a = -1
        } else {
            a = (b == "up") ? j : d
        }
        for (e = j; e <= d; e++) {
            if (c == (d - j + 1)) {
                if (e != a) {
                    this.doDeselect(e, true)
                }
            } else {
                this.doSelect(e, true)
            }
        }
    },
    select: function (b, c, a) {
        this.doSelect(b, c, a)
    },
    deselect: function (b, a) {
        this.doDeselect(b, a)
    },
    doSelect: function (c, d, b) {
        if (this.locked) {
            return
        }
        if (typeof c === "number") {
            c = [this.store.getAt(c)]
        }
        if (this.selectionMode == "SINGLE" && c) {
            var a = c.length ? c[0] : c;
            this.doSingleSelect(a, b)
        } else {
            this.doMultiSelect(c, d, b)
        }
    },
    doMultiSelect: function (c, g, b) {
        if (this.locked) {
            return
        }
        var e = this.selected,
            h = false,
            a;
        c = !Ext.isArray(c) ? [c] : c;
        if (!g && e.getCount() > 0) {
            h = true;
            this.doDeselect(this.getSelection(), true)
        }
        for (var d = 0, f = c.length; d < f; d++) {
            a = c[d];
            if (g && this.isSelected(a)) {
                continue
            }
            h = true;
            this.lastSelected = a;
            e.add(a);
            if (!b) {
                this.setLastFocused(a)
            }
            this.onSelectChange(a, true, b)
        }
        this.maybeFireSelectionChange(h && !b)
    },
    doDeselect: function (c, b) {
        if (this.locked) {
            return
        }
        if (typeof c === "number") {
            c = [this.store.getAt(c)]
        }
        var g = false,
            e = this.selected,
            a;
        c = !Ext.isArray(c) ? [c] : c;
        for (var d = 0, f = c.length; d < f; d++) {
            a = c[d];
            if (e.remove(a)) {
                if (this.lastSelected == a) {
                    this.lastSelected = e.last()
                }
                this.onSelectChange(a, false, b);
                g = true
            }
        }
        this.maybeFireSelectionChange(g && !b)
    },
    doSingleSelect: function (a, b) {
        if (this.locked) {
            return
        }
        if (this.isSelected(a)) {
            return
        }
        var c = this.selected;
        if (c.getCount() > 0) {
            this.doDeselect(this.lastSelected, b)
        }
        c.add(a);
        this.lastSelected = a;
        this.onSelectChange(a, true, b);
        this.setLastFocused(a);
        this.maybeFireSelectionChange(!b)
    },
    setLastFocused: function (b) {
        var a = this.lastFocused;
        this.lastFocused = b;
        this.onLastFocusChanged(a, b)
    },
    maybeFireSelectionChange: function (a) {
        if (a) {
            this.fireEvent("selectionchange", this, this.getSelection())
        }
    },
    getLastSelected: function () {
        return this.lastSelected
    },
    getLastFocused: function () {
        return this.lastFocused
    },
    getSelection: function () {
        return this.selected.getRange()
    },
    getSelectionMode: function () {
        return this.selectionMode
    },
    setSelectionMode: function (a) {
        a = a ? a.toUpperCase() : "SINGLE";
        this.selectionMode = this.modes[a] ? a : "SINGLE"
    },
    isLocked: function () {
        return this.locked
    },
    setLocked: function (a) {
        this.locked = !! a
    },
    isSelected: function (a) {
        a = Ext.isNumber(a) ? this.store.getAt(a) : a;
        return this.selected.indexOf(a) !== -1
    },
    hasSelection: function () {
        return this.selected.getCount() > 0
    },
    refresh: function () {
        var a = [],
            e = this.getSelection(),
            d = e.length,
            c, f, b = 0;
        for (; b < d; b++) {
            c = e[b];
            if (this.store.indexOf(c) != -1) {
                a.push(c)
            }
        }
        if (this.selected.getCount() != a.length) {
            f = true
        }
        this.clearSelections();
        if (a.length) {
            this.doSelect(a, false, true)
        }
        this.maybeFireSelectionChange(f)
    },
    clearSelections: function () {
        this.selected.clear();
        this.lastSelected = null;
        this.setLastFocused(null)
    },
    onStoreAdd: function () {},
    onStoreClear: function () {
        var a = this.selected;
        if (a.getCount > 0) {
            a.clear();
            this.lastSelected = null;
            this.setLastFocused(null);
            this.maybeFireSelectionChange(true)
        }
    },
    onStoreRemove: function (b, a) {
        if (this.locked) {
            return
        }
        var c = this.selected;
        if (c.remove(a)) {
            if (this.lastSelected == a) {
                this.lastSelected = null
            }
            if (this.getLastFocused() == a) {
                this.setLastFocused(null)
            }
            this.maybeFireSelectionChange(true)
        }
    },
    getCount: function () {
        return this.selected.getCount()
    },
    destroy: function () {},
    onStoreUpdate: function () {},
    onSelectChange: function (a, c, b) {},
    onLastFocusChanged: function (b, a) {},
    onEditorKey: function (b, a) {},
    bindComponent: function (a) {}
});
Ext.DataViewSelectionModel = Ext.extend(Ext.AbstractStoreSelectionModel, {
    deselectOnContainerClick: true,
    bindComponent: function (a) {
        this.view = a;
        this.bind(a.getStore());
        var b = {
            refresh: this.refresh,
            scope: this,
            el: {
                scope: this
            }
        };
        b.el[a.triggerEvent] = this.onItemClick;
        b.el[a.triggerCtEvent] = this.onContainerClick;
        a.on(b)
    },
    onItemClick: function (c) {
        var a = this.view,
            b = a.findTargetByEvent(c);
        if (b) {
            this.selectWithEvent(a.getRecord(b), c)
        } else {
            return false
        }
    },
    onContainerClick: function () {
        if (this.deselectOnContainerClick) {
            this.deselectAll()
        }
    },
    onSelectChange: function (b, d, c) {
        var a = this.view;
        if (d) {
            a.onItemSelect(b);
            if (!c) {
                this.fireEvent("select", this, b)
            }
        } else {
            a.onItemDeselect(b);
            if (!c) {
                this.fireEvent("deselect", this, b)
            }
        }
    }
});
Ext.DataView = Ext.extend(Ext.Component, {
    loadingText: "Loading...",
    selectedItemCls: "x-item-selected",
    emptyText: "",
    deferEmptyText: true,
    trackOver: false,
    blockRefresh: false,
    last: false,
    triggerEvent: "click",
    triggerCtEvent: "containerclick",
    addCmpEvents: function () {},
    initComponent: function () {
        var a = Ext.isDefined;
        if (!a(this.tpl) || !a(this.store) || !a(this.itemSelector)) {
            throw "DataView requires tpl, store and itemSelector configurations to be defined."
        }
        Ext.DataView.superclass.initComponent.call(this);
        if (Ext.isString(this.tpl) || Ext.isArray(this.tpl)) {
            this.tpl = new Ext.XTemplate(this.tpl)
        }
        if (Ext.isDefined(this.overCls) || Ext.isDefined(this.overClass)) {
            this.overItemCls = this.overCls || this.overClass;
            delete this.overCls;
            delete this.overClass;
            throw "Using the deprecated overCls or overClass configuration. Use overItemCls."
        }
        if (Ext.isDefined(this.selectedCls) || Ext.isDefined(this.selectedClass)) {
            this.selectedItemCls = this.selectedCls || this.selectedClass;
            delete this.selectedCls;
            delete this.selectedClass;
            throw "Using the deprecated selectedCls or selectedClass configuration. Use selectedItemCls."
        }
        this.addEvents("beforerefresh", "refresh");
        this.addCmpEvents();
        this.store = Ext.StoreMgr.lookup(this.store);
        this.all = new Ext.CompositeElementLite();
        this.getSelectionModel().bindComponent(this)
    },
    onRender: function () {
        Ext.DataView.superclass.onRender.apply(this, arguments);
        if (this.loadingText) {
            this.loadMask = new Ext.LoadMask(this.el, {
                msg: this.loadingText
            })
        }
    },
    getSelectionModel: function () {
        if (!this.selModel) {
            this.selModel = {}
        }
        var a;
        switch (true) {
        case this.simpleSelect:
            a = "SIMPLE";
            break;
        case this.multiSelect:
            a = "MULTI";
            break;
        case this.singleSelect:
        default:
            a = "SINGLE";
            break
        }
        Ext.applyIf(this.selModel, {
            allowDeselect: this.allowDeselect,
            mode: a
        });
        if (!this.selModel.events) {
            this.selModel = new Ext.DataViewSelectionModel(this.selModel)
        }
        if (!this.selModel.hasRelaySetup) {
            this.relayEvents(this.selModel, ["selectionchange", "select", "deselect"]);
            this.selModel.hasRelaySetup = true
        }
        if (this.disableSelection) {
            this.selModel.locked = true
        }
        return this.selModel
    },
    refresh: function () {
        if (!this.rendered) {
            return
        }
        this.fireEvent("beforerefresh", this);
        var b = this.getTargetEl(),
            a = this.store.getRange();
        b.update("");
        if (a.length < 1) {
            if (!this.deferEmptyText || this.hasSkippedEmptyText) {
                b.update(this.emptyText)
            }
            this.all.clear()
        } else {
            this.tpl.overwrite(b, this.collectData(a, 0));
            this.all.fill(Ext.query(this.itemSelector, b.dom));
            this.updateIndexes(0)
        }
        this.hasSkippedEmptyText = true;
        this.fireEvent("refresh", this)
    },
    prepareData: function (c, b, a) {
        if (a) {
            Ext.apply(c, this.prepareAssociatedData(a))
        }
        return c
    },
    prepareAssociatedData: function (m, b) {
        b = b || [];
        var g = m.associations.items,
            k = g.length,
            d = {},
            e, a, f, o, p, c, n, l, h;
        for (l = 0; l < k; l++) {
            c = g[l];
            e = m[c.storeName];
            d[c.name] = [];
            if (e && e.data.length > 0) {
                f = e.data.items;
                p = f.length;
                for (h = 0; h < p; h++) {
                    o = f[h];
                    n = o.internalId;
                    if (b.indexOf(n) == -1) {
                        b.push(n);
                        d[c.name][h] = o.data;
                        Ext.apply(d[c.name][h], this.prepareAssociatedData(o, b))
                    }
                }
            }
        }
        return d
    },
    collectData: function (b, e) {
        var d = [],
            c = 0,
            a = b.length;
        for (; c < a; c++) {
            d[d.length] = this.prepareData(b[c].data, e + c, b[c])
        }
        return d
    },
    bufferRender: function (a, b) {
        var c = document.createElement("div");
        this.tpl.overwrite(c, this.collectData(a, b));
        return Ext.query(this.itemSelector, c)
    },
    onUpdate: function (e, a) {
        var b = this.store.indexOf(a),
            c, d;
        if (b > -1) {
            c = this.all.elements[b];
            d = this.bufferRender([a], b)[0];
            this.all.replaceElement(b, d, true);
            this.updateIndexes(b, b);
            this.selModel.refresh()
        }
    },
    onAdd: function (f, d, e) {
        if (this.all.getCount() === 0) {
            this.refresh();
            return
        }
        var c = this.bufferRender(d, e),
            g, b = this.all.elements;
        if (e < this.all.getCount()) {
            g = this.all.item(e).insertSibling(c, "before", true);
            b.splice.apply(b, [e, 0].concat(c))
        } else {
            g = this.all.last().insertSibling(c, "after", true);
            b.push.apply(b, c)
        }
        this.updateIndexes(e)
    },
    onRemove: function (c, a, b) {
        this.all.removeElement(b, true);
        this.updateIndexes(b);
        if (this.store.getCount() === 0) {
            this.refresh()
        }
    },
    refreshNode: function (a) {
        this.onUpdate(this.store, this.store.getAt(a))
    },
    updateIndexes: function (d, c) {
        var b = this.all.elements;
        d = d || 0;
        c = c || ((c === 0) ? 0 : (b.length - 1));
        for (var a = d; a <= c; a++) {
            b[a].viewIndex = a
        }
    },
    getStore: function () {
        return this.store
    },
    bindStore: function (a, b) {
        if (!b && this.store) {
            if (a !== this.store && this.store.autoDestroy) {
                this.store.destroy()
            } else {
                this.mun(this.store, {
                    scope: this,
                    beforeload: this.onBeforeLoad,
                    datachanged: this.onDataChanged,
                    add: this.onAdd,
                    remove: this.onRemove,
                    update: this.onUpdate,
                    clear: this.refresh
                })
            }
            if (!a) {
                if (this.loadMask) {
                    this.loadMask.bindStore(null)
                }
                this.store = null
            }
        }
        if (a) {
            a = Ext.StoreMgr.lookup(a);
            this.mon(a, {
                scope: this,
                beforeload: this.onBeforeLoad,
                datachanged: this.onDataChanged,
                add: this.onAdd,
                remove: this.onRemove,
                update: this.onUpdate,
                clear: this.refresh
            });
            if (this.loadMask) {
                this.loadMask.bindStore(a)
            }
        }
        this.store = a;
        this.getSelectionModel().bind(a);
        if (a) {
            this.refresh()
        }
    },
    onDataChanged: function () {
        if (this.blockRefresh !== true) {
            this.refresh.apply(this, arguments)
        }
    },
    findItemByChild: function (a) {
        return Ext.fly(a).findParent(this.itemSelector, this.getTargetEl())
    },
    findTargetByEvent: function (a) {
        return a.getTarget(this.itemSelector, this.getTargetEl())
    },
    getSelectedNodes: function () {
        var b = [],
            a = this.selModel.getSelection(),
            d = a.length,
            c = 0;
        for (; c < d; c++) {
            b.push(this.getNode(a[c]))
        }
        return b
    },
    getRecords: function (c) {
        var b = [],
            d = 0,
            a = c.length;
        for (; d < a; d++) {
            b[b.length] = this.store.getAt(c[d].viewIndex)
        }
        return r
    },
    getRecord: function (a) {
        return this.store.getAt(a.viewIndex)
    },
    isSelected: function (b) {
        var a = this.getRecord(b);
        return this.selModel.isSelected(a)
    },
    select: function (b, c, a) {
        this.selModel.select(b, c, a)
    },
    deselect: function (b, a) {
        this.selModel.deselect(b, a)
    },
    getNode: function (b) {
        if (Ext.isString(b)) {
            return document.getElementById(b)
        } else {
            if (Ext.isNumber(b)) {
                return this.all.elements[b]
            } else {
                if (b instanceof Ext.data.Model) {
                    var a = this.store.indexOf(b);
                    return this.all.elements[a]
                }
            }
        }
        return b
    },
    getNodes: function (e, a) {
        var d = this.all.elements,
            b = [],
            c;
        e = e || 0;
        a = !Ext.isDefined(a) ? Math.max(d.length - 1, 0) : a;
        if (e <= a) {
            for (c = e; c <= a && d[c]; c++) {
                b.push(d[c])
            }
        } else {
            for (c = e; c >= a && d[c]; c--) {
                b.push(d[c])
            }
        }
        return b
    },
    indexOf: function (a) {
        a = this.getNode(a);
        if (Ext.isNumber(a.viewIndex)) {
            return a.viewIndex
        }
        return this.all.indexOf(a)
    },
    onBeforeLoad: function () {
        if (this.loadingText) {
            this.getTargetEl().update("");
            this.all.clear()
        }
    },
    onDestroy: function () {
        this.all.clear();
        Ext.DataView.superclass.onDestroy.call(this);
        this.bindStore(null);
        this.selModel.destroy()
    },
    onItemSelect: function (a) {
        var b = this.getNode(a);
        Ext.fly(b).addCls(this.selectedItemCls)
    },
    onItemDeselect: function (a) {
        var b = this.getNode(a);
        Ext.fly(b).removeCls(this.selectedItemCls)
    },
    select: function (a, b, d) {
        console.warn("DataView: select will be removed, please access select through a DataView's SelectionModel, ie: view.getSelectionModel().select()");
        var c = this.getSelectionModel();
        return c.select.apply(c, arguments)
    },
    clearSelections: function () {
        console.warn("DataView: clearSelections will be removed, please access deselectAll through DataView's SelectionModel, ie: view.getSelectionModel().deselectAll()");
        var a = this.getSelectionModel();
        return a.deselectAll()
    }
});
Ext.reg("dataview", Ext.DataView);
Ext.DataView.override({
    getSelectionCount: function () {
        return this.selModel.getSelection().length
    },
    getSelectedRecords: function () {
        return this.selModel.getSelection()
    }
});
Ext.DataView.override({
    scroll: "vertical",
    pressedCls: "x-item-pressed",
    pressedDelay: 100,
    allowDeselect: true,
    triggerEvent: "singletap",
    triggerCtEvent: "containertap",
    addCmpEvents: function () {
        this.addEvents("itemtap", "itemdoubletap", "itemswipe", "containertap", "selectionchange", "beforeselect")
    },
    afterRender: function () {
        var a = this;
        Ext.DataView.superclass.afterRender.call(a);
        var b = {
            tapstart: a.onTapStart,
            tapcancel: a.onTapCancel,
            touchend: a.onTapCancel,
            doubletap: a.onDoubleTap,
            swipe: a.onSwipe,
            scope: a
        };
        b[this.triggerEvent] = a.onTap;
        a.mon(a.getTargetEl(), b);
        if (this.store) {
            this.bindStore(this.store, true)
        }
    },
    onTap: function (c) {
        var b = this.findTargetByEvent(c);
        if (b) {
            Ext.fly(b).removeCls(this.pressedCls);
            var a = this.indexOf(b);
            if (this.onItemTap(b, a, c) !== false) {
                this.fireEvent("itemtap", this, a, b, c)
            }
        } else {
            if (this.fireEvent("containertap", this, c) !== false) {
                this.onContainerTap(c)
            }
        }
    },
    onTapStart: function (d, a) {
        var c = this,
            b = this.findTargetByEvent(d);
        if (b) {
            if (c.pressedDelay) {
                if (c.pressedTimeout) {
                    clearTimeout(c.pressedTimeout)
                }
                c.pressedTimeout = setTimeout(function () {
                    Ext.fly(b).addCls(c.pressedCls)
                }, Ext.isNumber(c.pressedDelay) ? c.pressedDelay : 100)
            } else {
                Ext.fly(b).addCls(c.pressedCls)
            }
        }
    },
    onTapCancel: function (d, a) {
        var c = this,
            b = this.findTargetByEvent(d);
        if (c.pressedTimeout) {
            clearTimeout(c.pressedTimeout);
            delete c.pressedTimeout
        }
        if (b) {
            Ext.fly(b).removeCls(c.pressedCls)
        }
    },
    onContainerTap: function (a) {},
    onDoubleTap: function (b) {
        var a = this.findTargetByEvent(b);
        if (a) {
            this.fireEvent("itemdoubletap", this, this.indexOf(a), a, b)
        }
    },
    onSwipe: function (b) {
        var a = this.findTargetByEvent(b);
        if (a) {
            this.fireEvent("itemswipe", this, this.indexOf(a), a, b)
        }
    },
    onItemTap: function (b, a, c) {
        if (this.pressedTimeout) {
            clearTimeout(this.pressedTimeout);
            delete this.pressedTimeout
        }
        return true
    }
});
Ext.List = Ext.extend(Ext.DataView, {
    componentCls: "x-list",
    pinHeaders: Ext.is.iOS || Ext.is.Desktop,
    indexBar: false,
    grouped: false,
    clearSelectionOnDeactivate: true,
    renderTpl: ['<tpl if="grouped"><h3 class="x-list-header x-list-header-swap x-hidden-display"></h3></tpl>'],
    groupTpl: ['<tpl for=".">', '<div class="x-list-group x-group-{id}">', '<h3 class="x-list-header">{group}</h3>', '<div class="x-list-group-items">', "{items}", "</div>", "</div>", "</tpl>"],
    itemSelector: ".x-list-item",
    itemCls: "",
    onItemDisclosure: false,
    preventSelectionOnDisclose: true,
    initComponent: function () {
        var a = {};
        if (Ext.isArray(this.itemTpl)) {
            this.itemTpl = this.itemTpl.join("")
        } else {
            if (this.itemTpl && this.itemTpl.html) {
                Ext.apply(a, this.itemTpl.initialConfig);
                this.itemTpl = this.itemTpl.html
            }
        }
        if (!Ext.isDefined(this.itemTpl)) {
            throw new Error("Ext.List: itemTpl is a required configuration.")
        }
        if (this.itemTpl && this.itemTpl.indexOf('"x-list-item"') !== -1) {
            throw new Error("Ext.List: Using a CSS class of x-list-item within your own tpl will break Ext.Lists. Remove the x-list-item from the tpl/itemTpl")
        }
        this.tpl = '<tpl for="."><div class="x-list-item ' + this.itemCls + '"><div class="x-list-item-body">' + this.itemTpl + "</div>";
        if (this.onItemDisclosure) {
            this.tpl += '<div class="x-list-disclosure"></div>'
        }
        this.tpl += "</div></tpl>";
        this.tpl = new Ext.XTemplate(this.tpl, a);
        if (this.grouped) {
            this.listItemTpl = this.tpl;
            if (Ext.isString(this.listItemTpl) || Ext.isArray(this.listItemTpl)) {
                this.listItemTpl = new Ext.XTemplate(this.listItemTpl, a)
            }
            if (Ext.isString(this.groupTpl) || Ext.isArray(this.groupTpl)) {
                this.tpl = new Ext.XTemplate(this.groupTpl)
            }
        } else {
            this.indexBar = false
        }
        if (this.scroll !== false) {
            this.scroll = {
                direction: "vertical",
                useIndicators: !this.indexBar
            }
        }
        Ext.List.superclass.initComponent.call(this);
        if (this.onItemDisclosure) {
            if (Ext.isFunction(this.onItemDisclosure)) {
                this.onItemDisclosure = {
                    scope: this,
                    handler: this.onItemDisclosure
                }
            }
        }
        this.on("deactivate", this.onDeactivate, this);
        this.addEvents("disclose", "update")
    },
    onRender: function () {
        if (this.grouped) {
            Ext.applyIf(this.renderData, {
                grouped: true
            });
            if (this.scroll) {
                Ext.applyIf(this.renderSelectors, {
                    header: ".x-list-header-swap"
                })
            }
        }
        Ext.List.superclass.onRender.apply(this, arguments)
    },
    onDeactivate: function () {
        if (this.clearSelectionOnDeactivate) {
            this.getSelectionModel().deselectAll()
        }
    },
    afterRender: function () {
        if (!this.grouped) {
            this.el.addCls("x-list-flat")
        }
        this.getTargetEl().addCls("x-list-parent");
        if (this.indexBar) {
            this.indexBar = new Ext.IndexBar(Ext.apply({}, Ext.isObject(this.indexBar) ? this.indexBar : {}, {
                xtype: "indexbar",
                alphabet: true,
                renderTo: this.el
            }));
            this.addCls("x-list-indexed")
        }
        Ext.List.superclass.afterRender.call(this);
        if (this.onItemDisclosure) {
            this.mon(this.getTargetEl(), "singletap", this.handleItemDisclosure, this, {
                delegate: ".x-list-disclosure"
            })
        }
    },
    initEvents: function () {
        Ext.List.superclass.initEvents.call(this);
        if (this.grouped) {
            if (this.pinHeaders && this.scroll) {
                this.mon(this.scroller, {
                    scrollstart: this.onScrollStart,
                    scroll: this.onScroll,
                    scope: this
                })
            }
            if (this.indexBar) {
                this.mon(this.indexBar, {
                    index: this.onIndex,
                    scope: this
                })
            }
        }
    },
    handleItemDisclosure: function (f, c) {
        var d = this.findItemByChild(c),
            a, b;
        if (d) {
            a = this.getRecord(d);
            b = this.indexOf(d);
            if (this.preventSelectionOnDisclose) {
                f.stopEvent()
            }
            this.fireEvent("disclose", a, d, b, f);
            if (Ext.isObject(this.onItemDisclosure) && this.onItemDisclosure.handler) {
                this.onItemDisclosure.handler.call(this, a, d, b)
            }
        }
    },
    setActiveGroup: function (b) {
        var a = this;
        if (b) {
            if (!a.activeGroup || a.activeGroup.header != b.header) {
                a.header.setHTML(b.header.getHTML());
                a.header.show()
            }
        } else {
            a.header.hide()
        }
        this.activeGroup = b
    },
    getClosestGroups: function (g) {
        if (!this.groupOffsets) {
            this.updateOffsets()
        }
        var a = this.groupOffsets,
            d = a.length,
            f, b, e, c;
        for (b = 0; b < d; b++) {
            f = a[b];
            if (f.offset > g.y) {
                c = f;
                break
            }
            e = f
        }
        return {
            current: e,
            next: c
        }
    },
    updateIndexes: function () {
        Ext.List.superclass.updateIndexes.apply(this, arguments);
        this.updateList()
    },
    afterComponentLayout: function () {
        Ext.List.superclass.afterComponentLayout.apply(this, arguments);
        this.updateList()
    },
    updateList: function () {
        this.fireEvent("update", this);
        this.updateOffsets()
    },
    updateOffsets: function () {
        if (this.grouped) {
            this.groupOffsets = [];
            var c = this.getTargetEl().query("h3.x-list-header"),
                b = c.length,
                d, a;
            for (a = 0; a < b; a++) {
                d = Ext.get(c[a]);
                d.setVisibilityMode(Ext.Element.VISIBILITY);
                this.groupOffsets.push({
                    header: d,
                    offset: d.dom.offsetTop
                })
            }
        }
    },
    onScrollStart: function () {
        var a = this.scroller.getOffset();
        this.closest = this.getClosestGroups(a);
        this.setActiveGroup(this.closest.current)
    },
    onScroll: function (a, d, c) {
        if (!this.closest) {
            this.closest = this.getClosestGroups(d)
        }
        if (!this.headerHeight) {
            this.headerHeight = this.header.getHeight()
        }
        if (d.y <= 0) {
            if (this.activeGroup) {
                this.setActiveGroup(false);
                this.closest.next = this.closest.current
            }
            return
        } else {
            if ((this.closest.next && d.y > this.closest.next.offset) || (d.y < this.closest.current.offset)) {
                this.closest = this.getClosestGroups(d);
                this.setActiveGroup(this.closest.current)
            }
        }
        if (this.closest.next && d.y > 0 && this.closest.next.offset - d.y <= this.headerHeight) {
            var b = this.headerHeight - (this.closest.next.offset - d.y);
            Ext.Element.cssTranslate(this.header, {
                x: 0,
                y: -b
            });
            this.transformed = true
        } else {
            if (this.transformed) {
                this.header.setStyle("-webkit-transform", null);
                this.transformed = false
            }
        }
    },
    onIndex: function (e, g, f) {
        var k = e.get("key").toLowerCase(),
            c = this.store.getGroups(),
            h = c.length,
            j, d, b, a;
        for (d = 0; d < h; d++) {
            j = c[d];
            a = this.getGroupId(j);
            if (a == k || a > k) {
                b = a;
                break
            } else {
                b = a
            }
        }
        b = this.getTargetEl().down(".x-group-" + a);
        if (b) {
            this.scroller.scrollTo({
                x: 0,
                y: b.getOffsetsTo(this.scrollEl)[1]
            }, false, null, true)
        }
    },
    getGroupId: function (a) {
        return a.name.toLowerCase()
    },
    collectData: function (e, l) {
        if (!this.grouped) {
            return Ext.List.superclass.collectData.call(this, e, l)
        }
        var g = [],
            d = this.store.getGroups(),
            h = d.length,
            b, a, j, k, f;
        for (f = 0, h = d.length; f < h; f++) {
            k = d[f];
            b = k.children;
            for (j = 0, a = b.length; j < a; j++) {
                b[j] = b[j].data
            }
            g.push({
                group: k.name,
                id: this.getGroupId(k),
                items: this.listItemTpl.apply(b)
            })
        }
        return g
    },
    onUpdate: function (b, a) {
        if (this.grouped) {
            this.refresh()
        } else {
            Ext.List.superclass.onUpdate.apply(this, arguments)
        }
    },
    onAdd: function (c, a, b) {
        if (this.grouped) {
            this.refresh()
        } else {
            Ext.List.superclass.onAdd.apply(this, arguments)
        }
    },
    onRemove: function (c, a, b) {
        if (this.grouped) {
            this.refresh()
        } else {
            Ext.List.superclass.onRemove.apply(this, arguments)
        }
    }
});
Ext.reg("list", Ext.List);
Ext.IndexBar = Ext.extend(Ext.DataView, {
    componentCls: "x-indexbar",
    direction: "vertical",
    tpl: '<tpl for="."><div class="x-indexbar-item">{value}</div></tpl>',
    itemSelector: "div.x-indexbar-item",
    letters: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
    listPrefix: "",
    componentLayout: "autocomponent",
    scroll: false,
    initComponent: function () {
        this.componentLayout = this.getComponentLayout();
        if (!this.store) {
            this.store = new Ext.data.Store({
                model: "IndexBarModel"
            })
        }
        if (this.alphabet == true) {
            this.ui = this.ui || "alphabet"
        }
        if (this.direction == "horizontal") {
            this.horizontal = true
        } else {
            this.vertical = true
        }
        this.addEvents("index");
        Ext.apply(this.renderData, {
            componentCls: this.componentCls
        });
        Ext.apply(this.renderSelectors, {
            body: "." + this.componentCls + "-body"
        });
        Ext.IndexBar.superclass.initComponent.call(this)
    },
    renderTpl: ['<div class="{componentCls}-body"></div>'],
    getTargetEl: function () {
        return this.body
    },
    afterRender: function () {
        Ext.IndexBar.superclass.afterRender.call(this);
        if (this.alphabet === true) {
            this.loadAlphabet()
        }
        if (this.vertical) {
            this.el.addCls(this.componentCls + "-vertical")
        } else {
            if (this.horizontal) {
                this.el.addCls(this.componentCls + "-horizontal")
            }
        }
    },
    loadAlphabet: function () {
        var e = this.letters,
            a = e.length,
            d = [],
            b, c;
        for (b = 0; b < a; b++) {
            c = e[b];
            d.push({
                key: c.toLowerCase(),
                value: c
            })
        }
        this.store.loadData(d)
    },
    refresh: function () {
        var b = this.getTargetEl(),
            a = this.store.getRange();
        b.update("");
        if (a.length < 1) {
            if (!this.deferEmptyText || this.hasSkippedEmptyText) {
                b.update(this.emptyText)
            }
            this.all.clear()
        } else {
            this.tpl.overwrite(b, this.collectData(a, 0));
            this.all.fill(Ext.query(this.itemSelector, b.dom));
            this.updateIndexes(0)
        }
        this.hasSkippedEmptyText = true;
        this.fireEvent("refresh")
    },
    collectData: function () {
        var a = Ext.IndexBar.superclass.collectData.apply(this, arguments);
        if (this.listPrefix.length > 0) {
            a.unshift({
                key: "",
                value: this.listPrefix
            })
        }
        return a
    },
    initEvents: function () {
        Ext.IndexBar.superclass.initEvents.call(this);
        this.mon(this.el, {
            touchstart: this.onTouchStart,
            touchend: this.onTouchEnd,
            touchmove: this.onTouchMove,
            scope: this
        })
    },
    onTouchStart: function (b, a) {
        b.stopEvent();
        this.el.addCls(this.componentCls + "-pressed");
        this.pageBox = this.el.getPageBox();
        this.onTouchMove(b)
    },
    onTouchEnd: function (b, a) {
        b.stopEvent();
        this.el.removeCls(this.componentCls + "-pressed")
    },
    onTouchMove: function (d) {
        d.stopPropagation();
        var a = Ext.util.Point.fromEvent(d),
            c, b, f = this.pageBox;
        if (!f) {
            f = this.pageBox = this.el.getPageBox()
        }
        if (this.vertical) {
            if (a.y > f.bottom || a.y < f.top) {
                return
            }
            c = Ext.Element.fromPoint(f.left + (f.width / 2), a.y)
        } else {
            if (this.horizontal) {
                if (a.x > f.right || a.x < f.left) {
                    return
                }
                c = Ext.Element.fromPoint(a.x, f.top + (f.height / 2))
            }
        }
        if (c) {
            b = this.getRecord(c.dom);
            if (b) {
                this.fireEvent("index", b, c, this.indexOf(c))
            }
        }
    },
    isVertical: function () {
        return this.vertical
    },
    isHorizontal: function () {
        return this.horizontal
    }
});
Ext.reg("indexbar", Ext.IndexBar);
Ext.regModel("IndexBarModel", {
    fields: ["key", "value"]
});
Ext.Toolbar = Ext.extend(Ext.Container, {
    isToolbar: true,
    defaultType: "button",
    baseCls: "x-toolbar",
    titleCls: "x-toolbar-title",
    ui: "dark",
    layout: null,
    titleEl: null,
    initComponent: function () {
        this.layout = Ext.apply({}, this.layout || {}, {
            type: "hbox",
            align: "center"
        });
        Ext.Toolbar.superclass.initComponent.call(this)
    },
    afterRender: function () {
        Ext.Toolbar.superclass.afterRender.call(this);
        if (this.title) {
            this.titleEl = this.el.createChild({
                cls: this.titleCls,
                html: this.title
            })
        }
    },
    setTitle: function (a) {
        this.title = a;
        if (this.rendered) {
            if (!this.titleEl) {
                this.titleEl = this.el.createChild({
                    cls: this.titleCls,
                    html: this.title
                })
            }
            this.titleEl.setHTML(a)
        }
    },
    showTitle: function () {
        if (this.titleEl) {
            this.titleEl.show()
        }
    },
    hideTitle: function () {
        if (this.titleEl) {
            this.titleEl.hide()
        }
    }
});
Ext.reg("toolbar", Ext.Toolbar);
Ext.Spacer = Ext.extend(Ext.Component, {
    initComponent: function () {
        if (!this.width) {
            this.flex = 1
        }
        Ext.Spacer.superclass.initComponent.call(this)
    },
    onRender: function () {
        Ext.Spacer.superclass.onRender.apply(this, arguments);
        if (this.flex) {
            this.el.setStyle("-webkit-box-flex", this.flex)
        }
    }
});
Ext.reg("spacer", Ext.Spacer);
Ext.Sheet = Ext.extend(Ext.Panel, {
    baseCls: "x-sheet",
    centered: false,
    floating: true,
    modal: true,
    draggable: false,
    monitorOrientation: true,
    hidden: true,
    hideOnMaskTap: false,
    enter: "bottom",
    exit: "bottom",
    enterAnimation: "slide",
    exitAnimation: "slide",
    transitions: {
        bottom: "up",
        top: "down",
        right: "left",
        left: "right"
    },
    animSheet: function (a) {
        var d = null,
            b = this,
            c = b.transitions,
            e = Ext.Anim.prototype.opposites || {};
        if (a && this[a]) {
            if (a == "enter") {
                d = (typeof b.enterAnimation == "string") ? {
                    type: b.enterAnimation || "slide",
                    direction: c[b.enter] || "up"
                } : b.enterAnimation
            } else {
                if (a == "exit") {
                    d = (typeof b.exitAnimation == "string") ? {
                        type: b.exitAnimation || "slide",
                        direction: c[b.exit] || "down"
                    } : b.exitAnimation
                }
            }
        }
        return d
    },
    orient: function (a, j, d) {
        if (!this.container || this.centered || !this.floating) {
            return this
        }
        var g = this,
            e = g.initialConfig || {},
            k = {
                width: e.width,
                height: e.height
            },
            i = {
                x: e.x,
                y: e.y
            },
            c = g.el.getPageBox(),
            f, b = 0;
        if (g.container.dom == document.body) {
            f = {
                width: window.innerWidth,
                height: window.innerHeight
            };
            b = document.body.scrollTop
        } else {
            f = g.container.getPageBox()
        }
        f.centerY = f.height / 2;
        f.centerX = f.width / 2;
        if (i.x != undefined || i.y != undefined) {
            i.x = i.x || 0;
            i.y = i.y || 0
        } else {
            if (/^(bottom|top)/i.test(g.enter)) {
                k.width = g.stretchX ? f.width : Math.min(200, Math.max(k.width || c.width || f.width, f.width));
                k.height = Math.min(k.height || 0, f.height) || undefined;
                k = g.setSize(k).getSize();
                i.x = f.centerX - k.width / 2;
                i.y = g.enter == "top" ? 0 : f.height - k.height + b
            } else {
                if (/^(left|right)/i.test(g.enter)) {
                    k.height = g.stretchY ? f.height : Math.min(200, Math.max(k.height || c.height || f.height, f.height));
                    k.width = Math.min(k.width || 0, f.width) || undefined;
                    k = g.setSize(k).getSize();
                    i.y = 0;
                    i.x = g.enter == "left" ? 0 : f.width - k.width
                }
            }
        }
        g.setPosition(i);
        return this
    },
    afterRender: function () {
        Ext.Sheet.superclass.afterRender.apply(this, arguments);
        this.el.setVisibilityMode(Ext.Element.OFFSETS)
    },
    onShow: function (a) {
        this.orient();
        return Ext.Sheet.superclass.onShow.call(this, a || this.animSheet("enter"))
    },
    onOrientationChange: function (b, a, c) {
        this.orient();
        Ext.Sheet.superclass.onOrientationChange.apply(this, arguments)
    },
    beforeDestroy: function () {
        delete this.showAnimation;
        this.hide(false);
        Ext.Sheet.superclass.beforeDestroy.call(this)
    }
});
Ext.reg("sheet", Ext.Sheet);
Ext.ActionSheet = Ext.extend(Ext.Sheet, {
    componentCls: "x-sheet-action",
    stretchY: true,
    stretchX: true,
    defaultType: "button",
    constructor: function (a) {
        a = a || {};
        Ext.ActionSheet.superclass.constructor.call(this, Ext.applyIf({
            floating: true
        }, a))
    }
});
Ext.reg("actionsheet", Ext.ActionSheet);
Ext.TabBar = Ext.extend(Ext.Panel, {
    componentCls: "x-tabbar",
    activeTab: null,
    defaultType: "tab",
    sortable: false,
    sortHoldThreshold: 350,
    initComponent: function () {
        this.addEvents("change");
        this.layout = Ext.apply({}, this.layout || {}, {
            type: "hbox",
            align: "middle"
        });
        Ext.TabBar.superclass.initComponent.call(this)
    },
    initEvents: function () {
        if (this.sortable) {
            this.sortable = new Ext.util.Sortable(this.el, {
                itemSelector: ".x-tab",
                direction: "horizontal",
                delay: this.sortHoldThreshold,
                constrain: true
            });
            this.mon(this.sortable, "sortchange", this.onSortChange, this)
        }
        this.mon(this.el, {
            touchstart: this.onTouchStart,
            scope: this
        });
        Ext.TabBar.superclass.initEvents.call(this)
    },
    onTouchStart: function (b, a) {
        a = b.getTarget(".x-tab");
        if (a) {
            this.onTabTap(Ext.getCmp(a.id))
        }
    },
    onSortChange: function (c, b, a) {},
    onTabTap: function (a) {
        if (!a.disabled) {
            if (this.cardLayout) {
                if (this.cardSwitchAnimation) {
                    var b = {
                        reverse: (this.items.indexOf(a) < this.items.indexOf(this.activeTab)) ? true : false
                    };
                    if (Ext.isObject(this.cardSwitchAnimation)) {
                        Ext.apply(b, this.cardSwitchAnimation)
                    } else {
                        Ext.apply(b, {
                            type: this.cardSwitchAnimation
                        })
                    }
                }
                this.cardLayout.setActiveItem(a.card, b || this.cardSwitchAnimation)
            }
            this.activeTab = a;
            this.fireEvent("change", this, a, a.card)
        }
    },
    getCardLayout: function () {
        return this.cardLayout
    }
});
Ext.reg("tabbar", Ext.TabBar);
Ext.Tab = Ext.extend(Ext.Button, {
    isTab: true,
    baseCls: "x-tab",
    pressedCls: "x-tab-pressed",
    activeCls: "x-tab-active",
    active: false,
    initComponent: function () {
        this.addEvents("activate", "deactivate");
        Ext.Tab.superclass.initComponent.call(this);
        var a = this.card;
        if (a) {
            this.card = null;
            this.setCard(a)
        }
    },
    setCard: function (a) {
        if (this.card) {
            this.mun(this.card, {
                activate: this.activate,
                deactivate: this.deactivate,
                scope: this
            })
        }
        this.card = a;
        if (a) {
            Ext.apply(this, a.tab || {});
            this.setText(this.title || a.title || this.text);
            this.setIconClass(this.iconCls || a.iconCls);
            this.setBadge(this.badgeText || a.badgeText);
            this.mon(a, {
                beforeactivate: this.activate,
                beforedeactivate: this.deactivate,
                scope: this
            })
        }
    },
    onRender: function () {
        Ext.Tab.superclass.onRender.apply(this, arguments);
        if (this.active) {
            this.el.addCls(this.activeCls)
        }
    },
    getCard: function () {
        return this.card
    },
    activate: function () {
        this.active = true;
        if (this.el) {
            this.el.addCls(this.activeCls)
        }
        this.fireEvent("activate", this)
    },
    deactivate: function () {
        this.active = false;
        if (this.el) {
            this.el.removeCls(this.activeCls)
        }
        this.fireEvent("deactivate", this)
    }
});
Ext.reg("tab", Ext.Tab);
Ext.TabPanel = Ext.extend(Ext.Panel, {
    cardSwitchAnimation: "slide",
    tabBarDock: "top",
    componentCls: "x-tabpanel",
    ui: "dark",
    initComponent: function () {
        var a = new Ext.layout.CardLayout(this.layout || {});
        this.layout = null;
        this.setLayout(a);
        this.tabBar = new Ext.TabBar(Ext.apply({}, this.tabBar || {}, {
            cardLayout: a,
            cardSwitchAnimation: this.cardSwitchAnimation,
            dock: this.tabBarDock,
            ui: this.ui,
            sortable: this.sortable
        }));
        if (this.dockedItems && !Ext.isArray(this.dockedItems)) {
            this.dockedItems = [this.dockedItems]
        } else {
            if (!this.dockedItems) {
                this.dockedItems = []
            }
        }
        this.dockedItems.push(this.tabBar);
        Ext.TabPanel.superclass.initComponent.call(this)
    },
    getTabBar: function () {
        return this.tabBar
    },
    onAdd: function (c, b) {
        var a = this.tabBar;
        c.tab = a.insert(b, {
            xtype: "tab",
            card: c
        });
        a.doLayout()
    },
    onRemove: function (b, a) {
        if (!this.destroying) {
            this.tabBar.remove(b.tab, a);
            this.tabBar.doLayout()
        }
    }
});
Ext.reg("tabpanel", Ext.TabPanel);
Ext.Carousel = Ext.extend(Ext.Panel, {
    baseCls: "x-carousel",
    indicator: true,
    ui: "dark",
    direction: "horizontal",
    horizontal: false,
    vertical: false,
    initComponent: function () {
        this.layout = {
            type: "card",
            sizeAllCards: true,
            hideInactive: false,
            itemCls: "x-carousel-item",
            targetCls: "x-carousel-body",
            setOwner: function (b) {
                Ext.layout.CardLayout.superclass.setOwner.call(this, b)
            }
        };
        if (this.indicator) {
            var a = Ext.isObject(this.indicator) ? this.indicator : {};
            this.indicator = new Ext.Carousel.Indicator(Ext.apply({}, a, {
                direction: this.direction,
                carousel: this,
                ui: this.ui
            }))
        }
        if (this.direction == "horizontal") {
            this.horizontal = true
        } else {
            this.vertical = true
        }
        Ext.Carousel.superclass.initComponent.call(this)
    },
    afterRender: function () {
        Ext.Carousel.superclass.afterRender.call(this);
        this.mon(this.body, {
            drag: this.onDrag,
            dragThreshold: 5,
            dragend: this.onDragEnd,
            direction: this.direction,
            scope: this
        });
        this.el.addCls(this.baseCls + "-" + this.direction)
    },
    onAdd: function () {
        Ext.Carousel.superclass.onAdd.apply(this, arguments);
        var a = this.indicator;
        if (a) {
            a.onCardAdd()
        }
    },
    onRemove: function () {
        Ext.Carousel.superclass.onRemove.apply(this, arguments);
        var a = this.indicator;
        if (a) {
            a.onCardRemove()
        }
    },
    afterLayout: function () {
        Ext.Carousel.superclass.afterLayout.apply(this, arguments);
        this.currentSize = this.body.getSize();
        this.currentScroll = {
            x: 0,
            y: 0
        };
        this.updateCardPositions();
        var a = this.layout.getActiveItem();
        if (a && this.indicator) {
            this.indicator.onBeforeCardSwitch(this, a, null, this.items.indexOf(a))
        }
    },
    onDrag: function (b) {
        this.currentScroll = {
            x: b.deltaX,
            y: b.deltaY
        };
        var a = this.items.items.indexOf(this.layout.activeItem);
        if (this.horizontal) {
            if ((a == 0 && b.deltaX > 0) || (a == this.items.length - 1 && b.deltaX < 0)) {
                this.currentScroll.x = b.deltaX / 2
            }
        } else {
            if (this.vertical) {
                if ((a == 0 && b.deltaY > 0) || (a == this.items.length - 1 && b.deltaY < 0)) {
                    this.currentScroll.y = b.deltaY / 2
                }
            }
        }
        this.updateCardPositions()
    },
    updateCardPositions: function (a) {
        var g = this.items.items,
            f = g.length,
            h, c, b, e, d;
        for (c = 0; c < f; c++) {
            b = g[c];
            if (this.isCardInRange(b)) {
                if (b.hidden) {
                    b.show()
                }
                e = b.el;
                d = e.dom.style;
                if (a) {
                    if (b === this.layout.activeItem) {
                        e.on("webkitTransitionEnd", this.onTransitionEnd, this, {
                            single: true
                        })
                    }
                    d.webkitTransitionDuration = "300ms"
                } else {
                    d.webkitTransitionDuration = "0ms"
                }
                h = this.getCardOffset(b);
                if (this.horizontal) {
                    Ext.Element.cssTransform(e, {
                        translate: [h, 0]
                    })
                } else {
                    Ext.Element.cssTransform(e, {
                        translate: [0, h]
                    })
                }
            } else {
                if (!b.hidden) {
                    b.hide()
                }
            }
        }
    },
    getCardOffset: function (c) {
        var d = this.getCardIndexOffset(c),
            b = this.currentSize,
            a = this.currentScroll;
        return this.horizontal ? (d * b.width) + a.x : (d * b.height) + a.y
    },
    getCardIndexOffset: function (a) {
        return this.items.items.indexOf(a) - this.getActiveIndex()
    },
    isCardInRange: function (a) {
        return Math.abs(this.getCardIndexOffset(a)) <= 2
    },
    getActiveIndex: function () {
        return this.items.indexOf(this.layout.activeItem)
    },
    onDragEnd: function (d, b) {
        var a, c;
        if (this.horizontal) {
            c = d.deltaX;
            a = d.previousDeltaX
        } else {
            c = d.deltaY;
            a = d.previousDeltaY
        }
        if (c < 0 && Math.abs(c) > 3 && a <= 0 && this.layout.getNext()) {
            this.next()
        } else {
            if (c > 0 && Math.abs(c) > 3 && a >= 0 && this.layout.getPrev()) {
                this.prev()
            } else {
                this.scrollToCard(this.layout.activeItem)
            }
        }
    },
    onBeforeCardSwitch: function (a) {
        if (!this.customDrag && this.items.indexOf(a) != -1) {
            var b = a.el.dom.style;
            b.webkitTransitionDuration = null;
            b.webkitTransform = null
        }
        return Ext.Carousel.superclass.onBeforeCardSwitch.apply(this, arguments)
    },
    scrollToCard: function (a) {
        this.currentScroll = {
            x: 0,
            y: 0
        };
        this.oldCard = this.layout.activeItem;
        if (a != this.oldCard && this.isCardInRange(a) && this.onBeforeCardSwitch(a, this.oldCard, this.items.indexOf(a), true) !== false) {
            this.layout.activeItem = a;
            if (this.horizontal) {
                this.currentScroll.x = -this.getCardOffset(a)
            } else {
                this.currentScroll.y = -this.getCardOffset(a)
            }
        }
        this.updateCardPositions(true)
    },
    onTransitionEnd: function (b, a) {
        this.customDrag = false;
        this.currentScroll = {
            x: 0,
            y: 0
        };
        if (this.oldCard && this.layout.activeItem != this.oldCard) {
            this.onCardSwitch(this.layout.activeItem, this.oldCard, this.items.indexOf(this.layout.activeItem), true)
        }
        delete this.oldCard
    },
    onCardSwitch: function (a, c, b, d) {
        this.currentScroll = {
            x: 0,
            y: 0
        };
        this.updateCardPositions();
        Ext.Carousel.superclass.onCardSwitch.apply(this, arguments);
        a.fireEvent("activate", a)
    },
    next: function () {
        var a = this.layout.getNext();
        if (a) {
            this.customDrag = true;
            this.scrollToCard(a)
        }
        return this
    },
    prev: function () {
        var a = this.layout.getPrev();
        if (a) {
            this.customDrag = true;
            this.scrollToCard(a)
        }
        return this
    },
    isVertical: function () {
        return this.vertical
    },
    isHorizontal: function () {
        return this.horizontal
    },
    beforeDestroy: function () {
        Ext.destroy(this.indicator);
        Ext.Carousel.superclass.beforeDestroy.call(this)
    }
});
Ext.reg("carousel", Ext.Carousel);
Ext.Carousel.Indicator = Ext.extend(Ext.Component, {
    baseCls: "x-carousel-indicator",
    initComponent: function () {
        if (this.carousel.rendered) {
            this.render(this.carousel.body);
            this.onBeforeCardSwitch(null, null, this.carousel.items.indexOf(this.carousel.layout.getActiveItem()))
        } else {
            this.carousel.on("render", function () {
                this.render(this.carousel.body)
            }, this, {
                single: true
            })
        }
        Ext.Carousel.Indicator.superclass.initComponent.call(this)
    },
    onRender: function () {
        Ext.Carousel.Indicator.superclass.onRender.apply(this, arguments);
        for (var a = 0, b = this.carousel.items.length; a < b; a++) {
            this.createIndicator()
        }
        this.mon(this.carousel, {
            beforecardswitch: this.onBeforeCardSwitch,
            scope: this
        });
        this.mon(this.el, {
            tap: this.onTap,
            scope: this
        });
        this.el.addCls(this.baseCls + "-" + this.direction)
    },
    onTap: function (g, a) {
        var b = this.el.getPageBox(),
            f = b.left + (b.width / 2),
            c = b.top + (b.height / 2),
            d = this.carousel;
        if ((d.isHorizontal() && g.pageX > f) || (d.isVertical() && g.pageY > c)) {
            this.carousel.next()
        } else {
            this.carousel.prev()
        }
    },
    createIndicator: function () {
        this.indicators = this.indicators || [];
        this.indicators.push(this.el.createChild({
            tag: "span"
        }))
    },
    onBeforeCardSwitch: function (d, c, a, b) {
        if (Ext.isNumber(b) && b != -1 && this.indicators[b]) {
            this.indicators[b].radioCls("x-carousel-indicator-active")
        }
    },
    onCardAdd: function () {
        if (this.rendered) {
            this.createIndicator()
        }
    },
    onCardRemove: function () {
        if (this.rendered) {
            this.indicators.pop().remove()
        }
    }
});
Ext.reg("carouselindicator", Ext.Carousel.Indicator);
Ext.Map = Ext.extend(Ext.Component, {
    baseCls: "x-map",
    useCurrentLocation: false,
    monitorResize: true,
    map: null,
    geo: null,
    maskMap: false,
    maskMapCls: "x-mask-map",
    initComponent: function () {
        this.mapOptions = this.mapOptions || {};
        this.scroll = false;
        if (!(window.google || {}).maps) {
            this.html = "Google Maps API is required"
        } else {
            if (this.useCurrentLocation) {
                this.geo = this.geo || new Ext.util.GeoLocation({
                    autoLoad: false
                });
                this.geo.on({
                    locationupdate: this.onGeoUpdate,
                    locationerror: this.onGeoError,
                    scope: this
                })
            }
        }
        Ext.Map.superclass.initComponent.call(this);
        this.addEvents("maprender", "centerchange", "typechange", "zoomchange");
        if (this.geo) {
            this.on({
                activate: this.onUpdate,
                scope: this,
                single: true
            });
            this.geo.updateLocation()
        }
    },
    onRender: function (b, a) {
        Ext.Map.superclass.onRender.apply(this, arguments);
        this.el.setVisibilityMode(Ext.Element.OFFSETS)
    },
    afterRender: function () {
        Ext.Map.superclass.afterRender.apply(this, arguments);
        this.renderMap()
    },
    onResize: function (a, b) {
        Ext.Map.superclass.onResize.apply(this, arguments);
        if (this.map) {
            google.maps.event.trigger(this.map, "resize")
        }
    },
    afterComponentLayout: function () {
        if (this.maskMap && !this.mask) {
            this.el.mask(null, this.maskMapCls);
            this.mask = true
        }
    },
    renderMap: function () {
        var b = this,
            c = (window.google || {}).maps;
        if (c) {
            if (Ext.is.iPad) {
                Ext.applyIf(b.mapOptions, {
                    navigationControlOptions: {
                        style: c.NavigationControlStyle.ZOOM_PAN
                    }
                })
            }
            Ext.applyIf(b.mapOptions, {
                center: new c.LatLng(37.381592, -122.135672),
                zoom: 12,
                mapTypeId: c.MapTypeId.ROADMAP
            });
            if (b.maskMap && !b.mask) {
                b.el.mask(null, this.maskMapCls);
                b.mask = true
            }
            if (b.el && b.el.dom && b.el.dom.firstChild) {
                Ext.fly(b.el.dom.firstChild).remove()
            }
            if (b.map) {
                c.event.clearInstanceListeners(b.map)
            }
            b.map = new c.Map(b.el.dom, b.mapOptions);
            var a = c.event;
            a.addListener(b.map, "zoom_changed", Ext.createDelegate(b.onZoom, b));
            a.addListener(b.map, "maptypeid_changed", Ext.createDelegate(b.onTypeChange, b));
            a.addListener(b.map, "center_changed", Ext.createDelegate(b.onCenterChange, b));
            b.fireEvent("maprender", b, b.map)
        }
    },
    onGeoUpdate: function (b) {
        var a;
        if (b) {
            a = this.mapOptions.center = new google.maps.LatLng(b.latitude, b.longitude)
        }
        if (this.rendered) {
            this.update(a)
        } else {
            this.on("activate", this.onUpdate, this, {
                single: true,
                data: a
            })
        }
    },
    onGeoError: function (a) {},
    onUpdate: function (c, b, a) {
        this.update((a || {}).data)
    },
    update: function (c) {
        var a = this,
            b = (window.google || {}).maps;
        if (b) {
            c = c || a.coords || new b.LatLng(37.381592, -122.135672);
            if (c && !(c instanceof b.LatLng) && "longitude" in c) {
                c = new b.LatLng(c.latitude, c.longitude)
            }
            if (!a.hidden && a.rendered) {
                a.map || a.renderMap();
                if (a.map && c instanceof b.LatLng) {
                    a.map.panTo(c)
                }
            } else {
                a.on("activate", a.onUpdate, a, {
                    single: true,
                    data: c
                })
            }
        }
    },
    onZoom: function () {
        this.mapOptions.zoom = (this.map && this.map.getZoom ? this.map.getZoom() : this.mapOptions.zoom) || 10;
        this.fireEvent("zoomchange", this, this.map, this.mapOptions.zoom)
    },
    onTypeChange: function () {
        this.mapOptions.mapTypeId = this.map && this.map.getMapTypeId ? this.map.getMapTypeId() : this.mapOptions.mapTypeId;
        this.fireEvent("typechange", this, this.map, this.mapOptions.mapTypeId)
    },
    onCenterChange: function () {
        this.mapOptions.center = this.map && this.map.getCenter ? this.map.getCenter() : this.mapOptions.center;
        this.fireEvent("centerchange", this, this.map, this.mapOptions.center)
    },
    getState: function () {
        return this.mapOptions
    },
    onDestroy: function () {
        Ext.destroy(this.geo);
        if (this.maskMap && this.mask) {
            this.el.unmask()
        }
        if (this.map && (window.google || {}).maps) {
            google.maps.event.clearInstanceListeners(this.map)
        }
        Ext.Map.superclass.onDestroy.call(this)
    }
});
Ext.reg("map", Ext.Map);
Ext.NestedList = Ext.extend(Ext.Panel, {
    componentCls: "x-nested-list",
    layout: "card",
    cardSwitchAnimation: "slide",
    backButton: null,
    backText: "Back",
    useTitleAsBackText: true,
    updateTitleText: true,
    displayField: "text",
    loadingText: "Loading...",
    emptyText: "No items available.",
    onItemDisclosure: false,
    clearSelectionDelay: 200,
    allowDeselect: false,
    getItemTextTpl: function (a) {
        return "{" + this.displayField + "}"
    },
    getTitleTextTpl: function (a) {
        return "{" + this.displayField + "}"
    },
    renderTitleText: function (b) {
        if (!b.titleTpl) {
            b.titleTpl = new Ext.XTemplate(this.getTitleTextTpl(b))
        }
        var a = b.getRecord();
        if (a) {
            return b.titleTpl.applyTemplate(a.data)
        } else {
            if (b.isRoot) {
                return this.title || this.backText
            } else {
                throw new Error("No RecordNode passed into renderTitleText")
            }
        }
    },
    useToolbar: true,
    getDetailCard: function (b, a) {
        return false
    },
    initComponent: function () {
        var b = Ext.StoreMgr.lookup(this.store),
            a = b.getRootNode(),
            c = a.getRecord() ? this.renderTitleText(a) : this.title || "";
        this.store = b;
        if (this.useToolbar) {
            this.backButton = new Ext.Button({
                text: this.backText,
                ui: "back",
                handler: this.onBackTap,
                scope: this,
                hidden: true
            });
            if (!this.toolbar || !this.toolbar.isComponent) {
                this.toolbar = Ext.apply({}, this.toolbar || {}, {
                    dock: "top",
                    xtype: "toolbar",
                    ui: "light",
                    title: c,
                    items: []
                });
                this.toolbar.items.unshift(this.backButton);
                this.toolbar = new Ext.Toolbar(this.toolbar);
                this.dockedItems = this.dockedItems || [];
                this.dockedItems.push(this.toolbar)
            } else {
                this.toolbar.insert(0, this.backButton)
            }
        }
        this.items = [this.getSubList(a)];
        Ext.NestedList.superclass.initComponent.call(this);
        this.on("itemtap", this.onItemTap, this);
        this.addEvents("listchange", "leafitemtap")
    },
    getListConfig: function (b) {
        var c = b.internalId,
            a = this.emptyText;
        return {
            itemId: c,
            xtype: "list",
            autoDestroy: true,
            recordNode: b,
            store: this.store.getSubStore(b),
            loadingText: this.loadingText,
            onItemDisclosure: this.onItemDisclosure,
            displayField: this.displayField,
            singleSelect: true,
            clearSelectionOnDeactivate: false,
            bubbleEvents: ["itemtap", "containertap", "beforeselect", "itemdoubletap", "selectionchange"],
            itemTpl: '<span<tpl if="leaf == true"> class="x-list-item-leaf"</tpl>>' + this.getItemTextTpl(b) + "</span>",
            deferEmptyText: true,
            allowDeselect: this.allowDeselect,
            refresh: function () {
                if (this.hasSkippedEmptyText) {
                    this.emptyText = a
                }
                Ext.List.prototype.refresh.apply(this, arguments)
            }
        }
    },
    getSubList: function (b) {
        var a = this.items,
            c, d = b.internalId;
        if (a && a.get) {
            c = a.get(d)
        }
        if (c) {
            return c
        } else {
            return this.getListConfig(b)
        }
    },
    addNextCard: function (b, e) {
        var c, a = b ? b.parentNode : null,
            d;
        if (b.leaf) {
            d = this.getDetailCard(b, a);
            if (d) {
                c = this.add(d)
            }
        } else {
            c = this.getSubList(b);
            c = this.add(c)
        }
        return c
    },
    setActivePath: function (o) {
        var n = o.substr(0, 1) === "/",
            h = 0,
            e = this.store,
            p = e.tree,
            f, g, c, m, b;
        if (n) {
            o = o.substr(1)
        }
        m = Ext.toArray(o.split("/"));
        b = m.length;
        if (n) {
            var l = this.items,
                a = this.items.items,
                k = l.length;
            for (; k > 1; k--) {
                this.remove(a[k - 1], true)
            }
            var d = a[0].recordNode;
            if (d.id !== m[0]) {
                throw new Error("rootNode doesn't match!")
            }
            h = 1
        }
        for (; h < b; h++) {
            if (m[h] !== "") {
                f = p.getNodeById(m[h]);
                g = this.addNextCard(f);
                if (g) {
                    c = g
                }
            }
        }
        if (!c) {
            throw new Error("Card was not found when trying to add to NestedList.")
        }
        this.setActiveItem(c, false);
        this.fireEvent("listchange", this, c);
        this.syncToolbar()
    },
    syncToolbar: function (e) {
        var g = e || this.getActiveItem(),
            h = this.items.indexOf(g),
            b = g.recordNode,
            a = b ? b.parentNode : null,
            d = this.backButton,
            c = this.useTitleAsBackText && a ? this.renderTitleText(a) : this.backText,
            f = (h !== 0) ? "show" : "hide";
        if (d) {
            d[f]();
            if (a) {
                d.setText(c)
            }
        }
        if (this.toolbar && this.updateTitleText) {
            this.toolbar.setTitle(b && b.getRecord() ? this.renderTitleText(b) : this.title || "");
            this.toolbar.doLayout()
        }
    },
    onItemTap: function (l, d, a, i) {
        var k = l.getStore(),
            f = k.getAt(d),
            m = f.node,
            g = m ? m.parentNode : null,
            h = this.displayField,
            c, b, j;
        j = this.addNextCard(m);
        if (m.leaf) {
            this.fireEvent("leafitemtap", l, d, a, i, j)
        }
        if (j) {
            b = this.items.indexOf(j);
            this.setActiveItem(j, {
                type: this.cardSwitchAnimation
            });
            this.syncToolbar(j)
        }
    },
    onBackTap: function () {
        var g = this.getActiveItem(),
            h = this.items.indexOf(g);
        if (h != 0) {
            var a = h - 1,
                c = this.items.getAt(a),
                j = c.recordNode,
                d = j.getRecord(),
                e = j ? j.parentNode : null,
                f = this.backButton,
                b = (a !== 0) ? "show" : "hide",
                i;
            this.on("cardswitch", function (k, m) {
                var l = c.getSelectionModel();
                this.remove(g);
                if (this.clearSelectionDelay) {
                    Ext.defer(l.deselectAll, this.clearSelectionDelay, l)
                }
            }, this, {
                single: true
            });
            this.setActiveItem(c, {
                type: this.cardSwitchAnimation,
                reverse: true,
                scope: this
            });
            this.syncToolbar(c)
        }
    }
});
Ext.reg("nestedlist", Ext.NestedList);
Ext.Picker = Ext.extend(Ext.Sheet, {
    componentCls: "x-picker",
    stretchX: true,
    stretchY: true,
    hideOnMaskTap: false,
    doneButton: "Done",
    cancelButton: "Cancel",
    height: 220,
    useTitles: false,
    defaultType: "pickerslot",
    initComponent: function () {
        this.addEvents("pick", "change", "cancel");
        this.layout = {
            type: "hbox",
            align: "stretch"
        };
        if (this.slots) {
            this.items = this.items ? (Ext.isArray(this.items) ? this.items : [this.items]) : [];
            this.items = this.items.concat(this.slots)
        }
        if (this.useTitles) {
            this.defaults = Ext.applyIf(this.defaults || {}, {
                title: ""
            })
        }
        this.on("slotpick", this.onSlotPick, this);
        if (this.doneButton || this.cancelButton) {
            var a = [];
            if (this.cancelButton) {
                a.push(Ext.apply({
                    handler: this.onCancelButtonTap,
                    scope: this
                }, ((Ext.isObject(this.cancelButton) ? this.cancelButton : {
                    text: String(this.cancelButton)
                }))))
            }
            a.push({
                xtype: "spacer"
            });
            if (this.doneButton) {
                a.push(Ext.apply({
                    ui: "action",
                    handler: this.onDoneButtonTap,
                    scope: this
                }, ((Ext.isObject(this.doneButton) ? this.doneButton : {
                    text: String(this.doneButton)
                }))))
            }
            this.toolbar = new Ext.Toolbar(Ext.applyIf(this.buttonBar || {
                dock: "top",
                items: a,
                defaults: {
                    xtype: "button"
                }
            }));
            this.dockedItems = this.dockedItems ? (Ext.isArray(this.dockedItems) ? this.dockedItems : [this.dockedItems]) : [];
            this.dockedItems.push(this.toolbar)
        }
        Ext.Picker.superclass.initComponent.call(this)
    },
    afterRender: function () {
        Ext.Picker.superclass.afterRender.apply(this, arguments);
        if (this.value) {
            this.setValue(this.value, false)
        }
    },
    onDoneButtonTap: function () {
        var a = this.animSheet("exit");
        Ext.apply(a, {
            after: function () {
                this.fireEvent("change", this, this.getValue())
            },
            scope: this
        });
        this.hide(a)
    },
    onCancelButtonTap: function () {
        var a = this.animSheet("exit");
        Ext.apply(a, {
            after: function () {
                this.setValue(this.values);
                this.fireEvent("cancel", this)
            },
            scope: this
        });
        this.hide(a)
    },
    onSlotPick: function (c, b, a) {
        this.fireEvent("pick", this, this.getValue(), c);
        return false
    },
    setValue: function (b, e) {
        var f, a = this.items.items,
            d = a.length;
        if (!b) {
            for (var c = 0; c < d; c++) {
                a[c].setSelectedNode(0)
            }
            return this
        }
        Ext.iterate(b, function (g, h) {
            f = this.child("[name=" + g + "]");
            if (f) {
                f.setValue(h, e)
            }
        }, this);
        this.values = b;
        return this
    },
    getValue: function () {
        var b = {},
            a = this.items.items,
            e = a.length,
            d, c;
        for (c = 0; c < e; c++) {
            d = a[c];
            b[d.name] = d.getValue()
        }
        return b
    }
});
Ext.regModel("x-textvalue", {
    fields: ["text", "value"]
});
Ext.Picker.Slot = Ext.extend(Ext.DataView, {
    isSlot: true,
    flex: 1,
    name: null,
    displayField: "text",
    valueField: "value",
    align: "center",
    itemSelector: "div.x-picker-item",
    componentCls: "x-picker-slot",
    renderTpl: ['<div class="x-picker-mask">', '<div class="x-picker-bar"></div>', "</div>"],
    selectedIndex: 0,
    getElConfig: function () {
        return {
            tag: "div",
            id: this.id,
            cls: "x-picker-" + this.align
        }
    },
    initComponent: function () {
        if (!this.name) {
            throw new Error("Each picker slot is required to have a name.")
        }
        Ext.apply(this.renderSelectors, {
            mask: ".x-picker-mask",
            bar: ".x-picker-bar"
        });
        this.scroll = {
            direction: "vertical",
            useIndicators: false,
            friction: 0.7,
            acceleration: 25,
            snapDuration: 200,
            animationDuration: 200
        };
        this.tpl = new Ext.XTemplate(['<tpl for=".">', '<div class="x-picker-item {cls} <tpl if="extra">x-picker-invalid</tpl>">{' + this.displayField + "}</div>", "</tpl>"]);
        var d = this.data,
            f = [],
            c = d && d.length,
            a, b, e;
        if (d && Ext.isArray(d) && c) {
            for (a = 0; a < c; a++) {
                b = d[a];
                e = {};
                if (Ext.isArray(b)) {
                    e[this.valueField] = b[0];
                    e[this.displayField] = b[1]
                } else {
                    if (Ext.isString(b)) {
                        e[this.valueField] = b;
                        e[this.displayField] = b
                    } else {
                        if (Ext.isObject(b)) {
                            e = b
                        }
                    }
                }
                f.push(e)
            }
            this.store = new Ext.data.Store({
                model: "x-textvalue",
                data: f
            });
            this.tempStore = true
        } else {
            if (this.store) {
                this.store = Ext.StoreMgr.lookup(this.store)
            }
        }
        this.enableBubble("slotpick");
        if (this.title) {
            this.title = new Ext.Component({
                dock: "top",
                componentCls: "x-picker-slot-title",
                html: this.title
            });
            this.dockedItems = this.title
        }
        Ext.Picker.Slot.superclass.initComponent.call(this);
        if (this.value !== undefined) {
            this.setValue(this.value, false)
        }
    },
    setupBar: function () {
        this.el.setStyle({
            padding: ""
        });
        var a = this.bar.getY() - this.el.getY();
        this.barHeight = this.bar.getHeight();
        this.el.setStyle({
            padding: a + "px 0"
        });
        this.slotPadding = a;
        this.scroller.updateBoundary();
        this.scroller.setSnap(this.barHeight);
        this.setSelectedNode(this.selectedIndex, false)
    },
    afterComponentLayout: function () {
        Ext.defer(this.setupBar, 200, this)
    },
    initEvents: function () {
        this.mon(this.scroller, {
            scrollend: this.onScrollEnd,
            scope: this
        })
    },
    onScrollEnd: function (a, b) {
        this.selectedNode = this.getNode(Math.round(b.y / this.barHeight));
        this.selectedIndex = this.indexOf(this.selectedNode);
        this.fireEvent("slotpick", this, this.getValue(), this.selectedNode)
    },
    scrollToNode: function (c, a) {
        var b = Ext.fly(c).getOffsetsTo(this.scrollEl)[1];
        this.scroller.scrollTo({
            y: b
        }, a !== false ? true : false)
    },
    onItemTap: function (a) {
        Ext.Picker.Slot.superclass.onItemTap.apply(this, arguments);
        this.setSelectedNode(a);
        this.selectedNode = a;
        this.selectedIndex = this.indexOf(a);
        this.fireEvent("slotpick", this, this.getValue(), this.selectedNode)
    },
    getSelectedNode: function () {
        return this.selectedNode
    },
    setSelectedNode: function (b, a) {
        if (Ext.isNumber(b)) {
            b = this.getNode(b)
        } else {
            if (b.isModel) {
                b = this.getNode(this.store.indexOf(b))
            }
        }
        if (b) {
            this.selectedNode = b;
            this.selectedIndex = this.indexOf(b);
            this.scrollToNode(b, a)
        }
    },
    getValue: function () {
        var a = this.store.getAt(this.selectedIndex);
        return a ? a.get(this.valueField) : null
    },
    setValue: function (c, a) {
        var b = this.store.find(this.valueField, c);
        if (b != -1) {
            if (!this.rendered) {
                this.selectedIndex = b;
                return
            }
            this.setSelectedNode(b, a)
        }
    },
    onDestroy: function () {
        if (this.tempStore) {
            this.store.destroyStore();
            this.store = null
        }
        Ext.Picker.Slot.superclass.onDestroy.call(this)
    }
});
Ext.reg("pickerslot", Ext.Picker.Slot);
Ext.DatePicker = Ext.extend(Ext.Picker, {
    yearFrom: 1980,
    yearTo: new Date().getFullYear(),
    monthText: "Month",
    dayText: "Day",
    yearText: "Year",
    slotOrder: ["month", "day", "year"],
    initComponent: function () {
        var j = this.yearFrom,
            e = this.yearTo,
            f = [],
            h = [],
            b = [],
            g, c, d, a;
        if (j > e) {
            c = j;
            j = e;
            e = c
        }
        for (d = j; d <= e; d++) {
            f.push({
                text: d,
                value: d
            })
        }
        a = this.getDaysInMonth(1, new Date().getFullYear());
        for (d = 0; d < a; d++) {
            h.push({
                text: d + 1,
                value: d + 1
            })
        }
        for (d = 0, g = Date.monthNames.length; d < g; d++) {
            b.push({
                text: Date.monthNames[d],
                value: d + 1
            })
        }
        this.slots = [];
        this.slotOrder.forEach(function (i) {
            this.slots.push(this.createSlot(i, h, b, f))
        }, this);
        Ext.DatePicker.superclass.initComponent.call(this)
    },
    afterRender: function () {
        Ext.DatePicker.superclass.afterRender.apply(this, arguments);
        this.setValue(this.value)
    },
    createSlot: function (b, d, a, c) {
        switch (b) {
        case "year":
            return {
                name: "year",
                align: "center",
                data: c,
                title: this.useTitles ? this.yearText : false,
                flex: 3
            };
        case "month":
            return {
                name: b,
                align: "right",
                data: a,
                title: this.useTitles ? this.monthText : false,
                flex: 4
            };
        case "day":
            return {
                name: "day",
                align: "center",
                data: d,
                title: this.useTitles ? this.dayText : false,
                flex: 2
            }
        }
    },
    onSlotPick: function (f, e) {
        var c = f.name,
            b, a, d;
        if (c === "month" || c === "year") {
            d = this.child("[name=day]");
            b = this.getValue();
            a = this.getDaysInMonth(b.getMonth() + 1, b.getFullYear());
            d.store.clearFilter();
            d.store.filter({
                fn: function (g) {
                    return g.get("extra") === true || g.get("value") <= a
                }
            });
            d.scroller.updateBoundary(true)
        }
        Ext.DatePicker.superclass.onSlotPick.apply(this, arguments)
    },
    getValue: function () {
        var c = Ext.DatePicker.superclass.getValue.call(this),
            b = this.getDaysInMonth(c.month, c.year),
            a = Math.min(c.day, b);
        return new Date(c.year, c.month - 1, a)
    },
    setValue: function (b, a) {
        if (!Ext.isDate(b) && !Ext.isObject(b)) {
            b = null
        }
        if (Ext.isDate(b)) {
            this.value = {
                day: b.getDate(),
                year: b.getFullYear(),
                month: b.getMonth() + 1
            }
        } else {
            this.value = b
        }
        return Ext.DatePicker.superclass.setValue.call(this, this.value, a)
    },
    getDaysInMonth: function (c, b) {
        var a = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        return c == 2 && this.isLeapYear(b) ? 29 : a[c - 1]
    },
    isLeapYear: function (a) {
        return !!((a & 3) === 0 && (a % 100 || (a % 400 === 0 && a)))
    }
});
Ext.reg("datepicker", Ext.DatePicker);
Ext.Media = Ext.extend(Ext.Component, {
    url: "",
    enableControls: true,
    autoResume: false,
    autoPause: true,
    preload: true,
    playing: false,
    afterRender: function () {
        var a = this.getConfiguration();
        Ext.apply(a, {
            src: this.url,
            preload: this.preload ? "auto" : "none"
        });
        if (this.enableControls) {
            a.controls = "controls"
        }
        if (this.loop) {
            a.loop = "loop"
        }
        this.media = this.el.createChild(a);
        Ext.Media.superclass.afterRender.call(this);
        this.on({
            scope: this,
            activate: this.onActivate,
            beforedeactivate: this.onDeactivate
        })
    },
    onActivate: function () {
        if (this.autoResume && !this.playing) {
            this.play()
        }
    },
    onDeactivate: function () {
        if (this.autoPause && this.playing) {
            this.pause()
        }
    },
    play: function () {
        this.media.dom.play();
        this.playing = true
    },
    pause: function () {
        this.media.dom.pause();
        this.playing = false
    },
    toggle: function () {
        if (this.playing) {
            this.pause()
        } else {
            this.play()
        }
    }
});
Ext.reg("media", Ext.Media);
Ext.Video = Ext.extend(Ext.Media, {
    posterUrl: "",
    componentCls: "x-video",
    afterRender: function () {
        Ext.Video.superclass.afterRender.call(this);
        if (this.posterUrl) {
            this.media.hide();
            this.ghost = this.el.createChild({
                cls: "x-video-ghost",
                style: "width: 100%; height: 100%; background: #000 url(" + this.posterUrl + ") center center no-repeat; -webkit-background-size: 100% auto;"
            });
            this.ghost.on("tap", this.onGhostTap, this, {
                single: true
            })
        }
    },
    onGhostTap: function () {
        this.media.show();
        this.ghost.hide();
        this.play()
    },
    getConfiguration: function () {
        return {
            tag: "video",
            width: "100%",
            height: "100%"
        }
    }
});
Ext.reg("video", Ext.Video);
Ext.Audio = Ext.extend(Ext.Media, {
    componentCls: "x-audio",
    onActivate: function () {
        Ext.Audio.superclass.onActivate.call(this);
        if (Ext.is.Phone) {
            this.media.show()
        }
    },
    onDeactivate: function () {
        Ext.Audio.superclass.onDeactivate.call(this);
        if (Ext.is.Phone) {
            this.media.hide()
        }
    },
    getConfiguration: function () {
        var a = !this.enableControls;
        if (!Ext.supports.AudioTag) {
            return {
                tag: "embed",
                type: "audio/mpeg",
                target: "myself",
                controls: "true",
                hidden: a
            }
        } else {
            return {
                tag: "audio",
                hidden: a
            }
        }
    }
});
Ext.reg("audio", Ext.Audio);
Ext.MessageBox = Ext.extend(Ext.Sheet, {
    centered: true,
    renderHidden: true,
    ui: "dark",
    componentCls: "x-msgbox",
    enterAnimation: "pop",
    exitAnimation: "pop",
    autoHeight: true,
    defaultTextHeight: 75,
    constructor: function (a) {
        a = a || {};
        var c = a.ui || this.ui || "",
            b = a.componentCls || this.componentCls;
        delete a.html;
        this.titleBar = Ext.create({
            xtype: "toolbar",
            ui: c,
            dock: "top",
            cls: b + "-title",
            title: "&#160;"
        });
        this.buttonBar = Ext.create({
            xtype: "toolbar",
            ui: c,
            dock: "bottom",
            layout: {
                pack: "center"
            },
            cls: b + "-buttons"
        });
        a = Ext.apply({
            ui: c,
            dockedItems: [this.titleBar, this.buttonBar],
            renderSelectors: {
                body: "." + b + "-body",
                iconEl: "." + b + "-icon",
                msgContentEl: "." + b + "-content",
                msgEl: "." + b + "-text",
                inputsEl: "." + b + "-inputs",
                inputEl: "." + b + "-input-single",
                multiLineEl: "." + b + "-input-textarea"
            }
        }, a || {});
        Ext.MessageBox.superclass.constructor.call(this, a)
    },
    renderTpl: ['<div class="{componentCls}-body"<tpl if="bodyStyle"> style="{bodyStyle}"</tpl>>', '<div class="{componentCls}-icon x-hidden-display"></div>', '<div class="{componentCls}-content">', '<div class="{componentCls}-text"></div>', '<div class="{componentCls}-inputs x-hidden-display">', '<input type="text" class="{componentCls}-input {componentCls}-input-single" />', '<textarea class="{componentCls}-input {componentCls}-input-textarea"></textarea>', "</div>", "</div>", "</div>"],
    onClick: function (b) {
        if (b) {
            var a = b.config || {};
            if (typeof a.fn == "function") {
                a.fn.call(a.scope || null, b.itemId || b.text, a.input ? a.input.dom.value : null, a)
            }
            if (a.cls) {
                this.el.removeCls(a.cls)
            }
            if (a.input) {
                a.input.dom.blur()
            }
        }
        this.hide()
    },
    show: function (c) {
        var e, d, g = {
            autocomplete: "off",
            autocapitalize: "off",
            autocorrect: "off",
            maxlength: 0,
            autofocus: true,
            placeholder: "",
            type: "text"
        },
            a = /true|on/i;
        this.rendered || this.render(document.body);
        c = Ext.applyIf(c || {}, {
            multiLine: false,
            prompt: false,
            value: "",
            modal: true
        });
        if (c.title) {
            this.titleBar.setTitle(c.title);
            this.titleBar.show()
        } else {
            this.titleBar.hide()
        }
        if (this.inputsEl && (c.multiLine || c.prompt)) {
            this.inputsEl.show();
            if (this.multiLineEl && c.multiLine) {
                this.inputEl && this.inputEl.hide();
                this.multiLineEl.show().setHeight(Ext.isNumber(c.multiLine) ? parseFloat(c.multiLine) : this.defaultTextHeight);
                c.input = this.multiLineEl
            } else {
                if (this.inputEl) {
                    this.inputEl.show();
                    this.multiLineEl && this.multiLineEl.hide();
                    c.input = this.inputEl
                }
            }
            if (Ext.isObject(c.prompt)) {
                Ext.apply(g, c.prompt)
            }
            for (d in g) {
                if (g.hasOwnProperty(d)) {
                    e = g[d];
                    c.input.dom.setAttribute(d.toLowerCase(), /^auto/i.test(d) ? (a.test(e + "") ? "on" : "off") : e)
                }
            }
        } else {
            this.inputsEl && this.inputsEl.hide()
        }
        this.setIcon(c.icon || "", false);
        this.updateText(c.msg, false);
        if (c.cls) {
            this.el.addCls(c.cls)
        }
        this.modal = !! c.modal;
        var f = this.buttonBar,
            b = [];
        f.removeAll();
        Ext.each([].concat(c.buttons || Ext.MessageBox.OK), function (h) {
            if (h) {
                b.push(Ext.applyIf({
                    config: c,
                    scope: this,
                    handler: this.onClick
                }, h))
            }
        }, this);
        f.add(b);
        if (f.rendered) {
            f.doLayout()
        }
        Ext.MessageBox.superclass.show.call(this, c.animate);
        if (c.input) {
            c.input.dom.value = c.value || "";
            if (a.test(g.autofocus + "") && !("autofocus" in c.input.dom)) {
                c.input.dom.focus()
            }
        }
        return this
    },
    onOrientationChange: function () {
        this.doComponentLayout();
        Ext.MessageBox.superclass.onOrientationChange.apply(this, arguments)
    },
    adjustScale: function () {
        Ext.apply(this, {
            maxWidth: window.innerWidth,
            maxHeight: window.innerHeight,
            minWidth: window.innerWidth * 0.5,
            minHeight: window.innerHeight * 0.5
        })
    },
    doComponentLayout: function () {
        this.adjustScale();
        return Ext.MessageBox.superclass.doComponentLayout.apply(this, arguments)
    },
    alert: function (d, c, b, a) {
        return this.show({
            title: d,
            msg: c,
            buttons: Ext.MessageBox.OK,
            fn: b,
            scope: a,
            icon: Ext.MessageBox.INFO
        })
    },
    confirm: function (d, c, b, a) {
        return this.show({
            title: d,
            msg: c,
            buttons: Ext.MessageBox.YESNO,
            fn: function (e) {
                b.call(a, e)
            },
            scope: a,
            icon: Ext.MessageBox.QUESTION
        })
    },
    prompt: function (g, f, c, b, e, d, a) {
        return this.show({
            title: g,
            msg: f,
            buttons: Ext.MessageBox.OKCANCEL,
            fn: function (i, h) {
                c.call(b, i, h)
            },
            scope: b,
            icon: Ext.MessageBox.QUESTION,
            prompt: a || true,
            multiLine: e,
            value: d
        })
    },
    updateText: function (b, a) {
        if (this.msgEl) {
            this.msgEl.update(b ? String(b) : "&#160;");
            if (a !== false) {
                this.doComponentLayout()
            }
        }
        return this
    },
    setIcon: function (a, b) {
        if (a) {
            this.iconEl.show();
            this.iconEl.replaceCls(this.iconCls, a)
        } else {
            this.iconEl.replaceCls(this.iconCls, "x-hidden-display")
        }
        if (b !== false) {
            this.doComponentLayout()
        }
        this.iconCls = a;
        return this
    }
});
(function () {
    var a = Ext.MessageBox;
    Ext.apply(a, {
        OK: {
            text: "OK",
            itemId: "ok",
            ui: "action"
        },
        CANCEL: {
            text: "Cancel",
            itemId: "cancel"
        },
        YES: {
            text: "Yes",
            itemId: "yes",
            ui: "action"
        },
        NO: {
            text: "No",
            itemId: "no"
        },
        INFO: "x-msgbox-info",
        WARNING: "x-msgbox-warning",
        QUESTION: "x-msgbox-question",
        ERROR: "x-msgbox-error"
    });
    Ext.apply(a, {
        OKCANCEL: [a.CANCEL, a.OK],
        YESNOCANCEL: [a.CANCEL, a.NO, a.YES],
        YESNO: [a.NO, a.YES]
    })
})();
Ext.reg("messagebox", Ext.MessageBox);
Ext.reg("msgbox", Ext.MessageBox);
Ext.Msg = new Ext.MessageBox();
Ext.form.FormPanel = Ext.extend(Ext.Panel, {
    standardSubmit: false,
    componentCls: "x-form",
    url: undefined,
    baseParams: undefined,
    waitTpl: new Ext.XTemplate('<div class="{cls}">{message}&hellip;</div>'),
    submitOnAction: true,
    getElConfig: function () {
        return Ext.apply(Ext.form.FormPanel.superclass.getElConfig.call(this), {
            tag: "form"
        })
    },
    initComponent: function () {
        this.addEvents("submit", "beforesubmit", "exception");
        Ext.form.FormPanel.superclass.initComponent.call(this);
        this.on("action", this.onFieldAction, this)
    },
    afterRender: function () {
        Ext.form.FormPanel.superclass.afterRender.call(this);
        this.el.on("submit", this.onSubmit, this)
    },
    onSubmit: function (b, a) {
        if (!this.standardSubmit || this.fireEvent("beforesubmit", this, this.getValues(true)) === false) {
            if (b) {
                b.stopEvent()
            }
        }
    },
    onFieldAction: function (a) {
        if (this.submitOnAction) {
            a.blur();
            this.submit()
        }
    },
    submit: function (a) {
        var b = this.el.dom || {},
            c;
        a = Ext.apply({
            url: this.url || b.action,
            submitDisabled: false,
            method: b.method || "post",
            autoAbort: false,
            params: null,
            waitMsg: null,
            headers: null,
            success: null,
            failure: null
        }, a || {});
        c = this.getValues(this.standardSubmit || !a.submitDisabled);
        if (this.standardSubmit) {
            if (b) {
                if (a.url && Ext.isEmpty(b.action)) {
                    b.action = a.url
                }
                b.method = (a.method || b.method).toLowerCase();
                if (this.fireEvent("beforesubmit", this, c, a) !== false) {
                    b.submit()
                }
            }
            return null
        }
        if (this.fireEvent("beforesubmit", this, c, a) !== false) {
            if (a.waitMsg) {
                this.showMask(a.waitMsg)
            }
            return Ext.Ajax.request({
                url: a.url,
                method: a.method,
                rawData: Ext.urlEncode(Ext.apply(Ext.apply({}, this.baseParams || {}), a.params || {}, c)),
                autoAbort: a.autoAbort,
                headers: Ext.apply({
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                }, a.headers || {}),
                scope: this,
                callback: function (d, g, e) {
                    var f = e.responseText;
                    this.hideMask();
                    if (g) {
                        e = Ext.decode(f);
                        g = !! e.success;
                        if (g) {
                            if (Ext.isFunction(a.success)) {
                                a.success.call(a.scope || this, this, e, f)
                            }
                            this.fireEvent("submit", this, e);
                            return
                        }
                    }
                    if (Ext.isFunction(a.failure)) {
                        a.failure.call(a.scope || this, this, e, f)
                    }
                    this.fireEvent("exception", this, e)
                }
            })
        }
    },
    loadRecord: function (a) {
        if (a && a.data) {
            this.setValues(a.data);
            this.record = a
        }
        return this
    },
    loadModel: function () {
        return this.loadRecord.apply(this, arguments)
    },
    getRecord: function () {
        return this.record
    },
    updateRecord: function (b, e) {
        var a, c, d;
        if (b && (a = b.fields)) {
            c = this.getValues(e);
            for (d in c) {
                if (c.hasOwnProperty(d) && a.containsKey(d)) {
                    b.set(d, c[d])
                }
            }
        }
        return this
    },
    setValues: function (b) {
        var a = this.getFields(),
            c, e, d;
        b = b || {};
        for (c in b) {
            if (b.hasOwnProperty(c)) {
                e = a[c];
                d = b[c];
                if (e) {
                    if (Ext.isArray(e)) {
                        e.forEach(function (f) {
                            if (Ext.isArray(b[c])) {
                                f.setChecked((d.indexOf(f.getValue()) != -1))
                            } else {
                                f.setChecked((d == f.getValue()))
                            }
                        })
                    } else {
                        if (e.setChecked) {
                            e.setChecked(d)
                        } else {
                            e.setValue(d)
                        }
                    }
                }
            }
        }
        return this
    },
    getValues: function (d) {
        var a = this.getFields(),
            e, b = {},
            c;
        for (c in a) {
            if (a.hasOwnProperty(c)) {
                if (Ext.isArray(a[c])) {
                    b[c] = [];
                    a[c].forEach(function (f) {
                        if (f.isChecked() && !(d && f.disabled)) {
                            if (f instanceof Ext.form.Radio) {
                                b[c] = f.getValue()
                            } else {
                                b[c].push(f.getValue())
                            }
                        }
                    })
                } else {
                    e = a[c];
                    if (!(d && e.disabled)) {
                        if (e instanceof Ext.form.Checkbox) {
                            b[c] = (e.isChecked()) ? e.getValue() : null
                        } else {
                            b[c] = e.getValue()
                        }
                    }
                }
            }
        }
        return b
    },
    reset: function () {
        this.getFieldsAsArray().forEach(function (a) {
            a.reset()
        });
        return this
    },
    enable: function () {
        this.getFieldsAsArray().forEach(function (a) {
            a.enable()
        });
        return this
    },
    disable: function () {
        this.getFieldsAsArray().forEach(function (a) {
            a.disable()
        });
        return this
    },
    getFieldsAsArray: function () {
        var a = [];
        var b = function (c) {
                if (c.isField) {
                    a.push(c)
                }
                if (c.isContainer) {
                    c.items.each(b)
                }
            };
        this.items.each(b);
        return a
    },
    getFields: function (b) {
        var a = {},
            d;
        var c = function (e) {
                if (e.isField) {
                    d = e.getName();
                    if ((b && d == b) || typeof b == "undefined") {
                        if (a.hasOwnProperty(d)) {
                            if (!Ext.isArray(a[d])) {
                                a[d] = [a[d]]
                            }
                            a[d].push(e)
                        } else {
                            a[d] = e
                        }
                    }
                }
                if (e.isContainer) {
                    e.items.each(c)
                }
            };
        this.items.each(c);
        return (b) ? (a[b] || []) : a
    },
    getFieldsFromItem: function () {},
    showMask: function (a, b) {
        a = Ext.isString(a) ? {
            message: a
        } : a;
        if (a && this.waitTpl) {
            this.maskTarget = b = Ext.get(b || a.target) || this.el;
            b && b.mask(this.waitTpl.apply(a))
        }
        return this
    },
    hideMask: function () {
        if (this.maskTarget) {
            this.maskTarget.unmask();
            delete this.maskTarget
        }
        return this
    }
});
Ext.form.FormPanel.prototype.load = Ext.form.FormPanel.prototype.loadModel;
Ext.reg("formpanel", Ext.form.FormPanel);
Ext.reg("form", Ext.form.FormPanel);
Ext.form.FieldSet = Ext.extend(Ext.Panel, {
    componentCls: "x-form-fieldset",
    initComponent: function () {
        this.componentLayout = this.getLayout();
        Ext.form.FieldSet.superclass.initComponent.call(this)
    },
    afterLayout: function (a) {
        Ext.form.FieldSet.superclass.afterLayout.call(this, a);
        if (this.title && !this.titleEl) {
            this.setTitle(this.title)
        } else {
            if (this.titleEl) {
                this.el.insertFirst(this.titleEl)
            }
        }
        if (this.instructions && !this.instructionsEl) {
            this.setInstructions(this.instructions)
        } else {
            if (this.instructionsEl) {
                this.el.appendChild(this.instructionsEl)
            }
        }
    },
    setTitle: function (a) {
        if (this.rendered) {
            if (!this.titleEl) {
                this.titleEl = this.el.insertFirst({
                    cls: this.componentCls + "-title"
                })
            }
            this.titleEl.setHTML(a)
        } else {
            this.title = a
        }
        return this
    },
    setInstructions: function (a) {
        if (this.rendered) {
            if (!this.instructionsEl) {
                this.instructionsEl = this.el.createChild({
                    cls: this.componentCls + "-instructions"
                })
            }
            this.instructionsEl.setHTML(a)
        } else {
            this.instructions = a
        }
        return this
    }
});
Ext.reg("fieldset", Ext.form.FieldSet);
Ext.form.Field = Ext.extend(Ext.Component, {
    isField: true,
    fieldCls: "x-form-field",
    baseCls: "x-field",
    inputCls: undefined,
    disabled: false,
    renderTpl: ['<tpl if="label">', '<div class="x-form-label"><span>{label}</span></div>', "</tpl>", '<tpl if="fieldEl">', '<div class="x-form-field-container"><input id="{inputId}" type="{inputType}" name="{name}" class="{fieldCls}"', '<tpl if="tabIndex">tabIndex="{tabIndex}" </tpl>', '<tpl if="placeHolder">placeholder="{placeHolder}" </tpl>', '<tpl if="style">style="{style}" </tpl>', '<tpl if="maxlength">maxlength="{maxlength}" </tpl>', '<tpl if="autoComplete">autocomplete="{autoComplete}" </tpl>', '<tpl if="autoCapitalize">autocapitalize="{autoCapitalize}" </tpl>', '<tpl if="autoCorrect">autocorrect="{autoCorrect}" </tpl> />', '<tpl if="useMask"><div class="x-field-mask"></div></tpl>', "</div>", '<tpl if="useClearIcon"><div class="x-field-clear-container"><div class="x-field-clear x-hidden-visibility">&#215;</div></div></tpl>', "</tpl>"],
    isFormField: true,
    autoCreateField: true,
    inputType: "text",
    label: null,
    labelWidth: "30%",
    labelAlign: "left",
    required: false,
    useMask: false,
    initComponent: function () {
        Ext.form.Field.superclass.initComponent.call(this)
    },
    getName: function () {
        return this.name || this.id || ""
    },
    applyRenderSelectors: function () {
        this.renderSelectors = Ext.applyIf(this.renderSelectors || {}, {
            mask: ".x-field-mask",
            labelEl: ".x-form-label",
            fieldEl: "." + Ext.util.Format.trim(this.renderData.fieldCls).replace(/ /g, ".")
        });
        Ext.form.Field.superclass.applyRenderSelectors.call(this)
    },
    initRenderData: function () {
        Ext.form.Field.superclass.initRenderData.apply(this, arguments);
        Ext.applyIf(this.renderData, {
            disabled: this.disabled,
            fieldCls: "x-input-" + this.inputType + (this.inputCls ? " " + this.inputCls : ""),
            fieldEl: !this.fieldEl && this.autoCreateField,
            inputId: Ext.id(),
            label: this.label,
            labelAlign: "x-label-align-" + this.labelAlign,
            name: this.getName(),
            required: this.required,
            style: this.style,
            tabIndex: this.tabIndex,
            inputType: this.inputType,
            useMask: this.useMask
        });
        return this.renderData
    },
    initEvents: function () {
        Ext.form.Field.superclass.initEvents.apply(this, arguments);
        if (this.fieldEl) {
            if (this.useMask && this.mask) {
                this.mon(this.mask, {
                    click: this.onMaskTap,
                    scope: this
                })
            }
        }
    },
    onRender: function () {
        Ext.form.Field.superclass.onRender.apply(this, arguments);
        var a = [];
        if (this.required) {
            a.push("x-field-required")
        }
        if (this.label) {
            a.push("x-label-align-" + this.labelAlign)
        }
        this.el.addCls(a)
    },
    afterRender: function () {
        Ext.form.Field.superclass.afterRender.apply(this, arguments);
        if (this.label) {
            this.setLabelWidth(this.labelWidth)
        }
        this.initValue()
    },
    isDisabled: function () {
        return this.disabled
    },
    onEnable: function () {
        this.fieldEl.dom.disabled = false
    },
    onDisable: function () {
        this.fieldEl.dom.disabled = true
    },
    initValue: function () {
        this.setValue(this.value || "", true);
        this.originalValue = this.getValue()
    },
    isDirty: function () {
        if (this.disabled || !this.rendered) {
            return false
        }
        return String(this.getValue()) !== String(this.originalValue)
    },
    onMaskTap: function (a) {
        if (this.disabled) {
            return false
        }
        return true
    },
    showMask: function (a) {
        if (this.mask) {
            this.mask.setStyle("display", "block")
        }
    },
    hideMask: function (a) {
        if (this.mask) {
            this.mask.setStyle("display", "none")
        }
    },
    reset: function () {
        this.setValue(this.originalValue)
    },
    getValue: function () {
        if (!this.rendered || !this.fieldEl) {
            return this.value
        }
        return this.fieldEl.getValue()
    },
    setValue: function (a) {
        this.value = a;
        if (this.rendered && this.fieldEl) {
            this.fieldEl.dom.value = (Ext.isEmpty(a) ? "" : a)
        }
        return this
    },
    setLabelWidth: function (a) {
        if (this.labelEl) {
            this.labelEl.setWidth(a)
        }
        return this
    }
});
Ext.reg("field", Ext.form.Field);
Ext.form.Slider = Ext.extend(Ext.form.Field, {
    ui: "slider",
    inputCls: "x-slider",
    inputType: "slider",
    minValue: 0,
    maxValue: 100,
    animationDuration: 200,
    value: 0,
    trackWidth: null,
    monitorOrientation: true,
    renderTpl: ['<tpl if="label">', '<div class="x-form-label"><span>{label}</span></div>', "</tpl>", '<tpl if="fieldEl">', '<div id="{inputId}" name="{name}" class="{fieldCls}"', '<tpl if="tabIndex">tabIndex="{tabIndex}"</tpl>', '<tpl if="style">style="{style}" </tpl>', "/></tpl>"],
    increment: 1,
    constructor: function (a) {
        this.addEvents("beforechange", "change", "drag", "dragend");
        Ext.form.Slider.superclass.constructor.call(this, a)
    },
    initComponent: function () {
        this.tabIndex = -1;
        if (this.increment == 0) {
            this.increment = 1
        }
        this.increment = Math.abs(this.increment);
        this.values = [this.value];
        Ext.form.Slider.superclass.initComponent.apply(this, arguments);
        if (this.thumbs == undefined) {
            var a = [],
                b = this.values,
                d = b.length,
                c, e = this.getThumbClass();
            for (c = 0; c < d; c++) {
                a[a.length] = new e({
                    value: b[c],
                    slider: this,
                    listeners: {
                        scope: this,
                        drag: this.onDrag,
                        dragend: this.onThumbDragEnd
                    }
                })
            }
            this.thumbs = a
        }
    },
    initValue: function () {
        var a = this.getThumb();
        if (a.dragObj) {
            a.dragObj.updateBoundary()
        }
        Ext.form.Slider.superclass.initValue.apply(this, arguments)
    },
    onOrientationChange: function () {
        Ext.form.Slider.superclass.onOrientationChange.apply(this, arguments);
        var b = this,
            a = this.getThumb();
        if (a.dragObj) {
            setTimeout(function () {
                a.dragObj.updateBoundary();
                b.moveThumb(a, b.getPixelValue(a.getValue(), a), 0)
            }, 100)
        }
    },
    getThumbClass: function () {
        return Ext.form.Slider.Thumb
    },
    setValue: function (e, d, c) {
        if (typeof c == "undefined") {
            c = true
        }
        c = !! c;
        var a = this.getThumb(),
            b = a.getValue(),
            f = this.constrain(e);
        if (this.fireEvent("beforechange", this, a, f, b) !== false) {
            if (c) {
                this.moveThumb(a, this.getPixelValue(f, a), d)
            }
            a.setValue(f);
            this.doComponentLayout();
            this.fireEvent("change", this, a, f, b)
        }
        return this
    },
    constrain: function (b) {
        var a = b % this.increment;
        b -= a;
        if (Math.abs(a) >= (this.increment / 2)) {
            b += (a > 0) ? this.increment : -this.increment
        }
        b = Math.max(this.minValue, b);
        b = Math.min(this.maxValue, b);
        return b
    },
    getValue: function () {
        return this.getThumb().getValue()
    },
    getThumb: function () {
        return this.thumbs[0]
    },
    getSliderValue: function (b, d) {
        var a = d.dragObj.offsetBoundary.right,
            c = this.maxValue - this.minValue,
            e;
        this.trackWidth = (a > 0) ? a : this.trackWidth;
        e = c / this.trackWidth;
        return this.minValue + (e * (b))
    },
    getPixelValue: function (e, c) {
        var a = c.dragObj.offsetBoundary.right,
            b = this.maxValue - this.minValue,
            d;
        this.trackWidth = (a > 0) ? a : this.trackWidth;
        d = this.trackWidth / b;
        return (d * (e - this.minValue))
    },
    renderThumbs: function () {
        var a = this.thumbs,
            c = a.length,
            b;
        for (b = 0; b < c; b++) {
            a[b].render(this.fieldEl)
        }
    },
    onThumbDragEnd: function (a) {
        var b = this.getThumbValue(a);
        this.setValue(b);
        this.fireEvent("dragend", this, a.thumb, this.constrain(b))
    },
    getThumbValue: function (a) {
        var b = a.thumb;
        return this.getSliderValue(-a.getOffset().x, b)
    },
    onDrag: function (a) {
        var b = this.getThumbValue(a);
        this.fireEvent("drag", this, a.thumb, this.constrain(b))
    },
    onTap: function (f) {
        if (!this.disabled) {
            var c = this.fieldEl.getPageBox(),
                d = f.pageX - c.left,
                b = this.getNearest(d),
                a = b.dragObj.size.width / 2;
            this.setValue(this.getSliderValue(d - a, b), this.animationDuration, true)
        }
    },
    moveThumb: function (a, b, c) {
        a.dragObj.setOffset(new Ext.util.Offset(b, 0), c)
    },
    afterRender: function (a) {
        var b = this;
        b.renderThumbs();
        Ext.form.Slider.superclass.afterRender.apply(b, arguments);
        b.fieldEl.on({
            scope: b,
            tap: b.onTap
        })
    },
    getNearest: function (a) {
        return this.thumbs[0]
    },
    setThumbsDisabled: function (b) {
        var a = this.thumbs,
            d = a.length,
            c = 0;
        for (; c < d; c++) {
            a[c].dragObj[b ? "disable" : "enable"]()
        }
    },
    disable: function () {
        Ext.form.Slider.superclass.disable.call(this);
        this.setThumbsDisabled(true)
    },
    enable: function () {
        Ext.form.Slider.superclass.enable.call(this);
        this.setThumbsDisabled(false)
    }
});
Ext.reg("sliderfield", Ext.form.Slider);
Ext.form.Slider.Thumb = Ext.extend(Ext.form.Field, {
    isField: false,
    baseCls: "x-thumb",
    autoCreateField: false,
    draggable: true,
    value: 0,
    onRender: function () {
        this.draggable = {
            direction: "horizontal",
            constrain: this.slider.fieldEl,
            revert: false,
            thumb: this
        };
        Ext.form.Slider.Thumb.superclass.onRender.apply(this, arguments)
    },
    setValue: function (a) {
        this.value = a;
        return this
    },
    getValue: function () {
        return this.value
    }
});
Ext.reg("sliderthumb", Ext.form.Slider.Thumb);
Ext.form.Toggle = Ext.extend(Ext.form.Slider, {
    minValue: 0,
    maxValue: 1,
    ui: "toggle",
    inputType: "toggle",
    minValueCls: "x-toggle-off",
    maxValueCls: "x-toggle-on",
    animationDuration: 70,
    toggle: function () {
        var a = this.thumbs[0],
            b = a.getValue();
        this.setValue(b == this.minValue ? this.maxValue : this.minValue, this.animationDuration)
    },
    setValue: function (a) {
        Ext.form.Toggle.superclass.setValue.call(this, a, this.animationDuration);
        var b = this.fieldEl;
        if (this.constrain(a) === this.minValue) {
            b.addCls(this.minValueCls);
            b.removeCls(this.maxValueCls)
        } else {
            b.addCls(this.maxValueCls);
            b.removeCls(this.minValueCls)
        }
    },
    onTap: function () {
        if (!this.disabled) {
            this.toggle()
        }
    },
    getThumbClass: function () {
        return Ext.form.Toggle.Thumb
    }
});
Ext.reg("togglefield", Ext.form.Toggle);
Ext.form.Toggle.Thumb = Ext.extend(Ext.form.Slider.Thumb, {
    onRender: function () {
        Ext.form.Toggle.Thumb.superclass.onRender.apply(this, arguments);
        Ext.DomHelper.append(this.el, [{
            cls: "x-toggle-thumb-off",
            html: "<span>OFF</span>"
        }, {
            cls: "x-toggle-thumb-on",
            html: "<span>ON</span>"
        }, {
            cls: "x-toggle-thumb-thumb"
        }])
    }
});
Ext.form.Text = Ext.extend(Ext.form.Field, {
    ui: "text",
    focusCls: "x-field-focus",
    maxLength: 0,
    placeHolder: undefined,
    autoComplete: undefined,
    autoCapitalize: undefined,
    autoCorrect: undefined,
    isFocused: false,
    isClearIconVisible: false,
    useMask: Ext.is.iOS,
    initComponent: function () {
        this.addEvents("focus", "blur", "keyup", "change", "action");
        this.enableBubble("action");
        Ext.form.Text.superclass.initComponent.apply(this, arguments)
    },
    applyRenderSelectors: function () {
        this.renderSelectors = Ext.applyIf(this.renderSelectors || {}, {
            clearIconEl: ".x-field-clear",
            clearIconContainerEl: ".x-field-clear-container"
        });
        Ext.form.Text.superclass.applyRenderSelectors.call(this)
    },
    initRenderData: function () {
        var e = Ext.form.Text.superclass.initRenderData.call(this),
            d = this.autoComplete,
            c = this.autoCapitalize,
            b = this.autoCorrect;
        Ext.applyIf(e, {
            placeHolder: this.placeHolder,
            maxlength: this.maxLength,
            useClearIcon: this.useClearIcon
        });
        var a = [true, "on"];
        if (d !== undefined) {
            e.autoComplete = (a.indexOf(d) !== -1) ? "on" : "off"
        }
        if (c !== undefined) {
            e.autoCapitalize = (a.indexOf(c) !== -1) ? "on" : "off"
        }
        if (b !== undefined) {
            e.autoCorrect = (a.indexOf(b) !== -1) ? "on" : "off"
        }
        this.renderData = e;
        return e
    },
    initEvents: function () {
        Ext.form.Text.superclass.initEvents.call(this);
        if (this.fieldEl) {
            this.mon(this.fieldEl, {
                focus: this.onFocus,
                blur: this.onBlur,
                keyup: this.onKeyUp,
                paste: this.updateClearIconVisibility,
                mousedown: this.onBeforeFocus,
                scope: this
            });
            if (this.clearIconEl) {
                this.mon(this.clearIconContainerEl, {
                    scope: this,
                    tap: this.onClearIconTap
                })
            }
        }
    },
    onEnable: function () {
        Ext.form.Text.superclass.onEnable.apply(this, arguments);
        this.disabled = false;
        this.updateClearIconVisibility()
    },
    onDisable: function () {
        Ext.form.Text.superclass.onDisable.apply(this, arguments);
        this.blur();
        this.hideClearIcon()
    },
    onClearIconTap: function () {
        if (!this.disabled) {
            this.setValue("")
        }
    },
    updateClearIconVisibility: function () {
        var a = this.getValue();
        if (!a) {
            a = ""
        }
        if (a.length < 1) {
            this.hideClearIcon()
        } else {
            this.showClearIcon()
        }
        return this
    },
    showClearIcon: function () {
        if (!this.disabled && this.fieldEl && this.clearIconEl && !this.isClearIconVisible) {
            this.isClearIconVisible = true;
            this.fieldEl.addCls("x-field-clearable");
            this.clearIconEl.removeCls("x-hidden-visibility")
        }
        return this
    },
    hideClearIcon: function () {
        if (this.fieldEl && this.clearIconEl && this.isClearIconVisible) {
            this.isClearIconVisible = false;
            this.fieldEl.removeCls("x-field-clearable");
            this.clearIconEl.addCls("x-hidden-visibility")
        }
        return this
    },
    afterRender: function () {
        Ext.form.Text.superclass.afterRender.call(this);
        this.updateClearIconVisibility()
    },
    onBeforeFocus: function (a) {
        this.fireEvent("beforefocus", a)
    },
    beforeFocus: Ext.emptyFn,
    onMaskTap: function (a) {
        if (Ext.form.Text.superclass.onMaskTap.apply(this, arguments) !== true) {
            return false
        }
        this.maskCorrectionTimer = Ext.defer(this.showMask, 1000, this);
        this.hideMask()
    },
    onFocus: function (a) {
        if (this.mask) {
            if (this.maskCorrectionTimer) {
                clearTimeout(this.maskCorrectionTimer)
            }
            this.hideMask()
        }
        this.beforeFocus();
        if (this.focusCls) {
            this.el.addCls(this.focusCls)
        }
        if (!this.isFocused) {
            this.isFocused = true;
            this.startValue = this.getValue();
            this.fireEvent("focus", this, a)
        }
        Ext.currentlyFocusedField = this
    },
    beforeBlur: Ext.emptyFn,
    onBlur: function (b) {
        this.beforeBlur();
        if (this.focusCls) {
            this.el.removeCls(this.focusCls)
        }
        this.isFocused = false;
        var a = this.getValue();
        if (String(a) != String(this.startValue)) {
            this.fireEvent("change", this, a, this.startValue)
        }
        this.fireEvent("blur", this, b);
        this.updateClearIconVisibility();
        this.showMask();
        this.afterBlur();
        Ext.currentlyFocusedField = null
    },
    afterBlur: Ext.emptyFn,
    focus: function () {
        if (this.rendered && this.fieldEl && this.fieldEl.dom.focus) {
            this.fieldEl.dom.focus()
        }
        return this
    },
    blur: function () {
        if (this.rendered && this.fieldEl && this.fieldEl.dom.blur) {
            this.fieldEl.dom.blur()
        }
        return this
    },
    setValue: function () {
        Ext.form.Text.superclass.setValue.apply(this, arguments);
        this.updateClearIconVisibility()
    },
    onKeyUp: function (a) {
        this.updateClearIconVisibility();
        this.fireEvent("keyup", this, a);
        if (a.browserEvent.keyCode === 13) {
            this.blur();
            this.fireEvent("action", this, a)
        }
    }
});
Ext.reg("textfield", Ext.form.Text);
Ext.form.TextField = Ext.extend(Ext.form.Text, {
    constructor: function () {
        console.warn("Ext.form.TextField has been deprecated and will be removed in Sencha Touch 1.0. Please use Ext.form.Text instead");
        Ext.form.TextField.superclass.constructor.apply(this, arguments)
    }
});
Ext.form.Password = Ext.extend(Ext.form.Text, {
    inputType: "password",
    autoCapitalize: false
});
Ext.reg("passwordfield", Ext.form.Password);
Ext.form.Email = Ext.extend(Ext.form.Text, {
    inputType: "email",
    autoCapitalize: false
});
Ext.reg("emailfield", Ext.form.Email);
Ext.form.Url = Ext.extend(Ext.form.Text, {
    inputType: "url",
    autoCapitalize: false
});
Ext.reg("urlfield", Ext.form.Url);
Ext.form.Search = Ext.extend(Ext.form.Text, {
    inputType: "search"
});
Ext.reg("searchfield", Ext.form.Search);
Ext.form.Number = Ext.extend(Ext.form.Text, {
    ui: "number",
    inputType: "number",
    minValue: undefined,
    maxValue: undefined,
    stepValue: undefined,
    renderTpl: ['<tpl if="label"><div class="x-form-label"><span>{label}</span></div></tpl>', '<tpl if="fieldEl"><div class="x-form-field-container">', '<input id="{inputId}" type="{inputType}" name="{name}" class="{fieldCls}"', '<tpl if="tabIndex">tabIndex="{tabIndex}" </tpl>', '<tpl if="placeHolder">placeholder="{placeHolder}" </tpl>', '<tpl if="style">style="{style}" </tpl>', '<tpl if="minValue != undefined">min="{minValue}" </tpl>', '<tpl if="maxValue != undefined">max="{maxValue}" </tpl>', '<tpl if="stepValue != undefined">step="{stepValue}" </tpl>', '<tpl if="autoComplete">autocomplete="{autoComplete}" </tpl>', '<tpl if="autoCapitalize">autocapitalize="{autoCapitalize}" </tpl>', '<tpl if="autoFocus">autofocus="{autoFocus}" </tpl>', "/>", '<tpl if="useMask"><div class="x-field-mask"></div></tpl>', "</div></tpl>", '<tpl if="useClearIcon"><div class="x-field-clear-container"><div class="x-field-clear x-hidden-visibility">&#215;</div><div></tpl>'],
    onRender: function () {
        Ext.apply(this.renderData, {
            maxValue: this.maxValue,
            minValue: this.minValue,
            stepValue: this.stepValue
        });
        Ext.form.Number.superclass.onRender.apply(this, arguments)
    }
});
Ext.reg("numberfield", Ext.form.Number);
Ext.form.Spinner = Ext.extend(Ext.form.Number, {
    componentCls: "x-spinner",
    minValue: Number.NEGATIVE_INFINITY,
    maxValue: Number.MAX_VALUE,
    incrementValue: 1,
    accelerateOnTapHold: true,
    defaultValue: 0,
    cycle: false,
    disableInput: false,
    useClearIcon: false,
    autoCapitalize: false,
    renderTpl: ['<tpl if="label"><div class="x-form-label"><span>{label}</span></div></tpl>', '<tpl if="fieldEl">', '<div class="{componentCls}-body">', '<div class="{componentCls}-down"><span>-</span></div>', '<div class="x-form-field-container">', '<input id="{inputId}" type="{type}" name="{name}" class="{fieldCls}"', '<tpl if="tabIndex">tabIndex="{tabIndex}" </tpl>', '<tpl if="placeHolder">placeholder="{placeHolder}" </tpl>', '<tpl if="style">style="{style}" </tpl>', '<tpl if="minValue != undefined">min="{minValue}" </tpl>', '<tpl if="maxValue != undefined">max="{maxValue}" </tpl>', '<tpl if="stepValue != undefined">step="{stepValue}" </tpl>', '<tpl if="autoComplete">autocomplete="{autoComplete}" </tpl>', '<tpl if="autoFocus">autofocus="{autoFocus}" </tpl>', "/>", '<tpl if="useMask"><div class="x-field-mask"></div></tpl>', "</div>", '<div class="{componentCls}-up"><span>+</span></div>', "</div>", "</tpl>"],
    initComponent: function () {
        this.addEvents("spin", "spindown", "spinup");
        Ext.form.Spinner.superclass.initComponent.call(this)
    },
    onRender: function () {
        this.renderData.disableInput = this.disableInput;
        Ext.applyIf(this.renderSelectors, {
            spinUpEl: ".x-spinner-up",
            spinDownEl: ".x-spinner-down"
        });
        Ext.form.Spinner.superclass.onRender.apply(this, arguments);
        this.downRepeater = this.createRepeater(this.spinDownEl, this.onSpinDown);
        this.upRepeater = this.createRepeater(this.spinUpEl, this.onSpinUp)
    },
    initValue: function () {
        if (isNaN(this.defaultValue)) {
            this.defaultValue = 0
        }
        if (!this.value) {
            this.value = this.defaultValue
        }
        Ext.form.Spinner.superclass.initValue.apply(this, arguments)
    },
    createRepeater: function (b, a) {
        var c = new Ext.util.TapRepeater(b, {
            accelerate: this.accelerateOnTapHold
        });
        this.mon(c, {
            tap: a,
            touchstart: this.onTouchStart,
            touchend: this.onTouchEnd,
            preventDefault: true,
            scope: this
        });
        return c
    },
    onSpinDown: function () {
        if (!this.disabled) {
            this.spin(true)
        }
    },
    onSpinUp: function () {
        if (!this.disabled) {
            this.spin(false)
        }
    },
    onKeyUp: function (a) {
        Ext.form.Spinner.superclass.onKeyUp.apply(this, arguments)
    },
    onTouchStart: function (a) {
        if (!this.disabled) {
            a.el.addCls("x-button-pressed")
        }
    },
    onTouchEnd: function (a) {
        a.el.removeCls("x-button-pressed")
    },
    setValue: function (a) {
        a = parseFloat(a);
        if (isNaN(a)) {
            a = this.defaultValue
        }
        Ext.form.Spinner.superclass.setValue.call(this, a)
    },
    spin: function (g) {
        var e = parseFloat(this.getValue()),
            b = this.incrementValue,
            d = this.cycle,
            c = this.minValue,
            a = this.maxValue,
            f = g ? "down" : "up";
        if (g) {
            e -= b
        } else {
            e += b
        }
        e = (isNaN(e)) ? this.defaultValue : e;
        if (e < c) {
            e = d ? a : c
        } else {
            if (e > a) {
                e = d ? c : a
            }
        }
        this.setValue(e);
        this.fireEvent("spin" + f, this, e);
        this.fireEvent("spin", this, e, f)
    },
    destroy: function () {
        Ext.destroy(this.downRepeater, this.upRepeater);
        Ext.form.Spinner.superclass.destroy.call(this, arguments)
    }
});
Ext.reg("spinnerfield", Ext.form.Spinner);
Ext.form.Hidden = Ext.extend(Ext.form.Field, {
    ui: "hidden",
    inputType: "hidden",
    tabIndex: -1
});
Ext.reg("hiddenfield", Ext.form.Hidden);
Ext.form.HiddenField = Ext.extend(Ext.form.Hidden, {
    constructor: function () {
        console.warn("Ext.form.HiddenField has been deprecated and will be removed in Sencha Touch 1.0. Please use Ext.form.Hidden instead");
        Ext.form.HiddenField.superclass.constructor.apply(this, arguments)
    }
});
Ext.form.Checkbox = Ext.extend(Ext.form.Field, {
    ui: "checkbox",
    inputType: "checkbox",
    checked: false,
    value: "",
    constructor: function (a) {
        this.addEvents("check", "uncheck");
        Ext.form.Checkbox.superclass.constructor.call(this, a)
    },
    renderTpl: ['<tpl if="label"><div class="x-form-label"><span>{label}</span></div></tpl>', '<tpl if="fieldEl"><input id="{inputId}" type="{inputType}" name="{name}" class="{fieldCls}" tabIndex="-1" ', '<tpl if="checked"> checked </tpl>', '<tpl if="style">style="{style}" </tpl> value="{inputValue}" />', "</tpl>"],
    onRender: function () {
        var a = this.getBooleanIsChecked(this.checked);
        Ext.apply(this.renderData, {
            inputValue: String(this.value),
            checked: a
        });
        Ext.form.Checkbox.superclass.onRender.apply(this, arguments);
        if (this.fieldEl) {
            this.mon(this.fieldEl, {
                click: this.onChange,
                scope: this
            });
            this.setChecked(a);
            this.originalState = this.isChecked()
        }
    },
    onChange: function (a) {
        if (a) {
            if (a.browserEvent) {
                a = a.browserEvent
            }
            if (Ext.supports.Touch && !a.isSimulated) {
                a.preventDefault();
                a.stopPropagation();
                return
            }
        }
        if (this.isChecked()) {
            this.fireEvent("check", this)
        } else {
            this.fireEvent("uncheck", this)
        }
    },
    isChecked: function () {
        if (this.rendered) {
            return this.fieldEl.dom.checked || false
        } else {
            return !!this.checked
        }
    },
    setChecked: function (b) {
        var d = this.getBooleanIsChecked(b),
            e = this.rendered,
            a, c;
        if (e) {
            c = this.fieldEl.dom;
            a = c.checked
        } else {
            a = !! this.checked
        }
        if (a != d) {
            if (e) {
                c.checked = d
            } else {
                this.checked = d
            }
            this.onChange()
        }
        return this
    },
    check: function () {
        return this.setChecked(true)
    },
    uncheck: function () {
        return this.setChecked(false)
    },
    reset: function () {
        Ext.form.Checkbox.superclass.reset.apply(this, arguments);
        this.setChecked(this.originalState);
        return this
    },
    getBooleanIsChecked: function (a) {
        return /^(true|1|on)/i.test(String(a))
    },
    getSameGroupFields: function () {
        var b = this.el.up("form"),
            c = Ext.getCmp(b.id),
            a = [];
        if (c) {
            a = c.getFields(this.getName())
        }
        return a
    },
    getGroupValues: function () {
        var a = [];
        this.getSameGroupFields().forEach(function (b) {
            if (b.isChecked()) {
                a.push(b.getValue())
            }
        });
        return a
    },
    setGroupValues: function (a) {
        this.getSameGroupFields().forEach(function (b) {
            b.setChecked((a.indexOf(b.getValue()) !== -1))
        });
        return this
    },
    setValue: function (a) {
        a = String(a);
        Ext.form.Checkbox.superclass.setValue.call(this, a)
    }
});
Ext.reg("checkboxfield", Ext.form.Checkbox);
Ext.form.Radio = Ext.extend(Ext.form.Checkbox, {
    inputType: "radio",
    ui: "radio",
    getGroupValue: function () {
        var c, a = this.getSameGroupFields();
        for (var b = 0; b < a.length; b++) {
            c = a[b];
            if (c.isChecked()) {
                return c.getValue()
            }
        }
        return null
    },
    setGroupValue: function (d) {
        var e, b = this.getSameGroupFields(),
            c = 0,
            a = b.length;
        for (; c < a; c++) {
            e = b[c];
            if (e.getValue() == d) {
                e.check();
                return
            }
        }
    }
});
Ext.reg("radiofield", Ext.form.Radio);
Ext.form.Select = Ext.extend(Ext.form.Text, {
    ui: "select",
    valueField: "value",
    displayField: "text",
    tabIndex: -1,
    useMask: true,
    monitorOrientation: true,
    initComponent: function () {
        var a = this.options;
        if (this.store) {
            this.store = Ext.StoreMgr.lookup(this.store)
        } else {
            this.store = new Ext.data.Store({
                fields: [this.valueField, this.displayField]
            });
            if (a && Ext.isArray(a) && a.length > 0) {
                this.setOptions(this.options)
            }
        }
        Ext.form.Select.superclass.initComponent.call(this);
        this.addEvents("change")
    },
    onRender: function () {
        Ext.form.Select.superclass.onRender.apply(this, arguments);
        var a = this.hiddenName;
        if (a) {
            this.hiddenField = this.el.insertSibling({
                name: a,
                tag: "input",
                type: "hidden"
            }, "after")
        }
    },
    getPicker: function () {
        if (!this.picker) {
            this.picker = new Ext.Picker({
                slots: [{
                    align: "center",
                    name: this.name,
                    valueField: this.valueField,
                    displayField: this.displayField,
                    value: this.getValue(),
                    store: this.store
                }],
                listeners: {
                    change: this.onPickerChange,
                    scope: this
                }
            })
        }
        return this.picker
    },
    getListPanel: function () {
        if (!this.listPanel) {
            this.listPanel = new Ext.Panel({
                floating: true,
                stopMaskTapEvent: false,
                hideOnMaskTap: true,
                cls: "x-select-overlay",
                scroll: "vertical",
                items: {
                    xtype: "list",
                    store: this.store,
                    itemId: "list",
                    scroll: false,
                    itemTpl: ['<span class="x-list-label">{' + this.displayField + "}</span>", '<span class="x-list-selected"></span>'],
                    listeners: {
                        select: this.onListSelect,
                        scope: this
                    }
                }
            })
        }
        return this.listPanel
    },
    onOrientationChange: function () {
        if (this.listPanel && !this.listPanel.hidden && !Ext.is.Phone) {
            this.listPanel.showBy(this.el, false, false)
        }
    },
    onMaskTap: function () {
        if (this.disabled) {
            return
        }
        this.showComponent()
    },
    showComponent: function () {
        if (Ext.is.Phone) {
            this.getPicker().show()
        } else {
            var b = this.getListPanel(),
                a = this.store.findExact(this.valueField, this.value);
            b.showBy(this.el, "fade", false);
            b.down("#list").getSelectionModel().select(a != -1 ? a : 0, false, true)
        }
    },
    onListSelect: function (a, b) {
        if (b) {
            this.setValue(b.get(this.valueField));
            this.fireEvent("change", this, this.getValue())
        }
        this.listPanel.hide({
            type: "fade",
            out: true,
            scope: this
        })
    },
    onPickerChange: function (a, c) {
        var b = this.getValue(),
            d = c[this.name];
        if (d != b) {
            this.setValue(d);
            this.fireEvent("change", this, d)
        }
    },
    setValue: function (d) {
        var b = 0,
            a = this.hiddenField,
            c;
        if (d) {
            b = this.store.findExact(this.valueField, d)
        }
        c = this.store.getAt(b);
        if (c && this.rendered) {
            this.fieldEl.dom.value = c.get(this.displayField);
            this.value = c.get(this.valueField);
            if (a) {
                a.dom.value = this.value
            }
        } else {
            if (this.rendered) {
                this.fieldEl.dom.value = d
            }
            this.value = d
        }
        if (this.picker) {
            var e = {};
            e[this.name] = this.value;
            this.picker.setValue(e)
        }
        return this
    },
    getValue: function () {
        return this.value
    },
    setOptions: function (b, a) {
        if (!b) {
            this.store.clearData();
            this.setValue(null)
        } else {
            this.store.loadData(b, a)
        }
    },
    destroy: function () {
        Ext.form.Select.superclass.destroy.apply(this, arguments);
        Ext.destroy(this.listPanel, this.picker, this.hiddenField)
    }
});
Ext.reg("selectfield", Ext.form.Select);
Ext.form.TextArea = Ext.extend(Ext.form.Text, {
    ui: "textarea",
    maxRows: undefined,
    autoCapitalize: false,
    renderTpl: ['<tpl if="label"><div class="x-form-label"><span>{label}</span></div></tpl>', '<tpl if="fieldEl"><div class="x-form-field-container">', '<textarea id="{inputId}" type="{type}" name="{name}" class="{fieldCls}"', '<tpl if="tabIndex">tabIndex="{tabIndex}" </tpl>', '<tpl if="placeHolder">placeholder="{placeHolder}" </tpl>', '<tpl if="style">style="{style}" </tpl>', '<tpl if="maxRows != undefined">rows="{maxRows}" </tpl>', '<tpl if="maxlength">maxlength="{maxlength}" </tpl>', '<tpl if="autoComplete">autocomplete="{autoComplete}" </tpl>', '<tpl if="autoCapitalize">autocapitalize="{autoCapitalize}" </tpl>', '<tpl if="autoFocus">autofocus="{autoFocus}" </tpl>', "></textarea>", '<tpl if="useMask"><div class="x-field-mask"></div></tpl>', "</div></tpl>"],
    onRender: function () {
        this.renderData.maxRows = this.maxRows;
        Ext.form.TextArea.superclass.onRender.apply(this, arguments)
    },
    onKeyUp: function (a) {
        this.fireEvent("keyup", this, a)
    }
});
Ext.reg("textareafield", Ext.form.TextArea);
Ext.form.DatePicker = Ext.extend(Ext.form.Field, {
    ui: "select",
    picker: null,
    destroyPickerOnHide: false,
    initComponent: function () {
        this.addEvents("change");
        this.tabIndex = -1;
        this.useMask = true;
        Ext.form.Text.superclass.initComponent.apply(this, arguments)
    },
    getDatePicker: function () {
        if (!this.datePicker) {
            if (this.picker instanceof Ext.DatePicker) {
                this.datePicker = this.picker
            } else {
                this.datePicker = new Ext.DatePicker(Ext.apply(this.picker || {}))
            }
            this.datePicker.setValue(this.value || null);
            this.datePicker.on({
                scope: this,
                change: this.onPickerChange,
                hide: this.onPickerHide
            })
        }
        return this.datePicker
    },
    onMaskTap: function () {
        if (Ext.form.DatePicker.superclass.onMaskTap.apply(this, arguments) !== true) {
            return false
        }
        this.getDatePicker().show()
    },
    onPickerChange: function (a, b) {
        this.setValue(b);
        this.fireEvent("change", this, this.getValue())
    },
    onPickerHide: function () {
        if (this.destroyPickerOnHide && this.datePicker) {
            this.datePicker.destroy()
        }
    },
    setValue: function (b, a) {
        if (this.datePicker) {
            this.datePicker.setValue(b, a);
            this.value = (b != null) ? this.datePicker.getValue() : null
        } else {
            if (!Ext.isDate(b) && !Ext.isObject(b)) {
                b = null
            }
            if (Ext.isObject(b)) {
                this.value = new Date(b.year, b.month - 1, b.day)
            } else {
                this.value = b
            }
        }
        if (this.rendered) {
            this.fieldEl.dom.value = this.getValue(true)
        }
        return this
    },
    getValue: function (b) {
        var a = this.value || null;
        return (b && Ext.isDate(a)) ? a.format(Ext.util.Format.defaultDateFormat) : a
    },
    onDestroy: function () {
        if (this.datePicker) {
            this.datePicker.destroy()
        }
        Ext.form.DatePicker.superclass.onDestroy.call(this)
    }
});
Ext.reg("datepickerfield", Ext.form.DatePicker);
Ext.layout.LayoutManager = new Ext.AbstractManager({
    create: function (a, b) {
        if (!a) {
            a = b
        }
        if (Ext.isString(a)) {
            return new this.types[a || b]
        } else {
            if (Ext.isObject(a)) {
                if (a.isLayout) {
                    return a
                } else {
                    return new this.types[a.type || b](a)
                }
            }
        }
    }
});
Ext.regLayout = function () {
    return Ext.layout.LayoutManager.registerType.apply(Ext.layout.LayoutManager, arguments)
};
Ext.layout.Layout = Ext.extend(Object, {
    isLayout: true,
    initialized: false,
    constructor: function (a) {
        this.id = Ext.id(null, "ext-layout-" + this.type + "-");
        Ext.apply(this, a)
    },
    layout: function () {
        var a = this;
        a.layoutBusy = true;
        a.initLayout();
        if (a.beforeLayout.apply(a, arguments) !== false) {
            a.onLayout.apply(a, arguments);
            a.afterLayout();
            a.owner.needsLayout = false;
            a.layoutBusy = false
        }
    },
    beforeLayout: function () {
        this.renderItems(this.getLayoutItems(), this.getTarget());
        return true
    },
    renderItems: function (a, e) {
        var d = a.length,
            b = 0,
            c;
        for (; b < d; b++) {
            c = a[b];
            if (c && !c.rendered) {
                this.renderItem(c, b, e)
            } else {
                if (!this.isValidParent(c, e)) {
                    this.moveItem(c, b, e)
                }
            }
        }
    },
    renderItem: function (b, a, c) {
        if (!b.rendered) {
            b.render(c, a);
            this.configureItem(b, a);
            this.childrenChanged = true
        }
    },
    moveItem: function (b, a, c) {
        if (typeof a == "number") {
            a = c.dom.childNodes[a]
        }
        c = c.dom || c;
        c.insertBefore(b.el.dom, a || null);
        b.container = c;
        this.configureItem(b, a);
        this.childrenChanged = true
    },
    initLayout: function () {
        if (!this.initialized && !Ext.isEmpty(this.targetCls)) {
            this.getTarget().addCls(this.targetCls)
        }
        this.initialized = true
    },
    setOwner: function (a) {
        this.owner = a
    },
    getLayoutItems: function () {
        return []
    },
    isValidParent: function (a, b) {
        var c = a.el ? a.el.dom : Ext.getDom(a);
        return b && (c.parentNode == (b.dom || b))
    },
    configureItem: function (b, a) {
        if (this.itemCls) {
            b.el.addCls(this.itemCls)
        }
    },
    onLayout: Ext.emptyFn,
    afterLayout: Ext.emptyFn,
    onRemove: Ext.emptyFn,
    onDestroy: Ext.emptyFn,
    afterRemove: function (a) {
        if (this.itemCls && a.rendered) {
            a.el.removeCls(this.itemCls)
        }
    },
    destroy: function () {
        if (!Ext.isEmpty(this.targetCls)) {
            var a = this.getTarget();
            if (a) {
                a.removeCls(this.targetCls)
            }
        }
        this.onDestroy()
    }
});
Ext.layout.ComponentLayout = Ext.extend(Ext.layout.Layout, {
    type: "component",
    monitorChildren: true,
    beforeLayout: function (d, c) {
        Ext.layout.ComponentLayout.superclass.beforeLayout.call(this);
        var b = this.owner,
            a = b.isVisible(),
            e;
        if (!a && b.hiddenOwnerCt) {
            e = b.hiddenOwnerCt.layoutOnShow;
            e.remove(b);
            e.add(b);
            b.needsLayout = {
                width: d,
                height: c,
                isSetSize: false
            }
        }
        return a && this.needsLayout(d, c)
    },
    needsLayout: function (c, a) {
        this.lastComponentSize = this.lastComponentSize || {
            width: -Infinity,
            height: -Infinity
        };
        var b = this.childrenChanged;
        this.childrenChanged = false;
        return (b || this.lastComponentSize.width !== c || this.lastComponentSize.height !== a)
    },
    setElementSize: function (c, b, a) {
        if (b !== undefined && a !== undefined) {
            c.setSize(b, a)
        } else {
            if (a !== undefined) {
                c.setHeight(a)
            } else {
                if (b !== undefined) {
                    c.setWidth(b)
                }
            }
        }
    },
    getTarget: function () {
        return this.owner.el
    },
    setTargetSize: function (b, a) {
        this.setElementSize(this.owner.el, b, a);
        this.lastComponentSize = {
            width: b,
            height: a
        }
    },
    afterLayout: function () {
        var b = this.owner,
            e = b.layout,
            d = b.ownerCt,
            h, g, f, c, a;
        b.afterComponentLayout(this);
        if (e && e.isLayout) {
            e.layout()
        }
        if (d && d.componentLayout && d.componentLayout.monitorChildren && !d.componentLayout.layoutBusy) {
            d.componentLayout.childrenChanged = true;
            if (d.layout && !d.layout.layoutBusy) {
                if (d.layout.type == "autocontainer") {
                    d.doComponentLayout(c, a)
                } else {
                    d.layout.layout()
                }
            }
        }
    }
});
Ext.layout.AutoComponentLayout = Ext.extend(Ext.layout.ComponentLayout, {
    type: "autocomponent",
    onLayout: function (b, a) {
        this.setTargetSize(b, a)
    }
});
Ext.regLayout("autocomponent", Ext.layout.AutoComponentLayout);
Ext.layout.DockLayout = Ext.extend(Ext.layout.ComponentLayout, {
    type: "dock",
    itemCls: "x-docked",
    onLayout: function (a, p) {
        var m = this,
            b = m.owner,
            j = b.body,
            d = b.ownerCt,
            i = b.layout,
            f = b.collapsed,
            e = b.contracted,
            k = b.expanded,
            h = m.headerItem,
            l = m.getTarget(),
            n = false,
            o = false,
            g;
        var c = m.info = {
            boxes: [],
            size: {
                width: a,
                height: p
            },
            padding: {
                top: l.getPadding("t"),
                right: l.getPadding("r"),
                bottom: l.getPadding("b"),
                left: l.getPadding("l")
            },
            border: {
                top: l.getBorderWidth("t"),
                right: l.getBorderWidth("r"),
                bottom: l.getBorderWidth("b"),
                left: l.getBorderWidth("l")
            },
            bodyMargin: {
                top: j.getMargin("t"),
                right: j.getMargin("r"),
                bottom: j.getMargin("b"),
                left: j.getMargin("l")
            },
            bodyBox: {}
        };
        if (p === undefined || p === null || a === undefined || a === null || e) {
            if ((p === undefined || p === null) && (a === undefined || a === null)) {
                o = true;
                n = true;
                if (!b.animCollapse || (!k && !e)) {
                    m.setTargetSize(null, null)
                }
                m.setBodyBox({
                    width: null,
                    height: null
                })
            } else {
                if (p === undefined || p === null) {
                    o = true;
                    if (!b.animCollapse || (!k && !e)) {
                        m.setTargetSize(a, null)
                    }
                    m.setBodyBox({
                        width: a,
                        height: null
                    })
                } else {
                    n = true;
                    if (!b.animCollapse || (!k && !e)) {
                        m.setTargetSize(null, p)
                    }
                    m.setBodyBox({
                        width: null,
                        height: p
                    })
                }
            }
            if (!f && i && i.isLayout) {
                i.layout()
            }
            m.dockItems(n, o);
            if (f) {
                if (h) {
                    if (h.dock == "top" || h.dock == "bottom") {
                        c.size.height = h.getHeight()
                    } else {
                        c.size.width = h.getWidths()
                    }
                } else {
                    c.size.height = 0
                }
            }
            if (k || e) {
                if (b.animCollapse) {
                    Ext.createDelegate(b.animCollapseFn, b, [c.size.width, c.size.height])()
                } else {
                    Ext.createDelegate(b["after" + (k ? "Expand" : "Collapse")], b)();
                    m.setTargetSize(c.size.width, c.size.height)
                }
            } else {
                m.setTargetSize(c.size.width, c.size.height)
            }
        } else {
            if (k || e) {
                if (b.animCollapse) {
                    Ext.createDelegate(b.animCollapseFn, b, [a, p])()
                } else {
                    Ext.createDelegate(b["after" + (k ? "Expand" : "Collapse")], b)();
                    m.setTargetSize(a, p)
                }
            } else {
                m.setTargetSize(a, p);
                m.dockItems()
            }
        }
        Ext.layout.DockLayout.superclass.onLayout.call(m, a, p)
    },
    afterLayout: function () {
        Ext.layout.DockLayout.superclass.afterLayout.call(this)
    },
    dockItems: function (h, a) {
        this.calculateDockBoxes(h, a);
        var f = this.info,
            g = this.owner.collapsed,
            c = f.boxes,
            e = c.length,
            d, b;
        for (b = 0; b < e; b++) {
            d = c[b];
            if (g === true && !d.isHeader) {
                continue
            }
            d.item.setPosition(d.x, d.y)
        }
        if (h) {
            f.bodyBox.width = null
        }
        if (a) {
            f.bodyBox.height = null
        }
        this.setBodyBox(f.bodyBox)
    },
    calculateDockBoxes: function (m, p) {
        var x = this,
            y = x.getTarget(),
            l = x.getLayoutItems(),
            a = x.owner,
            b = a.contracted,
            o = a.expanded,
            f = a.body,
            t = x.info,
            k = t.size,
            c = l.length,
            g = t.padding,
            n = t.border,
            u, q, d, e, s, v, j;
        if (p) {
            k.height = f.getHeight() + g.top + n.top + g.bottom + n.bottom
        } else {
            k.height = y.getHeight() - y.getMargin("tb")
        }
        if (m) {
            k.width = f.getWidth() + g.left + n.left + g.right + n.right
        } else {
            k.width = y.getWidth() - y.getMargin("lr")
        }
        t.bodyBox = {
            x: n.left + g.left,
            y: n.top + g.top,
            width: k.width - g.left - n.left - g.right - n.right,
            height: k.height - n.top - g.top - n.bottom - g.bottom
        };
        for (q = 0; q < c; q++) {
            u = l[q];
            if (u.isHeader) {
                x.headerItem = u
            }
            d = x.initBox(u);
            if (p === true) {
                d = x.adjustAutoBox(d, q)
            } else {
                d = x.adjustSizedBox(d, q)
            }
            t.boxes.push(d)
        }
    },
    adjustSizedBox: function (c, b) {
        var a = this.info.bodyBox;
        switch (c.type) {
        case "top":
            c.y = a.y;
            break;
        case "left":
            c.x = a.x;
            break;
        case "bottom":
            c.y = (a.y + a.height) - c.height;
            break;
        case "right":
            c.x = (a.x + a.width) - c.width;
            break
        }
        if (!c.overlay) {
            switch (c.type) {
            case "top":
                a.y += c.height;
                a.height -= c.height;
                break;
            case "left":
                a.x += c.width;
                a.width -= c.width;
                break;
            case "bottom":
                a.height -= c.height;
                break;
            case "right":
                a.width -= c.width;
                break
            }
        }
        return c
    },
    adjustAutoBox: function (c, f) {
        var a = this.info,
            g = a.bodyBox,
            j = a.size,
            d = a.boxes,
            h = c.type,
            b, e;
        if (h == "top" || h == "bottom") {
            for (b = 0; b < f; b++) {
                e = d[b];
                if (e.stretched && e.type == "left" || e.type == "right") {
                    e.height += c.height
                } else {
                    if (e.type == "bottom") {
                        e.y += c.height
                    }
                }
            }
        }
        switch (h) {
        case "top":
            c.y = g.y;
            if (!c.overlay) {
                g.y += c.height
            }
            j.height += c.height;
            break;
        case "bottom":
            c.y = (g.y + g.height);
            j.height += c.height;
            break;
        case "left":
            c.x = g.x;
            if (!c.overlay) {
                g.x += c.width;
                g.width -= c.width
            }
            break;
        case "right":
            if (!c.overlay) {
                g.width -= c.width
            }
            c.x = (g.x + g.width);
            break
        }
        return c
    },
    initBox: function (d) {
        var b = this.info.bodyBox,
            a = (d.dock == "top" || d.dock == "bottom"),
            c = {
                item: d,
                overlay: d.overlay,
                type: d.dock
            };
        if (d.stretch !== false) {
            c.stretched = true;
            if (a) {
                c.x = b.x;
                c.width = b.width;
                d.doComponentLayout(c.width - d.el.getMargin("lr"))
            } else {
                c.y = b.y;
                c.height = b.height;
                d.doComponentLayout(undefined, c.height - d.el.getMargin("tb"))
            }
        } else {
            d.doComponentLayout();
            c.width = d.getWidth();
            c.height = d.getHeight();
            if (a) {
                c.x = (d.align == "right") ? b.width - c.width : b.x
            }
        }
        if (c.width == undefined) {
            c.width = d.getWidth() + d.el.getMargin("lr")
        }
        if (c.height == undefined) {
            c.height = d.getHeight() + d.el.getMargin("tb")
        }
        return c
    },
    getLayoutItems: function () {
        return this.owner.getDockedItems()
    },
    setBodyBox: function (f) {
        var i = this,
            a = i.owner,
            g = a.body,
            e = a.contracted,
            h = a.expanded,
            b = i.info,
            d = b.bodyMargin,
            j = b.padding,
            c = b.border;
        if (Ext.isNumber(f.width)) {
            f.width -= d.left + d.right
        }
        if (Ext.isNumber(f.height)) {
            f.height -= d.top + d.bottom
        }
        i.setElementSize(g, f.width, f.height);
        g.setLeft(f.x - j.left - c.left);
        g.setTop(f.y - j.top - c.top)
    },
    configureItem: function (b, c) {
        Ext.layout.DockLayout.superclass.configureItem.call(this, b, c);
        var a = b.el || Ext.get(b);
        if (this.itemCls) {
            a.addCls(this.itemCls + "-" + b.dock)
        }
    },
    afterRemove: function (a) {
        Ext.layout.DockLayout.superclass.afterRemove.call(this, a);
        if (this.itemCls) {
            a.el.removeCls(this.itemCls + "-" + a.dock)
        }
        var b = a.el.dom;
        if (b) {
            b.parentNode.removeChild(b)
        }
        this.childrenChanged = true
    }
});
Ext.regLayout("dock", Ext.layout.DockLayout);
Ext.layout.FieldLayout = Ext.extend(Ext.layout.ComponentLayout, {
    type: "field",
    onLayout: function (b, a) {
        Ext.layout.FieldLayout.superclass.onLayout.call(this, owner, target);
        this.setTargetSize(b, a)
    },
    handleLabel: function () {
        this.owner.labelEl.setWidth(this.owner.labelWidth)
    }
});
Ext.regLayout("field", Ext.layout.FieldLayout);
Ext.layout.ContainerLayout = Ext.extend(Ext.layout.Layout, {
    type: "container",
    getLayoutItems: function () {
        return this.owner && this.owner.items && this.owner.items.items || []
    },
    afterLayout: function () {
        this.owner.afterLayout(this)
    },
    getTarget: function () {
        return this.owner.getTargetEl()
    }
});
Ext.layout.AutoContainerLayout = Ext.extend(Ext.layout.ContainerLayout, {
    type: "autocontainer",
    onLayout: function (a, e) {
        var b = this.getLayoutItems(),
            d = b.length,
            c;
        for (c = 0; c < d; c++) {
            b[c].doComponentLayout()
        }
    }
});
Ext.regLayout("auto", Ext.layout.AutoContainerLayout);
Ext.regLayout("autocontainer", Ext.layout.AutoContainerLayout);
Ext.layout.FitLayout = Ext.extend(Ext.layout.ContainerLayout, {
    itemCls: "x-fit-item",
    targetCls: "x-layout-fit",
    type: "fit",
    onLayout: function () {
        Ext.layout.FitLayout.superclass.onLayout.call(this);
        if (this.owner.items.length) {
            var b = this.getTargetBox(),
                a = this.owner.items.get(0);
            this.setItemBox(a, b);
            a.cancelAutoSize = true
        }
    },
    getTargetBox: function () {
        var d = this.getTarget(),
            b = d.getSize(),
            c = {
                left: d.getPadding("l"),
                right: d.getPadding("r"),
                top: d.getPadding("t"),
                bottom: d.getPadding("b")
            },
            a = {
                left: d.getBorderWidth("l"),
                right: d.getBorderWidth("r"),
                top: d.getBorderWidth("t"),
                bottom: d.getBorderWidth("b")
            };
        return {
            width: b.width - c.left - c.right - a.left - a.right,
            height: b.height - c.top - c.bottom - a.top - a.bottom,
            x: c.left + a.left,
            y: c.top + a.top
        }
    },
    setItemBox: function (b, a) {
        if (b && a.height > 0) {
            a.width -= b.el.getMargin("lr");
            a.height -= b.el.getMargin("tb");
            b.setCalculatedSize(a);
            b.setPosition(a)
        }
    }
});
Ext.regLayout("fit", Ext.layout.FitLayout);
Ext.layout.CardLayout = Ext.extend(Ext.layout.FitLayout, {
    type: "card",
    sizeAllCards: false,
    hideInactive: true,
    beforeLayout: function () {
        this.activeItem = this.getActiveItem();
        return Ext.layout.CardLayout.superclass.beforeLayout.apply(this, arguments)
    },
    onLayout: function () {
        Ext.layout.FitLayout.superclass.onLayout.apply(this, arguments);
        var f = this.activeItem,
            b = this.getLayoutItems(),
            e = b.length,
            a = this.getTargetBox(),
            c, d;
        for (c = 0; c < e; c++) {
            d = b[c];
            this.setItemBox(d, a)
        }
        if (!this.firstActivated && f) {
            if (f.fireEvent("beforeactivate", f) !== false) {
                f.fireEvent("activate", f)
            }
            this.firstActivated = true
        }
    },
    getActiveItem: function () {
        if (!this.activeItem && this.owner) {
            this.activeItem = this.parseActiveItem(this.owner.activeItem)
        }
        if (this.activeItem && this.owner.items.items.indexOf(this.activeItem) != -1) {
            return this.activeItem
        }
        return null
    },
    parseActiveItem: function (a) {
        if (a && a.isComponent) {
            return a
        } else {
            if (typeof a == "number" || a == undefined) {
                return this.getLayoutItems()[a || 0]
            } else {
                return this.owner.getComponent(a)
            }
        }
    },
    configureItem: function (b, a) {
        Ext.layout.FitLayout.superclass.configureItem.call(this, b, a);
        if (this.hideInactive && this.activeItem !== b) {
            b.hide()
        } else {
            b.show()
        }
    },
    onRemove: function (a) {
        if (a === this.activeItem) {
            this.activeItem = null;
            if (this.owner.items.getCount() == 0) {
                this.firstActivated = false
            }
        }
    },
    getAnimation: function (b, a) {
        var c = (b || {}).cardSwitchAnimation;
        if (c === false) {
            return false
        }
        return c || a.cardSwitchAnimation
    },
    setActiveItem: function (b, f) {
        var e = this,
            a = e.owner,
            g = Ext.getDoc(),
            d = e.activeItem,
            c;
        f = (f == undefined) ? this.getAnimation(b, a) : f;
        b = e.parseActiveItem(b);
        c = a.items.indexOf(b);
        if (c == -1) {
            a.add(b)
        }
        if (b && d != b && a.onBeforeCardSwitch(b, d, c, !! f) !== false) {
            if (!b.rendered) {
                this.layout()
            }
            if (b.fireEvent("beforeactivate", b, d) === false) {
                return false
            }
            if (d && d.fireEvent("beforedeactivate", d, b) === false) {
                return false
            }
            if (b.hidden) {
                b.show()
            }
            e.activeItem = b;
            if (f) {
                g.on("click", Ext.emptyFn, e, {
                    single: true,
                    preventDefault: true
                });
                Ext.Anim.run(b, f, {
                    out: false,
                    autoClear: true,
                    scope: e,
                    after: function () {
                        Ext.defer(function () {
                            g.un("click", Ext.emptyFn, e)
                        }, 50, e);
                        b.fireEvent("activate", b, d);
                        if (!d) {
                            a.onCardSwitch(b, d, c, true)
                        }
                    }
                });
                if (d) {
                    Ext.Anim.run(d, f, {
                        out: true,
                        autoClear: true,
                        after: function () {
                            d.fireEvent("deactivate", d, b);
                            if (e.hideInactive && e.activeItem != d) {
                                d.hide()
                            }
                            a.onCardSwitch(b, d, c, true)
                        }
                    })
                }
            } else {
                b.fireEvent("activate", b, d);
                if (d) {
                    d.fireEvent("deactivate", d, b);
                    if (e.hideInactive) {
                        d.hide()
                    }
                }
                a.onCardSwitch(b, d, c, false)
            }
            return b
        }
        return false
    },
    getNext: function (c) {
        var a = this.getLayoutItems(),
            b = a.indexOf(this.activeItem);
        return a[b + 1] || (c ? a[0] : false)
    },
    next: function (b, a) {
        return this.setActiveItem(this.getNext(a), b)
    },
    getPrev: function (c) {
        var a = this.getLayoutItems(),
            b = a.indexOf(this.activeItem);
        return a[b - 1] || (c ? a[a.length - 1] : false)
    },
    prev: function (b, a) {
        return this.setActiveItem(this.getPrev(a), b)
    }
});
Ext.regLayout("card", Ext.layout.CardLayout);
Ext.layout.BoxLayout = Ext.extend(Ext.layout.ContainerLayout, {
    type: "box",
    targetCls: "x-layout-box",
    innerCls: "x-layout-box-inner",
    pack: "start",
    align: "center",
    notifyOwnerCtContainer: true,
    fixedLayout: false,
    direction: "normal",
    onLayout: function () {
        Ext.layout.BoxLayout.superclass.onLayout.call(this);
        if (this.pack === "left" || this.pack === "top") {
            this.pack = "start"
        } else {
            if (this.pack === "right" || this.pack === "bottom") {
                this.pack = "end"
            }
        }
        var d = this.getTarget(),
            c = d.parent(),
            b = (c.getWidth() - c.getPadding("lr") - c.getBorderWidth("lr")) + "px",
            a = (c.getHeight() - c.getPadding("tb") - c.getBorderWidth("tb")) + "px";
        d.setStyle({
            "-webkit-box-orient": this.orientation,
            "-webkit-box-direction": this.direction,
            "-webkit-box-pack": this.pack,
            "-webkit-box-align": this.align
        });
        if (this.orientation == "horizontal") {
            d.setStyle({
                "min-width": b,
                height: a
            })
        } else {
            d.setStyle({
                "min-height": a,
                width: b
            })
        }
        this.prepareFlexedItems();
        this.setFlexedItems()
    },
    prepareFlexedItems: function () {
        var a = this.getLayoutItems(),
            d = a.length,
            c, b;
        for (b = 0; b < d; b++) {
            c = a[b];
            if (c.flex != undefined) {
                c.el.setStyle("position", "absolute");
                c.boxEl = this.createBoxEl(c)
            } else {
                c.doComponentLayout()
            }
        }
    },
    setFlexedItems: function () {
        var a = this.getLayoutItems(),
            d = a.length,
            c, b;
        for (b = 0; b < d; b++) {
            c = a[b];
            if (c.flex != undefined) {
                c.boxSize = c.boxEl.getSize()
            }
        }
        for (b = 0; b < d; b++) {
            c = a[b];
            if (c.flex != undefined) {
                c.el.setStyle("position", "");
                if (this.align == "stretch") {
                    c.setSize(c.boxSize)
                } else {
                    if (this.orientation == "horizontal") {
                        c.setWidth(c.boxSize.width)
                    } else {
                        c.setHeight(c.boxSize.height)
                    }
                }
                c.boxEl.remove();
                delete c.boxEl;
                delete c.boxSize
            }
        }
    },
    getTarget: function () {
        var a = this.owner,
            b = this.innerCt;
        if (!b) {
            if (a.scrollEl) {
                b = a.scrollEl.addCls(this.innerCls)
            } else {
                b = a.getTargetEl().createChild({
                    cls: this.innerCls
                })
            }
            this.innerCt = b
        }
        return b
    },
    createBoxEl: function (b) {
        var a = b.el;
        return a.insertSibling({
            style: "margin-top: " + a.getMargin("tb") + "px; margin-left: " + a.getMargin("lr") + "px; -webkit-box-flex: " + b.flex
        })
    }
});
Ext.layout.HBoxLayout = Ext.extend(Ext.layout.BoxLayout, {
    orientation: "horizontal"
});
Ext.regLayout("hbox", Ext.layout.HBoxLayout);
Ext.layout.VBoxLayout = Ext.extend(Ext.layout.BoxLayout, {
    orientation: "vertical"
});
Ext.regLayout("vbox", Ext.layout.VBoxLayout);
Ext.plugins.ListPagingPlugin = Ext.extend(Ext.util.Observable, {
    autoPaging: false,
    loadMoreText: "Load More...",
    init: function (a) {
        this.list = a;
        a.onBeforeLoad = Ext.util.Functions.createInterceptor(a.onBeforeLoad, this.onBeforeLoad, this);
        this.mon(a, "update", this.onListUpdate, this)
    },
    onListUpdate: function () {
        if (!this.rendered) {
            this.render()
        }
        this.el.appendTo(this.list.getTargetEl());
        if (!this.autoPaging) {
            this.el.removeCls("x-loading")
        }
        this.loading = false
    },
    render: function () {
        var b = this.list,
            c = b.getTargetEl(),
            a = "";
        if (!this.autoPaging) {
            a += '<div class="x-list-paging-msg">' + this.loadMoreText + "</div>"
        }
        this.el = c.createChild({
            cls: "x-list-paging" + (this.autoPaging ? " x-loading" : ""),
            html: a + Ext.LoadingSpinner
        });
        if (this.autoPaging) {
            this.mon(c.getScrollParent(), "scrollend", this.onScrollEnd, this)
        } else {
            this.mon(this.el, "tap", this.onPagingTap, this)
        }
        this.rendered = true
    },
    onBeforeLoad: function () {
        if (this.loading && this.list.store.getCount() > 0) {
            this.list.loadMask.disable();
            return false
        }
    },
    onPagingTap: function (a) {
        if (!this.loading) {
            this.loading = true;
            this.list.store.nextPage();
            this.el.addCls("x-loading")
        }
    },
    onScrollEnd: function (a, b) {
        if (b.y >= Math.abs(a.offsetBoundary.top)) {
            this.loading = true;
            this.list.store.nextPage()
        }
    }
});
Ext.preg("listpaging", Ext.plugins.ListPagingPlugin);
Ext.plugins.PullRefreshPlugin = Ext.extend(Ext.util.Observable, {
    pullRefreshText: "Pull down to refresh...",
    releaseRefreshText: "Release to refresh...",
    loadingText: "Loading...",
    snappingAnimationDuration: 150,
    refreshFn: null,
    pullTpl: new Ext.XTemplate('<div class="x-list-pullrefresh">', '<div class="x-list-pullrefresh-arrow"></div>', Ext.LoadingSpinner, '<div class="x-list-pullrefresh-wrap">', '<h3 class="x-list-pullrefresh-message">{message}</h3>', '<div class="x-list-pullrefresh-updated">Last Updated: <span>{lastUpdated:date("m/d/Y h:iA")}</span></div>', "</div>", "</div>"),
    isRefreshing: false,
    isLoading: false,
    currentViewState: "",
    init: function (a) {
        this.list = a;
        this.lastUpdated = new Date();
        a.on("update", this.onListUpdate, this);
        a.onBeforeLoad = Ext.util.Functions.createInterceptor(a.onBeforeLoad, this.onBeforeLoad, this)
    },
    onListUpdate: function () {
        if (!this.rendered) {
            this.render()
        }
        this.list.getTargetEl().insertFirst(this.el);
        if (!this.refreshFn) {
            this.onLoadComplete.call(this)
        }
    },
    render: function () {
        var b = this.list,
            c = b.getTargetEl(),
            a = c.getScrollParent();
        if (!this.pullTpl.isTemplate) {
            this.pullTpl = new Ext.XTemplate(this.pullTpl)
        }
        this.el = this.pullTpl.insertFirst(c, {
            message: this.pullRefreshText,
            lastUpdated: this.lastUpdated
        }, true);
        this.messageEl = this.el.down(".x-list-pullrefresh-message");
        this.updatedEl = this.el.down(".x-list-pullrefresh-updated > span");
        this.pullHeight = this.el.getHeight();
        this.scroller = a;
        a.on("bouncestart", this.onBounceStart, this);
        a.on("offsetchange", this.onOffsetChange, this);
        a.on("bounceend", this.onBounceEnd, this);
        a.on("offsetboundaryupdate", this.onOffsetBoundaryUpdate, this);
        this.rendered = true
    },
    onOffsetBoundaryUpdate: function (a, b) {
        if (this.isRefreshing) {
            b.bottom += this.pullHeight
        }
    },
    onBounceStart: function (a, b) {
        if (b.axis === "y") {
            if (!this.isRefreshing && a.offset.y > this.pullHeight) {
                this.isRefreshing = true;
                this.onOffsetBoundaryUpdate(a, a.offsetBoundary)
            }
        }
    },
    onBounceEnd: function (a, b) {
        if (b.axis === "y") {
            if (this.isRefreshing) {
                this.isRefreshing = false;
                this.setViewState("loading");
                this.isLoading = true;
                if (this.refreshFn) {
                    this.refreshFn.call(this, this.onLoadComplete, this)
                } else {
                    this.list.getStore().load()
                }
            }
        }
    },
    onOffsetChange: function (a, b) {
        if (b.y > 0 && !this.isRefreshing && !this.isLoading) {
            if (b.y > this.pullHeight) {
                this.setViewState("release")
            } else {
                this.setViewState("pull")
            }
        }
    },
    setViewState: function (a) {
        if (a === this.currentViewState) {
            return this
        }
        this.currentViewState = a;
        switch (a) {
        case "pull":
            this.messageEl.setHTML(this.pullRefreshText);
            this.el.removeCls(["x-list-pullrefresh-release", "x-list-pullrefresh-loading"]);
            break;
        case "release":
            this.messageEl.setHTML(this.releaseRefreshText);
            this.el.addCls("x-list-pullrefresh-release");
            break;
        case "loading":
            this.messageEl.setHTML(this.loadingText);
            this.el.addCls("x-list-pullrefresh-loading");
            break
        }
        return this
    },
    onBeforeLoad: function () {
        if (this.isLoading && this.list.store.getCount() > 0) {
            this.list.loadMask.disable();
            return false
        }
    },
    onLoadComplete: function () {
        var a = this;
        if (this.isLoading) {
            this.isLoading = false;
            this.setViewState("pull");
            this.updatedEl.setHTML(Ext.util.Format.date(this.lastUpdated, "m/d/Y h:iA"));
            setTimeout(function () {
                a.scroller.updateBoundary(a.snappingAnimationDuration)
            }, 100)
        }
    }
});
Ext.preg("pullrefresh", Ext.plugins.PullRefreshPlugin);
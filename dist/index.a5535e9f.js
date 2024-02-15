// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"6z0qx":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "9559a66ea5535e9f";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && ![
        "localhost",
        "127.0.0.1",
        "0.0.0.0"
    ].includes(hostname) ? "wss" : "ws";
    var ws;
    try {
        ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/");
    } catch (err) {
        if (err.message) console.error(err.message);
        ws = {};
    }
    // Web extension context
    var extCtx = typeof browser === "undefined" ? typeof chrome === "undefined" ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    }
    // $FlowFixMe
    ws.onmessage = async function(event /*: {data: string, ...} */ ) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data /*: HMRMessage */  = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH);
            // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                // Dispose all old assets.
                let processedAssets = {} /*: {|[string]: boolean|} */ ;
                for(let i = 0; i < assetsToDispose.length; i++){
                    let id = assetsToDispose[i][1];
                    if (!processedAssets[id]) {
                        hmrDispose(assetsToDispose[i][0], id);
                        processedAssets[id] = true;
                    }
                }
                // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html);
                // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        if (e.message) console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute("href");
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", // $FlowFixMe
    href.split("?")[0] + "?" + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) {
            assetsToAlsoAccept.forEach(function(a) {
                hmrDispose(a[0], a[1]);
            });
            // $FlowFixMe[method-unbinding]
            assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
        }
    });
}

},{}],"1E7ZB":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _rangeCalculatorJs = require("./range-calculator.js");
var _rangeCalculatorJsDefault = parcelHelpers.interopDefault(_rangeCalculatorJs);
window.rangeCalculator = new (0, _rangeCalculatorJsDefault.default)("#range-calculator", [
    {
        id: "speed",
        type: "number",
        initialValue: 70
    },
    {
        id: "temperature",
        type: "number",
        initialValue: 40
    },
    {
        id: "ac",
        type: "checkbox",
        initialValue: false,
        sideEffectEvents: [
            {
                listenFor: "temperature_changed",
                sideEffectHandler: (rangeCalculator, event)=>{
                    const acEl = rangeCalculator.rangeCalculatorEl.querySelector("#ac-control .ac");
                    const temperature = event.detail.newValue;
                    if (temperature <= 10) {
                        acEl.classList.add("cold");
                        acEl.classList.remove("warm");
                        return;
                    }
                    acEl.classList.add("warm");
                    acEl.classList.remove("cold");
                }
            }
        ]
    },
    {
        id: "wheelsize",
        type: "radio",
        initialValue: 19
    }
], [
    "100D",
    "P100D"
], {
    "100D": [
        {
            temp: -10,
            wheelsize: 19,
            ac: "off",
            hwy: [
                {
                    kmh: 70,
                    kilometers: 798
                },
                {
                    kmh: 80,
                    kilometers: 710
                },
                {
                    kmh: 90,
                    kilometers: 627
                },
                {
                    kmh: 100,
                    kilometers: 555
                },
                {
                    kmh: 110,
                    kilometers: 491
                },
                {
                    kmh: 120,
                    kilometers: 435
                },
                {
                    kmh: 130,
                    kilometers: 386
                },
                {
                    kmh: 140,
                    kilometers: 338
                }
            ]
        },
        {
            temp: -10,
            wheelsize: 19,
            ac: "on",
            hwy: [
                {
                    kmh: 70,
                    kilometers: 618
                },
                {
                    kmh: 80,
                    kilometers: 575
                },
                {
                    kmh: 90,
                    kilometers: 526
                },
                {
                    kmh: 100,
                    kilometers: 478
                },
                {
                    kmh: 110,
                    kilometers: 433
                },
                {
                    kmh: 120,
                    kilometers: 390
                },
                {
                    kmh: 130,
                    kilometers: 351
                },
                {
                    kmh: 140,
                    kilometers: 311
                }
            ]
        },
        {
            temp: -10,
            wheelsize: 21,
            ac: "off",
            hwy: [
                {
                    kmh: 70,
                    kilometers: 788
                },
                {
                    kmh: 80,
                    kilometers: 698
                },
                {
                    kmh: 90,
                    kilometers: 616
                },
                {
                    kmh: 100,
                    kilometers: 543
                },
                {
                    kmh: 110,
                    kilometers: 480
                },
                {
                    kmh: 120,
                    kilometers: 424
                },
                {
                    kmh: 130,
                    kilometers: 376
                },
                {
                    kmh: 140,
                    kilometers: 329
                }
            ]
        },
        {
            temp: -10,
            wheelsize: 21,
            ac: "on",
            hwy: [
                {
                    kmh: 70,
                    kilometers: 611
                },
                {
                    kmh: 80,
                    kilometers: 566
                },
                {
                    kmh: 90,
                    kilometers: 517
                },
                {
                    kmh: 100,
                    kilometers: 468
                },
                {
                    kmh: 110,
                    kilometers: 423
                },
                {
                    kmh: 120,
                    kilometers: 380
                },
                {
                    kmh: 130,
                    kilometers: 342
                },
                {
                    kmh: 140,
                    kilometers: 302
                }
            ]
        },
        {
            temp: 0,
            wheelsize: 19,
            ac: "off",
            hwy: [
                {
                    kmh: 70,
                    kilometers: 818
                },
                {
                    kmh: 80,
                    kilometers: 725
                },
                {
                    kmh: 90,
                    kilometers: 642
                },
                {
                    kmh: 100,
                    kilometers: 568
                },
                {
                    kmh: 110,
                    kilometers: 504
                },
                {
                    kmh: 120,
                    kilometers: 447
                },
                {
                    kmh: 130,
                    kilometers: 397
                },
                {
                    kmh: 140,
                    kilometers: 352
                }
            ]
        },
        {
            temp: 0,
            wheelsize: 19,
            ac: "on",
            hwy: [
                {
                    kmh: 70,
                    kilometers: 659
                },
                {
                    kmh: 80,
                    kilometers: 609
                },
                {
                    kmh: 90,
                    kilometers: 555
                },
                {
                    kmh: 100,
                    kilometers: 503
                },
                {
                    kmh: 110,
                    kilometers: 455
                },
                {
                    kmh: 120,
                    kilometers: 410
                },
                {
                    kmh: 130,
                    kilometers: 368
                },
                {
                    kmh: 140,
                    kilometers: 329
                }
            ]
        },
        {
            temp: 0,
            wheelsize: 21,
            ac: "off",
            hwy: [
                {
                    kmh: 70,
                    kilometers: 808
                },
                {
                    kmh: 80,
                    kilometers: 714
                },
                {
                    kmh: 90,
                    kilometers: 630
                },
                {
                    kmh: 100,
                    kilometers: 556
                },
                {
                    kmh: 110,
                    kilometers: 492
                },
                {
                    kmh: 120,
                    kilometers: 436
                },
                {
                    kmh: 130,
                    kilometers: 387
                },
                {
                    kmh: 140,
                    kilometers: 342
                }
            ]
        },
        {
            temp: 0,
            wheelsize: 21,
            ac: "on",
            hwy: [
                {
                    kmh: 70,
                    kilometers: 652
                },
                {
                    kmh: 80,
                    kilometers: 599
                },
                {
                    kmh: 90,
                    kilometers: 545
                },
                {
                    kmh: 100,
                    kilometers: 493
                },
                {
                    kmh: 110,
                    kilometers: 444
                },
                {
                    kmh: 120,
                    kilometers: 399
                },
                {
                    kmh: 130,
                    kilometers: 358
                },
                {
                    kmh: 140,
                    kilometers: 320
                }
            ]
        },
        {
            temp: 10,
            wheelsize: 19,
            ac: "off",
            hwy: [
                {
                    kmh: 70,
                    kilometers: 833
                },
                {
                    kmh: 80,
                    kilometers: 740
                },
                {
                    kmh: 90,
                    kilometers: 655
                },
                {
                    kmh: 100,
                    kilometers: 581
                },
                {
                    kmh: 110,
                    kilometers: 516
                },
                {
                    kmh: 120,
                    kilometers: 459
                },
                {
                    kmh: 130,
                    kilometers: 409
                },
                {
                    kmh: 140,
                    kilometers: 362
                }
            ]
        },
        {
            temp: 10,
            wheelsize: 19,
            ac: "on",
            hwy: [
                {
                    kmh: 70,
                    kilometers: 748
                },
                {
                    kmh: 80,
                    kilometers: 679
                },
                {
                    kmh: 90,
                    kilometers: 611
                },
                {
                    kmh: 100,
                    kilometers: 548
                },
                {
                    kmh: 110,
                    kilometers: 491
                },
                {
                    kmh: 120,
                    kilometers: 441
                },
                {
                    kmh: 130,
                    kilometers: 394
                },
                {
                    kmh: 140,
                    kilometers: 351
                }
            ]
        },
        {
            temp: 10,
            wheelsize: 21,
            ac: "off",
            hwy: [
                {
                    kmh: 70,
                    kilometers: 823
                },
                {
                    kmh: 80,
                    kilometers: 729
                },
                {
                    kmh: 90,
                    kilometers: 643
                },
                {
                    kmh: 100,
                    kilometers: 569
                },
                {
                    kmh: 110,
                    kilometers: 504
                },
                {
                    kmh: 120,
                    kilometers: 448
                },
                {
                    kmh: 130,
                    kilometers: 398
                },
                {
                    kmh: 140,
                    kilometers: 352
                }
            ]
        },
        {
            temp: 10,
            wheelsize: 21,
            ac: "on",
            hwy: [
                {
                    kmh: 70,
                    kilometers: 739
                },
                {
                    kmh: 80,
                    kilometers: 668
                },
                {
                    kmh: 90,
                    kilometers: 599
                },
                {
                    kmh: 100,
                    kilometers: 537
                },
                {
                    kmh: 110,
                    kilometers: 480
                },
                {
                    kmh: 120,
                    kilometers: 430
                },
                {
                    kmh: 130,
                    kilometers: 384
                },
                {
                    kmh: 140,
                    kilometers: 341
                }
            ]
        },
        {
            temp: 20,
            wheelsize: 19,
            ac: "off",
            hwy: [
                {
                    kmh: 70,
                    kilometers: 849
                },
                {
                    kmh: 80,
                    kilometers: 756
                },
                {
                    kmh: 90,
                    kilometers: 669
                },
                {
                    kmh: 100,
                    kilometers: 594
                },
                {
                    kmh: 110,
                    kilometers: 529
                },
                {
                    kmh: 120,
                    kilometers: 471
                },
                {
                    kmh: 130,
                    kilometers: 421
                },
                {
                    kmh: 140,
                    kilometers: 372
                }
            ]
        },
        {
            temp: 20,
            wheelsize: 19,
            ac: "on",
            hwy: [
                {
                    kmh: 70,
                    kilometers: 744
                },
                {
                    kmh: 80,
                    kilometers: 678
                },
                {
                    kmh: 90,
                    kilometers: 612
                },
                {
                    kmh: 100,
                    kilometers: 551
                },
                {
                    kmh: 110,
                    kilometers: 496
                },
                {
                    kmh: 120,
                    kilometers: 446
                },
                {
                    kmh: 130,
                    kilometers: 402
                },
                {
                    kmh: 140,
                    kilometers: 358
                }
            ]
        },
        {
            temp: 20,
            wheelsize: 21,
            ac: "off",
            hwy: [
                {
                    kmh: 70,
                    kilometers: 839
                },
                {
                    kmh: 80,
                    kilometers: 744
                },
                {
                    kmh: 90,
                    kilometers: 657
                },
                {
                    kmh: 100,
                    kilometers: 582
                },
                {
                    kmh: 110,
                    kilometers: 517
                },
                {
                    kmh: 120,
                    kilometers: 459
                },
                {
                    kmh: 130,
                    kilometers: 409
                },
                {
                    kmh: 140,
                    kilometers: 362
                }
            ]
        },
        {
            temp: 20,
            wheelsize: 21,
            ac: "on",
            hwy: [
                {
                    kmh: 70,
                    kilometers: 735
                },
                {
                    kmh: 80,
                    kilometers: 667
                },
                {
                    kmh: 90,
                    kilometers: 601
                },
                {
                    kmh: 100,
                    kilometers: 540
                },
                {
                    kmh: 110,
                    kilometers: 484
                },
                {
                    kmh: 120,
                    kilometers: 435
                },
                {
                    kmh: 130,
                    kilometers: 391
                },
                {
                    kmh: 140,
                    kilometers: 348
                }
            ]
        },
        {
            temp: 30,
            wheelsize: 19,
            ac: "off",
            hwy: [
                {
                    kmh: 70,
                    kilometers: 865
                },
                {
                    kmh: 80,
                    kilometers: 771
                },
                {
                    kmh: 90,
                    kilometers: 684
                },
                {
                    kmh: 100,
                    kilometers: 605
                },
                {
                    kmh: 110,
                    kilometers: 537
                },
                {
                    kmh: 120,
                    kilometers: 480
                },
                {
                    kmh: 130,
                    kilometers: 430
                },
                {
                    kmh: 140,
                    kilometers: 382
                }
            ]
        },
        {
            temp: 30,
            wheelsize: 19,
            ac: "on",
            hwy: [
                {
                    kmh: 70,
                    kilometers: 760
                },
                {
                    kmh: 80,
                    kilometers: 694
                },
                {
                    kmh: 90,
                    kilometers: 625
                },
                {
                    kmh: 100,
                    kilometers: 563
                },
                {
                    kmh: 110,
                    kilometers: 508
                },
                {
                    kmh: 120,
                    kilometers: 458
                },
                {
                    kmh: 130,
                    kilometers: 413
                },
                {
                    kmh: 140,
                    kilometers: 370
                }
            ]
        },
        {
            temp: 30,
            wheelsize: 21,
            ac: "off",
            hwy: [
                {
                    kmh: 70,
                    kilometers: 855
                },
                {
                    kmh: 80,
                    kilometers: 759
                },
                {
                    kmh: 90,
                    kilometers: 672
                },
                {
                    kmh: 100,
                    kilometers: 592
                },
                {
                    kmh: 110,
                    kilometers: 524
                },
                {
                    kmh: 120,
                    kilometers: 468
                },
                {
                    kmh: 130,
                    kilometers: 419
                },
                {
                    kmh: 140,
                    kilometers: 371
                }
            ]
        },
        {
            temp: 30,
            wheelsize: 21,
            ac: "on",
            hwy: [
                {
                    kmh: 70,
                    kilometers: 751
                },
                {
                    kmh: 80,
                    kilometers: 683
                },
                {
                    kmh: 90,
                    kilometers: 614
                },
                {
                    kmh: 100,
                    kilometers: 552
                },
                {
                    kmh: 110,
                    kilometers: 496
                },
                {
                    kmh: 120,
                    kilometers: 447
                },
                {
                    kmh: 130,
                    kilometers: 402
                },
                {
                    kmh: 140,
                    kilometers: 360
                }
            ]
        },
        {
            temp: 30,
            wheelsize: 21,
            ac: "off",
            hwy: [
                {
                    kmh: 70,
                    kilometers: 833
                },
                {
                    kmh: 80,
                    kilometers: 736
                },
                {
                    kmh: 90,
                    kilometers: 649
                },
                {
                    kmh: 100,
                    kilometers: 571
                },
                {
                    kmh: 110,
                    kilometers: 504
                },
                {
                    kmh: 120,
                    kilometers: 449
                },
                {
                    kmh: 130,
                    kilometers: 400
                },
                {
                    kmh: 140,
                    kilometers: 354
                }
            ]
        },
        {
            temp: 40,
            wheelsize: 19,
            ac: "off",
            hwy: [
                {
                    kmh: 70,
                    kilometers: 853
                },
                {
                    kmh: 80,
                    kilometers: 763
                },
                {
                    kmh: 90,
                    kilometers: 683
                },
                {
                    kmh: 100,
                    kilometers: 613
                },
                {
                    kmh: 110,
                    kilometers: 550
                },
                {
                    kmh: 120,
                    kilometers: 494
                },
                {
                    kmh: 130,
                    kilometers: 444
                },
                {
                    kmh: 140,
                    kilometers: 393
                }
            ]
        },
        {
            temp: 40,
            wheelsize: 19,
            ac: "on",
            hwy: [
                {
                    kmh: 70,
                    kilometers: 714
                },
                {
                    kmh: 80,
                    kilometers: 660
                },
                {
                    kmh: 90,
                    kilometers: 605
                },
                {
                    kmh: 100,
                    kilometers: 548
                },
                {
                    kmh: 110,
                    kilometers: 500
                },
                {
                    kmh: 120,
                    kilometers: 454
                },
                {
                    kmh: 130,
                    kilometers: 411
                },
                {
                    kmh: 140,
                    kilometers: 368
                }
            ]
        },
        {
            temp: 40,
            wheelsize: 21,
            ac: "off",
            hwy: [
                {
                    kmh: 70,
                    kilometers: 842
                },
                {
                    kmh: 80,
                    kilometers: 751
                },
                {
                    kmh: 90,
                    kilometers: 670
                },
                {
                    kmh: 100,
                    kilometers: 600
                },
                {
                    kmh: 110,
                    kilometers: 538
                },
                {
                    kmh: 120,
                    kilometers: 482
                },
                {
                    kmh: 130,
                    kilometers: 432
                },
                {
                    kmh: 140,
                    kilometers: 382
                }
            ]
        },
        {
            temp: 40,
            wheelsize: 21,
            ac: "on",
            hwy: [
                {
                    kmh: 70,
                    kilometers: 705
                },
                {
                    kmh: 80,
                    kilometers: 650
                },
                {
                    kmh: 90,
                    kilometers: 594
                },
                {
                    kmh: 100,
                    kilometers: 537
                },
                {
                    kmh: 110,
                    kilometers: 489
                },
                {
                    kmh: 120,
                    kilometers: 443
                },
                {
                    kmh: 130,
                    kilometers: 400
                },
                {
                    kmh: 140,
                    kilometers: 358
                }
            ]
        }
    ],
    P100D: [
        {
            temp: -10,
            wheelsize: 19,
            ac: "off",
            hwy: [
                {
                    kmh: 70,
                    kilometers: 760
                },
                {
                    kmh: 80,
                    kilometers: 678
                },
                {
                    kmh: 90,
                    kilometers: 602
                },
                {
                    kmh: 100,
                    kilometers: 533
                },
                {
                    kmh: 110,
                    kilometers: 471
                },
                {
                    kmh: 120,
                    kilometers: 417
                },
                {
                    kmh: 130,
                    kilometers: 369
                },
                {
                    kmh: 140,
                    kilometers: 326
                }
            ]
        },
        {
            temp: -10,
            wheelsize: 19,
            ac: "on",
            hwy: [
                {
                    kmh: 70,
                    kilometers: 592
                },
                {
                    kmh: 80,
                    kilometers: 552
                },
                {
                    kmh: 90,
                    kilometers: 506
                },
                {
                    kmh: 100,
                    kilometers: 461
                },
                {
                    kmh: 110,
                    kilometers: 416
                },
                {
                    kmh: 120,
                    kilometers: 374
                },
                {
                    kmh: 130,
                    kilometers: 336
                },
                {
                    kmh: 140,
                    kilometers: 301
                }
            ]
        },
        {
            temp: -10,
            wheelsize: 21,
            ac: "off",
            hwy: [
                {
                    kmh: 70,
                    kilometers: 717
                },
                {
                    kmh: 80,
                    kilometers: 643
                },
                {
                    kmh: 90,
                    kilometers: 573
                },
                {
                    kmh: 100,
                    kilometers: 509
                },
                {
                    kmh: 110,
                    kilometers: 451
                },
                {
                    kmh: 120,
                    kilometers: 400
                },
                {
                    kmh: 130,
                    kilometers: 355
                },
                {
                    kmh: 140,
                    kilometers: 315
                }
            ]
        },
        {
            temp: -10,
            wheelsize: 21,
            ac: "on",
            hwy: [
                {
                    kmh: 70,
                    kilometers: 559
                },
                {
                    kmh: 80,
                    kilometers: 523
                },
                {
                    kmh: 90,
                    kilometers: 482
                },
                {
                    kmh: 100,
                    kilometers: 440
                },
                {
                    kmh: 110,
                    kilometers: 398
                },
                {
                    kmh: 120,
                    kilometers: 360
                },
                {
                    kmh: 130,
                    kilometers: 324
                },
                {
                    kmh: 140,
                    kilometers: 291
                }
            ]
        },
        {
            temp: 0,
            wheelsize: 19,
            ac: "off",
            hwy: [
                {
                    kmh: 70,
                    kilometers: 783
                },
                {
                    kmh: 80,
                    kilometers: 698
                },
                {
                    kmh: 90,
                    kilometers: 618
                },
                {
                    kmh: 100,
                    kilometers: 546
                },
                {
                    kmh: 110,
                    kilometers: 484
                },
                {
                    kmh: 120,
                    kilometers: 428
                },
                {
                    kmh: 130,
                    kilometers: 380
                },
                {
                    kmh: 140,
                    kilometers: 338
                }
            ]
        },
        {
            temp: 0,
            wheelsize: 19,
            ac: "on",
            hwy: [
                {
                    kmh: 70,
                    kilometers: 635
                },
                {
                    kmh: 80,
                    kilometers: 588
                },
                {
                    kmh: 90,
                    kilometers: 536
                },
                {
                    kmh: 100,
                    kilometers: 485
                },
                {
                    kmh: 110,
                    kilometers: 437
                },
                {
                    kmh: 120,
                    kilometers: 393
                },
                {
                    kmh: 130,
                    kilometers: 354
                },
                {
                    kmh: 140,
                    kilometers: 315
                }
            ]
        },
        {
            temp: 0,
            wheelsize: 21,
            ac: "off",
            hwy: [
                {
                    kmh: 70,
                    kilometers: 739
                },
                {
                    kmh: 80,
                    kilometers: 662
                },
                {
                    kmh: 90,
                    kilometers: 588
                },
                {
                    kmh: 100,
                    kilometers: 522
                },
                {
                    kmh: 110,
                    kilometers: 463
                },
                {
                    kmh: 120,
                    kilometers: 411
                },
                {
                    kmh: 130,
                    kilometers: 366
                },
                {
                    kmh: 140,
                    kilometers: 326
                }
            ]
        },
        {
            temp: 0,
            wheelsize: 21,
            ac: "on",
            hwy: [
                {
                    kmh: 70,
                    kilometers: 599
                },
                {
                    kmh: 80,
                    kilometers: 557
                },
                {
                    kmh: 90,
                    kilometers: 510
                },
                {
                    kmh: 100,
                    kilometers: 464
                },
                {
                    kmh: 110,
                    kilometers: 419
                },
                {
                    kmh: 120,
                    kilometers: 377
                },
                {
                    kmh: 130,
                    kilometers: 340
                },
                {
                    kmh: 140,
                    kilometers: 304
                }
            ]
        },
        {
            temp: 10,
            wheelsize: 19,
            ac: "off",
            hwy: [
                {
                    kmh: 70,
                    kilometers: 802
                },
                {
                    kmh: 80,
                    kilometers: 713
                },
                {
                    kmh: 90,
                    kilometers: 632
                },
                {
                    kmh: 100,
                    kilometers: 559
                },
                {
                    kmh: 110,
                    kilometers: 496
                },
                {
                    kmh: 120,
                    kilometers: 440
                },
                {
                    kmh: 130,
                    kilometers: 391
                },
                {
                    kmh: 140,
                    kilometers: 347
                }
            ]
        },
        {
            temp: 10,
            wheelsize: 19,
            ac: "on",
            hwy: [
                {
                    kmh: 70,
                    kilometers: 722
                },
                {
                    kmh: 80,
                    kilometers: 655
                },
                {
                    kmh: 90,
                    kilometers: 590
                },
                {
                    kmh: 100,
                    kilometers: 528
                },
                {
                    kmh: 110,
                    kilometers: 473
                },
                {
                    kmh: 120,
                    kilometers: 423
                },
                {
                    kmh: 130,
                    kilometers: 377
                },
                {
                    kmh: 140,
                    kilometers: 337
                }
            ]
        },
        {
            temp: 10,
            wheelsize: 21,
            ac: "off",
            hwy: [
                {
                    kmh: 70,
                    kilometers: 757
                },
                {
                    kmh: 80,
                    kilometers: 676
                },
                {
                    kmh: 90,
                    kilometers: 601
                },
                {
                    kmh: 100,
                    kilometers: 534
                },
                {
                    kmh: 110,
                    kilometers: 475
                },
                {
                    kmh: 120,
                    kilometers: 423
                },
                {
                    kmh: 130,
                    kilometers: 376
                },
                {
                    kmh: 140,
                    kilometers: 335
                }
            ]
        },
        {
            temp: 10,
            wheelsize: 21,
            ac: "on",
            hwy: [
                {
                    kmh: 70,
                    kilometers: 681
                },
                {
                    kmh: 80,
                    kilometers: 621
                },
                {
                    kmh: 90,
                    kilometers: 561
                },
                {
                    kmh: 100,
                    kilometers: 505
                },
                {
                    kmh: 110,
                    kilometers: 453
                },
                {
                    kmh: 120,
                    kilometers: 406
                },
                {
                    kmh: 130,
                    kilometers: 363
                },
                {
                    kmh: 140,
                    kilometers: 325
                }
            ]
        },
        {
            temp: 20,
            wheelsize: 19,
            ac: "off",
            hwy: [
                {
                    kmh: 70,
                    kilometers: 819
                },
                {
                    kmh: 80,
                    kilometers: 729
                },
                {
                    kmh: 90,
                    kilometers: 646
                },
                {
                    kmh: 100,
                    kilometers: 572
                },
                {
                    kmh: 110,
                    kilometers: 508
                },
                {
                    kmh: 120,
                    kilometers: 452
                },
                {
                    kmh: 130,
                    kilometers: 402
                },
                {
                    kmh: 140,
                    kilometers: 359
                }
            ]
        },
        {
            temp: 20,
            wheelsize: 19,
            ac: "on",
            hwy: [
                {
                    kmh: 70,
                    kilometers: 720
                },
                {
                    kmh: 80,
                    kilometers: 656
                },
                {
                    kmh: 90,
                    kilometers: 592
                },
                {
                    kmh: 100,
                    kilometers: 531
                },
                {
                    kmh: 110,
                    kilometers: 477
                },
                {
                    kmh: 120,
                    kilometers: 428
                },
                {
                    kmh: 130,
                    kilometers: 384
                },
                {
                    kmh: 140,
                    kilometers: 343
                }
            ]
        },
        {
            temp: 20,
            wheelsize: 21,
            ac: "off",
            hwy: [
                {
                    kmh: 70,
                    kilometers: 773
                },
                {
                    kmh: 80,
                    kilometers: 691
                },
                {
                    kmh: 90,
                    kilometers: 615
                },
                {
                    kmh: 100,
                    kilometers: 547
                },
                {
                    kmh: 110,
                    kilometers: 487
                },
                {
                    kmh: 120,
                    kilometers: 434
                },
                {
                    kmh: 130,
                    kilometers: 387
                },
                {
                    kmh: 140,
                    kilometers: 346
                }
            ]
        },
        {
            temp: 20,
            wheelsize: 21,
            ac: "on",
            hwy: [
                {
                    kmh: 70,
                    kilometers: 679
                },
                {
                    kmh: 80,
                    kilometers: 622
                },
                {
                    kmh: 90,
                    kilometers: 563
                },
                {
                    kmh: 100,
                    kilometers: 508
                },
                {
                    kmh: 110,
                    kilometers: 457
                },
                {
                    kmh: 120,
                    kilometers: 411
                },
                {
                    kmh: 130,
                    kilometers: 370
                },
                {
                    kmh: 140,
                    kilometers: 331
                }
            ]
        },
        {
            temp: 30,
            wheelsize: 19,
            ac: "off",
            hwy: [
                {
                    kmh: 70,
                    kilometers: 834
                },
                {
                    kmh: 80,
                    kilometers: 744
                },
                {
                    kmh: 90,
                    kilometers: 660
                },
                {
                    kmh: 100,
                    kilometers: 580
                },
                {
                    kmh: 110,
                    kilometers: 515
                },
                {
                    kmh: 120,
                    kilometers: 460
                },
                {
                    kmh: 130,
                    kilometers: 411
                },
                {
                    kmh: 140,
                    kilometers: 364
                }
            ]
        },
        {
            temp: 30,
            wheelsize: 19,
            ac: "on",
            hwy: [
                {
                    kmh: 70,
                    kilometers: 735
                },
                {
                    kmh: 80,
                    kilometers: 671
                },
                {
                    kmh: 90,
                    kilometers: 606
                },
                {
                    kmh: 100,
                    kilometers: 543
                },
                {
                    kmh: 110,
                    kilometers: 488
                },
                {
                    kmh: 120,
                    kilometers: 440
                },
                {
                    kmh: 130,
                    kilometers: 396
                },
                {
                    kmh: 140,
                    kilometers: 355
                }
            ]
        },
        {
            temp: 30,
            wheelsize: 21,
            ac: "off",
            hwy: [
                {
                    kmh: 70,
                    kilometers: 787
                },
                {
                    kmh: 80,
                    kilometers: 706
                },
                {
                    kmh: 90,
                    kilometers: 628
                },
                {
                    kmh: 100,
                    kilometers: 554
                },
                {
                    kmh: 110,
                    kilometers: 493
                },
                {
                    kmh: 120,
                    kilometers: 442
                },
                {
                    kmh: 130,
                    kilometers: 396
                },
                {
                    kmh: 140,
                    kilometers: 351
                }
            ]
        },
        {
            temp: 30,
            wheelsize: 21,
            ac: "on",
            hwy: [
                {
                    kmh: 70,
                    kilometers: 693
                },
                {
                    kmh: 80,
                    kilometers: 636
                },
                {
                    kmh: 90,
                    kilometers: 577
                },
                {
                    kmh: 100,
                    kilometers: 519
                },
                {
                    kmh: 110,
                    kilometers: 468
                },
                {
                    kmh: 120,
                    kilometers: 422
                },
                {
                    kmh: 130,
                    kilometers: 381
                },
                {
                    kmh: 140,
                    kilometers: 342
                }
            ]
        },
        {
            temp: 40,
            wheelsize: 19,
            ac: "off",
            hwy: [
                {
                    kmh: 70,
                    kilometers: 822
                },
                {
                    kmh: 80,
                    kilometers: 736
                },
                {
                    kmh: 90,
                    kilometers: 659
                },
                {
                    kmh: 100,
                    kilometers: 592
                },
                {
                    kmh: 110,
                    kilometers: 529
                },
                {
                    kmh: 120,
                    kilometers: 474
                },
                {
                    kmh: 130,
                    kilometers: 424
                },
                {
                    kmh: 140,
                    kilometers: 377
                }
            ]
        },
        {
            temp: 40,
            wheelsize: 19,
            ac: "on",
            hwy: [
                {
                    kmh: 70,
                    kilometers: 691
                },
                {
                    kmh: 80,
                    kilometers: 639
                },
                {
                    kmh: 90,
                    kilometers: 584
                },
                {
                    kmh: 100,
                    kilometers: 533
                },
                {
                    kmh: 110,
                    kilometers: 482
                },
                {
                    kmh: 120,
                    kilometers: 436
                },
                {
                    kmh: 130,
                    kilometers: 393
                },
                {
                    kmh: 140,
                    kilometers: 352
                }
            ]
        },
        {
            temp: 40,
            wheelsize: 21,
            ac: "off",
            hwy: [
                {
                    kmh: 70,
                    kilometers: 776
                },
                {
                    kmh: 80,
                    kilometers: 698
                },
                {
                    kmh: 90,
                    kilometers: 627
                },
                {
                    kmh: 100,
                    kilometers: 565
                },
                {
                    kmh: 110,
                    kilometers: 507
                },
                {
                    kmh: 120,
                    kilometers: 455
                },
                {
                    kmh: 130,
                    kilometers: 408
                },
                {
                    kmh: 140,
                    kilometers: 363
                }
            ]
        },
        {
            temp: 40,
            wheelsize: 21,
            ac: "on",
            hwy: [
                {
                    kmh: 70,
                    kilometers: 652
                },
                {
                    kmh: 80,
                    kilometers: 606
                },
                {
                    kmh: 90,
                    kilometers: 556
                },
                {
                    kmh: 100,
                    kilometers: 509
                },
                {
                    kmh: 110,
                    kilometers: 462
                },
                {
                    kmh: 120,
                    kilometers: 419
                },
                {
                    kmh: 130,
                    kilometers: 378
                },
                {
                    kmh: 140,
                    kilometers: 339
                }
            ]
        }
    ]
});

},{"./range-calculator.js":"iTT7f","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"iTT7f":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
class RangeCalculator {
    constructor(rangeCalculatorElSelector, inputs, types, dataSets){
        this.rangeCalculatorEl = document.querySelector(rangeCalculatorElSelector);
        this.inputDomRefs = this.setInputRefs(inputs);
        this.inputValues = this.constructInputValueObject(inputs);
        this.carTypeRangeValueEls = this.setCarTypeRangeValueEls(types);
        this.dataSets = dataSets;
        this.setEventListeners(inputs, this.inputDomRefs, this.inputValues, this.carTypeRangeValueEls, this.dataSets);
        // Set initial values
        this.updateBatteryRanges(this.inputValues, this.carTypeRangeValueEls, this.dataSets);
    }
    setInputRefs(inputs) {
        return inputs.reduce((acc, input)=>{
            const targetEl = document.getElementById(input.id);
            if (targetEl === null) return acc;
            switch(input.type){
                case "number":
                    if (targetEl.nodeName === "INPUT" && targetEl.type === "number") acc[input.id] = targetEl;
                    break;
                case "checkbox":
                    if (targetEl.nodeName === "INPUT" && targetEl.type === "checkbox") acc[input.id] = targetEl;
                    break;
                case "radio":
                    if (targetEl.dataset.jsRangeCalculatorInputType === "radio") acc[input.id] = targetEl.querySelectorAll("input[type=radio]");
                    break;
                default:
                    console.warn(`Tried to handle input ${input.id} with type ${input.type} but was unable to`);
            }
            return acc;
        }, {});
    }
    setCarTypeRangeValueEls(carTypes) {
        return carTypes.reduce((acc, carType)=>{
            acc[carType] = document.querySelector(`[data-js-range-calculator-car-type="${carType}"] .value`);
            return acc;
        }, {});
    }
    constructInputValueObject(inputs) {
        return inputs.reduce((acc, input)=>{
            acc[input.id] = input.initialValue;
            return acc;
        }, {});
    }
    setEventListeners(inputs, inputDomRefs, inputValues, carTypeRangeValueEls, dataSets) {
        inputs.forEach((input)=>{
            this.setMainInputEventListeners(input, inputDomRefs, inputValues, carTypeRangeValueEls, dataSets);
            if (input.sideEffectEvents) this.setSideEffectEventListeners(input.sideEffectEvents);
        });
    }
    setSideEffectEventListeners(sideEffectEvents) {
        sideEffectEvents.forEach((sideEffectEvent)=>{
            this.rangeCalculatorEl.addEventListener(`${sideEffectEvent.listenFor}`, (event)=>{
                sideEffectEvent.sideEffectHandler(this, event);
            });
        });
    }
    setMainInputEventListeners(input, inputDomRefs, inputValues, carTypeRangeValueEls, dataSets) {
        switch(input.type){
            case "number":
                inputDomRefs[input.id].addEventListener("change", (event)=>{
                    inputValues[input.id] = Number(event.target.value);
                    this.updateBatteryRanges(inputValues, carTypeRangeValueEls, dataSets);
                    this.dispatchChangeEvent(input, inputValues);
                });
                break;
            case "checkbox":
                inputDomRefs[input.id].addEventListener("change", (event)=>{
                    inputValues[input.id] = event.target.checked;
                    this.updateBatteryRanges(inputValues, carTypeRangeValueEls, dataSets);
                    this.dispatchChangeEvent(input, inputValues);
                });
                break;
            case "radio":
                inputDomRefs[input.id].forEach((domRef)=>{
                    domRef.addEventListener("change", (event)=>{
                        inputValues[input.id] = event.target.value;
                        this.updateBatteryRanges(inputValues, carTypeRangeValueEls, dataSets);
                        this.dispatchChangeEvent(input, inputValues);
                    });
                });
                break;
            default:
                console.warn(`Tried to get value of input ${input.id} with type ${input.type}, but was unable to`);
                return;
        }
    }
    dispatchChangeEvent(input, inputValues) {
        this.rangeCalculatorEl.dispatchEvent(new CustomEvent(`${input.id}_changed`, {
            detail: {
                inputId: input.id,
                newValue: inputValues[input.id]
            }
        }));
    }
    updateBatteryRanges(inputValues, carTypeRangeValueEls, dataSets) {
        Object.keys(carTypeRangeValueEls).forEach((carTypeId)=>{
            carTypeRangeValueEls[carTypeId].innerText = this.retrieveBatteryRange(inputValues, dataSets[carTypeId]);
        });
    }
    retrieveBatteryRange(inputValues, batteryRangeObjects) {
        //todo: figure out whether the == comparison can be more strict.
        const batteryRangeObject = batteryRangeObjects.find((dataset)=>dataset.temp === inputValues.temperature && dataset.wheelsize == inputValues.wheelsize && (inputValues.ac && dataset.ac === "on" || !inputValues.ac && dataset.ac === "off"));
        if (!batteryRangeObject || !batteryRangeObject.hwy) {
            console.error("No matching hwy found");
            return null;
        }
        const speedEntry = batteryRangeObject.hwy.find((entry)=>entry.kmh === inputValues.speed);
        if (!speedEntry) {
            console.error("No matching speed entry found");
            return null;
        }
        return speedEntry.kilometers;
    }
    numberInputStepUp(input) {
        if (this.inputDomRefs[input]) {
            this.inputDomRefs[input].stepUp(1);
            this.inputDomRefs[input].dispatchEvent(new Event("change"));
            return;
        }
        console.warn(`${input} could not be found`);
    }
    numberInputStepdown(input) {
        if (this.inputDomRefs[input]) {
            this.inputDomRefs[input].stepDown(1);
            this.inputDomRefs[input].dispatchEvent(new Event("change"));
            return;
        }
        console.warn(`${input} could not be found`);
    }
}
exports.default = RangeCalculator;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || Object.prototype.hasOwnProperty.call(dest, key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}]},["6z0qx","1E7ZB"], "1E7ZB", "parcelRequire8ed1")

//# sourceMappingURL=index.a5535e9f.js.map

/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../eventcontainer/EventContainer.js":
/*!*******************************************!*\
  !*** ../eventcontainer/EventContainer.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nclass EventContainer {\r\n    constructor() {\r\n        this.eventMap = {};\r\n        this.deleted = false;\r\n    }\r\n    on(eventName, eventHandler) {\r\n        if (this.eventMap[eventName] === undefined) {\r\n            this.eventMap[eventName] = [];\r\n        }\r\n        this.eventMap[eventName].push(eventHandler);\r\n    }\r\n    pass(target, eventName) {\r\n        target.on(eventName, (...params) => this.fireEvent(eventName, ...params));\r\n    }\r\n    off(eventName, eventHandler) {\r\n        if (this.eventMap[eventName] !== undefined) {\r\n            const index = this.eventMap[eventName].indexOf(eventHandler);\r\n            if (index !== -1) {\r\n                this.eventMap[eventName].splice(index, 1);\r\n            }\r\n            if (this.eventMap[eventName].length === 0) {\r\n                delete this.eventMap[eventName];\r\n            }\r\n        }\r\n    }\r\n    async fireEvent(eventName, ...params) {\r\n        if (this.eventMap[eventName] !== undefined) {\r\n            for (const eventHandler of this.eventMap[eventName]) {\r\n                await eventHandler(...params);\r\n            }\r\n        }\r\n    }\r\n    delete() {\r\n        this.fireEvent(\"delete\");\r\n        this.eventMap = undefined;\r\n        this.deleted = true;\r\n    }\r\n}\r\nexports.default = EventContainer;\r\n\n\n//# sourceURL=webpack://@hanul/skynode/../eventcontainer/EventContainer.js?");

/***/ }),

/***/ "../skyutil/SkyUtil.js":
/*!*****************************!*\
  !*** ../skyutil/SkyUtil.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nclass SkyUtil {\r\n    static pull(array, ...removeList) {\r\n        for (const el of removeList) {\r\n            const index = array.indexOf(el);\r\n            if (index !== -1) {\r\n                array.splice(index, 1);\r\n            }\r\n        }\r\n    }\r\n    static insert(array, index, item) {\r\n        array.splice(index, 0, item);\r\n    }\r\n    static random(min, max) {\r\n        return Math.floor(Math.random() * (max - min + 1) + min);\r\n    }\r\n}\r\nexports.default = SkyUtil;\r\n\n\n//# sourceURL=webpack://@hanul/skynode/../skyutil/SkyUtil.js?");

/***/ }),

/***/ "../debouncer/Debouncer.ts":
/*!*********************************!*\
  !*** ../debouncer/Debouncer.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nclass Debouncer {\r\n    constructor(debounceTime, work) {\r\n        this.debounceTime = debounceTime;\r\n        this.work = work;\r\n    }\r\n    run() {\r\n        if (this.debounceTimeout !== undefined) {\r\n            clearTimeout(this.debounceTimeout);\r\n        }\r\n        this.debounceTimeout = setTimeout(() => {\r\n            this.work();\r\n        }, this.debounceTime);\r\n    }\r\n}\r\nexports.default = Debouncer;\r\n\n\n//# sourceURL=webpack://@hanul/skynode/../debouncer/Debouncer.ts?");

/***/ }),

/***/ "./src/BodyNode.ts":
/*!*************************!*\
  !*** ./src/BodyNode.ts ***!
  \*************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst DomNode_1 = __importDefault(__webpack_require__(/*! ./DomNode */ \"./src/DomNode.ts\"));\r\nclass BodyNode extends DomNode_1.default {\r\n    constructor() {\r\n        super(document.body);\r\n    }\r\n}\r\nexports.default = new BodyNode();\r\n\n\n//# sourceURL=webpack://@hanul/skynode/./src/BodyNode.ts?");

/***/ }),

/***/ "./src/DomNode.ts":
/*!************************!*\
  !*** ./src/DomNode.ts ***!
  \************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst skyutil_1 = __importDefault(__webpack_require__(/*! skyutil */ \"../skyutil/SkyUtil.js\"));\r\nconst SkyNode_1 = __importDefault(__webpack_require__(/*! ./SkyNode */ \"./src/SkyNode.ts\"));\r\nclass DomNode extends SkyNode_1.default {\r\n    constructor(domElement) {\r\n        super();\r\n        this.domElement = domElement;\r\n        this.children = [];\r\n        this.domEventMap = {};\r\n    }\r\n    style(style) {\r\n        for (const [key, value] of Object.entries(style)) {\r\n            if (typeof value === \"number\" && key !== \"zIndex\" && key !== \"opacity\") {\r\n                this.domElement.style[key] = `${value}px`;\r\n            }\r\n            else {\r\n                this.domElement.style[key] = value;\r\n            }\r\n        }\r\n    }\r\n    on(eventName, eventHandler) {\r\n        if (this.domEventMap[eventName] === undefined) {\r\n            this.domEventMap[eventName] = [];\r\n        }\r\n        const domEventHandler = (event) => eventHandler(event, this);\r\n        this.domEventMap[eventName].push({ eventHandler, domEventHandler });\r\n        this.domElement.addEventListener(eventName, domEventHandler);\r\n        super.on(eventName, eventHandler);\r\n    }\r\n    off(eventName, eventHandler) {\r\n        const domEvents = this.domEventMap[eventName];\r\n        if (domEvents !== undefined) {\r\n            const domEvent = domEvents.find((de) => de.eventHandler === eventHandler);\r\n            if (domEvent !== undefined) {\r\n                this.domElement.removeEventListener(eventName, domEvent.domEventHandler);\r\n                skyutil_1.default.pull(domEvents, domEvent);\r\n                if (domEvents.length === 0) {\r\n                    delete this.domEventMap[eventName];\r\n                }\r\n            }\r\n        }\r\n        super.off(eventName, eventHandler);\r\n    }\r\n    async fireEvent(eventName, ...params) {\r\n        this.domElement.dispatchEvent(new Event(eventName));\r\n        return super.fireEvent(eventName, ...params);\r\n    }\r\n    appendText(text) {\r\n        this.domElement.append(text);\r\n    }\r\n    appendTo(node, index) {\r\n        if (index !== undefined && index < node.children.length) {\r\n            node.domElement.insertBefore(this.domElement, node.children[index].domElement);\r\n        }\r\n        else {\r\n            node.domElement.append(this.domElement);\r\n        }\r\n        return super.appendTo(node, index);\r\n    }\r\n    exceptFromParent() {\r\n        if (this.parent !== undefined) {\r\n            this.parent.domElement.removeChild(this.domElement);\r\n        }\r\n        super.exceptFromParent();\r\n    }\r\n    delete() {\r\n        this.domEventMap = undefined;\r\n        super.delete();\r\n    }\r\n}\r\nexports.default = DomNode;\r\n\n\n//# sourceURL=webpack://@hanul/skynode/./src/DomNode.ts?");

/***/ }),

/***/ "./src/ScrollableDomNode.ts":
/*!**********************************!*\
  !*** ./src/ScrollableDomNode.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.ScrollItemDomNode = void 0;\r\nconst skyutil_1 = __importDefault(__webpack_require__(/*! skyutil */ \"../skyutil/SkyUtil.js\"));\r\nconst Debouncer_1 = __importDefault(__webpack_require__(/*! ../../debouncer/Debouncer */ \"../debouncer/Debouncer.ts\"));\r\nconst DomNode_1 = __importDefault(__webpack_require__(/*! ./DomNode */ \"./src/DomNode.ts\"));\r\nclass ScrollItemDomNode extends DomNode_1.default {\r\n}\r\nexports.ScrollItemDomNode = ScrollItemDomNode;\r\nclass ScrollableDomNode extends DomNode_1.default {\r\n    constructor(domElement, dataSet, options, createChild) {\r\n        super(domElement);\r\n        this.options = options;\r\n        this.createChild = createChild;\r\n        this.dataSet = [];\r\n        this.scrollAreaHeight = 0;\r\n        this.refresh = () => {\r\n            var _a, _b, _c;\r\n            const startTop = this.domElement.scrollTop;\r\n            const endTop = this.domElement.scrollTop + this.scrollAreaHeight;\r\n            let topPadding = 0;\r\n            let bottomPadding = 0;\r\n            let startIndex = -1;\r\n            let endIndex = -1;\r\n            let top = 0;\r\n            for (const [index, info] of this.dataSet.entries()) {\r\n                if (top + info.height < startTop) {\r\n                    topPadding += info.height;\r\n                }\r\n                else if (top > endTop) {\r\n                    bottomPadding += info.height;\r\n                }\r\n                else {\r\n                    if (startIndex === -1) {\r\n                        startIndex = index;\r\n                    }\r\n                    if (endIndex < index) {\r\n                        endIndex = index;\r\n                    }\r\n                    if (info.dom === undefined) {\r\n                        info.dom = this.createChild(info.data);\r\n                        info.dom.appendTo(this);\r\n                        info.height = info.dom.domElement.getBoundingClientRect().height;\r\n                    }\r\n                }\r\n                top += info.height;\r\n            }\r\n            this.bottomPaddingNode.exceptFromParent();\r\n            for (const [index, info] of this.dataSet.entries()) {\r\n                if (startIndex <= index && index <= endIndex) {\r\n                    (_a = info.dom) === null || _a === void 0 ? void 0 : _a.exceptFromParent();\r\n                    (_b = info.dom) === null || _b === void 0 ? void 0 : _b.appendTo(this);\r\n                }\r\n                else {\r\n                    (_c = info.dom) === null || _c === void 0 ? void 0 : _c.delete();\r\n                    delete info.dom;\r\n                }\r\n            }\r\n            this.topPaddingNode.domElement.style.height = `${topPadding}px`;\r\n            this.bottomPaddingNode.domElement.style.height = `${bottomPadding}px`;\r\n            this.bottomPaddingNode.appendTo(this);\r\n        };\r\n        this.calculateSize = () => {\r\n            this.scrollAreaHeight = this.domElement.clientHeight;\r\n            this.refresh();\r\n        };\r\n        this.resizeDebouncer = new Debouncer_1.default(100, () => this.calculateSize());\r\n        this.resizeHandler = () => this.resizeDebouncer.run();\r\n        for (const data of dataSet) {\r\n            this.dataSet.push({ data, height: options.baseChildHeight });\r\n        }\r\n        super.append(this.topPaddingNode = new DomNode_1.default(document.createElement(options.childTag)), this.bottomPaddingNode = new DomNode_1.default(document.createElement(options.childTag)));\r\n        this.domElement.style.overflowY = \"scroll\";\r\n        this.on(\"scroll\", this.refresh);\r\n        window.addEventListener(\"resize\", this.resizeHandler);\r\n    }\r\n    add(data, index) {\r\n        if (index !== undefined && index < this.dataSet.length) {\r\n            skyutil_1.default.insert(this.dataSet, index, { data, height: this.options.baseChildHeight });\r\n        }\r\n        else {\r\n            this.dataSet.push({ data, height: this.options.baseChildHeight });\r\n        }\r\n        this.refresh();\r\n    }\r\n    remove(data) {\r\n        const index = this.dataSet.findIndex((d) => d.data === data);\r\n        if (index !== -1) {\r\n            this.dataSet.splice(index, 1);\r\n            this.refresh();\r\n        }\r\n    }\r\n    appendTo(node, index) {\r\n        const that = super.appendTo(node, index);\r\n        this.calculateSize();\r\n        return that;\r\n    }\r\n    delete() {\r\n        window.removeEventListener(\"resize\", this.resizeHandler);\r\n        super.delete();\r\n    }\r\n}\r\nexports.default = ScrollableDomNode;\r\n\n\n//# sourceURL=webpack://@hanul/skynode/./src/ScrollableDomNode.ts?");

/***/ }),

/***/ "./src/SkyNode.ts":
/*!************************!*\
  !*** ./src/SkyNode.ts ***!
  \************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst eventcontainer_1 = __importDefault(__webpack_require__(/*! eventcontainer */ \"../eventcontainer/EventContainer.js\"));\r\nconst skyutil_1 = __importDefault(__webpack_require__(/*! skyutil */ \"../skyutil/SkyUtil.js\"));\r\nclass SkyNode extends eventcontainer_1.default {\r\n    constructor() {\r\n        super(...arguments);\r\n        this.children = [];\r\n    }\r\n    append(...nodes) {\r\n        for (const node of nodes) {\r\n            node.appendTo(this);\r\n        }\r\n    }\r\n    appendTo(node, index) {\r\n        if (this.parent === node && index !== undefined && index < this.parent.children.indexOf(this)) {\r\n            index -= 1;\r\n        }\r\n        this.exceptFromParent();\r\n        if (index !== undefined && index < node.children.length) {\r\n            node.children.splice(index, 0, this);\r\n        }\r\n        else {\r\n            node.children.push(this);\r\n        }\r\n        this.parent = node;\r\n        return this;\r\n    }\r\n    except(...nodes) {\r\n        for (const node of nodes) {\r\n            node.exceptFromParent();\r\n        }\r\n    }\r\n    exceptFromParent() {\r\n        if (this.parent !== undefined) {\r\n            skyutil_1.default.pull(this.parent.children, this);\r\n            this.parent = undefined;\r\n        }\r\n    }\r\n    empty() {\r\n        for (const child of this.children) {\r\n            child.delete();\r\n        }\r\n    }\r\n    delete() {\r\n        super.delete();\r\n        this.exceptFromParent();\r\n        this.empty();\r\n        this.children = undefined;\r\n    }\r\n}\r\nexports.default = SkyNode;\r\n\n\n//# sourceURL=webpack://@hanul/skynode/./src/SkyNode.ts?");

/***/ }),

/***/ "./test-src/scrollable-dom-node-test.ts":
/*!**********************************************!*\
  !*** ./test-src/scrollable-dom-node-test.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\r\n    if (k2 === undefined) k2 = k;\r\n    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });\r\n}) : (function(o, m, k, k2) {\r\n    if (k2 === undefined) k2 = k;\r\n    o[k2] = m[k];\r\n}));\r\nvar __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\r\n    Object.defineProperty(o, \"default\", { enumerable: true, value: v });\r\n}) : function(o, v) {\r\n    o[\"default\"] = v;\r\n});\r\nvar __importStar = (this && this.__importStar) || function (mod) {\r\n    if (mod && mod.__esModule) return mod;\r\n    var result = {};\r\n    if (mod != null) for (var k in mod) if (k !== \"default\" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);\r\n    __setModuleDefault(result, mod);\r\n    return result;\r\n};\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst BodyNode_1 = __importDefault(__webpack_require__(/*! ../src/BodyNode */ \"./src/BodyNode.ts\"));\r\nconst ScrollableDomNode_1 = __importStar(__webpack_require__(/*! ../src/ScrollableDomNode */ \"./src/ScrollableDomNode.ts\"));\r\nconst dataSet = [];\r\nfor (let i = 0; i < 100; i += 1) {\r\n    dataSet.push({\r\n        id: `id-${i}`,\r\n        name: `Test ${i}`,\r\n    });\r\n}\r\nclass TestItem extends ScrollableDomNode_1.ScrollItemDomNode {\r\n    constructor(_data) {\r\n        super(document.createElement(\"div\"));\r\n        this._data = _data;\r\n        this.appendText(_data.name);\r\n    }\r\n    get data() { return this._data; }\r\n}\r\nclass TestNode extends ScrollableDomNode_1.default {\r\n    constructor() {\r\n        super(document.createElement(\"div\"), dataSet, { childTag: \"div\", baseChildHeight: 24 }, (data) => new TestItem(data));\r\n        this.style({\r\n            position: \"absolute\",\r\n            width: \"100%\",\r\n            height: \"100%\",\r\n        });\r\n    }\r\n}\r\nBodyNode_1.default.append(new TestNode());\r\n\n\n//# sourceURL=webpack://@hanul/skynode/./test-src/scrollable-dom-node-test.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./test-src/scrollable-dom-node-test.ts");
/******/ 	
/******/ })()
;
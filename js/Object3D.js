"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * 3D物体
 * @class Object3D
 */
var Object3D = /*#__PURE__*/function () {
  /**
   * 初始化对象
   * @param {WebGL2RenderingContext|
   * WebGLRenderingContext} gl
   */
  function Object3D(gl) {
    _classCallCheck(this, Object3D);

    _defineProperty(this, "gl", void 0);

    _defineProperty(this, "isIndex", true);

    _defineProperty(this, "_index", 0);

    // 测试框架
    this.testGlMatrix();
    this.gl = gl;
    this.onload();
  }
  /**
   * Object3D 加载时调用
   */


  _createClass(Object3D, [{
    key: "index",
    get:
    /**
     * @type {WebGL2RenderingContext|
     * WebGLRenderingContext}
     */

    /**
     * 是否需要被排序
     * @type {boolean}
     */

    /**
     * 顺序
     * @type {number}
     * @private
     */

    /**
     * 绘制顺序
     */
    function get() {
      return this._index;
    },
    set: function set(e) {
      if (e !== this._index) {
        this._index = e;
        this.isIndex = true;
      }

      return this._index;
    }
    /**
     * 检测 gl-matrix 框架
     */

  }, {
    key: "testGlMatrix",
    value: function testGlMatrix() {
      if (!window.glMatrix) {
        console.error("Camera: glMatrix lib not found!");
      } else if (window.M !== window.glMatrix) {
        window.M = window.glMatrix;
      }
    }
  }, {
    key: "onload",
    value: function onload() {}
    /**
     * 每一帧绘制前调用
     * @param {Number} t
     */

  }, {
    key: "update",
    value: function update(t) {}
    /**
     * 绘制
     */

  }, {
    key: "draw",
    value: function draw() {}
  }]);

  return Object3D;
}();
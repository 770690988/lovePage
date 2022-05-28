"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @class Render
 * Copyright 2021-08-02 MrKBear mrkbear@qq.com
 * All rights reserved.
 * This file is part of the App project.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 */
var Render = /*#__PURE__*/function () {
  /**
   * @param {HTMLCanvasElement|HTMLElement|null} [canvas]
   */
  function Render(canvas) {
    _classCallCheck(this, Render);

    _defineProperty(this, "canvas", void 0);

    _defineProperty(this, "gl", void 0);

    _defineProperty(this, "glVersion", 0);

    _defineProperty(this, "isResize", true);

    _defineProperty(this, "isMouseDown", false);

    _defineProperty(this, "mouseX", 0);

    _defineProperty(this, "mouseY", 0);

    _defineProperty(this, "mouseUvX", 0);

    _defineProperty(this, "mouseUvY", 0);

    _defineProperty(this, "mouseGlX", 0);

    _defineProperty(this, "mouseGlY", 0);

    _defineProperty(this, "mouseMotionX", 0);

    _defineProperty(this, "mouseMotionY", 0);

    _defineProperty(this, "isMouseMove", false);

    _defineProperty(this, "cleanColor", [.92, .92, .92, 1.]);

    // 如果 canvas
    if (!(canvas instanceof HTMLCanvasElement)) {
      canvas = document.createElement("canvas");
    } // 保存画布节点


    this.canvas = canvas; // 获取上下文

    this.getContext(); // 开启自适应

    this.enableResize(); // 开启鼠标按下事件捕获

    this.enableMouseDown(); // 开启鼠标移动事件捕获

    this.enableMouseMove();
  }
  /**
   * 更新
   * @param {Number} t
   * 这里触发鼠标事件是为了对齐时钟
   */


  _createClass(Render, [{
    key: "width",
    get:
    /**
     * 绑定画布
     * @type {HTMLCanvasElement}
     */

    /**
     * webgl上下文
     * @type {WebGL2RenderingContext|WebGLRenderingContext}
     */

    /**
     * 帧缓冲区宽度
     * @type {Number}
     */
    function get() {
      return this.canvas.width;
    }
    /**
     * 帧缓冲区高度
     * @type {Number}
     */

  }, {
    key: "height",
    get: function get() {
      return this.canvas.height;
    }
    /**
     * 画布宽度
     * @type {Number}
     */

  }, {
    key: "offsetWidth",
    get: function get() {
      return this.canvas.offsetWidth;
    }
    /**
     * 画布高度
     * @type {Number}
     */

  }, {
    key: "offsetHeight",
    get: function get() {
      return this.canvas.offsetHeight;
    }
    /**
     * 缩放X
     * @type {Number}
     */

  }, {
    key: "scaleX",
    get: function get() {
      return this.width / this.offsetWidth;
    }
    /**
     * 缩放Y
     * @type {Number}
     */

  }, {
    key: "scaleY",
    get: function get() {
      return this.height / this.offsetHeight;
    }
    /**
     * 分辨率 (画布宽高比)
     * @type Number
     */

  }, {
    key: "ratio",
    get: function get() {
      return this.canvas.offsetWidth / this.canvas.offsetHeight;
    }
    /**
     * WebGL 版本
     * @type {Number}
     */

  }, {
    key: "getContext",
    value:
    /**
     * 获取上下文
     */
    function getContext() {
      // 尝试 webgl2
      this.gl = this.canvas.getContext("webgl2");

      if (this.gl) {
        this.glVersion = 2;
        console.log("Render: Using WebGL2 :)");
      } else {
        // 尝试 WebGL1
        this.gl = this.canvas.getContext("webgl");

        if (this.gl) {
          this.glVersion = 1;
          console.log("Render: Using WebGL1 :(");
        } // 获取失败发出警告
        else {
          console.error("Render: Not supported WebGL!");
        }
      }
    }
  }, {
    key: "update",
    value: function update(t) {
      // 自适应
      if (this.isResize) {
        this.isResize = false;
        this.resize();
      } // 鼠标按下


      if (this.isMouseDown) {
        this.onMouseDown();
      } // 鼠标按下


      if (this.isMouseMove) {
        this.isMouseMove = false;
        this.onMouseMove();
      }
    }
    /**
     * 鼠标按下时触发
     */

  }, {
    key: "onMouseDown",
    value: function onMouseDown() {}
    /**
     * 鼠标按下时触发
     */

  }, {
    key: "onMouseMove",
    value: function onMouseMove() {}
    /**
     * 当前帧是否进行自适应
     * @type {boolean}
     */

  }, {
    key: "resize",
    value:
    /**
     * 画布分辨率自适应
     */
    function resize() {
      this.windowResize();
    }
    /**
     * 窗口变换
     */

  }, {
    key: "windowResize",
    value: function windowResize() {
      this.canvas.width = this.offsetWidth;
      this.canvas.height = this.offsetHeight;
    }
    /**
     * 开启分辨率自适应
     */

  }, {
    key: "enableResize",
    value: function enableResize() {
      var _this = this;

      window.addEventListener("resize", function () {
        _this.isResize = true;

        _this.windowResize();
      });
    }
    /**
     * 鼠标按下
     * @type {Boolean}
     */

  }, {
    key: "enableMouseDown",
    value:
    /**
     * 开启捕获鼠标按下事件
     */
    function enableMouseDown() {
      var _this2 = this;

      this.canvas.addEventListener("mouseup", function () {
        _this2.isMouseDown = false;
      });
      this.canvas.addEventListener("mousedown", function () {
        _this2.isMouseDown = true;
      });
    }
    /**
     * 鼠标 X 坐标
     * @type {Number}
     */

  }, {
    key: "mouseMove",
    value: function mouseMove() {}
    /**
     * 开启捕获鼠标移动事件
     */

  }, {
    key: "enableMouseMove",
    value: function enableMouseMove() {
      var _this3 = this;

      this.canvas.addEventListener("mousemove", function (e) {
        _this3.isMouseMove = true;
        _this3.mouseX = e.offsetX;
        _this3.mouseY = e.offsetY;
        _this3.mouseUvX = e.offsetX / _this3.offsetWidth;
        _this3.mouseUvY = e.offsetY / _this3.offsetHeight;
        _this3.mouseGlX = _this3.mouseUvX * 2 - 1;
        _this3.mouseGlY = -_this3.mouseUvY * 2 + 1;
        _this3.mouseMotionX = e.movementX;
        _this3.mouseMotionY = e.movementY;

        _this3.mouseMove();
      });
    }
    /**
     * 清屏颜色
     * @type {Number[]}
     */

  }, {
    key: "clean",
    value:
    /**
     * 清屏
     */
    function clean() {
      this.gl.clearColor(this.cleanColor[0], this.cleanColor[1], this.cleanColor[2], this.cleanColor[3]);
      this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    }
  }]);

  return Render;
}();
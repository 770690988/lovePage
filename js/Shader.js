"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @class Shader
 * Copyright 2021-08-02 MrKBear mrkbear@qq.com
 * All rights reserved.
 * This file is part of the App project.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 */
var Shader = /*#__PURE__*/function () {
  /**
   * 创建编译 shader
   * @param {WebGL2RenderingContext|WebGLRenderingContext} gl
   */
  function Shader(gl) {
    _classCallCheck(this, Shader);

    _defineProperty(this, "gl", void 0);

    _defineProperty(this, "vertexShaderSource", "");

    _defineProperty(this, "fragmentShaderSource", "");

    _defineProperty(this, "vertexShader", void 0);

    _defineProperty(this, "fragmentShader", void 0);

    _defineProperty(this, "program", void 0);

    _defineProperty(this, "attribLocationCache", {});

    _defineProperty(this, "uniformLocationCache", {});

    this.gl = gl;
    this.onload();
  }
  /**
   * shader加载时调用
   */


  _createClass(Shader, [{
    key: "setSource",
    value:
    /**
     * @type {WebGL2RenderingContext|
     * WebGLRenderingContext}
     */

    /**
     * 顶点着色器源码
     * @type {string}
     */

    /**
     * 片段着色器源代码
     * @type {string}
     */

    /**
     * 顶点着色器
     * @type {WebGLShader}
     */

    /**
     * 片段着色器
     * @type {WebGLShader}
     */

    /**
     * 程序
     * @type {WebGLProgram}
     */

    /**
     * 设置源代码
     * @param {string} ver
     * @param {string} frag
     */
    function setSource(ver, frag) {
      this.vertexShaderSource = ver.replace(/^\s+/, "");
      this.fragmentShaderSource = frag.replace(/^\s+/, "");
      return this;
    }
    /**
     * 编译
     */

  }, {
    key: "compile",
    value: function compile() {
      // 创建程序
      this.program = this.gl.createProgram(); // 创建顶点着色器

      this.vertexShader = this.gl.createShader(this.gl.VERTEX_SHADER); // 创建片段着色器

      this.fragmentShader = this.gl.createShader(this.gl.FRAGMENT_SHADER); // 绑定源代码

      this.gl.shaderSource(this.vertexShader, this.vertexShaderSource);
      this.gl.shaderSource(this.fragmentShader, this.fragmentShaderSource); // 编译

      this.gl.compileShader(this.vertexShader);
      this.gl.compileShader(this.fragmentShader); // 检测编译错误

      if (!this.gl.getShaderParameter(this.vertexShader, this.gl.COMPILE_STATUS)) {
        console.error("vertex:\r\n" + this.gl.getShaderInfoLog(this.vertexShader));
      }

      if (!this.gl.getShaderParameter(this.fragmentShader, this.gl.COMPILE_STATUS)) {
        console.error("fragment:\r\n" + this.gl.getShaderInfoLog(this.fragmentShader));
      } // 附加到程序


      this.gl.attachShader(this.program, this.vertexShader);
      this.gl.attachShader(this.program, this.fragmentShader); // 连接程序

      this.gl.linkProgram(this.program); // 检测链接错误

      if (!this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS)) {
        console.error("link:\r\n" + this.gl.getProgramInfoLog(this.program));
      }

      return this;
    }
  }, {
    key: "onload",
    value: function onload() {}
    /**
     * 使用程序
     */

  }, {
    key: "use",
    value: function use() {
      this.gl.useProgram(this.program);
      return this;
    }
    /**
     * attrib 位置缓存
     * @type {{}}
     */

  }, {
    key: "attribLocate",
    value:
    /**
     * 获取 attribLocation
     * @param {String} attr
     * @return {GLint}
     */
    function attribLocate(attr) {
      // 获取缓存
      var cache = this.attribLocationCache[attr]; // 缓存搜索

      if (cache === undefined || cache === -1) {
        cache = this.gl.getAttribLocation(this.program, attr);
        if (cache === -1) console.error("attrib: can not get locate of " + attr);
        this.attribLocationCache[attr] = cache;
        return cache;
      } // 搜索到返回
      else return cache;
    }
    /**
     * 获取 UniformLocation
     * @param {String} uni
     * @return {WebGLUniformLocation}
     */

  }, {
    key: "uniformLocate",
    value: function uniformLocate(uni) {
      // 获取缓存
      var cache = this.uniformLocationCache[uni]; // 缓存搜索

      if (cache === undefined || cache === -1) {
        cache = this.gl.getUniformLocation(this.program, uni);
        if (cache === -1) console.error("uniform: can not get locate of " + uni);
        this.uniformLocationCache[uni] = cache;
        return cache;
      } // 搜索到返回
      else return cache;
    }
    /**
     * 启用顶点 attr
     * @param {string} attr
     */

  }, {
    key: "enableAttrib",
    value: function enableAttrib(attr) {
      // 获取缓存
      var locate = this.attribLocationCache[attr]; // 缓存搜索

      if (locate === undefined || locate === -1) {
        locate = this.gl.getAttribLocation(this.program, attr);
        if (locate === -1) console.error("enableAttrib: can not get locate of " + attr);
        this.attribLocationCache[attr] = locate;
      }

      this.gl.enableVertexAttribArray(locate);
    }
  }]);

  return Shader;
}();
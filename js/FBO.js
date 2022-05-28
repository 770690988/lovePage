"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var FBO = /*#__PURE__*/function () {
  /**
   * 初始化对象
   * @param {WebGL2RenderingContext|
   * WebGLRenderingContext} gl
   */
  function FBO(gl) {
    _classCallCheck(this, FBO);

    _defineProperty(this, "gl", void 0);

    _defineProperty(this, "shader", void 0);

    _defineProperty(this, "MsLvl", 1);

    this.gl = gl;
    this.onload();
  }
  /**
   * 绘制使用的 uniform
   */


  _createClass(FBO, [{
    key: "setShader",
    value:
    /**
     * @type {WebGL2RenderingContext|
     * WebGLRenderingContext}
     */

    /**
     * @type {Shader|BasicsShader}
     */

    /**
     * @param {Shader} shader
     */
    function setShader(shader) {
      this.shader = shader;
      return this;
    }
    /**
     * 坐标轴数据
     */

  }, {
    key: "uniform",
    value: function uniform() {}
    /**
     * 绘制立方体
     */

  }, {
    key: "draw",
    value: function draw(x, y) {
      // 使用程序
      this.shader.use(); // 绑定缓冲区

      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer); // 启动指针传递

      this.shader.enableAttrib("vPos");
      this.shader.enableAttrib("uvx"); // 指定指针数据

      this.gl.vertexAttribPointer(this.shader.attribLocate("vPos"), 3, this.gl.FLOAT, false, 5 * 4, 0);
      this.gl.vertexAttribPointer(this.shader.attribLocate("uvx"), 2, this.gl.FLOAT, false, 5 * 4, 3 * 4);
      this.gl.activeTexture(this.gl.TEXTURE1);
      this.gl.bindTexture(this.gl.TEXTURE_2D, this.colorBuffer);
      this.uniform();
      this.gl.uniform1i(this.shader.uniformLocate("color"), 1);
      this.gl.uniform2f(this.shader.uniformLocate("iResolution"), x, y);
      this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
    }
  }, {
    key: "onload",
    value: function onload() {
      // 创建缓冲区
      this.vertexBuffer = this.gl.createBuffer(); // 绑定缓冲区

      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);
      this.gl.bufferData(this.gl.ARRAY_BUFFER, FBO.VER_DATA, this.gl.STATIC_DRAW); // 创建fbo

      this.fbo = this.gl.createFramebuffer();
      this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.fbo);
      this.depthBuffer = this.gl.createRenderbuffer();
      this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, this.depthBuffer);
      this.gl.renderbufferStorage(this.gl.RENDERBUFFER, this.gl.DEPTH_COMPONENT16, 10, 10);
      this.gl.framebufferRenderbuffer(this.gl.FRAMEBUFFER, this.gl.DEPTH_ATTACHMENT, this.gl.RENDERBUFFER, this.depthBuffer);
      this.colorBuffer = this.gl.createTexture();
      this.gl.bindTexture(this.gl.TEXTURE_2D, this.colorBuffer);
      this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, 10, 10, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, null);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE); // this.gl.generateMipmap(this.gl.TEXTURE_2D);

      this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE_2D, this.colorBuffer, 0);
      this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, null);
      this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
      this.gl.bindTexture(this.gl.TEXTURE_2D, null);
    }
  }, {
    key: "resize",
    value: function resize(w, h) {
      this.width = w;
      this.height = h;
      this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, this.depthBuffer);
      this.gl.renderbufferStorage(this.gl.RENDERBUFFER, this.gl.DEPTH_COMPONENT16, this.width * this.MsLvl, this.height * this.MsLvl);
      this.gl.bindTexture(this.gl.TEXTURE_2D, this.colorBuffer);
      this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.width * this.MsLvl, this.height * this.MsLvl, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, null);
      this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
      this.gl.bindTexture(this.gl.TEXTURE_2D, null);
    }
  }, {
    key: "bind",
    value: function bind() {
      this.gl.viewport(0, 0, this.width * this.MsLvl, this.height * this.MsLvl);
      this.gl.bindFramebuffer(render.gl.FRAMEBUFFER, this.fbo);
    }
  }]);

  return FBO;
}();

_defineProperty(FBO, "VER_DATA", new Float32Array([-1, 1, 0, 0, 1, -1, -1, 0, 0, 0, 1, -1, 0, 1, 0, -1, 1, 0, 0, 1, 1, -1, 0, 1, 0, 1, 1, 0, 1, 1]));
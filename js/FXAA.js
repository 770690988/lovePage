"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * ???????????? Shader
 * @class BasicsShader
 */
var FXAA = /*#__PURE__*/function (_Shader) {
  _inherits(FXAA, _Shader);

  var _super = _createSuper(FXAA);

  function FXAA() {
    _classCallCheck(this, FXAA);

    return _super.apply(this, arguments);
  }

  _createClass(FXAA, [{
    key: "onload",
    value:
    /**
     * @override
     */
    function onload() {
      var texcoords = "\n        //To save 9 dependent texture reads, you can compute\n        //these in the vertex shader and use the optimized\n        //frag.glsl function in your frag shader. \n        \n        //This is best suited for mobile devices, like iOS.\n        \n        void texcoords(vec2 fragCoord, vec2 resolution,\n                out vec2 v_rgbNW, out vec2 v_rgbNE,\n                out vec2 v_rgbSW, out vec2 v_rgbSE,\n                out vec2 v_rgbM) {\n            vec2 inverseVP = 1.0 / resolution.xy;\n            v_rgbNW = (fragCoord + vec2(-1.0, -1.0)) * inverseVP;\n            v_rgbNE = (fragCoord + vec2(1.0, -1.0)) * inverseVP;\n            v_rgbSW = (fragCoord + vec2(-1.0, 1.0)) * inverseVP;\n            v_rgbSE = (fragCoord + vec2(1.0, 1.0)) * inverseVP;\n            v_rgbM = vec2(fragCoord * inverseVP);\n        }\n        ";
      var fxaa = "\n        /**\n        Basic FXAA implementation based on the code on geeks3d.com with the\n        modification that the texture2DLod stuff was removed since it's\n        unsupported by WebGL.\n        \n        --\n        \n        From:\n        https://github.com/mitsuhiko/webgl-meincraft\n        \n        Copyright (c) 2011 by Armin Ronacher.\n        \n        Some rights reserved.\n        \n        Redistribution and use in source and binary forms, with or without\n        modification, are permitted provided that the following conditions are\n        met:\n        \n            * Redistributions of source code must retain the above copyright\n              notice, this list of conditions and the following disclaimer.\n        \n            * Redistributions in binary form must reproduce the above\n              copyright notice, this list of conditions and the following\n              disclaimer in the documentation and/or other materials provided\n              with the distribution.\n        \n            * The names of the contributors may not be used to endorse or\n              promote products derived from this software without specific\n              prior written permission.\n        \n        THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS\n        \"AS IS\" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT\n        LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR\n        A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT\n        OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,\n        SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT\n        LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,\n        DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY\n        THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT\n        (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE\n        OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.\n        */\n        \n        #ifndef FXAA_REDUCE_MIN\n            #define FXAA_REDUCE_MIN   (1.0/ 128.0)\n        #endif\n        #ifndef FXAA_REDUCE_MUL\n            #define FXAA_REDUCE_MUL   (1.0 / 8.0)\n        #endif\n        #ifndef FXAA_SPAN_MAX\n            #define FXAA_SPAN_MAX     8.0\n        #endif\n        \n        //optimized version for mobile, where dependent \n        //texture reads can be a bottleneck\n        vec4 fxaa(sampler2D tex, vec2 fragCoord, vec2 resolution,\n                    vec2 v_rgbNW, vec2 v_rgbNE, \n                    vec2 v_rgbSW, vec2 v_rgbSE, \n                    vec2 v_rgbM) {\n            vec4 color;\n            mediump vec2 inverseVP = vec2(1.0 / resolution.x, 1.0 / resolution.y);\n            vec3 rgbNW = texture2D(tex, v_rgbNW).xyz;\n            vec3 rgbNE = texture2D(tex, v_rgbNE).xyz;\n            vec3 rgbSW = texture2D(tex, v_rgbSW).xyz;\n            vec3 rgbSE = texture2D(tex, v_rgbSE).xyz;\n            vec4 texColor = texture2D(tex, v_rgbM);\n            vec3 rgbM  = texColor.xyz;\n            vec3 luma = vec3(0.299, 0.587, 0.114);\n            float lumaNW = dot(rgbNW, luma);\n            float lumaNE = dot(rgbNE, luma);\n            float lumaSW = dot(rgbSW, luma);\n            float lumaSE = dot(rgbSE, luma);\n            float lumaM  = dot(rgbM,  luma);\n            float lumaMin = min(lumaM, min(min(lumaNW, lumaNE), min(lumaSW, lumaSE)));\n            float lumaMax = max(lumaM, max(max(lumaNW, lumaNE), max(lumaSW, lumaSE)));\n            \n            mediump vec2 dir;\n            dir.x = -((lumaNW + lumaNE) - (lumaSW + lumaSE));\n            dir.y =  ((lumaNW + lumaSW) - (lumaNE + lumaSE));\n            \n            float dirReduce = max((lumaNW + lumaNE + lumaSW + lumaSE) *\n                                  (0.25 * FXAA_REDUCE_MUL), FXAA_REDUCE_MIN);\n            \n            float rcpDirMin = 1.0 / (min(abs(dir.x), abs(dir.y)) + dirReduce);\n            dir = min(vec2(FXAA_SPAN_MAX, FXAA_SPAN_MAX),\n                      max(vec2(-FXAA_SPAN_MAX, -FXAA_SPAN_MAX),\n                      dir * rcpDirMin)) * inverseVP;\n            \n            vec3 rgbA = 0.5 * (\n                texture2D(tex, fragCoord * inverseVP + dir * (1.0 / 3.0 - 0.5)).xyz +\n                texture2D(tex, fragCoord * inverseVP + dir * (2.0 / 3.0 - 0.5)).xyz);\n            vec3 rgbB = rgbA * 0.5 + 0.25 * (\n                texture2D(tex, fragCoord * inverseVP + dir * -0.5).xyz +\n                texture2D(tex, fragCoord * inverseVP + dir * 0.5).xyz);\n        \n            float lumaB = dot(rgbB, luma);\n            if ((lumaB < lumaMin) || (lumaB > lumaMax))\n                color = vec4(rgbA, texColor.a);\n            else\n                color = vec4(rgbB, texColor.a);\n            return color;\n        }\n        "; // ????????????

      var vertex = "\n        attribute vec3 vPos;\n        attribute vec2 uvx;\n        \n        uniform vec2 iResolution;\n        \n        varying vec2 uv;\n        \n        varying vec2 v_rgbNW;\n        varying vec2 v_rgbNE;\n        varying vec2 v_rgbSW;\n        varying vec2 v_rgbSE;\n        varying vec2 v_rgbM;\n        varying vec2 fResolution;\n        \n        " + texcoords + "\n\n        void main(){\n            fResolution = iResolution;\n            gl_Position = vec4(vPos, 1.);\n            vec2 fragCoord = uvx * iResolution;\n            uv = uvx;\n            texcoords(fragCoord, iResolution, v_rgbNW, v_rgbNE, v_rgbSW, v_rgbSE, v_rgbM);\n        }\n        "; // ????????????

      var fragment = "\n        precision lowp float;\n        \n        varying vec2 uv;\n        \n        varying vec2 v_rgbNW;\n        varying vec2 v_rgbNE;\n        varying vec2 v_rgbSW;\n        varying vec2 v_rgbSE;\n        varying vec2 v_rgbM;\n        \n        varying vec2 fResolution;\n        \n        uniform sampler2D color;\n        \n        uniform int fxaaOn;\n        \n        " + fxaa + "\n    \n        void main(){\n        \n            mediump vec2 fragCoord = uv * fResolution;\n            \n            vec4 colortex;\n            \n            if (fxaaOn == 1){\n                colortex = fxaa(color, fragCoord, \n                    fResolution, v_rgbNW, v_rgbNE, v_rgbSW, v_rgbSE, v_rgbM);\n            } else {\n                colortex = texture2D(color, uv);\n            }\n            \n            gl_FragColor = colortex;\n        }\n        "; // ????????????

      this.setSource(vertex, fragment); // ??????

      this.compile();
    }
  }]);

  return FXAA;
}(Shader);
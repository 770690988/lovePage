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
 * 基础绘制 Shader
 * @class BasicsShader
 */
var FX = /*#__PURE__*/function (_Shader) {
  _inherits(FX, _Shader);

  var _super = _createSuper(FX);

  function FX() {
    _classCallCheck(this, FX);

    return _super.apply(this, arguments);
  }

  _createClass(FX, [{
    key: "onload",
    value:
    /**
     * @override
     */
    function onload() {
      // 顶点着色
      var vertex = "\n        attribute vec3 vPos;\n        attribute vec2 uvx;\n        \n        uniform vec2 iResolution;\n        varying vec2 fResolution;\n        varying vec2 uv;\n\n        void main(){\n            fResolution = iResolution;\n            gl_Position = vec4(vPos, 1.);\n            uv = uvx;\n        }\n        "; // 片段着色

      var fragment = "\n        precision lowp float;\n        \n        varying vec2 uv;\n        \n        varying vec2 fResolution;\n        \n        uniform sampler2D color;\n        uniform float glitchPowerR;\n        uniform float darkPowerR;\n       \n        void main(){\n            \n            vec4 colortex;\n            colortex = texture2D(color, uv);\n            \n            vec2 dirUv = uv - vec2(.5);\n            float power = length(dirUv);\n            \n            float glitchPower = pow(power * .01 * glitchPowerR, 1.15);\n            \n            float colorR = texture2D(color, uv - dirUv * glitchPower * 0. / power).r;\n            float colorG = texture2D(color, uv - dirUv * glitchPower * 1. / power).g;\n            float colorB = texture2D(color, uv - dirUv * glitchPower * 2. / power).b;\n            \n            colortex.rgb = vec3(colorR, colorG, colorB);\n            \n            float darkPower = pow(power * darkPowerR, 1.8);\n            colortex.rgb = mix(colortex.rgb, vec3(0.), darkPower);\n            \n            gl_FragColor = colortex;\n        }\n        "; // 保存代码

      this.setSource(vertex, fragment); // 编译

      this.compile();
    }
  }]);

  return FX;
}(Shader);
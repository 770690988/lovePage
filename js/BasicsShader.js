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
var BasicsShader = /*#__PURE__*/function (_Shader) {
  _inherits(BasicsShader, _Shader);

  var _super = _createSuper(BasicsShader);

  function BasicsShader() {
    _classCallCheck(this, BasicsShader);

    return _super.apply(this, arguments);
  }

  _createClass(BasicsShader, [{
    key: "onload",
    value:
    /**
     * @override
     */
    function onload() {
      // 顶点着色
      var vertex = "\n        attribute vec3 vPos;\n        \n        uniform vec3 r;\n        uniform mat4 mvp;\n        uniform vec3 pos;\n\n        void main(){\n            gl_Position = mvp * vec4(vPos * r + pos, 1.);\n        }\n        "; // 片段着色

      var fragment = "\n        precision lowp float;\n        \n        uniform vec3 color;\n    \n        void main(){\n            gl_FragColor = vec4(color, 1.);\n        }\n        "; // 保存代码

      this.setSource(vertex, fragment); // 编译

      this.compile(); // 开启顶点传递

      this.enableAttrib("vPos");
    }
    /**
     * 传递半径数据
     * @param {vec3|Number[]} r
     */

  }, {
    key: "r",
    value: function r(_r) {
      this.gl.uniform3fv(this.uniformLocate("r"), _r);
      return this;
    }
    /**
     * 坐标
     * @param {vec3|Number[]} r
     */

  }, {
    key: "pos",
    value: function pos(r) {
      this.gl.uniform3fv(this.uniformLocate("pos"), r);
      return this;
    }
    /**
     * 传递半径数据
     * @param {mat4} mat
     * @param {Boolean} [transpose=false]
     */

  }, {
    key: "mvp",
    value: function mvp(mat) {
      var transpose = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      this.gl.uniformMatrix4fv(this.uniformLocate("mvp"), transpose, mat);
      return this;
    }
    /**
     * 传递半径数据
     * @param {vec3|Number[]} rgb
     */

  }, {
    key: "color",
    value: function color(rgb) {
      this.gl.uniform3fv(this.uniformLocate("color"), rgb);
    }
  }]);

  return BasicsShader;
}(Shader);
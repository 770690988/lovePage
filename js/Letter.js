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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Letter = /*#__PURE__*/function (_Object3D) {
  _inherits(Letter, _Object3D);

  var _super = _createSuper(Letter);

  function Letter(gl, data) {
    var _this;

    _classCallCheck(this, Letter);

    _this = _super.call(this, gl);

    _defineProperty(_assertThisInitialized(_this), "shader", void 0);

    _defineProperty(_assertThisInitialized(_this), "vecData", void 0);

    _defineProperty(_assertThisInitialized(_this), "randomTick", 0);

    _defineProperty(_assertThisInitialized(_this), "af", 0);

    _defineProperty(_assertThisInitialized(_this), "f", [0, 0, 0]);

    _defineProperty(_assertThisInitialized(_this), "a", [0, 0, 0]);

    _defineProperty(_assertThisInitialized(_this), "v", [0, 0, 0]);

    _defineProperty(_assertThisInitialized(_this), "pos", [0, 0, 0]);

    _defineProperty(_assertThisInitialized(_this), "center", [0, 0, 0]);

    _defineProperty(_assertThisInitialized(_this), "r", [.1, .1, .1]);

    _defineProperty(_assertThisInitialized(_this), "rt", [.11, .11, .11]);

    _this.vecData = data;

    _this.init(); // ?????????????????????


    _this.center[0] = _this.vecData.pos * .12; // ????????????

    _this.pos[0] = _this.vecData.pos * .12 + (Math.random() - .5) * .1;
    _this.pos[1] = (Math.random() - .5) * .1;
    _this.pos[2] = (Math.random() - .5) * .1;
    return _this;
  }

  _createClass(Letter, [{
    key: "setShader",
    value:
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
     * @type {LetterBitMap}
     */

  }, {
    key: "init",
    value: function init() {
      // ???????????????
      this.vertexBuffer = this.gl.createBuffer(); // ???????????????

      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);
      this.gl.bufferData(this.gl.ARRAY_BUFFER, this.vecData.map, this.gl.STATIC_DRAW);
    }
    /**
     * ????????????
     * @param {Number[]} vec ????????????
     * @param {Number} num ?????????
     * @return {Number} ??????
     */

  }, {
    key: "limit",
    value: function limit(vec, num) {
      // ??????????????????
      var len = num === undefined ? Math.pow(Math.pow(vec[0], 2) + Math.pow(vec[1], 2) + Math.pow(vec[2], 2), .5) : num; // ????????????

      if (len > num) {
        vec[0] = vec[0] * num / len;
        vec[1] = vec[1] * num / len;
        vec[2] = vec[2] * num / len;
      }

      return len;
    }
    /**
     * render.mouseF
     * @param {Number} t
     * @param {Number} r
     * @param {Number} m
     * @param {Number} c
     * @param {Number} acf
     */

  }, {
    key: "update",
    value: function update(t) {
      var r = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var m = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
      var c = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
      var acf = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
      // return this.pos[1] = this.af;
      // ???????????????
      this.a[0] = this.center[0] - this.pos[0];
      this.a[1] = this.center[1] - this.pos[1];
      this.a[2] = this.center[2] - this.pos[2]; // ?????????????????????

      var centerF = Math.pow(Math.pow(this.a[0], 2) + Math.pow(this.a[1], 2) + Math.pow(this.a[2], 2), .5);
      centerF = Math.pow(centerF * 12.1 * c, 1.1);
      this.a[0] = this.a[0] * centerF;
      this.a[1] = this.a[1] * centerF;
      this.a[2] = this.a[2] * centerF; // ???????????????

      this.randomTick -= t; // ???????????????

      var randomF = 5.4 * r; // ???????????????

      if (this.randomTick <= 0) {
        this.randomTick = .5 + Math.random() * 3;
        this.a[0] += (Math.random() - .5) * randomF;
        this.a[1] += (Math.random() - .5) * randomF;
        this.a[2] += (Math.random() - .5) * randomF;
      } // ?????????????????????


      if (this.af) {
        // this.a[0] += (Math.random() - .5) * this.af * acf;
        this.a[1] += this.af * acf; // this.a[2] += (Math.random() - .5) * this.af * acf;

        this.af = 0;
      } // ????????????


      this.a[0] += this.f[0];
      this.a[1] += this.f[1]; // this.a[2] += this.f[2];
      // ????????????

      var mui = 1.73 * m; // ??????????????????

      var vLen = Math.pow(Math.pow(this.v[0], 2) + Math.pow(this.v[1], 2) + Math.pow(this.v[2], 2), .5); // ??????????????????

      this.a[0] -= this.v[0] * vLen * mui;
      this.a[1] -= this.v[1] * vLen * mui;
      this.a[2] -= this.v[2] * vLen * mui; // ????????????

      this.limit(this.a, 1);
      this.limit(this.v, 1); // ??????????????????

      this.v[0] += this.a[0] * t;
      this.v[1] += this.a[1] * t;
      this.v[2] += this.a[2] * t; // ???????????????

      this.pos[0] += this.v[0] * t;
      this.pos[1] += this.v[1] * t;
      this.pos[2] += this.v[2] * t; // ??????Z?????????

      if (this.pos[2] < -1) this.pos[2] = -1;
    }
    /**
     * ????????????
     * @param {Number} x
     * @param {Number} y
     * @param {Number} z
     * @param {Number} [f]
     */

  }, {
    key: "move",
    value: function move(x, y, z) {
      var f = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
      // ??????????????????
      this.f[0] = this.pos[0] - x;
      this.f[1] = this.pos[1] - y;
      this.f[2] = this.pos[2] - z; // ??????????????????

      var fp = Math.pow(Math.pow(this.f[0], 2) + Math.pow(this.f[1], 2) + Math.pow(this.f[2], 2), .5);
      var fz = fp;
      var pMax = .65; // ??????????????????

      if (fz > pMax) fz = pMax;
      fz = Math.pow((pMax - fz) * 5.4 * f / pMax, 2);
      this.f[0] = this.f[0] * fz / fp;
      this.f[1] = this.f[1] * fz / fp;
      this.f[2] = this.f[2] * fz / fp;
    }
    /**
     * ?????? tick
     * @type {number}
     */

  }, {
    key: "kill",
    value:
    /**
     * ???????????????
     */
    function kill() {
      this.gl.deleteBuffer(this.vertexBuffer);
    }
    /**
     * ???????????????
     * @param {Camera} camera
     * @param {Number[]} bg
     * @param {Number} power
     */

  }, {
    key: "draw",
    value: function draw(camera, bg, power) {
      // ????????????
      this.shader.use(); // ???????????????

      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer); // ??????????????????

      this.shader.enableAttrib("vPos"); // ??????????????????

      this.gl.vertexAttribPointer(this.shader.attribLocate("vPos"), 3, this.gl.FLOAT, false, 0, 0); // mvp????????????

      this.shader.mvp(camera.transformMat); // ????????????

      this.shader.r(this.r); // ????????????

      this.shader.pos(this.pos); // ????????????

      this.shader.color(this.vecData.color); // ????????????

      this.gl.drawArrays(this.gl.TRIANGLES, 0, this.vecData.len * 3 * 2); // ????????????

      this.shader.r(this.rt); // ????????????

      this.shader.color([bg[0] * power, bg[1] * power, bg[2] * power]); // ????????????

      this.shader.pos([this.pos[0], this.pos[1], -1.01]); // ????????????

      this.gl.drawArrays(this.gl.TRIANGLES, 0, this.vecData.len * 3 * 2);
    }
  }]);

  return Letter;
}(Object3D);
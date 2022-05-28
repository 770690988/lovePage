"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Sadness = /*#__PURE__*/function (_Render) {
  _inherits(Sadness, _Render);

  var _super = _createSuper(Sadness);

  /**
   * @type {Camera}
   */

  /**
   * @type {BasicsShader}
   */

  /**
   * 文字
   * @type {Letter[]}
   */
  function Sadness() {
    var _this;

    _classCallCheck(this, Sadness);

    _this = _super.call(this); // 建立摄像机

    _defineProperty(_assertThisInitialized(_this), "camera", void 0);

    _defineProperty(_assertThisInitialized(_this), "basicsShader", void 0);

    _defineProperty(_assertThisInitialized(_this), "letters", []);

    _defineProperty(_assertThisInitialized(_this), "bgPower", .8);

    _defineProperty(_assertThisInitialized(_this), "randomF", 1);

    _defineProperty(_assertThisInitialized(_this), "mui", 1);

    _defineProperty(_assertThisInitialized(_this), "centerF", 1);

    _defineProperty(_assertThisInitialized(_this), "af", 1000);

    _defineProperty(_assertThisInitialized(_this), "rayPoint", [0, 0, 0]);

    _defineProperty(_assertThisInitialized(_this), "mouseF", 1.);

    _defineProperty(_assertThisInitialized(_this), "mouseLook", [0, 0]);

    _defineProperty(_assertThisInitialized(_this), "cameraRRange", 10);

    _defineProperty(_assertThisInitialized(_this), "cameraRSmooth", .1);

    _this.camera = new Camera(); // 基础测试 shader

    _this.basicsShader = new BasicsShader(_this.gl); // 开启深度测试

    _this.gl.enable(_this.gl.DEPTH_TEST);

    _this.cleanColor = [.22, .22, .22, 1.];
    _this.camera.range = 0.8;
    _this.camera.eye[2] = 10; // 创建效果器

    _this.fx = new FX(_this.gl); // 初始化 fbo FX

    _this.fboFx = new FBO(_this.gl).setShader(_this.fx);
    _this.fboFx.MsLvl = 2; // 设置效果器参数

    _this.fboFx.glitchPowerR = 1;
    _this.fboFx.darkPowerR = 1;

    _this.fboFx.uniform = function () {
      // 色散系数
      _this.gl.uniform1f(_this.fx.uniformLocate("glitchPowerR"), _this.fboFx.glitchPowerR); // 暗角系数


      _this.gl.uniform1f(_this.fx.uniformLocate("darkPowerR"), _this.fboFx.darkPowerR);
    }; // 创建效果器


    _this.fxaa = new FXAA(_this.gl); // 初始化 fbo FX

    _this.fboFxaa = new FBO(_this.gl).setShader(_this.fxaa); // 设置FXAA开关

    _this.fboFxaa.fxaaOn = 1;

    _this.fboFxaa.uniform = function () {
      // fxaa 开关
      _this.gl.uniform1i(_this.fxaa.uniformLocate("fxaaOn"), _this.fboFxaa.fxaaOn);
    };

    return _this;
  }
  /**
   * 实例化全部文字
   * @param {LetterBitMap[]} ld
   */


  _createClass(Sadness, [{
    key: "setText",
    value: function setText(ld) {
      // 释放全部缓冲区
      for (var i = 0; i < this.letters.length; i++) {
        this.letters[i].kill();
      } // 释放全部 letters 对象


      this.letters = []; // 实例化所有文字

      for (var _i = 0; _i < ld.length; _i++) {
        this.letters.push(new Letter(this.gl, ld[_i]).setShader(this.basicsShader));
      }
    }
    /**
     * 背景颜色深浅
     */

  }, {
    key: "drawAllLetters",
    value:
    /**
     * 绘制全部字母
     */
    function drawAllLetters() {
      // return this.letters[0].draw(camera);
      for (var i = 0; i < this.letters.length; i++) {
        this.letters[i].draw(this.camera, this.cleanColor, this.bgPower);
      }
    }
    /**
     * 随机力大小
     * @type {number}
     */

  }, {
    key: "applyForce",
    value:
    /**
     *
     * @param arr {Number[]}
     */
    function applyForce(arr) {
      var focusArr = []; // 够分配?

      var il = arr.length > this.letters.length; // 处理够分配情况

      if (il) {
        // 计算该单元需要分配采样的个数
        var sn = Math.floor(arr.length / this.letters.length); // 计算分配剩余个数

        var sm = arr.length % this.letters.length;

        for (var i = 0; i < this.letters.length; i++) {
          // 是否分配剩余配额
          var isf = i < sm ? 1 : 0; // 求和

          var sum = 0;

          for (var j = 0; j < sn + isf; j++) {
            sum += Math.min(arr[i * sn + j + Math.min(i, sm)], 1);
          }

          focusArr.push(sum / (sn + isf));
        }
      } // 处理不够分配情况
      else {
        // 计算该单元需要分配采样的个数
        var _sn = this.letters.length / arr.length;

        for (var _i2 = 0; _i2 < this.letters.length; _i2++) {
          focusArr.push(Math.min(arr[Math.floor(_i2 / _sn)]), 1);
        }
      } // 施加作用力


      for (var _i3 = 0; _i3 < this.letters.length; _i3++) {
        this.letters[_i3].af = focusArr[_i3];
      }
    }
    /**
     * 更新全部字母
     * @param {Number} t
     */

  }, {
    key: "updateAllLetters",
    value: function updateAllLetters(t) {
      // return this.letters[0].draw(camera);
      for (var i = 0; i < this.letters.length; i++) {
        this.letters[i].update(t, this.randomF, this.mui, this.centerF, this.af);
      }
    } // 射线追踪使用的临时变量

  }, {
    key: "ctrlCamera",
    value:
    /**
     * 控制摄像机
     */
    function ctrlCamera() {
      this.mouseLook[0] += (this.mouseGlX - this.mouseLook[0]) * this.cameraRSmooth;
      this.mouseLook[1] += (this.mouseGlY - this.mouseLook[1]) * this.cameraRSmooth;
      this.camera.angleX = this.mouseLook[0] * this.cameraRRange + 90;
      this.camera.angleY = -this.mouseLook[1] * this.cameraRRange;
      this.camera.setEyeFromAngle();
    }
    /**
     * 师表移动事件
     */

  }, {
    key: "mouseMove",
    value: function mouseMove() {
      // 移动摄像机 (仅仅调试使用)
      // if (this.isMouseDown)
      // this.camera.ctrl(this.mouseMotionX, this.mouseMotionY);
      // 传递给字母鼠标射线
      var _this$camera$rayTrack = this.camera.rayTrack(this.mouseGlX, this.mouseGlY, this.scaleX, this.scaleY),
          _this$camera$rayTrack2 = _slicedToArray(_this$camera$rayTrack, 2),
          o = _this$camera$rayTrack2[0],
          p = _this$camera$rayTrack2[1]; // 计算击中位置


      this.camera.intersectionLineXYPlant(this.rayPoint, o, p); // 传递鼠标移动事件

      for (var i = 0; i < this.letters.length; i++) {
        this.letters[i].move(this.rayPoint[0], this.rayPoint[1], this.rayPoint[2], this.mouseF);
      }
    }
  }, {
    key: "resize",
    value: function resize() {
      _get(_getPrototypeOf(Sadness.prototype), "resize", this).call(this);

      this.fboFx.resize(this.width, this.height);
      this.fboFxaa.resize(this.width, this.height);
    }
  }]);

  return Sadness;
}(Render);
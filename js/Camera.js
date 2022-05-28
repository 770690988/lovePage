"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @class Camera
 * Copyright 2021-08-02 MrKBear mrkbear@qq.com
 * All rights reserved.
 * This file is part of the App project.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 */
var Camera = /*#__PURE__*/function () {
  /**
   * 构造函数设置初始值
   */
  function Camera() {
    _classCallCheck(this, Camera);

    _defineProperty(this, "eye", null);

    _defineProperty(this, "target", null);

    _defineProperty(this, "up", null);

    _defineProperty(this, "range", Math.PI / 9);

    _defineProperty(this, "ratio", 1.);

    _defineProperty(this, "nearFar", null);

    _defineProperty(this, "viewMat", null);

    _defineProperty(this, "projectionMat", null);

    _defineProperty(this, "transformMat", null);

    _defineProperty(this, "transformNMat", null);

    _defineProperty(this, "angleX", 90);

    _defineProperty(this, "angleY", 0);

    _defineProperty(this, "sensitivity", .5);

    _defineProperty(this, "EL", 1e-5);

    // 测试框架
    this.testGlMatrix(); // 设置全部参数的初始值

    this.eye = M.vec3.create();
    this.target = M.vec3.create();
    this.up = M.vec3.create();
    this.nearFar = M.vec2.create();
    this.viewMat = M.mat4.create();
    this.projectionMat = M.mat4.create();
    this.transformMat = M.mat4.create();
    this.transformNMat = M.mat4.create();
    this.tempRotateAxis = M.vec3.create();
    this.tempRotate = M.quat.create(); // 设置视点初始值

    M.vec3.set(this.eye, 0., 0., 10.); // 设置向上方向

    M.vec3.set(this.up, 0., 1., 0.); // 设置进远平面

    M.vec2.set(this.nearFar, 1, 1000.); // 射线追踪临时变量

    this.tempRayP = M.vec3.create();
    this.tempRayO = M.vec3.create();
  }
  /**
   * 生成变换需要的全部矩阵
   * @type {Number} [ratio=1.]
   */


  _createClass(Camera, [{
    key: "testGlMatrix",
    value:
    /**
     * 视点
     * @type {vec3}
     */

    /**
     * 目标
     * @type {vec3}
     */

    /**
     * 镜头旋转方向
     * @type {vec3}
     */

    /**
     * 视野大小
     * @type Number
     */

    /**
     * 画布宽高比例
     * @type {number}
     */

    /**
     * 进远平面距离
     * @type {vec2}
     */

    /**
     * 观察者矩阵
     * @type {mat4}
     */

    /**
     * 观察者矩阵
     * @type {mat4}
     */

    /**
     * 变换矩阵
     * @type {mat4}
     */

    /**
     * 逆变换矩阵
     * @type {mat4}
     */

    /**
     * 检测 gl-matrix 框架
     */
    function testGlMatrix() {
      if (!window.glMatrix) {
        console.error("Camera: glMatrix lib not found!");
      } else if (window.M !== window.glMatrix) {
        window.M = window.glMatrix;
      }
    }
  }, {
    key: "generateMat",
    value: function generateMat() {
      var ratio = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1.;
      // 更新 ratio
      this.ratio = ratio; // 更新观察者矩阵

      M.mat4.lookAt(this.viewMat, this.eye, this.target, this.up); // 更新投影矩阵

      M.mat4.perspective(this.projectionMat, this.range, this.ratio, this.nearFar[0], this.nearFar[1]); // 更新变换矩阵

      M.mat4.multiply(this.transformMat, this.projectionMat, this.viewMat); // 计算逆矩阵

      M.mat4.invert(this.transformNMat, this.transformMat);
    }
    /**
     * X 轴旋转角度
     * [0 - 360)
     * @type {number}
     */

  }, {
    key: "setEyeFromAngle",
    value:
    /**
     * 通过角度设置视点
     */
    function setEyeFromAngle() {
      // 平移至原点
      M.vec3.sub(this.eye, this.eye, this.target); // 计算视点距离

      var dis = M.vec3.length(this.eye); // 计算方向角

      var anDir = M.vec3.create(); // 设置水平旋转坐标

      var dx = Math.cos(this.angleX * Math.PI / 180);
      var dz = Math.sin(this.angleX * Math.PI / 180); // 计算垂直旋转坐标

      var dv = Math.cos(this.angleY * Math.PI / 180);
      var dy = Math.sin(this.angleY * Math.PI / 180); // 合成

      M.vec3.set(anDir, dx * dv * dis, dy * dis, dz * dv * dis); // 赋值

      M.vec3.copy(this.eye, anDir); // 平移回视点

      M.vec3.add(this.eye, this.eye, this.target);
    }
    /**
     * 获取当前视距
     */

  }, {
    key: "getEyeDis",
    value: function getEyeDis() {
      var eyeDir = [this.eye[0] - this.target[0], this.eye[1] - this.target[1], this.eye[2] - this.target[2]];
      return Math.pow(Math.pow(eyeDir[0], 2) + Math.pow(eyeDir[1], 2) + Math.pow(eyeDir[2], 2), .5);
    }
    /**
     * 通过距离设置视点
     * @param {Number} dis
     */

  }, {
    key: "setEyeFromDis",
    value: function setEyeFromDis(dis) {
      var eyeDir = [this.eye[0] - this.target[0], this.eye[1] - this.target[1], this.eye[2] - this.target[2]];
      var d = Math.pow(Math.pow(eyeDir[0], 2) + Math.pow(eyeDir[1], 2) + Math.pow(eyeDir[2], 2), .5);
      this.eye[0] = this.target[0] + eyeDir[0] * dis / d;
      this.eye[1] = this.target[1] + eyeDir[1] * dis / d;
      this.eye[2] = this.target[2] + eyeDir[2] * dis / d;
      return dis;
    }
    /**
     * 控制灵敏度
     * @type {Number}
     */

  }, {
    key: "ctrl",
    value:
    /**
     * 摄像机控制函数
     * @param {Number} x
     * @param {Number} y
     */
    function ctrl(x, y) {
      this.angleX += x * this.sensitivity;
      this.angleY += y * this.sensitivity;
      if (this.angleX > 360) this.angleX = 0;
      if (this.angleX < 0) this.angleX = 360;
      if (this.angleY > 90) this.angleY = 90;
      if (this.angleY < -90) this.angleY = -90;
      this.setEyeFromAngle();
    }
    /**
     * 旧版的摄像机控制函数
     * 已弃用
     * 可能导致万向节死锁
     * @deprecated
     * @param {Number} x
     * @param {Number} y
     */

  }, {
    key: "ctrlOld",
    value: function ctrlOld(x, y) {
      // 平移至原点
      M.vec3.sub(this.eye, this.eye, this.target); // 先绕 Y 轴旋转

      M.vec3.rotateY(this.eye, this.eye, this.up, -x / 100); // 计算旋转轴

      M.vec3.set(this.tempRotateAxis, this.eye[0], 0, this.eye[2]);
      M.vec3.rotateY(this.tempRotateAxis, this.tempRotateAxis, this.up, Math.PI / 2); // 计算旋转四元数

      M.quat.setAxisAngle(this.tempRotate, this.tempRotateAxis, -y / 1000); // 应用变换

      M.vec3.transformQuat(this.eye, this.eye, this.tempRotate); // 平移回视点

      M.vec3.add(this.eye, this.eye, this.target);
    }
    /**
     * 射线追踪
     * @param {Number} x
     * @param {Number} y
     * @param {Number} [sx=1]
     * @param {Number} [sy=1]
     */

  }, {
    key: "rayTrack",
    value: function rayTrack(x, y) {
      var sx = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
      var sy = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
      // 逆变换
      M.vec3.set(this.tempRayP, x * sx, y * sy, 1);
      M.vec3.transformMat4(this.tempRayP, this.tempRayP, this.transformNMat);
      M.vec3.set(this.tempRayO, x * sx, y * sy, 0);
      M.vec3.transformMat4(this.tempRayO, this.tempRayO, this.transformNMat);
      M.vec3.sub(this.tempRayP, this.tempRayP, this.tempRayO);
      M.vec3.normalize(this.tempRayP, this.tempRayP);
      return [this.tempRayO, this.tempRayP];
    }
    /**
     * 缩放坐标（不支持整数操作，因为整数操作比例计算时会失去小数部分，使比例不正确）
     *
     * @param srcMin 原域最小值
     * @param srcMax 原域最大值
     * @param dstMin 新域最小值
     * @param dstMax 新域最大值
     * @param x      坐标数组
     * @return 新坐标
     */

  }, {
    key: "axis",
    value: function axis(srcMin, srcMax, dstMin, dstMax) {
      if ((arguments.length <= 4 ? 0 : arguments.length - 4) === 0) {
        return null;
      } // 假想的摄像机坐标范围


      var mathRange = srcMax - srcMin; // 显示器的尺寸范围

      var displayRange = dstMax - dstMin; // 两个范围相除就是两个坐标系的缩放比例

      var slope = displayRange / mathRange;
      var ret = new Array(arguments.length <= 4 ? 0 : arguments.length - 4);

      for (var i = 0; i < (arguments.length <= 4 ? 0 : arguments.length - 4); ++i) {
        // 减去缩放中心的坐标，就变成相对缩放中心的临时坐标
        var relativeSrc = (i + 4 < 4 || arguments.length <= i + 4 ? undefined : arguments[i + 4]) - srcMin; // 相对缩放中心进行缩放

        var relativeDst = relativeSrc * slope; // 最后加上显示器的缩放中心坐标

        ret[i] = relativeDst + dstMin;
      }

      return ret;
    }
    /**
     * 平面与直线的交点
     *
     * @param plantA
     * @param plantB
     * @param plantC
     * @param lineD
     * @param lineE
     * @return
     */

  }, {
    key: "getCrossPointOfPlaneAndLine3D",
    value: function getCrossPointOfPlaneAndLine3D(plantA, plantB, plantC, lineD, lineE) {
      // ∵点A，点B，点C在平面ABC上
      // ∴向量AB和向量AC在平面ABC上
      var arrowAB = M.vec3.create();
      var arrowAC = M.vec3.create();
      M.vec3.sub(arrowAB, plantA, plantB);
      M.vec3.sub(arrowAC, plantA, plantC); // 由AB和AC可以计算出平面ABC的法向量plantSide

      var plantSide = M.vec3.create();
      M.vec3.cross(plantSide, arrowAB, arrowAC); // 若法向量长度为0，则点A点B点C在同一直线上，不能确定平面

      if (Math.sqrt(M.vec3.dot(plantSide, plantSide)) === 0) {
        // 面积为0，平面向量不可用
        console.error("getCrossPointOfPlaneAndLine3D: " + "Parallel vectors cannot be used to locate planes");
      } // 三棱锥ABCD的体积的3倍为向量AB×AC·AD


      var arrowAD = M.vec3.create();
      M.vec3.sub(arrowAD, plantA, lineD);
      var volumeD = M.vec3.dot(plantSide, arrowAD); // 此步之前已证明底面积不为0，若体积为0，则D点在平面ABC上

      if (volumeD === 0) {
        return lineD;
      } // 三棱锥ABCE的体积的3倍为向量AB×AC·AE


      var arrowAE = M.vec3.create();
      M.vec3.sub(arrowAE, plantA, lineE);
      var volumeE = M.vec3.dot(plantSide, arrowAE); // 此步之前已证明底面积不为0，若体积为0，则E点在平面ABC上

      if (volumeE === 0) {
        return lineE;
      } // ABCD与ABCE体积相等，说明D与E到平面的距离相等，且在同一侧，即线段与平面平行


      if (volumeD === volumeE) {
        // 直线与平面平行
        return null;
      } // 若直线DE与平面ABC不平行，则必能在直线DE上找到一点F，使三棱锥ABCF的体积为0，点F即直线DE与平面ABC的交点


      var ans = new Array(3);

      for (var i = 0; i < ans.length; ++i) {
        // 坐标缩放和移动，先把原始坐标减原始坐标系缩放中心的坐标，得到相对缩放中心坐标，再按缩放比例(volumeD-volumeE):(lineD的坐标-lineE的坐标)缩放到目标坐标系的相对缩放中心坐标，再加上目标坐标系的缩放中心坐标，就能把原坐标系的坐标线性映射到目标坐标系。此步相当于普通的一元一次函数。这一步将得到直线上0体积的点的坐标。
        ans[i] = this.axis(volumeD, volumeE, lineD[i], lineE[i], 0)[0];
      }

      return ans;
    }
    /**
     * 计算射线与平面焦点
     * @param {Number[]} P for point P(intersection)
     * @param {Number[]} P1 for P1
     * @param {Number[]} nor for P2
     * @param {Number[]} coeffi a,b,c,d for the plane
     */

  }, {
    key: "intersectionLinePlane",
    value: function intersectionLinePlane(P, P1, nor, coeffi) {
      var num = coeffi[3] + coeffi[0] * P1[0] + coeffi[1] * P1[1] + coeffi[2] * P1[2];
      var den = coeffi[0] * nor[0] + coeffi[1] * nor[1] + coeffi[2] * nor[2];

      if (Math.abs(den) < 1e-5) {
        // parallel
        return false;
      }

      var n = num / den;

      for (var i = 0; i < 3; i++) {
        P[i] = P1[i] + n * nor[i];
      }

      return true;
    }
    /**
     * @param {Number[]} y in
     * @param {Number[]} o 射线原点
     * @param {Number[]} p 射线方向
     */

  }, {
    key: "intersectionLineXYPlant",
    value: function intersectionLineXYPlant(y, o, p) {
      var d = Math.abs(p[2]);
      var D = Math.abs(o[2]); // 限制 d

      if (d < this.EL) d = this.EL;
      var len = D / d;
      y[0] = o[0] + p[0] * len;
      y[1] = o[1] + p[1] * len;
      y[2] = o[2] + p[2] * len;
    }
  }]);

  return Camera;
}();
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @class Clock
 * Copyright 2021-08-02 MrKBear mrkbear@qq.com
 * All rights reserved.
 * This file is part of the App project.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 */
var Clock = /*#__PURE__*/function () {
  /**
   * 动画循环
   * @param {Function} fn
   */
  function Clock(fn) {
    _classCallCheck(this, Clock);

    _defineProperty(this, "allTime", 0);

    _defineProperty(this, "speed", 1);

    _defineProperty(this, "stats", null);

    _defineProperty(this, "isStatsOn", false);

    _defineProperty(this, "fps", 0);

    _defineProperty(this, "fpsThreshold", 0);

    _defineProperty(this, "fn", null);

    this.fn = fn;
  }

  _createClass(Clock, [{
    key: "useStats",
    value:
    /**
     * 总用时
     * @type {number}
     */

    /**
     * 速率
     * @type {number}
     */

    /**
     * fps监视器
     * @type {Stats}
     */

    /**
     * 是否使用 Stats
     * @type {boolean}
     */

    /**
     * 开启 fps 监视
     * @param {Stats} stats
     */
    function useStats(stats) {
      this.isStatsOn = true;
      this.stats = stats;
      this.stats.showPanel(0);
      document.body.appendChild(this.stats.dom);
      return this;
    }
  }, {
    key: "run",
    value:
    /**
     * 开始
     */
    function run() {
      var _this = this;

      // 主循环
      var loop = function loop(t) {
        // 继续循环
        requestAnimationFrame(loop); // if (this.isStatsOn) this.stats.begin();
        // 时差

        var dur = (t - _this.allTime) * _this.speed / 1000; // fps 限制

        if (_this.fps > 0) {
          _this.fpsThreshold += dur;

          if (_this.fpsThreshold < 1.0 / _this.fps) {
            return;
          }

          _this.fpsThreshold -= 1.0 / _this.fps;
        } // 检测由于失焦导致的丢帧


        if (t - _this.allTime < 100) {
          _this.fn(dur);
        } // 更新时间


        _this.allTime = t; // if (this.isStatsOn) this.stats.end();
      }; // 获取时间


      this.allTime = performance.now(); // 开启循环

      requestAnimationFrame(loop);
    }
    /**
     * 主函数
     * @type {Function}
     */

  }]);

  return Clock;
}();
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var LetterData = /*#__PURE__*/function () {
  /**
   * 离屏画布
   * @type {HTMLCanvasElement}
   */

  /**
   * 画布上下文
   * @type {CanvasRenderingContext2D}
   */

  /**
   * @type {HTMLFontElement}
   */

  /**
   * 构造
   * @param {HTMLCanvasElement} [canvas]
   */
  function LetterData(canvas) {
    _classCallCheck(this, LetterData);

    _defineProperty(this, "canvas", void 0);

    _defineProperty(this, "ctx", void 0);

    _defineProperty(this, "font", void 0);

    _defineProperty(this, "fontName", void 0);

    _defineProperty(this, "spaceTester", /\s/);

    // 设定画布
    if (canvas instanceof HTMLCanvasElement) {
      this.canvas = canvas;
    } else {
      this.canvas = document.createElement("canvas");
    } // 获取上下文


    this.ctx = this.canvas.getContext("2d");
  }
  /**
   * 字体名称
   * @type {String}
   */


  _createClass(LetterData, [{
    key: "loadText",
    value:
    /**
     * 加载字体
     * @param {String} name 名字
     * @param {String} url 链接
     * @param {Number} [time=1] 超时时间
     */
    function loadText(name, url) {
      var _this = this;

      var time = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 156;
      // 记录名称
      this.fontName = name; // 检查是否支持 FontFace API

      if (window.FontFace && document.fonts) {
        // 使用实验功能加载字体
        new FontFace(name, 'url("' + url + '")').load().then(function (w) {
          // 加载成功
          document.fonts.add(w);
          console.log("LetterData: Font Loading success by FontFace API !!!");

          _this.onFrontLoad();
        })["catch"](function (e) {
          console.error("LetterData: Font Loading failed by FontFace API :( \r\n" + e);
          throw e;
        });
      } // 不支持的话 监听器触发
      else {
        // 手动创建样式节点
        var newStyle = document.createElement('style');
        newStyle.appendChild(document.createTextNode("\n                @font-face {\n                    font-family: \"" + name + "\";\n                    src: url(\"" + url + "\");\n                }\n            ")); // 添加样式表

        document.head.appendChild(newStyle); // 创建一个字体用来引导加载字体

        var div = document.createElement("span"); // 隐藏这个字体

        div.innerHTML = "18";
        div.style.color = "rgba(255, 255, 255, 0)";
        div.style.display = "inline-block";
        div.style.position = "absolute";
        div.style.top = "-100px"; // 添加文字

        document.body.appendChild(div); // 记录初始宽高

        var o = [div.offsetWidth, div.offsetHeight]; // 诱导加载字体

        div.style.fontFamily = name; // 轮询监听字体加载

        var loop = function loop(t) {
          if (div.offsetWidth === o[0] && div.offsetHeight === o[1]) {
            // 加载超时
            if (t > time) {
              console.error("LetterData: Font Loading failed by Dom API :(");
            } else {
              // 还未加载，继续轮询
              setTimeout(loop.bind(_this, t + 1), 100);
            }
          } else {
            // 加载成功
            console.log("LetterData: Font Loading success by Dom API !!!");

            _this.onFrontLoad();
          }
        }; // 开启轮询


        setTimeout(loop.bind(this, 0), 100);
      }
    }
    /**
     * 监听字体加载
     */

  }, {
    key: "onFrontLoad",
    value: function onFrontLoad() {}
    /**
     * 清除画布
     */

  }, {
    key: "clear",
    value: function clear() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      return this;
    }
    /**
     * 绘制文字
     * @param text {String}
     */

  }, {
    key: "drawText",
    value: function drawText(text) {
      this.ctx.textBaseline = "top";
      this.ctx.font = this.canvas.width + "px " + this.fontName;
      this.ctx.fillText(text, 0, 0);
    }
    /**
     *
     */

  }, {
    key: "getImageData",
    value: function getImageData() {
      return this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    }
    /**
     * 设置分辨率
     * @param {Number} r
     * @return {LetterData}
     */

  }, {
    key: "setRatio",
    value: function setRatio(r) {
      this.canvas.width = r;
      this.canvas.height = r;
      return this;
    }
    /**
     * 图像 bitmap
     * @typedef LetterBitMap
     * @property {Number[]|Float32Array} map
     * @property {Number} width
     * @property {Number} height
     * @property {Number} len
     * @property {Number} [pos=0]
     * @property {Number[]} color
     */

    /**
     * 获取图像点阵数据
     * @param image {ImageData}
     * @return {LetterBitMap}
     */

  }, {
    key: "getLetterMap",
    value: function getLetterMap(image) {
      // 采样参数
      var sampleWidth = 12,
          sampleHeight = 12; // 计算长度

      var len = 0; // 采样数据

      var data = new Array(sampleWidth * sampleHeight);

      for (var i = 0; i < sampleWidth; i++) {
        for (var j = 0; j < sampleHeight; j++) {
          // 计算采样点
          var x = Math.floor((i + .5) * image.width / sampleWidth);
          var y = Math.floor((j + .5) * image.height / sampleHeight); // 采样距离

          var d = y * image.width * 4 + x * 4 + 3;
          var m = j * sampleWidth + i; // 获取图像值

          var l = image.data[d] > 127.5 ? 1 : 0;
          if (l) len++;
          data[m] = l;
        }
      }

      return {
        map: data,
        width: sampleWidth,
        height: sampleHeight,
        len: len,
        color: [0, 0, 0]
      };
    }
    /**
     * 剪裁并缝合
     * @param {LetterBitMap} map
     * @return {LetterBitMap}
     */

  }, {
    key: "tailorMap",
    value: function tailorMap(map) {
      var left = 0;
      var right = map.width - 1; // 从左侧扫描

      for (var i = 0; i < map.width; i++) {
        // 记录当前边界
        left = i;
        var leftBond = false; // 左侧边界

        for (var j = 0; j < map.height; j++) {
          if (map.map[j * map.width + i]) leftBond = true;
        } // 如果检测到边界 返回


        if (leftBond) break;
      } // 从右侧扫描


      for (var _i = map.width - 1; _i >= 0; _i--) {
        // 记录当前边界
        right = _i;
        var rightBond = false; // 左侧边界

        for (var _j = 0; _j < map.height; _j++) {
          if (map.map[_j * map.width + _i]) rightBond = true;
        } // 如果检测到边界 返回


        if (rightBond) break;
      } // 计算新的宽度


      var clipWidth = right - left + 1; // 新建 map

      var clip = new Array(map.height * clipWidth); // 裁剪bitmap

      for (var _i2 = left; _i2 <= right; _i2++) {
        for (var _j2 = 0; _j2 < map.height; _j2++) {
          clip[_j2 * clipWidth + _i2 - left] = map.map[_j2 * map.width + _i2];
        }
      } // 替换值


      map.map = clip;
      map.width = clipWidth;
      return map;
    }
    /**
     * 转换为顶点坐标
     * @param {LetterBitMap} map
     * @return {LetterBitMap}
     */

  }, {
    key: "toVec",
    value: function toVec(map) {
      // 顶点坐标
      var vec = []; // 计算中心点坐标

      var cx = map.width / 2;
      var cy = map.height / 2; // 生成三角形

      for (var i = 0; i < map.width; i++) {
        for (var j = 0; j < map.height; j++) {
          if (map.map[j * map.width + i]) {
            // 计算顶点坐标
            var p1x = i - cx,
                p1y = j - cy;
            var p2x = i + 1 - cx,
                p2y = j - cy;
            var p3x = i + 1 - cx,
                p3y = j + 1 - cy;
            var p4x = i - cx,
                p4y = j + 1 - cy; // 推入第一个三角形数据

            vec.push(p1x);
            vec.push(p1y);
            vec.push(p4x);
            vec.push(p4y);
            vec.push(p3x);
            vec.push(p3y); // 推入第二个三角形

            vec.push(p1x);
            vec.push(p1y);
            vec.push(p3x);
            vec.push(p3y);
            vec.push(p2x);
            vec.push(p2y);
          }
        }
      } // 记录顶点数据


      map.map = vec;
      return map;
    }
    /**
     * 克隆并转转换为 3d vec
     * @param {LetterBitMap} map
     * @param {Number} [r=1]
     * @param {Number} [g=1]
     * @param {Number} [b=1]
     * @return {LetterBitMap}
     */

  }, {
    key: "clone",
    value: function clone(map, r, g, b) {
      // 创建新的顶点数据表
      var d = new Float32Array(map.len * 3 * 3 * 2); // 计算顶点个数

      var pointNum = map.len * 3 * 2; // 遍历顶点

      for (var i = 0; i < pointNum; i++) {
        d[i * 3] = map.map[i * 2];
        d[i * 3 + 1] = -map.map[i * 2 + 1];
        d[i * 3 + 2] = 0;
      }

      return {
        map: d,
        height: map.height,
        width: map.width,
        len: map.len,
        color: [r === undefined ? map.color[0] : r, g === undefined ? map.color[1] : g, b === undefined ? map.color[2] : b]
      };
    }
    /**
     * 空格检测
     * @type {RegExp}
     */

  }, {
    key: "getCharVecData",
    value:
    /**
     * 获取一个字符的顶点数据
     * @param {String} char
     * @param {Number} [r=1]
     * @param {Number} [g=1]
     * @param {Number} [b=1]
     * @return {LetterBitMap}
     */
    function getCharVecData(_char, r, g, b) {
      // 截取第一个字符
      _char = _char[0]; // 如果是空白字符跳过采样

      if (this.spaceTester.test(_char)) {
        return {
          map: [],
          width: 1,
          height: 12,
          len: 0,
          color: [0, 0, 0]
        };
      } // 清屏


      this.clear(); // 绘制字符

      this.drawText(_char); // 获取图像数据

      var data = this.getImageData(); // 计算 bitmap

      var f = this.getLetterMap(data); // 检测是否是空白 宽度默认为 6

      if (f.len === 0) {
        f.map = [];
        f.width = 1;
        return f;
      } // 剪裁 bitmap


      f = this.tailorMap(f); // 计算顶点数据

      f = this.toVec(f); // 设置顶点颜色

      return this.clone(f, r, g, b);
    }
    /**
     * 将颜色值限制在 0-255
     * @param {Number} c
     * @return {Number}
     */

  }, {
    key: "colorClamp",
    value: function colorClamp(c) {
      if (c > 255) return 255;
      if (c < 0) return 0;
      return c;
    }
    /**
     * 解析标题数据
     * @param {String} cmd
     * @return {LetterBitMap[]}
     */

  }, {
    key: "parseTitleStr",
    value: function parseTitleStr(cmd) {
      var _this2 = this;

      // 匹配全部颜色
      var colorStr = cmd.match(/\(\d+,\d+,\d+\)/g);
      if (colorStr === null) colorStr = [];
      /**
       * @type {{
       *     index: Number,
       *     val: Number[],
       *     len: Number
       * }[]}
       */

      var color = [];
      var fc = []; // 搜索颜色所在位置 并解析颜色值

      for (var i = 0; i < colorStr.length; i++) {
        // 搜索坐标
        var d = cmd.indexOf(colorStr[i]); // 检查前面有 "\\" 放弃这个颜色

        if (cmd[d - 1] === "\\") {
          fc.push(d - 1);
          continue;
        } // 删除 "()" 并分裂 计算颜色


        var cf = colorStr[i].replace("(", "").replace(")", "").split(",").map(function (v) {
          return _this2.colorClamp(v / 1) / 255;
        }); // 记录数据

        color.push({
          index: d,
          val: cf,
          len: colorStr[i].length
        });
      } // 全部字符数据


      var charData = [];
      var tempData = []; // 遍历字符串生成颜色数据

      for (var _i3 = 0; _i3 < cmd.length; _i3++) {
        // 记录临时变量
        var _char2 = cmd[_i3];
        var jump = 0;
        var con = false; // 如果是颜色则搜索颜色表

        if (_char2 === "(") for (var j = 0; j < color.length; j++) {
          // 是颜色
          if (_i3 === color[j].index) {
            jump = color[j].len;
            charData.push({
              "char": tempData,
              color: color[j].val
            });
            tempData = [];
          }
        } // 如果是反斜杠则检测是否被排除
        else if (_char2 === "\\") for (var _j3 = 0; _j3 < fc.length; _j3++) {
          // 如果被排除则则放弃展示
          if (_i3 === fc[_j3]) con = true;
        } // 检测到颜色

        if (jump > 0) {
          _i3 += jump - 1;
        } else if (!con) {
          tempData.push(_char2);
        }
      } // 没有颜色使用默认颜色


      charData.push({
        "char": tempData,
        color: [.9, .9, .9]
      });
      var map = []; // 生成全部字符的顶点数据

      for (var _i4 = 0; _i4 < charData.length; _i4++) {
        for (var _j4 = 0; _j4 < charData[_i4]["char"].length; _j4++) {
          map.push(this.getCharVecData(charData[_i4]["char"][_j4], charData[_i4].color[0], charData[_i4].color[1], charData[_i4].color[2]));
        }
      }

      return map;
    }
    /**
     * 解析并获取全部数据
     * @param {LetterBitMap[]} maps
     * @return {*}
     */

  }, {
    key: "getAllData",
    value: function getAllData(maps) {
      // 计算间隙长度
      var w = [];
      var s = 0;

      for (var i = 0; i < maps.length; i++) {
        w.push(s + maps[i].width / 2);
        s += maps[i].width;
        s += 1;
      } // 去除末尾的空隙


      s--; // 计算中值坐标

      var center = s / 2; // 计算坐标

      for (var _i5 = 0; _i5 < maps.length; _i5++) {
        maps[_i5].pos = w[_i5] - center;
      } // 剔除空白


      return maps.filter(function (v) {
        return v.len !== 0;
      });
    }
  }]);

  return LetterData;
}();
window.__require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var b = o.split("/");
        b = b[b.length - 1];
        if (!t[b]) {
          var a = "function" == typeof __require && __require;
          if (!u && a) return a(b, !0);
          if (i) return i(b, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
        o = b;
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof __require && __require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  CameraMove: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "73201EPg2tOj7t/J2vXZraJ", "CameraMove");
    "use strict";
    var GameData = require("GameData");
    cc.Class({
      extends: cc.Component,
      properties: {
        playerLayer: {
          default: null,
          type: cc.Node
        }
      },
      start: function start() {},
      init: function init() {
        var playerLayerCom = this.playerLayer.getComponent("PlayerFactory");
        this.playerCom = playerLayerCom.playerCom;
      },
      cameraMove: function cameraMove(pos, beforPos) {
        var disPos = {
          x: pos.x - beforPos.x,
          y: pos.y - beforPos.y
        };
        this.node.x + disPos.x < GameData.worldWidth / 2 - cc.winSize.width / 2 && this.node.x + disPos.x > -GameData.worldWidth / 2 + cc.winSize.width / 2 && (this.node.x += disPos.x);
        this.node.y + disPos.y < GameData.worldHeight / 2 - cc.winSize.height / 2 && this.node.y + disPos.y > -GameData.worldHeight / 2 + cc.winSize.height / 2 && (this.node.y += disPos.y);
      },
      lateUpdate: function lateUpdate(dt) {
        if (GameData.isGameStart && this.playerCom && "gamestart" == this.playerCom.state && 0 == this.playerCom.type) {
          var curPos = {
            x: this.playerCom.headSnake.x,
            y: this.playerCom.headSnake.y
          };
          this.cameraMove(curPos, this.playerCom.moveBeforSnakePos);
        }
      }
    });
    cc._RF.pop();
  }, {
    GameData: "GameData"
  } ],
  GameData: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5dd34ewq2VPgrU8gJk0FKdV", "GameData");
    "use strict";
    var GameData = {
      baseSnakeNode: 5,
      worldWidth: 6760,
      worldHeight: 6200,
      snakeWidth: 72,
      controlModel: 1,
      nodePool: {},
      enemyPool: null,
      snakeBodyPool: null,
      isGameStart: false,
      skinFrameArray: [],
      toDecimal2: function toDecimal2(value) {
        var f = parseFloat(value);
        if (isNaN(f)) return false;
        var result = Math.round(100 * f) / 100;
        return result;
      },
      SnakeFlag: {
        head: 0,
        tail: 1,
        body: 2
      }
    };
    module.exports = GameData;
    cc._RF.pop();
  }, {} ],
  GameScene: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "47dd7E6mVJLeKeDzL+4OXpM", "GameScene");
    "use strict";
    var GameData = require("GameData");
    cc.Class({
      extends: cc.Component,
      properties: {
        playerLayer: {
          default: null,
          type: cc.Node
        },
        bg: {
          default: null,
          type: cc.Node
        },
        goodsLayer: {
          default: null,
          type: cc.Node
        },
        joystick: {
          default: null,
          type: cc.Node
        },
        camera: {
          default: null,
          type: cc.Camera
        }
      },
      onLoad: function onLoad() {
        var _this = this;
        this.touchStartPos = null;
        this.bg.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.bg.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.bg.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        window.GlobalEvent = new cc.EventTarget();
        GlobalEvent.on("getGoods", this.getGoods, this);
        GlobalEvent.on("gameover", this.gameOver, this);
        this.joystickCom = this.joystick.getComponent("JoyStick");
        this.joystickCom.hideDirection();
        this.palyerFactory = this.playerLayer.getComponent("PlayerFactory");
        this.goodsFactory = this.goodsLayer.getComponent("GoodsFactory");
        cc.game.renderType === cc.game.RENDER_TYPE_CANVAS && cc.renderer.enableDirtyRegion(false);
        var readNum = 0;
        var plistNum = 2;
        var _loop = function _loop(i) {
          var self = _this;
          cc.resources.load("skin/snakePack" + i, cc.SpriteAtlas, function(err, atlas) {
            if (err) {
              cc.log("err - ", err);
              return;
            }
            GameData.skinFrameArray[i - 1] = atlas;
            cc.log("GameData.skinFrameArray ====  ", GameData.skinFrameArray);
            readNum++;
            readNum == plistNum && self.gameStart();
          });
        };
        for (var i = plistNum; i > 0; i--) _loop(i);
      },
      start: function start() {
        GameData.curValue = 0;
      },
      gameStart: function gameStart() {
        cc.log("gameStart =====  ");
        GameData.isGameStart = true;
        this.palyerFactory.init();
        this.camera.getComponent("CameraMove").init();
      },
      onTouchStart: function onTouchStart(touch, event) {
        if (!GameData.isGameStart) return false;
        var pos = touch.getLocation();
        this.touchStartPos = pos;
        return true;
      },
      onTouchMove: function onTouchMove(touch, event) {
        if (GameData.isGameStart) {
          var pos = touch.getLocation();
          var vec = pos.sub(this.touchStartPos);
          var basevec = cc.Vec2(1, 0);
          var degreeNum = vec.signAngle(basevec);
          this.palyerFactory && this.palyerFactory.changeDirection(degreeNum);
          this.joystickCom && this.joystickCom.changeDirection(degreeNum);
        }
      },
      onTouchEnd: function onTouchEnd(touch, event) {
        this.touchStartPos = null;
        this.joystickCom && this.joystickCom.hideDirection();
      },
      btn_accelerate: function btn_accelerate() {
        cc.log("btn_accelerate");
        GameData.isGameStart && this.palyerFactory.changeSpeed(25);
      },
      getGoods: function getGoods(index) {},
      gameOver: function gameOver() {
        GameData.isGameStart = false;
        cc.log("gameOver    ====  gameOver");
      },
      update: function update(dt) {}
    });
    cc._RF.pop();
  }, {
    GameData: "GameData"
  } ],
  GoodsFactory: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ea01c6uvGVAtb+gfk+A0Ffy", "GoodsFactory");
    "use strict";
    function _createForOfIteratorHelperLoose(o, allowArrayLike) {
      var it;
      if ("undefined" === typeof Symbol || null == o[Symbol.iterator]) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && "number" === typeof o.length) {
          it && (o = it);
          var i = 0;
          return function() {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      it = o[Symbol.iterator]();
      return it.next.bind(it);
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o) return;
      if ("string" === typeof o) return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      "Object" === n && o.constructor && (n = o.constructor.name);
      if ("Map" === n || "Set" === n) return Array.from(o);
      if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
    }
    function _arrayLikeToArray(arr, len) {
      (null == len || len > arr.length) && (len = arr.length);
      for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
      return arr2;
    }
    var GameData = require("GameData");
    var goodsConfig = require("goods_config");
    cc.Class({
      extends: cc.Component,
      properties: {
        goodsArray: {
          default: [],
          type: [ cc.Prefab ]
        }
      },
      onLoad: function onLoad() {
        this.rangeMax = 200;
        this.rangeMin = 60;
        this.numMax = 8;
        this.numMin = 4;
        this.baseTotalNum = 0;
        this.addGoodsNum = 0;
        this.addGoodsMaxNum = 5;
        this.curTime = 0;
        this.widthGap = 800;
        this.heightGap = 600;
        this.poolNum = 30;
        this.snakeDeadDis = 5;
        this.snakeDeadTimes = 0;
        this.snakeInitTime = 0;
        this.goodsLeftUp = [];
        this.goodsLeftDown = [];
        this.goodsRightUp = [];
        this.goodsRightDown = [];
        this.snakeDeadPos = [];
        this.isGameStart = false;
        GlobalEvent.on("snakeDead", this.snakeDead, this);
        GlobalEvent.on("snakeMove", this.checkGoodsCollision, this);
        this.initPool();
        var tmpWidthNum = GameData.worldWidth / this.widthGap;
        var tmpHeightNum = GameData.worldHeight / this.heightGap;
        this.baseTotalNum = Math.floor(tmpWidthNum * tmpHeightNum);
      },
      start: function start() {},
      initPool: function initPool() {
        for (var i = 0; i < goodsConfig.length; i++) {
          GameData.nodePool[goodsConfig[i].name] || (GameData.nodePool[goodsConfig[i].name] = new cc.NodePool());
          for (var j = 0; j < this.poolNum; j++) {
            if (!this.goodsArray[i]) continue;
            var obj = cc.instantiate(this.goodsArray[i]);
            GameData.nodePool[goodsConfig[i].name].put(obj);
          }
        }
      },
      addGoods: function addGoods(pos) {
        var num = Math.floor(Math.random() * this.numMax) + this.numMin;
        for (var i = 0; i < num; i++) this.addSigleGoods(0, pos);
      },
      addSigleGoods: function addSigleGoods(index, pos) {
        if (!this.goodsArray[index]) return;
        if (!goodsConfig[index]) return;
        var tmpName = goodsConfig[index].name;
        var g;
        g = GameData.nodePool[tmpName] && GameData.nodePool[tmpName].size() > 0 ? GameData.nodePool[tmpName].get() : cc.instantiate(this.goodsArray[index]);
        var randX = Math.random() * this.rangeMax - this.rangeMin;
        var randY = Math.random() * this.rangeMax - this.rangeMin;
        g.x = pos.x + randX;
        g.y = pos.y + randY;
        g.getComponent("Goods").init(index, GameData.nodePool[tmpName]);
        this.node.addChild(g);
        g.x <= 0 && g.y <= 0 ? this.goodsLeftDown.push(g) : g.x <= 0 && g.y > 0 ? this.goodsLeftUp.push(g) : g.x > 0 && g.y <= 0 ? this.goodsRightDown.push(g) : this.goodsRightUp.push(g);
      },
      checkRcetHas: function checkRcetHas(pos, pos2) {
        if (pos.x + this.rangeMax >= pos2.x && pos.x <= pos2.x && pos.y + this.rangeMax >= pos2.y && pos.y <= pos2.y) return false;
        return true;
      },
      getRandPos: function getRandPos() {
        var minWidth = -GameData.worldWidth / 2 + cc.winSize.width;
        var maxWidth = GameData.worldWidth / 2 - cc.winSize.width - this.rangeMax;
        var minHeight = -GameData.worldHeight / 2 + cc.winSize.height;
        var maxHeight = GameData.worldHeight / 2 - cc.winSize.height - this.rangeMax;
        var randx = Math.random() * (maxWidth - minWidth) + minWidth;
        var randy = Math.random() * (maxHeight - minHeight) + minHeight;
        return {
          x: randx,
          y: randy
        };
      },
      update: function update(dt) {
        if (this.snakeDeadPos.length > this.snakeDeadDis * this.snakeDeadTimes) {
          this.snakeDeadTimes++;
          for (var i = 0; i < this.snakeDeadDis; i++) {
            var index = this.snakeDeadTimes * this.snakeDeadDis + i;
            this.snakeDeadPos[index] && this.addSigleGoods(0, this.snakeDeadPos[index]);
          }
        } else {
          this.snakeDeadPos.length = [];
          this.snakeDeadTimes = 0;
        }
        if (this.baseTotalNum && this.baseTotalNum > this.snakeDeadDis * this.snakeInitTime) {
          this.snakeInitTime++;
          for (var _i = 0; _i < this.snakeDeadDis; _i++) this.addGoods(this.getRandPos());
        } else {
          this.snakeInitTime = 0;
          this.baseTotalNum = 0;
        }
        var goodsNum = this.goodsLeftDown.length + this.goodsLeftUp.length + this.goodsRightUp.length + this.goodsRightDown.length;
        if (this.curTime >= .5 && goodsNum < 1e3) {
          for (var _i2 = 0; _i2 < this.snakeDeadDis; _i2++) this.addGoods(this.getRandPos());
          this.curTime = 0;
        } else this.curTime += dt;
      },
      snakeDead: function snakeDead(snake) {
        if (!snake) return;
        var snakeCom = snake.getComponent("Player");
        for (var _iterator = _createForOfIteratorHelperLoose(snakeCom.snakeBodyArray), _step; !(_step = _iterator()).done; ) {
          var ss = _step.value;
          var obj = {
            x: ss.x,
            y: ss.y
          };
          this.snakeDeadPos.push(obj);
        }
      },
      checkGoodsCollision: function checkGoodsCollision(snakeRect) {
        if (snakeRect.xMin <= 0 && snakeRect.yMin <= 0) for (var i = this.goodsLeftDown.length - 1; i >= 0; i--) {
          var goods = this.goodsLeftDown[i];
          if (goods.getBoundingBox().intersects(snakeRect)) {
            var pos = {
              x: snakeRect.x + snakeRect.width / 2,
              y: snakeRect.y + snakeRect.height / 2
            };
            this.goldAct(goods, pos);
            this.goodsLeftDown.splice(i, 1);
          }
        }
        if (snakeRect.xMin <= 0 && snakeRect.yMax > 0) for (var _i3 = this.goodsLeftUp.length - 1; _i3 >= 0; _i3--) {
          var _goods = this.goodsLeftUp[_i3];
          if (_goods.getBoundingBox().intersects(snakeRect)) {
            var _pos = {
              x: snakeRect.x + snakeRect.width / 2,
              y: snakeRect.y + snakeRect.height / 2
            };
            this.goldAct(_goods, _pos);
            this.goodsLeftUp.splice(_i3, 1);
          }
        }
        if (snakeRect.xMax > 0 && snakeRect.yMin <= 0) for (var _i4 = this.goodsRightDown.length - 1; _i4 >= 0; _i4--) {
          var _goods2 = this.goodsRightDown[_i4];
          if (_goods2.getBoundingBox().intersects(snakeRect)) {
            var _pos2 = {
              x: snakeRect.x + snakeRect.width / 2,
              y: snakeRect.y + snakeRect.height / 2
            };
            this.goldAct(_goods2, _pos2);
            this.goodsRightDown.splice(_i4, 1);
          }
        }
        if (snakeRect.xMax > 0 && snakeRect.yMax > 0) for (var _i5 = this.goodsRightUp.length - 1; _i5 >= 0; _i5--) {
          var _goods3 = this.goodsRightUp[_i5];
          if (_goods3.getBoundingBox().intersects(snakeRect)) {
            var _pos3 = {
              x: snakeRect.x + snakeRect.width / 2,
              y: snakeRect.y + snakeRect.height / 2
            };
            this.goldAct(_goods3, _pos3);
            this.goodsRightUp.splice(_i5, 1);
          }
        }
      },
      goldAct: function goldAct(node, pos) {
        var goodsCom = node.getComponent("Goods");
        var pos1 = new cc.Vec2(pos.x, pos.y);
        cc.tween(node).to(.1, {
          position: pos1
        }).call(function() {
          goodsCom.destroySelf();
        }).start();
      }
    });
    cc._RF.pop();
  }, {
    GameData: "GameData",
    goods_config: "goods_config"
  } ],
  Goods: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "840f8Ma/bZAca36JkxS3KKx", "Goods");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        effect: {
          default: null,
          type: cc.Node
        }
      },
      onLoad: function onLoad() {},
      init: function init(index, pool) {
        this.node.scale = .3;
        this.index = index;
        this.pool = pool;
        this.effect;
      },
      destroySelf: function destroySelf() {
        GlobalEvent.emit("getGoods", this.index);
        this.pool ? this.pool.put(this.node) : this.node.destroy();
      },
      getRect: function getRect() {
        var width = 1.1 * this.node.width * this.node.scale;
        var height = 1.1 * this.node.height * this.node.scale;
        var rect = cc.rect(this.node.x - width / 2, this.node.y / 2, width, height);
        return rect;
      }
    });
    cc._RF.pop();
  }, {} ],
  JoyStick: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "607fdl37/1I3p68BWQvx+xv", "JoyStick");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        horker: {
          default: null,
          type: cc.Node
        },
        horker_d: {
          default: null,
          type: cc.Node
        }
      },
      onLoad: function onLoad() {
        this.horkerLen = 52;
        this.horker_dLen = 100;
        this.horker_d.active = false;
      },
      changeDirection: function changeDirection(degree) {
        var dx = Math.cos(degree);
        var dy = -Math.sin(degree);
        this.horker.x = this.horkerLen * dx;
        this.horker.y = this.horkerLen * dy;
        this.horker_d.active = true;
        this.horker_d.angle = 180 * -degree / Math.PI;
        this.horker_d.x = this.horker_dLen * dx;
        this.horker_d.y = this.horker_dLen * dy;
      },
      hideDirection: function hideDirection() {
        this.horker.x = 0;
        this.horker.y = 0;
        this.horker_d.active = false;
      },
      update: function update(dt) {}
    });
    cc._RF.pop();
  }, {} ],
  PlayerFactory: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "53400RbFhpN86W6meHeJdkl", "PlayerFactory");
    "use strict";
    function _createForOfIteratorHelperLoose(o, allowArrayLike) {
      var it;
      if ("undefined" === typeof Symbol || null == o[Symbol.iterator]) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && "number" === typeof o.length) {
          it && (o = it);
          var i = 0;
          return function() {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      it = o[Symbol.iterator]();
      return it.next.bind(it);
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o) return;
      if ("string" === typeof o) return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      "Object" === n && o.constructor && (n = o.constructor.name);
      if ("Map" === n || "Set" === n) return Array.from(o);
      if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
    }
    function _arrayLikeToArray(arr, len) {
      (null == len || len > arr.length) && (len = arr.length);
      for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
      return arr2;
    }
    var GameData = require("./GameData");
    cc.Class({
      extends: cc.Component,
      properties: {
        checkCollision: 2
      },
      onLoad: function onLoad() {
        this.enemyArray = [];
        this.enenmyPoolNum = 5;
        this.totalEnemyNum = 8;
        this.createEnemyTime = 1;
        this.curTime = 0;
        this.checkCollisionTime = 0;
        this.createEnemyPool();
        this.enenmyInfo = [];
        this.testTime = 0;
        GlobalEvent.on("snakeDead", this.snakeDead, this);
      },
      start: function start() {},
      init: function init() {
        this.playerNode = this.addSiglePlayer(0);
        this.playerCom = this.playerNode.getComponent("Player");
        this.playerCom.initPlayer();
      },
      changeDirection: function changeDirection(degree) {
        this.playerCom.changeDirection(degree);
      },
      changeSpeed: function changeSpeed(speed) {
        this.playerCom.changeSpeed(speed);
      },
      createEnemyPool: function createEnemyPool() {
        GameData.enemyPool || (GameData.enemyPool = new cc.NodePool());
        for (var i = 0; i < this.enenmyPoolNum; i++) {
          var player = this.node.getChildByName("player");
          var enemy = cc.instantiate(player);
          GameData.enemyPool.put(enemy);
        }
      },
      initEnemy: function initEnemy(info) {
        this.addSiglePlayer(1, info);
      },
      addSiglePlayer: function addSiglePlayer(type, info) {
        var enemy;
        if (GameData.enemyPool && GameData.enemyPool.size() > 0) enemy = GameData.enemyPool.get(); else {
          var player = this.node.getChildByName("player");
          enemy = cc.instantiate(player);
        }
        var enemyCom = enemy.getComponent("Player");
        enemy.x = 0;
        enemy.y = 0;
        this.node.addChild(enemy);
        if (type > 0) {
          enemyCom.initEnemy(info);
          this.enemyArray.push(enemy);
        }
        return enemy;
      },
      update: function update(dt) {
        if (!GameData.isGameStart) return;
        if (this.enemyArray.length < this.totalEnemyNum) if (this.curTime > this.createEnemyTime) {
          var ddd = this.enenmyInfo[this.enemyArray.length] || {};
          this.initEnemy(ddd);
          this.curTime = 0;
        } else this.curTime += dt;
        if (this.checkCollisionTime > this.checkCollision) for (var _iterator = _createForOfIteratorHelperLoose(this.enemyArray), _step; !(_step = _iterator()).done; ) {
          var enemy = _step.value;
          var collision = enemy.getComponent("Player").willCollision(this.playerNode);
          if (collision) for (var i = 0; i < this.enemyArray.length; i++) if (this.enemyArray[i] != enemy) {
            var c = enemy.getComponent("Player").willCollision(this.enemyArray[i]);
            if (c) {
              this.checkCollisionTime = 0;
              break;
            }
          }
        } else this.checkCollisionTime += dt;
      },
      snakeDead: function snakeDead(snake) {
        if (!snake) return;
        snake.getComponent("Player").snakeDead();
        this.enemyArray.indexOf(snake) > -1 ? this.enemyArray.splice(this.enemyArray.indexOf(snake), 1) : GlobalEvent.emit("gameover");
        GameData.enemyPool.put(snake);
      }
    });
    cc._RF.pop();
  }, {
    "./GameData": "GameData"
  } ],
  Player: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "272bcpNkw5NJ63qiaAXiHV1", "Player");
    "use strict";
    function _createForOfIteratorHelperLoose(o, allowArrayLike) {
      var it;
      if ("undefined" === typeof Symbol || null == o[Symbol.iterator]) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && "number" === typeof o.length) {
          it && (o = it);
          var i = 0;
          return function() {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      it = o[Symbol.iterator]();
      return it.next.bind(it);
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o) return;
      if ("string" === typeof o) return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      "Object" === n && o.constructor && (n = o.constructor.name);
      if ("Map" === n || "Set" === n) return Array.from(o);
      if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
    }
    function _arrayLikeToArray(arr, len) {
      (null == len || len > arr.length) && (len = arr.length);
      for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
      return arr2;
    }
    var GameData = require("GameData");
    var goodsConfig = require("goods_config");
    var skinConfig = require("Snake_skin_config");
    var PlayerState = {
      NONE: "none",
      CREATE: "create",
      GAMESTART: "gamestart",
      DEAD: "dead"
    };
    cc.Class({
      extends: cc.Component,
      properties: {
        prefab_body: {
          default: null,
          type: cc.Prefab
        }
      },
      onLoad: function onLoad() {
        this.maxOrderIndex = 1e4;
        this.snakeGap = 15;
        this.fixedSpeed = 5;
        this.snakeMaxNode = 15e3;
        this.changeMove = 1;
        this.originAngle = 0;
        this.bodyPoolNum = 60;
        this.invincibleTime = 5;
        this.turnMaxDegree = 3 / 180 * Math.PI;
        this.type = 1;
        this.snakeSkinIndex = 1;
        this.curNum = 0;
        this.degreeNum = 0;
        this.snakeBodyArray = [];
        this.movePos = [];
        this.headSnake;
        this.curTime = 0;
        this.changeCurTime = 0;
        this.invincibleCurTime = 0;
        this.isInvincible = false;
        this.speed = this.fixedSpeed;
        this.snakeMoveTime = 0;
        this.snakescaleNum = 1;
        this.originSnakeNum = 0;
        this.state = PlayerState.NONE;
        this.basePos = {
          x: 0,
          y: 0
        };
        this.moveBeforSnakePos = {};
        this.snakeBodyNum = 0;
        this.enemyRandDegree = 0;
        this.goodsValue = 0;
        this.reverseTime = 100;
        this.createFlag = true;
        GlobalEvent.on("getGoods", this.getGoods, this);
        GameData.snakeBodyPool || (GameData.snakeBodyPool = new cc.NodePool());
        for (var i = 0; i < this.bodyPoolNum; i++) {
          var snake = cc.instantiate(this.prefab_body);
          GameData.snakeBodyPool.put(snake);
        }
      },
      reset: function reset() {
        this.degreeNum = 0;
        this.snakeBodyArray = [];
        this.curNum = 0;
        this.movePos = [];
        this.headSnake = null;
        this.curTime = 0;
        this.changeCurTime = 0;
        this.speed = this.fixedSpeed;
        this.snakescaleNum = 1;
        this.state = PlayerState.NONE;
        this.invincibleCurTime = 0;
        this.isInvincible = true;
        this.moveBeforSnakePos = {};
        this.snakeSkinIndex = 1;
        this.snakeBodyNum = 0;
        this.isInvincible = false;
        this.goodsValue = 0;
        this.notCanMove = false;
        this.reverseTime = 100;
        this.createFlag = true;
      },
      initPlayer: function initPlayer() {
        this.reset();
        this.type = 0;
        this.snakeSkinIndex = 18;
        this.originSnakeNum = GameData.baseSnakeNode;
        this.state = PlayerState.CREATE;
      },
      addBody: function addBody(pos, isOriginal) {
        var tmpSnakeFlag;
        var snakeInfo = skinConfig[this.snakeSkinIndex];
        var self = this;
        var tmpCurNum = this.curNum;
        if (0 == this.curNum) {
          tmpSnakeFlag = GameData.SnakeFlag.head;
          if (snakeInfo && snakeInfo.head) {
            cc.resources.load("prefab/" + snakeInfo.head, function(err, prefab) {
              if (err) {
                cc.log("err  ", err);
                return;
              }
              var head = cc.instantiate(prefab);
              self.snakeNodeInfo(head, pos, isOriginal, tmpSnakeFlag, tmpCurNum);
            });
            return;
          }
        } else if (isOriginal && this.curNum == this.originSnakeNum - 1) {
          tmpSnakeFlag = GameData.SnakeFlag.tail;
          if (snakeInfo && snakeInfo.tail) {
            cc.resources.load("prefab/" + snakeInfo.tail, function(err, prefab) {
              if (err) {
                cc.log("err  ", err);
                return;
              }
              var head = cc.instantiate(prefab);
              self.snakeNodeInfo(head, pos, isOriginal, tmpSnakeFlag, tmpCurNum);
            });
            return;
          }
        } else {
          tmpSnakeFlag = GameData.SnakeFlag.body;
          this.snakeBodyNum++;
        }
        var node;
        node = GameData.snakeBodyPool && GameData.snakeBodyPool.size() > 0 ? GameData.snakeBodyPool.get() : cc.instantiate(this.prefab_body);
        self.snakeNodeInfo(node, pos, isOriginal, tmpSnakeFlag, tmpCurNum);
      },
      snakeNodeInfo: function snakeNodeInfo(node, pos, isOriginal, tmpSnakeFlag, destCurNum) {
        var r = this.snakeBodyArray[this.snakeBodyArray.length - 1] ? this.snakeBodyArray[this.snakeBodyArray.length - 1].angle : 180 * this.originAngle / Math.PI;
        node.getComponent("Snake_body").init(this.snakeSkinIndex, this.snakeBodyNum, tmpSnakeFlag);
        node.x = pos.x;
        node.y = pos.y;
        node.scale = this.snakescaleNum;
        node.angle = r;
        0 == destCurNum && isOriginal && !this.headSnake && (this.headSnake = node);
        this.snakeBodyArray.push(node);
        isOriginal && destCurNum == this.originSnakeNum - 1 ? this.node.addChild(node, -1e3) : this.node.addChild(node, this.maxOrderIndex - destCurNum);
        var tmpPos = this.basePos;
        if (this.headSnake) {
          tmpPos.x = this.headSnake.x;
          tmpPos.y = this.headSnake.y;
        }
        var tmpOffx = Math.cos(r * Math.PI / 180);
        var tmpOffy = Math.sin(r * Math.PI / 180);
        for (var i = 0; i < this.snakeGap; i++) {
          var obj = void 0;
          if (isOriginal) {
            var tmpDis = destCurNum * this.snakeGap + i;
            obj = {
              x: tmpPos.x - tmpDis * tmpOffx,
              y: tmpPos.y - tmpDis * tmpOffy
            };
          } else obj = {
            x: tmpPos.x - tmpOffx,
            y: tmpPos.y - tmpOffy
          };
          this.movePos.push(obj);
        }
        if (isOriginal) {
          this.node.opacity = 0;
          if (destCurNum == this.originSnakeNum - 1) {
            this.getScaleSize();
            var self = this;
            cc.tween(this.node).to(.2, {
              opacity: 255
            }).call(function() {
              self.state = PlayerState.GAMESTART;
            }).start();
          }
        }
        if (!isOriginal) {
          node.opacity = 0;
          this.changeSnakeBody();
        }
        this.createFlag = true;
      },
      changeSnakeBody: function changeSnakeBody() {
        var snakeTail = this.snakeBodyArray[this.snakeBodyArray.length - 2];
        var snakeBody = this.snakeBodyArray[this.snakeBodyArray.length - 1];
        var posTail = {
          x: snakeTail.x,
          y: snakeTail.y
        };
        snakeTail.x = snakeBody.x;
        snakeTail.y = snakeBody.y;
        snakeBody.x = posTail.x;
        snakeBody.y = posTail.y;
        this.snakeBodyArray[this.snakeBodyArray.length - 2] = snakeBody;
        this.snakeBodyArray[this.snakeBodyArray.length - 1] = snakeTail;
        snakeBody.opacity = 255;
      },
      increaseSnake: function increaseSnake() {
        if (this.snakeBodyArray.length > 0 && this.snakeBodyArray.length < this.snakeMaxNode) {
          var r = this.snakeBodyArray[this.snakeBodyArray.length - 1].angle;
          var lastx = this.snakeBodyArray[this.snakeBodyArray.length - 1].x;
          var lasty = this.snakeBodyArray[this.snakeBodyArray.length - 1].y;
          var obj = {
            x: lastx + this.snakeGap * Math.cos(r * Math.PI / 180),
            y: lasty + this.snakeGap * Math.sin(r * Math.PI / 180)
          };
          this.addBody(obj);
          this.curNum++;
        }
        this.getScaleSize();
      },
      getScaleSize: function getScaleSize() {
        this.curNum < 15 ? this.snakeScale(.8) : this.curNum < 30 ? this.snakeScale(.9) : this.curNum < 60 ? this.snakeScale(1) : this.curNum < 90 ? this.snakeScale(1.1) : this.curNum > 120 && this.snakeScale(1.2);
      },
      snakeScale: function snakeScale(scale) {
        if (this.snakescaleNum == scale) return;
        this.snakescaleNum = scale;
        for (var _iterator = _createForOfIteratorHelperLoose(this.snakeBodyArray), _step; !(_step = _iterator()).done; ) {
          var snake = _step.value;
          snake.getComponent("Snake_body").setSelfScale(scale);
        }
      },
      changeDirection: function changeDirection(degree) {
        if (this.state != PlayerState.GAMESTART) return;
        if (this.degreeNum != degree) {
          var tmpDegree = (degree + 2 * Math.PI) % (2 * Math.PI);
          this.degreeNum = (this.degreeNum + 2 * Math.PI) % (2 * Math.PI);
          Math.abs(tmpDegree - this.degreeNum) < Math.PI ? this.degreeNum < tmpDegree ? this.degreeNum += this.turnMaxDegree : this.degreeNum -= this.turnMaxDegree : this.degreeNum < tmpDegree ? this.degreeNum -= this.turnMaxDegree : this.degreeNum += this.turnMaxDegree;
          this.degreeNum = (this.degreeNum + 2 * Math.PI) % (2 * Math.PI);
        }
      },
      updateBodyPos: function updateBodyPos() {
        this.moveBeforSnakePos = {
          x: this.headSnake.x,
          y: this.headSnake.y
        };
        for (var i = 0; i < this.snakeBodyArray.length; i++) {
          var snake = this.snakeBodyArray[i];
          var curPos = this.movePos[i * this.snakeGap];
          if (curPos) {
            snake.angle = Math.atan2(curPos.y - snake.y, curPos.x - snake.x) / Math.PI * 180;
            if (0 == i) {
              var snakeCom = snake.getComponent("Snake_body");
              GlobalEvent.emit("snakeMove", snakeCom.getRect());
            }
            snake.setPosition(curPos.x, curPos.y);
          }
        }
        this.movePos.length > (this.snakeBodyArray.length + 1) * this.snakeGap && (this.movePos.length = (this.snakeBodyArray.length + 1) * this.snakeGap);
      },
      changeSpeed: function changeSpeed(speed) {
        speed > this.speed && (this.speed = speed);
      },
      outTheWorld: function outTheWorld() {
        this.notCanMove = true;
        cc.log("\u6b7b\u4e86");
        GlobalEvent.emit("snakeDead", this.node);
        this.snakeDead();
      },
      update: function update(dt) {
        if (this.state == PlayerState.CREATE) {
          if (this.curNum < this.originSnakeNum && this.createFlag) {
            var basePos = this.basePos;
            var tmpOffx = Math.cos(this.originAngle);
            var tmpOffy = Math.sin(this.originAngle);
            var pos = {
              x: basePos.x - this.curNum * this.snakeGap * tmpOffx,
              y: basePos.y - this.curNum * this.snakeGap * tmpOffy
            };
            this.createFlag = false;
            this.addBody(pos, true);
            this.curNum++;
          }
        } else if (this.state != PlayerState.GAMESTART || this.notCanMove) this.state == PlayerState.DEAD; else {
          0 != this.type && (this.enemyRandDegree && Math.abs(this.enemyRandDegree - this.degreeNum) >= this.turnMaxDegree ? this.changeDirection(this.enemyRandDegree) : this.enemyRandDegree = 0);
          var x = Math.cos(this.degreeNum) * this.speed;
          var y = Math.sin(this.degreeNum) * this.speed;
          var prePos = {
            x: this.headSnake.x,
            y: this.headSnake.y
          };
          var _pos = {
            x: this.headSnake.x,
            y: this.headSnake.y
          };
          if (0 != this.type) if (this.reverseTime > 1) {
            if (_pos.x + x >= GameData.worldWidth / 2 - cc.winSize.width || _pos.x + x <= -GameData.worldWidth / 2 + cc.winSize.width) {
              this.reverseMove(1);
              this.reverseTime = 0;
            }
            if (_pos.y - y >= GameData.worldHeight / 2 - cc.winSize.height || _pos.y - y <= -GameData.worldHeight / 2 + cc.winSize.height) {
              this.reverseMove();
              this.reverseTime = 0;
            }
          } else this.reverseTime += dt;
          if (!(_pos.x + x < GameData.worldWidth / 2 - cc.winSize.width / 2 && _pos.x + x > -GameData.worldWidth / 2 + cc.winSize.width / 2)) {
            this.outTheWorld();
            return;
          }
          _pos.x += x;
          if (!(_pos.y - y < GameData.worldHeight / 2 - cc.winSize.height / 2 && _pos.y - y > -GameData.worldHeight / 2 + cc.winSize.height / 2)) {
            this.outTheWorld();
            return;
          }
          _pos.y -= y;
          this.movePos.reverse();
          var movex = Math.cos(Math.atan2(_pos.y - prePos.y, _pos.x - prePos.x));
          var movey = Math.sin(Math.atan2(_pos.y - prePos.y, _pos.x - prePos.x));
          for (var i = 1; i <= this.speed; i++) this.movePos.push({
            x: i * movex + prePos.x,
            y: i * movey + prePos.y
          });
          this.movePos.reverse();
          this.updateBodyPos();
          if (this.isInvincible && this.invincibleCurTime < this.invincibleTime) this.invincibleCurTime += dt; else if (this.headSnake) {
            var headRect = this.headSnake.getBoundingBox();
            this.isInvincible = false;
            this.checkCollision(headRect);
          }
          if (this.fixedSpeed < this.speed) {
            this.curTime += dt;
            if (this.curTime > .5) {
              this.speed = this.fixedSpeed;
              this.curTime = 0;
            }
          }
          0 != this.type && (this.changeCurTime >= this.changeMove ? this.randomMove() : this.changeCurTime += dt);
        }
      },
      getGoods: function getGoods(index) {
        this.goodsValue += goodsConfig[index].value;
        if (this.goodsValue >= 500) {
          this.increaseSnake();
          this.goodsValue = 0;
        }
      },
      initEnemy: function initEnemy(info) {
        this.reset();
        this.basePos = info.pos || this.getEnemyPos();
        this.state = PlayerState.CREATE;
        this.type = 1;
        this.originSnakeNum = Math.floor(20 * Math.random()) + 2;
        this.notCanMove = info.notCanMove;
        var randIndex = Math.floor(20 * Math.random()) + 1;
        this.snakeSkinIndex = info.snakeIndex || randIndex;
        cc.log("snakeIndex ----------  ", this.snakeSkinIndex);
        this.turnMaxDegree = 5 / 180 * Math.PI;
        this.randomMove();
      },
      getEnemyPos: function getEnemyPos() {
        var posArray = [];
        posArray.push([ -GameData.worldWidth / 2 + cc.winSize.width, -cc.winSize.width / 2 - GameData.snakeWidth ]);
        posArray.push([ cc.winSize.width / 2 + GameData.snakeWidth, GameData.worldWidth / 2 - cc.winSize.width ]);
        posArray.push([ -GameData.worldHeight / 2 + cc.winSize.width, -cc.winSize.height / 2 - GameData.snakeWidth ]);
        posArray.push([ cc.winSize.height / 2 + GameData.snakeWidth, GameData.worldHeight / 2 - cc.winSize.width ]);
        var randx = Math.floor(2 * Math.random());
        var randy = Math.floor(2 * Math.random()) + 2;
        var rangex = Math.random() * (posArray[randx][1] - posArray[randx][0]) + posArray[randx][0];
        var rangey = Math.random() * (posArray[randy][1] - posArray[randy][0]) + posArray[randy][0];
        return {
          x: rangex,
          y: rangey
        };
      },
      reverseMove: function reverseMove(flag) {
        if (this.enemyRandDegree) return;
        this.changeCurTime = 0;
        this.enemyRandDegree = this.degreeNum - Math.PI;
        this.enemyRandDegree = (this.enemyRandDegree + 2 * Math.PI) % (2 * Math.PI);
      },
      randomMove: function randomMove() {
        this.changeCurTime = 0;
        this.enemyRandDegree = 2 * Math.random() * Math.PI;
        this.changeMove = 5 * Math.random() + 1;
      },
      snakeDead: function snakeDead() {
        this.state = PlayerState.DEAD;
        for (var _iterator2 = _createForOfIteratorHelperLoose(this.snakeBodyArray), _step2; !(_step2 = _iterator2()).done; ) {
          var snake = _step2.value;
          var snakeCom = snake.getComponent("Snake_body");
          snakeCom.dealDead(GameData.snakeBodyPool);
        }
        this.snakeBodyArray = [];
        this.movePos = [];
        this.headSnake = null;
      },
      willCollision: function willCollision(snake) {
        if (!snake) return;
        if (!this.headSnake) return;
        var rect = this.headSnake.getBoundingBox();
        var x = Math.cos(this.degreeNum) * this.speed;
        var y = Math.sin(this.degreeNum) * this.speed;
        rect.x += x;
        rect.y -= y;
        var nextMove = [];
        for (var start = 3; start < 10; start++) {
          var tmpRect = rect;
          tmpRect.x += x * start;
          tmpRect.y -= y * start;
          nextMove.push(tmpRect);
        }
        for (var i = 0; i < nextMove.length; i++) if (this.isCollision(nextMove[i], snake)) {
          this.reverseMove();
          return true;
        }
        return false;
      },
      isCollision: function isCollision(rect, snake) {
        if (!snake) return;
        var snakeCom = snake.getComponent("Player");
        if (snakeCom.isInvincible) return false;
        for (var i = 0; i < snakeCom.snakeBodyArray.length; i++) if (rect.intersects(snakeCom.snakeBodyArray[i].getBoundingBox())) return true;
        return false;
      },
      checkCollision: function checkCollision(headRect) {
        var parent = this.node.parent;
        var parentCom = parent.getComponent("PlayerFactory");
        if (0 == this.type) for (var _iterator3 = _createForOfIteratorHelperLoose(parentCom.enemyArray), _step3; !(_step3 = _iterator3()).done; ) {
          var snake = _step3.value;
          this.isCollision(headRect, snake) && this.outTheWorld();
        } else if (this.isCollision(headRect, parentCom.playerNode)) this.outTheWorld(); else for (var _iterator4 = _createForOfIteratorHelperLoose(parentCom.enemyArray), _step4; !(_step4 = _iterator4()).done; ) {
          var _snake = _step4.value;
          _snake != this.node && this.isCollision(headRect, _snake) && this.outTheWorld();
        }
      }
    });
    cc._RF.pop();
  }, {
    GameData: "GameData",
    Snake_skin_config: "Snake_skin_config",
    goods_config: "goods_config"
  } ],
  Snake_body: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6463500/5xDepPwnzcbgLw7", "Snake_body");
    "use strict";
    var skinConfig = require("Snake_skin_config");
    var GameData = require("GameData");
    cc.Class({
      extends: cc.Component,
      properties: {
        sprite: {
          default: null,
          type: cc.Sprite
        }
      },
      onLoad: function onLoad() {
        this.angle = 0;
        this.degreeNum = 0;
        this.speed = 1;
        this.snakeIndex = 0;
        this.rectRate = 2;
        this.changeObj = [];
        this.snakeFlag;
      },
      start: function start() {},
      init: function init(snakeIndex, index, flag) {
        15 == snakeIndex && (snakeIndex += 1);
        this.snakeIndex = snakeIndex;
        this.index = index;
        this.node.nIndex = index;
        this.snakeInfo = skinConfig[snakeIndex];
        this.rectRate = .2;
        this.snakeFlag = flag;
        this.initNode();
      },
      initNode: function initNode() {
        var nodeSize = [];
        var arrayIndex = Math.ceil(this.snakeIndex / 10) - 1;
        var atlasFrame = GameData.skinFrameArray[arrayIndex];
        var pngName;
        if (this.snakeFlag == GameData.SnakeFlag.head) {
          if (!this.snakeInfo.head) {
            this.sprite.node.angle = 90;
            pngName = "snake_t_" + this.snakeIndex;
          }
          this.snakeInfo.headSize && (nodeSize = this.snakeInfo.headSize);
        } else if (this.snakeFlag == GameData.SnakeFlag.tail) {
          this.snakeInfo.tail || (pngName = "snake_w_" + this.snakeIndex);
          this.snakeInfo.tailSize && (nodeSize = this.snakeInfo.tailSize);
        } else {
          this.sprite.node.color = cc.color(255, 255, 255);
          if (this.snakeInfo && this.snakeInfo.colors) {
            var colorLen = this.snakeInfo.colors.length;
            var colorIndex = (this.index - 1) % colorLen;
            var color = this.snakeInfo.colors[colorIndex];
            this.sprite.node.color = new cc.color(color[0], color[1], color[2]);
          } else {
            var pngIndex = (this.index - 1) % this.snakeInfo.snakeLen + this.snakeInfo.start;
            pngName = "snake_" + this.snakeIndex + "_" + pngIndex;
          }
        }
        cc.log("pngName -----   ", pngName);
        pngName && (this.sprite.spriteFrame = atlasFrame.getSpriteFrame(pngName));
        this.node.active = true;
        this.node.width = nodeSize[0] || .9 * this.sprite.node.width;
        this.node.height = nodeSize[1] || .9 * this.sprite.node.height;
      },
      setSelfScale: function setSelfScale(scale) {
        this.node.scale != scale && (this.node.scale = scale);
      },
      getRect: function getRect() {
        var rect = this.node.getBoundingBox();
        var rRect = rect.clone();
        rRect.x -= rRect.width * this.rectRate / 2;
        rRect.y -= rRect.height * this.rectRate / 2;
        rRect.width = rRect.width * (1 + this.rectRate);
        rRect.height = rRect.height * (1 + this.rectRate);
        return rRect;
      },
      dealDead: function dealDead(nodepool) {
        this.snakeInfo.head || this.snakeInfo.tail ? this.node.destroy() : nodepool.put(this.node);
      }
    });
    cc._RF.pop();
  }, {
    GameData: "GameData",
    Snake_skin_config: "Snake_skin_config"
  } ],
  Snake_skin_config: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3af36BCVyBJtbOfycQGzSXn", "Snake_skin_config");
    "use strict";
    var Skin_Config = {
      1: {
        snakeLen: 17,
        start: 2,
        colors: [ [ 0, 180, 0 ], [ 180, 180, 0 ], [ 0, 180, 180 ], [ 180, 180, 180 ] ]
      },
      2: {
        snakeLen: 17,
        start: 2
      },
      3: {
        snakeLen: 17,
        start: 2
      },
      4: {
        snakeLen: 17,
        start: 2
      },
      5: {
        snakeLen: 17,
        start: 2
      },
      6: {
        snakeLen: 17,
        start: 2
      },
      7: {
        snakeLen: 17,
        start: 2
      },
      8: {
        snakeLen: 17,
        start: 2
      },
      9: {
        snakeLen: 17,
        start: 2
      },
      10: {
        snakeLen: 16,
        start: 2
      },
      11: {
        snakeLen: 17,
        start: 2
      },
      12: {
        snakeLen: 15,
        start: 2
      },
      13: {
        snakeLen: 16,
        start: 2
      },
      14: {
        snakeLen: 17,
        start: 2
      },
      16: {
        snakeLen: 17,
        start: 2
      },
      17: {
        snakeLen: 17,
        start: 2
      },
      18: {
        snakeLen: 17,
        start: 2,
        head: "snake_head18",
        headSize: [ 51, 51 ]
      },
      19: {
        snakeLen: 14,
        start: 2,
        tail: "snake_tail19",
        tailSize: [ 50, 52 ]
      },
      20: {
        snakeLen: 15,
        start: 2
      },
      41: {
        snakeLen: 18,
        start: 2
      }
    };
    module.exports = Skin_Config;
    cc._RF.pop();
  }, {} ],
  goods_config: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1f37dJFEEhKAp7x0QzF5if9", "goods_config");
    "use strict";
    var goodcon = [ {
      name: "gold",
      value: 10,
      weight: 1
    } ];
    module.exports = goodcon;
    cc._RF.pop();
  }, {} ]
}, {}, [ "CameraMove", "GameData", "GameScene", "Goods", "GoodsFactory", "JoyStick", "Player", "PlayerFactory", "Snake_body", "Snake_skin_config", "goods_config" ]);
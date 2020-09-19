window.__require=function e(t,i,n){function a(o,r){if(!i[o]){if(!t[o]){var h=o.split("/");if(h=h[h.length-1],!t[h]){var c="function"==typeof __require&&__require;if(!r&&c)return c(h,!0);if(s)return s(h,!0);throw new Error("Cannot find module '"+o+"'")}o=h}var d=i[o]={exports:{}};t[o][0].call(d.exports,function(e){return a(t[o][1][e]||e)},d,d.exports,e,t,i,n)}return i[o].exports}for(var s="function"==typeof __require&&__require,o=0;o<n.length;o++)a(n[o]);return a}({CameraMove:[function(e,t,i){"use strict";cc._RF.push(t,"73201EPg2tOj7t/J2vXZraJ","CameraMove");var n=e("GameData");cc.Class({extends:cc.Component,properties:{playerLayer:{default:null,type:cc.Node}},start:function(){},init:function(){var e=this.playerLayer.getComponent("PlayerFactory");this.playerCom=e.playerCom},lateUpdate:function(e){if(n.isGameStart&&this.playerCom&&"gamestart"==this.playerCom.state&&0==this.playerCom.type){var t={x:this.playerCom.headSnake.x,y:this.playerCom.headSnake.y};this.cameraMove(t,this.playerCom.moveBeforSnakePos)}}}),cc._RF.pop()},{GameData:"GameData"}],GameData:[function(e,t,i){"use strict";cc._RF.push(t,"5dd34ewq2VPgrU8gJk0FKdV","GameData");var n={baseSnakeNode:50,worldWidth:6760,worldHeight:6200,snakeWidth:72,controlModel:1,nodePool:{},enemyPool:null,snakeBodyPool:null,isGameStart:!1,skinFrameArray:[],toDecimal2:function(e){var t=parseFloat(e);return!isNaN(t)&&Math.round(100*t)/100},SnakeFlag:{head:0,tail:1,body:2},TipsIndex:{killsnake:0}};t.exports=n,cc._RF.pop()},{}],GameScene:[function(e,t,i){"use strict";cc._RF.push(t,"47dd7E6mVJLeKeDzL+4OXpM","GameScene");var n=e("GameData");cc.Class({extends:cc.Component,properties:{playerLayer:{default:null,type:cc.Node},bg:{default:null,type:cc.Node},goodsLayer:{default:null,type:cc.Node},joystick:{default:null,type:cc.Node},camera:{default:null,type:cc.Camera},endLayer:{default:null,type:cc.Node},littleMap:{default:null,type:cc.Node},btn_speed:{default:null,type:cc.Node}},onLoad:function(){var e=this;this.touchStartPos=null,this.control_move,this.control_speed,this.bg.on(cc.Node.EventType.TOUCH_START,this.onTouchStart,this),this.bg.on(cc.Node.EventType.TOUCH_MOVE,this.onTouchMove,this),this.bg.on(cc.Node.EventType.TOUCH_END,this.onTouchEnd,this),window.GlobalEvent=new cc.EventTarget,GlobalEvent.on("getGoods",this.getGoods,this),GlobalEvent.on("gameover",this.gameOver,this),this.joystickCom=this.joystick.getComponent("JoyStick"),this.joystickCom.hideDirection(),this.palyerFactory=this.playerLayer.getComponent("PlayerFactory"),this.goodsFactory=this.goodsLayer.getComponent("GoodsFactory"),this.littleMapCom=this.littleMap.getComponent("LittleMap"),this.endLayer.active=!1,cc.game.renderType===cc.game.RENDER_TYPE_CANVAS&&cc.renderer.enableDirtyRegion(!1);for(var t=0,i=function(i){var a=e;cc.resources.load("skin/snakePack"+i,cc.SpriteAtlas,function(e,s){e?cc.log("err - ",e):(n.skinFrameArray[i-1]=s,cc.log("GameData.skinFrameArray ====  ",n.skinFrameArray),2==++t&&a.gameStart())})},a=2;a>0;a--)i(a)},start:function(){this.btn_speed.active=!1,this.joystick.active=!1,n.curValue=0},gameStart:function(){cc.log("gameStart =====  "),this.palyerFactory.init(),this.littleMapCom.init(),n.isGameStart=!0},onTouchStart:function(e){if(!n.isGameStart)return!1;var t=e.getLocation();return this.control_move?this.control_speed||this.control_move==e.getID()||(this.control_speed=e.getID()):this.control_move=e.getID(),cc.log("touch.getID() -----  ",e.getID()),e.getID()==this.control_move?(this.touchStartPos=t,this.joystick.active=!0,this.joystick.x=t.x-cc.winSize.width/2,this.joystick.y=t.y-cc.winSize.height/2):e.getID()==this.control_speed&&(this.btn_speed.active=!0,this.btn_speed.x=t.x-cc.winSize.width/2,this.btn_speed.y=t.y-cc.winSize.height/2,this.palyerFactory.changeSpeed(!0)),!0},onTouchMove:function(e){if(n.isGameStart&&e.getID()==this.control_move){var t=e.getLocation().sub(this.touchStartPos),i=cc.Vec2(1,0),a=t.signAngle(i);this.palyerFactory&&this.palyerFactory.changeDirection(a),this.joystickCom&&this.joystickCom.changeDirection(a)}},onTouchEnd:function(e){e.getID()==this.control_move?(this.touchStartPos=null,this.joystickCom&&this.joystickCom.hideDirection(),this.joystick.active=!1):e.getID()==this.control_speed&&(this.btn_speed.active=!1,this.palyerFactory.changeSpeed())},getGoods:function(e){},gameOver:function(){n.isGameStart=!1,this.endLayer.active=!0,cc.log("gameOver    ====  gameOver")},update:function(e){},restartGame:function(){this.palyerFactory.cleanAllEnemy(),this.littleMapCom.cleanAllDot(),this.endLayer.active=!1,this.palyerFactory.init(),this.littleMapCom.init(),n.isGameStart=!0}}),cc._RF.pop()},{GameData:"GameData"}],GoodsFactory:[function(e,t,i){"use strict";function n(e,t){var i;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(i=a(e))||t&&e&&"number"==typeof e.length){i&&(e=i);var n=0;return function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}return(i=e[Symbol.iterator]()).next.bind(i)}function a(e,t){if(e){if("string"==typeof e)return s(e,t);var i=Object.prototype.toString.call(e).slice(8,-1);return"Object"===i&&e.constructor&&(i=e.constructor.name),"Map"===i||"Set"===i?Array.from(e):"Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)?s(e,t):void 0}}function s(e,t){(null==t||t>e.length)&&(t=e.length);for(var i=0,n=new Array(t);i<t;i++)n[i]=e[i];return n}cc._RF.push(t,"ea01c6uvGVAtb+gfk+A0Ffy","GoodsFactory");var o=e("GameData"),r=e("goods_config");cc.Class({extends:cc.Component,properties:{goodsArray:{default:[],type:[cc.Prefab]}},onLoad:function(){this.rangeMax=200,this.rangeMin=60,this.numMax=8,this.numMin=4,this.baseTotalNum=0,this.addGoodsNum=0,this.addGoodsMaxNum=5,this.curTime=0,this.widthGap=800,this.heightGap=600,this.poolNum=30,this.snakeDeadDis=5,this.snakeDeadTimes=0,this.snakeInitTime=0,this.goodsLeftUp=[],this.goodsLeftDown=[],this.goodsRightUp=[],this.goodsRightDown=[],this.snakeDeadPos=[],this.isGameStart=!1,GlobalEvent.on("snakeDead",this.snakeDead,this),GlobalEvent.on("snakeMove",this.checkGoodsCollision,this),this.initPool();var e=o.worldWidth/this.widthGap,t=o.worldHeight/this.heightGap;this.baseTotalNum=Math.floor(e*t)},start:function(){},initPool:function(){for(var e=0;e<r.length;e++){o.nodePool[r[e].name]||(o.nodePool[r[e].name]=new cc.NodePool);for(var t=0;t<this.poolNum;t++)if(this.goodsArray[e]){var i=cc.instantiate(this.goodsArray[e]);o.nodePool[r[e].name].put(i)}}},addGoods:function(e){for(var t=Math.floor(Math.random()*this.numMax)+this.numMin,i=0;i<t;i++)this.addSigleGoods(0,e)},addSigleGoods:function(e,t){if(this.goodsArray[e]&&r[e]){var i,n=r[e].name;i=o.nodePool[n]&&o.nodePool[n].size()>0?o.nodePool[n].get():cc.instantiate(this.goodsArray[e]);var a=Math.random()*this.rangeMax-this.rangeMin,s=Math.random()*this.rangeMax-this.rangeMin;i.x=t.x+a,i.y=t.y+s,i.getComponent("Goods").init(e,o.nodePool[n]),this.node.addChild(i),i.x<=0&&i.y<=0?this.goodsLeftDown.push(i):i.x<=0&&i.y>0?this.goodsLeftUp.push(i):i.x>0&&i.y<=0?this.goodsRightDown.push(i):this.goodsRightUp.push(i)}},checkRcetHas:function(e,t){return!(e.x+this.rangeMax>=t.x&&e.x<=t.x&&e.y+this.rangeMax>=t.y&&e.y<=t.y)},getRandPos:function(){var e=-o.worldWidth/2+cc.winSize.width,t=o.worldWidth/2-cc.winSize.width-this.rangeMax,i=-o.worldHeight/2+cc.winSize.height,n=o.worldHeight/2-cc.winSize.height-this.rangeMax;return{x:Math.random()*(t-e)+e,y:Math.random()*(n-i)+i}},update:function(e){if(this.snakeDeadPos.length>this.snakeDeadDis*this.snakeDeadTimes){this.snakeDeadTimes++;for(var t=0;t<this.snakeDeadDis;t++){var i=this.snakeDeadTimes*this.snakeDeadDis+t;this.snakeDeadPos[i]&&this.addSigleGoods(0,this.snakeDeadPos[i])}}else this.snakeDeadPos.length=[],this.snakeDeadTimes=0;if(this.baseTotalNum&&this.baseTotalNum>this.snakeDeadDis*this.snakeInitTime){this.snakeInitTime++;for(var n=0;n<this.snakeDeadDis;n++)this.addGoods(this.getRandPos())}else this.snakeInitTime=0,this.baseTotalNum=0;var a=this.goodsLeftDown.length+this.goodsLeftUp.length+this.goodsRightUp.length+this.goodsRightDown.length;if(this.curTime>=.5&&a<1e3){for(var s=0;s<this.snakeDeadDis;s++)this.addGoods(this.getRandPos());this.curTime=0}else this.curTime+=e},snakeDead:function(e){if(e)for(var t,i=n(e.getComponent("Player").snakeBodyArray);!(t=i()).done;){var a=t.value,s={x:a.x,y:a.y};this.snakeDeadPos.push(s)}},checkGoodsCollision:function(e,t){if(e.xMin<=0&&e.yMin<=0)for(var i=this.goodsLeftDown.length-1;i>=0;i--){var n=this.goodsLeftDown[i];if(n.getBoundingBox().intersects(e)){var a={x:e.x+e.width/2,y:e.y+e.height/2};this.goldAct(n,a,t),this.goodsLeftDown.splice(i,1)}}if(e.xMin<=0&&e.yMax>0)for(var s=this.goodsLeftUp.length-1;s>=0;s--){var o=this.goodsLeftUp[s];if(o.getBoundingBox().intersects(e)){var r={x:e.x+e.width/2,y:e.y+e.height/2};this.goldAct(o,r,t),this.goodsLeftUp.splice(s,1)}}if(e.xMax>0&&e.yMin<=0)for(var h=this.goodsRightDown.length-1;h>=0;h--){var c=this.goodsRightDown[h];if(c.getBoundingBox().intersects(e)){var d={x:e.x+e.width/2,y:e.y+e.height/2};this.goldAct(c,d,t),this.goodsRightDown.splice(h,1)}}if(e.xMax>0&&e.yMax>0)for(var l=this.goodsRightUp.length-1;l>=0;l--){var y=this.goodsRightUp[l];if(y.getBoundingBox().intersects(e)){var u={x:e.x+e.width/2,y:e.y+e.height/2};this.goldAct(y,u,t),this.goodsRightUp.splice(l,1)}}},goldAct:function(e,t,i){var n=e.getComponent("Goods"),a=new cc.Vec2(t.x,t.y);cc.tween(e).to(.1,{position:a}).call(function(){n.destroySelf(i)}).start()}}),cc._RF.pop()},{GameData:"GameData",goods_config:"goods_config"}],Goods:[function(e,t,i){"use strict";cc._RF.push(t,"840f8Ma/bZAca36JkxS3KKx","Goods"),cc.Class({extends:cc.Component,properties:{effect:{default:null,type:cc.Node}},onLoad:function(){},init:function(e,t){this.node.scale=.3,this.index=e,this.pool=t,this.effect},destroySelf:function(e){GlobalEvent.emit("getGoods",this.index,e),this.pool?this.pool.put(this.node):this.node.destroy()},getRect:function(){var e=1.1*this.node.width*this.node.scale,t=1.1*this.node.height*this.node.scale;return cc.rect(this.node.x-e/2,this.node.y/2,e,t)}}),cc._RF.pop()},{}],JoyStick:[function(e,t,i){"use strict";cc._RF.push(t,"607fdl37/1I3p68BWQvx+xv","JoyStick"),cc.Class({extends:cc.Component,properties:{horker:{default:null,type:cc.Node},horker_d:{default:null,type:cc.Node}},onLoad:function(){this.horkerLen=52,this.horker_dLen=100,this.horker_d.active=!1},changeDirection:function(e){var t=Math.cos(e),i=-Math.sin(e);this.horker.x=this.horkerLen*t,this.horker.y=this.horkerLen*i,this.horker_d.active=!0,this.horker_d.angle=180*-e/Math.PI,this.horker_d.x=this.horker_dLen*t,this.horker_d.y=this.horker_dLen*i},hideDirection:function(){this.horker.x=0,this.horker.y=0,this.horker_d.active=!1},update:function(e){}}),cc._RF.pop()},{}],LittleMap:[function(e,t,i){"use strict";function n(e,t){var i;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(i=a(e))||t&&e&&"number"==typeof e.length){i&&(e=i);var n=0;return function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}return(i=e[Symbol.iterator]()).next.bind(i)}function a(e,t){if(e){if("string"==typeof e)return s(e,t);var i=Object.prototype.toString.call(e).slice(8,-1);return"Object"===i&&e.constructor&&(i=e.constructor.name),"Map"===i||"Set"===i?Array.from(e):"Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)?s(e,t):void 0}}function s(e,t){(null==t||t>e.length)&&(t=e.length);for(var i=0,n=new Array(t);i<t;i++)n[i]=e[i];return n}cc._RF.push(t,"465a4MroYBF25y1uXXnbyAI","LittleMap");var o=e("GameData");cc.Class({extends:cc.Component,properties:{playerNode:{default:null,type:cc.Node},dot1:{default:null,type:cc.Prefab},dot2:{default:null,type:cc.Prefab}},onLoad:function(){this.curTime=0,this.nodeArray=[],this.player,this.ratioWidth=this.node.width/o.worldWidth,this.ratioHeight=this.node.height/o.worldHeight,this.playerNodeCom=this.playerNode.getComponent("PlayerFactory"),GlobalEvent.on("littleMap",this.deleteNode,this)},init:function(){this.player=cc.instantiate(this.dot2),this.playerNodeCom.playerCom.headSnake?(this.player.x=this.playerNodeCom.playerCom.headSnake.x*this.ratioWidth,this.player.y=this.playerNodeCom.playerCom.headSnake.y*this.ratioHeight):this.player.active=!1,this.node.addChild(this.player)},deleteNode:function(e){this.nodeArray.length>e&&(this.nodeArray[e].destroy(),this.nodeArray.splice(e,1))},refreshNode:function(){for(var e=0;e<this.playerNodeCom.enemyArray.length;e++){var t=this.playerNodeCom.enemyArray[e].getComponent("Player");if(this.nodeArray[e])t.headSnake?(this.nodeArray[e].active=!0,this.nodeArray[e].x=t.headSnake.x*this.ratioWidth,this.nodeArray[e].y=t.headSnake.y*this.ratioHeight):this.nodeArray[e].active=!1;else{var i=cc.instantiate(this.dot1);t.headSnake?(i.x=t.headSnake.x*this.ratioWidth,i.y=t.headSnake.y*this.ratioHeight):i.active=!1,this.nodeArray.push(i),this.node.addChild(i)}}this.playerNodeCom.playerCom.headSnake&&(this.player.active=!0,this.player.x=this.playerNodeCom.playerCom.headSnake.x*this.ratioWidth,this.player.y=this.playerNodeCom.playerCom.headSnake.y*this.ratioHeight)},update:function(e){o.isGameStart&&(this.curTime>.3?(this.curTime=0,this.refreshNode()):this.curTime+=e)},cleanAllDot:function(){this.player.destroy();for(var e,t=n(this.nodeArray);!(e=t()).done;){e.value.destroy()}this.nodeArray=[],this.player=null}}),cc._RF.pop()},{GameData:"GameData"}],PlayerFactory:[function(e,t,i){"use strict";function n(e,t){var i;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(i=a(e))||t&&e&&"number"==typeof e.length){i&&(e=i);var n=0;return function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}return(i=e[Symbol.iterator]()).next.bind(i)}function a(e,t){if(e){if("string"==typeof e)return s(e,t);var i=Object.prototype.toString.call(e).slice(8,-1);return"Object"===i&&e.constructor&&(i=e.constructor.name),"Map"===i||"Set"===i?Array.from(e):"Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)?s(e,t):void 0}}function s(e,t){(null==t||t>e.length)&&(t=e.length);for(var i=0,n=new Array(t);i<t;i++)n[i]=e[i];return n}cc._RF.push(t,"53400RbFhpN86W6meHeJdkl","PlayerFactory");var o=e("./GameData");cc.Class({extends:cc.Component,properties:{checkCollision:1,prefab_body:{default:null,type:cc.Prefab}},onLoad:function(){this.bodyPoolNum=60,this.enemyArray=[],this.enenmyPoolNum=5,this.totalEnemyNum=6,this.createEnemyTime=.3,this.curTime=0,this.checkCollisionTime=0,this.createEnemyPool(),this.enenmyInfo=[],this.testTime=0,GlobalEvent.on("snakeDead",this.snakeDead,this)},start:function(){},init:function(){this.playerNode=this.addSiglePlayer(0),this.playerCom=this.playerNode.getComponent("Player"),this.playerCom.initPlayer()},changeDirection:function(e){this.playerCom.changeDirection(e)},changeSpeed:function(e){this.playerCom.changeSpeed(e)},createEnemyPool:function(){o.enemyPool||(o.enemyPool=new cc.NodePool);for(var e=0;e<this.enenmyPoolNum;e++){var t=this.node.getChildByName("player"),i=cc.instantiate(t);o.enemyPool.put(i)}o.snakeBodyPool||(o.snakeBodyPool=new cc.NodePool);for(var n=0;n<this.bodyPoolNum;n++){var a=cc.instantiate(this.prefab_body);o.snakeBodyPool.put(a)}},initEnemy:function(e){this.addSiglePlayer(1,e)},addSiglePlayer:function(e,t){var i;if(o.enemyPool&&o.enemyPool.size()>0)i=o.enemyPool.get();else{var n=this.node.getChildByName("player");i=cc.instantiate(n)}var a=i.getComponent("Player");return i.x=0,i.y=0,this.node.addChild(i),e>0&&(a.initEnemy(t),this.enemyArray.push(i)),i},update:function(e){if(o.isGameStart){if(this.enemyArray.length<this.totalEnemyNum)if(this.curTime>this.createEnemyTime){var t=this.enenmyInfo[this.enemyArray.length]||{};this.initEnemy(t),this.curTime=0}else this.curTime+=e;if(this.checkCollisionTime>this.checkCollision)for(var i,a=n(this.enemyArray);!(i=a()).done;){var s=i.value;if(s.getComponent("Player").willCollision(this.playerNode))for(var r=0;r<this.enemyArray.length;r++){if(this.enemyArray[r]!=s)if(s.getComponent("Player").willCollision(this.enemyArray[r])){this.checkCollisionTime=0;break}}}else this.checkCollisionTime+=e}},snakeDead:function(e,t){if(e){t&&GlobalEvent.emit("showTips",o.TipsIndex.killsnake),e.getComponent("Player").snakeDead();var i=this.enemyArray.indexOf(e);i>-1?(this.enemyArray.splice(i,1),GlobalEvent.emit("littleMap",i)):GlobalEvent.emit("gameover"),o.enemyPool.put(e)}},cleanAllEnemy:function(){for(var e,t=n(this.enemyArray);!(e=t()).done;){var i=e.value;i.getComponent("Player").snakeDead(),o.enemyPool.put(i)}this.enemyArray=[]}}),cc._RF.pop()},{"./GameData":"GameData"}],Player:[function(e,t,i){"use strict";function n(e,t){var i;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(i=a(e))||t&&e&&"number"==typeof e.length){i&&(e=i);var n=0;return function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}return(i=e[Symbol.iterator]()).next.bind(i)}function a(e,t){if(e){if("string"==typeof e)return s(e,t);var i=Object.prototype.toString.call(e).slice(8,-1);return"Object"===i&&e.constructor&&(i=e.constructor.name),"Map"===i||"Set"===i?Array.from(e):"Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)?s(e,t):void 0}}function s(e,t){(null==t||t>e.length)&&(t=e.length);for(var i=0,n=new Array(t);i<t;i++)n[i]=e[i];return n}cc._RF.push(t,"272bcpNkw5NJ63qiaAXiHV1","Player");var o=e("GameData"),r=e("goods_config"),h=e("Snake_skin_config"),c="none",d="create",l="gamestart",y="dead";cc.Class({extends:cc.Component,properties:{prefab_body:{default:null,type:cc.Prefab},camera:{default:null,type:cc.Camera}},onLoad:function(){this.maxOrderIndex=1e4,this.snakeGap=15,this.fixedSpeed=5,this.snakeMaxNode=1e3,this.changeMove=1,this.originAngle=0,this.invincibleTime=5,this.turnMaxDegree=3/180*Math.PI,this.type=1,this.snakeSkinIndex=1,this.curNum=0,this.degreeNum=0,this.snakeBodyArray=[],this.movePos=[],this.headSnake,this.changeCurTime=0,this.invincibleCurTime=0,this.isInvincible=!1,this.speed=this.fixedSpeed,this.snakeMoveTime=0,this.snakescaleNum=1,this.originSnakeNum=0,this.state=c,this.basePos={x:0,y:0},this.moveBeforSnakePos={},this.snakeBodyNum=0,this.enemyRandDegree=0,this.goodsValue=0,this.reverseTime=100,this.createFlag=!0,this.cameraSize=1,GlobalEvent.on("getGoods",this.getGoods,this)},reset:function(){this.degreeNum=0,this.snakeBodyArray=[],this.curNum=0,this.movePos=[],this.headSnake=null,this.changeCurTime=0,this.speed=this.fixedSpeed,this.snakescaleNum=1,this.state=c,this.invincibleCurTime=0,this.isInvincible=!0,this.moveBeforSnakePos={},this.snakeSkinIndex=1,this.snakeBodyNum=0,this.isInvincible=!1,this.goodsValue=0,this.notCanMove=!1,this.reverseTime=100,this.createFlag=!0,this.basePos={x:0,y:0},this.cameraSize=1},initPlayer:function(){this.reset(),this.type=0,this.snakeSkinIndex=Math.floor(20*Math.random())+1,this.originSnakeNum=o.baseSnakeNode,this.state=d,this.camera.node.x=0,this.camera.node.y=0,this.camera.zoomRatio=1},addBody:function(e,t){var i,n,a=h[this.snakeSkinIndex],s=this,r=this.curNum;if(0==this.curNum){if(i=o.SnakeFlag.head,a&&a.head)return void cc.resources.load("prefab/"+a.head,function(n,a){if(n)cc.log("err  ",n);else{var o=cc.instantiate(a);s.snakeNodeInfo(o,e,t,i,r)}})}else if(t&&this.curNum==this.originSnakeNum-1){if(i=o.SnakeFlag.tail,a&&a.tail)return void cc.resources.load("prefab/"+a.tail,function(n,a){if(n)cc.log("err  ",n);else{var o=cc.instantiate(a);s.snakeNodeInfo(o,e,t,i,r)}})}else i=o.SnakeFlag.body,this.snakeBodyNum++;n=o.snakeBodyPool&&o.snakeBodyPool.size()>0?o.snakeBodyPool.get():cc.instantiate(this.prefab_body),s.snakeNodeInfo(n,e,t,i,r)},snakeNodeInfo:function(e,t,i,n,a){var s=this.snakeBodyArray[this.snakeBodyArray.length-1]?this.snakeBodyArray[this.snakeBodyArray.length-1].angle:180*this.originAngle/Math.PI;e.getComponent("Snake_body").init(this.snakeSkinIndex,this.snakeBodyNum,n),e.x=t.x,e.y=t.y,e.scale=this.snakescaleNum,e.angle=s,0==a&&i&&!this.headSnake&&(this.headSnake=e),this.snakeBodyArray.push(e),i&&a==this.originSnakeNum-1?this.node.addChild(e,-1e3):this.node.addChild(e,this.maxOrderIndex-a);var o=this.basePos;this.headSnake&&(o.x=this.headSnake.x,o.y=this.headSnake.y);for(var r=Math.cos(s*Math.PI/180),h=Math.sin(s*Math.PI/180),c=0;c<this.snakeGap;c++){var d=void 0;if(i){var y=a*this.snakeGap+c;d={x:o.x-y*r,y:o.y-y*h}}else d={x:o.x-r,y:o.y-h};this.movePos.push(d)}if(i&&(this.node.opacity=0,a==this.originSnakeNum-1)){this.getScaleSize();var u=this;cc.tween(this.node).to(.2,{opacity:255}).call(function(){u.state=l}).start()}i||(e.opacity=0,this.changeSnakeBody()),this.createFlag=!0},changeSnakeBody:function(){var e=this.snakeBodyArray[this.snakeBodyArray.length-2],t=this.snakeBodyArray[this.snakeBodyArray.length-1],i={x:e.x,y:e.y};e.x=t.x,e.y=t.y,t.x=i.x,t.y=i.y,this.snakeBodyArray[this.snakeBodyArray.length-2]=t,this.snakeBodyArray[this.snakeBodyArray.length-1]=e,t.opacity=255},increaseSnake:function(){if(this.snakeBodyArray.length>0&&this.snakeBodyArray.length<this.snakeMaxNode){var e=this.snakeBodyArray[this.snakeBodyArray.length-1].angle,t=this.snakeBodyArray[this.snakeBodyArray.length-1].x,i=this.snakeBodyArray[this.snakeBodyArray.length-1].y,n={x:t+this.snakeGap*Math.cos(e*Math.PI/180),y:i+this.snakeGap*Math.sin(e*Math.PI/180)};this.addBody(n),this.curNum++}this.getScaleSize()},getScaleSize:function(){this.curNum<15?this.snakeScale(.8):this.curNum<30?this.snakeScale(.9):this.curNum<60?this.snakeScale(1):this.curNum<90?this.snakeScale(1.1):this.curNum>120&&this.snakeScale(1.2)},snakeScale:function(e){if(this.snakescaleNum!=e){this.snakescaleNum=e;for(var t,i=n(this.snakeBodyArray);!(t=i()).done;){t.value.getComponent("Snake_body").setSelfScale(e)}1==this.snakescaleNum&&(this.cameraSize=.8)}},changeDirection:function(e){if(this.state==l&&this.degreeNum!=e){var t=(e+2*Math.PI)%(2*Math.PI);this.degreeNum=(this.degreeNum+2*Math.PI)%(2*Math.PI),Math.abs(t-this.degreeNum)<Math.PI?this.degreeNum<t?this.degreeNum+=this.turnMaxDegree:this.degreeNum-=this.turnMaxDegree:this.degreeNum<t?this.degreeNum-=this.turnMaxDegree:this.degreeNum+=this.turnMaxDegree,this.degreeNum=(this.degreeNum+2*Math.PI)%(2*Math.PI)}},updateBodyPos:function(){this.moveBeforSnakePos={x:this.headSnake.x,y:this.headSnake.y};for(var e=0;e<this.snakeBodyArray.length;e++){var t=this.snakeBodyArray[e],i=this.movePos[e*this.snakeGap];if(i){if(t.angle=Math.atan2(i.y-t.y,i.x-t.x)/Math.PI*180,0==e){var n=t.getComponent("Snake_body");GlobalEvent.emit("snakeMove",n.getRect(),t)}t.setPosition(i.x,i.y)}}this.movePos.length>(this.snakeBodyArray.length+1)*this.snakeGap&&(this.movePos.length=(this.snakeBodyArray.length+1)*this.snakeGap)},changeSpeed:function(e){this.speed=e?15:this.fixedSpeed},outTheWorld:function(e){this.notCanMove=!0,cc.log("\u6b7b\u4e86");var t=e;GlobalEvent.emit("snakeDead",this.node,t),this.snakeDead()},update:function(e){if(this.state==d){if(this.curNum<this.originSnakeNum&&this.createFlag){var t=this.basePos,i=Math.cos(this.originAngle),n=Math.sin(this.originAngle),a={x:t.x-this.curNum*this.snakeGap*i,y:t.y-this.curNum*this.snakeGap*n};this.createFlag=!1,this.addBody(a,!0),this.curNum++}}else if(this.state!=l||this.notCanMove)this.state;else{0!=this.type&&(this.enemyRandDegree&&Math.abs(this.enemyRandDegree-this.degreeNum)>=this.turnMaxDegree?this.changeDirection(this.enemyRandDegree):this.enemyRandDegree=0);var s=Math.cos(this.degreeNum)*this.speed,r=Math.sin(this.degreeNum)*this.speed,h={x:this.headSnake.x,y:this.headSnake.y},c={x:this.headSnake.x,y:this.headSnake.y};if(0!=this.type&&(this.reverseTime>1?((c.x+s>=o.worldWidth/2-cc.winSize.width||c.x+s<=-o.worldWidth/2+cc.winSize.width)&&(this.reverseMove(1),this.reverseTime=0),(c.y-r>=o.worldHeight/2-cc.winSize.height||c.y-r<=-o.worldHeight/2+cc.winSize.height)&&(this.reverseMove(),this.reverseTime=0)):this.reverseTime+=e),!(c.x+s<o.worldWidth/2-cc.winSize.width/2&&c.x+s>-o.worldWidth/2+cc.winSize.width/2))return void this.outTheWorld();if(c.x+=s,!(c.y-r<o.worldHeight/2-cc.winSize.height/2&&c.y-r>-o.worldHeight/2+cc.winSize.height/2))return void this.outTheWorld();c.y-=r,this.movePos.reverse();for(var y=Math.cos(Math.atan2(c.y-h.y,c.x-h.x)),u=Math.sin(Math.atan2(c.y-h.y,c.x-h.x)),m=1;m<=this.speed;m++)this.movePos.push({x:m*y+h.x,y:m*u+h.y});if(this.movePos.reverse(),this.updateBodyPos(),this.isInvincible&&this.invincibleCurTime<this.invincibleTime)this.invincibleCurTime+=e;else if(this.headSnake){var g=this.headSnake.getBoundingBox();this.isInvincible=!1,this.checkCollision(g)}0!=this.type&&(this.changeCurTime>=this.changeMove?this.randomMove():this.changeCurTime+=e),this.camera.zoomRatio>this.cameraSize&&(this.camera.zoomRatio-=.01)}},lateUpdate:function(e){if(o.isGameStart&&"gamestart"==this.state&&0==this.type){var t={x:this.headSnake.x,y:this.headSnake.y};this.cameraMove(t,this.moveBeforSnakePos)}},cameraMove:function(e,t){var i=e.x-t.x,n=e.y-t.y;this.camera.node.x+i<o.worldWidth/2-cc.winSize.width/2&&this.camera.node.x+i>-o.worldWidth/2+cc.winSize.width/2&&(this.camera.node.x+=i),this.camera.node.y+n<o.worldHeight/2-cc.winSize.height/2&&this.camera.node.y+n>-o.worldHeight/2+cc.winSize.height/2&&(this.camera.node.y+=n)},getGrowNum:function(){var e=this.snakeBodyArray.length;return e<10?100:e<20?150:e<40?200:e<60?300:e<80?500:void 0},getGoods:function(e,t){t==this.headSnake&&(this.goodsValue+=r[e].value,this.goodsValue>=50&&(this.increaseSnake(),this.goodsValue=0))},initEnemy:function(e){this.reset(),this.basePos=e.pos||this.getEnemyPos(),this.state=d,this.type=1,this.originSnakeNum=Math.floor(20*Math.random())+5,this.notCanMove=e.notCanMove;var t=Math.floor(20*Math.random())+1;this.snakeSkinIndex=e.snakeIndex||t,this.turnMaxDegree=5/180*Math.PI,this.randomMove()},getEnemyPos:function(){var e=[];e.push([-o.worldWidth/2+cc.winSize.width,-cc.winSize.width/2-o.snakeWidth]),e.push([cc.winSize.width/2+o.snakeWidth,o.worldWidth/2-cc.winSize.width]),e.push([-o.worldHeight/2+cc.winSize.width,-cc.winSize.height/2-o.snakeWidth]),e.push([cc.winSize.height/2+o.snakeWidth,o.worldHeight/2-cc.winSize.width]);var t=Math.floor(2*Math.random()),i=Math.floor(2*Math.random())+2;return{x:Math.random()*(e[t][1]-e[t][0])+e[t][0],y:Math.random()*(e[i][1]-e[i][0])+e[i][0]}},reverseMove:function(e){this.enemyRandDegree||(this.changeCurTime=0,this.enemyRandDegree=this.degreeNum-Math.PI,this.enemyRandDegree=(this.enemyRandDegree+2*Math.PI)%(2*Math.PI))},randomMove:function(){this.changeCurTime=0,this.enemyRandDegree=2*Math.random()*Math.PI,this.changeMove=5*Math.random()+1},snakeDead:function(){this.state=y;for(var e,t=n(this.snakeBodyArray);!(e=t()).done;){e.value.getComponent("Snake_body").dealDead(o.snakeBodyPool)}this.snakeBodyArray=[],this.movePos=[],this.headSnake=null},willCollision:function(e){if(e&&this.headSnake){var t=this.headSnake.getBoundingBox(),i=Math.cos(this.degreeNum)*this.speed,n=Math.sin(this.degreeNum)*this.speed;t.x+=i,t.y-=n;for(var a=[],s=2;s<8;s++){var o=t;o.x+=i*s,o.y-=n*s,a.push(o)}for(var r=0;r<a.length;r++)if(this.isCollision(a[r],e))return this.randomMove(),!0;return!1}},isCollision:function(e,t){if(t){var i=t.getComponent("Player");if(i.isInvincible)return!1;for(var n=0;n<i.snakeBodyArray.length;n++)if(e.intersects(i.snakeBodyArray[n].getBoundingBox()))return!0;return!1}},checkCollision:function(e){var t=this.node.parent.getComponent("PlayerFactory");if(0==this.type)for(var i,a=n(t.enemyArray);!(i=a()).done;){var s=i.value;this.isCollision(e,s)&&this.outTheWorld()}else if(this.isCollision(e,t.playerNode))this.outTheWorld(!0);else for(var o,r=n(t.enemyArray);!(o=r()).done;){var h=o.value;h!=this.node&&this.isCollision(e,h)&&this.outTheWorld()}}}),cc._RF.pop()},{GameData:"GameData",Snake_skin_config:"Snake_skin_config",goods_config:"goods_config"}],Snake_body:[function(e,t,i){"use strict";cc._RF.push(t,"6463500/5xDepPwnzcbgLw7","Snake_body");var n=e("Snake_skin_config"),a=e("GameData");cc.Class({extends:cc.Component,properties:{sprite:{default:null,type:cc.Sprite}},onLoad:function(){this.angle=0,this.degreeNum=0,this.speed=1,this.snakeIndex=0,this.rectRate=2,this.changeObj=[],this.snakeFlag},start:function(){},init:function(e,t,i){15==e&&(e+=1),this.snakeIndex=e,this.index=t,this.node.nIndex=t,this.snakeInfo=n[e],this.rectRate=.2,this.snakeFlag=i,this.initNode()},initNode:function(){var e,t=[],i=Math.ceil(this.snakeIndex/10)-1,n=a.skinFrameArray[i];if(this.snakeFlag==a.SnakeFlag.head)this.snakeInfo.head||(this.sprite.node.angle=90,e="snake_t_"+this.snakeIndex),this.snakeInfo.headSize&&(t=this.snakeInfo.headSize);else if(this.snakeFlag==a.SnakeFlag.tail)this.snakeInfo.tail||(this.sprite.node.angle=-90,e="snake_w_"+this.snakeIndex),this.snakeInfo.tailSize&&(t=this.snakeInfo.tailSize);else if(this.sprite.node.angle=-90,this.sprite.node.color=cc.color(255,255,255),this.snakeInfo&&this.snakeInfo.colors){var s=this.snakeInfo.colors.length,o=(this.index-1)%s,r=this.snakeInfo.colors[o];this.sprite.node.color=new cc.color(r[0],r[1],r[2])}else{var h=(this.index-1)%this.snakeInfo.snakeLen+this.snakeInfo.start;e="snake_"+this.snakeIndex+"_"+h}e&&(this.sprite.spriteFrame=n.getSpriteFrame(e)),this.node.active=!0,this.node.width=t[0]||.8*this.sprite.node.height,this.node.height=t[1]||.8*this.sprite.node.width},setSelfScale:function(e){this.node.scale!=e&&(this.node.scale=e)},getRect:function(){var e=this.node.getBoundingBox().clone();return e.x-=e.width*this.rectRate/2,e.y-=e.height*this.rectRate/2,e.width=e.width*(1+this.rectRate),e.height=e.height*(1+this.rectRate),e},dealDead:function(e){this.snakeInfo.head||this.snakeInfo.tail?this.node.destroy():e.put(this.node)}}),cc._RF.pop()},{GameData:"GameData",Snake_skin_config:"Snake_skin_config"}],Snake_skin_config:[function(e,t,i){"use strict";cc._RF.push(t,"3af36BCVyBJtbOfycQGzSXn","Snake_skin_config");t.exports={1:{snakeLen:17,start:2,colors:[[0,180,0],[180,180,0],[0,180,180],[180,180,180]]},2:{snakeLen:17,start:2},3:{snakeLen:17,start:2},4:{snakeLen:17,start:2},5:{snakeLen:17,start:2},6:{snakeLen:17,start:2},7:{snakeLen:17,start:2},8:{snakeLen:17,start:2},9:{snakeLen:17,start:2},10:{snakeLen:16,start:2},11:{snakeLen:17,start:2},12:{snakeLen:15,start:2},13:{snakeLen:16,start:2},14:{snakeLen:17,start:2},16:{snakeLen:17,start:2},17:{snakeLen:17,start:2},18:{snakeLen:17,start:2,head:"snake_head18",headSize:[51,51]},19:{snakeLen:14,start:2,tail:"snake_tail19",tailSize:[50,52]},20:{snakeLen:15,start:2},41:{snakeLen:18,start:2}},cc._RF.pop()},{}],Tips:[function(e,t,i){"use strict";cc._RF.push(t,"15490qV4DNFLbbq4Zx3iRte","Tips");cc.Class({extends:cc.Component,properties:{},onLoad:function(){this.node.active=!1,GlobalEvent.on("showTips",this.showTips,this)},start:function(){this.tipsBg=this.node.getChildByName("tipsBg"),this.tipsText=this.node.getChildByName("tips")},showTips:function(e){}}),cc._RF.pop()},{}],bd_pos:[function(e,t,i){"use strict";cc._RF.push(t,"97acbUFUxJEWpaAZgTst0N5","bd_pos");var n=e("GameData");cc.Class({extends:cc.Component,properties:{direction:0},onLoad:function(){1==this.direction?(this.node.x=-n.worldWidth/2+cc.winSize.width/2,this.node.width=n.worldHeight-cc.winSize.height):2==this.direction?(this.node.x=n.worldWidth/2-cc.winSize.width/2,this.node.width=n.worldHeight-cc.winSize.height):3==this.direction?(this.node.y=-n.worldHeight/2+cc.winSize.height/2,this.node.width=n.worldWidth-cc.winSize.width):4==this.direction&&(this.node.y=n.worldHeight/2-cc.winSize.height/2,this.node.width=n.worldWidth-cc.winSize.width)}}),cc._RF.pop()},{GameData:"GameData"}],goods_config:[function(e,t,i){"use strict";cc._RF.push(t,"1f37dJFEEhKAp7x0QzF5if9","goods_config");t.exports=[{name:"gold",value:10,weight:1}],cc._RF.pop()},{}]},{},["CameraMove","GameData","GameScene","Goods","GoodsFactory","JoyStick","LittleMap","Player","PlayerFactory","Snake_body","Snake_skin_config","Tips","bd_pos","goods_config"]);
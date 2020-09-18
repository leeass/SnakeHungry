window.__require=function e(t,i,n){function s(o,r){if(!i[o]){if(!t[o]){var h=o.split("/");if(h=h[h.length-1],!t[h]){var c="function"==typeof __require&&__require;if(!r&&c)return c(h,!0);if(a)return a(h,!0);throw new Error("Cannot find module '"+o+"'")}o=h}var d=i[o]={exports:{}};t[o][0].call(d.exports,function(e){return s(t[o][1][e]||e)},d,d.exports,e,t,i,n)}return i[o].exports}for(var a="function"==typeof __require&&__require,o=0;o<n.length;o++)s(n[o]);return s}({CameraMove:[function(e,t,i){"use strict";cc._RF.push(t,"73201EPg2tOj7t/J2vXZraJ","CameraMove");var n=e("GameData");cc.Class({extends:cc.Component,properties:{playerLayer:{default:null,type:cc.Node}},start:function(){},init:function(){var e=this.playerLayer.getComponent("PlayerFactory");this.playerCom=e.playerCom},cameraMove:function(e,t){var i=e.x-t.x,s=e.y-t.y;this.node.x+i<n.worldWidth/2-cc.winSize.width/2&&this.node.x+i>-n.worldWidth/2+cc.winSize.width/2&&(this.node.x+=i),this.node.y+s<n.worldHeight/2-cc.winSize.height/2&&this.node.y+s>-n.worldHeight/2+cc.winSize.height/2&&(this.node.y+=s)},lateUpdate:function(e){if(n.isGameStart&&this.playerCom&&"gamestart"==this.playerCom.state&&0==this.playerCom.type){var t={x:this.playerCom.headSnake.x,y:this.playerCom.headSnake.y};this.cameraMove(t,this.playerCom.moveBeforSnakePos)}}}),cc._RF.pop()},{GameData:"GameData"}],GameData:[function(e,t,i){"use strict";cc._RF.push(t,"5dd34ewq2VPgrU8gJk0FKdV","GameData");var n={baseSnakeNode:15,worldWidth:6760,worldHeight:6200,snakeWidth:72,controlModel:1,nodePool:{},enemyPool:null,snakeBodyPool:null,isGameStart:!1,skinFrameArray:[],toDecimal2:function(e){var t=parseFloat(e);return!isNaN(t)&&Math.round(100*t)/100},SnakeFlag:{head:0,tail:1,body:2}};t.exports=n,cc._RF.pop()},{}],GameScene:[function(e,t,i){"use strict";cc._RF.push(t,"47dd7E6mVJLeKeDzL+4OXpM","GameScene");var n=e("GameData");cc.Class({extends:cc.Component,properties:{playerLayer:{default:null,type:cc.Node},bg:{default:null,type:cc.Node},goodsLayer:{default:null,type:cc.Node},joystick:{default:null,type:cc.Node},camera:{default:null,type:cc.Camera}},onLoad:function(){var e=this;this.touchStartPos=null,this.bg.on(cc.Node.EventType.TOUCH_START,this.onTouchStart,this),this.bg.on(cc.Node.EventType.TOUCH_MOVE,this.onTouchMove,this),this.bg.on(cc.Node.EventType.TOUCH_END,this.onTouchEnd,this),window.GlobalEvent=new cc.EventTarget,GlobalEvent.on("getGoods",this.getGoods,this),GlobalEvent.on("gameover",this.gameOver,this),this.joystickCom=this.joystick.getComponent("JoyStick"),this.joystickCom.hideDirection(),this.palyerFactory=this.playerLayer.getComponent("PlayerFactory"),this.goodsFactory=this.goodsLayer.getComponent("GoodsFactory"),cc.game.renderType===cc.game.RENDER_TYPE_CANVAS&&cc.renderer.enableDirtyRegion(!1);for(var t=0,i=function(i){var s=e;cc.resources.load("skin/snakePack"+i,cc.SpriteAtlas,function(e,i){e?cc.log("err - ",e):(n.skinFrameArray.push(i),cc.log("GameData.skinFrameArray ====  ",n.skinFrameArray),2==++t&&s.gameStart())})},s=2;s>0;s--)i(s)},start:function(){n.curValue=0},gameStart:function(){cc.log("gameStart =====  "),n.isGameStart=!0,this.palyerFactory.init(),this.camera.getComponent("CameraMove").init()},onTouchStart:function(e,t){if(!n.isGameStart)return!1;var i=e.getLocation();return this.touchStartPos=i,!0},onTouchMove:function(e,t){if(n.isGameStart){var i=e.getLocation().sub(this.touchStartPos),s=cc.Vec2(1,0),a=i.signAngle(s);this.palyerFactory&&this.palyerFactory.changeDirection(a),this.joystickCom&&this.joystickCom.changeDirection(a)}},onTouchEnd:function(e,t){this.touchStartPos=null,this.joystickCom&&this.joystickCom.hideDirection()},btn_accelerate:function(){cc.log("btn_accelerate"),n.isGameStart&&this.palyerFactory.changeSpeed(25)},getGoods:function(e){},gameOver:function(){n.isGameStart=!1,cc.log("gameOver    ====  gameOver")},update:function(e){}}),cc._RF.pop()},{GameData:"GameData"}],GoodsFactory:[function(e,t,i){"use strict";function n(e,t){var i;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(i=s(e))||t&&e&&"number"==typeof e.length){i&&(e=i);var n=0;return function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}return(i=e[Symbol.iterator]()).next.bind(i)}function s(e,t){if(e){if("string"==typeof e)return a(e,t);var i=Object.prototype.toString.call(e).slice(8,-1);return"Object"===i&&e.constructor&&(i=e.constructor.name),"Map"===i||"Set"===i?Array.from(e):"Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)?a(e,t):void 0}}function a(e,t){(null==t||t>e.length)&&(t=e.length);for(var i=0,n=new Array(t);i<t;i++)n[i]=e[i];return n}cc._RF.push(t,"ea01c6uvGVAtb+gfk+A0Ffy","GoodsFactory");var o=e("GameData"),r=e("goods_config");cc.Class({extends:cc.Component,properties:{goodsArray:{default:[],type:[cc.Prefab]}},onLoad:function(){this.rangeMax=200,this.rangeMin=60,this.numMax=8,this.numMin=4,this.baseTotalNum=0,this.addGoodsNum=0,this.addGoodsMaxNum=5,this.curTime=0,this.widthGap=800,this.heightGap=600,this.poolNum=30,this.snakeDeadDis=5,this.snakeDeadTimes=0,this.snakeInitTime=0,this.goodsLeftUp=[],this.goodsLeftDown=[],this.goodsRightUp=[],this.goodsRightDown=[],this.snakeDeadPos=[],this.isGameStart=!1,GlobalEvent.on("snakeDead",this.snakeDead,this),GlobalEvent.on("snakeMove",this.checkGoodsCollision,this),this.initPool();var e=o.worldWidth/this.widthGap,t=o.worldHeight/this.heightGap;this.baseTotalNum=Math.floor(e*t)},start:function(){},initPool:function(){for(var e=0;e<r.length;e++){o.nodePool[r[e].name]||(o.nodePool[r[e].name]=new cc.NodePool);for(var t=0;t<this.poolNum;t++)if(this.goodsArray[e]){var i=cc.instantiate(this.goodsArray[e]);o.nodePool[r[e].name].put(i)}}},addGoods:function(e){for(var t=Math.floor(Math.random()*this.numMax)+this.numMin,i=0;i<t;i++)this.addSigleGoods(0,e)},addSigleGoods:function(e,t){if(this.goodsArray[e]&&r[e]){var i,n=r[e].name;i=o.nodePool[n]&&o.nodePool[n].size()>0?o.nodePool[n].get():cc.instantiate(this.goodsArray[e]);var s=Math.random()*this.rangeMax-this.rangeMin,a=Math.random()*this.rangeMax-this.rangeMin;i.x=t.x+s,i.y=t.y+a,i.getComponent("Goods").init(e,o.nodePool[n]),this.node.addChild(i),i.x<=0&&i.y<=0?this.goodsLeftDown.push(i):i.x<=0&&i.y>0?this.goodsLeftUp.push(i):i.x>0&&i.y<=0?this.goodsRightDown.push(i):this.goodsRightUp.push(i)}},checkRcetHas:function(e,t){return!(e.x+this.rangeMax>=t.x&&e.x<=t.x&&e.y+this.rangeMax>=t.y&&e.y<=t.y)},getRandPos:function(){var e=-o.worldWidth/2+cc.winSize.width,t=o.worldWidth/2-cc.winSize.width-this.rangeMax,i=-o.worldHeight/2+cc.winSize.height,n=o.worldHeight/2-cc.winSize.height-this.rangeMax;return{x:Math.random()*(t-e)+e,y:Math.random()*(n-i)+i}},update:function(e){if(this.snakeDeadPos.length>this.snakeDeadDis*this.snakeDeadTimes){this.snakeDeadTimes++;for(var t=0;t<this.snakeDeadDis;t++){var i=this.snakeDeadTimes*this.snakeDeadDis+t;this.snakeDeadPos[i]&&this.addSigleGoods(0,this.snakeDeadPos[i])}}else this.snakeDeadPos.length=[],this.snakeDeadTimes=0;if(this.baseTotalNum&&this.baseTotalNum>this.snakeDeadDis*this.snakeInitTime){this.snakeInitTime++;for(var n=0;n<this.snakeDeadDis;n++)this.addGoods(this.getRandPos())}else this.snakeInitTime=0,this.baseTotalNum=0;var s=this.goodsLeftDown.length+this.goodsLeftUp.length+this.goodsRightUp.length+this.goodsRightDown.length;if(this.curTime>=.5&&s<1e3){for(var a=0;a<this.snakeDeadDis;a++)this.addGoods(this.getRandPos());this.curTime=0}else this.curTime+=e},snakeDead:function(e){if(e)for(var t,i=n(e.getComponent("Player").snakeBodyArray);!(t=i()).done;){var s=t.value,a={x:s.x,y:s.y};this.snakeDeadPos.push(a)}},checkGoodsCollision:function(e){if(e.xMin<=0&&e.yMin<=0)for(var t=this.goodsLeftDown.length-1;t>=0;t--){var i=this.goodsLeftDown[t];if(i.getBoundingBox().intersects(e)){var n={x:e.x+e.width/2,y:e.y+e.height/2};this.goldAct(i,n),this.goodsLeftDown.splice(t,1)}}if(e.xMin<=0&&e.yMax>0)for(var s=this.goodsLeftUp.length-1;s>=0;s--){var a=this.goodsLeftUp[s];if(a.getBoundingBox().intersects(e)){var o={x:e.x+e.width/2,y:e.y+e.height/2};this.goldAct(a,o),this.goodsLeftUp.splice(s,1)}}if(e.xMax>0&&e.yMin<=0)for(var r=this.goodsRightDown.length-1;r>=0;r--){var h=this.goodsRightDown[r];if(h.getBoundingBox().intersects(e)){var c={x:e.x+e.width/2,y:e.y+e.height/2};this.goldAct(h,c),this.goodsRightDown.splice(r,1)}}if(e.xMax>0&&e.yMax>0)for(var d=this.goodsRightUp.length-1;d>=0;d--){var l=this.goodsRightUp[d];if(l.getBoundingBox().intersects(e)){var u={x:e.x+e.width/2,y:e.y+e.height/2};this.goldAct(l,u),this.goodsRightUp.splice(d,1)}}},goldAct:function(e,t){var i=e.getComponent("Goods"),n=new cc.Vec2(t.x,t.y);cc.tween(e).to(.1,{position:n}).call(function(){i.destroySelf()}).start()}}),cc._RF.pop()},{GameData:"GameData",goods_config:"goods_config"}],Goods:[function(e,t,i){"use strict";cc._RF.push(t,"840f8Ma/bZAca36JkxS3KKx","Goods"),cc.Class({extends:cc.Component,properties:{effect:{default:null,type:cc.Node}},onLoad:function(){},init:function(e,t){this.node.scale=.3,this.index=e,this.pool=t,this.effect},destroySelf:function(){GlobalEvent.emit("getGoods",this.index),this.pool?this.pool.put(this.node):this.node.destroy()},getRect:function(){var e=1.1*this.node.width*this.node.scale,t=1.1*this.node.height*this.node.scale;return cc.rect(this.node.x-e/2,this.node.y/2,e,t)}}),cc._RF.pop()},{}],JoyStick:[function(e,t,i){"use strict";cc._RF.push(t,"607fdl37/1I3p68BWQvx+xv","JoyStick"),cc.Class({extends:cc.Component,properties:{horker:{default:null,type:cc.Node},horker_d:{default:null,type:cc.Node}},onLoad:function(){this.horkerLen=52,this.horker_dLen=100,this.horker_d.active=!1},changeDirection:function(e){var t=Math.cos(e),i=-Math.sin(e);this.horker.x=this.horkerLen*t,this.horker.y=this.horkerLen*i,this.horker_d.active=!0,this.horker_d.angle=180*-e/Math.PI,this.horker_d.x=this.horker_dLen*t,this.horker_d.y=this.horker_dLen*i},hideDirection:function(){this.horker.x=0,this.horker.y=0,this.horker_d.active=!1},update:function(e){}}),cc._RF.pop()},{}],PlayerFactory:[function(e,t,i){"use strict";function n(e,t){var i;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(i=s(e))||t&&e&&"number"==typeof e.length){i&&(e=i);var n=0;return function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}return(i=e[Symbol.iterator]()).next.bind(i)}function s(e,t){if(e){if("string"==typeof e)return a(e,t);var i=Object.prototype.toString.call(e).slice(8,-1);return"Object"===i&&e.constructor&&(i=e.constructor.name),"Map"===i||"Set"===i?Array.from(e):"Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)?a(e,t):void 0}}function a(e,t){(null==t||t>e.length)&&(t=e.length);for(var i=0,n=new Array(t);i<t;i++)n[i]=e[i];return n}cc._RF.push(t,"53400RbFhpN86W6meHeJdkl","PlayerFactory");var o=e("./GameData");cc.Class({extends:cc.Component,properties:{checkCollision:2},onLoad:function(){this.enemyArray=[],this.enenmyPoolNum=5,this.totalEnemyNum=0,this.createEnemyTime=1,this.curTime=0,this.checkCollisionTime=0,this.createEnemyPool(),this.enenmyInfo=[],this.testTime=0,GlobalEvent.on("snakeDead",this.snakeDead,this)},start:function(){},init:function(){this.playerNode=this.addSiglePlayer(0),this.playerCom=this.playerNode.getComponent("Player"),this.playerCom.initPlayer()},changeDirection:function(e){this.playerCom.changeDirection(e)},changeSpeed:function(e){this.playerCom.changeSpeed(e)},createEnemyPool:function(){o.enemyPool||(o.enemyPool=new cc.NodePool);for(var e=0;e<this.enenmyPoolNum;e++){var t=this.node.getChildByName("player"),i=cc.instantiate(t);o.enemyPool.put(i)}},initEnemy:function(e){this.addSiglePlayer(1,e)},addSiglePlayer:function(e,t){var i;if(o.enemyPool&&o.enemyPool.size()>0)i=o.enemyPool.get();else{var n=this.node.getChildByName("player");i=cc.instantiate(n)}var s=i.getComponent("Player");return i.x=0,i.y=0,this.node.addChild(i),e>0&&(s.initEnemy(t),this.enemyArray.push(i)),i},update:function(e){if(o.isGameStart){if(this.enemyArray.length<this.totalEnemyNum)if(this.curTime>this.createEnemyTime){var t=this.enenmyInfo[this.enemyArray.length]||{};this.initEnemy(t),this.curTime=0}else this.curTime+=e;if(this.checkCollisionTime>this.checkCollision)for(var i,s=n(this.enemyArray);!(i=s()).done;){var a=i.value;if(a.getComponent("Player").willCollision(this.playerNode))for(var r=0;r<this.enemyArray.length;r++){if(this.enemyArray[r]!=a)if(a.getComponent("Player").willCollision(this.enemyArray[r])){this.checkCollisionTime=0;break}}}else this.checkCollisionTime+=e}},snakeDead:function(e){e&&(e.getComponent("Player").snakeDead(),this.enemyArray.indexOf(e)>-1?this.enemyArray.splice(this.enemyArray.indexOf(e),1):GlobalEvent.emit("gameover"),o.enemyPool.put(e))}}),cc._RF.pop()},{"./GameData":"GameData"}],Player:[function(e,t,i){"use strict";function n(e,t){var i;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(i=s(e))||t&&e&&"number"==typeof e.length){i&&(e=i);var n=0;return function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}return(i=e[Symbol.iterator]()).next.bind(i)}function s(e,t){if(e){if("string"==typeof e)return a(e,t);var i=Object.prototype.toString.call(e).slice(8,-1);return"Object"===i&&e.constructor&&(i=e.constructor.name),"Map"===i||"Set"===i?Array.from(e):"Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)?a(e,t):void 0}}function a(e,t){(null==t||t>e.length)&&(t=e.length);for(var i=0,n=new Array(t);i<t;i++)n[i]=e[i];return n}cc._RF.push(t,"272bcpNkw5NJ63qiaAXiHV1","Player");var o=e("GameData"),r=e("goods_config"),h=e("Snake_skin_config"),c="none",d="create",l="gamestart",u="dead";cc.Class({extends:cc.Component,properties:{prefab_body:{default:null,type:cc.Prefab}},onLoad:function(){this.maxOrderIndex=1e4,this.snakeGap=15,this.fixedSpeed=5,this.snakeMaxNode=15e3,this.changeMove=1,this.originAngle=0,this.bodyPoolNum=60,this.invincibleTime=5,this.turnMaxDegree=3/180*Math.PI,this.type=1,this.snakeSkinIndex=1,this.curNum=0,this.degreeNum=0,this.snakeBodyArray=[],this.movePos=[],this.headSnake,this.curTime=0,this.changeCurTime=0,this.invincibleCurTime=0,this.isInvincible=!1,this.speed=this.fixedSpeed,this.snakeMoveTime=0,this.snakescaleNum=1,this.originSnakeNum=0,this.state=c,this.basePos={x:0,y:0},this.moveBeforSnakePos={},this.snakeBodyNum=0,this.enemyRandDegree=0,this.goodsValue=0,this.reverseTime=100,this.createFlag=!0,GlobalEvent.on("getGoods",this.getGoods,this),o.snakeBodyPool||(o.snakeBodyPool=new cc.NodePool);for(var e=0;e<this.bodyPoolNum;e++){var t=cc.instantiate(this.prefab_body);o.snakeBodyPool.put(t)}},reset:function(){this.degreeNum=0,this.snakeBodyArray=[],this.curNum=0,this.movePos=[],this.headSnake=null,this.curTime=0,this.changeCurTime=0,this.speed=this.fixedSpeed,this.snakescaleNum=1,this.state=c,this.invincibleCurTime=0,this.isInvincible=!0,this.moveBeforSnakePos={},this.snakeSkinIndex=1,this.snakeBodyNum=0,this.isInvincible=!1,this.goodsValue=0,this.notCanMove=!1,this.reverseTime=100,this.createFlag=!0},initPlayer:function(){this.reset(),this.type=0,this.snakeSkinIndex=18,this.originSnakeNum=o.baseSnakeNode,this.state=d},addBody:function(e,t){var i,n,s=h[this.snakeSkinIndex],a=this,r=this.curNum;if(0==this.curNum){if(i=o.SnakeFlag.head,s&&s.head)return void cc.resources.load("prefab/"+s.head,function(n,s){if(n)cc.log("err  ",n);else{var o=cc.instantiate(s);a.snakeNodeInfo(o,e,t,i,r)}})}else if(t&&this.curNum==this.originSnakeNum-1){if(i=o.SnakeFlag.tail,s&&s.tail)return void cc.resources.load("prefab/"+s.tail,function(n,s){if(n)cc.log("err  ",n);else{var o=cc.instantiate(s);a.snakeNodeInfo(o,e,t,i,r)}})}else i=o.SnakeFlag.body,this.snakeBodyNum++;n=o.snakeBodyPool&&o.snakeBodyPool.size()>0?o.snakeBodyPool.get():cc.instantiate(this.prefab_body),a.snakeNodeInfo(n,e,t,i,r)},snakeNodeInfo:function(e,t,i,n,s){var a=this.snakeBodyArray[this.snakeBodyArray.length-1]?this.snakeBodyArray[this.snakeBodyArray.length-1].angle:180*this.originAngle/Math.PI;e.getComponent("Snake_body").init(this.snakeSkinIndex,this.snakeBodyNum,n),e.x=t.x,e.y=t.y,e.scale=this.snakescaleNum,e.angle=a,0==s&&i&&!this.headSnake&&(this.headSnake=e),this.snakeBodyArray.push(e),i&&s==this.originSnakeNum-1?this.node.addChild(e,-1e3):this.node.addChild(e,this.maxOrderIndex-s);var o=this.basePos;this.headSnake&&(o.x=this.headSnake.x,o.y=this.headSnake.y);for(var r=Math.cos(a*Math.PI/180),h=Math.sin(a*Math.PI/180),c=0;c<this.snakeGap;c++){var d=void 0;if(i){var u=s*this.snakeGap+c;d={x:o.x-u*r,y:o.y-u*h}}else d={x:o.x-r,y:o.y-h};this.movePos.push(d)}if(i&&(this.node.opacity=0,s==this.originSnakeNum-1)){this.getScaleSize();var y=this;cc.tween(this.node).to(.2,{opacity:255}).call(function(){y.state=l}).start()}i||(e.opacity=0,this.changeSnakeBody()),this.createFlag=!0},changeSnakeBody:function(){var e=this.snakeBodyArray[this.snakeBodyArray.length-2],t=this.snakeBodyArray[this.snakeBodyArray.length-1],i={x:e.x,y:e.y};e.x=t.x,e.y=t.y,t.x=i.x,t.y=i.y,this.snakeBodyArray[this.snakeBodyArray.length-2]=t,this.snakeBodyArray[this.snakeBodyArray.length-1]=e,t.opacity=255},increaseSnake:function(){if(this.snakeBodyArray.length>0&&this.snakeBodyArray.length<this.snakeMaxNode){var e=this.snakeBodyArray[this.snakeBodyArray.length-1].angle,t=this.snakeBodyArray[this.snakeBodyArray.length-1].x,i=this.snakeBodyArray[this.snakeBodyArray.length-1].y,n={x:t+this.snakeGap*Math.cos(e*Math.PI/180),y:i+this.snakeGap*Math.sin(e*Math.PI/180)};this.addBody(n),this.curNum++}this.getScaleSize()},getScaleSize:function(){this.curNum<15?this.snakeScale(.8):this.curNum<30?this.snakeScale(.9):this.curNum<60?this.snakeScale(1):this.curNum<90?this.snakeScale(1.1):this.curNum>120&&this.snakeScale(1.2)},snakeScale:function(e){if(this.snakescaleNum!=e){this.snakescaleNum=e;for(var t,i=n(this.snakeBodyArray);!(t=i()).done;){t.value.getComponent("Snake_body").setSelfScale(e)}}},changeDirection:function(e){if(this.state==l&&this.degreeNum!=e){var t=(e+2*Math.PI)%(2*Math.PI);this.degreeNum=(this.degreeNum+2*Math.PI)%(2*Math.PI),Math.abs(t-this.degreeNum)<Math.PI?this.degreeNum<t?this.degreeNum+=this.turnMaxDegree:this.degreeNum-=this.turnMaxDegree:this.degreeNum<t?this.degreeNum-=this.turnMaxDegree:this.degreeNum+=this.turnMaxDegree,this.degreeNum=(this.degreeNum+2*Math.PI)%(2*Math.PI)}},updateBodyPos:function(){this.moveBeforSnakePos={x:this.headSnake.x,y:this.headSnake.y};for(var e=0;e<this.snakeBodyArray.length;e++){var t=this.snakeBodyArray[e],i=this.movePos[e*this.snakeGap];if(i){if(t.angle=Math.atan2(i.y-t.y,i.x-t.x)/Math.PI*180,0==e){var n=t.getComponent("Snake_body");GlobalEvent.emit("snakeMove",n.getRect())}t.setPosition(i.x,i.y)}}this.movePos.length>(this.snakeBodyArray.length+1)*this.snakeGap&&(this.movePos.length=(this.snakeBodyArray.length+1)*this.snakeGap)},changeSpeed:function(e){e>this.speed&&(this.speed=e)},outTheWorld:function(){this.notCanMove=!0,cc.log("\u6b7b\u4e86"),GlobalEvent.emit("snakeDead",this.node),this.snakeDead()},update:function(e){if(this.state==d){if(this.curNum<this.originSnakeNum&&this.createFlag){var t=this.basePos,i=Math.cos(this.originAngle),n=Math.sin(this.originAngle),s={x:t.x-this.curNum*this.snakeGap*i,y:t.y-this.curNum*this.snakeGap*n};this.createFlag=!1,this.addBody(s,!0),this.curNum++}}else if(this.state!=l||this.notCanMove)this.state;else{0!=this.type&&(this.enemyRandDegree&&Math.abs(this.enemyRandDegree-this.degreeNum)>=this.turnMaxDegree?this.changeDirection(this.enemyRandDegree):this.enemyRandDegree=0);var a=Math.cos(this.degreeNum)*this.speed,r=Math.sin(this.degreeNum)*this.speed,h={x:this.headSnake.x,y:this.headSnake.y},c={x:this.headSnake.x,y:this.headSnake.y};if(0!=this.type&&(this.reverseTime>1?((c.x+a>=o.worldWidth/2-cc.winSize.width||c.x+a<=-o.worldWidth/2+cc.winSize.width)&&(this.reverseMove(1),this.reverseTime=0),(c.y-r>=o.worldHeight/2-cc.winSize.height||c.y-r<=-o.worldHeight/2+cc.winSize.height)&&(this.reverseMove(),this.reverseTime=0)):this.reverseTime+=e),!(c.x+a<o.worldWidth/2-cc.winSize.width/2&&c.x+a>-o.worldWidth/2+cc.winSize.width/2))return void this.outTheWorld();if(c.x+=a,!(c.y-r<o.worldHeight/2-cc.winSize.height/2&&c.y-r>-o.worldHeight/2+cc.winSize.height/2))return void this.outTheWorld();c.y-=r,this.movePos.reverse();for(var u=Math.cos(Math.atan2(c.y-h.y,c.x-h.x)),y=Math.sin(Math.atan2(c.y-h.y,c.x-h.x)),g=1;g<=this.speed;g++)this.movePos.push({x:g*u+h.x,y:g*y+h.y});if(this.movePos.reverse(),this.updateBodyPos(),this.isInvincible&&this.invincibleCurTime<this.invincibleTime)this.invincibleCurTime+=e;else if(this.headSnake){var m=this.headSnake.getBoundingBox();this.isInvincible=!1,this.checkCollision(m)}this.fixedSpeed<this.speed&&(this.curTime+=e,this.curTime>.5&&(this.speed=this.fixedSpeed,this.curTime=0)),0!=this.type&&(this.changeCurTime>=this.changeMove?this.randomMove():this.changeCurTime+=e)}},getGoods:function(e){this.goodsValue+=r[e].value,this.goodsValue>=500&&(this.increaseSnake(),this.goodsValue=0)},initEnemy:function(e){this.reset(),this.basePos=e.pos||this.getEnemyPos(),this.state=d,this.type=1,this.originSnakeNum=Math.floor(20*Math.random())+2,this.notCanMove=e.notCanMove;var t=Math.floor(20*Math.random())+1;this.snakeSkinIndex=e.snakeIndex||t,cc.log("snakeIndex ----------  ",this.snakeSkinIndex),this.turnMaxDegree=5/180*Math.PI,this.randomMove()},getEnemyPos:function(){var e=[];e.push([-o.worldWidth/2+cc.winSize.width,-cc.winSize.width/2-o.snakeWidth]),e.push([cc.winSize.width/2+o.snakeWidth,o.worldWidth/2-cc.winSize.width]),e.push([-o.worldHeight/2+cc.winSize.width,-cc.winSize.height/2-o.snakeWidth]),e.push([cc.winSize.height/2+o.snakeWidth,o.worldHeight/2-cc.winSize.width]);var t=Math.floor(2*Math.random()),i=Math.floor(2*Math.random())+2;return{x:Math.random()*(e[t][1]-e[t][0])+e[t][0],y:Math.random()*(e[i][1]-e[i][0])+e[i][0]}},reverseMove:function(e){this.enemyRandDegree||(this.changeCurTime=0,this.enemyRandDegree=this.degreeNum-Math.PI,this.enemyRandDegree=(this.enemyRandDegree+2*Math.PI)%(2*Math.PI))},randomMove:function(){this.changeCurTime=0,this.enemyRandDegree=2*Math.random()*Math.PI,this.changeMove=5*Math.random()+1},snakeDead:function(){this.state=u;for(var e,t=n(this.snakeBodyArray);!(e=t()).done;){e.value.getComponent("Snake_body").dealDead(o.snakeBodyPool)}this.snakeBodyArray=[],this.movePos=[],this.headSnake=null},willCollision:function(e){if(e&&this.headSnake){var t=this.headSnake.getBoundingBox(),i=Math.cos(this.degreeNum)*this.speed,n=Math.sin(this.degreeNum)*this.speed;t.x+=i,t.y-=n;for(var s=[],a=3;a<10;a++){var o=t;o.x+=i*a,o.y-=n*a,s.push(o)}for(var r=0;r<s.length;r++)if(this.isCollision(s[r],e))return this.reverseMove(),!0;return!1}},isCollision:function(e,t){if(t){var i=t.getComponent("Player");if(i.isInvincible)return!1;for(var n=0;n<i.snakeBodyArray.length;n++)if(e.intersects(i.snakeBodyArray[n].getBoundingBox()))return!0;return!1}},checkCollision:function(e){var t=this.node.parent.getComponent("PlayerFactory");if(0==this.type)for(var i,s=n(t.enemyArray);!(i=s()).done;){var a=i.value;this.isCollision(e,a)&&this.outTheWorld()}else if(this.isCollision(e,t.playerNode))this.outTheWorld();else for(var o,r=n(t.enemyArray);!(o=r()).done;){var h=o.value;h!=this.node&&this.isCollision(e,h)&&this.outTheWorld()}}}),cc._RF.pop()},{GameData:"GameData",Snake_skin_config:"Snake_skin_config",goods_config:"goods_config"}],Snake_body:[function(e,t,i){"use strict";cc._RF.push(t,"6463500/5xDepPwnzcbgLw7","Snake_body");var n=e("Snake_skin_config"),s=e("GameData");cc.Class({extends:cc.Component,properties:{sprite:{default:null,type:cc.Sprite}},onLoad:function(){this.angle=0,this.degreeNum=0,this.speed=1,this.snakeIndex=0,this.rectRate=2,this.changeObj=[],this.snakeFlag},start:function(){},init:function(e,t,i){15==e&&(e+=1),this.snakeIndex=e,this.index=t,this.node.nIndex=t,this.snakeInfo=n[e],this.rectRate=.2,this.snakeFlag=i;var a,o=[],r=Math.ceil(e/10)-1,h=s.skinFrameArray[r];if(i==s.SnakeFlag.head)this.snakeInfo.head||(this.sprite.node.angle=90,a="snake_t_"+e),this.snakeInfo.headSize&&(o=this.snakeInfo.headSize);else if(i==s.SnakeFlag.tail)this.snakeInfo.tail||(a="snake_w_"+e),this.snakeInfo.tailSize&&(o=this.snakeInfo.tailSize);else if(this.sprite.node.color=cc.color(255,255,255),this.snakeInfo&&this.snakeInfo.colors){var c=(t-1)%this.snakeInfo.colors.length,d=this.snakeInfo.colors[c];this.sprite.node.color=new cc.color(d[0],d[1],d[2])}else{a="snake_"+e+"_"+((t-1)%this.snakeInfo.snakeLen+this.snakeInfo.start)}a&&(this.sprite.spriteFrame=h.getSpriteFrame(a)),this.node.width=o[0]||.9*this.sprite.node.width,this.node.height=o[1]||.9*this.sprite.node.height},setSelfScale:function(e){this.node.scale!=e&&(this.node.scale=e)},getRect:function(){var e=this.node.getBoundingBox().clone();return e.x-=e.width*this.rectRate/2,e.y-=e.height*this.rectRate/2,e.width=e.width*(1+this.rectRate),e.height=e.height*(1+this.rectRate),e},dealDead:function(e){this.snakeInfo.head||this.snakeInfo.tail?this.node.destroy():e.put(this.node)}}),cc._RF.pop()},{GameData:"GameData",Snake_skin_config:"Snake_skin_config"}],Snake_skin_config:[function(e,t,i){"use strict";cc._RF.push(t,"3af36BCVyBJtbOfycQGzSXn","Snake_skin_config");t.exports={1:{snakeLen:17,start:2,colors:[[0,180,0],[180,180,0],[0,180,180],[180,180,180]]},2:{snakeLen:17,start:2},3:{snakeLen:17,start:2},4:{snakeLen:17,start:2},5:{snakeLen:17,start:2},6:{snakeLen:17,start:2},7:{snakeLen:17,start:2},8:{snakeLen:17,start:2},9:{snakeLen:17,start:2},10:{snakeLen:16,start:2},11:{snakeLen:17,start:2},12:{snakeLen:15,start:2},13:{snakeLen:16,start:2},14:{snakeLen:17,start:2},16:{snakeLen:17,start:2},17:{snakeLen:17,start:2},18:{snakeLen:17,start:2,head:"snake_head18",headSize:[51,51]},19:{snakeLen:14,start:2,tail:"snake_tail19",tailSize:[50,52]},20:{snakeLen:15,start:2},41:{snakeLen:18,start:2}},cc._RF.pop()},{}],goods_config:[function(e,t,i){"use strict";cc._RF.push(t,"1f37dJFEEhKAp7x0QzF5if9","goods_config");t.exports=[{name:"gold",value:10,weight:1}],cc._RF.pop()},{}]},{},["CameraMove","GameData","GameScene","Goods","GoodsFactory","JoyStick","Player","PlayerFactory","Snake_body","Snake_skin_config","goods_config"]);
import {createButton, getRealSize, renderBg, readJSONSync, renderTitle,setUserScore} from './util';

// requirePlugin("WXEngine")
GameGlobal.engine = requirePlugin('WXEngine', {
  enableRequireHostModule: true, // 是否允许插件引用宿主的模块，默认 false
  customEnv: { // 传递给插件的值，多次调用传递会覆盖写（Object.assign）
    wx
  }
})

/**
 * Register global canvas.
 */
let canvas = GameGlobal.canvas ? GameGlobal.canvas : (GameGlobal.canvas = wx.createCanvas());

/**
 * Try to get the url prefix in configure file.
 */
let engineConfig = readJSONSync("engine.config.json");
let urlPrefix = "file:///dist/";
let globalSetting = {};
if (engineConfig && (typeof (engineConfig.globalSetting) === "object")) {
  globalSetting = engineConfig.globalSetting;
  if (engineConfig.globalSetting.BaseURL || engineConfig.globalSetting.baseURL) {
    urlPrefix = engineConfig.globalSetting.BaseURL || engineConfig.globalSetting.baseURL;
  }
}

/**
 * Initialize the engine.
 */
engine.init(canvas, globalSetting);

/**
 * Create global game.
 */
let game = GameGlobal.game = new engine.Game(720, 1280);

/**
 * Load entry scenes.
 */
const openDataContext = wx.getOpenDataContext();
const sharedCanvas    = openDataContext.canvas;
const info = wx.getSystemInfoSync();

/**
 * Run the game.
 */
game.run();

// 渲染灰色的场景背景
renderBg();
renderTitle();

// 绘制好友排行榜按钮
createButton({
  src: 'images/friend.png',
  width: 370,
  height: 130,
  x: -420,
  y: -1000
}, (touch, res) => {
  // showSingleFriend();
  showFriendList();
});

// 绘制单个好友按钮
createButton({
  src: 'images/single.png',
  width: 370,
  height: 130,
  x: 0,
  y: -1000
}, (touch, res) => {
  showSingleFriend();
});

// 绘制上报分数按钮
createButton({
  src: 'images/report.png',
  width: 370,
  height: 130,
  x: 420,
  y: -1000
}, (touch, res) => {
  setUserScore(Math.floor(Math.random() * 1000 + 1))
});

let single;
let list;

function clear() {
  if (single) {
    game._activeScene2D.root.transform2D.removeChild(single.transform2D);
  }

  if (list) {
    game._activeScene2D.root.transform2D.removeChild(list.transform2D);
  }
}

// 展示单个好友
function showSingleFriend() {
  clear();
  sharedCanvas.width  = 400;
  sharedCanvas.height = 400;
  
  single = game.createEntity2D("img");
  single = single;
  single.transform2D.size.x = 300;
  single.transform2D.size.y = 300;
  single.transform2D.position.x = 0;
  single.transform2D.position.y = 400;
  const img = single.addComponent(engine.UISprite);

  game._activeScene2D.root.transform2D.addChild(single.transform2D);

  const {realWidth, realHeight, realX, realY} = getRealSize(single);  

  // 告诉子域在主屏上渲染的真实物理位置，子域监听到该事件后会去获取排行榜
  openDataContext.postMessage({
    event: 'showSingleFriend',
    box       : {
        width  : realWidth,
        height : realHeight,
        x      : realX,
        y      : realY
    }
  });

  function renderSharedCanvas() {
    const tex = new engine.Texture2D();
    tex._needPremultiplyAlpha = true;
  
    tex.initWithCanvas(sharedCanvas);
    const sf = engine.SpriteFrame.createFromTexture(tex);
    img.spriteFrame = sf;

    if (info.platform !== 'ios') {
      requestAnimationFrame(renderSharedCanvas)
    }
  }

  requestAnimationFrame(renderSharedCanvas)
}

// 展示好友排行榜
function showFriendList() {
  clear();
  const SHAREDWIDTH = 960;
  const SHAREDHEIGHT = 1300;
  sharedCanvas.width  = SHAREDWIDTH;
  sharedCanvas.height = SHAREDHEIGHT;
  
  list = game.createEntity2D("img");
  list.transform2D.size.x = SHAREDWIDTH;
  list.transform2D.size.y = SHAREDHEIGHT;
  list.transform2D.position.x = 0;
  list.transform2D.position.y = 100;

  game._activeScene2D.root.transform2D.addChild(list.transform2D);

  const {realWidth, realHeight, realX, realY} = getRealSize(list);  

  // 告诉子域在主屏上渲染的真实物理位置，子域监听到该事件后会去获取排行榜
  openDataContext.postMessage({
    event: 'showFriendList',
    box       : {
        width  : realWidth,
        height : realHeight,
        x      : realX,
        y      : realY
    }
  });
  // openDataContext.postMessage({
  //   event: 'showFriendList',
  //   box       : {
  //       width  : realWidth,
  //       height : realHeight,
  //       x      : realX,
  //       y      : realY
  //   }
  // });

  const img = list.addComponent(engine.UISprite);
  function renderSharedCanvas() {
    const tex = new engine.Texture2D();
    tex._needPremultiplyAlpha = true
  
    tex.initWithCanvas(sharedCanvas);
    const sf = engine.SpriteFrame.createFromTexture(tex);
    img.spriteFrame = sf;
    
    if (info.platform !== 'ios') {
      // requestAnimationFrame(renderSharedCanvas)
      // setInterval(renderSharedCanvas, 1000)
    }
  }

  requestAnimationFrame(renderSharedCanvas)
}

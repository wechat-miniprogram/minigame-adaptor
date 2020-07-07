
export function createButton(params={}, touchCbk) {
  return new Promise((resolve) => {
    const {width=100, height=100, x=0, y =0, src=''} = params;

    const button = engine.game.createEntity2D("img");
    button.transform2D.size.x = width;
    button.transform2D.size.y = height;
    button.transform2D.position.x = x;
    button.transform2D.position.y = y;
    
    engine.game._activeScene2D.root.transform2D.addChild(button.transform2D);

    const touch = button.addComponent(engine.TouchInputComponent);
    touch.onClick.add((touch, res) => {
      touchCbk && touchCbk(touch, res)
    })
  
    const sprite = button.addComponent(engine.UISprite);
  
    const image = wx.createImage();
    image.src = src;
    image.onload = () => {
      const tex = new engine.Texture2D();
      tex.initWithImage(image)
      const sf = engine.SpriteFrame.createFromTexture(tex);
      sprite.spriteFrame = sf;

      resolve(button)
    }
  })
}

export function renderBg() {
  const bg = game.createEntity2D();
  bg.transform2D.size.x = engine.game.rootUICanvas.entity.transform2D.size.x;
  bg.transform2D.size.y = engine.game.rootUICanvas.entity.transform2D.size.y;
  const graphic = bg.addComponent(engine.UIGraphic);
  graphic.color = new engine.Color(210, 210, 210, 255)
  game._activeScene2D.root.transform2D.addChild(bg.transform2D);
}

// 获取一些固定尺寸信息
const info = wx.getSystemInfoSync();
const screenWidth = info.screenWidth;
const screenHeight = info.screenHeight;

/**
 * 获取2D场景内entity实际的物理尺寸和位置
 * 先计算场景尺寸和物理尺寸的比值，再根据纹理尺寸换算出实际的物理尺寸
 * 
 */
export function getRealSize(entity) {
  const worldWidth = engine.game.rootUICanvas.entity.transform2D.size.x;
  const worldHeight = engine.game.rootUICanvas.entity.transform2D.size.y; 
  
  const width = entity.transform2D.size.x;
  const height = entity.transform2D.size.y;

  const x = entity.transform2D.worldPosition.x;
  const y = entity.transform2D.worldPosition.y;

  const realWidth = (screenWidth / worldWidth) * width;
  const realHeight  = (screenHeight / worldHeight) * height;

  const realX = (worldWidth / 2 - x - width / 2) * (screenWidth / worldWidth);
  const realY = (worldHeight / 2 - y - height / 2) * (screenHeight / worldHeight);

  return {realWidth, realHeight, realX, realY}
}

export function renderTitle() {
  const textEntity = engine.game.createEntity2D();
  const text = textEntity.addComponent(engine.UILabel);
  text.text = '微信引擎开放数据域示例';
  text.align = 2;
  text.fontSize = 60;
  text.fontColor = new engine.Color(1, 1, 1, 200)
  engine.game._activeScene2D.root.transform2D.addChild(textEntity.transform2D);
}

/**
* Read a json file and return the object.
* Null will be returned if error occurs when parsing JSON.
* @param {string} path 
*/
export function readJSONSync(path) {
 var manager = wx.getFileSystemManager();
 var res = null;
 try {
   res = JSON.parse(manager.readFileSync(path, "utf8"));
 } catch (error) { }
 return res;
}

export function setUserScore(score) {
  wx.setUserCloudStorage({
    KVDataList: [
        {   key  : 'rankScore',
            value: JSON.stringify({
                wxgame: {
                    score  : score,
                    update_time: parseInt(+new Date() / 1000)
                }
            })
        },
    ],
    success: () => {
        wx.showToast({
            title: `分数上报成功: ${ score }分`,
            icon: 'none',
            duration: 2000
        });
    }
});
}
## 开放数据域
为了丰富游戏的社交玩法，我们为开发者提供 关系链数据 能力。通过关系链数据能力，可满足游戏内 排行榜、好友超越等使用场景，关系链数据的使用可以参见[文档](https://developers.weixin.qq.com/minigame/dev/guide/open-ability/open-data.html)。现阶段，微信引擎使用关系链数据仍然是采用开放数据域的方式。

### 示例
针对微信引擎内使用开放数据域，我们我们提供了示例，示例的安装使用规则如下：

* 在微信开发者工具导入项目`examples/minigame-opendata-demo`；
* 将`examples/minigame-opendata-demoproject.config.json`里面的appid换成自己的appid;

最终示例运行效果如下图：
<img src="./image/opendata.png" width="350">

### 使用流程
首先按照[文档](https://developers.weixin.qq.com/minigame/dev/guide/open-ability/open-data.html)的开发规范，开放数据域只负责拉取关系链数据并渲染到sharedCanvas上面，下面介绍微信引擎如何渲染sharedCanvas到主域上面。

#### 创建entity用于承载纹理
创建一个entity并添加到2D场景上。
```js
const list = game.createEntity2D("img");
list.transform2D.size.x = SHAREDWIDTH;
list.transform2D.size.y = SHAREDHEIGHT;
list.transform2D.position.x = 0;
list.transform2D.position.y = 100;

game._activeScene2D.root.transform2D.addChild(list.transform2D);
```

#### 为entity添加纹理
* 1. 为entity挂载UISprite组件；
* 2. 通过initWithCanvas的方式创建纹理并且将UISprite的spriteFrame设置为对应的纹理；

 这里需要格外注意的是，**主域是不知道开放数据域什么时候绘制完成**的，所以按照以前的方式，主域只能轮询去刷新纹理，这样对性能也是不小的负担，为此，engine.Texture2D提供了共享纹理的能力，在真机上不需要手动刷新即可自动更新纹理，开发者工具上暂不支持，需要通过getSystemInfoSync接口获取当前的platform，如果platform为devtools，需要手动刷新纹理。
```js
const info = wx.getSystemInfoSync();
const img = list.addComponent(engine.UISprite);
function renderSharedCanvas() {
    const tex = new engine.Texture2D();
    tex._needPremultiplyAlpha = true

    tex.initWithCanvas(sharedCanvas);
    const sf = engine.SpriteFrame.createFromTexture(tex);
    img.spriteFrame = sf;

    if (info.platform !== 'ios') {
        // requestAnimationFrame(renderSharedCanvas)
        setInterval(renderSharedCanvas, 1000)
    }
}   

requestAnimationFrame(renderSharedCanvas)
```

#### 避免共享纹理时序问题
上面提到，通过initWithCanvas可以将sharedCanvas创建成纹理，并且通过_needPremultiplyAlpha属性可以将该纹理声明为共享纹理。
```js
const tex = new engine.Texture2D();
tex._needPremultiplyAlpha = true

tex.initWithCanvas(sharedCanvas);
```

但是initWithCanvas 并代表真正地提交纹理了，这里可能会存在一定的时序问题。因此开放数据域执行真正的绘制要采用下面的方式来避免时序问题
```js
let requestID;
requestID && cancelAnimationFrame(requestID);
requestID = requestAnimationFrame(() => {
    // 这里执行真正的绘制操作
    Layout.layout(sharedContext);
});
```
## 微信引擎开放数据域demo

### 简介
微信引擎针对关系链数据设计了新的开放数据域方案，但是微信引擎仍然可以采用原有的[开放数据域](https://developers.weixin.qq.com/minigame/dev/guide/open-ability/open-data.html)方案，本仓库简单演示如何在微信引擎使用开放数据域。

### 安装使用
1.git clone 仓库到本地；
2.将project.config.json里面的appid换成自己的appid；
3.在微信开发者工具导入本仓库；

如果出现微信开发者工具不能正确渲染的情况，请尝试下面的操作：

1.切换到引擎工具界面切换一个引擎的版本号，再切回原来的版本号，这个会触发一次工具对基础库的更新；
2.重启微信开发者工具；

### 具体方案
demo的思路很简单，在开放数据域处理绘制逻辑，比如拉取好友排行榜数据然后绘制到sharedCanvas，然后将sharedCanvas创建成一个纹理，在主域里面贴到2D场景上即可。

demo里sharedCanvas绘制逻辑采用了[minigame-canvas-engine](https://wechat-miniprogram.github.io/minigame-canvas-engine/)方案，旨在降低canvas界面开发门槛，如果不想用该方案，可以裸写canvas界面或者引入其他游戏引擎（如cocos）。

### minigame-canvas-engine使用
1.首先仔细阅读使用文档，了解渲染引擎的大概原理；
2.在[Playground](https://wechat-miniprogram.github.io/minigame-canvas-engine/playground.html)调试UI，左下角可以导出模板渲染函数
```
/**
 * xml经过doT.js编译出的模板函数
 * 因为小游戏不支持new Function，模板函数只能外部编译
 * 可直接拷贝本函数到小游戏中使用
 */
function anonymous(it) {
    var out = '<view class="container" id="main"> ';
    var arr1 = it.list;
    if (arr1) {
        var item, index = -1,
            l1 = arr1.length - 1;
        while (index < l1) {
            item = arr1[index += 1];
            out += '   <view class="oneUser"> <image class="avatar" src="' + (item.avatar) + '"></image> <text class="userName" value="' + (item.username) + '"></text> <text class="userScore" value="' + (item.score) + '"></text>  </view> ';
        }
    }
    out += '</view>';
    return out;
}
```
3.将模板函数和style替换`minigame/sub/render`内的模板函数和style即可。
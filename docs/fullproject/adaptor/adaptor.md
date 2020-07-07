## 背景
在方案介绍里面我们提到过，插件能够将 C# 代码转换成 JavaScript 代码:
```cs
// C# 代码
var player = Instantiate(enemyPrefab) as GameObject;
var script = player.AddComponent<D3Enemy>();

// 转换成 JavaScript 之后
var player = MiniGameAdaptor.Object.Instantiate(UnityEngine.GameObject, this.enemyPrefab);
var script = player.AddComponent(D3Enemy);
```

在小游戏环境下
```js
window.MiniGameAdaptor = {
    Object: { },
    GameObject: { }
    // ...
}
```

Adaptor 的作用就是通过填充这些空接口，桥接到微信引擎的具体实现。

## 桩代码
Unity 具有非常多的模块和方法，不可能遇到一个就实现一个接口，因此首先要构建一个完全空壳的UnityEngine，在遇到某些需要适配的方法和属性时填充即可。
因此我们编写了一个脚本将生成包含Unity所有的模块和方法的桩代码`js-adaptor`，包含了Unity所有方法的空实现。

## 注入小游戏工程
1. 经过导出插件一键转换脚本之后，adaptor会被自动打包到`WXScripts.mgepackage/minigame-adaptor-runtime.js`
2. 在微信微信引擎开发工具构建项目成功之后，adaptor会被自动打包到`minigame/assets/minigame-adaptor-runtime.js`

理论上，如果一个项目所有用到 Unity 的方法都已经适配过了，在整个转换过程中不需要感知到 adaptor 的存在。

## 引擎分离插件

> 绝大多数小游戏使用游戏引擎开发，使用的游戏引擎版本相似或相同，且在代码包中占比较大。引擎插件能力即是游戏引擎(作为 js 插件)单独在微信客户端进行缓存。
当小游戏首次启动时，如果本地已经存在同类别游戏引擎插件，可直接复用或可通过增量下载的方式快速下载，从而提升启动速度。

引擎分离插件的详细功能说明请查看[文档](https://developers.weixin.qq.com/minigame/dev/guide/base-ability/game-engine-plugin.html)。

### 插件使用
因为 Adaptor 包含的代码比较大，为了节省小游戏代码包体积并且充分理由引擎分离插件的优势，我们将 adaptor 发布成了一个 js 插件。
如果需要使用 adaptor 插件，需要执行两个操作:
1.是在参考[导出配置](../../plugin/script/config.md)在导出代码的时候选择使用引擎插件
![全局配置](../../plugin/image/script3.png)

2.在小游戏工程的`game.json`配置文件声明下面配置：
```json
{
   
    "plugins":{
        "WXBridge":{
            "provider":"wxe92a56f105f5963d",
            "version":"0.0.2"
        }
    }
}
```


## 二次开发
由于一期项目的时间紧，只能适配部分 Unity 接口，当开发者需要自己适配接口时，首先应该去[兼容性列表](./adaptor-list.md)查阅接口是都已经适配，其次按照[开发流程](./adaptor-dev.md)适配接口。


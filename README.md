# minigame-adaptor (Beta)

**重要事项**：本项目处于**Beta**测试阶段，使用时可能不太稳定，如果有任何使用上的问题，欢迎通过扫描本文档最后的二维码联系我们。

`minigame-adaptor`是微信提供的用来降低小游戏开发成本的工具链。

你可以使用这套工具链将`Unity`上的游戏资源（美术资源、脚本资源），迁移到微信小游戏平台，进而在小游戏平台上进行二次开发。

使用`minigame-adaptor`迁移出来的游戏，小游戏平台会使用`微信小游戏性能优化方案`进行加速。相比 webgl，渲染性能提升 3 倍。


## 接入与开发流程

目前我们探索出两套开发流程，分别经过不同游戏的验证。

第一套流程，仅导出 "美术资源"。然后直接在小游戏平台上，使用 js/ts 在`微信小游戏性能优化方案`的基础上开发游戏逻辑。该方案有比较好的 Unity 兼容性，兼容至 Unity3D 5.5+。该方案详情可见 [该文档](./docs/basic/flow.md)。

![](./docs/basic/image/overview.jpg)



第二套流程，导出 "美术资源" + "脚本资源"。 在 Unity2018+ 和 .NET4.x 版本里可以将 C# 脚本转成 js，进而在小游戏平台上二次开发。该方案详情可见 [该文档](./docs/fullproject/flow.md)。

![](./docs/fullproject/image/overview.png)

更具体的工具安装使用流程，可见 [该文档](./docs/plugin/install.md)

## 更多资料

`docs`目录为本项目汇总 [文档](./docs/README.md)

`js-adaptor`目录为 Unity 代码导出方案 js 桥接插件，adaptor 介绍请参考 [文档](./docs/README.md)

`examples`目录为示例

## 更新日志
详见 [CHANGELOG](./CHANGELOG.md)；

## 联系我们

对于该项目有疑问或建议，可关注“做个小游戏”公众号，在对话框中留言联系我们
![扫码联系](./docs/image/qrcode.png)

## 名词
微信小游戏性能优化方案：该方案是整个工具链的核心，后续简称"微信方案"，详见 [该文档](https://developers.weixin.qq.com/minigame/dev/game-engine/
微信小游戏性能优化方案工具：微信小游戏性能优化方案提供的开发者工具，后续简称"微信方案工具"。 [该文档](https://developers.weixin.qq.com/minigame/dev/game-engine/)
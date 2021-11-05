
# minigame-adaptor (Beta)

**重要事项**：如果有任何使用上的问题，欢迎通过扫描本文档最后的二维码联系我们。

`minigame-adaptor`是微信提供的用来降低小游戏开发成本的工具链。

你可以使用这套工具链将`Unity`上的美术资源，迁移到微信小游戏平台，进而在小游戏平台上进行二次开发。

使用`minigame-adaptor`迁移出来的游戏，小游戏平台会使用`微信小游戏性能优化方案`进行加速。相比 webgl，渲染性能提升 3 倍。


## 接入与开发流程

目前我们探索出开发流程，经过不同游戏的验证。开发者在在Unity编辑器导出 "美术资源"，然后直接在小游戏平台上，使用 js/ts 在`微信小游戏性能优化方案`的基础上开发游戏逻辑。该方案有比较好的 Unity 兼容性，兼容至 Unity3D 5.5+。

![](./docs/basic/image/overview.jpg)


## 更多资料

`docs`目录为本项目汇总 [文档](./docs/README.md)

## 更新日志
详见 [CHANGELOG](./CHANGELOG.md)；

## 联系我们

对于该项目有疑问或建议，可加入我们的官方微信群进行讨论：
![扫码联系](./docs/image/wxqrcode.png)

也可以加QQ群：945479925

## 名词
- 微信小游戏性能优化方案：该方案是整个工具链的核心，后续简称"微信方案"，详见 [该文档](https://developers.weixin.qq.com/minigame/dev/game-engine/)
- 微信小游戏性能优化方案工具：微信小游戏性能优化方案提供的开发者工具，后续简称"微信方案工具"。 [该文档](https://developers.weixin.qq.com/minigame/dev/game-engine/)

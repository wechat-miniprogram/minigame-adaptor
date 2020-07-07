## 其他改造

### 物理引擎
现阶段的方案是没有提供物理引擎的，如果工程对于物理引擎的使用仅仅是一些简单的碰撞检测，可以参考[坦克大战示例](../examples/tank.md)对物理引擎的使用尽心简单的改造。

### 本地存储

小游戏内提供了一系列[数据缓存](https://developers.weixin.qq.com/minigame/dev/api/storage/wx.setStorageSync.html)接口用于存储数据到本地缓存。
该本地存储会遵循下列规则
> 除非用户主动删除或因存储空间原因被系统清理，否则数据都一直可用。单个 key 允许存储的最大数据长度为 1MB，所有数据存储上限为 10MB。

而Unity的本地存储是通过[PlayerPrefs](https://docs.unity3d.com/2018.3/Documentation/ScriptReference/PlayerPrefs.html)实现的，这里通过Adaptor，Unity内调用PlayerPrefs方法的时候最终调用的是小游戏的接口，同样受到小游戏接口限制。

### 音频接口

小游戏内提供了[wx.createInnerAudioContext](https://developers.weixin.qq.com/minigame/dev/api/media/audio/wx.createInnerAudioContext.html)等相关接口用于处理音频，这里需要注意的是，小游戏的音频接口是不支持音调处理的，如果 Unity 内使用了音调控制方法，需要屏蔽。

### 粒子系统
粒子系统可以采用导出插件提供的Shader `WXBBShader/ShurikenParticle`，并且需要特别注意的是微信方案不支持rate over distance属性，需要使用rate over time 属性。
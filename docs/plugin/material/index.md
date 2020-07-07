# 材质导出

微信小游戏性能优化方案里的材质资源(material)和Unity3D里的材质资源的设计理念比较一致，都是在选择了一个shader的基础上，设置该shader需要的参数(包括选择贴图)。
![image.png](./image/unity_shader.png)

但在微信方案里，与UnityShader这个概念对应概念叫effect。两者最不一样的地方是，由于渲染管线不一样，着色器代码的运行上会有差异，因此插件暂时没有办法完成Unity3D的shader到微信方案的effect的全自动转换。

所以如果要将Unity3D内的自定义材质导出至微信方案，要满足两点：
1. 在微信方案内，要有一个对应的effect能实现和在Unity3D里的shader一样的显示效果。
2. 在Unity3D导出插件里，要能将UnityShader所使用到的参数，也就是材质上的属性，转化成微信方案里的材质的属性。
目前导出插件主要提供了两条通路协助你完成这两项工作。

## 通过修改为使用导出插件自带Shader完成材质导出

导出插件里包含了一系列 `WXBBShader`为前缀的UnityShader，当你的场景/预制体(prefab)里包括的材质用到的是这些shader时，情况就会很简单。

导出插件会自动帮你将导出的mgepackage里的material，选择成对应的微信方案里的effect，比如当你在Unity3D里选择`WXBBShader/BlinnPhong`时，导出之后在微信方案里就会自动使用`@system/blinnPhongNew`。其渲染效果由微信方案团队保证，两侧应是一致的。
![image.png](./image/wxbbshader.png)

理论上目前大部分较为常规的渲染shader，都可以切换为`WXBBShader/BlinnPhong`或者`WXBBShader/Effect`等，再搭配调参等手段实现想要的效果。这样的物体可以非常容易地完成材质导出。

## 通过实现微信方案effect+编写导出插件MaterialParser完成材质导出

当你在Unity3D里使用的材质，引用的是你自己编写的shader，并且它们不能直接将所使用的Shader修改为导出插件自带Shader的时候。你可以通过以下两个步骤完成材质迁移：

1. 根据微信方案的官方文档，编写一个与你的UnityShader显示效果一致的[微信方案effect。](https://developers.weixin.qq.com/minigame/dev/game-engine/render/shading/effect.html)
2. [编写一个导出插件内的MaterialParser](./parser.md)，使其在导出过程中能生成出带有合适属性的的微信方案material，且其使用的effect名字与你在微信方案里编写的effect名字相同。

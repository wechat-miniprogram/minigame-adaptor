# 使用脚本驱动某个导出模式的导出
导出插件支持开发者通过脚本驱动导出，达到更高的自动化效果。但需要注意的是，一些初始化逻辑还是需要通过导出面板进行，因此在使用导出脚本前，务必验证你的工作环境能通过导出UI完成过一次导出。

## 获得ExportPreset并调用导出
在导出插件里，一个导出模式所代表的逻辑单元叫`Preset`

通过`ExportPreset.GetExportPreset(id)`可以获得某一个导出类型的Preset，比如`导出当前场景`的id为`scene`
```
WeChat.ExportPreset preset = WeChat.ExportPreset.GetExportPreset("scene");
preset.Export();
```
这样子就能直接导出当前场景到你的目标目录

------------------------------------
如果你想获得其它导出类型的id值，可以调用
```
WeChat.ExportPreset.GetAllPresetKeys();
```

## 更改导出模式的配置
像`导出当前场景`这样的导出模式，会提供开发者两个导出选项，如`忽略粒子`、`忽略非激活节点`等。

在脚本驱动导出的时候，同样有办法修改这些配置。你可以如下编写代码
```
WeChat.ExportPreset preset = WeChat.ExportPreset.GetExportPreset("scene");
(preset.exportConfigs as WeChat.HierarchyExportConfig).ignoreParticle = true;
preset.Export();
```
`HierarchyExportConfig`即场景导出时用到的配置类。目前该类和preset的对应关系仍在评估中，如需使用请咨询preset的提供者。

## 指定导出目录
导出插件允许开发者通过脚本更改导出插件当前的导出目标位置。如下调用即可（注意脚本要在editor Assembly下）
```
WeChat.ExportStore.exportPath = "/Users/Wechat/Documents/doc";
```
注意，像这样指定后，后续所有导出（包括使用UI导出）都会将资源包生成到该路径下，并且没有任何UI会展示这个路径。因此建议导出完成后马上将该属性置回空
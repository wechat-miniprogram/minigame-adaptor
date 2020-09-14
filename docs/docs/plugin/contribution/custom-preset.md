# 新增一个导出模式

在导出插件的导出面板里展示的如`导出当前场景`、`导出选中的prefab`这些导出模式，是可以让开发者自行定义的。

## 定义一个Preset(导出模式)
您可以参见导出插件代码`core/editor/src/ExportPreset/SceneExportPreset.cs`，仿写你的导出模式
```
// 定义该导出模式的配置项，这些选项会在你选中该导出模式的时候展示在UI上
public class HierarchyExportConfig : ExportConfig
{
    public bool ignoreNonActive = false;
    public bool ignoreParticle = false;
}

[InitializeOnLoad]
// 声明该preset的名字，及其关联的配置项
// 注意preset名字不要和其他的重复
[DeclarePreset("scene", typeof(HierarchyExportConfig))]

public class SceneExportPreset : ExportPreset
{
    // 在initialize函数里，调用registerExportPreset方法把preset注册进导出插件
    static SceneExportPreset()
    {
        // 这里把上面写的preset名字原封不动填进第一个参数
        ExportPreset.registerExportPreset("scene", new SceneExportPreset());
    }

    public SceneExportPreset() : base()
    {
    }

    // 这个导出模式的中文名字
    public override string GetChineseName()
    {
        return "当前场景";
    }

    // 执行导出时的逻辑函数
    protected override void DoExport()
    {
    }

    // 是否显示该导出模式
    public override bool WillPresetShow()
    {
        return true;
    }
}
```

## 编写导出逻辑
实际上，导出逻辑的重点只是以下两个调用
```
// new 一个WXResource。也就是实例化一个资源转换类。
// 本导出插件所支持的unity资源，可以参见 core/editor/src/Resource/
WXPrefab converter = new WXPrefab(
    prefabRoot, // prefab根结点GameObject
    AssetDatabase.GetAssetPath(WXUtility.GetPrefabSource(prefabRoot))
);

// 调用PresetUtil.writeGroup，把该资源及其依赖的资源写出成一个mgepackage（微信方案使用的资源包格式）
PresetUtil.writeGroup(converter, this);
```
# 新增一种导出组件
导出插件内置了`Transform`，`MeshRenderer`等Unity组件的导出逻辑。但是开发者也可以很方便地实现我们没有实现的组件导出。

## 定义一个组件Converter
在导出插件内，你可以继承`WXComponent`来声明一个组件导出类，我们以`Transform`的实现为例
```
class WXYourComponent : WXComponent {
    // 组件的名称，会在微信方案里实例化的时候用到
    override string getTypeName()
    {
        return "Transform3D";
    }

    private Transform transform;
    public WXYourComponent(Transform transform) 
    {
        this.transform = transform;
    }

    // 定义组件的内容。
    // 参数WXHierarchyContext是用来指代某一个prefab和scene的导出过程。可用于防止组件重复导出
    override JSONObject ToJSON(WXHierarchyContext context) 
    {
        JSONObject json = new JSONObject(JSONObject.Type.OBJECT);
        JSONObject data = new JSONObject(JSONObject.Type.OBJECT);

        // 从UnityTransform里得到数据
        position = ...
        rotation = ...
        scale = ...

        json.AddField("type", this.getTypeName());
        json.AddField("data", data);

        data.AddField("position", position);
        data.AddField("rotation", rotation);
        data.AddField("scale", scale);

        return json;
    }
}
```

## 让导出的过程会使用你的组件Converter
声明好组件转换器之后，还需要让导出插件在递归遍历节点树的时候能调用到你的转换器模块。你可以如下编写，往导出插件内部注册逻辑：
```
[InitializeOnLoad]
class WXYourComponent: WXComponent
{
    static WXYourComponent()
    {
        // 080代表的是遍历的优先级，有时候你可能需要要求你的组件比别的组件更早转换
        WXHierarchyContext.registerComponentConverter("080", IterateComponent);
    }

    private static void IterateComponent(GameObject go, WXEntity obj, WXHierarchyContext context, ExportPreset preset)
    {
        Transform transform = go.GetComponent<Transform>();
        obj.components.Add(
            context.AddComponent(
                // 传入你的转换类
                new WXYourComponent(transform), 
                // 传入原始的组件类
                transform
            )
        );
    }
}
```
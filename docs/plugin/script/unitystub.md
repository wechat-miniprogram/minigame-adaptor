## Unity桩代码重新生成
> 背景: 由于Unity闭源，无法将引擎实现自动转换为js代码，所以需要生成其API接口的同名桩代码（空实现），在对业务逻辑进行转换时，能正确找到使用引擎对应接口的声明。对这部分桩代码的实现部分，详见:[adaptor](../../fullproject/adaptor/adaptor.md) \
由于Unity接口繁多、而且有相当一部分接口使用了下沉`native C++`进行实现、也有使用C#`unsafe`等关键字进行实现，对于后者目前是不支持的，即生成的桩代码也会有问题。因此，在处理Unity桩代码生成的逻辑上，与其他插件的桩代码生成逻辑并不一样：其他桩代码生成会将所有接口全部生成；Unity桩代码采用配置的形式，只对被配置到白名单的`Type`进行桩代码生成。

如果你的工程使用到了目前尚未被配置的类时，将会在代码转换时报错（因为找不到这个类和这个类中的成员/方法）。在`UnityTool/script-export/editor/UnityStubBuilder.cs`文件中，可以对其进行补充。

```cs
namespace WeChat
{
    /// <summary>
    /// UnityStubBuilder将WhiteList中的类型进行反射，并生成对应的桩代码
    /// </summary>
    public class UnityStubBuilder
    {
        /// <summary>
        /// 反射类型白名单
        /// </summary>
        /// <value>Type</value>
        private static readonly Type[] WhiteList =
        {
            // Pure
            typeof(Random),
            typeof(Vector2),
            typeof(Vector3),
            typeof(Mathf),
            typeof(Quaternion),
            typeof(Color),
            ......
        }
    }
}
```

只需在上述`白名单`中，加入需要被识别的类型即可。这个文件中的`其他部分`**请不要进行任何改动**，否则可能会导致生成失败。

在补充完毕后，需要执行菜单栏中的`微信小游戏-调试-重新生成UnityEngine桩代码`选项，桩代码最终会被生成到`Assets/WeChatMiniGame/Build~/Plugins/Stub/UnityEngine/`中
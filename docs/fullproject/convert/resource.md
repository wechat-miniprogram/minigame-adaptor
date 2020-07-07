## 资源加载

### 问题分析
在 Unity 里面，位于 Resources 文件夹的资源可以通过 Resources.Load 等接口进行同步加载。在微信小游戏里面，受到包体大小的[限制](https://developers.weixin.qq.com/minigame/dev/guide/framework/code-package.html#%E5%8C%85%E5%A4%A7%E5%B0%8F%E9%99%90%E5%88%B6)，大部分资源都位于CDN上，因此一些Unity里面的同步写法要改成异步写法。

### C# SDK
minigame-adaptor 插件本身提供了资源加载相关的 API，和之前的 Adaptor 模块不同的是，这里除了会通过 Adaptor 桥接到自研引擎的接口外，插件还提供了内置的 C# SDK，因此异步资源加载相关的方法都应改成 C# SDK 提供的方法。

这里提到的资源包括 GameObject、AudioClip、TextAsset 和 Scene 等，使用规则查看具体的文档。

#### 场景加载

##### Unity内加载场景
```cs
using UnityEngine;
using UnityEngine.SceneManagement;

public class ExampleClass : MonoBehaviour
{
    void Start()
    {
        // Only specifying the sceneName or sceneBuildIndex will load the Scene with the Single mode
        SceneManager.LoadScene("OtherSceneName", LoadSceneMode.Additive);
    }
}
```

##### Unity 内代码改造
C# 业务用法：
```cs
using MiniGameAdaptor;

MiniGameAdaptor.SceneManager.LoadScene ("_Complete-Game");
```

导出JS后：
```js
MiniGameAdaptor.SceneManager.LoadScene("_Complete-Game");
```

#### prefab加载

##### Unity内加载prefab
```cs
using UnityEngine;
using System.Collections;

public class ExampleClass : MonoBehaviour
{
    void Start()
    {
        // Instantiates a Prefab named "enemy" located in any Resources
        // folder in your project's Assets folder.
        GameObject instance = Instantiate(Resources.Load("enemy", typeof(GameObject))) as GameObject;
    }
}
```

##### Unity 内代码改造
C# 业务用法：
```cs
MiniGameAdaptor.Resources.Load<GameObject>("enemy", (result)=>{
    Debug.Log("***********" + result);
});
```

导出JS后：
```js
MiniGameAdaptor.Resources.LoadRes("enemy", MiniGameAdaptor.GameObject, function (result) {
    MiniGameAdaptor.Debug.Log(System.String.concat("***********", result));
});
```

#### 加载文本

##### Unity内加载文本
```cs
// Load assets from the Resources folder.  Ignore other named and typed assets.
using UnityEngine;

public class ExampleClass : MonoBehaviour
{
    void Start()
    {
        //Load a text file (Assets/Resources/Text/textFile01.txt)
        var textFile = Resources.Load<TextAsset>("Text/textFile01");
    }
}
```

##### Unity 内代码改造
C# 业务用法：
```cs
MiniGameAdaptor.Resources.Load<TextAsset>("1", (result)=>{
    Debug.Log("***********" + result);
});
```

导出JS后：
```js
MiniGameAdaptor.Resources.LoadRes("1", MiniGameAdaptor.TextAsset, function (result) {
    MiniGameAdaptor.Debug.Log(System.String.concat("***********", result));
});
```
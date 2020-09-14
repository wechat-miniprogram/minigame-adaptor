# 生成自定义资源包
有时候如果你想导出你自己的资源，但却不知道怎么样将其导出并生成一个资源包，就可以如下处理
```
WeChat.WXResource resource = new WeChat.WXResource(); // 这里可以是WXPrefab,WXScene等
string path = resource.Export(preset);
WeChat.WXExportStore.GenerateResourcePackage(packageName, path); // packageName为包名，path也可以支持传入一个List
```


import MiniGameAdaptor from '../MiniGameAdaptor.js';

class UnityDeserializeHelper {
    static Deserialize(info, comp, context, builtContext) {
        if (!info) {
            throw new Error(`Deserialize info is  ${ info }`);
        }
        const type = info.type;
        const data = info.data;
        if (!type) {
            throw new Error(`Deserialize type is ${ type }`);
        }
        if (type === 'number' || type === 'string' || type === 'boolean') {
            return data;
        }

        if (type === 'UnityPrefabWrapper') {
            let t = data.type;
            let p = data.path;
            return MiniGameAdaptor.UnityPrefabManager.loadedPrefabsMap.tryGetSync(p);
        }

        if (data.type === 'UnityPrefabWrapper') {
            let p = data.value.path;
            return MiniGameAdaptor.UnityPrefabManager.loadedPrefabsMap.tryGetSync(p);
        }



        if (typeof(data) === 'number' || (data.value && typeof(data.value) === 'number')) {
            // 特殊处理GameObject的反序列化
            if (type === 'MiniGameAdaptor.GameObject') {
                // let transform = MiniGameAdaptor.UnityDeserializeHelper.Deserialize({type: 'Transform3D', data: data.value});
                let transform = builtContext.components.data[data.value];
                return MiniGameAdaptor.engineToAdaptorMap.get(transform.entity);
            }

            return builtContext.components.data[data];
        }

        return engine.SerializeHelper.Deserialize({type: type, data: data}, null, context, builtContext);
    }
}


MiniGameAdaptor.register('UnityDeserializeHelper', UnityDeserializeHelper);
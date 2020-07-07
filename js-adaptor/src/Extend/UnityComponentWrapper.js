import MiniGameAdaptor from '../MiniGameAdaptor.js';

function UnityComponentWrapper(_type) {
    class ComponentWrapper {
        static Deserialize(data, comp, context, builtContext) {
            if (typeof(data) === 'number') {
                let c;
                if (c = builtContext.components.data[data]) {
                    return c;
                }
            }
            let type = data.type;
            let item = data.value;
            
            // 特殊处理GameObject的反序列化
            if (type === 'MiniGameAdaptor.GameObject') {
                let transform = MiniGameAdaptor.UnityDeserializeHelper.Deserialize({type: 'Transform3D', data: item}, comp, context, builtContext);
                return MiniGameAdaptor.engineToAdaptorMap.get(transform.entity);
            }

            return MiniGameAdaptor.UnityDeserializeHelper.Deserialize({ type: type, data: item }, comp, context, builtContext);
        }
    }
    let __type = 'ComponentWrapper'; 
    if (_type)
        __type += '_' + _type;
    engine.decorators.serialize(__type)(ComponentWrapper);
    return __type;
}

// 将对象挂在到MiniGameAdaptor
MiniGameAdaptor.register('UnityComponentWrapper', UnityComponentWrapper);
import MiniGameAdaptor from '../MiniGameAdaptor.js';

function ListFactory(listInfo) {
    var type = listInfo.type;
    var isArray = listInfo.isArray;
    
    var item_is_obj = false;
    if (type == 'number') {
        type = System.Int32
    }
    else {
        item_is_obj = true
    }
    class TypedList {

        static Deserialize(listData, comp, context, builtContext) {
            if(Array.isArray(listData)==false || listData.length == 0){
                if (isArray)
                    return System.Array.init([], type);

                return new (System.Collections.Generic.List$1(type)).ctor();
            }
            if(item_is_obj){
                var newData = [];
                for(var i=0; i < listData.length; i++){
                    var item = listData[i];
                    var newItem = MiniGameAdaptor.UnityDeserializeHelper.Deserialize({ type: type, data: item }, comp, context, builtContext);
                    newData.push(newItem);
                }
                if (isArray)
                    return System.Array.init(newData, type);

                return new (System.Collections.Generic.List$1(type)).$ctor1(newData)
            }
            else{
                if (isArray)
                    return System.Array.init(listData, type);

                return new (System.Collections.Generic.List$1(type)).$ctor1(listData)
            }
        }
    }
    engine.decorators.serialize('List_' + type)(TypedList);
    return 'List_' + type
}

// 将对象挂在到MiniGameAdaptor
MiniGameAdaptor.register('ListFactory', ListFactory);


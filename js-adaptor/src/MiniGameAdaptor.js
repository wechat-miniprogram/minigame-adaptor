
// 顶级命名空间赋值为对象字面量
let MiniGameAdaptor = {
    engineToAdaptorMap : {
        weakMap : new WeakMap(),
        get : function(entity) {
            if(entity && !this.weakMap.has(entity)) {
                this.set(entity, new MiniGameAdaptor.GameObject.$ctor3(entity));
            }
            return this.weakMap.get(entity);
        },
        has : function(entity) {
            return this.weakMap.has(entity);
        },
        set : function(entity, value) {
            this.weakMap.set(entity, value);
        }
    }
}

// 解析字符命名空间并自动生成嵌套命名空间的快捷方法
function register(path, moduleObj = {}, parent = MiniGameAdaptor) {
    let parts  = path.split("."),
        pl;

    pl = parts.length;

    for ( let i = 0; i < pl; i++ ) {
        if ( typeof parent[parts[i]] === "undefined" ) {
            parent[parts[i]] = moduleObj;
        }

        parent = parent[parts[i]];
    }
    moduleObj.$$name = "MiniGameAdaptor." + path;
    return parent;
}

MiniGameAdaptor.register = register;

/*let Mathf = {};
MiniGameAdaptor.register('Mathf', Mathf);
MiniGameAdaptor.register('Mathf.Vector2', {});
MiniGameAdaptor.register('Ver', {}, MiniGameAdaptor.Mathf.Vector2);
console.log(MiniGameAdaptor);*/

window.MiniGameAdaptor = MiniGameAdaptor;


// prefab hack
Object.defineProperty(engine.Prefab.prototype, 'gameObject', {
    get() {
        return this;
    }
    });
    
    Object.defineProperty(engine.Prefab.prototype, 'transform', {
    get() {
        return this;
    }
    });
    
    Object.defineProperty(engine.Prefab.prototype, 'name', {
    get() {
        return this.data.meta.name;
    }
});



export default MiniGameAdaptor;


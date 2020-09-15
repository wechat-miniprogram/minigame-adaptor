Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UIGrid", {
        inherits: [MiniGameAdaptor.UIWidgetContainer],
        statics: {
            methods: {
                SortByName: function (a, b) {
                    throw new System.Exception("not impl");
                },
                SortHorizontal: function (a, b) {
                    throw new System.Exception("not impl");
                },
                SortVertical: function (a, b) {
                    throw new System.Exception("not impl");
                },
                Deserialize: function(data, comp, context, builtContext) {
                    const grid = comp.entity.getComponent(engine.UIGrid);
                    grid.AddChild = comp.AddChild.bind(comp);
                    grid.RemoveChild = comp.RemoveChild.bind(comp);
                    grid.GetChild = comp.GetChild.bind(comp);
                    grid.GetChildList = comp.GetChildList.bind(comp);
                    grid.Reposition = comp.Reposition.bind(comp);
                    Object.defineProperty(grid,'maxPerLine',{
                        get:function(){
                            return grid.columns;
                        },
                        set:function(v){
                            grid.columns = v;
                        },
                        configuarble:true
                    });

                    comp._data = data;
                    return comp;
                }
            }
        },
        fields: {
            _data:null,
            arrangement: 0,
            sorting: 0,
            pivot: 0,
            maxPerLine: 0,
            cellWidth: 0,
            cellHeight: 0,
            animateSmoothly: false,
            hideInactive: false,
            keepWithinPanel: false,
            onReposition: null,
            onCustomSort: null,
            mReposition: false,
            mPanel: null,
            mInitDone: false
        },
        props: {
            repositionNow: {
                set: function (value) {
                    //throw new System.Exception("not impl");
                }
            }
        },
        ctors: {
            get $ctorDefault() { return this.ctor },
            ctor: function () {
                this.$initialize();
                MiniGameAdaptor.UIWidgetContainer.ctor.call(this);
                // throw new System.Exception("not impl");
            }
        },
        methods: {
            AddChild(item){
                return this.entity.transform2D.addChild(item.entity.transform2D);
            },
            ConstrainWithinPanel: function () {
                throw new System.Exception("not impl");
            },
            GetChild: function (index) {
                return this.entity.transform2D.children[index];
            },
            GetChildList: function () {
                return this.entity.transform2D.children;
            },
            GetIndex: function (trans) {
                throw new System.Exception("not impl");
            },
            Init: function () {
                throw new System.Exception("not impl");
            },
            RemoveChild: function (item) {
                return this.entity.transform2D.removeChild(item.entity.transform2D);
            },
            Reposition: function () {
                //throw new System.Exception("not impl");
            },
            ResetPosition: function (list) {
                throw new System.Exception("not impl");
            },
            Sort: function (list) {
                throw new System.Exception("not impl");
            },
            Start: function () {
                // throw new System.Exception("not impl");
                // @
            },
            Update: function () {
                // throw new System.Exception("not impl");
                // @
            }
        }
    });
});
engine.decorators.serialize('MiniGameAdaptor.UIGrid')(MiniGameAdaptor.UIGrid);
Object.defineProperty(MiniGameAdaptor.UIGrid.prototype, '__properties', {
    enumerable: false,
    configurable: true,
    writable: false,
    value: { ...MiniGameAdaptor.UIGrid.prototype.__properties }
})

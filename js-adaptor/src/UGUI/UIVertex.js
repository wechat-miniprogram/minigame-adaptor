Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UIVertex", {
        $kind: "struct",
        statics: {
            fields: {
                simpleVert: null
            },
            ctors: {
                init: function () {
                    this.simpleVert = new MiniGameAdaptor.UIVertex();
                }
            },
            methods: {
                getDefaultValue: function () { return new MiniGameAdaptor.UIVertex(); }
            }
        },
        fields: {
            position: null,
            normal: null,
            tangent: null,
            color: null,
            uv0: null,
            uv1: null,
            uv2: null,
            uv3: null
        },
        ctors: {
            init: function () {
                this.position = new MiniGameAdaptor.Vector3();
                this.normal = new MiniGameAdaptor.Vector3();
                this.tangent = new MiniGameAdaptor.Vector4();
                this.color = new MiniGameAdaptor.Color32();
                this.uv0 = new MiniGameAdaptor.Vector2();
                this.uv1 = new MiniGameAdaptor.Vector2();
                this.uv2 = new MiniGameAdaptor.Vector2();
                this.uv3 = new MiniGameAdaptor.Vector2();
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            getHashCode: function () {
                var h = Bridge.addHash([3720068551, this.position, this.normal, this.tangent, this.color, this.uv0, this.uv1, this.uv2, this.uv3]);
                return h;
            },
            equals: function (o) {
                if (!Bridge.is(o, MiniGameAdaptor.UIVertex)) {
                    return false;
                }
                return Bridge.equals(this.position, o.position) && Bridge.equals(this.normal, o.normal) && Bridge.equals(this.tangent, o.tangent) && Bridge.equals(this.color, o.color) && Bridge.equals(this.uv0, o.uv0) && Bridge.equals(this.uv1, o.uv1) && Bridge.equals(this.uv2, o.uv2) && Bridge.equals(this.uv3, o.uv3);
            },
            $clone: function (to) {
                var s = to || new MiniGameAdaptor.UIVertex();
                s.position = this.position.$clone();
                s.normal = this.normal.$clone();
                s.tangent = this.tangent.$clone();
                s.color = this.color.$clone();
                s.uv0 = this.uv0.$clone();
                s.uv1 = this.uv1.$clone();
                s.uv2 = this.uv2.$clone();
                s.uv3 = this.uv3.$clone();
                return s;
            }
        }
    });
});

 

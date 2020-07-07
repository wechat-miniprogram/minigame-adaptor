Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.ShaderVariantCollection.ShaderVariant", {
        $kind: "nested struct",
        statics: {
            methods: {
                getDefaultValue: function () { return new MiniGameAdaptor.ShaderVariantCollection.ShaderVariant(); }
            }
        },
        fields: {
            shader: null,
            passType: 0,
            keywords: null
        },
        ctors: {
            $ctor1: function (shader, passType, keywords) {
                if (keywords === void 0) { keywords = []; }

                this.$initialize();
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            getHashCode: function () {
                var h = Bridge.addHash([5169038494, this.shader, this.passType, this.keywords]);
                return h;
            },
            equals: function (o) {
                if (!Bridge.is(o, MiniGameAdaptor.ShaderVariantCollection.ShaderVariant)) {
                    return false;
                }
                return Bridge.equals(this.shader, o.shader) && Bridge.equals(this.passType, o.passType) && Bridge.equals(this.keywords, o.keywords);
            },
            $clone: function (to) {
                var s = to || new MiniGameAdaptor.ShaderVariantCollection.ShaderVariant();
                s.shader = this.shader;
                s.passType = this.passType;
                s.keywords = this.keywords;
                return s;
            }
        }
    });
});

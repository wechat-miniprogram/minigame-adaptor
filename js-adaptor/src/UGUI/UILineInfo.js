Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UILineInfo", {
        $kind: "struct",
        statics: {
            methods: {
                getDefaultValue: function () { return new MiniGameAdaptor.UILineInfo(); }
            }
        },
        fields: {
            startCharIdx: 0,
            height: 0,
            topY: 0,
            leading: 0
        },
        ctors: {
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            getHashCode: function () {
                var h = Bridge.addHash([3616939561, this.startCharIdx, this.height, this.topY, this.leading]);
                return h;
            },
            equals: function (o) {
                if (!Bridge.is(o, MiniGameAdaptor.UILineInfo)) {
                    return false;
                }
                return Bridge.equals(this.startCharIdx, o.startCharIdx) && Bridge.equals(this.height, o.height) && Bridge.equals(this.topY, o.topY) && Bridge.equals(this.leading, o.leading);
            },
            $clone: function (to) {
                var s = to || new MiniGameAdaptor.UILineInfo();
                s.startCharIdx = this.startCharIdx;
                s.height = this.height;
                s.topY = this.topY;
                s.leading = this.leading;
                return s;
            }
        }
    });
});

 

Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UICharInfo", {
        $kind: "struct",
        statics: {
            methods: {
                getDefaultValue: function () { return new MiniGameAdaptor.UICharInfo(); }
            }
        },
        fields: {
            cursorPos: null,
            charWidth: 0
        },
        ctors: {
            init: function () {
                this.cursorPos = new MiniGameAdaptor.Vector2();
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            getHashCode: function () {
                var h = Bridge.addHash([3599575836, this.cursorPos, this.charWidth]);
                return h;
            },
            equals: function (o) {
                if (!Bridge.is(o, MiniGameAdaptor.UICharInfo)) {
                    return false;
                }
                return Bridge.equals(this.cursorPos, o.cursorPos) && Bridge.equals(this.charWidth, o.charWidth);
            },
            $clone: function (to) {
                var s = to || new MiniGameAdaptor.UICharInfo();
                s.cursorPos = this.cursorPos.$clone();
                s.charWidth = this.charWidth;
                return s;
            }
        }
    });
});

 

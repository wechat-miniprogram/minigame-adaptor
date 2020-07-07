Bridge.assembly("minigame-adaptor-project", function ($asm, globals) {
    "use strict";

    Bridge.define("System.TimeZone", {
        statics: {
            props: {
                CurrentTimeZone: {
                    get: function () {
                        throw new System.Exception("not impl");
                    }
                }
            }
        },
        ctors: {
            get $ctorDefault() { return this.ctor },
            ctor: function () {
                this.$initialize();
                throw new System.Exception("not impl");
            }
        },
        methods: {
            ToLocalTime: function (time) {
                throw new System.Exception("not impl");
            }
        }
    });
});

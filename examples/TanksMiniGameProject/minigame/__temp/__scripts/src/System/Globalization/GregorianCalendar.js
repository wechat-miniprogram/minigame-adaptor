Bridge.assembly("minigame-adaptor-project", function ($asm, globals) {
    "use strict";

    Bridge.define("System.Globalization.GregorianCalendar", {
        ctors: {
            get $ctorDefault() { return this.ctor },
            ctor: function () {
                this.$initialize();

            }
        },
        methods: {
            GetWeekOfYear: function (time, rule, firstDayOfWeek) {
                throw new System.Exception("not impl");
            }
        }
    });
});

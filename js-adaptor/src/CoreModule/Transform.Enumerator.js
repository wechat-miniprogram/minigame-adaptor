Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";
    Bridge.define("MiniGameAdaptor.Transform.Enumerator", function () { return {
        inherits: [System.Collections.IEnumerator],
        $kind: "nested struct",
        statics: {
            methods: {
                getDefaultValue: function () { return new (MiniGameAdaptor.Transform.Enumerator())(); }
            }
        },
        fields: {
            m_Outer: null,
            m_CurrentIndex: -1,
        },
        props: {
            Current: {
                get: function () {
                    return this.m_Outer.GetChild(this.m_CurrentIndex);
                }
            },
            System$Collections$IEnumerator$Current: {
                get: function () {
                    return this.Current;
                }
            }
        },
        alias: [
            "Dispose", "System$IDisposable$Dispose",
            "moveNext", "System$Collections$IEnumerator$moveNext",
            "Current", ["System$Collections$Generic$IEnumerator$1$Current$1"]
        ],
        ctors: {
            $ctor1: function (outer) {
                this.$initialize();
                this.m_Outer = outer;
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            Dispose: function () { },
            moveNext: function () {
                let childCount = this.m_Outer.childCount;
                this.m_CurrentIndex++;
                return this.m_CurrentIndex < childCount;
            },
            System$Collections$IEnumerator$reset: function () {
                this.m_CurrentIndex = -1;
            },
            equals: function (o) {
                if (!Bridge.is(o, MiniGameAdaptor.Transform.Enumerator())) {
                    return false;
                }
                return Bridge.equals(this.m_Outer, o.m_Outer) && Bridge.equals(this.m_CurrentIndex, o.m_CurrentIndex);
            },
            $clone: function (to) {
                var s = to || new (MiniGameAdaptor.Transform.Enumerator())();
                s.m_Outer = this.m_Outer;
                s.m_CurrentIndex = this.m_CurrentIndex;
                return s;
            }
        }
    }; });
});

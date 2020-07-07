Bridge.assembly("minigame-adaptor-project", function ($asm, globals) {
    "use strict";

    Bridge.define("Complete.UIDirectionControl", {
        inherits: [MiniGameAdaptor.MonoBehaviour],
        fields: {
            m_UseRelativeRotation: false,
            m_RelativeRotation: null
        },
        ctors: {
            init: function () {
                this.m_RelativeRotation = new MiniGameAdaptor.Quaternion();
                this.m_UseRelativeRotation = true;
            }
        },
        methods: {
            Start: function () {
                this.m_RelativeRotation = this.transform.parent.localRotation.$clone();
            },
            Update: function () {
                if (this.m_UseRelativeRotation) {
                    this.transform.rotation = this.m_RelativeRotation.$clone();
                }
            }
        }
    });
});

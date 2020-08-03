Bridge.assembly("minigame-adaptor-project", function ($asm, globals) {
    "use strict";

    Bridge.define("TankMovement", {
        inherits: [MiniGameAdaptor.MonoBehaviour],
        statics: {
            fields: {
                sensitivity: 0
            },
            ctors: {
                init: function () {
                    this.sensitivity = 0.01;
                }
            }
        },
        fields: {
            m_particleSystems: null,
            flag: false,
            origin: null
        },
        ctors: {
            init: function () {
                this.origin = new MiniGameAdaptor.Vector3();
                this.flag = false;
            }
        },
        methods: {
            OnEnable: function () {
                this.m_particleSystems = this.GetComponentsInChildren(MiniGameAdaptor.ParticleSystem);
                for (var i = 0; i < this.m_particleSystems.length; i = (i + 1) | 0) {
                    this.m_particleSystems[System.Array.index(i, this.m_particleSystems)].Play();
                }
            },
            Update: function () {
                if (MiniGameAdaptor.Input.GetMouseButtonDown(0)) {
                    if (!this.flag) {
                        this.flag = true;
                        this.origin = MiniGameAdaptor.Input.mousePosition.$clone();
                    }

                }
                if (this.flag) {
                    var dir = new MiniGameAdaptor.Vector3.$ctor2((this.origin.x - MiniGameAdaptor.Input.mousePosition.x) * TankMovement.sensitivity, 0.0, (this.origin.y - MiniGameAdaptor.Input.mousePosition.y) * TankMovement.sensitivity);

                    if (dir.magnitude < 1E-08) {
                        if (MiniGameAdaptor.Input.GetMouseButtonUp(0)) {
                            this.flag = false;
                        }
                        return;
                    }

                    if (dir.magnitude > 0.1) {
                        dir = MiniGameAdaptor.Vector3.op_Multiply$1(dir.normalized.$clone(), 0.1);
                    }
                    var backup = this.gameObject.transform.position.$clone();

                    this.gameObject.transform.position = MiniGameAdaptor.Vector3.op_Subtraction(this.gameObject.transform.position.$clone(), dir.$clone());
                    this.gameObject.transform.forward = MiniGameAdaptor.Vector3.op_UnaryNegation(dir.normalized.$clone());
                }
                if (MiniGameAdaptor.Input.GetMouseButtonUp(0)) {
                    this.flag = false;
                }
            }
        }
    });
});

Bridge.assembly("minigame-adaptor-project", function ($asm, globals) {
    "use strict";

    Bridge.define("Complete.TankMovement", {
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
            m_PlayerNumber: 0,
            m_Speed: 0,
            m_TurnSpeed: 0,
            m_MovementAudio: null,
            m_EngineIdling: null,
            m_EngineDriving: null,
            m_PitchRange: 0,
            m_MovementAxisName: null,
            m_TurnAxisName: null,
            m_MovementInputValue: 0,
            m_TurnInputValue: 0,
            m_particleSystems: null,
            m_PhyWorld: null,
            flag: false,
            origin: null,
            m_boxCollider: null
        },
        ctors: {
            init: function () {
                this.origin = new MiniGameAdaptor.Vector3();
                this.m_PlayerNumber = 1;
                this.m_Speed = 12.0;
                this.m_TurnSpeed = 180.0;
                this.m_PitchRange = 0.2;
                this.flag = false;
            }
        },
        methods: {
            Awake: function () {
                //m_Rigidbody = GetComponent<Rigidbody> ();
            },
            OnEnable: function () {
                // When the tank is turned on, make sure it's not kinematic.
                //m_Rigidbody.isKinematic = false;

                // Also reset the input values.
                this.m_MovementInputValue = 0.0;
                this.m_TurnInputValue = 0.0;

                // We grab all the Particle systems child of that Tank to be able to Stop/Play them on Deactivate/Activate
                // It is needed because we move the Tank when spawning it, and if the Particle System is playing while we do that
                // it "think" it move from (0,0,0) to the spawn point, creating a huge trail of smoke
                this.m_particleSystems = this.GetComponentsInChildren(MiniGameAdaptor.ParticleSystem);
                for (var i = 0; i < this.m_particleSystems.length; i = (i + 1) | 0) {
                    this.m_particleSystems[System.Array.index(i, this.m_particleSystems)].Play();
                }
            },
            OnDisable: function () {
                // When the tank is turned off, set it to kinematic so it stops moving.
                //m_Rigidbody.isKinematic = true;

                // Stop all particle system so it "reset" it's position to the actual one instead of thinking we moved when spawning
                for (var i = 0; i < this.m_particleSystems.length; i = (i + 1) | 0) {
                    this.m_particleSystems[System.Array.index(i, this.m_particleSystems)].Stop();
                }
            },
            Start: function () {
                // The axes names are based on player number.
                this.m_MovementAxisName = "Vertical" + this.m_PlayerNumber;
                this.m_TurnAxisName = "Horizontal" + this.m_PlayerNumber;

                this.m_boxCollider = this.GetComponent(MiniGameAdaptor.BoxCollider);

                // Store the original pitch of the audio source.
                //m_OriginalPitch = m_MovementAudio.pitch;
            },
            Update: function () {
                // Store the value of both input axes.
                //m_MovementInputValue = Input.GetAxis (m_MovementAxisName);
                //m_TurnInputValue = Input.GetAxis(m_TurnAxisName);

                // EngineAudio ();

                var playerNumber = this.GetComponent(Complete.TankShooting).m_PlayerNumber;
                if (playerNumber !== 1) {
                    return;
                }
                if (MiniGameAdaptor.Input.GetMouseButtonDown(0)) {
                    if (!this.flag) {
                        this.flag = true;
                        this.origin = MiniGameAdaptor.Input.mousePosition.$clone();
                    }

                }
                if (this.flag) {
                    var dir = new MiniGameAdaptor.Vector3.$ctor2((this.origin.x - MiniGameAdaptor.Input.mousePosition.x) * Complete.TankMovement.sensitivity, 0.0, (this.origin.y - MiniGameAdaptor.Input.mousePosition.y) * Complete.TankMovement.sensitivity);

                    if (dir.magnitude < 1E-08) {
                        if (MiniGameAdaptor.Input.GetMouseButtonUp(0)) {
                            this.flag = false;
                        }
                        return;
                    }


                    // m_Body.SetLinearVelocity(new Vec3(dir.x, dir.y, dir.z));
                    if (dir.magnitude > 0.1) {
                        dir = MiniGameAdaptor.Vector3.op_Multiply$1(dir.normalized.$clone(), 0.1);
                    }
                    var backup = this.gameObject.transform.position.$clone();

                    this.gameObject.transform.position = MiniGameAdaptor.Vector3.op_Subtraction(this.gameObject.transform.position.$clone(), dir.$clone());
                    this.gameObject.transform.forward = MiniGameAdaptor.Vector3.op_UnaryNegation(dir.normalized.$clone());

                    var other = this.m_PhyWorld.CheckCollideWithStatic(this.m_boxCollider);
                    if (MiniGameAdaptor.Object.op_Inequality(other, null)) {
                        this.gameObject.transform.position = backup.$clone();
                        MiniGameAdaptor.Debug.Log("player intersect: " + (Bridge.toString(other.name) || ""));
                    }
                }
                if (MiniGameAdaptor.Input.GetMouseButtonUp(0)) {
                    this.flag = false;
                }
            }
        }
    });
});

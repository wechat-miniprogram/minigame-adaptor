Bridge.assembly("minigame-adaptor-project", function ($asm, globals) {
    "use strict";

    Bridge.define("Complete.TankShooting", {
        inherits: [MiniGameAdaptor.MonoBehaviour],
        fields: {
            m_PlayerNumber: 0,
            m_Shell: null,
            m_FireTransform: null,
            m_AimSlider: null,
            m_ShootingAudio: null,
            m_ChargingClip: null,
            m_FireClip: null,
            m_MinLaunchForce: 0,
            m_MaxLaunchForce: 0,
            m_MaxChargeTime: 0,
            m_FireButton: null,
            m_CurrentLaunchForce: 0,
            m_ChargeSpeed: 0,
            m_FireInterval: 0,
            m_PhyWorld: null,
            lastT: null,
            m_ShellInstanceList: null
        },
        ctors: {
            init: function () {
                this.lastT = System.DateTime.getDefaultValue();
                this.m_PlayerNumber = 1;
                this.m_MinLaunchForce = 15.0;
                this.m_MaxLaunchForce = 30.0;
                this.m_MaxChargeTime = 0.75;
                this.m_ShellInstanceList = new (System.Collections.Generic.List$1(Complete.ShellExplosion)).ctor();
            }
        },
        methods: {
            OnEnable: function () {
                // When the tank is turned on, reset the launch force and the UI
                this.m_CurrentLaunchForce = this.m_MinLaunchForce;
                //m_AimSlider.value = m_MinLaunchForce;
            },
            Start: function () {
                // The fire axis is based on the player number.
                this.m_FireButton = "Fire" + this.m_PlayerNumber;

                // The rate that the launch force charges up is the range of possible forces by the max charge time.
                this.m_ChargeSpeed = (this.m_MaxLaunchForce - this.m_MinLaunchForce) / this.m_MaxChargeTime;
            },
            Update: function () {
                var time = System.DateTime.getNow();
                var dt = (System.DateTime.subdd(time, this.lastT)).getTotalSeconds();
                if (dt >= this.m_FireInterval) {
                    this.Fire();
                    this.lastT = time;
                }
                // The slider should have a default value of the minimum launch force.
                //m_AimSlider.value = m_MinLaunchForce;

                // If the max force has been exceeded and the shell hasn't yet been launched...
                //if (m_CurrentLaunchForce >= m_MaxLaunchForce && !m_Fired)
                //{
                //    // ... use the max force and launch the shell.
                //    m_CurrentLaunchForce = m_MaxLaunchForce;
                //    Fire ();
                //}
                //else if (Input.GetButtonDown (m_FireButton))
                //{
                //    // ... reset the fired flag and reset the launch force.
                //    m_Fired = false;
                //    m_CurrentLaunchForce = m_MinLaunchForce;

                //    // Change the clip to the charging clip and start it playing.
                //    m_ShootingAudio.clip = m_ChargingClip;
                //    m_ShootingAudio.Play ();
                //}
                //else if (Input.GetButton (m_FireButton) && !m_Fired)
                //{
                //    // Increment the launch force and update the slider.
                //    m_CurrentLaunchForce += m_ChargeSpeed * Time.deltaTime;

                //    //m_AimSlider.value = m_CurrentLaunchForce;
                //}
                //else if (Input.GetButtonUp (m_FireButton) && !m_Fired)
                //{
                //    // ... launch the shell.
                //    Fire ();
                //}
            },
            Fire: function () {
                //m_Fired = true;

                var shellInstance = ShellPool.Create(this.m_Shell, this.m_FireTransform.transform.position.$clone(), this.m_FireTransform.transform.rotation.$clone());
                var shell = shellInstance.GetComponent(Complete.ShellExplosion);
                shell.Reset();
                shell.m_PhyWorld = this.m_PhyWorld;
                shell.m_PlayerNumber = this.m_PlayerNumber;

                //Rigidbody shellInstance =
                //    Instantiate (m_Shell, m_FireTransform.position, m_FireTransform.rotation) as Rigidbody;

                //shellInstance.velocity = m_CurrentLaunchForce * m_FireTransform.forward; 

                //m_ShootingAudio.clip = m_FireClip;
                //m_ShootingAudio.Play ();

                //m_CurrentLaunchForce = m_MinLaunchForce;


            }
        }
    });
});

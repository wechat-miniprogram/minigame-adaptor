Bridge.assembly("minigame-adaptor-project", function ($asm, globals) {
    "use strict";

    Bridge.define("Complete.TankHealth", {
        inherits: [MiniGameAdaptor.MonoBehaviour],
        fields: {
            m_StartingHealth: 0,
            m_Slider: null,
            m_FillImage: null,
            m_FullHealthColor: null,
            m_ZeroHealthColor: null,
            m_ExplosionPrefab: null,
            m_ExplosionAudio: null,
            m_ExplosionParticles: null,
            m_CurrentHealth: 0,
            m_Dead: false
        },
        ctors: {
            init: function () {
                this.m_FullHealthColor = new MiniGameAdaptor.Color();
                this.m_ZeroHealthColor = new MiniGameAdaptor.Color();
                this.m_StartingHealth = 100.0;
                this.m_FullHealthColor = MiniGameAdaptor.Color.green.$clone();
                this.m_ZeroHealthColor = MiniGameAdaptor.Color.red.$clone();
            }
        },
        methods: {
            Awake: function () {
                // Instantiate the explosion prefab and get a reference to the particle system on it.
                this.m_ExplosionParticles = MiniGameAdaptor.Object.Instantiate(MiniGameAdaptor.GameObject, this.m_ExplosionPrefab).GetComponent(MiniGameAdaptor.ParticleSystem);

                // Get a reference to the audio source on the instantiated prefab.
                this.m_ExplosionAudio = this.m_ExplosionParticles.GetComponent(MiniGameAdaptor.AudioSource);

                // Disable the prefab so it can be activated when it's required.
                this.m_ExplosionParticles.gameObject.SetActive(false);
            },
            OnEnable: function () {
                // When the tank is enabled, reset the tank's health and whether or not it's dead.
                this.m_CurrentHealth = this.m_StartingHealth;
                this.m_Dead = false;

                // Update the health slider's value and color.
                this.SetHealthUI();
            },
            TakeDamage: function (amount) {
                // Reduce current health by the amount of damage done.
                this.m_CurrentHealth -= amount;

                // Change the UI elements appropriately.
                this.SetHealthUI();

                // If the current health is at or below zero and it has not yet been registered, call OnDeath.
                if (this.m_CurrentHealth <= 0.0 && !this.m_Dead) {
                    this.OnDeath();
                }
            },
            SetHealthUI: function () {
                // Set the slider's value appropriately.
                //m_Slider.value = m_CurrentHealth;

                // Interpolate the color of the bar between the choosen colours based on the current percentage of the starting health.
                //m_FillImage.color = Color.Lerp (m_ZeroHealthColor, m_FullHealthColor, m_CurrentHealth / m_StartingHealth);
            },
            OnDeath: function () {
                // Set the flag so that this function is only called once.
                this.m_Dead = true;

                // Move the instantiated explosion prefab to the tank's position and turn it on.
                this.m_ExplosionParticles.transform.position = this.transform.position.$clone();
                this.m_ExplosionParticles.gameObject.SetActive(true);

                // Play the particle system of the tank exploding.
                this.m_ExplosionParticles.Play();

                // Play the tank explosion sound effect.
                this.m_ExplosionAudio.Play();

                // Turn the tank off.
                this.gameObject.SetActive(false);
            }
        }
    });
});

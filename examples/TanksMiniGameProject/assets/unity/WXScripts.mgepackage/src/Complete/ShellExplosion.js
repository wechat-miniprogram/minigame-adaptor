Bridge.assembly("minigame-adaptor-project", function ($asm, globals) {
    "use strict";

    Bridge.define("Complete.ShellExplosion", {
        inherits: [MiniGameAdaptor.MonoBehaviour],
        fields: {
            m_TankMask: null,
            m_ExplosionParticles: null,
            m_ExplosionAudio: null,
            m_MaxDamage: 0,
            m_ExplosionForce: 0,
            m_MaxLifeTime: 0,
            m_ExplosionRadius: 0,
            lastT: null,
            m_spawnTime: null,
            m_PhyWorld: null,
            m_boxCollider: null,
            m_PlayerNumber: 0
        },
        ctors: {
            init: function () {
                this.m_TankMask = new MiniGameAdaptor.LayerMask();
                this.lastT = System.DateTime.getDefaultValue();
                this.m_spawnTime = System.DateTime.getDefaultValue();
                this.m_MaxDamage = 100.0;
                this.m_ExplosionForce = 1000.0;
                this.m_MaxLifeTime = 20.0;
                this.m_ExplosionRadius = 5.0;
                this.m_PlayerNumber = 0;
            }
        },
        methods: {
            Start: function () {
                // If it isn't destroyed by then, destroy the shell after it's lifetime.
                //Destroy (gameObject, m_MaxLifeTime);
                this.Reset();
                this.m_boxCollider = this.GetComponent(MiniGameAdaptor.BoxCollider);
            },
            Reset: function () {
                this.lastT = System.DateTime.getNow();
                this.m_spawnTime = System.DateTime.getNow();
            },
            Update: function () {
                var time = System.DateTime.getNow();
                var dt = (System.DateTime.subdd(time, this.lastT)).getTotalSeconds();
                var lifeTime = (System.DateTime.subdd(time, this.m_spawnTime)).getTotalSeconds();
                if (lifeTime >= this.m_MaxLifeTime) {
                    ShellPool.Destroy(this.gameObject);
                } else {
                    this.transform.position = MiniGameAdaptor.Vector3.op_Addition(this.transform.position.$clone(), MiniGameAdaptor.Vector3.op_Multiply$1(MiniGameAdaptor.Vector3.op_Multiply$1(this.transform.forward.$clone(), dt), 20));
                    var other = this.m_PhyWorld.CheckCollideWithPlayer(this.m_boxCollider, this.m_PlayerNumber);
                    if (MiniGameAdaptor.Object.op_Inequality(other, null)) {
                        other.GetComponent(Complete.TankHealth).TakeDamage(30);
                        MiniGameAdaptor.Debug.Log("bullet intersect: " + (Bridge.toString(other.name) || ""));
                    }
                }
                this.lastT = System.DateTime.getNow();
            },
            OnTriggerEnter: function (other) {
                // Collect all the colliders in a sphere from the shell's current position to a radius of the explosion radius.
                var colliders = MiniGameAdaptor.Physics.OverlapSphere$1(this.transform.position.$clone(), this.m_ExplosionRadius, this.m_TankMask);

                // Go through all the colliders...
                for (var i = 0; i < colliders.length; i = (i + 1) | 0) {
                    // ... and find their rigidbody.
                    var targetRigidbody = colliders[System.Array.index(i, colliders)].GetComponent(MiniGameAdaptor.Rigidbody);

                    // If they don't have a rigidbody, go on to the next collider.
                    if (!targetRigidbody) {
                        continue;
                    }

                    // Add an explosion force.
                    targetRigidbody.AddExplosionForce(this.m_ExplosionForce, this.transform.position.$clone(), this.m_ExplosionRadius);

                    // Find the TankHealth script associated with the rigidbody.
                    var targetHealth = targetRigidbody.GetComponent(Complete.TankHealth);

                    // If there is no TankHealth script attached to the gameobject, go on to the next collider.
                    if (!targetHealth) {
                        continue;
                    }

                    // Calculate the amount of damage the target should take based on it's distance from the shell.
                    var damage = this.CalculateDamage(targetRigidbody.position.$clone());

                    // Deal this damage to the tank.
                    targetHealth.TakeDamage(damage);
                }

                // Unparent the particles from the shell.
                this.m_ExplosionParticles.transform.parent = null;

                // Play the particle system.
                this.m_ExplosionParticles.Play();

                // Play the explosion sound effect.
                this.m_ExplosionAudio.Play();

                // Once the particles have finished, destroy the gameobject they are on.
                var mainModule = this.m_ExplosionParticles.main;
                MiniGameAdaptor.Object.Destroy$1(this.m_ExplosionParticles.gameObject, mainModule.duration);

                // Destroy the shell.
                MiniGameAdaptor.Object.Destroy(this.gameObject);
            },
            CalculateDamage: function (targetPosition) {
                // Create a vector from the shell to the target.
                var explosionToTarget = MiniGameAdaptor.Vector3.op_Subtraction(targetPosition.$clone(), this.transform.position.$clone());

                // Calculate the distance from the shell to the target.
                var explosionDistance = explosionToTarget.magnitude;

                // Calculate the proportion of the maximum distance (the explosionRadius) the target is away.
                var relativeDistance = (this.m_ExplosionRadius - explosionDistance) / this.m_ExplosionRadius;

                // Calculate damage as this proportion of the maximum possible damage.
                var damage = relativeDistance * this.m_MaxDamage;

                // Make sure that the minimum damage is always 0.
                damage = MiniGameAdaptor.Mathf.Max$2(0.0, damage);

                return damage;
            }
        }
    });
});

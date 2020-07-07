import '../minigame-adaptor-util'
import '../minigame-adaptor-project'

engine.decorators.serialize('Complete.ShellExplosion')(Complete.ShellExplosion.$ctorDefault)
export default Complete.ShellExplosion
Object.defineProperty(Complete.ShellExplosion.prototype, '__properties', {
    enumerable: false,
    configurable: false,
    writable: false,
    value: { ...Complete.ShellExplosion.prototype.__properties }
})
Complete.ShellExplosion.prototype.__properties.m_TankMask = { type: MiniGameAdaptor.LayerMask }
Complete.ShellExplosion.prototype.__properties.m_ExplosionParticles = { type: MiniGameAdaptor.UnityComponentWrapper("MiniGameAdaptor.ParticleSystem") }
Complete.ShellExplosion.prototype.__properties.m_ExplosionAudio = { type: MiniGameAdaptor.UnityComponentWrapper("MiniGameAdaptor.AudioSource") }
Complete.ShellExplosion.prototype.__properties.m_MaxDamage = { type: 'number' }
Complete.ShellExplosion.prototype.__properties.m_ExplosionForce = { type: 'number' }
Complete.ShellExplosion.prototype.__properties.m_MaxLifeTime = { type: 'number' }
Complete.ShellExplosion.prototype.__properties.m_ExplosionRadius = { type: 'number' }
Complete.ShellExplosion.prototype.__properties.m_PhyWorld = { type: MiniGameAdaptor.UnityComponentWrapper("PhyWorld") }
Complete.ShellExplosion.prototype.__properties.m_PlayerNumber = { type: 'number' }

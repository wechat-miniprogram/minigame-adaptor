import '../minigame-adaptor-util'
import '../minigame-adaptor-project'

engine.decorators.serialize('Complete.TankShooting')(Complete.TankShooting.$ctorDefault)
export default Complete.TankShooting
Object.defineProperty(Complete.TankShooting.prototype, '__properties', {
    enumerable: false,
    configurable: false,
    writable: false,
    value: { ...Complete.TankShooting.prototype.__properties }
})
Complete.TankShooting.prototype.__properties.m_PlayerNumber = { type: 'number' }
Complete.TankShooting.prototype.__properties.m_Shell = { type: MiniGameAdaptor.UnityComponentWrapper("MiniGameAdaptor.GameObject") }
Complete.TankShooting.prototype.__properties.m_FireTransform = { type: MiniGameAdaptor.UnityComponentWrapper("MiniGameAdaptor.Transform") }
Complete.TankShooting.prototype.__properties.m_AimSlider = { type: MiniGameAdaptor.UnityComponentWrapper("MiniGameAdaptor.UI.Slider") }
Complete.TankShooting.prototype.__properties.m_ShootingAudio = { type: MiniGameAdaptor.UnityComponentWrapper("MiniGameAdaptor.AudioSource") }
Complete.TankShooting.prototype.__properties.m_ChargingClip = { type: MiniGameAdaptor.UnityComponentWrapper("MiniGameAdaptor.AudioClip") }
Complete.TankShooting.prototype.__properties.m_FireClip = { type: MiniGameAdaptor.UnityComponentWrapper("MiniGameAdaptor.AudioClip") }
Complete.TankShooting.prototype.__properties.m_MinLaunchForce = { type: 'number' }
Complete.TankShooting.prototype.__properties.m_MaxLaunchForce = { type: 'number' }
Complete.TankShooting.prototype.__properties.m_MaxChargeTime = { type: 'number' }
Complete.TankShooting.prototype.__properties.m_FireInterval = { type: 'number' }
Complete.TankShooting.prototype.__properties.m_PhyWorld = { type: MiniGameAdaptor.UnityComponentWrapper("PhyWorld") }

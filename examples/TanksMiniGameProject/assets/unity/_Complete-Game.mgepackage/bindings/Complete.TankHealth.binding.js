import '../minigame-adaptor-util'
import '../minigame-adaptor-project'

engine.decorators.serialize('Complete.TankHealth')(Complete.TankHealth.$ctorDefault)
export default Complete.TankHealth
Object.defineProperty(Complete.TankHealth.prototype, '__properties', {
    enumerable: false,
    configurable: false,
    writable: false,
    value: { ...Complete.TankHealth.prototype.__properties }
})
Complete.TankHealth.prototype.__properties.m_StartingHealth = { type: 'number' }
Complete.TankHealth.prototype.__properties.m_Slider = { type: MiniGameAdaptor.UnityComponentWrapper("MiniGameAdaptor.UI.Slider") }
Complete.TankHealth.prototype.__properties.m_FillImage = { type: MiniGameAdaptor.UnityComponentWrapper("MiniGameAdaptor.UI.Image") }
Complete.TankHealth.prototype.__properties.m_FullHealthColor = { type: MiniGameAdaptor.Color }
Complete.TankHealth.prototype.__properties.m_ZeroHealthColor = { type: MiniGameAdaptor.Color }
Complete.TankHealth.prototype.__properties.m_ExplosionPrefab = { type: MiniGameAdaptor.UnityComponentWrapper("MiniGameAdaptor.GameObject") }

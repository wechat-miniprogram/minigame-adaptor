import '../minigame-adaptor-util'
import '../minigame-adaptor-project'

engine.decorators.serialize('Complete.GameManager')(Complete.GameManager.$ctorDefault)
export default Complete.GameManager
Object.defineProperty(Complete.GameManager.prototype, '__properties', {
    enumerable: false,
    configurable: false,
    writable: false,
    value: { ...Complete.GameManager.prototype.__properties }
})
Complete.GameManager.prototype.__properties.m_NumRoundsToWin = { type: 'number' }
Complete.GameManager.prototype.__properties.m_StartDelay = { type: 'number' }
Complete.GameManager.prototype.__properties.m_EndDelay = { type: 'number' }
Complete.GameManager.prototype.__properties.m_CameraControl = { type: MiniGameAdaptor.UnityComponentWrapper("Complete.CameraControl") }
Complete.GameManager.prototype.__properties.m_TankPrefab = { type: MiniGameAdaptor.UnityComponentWrapper("MiniGameAdaptor.GameObject") }
import './Complete.TankManager.binding.js'
Complete.GameManager.prototype.__properties.m_Tanks = { type: MiniGameAdaptor.ListFactory({ 'type': 'Complete.TankManager', 'isArray' : true }) }
Complete.GameManager.prototype.__properties.m_PhyWorld = { type: MiniGameAdaptor.UnityComponentWrapper("MiniGameAdaptor.GameObject") }

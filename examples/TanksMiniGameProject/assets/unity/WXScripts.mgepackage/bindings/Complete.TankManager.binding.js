import '../minigame-adaptor-util'
import '../minigame-adaptor-project'

engine.decorators.serialize('Complete.TankManager')(Complete.TankManager.$ctorDefault)
export default Complete.TankManager
Object.defineProperty(Complete.TankManager.prototype, '__properties', {
    enumerable: false,
    configurable: false,
    writable: false,
    value: { ...Complete.TankManager.prototype.__properties }
})
Complete.TankManager.prototype.__properties.m_PlayerColor = { type: MiniGameAdaptor.Color }
Complete.TankManager.prototype.__properties.m_SpawnPoint = { type: MiniGameAdaptor.UnityComponentWrapper("MiniGameAdaptor.Transform") }

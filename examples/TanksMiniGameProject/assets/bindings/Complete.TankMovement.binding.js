import '../minigame-adaptor-util'
import '../minigame-adaptor-project'

engine.decorators.serialize('Complete.TankMovement')(Complete.TankMovement.$ctorDefault)
export default Complete.TankMovement
Object.defineProperty(Complete.TankMovement.prototype, '__properties', {
    enumerable: false,
    configurable: false,
    writable: false,
    value: { ...Complete.TankMovement.prototype.__properties }
})
Complete.TankMovement.prototype.__properties.m_PlayerNumber = { type: 'number' }
Complete.TankMovement.prototype.__properties.m_Speed = { type: 'number' }
Complete.TankMovement.prototype.__properties.m_TurnSpeed = { type: 'number' }
Complete.TankMovement.prototype.__properties.m_MovementAudio = { type: MiniGameAdaptor.UnityComponentWrapper("MiniGameAdaptor.AudioSource") }
Complete.TankMovement.prototype.__properties.m_EngineIdling = { type: MiniGameAdaptor.UnityComponentWrapper("MiniGameAdaptor.AudioClip") }
Complete.TankMovement.prototype.__properties.m_EngineDriving = { type: MiniGameAdaptor.UnityComponentWrapper("MiniGameAdaptor.AudioClip") }
Complete.TankMovement.prototype.__properties.m_PitchRange = { type: 'number' }
Complete.TankMovement.prototype.__properties.m_PhyWorld = { type: MiniGameAdaptor.UnityComponentWrapper("PhyWorld") }

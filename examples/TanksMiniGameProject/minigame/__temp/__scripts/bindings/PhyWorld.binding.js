import '../minigame-adaptor-util'
import '../minigame-adaptor-project'

engine.decorators.serialize('PhyWorld')(PhyWorld.$ctorDefault)
export default PhyWorld
Object.defineProperty(PhyWorld.prototype, '__properties', {
    enumerable: false,
    configurable: false,
    writable: false,
    value: { ...PhyWorld.prototype.__properties }
})
PhyWorld.prototype.__properties.StaticWorld = { type: MiniGameAdaptor.UnityComponentWrapper("MiniGameAdaptor.GameObject") }
PhyWorld.prototype.__properties.player1 = { type: MiniGameAdaptor.UnityComponentWrapper("MiniGameAdaptor.GameObject") }
PhyWorld.prototype.__properties.player2 = { type: MiniGameAdaptor.UnityComponentWrapper("MiniGameAdaptor.GameObject") }

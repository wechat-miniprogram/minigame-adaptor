import '../minigame-adaptor-util'
import '../minigame-adaptor-project'

engine.decorators.serialize('Fllow')(Fllow.$ctorDefault)
export default Fllow
Object.defineProperty(Fllow.prototype, '__properties', {
    enumerable: false,
    configurable: false,
    writable: false,
    value: { ...Fllow.prototype.__properties }
})
Fllow.prototype.__properties.player = { type: MiniGameAdaptor.UnityComponentWrapper("MiniGameAdaptor.Transform") }
Fllow.prototype.__properties.speed = { type: 'number' }

import '../minigame-adaptor-util'
import '../minigame-adaptor-project'

engine.decorators.serialize('TankMovement')(TankMovement.$ctorDefault)
export default TankMovement
Object.defineProperty(TankMovement.prototype, '__properties', {
    enumerable: false,
    configurable: false,
    writable: false,
    value: { ...TankMovement.prototype.__properties }
})

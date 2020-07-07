import '../minigame-adaptor-util'
import '../minigame-adaptor-project'

engine.decorators.serialize('Complete.CameraControl')(Complete.CameraControl.$ctorDefault)
export default Complete.CameraControl
Object.defineProperty(Complete.CameraControl.prototype, '__properties', {
    enumerable: false,
    configurable: false,
    writable: false,
    value: { ...Complete.CameraControl.prototype.__properties }
})
Complete.CameraControl.prototype.__properties.m_DampTime = { type: 'number' }
Complete.CameraControl.prototype.__properties.m_ScreenEdgeBuffer = { type: 'number' }
Complete.CameraControl.prototype.__properties.m_MinSize = { type: 'number' }

import engine from "engine";
declare type TouchInputEvent = import("engine/input/touch").TouchInputEvent;
declare type Entity2D = import("engine/scene/scene").Entity2D;
import EC from "../commons/eventCenter.js";

@engine.decorators.serialize("D2Shoot")
export default class D2Shoot extends engine.Script {
  public uisprite: engine.UISprite | null = null;
  public uiInput: engine.TouchInputComponent | null = null;

  constructor(public readonly entity: Entity2D) {
    super(entity);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchEnter = this.onTouchEnter.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
    this.onTouchLeave = this.onTouchLeave.bind(this);
  }

  public onAwake() {
    this.uisprite = this.entity.getComponent<engine.UISprite>(engine.UISprite);
  }

  public onEnable(): void {
    this.uiInput = this.getComponent<engine.TouchInputComponent>(engine.TouchInputComponent);
    if (this.uiInput) {
      this.uiInput.onTouchStart.add(this.onTouchStart);
      this.uiInput.onTouchEnter.add(this.onTouchEnter);
      this.uiInput.onTouchEnd.add(this.onTouchEnd);
      this.uiInput.onTouchLeave.add(this.onTouchLeave);
    }
  }

  public onDisable(): void {
    if (this.uiInput) {
      this.uiInput.onTouchStart.remove(this.onTouchStart);
      this.uiInput.onTouchEnter.remove(this.onTouchEnter);
      this.uiInput.onTouchEnd.remove(this.onTouchEnd);
      this.uiInput.onTouchLeave.remove(this.onTouchLeave);
    }
  }

  public onTouchStart(s: engine.TouchInputComponent, e: TouchInputEvent) {
    // console.log('onTouchStart D2Shoot');
    const c = this.uisprite.color.clone();
    c.a = 200;
    this.uisprite.color = c;
    EC.emit(EC.START_SHOOT);
  }

  public onTouchEnter(s: engine.TouchInputComponent, e: TouchInputEvent) {
    const c = this.uisprite.color.clone();
    c.a = 200;
    this.uisprite.color = c;
    EC.emit(EC.START_SHOOT);
  }

  public onTouchEnd(s: engine.TouchInputComponent, e: TouchInputEvent) {
    // console.log('onTouchEnd D2Shoot');
    const c = this.uisprite.color.clone();
    c.a = 255;
    this.uisprite.color = c;
    EC.emit(EC.END_SHOOT);
  }

  public onTouchLeave(s: engine.TouchInputComponent, e: TouchInputEvent) {
    const c = this.uisprite.color.clone();
    c.a = 255;
    this.uisprite.color = c;
    EC.emit(EC.END_SHOOT);
  }
}

// import engine from 'engine';
import engine from "engine";
declare type Vector2 = import("engine/engine").Vector2;
declare type TouchInputEvent = import("engine/input/touch").TouchInputEvent;
declare type Entity2D = import("engine/scene/scene").Entity2D;
import EventCenter from "../commons/eventCenter.js";

const SCREEN_WIDTH = engine.device.screenWidth;
const SCREEN_HEIGHT = engine.device.screenHeight;
const GAME_WIDTH = engine.adaptation.frameWidth;
const GAME_HEIGHT = engine.adaptation.frameHeight;

@engine.decorators.serialize("D2Move")
export default class D2Move extends engine.Script {
  public buttonPos = engine.Vector2.ZERO.clone(); // 按钮的canvas坐标
  public buttonRadius = { x: 0, y: 0 };
  public direction = engine.Vector2.ZERO.clone();
  public uisprite = null;
  public uiInput: engine.TouchInputComponent | null = null;

  constructor(public readonly entity: Entity2D) {
    super(entity);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchEnter = this.onTouchEnter.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
    this.onTouchLeave = this.onTouchLeave.bind(this);
  }

  public onAwake() {
    this.uisprite = this.entity.getComponent(engine.UISprite);
    this.buttonPos = this.entity.transform2D.worldPosition.clone();
    this.buttonRadius = { x: this.entity.transform2D.size.x / 2, y: this.entity.transform2D.size.y / 2 };
  }

  public onEnable(): void {
    this.uiInput = this.getComponent<engine.TouchInputComponent>(engine.TouchInputComponent);
    if (this.uiInput) {
      this.uiInput.onTouchStart.add(this.onTouchStart);
      this.uiInput.onTouchEnter.add(this.onTouchEnter);
      this.uiInput.onTouchEnd.add(this.onTouchEnd);
      this.uiInput.onTouchLeave.add(this.onTouchLeave);
      this.uiInput.onTouchMove.add(this.onTouchMove);
    }
  }

  public onDisable(): void {
    if (this.uiInput) {
      this.uiInput.onTouchStart.remove(this.onTouchStart);
      this.uiInput.onTouchEnter.remove(this.onTouchEnter);
      this.uiInput.onTouchEnd.remove(this.onTouchEnd);
      this.uiInput.onTouchLeave.remove(this.onTouchLeave);
      this.uiInput.onTouchMove.remove(this.onTouchMove);
    }
  }

  public onTouchStart(s: engine.TouchInputComponent, e: TouchInputEvent) {
    this.setAlpha(200);
    this.handleTouch(e);
  }

  public onTouchEnter(s: engine.TouchInputComponent, e: TouchInputEvent) {
    this.setAlpha(200);
    this.handleTouch(e);
  }

  public onTouchMove(s: engine.TouchInputComponent, e: TouchInputEvent) {
    this.handleTouch(e);
  }

  public onTouchLeave(s: engine.TouchInputComponent, e: TouchInputEvent) {
    this.setAlpha(255);
    this.emitDirection({ x: 0, y: 0, z: 0 });
  }

  public onTouchEnd(s: engine.TouchInputComponent, e: TouchInputEvent) {
    this.setAlpha(255);
    this.emitDirection({ x: 0, y: 0, z: 0 });
  }

  public handleTouch(e: TouchInputEvent) {
    this.direction.x = e.touches[0].position.x / this.buttonRadius.x;
    this.direction.y = e.touches[0].position.y / this.buttonRadius.y;
    this.emitDirection({ x: this.direction.x, y: 0, z: -this.direction.y });
  }

  public setAlpha(val: number): void {
    const c = this.uisprite.color.clone();
    c.a = val;
    this.uisprite.color = c;
  }

  public emitDirection(direction: { x: number; y: number; z: number; }): void {
    EventCenter.emit(EventCenter.TOUCH_MOVE, direction);
  }

  public gamePosToScreen(pos: Vector2): Vector2 {
    const p = engine.Vector2.ZERO.clone();
    p.x = SCREEN_WIDTH / GAME_WIDTH * pos.x;
    p.y = SCREEN_HEIGHT / GAME_HEIGHT * pos.y;
    return p;
  }

  public canvasPosToScreen(pos) {
    // console.log(pos);
    pos.x = pos.x - SCREEN_WIDTH / 2;
    pos.y = -pos.y + SCREEN_HEIGHT / 2;
    return pos;
  }
}

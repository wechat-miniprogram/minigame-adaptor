import engine from "engine";
import Collider from "../commons/collider.js";

@engine.decorators.serialize("D3Bullet")
export default class D3Bullet extends engine.Script {
  public direction = engine.Vector3.ZERO.clone();
  public speed = 8;
  public sumTime = 0;
  public maxTime = 5;
  public attack = 1;
  public bound = engine.Vector3.createFromNumber(0.15 / 2, 0.15 / 2, 0.15 / 2);

  public onAwake() {
    // console.log("onAwake D3Bullet", this.direction.x, this.direction.y, this.direction.z);
    Collider.watch(this, ["bullet"]);
  }

  public onUpdate(dt) {
    if (this.sumTime < this.maxTime) {

      this.sumTime += dt;
      this.entity.transform.position.x += this.direction.x * this.speed * dt;
      this.entity.transform.position.y += this.direction.y * this.speed * dt;
      this.entity.transform.position.z += this.direction.z * this.speed * dt;

    } else {
      this.removeSelf();
    }
  }

  public onCollide(comp) {
    this.removeSelf();
  }

  public onDestroy() {
    // console.log('onDestroy bullet');
  }

  public removeSelf() {
    if (this.entity.transform && this.entity.transform.parent) {
      const parentTransform = this.entity.transform.parent as Transform3D
      parentTransform.removeChild(this.entity.transform);
      Collider.unwatch(this);
      this.entity.destroy();
    }
  }
}

import engine from "engine";
import Collider from "../commons/collider.js";
import DataCenter from "../commons/dataCenter.js";
import EventCenter from "../commons/eventCenter.js";
import D3Bullet from "./d3Bullet.js";
import D3Player from "./d3Player.js";

const randomBetween = (min, max) => {
  return Math.random() * (max - min) + min;
};


@engine.decorators.serialize("D3Enemy")
export default class D3Enemy extends engine.Script {

  public static enemyCount = 0;
  public direction = engine.Vector3.ZERO.clone();
  public speed = randomBetween(3, 6);
  public sumTime = 0;
  public maxTime = 15;
  public hp = 5;
  public score = {
    collide: -2,
    dead: 1,
  };
  public rotationY = (Math.random() < 0.5 ? -1 : 1) * 0.05;
  public hurtParticle = null;
  public bound = engine.Vector3.createFromNumber(0.9 / 2, 0.5 / 2, 0.9 / 2);

  public onAwake() {
    // console.log("onAwake D3Enemy");
    this.direction.z = 1;
    this.hurtParticle = this.entity.transform._children[0].findChildByName("Hurt").entity.getComponent(engine.Particle);
    Collider.watch(this, ["enemy"]);
  }

  public onUpdate(dt) {
    if (this.sumTime < this.maxTime) {

      this.sumTime += dt;

      // const player = DataCenter.playerEntity;
      // this.direction.x = player.transform.position.x - this.entity.transform.position.x;
      // this.direction.y = player.transform.position.y - this.entity.transform.position.y;
      // this.direction.z = player.transform.position.z - this.entity.transform.position.z;
      // this.direction = this.direction.normalize();

      this.entity.transform.position.x += this.direction.x * this.speed * dt;
      this.entity.transform.position.y += this.direction.y * this.speed * dt;
      this.entity.transform.position.z += this.direction.z * this.speed * dt;

      this.entity.transform.euler.y += this.rotationY;
    } else {
      this.removeEnemy();
    }
  }

  public onCollide(comp) {
    if (comp instanceof D3Player) {
      // console.log('isCollided enemy player');
      EventCenter.emit(EventCenter.HURT_PLAYER);
      EventCenter.emit(EventCenter.GET_SCORE, this.score.collide);
      this.removeEnemy();

    } else if (comp instanceof D3Bullet) {
      this.hp -= comp.attack;
      this.hurtParticle.emitter.start = true;
      if (this.hp <= 0) {
        EventCenter.emit(EventCenter.GET_SCORE, this.score.dead);
        this.removeEnemy();
      }
    }
  }

  public removeEnemy() {
    if (this.entity.transform) {
      const parentTransform = this.entity.transform.parent;
      parentTransform.removeChild(this.entity.transform);
      Collider.unwatch(this);
      this.entity.destroy();
      D3Enemy.enemyCount--;
    }
  }

  public onDestroy() {
    // console.log('onDestroy enemy');
  }
}

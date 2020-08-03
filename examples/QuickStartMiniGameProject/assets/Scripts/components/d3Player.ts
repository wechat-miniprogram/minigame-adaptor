import engine from 'engine';
import Collider from '../commons/collider.js';
import DataCenter from '../commons/dataCenter.js';
import EventCenter from '../commons/eventCenter.js';
import D3Bullet from './d3Bullet.js';

const POS_LIMIT = {
  x: [-30, 30],
  // y: [-100, 100],
  z: [-54, 14.3],
};

@engine.decorators.serialize("D3Player")
export default class D3Player extends engine.Script {
  public bulletPrefab = null;
  public bulletInterval = 0.3;
  public bulletTime = 0;
  public player = null;
  public hurtParticle = null;
  public speed = 10;
  public direction = engine.Vector3.ZERO.clone();
  public rotation = engine.Vector3.ZERO.clone();
  public bound = engine.Vector3.createFromNumber(2.75 / 2, 0.46 / 2, 0.5 / 2);

  public onAwake() {
    console.log("onAwake D3Player");
    // this.initEntity();

    this.player = this.entity;
    DataCenter.playerEntity = this.player;
    DataCenter.playerComp = this;

    this.hurtParticle = this.player.transform._children[0].findChildByName("Hurt").entity.getComponent(engine.Particle);
    // this.hurtParticle.emitter.start = true;

    this.initEvent();
    this.initPrefab();
    Collider.watch(this, ["player"]);

    EventCenter.emit(EventCenter.ADD_PLAYER);
  }

  public onUpdate(dt) {
    if (this.player) {
      this.updateMove(dt);
      this.updateBullet(dt);
    }
  }

  public initPrefab() {
    engine.loader.load("resource/Bullet.prefab").promise.then((prefab) => {
      this.bulletPrefab = prefab;
    });
  }

  public initEvent() {
    EventCenter.on(EventCenter.TOUCH_MOVE, (direction) => {
      // console.log('get 2d ON_TOUCH_MOVE', direction.x, direction.y, direction.z);
      this.direction.x = direction.x;
      this.direction.y = direction.y;
      this.direction.z = direction.z;

      if (direction.x === 0) {
        this.rotation.x = 0;
        this.rotation.z = 0;
      } else {
        this.rotation.x = 0.01;
        this.rotation.z = direction.x < 0 ? 0.01 : -0.01;
      }
    });

    EventCenter.on(EventCenter.HURT_PLAYER, () => {
      this.hurtParticle.emitter.start = true;
    });

    EventCenter.on(EventCenter.START_SHOOT, () => {
      this.bulletInterval = 0.1;
    });
    EventCenter.on(EventCenter.END_SHOOT, () => {
      this.bulletInterval = 0.3;
    });
  }

  public updateMove(dt) {
    for (const k in POS_LIMIT) {
      if (this.rotation[k] === 0) {
        this.player.transform.euler[k] = 0;
      } else {
        this.player.transform.euler[k] += this.rotation[k];
        if (this.player.transform.euler[k] > 0.2) {
          this.player.transform.euler[k] = 0.2;
        } else if (this.player.transform.euler[k] < -0.2) {
          this.player.transform.euler[k] = -0.2;
        }
      }
    }
    // this.entity.transform.euler.y += 0.03;


    const move = {
      x: this.speed * this.direction.x * dt,
      y: this.speed * this.direction.y * dt,
      z: this.speed * this.direction.z * dt,
    };
    const pos = this.player.transform.position;
    for (const k in POS_LIMIT) {
      if (
        pos[k] + move[k] < POS_LIMIT[k][0]
        ||
        pos[k] + move[k] > POS_LIMIT[k][1]
      ) {
        move[k] = 0;
      }
      this.player.transform.position[k] += move[k];
    }
    if (move.x !== 0 || move.y !== 0 || move.z !== 0) {
      EventCenter.emit(EventCenter.MOVE_PLAYER, move);
    }
  }

  public updateBullet(dt) {
    if (!this.bulletPrefab) {
      return;
    }
    this.bulletTime += dt;
    if (this.bulletTime >= this.bulletInterval) {
      const entity = this.bulletPrefab.instantiate();
      const script = entity.addComponent(D3Bullet);
      entity.transform.position = this.player.transform.position.clone();
      // script.direction = this.direction.clone();
      // if (this.direction.isZero()) {
      //   script.direction.z = -1;
      // }
      script.direction.z = -1;

      DataCenter.worldEntity.transform.addChild(entity.transform);

      this.bulletTime -= this.bulletInterval;
    }
  }
}

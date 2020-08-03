import engine from "engine";
import Collider from "../commons/collider.js";
import DataCenter from "../commons/dataCenter.js";
import D3Enemy from "./d3Enemy.js";
import D3Player from "./d3Player.js";

const ENEMY_INTERVAL = 0.5;
const randomBetween = (min, max) => {
  return Math.random() * (max - min) + min;
};

@engine.decorators.serialize("D3Main")
export default class D3Main extends engine.Script {
  public world: null | engine.Entity = null; // world entity
  public enemyTime: number = 0;
  public enemyPrefab: engine.Prefab | null = null;

  public onAwake() {
    console.log("onAwake D3Main");
    this.world = this.entity.transform.parent.entity;
    DataCenter.worldEntity = this.world;
    
    Collider.watchGroup("enemy", "player");
    Collider.watchGroup("enemy", "bullet");

    this.initPlayer();
    this.initEnemy();
  }

  public onUpdate(dt: number) {
    Collider.onUpdate(dt);
    this.enemyTime += dt;
    if (this.enemyTime >= ENEMY_INTERVAL) {
      this.addEnemy();
      this.enemyTime -= ENEMY_INTERVAL;
    }
  }

  public initPlayer() {
    engine.loader.load<engine.Prefab>("resource/Aircraft.prefab").promise.then((prefab) => {
      const entity = prefab.instantiate();
      entity.addComponent(D3Player);
      entity.transform.position.y += 1;
      entity.transform.position.z = 8;
      this.world.transform.addChild(entity.transform);
    });
  }

  public initEnemy() {
    engine.loader.load<engine.Prefab>("resource/Enemy01.prefab").promise.then((prefab) => {
      this.enemyPrefab = prefab;
    });
  }

  public addEnemy() {
    if (!this.enemyPrefab) {
      return;
    }
    if (D3Enemy.enemyCount >= 20) {
      return;
    }
    const entity = this.enemyPrefab.instantiate();
    const script = entity.addComponent(D3Enemy);
    entity.transform.position.x = randomBetween(-26, 26);
    entity.transform.position.y += 1;
    entity.transform.position.z = randomBetween(-50, -20);
    // entity.transform.position.x = randomBetween(-10, 10);
    // entity.transform.position.z = randomBetween(10, 1);
    this.world.transform.addChild(entity.transform);
    D3Enemy.enemyCount++;
    // console.log('Add Enemy', D3Enemy.enemyCount);
  }
}

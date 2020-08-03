import engine from "engine";
import DataCenter from "../commons/dataCenter.js";
import EventCenter from "../commons/eventCenter.js";

const POS_LIMIT = {
  x: [-26, 26],
  // y: [-100, 100],
  z: [-44, 13],
};

@engine.decorators.serialize("D3Camera")
export default class D3Camera extends engine.Script {

  public camera = null;

  public onAwake() {
    this.camera = this.entity.getComponent(engine.Camera);
    DataCenter.cameraComp = this.camera;
    console.log("onAwake D3Camera");

    EventCenter.on(EventCenter.ADD_PLAYER, () => {
      // this.camera.targetTransform = DataCenter.player.transform;
    });
    EventCenter.on(EventCenter.MOVE_PLAYER, (move) => {
      const pos = DataCenter.playerEntity.transform.position;
      for (const k in POS_LIMIT) {
        if (
          pos[k] + move[k] >= POS_LIMIT[k][0]
          &&
          pos[k] + move[k] <= POS_LIMIT[k][1]
        ) {
          this.camera.entity.transform.position[k] += move[k];
        }
      }
      // console.log(DataCenter.playerEntity.transform.position.x, DataCenter.playerEntity.transform.position.y, DataCenter.playerEntity.transform.position.z);
    });
  }

  public onUpdate(dt) {

  }
}

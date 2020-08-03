import engine from "engine";
import EventCenter from "../commons/eventCenter.js";

@engine.decorators.serialize("D2Score")
export default class D2Score extends engine.Script {
  public score = 0;
  public uilabel = null;

  public onAwake() {
    this.uilabel = this.entity.getComponent(engine.UILabel);
    this.uilabel.text = "000";

    EventCenter.on(EventCenter.GET_SCORE, (getScore) => {
      this.score += Number(getScore);
      if (this.score < 0) {
        this.score = 0;
      }
      let str = this.score + "";
      if (this.score < 10) {
        str = "0" + str;
      }
      if (this.score < 100) {
        str = "0" + str;
      }
      this.uilabel.text = str;
    });
  }
}

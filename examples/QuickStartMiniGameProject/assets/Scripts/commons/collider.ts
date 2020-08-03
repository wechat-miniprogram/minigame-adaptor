const COLLIDE_STATE = {
  NO: 0, // 没碰撞
  INTERSECT: 1, // 相交
  INSIDE: 2, // 在内
};
const isIntersected = (arr1, arr2) => {
  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr2.length; j++) {
      if (arr1[i] === arr2[j]) {
        return true;
      }
    }
  }
  return false;
};

class Collider {
  updateNum = 0;
  state = {
    x: COLLIDE_STATE.NO,
    y: COLLIDE_STATE.NO,
    z: COLLIDE_STATE.NO,
  };

  compMap = new Map(); // comp: [group1, group2, ...]
  groupPair = [];
    
  onUpdate(dt) {
    this.updateNum++;

    if (this.updateNum % 3 === 0) { // 节流
      this._walkComp();
    }
  }

  watchGroup(group1, group2) {
    this.groupPair.push([group1, group2]);
  }

  watch(comp, groups = []) {
    const g = this.compMap.get(comp);
    if (g) {
      groups = groups.concat(g);
    }
    this.compMap.set(comp, groups);
  }

  unwatch(comp) {
    this.compMap.delete(comp);
  }

  _walkComp() {
    const triggerComps = [];
    this.groupPair.forEach((pair) => {
      const g1 = pair[0];
      const g2 = pair[1];
      this.compMap.forEach((groups1, comp1) => {
        if (!comp1) { return; }
        this.compMap.forEach((groups2, comp2) => {
          if (!comp2) { return; }
          if (comp1 === comp2) {
            return;
          }
          if ( // 在groupPair内的才碰撞
            (groups1.indexOf(g1) > -1 && groups2.indexOf(g2) > -1)
            ||
            (groups1.indexOf(g2) > -1 && groups2.indexOf(g1) > -1)
          ) {
            if (this._isCollided(comp1, comp2)) {
              triggerComps.push([comp1, comp2]); // 只触发comp1.onCollide回调，comp2的会在后续遍历中处理到
            }
          }
        });
      });
    });
    triggerComps.forEach((comps) => {
      comps[0].onCollide && comps[0].onCollide(comps[1]);
    });
  }

  _isCollided(comp1, comp2) {
    const p1 = comp1.entity.transform.worldPosition;
    const p2 = comp2.entity.transform.worldPosition;
    const b1 = comp1.bound;
    const b2 = comp2.bound;

    this.state = {
      x: COLLIDE_STATE.NO,
      y: COLLIDE_STATE.NO,
      z: COLLIDE_STATE.NO,
    };
    for (let k in this.state) {
      const front1 = p1[k] + b1[k]; // p点的前边界
      const back1 = p1[k] - b1[k]; // p点的后边界
      const front2 = p2[k] + b2[k];
      const back2 = p2[k] - b2[k];
      if (
        (front1 >= back2 && back1 < back2) ||
        (back1 <= front2 && front1 > front2)
      ) {
        this.state[k] = COLLIDE_STATE.INTERSECT;
      }

      if (
        front1 <= front2 &&
        back1 >= back2
      ) {
        this.state[k] = COLLIDE_STATE.INSIDE;
      }
      
      if (this.state[k] === COLLIDE_STATE.NO) {
        return false; // 三个轴都有碰撞才算碰撞，若其中一个没碰，那直接返回，节约计算
      }
    }

    // console.log(state);
    return this.state.x && this.state.y && this.state.z; // 三个轴都有碰撞才算碰撞
  }
}

export default new Collider();
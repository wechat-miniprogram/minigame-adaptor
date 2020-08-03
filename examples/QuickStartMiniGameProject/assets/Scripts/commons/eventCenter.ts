import * as EventEmitter from 'eventemitter3';

class EventEmitterCenter extends EventEmitter {
  public TOUCH_MOVE = 'TOUCH_MOVE';
  public START_SHOOT = 'START_SHOOT';
  public END_SHOOT = 'END_SHOOT';
  
  public ADD_PLAYER = 'ADD_PLAYER';
  public ADD_ENEMY = 'ADD_ENEMY';
  public MOVE_PLAYER = 'MOVE_PLAYER';
  public HURT_PLAYER = 'HURT_PLAYER';
  public GET_SCORE = 'GET_SCORE';

  constructor() {
    super();
    console.log('ee');
  }
}

export const EventCenter = new EventEmitterCenter();
export default EventCenter;
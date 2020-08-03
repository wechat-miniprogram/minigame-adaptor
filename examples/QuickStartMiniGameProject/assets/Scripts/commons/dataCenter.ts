declare const GameGlobal: any;

class DataCenter {
  playerEntity = null;
  playerComp = null;
  cameraComp = null;
  worldEntity = null;
}   
 
GameGlobal.DataCenter = new DataCenter();
export default GameGlobal.DataCenter;
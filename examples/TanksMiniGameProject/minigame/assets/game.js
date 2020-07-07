
  
  
  GameGlobal.engine = requirePlugin('WXEngine', {
    enableRequireHostModule: true, // 是否允许插件引用宿主的模块，默认 false
    customEnv: { // 传递给插件的值，多次调用传递会覆盖写（Object.assign）
      wx
    }
  })

  /**
   * Read a json file and return the object.
   * Null will be returned if error occurs when parsing JSON.
   * @param {string} path
   */
  function readJSONSync(path) {
    var manager = wx.getFileSystemManager();
    var res = null;
    try {
      res = JSON.parse(manager.readFileSync(path, "utf8"));
    } catch (error) { }
    return res;
  }

  /**
   * Register global canvas.
   */
  var canvas = GameGlobal.canvas ? GameGlobal.canvas : (GameGlobal.canvas = wx.createCanvas());

  /**
   * Try to get the url prefix in configure file.
   */
  var engineConfig = readJSONSync("engine.config.json");
  var urlPrefix = "file:///assets/";
  var globalSetting = {};
  if (engineConfig && (typeof (engineConfig.globalSetting) === "object")) {
    globalSetting = engineConfig.globalSetting;
    if (engineConfig.globalSetting.BaseURL || engineConfig.globalSetting.baseURL) {
      urlPrefix = engineConfig.globalSetting.BaseURL || engineConfig.globalSetting.baseURL;
    }
  }

  /**
   * Initialize the engine.
   */
  engine.init(canvas, globalSetting);

  /**
   * Console log the platform info.
   */
  if (!engine.device || !engine.device.getGroupPlatform) {
    throw Error("不支持getGroupPlatform接口，请更新小游戏优化方案版本，否则无法使用");
  }
  var platform = engine.device.getGroupPlatform();
  console.log("Platform:", platform || "Devtool");

  /**
   * Register the group info into engine loader.
   * @param {object} groupJson
   * @param {string} urlPrefix
   */
  function registGroup(groupJson, urlPrefix) {
    urlPrefix = urlPrefix || "";
    groupJson.groups.forEach(function (groupInfo) {
      /**
       * Register groups.
       */
      var groupId = groupInfo.group.id;
      engine.loader.registerGroup({
        ...groupInfo.group,
        url: urlPrefix + groupInfo.group.url,
      });
      /**
       * Register assets.
       */
      var assets = groupInfo.assets.map(function (id) {
        return {
          id: id,
          groupid: groupId,
        };
      });
      engine.loader.registerAsset(assets);
    });
  }

  /**
   * Register buildin groups.
   */
  var buildinGroupJson = readJSONSync("assets/IDEBuildIn/register" + (platform ? "_" + platform : "") + ".json");
  if (buildinGroupJson) {
    registGroup(buildinGroupJson);
  }

  /**
   * Register ide packed groups.
   */
  var packGroupJson = readJSONSync("assets/IDEPack/register" + (platform ? "_" + platform : "") + ".json");
  if (packGroupJson) {
    registGroup(packGroupJson, urlPrefix);
  }

  /**
   * Create global game.
   */
  var game = GameGlobal.game = new engine.Game(720, 1280);

  /**
   * Load entry scenes.
   */
  
engine.loader.load("Assets/_Complete-Game.scene").promise.then(function (scene) {
  game.playScene(scene);
});


  /**
   * Run the game.
   */
  game.run();
  
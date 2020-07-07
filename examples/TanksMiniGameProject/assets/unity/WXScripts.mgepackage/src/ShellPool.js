Bridge.assembly("minigame-adaptor-project", function ($asm, globals) {
    "use strict";

    Bridge.define("ShellPool", {
        statics: {
            fields: {
                m_freeShellList: null
            },
            ctors: {
                init: function () {
                    this.m_freeShellList = new (System.Collections.Generic.List$1(MiniGameAdaptor.GameObject)).ctor();
                }
            },
            methods: {
                Create: function (original, position, rotation) {
                    if (ShellPool.m_freeShellList.Count === 0) {
                        var gameObject = MiniGameAdaptor.Object.Instantiate$3(MiniGameAdaptor.GameObject, original, position.$clone(), rotation.$clone());
                        gameObject.SetActive(true);
                        return gameObject;
                    } else {
                        var gameObject1 = ShellPool.m_freeShellList.getItem(((ShellPool.m_freeShellList.Count - 1) | 0));
                        ShellPool.m_freeShellList.removeAt(((ShellPool.m_freeShellList.Count - 1) | 0));
                        gameObject1.SetActive(true);
                        gameObject1.transform.position = position.$clone();
                        gameObject1.transform.rotation = rotation.$clone();
                        return gameObject1;
                    }
                },
                Destroy: function (gameObject) {
                    gameObject.SetActive(false);
                    ShellPool.m_freeShellList.add(gameObject);
                }
            }
        }
    });
});

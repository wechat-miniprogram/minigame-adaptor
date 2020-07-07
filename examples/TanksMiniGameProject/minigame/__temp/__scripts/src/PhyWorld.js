Bridge.assembly("minigame-adaptor-project", function ($asm, globals) {
    "use strict";

    Bridge.define("PhyWorld", {
        inherits: [MiniGameAdaptor.MonoBehaviour],
        fields: {
            StaticWorld: null,
            player1: null,
            player2: null,
            m_staticEntities: null,
            m_bulletEntities: null,
            m_playerEntities: null
        },
        ctors: {
            init: function () {
                this.m_staticEntities = new (System.Collections.Generic.List$1(PhyWorld.BoxEntity)).ctor();
                this.m_bulletEntities = new (System.Collections.Generic.List$1(MiniGameAdaptor.BoxCollider)).ctor();
                this.m_playerEntities = new (System.Collections.Generic.List$1(PhyWorld.BoxEntity)).ctor();
            }
        },
        methods: {
            GetAABB: function (box) {
                var pos = MiniGameAdaptor.Vector3.op_Addition(box.center.$clone(), box.transform.position.$clone());
                var aabb = new PhyWorld.AABBInfo();
                aabb.minX = pos.x - box.size.x / 2;
                aabb.minY = pos.y - box.size.y / 2;
                aabb.minZ = pos.z - box.size.z / 2;
                aabb.maxX = pos.x + box.size.x / 2;
                aabb.maxY = pos.y + box.size.y / 2;
                aabb.maxZ = pos.z + box.size.z / 2;
                return aabb;
            },
            Start: function () {
                var $t;
                var comps = this.StaticWorld.GetComponentsInChildren(MiniGameAdaptor.BoxCollider);
                $t = Bridge.getEnumerator(comps);
                try {
                    while ($t.moveNext()) {
                        var box = $t.Current;
                        var entity = new PhyWorld.BoxEntity();
                        entity.collider = box;
                        entity.aabb = this.GetAABB(box);
                        this.m_staticEntities.add(entity);
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
            },
            AddPlayer: function (box) {
                var entity = new PhyWorld.BoxEntity();
                entity.collider = box;
                entity.aabb = this.GetAABB(box);
                this.m_playerEntities.add(entity);
            },
            CheckCollideWithPlayer: function (box, playerNum) {
                var $t;
                var a = this.GetAABB(box);
                $t = Bridge.getEnumerator(this.m_playerEntities);
                try {
                    while ($t.moveNext()) {
                        var entity = $t.Current;
                        if (playerNum === entity.collider.gameObject.GetComponent(Complete.TankShooting).m_PlayerNumber) {
                            continue;
                        }
                        var b = this.GetAABB(entity.collider);
                        if ((a.minX <= b.maxX && a.maxX >= b.minX) && (a.minY <= b.maxY && a.maxY >= b.minY) && (a.minZ <= b.maxZ && a.maxZ >= b.minZ)) {
                            return entity.collider;
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
                return null;
            },
            CheckCollideWithStatic: function (box) {
                var $t;
                var a = this.GetAABB(box);
                $t = Bridge.getEnumerator(this.m_staticEntities);
                try {
                    while ($t.moveNext()) {
                        var entity = $t.Current;
                        var b = entity.aabb;
                        if ((a.minX <= b.maxX && a.maxX >= b.minX) && (a.minY <= b.maxY && a.maxY >= b.minY) && (a.minZ <= b.maxZ && a.maxZ >= b.minZ)) {
                            return entity.collider;
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
                return null;
            }
        }
    });
});

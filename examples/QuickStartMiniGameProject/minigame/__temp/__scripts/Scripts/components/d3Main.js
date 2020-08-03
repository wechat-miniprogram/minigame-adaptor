"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var engine_1 = require("engine");
var collider_js_1 = require("../commons/collider.js");
var dataCenter_js_1 = require("../commons/dataCenter.js");
var d3Enemy_js_1 = require("./d3Enemy.js");
var d3Player_js_1 = require("./d3Player.js");
var ENEMY_INTERVAL = 0.5;
var randomBetween = function (min, max) {
    return Math.random() * (max - min) + min;
};
var D3Main = (function (_super) {
    tslib_1.__extends(D3Main, _super);
    function D3Main() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.world = null;
        _this.enemyTime = 0;
        _this.enemyPrefab = null;
        return _this;
    }
    D3Main.prototype.onAwake = function () {
        console.log("onAwake D3Main");
        this.world = this.entity.transform.parent.entity;
        dataCenter_js_1.default.worldEntity = this.world;
        collider_js_1.default.watchGroup("enemy", "player");
        collider_js_1.default.watchGroup("enemy", "bullet");
        this.initPlayer();
        this.initEnemy();
    };
    D3Main.prototype.onUpdate = function (dt) {
        collider_js_1.default.onUpdate(dt);
        this.enemyTime += dt;
        if (this.enemyTime >= ENEMY_INTERVAL) {
            this.addEnemy();
            this.enemyTime -= ENEMY_INTERVAL;
        }
    };
    D3Main.prototype.initPlayer = function () {
        var _this = this;
        engine_1.default.loader.load("resource/Aircraft.prefab").promise.then(function (prefab) {
            var entity = prefab.instantiate();
            entity.addComponent(d3Player_js_1.default);
            entity.transform.position.y += 1;
            entity.transform.position.z = 8;
            _this.world.transform.addChild(entity.transform);
        });
    };
    D3Main.prototype.initEnemy = function () {
        var _this = this;
        engine_1.default.loader.load("resource/Enemy01.prefab").promise.then(function (prefab) {
            _this.enemyPrefab = prefab;
        });
    };
    D3Main.prototype.addEnemy = function () {
        if (!this.enemyPrefab) {
            return;
        }
        if (d3Enemy_js_1.default.enemyCount >= 20) {
            return;
        }
        var entity = this.enemyPrefab.instantiate();
        var script = entity.addComponent(d3Enemy_js_1.default);
        entity.transform.position.x = randomBetween(-26, 26);
        entity.transform.position.y += 1;
        entity.transform.position.z = randomBetween(-50, -20);
        this.world.transform.addChild(entity.transform);
        d3Enemy_js_1.default.enemyCount++;
    };
    D3Main = tslib_1.__decorate([
        engine_1.default.decorators.serialize("D3Main")
    ], D3Main);
    return D3Main;
}(engine_1.default.Script));
exports.default = D3Main;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNjcmlwdHMvY29tcG9uZW50cy9kM01haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsaUNBQTRCO0FBQzVCLHNEQUE4QztBQUM5QywwREFBa0Q7QUFDbEQsMkNBQW1DO0FBQ25DLDZDQUFxQztBQUVyQyxJQUFNLGNBQWMsR0FBRyxHQUFHLENBQUM7QUFDM0IsSUFBTSxhQUFhLEdBQUcsVUFBQyxHQUFHLEVBQUUsR0FBRztJQUM3QixPQUFPLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDM0MsQ0FBQyxDQUFDO0FBR0Y7SUFBb0Msa0NBQWE7SUFBakQ7UUFBQSxxRUE0REM7UUEzRFEsV0FBSyxHQUF5QixJQUFJLENBQUM7UUFDbkMsZUFBUyxHQUFXLENBQUMsQ0FBQztRQUN0QixpQkFBVyxHQUF5QixJQUFJLENBQUM7O0lBeURsRCxDQUFDO0lBdkRRLHdCQUFPLEdBQWQ7UUFDRSxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDOUIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO1FBQ2pELHVCQUFVLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFFcEMscUJBQVEsQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3ZDLHFCQUFRLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztRQUV2QyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDbEIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFFTSx5QkFBUSxHQUFmLFVBQWdCLEVBQVU7UUFDeEIscUJBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDdEIsSUFBSSxDQUFDLFNBQVMsSUFBSSxFQUFFLENBQUM7UUFDckIsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLGNBQWMsRUFBRTtZQUNwQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDaEIsSUFBSSxDQUFDLFNBQVMsSUFBSSxjQUFjLENBQUM7U0FDbEM7SUFDSCxDQUFDO0lBRU0sMkJBQVUsR0FBakI7UUFBQSxpQkFRQztRQVBDLGdCQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBZ0IsMEJBQTBCLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQUMsTUFBTTtZQUNoRixJQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDcEMsTUFBTSxDQUFDLFlBQVksQ0FBQyxxQkFBUSxDQUFDLENBQUM7WUFDOUIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNqQyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2hDLEtBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDbEQsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU0sMEJBQVMsR0FBaEI7UUFBQSxpQkFJQztRQUhDLGdCQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBZ0IseUJBQXlCLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQUMsTUFBTTtZQUMvRSxLQUFJLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQztRQUM1QixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTSx5QkFBUSxHQUFmO1FBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDckIsT0FBTztTQUNSO1FBQ0QsSUFBSSxvQkFBTyxDQUFDLFVBQVUsSUFBSSxFQUFFLEVBQUU7WUFDNUIsT0FBTztTQUNSO1FBQ0QsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUM5QyxJQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLG9CQUFPLENBQUMsQ0FBQztRQUM1QyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsYUFBYSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3JELE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBR3RELElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDaEQsb0JBQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUV2QixDQUFDO0lBM0RrQixNQUFNO1FBRDFCLGdCQUFNLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7T0FDakIsTUFBTSxDQTREMUI7SUFBRCxhQUFDO0NBNURELEFBNERDLENBNURtQyxnQkFBTSxDQUFDLE1BQU0sR0E0RGhEO2tCQTVEb0IsTUFBTSIsImZpbGUiOiJTY3JpcHRzL2NvbXBvbmVudHMvZDNNYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGVuZ2luZSBmcm9tIFwiZW5naW5lXCI7XG5pbXBvcnQgQ29sbGlkZXIgZnJvbSBcIi4uL2NvbW1vbnMvY29sbGlkZXIuanNcIjtcbmltcG9ydCBEYXRhQ2VudGVyIGZyb20gXCIuLi9jb21tb25zL2RhdGFDZW50ZXIuanNcIjtcbmltcG9ydCBEM0VuZW15IGZyb20gXCIuL2QzRW5lbXkuanNcIjtcbmltcG9ydCBEM1BsYXllciBmcm9tIFwiLi9kM1BsYXllci5qc1wiO1xuXG5jb25zdCBFTkVNWV9JTlRFUlZBTCA9IDAuNTtcbmNvbnN0IHJhbmRvbUJldHdlZW4gPSAobWluLCBtYXgpID0+IHtcbiAgcmV0dXJuIE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSArIG1pbjtcbn07XG5cbkBlbmdpbmUuZGVjb3JhdG9ycy5zZXJpYWxpemUoXCJEM01haW5cIilcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEQzTWFpbiBleHRlbmRzIGVuZ2luZS5TY3JpcHQge1xuICBwdWJsaWMgd29ybGQ6IG51bGwgfCBlbmdpbmUuRW50aXR5ID0gbnVsbDsgLy8gd29ybGQgZW50aXR5XG4gIHB1YmxpYyBlbmVteVRpbWU6IG51bWJlciA9IDA7XG4gIHB1YmxpYyBlbmVteVByZWZhYjogZW5naW5lLlByZWZhYiB8IG51bGwgPSBudWxsO1xuXG4gIHB1YmxpYyBvbkF3YWtlKCkge1xuICAgIGNvbnNvbGUubG9nKFwib25Bd2FrZSBEM01haW5cIik7XG4gICAgdGhpcy53b3JsZCA9IHRoaXMuZW50aXR5LnRyYW5zZm9ybS5wYXJlbnQuZW50aXR5O1xuICAgIERhdGFDZW50ZXIud29ybGRFbnRpdHkgPSB0aGlzLndvcmxkO1xuICAgIFxuICAgIENvbGxpZGVyLndhdGNoR3JvdXAoXCJlbmVteVwiLCBcInBsYXllclwiKTtcbiAgICBDb2xsaWRlci53YXRjaEdyb3VwKFwiZW5lbXlcIiwgXCJidWxsZXRcIik7XG5cbiAgICB0aGlzLmluaXRQbGF5ZXIoKTtcbiAgICB0aGlzLmluaXRFbmVteSgpO1xuICB9XG5cbiAgcHVibGljIG9uVXBkYXRlKGR0OiBudW1iZXIpIHtcbiAgICBDb2xsaWRlci5vblVwZGF0ZShkdCk7XG4gICAgdGhpcy5lbmVteVRpbWUgKz0gZHQ7XG4gICAgaWYgKHRoaXMuZW5lbXlUaW1lID49IEVORU1ZX0lOVEVSVkFMKSB7XG4gICAgICB0aGlzLmFkZEVuZW15KCk7XG4gICAgICB0aGlzLmVuZW15VGltZSAtPSBFTkVNWV9JTlRFUlZBTDtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgaW5pdFBsYXllcigpIHtcbiAgICBlbmdpbmUubG9hZGVyLmxvYWQ8ZW5naW5lLlByZWZhYj4oXCJyZXNvdXJjZS9BaXJjcmFmdC5wcmVmYWJcIikucHJvbWlzZS50aGVuKChwcmVmYWIpID0+IHtcbiAgICAgIGNvbnN0IGVudGl0eSA9IHByZWZhYi5pbnN0YW50aWF0ZSgpO1xuICAgICAgZW50aXR5LmFkZENvbXBvbmVudChEM1BsYXllcik7XG4gICAgICBlbnRpdHkudHJhbnNmb3JtLnBvc2l0aW9uLnkgKz0gMTtcbiAgICAgIGVudGl0eS50cmFuc2Zvcm0ucG9zaXRpb24ueiA9IDg7XG4gICAgICB0aGlzLndvcmxkLnRyYW5zZm9ybS5hZGRDaGlsZChlbnRpdHkudHJhbnNmb3JtKTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBpbml0RW5lbXkoKSB7XG4gICAgZW5naW5lLmxvYWRlci5sb2FkPGVuZ2luZS5QcmVmYWI+KFwicmVzb3VyY2UvRW5lbXkwMS5wcmVmYWJcIikucHJvbWlzZS50aGVuKChwcmVmYWIpID0+IHtcbiAgICAgIHRoaXMuZW5lbXlQcmVmYWIgPSBwcmVmYWI7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgYWRkRW5lbXkoKSB7XG4gICAgaWYgKCF0aGlzLmVuZW15UHJlZmFiKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChEM0VuZW15LmVuZW15Q291bnQgPj0gMjApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgZW50aXR5ID0gdGhpcy5lbmVteVByZWZhYi5pbnN0YW50aWF0ZSgpO1xuICAgIGNvbnN0IHNjcmlwdCA9IGVudGl0eS5hZGRDb21wb25lbnQoRDNFbmVteSk7XG4gICAgZW50aXR5LnRyYW5zZm9ybS5wb3NpdGlvbi54ID0gcmFuZG9tQmV0d2VlbigtMjYsIDI2KTtcbiAgICBlbnRpdHkudHJhbnNmb3JtLnBvc2l0aW9uLnkgKz0gMTtcbiAgICBlbnRpdHkudHJhbnNmb3JtLnBvc2l0aW9uLnogPSByYW5kb21CZXR3ZWVuKC01MCwgLTIwKTtcbiAgICAvLyBlbnRpdHkudHJhbnNmb3JtLnBvc2l0aW9uLnggPSByYW5kb21CZXR3ZWVuKC0xMCwgMTApO1xuICAgIC8vIGVudGl0eS50cmFuc2Zvcm0ucG9zaXRpb24ueiA9IHJhbmRvbUJldHdlZW4oMTAsIDEpO1xuICAgIHRoaXMud29ybGQudHJhbnNmb3JtLmFkZENoaWxkKGVudGl0eS50cmFuc2Zvcm0pO1xuICAgIEQzRW5lbXkuZW5lbXlDb3VudCsrO1xuICAgIC8vIGNvbnNvbGUubG9nKCdBZGQgRW5lbXknLCBEM0VuZW15LmVuZW15Q291bnQpO1xuICB9XG59XG4iXX0=

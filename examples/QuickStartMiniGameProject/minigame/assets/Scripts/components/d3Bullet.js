"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var engine_1 = require("engine");
var collider_js_1 = require("../commons/collider.js");
var D3Bullet = (function (_super) {
    tslib_1.__extends(D3Bullet, _super);
    function D3Bullet() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.direction = engine_1.default.Vector3.ZERO.clone();
        _this.speed = 8;
        _this.sumTime = 0;
        _this.maxTime = 5;
        _this.attack = 1;
        _this.bound = engine_1.default.Vector3.createFromNumber(0.15 / 2, 0.15 / 2, 0.15 / 2);
        return _this;
    }
    D3Bullet.prototype.onAwake = function () {
        collider_js_1.default.watch(this, ["bullet"]);
    };
    D3Bullet.prototype.onUpdate = function (dt) {
        if (this.sumTime < this.maxTime) {
            this.sumTime += dt;
            this.entity.transform.position.x += this.direction.x * this.speed * dt;
            this.entity.transform.position.y += this.direction.y * this.speed * dt;
            this.entity.transform.position.z += this.direction.z * this.speed * dt;
        }
        else {
            this.removeSelf();
        }
    };
    D3Bullet.prototype.onCollide = function (comp) {
        this.removeSelf();
    };
    D3Bullet.prototype.onDestroy = function () {
    };
    D3Bullet.prototype.removeSelf = function () {
        if (this.entity.transform && this.entity.transform.parent) {
            var parentTransform = this.entity.transform.parent;
            parentTransform.removeChild(this.entity.transform);
            collider_js_1.default.unwatch(this);
            this.entity.destroy();
        }
    };
    D3Bullet = tslib_1.__decorate([
        engine_1.default.decorators.serialize("D3Bullet")
    ], D3Bullet);
    return D3Bullet;
}(engine_1.default.Script));
exports.default = D3Bullet;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNjcmlwdHMvY29tcG9uZW50cy9kM0J1bGxldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxpQ0FBNEI7QUFDNUIsc0RBQThDO0FBRzlDO0lBQXNDLG9DQUFhO0lBQW5EO1FBQUEscUVBMENDO1FBekNRLGVBQVMsR0FBRyxnQkFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDeEMsV0FBSyxHQUFHLENBQUMsQ0FBQztRQUNWLGFBQU8sR0FBRyxDQUFDLENBQUM7UUFDWixhQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ1osWUFBTSxHQUFHLENBQUMsQ0FBQztRQUNYLFdBQUssR0FBRyxnQkFBTSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxFQUFFLElBQUksR0FBRyxDQUFDLEVBQUUsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDOztJQW9DL0UsQ0FBQztJQWxDUSwwQkFBTyxHQUFkO1FBRUUscUJBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRU0sMkJBQVEsR0FBZixVQUFnQixFQUFFO1FBQ2hCLElBQUksSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBRS9CLElBQUksQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDO1lBQ25CLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7WUFDdkUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztZQUN2RSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1NBRXhFO2FBQU07WUFDTCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDbkI7SUFDSCxDQUFDO0lBRU0sNEJBQVMsR0FBaEIsVUFBaUIsSUFBSTtRQUNuQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVNLDRCQUFTLEdBQWhCO0lBRUEsQ0FBQztJQUVNLDZCQUFVLEdBQWpCO1FBQ0UsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUU7WUFDekQsSUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBcUIsQ0FBQTtZQUNuRSxlQUFlLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDbkQscUJBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUN2QjtJQUNILENBQUM7SUF6Q2tCLFFBQVE7UUFENUIsZ0JBQU0sQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQztPQUNuQixRQUFRLENBMEM1QjtJQUFELGVBQUM7Q0ExQ0QsQUEwQ0MsQ0ExQ3FDLGdCQUFNLENBQUMsTUFBTSxHQTBDbEQ7a0JBMUNvQixRQUFRIiwiZmlsZSI6IlNjcmlwdHMvY29tcG9uZW50cy9kM0J1bGxldC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBlbmdpbmUgZnJvbSBcImVuZ2luZVwiO1xuaW1wb3J0IENvbGxpZGVyIGZyb20gXCIuLi9jb21tb25zL2NvbGxpZGVyLmpzXCI7XG5cbkBlbmdpbmUuZGVjb3JhdG9ycy5zZXJpYWxpemUoXCJEM0J1bGxldFwiKVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRDNCdWxsZXQgZXh0ZW5kcyBlbmdpbmUuU2NyaXB0IHtcbiAgcHVibGljIGRpcmVjdGlvbiA9IGVuZ2luZS5WZWN0b3IzLlpFUk8uY2xvbmUoKTtcbiAgcHVibGljIHNwZWVkID0gODtcbiAgcHVibGljIHN1bVRpbWUgPSAwO1xuICBwdWJsaWMgbWF4VGltZSA9IDU7XG4gIHB1YmxpYyBhdHRhY2sgPSAxO1xuICBwdWJsaWMgYm91bmQgPSBlbmdpbmUuVmVjdG9yMy5jcmVhdGVGcm9tTnVtYmVyKDAuMTUgLyAyLCAwLjE1IC8gMiwgMC4xNSAvIDIpO1xuXG4gIHB1YmxpYyBvbkF3YWtlKCkge1xuICAgIC8vIGNvbnNvbGUubG9nKFwib25Bd2FrZSBEM0J1bGxldFwiLCB0aGlzLmRpcmVjdGlvbi54LCB0aGlzLmRpcmVjdGlvbi55LCB0aGlzLmRpcmVjdGlvbi56KTtcbiAgICBDb2xsaWRlci53YXRjaCh0aGlzLCBbXCJidWxsZXRcIl0pO1xuICB9XG5cbiAgcHVibGljIG9uVXBkYXRlKGR0KSB7XG4gICAgaWYgKHRoaXMuc3VtVGltZSA8IHRoaXMubWF4VGltZSkge1xuXG4gICAgICB0aGlzLnN1bVRpbWUgKz0gZHQ7XG4gICAgICB0aGlzLmVudGl0eS50cmFuc2Zvcm0ucG9zaXRpb24ueCArPSB0aGlzLmRpcmVjdGlvbi54ICogdGhpcy5zcGVlZCAqIGR0O1xuICAgICAgdGhpcy5lbnRpdHkudHJhbnNmb3JtLnBvc2l0aW9uLnkgKz0gdGhpcy5kaXJlY3Rpb24ueSAqIHRoaXMuc3BlZWQgKiBkdDtcbiAgICAgIHRoaXMuZW50aXR5LnRyYW5zZm9ybS5wb3NpdGlvbi56ICs9IHRoaXMuZGlyZWN0aW9uLnogKiB0aGlzLnNwZWVkICogZHQ7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yZW1vdmVTZWxmKCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIG9uQ29sbGlkZShjb21wKSB7XG4gICAgdGhpcy5yZW1vdmVTZWxmKCk7XG4gIH1cblxuICBwdWJsaWMgb25EZXN0cm95KCkge1xuICAgIC8vIGNvbnNvbGUubG9nKCdvbkRlc3Ryb3kgYnVsbGV0Jyk7XG4gIH1cblxuICBwdWJsaWMgcmVtb3ZlU2VsZigpIHtcbiAgICBpZiAodGhpcy5lbnRpdHkudHJhbnNmb3JtICYmIHRoaXMuZW50aXR5LnRyYW5zZm9ybS5wYXJlbnQpIHtcbiAgICAgIGNvbnN0IHBhcmVudFRyYW5zZm9ybSA9IHRoaXMuZW50aXR5LnRyYW5zZm9ybS5wYXJlbnQgYXMgVHJhbnNmb3JtM0RcbiAgICAgIHBhcmVudFRyYW5zZm9ybS5yZW1vdmVDaGlsZCh0aGlzLmVudGl0eS50cmFuc2Zvcm0pO1xuICAgICAgQ29sbGlkZXIudW53YXRjaCh0aGlzKTtcbiAgICAgIHRoaXMuZW50aXR5LmRlc3Ryb3koKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==

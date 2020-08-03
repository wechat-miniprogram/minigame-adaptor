"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var engine_1 = require("engine");
var collider_js_1 = require("../commons/collider.js");
var eventCenter_js_1 = require("../commons/eventCenter.js");
var d3Bullet_js_1 = require("./d3Bullet.js");
var d3Player_js_1 = require("./d3Player.js");
var randomBetween = function (min, max) {
    return Math.random() * (max - min) + min;
};
var D3Enemy = (function (_super) {
    tslib_1.__extends(D3Enemy, _super);
    function D3Enemy() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.direction = engine_1.default.Vector3.ZERO.clone();
        _this.speed = randomBetween(3, 6);
        _this.sumTime = 0;
        _this.maxTime = 15;
        _this.hp = 5;
        _this.score = {
            collide: -2,
            dead: 1,
        };
        _this.rotationY = (Math.random() < 0.5 ? -1 : 1) * 0.05;
        _this.hurtParticle = null;
        _this.bound = engine_1.default.Vector3.createFromNumber(0.9 / 2, 0.5 / 2, 0.9 / 2);
        return _this;
    }
    D3Enemy_1 = D3Enemy;
    D3Enemy.prototype.onAwake = function () {
        this.direction.z = 1;
        this.hurtParticle = this.entity.transform._children[0].findChildByName("Hurt").entity.getComponent(engine_1.default.Particle);
        collider_js_1.default.watch(this, ["enemy"]);
    };
    D3Enemy.prototype.onUpdate = function (dt) {
        if (this.sumTime < this.maxTime) {
            this.sumTime += dt;
            this.entity.transform.position.x += this.direction.x * this.speed * dt;
            this.entity.transform.position.y += this.direction.y * this.speed * dt;
            this.entity.transform.position.z += this.direction.z * this.speed * dt;
            this.entity.transform.euler.y += this.rotationY;
        }
        else {
            this.removeEnemy();
        }
    };
    D3Enemy.prototype.onCollide = function (comp) {
        if (comp instanceof d3Player_js_1.default) {
            eventCenter_js_1.default.emit(eventCenter_js_1.default.HURT_PLAYER);
            eventCenter_js_1.default.emit(eventCenter_js_1.default.GET_SCORE, this.score.collide);
            this.removeEnemy();
        }
        else if (comp instanceof d3Bullet_js_1.default) {
            this.hp -= comp.attack;
            this.hurtParticle.emitter.start = true;
            if (this.hp <= 0) {
                eventCenter_js_1.default.emit(eventCenter_js_1.default.GET_SCORE, this.score.dead);
                this.removeEnemy();
            }
        }
    };
    D3Enemy.prototype.removeEnemy = function () {
        if (this.entity.transform) {
            var parentTransform = this.entity.transform.parent;
            parentTransform.removeChild(this.entity.transform);
            collider_js_1.default.unwatch(this);
            this.entity.destroy();
            D3Enemy_1.enemyCount--;
        }
    };
    D3Enemy.prototype.onDestroy = function () {
    };
    var D3Enemy_1;
    D3Enemy.enemyCount = 0;
    D3Enemy = D3Enemy_1 = tslib_1.__decorate([
        engine_1.default.decorators.serialize("D3Enemy")
    ], D3Enemy);
    return D3Enemy;
}(engine_1.default.Script));
exports.default = D3Enemy;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNjcmlwdHMvY29tcG9uZW50cy9kM0VuZW15LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGlDQUE0QjtBQUM1QixzREFBOEM7QUFFOUMsNERBQW9EO0FBQ3BELDZDQUFxQztBQUNyQyw2Q0FBcUM7QUFFckMsSUFBTSxhQUFhLEdBQUcsVUFBQyxHQUFHLEVBQUUsR0FBRztJQUM3QixPQUFPLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDM0MsQ0FBQyxDQUFDO0FBSUY7SUFBcUMsbUNBQWE7SUFBbEQ7UUFBQSxxRUEwRUM7UUF2RVEsZUFBUyxHQUFHLGdCQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUN4QyxXQUFLLEdBQUcsYUFBYSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM1QixhQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ1osYUFBTyxHQUFHLEVBQUUsQ0FBQztRQUNiLFFBQUUsR0FBRyxDQUFDLENBQUM7UUFDUCxXQUFLLEdBQUc7WUFDYixPQUFPLEVBQUUsQ0FBQyxDQUFDO1lBQ1gsSUFBSSxFQUFFLENBQUM7U0FDUixDQUFDO1FBQ0ssZUFBUyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUNsRCxrQkFBWSxHQUFHLElBQUksQ0FBQztRQUNwQixXQUFLLEdBQUcsZ0JBQU0sQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQzs7SUE0RDVFLENBQUM7Z0JBMUVvQixPQUFPO0lBZ0JuQix5QkFBTyxHQUFkO1FBRUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxD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QUFDO09BQ2xCLE9BQU8sQ0EwRTNCO0lBQUQsY0FBQztDQTFFRCxBQTBFQyxDQTFFb0MsZ0JBQU0sQ0FBQyxNQUFNLEdBMEVqRDtrQkExRW9CLE9BQU8iLCJmaWxlIjoiU2NyaXB0cy9jb21wb25lbnRzL2QzRW5lbXkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZW5naW5lIGZyb20gXCJlbmdpbmVcIjtcbmltcG9ydCBDb2xsaWRlciBmcm9tIFwiLi4vY29tbW9ucy9jb2xsaWRlci5qc1wiO1xuaW1wb3J0IERhdGFDZW50ZXIgZnJvbSBcIi4uL2NvbW1vbnMvZGF0YUNlbnRlci5qc1wiO1xuaW1wb3J0IEV2ZW50Q2VudGVyIGZyb20gXCIuLi9jb21tb25zL2V2ZW50Q2VudGVyLmpzXCI7XG5pbXBvcnQgRDNCdWxsZXQgZnJvbSBcIi4vZDNCdWxsZXQuanNcIjtcbmltcG9ydCBEM1BsYXllciBmcm9tIFwiLi9kM1BsYXllci5qc1wiO1xuXG5jb25zdCByYW5kb21CZXR3ZWVuID0gKG1pbiwgbWF4KSA9PiB7XG4gIHJldHVybiBNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikgKyBtaW47XG59O1xuXG5cbkBlbmdpbmUuZGVjb3JhdG9ycy5zZXJpYWxpemUoXCJEM0VuZW15XCIpXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEM0VuZW15IGV4dGVuZHMgZW5naW5lLlNjcmlwdCB7XG5cbiAgcHVibGljIHN0YXRpYyBlbmVteUNvdW50ID0gMDtcbiAgcHVibGljIGRpcmVjdGlvbiA9IGVuZ2luZS5WZWN0b3IzLlpFUk8uY2xvbmUoKTtcbiAgcHVibGljIHNwZWVkID0gcmFuZG9tQmV0d2VlbigzLCA2KTtcbiAgcHVibGljIHN1bVRpbWUgPSAwO1xuICBwdWJsaWMgbWF4VGltZSA9IDE1O1xuICBwdWJsaWMgaHAgPSA1O1xuICBwdWJsaWMgc2NvcmUgPSB7XG4gICAgY29sbGlkZTogLTIsXG4gICAgZGVhZDogMSxcbiAgfTtcbiAgcHVibGljIHJvdGF0aW9uWSA9IChNYXRoLnJhbmRvbSgpIDwgMC41ID8gLTEgOiAxKSAqIDAuMDU7XG4gIHB1YmxpYyBodXJ0UGFydGljbGUgPSBudWxsO1xuICBwdWJsaWMgYm91bmQgPSBlbmdpbmUuVmVjdG9yMy5jcmVhdGVGcm9tTnVtYmVyKDAuOSAvIDIsIDAuNSAvIDIsIDAuOSAvIDIpO1xuXG4gIHB1YmxpYyBvbkF3YWtlKCkge1xuICAgIC8vIGNvbnNvbGUubG9nKFwib25Bd2FrZSBEM0VuZW15XCIpO1xuICAgIHRoaXMuZGlyZWN0aW9uLnogPSAxO1xuICAgIHRoaXMuaHVydFBhcnRpY2xlID0gdGhpcy5lbnRpdHkudHJhbnNmb3JtLl9jaGlsZHJlblswXS5maW5kQ2hpbGRCeU5hbWUoXCJIdXJ0XCIpLmVudGl0eS5nZXRDb21wb25lbnQoZW5naW5lLlBhcnRpY2xlKTtcbiAgICBDb2xsaWRlci53YXRjaCh0aGlzLCBbXCJlbmVteVwiXSk7XG4gIH1cblxuICBwdWJsaWMgb25VcGRhdGUoZHQpIHtcbiAgICBpZiAodGhpcy5zdW1UaW1lIDwgdGhpcy5tYXhUaW1lKSB7XG5cbiAgICAgIHRoaXMuc3VtVGltZSArPSBkdDtcblxuICAgICAgLy8gY29uc3QgcGxheWVyID0gRGF0YUNlbnRlci5wbGF5ZXJFbnRpdHk7XG4gICAgICAvLyB0aGlzLmRpcmVjdGlvbi54ID0gcGxheWVyLnRyYW5zZm9ybS5wb3NpdGlvbi54IC0gdGhpcy5lbnRpdHkudHJhbnNmb3JtLnBvc2l0aW9uLng7XG4gICAgICAvLyB0aGlzLmRpcmVjdGlvbi55ID0gcGxheWVyLnRyYW5zZm9ybS5wb3NpdGlvbi55IC0gdGhpcy5lbnRpdHkudHJhbnNmb3JtLnBvc2l0aW9uLnk7XG4gICAgICAvLyB0aGlzLmRpcmVjdGlvbi56ID0gcGxheWVyLnRyYW5zZm9ybS5wb3NpdGlvbi56IC0gdGhpcy5lbnRpdHkudHJhbnNmb3JtLnBvc2l0aW9uLno7XG4gICAgICAvLyB0aGlzLmRpcmVjdGlvbiA9IHRoaXMuZGlyZWN0aW9uLm5vcm1hbGl6ZSgpO1xuXG4gICAgICB0aGlzLmVudGl0eS50cmFuc2Zvcm0ucG9zaXRpb24ueCArPSB0aGlzLmRpcmVjdGlvbi54ICogdGhpcy5zcGVlZCAqIGR0O1xuICAgICAgdGhpcy5lbnRpdHkudHJhbnNmb3JtLnBvc2l0aW9uLnkgKz0gdGhpcy5kaXJlY3Rpb24ueSAqIHRoaXMuc3BlZWQgKiBkdDtcbiAgICAgIHRoaXMuZW50aXR5LnRyYW5zZm9ybS5wb3NpdGlvbi56ICs9IHRoaXMuZGlyZWN0aW9uLnogKiB0aGlzLnNwZWVkICogZHQ7XG5cbiAgICAgIHRoaXMuZW50aXR5LnRyYW5zZm9ybS5ldWxlci55ICs9IHRoaXMucm90YXRpb25ZO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlbW92ZUVuZW15KCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIG9uQ29sbGlkZShjb21wKSB7XG4gICAgaWYgKGNvbXAgaW5zdGFuY2VvZiBEM1BsYXllcikge1xuICAgICAgLy8gY29uc29sZS5sb2coJ2lzQ29sbGlkZWQgZW5lbXkgcGxheWVyJyk7XG4gICAgICBFdmVudENlbnRlci5lbWl0KEV2ZW50Q2VudGVyLkhVUlRfUExBWUVSKTtcbiAgICAgIEV2ZW50Q2VudGVyLmVtaXQoRXZlbnRDZW50ZXIuR0VUX1NDT1JFLCB0aGlzLnNjb3JlLmNvbGxpZGUpO1xuICAgICAgdGhpcy5yZW1vdmVFbmVteSgpO1xuXG4gICAgfSBlbHNlIGlmIChjb21wIGluc3RhbmNlb2YgRDNCdWxsZXQpIHtcbiAgICAgIHRoaXMuaHAgLT0gY29tcC5hdHRhY2s7XG4gICAgICB0aGlzLmh1cnRQYXJ0aWNsZS5lbWl0dGVyLnN0YXJ0ID0gdHJ1ZTtcbiAgICAgIGlmICh0aGlzLmhwIDw9IDApIHtcbiAgICAgICAgRXZlbnRDZW50ZXIuZW1pdChFdmVudENlbnRlci5HRVRfU0NPUkUsIHRoaXMuc2NvcmUuZGVhZCk7XG4gICAgICAgIHRoaXMucmVtb3ZlRW5lbXkoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgcmVtb3ZlRW5lbXkoKSB7XG4gICAgaWYgKHRoaXMuZW50aXR5LnRyYW5zZm9ybSkge1xuICAgICAgY29uc3QgcGFyZW50VHJhbnNmb3JtID0gdGhpcy5lbnRpdHkudHJhbnNmb3JtLnBhcmVudDtcbiAgICAgIHBhcmVudFRyYW5zZm9ybS5yZW1vdmVDaGlsZCh0aGlzLmVudGl0eS50cmFuc2Zvcm0pO1xuICAgICAgQ29sbGlkZXIudW53YXRjaCh0aGlzKTtcbiAgICAgIHRoaXMuZW50aXR5LmRlc3Ryb3koKTtcbiAgICAgIEQzRW5lbXkuZW5lbXlDb3VudC0tO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBvbkRlc3Ryb3koKSB7XG4gICAgLy8gY29uc29sZS5sb2coJ29uRGVzdHJveSBlbmVteScpO1xuICB9XG59XG4iXX0=

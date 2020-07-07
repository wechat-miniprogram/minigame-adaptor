function M(row, col) {
    return row * 3 + col
}

// radians angle 
function GetRotationMatNormalVector(inVec, angle) {
    let s, c;
    let vx, vy, vz, xx, yy, zz, xy, yz, zx, xs, ys, zs, omc;
    
    s = Math.sin(angle);
    c = Math.cos(angle);
      
    vx = inVec.x;
    vy = inVec.y;
    vz = inVec.z;

    xx = vx * vx;
    yy = vy * vy;
    zz = vz * vz;
    xy = vx * vy;
    yz = vy * vz;
    zx = vz * vx;
    xs = vx * s;
    ys = vy * s;
    zs = vz * s;
    // one minus c
    omc = 1.0 - c;
    
    let res = [
        (omc * xx) + c, (omc * xy) + zs, (omc * zx) - ys,
        (omc * xy) - zs, (omc * yy) + c, (omc * yz) + xs,
        (omc * zx) + ys, (omc * yz) - xs, (omc * zz) + c
    ];

    return res;
}

// not unity class
class Matrix3x3 {
    constructor(e11, e12, e13, e21, e22, e23, e31, e32, e33) {
        // this.e11 = e11 ?? 0;
        // this.e12 = e12 ?? 0;
        // this.e13 = e13 ?? 0;
        // this.e21 = e21 ?? 0;
        // this.e22 = e22 ?? 0;
        // this.e23 = e23 ?? 0;
        // this.e31 = e31 ?? 0;
        // this.e32 = e32 ?? 0;
        // this.e33 = e33 ?? 0;
        this._data = [
            e11 ?? 0, e12 ?? 0, e13 ?? 0,
            e21 ?? 0, e22 ?? 0, e23 ?? 0,
            e31 ?? 0, e32 ?? 0, e33 ?? 0
        ];
    }

    SetAxisAngle(axis, angle) {
        this._data = GetRotationMatNormalVector(axis, angle);
        return this;
    }

    MultiplyVec3(vec) {
        let res = new MiniGameAdaptor.Vector3();
        res.x = this._data[0] * vec.x + this._data[3] * vec.y + this._data[6] * vec.z;
        res.y = this._data[1] * vec.x + this._data[4] * vec.y + this._data[7] * vec.z;
        res.z = this._data[2] * vec.x + this._data[5] * vec.y + this._data[8] * vec.z;
        return res;
    }
    
}

// MiniGameAdaptor.register('Matrix3x3', Matrix3x3);
window.__minigamePrivate.Matrix3x3 = Matrix3x3;
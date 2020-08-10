const EnumVertexLayoutUsage =  {
    CUSTOM : 0,
    POSITION : 1,
    NORMAL : 2,
    TANGENT : 3,
    UV0 : 4,
    UV1 : 5,
    UV2 : 6,
    COLOR : 7,
    BONEINDEX : 8,
    BONEWEIGHT : 9,
}

const EnumVertexFormat = {
    INVALID : 0,
    FLOAT : 1,
    FLOAT2 : 2,
    FLOAT3 : 3,
    FLOAT4 : 4,
    BYTE4 : 5,
    BYTE4N : 6,
    UBYTE4 : 7,
    UBYTE4N : 8,
    SHORT2 : 9,
    SHORT2N : 10,
    SHORT4 : 11,
    SHORT4N : 12,
    UINT10_N2 : 13,
}

function getPointBuffer(buffer, vertexLayout) {
    if (!buffer) {
        console.log('buffer is not exist!')
    }

    const stride = vertexLayout.stride / 4;
    const config = vertexLayout.getConfigByUsage(EnumVertexLayoutUsage.POSITION);
    const offset = config.offset / 4;
    const verticesCount = buffer.length / stride;

    // 一个顶点为float x y z组成，每个属性占4个字节，总共12个字节
    const newBuffer = new Float32Array(verticesCount * 3);

    // 遍历自研引擎Mesh的buffer数据，将顶点信息取出，存到一个新的Uint8Array里面
    for (let i = 0; i < verticesCount; i++) {
        for (let j = 0; j < 3; j++) {
            newBuffer[i * 3 + j] = buffer[j + i * stride + offset];
        }
    }

    return { newBuffer, verticesCount};
}

function getPointDataByUsage(buffer, vertexLayout, usage) {
    if (!buffer) {
        console.log('buffer is not exist!')
        return [];
    }
    const stride = vertexLayout.stride / 4;
    const config = vertexLayout.getConfigByUsage(usage);
    const offset = config.offset / 4;
    const verticesCount = buffer.length / stride;

    const res = [];

    let start;
    for (let i = 0; i < verticesCount; i++) {
        start = i * stride + offset;

        if (usage === EnumVertexLayoutUsage.POSITION || usage === EnumVertexLayoutUsage.NORMAL) {
            res.push(new MiniGameAdaptor.Vector3.$ctor2(buffer[start], buffer[start + 1], buffer[start + 2])._FlipX());
        } else if (usage === EnumVertexLayoutUsage.UV0) {
            // 与导出插件相反操作
            // wxFileUtil.WriteData(fileStream, vector3.x, vector3.y * -1f + 1f);
            res.push(new MiniGameAdaptor.Vector2.$ctor1(buffer[start], (buffer[start + 1] -1) * -1));
        } else if (usage === EnumVertexLayoutUsage.TANGENT) {
            res.push(new MiniGameAdaptor.Vector4.$ctor3(buffer[start], buffer[start + 1], buffer[start + 2], buffer[start + 3])._FlipX());
        }
    }

    return res;
}

class WXMeshVertexLayout {
    constructor(mesh) {
        this.POSITION = false;
        this.NORMAL = false;
        this.COLOR = false;
        this.UV = false;
        this.UV1 = false;
        this.TANGENT = false;
        this.BONE = false;

        this.layoutSize = 0;

        if (mesh.vertices != null && mesh.vertices.length != 0) {
            this.POSITION = true;
            this.layoutSize += 12;
        }

        if (mesh.normals != null && mesh.normals.length != 0) {
            this.NORMAL = true;
            this.layoutSize += 12;
        }

        if (mesh.colors != null && mesh.colors.length != 0) {
            this.COLOR = true;
            this.layoutSize += 16;
        }

        if (mesh.uv != null && mesh.uv.length != 0) {
            this.UV = true;
            this.layoutSize += 8;
        }

        if (mesh.uv2 != null && mesh.uv2.length != 0) {
            this.UV1 = true;
            this.layoutSize += 8;
        }

        if (mesh.boneWeights != null && mesh.boneWeights.length != 0) {
            this.BONE = true;
            this.layoutSize += 32;
        }

        if (mesh.tangents != null && mesh.tangents.length != 0) {
            this.TANGENT = true;
            this.layoutSize += 16;
        }
    }

    GetLayoutString() {
        let layout = [];

        if (this.POSITION)
        {
            layout.push("POSITION");
        }
        if (this.NORMAL)
        {
            layout.push("NORMAL");
        }
        if (this.COLOR)
        {
            layout.push("COLOR");
        }
        if (this.UV)
        {
            layout.push("UV");
        }
        if (this.UV1)
        {
            layout.push("UV1");
        }
        if (this.BONE)
        {
            layout.push("BLENDWEIGHT,BLENDINDICES");
        }
        if (this.TANGENT)
        {
            layout.push("TANGENT");
        }

        return layout.join(',');
    }
}

function createEngineMesh(mesh) {
    let cstart = new Date();
    const vertexLayout = new WXMeshVertexLayout(mesh);

    let vertexStart = 0;
    let vertexLength = vertexLayout.layoutSize * mesh.vertexCount;
    let indiceStart = vertexLength;
    let indiceLength = mesh.triangles.length * 2;

    const array = new Float32Array(mesh.vertexCount * vertexLayout.layoutSize / 4);

    let start = 0;
    for (let i = 0;i < mesh.vertexCount; i++) {
        const vector = mesh.vertices[i];

        array[start++] = -vector.x;
        array[start++] = vector.y;
        array[start++] = vector.z;

        if (vertexLayout.NORMAL)
        {
            let vector2 = mesh.normals[i];
            array[start++] = vector2.x;
            array[start++] = vector2.y;
            array[start++] = vector2.z;
        }

        // 如果vertexLayout有color，写入color
        if (vertexLayout.COLOR)
        {
            let color = mesh.colors[i];
        }

        // 如果vertexLayout有uv，写入uv
        if (vertexLayout.UV) {
            let vector3 = mesh.uv[i];
            array[start++] = vector3.x;
            array[start++] = vector3.y * -1 + 1;
        }

        // 如果vertexLayout有uv1，写入uv1
        if (vertexLayout.UV1)
        {
            let vector4 = mesh.uv2[i];
            array[start++] = vector4.x;
            array[start++] = vector4.y * -1 + 1;
        }
        // 如果vertexLayout有tangent，写入tangent
        if (vertexLayout.TANGENT)
        {
            let vector5 = mesh.tangents[i];
            array[start++] = -vector5.x;
            array[start++] = vector5.y;
            array[start++] = vector5.z;
            array[start++] = vector5.w;
        }
    }


    // 将Float32Array转成Uint8Array
    const buffer = new ArrayBuffer(array.byteLength);
    const floatView = new Float32Array(buffer).set(array);
    const byteView = new Uint8Array(buffer);

    const indiceArray = new Uint16Array(mesh.triangles.length || 0);

    /*const indicebuffer = new ArrayBuffer(indiceArray.byteLength);
    const indicefloatView = new Uint16Array(indicebuffer).set(indiceArray);
    const indicebyteView = new Uint8Array(indicebuffer);*/

    let iStart = 0;
    mesh.triangles.forEach(item => {
        indiceArray[iStart++] = item;
    });

    const capsule = {
        x: 1,
        y: 1,
        z: 1,
        radius: 0.5,
    };

    const metadata = {
        indiceFormat: 1,
        vertexLayout: vertexLayout.GetLayoutString(),
        vertexStart: 0,
        vertexLength,
        indiceStart,
        indiceLength,
        capsule,
        version: 1,
        boundBox: {
            center: [1,1,1],
            size:[1,1,1]
        },
        subMeshs: [{start: 0, length: 852}]
    }

    const engineVertexLayout = engine.buildInVertexLayoutFactory3D.getVertexLayout(metadata.vertexLayout);
    const engineMesh = engine.Mesh.createFromDynamicArrayBuffer(engineVertexLayout, array.buffer, indiceArray.buffer);

    mesh.engineMesh = engineMesh;

    mesh.ref = engineMesh;

    var radius = 1;
    engineMesh._setBoundBall(engine.Vector3.ZERO, 1);

    if (mesh._subMeshs && mesh._subMeshs.length) {
        mesh._subMeshs.forEach(item => {
            engineMesh._addSubMesh(item.length, item.offset);
        });
    }

    console.log('微信引擎Mesh解析成Unity格式耗时：', new Date() - cstart)

    return engineMesh;
}

export {
    EnumVertexLayoutUsage,
    EnumVertexFormat,
    getPointDataByUsage,
    WXMeshVertexLayout,
    createEngineMesh,
    getPointBuffer
}

var PBRMaterialDemo = /** @class */ (function () {
    function PBRMaterialDemo() {
        Laya3D.init(0, 0, true);
        Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
        Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;
        Laya.Stat.show();
        this.scene = Laya.stage.addChild(new Laya.Scene());
        //var env:String = 'inthegarden';
        var env = 'sp_default';
        //var env = 'AtticRoom';
        //var env = 'overcloud';
        this.envinfo = '../../res/threeDimen/env/' + env + '/envinfo.json';
        Laya.loader.load(this.envinfo, Laya.Handler.create(this, this.onEnvDescLoaded, [this.envinfo, '../../res/threeDimen/env/' + env + '/']));
    }
    PBRMaterialDemo.prototype.onEnvDescLoaded = function (envinfo, envpath) {
        var envinfoobj = Laya.loader.getRes(this.envinfo);
        var camera = new Laya.Camera(0, 0.1, 1000);
        if (envinfoobj.ev != undefined)
            camera._shaderValues.setValue(Laya.BaseCamera.HDREXPOSURE, Math.pow(2, envinfoobj.ev));
        else
            camera._shaderValues.setValue(Laya.BaseCamera.HDREXPOSURE, Math.pow(2, 0.0));
        this.scene.addChild(camera);
        camera.transform.translate(new Laya.Vector3(0, 0, 1.0));
        camera.addComponent(CameraMoveScript);
        camera.clearFlag = Laya.BaseCamera.CLEARFLAG_SKY;
        var skyDome = new Laya.SkyDome();
        camera.sky = skyDome;
        skyDome.texture = Laya.Texture2D.load(envpath + envinfoobj.skytex);
        skyDome.environmentSpecular = Laya.DataTexture2D.load(envpath + envinfoobj.prefiltedEnv);
        var irrdMat = new Float32Array(envinfoobj.IrradianceMat);
        skyDome.envDiffuseSHRed = irrdMat.slice(0, 16);
        skyDome.envDiffuseSHGreen = irrdMat.slice(16, 32);
        skyDome.envDiffuseSHBlue = irrdMat.slice(32, 48);
        this.addTestSphere();
    };
    PBRMaterialDemo.prototype.addTestSphere = function () {
        var w = 2;
        var h = 1;
        var rnum = 10;
        var mnum = 4;
        for (var y = mnum; y >= 0; y--) {
            for (var x = 0; x < rnum; x++) {
                var mtl = new Laya.PBRMaterial();
                mtl.use_groundtruth = false;
                mtl.diffuseTexture = Laya.Texture2D.load('../../res/threeDimen/pbr/c1.png');
                mtl.normalTexture = Laya.Texture2D.load('../../res/threeDimen/pbr/n1.png');
                mtl.roughness = x / rnum;
                mtl.metaless = y / mnum;
                var sphere = this.scene.addChild(new Laya.MeshSprite3D(new Laya.SphereMesh(0.1, 32, 32)));
                sphere.meshRender.sharedMaterial = mtl;
                sphere.transform.localPosition = new Laya.Vector3((x - rnum / 2) * (w / rnum), (y - mnum / 2) * (h / mnum), -2);
            }
        }
        for (x = 0; x < rnum; x++) {
            mtl = new Laya.PBRMaterial();
            mtl.use_groundtruth = false;
            mtl.diffuseTexture = Laya.Texture2D.load('../../res/threeDimen/pbr/gold.png');
            mtl.normalTexture = Laya.Texture2D.load('../../res/threeDimen/pbr/n1.png');
            mtl.roughness = x / rnum;
            mtl.metaless = 1.0;
            sphere = this.scene.addChild(new Laya.MeshSprite3D(new Laya.SphereMesh(0.1, 32, 32)));
            sphere.meshRender.sharedMaterial = mtl;
            sphere.transform.localPosition = new Laya.Vector3((x - rnum / 2) * (w / rnum), 0.75, -2);
        }
        for (x = 0; x < rnum; x++) {
            mtl = new Laya.PBRMaterial();
            mtl.diffuseTexture = Laya.Texture2D.load('../../res/threeDimen/pbr/copper.png');
            mtl.normalTexture = Laya.Texture2D.load('../../res/threeDimen/pbr/n1.png');
            mtl.roughness = x / rnum;
            mtl.metaless = 1.0;
            sphere = this.scene.addChild(new Laya.MeshSprite3D(new Laya.SphereMesh(0.1, 32, 32)));
            sphere.meshRender.sharedMaterial = mtl;
            sphere.transform.localPosition = new Laya.Vector3((x - rnum / 2) * (w / rnum), 1.0, -2);
        }
        for (x = 0; x < rnum; x++) {
            mtl = new Laya.PBRMaterial();
            mtl.diffuseTexture = Laya.Texture2D.load('../../res/threeDimen/pbr/c2.png');
            mtl.normalTexture = Laya.Texture2D.load('../../res/threeDimen/pbr/n1.png');
            mtl.roughness = x / rnum;
            mtl.metaless = 0.0;
            var sphere1 = this.scene.addChild(new Laya.MeshSprite3D(new Laya.SphereMesh(0.1, 32, 32)));
            sphere1.meshRender.sharedMaterial = mtl;
            sphere1.transform.localPosition = new Laya.Vector3((x - rnum / 2) * (w / rnum), -0.75, -2);
        }
    };
    return PBRMaterialDemo;
}());
new PBRMaterialDemo;

var powerLineMap = new PowerLineObject();
var gdHeaders = ["DL", "AL", "BL", "CL", "DR", "AR", "BR", "CR"];
var lineColor = [Cesium.Color.SPRINGGREEN, Cesium.Color.YELLOW, Cesium.Color.RED, Cesium.Color.BLUE, Cesium.Color.SPRINGGREEN, Cesium.Color.YELLOW, Cesium.Color.RED, Cesium.Color.BLUE]
var gdIndexs = [1, 2, 3];
var posintions_f = [];
function GlobeSDK() {
    this.viewer = null;
    this.terrainProvider = null;

    // this.towerModels = new Array();


    this.initGlobe = function () {
        this.viewer = new Cesium.Viewer('cesiumContainer', {
            // 通过初始化的方式加载Arcgis提供的全球底图
            baseLayerPicker: false,
            animation: false,
            navigationHelpButton: false,
            timeline: true,
            geocoder: false,
            fullscreenButton: false,
            vrButton: false,
            sceneModePicker: false,
            infoBox: false,
            scene3DOnly: false,
            homeButton: false
        })
        // 隐藏时间进度条
        this.viewer.timeline.container.style.visibility = 'hidden'

        // 去除版权信息
        this.viewer._cesiumWidget._creditContainer.style.display = 'none'

        // 添加罗盘
        // this.viewer.extend(Cesium.viewerCesiumNavigationMixin, {})

        // 添加地形遮挡
        this.viewer.scene.globe.depthTestAgainstTerrain = true
        //viewer.scene.globe.minimumDisableDepthTestDistance = 100.0

        // 设置场景是否被阳光照亮(会产生阴影)
        this.viewer.scene.globe.enableLighting = false

        // 设置图层对象集合
        var layerCollection = this.viewer.scene.imageryLayers

        // 加载图层前先清空
        layerCollection.removeAll(true)
    }

    this.loadDom = function (urlDom, alphaDom, brightnessDom) {
        //桃开线自己的影像
        var domlayer = this.viewer.scene.imageryLayers.addImageryProvider(Cesium.createTileMapServiceImageryProvider({
            url: urlDom,

        }));
        domlayer.alpha = alphaDom;
        domlayer.brightness = brightnessDom;

    }

    this.loadDem = function (urlDem) {
        //整个甘肃省30M的dem数据
        this.terrainProvider = new Cesium.CesiumTerrainProvider({
            // url: urlDem
            // ,
            // proxy: new Cesium.DefaultProxy('/proxy/')
            url: 'http://data.marsgis.cn/terrain'
        })
        this.viewer.terrainProvider = this.terrainProvider;



    }
    this.loadTowers = function (towerDataArray) {


    }


    this.loadPowerLine = function (lineName, towerDataArray) {

        var positions = new Array();

        for (var m = 0; m < towerDataArray.length; m++) {

            positions.push(new Cesium.Cartographic.fromDegrees(towerDataArray[m].经度, towerDataArray[m].纬度));

        }
        var promise = Cesium.sampleTerrain(this.terrainProvider, 14, positions);
        Cesium.when(promise, function (updatedPositions) {

            var towerModels = new Array();
            for (var i = 0; i < towerDataArray.length; i++) {


                //塔位置

                var position = Cesium.Cartesian3.fromDegrees(towerDataArray[i].经度, towerDataArray[i].纬度, positions[i].height);
                //偏移角
                var hpr;
                if (i == towerDataArray.length - 1) {
                    var mat3 = Cesium.Matrix4.getRotation(towerModels[i - 1].mat4, new Cesium.Matrix3);
                    var trans = Cesium.Matrix4.getTranslation(towerModels[i - 1].mat4, new Cesium.Cartesian3);
                    var tmpQuaPre = Cesium.Transforms.headingPitchRollQuaternion(trans, new Cesium.HeadingPitchRoll(0.0, 0.0, 0.0));
                    var tmpQuaPreInv = Cesium.Quaternion.inverse(tmpQuaPre, new Cesium.Quaternion);
                    var tmpQua = Cesium.Quaternion.fromRotationMatrix(mat3);
                    var quat = Cesium.Quaternion.multiply(tmpQuaPreInv, tmpQua, new Cesium.Quaternion);
                    hpr = Cesium.HeadingPitchRoll.fromQuaternion(quat);

                } else {
                    var now = MyLatLng(towerDataArray[i].经度, towerDataArray[i].纬度); //当前塔经纬度  
                    var next = MyLatLng(towerDataArray[i + 1].经度, towerDataArray[i + 1].纬度); //下一个塔经纬度  
                    hpr = new Cesium.HeadingPitchRoll(Cesium.Math.toRadians(getAngle(now, next)), 0, 0);

                }
                //塔方向
                var orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr);
                var name = towerDataArray[i].名称
                var offset = -35;
                if (name.indexOf("桃") == 0) {
                    if (name.indexOf("一") > -1)
                        offset = -35;
                    if (name.indexOf("二") > -1)
                        offset = -20;
                    if (name.indexOf("三") > -1)
                        offset = -5;
                } else {
                    if (name.indexOf("一") > -1)
                        offset = 10;
                    if (name.indexOf("二") > -1)
                        offset = 25;
                    if (name.indexOf("三") > -1)
                        offset = 40;
                }
                var pixelOffset = new Cesium.Cartesian2(0.0, offset);
                var modelMatrix = Cesium.Matrix4.fromTranslationQuaternionRotationScale(position, orientation, new Cesium.Cartesian3(1, 1, 1), new Cesium.Matrix4());

                var towerObj = new TowerObject();
                towerObj.lineName = towerDataArray[i].线路名称;
                towerObj.towerName = towerDataArray[i].名称;
                towerObj.desc = towerDataArray[i].备注信息;
                towerObj.id = towerObj.lineName + "_" + towerObj.towerName + "_" + i;
                towerObj.mat4 = modelMatrix;
                // towerObj.modelPath = "./tw1/500-2ea_sj-33.gltf";
                towerObj.modelPath = "./modelData/tower.gltf";

                // for(var s = 0;s < 1000;s++)
                // {
                var model = globe.viewer.scene.primitives.add(Cesium.Model.fromGltf({
                    id: towerObj.id,
                    url: towerObj.modelPath,
                    show: true,
                    modelMatrix: towerObj.mat4,
                    distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0.0, 1200.0)
                }));
                
                // }
                // return;






                //标记的坐标
                var position_g = Cesium.Cartesian3.fromDegrees(towerDataArray[i].经度, towerDataArray[i].纬度, positions[i].height + 100);
                posintions_f.push({x:towerDataArray[i].经度,y:towerDataArray[i].纬度,z:positions[i].height})
                //每隔5个塔改变显示距离
                if (i == 1 || i == towerDataArray.length - 1 || i % 5 == 0) {
                    globe.viewer.entities.add({
                        position: position_g,
                        label: {
                            text: towerObj.towerName,
                            font: '14pt monospace',
                            fillColor: Cesium.Color.LAWNGREEN,
                            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                            outlineWidth: 2,
                            verticalOrigin: Cesium.VerticalOrigin.TOP,
                            pixelOffset: new Cesium.Cartesian2(0, 32),
                            disableDepthTestDistance: Number.POSITIVE_INFINITY,
                            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0.0, 6000.0)
                        }
                    });
                } else if (i % 5 != 0 && i % 3 == 0) {
                    globe.viewer.entities.add({
                        position: position_g,
                        label: {
                            text: towerObj.towerName,
                            font: '14pt monospace',
                            fillColor: Cesium.Color.LAWNGREEN,
                            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                            outlineWidth: 2,
                            verticalOrigin: Cesium.VerticalOrigin.TOP,
                            pixelOffset: new Cesium.Cartesian2(0, 32),
                            disableDepthTestDistance: Number.POSITIVE_INFINITY,
                            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0.0, 3000.0)
                        }
                    });
                } else {
                    globe.viewer.entities.add({
                        position: position_g,
                        label: {
                            text: towerObj.towerName,
                            font: '14pt monospace',
                            fillColor: Cesium.Color.LAWNGREEN,
                            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                            outlineWidth: 2,
                            verticalOrigin: Cesium.VerticalOrigin.TOP,
                            pixelOffset: new Cesium.Cartesian2(0, 32),
                            disableDepthTestDistance: Number.POSITIVE_INFINITY,
                            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0.0, 1500.0)
                        }
                    });
                }


                towerObj.model = model;

                towerModels.push(towerObj);



                //model.readyPromise.then(towerLoaded(model)); 
            }
            powerLineMap.towerMap.set(lineName, towerModels);

            //添加最大的线路标记
            var name_line = towerDataArray[0].线路名称;
            globe.viewer.entities.add({
                position: Cesium.Cartesian3.fromDegrees(towerDataArray[parseInt(towerDataArray.length / 2)].经度, towerDataArray[parseInt(towerDataArray.length / 2)].纬度, 2000.0),
                label: {
                    text: name_line,
                    font: '25pt monospace',
                    style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                    fillColor: Cesium.Color.LAWNGREEN,
                    outlineWidth: 2,
                    verticalOrigin: Cesium.VerticalOrigin.TOP,
                    pixelOffset: new Cesium.Cartesian2(0, 32),
                    disableDepthTestDistance: Number.POSITIVE_INFINITY,
                    distanceDisplayCondition: new Cesium.DistanceDisplayCondition(6000.0, 100000.0)
                }
            });

            setTimeout(loadJyzTmp(lineName), 5000);
            //setTimeout(loadGXTmp(lineName), 100000);


        });

    }

    this.getMousePositionInfo = function (labelObj) {
            // var scene1 = this.viewer.scene;
            var handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene._imageryLayerCollection);
            var ray, position1, cartographic1, lng, lat, height;
            handler.setInputAction(function (event) {
                ray = globe.viewer.scene.camera.getPickRay(event.endPosition);
                position1 = globe.viewer.scene.globe.pick(ray, globe.viewer.scene);
                if (position1) {
                    cartographic1 = Cesium.Ellipsoid.WGS84.cartesianToCartographic(position1);
                    var feature = globe.viewer.scene.pick(event.endPosition);
                    if (feature == undefined) {
                        lng = Cesium.Math.toDegrees(cartographic1.longitude).toFixed(7);
                        lat = Cesium.Math.toDegrees(cartographic1.latitude).toFixed(7);
                        height = cartographic1.height.toFixed(2);
                        if (height < 0) {
                            height = 0;
                        }
                        labelObj.innerHTML = '( 经度：' + lng + ', 纬度：' + lat + ",高度：" + height + ' )';
                    } else if (feature instanceof Cesium.Cesium3DTileFeature) {
                        var cartesian = globe.viewer.scene.pickPosition(event.endPosition);
                        if (Cesium.defined(cartesian)) {
                            var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
                            lng = Cesium.Math.toDegrees(cartographic.longitude).toFixed(7);
                            lat = Cesium.Math.toDegrees(cartographic.latitude).toFixed(7);
                            height = cartographic.height.toFixed(2); //模型高度 
                            if (height < 0) {
                                height = 0;
                            }
                            labelObj.innerHTML = '( 经度：' + lng + ', 纬度：' + lat + ",高度：" + height + ' )';
                        } else {
                            labelObj.innerHTML = '( 经度：未知 ,纬度： 未知 ,高度： 未知 )';
                        }
                    } else {
                        labelObj.innerHTML = '( 经度：未知 ,纬度： 未知 ,高度： 未知 )';
                    }
                }
            }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
        },

        // 根据经纬度和高度定位
        this.positioning = function (jd, wd, h) {
            this.viewer.camera.flyTo({
                destination: Cesium.Cartesian3.fromDegrees(jd, wd, h),
                orientation : {
                    heading : Cesium.Math.toRadians(0.0),
                    pitch : Cesium.Math.toRadians(-45.0),
                    roll : 0.0
                }
            })
        },

        function towerLoaded(model) {


        }



    function loadJyzTmp(lineName) {
        return function () {
            loadJyz(lineName);
        }
    }


    function loadJyz(lineName) {
        var towerModels = powerLineMap.towerMap.get(lineName);
        var count = towerModels.length;
        if (count < 2)
            return;

        for (var i = 0; i < count; i++) {
            for (var m = 0; m < gdHeaders.length; m++) {
                for (var n = 0; n < gdIndexs.length; n++) {
                    var index = gdIndexs[n];
                    var gdName = gdHeaders[m] + index;
                    var lonlat = getJyzLonLat(towerModels[i].model, gdName);

                    towerModels[i].gdMap.set(gdName, lonlat);
                }
            }
            towerModels[i].model = null;
        }

        var lonLatDL1 = towerModels[0].gdMap.get("DL1");
        var lonLatDL3 = towerModels[0].gdMap.get("DL3");
        var xyzDL1 = Cesium.Cartographic.toCartesian(lonLatDL1);
        var xyzDL3 = Cesium.Cartographic.toCartesian(lonLatDL3);

        var nextlonLatDL1 = towerModels[1].gdMap.get("DL1");
        var nextlonLatDL3 = towerModels[1].gdMap.get("DL3");
        var nextxyzDL1 = Cesium.Cartographic.toCartesian(nextlonLatDL1);
        var nextxyzDL3 = Cesium.Cartographic.toCartesian(nextlonLatDL3);
        var dis1 = Cesium.Cartesian3.distance(xyzDL1, nextxyzDL3);
        var dis2 = Cesium.Cartesian3.distance(xyzDL3, nextxyzDL1);
        var gdIndex = gdIndexs[0];
        var nextgdIndex = gdIndexs[gdIndexs.length - 1];
        if (dis1 > dis2) {
            gdIndex = gdIndexs[gdIndexs.length - 1];
            nextgdIndex = gdIndexs[0];

        }





        for (var i = 0; i < count; i++) {
            for (var m = 0; m < gdHeaders.length; m++) {
                for (var n = 0; n < gdIndexs.length; n++) {
                    var index = gdIndexs[n];
                    var gdName = gdHeaders[m] + index;
                    var nextgdName = gdHeaders[m] + nextgdIndex;


                    if (index != nextgdIndex) {
                        if (index == gdIndex) {
                            if (i == (count - 1))
                                continue;
                            var lonLat = towerModels[i].gdMap.get(gdName);
                            var xyz = Cesium.Cartographic.toCartesian(lonLat);

                            var nextLonLat = towerModels[i + 1].gdMap.get(nextgdName);
                            var nextXyz = Cesium.Cartographic.toCartesian(nextLonLat);

                            var quas = makeJyzQuat(lonLat, nextLonLat);
                            var mat = Cesium.Matrix4.fromTranslationQuaternionRotationScale(xyz, quas[0], new Cesium.Cartesian3(1.0, 1.0, 1.0));
                            var nextMat = Cesium.Matrix4.fromTranslationQuaternionRotationScale(nextXyz, quas[1], new Cesium.Cartesian3(1.0, 1.0, 1.0));

                            var jyz = new JyzObject();
                            jyz.name = gdName;
                            //jyz.modelPath = "./jyz1/500-txc.gltf";
                            jyz.mat4 = mat;
                            towerModels[i].jyzMap.set(gdName, jyz);

                            var nextjyz = new JyzObject();
                            nextjyz.name = nextgdName;
                            if (m == 0 || m == 4) {
                                jyz.modelPath = "./modelData/dixian.gltf";
                                nextjyz.modelPath = "./modelData/dixian.gltf";
                            } else {
                                jyz.modelPath = "./modelData/jyz222.gltf";
                                nextjyz.modelPath = "./modelData/jyz222.gltf";
                            }
                            //nextjyz.modelPath = "./jyz1/500-txc.gltf";
                            nextjyz.mat4 = nextMat;
                            towerModels[i + 1].jyzMap.set(nextgdName, nextjyz);

                        } else {
                            var lonLat = towerModels[i].gdMap.get(gdName);
                            var xyz = Cesium.Cartographic.toCartesian(lonLat);
                            var negateXyz = Cesium.Cartesian3.negate(xyz, new Cesium.Cartesian3());
                            var normalXyz = Cesium.Cartesian3.normalize(negateXyz, new Cesium.Cartesian3());
                            var qua = makeRotate(new Cesium.Cartesian3(0.0, 0.0, -1.0), normalXyz);
                            var mat = Cesium.Matrix4.fromTranslationQuaternionRotationScale(xyz, qua, new Cesium.Cartesian3(1.0, 1.0, 1.0));

                            var jyz = new JyzObject();
                            jyz.name = gdName;
                            if (m == 0 || m == 4) {
                                jyz.modelPath = "./modelData/dixian.gltf";
                            } else {
                                jyz.modelPath = "./modelData/jyz222.gltf";
                            }
                            // jyz.modelPath = "./jyz1/500-txc.gltf";
                            jyz.mat4 = mat;
                            towerModels[i].jyzMap.set(gdName, jyz);



                        }


                    }


                }
            }
        }


        for (var i = 0; i < count; i++) {
            for (var jyz of towerModels[i].jyzMap) {
                var jyzName = jyz[0];
                var jyzObj = jyz[1];

                var model = globe.viewer.scene.primitives.add(Cesium.Model.fromGltf({
                    id: jyzName,
                    url: jyzObj.modelPath,
                    show: true,
                    modelMatrix: jyzObj.mat4,
                    distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0.0, 200.0)

                }));
                jyzObj.model = model;
                //model.readyPromise.then(jyzLoaded(model));
            }
        }
        setTimeout(loadGXTmp(lineName), 5000);

    }

    function jyzLoaded(model) {
        // var lonLat = getGuaJieDianByName(model,"AJ2");
    }

    function loadGXTmp(lineName) {
        return function () {
            loadGX(lineName);
        }
    }

    function loadGX(lineName) {
        var towerModels = powerLineMap.towerMap.get(lineName);


        var count = towerModels.length;
        var instances = [];

        for (var i = 0; i < count; i++) {

            for (var m = 0; m < gdHeaders.length; m++) {
                var headerName = gdHeaders[m];


                for (var n = 0; n < gdIndexs.length; n++) {


                    if (i + 1 == count)
                        continue;
                    var gdname = gdHeaders[m] + gdIndexs[n];
                    if (!towerModels[i].jyzMap.has(gdname))
                        continue;
                    var jyzObj = towerModels[i].jyzMap.get(gdname);
                    var nextgdname = null;
                    var nextjyzObj = null;
                    var inTower = false;
                    var l = 150.054;
                    if ((n + 1) == gdIndexs.length) {


                        nextgdname = gdHeaders[m] + gdIndexs[0];

                        nextjyzObj = towerModels[i + 1].jyzMap.get(nextgdname);
                    } else {
                        if (m == 0 || m == 4) {
                            if (n !== 1) {
                                nextgdname = gdHeaders[m] + gdIndexs[n + 2];

                                nextjyzObj = towerModels[i].jyzMap.get(nextgdname);
                                inTower = true;
                                // l = 1.0;
                            } else {
                                continue;
                            }
                        } else {
                            nextgdname = gdHeaders[m] + gdIndexs[n + 1];

                            nextjyzObj = towerModels[i].jyzMap.get(nextgdname);
                            inTower = true;
                            // l = 1.0;
                        }
                    }

                    var ret1 = typeof jyzObj != "undefined" ? true : false;
                    var ret2 = typeof nextjyzObj != "undefined" ? true : false;
                    if (!(ret1 && ret2)) {
                        continue;
                    }


                    var lonLat = getJyzLonLat(jyzObj.model, "AJ2");
                    var nextlonLat = getJyzLonLat(nextjyzObj.model, "AJ2");

                    // jyzObj.model = null;
                    //nextjyzObj.model = null;

                    /*var ret =new Array();
                    ret.push( Cesium.Cartographic.toCartesian(lonLat));
                    ret.push( Cesium.Cartographic.toCartesian(nextlonLat));*/


                    var ret;
                    if ((n + 1) == gdIndexs.length) {
                        ret = calTowLine(lonLat, nextlonLat, l);
                    } else {
                        ret = computeArc(lonLat, nextlonLat);
                    }



                    if (i == 35 && (m == 3 || m == 7)) {
                        continue;
                    }
                    if (n < gdIndexs.length - 1 && i == 36 && (m == 3 || m == 7)) {
                        continue;
                    }



                    //通过primitive添加线路
                    instances.push(new Cesium.GeometryInstance({
                        geometry: new Cesium.PolylineGeometry({
                            positions: ret, //坐标必须两个和两个以上
                            width: 1.0, //线宽
                            followSurface: true,
                            vertexFormat: Cesium.PolylineColorAppearance.VERTEX_FORMAT
                        }),
                        attributes: {
                            color: Cesium.ColorGeometryInstanceAttribute.fromColor(lineColor[m]), //color  必须设置 不然没有效果
                        },
                    }));

                    // globe.viewer.entities.add({
                    //     //id : 'xa_polyline',
                    //     polyline: {
                    //         id : pid,
                    //         positions: ret,
                    //         width: 1.0,
                    //         followSurface: true,
                    //         material: Cesium.Color.YELLOW,
                    //         distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0.0, 15000.0)  
                    //     }
                    // });
                }
            }
        }
        scene.primitives.add(new Cesium.Primitive({
            geometryInstances: instances,
            appearance: new Cesium.PolylineColorAppearance({
                translucent: false
            })
        }));
        powerLineMap.towerMap.delete(lineName);
    

    }
    


}
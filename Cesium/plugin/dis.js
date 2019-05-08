/**
 * 量算类
 * 依赖项：地形分析组件 cesium
 * 添加人员：李宏   2017-12-13
 * 最后编辑：
 */
var MeasureUtils = new Object();
MeasureUtils.delentity=function(){
    if(tmpmeasurelineEntity)
        viewer.entities.remove(tmpmeasurelineEntity);
    if(tmpmeasurepolygonEntity)
        viewer.entities.remove(tmpmeasurepolygonEntity);
    if(measurepolygonEntity)
        viewer.entities.remove(measurepolygonEntity);
    if(measurelineEntity)
        viewer.entities.remove(measurelineEntity);
    for(var i=0;i<measurelineEntityArray.length;i++){
        viewer.entities.remove(measurelineEntityArray[i]);
    }
    for(var i=0;i<tmpmeasurelineEntityArray.length;i++){
        viewer.entities.remove(tmpmeasurelineEntityArray[i]);
    }
    for(var i=0;i<measurepointEntityArray.length;i++){
        viewer.entities.remove(measurepointEntityArray[i]);
    }
    boolmeasure=false;
    measuredistance=0;
    measurepointsarr=[];
    crossrayarr=[];
    measurelabels.removeAll();
    measurelabels2.removeAll();
    viewer.scene.globe.depthTestAgainstTerrain = false;
    $("#measureTitle").html("右键单击结束，再次单击继续执行。左键双击删除。");
    $("#measureResult").html("");
}
MeasureUtils.measure=function(num){
    boolmeasure=true;
    measuretype=num;
}
MeasureUtils.horizontalmeasure=function(cartesian1,cartesian2,y1,y2){
    var d=Cesium.Cartesian3.distance(cartesian1,cartesian2);
    return Math.sqrt(d*d-(y2-y1)*(y2-y1));
}
MeasureUtils.calcartdistance=function(cartesian1,cartesian2){
    return Cesium.Cartesian3.distance(cartesian1,cartesian2);
}
MeasureUtils.caldistance=function(startLongitude,startLatitude,startHeight,endLongitude,endLatitude,endHeight){
    var cartographic1=Cesium.Cartographic.fromDegrees(startLongitude,startLatitude,startHeight);
    var cartesian1=ellipsoid.cartographicToCartesian(cartographic1);
    var cartographic2=Cesium.Cartographic.fromDegrees(endLongitude,endLatitude,endHeight);
    var cartesian2=ellipsoid.cartographicToCartesian(cartographic2);
    return Cesium.Cartesian3.distance(cartesian1,cartesian2);
}

MeasureUtils.polygonArea=function(coords){
    var area = 0;
    if (coords && coords.length > 0) {
        area += Math.abs(MeasureUtils.ringArea(coords[0]));
        for (var i = 1; i < coords.length; i++) {
            area -= Math.abs(MeasureUtils.ringArea(coords[i]));
        }
    }
    return area;
}

MeasureUtils.ringArea=  function(coords){
    var p1, p2, p3, lowerIndex, middleIndex, upperIndex,area = 0,coordsLength = coords.length;
    if (coordsLength > 2) {
        for (i = 0; i < coordsLength; i++) {
            if (i === coordsLength - 2) {// i = N-2
                lowerIndex = coordsLength - 2;
                middleIndex = coordsLength -1;
                upperIndex = 0;
            } else if (i === coordsLength - 1) {// i = N-1
                lowerIndex = coordsLength - 1;
                middleIndex = 0;
                upperIndex = 1;
            } else { // i = 0 to N-3
                lowerIndex = i;
                middleIndex = i+1;
                upperIndex = i+2;
            }
            p1 = coords[lowerIndex];
            p2 = coords[middleIndex];
            p3 = coords[upperIndex];
            area += ( MeasureUtils.rad(p3[0]) - MeasureUtils.rad(p1[0]) ) * Math.sin( MeasureUtils.rad(p2[1]));
        }
        area = area * wgs84.RADIUS * wgs84.RADIUS / 2;
        area = area /1000000;
    }
    return area.toFixed(2);
}

MeasureUtils.rad= function(_){
    return _ * Math.PI / 180;
}

MeasureUtils.countCenter= function (ps) {
    var x = 0;
    y = 0;
    z = 0;
    for (var j = 0; j < ps.length; j++) {
        x += ps[j].x;
        y += ps[j].y;
        z += ps[j].z
    }
    var center = new Cesium.Cartesian3(x / ps.length, y / ps.length, z / ps.length);
    var cart = ellipsoid.cartesianToCartographic(center);
    return cart;
}
// 不能直接用经纬度 导致的错误的    2017 12 13  有时间修改为空间直角坐标的说
MeasureUtils.stickground= function(x0,y0,z0,x1,y1,z1,boolline){
        var degree1 = { longitude: x0, latitude: y0, height: z0 };
        var degree2 = { longitude: x1, latitude: y1, height: z1 };
        var nscale=MeasureUtils.caldistance(x0,y0,z0,x1,y1,z1);// 45来划分插值
        var nsplit=Math.round(nscale/60);
        var nceil=(60/nscale).toFixed(2);
        if(nsplit==0 || nceil==0)
            return;
        var lonarr = new Array(nsplit);
        var latarr = new Array(nsplit);
        var heiarr = new Array(nsplit);

        var cartographic=new Cesium.Cartographic(x1,y1,0);
        var peakheight=viewer.scene.globe.getHeight(cartographic);
        var endlon,endlat,endheight;
        var ndis=0;
        var d=0;
        /*4种向限如何去掉 冗余部分 的说
         if(x1>x0   &&  y1>y0)  ==============>   x1 ++   y1++
         if(x1<x0   &&  y1>y0)  ==============>   x1 --   y1++
         if(x1<x0   &&  y1<y0)  ==============>   x1--    y1--
         if(x1>x0   &&  y1<y0)  ==============>   x1++    y1--
         这4中情况下来做的说
        */
        for (var i = 0; i < nsplit; i++){
            lonarr[i] = Cesium.Math.lerp(degree1.longitude, degree2.longitude, nceil*(i));
            latarr[i] = Cesium.Math.lerp(degree1.latitude,  degree2.latitude,  nceil*(i));
            cartographic=new Cesium.Cartographic(lonarr[i]*Math.PI/180,latarr[i]*Math.PI/180,0);
            heiarr[i]=viewer.scene.globe.getHeight(cartographic);
            if(i>0){
                if(!boolline){
                    measurelineEntity=viewer.entities.add({polyline : {
                        positions : Cesium.Cartesian3.fromDegreesArrayHeights([lonarr[i-1], latarr[i-1], heiarr[i-1], lonarr[i], latarr[i], heiarr[i]]),
                        width :4,
                        material : new Cesium.PolylineOutlineMaterialProperty({
                            color : Cesium.Color.RED,
                            outlineWidth : 1,
                            outlineColor : Cesium.Color.BLACK,
                            followSurface:true
                        })
                    }});
                    measurelineEntityArray.push(measurelineEntity);
                }
                else{
                    tmpmeasurelineEntity=viewer.entities.add({polyline : {
                        positions : Cesium.Cartesian3.fromDegreesArrayHeights([lonarr[i-1], latarr[i-1], heiarr[i-1], lonarr[i], latarr[i], heiarr[i]]),
                        width :4,
                        material : new Cesium.PolylineOutlineMaterialProperty({
                            color : Cesium.Color.WHITE,
                            outlineWidth : 1,
                            outlineColor : Cesium.Color.BLACK,
                            followSurface:true
                        })
                    }});
                    tmpmeasurelineEntityArray.push(tmpmeasurelineEntity);
                }
                d=MeasureUtils.caldistance(lonarr[i-1], latarr[i-1], heiarr[i-1], lonarr[i], latarr[i], heiarr[i]);
                //if(!isNaN(d))
                //    d=MeasureUtils.caldistance(lonarr[i-1], latarr[i-1], 0, lonarr[i], latarr[i], 0);
                ndis+=d;
            }
            if(i==(nsplit-1)){
                endlon=lonarr[i];
                endlat=latarr[i];
                endheight=heiarr[i];
            }
        }
        if(!boolline) {
            measurelineEntity = viewer.entities.add({
                polyline: {
                    positions: Cesium.Cartesian3.fromDegreesArrayHeights([endlon, endlat, endheight, x1, y1, z1]),
                    width: 4,
                    material: new Cesium.PolylineOutlineMaterialProperty({
                        color: Cesium.Color.RED,
                        outlineWidth: 1,
                        outlineColor: Cesium.Color.BLACK,
                        followSurface: true
                    })
                }
            });
            measurelineEntityArray.push(measurelineEntity);
        }
        else{
            tmpmeasurelineEntity = viewer.entities.add({
                polyline: {
                    positions: Cesium.Cartesian3.fromDegreesArrayHeights([endlon, endlat, endheight, x1, y1, z1]),
                    width: 4,
                    material: new Cesium.PolylineOutlineMaterialProperty({
                        color: Cesium.Color.WHITE,
                        outlineWidth: 1,
                        outlineColor: Cesium.Color.BLACK,
                        followSurface: true
                    })
                }
            });
            tmpmeasurelineEntityArray.push(tmpmeasurelineEntity);
        }
        /*d=MeasureUtils.caldistance(endlon, endlat, endheight, x1, y1, z1);
        if(!isNaN(d))
            d=MeasureUtils.caldistance(endlon, endlat, 0, lonarr[i], latarr[i], 0);
        ndis+=d;*/
        ndis+=MeasureUtils.caldistance(endlon, endlat, endheight, x1, y1, z1);
        return ndis;
   // return MeasureUtils.caldistance(x0,y0,z0,x1,y1,z1);
}
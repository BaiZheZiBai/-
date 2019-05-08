//后台车辆GPS监控数据接口
var carGpsDataUrl = this.baseUrl + 'gps/rest/getCarGPSData';
//后台人手持GPS监控数据接口
var personGpsDataUrl = this.baseUrl + 'gps/rest/getPersonGPSData';
var carurl = './CesiumSDK/GPScar.png'; //车的图标资源路径
var personurl = './CesiumSDK/GPSperson.png'; //人的图标资源路径
var chenum = 0;
var peonum = 0;
//勾选框是否开启对车的实时监控


$("#che").click(function() {
        chenum++;
        console.log(chenum)
        if (chenum % 2 == 1) {
            $("#che").attr("src", 'img/caropen.png');
            startCarGpsupdate();
            stopHistoryPath();
        }
        if (chenum % 2 == 0) {
            $("#che").attr("src", 'img/carclose.png');
            stopCarGpsupdate()
        }
    })
    //勾选框是否开启对人的实时监控
$("#ren").on("click", function() {
    peonum++;
    if (peonum % 2 == 1) {
        $("#ren").attr("src", 'img/peopen.png');
        startPersonGpsupdate();
        stopHistoryPath();
    }
    if (peonum % 2 == 0) {
        $("#ren").attr("src", 'img/peoclose.png');
        stopPersonGpsupdate()
    }
})

//更新车的信息
var carentitys = [];

function updateAllCar() {
    for (var i = 0; i < cargpsdata.length; i++) {
        var entity = globe.viewer.entities.getById(cargpsdata[i].id);
        if (entity) {
            entity.position = Cesium.Cartesian3.fromDegrees(cargpsdata[i].lon, cargpsdata[i].lat, cargpsdata[i].height);
            entity.label.text = cargpsdata[i].carnum;
        } else {
            var car = globe.viewer.entities.add({
                id: cargpsdata[i].id,
                name: cargpsdata[i].carnum + "",
                position: Cesium.Cartesian3.fromDegrees(cargpsdata[i].lon, cargpsdata[i].lat, cargpsdata[i].height),
                billboard: {
                    image: carurl,
                    heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
                },
                label: {
                    text: cargpsdata[i].carnum + "",
                    font: '15pt sans-serif',
                    style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                    fillColor: Cesium.Color.BLACK,
                    outlineColor: Cesium.Color.WHITE,
                    outlineWidth: 2,
                    heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
                    verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                    horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                    pixelOffset: new Cesium.Cartesian2(0.0, -7),
                    pixelOffsetScaleByDistance: new Cesium.NearFarScalar(1.5e2, 3.0, 1.5e7, 0.5),
                    disableDepthTestDistance: Number.POSITIVE_INFINITY // draws the label in front of terrain
                }
            });
            carentitys.push(car)
        }
    }
}
//请求车的数据
var cargpsdata = [];

function getCarGpsData() {
    $.ajax({
        url: carGpsDataUrl, //请求地址
        dataType: "json", //返回类型
        type: "get", //请求类型
        success: function(data) { //成功回调
            console.log(data);
            cargpsdata = data;
        },
        erroe: function(data) {
            console.log(data)
        }
    });
}
//开始请求并更新车辆位置
var getCardata;
var updateCar;

function startCarGpsupdate() {
    getCardata = setInterval(getCarGpsData, 1000);
    updateCar = setInterval(updateAllCar, 500);
}
//移除对车位置的更新
function stopCarGpsupdate() {
    if (getCardata && updateCar) {
        clearInterval(getCardata);
        clearInterval(updateCar);
        for (var i = 0; i < carentitys.length; i++) {
            globe.viewer.entities.remove(carentitys[i]);
        }
        carentitys = [];
    }
}




//更新人的信息
var personentitys = [];

function updateAllPerson() {
    for (var i = 0; i < persongpsdata.length; i++) {
        var entity = globe.viewer.entities.getById(persongpsdata[i].id);
        if (entity) {
            entity.position = Cesium.Cartesian3.fromDegrees(persongpsdata[i].lon, persongpsdata[i].lat, persongpsdata[i].height);
            entity.label.text = persongpsdata[i].name;
        } else {
            var Person = globe.viewer.entities.add({
                id: persongpsdata[i].id,
                name: persongpsdata[i].name + "",
                position: Cesium.Cartesian3.fromDegrees(persongpsdata[i].lon, persongpsdata[i].lat, persongpsdata[i].height),
                billboard: {
                    image: personurl,
                    heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
                },
                label: {
                    text: persongpsdata[i].name + "",
                    font: "normal small-caps normal 25px 微软雅黑",
                    style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                    fillColor: Cesium.Color.BLACK,
                    outlineColor: Cesium.Color.WHITE,
                    outlineWidth: 3,
                    heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
                    verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                    horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                    pixelOffset: new Cesium.Cartesian2(0.0, -7),
                    pixelOffsetScaleByDistance: new Cesium.NearFarScalar(1.5e2, 3.0, 1.5e7, 0.5),
                    disableDepthTestDistance: Number.POSITIVE_INFINITY // draws the label in front of terrain
                }
            });
            personentitys.push(Person)
        }
    }
}
//请求人的数据
var persongpsdata = [];

function getPersonGpsData() {
    $.ajax({
        url: personGpsDataUrl, //请求地址
        dataType: "json", //返回类型
        type: "get", //请求类型
        success: function(data) { //成功回调
            console.log(data);
            persongpsdata = data;
        },
        erroe: function(data) {
            console.log(data)
        }
    });
}
//开始请求并更新人位置
var getPersondata;
var updatePerson;

function startPersonGpsupdate() {
    getPersondata = setInterval(getPersonGpsData, 1000);
    updatePerson = setInterval(updateAllPerson, 500);
}
//移除对人位置的更新
function stopPersonGpsupdate() {
    if (getPersondata && updatePerson) {
        clearInterval(getPersondata);
        clearInterval(updatePerson);
        for (var i = 0; i < personentitys.length; i++) {
            globe.viewer.entities.remove(personentitys[i]);
        }
        personentitys = [];
    }
}





//世界坐标转成经纬度高程
function cartesianToCartographicToDegrees(cartesian) {
    var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
    var longitude = Cesium.Math.toDegrees(cartographic.longitude);
    var latitude = Cesium.Math.toDegrees(cartographic.latitude);
    var height = cartographic.height; //地形高度
    return { lon: longitude, lat: latitude, height: height };
}
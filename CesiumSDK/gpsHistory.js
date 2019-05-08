var carurl = './CesiumSDK/GPScar.png'; //车的图标资源路径
var personurl = './CesiumSDK/GPSperson.png'; //人的图标资源路径
var inputRange = 1; //参数为0，播放完暂停;参数为1时，循环播放;该参数默认值为1；该参数必须在没有开始动画时设置，或结束上一次动画后再设置并开始播放
var multiplier = 1; //时间流速;默认值为1;此参数必须在没有开始动画前设置，或结束上一次动画再设置并开始播放
//后台GPS历史数据接口
var xunnum = 0;
var kainum = 0;
var zannum = 0;
var endnum = 0;
var historyGpsDataUrl = this.baseUrl + 'gps/rest/getHistoryGPSData';

//开始
$("#kaishi").on("click", function() {

        kainum++;
        if (kainum % 2 == 1) {
            $("#kaishi").attr("src", 'img/stropen.png');
        }
        if (kainum % 2 == 0) {
            $("#kaishi").attr("src", 'img/strclose.png');
        }
        playHistoryPath();
    })
    //暂停
$("#zanting").on("click", function() {
        zannum++;
        if (zannum % 2 == 1) {
            $("#zanting").attr("src", 'img/zanting.png');
        }
        if (zannum % 2 == 0) {
            $("#zanting").attr("src", 'img/zanclose.png');
        }
        pauseHistoryPath();
    })
    //结束
$("#jieshu").on("click", function() {
        endnum++;
        if (endnum % 2 == 1) {
            $("#jieshu").attr("src", 'img/endimg.png');
        }
        if (endnum % 2 == 0) {
            $("#jieshu").attr("src", 'img/endclose.png');
        }
        stopHistoryPath();
        //倍速复选框重置为正常倍速
        $("#beishu").val(1);
    })
    //循环;需在开始前设置，或结束当前动画再设置并开始
$("#xunhuan").on("click", function() {
        xunnum++;
        if (xunnum % 2 == 1) {
            $("#xunhuan").attr("src", 'img/xunimg.png');
            inputRange = 1;
        }
        if (xunnum % 2 == 0) {
            $("#xunhuan").attr("src", 'img/xunclose.png');
            inputRange = 0;
        }
    })
    //倍速
$("#beishu").on("change", function() {
        var chooseSpeed = Number($(this).val());
        console.log(chooseSpeed);
        changeSpeed(chooseSpeed)
    })
    //开始播放目标历史轨迹
function playHistoryPath() {
    if (globe.viewer.clock._shouldAnimate != true) {
        globe.viewer.clock._shouldAnimate = true;
    }
    if (creatCzml.czml) {} else {
        getHistoryGpsDataAndCreatCzml();
    }
}
//暂停播放目标历史轨迹
function pauseHistoryPath() {
    globe.viewer.clock._shouldAnimate = false;
}
//结束并移除历史轨迹播放
function stopHistoryPath() {
    var len = globe.viewer.dataSources.length;
    var name;
    if (historyGps.carNum) {
        name = historyGps.carNum
    } else {
        name = historyGps.name
    }
    if (len > 0) {
        for (var i = 0; i < len; i++) {
            var dataSource = globe.viewer.dataSources.get(i);
            if (dataSource._name && dataSource._name == name) {
                globe.viewer.dataSources.remove(dataSource);
                creatCzml.resetCzml();
            }
        }
    }
}
//改变动画播放速度;参数需为自然数;如果参数是自然数返回值为改变前的时间流速
function changeSpeed(num) {
    if (typeof num !== 'number') {
        return false;
    }
    if (!isNaN(num)) {
        var oldSpeed = globe.viewer.clock._multiplier;
        globe.viewer.clock._multiplier = num;
        return oldSpeed;
    } else {
        return false;
    }
}
//生成czml动画的函数整合
var creatCzml = {
    czml: null,
    //填充czml内容
    creatCzml: function(options) {
        this.czml = [];
        var headPacket = {
            "id": "document",
            "version": "1.0",
            "name": options.headPacket.name,
            "clock": {
                "interval": options.headPacket.interval, //定义时间范围
                "currentTime": options.headPacket.currentTime, //当前时间
                "multiplier": options.headPacket.multiplier, //时间流速
                "range": options.headPacket.range, //时钟在其当前时间到达其起点或终点时的行为。有效值为“UNBOUNDED”(时间流动不会结束)，“CLAMPED”(到达时间间隔终点即时间停止流动)和“LOOP_STOP”(时间流动将在间隔中循环)。
                "step": "SYSTEM_CLOCK_MULTIPLIER" //规定 当前时间每个刻度前进时间的模式
                    //step三个取值：TICK_DEPENDENT 当前时间每个刻度前进 multiplier 个秒数（实际是分钟数，不知道原因）；
                    //SYSTEM_CLOCK_MULTIPLIER 当前时间每个刻度前进的时间 = 上一个刻度前进的系统时间量 * multiplier
                    //SYSTEM_CLOCK 时钟时钟设置为当前系统时间。
            }
        };
        this.czml.push(headPacket);
        var packet = this.creatPacket(options.packet);
        this.czml.push(packet)
        return this.czml
    },
    //清空this.czml对象
    resetCzml: function() {
        this.czml = null;
        return this.czml
    },
    //生成并在球上添加czml
    addCzml: function(userInputOptions) {
        //处理userInputOptions数据为czml内各节点对应格式
        var options = this.creatSceneOptions(userInputOptions);
        this.creatCzml(options);
        if (this.czml != null) {
            if (this.czml.length) {
                if (this.czml.length != 0) {
                    var dataSource = Cesium.CzmlDataSource.load(this.czml);
                    globe.viewer.dataSources.add(dataSource).then(function(ds) {});
                }
            }
        }
    },
    //往球上添加czml
    loadCzml: function(newczml) {
        if (newczml != null) {
            if (newczml.length) {
                if (newczml.length != 0) {
                    var dataSource = Cesium.CzmlDataSource.load(newczml);
                    globe.viewer.dataSources.add(dataSource).then(function(ds) {});
                }
            }
        }
    },
    //生成每一个Packet
    creatPacket: function(options) {
        var packet = {
            "id": options.id,
            "availability": options.availability,
            "position": options.position,
            "orientation": {
                "velocityReference": "#position"
            }
        };
        packet.billboard = this.creatBillboardNode(options.billboard);
        packet.polyline = this.creatPathNode(options.path);
        packet.label = this.creatLabelNode(options.label);
        return packet
    },
    //创建billboard节点
    creatBillboardNode: function(options) {
        var billboard = {
            "image": options.url,
            "heightReference": 'CLAMP_TO_GROUND',
            "horizontalOrigin": "CENTER",
            "verticalOrigin": "BOTTOM",
        };
        return billboard
    },
    //创建路径节点
    creatPathNode: function(options) {
        var polyline = {
            "show": true,
            "positions": {
                "cartographicDegrees": options.degrees
            },
            "material": {
                "solidColor": {
                    "color": {
                        "rgba": [255, 255, 0, 255]
                    }
                }
            },
            "width": 3,
            "clampToGround": true
        };
        return polyline
    },
    //创建标注节点
    creatLabelNode: function(options) {
        var label = {
            "fillColor": {
                "rgba": [
                    255, 255, 255, 255
                ]
            },
            "font": "normal small-caps normal 25px 微软雅黑",
            "horizontalOrigin": "CENTER",
            "outlineColor": {
                "rgba": [
                    0, 0, 0, 255
                ]
            },
            "outlineWidth": 3,
            "pixelOffset": {
                "cartesian2": [
                    0.0, -38
                ]
            },
            "show": true,
            "style": "FILL_AND_OUTLINE",
            "text": options.text,
            "verticalOrigin": "BOTTOM",
            "disableDepthTestDistance": "Infinity",
            "heightReference": 'RELATIVE_TO_GROUND'
        };
        return label
    },
    //处理传过来的history数据
    creatSceneOptions: function(history) {
        var startTime = history.time[0];
        var endTime = history.time[history.time.length - 1];
        var planInterval = startTime + "/" + endTime;
        var options = {
            headPacket: {},
            packet: {}
        };
        var Gpsname;
        var billboardUrl;
        if (history.carNum) {
            Gpsname = history.carNum;
            billboardUrl = carurl;
        } else {
            Gpsname = history.name;
            billboardUrl = personurl;
        }
        var range;
        switch (inputRange) {
            case 0:
                range = 'CLAMPED';
                break;
            case 1:
                range = 'LOOP_STOP';
                break;
        }
        if (range) {} else {
            range = 'LOOP_STOP';
        }
        if (multiplier) {} else {
            multiplier = 1;
        }
        options.headPacket = {
            'name': Gpsname,
            'multiplier': multiplier,
            'interval': planInterval,
            'currentTime': startTime,
            'range': range
        };
        var positions = history.location;
        var timeArray = history.time;
        var positionresult = Degreesandtime(timeArray, positions);
        var pathPositions = DegreesToArray(positions)
        var packet = {
            id: history.id,
            availability: planInterval,
            position: {
                "interpolationAlgorithm": "LAGRANGE",
                "interpolationDegree": 1,
                "epoch": startTime,
                "cartographicDegrees": positionresult
            },
            billboard: {
                url: billboardUrl,
            }
        }
        packet.path = {
            degrees: pathPositions
        }
        packet.label = {
            text: Gpsname
        }
        options.packet = packet;
        return options
    }
};
//请求历史数据并生成播放历史轨迹
var historyGps;

function getHistoryGpsDataAndCreatCzml() {
    $.ajax({
        url: historyGpsDataUrl, //请求地址
        dataType: "json", //返回类型
        type: "get", //请求类型
        success: function(data) { //成功回调
            console.log(data);
            historyGps = data;
            creatCzml.addCzml(historyGps);
            var flyToPosition = historyGps.location[parseInt(historyGps.location.length / 2)];
            globe.viewer.camera.flyTo({
                destination: Cesium.Cartesian3.fromDegrees(flyToPosition.lon, flyToPosition.lat, flyToPosition.height + 3000),
            })
        },
        erroe: function(data) {
            console.log(data)
        }
    });
}
//世界坐标转成经纬度高程
function cartesianToCartographicToDegrees(cartesian) {
    var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
    var longitude = Cesium.Math.toDegrees(cartographic.longitude);
    var latitude = Cesium.Math.toDegrees(cartographic.latitude);
    var height = cartographic.height; //地形高度
    return {
        lon: longitude,
        lat: latitude,
        height: height
    };
}
//根据时间及经纬度生成一个对应格式的数组
function Degreesandtime(timeArray, DegreesArray) {
    var array = new Array();
    var count = 0;
    for (var i = 0; i < DegreesArray.length; i++) {
        array[count] = timeArray[i];
        array[count + 1] = DegreesArray[i].lon;
        array[count + 2] = DegreesArray[i].lat;
        array[count + 3] = DegreesArray[i].height;
        count = count + 4;
    }
    return array
}
//将经纬度坐标对象转换为数组
function DegreesToArray(Degrees) {
    var array = new Array();
    var count = 0;
    for (var i = 0; i < Degrees.length; i++) {
        array[count + 0] = Degrees[i].lon;
        array[count + 1] = Degrees[i].lat;
        array[count + 2] = Degrees[i].height;
        count = count + 3;
    }
    return array
}
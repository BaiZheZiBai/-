var flyentity = null;
function flyline(posintions_f) {
  //生成一个随机数
  Cesium.Math.setRandomNumberSeed(3);

  //设定了模拟时间的边界
  var start = Cesium.JulianDate.fromDate(new Date(2015, 2, 25, 16))
  var stop = Cesium.JulianDate.addSeconds(start, 30000, new Cesium.JulianDate());

  //确保查看器处于预期的时间
  globe.viewer.clock.startTime = start.clone();
  globe.viewer.clock.stopTime = stop.clone();
  globe.viewer.clock.currentTime = start.clone();
  globe.viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP; //循环结束时
  //时间变化来控制速度
  globe.viewer.clock.multiplier = 2;
  globe.viewer.clock.canAnimate = false;
  //给时间线设置边界
  // globe.viewer.timeline.zoomTo(start, stop);



  //计算实体位置属性
  var position = computeCirclularFlight(posintions_f, start);
  //创建实体
  flyentity = globe.viewer.entities.add({

    //将实体availability设置为与模拟时间相同的时间间隔。
    availability: new Cesium.TimeIntervalCollection([new Cesium.TimeInterval({
      start: start,
      stop: stop
    })]),

    //这是一个4x4的矩阵，包含了方位方向等属性
    position: position,

    //基于位置移动自动计算方向.
    orientation: new Cesium.VelocityOrientationProperty(position),

    //加载飞机模型
    model: {
      uri: './modelData/CesiumAir/Cesium_Air.gltf',
      scale: 0.5,
      // minimumPixelSize: 64
    },
    //路径
    path: {
      resolution: 1,
      material: new Cesium.PolylineGlowMaterialProperty({
        glowPower: 0.1,
        color: Cesium.Color.YELLOW.withAlpha(0)
      }),
      width: 30
    }
  });


  flyentity.position.setInterpolationOptions({
    interpolationDegree: 10,
    interpolationAlgorithm: Cesium.HermitePolynomialApproximation
  });

  Cesium.when(flyentity.model.readyPromise).then(function (model) {

    var camera = globe.viewer.camera;


    var speed = 10;

    // //速度向量
    var speedVector = new Cesium.Cartesian3();


    // // //给左边的通知栏更新数据同时刷新飞机位置(这里也是个1ms一次的回调)
    globe.viewer.scene.preUpdate.addEventListener(function (scene, time) {
      //   //   //选择的笛卡尔分量Cartesian3.UNIT_X（x轴单位长度）乘以一个标量speed/10，得到速度向量speedVector
      speedVector = Cesium.Cartesian3.multiplyByScalar(Cesium.Cartesian3.UNIT_X, speed / 10, speedVector);
      //   //   //飞机的模型矩阵与速度向量speedVector相乘，得到position
      var pos = flyentity.position;

      var position_air = pos.getValue(time);


      var mat4 = flyentity.computeModelMatrix(time, new Cesium.Matrix4());
      if (mat4 != null) {
        var mat3 = Cesium.Matrix4.getRotation(mat4, new Cesium.Matrix3);
        var qua = Cesium.Quaternion.fromRotationMatrix(mat3, new Cesium.Quaternion);
        var trans = Cesium.Matrix4.getTranslation(mat4, new Cesium.Cartesian3);
        var tmpQuaPre = Cesium.Transforms.headingPitchRollQuaternion(trans, new Cesium.HeadingPitchRoll(0.0, 0.0, 0.0));
        var tmpQuaPreInv = Cesium.Quaternion.inverse(tmpQuaPre, new Cesium.Quaternion);
        var tmpQua = Cesium.Quaternion.fromRotationMatrix(mat3);
        var quat = Cesium.Quaternion.multiply(tmpQuaPreInv, tmpQua, new Cesium.Quaternion);
        var hpr = Cesium.HeadingPitchRoll.fromQuaternion(quat);

        //globe.viewer.trackedEntity = flyentity;


        globe.viewer.camera.lookAt(position_air, new Cesium.HeadingPitchRange(hpr.heading + Cesium.Math.toRadians(90.0), hpr.pitch + Cesium.Math.toRadians(-45.0), 200));
   
      }
 


    });

  });


  handelCruiseModel(0);
}

// 控制飞行状态
handelCruiseModel = function (isExit) {
  if (isExit) {
    globe.viewer.clock.shouldAnimate = false
  } else {
    globe.viewer.clock.shouldAnimate = true
  }
}

// 清除静态飞行效果
exitfly = function () {
  // if (aminitation) {
  //   globe.viewer.clock.onTick.removeEventListener(aminitation)
  // }
  globe.viewer.trackedEntity = undefined
  var start = Cesium.JulianDate.fromDate(new Date())
  globe.viewer.clock.startTime = start.clone()
  var stop = Cesium.JulianDate.addSeconds(start, 300000000, new Cesium.JulianDate())
  globe.viewer.clock.stopTime = stop.clone()
  if (flyentity) {
    globe.viewer.entities.remove(flyentity)
  }
}

//点
function computeCirclularFlight(position, start) {
  var property = new Cesium.SampledPositionProperty()

  for (let i = 0; i < position.length; i++) {
    var _position = null
    if (i === 0) {
      let time = Cesium.JulianDate.addSeconds(start, i, new Cesium.JulianDate())
      _position = Cesium.Cartesian3.fromDegrees(position[i].x, position[i].y, position[i].z + 100)
      property.addSample(time, _position)
    }
    if (i < 10000 && i > 0) {
      var position_a = new Cesium.Cartesian3(property._property._values[i * 3 - 3], property._property._values[i * 3 - 2], property._property._values[i * 3 - 1])
      if (i < 976) {
        _position = Cesium.Cartesian3.fromDegrees(position[i].x, position[i].y, position[i].z + 100)
      } else if (i > 975 && i < 986) {
        _position = Cesium.Cartesian3.fromDegrees(position[i].x, position[i].y, position[i].z + 100 + 20 * (i - 980))
      } else if (i > 985) {
        _position = Cesium.Cartesian3.fromDegrees(position[i].x, position[i].y, position[i].z + 100 + 200)
      }

      var positions = [Cesium.Ellipsoid.WGS84.cartesianToCartographic(position_a), Cesium.Ellipsoid.WGS84.cartesianToCartographic(_position)]
      var a = new Cesium.EllipsoidGeodesic(positions[0], positions[1])
      var long = a.surfaceDistance
      var _time = long / 50
      let time = Cesium.JulianDate.addSeconds(property._property._times[i - 1], _time, new Cesium.JulianDate())
      property.addSample(time, _position)
    }
  }
  // property.setInterpolationOptions({
  //    interpolationDegree: 5,
  //    interpolationAlgorithm: Cesium.LagrangePolynomialApproximation
  // })
  // console.log(property._property._values)
  // console.log(property)
  return property
}












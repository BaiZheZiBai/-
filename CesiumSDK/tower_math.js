function getGuaJieDianByName(model, name) {
    var mat4 = model.modelMatrix;
    var node = model.getNode(name);
    var nodeMat4 = node.matrix;
    var _trans = Cesium.Matrix4.getTranslation(nodeMat4, new Cesium.Cartesian3());
    //要注意3dmax里建模导出来的绝缘子，z和y是反的，需要调换一下，不要考虑挂点的旋转和缩放，只要考虑位置
    var trans = new Cesium.Cartesian3(_trans.x,_trans.z , _trans.y);
    nodeMat4 = Cesium.Matrix4.fromTranslation(trans);
    var retMat4 = Cesium.Matrix4.multiply(mat4, nodeMat4, new Cesium.Matrix4());
    return retMat4;
}

function getJyzLonLat(model, name) {
    var mat = getGuaJieDianByName(model, name);
    var trans = Cesium.Matrix4.getTranslation(mat, new Cesium.Cartesian3());
    var lonlat = Cesium.Cartographic.fromCartesian(trans);
    return lonlat;
}


//计算铅垂线向量,传入的是弧度
function computeLocalPlumbLine(lonRad, latRad) {
    return new Cesium.Cartesian3(-Math.cos(lonRad) * Math.cos(latRad),
        -Math.sin(lonRad) * Math.cos(latRad),
        -Math.sin(latRad));
}

function computeLocalWest(lonRad, latRad) {
    return new Cesium.Cartesian3(Math.sin(lonRad), -Math.cos(lonRad), 0.0);
}

//计算正东方向向量,传入的是弧度
function computeLocalEastern(lonRad, latRad) {
    return new Cesium.Cartesian3(-Math.sin(lonRad), Math.cos(lonRad), 0.0);
}

//计算正北方向向量,传入的是弧度
function computeLocalNorthern(lonRad, latRad) {
    var vecEastern = computeLocalEastern(lonRad, latRad);
    var vecPlumbLine = computeLocalPlumbLine(lonRad, latRad);

    return Cesium.Cartesian3.cross(vecEastern, vecPlumbLine, new Cesium.Cartesian3);
}



//计算从一个向量转向另一个向量的四元数
function makeRotate(from, to) {
    var x, y, z, w;
    var sourceVector = from;
    var targetVector = to;

    var fromLen2 = Cesium.Cartesian3.magnitudeSquared(from);
    var fromLen;

    if ((fromLen2 < 1.0 - 1e-7) || (fromLen2 > 1.0 + 1e-7)) {
        fromLen = Math.sqrt(fromLen2);
        Cesium.Cartesian3.divideByScalar(sourceVector, fromLen, sourceVector);
        //sourceVector /= fromLen;
    } else fromLen = 1.0;

    var toLen2 = Cesium.Cartesian3.magnitudeSquared(to);

    if ((toLen2 < 1.0 - 1e-7) || (toLen2 > 1.0 + 1e-7)) {
        var toLen;

        if ((toLen2 > fromLen2 - 1e-7) && (toLen2 < fromLen2 + 1e-7)) {
            toLen = fromLen;
        }
        else toLen = Math.sqrt(toLen2);
        Cesium.Cartesian3.divideByScalar(targetVector, toLen, targetVector);
        //targetVector /= toLen;
    }



    var dotProdPlus1 = 1.0 + Cesium.Cartesian3.dot(sourceVector, targetVector);


    if (dotProdPlus1 < 1e-7) {


        if (Math.abs(sourceVector.x < 0.6)) {
            var norm = Math.sqrt(1.0 - sourceVector.x * sourceVector.x);
            x = 0.0;
            y = sourceVector.z / norm;
            z = -sourceVector.y / norm;
            w = 0.0;
        } else if (Math.abs(sourceVector.y < 0.6)) {
            var norm = Math.sqrt(1.0 - sourceVector.y * sourceVector.y);
            x = -sourceVector.z / norm;
            y = 0.0;
            z = sourceVector.x / norm;
            w = 0.0;
        } else {
            var norm = Math.sqrt(1.0 - sourceVector.z * sourceVector.z);
            x = sourceVector.y / norm;
            y = -sourceVector.x / norm;
            z = 0.0;
            w = 0.0;
        }
    }

    else {

        var s = Math.sqrt(0.5 * dotProdPlus1);
        var tmp = new Cesium.Cartesian3();
        Cesium.Cartesian3.cross(sourceVector, targetVector, tmp);
        Cesium.Cartesian3.divideByScalar(tmp, 2.0 * s, tmp);

        x = tmp.x;
        y = tmp.y;
        z = tmp.z;
        w = s;
    }
    return new Cesium.Quaternion(x, y, z, w);

}




//计算两个塔之间的档距,pos1，pos2为经纬度高度，单位为弧度
function calDJ(pos1, pos2) {
    //计算档距时不要高度


    var xyzPos1 = Cesium.Cartesian3.fromRadians(pos1.longitude, pos1.latitude);
    var xyzPos2 = Cesium.Cartesian3.fromRadians(pos2.longitude, pos2.latitude);
    return Cesium.Cartesian3.distance(xyzPos1, xyzPos2);

}


function sh(x) { return 0.5 * (Math.exp(x) - Math.exp(-x)); }	// 双曲正弦函数
function ch(x) { return 0.5 * (Math.exp(x) + Math.exp(-x)); }	// 双曲余弦函数
function arsh(x) { return Math.log(x + Math.sqrt(1 + x * x)); }	// 反双曲正弦函数
function arch(x) { return Math.log(x + Math.sqrt(x * x - 1)); }	// 反双曲余弦函数

//弧垂算法，根据两点计算出弧垂线
function calTowLine(start, end, l) {

    /// <summary>
    /// 输入参数依次为电线弹性模量，电线温度伸长系数，初始水平应力，初始比载，初始温度，档距，高差系数(右杆减左杆高度/水平间距)
    /// equation=0:表示使用悬链线状态方程式;equation=1:表示使用斜抛物线状态方程式
    /// </summary>
    /// <param name="E">电线弹性模量 8055.758</param>
    /// <param name="alfa">电线温度伸长系数 0.0000191</param>
    /// <param name="sigema">初始水平应力 21.054</param>
    /// <param name="gama">初始比载 0.03277</param>
    /// <param name="temperature">初始温度 15</param>
    /// <param name="L">档距 600</param>
    /// <param name="H_to_L">高差系数 30 0.25</param>
    /// <param name="equation">0 悬链线状态方程式；1 斜抛物线状态方程式</param>
    /// <returns></returns>

    var equation_style = 0;
    var init_E = 73000.0;
    var init_alfa = 0.0000196;
    var cursor_sigema = l;//此参数是影响弧垂的重要参数，值越大越平，越小越垂
    var init_sigema = cursor_sigema;

    var cursor_gama = 0.0327715;
    var init_gama = cursor_gama;
    var cursor_temperature = 20.0;
    var init_temperature = cursor_temperature;
    var cursor_L = calDJ(start, end);
    var init_L = cursor_L;
    var dH = end.height - start.height;
    var H_to_L = dH / init_L;
    var cursor_H = init_L * H_to_L;
    var init_H = cursor_H;
    var cursor_cosb = 1 / Math.sqrt(1 + H_to_L * H_to_L);
    var init_cosb = cursor_cosb;
    var cursor_sinb = Math.sqrt(1 - init_cosb * init_cosb);
    var init_sinb = cursor_sinb;
    //使用悬链线状态方程式计算
    var cursor_Loa = init_Loa = 0.5 * init_L - (init_sigema / init_gama) * arsh(0.5 * init_H * init_gama / (init_sigema * sh(0.5 * init_L * init_gama / init_sigema)));
    var init_Length = Math.sqrt(Math.pow(2 * init_sigema * sh(0.5 * init_gama * init_L / init_sigema) / init_gama, 2) + init_H * init_H);

    var points = new Array();
    var linePointCount = 10;
    var step = init_L / linePointCount;
    var offsetLon = (end.longitude - start.longitude) / linePointCount;
    var offsetLat = (end.latitude - start.latitude) / linePointCount;

    //for(var seg = 0; seg <= init_L; seg = (init_L - seg) < step && init_L != seg ? init_L : seg + step)
    for (var index = 0; index <= linePointCount; index++) {

        var seg = index * step;
        var lon = start.longitude + index * offsetLon;
        var lat = start.latitude + index * offsetLat;
        var offsetHeight = cursor_sigema * (ch(cursor_gama * (seg - cursor_Loa) / cursor_sigema) - ch(cursor_gama * cursor_Loa / cursor_sigema)) / cursor_gama;
        var height = start.height + offsetHeight;

        var pt = new Cesium.Cartographic(lon, lat, height);
        points.push(Cesium.Cartesian3.fromRadians(lon, lat, height));

    }
    return points;

}


function calJyzDirection(start, end) {

    /// <summary>
    /// 输入参数依次为电线弹性模量，电线温度伸长系数，初始水平应力，初始比载，初始温度，档距，高差系数(右杆减左杆高度/水平间距)
    /// equation=0:表示使用悬链线状态方程式;equation=1:表示使用斜抛物线状态方程式
    /// </summary>
    /// <param name="E">电线弹性模量 8055.758</param>
    /// <param name="alfa">电线温度伸长系数 0.0000191</param>
    /// <param name="sigema">初始水平应力 21.054</param>
    /// <param name="gama">初始比载 0.03277</param>
    /// <param name="temperature">初始温度 15</param>
    /// <param name="L">档距 600</param>
    /// <param name="H_to_L">高差系数 30 0.25</param>
    /// <param name="equation">0 悬链线状态方程式；1 斜抛物线状态方程式</param>
    /// <returns></returns>

    var equation_style = 0;
    var init_E = 73000.0;
    var init_alfa = 0.0000196;
    var cursor_sigema = 150.054;
    var init_sigema = cursor_sigema;

    var cursor_gama = 0.0327715;
    var init_gama = cursor_gama;
    var cursor_temperature = 20.0;
    var init_temperature = cursor_temperature;
    var cursor_L = calDJ(start, end);
    var init_L = cursor_L;
    var dH = end.height - start.height;
    var H_to_L = dH / init_L;
    var cursor_H = init_L * H_to_L;
    var init_H = cursor_H;
    var cursor_cosb = 1 / Math.sqrt(1 + H_to_L * H_to_L);
    var init_cosb = cursor_cosb;
    var cursor_sinb = Math.sqrt(1 - init_cosb * init_cosb);
    var init_sinb = cursor_sinb;
    //使用悬链线状态方程式计算
    var cursor_Loa = init_Loa = 0.5 * init_L - (init_sigema / init_gama) * arsh(0.5 * init_H * init_gama / (init_sigema * sh(0.5 * init_L * init_gama / init_sigema)));
    var init_Length = Math.sqrt(Math.pow(2 * init_sigema * sh(0.5 * init_gama * init_L / init_sigema) / init_gama, 2) + init_H * init_H);

    var points = new Array();
    var linePointCount = 10;
    var step = init_L / linePointCount;
    var offsetLon = (end.longitude - start.longitude) / linePointCount;
    var offsetLat = (end.latitude - start.latitude) / linePointCount;

    var index = 1;
    var seg = index * step;
    var lon = start.longitude + index * offsetLon;
    var lat = start.latitude + index * offsetLat;
    var offsetHeight = cursor_sigema * (ch(cursor_gama * (seg - cursor_Loa) / cursor_sigema) - ch(cursor_gama * cursor_Loa / cursor_sigema)) / cursor_gama;
    var height = start.height + offsetHeight;
    points.push(new Cesium.Cartographic(lon, lat, height));


    var index2 = linePointCount - 2;
    var seg2 = index2 * step;
    var lon2 = start.longitude + index2 * offsetLon;
    var lat2 = start.latitude + index2 * offsetLat;
    var offsetHeight2 = cursor_sigema * (ch(cursor_gama * (seg2 - cursor_Loa) / cursor_sigema) - ch(cursor_gama * cursor_Loa / cursor_sigema)) / cursor_gama;
    var height2 = start.height + offsetHeight2;
    points.push(new Cesium.Cartographic(lon2, lat2, height2));
    return points;
}


//计算绝缘子的根据线路走向的旋转四元数,pos1,pos2为挂点的经纬度高度，单位为弧度
function makeJyzQuat(pos1, pos2) {
    var quaArray = new Array();
    var jyz1XYZ = Cesium.Cartesian3.fromRadians(pos1.longitude, pos1.latitude, pos1.height);
    var jyz2XYZ = Cesium.Cartesian3.fromRadians(pos2.longitude, pos2.latitude, pos2.height);
    var pts = calJyzDirection(pos1, pos2);
    //var pbVec1 = computeLocalPlumbLine(pos1.longitude,pos1.latitude);
    //var pbVec2 = computeLocalPlumbLine(pos2.longitude,pos2.latitude);

    var pbVec1 = new Cesium.Cartesian3(0, 0, -1);
    var pbVec2 = new Cesium.Cartesian3(0, 0, -1);
    var vec1 = Cesium.Cartesian3.fromRadians(pts[0].longitude, pts[0].latitude, pts[0].height);
    var tmpVec1 = new Cesium.Cartesian3();
    Cesium.Cartesian3.subtract(vec1, jyz1XYZ, tmpVec1);
    var vec2 = Cesium.Cartesian3.fromRadians(pts[1].longitude, pts[1].latitude, pts[1].height);
    var tmpVec2 = new Cesium.Cartesian3();
    Cesium.Cartesian3.subtract(vec2, jyz2XYZ, tmpVec2);
    var qua1 = makeRotate(pbVec1, tmpVec1);
    var qua2 = makeRotate(pbVec2, tmpVec2);
    quaArray.push(qua1);
    quaArray.push(qua2);
    return quaArray;

}



/**
 * 定义经纬度对象
 * @param {经度} longitude 
 * @param {纬度} latitude 
 */
function MyLatLng(longitude, latitude) {
    var Rc = 6378137;
    var Rj = 6356725;
    var m_Longitude, m_Latitude;
    var m_RadLo, m_RadLa;
    var Ec;
    var Ed;

    m_Longitude = longitude;
    m_Latitude = latitude;
    m_RadLo = longitude * Math.PI / 180.;
    m_RadLa = latitude * Math.PI / 180.;
    Ec = Rj + (Rc - Rj) * (90. - m_Latitude) / 90.;
    Ed = Ec * Math.cos(m_RadLa);

    return {
        m_Longitude: m_Longitude, m_Latitude: m_Latitude,
        m_RadLo: m_RadLo, m_RadLa: m_RadLa,
        Ec: Ec, Ed: Ed
    }

}

/** 
 * 获取AB连线与正北方向的角度 
 * @param A  A点的经纬度对象 
 * @param B  B点的经纬度对象
 * @return  AB连线与正北方向的角度（0~360） 
 */
function getAngle(A, B) {
    // var dx=(B.m_RadLo-A.m_RadLo)*A.Ed;  
    // var dy=(B.m_RadLa-A.m_RadLa)*A.Ec;  
    // var angle=0.0;  
    // angle=Math.atan(Math.abs(dx/dy))*180./Math.PI;    
    // var dLo=B.m_Longitude-A.m_Longitude;  
    // var dLa=B.m_Latitude-A.m_Latitude;  
    // if(dLo>0&&dLa<=0){  
    //     angle=(90.-angle)+90;  
    // }  
    // else if(dLo<=0&&dLa<0){  
    //     angle=angle+180.;  
    // }else if(dLo<0&&dLa>=0){  
    //     angle= (90.-angle)+270;  
    // }  
    // return angle>180?angle-360:angle;  //大于180度，取负数

    var A_North = computeLocalNorthern(A.m_RadLo, A.m_RadLa);
    //var A_North = computeLocalWest(A.m_RadLo, A.m_RadLa);
    var A_Cartographic = Cesium.Cartographic.fromDegrees(A.m_Longitude, A.m_Latitude, 0.0, new Cesium.Cartographic);
    var A_Cartesian3 = Cesium.Cartographic.toCartesian(A_Cartographic);
    var B_Cartographic = Cesium.Cartographic.fromDegrees(B.m_Longitude, B.m_Latitude, 0.0, new Cesium.Cartographic);
    var B_Cartesian3 = Cesium.Cartographic.toCartesian(B_Cartographic);
    var A_B = Cesium.Cartesian3.subtract(B_Cartesian3, A_Cartesian3, new Cesium.Cartesian3);
    var A_Quaternion = makeRotate(A_North, A_B);
    var A_hpr = Cesium.HeadingPitchRoll.fromQuaternion(A_Quaternion, new Cesium.HeadingPitchRoll)
    var A_Heading = Cesium.Math.toDegrees(A_hpr.heading);
    return A_Heading;
}
//弧度转成经纬度高程
function CartographicToDegrees(cartographic) {
    var longitude = Cesium.Math.toDegrees(cartographic.longitude);
    var latitude = Cesium.Math.toDegrees(cartographic.latitude);
    var height = cartographic.height;//地形高度
    return { longitude: longitude, latitude: latitude, height: height };
}

function quadratic_equation(a, b, c) {
    var delta = Math.pow(b, 2.0) - 4 * a * c;

    return new Cesium.Cartesian3((-b + Math.sqrt(delta)) / (2 * a),
        (-b - Math.sqrt(delta)) / (2 * a));
}

function check_parameter(p, x1, x2) {
    if (p.x <= 0.0) return false;

    var mid = -p.y / (2 * p.x);
    if (mid > Math.max(x1.x, x2.x) || mid < Math.min(x1.x, x2.x)) {
        return false;
    }
    return true;
}

function compute_y(param, x) {
    return param.x * Math.pow(x, 2.0) + param.y * x + param.z;
}


function quadratic_parameter(x1, x2, ratio) {
    var ret = new Cesium.Cartesian3(0.0, 0.0, 0.0);
    var k = Math.min(x1.y, x2.y) - ratio * Math.abs(x1.x - x2.x);
    var s = Math.pow(x2.x, 2.0) / (4 * k);
    var t = -x2.x;
    var l = x2.y;
    var sol = quadratic_equation(s, t, l);
    var negative_b = sol.x;
    var positive_b = sol.y;
    var negative_a = -Math.pow(negative_b, 2.0) / (4 * k);
    var positive_a = -Math.pow(positive_b, 2.0) / (4 * k);
    var positive_solution = new Cesium.Cartesian3(positive_a, positive_b, 0.0);
    var negative_solution = new Cesium.Cartesian3(negative_a, negative_b, 0.0);
    if (check_parameter(positive_solution, x1, x2)) {
        return positive_solution;
    }
    if (check_parameter(negative_solution, x1, x2)) {
        return negative_solution;
    }

    return ret;

}

function resolve(start, end, mid,xyLength) {
    var x1 = 0;
    var y1 = start.height;

    var x2 = xyLength/2.0;
    var y2 = mid.height;

    var x3 = xyLength;
    var y3 = end.height;

 
    var a = (((y1 - y2) / (x1 - x2)) - ((y1 - y3) / (x1 - x3))) / (x2 - x3);
    var b = ((y1 - y2) / (x1 - x2)) - a * (x1 + x2);
    var c = y1 - a * x1 * x1 - b * x1;
    return { a: a, b: b, c: c };
}


//两点生成短弧线
function computeArc(start, end) {

   

    var points = new Array();
    var linePointCount = 10;

    // var start_d = Cesium.Cartographic.toCartesian(start);
    // var end_d = Cesium.Cartographic.toCartesian(end);
    // var xyLength = Cesium.Cartesian3.distance(start_d, end_d);
    var xyLength = calDJ(start,end);
    //var xyLength = Math.sqrt(Math.pow(start.longitude-end.longitude,2)+Math.pow(start.latitude-end.latitude,2));
    var offsetLon = (end.longitude - start.longitude) / linePointCount;
    var offsetLat = (end.latitude - start.latitude) / linePointCount;
    var step = xyLength / linePointCount;

    var mid = Cesium.Cartographic.fromRadians((start.longitude + end.longitude) / 2, (start.latitude + end.latitude) / 2, ((start.height + end.height) / 2) - 1);
    
    var abc = resolve(start, end, mid,xyLength);



    for (var index = 0; index <= linePointCount; index++) {
        var seg = index * step;
        var lon = start.longitude + index * offsetLon;
        var lat = start.latitude + index * offsetLat;
        var offsetHeight = abc.a * seg * seg + abc.b * seg + abc.c;

        var height =  offsetHeight;
        
        points.push( Cesium.Cartesian3.fromRadians(lon,lat,height));

    }
    return points;














}














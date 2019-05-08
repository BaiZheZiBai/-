'use strict'
function handlercoord(viewer, Cesium) {
  var handler = new Cesium.ScreenSpaceEventHandler(scene.canvas)

  var measurelineEntityArray = []
  var measurepointsarr = []
  var viewArray = []
  var nviewType = 0
  var viewEntityArray = []
  var wgscoord = []
  var bufferArray = []
  var flyArray = []
  var flyEntityArray = []
  var bufferEntityArray = []

  handler.setInputAction(function(movement) {
    console.log('movement.endPosition' + movement.endPosition)
    console.log(movement.endPosition)
    console.log(movement.endPosition.x + movement.endPosition.y)
    var ray = viewer.camera.getPickRay(movement.endPosition)
    cartesian = viewer.scene.globe.pick(ray, viewer.scene)
    console.log(ray)
    console.log(cartesian)
    if (cartesian && boolmovement) {
      var cartographic = ellipsoid.cartesianToCartographic(cartesian)
      longitudeString = Cesium.Math.toDegrees(cartographic.longitude).toFixed(7)
      latitudeString = Cesium.Math.toDegrees(cartographic.latitude).toFixed(7)
      height = parseFloat(cartographic.height).toFixed(2) // Math.ceil(viewer.camera.positionCartographic.height);
      // entity.position = cartesian;
      // entity.label.show = true;
      getText.innerHTML =
        '经度:' +
        longitudeString +
        ',纬度:' +
        latitudeString +
        ',高程:' +
        height
      wgscoord = []
      wgscoord.push(parseFloat(longitudeString))
      wgscoord.push(parseFloat(latitudeString))
      wgscoord.push(parseFloat(height))
      // 测量
      if (boolmeasure) {
        if (measurepointsarr.length > 0) {
          if (measurepointsarr.length >= 1) {
            var polylinearr = []
            polylinearr.push(wgscoord[0])
            polylinearr.push(wgscoord[1])
            polylinearr.push(wgscoord[2])
            polylinearr.push(measurepointsarr[measurepointsarr.length - 1][0])
            polylinearr.push(measurepointsarr[measurepointsarr.length - 1][1])
            polylinearr.push(measurepointsarr[measurepointsarr.length - 1][2])
            if (tmpmeasurelineEntity) {
              viewer.entities.remove(tmpmeasurelineEntity)
            }
            if (tmpmeasurepolygonEntity) {
              viewer.entities.remove(tmpmeasurepolygonEntity)
            }
            measurelabels2.removeAll()
            var d
            var str
            if (measuretype === 0 || measuretype === 1) {
              tmpmeasurelineEntity = viewer.entities.add({
                polyline: {
                  positions: Cesium.Cartesian3.fromDegreesArrayHeights(
                    polylinearr
                  ),
                  width: 4,
                  material: Cesium.Color.WHITE
                }
              })
              d =
                parseFloat(
                  MeasureUtils.caldistance(
                    polylinearr[0],
                    polylinearr[1],
                    0,
                    polylinearr[3],
                    polylinearr[4],
                    0
                  ) / 1000
                ).toFixed(3) + '千米'
              str = d
            } else if (measuretype === 2) {
              for (let i = 0; i < tmpmeasurelineEntityArray.length; i++) {
                viewer.entities.remove(tmpmeasurelineEntityArray[i])
              }
              d = MeasureUtils.stickground(
                polylinearr[0],
                polylinearr[1],
                polylinearr[2],
                polylinearr[3],
                polylinearr[4],
                polylinearr[5],
                true
              )
              str = parseFloat(d / 1000).toFixed(1) + '千米'
            } else if (measuretype === 3) {
              tmpmeasurelineEntity = viewer.entities.add({
                polyline: {
                  positions: Cesium.Cartesian3.fromDegreesArrayHeights(
                    polylinearr
                  ),
                  width: 4,
                  material: Cesium.Color.WHITE
                }
              })
              d =
                parseFloat(
                  MeasureUtils.horizontalmeasure(
                    crossrayarr[crossrayarr.length - 1],
                    cartesian,
                    polylinearr[2],
                    polylinearr[5]
                  )
                ).toFixed(1) + '米'
              str = d
            } else if (measuretype === 4) {
              tmpmeasurelineEntity = viewer.entities.add({
                polyline: {
                  positions: Cesium.Cartesian3.fromDegreesArrayHeights(
                    polylinearr
                  ),
                  width: 4,
                  material: Cesium.Color.WHITE
                }
              })
              d =
                parseFloat(
                  Math.abs(polylinearr[5] - polylinearr[2]).toFixed(1)
                ) + '米'
              str = d
            }
            measurelabels2.add({
              position: Cesium.Cartesian3.fromDegrees(
                wgscoord[0],
                wgscoord[1],
                wgscoord[2]
              ),
              text: str,
              font: '24px Helvetica',
              fillColor: Cesium.Color.SKYBLUE,
              outlineColor: Cesium.Color.BLACK,
              outlineWidth: 2,
              style: Cesium.LabelStyle.FILL_AND_OUTLINE
            })
          }
          if (measurepointsarr.length >= 3 && measuretype === 1) {
            for (let i = 0; i < tmpmeasurelineEntityArray.length; i++) {
              viewer.entities.remove(tmpmeasurelineEntityArray[i])
            }
            if (tmpmeasurelineEntity) {
              viewer.entities.remove(tmpmeasurelineEntity)
            }
            if (tmpmeasurepolygonEntity) {
              viewer.entities.remove(tmpmeasurepolygonEntity)
            }
            var polygonarr = []
            var coords = []
            var coords0 = []
            for (let i = 0; i < measurepointsarr.length; i++) {
              polygonarr.push(measurepointsarr[i][0])
              polygonarr.push(measurepointsarr[i][1])
              coords0.push([measurepointsarr[i][0], measurepointsarr[i][1]])
            }
            polygonarr.push(wgscoord[0])
            polygonarr.push(wgscoord[1])
            coords0.push([wgscoord[0], wgscoord[1]])
            coords.push(coords0)
            tmpmeasurepolygonEntity = viewer.entities.add({
              polygon: {
                hierarchy: Cesium.Cartesian3.fromDegreesArray(polygonarr),
                material: Cesium.Color.WHITE.withAlpha(0.3),
                outline: true,
                outlineColor: Cesium.Color.BLUE
              }
            })
            var name = MeasureUtils.polygonArea(coords) + '平方公里'
            measurelabels2.removeAll()
            measurelabels2.add({
              position: Cesium.Cartesian3.fromDegrees(wgscoord[0], wgscoord[1]),
              text: name,
              font: '20px Helvetica',
              fillColor: Cesium.Color.SKYBLUE,
              outlineColor: Cesium.Color.BLACK,
              outlineWidth: 2,
              style: Cesium.LabelStyle.FILL_AND_OUTLINE
            })
          }
        }
      }
      handler.setInputAction(function(leftclick) {
        if (boolmeasure) {
          crossrayarr.push(cartesian)
          measurepointsarr.push(wgscoord)
          if (measuretype !== 5) {
            measurepointEntityArray.push(
              viewer.entities.add({
                position: Cesium.Cartesian3.fromDegrees(
                  wgscoord[0],
                  wgscoord[1],
                  wgscoord[2]
                ),
                color: Cesium.Color.YELLOW,
                point: {
                  pixelSize: 8
                }
              })
            )
          }
          if (measurepointsarr.length > 1) {
            let polylinearr = []
            let polylinecartesianarr = []

            polylinearr.push(measurepointsarr[measurepointsarr.length - 1][0])
            polylinearr.push(measurepointsarr[measurepointsarr.length - 1][1])
            polylinearr.push(measurepointsarr[measurepointsarr.length - 1][2])
            polylinearr.push(measurepointsarr[measurepointsarr.length - 2][0])
            polylinearr.push(measurepointsarr[measurepointsarr.length - 2][1])
            polylinearr.push(measurepointsarr[measurepointsarr.length - 2][2])

            polylinecartesianarr.push(crossrayarr[crossrayarr.length - 1])
            polylinecartesianarr.push(crossrayarr[crossrayarr.length - 2])
            if (measuretype === 0) {
              measurelineEntity = viewer.entities.add({
                polyline: {
                  positions: Cesium.Cartesian3.fromDegreesArrayHeights(
                    polylinearr
                  ),
                  width: 4,
                  material: Cesium.Color.RED
                }
              })
              measurelineEntityArray.push(measurelineEntity)
              var d = MeasureUtils.caldistance(
                polylinearr[0],
                polylinearr[1],
                0,
                polylinearr[3],
                polylinearr[4],
                0
              )
              measuredistance = parseInt(measuredistance) + parseInt(d)
              var cart = MeasureUtils.countCenter(polylinecartesianarr)
              var jd = Cesium.Math.toDegrees(cart.longitude)
              var wd = Cesium.Math.toDegrees(cart.latitude)
              var hei = parseFloat(cart.height).toFixed(2) // (d/1000).toFixed(1)
              var str = parseFloat(measuredistance / 1000).toFixed(3) + ' 千米'
            //   var str = '总长度:' + parseFloat(measuredistance / 1000).toFixed(1) + '千米'
              measurelabels.add({
                position: Cesium.Cartesian3.fromDegrees(
                  parseFloat(jd),
                  parseFloat(wd),
                  parseFloat(hei) + 20
                ),
                text: parseFloat(d / 1000).toFixed(1) + '千米',
                font: '24px Helvetica',
                fillColor: Cesium.Color.SKYBLUE,
                outlineColor: Cesium.Color.BLACK,
                outlineWidth: 2,
                style: Cesium.LabelStyle.FILL_AND_OUTLINE
              })
              jQuery('#measureTitle').html('距离 ' + str)
            } else if (measuretype === 1) {
              if (measurepointsarr.length === 2) {
                measurelineEntity = viewer.entities.add({
                  polyline: {
                    positions: Cesium.Cartesian3.fromDegreesArrayHeights(
                      polylinearr
                    ),
                    width: 4,
                    material: Cesium.Color.RED
                  }
                })
              } else {
                if (tmpmeasurelineEntity) {
                  viewer.entities.remove(tmpmeasurelineEntity)
                }
                if (measurelineEntity) {
                  viewer.entities.remove(measurelineEntity)
                }
                if (measurepolygonEntity) {
                  viewer.entities.remove(measurepolygonEntity)
                }
                var polygonarr = []
                var coords = []
                var coords0 = []
                for (let i = 0; i < measurepointsarr.length; i++) {
                  polygonarr.push(measurepointsarr[i][0])
                  polygonarr.push(measurepointsarr[i][1])
                  coords0.push([
                    measurepointsarr[i][0],
                    measurepointsarr[i][1]
                  ])
                }
                coords.push(coords0)
                console.log(polygonarr)
                console.log(coords)
                measurepolygonEntity = viewer.entities.add({
                  polygon: {
                    hierarchy: Cesium.Cartesian3.fromDegreesArray(polygonarr),
                    material: Cesium.Color.RED.withAlpha(0.3),
                    outline: true,
                    outlineColor: Cesium.Color.BLACK
                  }
                })
                let str = MeasureUtils.polygonArea(coords) + '平方公里'
                measurearealabels.removeAll()
                /* if(measurearealabel)
										viewer.entities.remove(measurearealabel);*/
                let cart = MeasureUtils.countCenter(crossrayarr)
                let jd = Cesium.Math.toDegrees(cart.longitude)
                let wd = Cesium.Math.toDegrees(cart.latitude)
                let hei = parseFloat(cart.height).toFixed(1)
                measurearealabels.add({
                  position: Cesium.Cartesian3.fromDegrees(
                    parseFloat(jd),
                    parseFloat(wd),
                    parseFloat(hei) + 20
                  ),
                  text: str,
                  font: '20px Helvetica',
                  fillColor: Cesium.Color.SKYBLUE,
                  outlineColor: Cesium.Color.BLACK,
                  outlineWidth: 2,
                  style: Cesium.LabelStyle.FILL_AND_OUTLINE
                })
                /* measurearealabel=viewer.entities.add({
										position : Cesium.Cartesian3.fromDegrees(parseFloat(jd),parseFloat(wd),parseFloat(hei)+20),
										label : {text : str,font : '20px Helvetica',fillColor : Cesium.Color.SKYBLUE,outlineColor : Cesium.Color.BLACK,outlineWidth : 2,style : Cesium.LabelStyle.FILL_AND_OUTLINE
										}});*/
                jQuery('#measureTitle').html('面积 ' + str)
              }
            } else if (measuretype === 2) {
              // 贴地计算
              d = MeasureUtils.stickground(
                polylinearr[0],
                polylinearr[1],
                polylinearr[2],
                polylinearr[3],
                polylinearr[4],
                polylinearr[5],
                false
              )
              measuredistance = parseInt(measuredistance) + parseInt(d)
              let cart = MeasureUtils.countCenter(polylinecartesianarr)
              let jd = Cesium.Math.toDegrees(cart.longitude)
              let wd = Cesium.Math.toDegrees(cart.latitude)
              let hei = parseFloat(cart.height).toFixed(2)
              let str = '总长度:' + parseFloat(measuredistance / 1000).toFixed(1) + '千米'
              measurelabels.add({
                position: Cesium.Cartesian3.fromDegrees(
                  parseFloat(jd),
                  parseFloat(wd),
                  parseFloat(hei) + 20
                ),
                text: parseFloat(d / 1000).toFixed(1) + '千米',
                font: '24px Helvetica',
                fillColor: Cesium.Color.SKYBLUE,
                outlineColor: Cesium.Color.BLACK,
                outlineWidth: 2,
                style: Cesium.LabelStyle.FILL_AND_OUTLINE
              })
              jQuery('#measureTitle').html('贴地距离 ' + str)
            } else if (measuretype === 3) {
              measurelineEntity = viewer.entities.add({
                polyline: {
                  positions: Cesium.Cartesian3.fromDegreesArrayHeights(
                    polylinearr
                  ),
                  width: 4,
                  material: Cesium.Color.RED
                }
              })
              measurelineEntityArray.push(measurelineEntity)
              let d = MeasureUtils.horizontalmeasure(
                crossrayarr[crossrayarr.length - 1],
                crossrayarr[crossrayarr.length - 2],
                measurepointsarr[measurepointsarr.length - 2][2],
                measurepointsarr[measurepointsarr.length - 1][2]
              )
              measuredistance = parseInt(measuredistance) + parseInt(d)
              let cart = MeasureUtils.countCenter(polylinecartesianarr)
              let jd = Cesium.Math.toDegrees(cart.longitude)
              let wd = Cesium.Math.toDegrees(cart.latitude)
              let hei = parseFloat(cart.height).toFixed(2)
              let str =
                '总长度:' + parseFloat(measuredistance).toFixed(1) + '米'
              measurelabels.add({
                position: Cesium.Cartesian3.fromDegrees(
                  parseFloat(jd),
                  parseFloat(wd),
                  parseFloat(hei) + 20
                ),
                text: parseFloat(d).toFixed(1) + '米',
                font: '24px Helvetica',
                fillColor: Cesium.Color.SKYBLUE,
                outlineColor: Cesium.Color.BLACK,
                outlineWidth: 2,
                style: Cesium.LabelStyle.FILL_AND_OUTLINE
              })
              jQuery('#measureTitle').html('水平距离 ' + str)
            } else if (measuretype === 4) {
              measurelineEntity = viewer.entities.add({
                polyline: {
                  positions: Cesium.Cartesian3.fromDegreesArrayHeights(
                    polylinearr
                  ),
                  width: 4,
                  material: Cesium.Color.RED
                }
              })
              measurelineEntityArray.push(measurelineEntity)
              let d = Math.abs(
                measurepointsarr[measurepointsarr.length - 2][2] -
                  measurepointsarr[measurepointsarr.length - 1][2]
              )
              measuredistance = parseInt(measuredistance) + parseInt(d)
              let cart = MeasureUtils.countCenter(polylinecartesianarr)
              let jd = Cesium.Math.toDegrees(cart.longitude)
              let wd = Cesium.Math.toDegrees(cart.latitude)
              let hei = parseFloat(cart.height).toFixed(2)
              let str =
                '总长度:' + parseFloat(measuredistance).toFixed(1) + '米'
              measurelabels.add({
                position: Cesium.Cartesian3.fromDegrees(
                  parseFloat(jd),
                  parseFloat(wd),
                  parseFloat(hei) + 20
                ),
                text: parseFloat(d).toFixed(1) + '米',
                font: '24px Helvetica',
                fillColor: Cesium.Color.SKYBLUE,
                outlineColor: Cesium.Color.BLACK,
                outlineWidth: 2,
                style: Cesium.LabelStyle.FILL_AND_OUTLINE
              })
              jQuery('#measureTitle').html('垂直距离 ' + str)
            } else if (measuretype === 5) {
              let str = prompt('请输入你的文字:', '1')
              if (str !== null && str !== '') {
                markerpointEntityArray.push(
                  viewer.entities.add({
                    position: Cesium.Cartesian3.fromDegrees(
                      wgscoord[0],
                      wgscoord[1],
                      wgscoord[2] + 50
                    ),
                    point: {
                      color: Cesium.Color.RED,
                      pixelSize: 10
                    }
                  })
                )
                markerlabels.add({
                  position: Cesium.Cartesian3.fromDegrees(
                    wgscoord[0],
                    wgscoord[1],
                    wgscoord[2] + 20
                  ),
                  text: str,
                  font: '24px Helvetica',
                  fillColor: Cesium.Color.SKYBLUE,
                  outlineColor: Cesium.Color.BLACK,
                  outlineWidth: 2,
                  style: Cesium.LabelStyle.FILL_AND_OUTLINE
                })
              }
            }
          }
        }
        if (boolview) {
          if (nviewType === 0) {
            viewArray.push(wgscoord)
            if (viewArray.length === 2) {
              doubleviewstickground(
                viewArray[0][0],
                viewArray[0][1],
                viewArray[0][2],
                viewArray[1][0],
                viewArray[1][1],
                viewArray[1][2]
              )
              console.log(viewArray)
              boolview = false
              jQuery('#model_id_3_view').css({ color: '#fff' }) // .attr("disabled",true);
              document.getElementById('model_id_3_view').disabled = false
            }
          } else if (nviewType === 1) {
            viewArray.push(wgscoord)
            if (viewArray.length === 2) {
              viewareastickground(
                viewArray[0][0],
                viewArray[0][1],
                viewArray[0][2],
                viewArray[1][0],
                viewArray[1][1],
                viewArray[1][2]
              )
              boolview = false
              jQuery('#model_id_3_view').css({ color: '#fff' })
              document.getElementById('model_id_3_view').disabled = false
            }
          } else if (nviewType === 2) {
            //
          } else if (nviewType === 3) {
            viewArray.push(wgscoord)
            if (viewArray.length >= 2) {
              var polylinearr = []
              polylinearr.push(viewArray[viewArray.length - 2][0])
              polylinearr.push(viewArray[viewArray.length - 2][1])
              polylinearr.push(viewArray[viewArray.length - 2][2])
              polylinearr.push(viewArray[viewArray.length - 1][0])
              polylinearr.push(viewArray[viewArray.length - 1][1])
              polylinearr.push(viewArray[viewArray.length - 1][2])
              viewEntityArray.push(
                viewer.entities.add({
                  polyline: {
                    positions: Cesium.Cartesian3.fromDegreesArrayHeights(
                      polylinearr
                    ),
                    width: 4,
                    material: Cesium.Color.WHITE
                  }
                })
              )
            }
          } else if (nviewType === 4) {
            if (viewer.selectedEntity) {
              var xyz = new Cesium.Cartesian3(
                viewer.selectedEntity._position._value.x,
                viewer.selectedEntity._position._value.y,
                viewer.selectedEntity._position._value.z
              )
              var wgs84 = ellipsoid.cartesianToCartographic(xyz)
              let jd = wgs84.longitude / Math.PI * 180
              let wd = wgs84.latitude / Math.PI * 180
              let hei = wgs84.height
              var groundhei = getPointHeight(jd, wd)
              let d = hei - groundhei
              let polylinearr = []
              polylinearr.push(jd)
              polylinearr.push(wd)
              polylinearr.push(groundhei)
              polylinearr.push(jd)
              polylinearr.push(wd)
              polylinearr.push(hei)
              viewEntityArray.push(
                viewer.entities.add({
                  polyline: {
                    positions: Cesium.Cartesian3.fromDegreesArrayHeights(
                      polylinearr
                    ),
                    width: 4,
                    material: Cesium.Color.BLUE
                  }
                })
              )
              jQuery('#measureTerrainLabel').html(parseInt(d) + '米')
              jQuery('#model_id_3_view').css({ color: '#fff' })
              document.getElementById('model_id_3_view').disabled = false
              boolview = false
            }
          } else if (nviewType === 5) {
            // 坡度
          } else if (nviewType === 6) {
            // 开挖
            boolview = false
            viewArray.push(wgscoord)
            Excavation(wgscoord[0], wgscoord[1], wgscoord[2]) // 如何计算土方量
            jQuery('#model_id_3_view').css({ color: '#fff' })
            document.getElementById('model_id_3_view').disabled = false
          } else if (nviewType === 7) {
            viewArray.push(wgscoord)
            if (viewArray.length >= 2 && viewArray.length < 3) {
              let polylinearr = []
              polylinearr.push(viewArray[viewArray.length - 2][0])
              polylinearr.push(viewArray[viewArray.length - 2][1])
              polylinearr.push(viewArray[viewArray.length - 2][2])
              polylinearr.push(viewArray[viewArray.length - 1][0])
              polylinearr.push(viewArray[viewArray.length - 1][1])
              polylinearr.push(viewArray[viewArray.length - 1][2])
              viewEntityArray.push(
                viewer.entities.add({
                  polyline: {
                    positions: Cesium.Cartesian3.fromDegreesArrayHeights(
                      polylinearr
                    ),
                    width: 4,
                    material: Cesium.Color.WHITE
                  }
                })
              )
            }
            if (viewArray.length >= 3) {
              let polygonarr = []
              let coords = []
              let coords0 = []
              for (let i = 0; i < viewArray.length; i++) {
                polygonarr.push(viewArray[i][0])
                polygonarr.push(viewArray[i][1])
                coords0.push([viewArray[i][0], viewArray[i][1]])
              }
              coords.push(coords0)
              console.log(polygonarr)
              console.log(coords)
              for (let i = 0; i < viewEntityArray.length; i++) {
                viewer.entities.remove(viewEntityArray[i])
              }
              viewEntityArray.push(
                viewer.entities.add({
                  polygon: {
                    hierarchy: Cesium.Cartesian3.fromDegreesArray(polygonarr),
                    material: Cesium.Color.RED.withAlpha(0.3),
                    outline: true,
                    outlineColor: Cesium.Color.BLACK
                  }
                })
              )
              let str = MeasureUtils.polygonArea(coords) + '平方公里'
            //   jQuery('#measureTerrainLabel').html(str)
            }
          } else {
            x = 1
          }
        }
        if (boolbuffer) {
          if (nbufferType === 0) {
            bufferArray.push(wgscoord)
            OnDrawBufferPoint(
              bufferArray[0][0],
              bufferArray[0][1],
              bufferArray[0][2]
            )
            boolbuffer = false
            jQuery('#model_id_3_view').css({ color: '#fff' }) // .attr("disabled",true);
            document.getElementById('model_id_3_view').disabled = false
          } else if (nbufferType === 1) {
            bufferArray.push(wgscoord)
            if (bufferArray.length >= 2) {
              let polylinearr = []
              polylinearr.push(bufferArray[bufferArray.length - 2][0])
              polylinearr.push(bufferArray[bufferArray.length - 2][1])
              polylinearr.push(bufferArray[bufferArray.length - 2][2])
              polylinearr.push(bufferArray[bufferArray.length - 1][0])
              polylinearr.push(bufferArray[bufferArray.length - 1][1])
              polylinearr.push(bufferArray[bufferArray.length - 1][2])
              bufferEntityArray.push(
                viewer.entities.add({
                  polyline: {
                    positions: Cesium.Cartesian3.fromDegreesArrayHeights(
                      polylinearr
                    ),
                    width: 4,
                    material: Cesium.Color.WHITE
                  }
                })
              )
            }
          } else if (nbufferType === 2) {
            bufferArray.push(wgscoord)
            if (bufferArray.length >= 2 && bufferArray.length < 3) {
              let polylinearr = []
              polylinearr.push(bufferArray[bufferArray.length - 2][0])
              polylinearr.push(bufferArray[bufferArray.length - 2][1])
              polylinearr.push(bufferArray[bufferArray.length - 2][2])
              polylinearr.push(bufferArray[bufferArray.length - 1][0])
              polylinearr.push(bufferArray[bufferArray.length - 1][1])
              polylinearr.push(bufferArray[bufferArray.length - 1][2])
              bufferEntityArray.push(
                viewer.entities.add({
                  polyline: {
                    positions: Cesium.Cartesian3.fromDegreesArrayHeights(
                      polylinearr
                    ),
                    width: 4,
                    material: Cesium.Color.WHITE
                  }
                })
              )
            }
            if (bufferArray.length >= 3) {
              let polygonarr = []
              for (let i = 0; i < bufferArray.length; i++) {
                polygonarr.push(bufferArray[i][0])
                polygonarr.push(bufferArray[i][1])
              }
              for (let i = 0; i < bufferEntityArray.length; i++) {
                viewer.entities.remove(bufferEntityArray[i])
              }
              bufferEntityArray.push(
                viewer.entities.add({
                  polygon: {
                    hierarchy: Cesium.Cartesian3.fromDegreesArray(polygonarr),
                    material: Cesium.Color.RED.withAlpha(0.3),
                    outline: true,
                    outlineColor: Cesium.Color.BLACK
                  }
                })
              )
            }
          } else if (nbufferType === 3) {
            bufferArray.push(wgscoord)
            OnDrawBufferPoint2(
              bufferArray[0][0],
              bufferArray[0][1],
              bufferArray[0][2]
            )
            boolbuffer = false
            jQuery('#model_id_3_view').css({ color: '#fff' })
            document.getElementById('model_id_3_view').disabled = false
          } else if (nbufferType === 4) {
            bufferArray.push(wgscoord)
            if (bufferArray.length >= 2) {
              let polylinearr = []
              polylinearr.push(bufferArray[bufferArray.length - 2][0])
              polylinearr.push(bufferArray[bufferArray.length - 2][1])
              polylinearr.push(bufferArray[bufferArray.length - 2][2])
              polylinearr.push(bufferArray[bufferArray.length - 1][0])
              polylinearr.push(bufferArray[bufferArray.length - 1][1])
              polylinearr.push(bufferArray[bufferArray.length - 1][2])
              bufferEntityArray.push(
                viewer.entities.add({
                  polyline: {
                    positions: Cesium.Cartesian3.fromDegreesArrayHeights(
                      polylinearr
                    ),
                    width: 4,
                    material: Cesium.Color.WHITE
                  }
                })
              )
            }
          } else if (nbufferType === 5) {
            bufferArray.push(wgscoord)
            if (bufferArray.length >= 2 && bufferArray.length < 3) {
              let polylinearr = []
              polylinearr.push(bufferArray[bufferArray.length - 2][0])
              polylinearr.push(bufferArray[bufferArray.length - 2][1])
              polylinearr.push(bufferArray[bufferArray.length - 2][2])
              polylinearr.push(bufferArray[bufferArray.length - 1][0])
              polylinearr.push(bufferArray[bufferArray.length - 1][1])
              polylinearr.push(bufferArray[bufferArray.length - 1][2])
              bufferEntityArray.push(
                viewer.entities.add({
                  polyline: {
                    positions: Cesium.Cartesian3.fromDegreesArrayHeights(
                      polylinearr
                    ),
                    width: 4,
                    material: Cesium.Color.WHITE
                  }
                })
              )
            }
            if (bufferArray.length >= 3) {
              let polygonarr = []
              for (let i = 0; i < bufferArray.length; i++) {
                polygonarr.push(bufferArray[i][0])
                polygonarr.push(bufferArray[i][1])
              }
              for (let i = 0; i < bufferEntityArray.length; i++) {
                viewer.entities.remove(bufferEntityArray[i])
              }
              bufferEntityArray.push(
                viewer.entities.add({
                  polygon: {
                    hierarchy: Cesium.Cartesian3.fromDegreesArray(polygonarr),
                    material: Cesium.Color.RED.withAlpha(0.3),
                    outline: true,
                    outlineColor: Cesium.Color.BLACK
                  }
                })
              )
            }
          }
        }
        if (booltext) {
        //   OnDrawText(wgscoord[0], wgscoord[1], wgscoord[2])
        //   booltext = false
        //   jQuery('#model_id_3_view').css({ color: '#fff' })
        //   document.getElementById('model_id_3_view').disabled = false
        }
        if (boolimage) {
        //   OnDrawImageMark(wgscoord[0], wgscoord[1], wgscoord[2])
        //   boolimage = false
        //   jQuery('#model_id_3_view').css({ color: '#fff' })
        //   document.getElementById('model_id_3_view').disabled = false
        }
        if (boolfly) {
          flyArray.push(wgscoord)
          if (flyArray.length >= 2) {
            let polylinearr = []
            polylinearr.push(flyArray[flyArray.length - 2][0])
            polylinearr.push(flyArray[flyArray.length - 2][1])
            polylinearr.push(flyArray[flyArray.length - 2][2])
            polylinearr.push(flyArray[flyArray.length - 1][0])
            polylinearr.push(flyArray[flyArray.length - 1][1])
            polylinearr.push(flyArray[flyArray.length - 1][2])
            flyEntityArray.push(
              viewer.entities.add({
                polyline: {
                  positions: Cesium.Cartesian3.fromDegreesArrayHeights(
                    polylinearr
                  ),
                  width: 4,
                  material: Cesium.Color.WHITE
                }
              })
            )
          }
        }
        var pick = viewer.scene.pick(leftclick.position)
        console.log('pick' + pick)
        if (pick && pick.id && pick.id._name) {
          // if(pick && pick.id){
          var cartographic = Cesium.Cartographic.fromCartesian(
            pick.id._position._value
          ) // 世界坐标转地理坐标（弧度）
          var point = [
            cartographic.longitude / Math.PI * 180,
            cartographic.latitude / Math.PI * 180
          ] // 地理坐标（弧度）转经纬度坐标
          var destination = Cesium.Cartesian3.fromDegrees(
            point[0],
            point[1],
            3000.0
          )
          var content =
            "<div  style='border-bottom: 1px solid #C6CBCE;'>" +
            "<span style='margin-left: 5px;'>测试测试1</span>" +
            "<div id='infoClose3D' class='closeButton' style='margin-right: 4px;'></div>" +
            '</div>' +
            '<div>' +
            '<label>测试1:</label><label>测试1</label></br>' +
            '<label>测试2:</label><label>测试2</label></br>' +
            '<label>测试3:</label><label>测试3</label></br>' +
            '</div>'
          var obj = {
            position: leftclick.position,
            destination: destination,
            content: content
          }
          if (pick.id._name.indexOf('传感器') > -1) {
            loadpano()
          }
          /* var infoDiv = '<div id="trackPopUp" style="display:block;">'+
                            '<div id="trackPopUpContent" class="leaflet-popup" style="top:5px;left:0;">'+
                            '<a class="leaflet-popup-close-button" href="#">×</a>'+
                            '<div class="leaflet-popup-content-wrapper">'+
                            '<div id="trackPopUpLink" class="leaflet-popup-content" style="max-width: 300px;"></div>'+
                            '</div>'+
                            '<div class="leaflet-popup-tip-container">'+
                            '<div class="leaflet-popup-tip"></div>'+
                            '</div>'+
                            '</div>'+
                            '</div>';
                        jQuery("#cesiumContainer").append(infoDiv);
                           loadpano();*/
          // cesium.infoWindow(obj);
        }
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
      handler.setInputAction(function(doubleclick) {
        if (boolview) {
          if (nviewType === 3) {
            viewprofile(viewArray)
            jQuery('#model_id_3_view').css({ color: '#fff' })
            document.getElementById('model_id_3_view').disabled = false
            boolview = false
          } else if (nviewType === 7) {
            jQuery('#model_id_3_view').css({ color: '#fff' })
            document.getElementById('model_id_3_view').disabled = false
            boolview = false
          }
        }
        if (boolbuffer) {
          if (nbufferType === 1) {
            OnDrawBufferLine()
            boolbuffer = false
            jQuery('#model_id_3_view').css({ color: '#fff' })
            document.getElementById('model_id_3_view').disabled = false
          } else if (nbufferType === 2) {
            OnDrawBufferPolygon()
            boolbuffer = false
            jQuery('#model_id_3_view').css({ color: '#fff' })
            document.getElementById('model_id_3_view').disabled = false
          } else if (nbufferType === 4) {
            OnDrawBufferLine2()
            boolbuffer = false
            jQuery('#model_id_3_view').css({ color: '#fff' })
            document.getElementById('model_id_3_view').disabled = false
          } else if (nbufferType === 5) {
            boolbuffer = false
            jQuery('#model_id_3_view').css({ color: '#fff' })
            document.getElementById('model_id_3_view').disabled = false
            OnDrawBufferPolygon2()
          }
        }
        if (boolfly) {
          boolfly = false
          jQuery('#model_id_3_view').css({ color: '#fff' })
          document.getElementById('model_id_3_view').disabled = false
        }
        MeasureUtils.delentity()
      }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK)
      handler.setInputAction(function(rightclick) {
        if (boolmeasure) {
          boolmeasure = false
        } else {
          boolmeasure = true
        }
        if (tmpmeasurelineEntity) {
          viewer.entities.remove(tmpmeasurelineEntity)
        }
        measurelabels2.removeAll()
        if (tmpmeasurepolygonEntity) {
          viewer.entities.remove(tmpmeasurepolygonEntity)
        }
        for (let i = 0; i < tmpmeasurelineEntityArray.length; i++) {
          viewer.entities.remove(tmpmeasurelineEntityArray[i])
        }
        if (!jQuery('#distanceCheck').prop('checked')) {
          measuredistance = 0
          measurepointsarr = []
          crossrayarr = []
          if (measuretype === 1 && measurepolygonEntity) {
            var entity = viewer.entities.add({
              polygon: measurepolygonEntity._polygon
            })
            measurepolygonEntityArray.push(entity)
            var arealable =
              measurearealabels._labels[measurearealabels._labels.length - 1]
            measurearealabels2.add({
              position: arealable._position,
              text: arealable._text,
              font: '20px Helvetica',
              fillColor: Cesium.Color.SKYBLUE,
              outlineColor: Cesium.Color.BLACK,
              outlineWidth: 2,
              style: Cesium.LabelStyle.FILL_AND_OUTLINE
            })
          }
        }
      }, Cesium.ScreenSpaceEventType.RIGHT_CLICK)
    } else {
      // getText.innerHTML ="";
    }
  }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)

  handler.setInputAction(function(wheelment) {
    height = Math.ceil(viewer.camera.positionCartographic.height)
    entity.position = cartesian
    entity.label.show = true
    // if(!isNaN(longitudeString) && !isNaN(latitudeString)  && !isNaN(height))
    //    getText.innerHTML = '(' + longitudeString.toFixed(4) + ', ' +latitudeString.toFixed(4) + "," + height.toFixed(2) + ')' ;
  }, Cesium.ScreenSpaceEventType.WHEEL)
}

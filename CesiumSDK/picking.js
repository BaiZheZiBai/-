
infobox()
function infobox() {

    var viewer = globe.viewer;



    // var selectedEntity = new Cesium.Entity();


    var clickHandler = viewer.screenSpaceEventHandler.getInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);




    viewer.screenSpaceEventHandler.setInputAction(function onLeftClick(movement) {

        var pickedFeature = viewer.scene.pick(movement.position);
        if (!Cesium.defined(pickedFeature)) {
            clickHandler(movement);
            $("#box_box").css({display:"none"})
            return;
        }
        var featureName = pickedFeature.id;
        console.log(featureName)
        $("#box_box").css({display:"block"})
        $("#box_name").text(featureName)
        // var featureName = pickedFeature.id;
        // selectedEntity.name = featureName;
        // selectedEntity.description = 'Loading <div class="cesium-infoBox-loading"></div>';
        // viewer.selectedEntity = selectedEntity;
        // selectedEntity.description = '<table class="cesium-infoBox-defaultTable"><tbody>' +
        //      '<tr><th>'+jasonTest+'</th><td>' + pickedFeature.getProperty('BIN') + '</td></tr>' +
        //      '<tr><th>DOITT ID</th><td>' + pickedFeature.getProperty('DOITT_ID') + '</td></tr>' +
        //      '<tr><th>SOURCE ID</th><td>' + pickedFeature.getProperty('SOURCE_ID') + '</td></tr>' +
        //     '</tbody></table>';
      
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
  
    $(".box_nav li").on("click", function () {
        var index = $(this).index()
        $(this).addClass("index").siblings().removeClass("index")
        $(".nav1 li").eq(index).addClass("index").siblings().removeClass("index")
    })
} 


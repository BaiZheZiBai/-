
infobox()
function infobox() {

    var viewer = globe.viewer;

// console.log(viewer);

    var selectedEntity = new Cesium.Entity();


    var clickHandler = viewer.screenSpaceEventHandler.getInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);


    viewer.screenSpaceEventHandler.setInputAction(function onLeftClick(movement) {
        // console.log(this);

        var pickedFeature = viewer.scene.pick(movement.position);
        if (!Cesium.defined(pickedFeature)) {
            clickHandler(movement);
            return;
        }
        var featureName = pickedFeature.id;
        selectedEntity.name = featureName;
        selectedEntity.description = 'Loading <div class="cesium-infoBox-loading"></div>';
        viewer.selectedEntity = selectedEntity;
        // selectedEntity.description = '<table class="cesium-infoBox-defaultTable"><tbody>' +
        //      '<tr><th>'+jasonTest+'</th><td>' + pickedFeature.getProperty('BIN') + '</td></tr>' +
        //      '<tr><th>DOITT ID</th><td>' + pickedFeature.getProperty('DOITT_ID') + '</td></tr>' +
        //      '<tr><th>SOURCE ID</th><td>' + pickedFeature.getProperty('SOURCE_ID') + '</td></tr>' +
        //     '</tbody></table>';
        selectedEntity.description=`<div class="kink" id="kkk" onclick="alert(111)">1111111111</div>`;
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

}



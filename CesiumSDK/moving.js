var movingThisTower;
globe.viewer.screenSpaceEventHandler.setInputAction(function onMouseMove(movement) {
    pickedFeature = globe.viewer.scene.pick(movement.endPosition);

    if (!Cesium.defined(pickedFeature)) {
        if (movingThisTower) {
            movingThisTower.primitive.color = { red: 1, green: 1, blue: 1, alpha: 1 };
            movingThisTower.primitive.colorBlendMode = 0;
        }
        return;
    }
    // console.log(pickedFeature)
    if (typeof (pickedFeature.id) == 'string') {
        if (pickedFeature.primitive) {

            movingThisTower = pickedFeature;
            movingThisTower.primitive.colorBlendMode = 2;
            movingThisTower.primitive.color = colorToCesium("#ffcc00");            
            
        }

    }
}, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

function colorToCesium(colorValue){
    //#ffcc00
    var sred=colorValue.substring(1,3);
    var sgreen=colorValue.substring(3,5);
    var sblue=colorValue.substring(5,7);
    sred=parseInt(sred,16).toString(10);
    sgreen=parseInt(sgreen,16).toString(10);
    sblue=parseInt(sblue,16).toString(10);

    return { red: sred/255, green: sgreen/255, blue: sblue/255, alpha: 1 };
}
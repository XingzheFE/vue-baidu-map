const checkMap = function ( mapObj ) {
    let result = false;
    if (
        window.BMap !== undefined &&
        window.BMap.Map &&
        window.BMap.Map instanceof Function &&
        window.BMap.Size &&
        window.BMap.Size instanceof Function &&
        BMap.Point &&
        BMap.Point instanceof Function &&
        BMap.Polyline &&
        BMap.Polyline instanceof Function &&
        BMap.Marker &&
        BMap.Marker instanceof Function
    ) {
        if ( mapObj !== undefined ) {
            if ( typeof mapObj === "object" &&
                mapObj instanceof window.BMap.Map
            ) {
                result = true;
            }
        } else {
            result = true;
        }
    } else {
        // TODO
    }
    return result;
};

export default checkMap;
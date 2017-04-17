const BMapDrawer = {};

/**
 * 绘制 marker
 * @param {Array} points marker配置项数组
 * @param {Object} map
 * @returns {*}
 */
function drawMarker ( points, map) {
    //TODO
    if (!(BMap &&
        BMap.Size &&
        BMap.Point
    )) {
        console.warn("[BMap] BMap对象未初始化");
        return [];
    }

    if (!points) {
        return [];
        throw new Error("drawMarker 的 markers 参数不能为空！");
    }
    if (points.length < 1) {
        return [];
        console.warn("drawMarker 的 markers 参数不能为空数组！");
    }
    if (!map) {
        //return false;
        throw new Error("drawMarker 的 map 参数不能为空！");
    }

    const iconOrigin = new BMap.Icon("http://cdn.bi-ci.com/img/lushu/origin.png", new BMap.Size(32, 48), {
        imageSize: new BMap.Size(24, 36),
        imageOffset: new BMap.Size(4, 4), // 设置图片偏移
        anchor: new BMap.Size(12, 36)
    });
    let markers = [];
    for (let item of points) {
        let zIndex = undefined;
        if (!item.position) {
            console.warn("[BMap] marker.position undefined!");
            continue;
        }
        if (!item.position.lng ||
            !item.position.lat) {
            console.warn("[BMap] marker.position.lng/marker.position.lng undefined!");
            continue;
        }
        if (item.zIndex && !isNaN( item.zIndex )) {
            zIndex = item.zIndex;
        }

        let pointObj = new BMap.Point(item.position.lng, item.position.lat);
        let icon = undefined;

        let conf = item.config;
        let c = {};

        if (conf.imageSize) c.imageSize = new BMap.Size(conf.imageSize.x, conf.imageSize.y);
        if (conf.imageSize) c.imageOffset = new BMap.Size( (conf.size.x - conf.imageSize.x)/2, (conf.size.y - conf.imageSize.y)/2 );
        if (conf.anchor) c.anchor = new BMap.Size(conf.anchor.x, conf.anchor.y);

        let size = new BMap.Size(conf.size.x, conf.size.y);
        icon = new BMap.Icon(conf.img, size, c);

        let marker = new BMap.Marker(pointObj, { icon: icon || iconOrigin});
        if ( zIndex !== undefined ) marker.setZIndex( zIndex );
        map.addOverlay(marker);
        markers.push(marker);
    }
    return markers;
}

/**
 * 绘制 线条
 * @param {Array/Object} line， 推荐使用数组
 * @param {Object} map
 * @returns {*}
 */
function drawPolyLine ( line, map ) {
    const LINE_CONF = {
        strokeColor: "#32b1fb",
        strokeWeight: 4,
        strokeOpacity: 0.8
    };
    let lines = [];     // 存放绘制的polyline对象
    let points = [];    // setViewport需要
    if (!(BMap &&
        BMap.Size &&
        BMap.Point
    )) {
        console.warn("[BMap] BMap对象未初始化");
        return [];
    }

    if (!line) {
        // return false;
        throw new Error("[BMap] drawPolyLine 的 markers 参数不能为空！");
    }
    if (!map) {
        // return false;
        throw new Error("[BMap] drawPolyLine 的 map 参数不能为空！");
    }

    if (line instanceof Array) {
        //console.log()
        for (let _item of line) {
            if (_item.points === undefined ||
                !_item.points instanceof Array) {
                console.warn("[BMap] Polyline.points 必须是一维／二维数组！");
                continue;
            }
            if (_item.points.length === 0) {
                console.warn("[BMap] Polyline.points 是空数组！");
                continue;
            }
            if (_item.points[0] instanceof Object && _item.points[0].lng !== undefined && _item.points[0].lat !== undefined ) {
                let pointArr = _item.points.map(function (item, index, arr) {
                    item = new BMap.Point(item.lng, item.lat);
                    points.push(item);
                    return item;
                });
                let config = _item.config || LINE_CONF;
                let l = new BMap.Polyline(pointArr, config);
                map.addOverlay( l );
                lines.push( l );
            }
        }
        //map.setViewport(points);
    } else {
        if (!line.points instanceof Array) {
            console.warn("[BMap] Polyline.points 必须是一维／二维数组！");
            return [];
        }

        if (line.points === undefined ||
            line.points[0] === undefined) {
            console.warn("Polyline.points 是空数组！");
            return [];
        }

        if (line.points[0] instanceof Object) {
            let pointArr = line.points.map(function (item, index, arr) {
                item = new BMap.Point(item.lng, item.lat);
                points.push(item);
                return item;
            });
            let config = line.config || LINE_CONF;
            let l = new BMap.Polyline(pointArr, config);

            map.addOverlay( l );
            lines.push( l );
        }
        //map.setViewport(points);
    }
    return lines;
}

/**
 * 绘制地图位置标记 marker
 * @param point
 * @param map
 * @returns {*}
 */
function drawPoltMarker ( point, map ) {
    const iconOrigin = new BMap.Icon("http://cdn.bi-ci.com/img/lushu/origin.png", new BMap.Size(32, 48), {
        imageSize: new BMap.Size(24, 36),
        imageOffset: new BMap.Size(4, 4), // 设置图片偏移
        anchor: new BMap.Size(12, 36)
    });
    let pointObj = {};
    if (!map || !point) {
        return false;
        //throw new Error("drawPoltMarker 的 map 参数不能为空！");
    }
    if (typeof point !== "object") {
        throw new Error("drawPoltMarker 的 point 不是 Object！");
    }
    if (!point.position) {
        return false;
    }
    if (point.position.lng && point.position.lat) {
        pointObj = new BMap.Point(point.position.lng, point.position.lat)
    } else {
        pointObj = new BMap.Point(0, 0);
    }
    let icon = undefined;

    let conf = point.config;
    let c = {};

    if (conf.imageSize) c.imageSize = new BMap.Size(conf.imageSize.x, conf.imageSize.y);
    if (conf.imageSize) c.imageOffset = new BMap.Size( (conf.size.x - conf.imageSize.x)/2, (conf.size.y - conf.imageSize.y)/2 );
    if (conf.anchor) c.anchor = new BMap.Size(conf.anchor.x, conf.anchor.y);

    let size = new BMap.Size(conf.size.x, conf.size.y);
    icon = new BMap.Icon(conf.img, size, c);

    let marker = new BMap.Marker(pointObj, { icon: icon || iconOrigin});
    map.addOverlay(marker);

    return marker;
}

/**
 * 修改位置标记 marker
 * @param marker
 * @param poltMarker
 */
function setPoltMarkerPosition ( config, poltMarker ) {
    // TODO
    if ( !config ||
         !BMap ||
         !BMap.Point
    ) {
        return 0;
    }
    let point = new BMap.Point( config.position.lng, config.position.lat );
    if ( poltMarker ) {
        poltMarker.setPosition( point );
        return 1;
    } else {
        //console.log("[BMap draw] poltMarker not exist!");
        return -1;
    }
}

/**
 * 移除位置标记 marker
 * @param marker
 * @param map
 */
function removePoltMarker ( poltMarker, map) {
    // TODO
    if ( !map ||
        !poltMarker ) {
        return false;
    }
    try {
        map.removeOverlay( poltMarker );
        return true;
    } catch ( e ) {
        console.log( e )
    }
    return false;
}

//
//BMapDrawer.drawMarker = drawMarker;
//BMapDrawer.drawPolyLine = drawPolyLine;
//BMapDrawer.drawPoltMarker = drawPoltMarker;
//BMapDrawer.setPoltMarkerPosition = setPoltMarkerPosition;
//BMapDrawer.removePoltMarker = removePoltMarker;
//
//
//export default BMapDrawer;

export { drawMarker, drawPolyLine, drawPoltMarker, setPoltMarkerPosition, removePoltMarker }
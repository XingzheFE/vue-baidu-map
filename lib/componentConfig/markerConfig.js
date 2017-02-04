/*
 *   地图位置动态标记图标
 */
const poltMarkerConfig = {
    img: "http://cdn.bi-ci.com/vue_static/polt_marker.png",
    size: {x: 32, y: 42},
    imageSize: {x: 20, y: 25.25},
    anchor: {x: 16, y: 33.425} // 设置为 0 时 则图标的左上角指向坐标点
};

/*
 *   地图位置动态标记（灰色）图标
 */
const poltMarkerGrayConfig = {
    img: "http://cdn.bi-ci.com/vue_static/polt_marker_gray.png",
    size: {x: 32, y: 42},
    imageSize: {x: 20, y: 25.25},
    anchor: {x: 16, y: 33.425} // 设置为 0 时 则图标的左上角指向坐标点
};


/*
 *   地图位置动态标记（红色）图标
 */
const poltMarkerRedConfig = {
    img: "http://cdn.bi-ci.com/vue_static/polt_marker_red.png",
    size: {x: 32, y: 42},
    imageSize: {x: 20, y: 25.25},
    anchor: {x: 16, y: 33.425} // 设置为 0 时 则图标的左上角指向坐标点
};

/*
 *   路线起始点标记图标
 */
const originMarkerConfig = {
    img: "http://cdn.bi-ci.com/vue_static/marker_origin.png",
    size: {x: 32, y: 32},
    imageSize: {x: 24, y: 24},
    anchor: {x: 16, y: 16} // 设置为 0 时 则图标的左上角指向坐标点
};

/*
 *   路线终点标记图标
 */
const destMarkerConfig = {
    img: "http://cdn.bi-ci.com/vue_static/marker_dest.png",
    size: {x: 32, y: 32},
    imageSize: {x: 24, y: 24},
    anchor: {x: 16, y: 16} // 设置为 0 时 则图标的左上角指向坐标点
};

/*
 *   赛段起始点标记图标
 */
const segmentOriginMarkerConfig = {
    img: "http://cdn.bi-ci.com/vue_static/segment_origin.png",
    size: {x: 32, y: 32},
    imageSize: {x: 24, y: 24},
    anchor: {x: 16, y: 16} // 设置为 0 时 则图标的左上角指向坐标点
};

/*
 *   赛段终点标记图标
 */
const segmentDestMarkerConfig = {
    img: "http://cdn.bi-ci.com/vue_static/segment_dest.png",
    size: {x: 32, y: 32},
    imageSize: {x: 24, y: 24},
    anchor: {x: 16, y: 16} // 设置为 0 时 则图标的左上角指向坐标点
};

/*
 *   地图位置动态标记（红色）SVG 图标
 */
const poltMarkerRedSVGConfig = {
    img: "http://cdn.bi-ci.com/vue_static/waypointRed.svg",
    size: {x: 32, y: 42},
    imageSize: {x: 30, y: 38},
    anchor: {x: 16, y: 40} // 设置为 0 时 则图标的左上角指向坐标点
};

/*
 *   地图位置动态标记（灰色）SVG 图标
 */
const poltMarkerGraySVGConfig = {
    img: "http://cdn.bi-ci.com/vue_static/waypointGray.svg",
    size: {x: 32, y: 42},
    imageSize: {x: 30, y: 38},
    anchor: {x: 16, y: 40} // 设置为 0 时 则图标的左上角指向坐标点
};

/*
 *   地图位置动态标记（红色）图标
 */
const originMarkerSVGConfig = {
    img: "http://cdn.bi-ci.com/vue_static/origin.svg",
    size: {x: 32, y: 42},
    imageSize: {x: 30, y: 38},
    anchor: {x: 16, y: 40} // 设置为 0 时 则图标的左上角指向坐标点
};


/*
 *   地图位置动态标记（红色）图标
 */
const destMarkerSVGConfig = {
    img: "http://cdn.bi-ci.com/vue_static/dest.svg",
    size: {x: 32, y: 42},
    imageSize: {x: 30, y: 38},
    anchor: {x: 16, y: 40} // 设置为 0 时 则图标的左上角指向坐标点
};


/*
 *   路线起始点标记图标
 */
const poltCircleMarkerSVGConfig = {
    img: "http://cdn.bi-ci.com/vue_static/poltMarkerSVG.svg",
    size: {x: 32, y: 32},
    imageSize: {x: 18, y: 18},
    anchor: {x: 16, y: 16} // 设置为 0 时 则图标的左上角指向坐标点
};



export { poltMarkerConfig, poltMarkerGrayConfig, poltMarkerRedConfig, originMarkerConfig, destMarkerConfig, segmentOriginMarkerConfig, segmentDestMarkerConfig, poltMarkerRedSVGConfig, poltMarkerGraySVGConfig, originMarkerSVGConfig, destMarkerSVGConfig, poltCircleMarkerSVGConfig }

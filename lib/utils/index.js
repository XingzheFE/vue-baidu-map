/**
 * 导出vue-baidu-map 工具方法集合
 */
import init from "./init.js";
import load from "./load.js";
import checkMap from "./checkMap.js";
import { drawMarker, drawPolyLine, drawPoltMarker, setPoltMarkerPosition, removePoltMarker } from "./draw.js";

export default {
    init: init,
    load: load,
    isReady: checkMap,
    checkMap: checkMap,
    drawMarker: drawMarker,
    drawPolyLine: drawPolyLine,
    drawPoltMarker: drawPoltMarker,
    removePoltMarker: removePoltMarker,
    setPoltMarkerPosition: setPoltMarkerPosition
}
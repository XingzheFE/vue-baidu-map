import load from "utils/load.js";
import map from "overlay/map.vue";
import mapMarker from "overlay/marker.vue";
import mapPolyline from "overlay/polyline.vue";
import infoWindow from "overlay/infoWindow.vue";
import controllerBox from "controller/controllerBox.vue";
// import zoomController from "./controllers/zoomController.vue";
// import toggleTypeController from "./controllers/toggleTypeController.vue";
import fullScreenController from "controller/fullScreenController.vue";
// import localSearchController from "./controllers/localSearchController.vue";
// import locateController from "./controllers/locateController.vue";

// export { load, map, mapMarker, mapPolyline, mapInfoWindow, controllerBox, zoomController, toggleTypeController, fullScreenController, localSearchController, locateController };
export { load, map, mapMarker, mapPolyline, infoWindow, controllerBox, fullScreenController };
// 尽可能保持API不变化

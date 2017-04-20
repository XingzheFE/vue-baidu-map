import load from "utils/load.js";
import map from "overlay/map.vue";
import mapMarker from "overlay/marker.vue";
import mapPolyline from "./overlays/polyline.vue";
import infoWindow from "./overlays/infoWindow.vue";
import controllerBox from "./controllers/controllerBox.vue";
// import zoomController from "./controllers/zoomController.vue";
// import toggleTypeController from "./controllers/toggleTypeController.vue";
// import fullScreenController from "./controllers/fullScreenController.vue";
// import localSearchController from "./controllers/localSearchController.vue";
// import locateController from "./controllers/locateController.vue";

// export { load, map, mapMarker, mapPolyline, mapInfoWindow, controllerBox, zoomController, toggleTypeController, fullScreenController, localSearchController, locateController };
export { load, map, mapMarker, mapPolyline, infoWindow, controllerBox };
// 尽可能保持API不变化

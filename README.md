# vue-baidu-map
A vue component based on Vue.js@1.0.

## install

```bash
npm install vue1-baidu-map
```

## usage


```javascript
import { load, map, mapMarker, mapPolyline, mapInfoWindow, zoomController, fullScreenController, toggleTypeController, localSearchController, controllerBox } from "vue-baidu-map";

load( { key: "[your key]", version: "2.0" } );

components: {
    "b-map": map,
    "b-box": controllerBox,
    "b-marker": mapMarker,
    "b-poltmarker": mapMarker,
    "b-polyline": mapPolyline,
    "b-infowindow": mapInfoWindow,
    "b-zoom": zoomController,
    "b-type": toggleTypeController,
    "b-search": localSearchController,
    "b-fullscreen": fullScreenController,
}
```

```html
<b-map
    :center="mapConfig.center"
    :zoom="mapConfig.zoom"
    :return-map="true"
    :context-menu="mapContextMenu"
    :location="true"
    @b-rightclick="mapRightClickCallback"
>
    <!-- marker -->
    <b-poltmarker
        :config="chart.poltMarker.config"
        :position.sync="chart.poltMarker.position"
        :visible.sync="chart.poltMarker.visible"
        :z-index="9"
    ></b-poltmarker>

    <!-- marker -->
    <b-marker
        v-for="item in markerConfigList"
        :config="item.config"
        :position.sync="item.position"
        :label="item.label"
        :bind-info-window="item.infoWindowId"
        :enable-dragging="item.enableDragging"
        :cid="item.cid"
        :context-menu="markerContextMenu"
        @b-click="markerClickCallback"
        @b-dragend="markerDragendCallback"
    ></b-marker>

    <!--infowindow content start-->
    <b-infowindow
        :id="123"
        :visible="false"
    >
        <div class="infowindow-box">
            <p>text</p>
        </div>
    </b-infowindow>
    <!--infowindow content end-->


    <b-polyline
        v-for="item in polylineConfigList"
        :points="item.points"
        :config="item.config"
        :cid="item.cid"
        @b-mousedown="polylineMousedownCallback"
    ></b-polyline>

    <!-- custom controls box -->
    <b-box-->
        :position="{
            x: 0,
            y: 15
        }"
    >
        <div>
            text
        </div>
    </b-box>

    <!-- search in the map -->    
    <b-search
        :position="{
            x: 20,
            y: 15
        }"
    ></b-search>

    <!-- toggle map type -->
    <b-type
        :position="{
            x: -10,
            y: 15
        }"
    ></b-type>

    <!-- zoom -->    
    <b-zoom
        :position="{
            x: -10,
            y: 53
        }"
    ></b-zoom>

    <!-- fullscreen -->    
    <b-fullscreen
        :position="{
            x: -10,
            y: 119
        }"
    ></b-fullscreen>
</b-map>
```
[示例 | Demo with a lot of features](./example)

[Created by XingzheFE](http://www.imxingzhe.com/lushu/)

#Join us && make it better#

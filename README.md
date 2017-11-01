# vue-baidu-map
if you wanna create map easily，try [plain-js](https://github.com/XingzheFE/plain)
## install

*NOTICE*  
> 2.0 is different , `b-map` `b-infowindow` `b-marker`



```bash
npm install vue1-baidu-map
```

## usage


```javascript
import { load, map, mapMarker, mapPolyline, mapInfoWindow, zoomController, fullScreenController, toggleTypeController, localSearchController, controllerBox } from "vue-baidu-map";

load( { key: "[your key]", version: "2.0" } );
components: {
    "b-map": map,
    "b-marker": mapMarker,
    "b-box": controllerBox,
    "b-polyline": mapPolyline,
    "b-infowindow": infoWindow,
    "b-zoom": zoomController,
    "b-type": toggleTypeController,
    "b-search": localSearchController,
    "b-fullscreen": fullScreenController,
    "b-locate": locateController,
}
```

```html
<b-map
    :center="mapConfig.center"
    :zoom="mapConfig.zoom"
    :return-map="true"
    :context-menu="mapContextMenu"
    :location="true"
    :enable-scroll-wheel-zoom="true"
    :enable-high-accuracy="false"
    :map-ready="mapReady"
    :locate-succeed="locateSucceed"
    :locate-failed="locateFailed"
    @b-rightclick="mapRightClickCallback"
>
    <b-search
        :position="{
            x: '10',
            y: '10'
        }"
    ></b-search>
    <b-infowindow
        :visible="location.visible"
        :size="{
            width: 220,
            height: 60
        }"
        :offset="{
            x: 0,
            y: -10
        }"
        :position.sync="location.position"
        @b-open="location.visible = true"
        @b-close="location.visible = false"
    >
        <h2>嘻嘻嘻 =,=</h2>
        <p>{{{ location.address }}}</p>
    </b-infowindow>
    <b-marker
        v-for="item in markerConfigList"
        :icon="item.config"
        :position.sync="item.position"
        :label="item.label"
        :enable-dragging="true"
        @b-click="markerClickCallback"
        @b-dragend="markerDragendCallback"
    ></b-marker>
    <b-polyline
        v-for="item in polylineConfigList"
        :points="item.points"
        :enable-editing="false"
        :style="{
            strokeColor: '#32b1fb',
            strokeWeight: 4,
            strokeOpacity: 1
        }"
        @b-lineupdate="lineUpdate"
    ></b-polyline>

    <!-- controller-section -->
    <b-fullscreen
        :position="{
            x: '-10',
            y: '10'
        }"
    ></b-fullscreen>
    <b-box
        :position="{
            x: '-0',
            y: '-0'
        }"
    >
        <button @click="addMarkers" type="button" name="button">添加五百个随机点</button>
    </b-box>
    <b-box
        :position="{
            x: '-0',
            y: '-20'
        }"
    >
        <button @click="changeLabel" type="button" name="button">修改label</button>
    </b-box>
    <b-box
        :position="{
            x: '-0',
            y: '-40'
        }"
    >
        <button @click="toggleInfoWindow" type="button" name="button">toggleInfoWindow</button>
    </b-box>
    <b-box
        :position="{
            x: '-0',
            y: '-60'
        }"
    >
        <button @click="addLine" type="button" name="button">添加Lines</button>
    </b-box>
    <b-locate
        :position="{
            x: '-10',
            y: '40'
        }"
        :enable-high-accuracy="true"
        :locate-succeed="locateSucceed"
        :locate-failed="locateFailed"
    ></b-locate>
    <b-zoom
        :position="{
            x: '-10',
            y: '70'
        }"
    ></b-zoom>
    <b-type
        :position="{
            x: '-10',
            y: '130'
        }"
    ></b-type>
</b-map>
```
[示例|Demo with a lot of features](./example)

[Created by XingzheFE](http://www.imxingzhe.com/lushu/)

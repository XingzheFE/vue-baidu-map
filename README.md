# vue-baidu-map
version 1.2.1 -
update: 2016.12.22

## usage

```javascript
import { load, map, mapMarker, mapPolyline, mapInfoWindow, zoomController, fullScreenController, toggleTypeController, localSearchController, controllerBox } from "components/public/vue-baidu-map";

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
    "hightchart": InlineChart,
    "modal-box": ModalBox
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
            <input v-model="pointData.title"  id="waypointTitle" class="form-control" type="text" placeholder="途经点标题">
            <textarea v-model="pointData.content"  id="waypointContent" class="" placeholder="途经点描述" maxlength="512" rows="5"></textarea>

            <div class="checkbox checkbox-slider-md checkbox-slider--b-flat">
                <label>
                    <input v-model="pointData.type"  id="waypointType" type="checkbox"><span>&nbsp;&nbsp;显示途径点</span>
                </label>
            </div>
            <div class="btn-group">
                <button id="savePointBtn"  @click="saveRoadbookPoint" class="btn bg-blue">保存</button>
                <button id="deletePointBtn" @click="deleteRoadbookPoint" class="btn">删除</button>
            </div>
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

    <!--自定义控件 box -->
    <b-box-->
        :position="{
            x: 0,
            y: 15
        }"
    >
        <div class="save-roadbook-box">
            <button class="btn btn-lg bg-blue save-roadbook">保存路书</button>
        </div>
    </b-box>

    <!--地图搜索控件 -->    
    <b-search
        :position="{
            x: 20,
            y: 15
        }"
    ></b-search>

    <!--地图风格切换控件（卫星图像、普通图像） -->
    <b-type
        :position="{
            x: -10,
            y: 15
        }"
    ></b-type>

    <!--地图缩放控件 -->    
    <b-zoom
        :position="{
            x: -10,
            y: 53
        }"
    ></b-zoom>

    <!--全屏控件 -->    
    <b-fullscreen
        :position="{
            x: -10,
            y: 119
        }"
    ></b-fullscreen>

    <!--其他控件，不使用b-box控件时可定义更灵活的样式 -->
    <div class="save-roadbook-box">
        <button v-show="polylineConfigList.length" @click="saveRoadbook" transition="t-save-roadbook-btn" class="btn btn-lg bg-blue save-roadbook">保存路书</button>
    </div>
    <div class="elevation-box">
        <div class="elevation-container">
            <div class="elevation-panel">
                <ul class="roadbook-info">
                    <li><label>路书类型：</label>{{ roadbookInfo.type }}</li>
                    <li><label>全程距离：</label>{{ roadbookInfo.distance }}公里</li>
                    <li><label>累计爬升：</label>{{ roadbookInfo.climbing }}米</li>
                </ul>
                <button @click="toggleElevationChart" v-bind:class="{ 'rotate-180': showElevationChart }" class="close-btn"><i class="icon-up iconfont"></i></button>
                <button>刷新</button>
            </div>
            <div v-bind:class="{'chart-toggle': !showElevationChart }" class="elevation-chart">
                    <hightchart
                        :poltmarker.sync="chart.poltMarker"
                        :chartdata="chart.chartData"
                    ></hightchart>
            </div>
        </div>
    </div>
</b-map>
```

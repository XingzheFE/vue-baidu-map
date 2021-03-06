<template>
    <div id="baidu-map-box" v-bind:class="{ 'map-fullscreen': status.isFullscreen }">
        <div v-el:map class="vue-baidu-map"></div>
        <slot></slot>
    </div>
</template>

<script>
    import init from "./../utils/init";
    import checkMap from "./../utils/checkMap";
    import bindEvent from '../utils/bindEvent';
    import bindContextMenu from '../utils/bindContextMenu';
    import Loading from "utils/loadingAnimation";
    import "style/loadingAnimation.css";
    import _log from "utils/log.js";
    import { createPoint, createLabel, createIcon } from "utils/factory";


    const props = {
        center:{
            required: false,        // 北京
            twoWay: false,
            type: Object
        },
        zoom: {
            required: false,        // 5
            twoway: false,
            type: Number
        },
        usewatch: {                 // FIXME: do we need this ?
            required: false,
            twoway: false,
            type: Boolean,
            default: true
        },
        mapReady: {                 // 地图组件初始成功后的回调函数
            required: false,
            twoway: false,
            type: Function
        },
        contextMenu: {
            required: false,
            type: Array,
            twoway: false,
            default: undefined
        },
        location: {             // 初始化时是否自动定位
            required: false,
            type: Boolean,
            twoway: false,
            default: false
        },
        locateSucceed: {
            required: false,
            twoway: false,
            type: Function,
        },
        locateFailed: {
            required: false,
            twoway: false,
            type: Function,
        },
        enableScrollWheelZoom: {
            required: false,
            type: Boolean,
            twoway: false,
            default:false
        },
        enableHighAccuracy: {
            required: false,
            type: Boolean,
            twoway: false,
            default: false,
        }
    };

    const eventList = [
        "click",
        "dblclick",
        "rightclick",
        "rightdblclick",
        "maptypechange",
        "mousemove",
        "mouseover",
        "mouseout",
        "movestart",
        "moving",
        "moveend",
        "zoomstart",
        "zoomend",
        "addoverlay",
        "addcontrol",
        "removecontrol",
        "removeoverlay",
        "clearoverlays",
        "dragstart",
        "dragging",
        "dragend",
        "addtilelayer",
        "removetilelayer",
        "load",
        "resize",
        "hotspotclick",
        "hotspotover",
        "hotspotout",
        "tilesloaded",
        "touchstart",
        "touchmove",
        "touchend",
        "longpress"
    ];


    export default {
        props: props,
        data: function () {
            return {
                componentType: "bmap",
                mapTypeName: "卫星图像",
                $map: undefined,                            // 同下
                $overlay: undefined,
                $contextMenu: undefined,
                status: {
                    isFullscreen: false,                        // 默认不启用全屏地图
                }
            }
        },
        ready () {
            let _this = this;
            _this.LOADING = new Loading("#baidu-map-box");
            _this.LOADING.show();
            if (!checkMap()){
                window['vue_baidu_map_initialize_callback_fn'] = function () {
                    _this.createMap();                                          // 这种写法只能初始化一个map组件
                    window['vue_baidu_map_initialize_callback_fn'] = null;
                }
            } else {
                _this.createMap();
            }
        },
        beforeDestroy (){
            this.removeMap();
        },
        watch: {
            "contextMenu": {
                handler: function (val) {
                    bindContextMenu.call(this);
                },
                deep: true
            },
            "enableScrollWheelZoom": {
                handler (val) {
                    let { $map } = this;
                    if ($map) {
                        val ? $map.enableScrollWheelZoom() : $map.disableScrollWheelZoom();
                    }
                },
                deep: false
            }
        },
        methods: {
            createMap () {
                let { contextMenu, mapReady } = this;
                this.$map = this.$overlay = new BMap.Map(this.$els.map);
                init.call(this);
                contextMenu && bindContextMenu.call(this);
                eventList && bindEvent.call(this, eventList);
                mapReady && mapReady(this);
                this.$emit('ready');
            },
            removeMap () {
                let { $overlay } = this;
                if ($overlay) {
                    $overlay.clearoverlays();
                    this.$overlay = this.$map = null;
                    if (process.env.NODE_ENV === "development")
                        _log("[vue-baidu-map] delete map!");
                    // delete window.BMap; FIXME
                }
                // FIXME: remove $map $overlay
            },
            setViewport (points, viewportOptions) {
                if (this.$overlay && checkMap()) {
                    let pointsArr = points.map(function (item, index, arr) {
                        return createPoint(item);
                    });
                    this.$overlay.setViewport(pointsArr, viewportOptions);
                }
            },
        },
    }
</script>

<style lang="sass-loader" scoped>
    @import "../style/_var.scss";

    * {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
    }
    #baidu-map-box {
        position: relative;
        width: 100%;
        height: 100%;
    }
    .vue-baidu-map {
        width: 100%;
        height: 100%;
        background-color: #ffffff;
    }
    .map-fullscreen {
        position: fixed !important;
        z-index: 999;
        top: 0;
        left: 0;
        width: 100% !important;
        height: 100% !important;
    }
</style>
<style lang="sass-loader">
    @import "../style/icon.scss";
    @import "../style/_var.scss";

    /** 右键菜单 */
    .BMap_contextMenu {
        box-shadow: rgba(0, 0, 0, 0.468) 0.3px 1px 4px -1px !important;
        border: none !important;
        span {
            color: #222 !important;
            &:hover {
                 color: $color-blue !important;
             }
        }
    }
</style>

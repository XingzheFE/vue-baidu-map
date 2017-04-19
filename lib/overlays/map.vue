<template>
    <div id="baidu-map-box" v-bind:class="{ 'map-fullscreen': isFullscreen }">
        <div v-el:map class="vue-baidu-map"></div>
        <slot></slot>
    </div>
</template>

<script>
    import checkMap from "./../utils/checkMap";
    import init from "./../utils/init.js";
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
        callback: {                 // 地图组件初始成功后的回调函数
            required: false,
            twoway: false,
            type: Function
        },
        returnMap: {               // 是否通知父组件map创建完成并返回该组件
            required: false,
            twoway: false,
            type: Boolean,
            default: false
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
        enableScrollWheelZoom: {
            required: false,
            type: Boolean,
            twoway: false,
            default:false
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
                $overlay: undefined,
                mapHooks: [],                               // 地图创建完成后调用其存放的函数
                isFullscreen: false,                        // 默认不启用全屏地图
                infoWindowList: {}                          // infoWindow 组件列表
            }
        },
        ready () {
            let _this = this;
            _this.LOADING = new Loading( "#baidu-map-box" );
            _this.LOADING.show();
            if ( !checkMap() ){
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
                handler: function ( val ) {
                    bindContextMenu( this, this.$overlay );
                },
                deep: true
            }
        },
        methods: {
            createMap: function () {
                let _this = this;
                this.$map = this.$overlay = new BMap.Map( _this.$els.map );
                init.call( _this );
                bindContextMenu.call( _this );
                _this.$emit('ready');
            },
            removeMap: function () {
                if ( this.$overlay ) {
                    if ( process.env.NODE_ENV === "development" )
                        _log( "[vue-baidu-map] delete map!");
                    // delete window.BMap; FIXME
                }
                // FIXME: remove $map $overlay
            },
            // setMapHooks: function ( fn ) {
            //     this.mapHooks.push( fn );
            // },
            // runMapHooks: function () {
            //     this.mapHooks.map( ( item ) => {
            //         try{
            //             item();
            //         } catch ( exp ) {
            //             _log( exp );
            //         }
            //     })
            // }
        },
        components: {},
        events: {
            // 子组件派发事件，询问是否可以注册 vue-baidu-map 地图组件
            "vue-baidu-map-register-component": function ( component ) {
                if ( this.$overlay && checkMap() ) {
                    component.$emit( "vue-baidu-map-ready", this );
                } else {
                    //TODO
                }
            },
            // 根据提供的地理区域或坐标设置地图视野，调整后的视野会保证包含提供的地理区域或坐标
            "vue-baidu-map-set-viewport": function ( points, viewportOptions ) {
                if ( this.$overlay && checkMap() ) {
                    let pointsArr = points.map( function ( item, index, arr ) {
                        return new BMap.Point( item.lng, item.lat );
                    });
                    setTimeout( () => {
                        this.$overlay.setViewport( pointsArr, viewportOptions );
                    }, 50);
                } else {
                    this.setMapHooks( () => {
                        let pointsArr = points.map( function ( item, index, arr ) {
                            return new BMap.Point( item.lng, item.lat );
                        });
                        setTimeout( () => {
                            this.$overlay.setViewport( pointsArr, viewportOptions );
                        }, 50);
                    })
                }
            },
            // 注册 infowindow
            "register-infowindow": function ( $infowindow ) {
                this.infoWindowList[$infowindow.id] = $infowindow;
            }
        }
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

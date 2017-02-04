<template>
    <div id="baidu-map-box" v-bind:class="{ 'map-fullscreen': isFullscreen }">
        <div v-el:map class="vue-baidu-map"></div>
        <!--slot for other components-->
        <slot></slot>
    </div>
</template>

<script>
    import checkMap from "./../utils/checkMap.js";
    import init from "./../utils/init.js";
    import bindEvent from '../utils/bindEvent';
    import bindContextMenu from '../utils/bindContextMenu';
    import Loading from "./../utils/loadingAnimation";
    import "./../utils/loadingAnimation.css";

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
                mapObj: undefined,
                mapHooks: [],                               // 地图创建完成后调用其存放的函数
                isFullscreen: false,                        // 默认不启用全屏地图
                infoWindowList: {}                          // infoWindow 组件列表
            }
        },
        ready: function () {
            let _this = this;
            _this.LOAD = new Loading( "#baidu-map-box" );
            _this.LOAD.show();
            if ( !checkMap() ){
                window['vue_baidu_map_initialize_callback_fn'] = function () {
                    _this.createMap();                                    // 这种写法只能初始化一个map组件
                }
            } else {
                _this.createMap();
            }
        },
        detached: function () {
            this.deleteMap();
        },
        destroyed: function () {
            this.deleteMap();
        },
        watch: {
            "contextMenu": {
                handler: function ( val ) {
                    bindContextMenu( this, this.mapObj );
                },
                deep: true
            }
        },
        methods: {
            createMap: function () {
                let _this = this;
                _this.mapObj = new BMap.Map( _this.$els.map );
                if ( process.env.NODE_ENV === "development" ) console.log( "[vue-baidu-map] create map!");
                init( _this, _this.mapObj );
                _this.runMapHooks();
                _this.$broadcast( "vue-baidu-map-ready", _this );           // 通知子组件地图初始化完成，可以开始创建地图组件
                _this.runMapHooks();
                if ( _this.callback ) {
                    _this.callback( _this.mapObj );                         // 地图初始化后回调函数，传入地图对象
                }
                bindEvent( this, this.mapObj, eventList );
                bindContextMenu( this, this.mapObj );
            },
            deleteMap: function () {
                if ( this.mapObj ) {
                    if ( process.env.NODE_ENV === "development" ) console.log( "[vue-baidu-map] delete map!");
                    delete window.BMap;
                }
            },
            setMapHooks: function ( fn ) {
                this.mapHooks.push( fn );
            },
            runMapHooks: function () {
                this.mapHooks.map( ( item ) => {
                    try{
                        item();
                    } catch ( exp ) {
                        console.log( exp );
                    }
                })
            }
        },
        components: {},
        events: {
            // 子组件派发事件，询问是否可以注册 vue-baidu-map 地图组件
            "vue-baidu-map-register-component": function ( component ) {
                if ( this.mapObj && checkMap() ) {
                    component.$emit( "vue-baidu-map-ready", this );
                } else {
                    //TODO
                }
            },
            // 根据提供的地理区域或坐标设置地图视野，调整后的视野会保证包含提供的地理区域或坐标
            "vue-baidu-map-set-viewport": function ( points, viewportOptions ) {
                if ( this.mapObj && checkMap() ) {
                    let pointsArr = points.map( function ( item, index, arr ) {
                        return new BMap.Point( item.lng, item.lat );
                    });
                    setTimeout( () => {
                        this.mapObj.setViewport( pointsArr, viewportOptions );
                    }, 50);
                } else {
                    this.setMapHooks( () => {
                        let pointsArr = points.map( function ( item, index, arr ) {
                            return new BMap.Point( item.lng, item.lat );
                        });
                        setTimeout( () => {
                            this.mapObj.setViewport( pointsArr, viewportOptions );
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

<style lang="scss" scoped>
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
<style lang="scss">
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
    /** Loading animation */
    .loading-animation-1-0-1 * {
        box-sizing: border-box;
    }
    .loading-animation-1-0-1 {
        display: none;
        z-index: 999;
        pointer-events: none;
        box-sizing: border-box;
        position: absolute;
        margin: auto;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100px;
        height: 100px;
        padding: 0;
        background: #3a3c3f;
        background: rgba( 0,0,0,0.65);
        border-radius: 3px;
        text-align: center;
        transition: all 0.15s ease;
        .circle {
            position: relative;
            width: 45px;
            height: 45px;
            margin: 17px auto 5px auto;
            border: 5px solid #fff;
            border-radius: 50%;
            animation: loading 2s infinite ;
            animation-timing-function: linear;
        }
        h3 {
            font-family: sans-serif;
            font-size: 15px;
            margin-top: 8px;
        }
    }
    @keyframes loading {
        0% {
            border-top: 5px solid #fff;
            border-left: 5px solid #fff;
            border-right: 5px solid #fff;
            border-bottom: 5px solid rgba(255,255,255,0);
            transform: rotate(45deg);
        }
        50% {
            border-top: 5px solid #fff;
            border-left: 5px solid #fff;
            border-right: 5px solid #fff;
            border-bottom: 5px solid rgba(255,255,255,0.4);
        }
        100% {
            border-top: 5px solid #fff;
            border-left: 5px solid #fff;
            border-right: 5px solid #fff;
            border-bottom: 5px solid rgba(255,255,255,0);
            transform: rotate(405deg);
        }
    }
</style>

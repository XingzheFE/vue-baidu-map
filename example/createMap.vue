<template>
    <div class="map-box" id="animation-box">
        <b-map
            :center="mapConfig.center"
            :zoom="mapConfig.zoom"
            :return-map="true"
            :context-menu="mapContextMenu"
            :location="true"
            :locate-succeed="location.succeedCallback"
            :locate-failed="location.failedCallback"
            :enable-scroll-wheel-zoom="true"
            @b-rightclick="mapRightClickCallback"
        >
            <!-- 定位信息 start -->
            <b-infowindow
                :id="124"
                :visible.sync="location.visible"
                :size="{
                    width: 220,
                    height: 60
                }"
                :position.sync="location.position"
            >
                <p>{{{ location.address }}}</p>
            </b-infowindow>
            <b-marker
                :position.sync="location.position"
                :bind-info-window="124"
                :visible.sync="location.visible"
            ></b-marker>
            <!-- 定位信息 end -->

            <b-poltmarker
                v-for="item in poltMarker"
                :config="item.config"
                :position.sync="item.position"
                :visible.sync="item.visible"
                :bind-info-window="123"
                :z-index="9"
            ></b-poltmarker>
            <b-marker
                v-for="item in markerConfigList"
                :config="item.config"
                :position.sync="item.position"
                :label="item.label"
                :bind-info-window="item.infoWindowId"
                :enable-dragging="true"
                :cid="item.cid"
                :context-menu="markerContextMenu"
                @b-click="markerClickCallback"
                @b-dragend="markerDragendCallback"
            ></b-marker>
            <b-infowindow
                :id="123"
                :visible="false"
            >
                <!--infowindow content start-->
                <p>infoWindow</p>
                <!--infowindow content end-->

            </b-infowindow>
            <b-polyline
                v-for="item in polylineConfigList"
                :points="item.points"
                :config="item.config"
                :cid="item.cid"
                @b-mousedown="polylineMousedownCallback"
            ></b-polyline>
            <b-search
                :position="{
                    x: 20,
                    y: 15
                }"
            ></b-search>
            <b-type
                :position="{
                    x: -10,
                    y: 15
                }"
            ></b-type>
            <b-zoom
                :position="{
                    x: -10,
                    y: 53
                }"
            ></b-zoom>
            <b-fullscreen
                :position="{
                    x: -10,
                    y: 119
                }"
            ></b-fullscreen>
            <b-locate
                :position="{
                    x: -10,
                    y: 157
                }"
            ></b-locate>
        </b-map>
        <!--vue-baidu-map end-->
    </div>
</template>
<script>
    import Loading from '../lib/utils/loadingAnimation.js';
    import { load, map, mapMarker, mapPolyline, mapInfoWindow, zoomController, fullScreenController, toggleTypeController, localSearchController, controllerBox, locateController } from "../lib/index.js";
    import { poltMarkerConfig } from "../lib/componentConfig/markerConfig";

    export default {
        data () {
            return {
                // 地图配置信息
                mapConfig: {                                // map 组件配置项
                    zoom: 5,
                    center: {
                        lat: 36,
                        lng: 103
                    }
                },
                // polyline 配置信息
                polylineConfig: {
                    strokeColor: "#FF0000",
                    strokeWeight: 5,
                    strokeOpacity: 1
                },
                location: {
                    position: {
                        lat: 0,
                        lng: 0
                    },
                    visible: false,
                    address: `<h4 style="font-size: 16px; color: #444;">你的位置</h4>`,
                    succeedCallback: undefined,
                    failedCallback: function () {
                        console.log( "error" );
                    }
                },
                poltMarker: [
                    {
                        position: {
                            lng: 118,
                            lat: 31
                        },
                        visible: true
                    },
                    {
                        position: {
                            lng: 100,
                            lat: 32
                        },
                        visible: true
                    },
                ],
                markerConfigList: [],                       // 需要绘制到 map 组件上的 marker 组件配置项
                polylineConfigList: [],                     // 需要绘制到 map 组件上的 polyline 组件配置项
                markerContextMenu: [],                      // marker 右键菜单配置项
                mapContextMenu: [],                         // map 右键菜单配置项
                $map: undefined,                            // 地图组件对象
            }
        },
        ready () {
            let _this = this;
            // 请使用自己的 key，此 key 为个人账号，每日使用次数有限
            load( { key: "hPKNosYElVbALMK2ySnseejdXN7y8nqT", version: "2.0" } );
            // map 右键菜单
            _this.mapContextMenu = [
                {
                    text: "创建起点",
                    callback: function ( e ) {
                        let point = {
                            config: poltMarkerConfig,
                            position: {
                                lng: e.lng,
                                lat: e.lat
                            },
                            label: {
                                text: "&nbsp;" + ( _this.markerConfigList.length + 1 ).toString() + "&nbsp;",
                                offset: {
                                    x: 28,
                                    y: -2
                                }
                            },
                            infoWindowId: 123,
                            cid: Math.random().toString()
                        };
                        _this.markerConfigList.push( point );
                        _this.mapContextMenu[0].text = "创建途经点";
                        _this.polylineConfigList.push({
                            points: [
                                {
                                    lng: 118,
                                    lat: 31
                                },
                                {
                                    lng: e.lng,
                                    lat: e.lat
                                }
                            ],
                            config: _this.polylineConfig
                        });
                    }
                },
                {
                    text: "清空地图",
                    callback: function ( e ) {
                        _this.markerConfigList = [];
                        _this.polylineConfigList = [];
                        _this.mapContextMenu[0].text = "创建起点";
                    }
                }
            ];

            // marker 右键菜单
            this.markerContextMenu = [
                {
                    text: "删除途经点",
                    callback: function ( e, ee, marker ) {
                        // this 指向marker对象
                        let $marker = _this.getVueComponent( marker );
                        let index = _this.getMarkerIndex( $marker );
                        if ( index !== -1 ) {
                            if ( index ===  0 ) {
                                // 删除第一个途经点
                                _this.markerConfigList.shift();
                                _this.polylineConfigList.shift();
                            } else if ( index === _this.markerConfigList.length - 1 ) {
                                // 删除最后一个途经点
                                _this.markerConfigList.pop();
                                _this.polylineConfigList.pop();
                            } else {
                                // 删除中间点并设置新的路径
                                _this.markerConfigList.splice( index, 1 );
                            }
                            if ( _this.markerConfigList.length === 0 ) {
                                _this.mapContextMenu[0].text = "创建起点";
                            }
                        } else {
                            alert( "删除失败，不存在该标记点" )
                        }
                    }
                }
            ];

            this.location.succeedCallback = function( res ) {
                console.log( res );
                _this.location.position = res.point;
                _this.location.visible = true;
                _this.location.address += `<p style="margin-top: 10px;font-size:14px;color:#333;">${res.address.city}-${res.address.district}-${res.address.street}</p>`;
            }
        },
        methods: {
            mapRightClickCallback () {

            },
            /** marker 左键点击事件 */
            markerClickCallback: function ( e, $marker ) {
                let index =  this.getMarkerIndex( $marker );
                console.log(  this.$map.$data.infoWindowList );
                console.log( $marker );
                let infowindow = this.$map.$data.infoWindowList[$marker.bindInfoWindow].componentObj;
            },

            /** marker 拖动结束事件 */
            markerDragendCallback: function ( e, $marker ) {
                let _this = this;
                let index = _this.getMarkerIndex( $marker );
                /** NOTICE: don't make a new position , maybe we do not need this */
                _this.markerConfigList[index].position.lat = e.point.lat;
                _this.markerConfigList[index].position.lng = e.point.lng;
                _this.polylineConfigList[index].points.splice(1, 1, e.point);
            },

            /** 获取 marker 在 markerArr 中的索引值 */
            getMarkerIndex: function ( $marker ) {
                let _index = -1;
                if ( $marker ) {
                    this.markerConfigList.map( function ( item, index ) {
                        // 判断 marker 组件的 position 配置项是否与 item.position 相同
                        if ( item.position === $marker.position ) {
                            _index = index;
                        }
                    });
                }
                return _index;
            },

            /** 获取 overlay 所在的 vue 组件 */
            getVueComponent: function ( overlayObj ) {
                let _this = this;
                let $component = undefined;
                if ( _this.$map && _this.$map.$children ) {
                    for ( let i = 0; i < _this.$map.$children.length; i++ ) {
                        if ( _this.$map.$children[i].mapComponentObj === overlayObj ) {
                            $component = _this.$map.$children[i];
                            break;
                        }
                    }
                }
                return $component;
            },
        },
        events: {
            "bmap-ready": function ( $map ) {
                if ( $map )  {
                    this.$map = $map;
                }
            }
        },
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
            "b-locate": locateController,
        }
    }
</script>
<style lang="sass-loader" scoped>
    .map-box {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
</style>
<style lang="sass-loader">
    html,
    body {
        width: 100%;
        height: 100%;
        * {
            padding: 0;
            margin: 0;
        }
    }
    #app {
        height: 70%;
        width: 100%;
    }
</style>

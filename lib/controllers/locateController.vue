<template>
    <div v-show="visible" class="controller-section" :style="styleObj">
        <button @click="locate" class="locate-btn" v-bind:class="{'location-animation': isLocating }"><i class="iconfont icon-location"></i></button>
    </div>
</template>
<script>
    import getControllerPosition from "utils/getControllerPosition";
    import _log from "utils/log.js";

    const props = {
        position: {
            required: true,
            twoway: false,
            type: Object
        },
        enableHighAccuracy: {
            required: false,
            twoway: false,
            type: Boolean,
            default: true
        },
        visible: {
            required: false,
            twoway: false,
            type: Boolean,
            default: true,
        },
        locateSucceed: {
            required: false,
            twoway: false,
            type: Function
        },
        locateFailed: {
            required: false,
            twoway: false,
            type: Function
        }
    };

    export default {
        props,
        data () {
            return {
                styleObj: {},
                isLocating: false,                  // 是否在定位中
                $geoLocation: undefined,
            }
        },
        ready () {
            let $map = this.$parent.$map;
            this.styleObj = getControllerPosition(this.position);
            $map ? this.addController() : this.$parent.$on("ready", this.addController);
        },
        beforeDestroy () {
            this.removeController();
        },
        methods: {
            addController () {
                let $map = this.$parent.$map;
                let $geoLocation = this.$geoLocation = new BMap.Geolocation();
            },

            removeController () {
                this.$geoLocation = null;
            },

            locate () {
                let _this = this;
                let { $parent, isLocating, $geoLocation, enableHighAccuracy, locateSucceed, locateFailed } = this;
                let $map = $parent.$map;
                if (isLocating || !$geoLocation) {
                    _log("定位中...")
                    return;
                };
                this.isLocating = true;
                $parent.LOADING.show();
                $geoLocation.getCurrentPosition( function( r ){
                    if( this.getStatus() == BMAP_STATUS_SUCCESS ){
                        $parent.currentLocation = {
                            lng: r.point.lng,
                            lat: r.point.lat
                        };
                        console.log(_this.locateSucceed);
                        locateSucceed && locateSucceed( r );
                        $map.centerAndZoom( r.point, 13 );
                    } else {
                        alert( "定位失败" );
                        _log( 'locate failed' + this.getStatus() );
                        locateFailed && locateFailed();
                    }
                    $parent.LOADING.hide();
                    _this.isLocating = false;
                },{ enableHighAccuracy: enableHighAccuracy });
            }
        },
    }
</script>
<style lang="css" scoped>
    .controller-section {
        z-index: 2;
        position: absolute;
        overflow: hidden;
        width: 28px !important;
        height: 28px !important;
        color: #4d4d4d;
        box-shadow: rgba(0, 0, 0, 0.468) 0.3px 1px 4px -1px !important;
    }
    .locate-btn {
        display: block;
        width: 100%;
        height: 100%;
        line-height: 30px;
        cursor: pointer;
        color: inherit;
        border: none;
        background-color: #fff;
    }
    .location-animation {
        animation: 1.4s location-animation infinite ease-in-out;
    }
    @keyframes location-animation {
        0% {
            color: #4d4d4d;
        }
        50% {
            color: #288adb;
        }
        100% {
            color: #4d4d4d;
        }
    }
</style>

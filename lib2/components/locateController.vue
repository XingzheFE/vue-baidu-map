<template>
    <div v-show="visible" class="controller-section" :style="styleObj">
        <button @click="locate" class="locate-btn" v-bind:class="{'location-animation': isLocating }"><i class="iconfont icon-location"></i></button>
    </div>
</template>
<script>
    import controllerMixin from '../mixin/controllerMixin';

    export default {
        mixins: [controllerMixin],
        data () {
            return {
                isLocating: false
            }
        },
        methods: {
            locate () {
                let _this = this;
                if ( _this.mapObj && window.BMap && BMap.Geolocation ) {
                    let geolocation = new BMap.Geolocation();
                    _this.$map.LOAD.show();
                    _this.isLocating = true;
                    // _this.mapObj.
                    geolocation.getCurrentPosition( function( r ){
                        if( this.getStatus() == BMAP_STATUS_SUCCESS ){
                            _this.$map.currentLocation = {
                                lng: r.point.lng,
                                lat: r.point.lat
                            };
                            _this.mapObj.centerAndZoom( r.point, 13 );
                            if ( _this.$map.locateSucceed ) {
                                _this.$map.locateSucceed( r );
                            }
                            setTimeout( () => {
                                _this.$map.LOAD.hide();
                            }, 500);
                        } else {
                            alert( "定位失败" );
                            console.log( '[vue-baidu-map] locate failed' + this.getStatus() );
                            if ( _this.$map.locateFailed ) {
                                _this.$map.locateFailed();
                            }
                        }
                        setTimeout( () => {
                            _this.isLocating = false;
                        }, 2000);
                    },{ enableHighAccuracy: true });
                }
            }
        }
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

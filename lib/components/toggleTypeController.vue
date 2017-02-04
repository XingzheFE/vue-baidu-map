<!--notice
    removeController method is not existing
-->
<template>
    <div v-show="visible" class="controller-section" :style="styleObj" >
        <button @click="changeMapType" id="map-type-toggle">{{ mapTypeName }}</button>
    </div>
</template>
<script>
    import controllerMixin from '../mixin/controllerMixin';

    export default {
        mixins: [controllerMixin],
        data: function () {
            return {
                mapTypeName: "卫星图像"
            }
        },
        watch: {
            mapObj: {
                handler: function () {
                    if ( this.mapObj && this.mapObj.getMapType ) {
                        let type = this.mapObj.getMapType();
                        console.log( type )
                    }
                },
                deep: true
            }
        },
        methods: {
            changeMapType: function () {
                if ( this.mapTypeName === "普通地图" ) {
                    this.mapObj.setMapType( BMAP_NORMAL_MAP );
                    this.mapTypeName = "卫星图像";
                } else {
                    this.mapObj.setMapType( BMAP_HYBRID_MAP );
                    this.mapTypeName = "普通地图";
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
        width: 64px;
        height: 28px;
        /*box-shadow: rgba(0, 0, 0, 0.298039) 0px 1px 4px -1px;*/
        box-shadow: rgba(0, 0, 0, 0.468) 0.3px 1px 4px -1px !important;
    }
    #map-type-toggle {
        display: block;
        height: 28px;
        padding: 0 6px;
        outline: none;
        border: none;
        /*border: 1px solid #cdcdcd;*/
        background-color: #ffffff;
        color: #4d4d4d;
        font-size: 13px;
        cursor: pointer;
    }
</style>

<!--notice
    removeController method is not existing
-->
<template>
    <div v-show="visible" class="controller-section" :style="styleObj" >
        <button @click="changeMapType" id="map-type-toggle">{{ mapTypeName }}</button>
    </div>
</template>
<script>
import getControllerPosition from "utils/getControllerPosition";

const props = {
    position: {
        required: true,
        twoway: false,
        type: Object
    },
    visible: {
        required: false,
        twoway: false,
        type: Boolean,
        default: true
    },
};

export default {
    props,
    data () {
        return {
            mapTypeName: "卫星图像",
            styleObj: {}
        }
    },
    ready () {
        this.styleObj = getControllerPosition(this.position);
    },
    methods: {
        changeMapType () {
            let { $map } = this.$parent;
            if ( this.mapTypeName === "普通地图" ) {
                $map.setMapType( BMAP_NORMAL_MAP );
                this.mapTypeName = "卫星图像";
            } else {
                $map.setMapType( BMAP_HYBRID_MAP );
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
        width: 100%;
        padding: 0;
        outline: none;
        border: none;
        /*border: 1px solid #cdcdcd;*/
        overflow: hidden;
        white-space:nowrap;
        background-color: #ffffff;
        color: #4d4d4d;
        font-size: 13px;
        cursor: pointer;
    }
</style>

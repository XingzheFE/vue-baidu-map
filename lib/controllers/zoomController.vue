<template>
    <div v-show="true" class="controller-section" :style="styleObj" >
        <button @click="zoomIn" id="zoom-in">+</button>
        <button @click="zoomOut" id="zoom-out">-</button>
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
        data: function () {
            return {
                styleObj: {},
            }
        },
        ready () {
            this.styleObj = getControllerPosition(this.position);
        },
        methods: {
            zoomIn () {
                let _this = this;
                let { $map } = this.$parent;
                if ( $map ) {
                    $map.zoomTo($map.getZoom() + 1);
                }
            },
            zoomOut () {
                let _this = this;
                let { $map } = this.$parent;
                if ( $map ) {
                    $map.zoomTo($map.getZoom() - 1);
                }
            }
        },
    }
</script>
<style lang="css" scoped>
    .controller-section {
        z-index: 2;
        position: absolute;
        overflow: hidden;
        width: 28px;
        height: 56px;
        background: #fff;
        /*box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px;*/
        box-shadow: rgba(0, 0, 0, 0.468) 0.3px 1px 4px -1px !important;
    }
    #zoom-in,
    #zoom-out {
        position: absolute;
        display: block;
        left: 0;
        width: 28px;
        height: 28px;
        outline: none;
        /*border: 1px solid #cdcdcd;*/
        border: none;
        background-color: #ffffff;
        color: #4d4d4d;
        cursor: pointer;
        font-size: 18px;
        &:hover {
             color: #189adb;
         }
    }
    #zoom-in {
        top: 0;
        border-bottom: 1px solid rgba(0,0,0,0.15);
    }
    #zoom-out {
        top: 28px;
    }
</style>

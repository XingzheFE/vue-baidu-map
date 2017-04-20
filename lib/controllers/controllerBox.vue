<!--box ：放置自定义控件-->
<template>
    <div v-show="visible" class="controller-section" :style="styleObj">
        <slot></slot>
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
        callback: {
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
                // $controller: undefined,
            }
        },
        ready () {
            this.styleObj = getControllerPosition(this.position);
        },
    }
</script>
<style lang="css" scoped>
    .controller-section {
        z-index: 2;
        position: absolute;
        overflow: hidden;
        width: auto !important;
        height: auto !important;
    }
</style>

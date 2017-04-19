<template>
    <div class="component-section">
        <div v-el:window class="infowindow-box">
            <slot></slot>
        </div>
    </div>
</template>
<script>
    /**
     * FIXME: infowindow 在其他组件前会导致其他组件不渲染
     */
    import { createPoint, createSize } from "utils/factory";


    const props = {
        size: {
            required: false,
            type: Object,
            twoway: false
        },
        visible: {
            required: false,
            type: Boolean,
            twoway: false,
            default: false
        },
        position: {
            required: false,
            type: Object,
            twoway: false
        },
        offset: {
            required: false,
            type: Object,
            twoway: false,
            default () {
                return {
                    x: 0,
                    y: 0
                }
            }
        },
        enableAutoPan: {
            required: false,
            type: Boolean,
            twoway: false,
            default: false
        },
        enableCloseOnClick: {
            required: false,
            type: Boolean,
            twoway: false,
            default: false,             // 只能通过 visible 控制
        },
        enableMessage: {
            required: false,
            type: Boolean,
            twoway: false,
            default: false
        },
        message: String,
        title: String,
    };
    export default {
        props,
        data () {
            return {
                componentType: "infoWindow",
                $overlay: undefined
            }
        },
        ready () {
            let { $map } = this.$parent;
            $map ? this.addOverlay() : this.$parent.$on("ready", this.addOverlay);
        },
        destroyed () {
            this.removeOverlay();
        },
        watch: {
            visible (val) {
                let { position, $overlay } = this;
                let { $map } = this.$parent;
                if (val && position) {
                    $map.openInfoWindow($overlay, createPoint(position));
                } else {
                    $map.closeInfoWindow();
                }
            }
        },
        methods: {
            addOverlay () {
                let { $overlay, visible, size, offset, title, enableAutoPan, enableCloseOnClick, enableMessage } = this;
                let { $map } = this.$parent;
                this.$overlay = $overlay = new BMap.InfoWindow(this.$els.window, {
                    width: size.width,
                    height: size.height,
                    offset: createSize(offset),
                    title: title,
                    enableAutoPan: enableAutoPan,
                    enableCloseOnClick: false,                                  // NOTICE: visible 参数控制
                    enableMessage: enableMessage
                });
                visible && $map && $map.openInfoWindow($overlay, createPoint(position));
            },

            removeOverlay () {
                let { $map } = this.$parent;
                $map.removeOverlay(this.$overlay);
            },
        }
    }
</script>
<style lang="css" scoped>
    .component-section {
        z-index: 2;
        width: auto;
        height: auto;
        overflow: hidden;
        display: none;
    }
</style>

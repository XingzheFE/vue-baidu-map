<template>
    <div class="component-section">
        <slot></slot>
    </div>
</template>
<script>
    /**
     * FIXME: infowindow 中有内存泄露( fixed 2017-4-20 )
     */
    import { createPoint, createSize } from "utils/factory";
    import { removeOverlay } from "utils/removeOverlay";
    import bindEvent from "utils/bindEvent";

    const eventList = [
        "close",
        "open",
        "maximize",
        "restore",
        "clickclose"
    ];

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
            default: true
        },
        enableCloseOnClick: {
            required: false,
            type: Boolean,
            twoway: false,
            default: true,
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
        beforeDestroy () {
            this.removeOverlay();
        },
        watch: {
            visible (val) {
                let { position, $overlay } = this;
                let { $map } = this.$parent;
                console.log("infoWindow visible change");
                if (val && position) {
                    $map.openInfoWindow($overlay, createPoint(position));
                } else {
                    $map.closeInfoWindow();
                }
            }
        },
        methods: {
            addOverlay () {
                let { $overlay, visible, size, position, offset, title, enableAutoPan, enableCloseOnClick, enableMessage, updateStatus } = this;
                let { $map } = this.$parent;
                let $content = this.$el;
                this.$overlay = $overlay = new BMap.InfoWindow($content, {
                    width: size.width,
                    height: size.height,
                    offset: createSize(offset),
                    title: title,
                    enableAutoPan: enableAutoPan,
                    enableCloseOnClick: enableCloseOnClick,                                  // NOTICE: visible 参数控制
                    enableMessage: enableMessage
                });
                bindEvent.call(this, eventList);
                visible && $map.openInfoWindow($overlay, createPoint(position));
            },

            removeOverlay () {
                let $container = this.$parent.$overlay;
                let { $overlay } = this;
                $overlay.content = null;// FIXME 无法被移除
                removeOverlay.call(this, this.$parent.$overlay, '$overlay');
                console.log( $overlay );
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
        /*display: none;*/
    }
</style>

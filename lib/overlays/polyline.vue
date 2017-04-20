<script>
    import bindEvent from 'utils/bindEvent';
    import { removeOverlay } from "utils/removeOverlay";
    import { createPoint } from "utils/factory";

    const props = {
        visible: {
            required: false,
            twoway: false,
            type: Boolean,
            default: true,
        },
        points: {
            required: true,
            twoway: false,
            type: Array
        },
        style: {
            required: false,
            twoway: false,
            type: Object,
            default () {
                return {};
            }
        },
        enableMassClear: {
            required: false,
            twoway: false,
            type: Boolean,
            default: true
        },
        enableEditing: {
            required: false,
            twoway: false,
            type: Boolean,
            default: false
        },
        enableClicking: {
            required: false,
            twoway: false,
            type: Boolean,
            default: true
        }
    };

    const eventList = [
        "click",
        "dblclick",
        "mousedown",
        "mouseup",
        "mouseout",
        "mouseover",
        "remove",
        "lineupdate"
    ];

    export default {
        props,
        data () {
            return {
                componentType: "polyline",
                // testText: new Array(10000).join("x"),
            }
        },
        ready () {
            let map = this.$parent.$map;
            map ? this.addOverlay() : this.$parent.$on("ready", this.addOverlay);
        },
        beforeDestroy: function () {
            this.removeOverlay();
        },
        watch: {
            "points": {
                handler (val) {
                    if (this.$overlay) {
                        let line = val.map((item, index, arr) => {
                            return createPoint(item);
                        });
                        this.$overlay.setPath(line);
                    }
                },
                deep: true
            },
            "style": {
                handler (val) {
                    if (this.$overlay) {
                        if (val.strokeStyle) this.$overlay.setStrokeStyle(val.strokeStyle);
                        if (val.strokeColor) this.$overlay.setStrokeColor(val.strokeColor);
                        if (val.strokeWeight) this.$overlay.setStrokeWeight(val.strokeWeight);
                        if (val.strokeOpacity) this.$overlay.setStrokeOpacity(val.strokeOpacity);
                    }
                },
                deep: true
            },
            "visible": {
                handler (val) {
                    if (this.$overlay) {
                        val ? this.$overlay.show() : this.$overlay.hide();
                    }
                },
                deep: false
            },
            "enableMassClear": {
                handler (val) {
                    if (this.$overlay) {
                        val ? this.$overlay.enableMassClear() : this.$overlay.disableMassClear();
                    }
                },
                deep: false
            },
            "enableEditing": {
                handler (val) {
                    if (this.$overlay) {
                        val ? this.$overlay.enableEditing() : this.$overlay.disableEditing();
                    }
                },
                deep: false
            },
        },
        methods: {
            addOverlay () {
                let { $overlay, visible, points, style, enableMassClear, enableEditing, enableClicking } = this;
                let line = points.map((item, index, arr) => {
                    return createPoint(item);
                });
                // console.log(line);
                this.$overlay = $overlay = new BMap.Polyline(line, {
                    strokeColor: style.strokeColor,
                    strokeWeight: style.strokeWeight,
                    strokeOpacity: style.strokeOpacity,
                    strokeStyle: style.strokeStyle,
                    enableMassClear: enableMassClear,
                    enableEditing: enableEditing,
                    enableClicking: enableClicking,
                });
                this.$parent.$overlay.addOverlay($overlay);
                eventList && bindEvent.call(this, eventList);
                visible ? $overlay.show() : $overlay.hide();
            },

            removeOverlay () {
                let { $overlay } = this;
                removeOverlay.call(this, this.$parent.$map, '$overlay');
            }
        }

    }
</script>

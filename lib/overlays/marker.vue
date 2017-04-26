<script>
    import bindEvent from '../utils/bindEvent.js';
    import bindContextMenu from '../utils/bindContextMenu.js';
    import _log from "utils/log";
    import { createIcon, createPoint, createLabel, createSize } from "utils/factory";
    import { removeOverlay } from "utils/removeOverlay";

    const props = {
        visible: {
            required: false,
            twoway: false,
            type: Boolean,
            default: true,
        },
        position: {
            required: true,
            twoway: false,
            type: Object
        },
        icon: {
            required: false,
            twoway: false,
            type: Object
        },
        label: {
            required: false,
            twoway: false,
            type: Object
        },
        zIndex: {
            required: false,
            twoway: false,
            type: Number
        },
        enableDragging: {
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
        },
        enableMassClear: {
            required: false,
            twoway: false,
            type: Boolean,
            default: true
        },
        raiseOnDrag: {
            required: false,
            twoway: false,
            type: Boolean,
            default: false,
        },
        rotation: Number,
        cid: String,                // FIXME: delete this?
        contextMenu: Array
    };

    const eventList = [
        "click",
        "dblclick",
        "mousedown",
        "mouseup",
        "mouseout",
        "mouseover",
        "remove",
        "infowindowclose",
        "infowindowopen",
        "rightclick",
        "dragstart",
        "dragging",
        "dragend"
    ];

    export default {
        props,
        data () {
            return {
                componentType: "marker",
                $overlay: undefined,
                $label: undefined,
                $contextMenu: undefined,
            }
        },
        ready () {
            let $map = this.$parent.$map;
            $map ? this.addOverlay() : this.$parent.$on("ready", this.addOverlay);
        },
        beforeDestroy (){
            this.removeOverlay();
        },
        watch: {
            "position": {
                handler (val) {
                    if (this.$overlay) {
                        this.$overlay.setPosition(createPoint(val));
                    }
                },
                deep: true
            },
            "icon": {
                handler (val) {
                    if (this.$overlay) {
                        this.$overlay.setIcon(createIcon(val));
                    }
                },
                deep: true
            },
            // swallow the sea
            "visible": {
                handler (val) {
                    if (this.$overlay) {
                        val ? this.$overlay.show() : this.$overlay.hide();
                    }
                },
                deep: false
            },
            "label": {
                handler (val) {
                    if (this.$overlay) {
                        if (this.$label) {
                            this.$label.setContent(val.text);
                            this.$label.setOffset(createSize(val.offset));
                        } else {
                            this.$overlay.setLabel(this.$label = createLabel(val));
                        }
                    }
                },
                deep: true
            },
            "enableDragging": {
                handler (val) {
                    if (this.$overlay) {
                        val ? this.$overlay.enableDragging() : this.$overlay.disableDarging();
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
            "rotation": {
                handler (val) {
                    if (this.$overlay) {
                        !isNaN(val) && this.$overlay.setRotation(val);
                    }
                },
                deep: false
            },
            "zIndex": {
                handler (val) {
                    if (this.$overlay) {
                        val !== undefined && this.$overlay.setZIndex(val);
                    }
                },
                deep: false
            },
            "contextMenu": {
                handler (val) {

                },
                deep: true
            },
        },
        methods: {
            addOverlay () {
                let { $overlay, visible, position, label, contextMenu, icon, zIndex, enableMassClear, enableDragging, enableClicking, raiseOnDrag, updatePosition, rotation } = this;
                this.$overlay = $overlay = new BMap.Marker(createPoint(position), {
                    enableMassClear: enableMassClear,
                    enableDragging: enableDragging,
                    enableClicking: enableClicking,
                    raiseOnDrag: raiseOnDrag,
                    rotation: rotation,
                    icon: createIcon(icon),
                });
                label && $overlay.setLabel(this.$label = createLabel(label));
                eventList && bindEvent.call(this, eventList);
                contextMenu && bindContextMenu.call(this, contextMenu);
                !isNaN(zIndex) && $overlay.setZIndex(zIndex);
                this.$parent.$overlay.addOverlay($overlay);
                this.$overlay.addEventListener("dragging", updatePosition);
                visible ? $overlay.show() : $overlay.hide();            // FIXME: 是否有用
            },

            removeOverlay () {
                let { $overlay, $label, $contextMenu, updatePosition } = this;
                if ($overlay && this.$parent.$overlay) {
                    $overlay.removeEventListener("dragging", updatePosition);      // 移除注册的事件监听器
                    $contextMenu && $overlay.removeContextMenu($contextMenu);
                    removeOverlay.call(this, this.$parent.$overlay, '$label');
                    removeOverlay.call(this, this.$parent.$overlay, '$overlay');
                    // FIXME：此处 $marker 和 $label 不能完全被清除，百度地图存在极小的内存泄露（ $label 无法被删除 ）
                    // 所以使用自定义 removeOverlay 方法代替，减少内存泄露
                }
            },

            updatePosition (e) {
                this.position.lat = e.point.lat;
                this.position.lng = e.point.lng;
            }
        }
    }
</script>

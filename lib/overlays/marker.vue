<script>
    import bindEvent from '../utils/bindEvent.js';
    import bindContextMenu from '../utils/bindContextMenu.js';
    import _log from "utils/log";
    import { createPoint, createLabel, createSize } from "utils/factory";
    import { removeOverlay } from "utils/removeOverlay";

    const props = {
        position: {
            required: true,
            twoway: false,
            type: Object
        },
        config: {
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
        bindInfoWindow: {
            required: false,
            twoway: false,
            type: Number,
            default: undefined
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
        cid: String, // FIXME: delete this?
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
                testText: new Array(10000).join("xx"),
            }
        },
        ready () {
            let map = this.$parent.$overlay;
            map && window.BMap ? this.addOverlay() : this.$parent.on( "ready", this.addOverlay );
        },
        beforeDestroy (){
            this.removeOverlay();
        },
        watch: {
            "position": {
                handler:  function ( val ) {
                    if ( this.$overlay ) {
                        this.$overlay.setPosition( createPoint( val ) );
                    } else {
                        _log( "this.mapComponentObj is not existing!" );
                    }
                },
                deep: true
            },
            "config": {
                handler: function ( val ) {
                    if ( this.mapComponentObj ) {
                        let conf = this.config;
                        let iconOption = {};
                        if ( !this.checkIconConfig( conf ) ) return;
                        if ( conf.imageSize ) iconOption.imageSize = new BMap.Size( conf.imageSize.x, conf.imageSize.y );
                        if ( conf.size && conf.imageSize ) iconOption.imageOffset = new BMap.Size( ( conf.size.x - conf.imageSize.x ) / 2, ( conf.size.y - conf.imageSize.y ) / 2 );
                        if ( conf.anchor ) iconOption.anchor = new BMap.Size(conf.anchor.x, conf.anchor.y);

                        let size = new BMap.Size( conf.size.x, conf.size.y );
                        let icon = new BMap.Icon( conf.img, size, iconOption );

                        this.mapComponentObj.setIcon( icon );
                    } else {
                        console.log( "[vue-baidu-map] this.mapComponentObj is not existing!")
                    }

                },
                deep: true
            },
            "visible": {
                handler: function ( val ) {
                    if ( val === true &&
                         this.mapComponentObj &&
                        !this.mapComponentObj.isVisible()
                    ) {
                        this.mapComponentObj.show();
                    } else if ( val === false &&
                        this.mapComponentObj &&
                        this.mapComponentObj.isVisible()
                    ) {
                        this.mapComponentObj.hide();
                    }
                },
                deep: false
            },
            "label": {
                handler ( val ) {
                    if ( this.$overlay ) {
                        if ( this.$label ) {
                            this.$label.setContent( val.text );
                            this.$label.setOffset( createSize( val.offset ) );
                        } else {
                            this.$overlay.setLabel( this.$label = createLabel(val) );
                        }
                    }
                },
                deep: true
            },
            "enableDragging": {
                handler ( val ) {
                    val ? this.$overlay.enableDragging() : this.$overlay.disableDarging();
                },
                deep: false
            }
        },
        methods: {
            addOverlay () {
                let { $overlay, position, label, enableMassClear, enableDragging, enableClicking, updatePosition} = this;
                this.$overlay = $overlay = new BMap.Marker( createPoint( position ), {
                    enableMassClear: enableMassClear,
                    enableDragging: enableDragging,
                    enableClicking: enableClicking,
                } );
                label && $overlay && $overlay.setLabel( this.$label = createLabel( label ) );
                this.$parent.$overlay.addOverlay( $overlay );
                this.$overlay.addEventListener( "dragging", updatePosition );
            },

            removeOverlay () {
                let { $overlay, $label, updatePosition } = this;
                if ( $overlay && this.$parent.$overlay ) {
                    $overlay.removeEventListener( "dragging", updatePosition );      // 移除注册的事件监听器
                    removeOverlay.call( this, this.$parent.$overlay, '$label' );
                    removeOverlay.call( this, this.$parent.$overlay, '$overlay' );
                    // FIXME：此处 $marker 和 $label 不能完全被清除，百度地图存在极小的内存泄露（ $label 无法被删除 ）
                    // 所以使用自定义 removeOverlay 方法代替，减少内存泄露
                    // this.$parent.$overlay.removeOverlay( $label );
                    // this.$parent.$overlay.removeOverlay( $overlay );
                    // this.$label = null;
                    // this.$overlay = null;
                }
            },

            /**
             * marker 被拖动时更新 props.position
             */
            updatePosition ( e ) {
                this.position.lat = e.point.lat;
                this.position.lng = e.point.lng;
            }
        }
    }
</script>

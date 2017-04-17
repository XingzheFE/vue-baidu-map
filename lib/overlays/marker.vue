<script>
    import bindEvent from '../utils/bindEvent.js';
    import bindContextMenu from '../utils/bindContextMenu.js';
    import _log from "utils/log";
    import { createPoint } from "utils/factory";

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
            type: false,
            default: false
        },
        cid: String,
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
                    if ( this.mapComponentObj ) {
                        this.mapComponentObj.setPosition( new BMap.Point( val.lng, val.lat ) );
                    } else {
                        console.log( "[vue-baidu-map] this.mapComponentObj is not existing!")
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
                handler: function ( val ) {
                    if ( this.mapComponentObj ) {
                        if ( this.label &&
                            this.label.text &&
                            this.label.offset &&
                            typeof this.label.offset.x !== "undefined" &&
                            typeof this.label.offset.y !== "undefined" &&
                            !isNaN( this.label.offset.x ) &&
                            !isNaN( this.label.offset.y
                        ) ) {
                            this.labelObj = new BMap.Label( this.label.text, { offset: new BMap.Size( this.label.offset.x, this.label.offset.y )});
                            this.mapComponentObj.setLabel ( this.labelObj );
                            console.log( "set marker label" );
                        }
                    }
                },
                deep: true
            }
        },
        methods: {
            addOverlay: function () {
                this.$overlay = new BMap.Marker( createPoint( this.position ) );
                this.$parent.$overlay.addOverlay( this.$overlay );
            },

            removeOverlay () {
                if ( this.$overlay && this.$parent.$overlay ) {
                    this.$parent.$overlay.removeOverlay( this.$overlay );
                }
            },
        }
    }
</script>

<script>
    import componentsMixin from "../mixin/overlaysMixin.js";
    import bindEvent from '../utils/bindEvent.js';
    import bindContextMenu from '../utils/bindContextMenu.js';

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
        "infowindowclose",
        "infowindowopen",
        "rightclick",
        "dragstart",
        "dragging",
        "dragend"
    ];

    export default {
        mixins: [ componentsMixin ],
        props: props,
        data: function () {
            return {
                componentType: "marker",
                mapInfoWindowObj: undefined,                   // baidu map infowindow 对象,
                labelObj: undefined                         // marker Label 对象
            }
        },
        ready: function() {
            // console.log( this );
        },
        beforeDestroy (){
            this.removeMarker();
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
            /** required ! dont change function name !! */
            createComponent () {
                this.drawMarker();
            },
            deleteComponent () {
                this.removeMarker();
            },
            drawMarker: function () {
                pointObj = new BMap.Point( this.position.lng, this.position.lat );
                this.mapComponentObj = {};
                this.mapObj.addOverlay( new BMap.Marker( pointObj ) );
                return;
//

                let _this = this;
                let zIndex = undefined;
                if ( !this.position ) {
                    console.warn("[vue-baidu-map] marker.position undefined!");
                    return;
                }
                if ( !this.position.lng || !this.position.lat ) {
                    this.position.lng = this.position.lat = 0;
                }
                if ( this.zIndex && !isNaN( this.zIndex ) ) {
                    zIndex = this.zIndex;
                }

                let pointObj = new BMap.Point( this.position.lng, this.position.lat );
                let conf = this.config;
                if ( this.checkIconConfig( conf ) ) {
                    let iconOption = {};

                    if ( conf.imageSize ) iconOption.imageSize = new BMap.Size( conf.imageSize.x, conf.imageSize.y );
                    if ( conf.imageSize && conf.size ) iconOption.imageOffset = new BMap.Size( ( conf.size.x - conf.imageSize.x ) / 2, ( conf.size.y - conf.imageSize.y ) / 2 );
                    if ( conf.anchor ) iconOption.anchor = new BMap.Size(conf.anchor.x, conf.anchor.y);

                    let size = new BMap.Size( conf.size.x, conf.size.y );
                    let icon = new BMap.Icon( conf.img, size, iconOption );
                    this.mapComponentObj = new BMap.Marker( pointObj, { icon: icon || iconOrigin } );
                } else {
                    this.mapComponentObj = new BMap.Marker( pointObj );
                }
                this.mapObj.addOverlay( this.mapComponentObj );

                if ( zIndex !== undefined ) this.mapComponentObj.setZIndex( zIndex );
                if ( !this.visible ) this.mapComponentObj.hide();
                if ( this.enableDragging ) this.mapComponentObj.enableDragging();
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
                } else {
                    console.log( "can not set marker label" );
                }
                // bindEvent( this, this.mapComponentObj, eventList );

                bindEvent.call( this, eventList );

                bindContextMenu( this, this.mapComponentObj );


                /** open info window */
                if ( this.bindInfoWindow ) {
                    this.mapComponentObj.addEventListener( "click", () => {
                        if ( this.$map.$data.infoWindowList[this.bindInfoWindow] && this.mapInfoWindowObj !== this.$map.$data.infoWindowList[this.bindInfoWindow] ) {
                            this.mapInfoWindowObj = this.$map.$data.infoWindowList[this.bindInfoWindow].mapComponentObj;
                        } else {
                            console.warn( "[vue-baidu-map] this marker did not has infowindow!");
                        }
                        if ( this.mapInfoWindowObj ) {
                            this.mapObj.openInfoWindow( this.mapInfoWindowObj, this.mapComponentObj.point );
                        } else {
                            console.warn( "[vue-baidu-map] this marker did not bind infowindow!");
                        }
                    })
                }

                /** sync the position */
                this.mapComponentObj.addEventListener( "dragging", ( e ) => {
                    this.position.lat = e.point.lat;
                    this.position.lng = e.point.lng;
                })
            },

            /** 移除 marker */
            removeMarker () {
                if ( this.mapComponentObj && this.mapObj ) {
                    this.mapObj.removeOverlay( this.mapComponentObj );
                    this.mapComponentObj = null;
                    this.label = null;
                    this.conf = null;
                    this.mapInfoWindowObj = null;
                } else {
                    console.error( "[vue-baidu-map] remove marker failed!" );
                }
            },

            /** 获取 infowindow 对象 */
            getInfoWindow ( id ) {
                if ( this.mapInfoWindowObj ) {
                    return this.mapInfoWindowObj;
                } else {
                    return undefined;
                }
            },

            /** 检查 icon 配置项 */
            checkIconConfig ( conf ) {
                let result = true;
                if (
                    conf && (
                        (
                            conf.img && conf.imageSize && conf.imageSize instanceof Object && !isNaN( conf.imageSize.x ) && !isNaN( conf.imageSize.y ) &&
                            conf.size && conf.size instanceof Object && !isNaN( conf.size.x ) && !isNaN( conf.size.y )
                        ) || conf.anchor && conf.anchor instanceof Object && !isNaN( conf.anchor.x ) && !isNaN( conf.anchor.y )
                    )
                ) {
                    return result;
                }
                result = false;
            }
        }
    }
</script>

<script>
    import componentsMixin from '../mixin/overlaysMixin';
    import bindEvent from '../utils/bindEvent.js';

    const props = {
        points: {
            required: true,
            twoway: false,
            type: Array
        },
        config: {
            required: true,
            twoway: false,
            type: Object
        }
    };
    const LINE_CONF = {
        strokeColor: "#32b1fb",
        strokeWeight: 4,
        strokeOpacity: 1
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
        mixins: [componentsMixin],
        props: props,
        data: function () {
            return {
                componentType: "polyline",
                pointsArr: []               // BMap.Points object
            }
        },
//        detached: function () {
//            this.removeOverlay();
//        },
//        destroyed: function () {
//            this.removeOverlay();
//        },
        watch: {
            "points": {
                handler:  function ( val ) {
                    // TODO: 可能数据变化时 map 对象并未被创建
                    if ( this.mapComponentObj ) {
                        this.pointsArr = this.points.map( function ( item ) {
                            item = new BMap.Point( item.lng, item.lat );
                            return item;
                        });
                        this.mapComponentObj.setPath( this.pointsArr );
                    } else {
                        console.log( "[vue-baidu-map] this.mapComponentObj is not existing!")
                    }
                },
                deep: true
            },
            "config": {
                handler: function ( val ) {
                    if ( val.strokeColor ) this.mapComponentObj.setStrokeColor( val.strokeColor );
                    if ( val.strokeWeight ) this.mapComponentObj.setStrokeWeight( val.strokeWeight );
                    if ( val.strokeOpacity ) this.mapComponentObj.setStrokeOpacity( val.strokeOpacity );
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
            }
        },
        methods: {
            createComponent: function () {
                let _this = this;
                if ( this.points === undefined ||
                     !this.points instanceof Array
                ) {
                    console.error("[vue-baidu-map] Polyline.points 必须是一维数组！");
                    return;
                }
//                FIXME: do we need this?
//                if ( this.points.length === 0) {
//                    console.warn("[vue-baidu-map] Polyline.points 是空数组！");
//                }
                this.pointsArr = this.points.map( function ( item ) {
                    if ( item.lng && item.lat ) {
                        item = new BMap.Point( item.lng, item.lat );
                        return item;
                    } else {
                        throw new Error( "[vue-baidu-map] Polyline.points coordinate error！" )
                    }
                });
                let config = this.config || LINE_CONF;
                this.mapComponentObj = new BMap.Polyline( this.pointsArr, config );
                bindEvent( this, this.mapComponentObj, eventList );
                this.mapObj.addOverlay( this.mapComponentObj );
                // _this.mapObj.zoomTo( 1 );
                // console.log( this );
            },
            deleteComponent: function () {
                this.removeOverlay();
            },
            removeOverlay: function () {
                if ( this.mapObj && this.mapComponentObj ) {
                    this.mapObj.removeOverlay( this.mapComponentObj );
                } else {
                    console.error( "[vue-baidu-map] remove polyline failed!" );
                }
            }
        }

    }
</script>

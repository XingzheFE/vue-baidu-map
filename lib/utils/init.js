/**
 * Baidu Map 初始化／配置
 * @param config
 * @param map
 * @returns {boolean}
 */

function init ( _this, map ) {
    let center = _this.center || { lat: 36.043862, lng: 103.898987 };
    let zoom = _this.zoom || 5;
    // let type = _this.type;
    let style = _this.style || undefined;
    if ( !( BMap && BMap.Map ) ) {
        throw new Error("[vue-baidu-map] 地图初始化失败！BMap不存在");
    }
    if ( typeof center !== "string") {
        center = new BMap.Point(center.lng, center.lat);
    }
    if ( _this.returnMap ) {
        _this.$dispatch( "bmap-ready", _this );          // 通知父组件地图初始化完成，可以引用map对象
    }
    if ( _this.location ) {
        let geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function( r ){
            if( this.getStatus() == BMAP_STATUS_SUCCESS ){
                _this.currentLocation = {
                    lng: r.point.lng,
                    lat: r.point.lat
                };
                map.centerAndZoom( r.point, 13);
                if ( _this.locateSucceed ) {
                    _this.locateSucceed( r );
                }
                setTimeout( () => {
                    _this.LOAD.hide();
                }, 500);
            } else {
                alert( "定位失败" )
                console.log( '[vue-baidu-map] locate failed' + this.getStatus() );
                if ( _this.locateFailed ) {
                    _this.locateFailed();
                }
            }
        },{ enableHighAccuracy: true });
    } else {
        setTimeout( () => {
            _this.LOAD.hide();
        }, 1000);
    }
    // 开启滚轮缩放
    if ( _this.enableScrollWheelZoom ) {
        console.log("enable-scroll-wheel-zoom");
        map.enableScrollWheelZoom();
    } else {
        console.log("disable-scroll-wheel-zoom");
    }
    map.setMinZoom( 5 );
    map.setMapStyle( style );
    map.centerAndZoom( center, zoom );
    map.enableAutoResize();
    // NOTICE: 调用此方法会使台湾地区无详细数据
    // map.setMapStyle( STYLE_JSON );          // TODO: Fix this error 台湾无数据
}

export default init;

const STYLE_JSON = {
    styleJson: [
        // {
        //     "featureType": "road",
        //     "elementType": "all",
        //     "stylers": {
        //         "lightness": 20
        //     }
        // },
        // {
        //     "featureType": "land",
        //     "elementType": "all",
        //     "stylers": {
        //         "color": "#F0EDE5"
        //     }
        // },
        // {
        //     "featureType": "water",
        //     "elementType": "all",
        //     "stylers": {
        //         "color": "#a8cfff"
        //     }
        // },
        // {
        //     "featureType": "highway",
        //     "elementType": "geometry.fill",
        //     "stylers": {
        //         "color": "#fed89d",
        //         "weight": "1.4",
        //         "lightness": 7
        //     }
        // },
        // {
        //     "featureType": "highway",
        //     "elementType": "labels.text.stroke",
        //     "stylers": {
        //         "weight": "1",
        //         "lightness": 7,
        //         "visibility": "off"
        //     }
        // },
        // {
        //     "featureType": "highway",
        //     "elementType": "geometry.stroke",
        //     "stylers": {
        //         "color": "#fed89d",
        //         "weight": "1",
        //         "lightness": -10
        //     }
        // },
        // {
        //     "featureType": "highway",
        //     "elementType": "labels",
        //     "stylers": {
        //         "weight": "1.4",
        //         "lightness": 7
        //     }
        // },
        // {
        //     "featureType": "subway",
        //     "elementType": "all",
        //     "stylers": {
        //         "weight": "1",
        //         "lightness": 7
        //     }
        // },
        // {
        //     "featureType": "label",
        //     "elementType": "labels.text.stroke",
        //     "stylers": {
        //         "color": "#f5f2e8"
        //     }
        // },
        // {
        //     "featureType": "label",
        //     "elementType": "labels.text.fill",
        //     "stylers": {
        //         "color": "#444444"
        //     }
        // },
        // {
        //     "featureType": "boundary",
        //     "elementType": "all",
        //     "stylers": {
        //         "color": "#999999"
        //     }
        // },
        // {
        //     "featureType": "boundary",
        //     "elementType": "geometry",
        //     "stylers": {
        //         "color": "#666666",
        //         "weight": "0.4"
        //     }
        // }
    ]
};

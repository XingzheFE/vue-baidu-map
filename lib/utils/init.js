/**
 * Baidu Map 初始化／配置
 * @param config
 * @param map
 * @returns {boolean}
 */
import _log from "utils/log.js";
import { createPoint } from "utils/factory.js";

function init () {
    let _this = this;
    let map = _this.$map;
    let center = _this.center || { lat: 36.043862, lng: 103.898987 };
    let zoom = _this.zoom || 5;
    // let type = _this.type;
    let style = _this.style || undefined;
    if ( !( BMap && BMap.Map ) ) {
        _log( new Error("地图初始化失败！BMap不存在") );
    }
    if ( typeof center !== "string") {
        center = createPoint( center );
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
                    _this.LOADING.hide();
                }, 500);
            } else {
                alert( "定位失败" )
                _log( 'locate failed' + this.getStatus() );
                if ( _this.locateFailed ) {
                    _this.locateFailed();
                }
            }
        },{ enableHighAccuracy: _this.enableHighAccuracy });
    } else {
        setTimeout( () => {
            _this.LOADING.hide();
        }, 1000);
    }
    // 开启滚轮缩放
    if ( _this.enableScrollWheelZoom ) {
        _log("enable-scroll-wheel-zoom");
        map.enableScrollWheelZoom();
    } else {
        _log("disable-scroll-wheel-zoom");
    }
    map.setMapStyle( style );
    map.centerAndZoom( center, zoom );
    map.enableAutoResize();
}

export default init;

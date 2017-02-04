/**
 * mapoverlay 添加事件处理
 * @param $component    map组件所在的vue组件
 * @param componentObj  map组件
 * @param eventList     支持的事件名列表
 */
export default ( $component, componentObj, eventList ) => {
    if ( eventList && eventList instanceof Array ) {
        eventList.map( function ( item, index, arr ) {
            componentObj.addEventListener( item, function ( e ) {
                $component.$emit( "b-" + item, e, $component );
            })
        })
    } else {
        if ( process.env.NODE_ENV === "development" ) console.error( "[vue-baidu-map] param eventList must be an Array!" );
    }
}
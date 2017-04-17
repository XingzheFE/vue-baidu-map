/**
 * mapoverlay 添加/修改 右键菜单对象
 * @param $component    map组件所在的vue组件
 * @param componentObj  map组件
 */
export default ( $component, componentObj ) => {
    if ( $component &&
        $component.contextMenu &&
        $component.contextMenu instanceof Array &&
        $component.$data.mapObj
    ) {
        // contextMenu 存在则修改属性（暂时只能修改text属性）
        if ( $component.$data.mapContextMenu &&
            $component.$data.mapContextMenu instanceof BMap.ContextMenu ) {
            if ( process.env.NODE_ENV === "development" ) console.log( "修改contextMenu text")
            $component.contextMenu.map( function ( item, index, arr ) {
                let menuItem = $component.$data.mapContextMenu.getItem( index );
                let text = item.text;
                if ( item.text && menuItem ) {
                   menuItem.setText( text );
                }
            });
        }else {
            if ( process.env.NODE_ENV === "development" ) console.log( "创建contextMenu")
            // contextMenu 不存在则创建新的邮件菜单
            let contextMenu = $component.contextMenu;
            let menu = new BMap.ContextMenu();
            let map = $component.$data.mapObj;

            /** clean old contextmenu */
            if ( $component.$data.mapContextMenu ) {
                componentObj.removeContextMenu( $component.$data.mapContextMenu );
            }

            /** add new contextmenu */
            for ( let i = 0; i < contextMenu.length; i++ ){
                menu.addItem( new BMap.MenuItem( contextMenu[i].text, contextMenu[i].callback ) );
            }

            componentObj.addContextMenu( menu );
            $component.$data.mapContextMenu = menu;
        }
    } else {
        if ( process.env.NODE_ENV === "development" ) console.warn( "[vue-baidu-map] contextMenu is not exist!" );
    }
}
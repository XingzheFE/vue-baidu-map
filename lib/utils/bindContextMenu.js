/**
 * mapoverlay 添加/修改 右键菜单对象
 * @param $component    map组件所在的vue组件
 * @param componentObj  map组件
 */
import _log from "utils/log";

export default function () {
    if (this &&
        this.contextMenu &&
        this.contextMenu instanceof Array &&
        this.$overlay
    ) {
        // contextMenu 存在则修改属性（暂时只能修改text属性）
        if (this.$contextMenu &&
            this.$contextMenu instanceof BMap.ContextMenu) {
            // _log( "修改contextMenu text")
            this.contextMenu.map((item, index, arr) => {
                let menuItem = this.$contextMenu.getItem( index );
                let text = item.text;
                if ( item.text && menuItem ) {
                   menuItem.setText( text );
                }
            });
        }else {
            // if (process.env.NODE_ENV === "development")
                // _log( "创建contextMenu" );
            // contextMenu 不存在则创建新的邮件菜单
            let contextMenu = this.contextMenu;
            let menu = new BMap.ContextMenu();

            // clean old contextmenu
            if ( this.$contextMenu ) {
                this.$overlay.removeContextMenu( this.$contextMenu );
            }

            // add new contextmenu
            for ( let i = 0; i < contextMenu.length; i++ ){
                menu.addItem( new BMap.MenuItem( contextMenu[i].text, contextMenu[i].callback ) );
            }

            this.$overlay.addContextMenu( menu );
            this.$contextMenu = menu;
            // _log( "添加menu" );
        }
    } else {
        if ( process.env.NODE_ENV === "development" ) console.warn( "[vue-baidu-map] contextMenu is not exist!" );
    }
}

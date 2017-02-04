import checkBMap from "../utils/checkMap.js";
import bindContextMenu from '../utils/bindContextMenu.js';

const PROPS = {
    // 是否可见
    visible: {
        required: false,
        type: Boolean,
        twoway: false,
        default: true
    },
    // 右键菜单配置项
    contextMenu: {
        required: false,
        type: Array,
        twoway: false,
        default: undefined
    },
    // 组件(覆盖物)id
    cid: {
        required: false,
        type: String,
        twoway: false
    }
};

export default {
    props: PROPS,
    data: function () {
        return {
            componentType: "without declare",
            created: false,                         // [状态标识] 组件是否创建，createComponent 执行后为 true
            $map: undefined,                        // 父组件对象
            mapObj: undefined,                      // 父组件初始化完成后的地图对象
            mapComponentObj: undefined,             // 挂载到地图对象上的组件（覆盖物）
            mapContextMenu: undefined               // 挂载到该地图组件上的右键菜单组件
        }
    },
    created: function () {
        if ( checkBMap() ) {
            // 向父组件 map.vue 派发事件：组件注册请求
            this.$dispatch( "vue-baidu-map-register-component", this );
        } else {
            // TODO
        }
    },
    ready: function () {},
    detached: function () {
        this.beforeDeleteComponent();
    },
    destroyed: function () {
        this.beforeDeleteComponent();
    },
    watch: {
        "contextMenu": {
            handler: function ( val ) {
                bindContextMenu( this, this.mapComponentObj );
            },
            deep: true
        }
    },
    methods: {
        beforeCreateComponent: function () {
            this.created = true;
            this.createComponent();
        },
        createComponent: function () {
            // TODO: 实例化地图组件
        },
        beforeDeleteComponent: function () {
            this.created = false;
            /** 移除右键菜单 */
            if ( this.mapComponentObj ) {
                // if ( this.mapContextMenu ) {
                //     this.mapComponentObj.removeContextMenu( this.mapContextMenu );
                // }
                this.deleteComponent();
            }
        },
        deleteComponent: function () {
            // TODO: 从地图中移除组件
        }
    },
    events: {
        "vue-baidu-map-ready": function ( $map ) {
            this.$map = $map;
            this.mapObj = this.$map.$data.mapObj;
            if ( this.mapObj ) {
                this.beforeCreateComponent();
            } else {
                console.error( "[vue-baidu-map] mapObj 不存在" );
            }
        }
    }
}
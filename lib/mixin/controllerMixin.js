import checkBMap from "../utils/checkMap.js";

const props = {
    position: {
        required: true,
        twoway: false,
        type: Object
    },
    visible: {
        required: false,
        twoway: false,
        type: Boolean,
        default: true
    },
    callback: {
        required: false,
        twoway: false,
        type: Function
    }
};

export default {
    props: props,
    data: function () {
        return {
            controllerObj: undefined,
            styleObj: {},
            $map: '',            // 一级组件 instanceof Vue ，FIXME：引起问题：Maximum call stack size exceeded
            mapObj: ''           // 地图对象 instanceof BMap.Map
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
    computed: {
        "styleObj": function () {
            let styleObj = {};
            if ( this.position &&
                this.position.x !== undefined &&
                this.position.y !== undefined &&
                !isNaN( this.position.x ) &&
                !isNaN( this.position.y )
            ) {
                if ( this.position.x >= 0 ) {
                    styleObj.left = this.position.x + "px";
                } else {
                    styleObj.right = Math.abs( this.position.x ) + "px";
                }
                if ( this.position.y >= 0 ) {
                    styleObj.top = this.position.y + "px";
                } else {
                    styleObj.bottom = Math.abs( this.position.y ) + "px";
                }
            } else {
                console.error( "[vue-baidu-map] controller position error or not existing" );
            }
            return styleObj;
        }
    },
    methods: {
        "createComponent": function () {
            // TODO:
        }
    },
    events: {
        "vue-baidu-map-ready": function ( $map ) {
            this.$map = $map;
            this.mapObj = this.$map.$data.mapObj;
            if ( this.mapObj ) {
                this.createComponent();
            } else {
                console.warn( "mapObj 不存在" );
            }
        }
    }
}

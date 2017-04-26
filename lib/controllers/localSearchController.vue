<template>
    <div v-show="visible" class="controller-section" :style="styleObj">
        <input v-model="keywords" @keyup.enter.stop.prevent="search" type="text" maxlength="20" class="search-input" placeholder="搜索地点">
        <button @click="search" class="search-logo"><i class="iconfont icon-search"></i></button>
    </div>
</template>
<script>
    import getControllerPosition from "utils/getControllerPosition";

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
        callback: Function,
    };

    export default {
        props,
        data: function () {
            return {
                markerList: [],
                styleObj: {},
                $search: undefined,
                keywords: '',
            }
        },
        ready () {
            let $map = this.$parent.$map;
            this.styleObj = getControllerPosition(this.position);
            $map ? this.addController() : this.$parent.$on("ready", this.addController);
        },
        beforeDestroy () {
            this.removeController();
        },
        methods: {
            search () {
                let _this = this;
                let { $search, keywords, markerList, callback, removerMarker } = this;
                let $parnet = this.$parent;
                if ($search && keywords) {
                    removerMarker();
                    $parnet.LOADING.show();
                    setTimeout( ()=> {
                        $parnet.LOADING.hide();
                    }, 300);
                    $search.search(keywords);
                    $search.setMarkersSetCallback(function(pois){
                        _this.markerList = _this.markerList.concat(pois);
                        callback && callback(pois);
                    });
                }
            },

            addController () {
                let $map =  this.$parent.$map;
                let { $search } = this;
                this.$search = $search = new BMap.LocalSearch($map, {
                    renderOptions:{ map: $map }
                });
                $search.disableFirstResultSelection();
            },

            removeController () {
                this.$search = null;
            },

            removerMarker () {
                let { keywords, markerList } = this;
                let { $map } = this.$parent;
                markerList.map(item => {
                    $map.removeOverlay(item.marker);
                });
                this.markerList.splice(0, markerList.length);
            },

        },
        watch: {
            "keywords": {
                handler () {
                    let { keywords, removerMarker } = this;
                    if (keywords.length === 0) {
                        removerMarker();
                    }
                },
                deep: false
            }
        }
    }
</script>
<style lang="css" scoped>
    * {
        box-sizing: border-box;
        padding: 0;
        margin:0;
    }
    .controller-section {
        z-index: 2;
        position: absolute;
        overflow: hidden;
        width: 240px;
        height: 45px;
        background: #fff;
        box-shadow: 0 1px 2.9px 0.1px rgba(0, 0, 0, 0.48);
    }
    .search-input {
        position: absolute;
        display: block;
        left: 0;
        width: 100%;
        height: 100%;
        padding: 15px;
        outline: none;
        border: none;
        background-color: #ffffff;
        color: $font-color;
        font-size: 14px;
    }
    .search-logo {
        display: block;
        position: absolute;
        right: 0;
        bottom: 0;
        width: 45px;
        height: 45px;
        border: none;
        outline: none;
        cursor: pointer;
        font-size: 20px;
        text-align: center !important;
        color: #4d4d4d;
        background: transparent;
    }
</style>

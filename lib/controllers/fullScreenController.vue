<template>
    <div v-show="visible" class="controller-section" v-bind:style="styleObj">
        <button v-if="!isFullscreen" v-on:click="toggleFullscreen" class="fullscreen"><i class="iconfont icon-zoomin"></i></button>
        <button v-else v-on:click="toggleFullscreen" class="fullscreen"><i class="iconfont icon-zoomout"></i></button>
    </div>
</template>
<script>
export default {

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
        width: 28px;
        height: 28px;
        /*box-shadow: rgba(0, 0, 0, 0.298039) 0px 1px 4px -1px;*/
        box-shadow: rgba(0, 0, 0, 0.468) 0.3px 1px 4px -1px !important;
    }
    .fullscreen {
        display: block;
        width: 100%;
        height: 100%;
        padding: 0;
        font-size: 0.6rem;
        outline: none;
        /*border: 1px solid #cdcdcd;*/
        border: none;
        background-color: #ffffff;
        color: #4d4d4d;
        cursor: pointer;
        text-align: center;
    }
</style>

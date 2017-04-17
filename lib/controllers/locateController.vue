<template>
    <div v-show="visible" class="controller-section" :style="styleObj">
        <button @click="locate" class="locate-btn" v-bind:class="{'location-animation': isLocating }"><i class="iconfont icon-location"></i></button>
    </div>
</template>
<script>
    export default {

    }
</script>
<style lang="css" scoped>
    .controller-section {
        z-index: 2;
        position: absolute;
        overflow: hidden;
        width: 28px !important;
        height: 28px !important;
        color: #4d4d4d;
        box-shadow: rgba(0, 0, 0, 0.468) 0.3px 1px 4px -1px !important;
    }
    .locate-btn {
        display: block;
        width: 100%;
        height: 100%;
        line-height: 30px;
        cursor: pointer;
        color: inherit;
        border: none;
        background-color: #fff;
    }
    .location-animation {
        animation: 1.4s location-animation infinite ease-in-out;
    }
    @keyframes location-animation {
        0% {
            color: #4d4d4d;
        }
        50% {
            color: #288adb;
        }
        100% {
            color: #4d4d4d;
        }
    }
</style>

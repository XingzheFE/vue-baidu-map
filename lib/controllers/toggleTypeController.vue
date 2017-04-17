<!--notice
    removeController method is not existing
-->
<template>
    <div v-show="visible" class="controller-section" :style="styleObj" >
        <button @click="changeMapType" id="map-type-toggle">{{ mapTypeName }}</button>
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
        width: 64px;
        height: 28px;
        /*box-shadow: rgba(0, 0, 0, 0.298039) 0px 1px 4px -1px;*/
        box-shadow: rgba(0, 0, 0, 0.468) 0.3px 1px 4px -1px !important;
    }
    #map-type-toggle {
        display: block;
        height: 28px;
        width: 100%;
        padding: 0;
        outline: none;
        border: none;
        /*border: 1px solid #cdcdcd;*/
        overflow: hidden;
        white-space:nowrap;
        background-color: #ffffff;
        color: #4d4d4d;
        font-size: 13px;
        cursor: pointer;
    }
</style>

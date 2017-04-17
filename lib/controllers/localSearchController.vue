<template>
    <div v-show="visible" class="controller-section" :style="styleObj">
        <input v-model="keywords" @keyup.enter.stop.prevent="search" type="text" maxlength="20" class="search-input" placeholder="搜索地点">
        <button @click="search" class="search-logo"><i class="iconfont icon-search"></i></button>
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

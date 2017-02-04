<!--box ：放置自定义控件-->
<template>
    <div v-show="visible" class="controller-section" :style="styleObj">
        <slot></slot>
    </div>
</template>
<script>
    import controllerMixin from '../mixin/controllerMixin';

    export default {
        mixins: [controllerMixin],
    }
</script>
<style lang="scss" scoped>
    .controller-section {
        z-index: 2;
        position: absolute;
        overflow: hidden;
        width: auto !important;
        height: auto !important;
    }
</style>

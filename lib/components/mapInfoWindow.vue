<template>
    <div class="component-section">
        <div v-el:window class="infowindow-box">
            <slot></slot>
        </div>
    </div>
</template>
<script>
    import componentsMixin from "../mixin/overlaysMixin.js";

    const props = {
        id: {
            required: true,
            type: Number,
            twoway: false
        }
    };
    export default {
        mixins: [ componentsMixin ],
        props: props,
        data: function () {
            return {
                componentType: "infoWindow",
                componentObj: undefined                // map components object
            }
        },
        ready: function() {
        },
        detached: function () {

        },
        destroyed: function () {
        },
        watch: {
        },
        methods: {
            // required !
            "createComponent": function () {
                this.createInfoWindow();
                this.$dispatch( "register-infowindow", this );
            },
            "createInfoWindow": function () {
                this.componentObj = new BMap.InfoWindow( this.$els.window );
            },
            "removeMarker": function () {

            }
        }
    }
</script>
<style lang="scss" scoped>
    .component-section {
        z-index: 2;
        width: auto;
        height: auto;
        overflow: hidden;
        display: none;
    }
</style>

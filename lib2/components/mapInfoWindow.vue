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
        },
        size: {
            required: false,
            type: Object,
            twoway: false
        },
        visible: {
            required: false,
            type: Boolean,
            twoway: false
        },
        position: {
            required: false,
            type: Object,
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
            "visible": function ( val ) {
                if ( val && this.position && this.position.lat && this.position.lng ) {
                    this.mapObj.openInfoWindow( this.componentObj, new BMap.Point( this.position.lng, this.position.lat ) );
                } else {
                    this.mapObj.closeInfoWindow();
                }
            }
        },
        methods: {
            // required !
            "createComponent": function () {
                this.createInfoWindow();
                this.$dispatch( "register-infowindow", this );
            },
            "createInfoWindow": function () {
                this.componentObj = new BMap.InfoWindow( this.$els.window );
                if ( this.size && this.size.width && this.size.height ) {
                    this.componentObj.setWidth( this.size.width );
                    this.componentObj.setHeight( this.size.height );
                }
                if ( this.visible && this.position && this.position.lat && this.position.lng ) {
                    this.mapObj.openInfoWindow( this.componentObj, new BMap.Point( this.position.lng, this.position.lat ) );
                }
            },
            "removeMarker": function () {

            }
        }
    }
</script>
<style lang="css" scoped>
    .component-section {
        z-index: 2;
        width: auto;
        height: auto;
        overflow: hidden;
        display: none;
    }
</style>

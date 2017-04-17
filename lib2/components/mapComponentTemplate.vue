<!--template for infowindow start-->
<template>
    <div class="component-section">
        <div v-el:window class="infowindow-box">
            <slot></slot>
        </div>
    </div>
</template>
<!--template for infowindow end-->

<script>
    import componentsMixin from "../mixin/overlaysMixin.js";

    const props = {

    };
    export default {
        mixins: [ componentsMixin ],
        props: props,
        data: function () {
            return {
                componentsObj: undefined                // map components object
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
            createComponent: function () {
                this.drawMarker();
            },
            drawMarker: function () {

            },
            removeMarker: function () {

            }
        }

    }
</script>
import Vue from "vue";
import createRoadbook from "./createMap.vue";

let app = new Vue({
    el: "#app",
    data: function () {
        return {

        }
    },
    ready: function () {

    },
    methods: {

    },
    components: {
        "map-box": createRoadbook
    }
})

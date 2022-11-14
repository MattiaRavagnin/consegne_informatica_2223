<template>
  <div class="h-screen relative">
    <div id="map" class="h-full z-[1]"></div>
  </div>
</template>

<script>
import leaflet from "leaflet";
import { onMounted } from "vue";

export default {
  TOKEN:
    "pk.eyJ1IjoibWF0dGlhcmF2YWduaW45OSIsImEiOiJjbGFoOGU2Z2EwNjE3M3VueWlsbXlwZGZ0In0.uVxGywDyvoeSZ0z9g96AqA",
  name: "Home",
  components: {},
  setup() {
    let map;
    onMounted(() => {
      //init map
      map = leaflet
        .map("map")
        .setView([45.49597872984954, 12.257380498490015], 18); //TODO: insert default location (long,lat,zoom)

      //add tile layer
      leaflet
        .tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
        })
        .addTo(map);
    });
  },
};
</script>

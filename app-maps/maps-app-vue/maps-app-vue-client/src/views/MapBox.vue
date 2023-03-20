<template>
  <div class="h-screen relative">
    <!-- <button
      type="button"
      :disabled="loading"
      :class="{ disabled: loading }"
      class="location-btn"
      @click="getLocation"
    >
      Get Location
    </button> -->
    <div id="map" class="h-full z-[1] rounded-lg"></div>
  </div>
  
</template>

<script>
import axios from "axios";
import mapboxgl from "mapbox-gl";
//import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";


export default {
  name: "Test",
  created() {},
  data() {
    return {
      loading: false,
      location: "",
      access_token: 'pk.eyJ1IjoibWF0dGlhcmF2YWduaW45OSIsImEiOiJjbGFmc2w4aTgwb2ZmM3JwcXF6Mzg3NXhsIn0.gZ_Rxa5VLS6ei_wXvRrgeQ',
      //access_token: process.env.VUE_APP_MAP_ACCESS_TOKEN,
      center: [45.49597872984954, 12.257380498490015],
      map: {},
    };
  },
  props: {},
  mounted() {
    this.createMap()

  },
  methods: {
    async createMap() {
      try {
        mapboxgl.accessToken = this.access_token;
        this.map = new mapboxgl.Map({
          container: "map",
          style: "mapbox://styles/mattiaravagnin99/clcge9cqi005j14p29e7mdnrp",
          //center: this.center,
          
          center: [45.495024301689334, 12.257587145658855],
          zoom: 9,
          
        });

        this.map.addControl(
          new mapboxgl.GeolocateControl({
            positionOptions: {
            enableHighAccuracy: true
            },
            // When active the map will receive updates to the device's location as it changes.
            trackUserLocation: true,
            // Draw an arrow next to the location dot to indicate which direction the device is heading.
            showUserHeading: true
            })
        );
        

      } catch (err) {
        console.log("map error", err);
      }
    },
    

    async getLocation() {
      try {
        this.loading = true;
        const response = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${this.center[0]},${this.center[1]}.json?access_token=${this.access_token}`
        );
        this.loading = false;
        this.location = response.data.features[0].place_name;
        console.log(response)
      } catch (err) {
        this.loading = false;
        console.log(err);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>


https://api.mapbox.com/geocoding/v5/mapbox.places/45.49597872984954,12.257380498490015.json?access_token=pk.eyJ1IjoibWF0dGlhcmF2YWduaW45OSIsImEiOiJjbGFmc2w4aTgwb2ZmM3JwcXF6Mzg3NXhsIn0.gZ_Rxa5VLS6ei_wXvRrgeQ`
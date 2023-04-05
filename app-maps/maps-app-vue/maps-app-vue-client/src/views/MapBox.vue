<template>
  <div class="h-screen relative">

    <div id="map" class="h-full z-[1] rounded-lg"></div>

  </div>
  
</template>

<script>

// import { ref } from "vue";

//import axios from "axios";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
//import MapboxDirections from "@mapbox/mapbox-gl-directions"
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";


import axios from "axios";


export default {
  name: "Test",
  created() {},
  components: {
    
  },
  data() {
    return {
      infoPlace: {},
      access_token: 'pk.eyJ1IjoibWF0dGlhcmF2YWduaW45OSIsImEiOiJjbGFmc2w4aTgwb2ZmM3JwcXF6Mzg3NXhsIn0.gZ_Rxa5VLS6ei_wXvRrgeQ',
      //access_token: process.env.VUE_APP_MAP_ACCESS_TOKEN,
      tokenReq: ''
    };
  },
  props: {},
  async mounted() {
    //GET server for token
    await axios.get(`http://localhost:3000/getToken`)
      .then( (response) => {
        this.tokenReq = response.data.token
      })
      .catch( (e) => {console.log(e)})
    
    mapboxgl.accessToken = this.tokenReq;
    
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mattiaravagnin99/clcge9cqi005j14p29e7mdnrp",
      center: [12.257574939526478,45.49524245919673],
      zoom: 17,
    });

    //navigor control
    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav, "top-left");

    //user tracker
    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    });
    map.addControl(geolocate, "top-left")

    //search place
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      reverseGeocode: true,
      getItemValue: (item) => {
        this.infoPlace = item;
        console.log(this.infoPlace)
      },

      })

    


    map.addControl(geocoder, "top-right");
    
    
    }
    // const coords = ref(null);
    // const fetchCoords = ref(null);
  
  
};
</script>

<style lang="scss" scoped></style>



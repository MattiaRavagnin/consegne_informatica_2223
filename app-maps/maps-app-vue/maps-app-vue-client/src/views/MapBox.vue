<template>
  <div class="h-screen relative">

    <div id="map" class="h-full z-[1] rounded-lg"></div>

  </div>
  
</template>

<script>
//import axios from "axios";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
//import MapboxDirections from "@mapbox/mapbox-gl-directions"
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";


export default {
  name: "Test",
  created() {},
  data() {
    return {
      access_token: 'pk.eyJ1IjoibWF0dGlhcmF2YWduaW45OSIsImEiOiJjbGFmc2w4aTgwb2ZmM3JwcXF6Mzg3NXhsIn0.gZ_Rxa5VLS6ei_wXvRrgeQ',
      //access_token: process.env.VUE_APP_MAP_ACCESS_TOKEN,
    };
  },
  props: {},
  mounted() {
    mapboxgl.accessToken = this.access_token;

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
      mapboxgl: mapboxgl
      })

    map.addControl(geocoder, "top-right");

    // map.addControl(
    //   new mapboxgl.MapboxDirections({
    //   accessToken: mapboxgl.accessToken
    //   }),
    //   'bottom-left'
    // );


    //this.createMap()

  },
  methods: {
    // async createMap() {
    //   try {
    //     mapboxgl.accessToken = this.access_token;
    //     this.map = new mapboxgl.Map({
    //       container: "map",
    //       style: "mapbox://styles/mattiaravagnin99/clcge9cqi005j14p29e7mdnrp",
    //       //center: this.center,
          
    //       center: [12.257574939526478,45.49524245919673],
    //       zoom: 17,
          
    //     });

    //     const nav = new mapboxgl.NavigationControl();
    //     map.addControl(nav, "top-right");


    //     const geolocate = new mapboxgl.GeolocateControl({
    //       positionOptions: {
    //         enableHighAccuracy: true
    //       },
    //       trackUserLocation: true
    //     });

    //    this.map.addControl(geolocate, "top-right")

    //     // let geocoder =  new MapboxGeocoder({
    //     //     accessToken: this.access_token,
    //     //     mapboxgl: mapboxgl,
    //     //     marker: false,
    //     //   }); 

    //     // this.map.addControl(geocoder);

    //     // geocoder.on("result", (e) => {
    //     //   const marker = new mapboxgl.Marker({
    //     //     draggable: true,
    //     //     color: "#D80739",
    //     //   })
    //     //     .setLngLat(e.result.center)
    //     //     .addTo(this.map);
    //     //   this.center = e.result.center;
    //     //   marker.on("dragend", (e) => {
    //     //     this.center = Object.values(e.target.getLngLat());
    //     //   });
    //     // });




    //     this.map.addControl(
    //       new mapboxgl.Marker()
    //         .setLngLat([12.257574939526478,45.49524245919673])
    //         .addTo(this.map)
    //     )
        

    //   } catch (err) {
    //     console.log("map error", err);
    //   }
    // },
    

    // async getLocation() {
    //   try {
    //     this.loading = true;
    //     const response = await axios.get(
    //       `https://api.mapbox.com/geocoding/v5/mapbox.places/${this.center[0]},${this.center[1]}.json?access_token=${this.access_token}`
    //     );
    //     this.loading = false;
    //     this.location = response.data.features[0].place_name;
    //     console.log(response)
    //   } catch (err) {
    //     this.loading = false;
    //     console.log(err);
    //   }
    // },
  },
};
</script>

<style lang="scss" scoped></style>


https://api.mapbox.com/geocoding/v5/mapbox.places/45.49597872984954,12.257380498490015.json?access_token=pk.eyJ1IjoibWF0dGlhcmF2YWduaW45OSIsImEiOiJjbGFmc2w4aTgwb2ZmM3JwcXF6Mzg3NXhsIn0.gZ_Rxa5VLS6ei_wXvRrgeQ`
<template>
  <div class="h-screen relative">

  
    <GeoError
      @closeGeoError="closeGeoError()"
      v-if="geoError"
      :geoErrorMsg="geoErrorMsg"
    />

    <div >
      <!-- TODO: put search on left-down side from here -->
      <SearchMap  
        :fetchCoords="fetchCoords"
        :coords="coords"
        @toggleSearchResults="toggleSearchResults"
        @getGeolocation="getGeolocation"
        @plotResult="plotResult"
        @removeResult="removeResult"
        :searchResults="searchResults"
        class=""
      >
      
      </SearchMap>
    </div>
    

    <div class="">
      <FavList></FavList>
    </div>
    
    <div id="map" class="h-full z-[1] rounded-lg ">



    </div>


  </div>
</template>

<script>
import leaflet from "leaflet";
import { onMounted, ref } from "vue";
import axios from 'axios'

import GeoError from "../components/GeoError.vue";
// import MapFeatures from "../components/MapFeatures.vue";
import SearchMap from "../components/SearchMap.vue";
import FavList from "../components/FavList.vue";
//import ButtonList from "../components/ButtonList.vue";
// import NavBar from "../components/NavBar.vue";

export default {
  TOKEN:
    "pk.eyJ1IjoibWF0dGlhcmF2YWduaW45OSIsImEiOiJjbGFoOGU2Z2EwNjE3M3VueWlsbXlwZGZ0In0.uVxGywDyvoeSZ0z9g96AqA",
  name: "Home",
  components: {
    GeoError,
    SearchMap,
    FavList,
    
    
    //MapFeatures,
  },
  mounted() {
    
  },
  data() {
    return {
      list: {},
      showList: false
    }
  },
  setup() {
    let map;
    onMounted(() => {
      //init map
      map = leaflet.map("map").setView([45.49597872984954, 12.257380498490015], 18); //TODO: insert default location (long,lat,zoom)

      //add tile layer
      leaflet
        .tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
        })
        .addTo(map);

      map.on('moveend', () => {
        closeSearchResults()
      })
      map.onMapClick
      getGeolocation();
    });

    const coords = ref(null);
    const fetchCoords = ref(null);
    const geoMarker = ref(null);

    const geoError = ref(null);
    const geoErrorMsg = ref("");

    //get user location
    const getGeolocation = () => {
      if (!coords.value) {
        //check session for coords
        if (sessionStorage.getItem("coords")) {
          coords.value = JSON.parse(sessionStorage.getItem("coords"));
          plotGeolocation(coords.value);
          return;
        }
        fetchCoords.value = true;
        navigator.geolocation.getCurrentPosition(setCoords, getLocError);
      }
    };

    const setCoords = (pos) => {
      console.log(pos);
      //stop fetching coords
      fetchCoords.value = null;

      //set coords in session storage
      const setSessionCoords = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      };

      sessionStorage.setItem("coords", JSON.stringify(setSessionCoords));

      //set ref coords value
      coords.value = setSessionCoords;

      plotGeolocation(coords.value);
    };

    const getLocError = (err) => {
      fetchCoords.value = null;
      geoError.value = true;
      geoErrorMsg.value = err.message;
    };

    const plotGeolocation = () => {
      //create marker
      const customMarker = leaflet.icon({
        iconUrl: require("../assets/map-pin-solid.svg"),
        iconSize: [35, 35],
      });

      //create marker with coords and custom icon
      geoMarker.value = leaflet
        .marker([coords.value.lat, coords.value.lng], { icon: customMarker }) // ??? .value
        .addTo(map);

      // set map view (current location)
      map.setView([coords.value.lat, coords.value.lng], 16);
    };

    const closeGeoError = () => {
      geoError.value = null;
      geoErrorMsg.value = null;
    };

    const resultMarker = ref(null);
    const plotResult = (coords) => {

      if (resultMarker.value) {
        map.removeLayer(resultMarker.value);
      }

      //create marker
      const customMarker = leaflet.icon({
        // TODO change marker image
        iconUrl: require("../assets/location-dot-solid.svg"),
        iconSize: [35, 35],
      });

      //create marker with coords and custom icon
      resultMarker.value = leaflet
        .marker([coords.coordinates[1], coords.coordinates[0]], { icon: customMarker }) // ??? .value
        .addTo(map);

      // set map view (current location)
      map.setView([coords.coordinates[1], coords.coordinates[0]], 14);
    };

    const searchResults = ref(null);
    const toggleSearchResults = () => {
      searchResults.value = !searchResults.value;
    };

    const closeSearchResults = () => {
      searchResults.value = null;
    };

    const removeResult = () => {
      map.removeLayer(resultMarker.value)
    }

    
    const centerFavPlace = (coords) => {

      if (resultMarker.value) {
        map.removeLayer(resultMarker.value);
      }

      //create marker
      const customMarker = leaflet.icon({
        // TODO change marker image
        iconUrl: require("../assets/location-dot-solid.svg"),
        iconSize: [35, 35],
      });

      //create marker with coords and custom icon
      resultMarker.value = leaflet
        .marker([coords[0].lat, coords[0].lng], { icon: customMarker }) // ??? .value
        .addTo(map);
      
        // set map view (current location)
      map.setView([coords[0].lat, coords[0].lng], 15);
    };


    const getFavList = () => {
      axios
        .get(`http://localhost:3000/getFavList`)
        .then(response => {
          this.list = response.data
          console.log(this.list)
        })
    }
    // const event = new Event('centerFavPlace');
    // event.

    return { coords, fetchCoords, geoMarker, closeGeoError, geoError, geoErrorMsg, plotResult, toggleSearchResults, closeSearchResults, searchResults, removeResult, centerFavPlace, getFavList };
  },
};
</script>

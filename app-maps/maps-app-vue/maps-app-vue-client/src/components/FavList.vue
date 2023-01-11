<template>
  <div class=" md:w-auto absolute md:top-[40px] md:right-[60px] z-[2] flex gap-4 px-6 py-8 md:px-0 md:py-0 bg-white ">
    <!-- <div class="">
      <button @click="viewFavList()" class="bg-black hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-full ">
        <i class="fa-sharp fa-solid fa-heart"></i>
      </button>
    </div> -->
    <!-- v-if="showList" -->
    <div  class=" overflow-auto  bg-black rounded-md mx-2 max-h-64">
      <div v-for="(place, index) in list" :key="index" class="mx-2 my-2 mr-2 bg-gray-200 rounded-md">
          <div class="mx-2">
            {{ place.locality }}, {{ place.city }}
          </div>
          
          <p class="ml-4">
            {{ place.region }} {{ place.country }}
          </p>
          <div class="flex flex-row-reverse">
            <!-- icon for tp in map -->
            <button class="flex justify-end pb-2 pr-2 fa-solid fa-map-location-dot" @click="getCoords(place)"></button>
            <!-- icon for remove place from list -->
            <button class="flex justify-end pb-2 pr-2 fa-solid fa-heart-circle-minus" @click="removePlace(place)"></button>
          </div>
          
      </div>
    </div>
  </div>

  
</template>

<script>
import axios from "axios";
export default {
  name: "FavList",
  async mounted() {
    await axios
        .get(`http://localhost:3000/getFavList`)
        .then(response => {
          this.list = response.data
          console.log(this.list)
        })
  },
  created() {},
  data() {
    return {
      showList: false,
      list: {}
    };
  },
  props: {},
  
  methods: {

    viewFavList(){
      if(!this.showList){
        this.showList = true
      }else {
        this.showList = false
      }
    },
    

    async getCoords(place){
      let id_place = place.id_place
      axios
        .get(`http://localhost:3000/getCoords/${id_place}`)
        .then(response => {
          this.coord = response.data
          console.log(this.coord)
          this.$parent.centerFavPlace(this.coord)
        }
          
      )
    },
    async removePlace(place){
      let id_place = place.id_place
      axios
        .delete(`http://localhost:3000/removePlace/${id_place}`)
    },

  }

};
</script>

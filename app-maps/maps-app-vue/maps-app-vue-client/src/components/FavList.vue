<template>
  <div class="w-full md:w-auto absolute md:top-[40px] md:right-[60px] z-[2] flex gap-4 px-6 py-8 md:px-0 md:py-0 bg-transparent">
    <div>
      <button @click="viewFavList()" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">FavList</button>
    </div>
    <div v-if="showList" class="mt-12 bg-white rounded-md mx-2">
      <div v-for="(place, index) in list" :key="index" @click="getCoords(place)" class="mx-2 my-2 mr-2 bg-gray-200 rounded-md">
          <div class="mx-2">
            {{ place.locality }}, {{ place.city }}
          </div>
          <div class="ml-4">
            {{ place.region }} {{ place.country }}
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "FavList",
  mounted() {
    axios
        .get(`http://localhost:3000/getFavList`)
        .then(response => {
          this.list = response.data
          console.log(this.list)
        })
  },
  created() {},
  data() {
    return {
      showList: false
    };
  },
  props: {},
  
  methods: {
    viewFavList(){
      if(!this.showList){
        this.showList = true
      }else{
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

      
    }
  }

};
</script>

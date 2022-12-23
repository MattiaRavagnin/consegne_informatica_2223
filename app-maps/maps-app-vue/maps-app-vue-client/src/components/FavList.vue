<template>
  <div>
    <button @click="viewFavList" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">FavList</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "FavList",
  created() {},
  data() {
    return {};
  },
  props: {},
  methods: {
    viewFavList(){
      axios
        .get(`http://localhost:3000/favList`)
        .then(response => {
          this.list = response.data
        })
      
      console.log(this.list)
    }
  }
    
    
  

};
</script>

<template>

  <div class="bg-cover bg-center z-[0] bg-slate-200">

    <!-- <img src="../assets/wallpaper/WallpaperDog-20512852.jpg" alt="" class="z-[0] relative"> -->

    <div class="flex items-center justify-center h-screen z-[10] absolute" style="font-family: 'Sofia Sans', sans-serif">
      <div>
        <button @click="goToMap()" class="grid-rows-2 items-center justify-center flex bg-slate-600 hover:bg-slate-500 hover:shadow-none text-white px-4 py-2 rounded-lg text-xl shadow-lg"><i class="fa-solid fa-map-location-dot mr-2 "></i> Click for Map</button>
      </div>
      
    </div>

  </div>
</template>

<script>
import router from '../router/index'

export default {
  name: "Test",
  created() {},
  data() {
    return {};
  },
  props: {},
  methods: {
    goToMap(){
      router.push('/map')
    }
  },
};
</script>

<style lang="scss" scoped>
  
</style>
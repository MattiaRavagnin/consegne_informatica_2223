<template>
  <div class="w-full md:w-auto absolute md:top-[40px] md:right-[60px] z-[2] flex gap-4 px-6 py-8 md:px-0 md:py-0 bg-white ">
    <button @click="viewList()" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-full ">
      <i class="fa-sharp fa-solid fa-heart"></i>
    </button>
  </div>
</template>

<script>
export default {
  name: "Test",
  created() {},
  data() {
    return {
      showListBool: false
    };
  },
  props: {},
  methods: {

    viewList() {
      // if(!this.$parent.showList){
      //   this.showList = true
      // }else{
      //   this.$parent.showList = false
      // }
      console.log('salaaaammm')

    }
    

  },
};
</script>

<style lang="scss" scoped></style>
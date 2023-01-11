<template>
  <div>

    <div class="flex items-center justify-center h-screen">
      <button @click="goToMap()">Click for Map</button>
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

<style lang="scss" scoped></style>
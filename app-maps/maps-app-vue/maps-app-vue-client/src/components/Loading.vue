<template>
  <div class="h-full w-full flex items-center justify-center">
    <span
      class="block w-[60px] h-[60px] border-[5px] border-solid border-transparent border-t-black rounded-full animate-spin"
    >
    </span>
    <!-- <half-circle-spinner :animation-duration="1000" :size="60" color="#ff1d5e" /> -->
  </div>
</template>

<script>
//import { HalfCircleSpinner } from "epic-spinners";
export default {
  name: "loading",
  //components: { HalfCircleSpinner },
};
</script>

<template>
  <div
    class="w-full md:w-auto absolute md:top-[40px] md:left-[60px] z-[2] flex gap-4 px-6 py-8 md:px-0 md:py-0 bg-transparent"
  >
    <!-- Search -->
    <div class="realtive flex-1 md:min-w-[350px]">
      <!-- Input -->
      <input
        class="pl-9 pr-4 py-3 text-sm focus:outline-none w-full shadow-md rounded-md"
        type="text"
        placeholder="Search..."
        v-model="searchQuery"
        @input="search"
        @focus="$emit('toggleSearchResults')"
      />
      <!-- Search Icon -->
      <div class="absolute top-0 left-[8px] h-full flex items-center">
        <i class="fas fa-search"></i>
      </div>

      <!-- Search Results -->
      <div class="absolute mt-[8px] w-full">
        
        <!-- Results -->
        <div v-if="searchQuery && searchResults" class="h-[200px] overflow-scroll bg-white rounded-md">
          <!-- Loading -->
          <!-- FIXME loading panel -->
          <Loading v-if="!searchData"/>
          <div v-else>
            <div
            class="px-4 py-2 flex gap-x-2 cursor-pointer hover:bg-slate-600 hover:text-white"
              v-for="(result, index) in searchData"
              :key="index"
              @click="selectResult(result)"
            >
              <i class="fas fa-map-marker-alt"></i>
              <p class="text-xs">{{ result.place_name }}</p>
            </div>
          </div>

          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import Loading from '../components/Loading.vue'
export default {
  props: ["coords", "fetchCoords", "searchResults"],
  component: {Loading},
  setup(props, {emit}) {
    const searchQuery = ref(null);
    const searchData = ref(null);
    const queryTimeout = ref(null);
    const selectedResult = ref(null);

    const search = () => {
      clearTimeout(queryTimeout.value);

      searchData.value = null
      queryTimeout.value = setTimeout(async () => {
        if (searchQuery.value !== "") {
          const params = new URLSearchParams({
            fuzzyMatch: true,
            languange: "en",
            limit: 10,
            proximity: props.coords
              ? `${props.coords.lng},${props.coords.lat}`
              : "0,0",
          });
          //request to server
          const getData = await axios.get(
            `http://localhost:3000/api/search/${searchQuery.value}?${params}`
          );
          searchData.value = getData.data.features;
          console.log(searchData.value);
        }
      }, 750);
    };

    const selectResult = (result) => {
      selectedResult.value = result
      emit('plotResult', result.geometry)
    }

    return { searchQuery, searchData, search, selectResult, queryTimeout };
  },
};
</script>

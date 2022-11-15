<template>
    <div class="h-screen absolute w-full z-10 flex justify-center items-start pt-[125px] bg-black/20">
        <div class="flex flex-col bg-white shadow-sm w-[80%] sm:w-[450px] px-6 py-4 rounded-md">
            <h1 class="text-lg mb-1">Error: {{geoErrorMsg}}</h1>
            <p class="text-sm mb-4">
                For this application features, please ensure location services are enable
            </p>
            <button @click="$emit('closeGeoError')" class="self-start py-2 px-4 bg-red-500 text-white rounded-md text-sm">
                close
            </button>
        </div>
    </div>
</template>

<script>
export default {
    props: ['geoErrorMsg']
}

</script>

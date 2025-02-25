<template>
<div class=" bg-white dark:bg-gray-800  h-[90vh] fixed z-[9] top-[0] md:top-1/2 left-1/2 -translate-x-1/2 md:-translate-y-1/2 w-full md:w-[90vw] md:p-5 flex justify-center items-end md:items-center border rounded-lg dark:border-gray-600">
    <div class="md:w-fit w-full overflow-y-auto h-[100%] inner">
        
    <GlipComponent
      v-for="(video, index) in videos"
      :key="index"
      :video-src="video"
    />
 </div>
</div>
<!--  <div class="reels-container">
    <GlipComponent
      v-for="(video, index) in videos"
      :key="index"
      :video-src="video"
    />
 </div> -->
</template>

<script>
export default {
    props: {
        videos: {
            required: true,
        },
    },
}
</script>

<style scoped>
.reels-container{
    @apply h-[93vh] overflow-y-auto fixed z-[9] top-[0] md:top-1/2 left-1/2 -translate-x-1/2 md:-translate-y-1/2 w-full md:w-fit
}
.inner{
    scroll-snap-type: y mandatory;
}

.inner{
  overflow: auto; /* or scroll */
  scrollbar-width: none; /* For Firefox */
  -ms-overflow-style: none; /* For Internet Explorer and Edge */
}

.inner::-webkit-scrollbar {
  display: none; /* For Chrome, Safari, and newer Edge */
}
</style>
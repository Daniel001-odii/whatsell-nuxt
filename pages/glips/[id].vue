<template>
    <!--  <div
        class=" bg-white dark:bg-gray-800 h-[93vh] fixed z-[9] top-[0] md:top-1/2 left-1/2 -translate-x-1/2 md:-translate-y-1/2 w-full md:w-[90vw] md:p-5 flex justify-center items-end md:items-center border rounded-lg dark:border-gray-600">


  --> <!-- <UButton color="green" class="absolute top-5 left-5 z-10 rounded-full" icon="material-symbols:chevron-left"
            variant="soft" /> -->
    <!-- <div class="md:w-fit w-full overflow-y-auto h-[100%] inner"> -->
    <!--   <GlipComponent v-for="(item, index) in glips.glips" :key="index" :video-src="item.video_url" :glip="item"
                :shop="glips.shop" /> -->
    <!-- </div> -->
    <!-- </div> -->
    <div
        class=" bg-black fixed border-t top-0 left-0  h-[90%] md:h-full w-full flex justify-center items-center z-10">
        <UButton
        @click="useRouter().push('/glips')"
        color="green" class="absolute top-5 left-5 z-10 rounded-full" icon="material-symbols:chevron-left"
            variant="soft" />
        <div class="md:w-fit w-full overflow-y-auto md:h-[800px] h-full inner">
            <GlipComponent v-for="(item, index) in glips" :key="index" :video-src="item.video_url" :glip="item"
                :shop="glips.shop" />
        </div>

    </div>
</template>

<script setup>
definePageMeta({
    layout: 'empty',
})
import { useRoute, useAsyncData, useRuntimeConfig } from '#app';

const route = useRoute();
const config = useRuntimeConfig();

const { data: glips, error: glips_error } = await useAsyncData(`glips`, async () => {
    const response = await $fetch(`${config.public.apiBase}/products/glips/details/${route.query.id}`);
    console.log('glips details: ', response.result);
    return response.result; // Extracting the nested glips array
});

  // Set meta tags dynamically (before page is rendered)
  useHead({
    title: `${glips.value[0]?.name} - NGN${glips.value[0]?.price.toLocaleString()}` || "Default glip Title",
    meta: [
      { name: 'description', content: glips.value[0]?.description || 'Default description' },
      { property: "og:title", content: `${glips.value[0]?.name} - NGN${glips.value[0]?.price.toLocaleString()}` || "Default glip Title" },
      { property: "og:description", content: glips.value[0]?.description || "Default glip Description" },
      { property: "og:image", content: glips.value[0]?.thumbnail || "https://raw.githubusercontent.com/Daniel001-odii/WhaSell/refs/heads/main/src/assets/images/whatsell_email_header.png" },
      { property: "og:type", content: "glip" },
      { property: "og:url", content: `https://wha-sell.vercel.app/glips/${route.params.id}?id=${route.query.id}` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: glips.value[0]?.thumbnail || "https://raw.githubusercontent.com/Daniel001-odii/WhaSell/refs/heads/main/src/assets/images/whatsell_email_header.png" },
      { name: "twitter:title", content: `${glips.value[0]?.name} - NGN${glips.value[0]?.price.toLocaleString()}` || "Default glip Title" },
      { name: "twitter:description", content: glips.value[0]?.description || "Default glip Description" }, 

    ],
  });

</script>

<!-- https://res.cloudinary.com/djyopolxa/video/upload/eo_20,so_0/xgafocgc29xme6npip2u?_a=BAMCkGJv0
https://res.cloudinary.com/djyopolxa/video/upload/so_5,vc_auto,w_800/${vid_key}.jpg

https://res.cloudinary.com/${cloudName}/video/upload/so_5,vc_auto,w_800/${videoPublicId}.jpg -->

<style scoped>
.inner {
    scroll-snap-type: y mandatory;
}

.inner {
    overflow: auto;
    /* or scroll */
    scrollbar-width: none;
    /* For Firefox */
    -ms-overflow-style: none;
    /* For Internet Explorer and Edge */
}

.inner::-webkit-scrollbar {
    display: none;
    /* For Chrome, Safari, and newer Edge */
}
</style>
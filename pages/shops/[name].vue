<template>
    <div class=" p-12">
        <!-- <h1>{{ route.params.name }}</h1> -->
         <img :src="shop?.profile?.image_url" />
         <h1 class=" font-bold text-3xl">{{ shop.name }}</h1>
         <div class=" max-w-[200px] overflow-hidden">{{ shop }}</div>
    </div>
</template>

<script setup>
import { useRoute, useAsyncData, useHead } from '#imports';
const route = useRoute();
const config = useRuntimeConfig();
const isExpanded = ref(false);
const shopImage = ref('');
const shopBoostDuration = ref(1);
const glipsModal = ref(false);
const loading = ref(false);
const currentTab = ref(0);
const products = ref([]);
const glips = ref([]);
const user = ref('');
const shopId = ref('');
const shopRating = ref(4);
const loadingProducts = ref(false);
const loadingGlips = ref(false);
const followers = ref([]);
const boostShopModal = ref(false);





// Fetch shop data before rendering (SSR-compatible)
const { data: shop } = await useAsyncData('shop', async () => {
    const response = await $fetch(`${config.public.apiBase}/shops/${route.params.name}/full`);
    console.log("shop: ", response);
    return response.shop;
});
  
  // Set meta tags dynamically (before page is rendered)
  useHead({
    title: `${shop.value?.name} - NGN${shop.value?.category}`,
    meta: [
      { name: 'description', content: shop.value?.description || 'Default description' },
      { property: "og:title", content: `${shop.value?.name}` },
      { property: "og:description", content: shop.value?.description || "Default shop Description" },
      { property: "og:image", content: shop.value?.profile?.image_url },
      { property: "og:type", content: "shop" },
      { property: "og:url", content: `https://wha-sell.vercel.app/shops/${route.params.name}` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: shop.value?.profile?.image_url }
    ],
  });
</script>

<style scoped>

</style>
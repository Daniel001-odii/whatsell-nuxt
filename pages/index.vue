<template>

<ScrollToTop/>

<div class=" min-h-screen md:p-0">

<!-- HERO CAROUSEL -->
<UCarousel v-slot="{ item }" :items="items" :ui="{ item: 'basis-full' }" class="rounded-lg overflow-hidden" arrows>
  <img :src="item" class="w-full !max-h-[800px]" draggable="false">
</UCarousel>


<!-- all categories.... -->
<h2 class=" font-bold mt-12">Explore Our Categories</h2>
<!-- {{ categories }} -->
<div class=" flex flex-row gap-3 overflow-x-auto mt-3">
  <NuxtLink 
  target="_blank"
  :to="`/categories/${category.category}`" v-for="(category, index) in categories" 
  :style="category?.firstImage ? `background-image: url('${category?.firstImage[0]}')`:`background-image: url('../assets/images/logo/whatsell_gray.png'); background-size: contain;`" 
  class=" flex justify-center items-start text-sm min-w-[200px] h-[260px] bg-black bg-opacity-50 text-white rounded-xl pt-5 font-bold">{{ category.category }}</NuxtLink>
</div>

<!-- best deals for your 2morrow -->
<h2 class=" font-bold mt-12">Best Deals for you today</h2>
<div class=" flex flex-row flex-wrap gap-3">
    <MasonryWall
    :items="products"
    :ssr-columns="1"
    :column-width="130"
    :gap="10"
    >
      <template #default="{ item, index }">
        <ProductCard class=" mt-[15px]"
          :has-liked-button="false"
          :id="item._id"
          :product_image="item.images[0]"
          :product_price="item.price"
          :image_url="item.images[0]"
          :views="item.views"
          :product_slug="item.slug"
        />
      </template>
    </MasonryWall>
</div>

<!-- get all shops -->
<h2 class=" font-bold mt-12">Discover Shops Near your location</h2>
<!-- shops: {{ shops }} -->
<div class=" flex flex-row overflow-x-auto gap-3 mt-3">
  <ShopCard 
  v-for="(shop, index) in shops"
  :key="index"
  :name="shop?.name"
  :category="shop?.category"
  :image_url="shop?.profile?.image_url"
  :location="`${shop?.owner?.location?.state} | ${shop?.owner?.location?.LGA}`"
  />
</div>

<!-- DISCOUNTS OF THE WEEK -->
<h2 class=" font-bold mt-12">Discounts of the week</h2>
<div class=" flex flex-row overflow-x-auto gap-3 mt-3">
  <div v-for="item in 3" class="bg-[#FFEFE0] rounded-md text-black max-w-[350px] flex flex-col h-[400px] overflow-hidden">
    <div class=" rounded-md p-5 flex flex-col gap-1 h-[50%]">
      <span>Get</span>
      <div class=" text-[#A2764C]">
        <span class=" font-bold text-3xl mr-3">20%</span>
        <small>Off</small>
      </div>
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing  praesentium.</p>
      <button class="rounded-full p-3 bg-[#DBC9B35C]">Start Date - End Date</button>
    </div>
    <div class=" h-[50%] bg-red-500 ">
      <img src="https://picsum.photos/1280/720?random=1" class=" h-full"/>
    </div>
  </div>
</div>


 <!-- FAQ SECTION -->
 <h2 class=" font-bold mt-12">Services to help you Shop</h2>
 <div class="flex flex-row flex-wrap gap-3 pb-10 mt-3">
      <div class="flex flex-col justify-between items-center flex-1 rounded-md overflow-hidden h-[300px] min-w-[300px] border dark:border-none">
          <div class="flex flex-col gap-3 bg-white dark:bg-gray-900 h-[50%] p-5 w-full">
              <span class="font-bold text-xl">Frequently Asked Questions</span>
              <p class="mt-2 text-sm">Updates on safe Shopping in our shops</p>
          </div>
          <div class=" h-[50%] bg-yellow-400 w-full question"></div>
      </div>

      <div class="flex flex-col justify-between items-center flex-1 rounded-md overflow-hidden h-[300px] min-w-[300px] border dark:border-none">
          <div class="flex flex-col gap-3 bg-white dark:bg-gray-900 h-[50%] p-5 w-full">
              <span class="font-bold text-xl">Navigate WhatSell With Ease</span>
              <p class="mt-2 text-sm">Updates how you can navigate WhatSell easily</p>
          </div>
          <div class=" h-[50%] bg-green-400 w-full coins"></div>
      </div>

      <div class="flex flex-col justify-between items-center flex-1 rounded-md overflow-hidden h-[300px] min-w-[300px] border dark:border-none">
          <div class="flex flex-col gap-3 bg-white dark:bg-gray-900 h-[50%] p-5 w-full">
              <span class="font-bold text-xl">Safety Tips for Secure Purchasing</span>
              <p class="mt-2 text-sm">Get full insight on how to safely buy products on WhatSell</p>
          </div>
          <div class=" h-[50%] bg-green-800 w-full gaurd"></div>
      </div>
  </div>

 </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useAsyncData, useHead } from '#imports';
import axios from 'axios'

const items = [
  'https://picsum.photos/1280/720?random=1',
  'https://picsum.photos/1280/720?random=2',
  'https://picsum.photos/1280/720?random=3',
  'https://picsum.photos/1280/720?random=4',
  'https://picsum.photos/1280/720?random=5',
  'https://picsum.photos/1280/720?random=6'
]

const config = useRuntimeConfig();

// Fetch and extract only the `products` array
const { data: products, error: products_error } = await useAsyncData('products', async () => {
  const response = await $fetch(`${config.public.apiBase}/products`)
  return response.products // Extracting the nested products array
})

const categories = ref([]);
async function getcats(){
  try{
    const response = await axios.get(`${config.public.apiBase}/categories_image`);
    categories.value = response.data.data;
    console.log("cats: ", response);
  }catch(error){
    console.log("erro getting categories: ", error);
  }
};

const shop_loading = ref(false);
const shops = ref([]);
async function getAllShops(){
  shop_loading.value = true;
  try{
    const response = await axios.get(`${config.public.apiBase}/shops/list/all`);
    shops.value = response.data.shops;
    console.log("all shops: ", response);
  }catch(error){
    console.log("error getting categories: ", error);
  }
  shop_loading.value = false;
}


onMounted (()=> {
  getcats();
  getAllShops();
})
// get all categories...
/* const { data: categories, error: category_error } = await useAsyncData('categories', async ()=> {

  try{
    const response = await $fetch(`${config.public.apiBase}/categories)`)
    console.log("catss: ", response);
    return response.categories
  }catch(error){
    console.log("error gettting cats: ", error);
  }

}) */


console.log("Fetched products:", products.value)
console.log("fetched categories: ", categories.value)

</script>

<style scoped>

</style>
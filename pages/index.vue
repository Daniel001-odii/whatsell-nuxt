<template>

<ScrollToTop/>

<div class=" min-h-screen md:p-0">

<!-- HERO CAROUSEL -->
<!-- <UCarousel v-slot="{ item }" :items="items" :ui="{ item: 'basis-full' }" class="rounded-lg overflow-hidden mt-3 !max-h-[300px]" arrows>
  <img :src="item" class="w-full " draggable="false">
</UCarousel>
 -->
<HeroSection/>

<!-- all categories.... -->
<h2 class=" font-bold mt-12">Explore Our Categories</h2>
<!-- {{ categories }} -->
<div class=" flex flex-row gap-3 overflow-x-auto mt-3 cat_box">
  <NuxtLink 
  target="_blank"
  :to="`/categories/${category.category}`" v-for="(category, index) in categories" 
  class=" flex justify-center items-center text-sm min-w-[200px] p-3 bg-white border dark:border-gray-600 dark:bg-gray-900 rounded-xl font-bold">{{ category.category }}</NuxtLink>
 <!--  <NuxtLink 
  target="_blank"
  :to="`/categories/${category.category}`" v-for="(category, index) in categories" 
  :style="category?.firstImage ? `background-image: url('${category?.firstImage[0]}')`:`background-size: contain;`" 
  class=" flex justify-center items-start text-sm min-w-[200px] h-[80px] md:h-[260px] bg-black bg-opacity-50 text-white rounded-xl pt-5 font-bold">{{ category.category }}</NuxtLink> -->
</div>

<!-- best deals for your 2morrow -->
<h2 class=" font-bold mt-12">Best Deals for you today</h2>
<div v-if="loading" class=" mt-12 flex flex-wrap gap-3">
            <!-- dummy product card -->
            <div v-for="card in 10"
                class=" flex-1 md:flex-0 min-w-[150px] w-[150px] h-[200px] flex flex-col gap-2 p-1 bg-gray-500 bg-opacity-20 rounded-md">
                <USkeleton class="w-full h-[50%]" :ui="{ background: 'dark:bg-gray-700' }" />
                <USkeleton class="w-[80%] h-[10px]" :ui="{ background: 'dark:bg-gray-700' }" />
                <USkeleton class="w-full h-[20px]" :ui="{ background: 'dark:bg-gray-700' }" />
                <USkeleton class="w-[70%] h-[10px]" :ui="{ background: 'dark:bg-gray-700' }" />
            </div>
        </div>
<div v-if="!loading && products.length > 0" class=" flex flex-row flex-wrap gap-3">
    <MasonryWall
    :items="products"
    :ssr-columns="1"
    :column-width="130"
    :gap="10"
    >
      <template #default="{ item, index }">
        <ProductCard class=" mt-[15px]"
          :has-liked-button="true"
          :id="item._id"
          :product_price="(item.price).toLocaleString()"
          :image_url="item.images[0]"
          :views="item.views"
          :is_liked="checkLikes(item._id)"
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
  :header_image="shop?.headerImage"
  :name="shop?.name"
  :category="shop?.category"
  :image_url="shop?.profile?.image_url"
  :location="`${shop?.owner?.location?.state} | ${shop?.owner?.location?.LGA}`"
  />
</div>

<!-- DISCOUNTS OF THE WEEK -->
<!-- <h2 class=" font-bold mt-12">Discounts of the week</h2>
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
</div> -->


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
import { useRoute, useAsyncData } from '#imports';
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

const loading = ref(false);
// Fetch and extract only the `products` array
const { data: products, error: products_error } = await useAsyncData('products', async () => {
  loading.value = true;
  const response = await $fetch(`${config.public.apiBase}/products`);
  loading.value = false;
  return response.products // Extracting the nested products array
})

const categories = ref([]);
async function getcats(){
  try{
    const response = await useNuxtApp().$apiFetch(`/categories_image`);
    categories.value = response.data;
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
    const response = await useNuxtApp().$apiFetch(`/shops/list/all`);
    shops.value = response.shops;
    console.log("all shops: ", response);
  }catch(error){
    console.log("error getting categories: ", error);
  }
  shop_loading.value = false;
}



const user = ref(null);
const credits = ref(0);
const liked_products = ref([]);
const getUserDetails = async()=> {
    try {
        const res = await useNuxtApp().$apiFetch(`/user`);
        user.value = res.user;
        credits.value = res.credits;
        liked_products.value = res.user.liked_products;
        console.log('user: ', res)
    } catch (error) {
        console.log(error);
    }
}

const checkLikes = (product_id) => {
    if(liked_products.value.includes(product_id)){
        return true;
    } else {
        return false;
    }
};


onMounted (()=> {
  getcats();
  getAllShops();
  getUserDetails();
})

// console.log("Fetched products:", products.value)
// console.log("fetched categories: ", categories.value)


const toast = useToast();

const verifyEmail = async (token) => {
    try{
        const response = await axios.post(`${useRuntimeConfig().public.apiBase}/email_verify`, { token });
        console.log("res from email verifi: ", response);
        toast.add({ title: response.data.message })
    }catch(error){
        console.log("error from email verifi: ", error);
        toast.add({ title: error.response.data.message })
    }
};

onMounted(() => {
  const token = useRoute().query.token;
  if(token){
    verifyEmail(token);
  }
});


</script>

<style scoped>
.question{
    background: url('../assets/images/questions_yellow.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
}

.coins{
    background: url('../assets/images/coins_.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
}

.gaurd{
    background: url('../assets/images/gaurd_.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
}

.cat_box {
  overflow: auto;
  /* or scroll */
  scrollbar-width: none;
  /* For Firefox */
  -ms-overflow-style: none;
  /* For Internet Explorer and Edge */
}

.cat_box::-webkit-scrollbar {
  display: none;
  /* For Chrome, Safari, and newer Edge */
}

</style>
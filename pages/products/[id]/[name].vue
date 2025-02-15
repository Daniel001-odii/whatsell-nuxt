<template>
  <!-- SHARE MODAL -->
  <UModal v-model="share_modal_open">
    <div class="p-12 flex flex-col gap-3">
      <span class=" font-bold text-2xl">Share this product</span>
      <div class=" mt-3 flex flex-row gap-6">
        <a :href="`whatsapp://send?text=Hey checkout this product on whatsell ${fullUrl}`" data-action="share/whatsapp/share">
          <button class=" text-green-500 text-4xl">
            <i class="bi bi-whatsapp"></i>
          </button>
        </a>

        <a target="_blank" :href="`http://www.facebook.com/share.php?u=${fullUrl}&amp;title='${product.name}'`">
          <button class=" text-blue-500 text-4xl">
              <i class="bi bi-facebook"></i>
          </button>
        </a>
        <button class=" text-slate-500 text-4xl">
            <i class="bi bi-twitter"></i>
        </button>
        <button class=" text-orange-500 text-4xl">
            <i class="bi bi-instagram"></i>
        </button>
      </div>
    </div>
  </UModal>



    <div>
      <!-- PRODUCT DETAIL AREA -->
      <div class="flex flex-col md:flex-row gap-12 mt-8 flex-wra relative" v-if="product">
            <div class="flex flex-col gap-3 md:w-[50%] ">
                <!-- <div :style="`background-image: url('${main_image}'); background-size: contain;`" class="full-image w-full h-[400px] rounded-md flex justify-center items-center bg-gray-100"></div> -->
                <div class=" flex flex-col gap-3"> 
                  <UCarousel 
                  v-slot="{ item }" :items="product_images" 
                  :prev-button="{
                    icon: 'i-heroicons-arrow-left-20-solid',
                  }"
                  :next-button="{
                    icon: 'i-heroicons-arrow-right-20-solid',
                  }"
                  :ui="{ item: 'basis-full' }" class="rounded-lg overflow-hidden max-h-[400px]" arrows>
                    <img :src="item" class="w-full !max-h-[800px]" draggable="false">
                  </UCarousel>
                <!-- <span>{{ product_images.length }}</span> -->
                  <div class="flex flex-row gap-3 overflow-hidden relative">
                    <img v-for="image in product_images" class=" size-[100px] rounded-lg flex-1" :src="image"/>
                    <!-- EXTRA IMG INDICATOR -->
                    <div class=" size-[100px] absolute right-0 rounded-lg flex justify-center items-center extra_img_indicator">
                      <span class=" font-bold text-xl">+1</span>
                    </div>
                  </div>
                </div>
            </div>
            
            <div class="flex flex-col md:w-[50%]">
                <span class="bg-green-500 bg-opacity-10 px-3 py-1 text-green-700 text-2xl font-semibold w-fit">{{ product.name }}</span>
                <span class="px-3 py-2 mt-2 text-orange-600 bg-orange-500 bg-opacity-10 w-fit rounded-md text-sm">
                    <i class="bi bi-stars"></i>
                    {{ product.condition }}
                </span>
                <span class="text-3xl font-bold mt-3">NGN {{ product.price.toLocaleString() }}</span>

                <div class="flex flex-col gap-2 mt-5">
                    <div class="flex flex-row justify-between">
                        <p class="font-bold text-xl">Product Description</p>
                    </div>
                    
                    <div v-html="product.description.substring(0, 500)" class=" min-h-[100px]"></div>
                    <div class="flex flex-col gap-3 flew-wrap text-sm text-gray-400">
                        <span><i class="bi bi-tag mr-1"></i>{{ product.category }}</span>
                        <span><i class="bi bi-geo-alt mr-1"></i>{{ product?.shop?.location?.address }}, {{  product?.shop?.location?.state }}</span>
                        <span><i class="bi bi-eye mr-1"></i>{{ product.views }} views</span>
                    </div>
                </div>
                <div class="mt-3 flex flex-col gap-2">
                    <button class="bg-app_green hover:bg-opacity-90 text-white w-full rounded-lg p-3 text-lg font-semibold" @click="proceed_to_buy = !proceed_to_buy">Buy this item</button>
                    <div class=" flex flex-row justify-between">
                        <button class="action_btns"><i class="bi bi-shop"></i> Shop</button>
                        <button class="action_btns border-l"><i class="bi bi-chat-square-quote"></i> Chat</button>
                        <button class="action_btns border-l"><i class="bi bi-hand-thumbs-up"></i> Like</button>
                        <button @click="share_modal_open = !share_modal_open" class="action_btns border-l"><i class="bi bi-share"></i> Share</button>
                    </div>
                </div>
            </div>
      </div>

      <!-- SIMILAR ITEMS YOU MAY LIKE -->
      <h2 class=" font-bold mt-12">Similar items you may like</h2>
      <div class="flex flex-row overflow-x-auto mt-3 flex-wrap pt-5 gap-3">
      <!-- similar products: {{ similar_products }} -->
      <ProductCard v-for="(item, index) in similar_products" class=" -mt-[15px] !w-[150px]"
              :hasLikedButton="false"
              :id="item._id"
              :product_slug="item.slug"
              :views="item.views"
              :posted="item.createdAt"
              :product_price="item.price.toLocaleString()"
              :shop_name="item.shop.name"
              @like-product="addProductToLikes(item._id)"
              :image_url="item.images[0]"
          >
        </ProductCard>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRoute, useAsyncData, useHead } from '#imports';
  import { Carousel, Slide, Navigation } from 'vue3-carousel';
  import {
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogOverlay,
    DialogPortal,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
  } from 'radix-vue'

import axios from 'axios'
import { useRequestURL } from '#app';

  // Get current route
  const route = useRoute();
  const config = useRuntimeConfig();
  const shop = ref(null);
  const isAllowed = ref(false);

  const product_images = ref([]);
  const share_modal_open = ref(false);
 
  // full path url..
  const fullUrl = useRequestURL().href;


  const currentSlide = ref(0);
  const slideTo = (nextSlide) => (currentSlide.value = nextSlide);

  const galleryConfig = {
    itemsToShow: 1,
    wrapAround: true,
    slideEffect: 'fade',
    mouseDrag: false,
    touchDrag: false,
    height: 320,
  };

  const thumbnailsConfig = {
    height: 80,
    itemsToShow: 6,
    wrapAround: true,
    touchDrag: false,
    gap: 10,
  };

  // Fetch product data before rendering (SSR-compatible)
  const { data: product } = await useAsyncData('product', async () => {
    const response = await $fetch(`${config.public.apiBase}/products/${route.params.id}`);
    shop.value = response.product.shop
    product_images.value = response.product.images;
    getSimilarProducts();
    return response.product;
  });

  
  const similar_products = ref([]);
  async function getSimilarProducts(){
    try{
        const response = await axios.get(`${config.public.apiBase}/products/similar/all?keyword=${product.value.name}`, );
        console.log(" all similar products: ", response);
        similar_products.value = response.data.products;
    }catch(error){
        console.log("error getting similar products: ", error);
    }
  }


  // Set meta tags dynamically (before page is rendered)
  useHead({
    title: `${product.value?.name} - NGN${product.value?.price.toLocaleString()}` || "Default Product Title",
    meta: [
      { name: 'description', content: product.value?.description || 'Default description' },
      { property: "og:title", content: `${product.value?.name} - NGN${product.value?.price.toLocaleString()}` || "Default Product Title" },
      { property: "og:description", content: product.value?.description || "Default Product Description" },
      { property: "og:image", content: product.value?.images[0] || "https://example.com/default-image.jpg" },
      { property: "og:type", content: "product" },
      { property: "og:url", content: `https://wha-sell.vercel.app/products/${route.params.id}` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: product.value?.images[0] || "https://example.com/default-image.jpg" }
    ],
  });

  onMounted(()=>{
    if(product.value){
      getSimilarProducts();
    }

  })
  </script>
  

<style>
.extra_img_indicator{
  background: rgb(7,104,184);
  background: linear-gradient(-270deg, rgba(7,104,184,0) 0%, rgba(0,0,0,1) 56%);
}


.action_btns{
  @apply  p-5 py-2 text-center flex-1 dark:border-gray-600 flex gap-2 justify-center items-center hover:bg-green-500 hover:bg-opacity-10
}
</style>
<template>
    <div>
       <!-- SHOP DETAIL BANNER -->
      <div class=" mt-3 border dark:border-gray-600 rounded-lg p-3 flex flex-row items-start justify-between gap-5 flex-wrap shadow-sm">
                <!-- SJOP IMAGE -->
                <div class=" flex flex-row gap-3 md:w-fit w-full">
                    <div class=" min-w-28 w-full md:!w-[200px] h-28 relative rounded-xl border border-gray-300  dark:border-gray-600  overflow-hidden">
                        <img :src="shop?.profile?.image_url" alt="shop Photo" class="w-full h-full object-cover">
                    </div>
                    <div class="flex flex-col" v-if="shop?.followers">
                        <RouterLink :to="`/shops/${shop.name}`">
                            <span class="text-xl font-bold">{{ shop.name }}</span>
                        </RouterLink>
                        <span class="text-md">{{ shop.category }}</span>
                        <span class="text-sm">Joined {{ shop.createdAt }} ago | {{ shop.followers.length }} followers</span>
                    </div>
                </div>

                <!-- ACTION BUTTONS -->
                <div v-if="!isAllowed" class="hidden md:flex flex-row gap-3 flex-wrap border-red-30 items-center justify-center">
                    <!-- <button @click="followShop(shop._id)" class=" text-sm border hover:border-gray-300 hover:bg-slate-100 rounded-full p-3 px-8 text-black font-medium"> 
                        <span v-if="!shop.followers.includes(user)"><i class="bi bi-plus mr-1"></i>follow</span>
                        <span v-else>following</span>
                    </button> -->

                    <button class="rounded-full h-10 w-10 hover:bg-slate-100 text-xl">
                            <i class="bi bi-telephone-fill"></i>
                    </button>
                    <button class="rounded-full h-10 w-10 hover:bg-slate-100 text-2xl">
                        <i class="bi bi-whatsapp"></i>
                    </button>
                </div>
      </div>

      <!-- PRODUCT DETAIL AREA -->
      <div class="flex flex-col md:flex-row gap-5 mt-8 flex-wra relative" v-if="product">
            <!-- <div class="flex flex-col md:flex-row gap-5 mt-8 flex-wra p-5 relative" v-if="product"> -->
            <div class="flex flex-row gap-4 absolute right-5 text-xl">
                 <!-- FOR NON AUTH USERS -->
                 <!-- <Dialog v-if="!user">
                    <DialogTrigger >
                        <button class="h-8 w-8 rounded-full bg-white flex justify-center items-center border" :class="checkLikes(product._id) ? 'border-green-500':''">
                            <i class="bi bi-hand-thumbs-up-fill text-green-500" v-if="checkLikes(product._id)"></i>
                            <i class="bi bi-hand-thumbs-up" v-else></i>
                        </button>
                    </DialogTrigger>
                    <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create an account</DialogTitle>
                        <DialogDescription>Please create an account or <RouterLink to="/login" class="underline text-blue-500"> log in.</RouterLink> 
                            This will allow you to like like products you are interested in, follow shops, boost your shop, and enjoy other exclusive features.
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter>
                        <RouterLink to="/register">
                            <button class="btn bg-app_green text-white">Register</button>
                        </RouterLink>
                    </DialogFooter>
                    </DialogContent>
                </Dialog>

                <button v-else @click="addProductToLikes(product._id)" class="h-8 w-8 rounded-full bg-white flex justify-center items-center border" :class="checkLikes(product._id) ? 'border-green-500':''">
                    <i class="bi bi-hand-thumbs-up-fill text-green-500" v-if="checkLikes(product._id)"></i>
                    <i class="bi bi-hand-thumbs-up" v-else></i>
                </button> -->
                <button class="h-8 w-8 rounded-full bg-white flex justify-center items-center border text-sm" p-3><i class="bi bi-share"></i></button>
            </div>
            <div class="flex flex-col gap-3 md:w-[50%] ">
                <!-- <div :style="`background-image: url('${main_image}'); background-size: contain;`" class="full-image w-full h-[400px] rounded-md flex justify-center items-center bg-gray-100"></div> -->
                <div class=""> 
                  <Carousel id="gallery" v-bind="galleryConfig" v-model="currentSlide">
                    <Slide  v-for="(image, index) in product_images" :key="index">
                      <img :src="image" alt="Gallery Image" class="gallery-image !rounded-lg" />
                    </Slide>
                  </Carousel>

                  <Carousel id="thumbnails" v-bind="thumbnailsConfig" v-model="currentSlide" class=" mt-3">
                    <Slide v-for="(image, index) in product_images" :key="index">
                      <template #default="{ currentIndex, isActive }">
                        <div
                          :class="['thumbnail', { 'is-active': isActive }]"
                          @click="slideTo(currentIndex)"
                        >
                          <img :src="image" alt="Thumbnail Image" class="thumbnail-image !rounded-lg !max-w-[100px]" />
                        </div>
                      </template>
                    </Slide>

                    <template #addons>
                      <Navigation />
                    </template>
                  </Carousel>
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
                        <button @click="show_full_description = true">
                            <i class="bi bi-arrows-fullscreen"></i>
                        </button>
                       
                    </div>
                    
                    <div v-html="product.description.substring(0, 500)" class=" min-h-[100px]"></div>
                    <div class="flex flex-col gap-3 flew-wrap text-sm text-gray-400">
                        <span><i class="bi bi-tag mr-1"></i>{{ product.category }}</span>
                        <!-- <span v-if="shop_location"><i class="bi bi-geo-alt mr-1"></i>{{ shop_location.address }}, {{  shop_location.state }}</span> -->
                        <span><i class="bi bi-eye mr-1"></i>{{ product.views }} views</span>
                    </div>
                </div>
                <div class="mt-3">
                    <button class="bg-app_green hover:bg-opacity-90 text-white w-full rounded-lg p-3 text-lg font-semibold" @click="proceed_to_buy = !proceed_to_buy">Buy now</button>
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

import axios from 'axios'

  // Get current route
  const route = useRoute();
  const config = useRuntimeConfig();
  const shop = ref(null);
  const isAllowed = ref(false);

  const product_images = ref([]);



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
  
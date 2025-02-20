<template>
    <div class="relative" v-if="shop">
      <!-- SHOP HEADER SECTION -->
      <div 
      
        style="background-size: cover !important; background-position: center; background-repeat: no-repeat;"
        :style="getBackgroundImage(shop.is_verified)"
        class=" h-[200px] md:h-[300px] w-full bg-gray-500 bg-opacity-15 relative">
        
        <UButton
          v-if="isAllowed"
          icon="material-symbols:edit-rounded"
          label="Settings"
          class="absolute top-5 right-5"
          variant="solid"
          color="gray"/>
      </div>
      
      <!-- LOWER SECTION -->
      <div class="flex flex-col md:flex-row gap-5 relative -top-[80px] w-full">

        <!-- SHOP LEFT -->
        <div class=" md:w-[350px] w-full flex flex-col gap-3 justify-start items-center">
          <div 
          :style="`background: url('${shop?.profile?.image_url}')`"
          class=" size-[150px] rounded-full border-4 justify-center items-center bg-green-100 !bg-cover !bg-center !bg-no-repeat">
            <!-- <img :src="shop?.profile?.image_url" alt="shop_image"/>  -->
          </div>
         
          <div class=" flex flex-col text-center">
            <span class=" font-bold text-xl">{{ shop.name }}</span>
            <small>{{ shop.category }}</small>
            <span class=" mt-3">{{ shopDescription }} 
              <UButton 
              v-if="shop.description.length > 200"
              color="green"
              @click="des_expanded = !des_expanded" 
              :label="des_expanded ? 'see less':'see more'" variant="link"/>
            </span>
            <span v-if="shop.location"> <i class="bi bi-geo-alt"></i> {{ shop.location }}</span>
            <span><i class="bi bi-clock-history"></i> {{ shop.createdAt }}</span>
          </div>

          <div class=" flex flex-row justify-between flex-wrap text-center w-full">
            <div>X<br/>Listings</div>
            <div>{{ followers.length }}<br/>Followers</div>
            <div>0<br/>Ratings</div>
          </div>

          <!-- ACTION BUTTON -->
          <div class=" mt-3 w-full">

            <!-- IF ALLOWED -->
            <UButton
            v-if="isAllowed"
            icon="material-symbols:box-add-sharp"
            class=" justify-center w-full"
            variant="outline"
            color="green"
            label="Add Product"
            size="lg"/>
            <UButton
            v-else
            @click="followShop(shop._id)"
            :icon="isFollowingShop(followers) ? '':'bi:person-plus-fill'"
            :loading="loading_fl"
            loading-icon="svg-spinners:bars-rotate-fade"
            class=" justify-center w-full"
            :variant="isFollowingShop(followers) ? 'solid':'outline'"
            color="green"
            :label="isFollowingShop(followers) ? 'Following':'Follow'"
            size="lg"/>
          </div>
           
        </div>

        <!-- SHOP RIGHT -->
        <div class=" flex-1 flex flex-col gap-3 md:mt-[100px]">

          <!-- LISTINGS vs GLIPS TAB -->
          <div class=" flex flex-row p-3 bg-gray-500 bg-opacity-10 gap-1 rounded-md">
            <UButton
            @click="currentTab = 0"
            :variant="currentTab == 0 ? 'solid':'ghost'"
            color="green"
            icon="heroicons:squares-plus"
            size="lg" label="Listings" 
            class=" flex-1 justify-center"/>
            <UButton
            disabled
            @click="currentTab = 1"
            :variant="currentTab == 1 ? 'solid':'ghost'" 
            color="green"
            icon="heroicons:video-camera"
            size="lg" label="Glips" 
            class=" flex-1 justify-center"/>
          </div>

           <!-- CONTENT AREA -->
          <!-- PRODUCT LISTINGS -->
          <div v-if="currentTab === 0" class=" flex flex-col gap- 6 justify-between">
            <div class="h-[500px] overflow-y-auto">
              <div v-if="products.length == 0" class=" flex flex-col justify-center items-center gap-3 mt-12 text-gray-600">
                  <i class=" bi bi-box2 text-6xl"></i>
                  <span>No products found</span>
              </div>
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

            <!-- pagination for products -->
            <div class=" flex gap-6 mt-1" v-if="products.length > 0">
                  <UButton
                  :loading="loadingProducts"
                  loading-icon="svg-spinners:bars-rotate-fade"
                  :disabled="current_page == 1"
                  variant="ghost"
                  color="green"
                  @click="[current_page --, getShopProducts()]"
                  icon="heroicons:arrow-small-left"
                  />
                  <span>{{ current_page }} of {{ total_page }}</span>
                  <UButton
                  :loading="loadingProducts"
                  loading-icon="svg-spinners:bars-rotate-fade"
                  variant="ghost"
                  color="green"
                  :disabled="current_page == total_page"
                  icon="heroicons:arrow-small-right"
                  @click="[current_page ++, getShopProducts()]"
                  />
            </div>

          </div>
          
        </div>

       
      </div>
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
const liked_products = ref([]);
// const shop = ref('');

import verifiedShop from '@/assets/images/verified_shop.png';
import nonVerifiedShop from '@/assets/images/non_verified_shop.png';

const getBackgroundImage = (isVerified) => `background-image: url(${isVerified ? verifiedShop : nonVerifiedShop})`;


// Fetch shop data before rendering (SSR-compatible)
const { data: shop } = await useAsyncData('shop', async () => {
    const response = await $fetch(`${config.public.apiBase}/shops/${route.params.name}/full`);
    console.log("shop: ", response);
    shopId.value = response.shop._id;
    followers.value = response.shop.followers;
    return response.shop;
});


// add views to shop
const addViewsToShop = async()=>{
  try{
    const res = await useNuxtApp().$apiFetch(`/shops/${route.params.name}/view`);
  }catch(err){
    console.log("err adding views to shop: ", err);
  }
}

const current_page = ref(1);
const total_page = ref(1);
const total_products = ref(1)
const getShopProducts = async()=>{
  loadingProducts.value = true;
  try{
    const res = await useNuxtApp().$apiFetch(`/products/${route.params.name}/shop?page=${current_page.value}`);
    products.value = res.products;
    current_page.value = res.currentPage;
    total_page.value = res.totalPages;
    total_products.value = res.totalProducts;

    console.log("products: ", res);
  }catch(err){
    console.log("err getting shops products: ", err)
  }
  loadingProducts.value = false;
}


const getUserDetails = async()=> {
    try {
        const res = await useNuxtApp().$apiFetch(`/user`);
        user.value = res.user;
        liked_products.value = res.user.liked_products;
        console.log('user: ', res)
    } catch (error) {
        console.log(error);
    }
}

getShopProducts();
addViewsToShop();
getUserDetails();

const des_expanded = ref(false);
const shopDescription = computed(()=>{
  if(des_expanded.value){
    return shop.value.description
  } else {
    return shop.value.description.slice(0,200) + '...';
  }
})

const isAllowed = computed(()=>{
  if(user.value && shop.value){
    return user.value._id === shop.value.owner._id
  }
})

const checkLikes = (product_id) => {
    if(liked_products.value.includes(product_id)){
        return true;
    } else {
        return false;
    }
};


const isFollowingShop = (followers_) => {
  let exist = false;
  const user_id = user.value._id;
  console.log("got followers: ",followers_)
  if(followers_.length > 0){
    followers_.forEach(follower => {
    if(follower._id === user_id){
      exist = true;
      return exist;
    }
  });
  }
  
  return exist;
};


const getShopById = async (shop_id) => {
  try{
    const res = await useNuxtApp().$apiFetch(`/shops/${shop_id}`);
    followers.value = res.shop.followers;
    // shop.value = res.shop.value;
    console.log("shop by id: ", res);
  }catch(err){
    console.log("err getting shop by id: ", err);
  }
}

const loading_fl = ref(false);
const followShop = async (shop_id) => {
  loading_fl.value = true;
  try{
    const res = await useNuxtApp().$apiFetch(`/shops/${shop_id}/follow`, {
      method: 'POST'
    });
    console.log("followed shop: ", res);
    getShopById(shop_id);
  }catch(err){
    console.log("err following shop: ", err);
  }
  loading_fl.value = false;
}

  
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
<template>
    <div class="relative" v-if="shop">
      <!-- SHOP HEADER SECTION -->
      <div 
      
        style="background-size: cover !important; background-position: center; background-repeat: no-repeat;"
        :style="[getBoostedShopImage(shop.is_boosted)]"
        class=" h-[200px] md:h-[300px] w-full bg-gray-500 bg-opacity-15 relative">
        
       
          <div class="absolute top-5 right-5 flex gap-3">
            <UDropdown :items="isAllowed ? items_allowed:items" :popper="{ placement: 'bottom-start' }">
              <UButton color="white" icon="iconoir:more-horiz" />
            </UDropdown>
          </div>
       
       

      </div>
      
      <!-- LOWER SECTION -->
      <div class="flex flex-col md:flex-row gap-5 relative -top-[80px] w-full">

        <!-- SHOP LEFT -->
        <div class=" md:w-[350px] w-full flex flex-col gap-3 justify-start items-center">
          <div 
          :style="`background: url('${shop?.profile?.image_url}')`"
          :class="[shop.is_boosted ? 'border-purple-500':'', shop.is_verified ? 'border-green-500':'']"
          class=" size-[150px] rounded-full border-[8px] justify-center items-center bg-green-100 !bg-cover !bg-center !bg-no-repeat relative">
            <!-- <img :src="shop?.profile?.image_url" alt="shop_image"/>  -->
            <span v-if="shop.boosted" class=" absolute size-[30px] -right-0 bottom-2 text-white rounded-full flex justify-center items-center bg-purple-500 p-3">
              <i class="bi bi-rocket-takeoff-fill"></i>
            </span>
          </div>
         
          <div class=" flex flex-col text-center">
            <span class=" font-bold text-xl">{{ shop.name }} <i class="bi text-app_green" :class="shop.is_verified ? 'bi-patch-check-fill':''"></i></span>
            <small>{{ shop.category }}</small>
            <span class=" mt-3">{{ shopDescription }} 
              <UButton 
              v-if="shop.description.length > 200"
              :color="shop.is_boosted ? 'purple':'green'"
              @click="des_expanded = !des_expanded" 
              :label="des_expanded ? 'see less':'see more'" variant="link"/>
            </span>
            <span v-if="shop.location"> <i class="bi bi-geo-alt"></i> {{ shop.location }}</span>
            <span>joined whatsell: {{ formatCustomDate(shop.createdAt) }}</span>
          </div>

          <div class=" flex flex-row justify-between flex-wrap text-center w-full">
            <div>{{ shop.listings }}<br/>Listings</div>
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
            :color="shop.is_boosted ? 'purple':'green'"
            @click="useRouter().push('/sell')"
            label="Add Product"
            size="lg"/>
            <div v-else>
              <UButton
            v-if="user"
            @click="followShop(shop._id)"
            :icon="isFollowingShop(followers) ? '':'bi:person-plus-fill'"
            :loading="loading_fl"
            loading-icon="svg-spinners:bars-rotate-fade"
            class=" justify-center w-full"
            :variant="isFollowingShop(followers) ? 'solid':'outline'"
            :color="shop.is_boosted ? 'purple':'green'"
            :label="isFollowingShop(followers) ? 'Following':'Follow'"
            size="lg"/>
            <UButton
            v-else
            @click="useRouter().push('/login')"
            :icon="isFollowingShop(followers) ? '':'bi:person-plus-fill'"
            class=" justify-center w-full"
            :variant="isFollowingShop(followers) ? 'solid':'outline'"
            :color="shop.is_boosted ? 'purple':'green'"
            :label="isFollowingShop(followers) ? 'Following':'Follow'"
            size="lg"/>
            </div>
           
          </div>
           
        </div>

        <!-- SHOP RIGHT -->
        <div class=" flex-1 flex flex-col gap-3 md:mt-[100px]">

          <!-- LISTINGS vs GLIPS TAB -->
          <div class=" flex flex-row p-3 bg-gray-500 bg-opacity-10 gap-1 rounded-md">
            <UButton
            @click="currentTab = 0"
            :variant="currentTab == 0 ? 'solid':'ghost'"
            :color="shop.is_boosted ? 'purple':'green'"
            icon="heroicons:squares-plus"
            size="lg" label="Listings" 
            class=" flex-1 justify-center"/>
            <UButton
            @click="[currentTab = 1, getShopGlips(shop._id)]"
            :variant="currentTab == 1 ? 'solid':'ghost'" 
            :color="shop.is_boosted ? 'purple':'green'"
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
                   :color="shop.is_boosted ? 'purple':'green'"
                  @click="[current_page --, getShopProducts()]"
                  icon="heroicons:arrow-small-left"
                  />
                  <span>{{ current_page }} of {{ total_page }}</span>
                  <UButton
                  :loading="loadingProducts"
                  loading-icon="svg-spinners:bars-rotate-fade"
                  variant="ghost"
                   :color="shop.is_boosted ? 'purple':'green'"
                  :disabled="current_page == total_page"
                  icon="heroicons:arrow-small-right"
                  @click="[current_page ++, getShopProducts()]"
                  />
            </div>

          </div>
          <div v-if="currentTab === 1" class="h-[500px] overflow-y-auto flex flex-wrap w-full gap-3">
            <USkeleton v-if="loading_glips" v-for="glip in 10" class=" flex-1 w-[130px] h-[200px] min-w-[130px]"
            :ui="{ background: 'dark:bg-gray-700' }" />
            <GlipCard
            v-else
            :item="item"
            v-for="item in glips"
            />
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
const user = ref('');
const shopId = ref('');
const shopRating = ref(4);
const loadingProducts = ref(false);
const loadingGlips = ref(false);
const followers = ref([]);
const boostShopModal = ref(false);
const liked_products = ref([]);
// const shop = ref('');

// import verifiedShop from '@/assets/images/verified_shop.png';
import normalShop from '@/assets/images/non_verified_shop.png';
import boostedShopImage from '@/assets/images/boosted_shop.png';

/* const getBackgroundImage = computed((isVerified)=>{
return `background-image: url(${isVerified ? normalShop : normalShop})`
}); */

// const getBackgroundImage = (isVerified) => `background-image: url(${isVerified ? normalShop : normalShop})`;
const getBoostedShopImage = (isBoosted) => `background-image: url(${isBoosted ? boostedShopImage:normalShop})`;


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

function formatCustomDate(isoString) {
    const date = new Date(isoString);
    
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'long' });
    const year = date.getFullYear();

    // Function to get ordinal suffix (st, nd, rd, th)
    const getOrdinalSuffix = (num) => {
        if (num > 3 && num < 21) return 'th'; // Covers 11th to 19th
        switch (num % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    };

    return `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
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

const shareShop = async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: "Hi, check this Shop on whatsell!",
        text: `${shop.value.category}`,
        url: window.location.href, // Current page URL
      });
      console.log("Shared successfully");
    } catch (error) {
      console.error("Error sharing:", error);
    }
  } else {
    alert("Your browser does not support the Web Share API.");
  }
};

const items = [
  [{
    label: 'Share',
    icon: 'hugeicons:share-05',
    click: () => {
      shareShop()
    }
  }],
  [{
    label: 'Report',
    icon: 'hugeicons:flag-03',
    disabled: true
  }]
];

const items_allowed = [
  [{
    label: 'Share',
    icon: 'hugeicons:share-05',
    click: () => {
      shareShop()
    }
  }, {
    label: 'Settings',
    icon: 'hugeicons:settings-02',
    click: () => {
      useRouter().push('/account/shop')
    }
  }]
]

const glips = ref([]);
const loading_glips = ref(false)
const getShopGlips = async(shop_id)=>{
  loading_glips.value = true;
  try{
    const res = await useNuxtApp().$apiFetch(`/products/glips/${shop_id}/all`);
    glips.value = res.glips
  }catch(err){
    console.log('err getting glips: ', err);
  }
  loading_glips.value = false;
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
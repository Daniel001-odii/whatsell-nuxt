<template>
    <div class="relative bg-white dark:bg-gray-900" v-if="shop">
      <!-- HERO SECTION WITH FLOATING PROFILE -->
      <div class="relative">
        <!-- Cover Image -->
        <div 
          class="w-full h-[250px] md:h-[350px] bg-gray-200 dark:bg-gray-800 relative overflow-hidden"
          :style="[getBoostedShopImage(shop.is_boosted)]"
          style="background-size: cover !important; background-position: center; background-repeat: no-repeat;">
          
          <!-- Overlay gradient -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          
          <!-- Action button -->
          <div class="absolute top-5 right-5 flex gap-3">
            <UDropdown :items="isAllowed ? items_allowed:items" :popper="{ placement: 'bottom-start' }">
              <UButton color="white" variant="soft" icon="iconoir:more-horiz" />
            </UDropdown>
          </div>
        </div>
        
        <!-- Profile and shop info card -->
        <div class="container mx-auto px-4">
          <div class="relative -mt-20 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div class="flex flex-col md:flex-row gap-6 items-center md:items-start">
              <!-- Profile Image -->
              <div 
                :style="`background: url('${shop?.profile?.image_url}')`"
                :class="[
                  shop.is_boosted ? 'ring-4 ring-purple-500' : '',
                  shop.is_verified ? 'ring-4 ring-green-500' : ''
                ]"
                class="size-[120px] md:size-[140px] rounded-full bg-gray-200 dark:bg-gray-700 !bg-cover !bg-center !bg-no-repeat shrink-0 relative">
                <span v-if="shop.boosted" class="absolute -right-2 bottom-2 size-[30px] text-white rounded-full flex justify-center items-center bg-purple-500 p-1.5">
                  <i class="bi bi-rocket-takeoff-fill"></i>
                </span>
              </div>
              
              <!-- Shop Info -->
              <div class="flex-1 text-center md:text-left">
                <div class="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                  <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                    {{ shop.name }}
                  </h1>
                  <i v-if="shop.is_verified" class="bi bi-patch-check-fill text-green-500 text-xl"></i>
                </div>
                
                <div class="text-sm text-gray-500 dark:text-gray-400 mb-3 flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                  <span class="flex items-center">
                    <i class="bi bi-tag mr-1"></i> {{ shop.category }}
                  </span>
                  <span v-if="shop.location" class="flex items-center">
                    <i class="bi bi-geo-alt mr-1"></i> {{ shop.location }}
                  </span>
                  <span class="flex items-center">
                    <i class="bi bi-calendar3 mr-1"></i> joined {{ formatCustomDate(shop.createdAt) }}
                  </span>
                </div>
                
                <p class="text-gray-700 dark:text-gray-300 mb-4">
                  {{ shopDescription }}
                  <UButton 
                    v-if="shop.description.length > 200"
                    @click="des_expanded = !des_expanded" 
                    :label="des_expanded ? 'see less' : 'see more'" 
                    variant="link"
                    :color="shop.is_boosted ? 'purple' : 'green'"
                    size="sm"
                  />
                </p>
                
                <!-- Shop Stats -->
                <div class="flex justify-center md:justify-start gap-6 mb-4">
                  <div class="text-center">
                    <div class="font-bold text-xl text-gray-900 dark:text-white">{{ shop.listings }}</div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">Listings</div>
                  </div>
                  <div class="text-center">
                    <div class="font-bold text-xl text-gray-900 dark:text-white">{{ followers.length }}</div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">Followers</div>
                  </div>
                  <div class="text-center">
                    <div class="font-bold text-xl text-gray-900 dark:text-white">0</div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">Ratings</div>
                  </div>
                </div>
                
                <!-- Action Button -->
                <div class="mt-2">
                  <!-- IF ALLOWED -->
                  <UButton
                    v-if="isAllowed"
                    icon="material-symbols:box-add-sharp"
                    class="justify-center"
                    variant="solid"
                    :color="shop.is_boosted ? 'purple' : 'green'"
                    @click="useRouter().push('/sell')"
                    label="Add Product"
                    size="lg"
                  />
                  <div v-else>
                    <UButton
                      v-if="user"
                      @click="followShop(shop._id)"
                      :icon="isFollowingShop(followers) ? '' : 'bi:person-plus-fill'"
                      :loading="loading_fl"
                      loading-icon="svg-spinners:bars-rotate-fade"
                      class="justify-center"
                      :variant="isFollowingShop(followers) ? 'solid' : 'outline'"
                      :color="shop.is_boosted ? 'purple' : 'green'"
                      :label="isFollowingShop(followers) ? 'Following' : 'Follow'"
                      size="lg"
                    />
                    <UButton
                      v-else
                      @click="useRouter().push('/login')"
                      :icon="isFollowingShop(followers) ? '' : 'bi:person-plus-fill'"
                      class="justify-center"
                      :variant="isFollowingShop(followers) ? 'solid' : 'outline'"
                      :color="shop.is_boosted ? 'purple' : 'green'"
                      :label="isFollowingShop(followers) ? 'Following' : 'Follow'"
                      size="lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- MAIN CONTENT SECTION -->
      <div class="container mx-auto px-4 py-8">
        <!-- TABS -->
        <div class="mb-6">
          <div class="flex gap-2 border-b border-gray-200 dark:border-gray-700">
            <UButton
              @click="currentTab = 0"
              :variant="currentTab == 0 ? 'ghost' : 'ghost'"
              :class="[
                'rounded-none border-b-2 pb-2', 
                currentTab == 0 
                  ? (shop.is_boosted ? 'border-purple-500 text-purple-600 dark:text-purple-400' : 'border-green-500 text-green-600 dark:text-green-400')
                  : 'border-transparent'
              ]"
              :color="currentTab == 0 ? (shop.is_boosted ? 'purple' : 'green') : 'gray'"
              icon="heroicons:squares-plus"
              size="md" 
              label="Listings" 
            />
            <UButton
              @click="[currentTab = 1, getShopGlips(shop._id)]"
              :variant="currentTab == 1 ? 'ghost' : 'ghost'"
              :class="[
                'rounded-none border-b-2 pb-2', 
                currentTab == 1 
                  ? (shop.is_boosted ? 'border-purple-500 text-purple-600 dark:text-purple-400' : 'border-green-500 text-green-600 dark:text-green-400')
                  : 'border-transparent'
              ]"
              :color="currentTab == 1 ? (shop.is_boosted ? 'purple' : 'green') : 'gray'"
              icon="heroicons:video-camera"
              size="md" 
              label="Glips" 
            />
          </div>
        </div>
  
        <!-- CONTENT AREA -->
        <!-- PRODUCT LISTINGS -->
        <div v-if="currentTab === 0" class="flex flex-col gap-6">
          <div class="min-h-[500px]">
            <div v-if="products.length == 0" class="flex flex-col justify-center items-center gap-3 py-12 text-gray-500 dark:text-gray-400">
              <i class="bi bi-box2 text-6xl"></i>
              <span class="text-lg">No products found</span>
            </div>
            <MasonryWall
              v-else
              :items="products"
              :ssr-columns="1"
              :column-width="200"
              :gap="16"
            >
              <template #default="{ item, index }">
                <ProductCard 
                  class="transform transition-transform duration-300 hover:scale-[1.02]"
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
  
          <!-- Pagination -->
          <div class="flex justify-center items-center gap-4 mt-2" v-if="products.length > 0">
            <UButton
              :loading="loadingProducts"
              loading-icon="svg-spinners:bars-rotate-fade"
              :disabled="current_page == 1"
              variant="ghost"
              :color="shop.is_boosted ? 'purple' : 'green'"
              @click="[current_page--, getShopProducts()]"
              icon="heroicons:arrow-small-left"
            />
            <span class="text-gray-700 dark:text-gray-300">{{ current_page }} of {{ total_page }}</span>
            <UButton
              :loading="loadingProducts"
              loading-icon="svg-spinners:bars-rotate-fade"
              variant="ghost"
              :color="shop.is_boosted ? 'purple' : 'green'"
              :disabled="current_page == total_page"
              icon="heroicons:arrow-small-right"
              @click="[current_page++, getShopProducts()]"
            />
          </div>
        </div>
  
        <!-- GLIPS -->
        <div v-if="currentTab === 1" class="min-h-[500px]">
          <div v-if="loading_glips" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <USkeleton 
              v-for="glip in 10" 
              :key="glip"
              class="h-[240px] rounded-lg" 
              :ui="{ background: 'dark:bg-gray-700' }"
            />
          </div>
          <div v-else-if="glips.length === 0" class="flex flex-col justify-center items-center gap-3 py-12 text-gray-500 dark:text-gray-400">
            <i class="bi bi-camera-video text-6xl"></i>
            <span class="text-lg">No glips found</span>
          </div>
          <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <GlipCard
              v-for="item in glips"
              :key="item._id"
              :item="item"
              class="transform transition-transform duration-300 hover:scale-[1.03]"
            />
          </div>
        </div>
      </div>
  
      <!-- REVIEW SECTION -->
    <!--   <div class="container mx-auto px-4 pb-12">
        <div class="bg-gray-50 dark:bg-gray-800 rounded-xl shadow-sm p-6 mt-4">
          <h3 class="text-xl font-semibold mb-6 pb-2 border-b border-gray-200 dark:border-gray-700" 
              :class="shop.is_boosted ? 'text-purple-600 dark:text-purple-400' : 'text-green-600 dark:text-green-400'">
            Customer Reviews
          </h3>
  
          <div v-if="!loadingReviews && reviews.length > 0" 
              class="mb-6 p-4 rounded-lg shadow-sm" 
              :class="shop.is_boosted ? 'bg-purple-50 dark:bg-purple-900/30 border border-purple-100 dark:border-purple-800/50' : 'bg-green-50 dark:bg-green-900/30 border border-green-100 dark:border-green-800/50'">
            <div class="flex items-center gap-4">
              <span class="text-5xl font-bold" 
                  :class="shop.is_boosted ? 'text-purple-700 dark:text-purple-300' : 'text-green-700 dark:text-green-300'">
                {{ averageRating.toFixed(1) }}
              </span>
              <div>
                <div class="flex items-center mb-1">
                  <i v-for="star in 5" :key="'avg-star-' + star"
                    class="bi text-xl"
                    :class="star <= Math.round(averageRating) ? (shop.is_boosted ? 'bi-star-fill text-purple-500' : 'bi-star-fill text-green-500') : 'bi-star text-gray-400'">
                  </i>
                </div>
                <span class="text-sm text-gray-600 dark:text-gray-400">Based on {{ reviews.length }} review{{ reviews.length === 1 ? '' : 's' }}</span>
              </div>
            </div>
          </div>
  
          <div v-if="user && !isAllowed && !showReviewForm" class="mb-6">
            <UButton
              label="Write a Review"
              :color="shop.is_boosted ? 'purple' : 'green'"
              variant="solid"
              icon="bi:pencil-square"
              @click="showReviewForm = true"
              size="md"
            />
          </div>
  
          <div v-if="showReviewForm" 
              class="mb-6 p-6 border rounded-lg" 
              :class="shop.is_boosted ? 'border-purple-200 dark:border-purple-700/50 bg-purple-50/50 dark:bg-purple-900/20' : 'border-green-200 dark:border-green-700/50 bg-green-50/50 dark:bg-green-900/20'">
            <div class="flex justify-between items-center mb-4">
              <h4 class="text-lg font-medium text-gray-800 dark:text-gray-100">Share Your Experience</h4>
              <UButton
                icon="bi:x-lg"
                variant="ghost"
                color="gray"
                size="sm"
                square
                padded
                @click="showReviewForm = false; newReview = { rating: 0, text: '' };"
              />
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Your Rating:</label>
              <div class="flex space-x-2">
                <button 
                  v-for="star in 5" 
                  :key="'new-star-' + star" 
                  @click="newReview.rating = star" 
                  type="button" 
                  class="focus:outline-none p-1.5 rounded-full transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  <i class="bi text-3xl transition-transform duration-150 ease-in-out"
                    :class="[
                      star <= newReview.rating ? (shop.is_boosted ? 'bi-star-fill text-purple-500' : 'bi-star-fill text-green-500') : 'bi-star text-gray-300 dark:text-gray-600',
                      star <= newReview.rating ? 'scale-110' : 'hover:scale-110'
                    ]">
                  </i>
                </button>
              </div>
            </div>
            <div class="mb-4">
              <label for="reviewText" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Your Comment:</label>
              <UTextarea
                id="reviewText"
                v-model="newReview.text"
                :color="shop.is_boosted ? 'purple' : 'green'"
                placeholder="Tell us about your experience with this shop..."
                rows="4"
                size="lg"
              />
            </div>
            <UButton
              label="Submit Review"
              :color="shop.is_boosted ? 'purple' : 'green'"
              @click="submitShopReview"
              :loading="submittingReview"
              loading-icon="svg-spinners:bars-rotate-fade"
              class="mt-2 w-full sm:w-auto"
              size="md"
              :disabled="!newReview.rating || !newReview.text.trim()"
            />
          </div>
  
          <div v-if="loadingReviews" class="flex flex-col items-center justify-center py-12">
            <i class="bi bi-arrow-repeat text-4xl animate-spin" :class="shop.is_boosted ? 'text-purple-500' : 'text-green-500'"></i>
            <p class="mt-2 text-gray-600 dark:text-gray-400">Loading reviews...</p>
          </div>
          <div v-else-if="reviews.length === 0 && !loadingReviews" class="flex flex-col items-center justify-center py-12 text-gray-500 dark:text-gray-400">
            <i class="bi bi-chat-square-dots-fill text-5xl mb-3"></i>
            <p class="font-semibold text-lg mb-1">No Reviews Yet</p>
            <p v-if="user && !isAllowed">Be the first to share your experience!</p>
            <p v-else-if="!user">Log in to share your experience!</p>
          </div>
          <div v-else class="space-y-4 max-h-[600px] overflow-y-auto pr-2">
            <div v-for="review in reviews" 
                :key="review._id" 
                class="p-5 border rounded-lg" 
                :class="shop.is_boosted ? 'bg-white dark:bg-gray-800 border-purple-100 dark:border-purple-800/50' : 'bg-white dark:bg-gray-800 border-green-100 dark:border-green-800/50'">
              <div class="flex items-start justify-between">
                <div class="flex flex-col">
                  <strong class="text-gray-800 dark:text-gray-100">{{ review.user?.name || 'Valued Customer' }}</strong>
                  <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">{{ formatReviewDate(review.createdAt) }}</p>
                </div>
                <div class="flex flex-shrink-0">
                  <i v-for="star in 5" 
                    :key="review._id + '-star-' + star"
                    class="bi text-sm"
                    :class="star <= review.rating ? (shop.is_boosted ? 'bi-star-fill text-purple-500' : 'bi-star-fill text-green-500') : 'bi-star text-gray-400 dark:text-gray-500'">
                  </i>
                </div>
              </div>
              <p class="text-gray-700 dark:text-gray-300 mt-2 whitespace-pre-wrap text-sm">{{ review.text }}</p>
            </div>
          </div>
        </div>
      </div> -->
    </div>
  </template>
  
  
  <style scoped>
  .shadow-text {
  text-shadow: 1px 1px 3px rgba(0,0,0,0.5);
  }
  </style>
  
  <style scoped>
  .antialiased {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  }
  </style>
  
  <script setup>
  import { useRoute, useAsyncData, useHead, useRouter, useNuxtApp } from '#imports'; // Ensure all imports are here
  import { ref, computed, watch, onMounted } from 'vue'; // Add computed, watch, onMounted
  
  const route = useRoute();
  const config = useRuntimeConfig();
  // ... (all your existing refs: isExpanded, shopImage, etc.)
  const isExpanded = ref(false);
  const shopImage = ref('');
  const shopBoostDuration = ref(1);
  const glipsModal = ref(false);
  const loading = ref(false); // This seems to be a general loading, maybe rename if specific
  const currentTab = ref(0);
  const products = ref([]);
  const user = ref(null); // Initialize as null for clarity
  const shopId = ref('');
  const shopRating = ref(4); // This seems to be a static rating, averageRating will be dynamic
  const loadingProducts = ref(false);
  const loadingGlips = ref(false); // Renamed from loading_glips for consistency
  const followers = ref([]);
  const boostShopModal = ref(false);
  const liked_products = ref([]);
  const des_expanded = ref(false);
  
  // import verifiedShop from '@/assets/images/verified_shop.png'; // Keep if used elsewhere
  import normalShop from '@/assets/images/non_verified_shop.png';
  import boostedShopImage from '@/assets/images/boosted_shop.png';
  
  const getBoostedShopImage = (isBoosted) => `background-image: url(${isBoosted ? boostedShopImage : normalShop})`;
  
  const { data: shop, pending: shopLoading, error: shopError } = await useAsyncData('shop', async () => {
    try {
      const response = await $fetch(`${config.public.apiBase}/shops/${route.params.name}/full`);
      console.log("shop: ", response);
      if (response && response.shop) {
          shopId.value = response.shop._id;
          followers.value = response.shop.followers;
          return response.shop;
      }
      return null; // Handle case where shop might not be found
    } catch (e) {
      console.error("Error fetching shop data:", e);
      // Potentially redirect to a 404 page or show an error message
      // For now, return null and handle it in the template
      return null;
    }
  }, {
      // By default, useAsyncData might not refetch on param change on client-side nav unless key changes or watch is set.
      // If `route.params.name` can change while on this page, you might need:
      // watch: [() => route.params.name]
  });
  
  
  // Review System Refs
  const reviews = ref([]);
  const loadingReviews = ref(false);
  const averageRating = ref(0);
  const showReviewForm = ref(false);
  const newReview = ref({
    rating: 0,
    text: ''
  });
  const submittingReview = ref(false);
  
  
  // === EXISTING FUNCTIONS ===
  const addViewsToShop = async()=>{
    if (!shop.value?._id) return; // Ensure shop is loaded
    try{
      await useNuxtApp().$apiFetch(`/shops/${route.params.name}/view`);
    }catch(err){
      console.log("err adding views to shop: ", err);
    }
  }
  
  function formatCustomDate(isoString) {
    if (!isoString) return 'Date not available';
      const date = new Date(isoString);
      const day = date.getDate();
      const month = date.toLocaleString('en-US', { month: 'long' });
      const year = date.getFullYear();
      const getOrdinalSuffix = (num) => {
          if (num > 3 && num < 21) return 'th';
          switch (num % 10) {
              case 1: return 'st';
              case 2: return 'nd';
              case 3: return 'rd';
              default: return 'th';
          }
      };
      return `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
  }
  
  function getPercentageForRating(reviews, rating) {
    if (!reviews || reviews.length === 0) return 0;
    const count = reviews.filter(review => review.rating === rating).length;
    return Math.round((count / reviews.length) * 100);
  }
  
  const current_page = ref(1);
  const total_page = ref(1);
  const total_products = ref(1)
  const getShopProducts = async()=>{
    if (!shop.value?._id) return; // Ensure shop is loaded
    loadingProducts.value = true;
    try{
      const res = await useNuxtApp().$apiFetch(`/products/${route.params.name}/shop?page=${current_page.value}`);
      products.value = res.products;
      current_page.value = res.currentPage;
      total_page.value = res.totalPages;
      total_products.value = res.totalProducts;
    }catch(err){
      console.log("err getting shops products: ", err)
    }
    loadingProducts.value = false;
  }
  
  const getUserDetails = async()=> {
      try {
          const res = await useNuxtApp().$apiFetch(`/user`);
          user.value = res.user;
          liked_products.value = res.user.liked_products || []; // Ensure liked_products is an array
      } catch (error) {
          console.log("Error fetching user details: ", error);
          user.value = null; // Set user to null if not logged in or error
      }
  }
  
  const shopDescription = computed(()=>{
    if (!shop.value?.description) return '';
    if(des_expanded.value){
      return shop.value.description
    } else {
      // Ensure description exists and is long enough before slicing
      return shop.value.description.length > 200 ? shop.value.description.slice(0,200) + '...' : shop.value.description;
    }
  })
  
  const isAllowed = computed(()=>{
    if(user.value && shop.value){
      return user.value._id === shop.value.owner?._id; // Add optional chaining for owner
    }
    return false;
  })
  
  const checkLikes = (product_id) => {
      return liked_products.value.includes(product_id);
  };
  
  const isFollowingShop = (followers_) => {
    if (!user.value || !followers_ || followers_.length === 0) return false;
    const user_id = user.value._id;
    return followers_.some(follower => follower._id === user_id);
  };
  
  const getShopById = async (shop_id) => {
    if (!shop_id) return;
    try{
      const res = await useNuxtApp().$apiFetch(`/shops/${shop_id}`);
      if (res.shop) {
          followers.value = res.shop.followers;
          // If you need to update the main shop object, be careful with reactivity:
          // Object.assign(shop.value, res.shop); // This might be one way
      }
    }catch(err){
      console.log("err getting shop by id: ", err);
    }
  }
  
  const loading_fl = ref(false);
  const followShop = async (shop_id) => {
    if (!user.value) {
      useRouter().push('/login'); // Redirect to login if user not available
      return;
    }
    if (!shop_id) return;
    loading_fl.value = true;
    try{
      await useNuxtApp().$apiFetch(`/shops/${shop_id}/follow`, {
        method: 'POST'
      });
      // Re-fetch shop data or followers specifically to update UI
      await getShopById(shop_id); // This will update followers.value
    }catch(err){
      console.log("err following shop: ", err);
      // Add user feedback (e.g., toast notification)
    }
    loading_fl.value = false;
  }
  
  const shareShop = async () => {
    if (navigator.share && shop.value) {
      try {
        await navigator.share({
          title: `Hi, check out ${shop.value.name} on whatsell!`,
          text: shop.value.category,
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      // Fallback for browsers that don't support Web Share API (e.g., copy to clipboard)
      try {
          await navigator.clipboard.writeText(window.location.href);
          alert('Shop link copied to clipboard!'); // Or use a toast
      } catch (err) {
          alert("Sharing is not supported or failed.");
      }
    }
  };
  
  const items = computed(() => [ // Make it computed if shop.value is needed or for dynamic states
    [{
      label: 'Share',
      icon: 'hugeicons:share-05',
      click: shareShop
    }],
    [{
      label: 'Report',
      icon: 'hugeicons:flag-03',
      disabled: true // Implement reporting if needed
    }]
  ]);
  
  const items_allowed = computed(() => [ // Make it computed
    [{
      label: 'Share',
      icon: 'hugeicons:share-05',
      click: shareShop
    }, {
      label: 'Shop Settings',
      icon: 'hugeicons:settings-02',
      click: () => {
        useRouter().push('/account/shop')
      }
    }]
  ]);
  
  const glips = ref([]);
  // loadingGlips is already defined
  const getShopGlips = async(shop_id)=>{
    if (!shop_id) return;
    loadingGlips.value = true;
    try{
      const res = await useNuxtApp().$apiFetch(`/products/glips/${shop_id}/all`);
      glips.value = res.glips || [];
    }catch(err){
      console.log('err getting glips: ', err);
      glips.value = [];
    }
    loadingGlips.value = false;
  }
  
  // === REVIEW SYSTEM METHODS ===
  const calculateAverageRating = () => {
    if (reviews.value.length === 0) {
      averageRating.value = 0;
      return;
    }
    const totalRating = reviews.value.reduce((sum, review) => sum + review.rating, 0);
    averageRating.value = totalRating / reviews.value.length;
  };
  
  const fetchShopReviews = async (currentShopId) => {
    if (!currentShopId) return;
    loadingReviews.value = true;
    try {
      // TODO: Replace with your actual API endpoint for fetching reviews
      // const res = await useNuxtApp().$apiFetch(`/shops/${currentShopId}/reviews`);
      // reviews.value = res.reviews || [];
  
      // --- DUMMY DATA (Remove when API is ready) ---
      await new Promise(resolve => setTimeout(resolve, 1000));
      const fetchedReviews = [
        { _id: 'r1', user: { name: 'Alice Wonderland' }, rating: 5, text: 'Amazing products and fast shipping! Highly recommend this shop. The quality is top-notch and the customer service was very helpful when I had a question.', createdAt: new Date(Date.now() - 86400000 * 2).toISOString() },
        { _id: 'r2', user: { name: 'Bob The Builder' }, rating: 4, text: 'Good quality items, though one was a bit different from the picture. Overall satisfied and would consider buying again.', createdAt: new Date(Date.now() - 86400000 * 5).toISOString()},
        { _id: 'r3', user: { name: 'Charlie Brown' }, rating: 3, text: 'Average experience. Took a while to arrive but the product was as described.', createdAt: new Date(Date.now() - 86400000 * 10).toISOString()},
      ];
      reviews.value = fetchedReviews;
      // --- END DUMMY DATA ---
  
      calculateAverageRating();
    } catch (err) {
      console.error("Error fetching shop reviews:", err);
      reviews.value = [];
      averageRating.value = 0;
      // Add user feedback (e.g., toast notification)
    } finally {
      loadingReviews.value = false;
    }
  };
  
  const submitShopReview = async () => {
    if (!newReview.value.rating || !newReview.value.text.trim() || !user.value || !shop.value) {
      alert('Please provide a rating and comment.'); // Replace with a toast if you have one
      return;
    }
    if (isAllowed.value) {
        alert("Shop owners cannot review their own shop."); // Replace with toast
        return;
    }
  
    submittingReview.value = true;
    try {
      const payload = {
        // shopId: shop.value._id, // Backend usually gets shopId from URL param
        rating: newReview.value.rating,
        text: newReview.value.text,
        // userId will likely be handled by the backend via auth token
      };
      // TODO: Replace with your actual API endpoint for submitting a review
      // const res = await useNuxtApp().$apiFetch(`/shops/${shop.value._id}/reviews`, {
      //   method: 'POST',
      //   body: payload,
      // });
      // reviews.value.unshift(res.review); // Add new review to the top
  
  
      // --- DUMMY SUBMISSION (Remove when API is ready) ---
      await new Promise(resolve => setTimeout(resolve, 1500));
      const submittedReview = {
          _id: `r${Date.now()}`,
          user: { name: user.value?.name || user.value?.username || 'Current User' }, // Adjust based on your user object
          rating: newReview.value.rating,
          text: newReview.value.text,
          createdAt: new Date().toISOString()
      };
      reviews.value.unshift(submittedReview); // Add to the beginning of the list
      // --- END DUMMY SUBMISSION ---
  
      calculateAverageRating();
      showReviewForm.value = false;
      newReview.value = { rating: 0, text: '' }; // Reset form
      alert('Review submitted successfully!'); // Replace with toast
    } catch (err) {
      console.error("Error submitting review:", err);
      alert('Failed to submit review. Please try again.'); // Replace with toast
    } finally {
      submittingReview.value = false;
    }
  };
  
  const formatReviewDate = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };
  
  // Initial data fetching calls
  // getUserDetails should be called early to determine `isAllowed` and `user` state
  onMounted(async () => {
      await getUserDetails(); // Ensure user is fetched before other dependent logic
  
      // `shop` is fetched by useAsyncData. We watch it to trigger dependent fetches.
      // No need to call getShopProducts or addViewsToShop here if already in watch(shop).
  });
  
  // Watch for shop data to become available (from useAsyncData)
  // and then fetch related data like products, views, and reviews.
  watch(shop, (newShopValue) => {
    if (newShopValue && newShopValue._id) {
      getShopProducts(); // Fetches initial page of products
      addViewsToShop();
      fetchShopReviews(newShopValue._id); // Fetch reviews for the current shop
    } else if (!newShopValue && !shopLoading.value) {
      // Handle case where shop is definitively not found or error occurred
      console.log("Shop data is null and not loading, possible 404 or error.");
      // You might want to redirect or show a specific message.
    }
  }, { immediate: true }); // `immediate: true` runs the watcher once on component mount with current shop value
  
  
  // Set meta tags dynamically (before page is rendered)
  useHead(computed(() => {
      const shopData = shop.value; // Get current value of shop
      const title = shopData ? `${shopData.name} - ${shopData.category}` : 'Shop Details';
      const description = shopData?.description || 'View products and details for this shop.';
      const imageUrl = shopData?.profile?.image_url;
      const pageUrl = `https://wha-sell.vercel.app/shops/${route.params.name}`; // Ensure this is your production URL
  
      return {
          title: title,
          meta: [
              { name: 'description', content: description },
              { property: "og:title", content: shopData?.name || 'Shop on Whatsell' },
              { property: "og:description", content: description },
              { property: "og:image", content: imageUrl || 'your_default_og_image_url_here.png' },
              { property: "og:type", content: "profile" }, // 'product.group' or 'profile' could be more suitable for a shop page
              { property: "og:url", content: pageUrl },
              { name: "twitter:card", content: imageUrl ? "summary_large_image" : "summary" },
              { name: "twitter:image", content: imageUrl || 'your_default_twitter_image_url_here.png' },
              // Add more meta tags if needed
          ],
          link: [
              { rel: 'canonical', href: pageUrl }
          ]
      };
  }));
  
  </script>
  
  <style scoped>
  /* Add any component-specific styles here if needed */
  /* Example for a subtle scrollbar if desired for review list */
  .max-h-\[600px\]::-webkit-scrollbar {
    width: 6px;
  }
  .max-h-\[600px\]::-webkit-scrollbar-track {
    background: transparent;
  }
  .max-h-\[600px\]::-webkit-scrollbar-thumb {
    background-color: rgba(0,0,0,0.2);
    border-radius: 3px;
  }
  .dark .max-h-\[600px\]::-webkit-scrollbar-thumb {
    background-color: rgba(255,255,255,0.2);
  }
  
  .whitespace-pre-wrap {
    white-space: pre-wrap; /* Ensures newlines in review text are respected */
  }
  </style>
  
  <style scoped>
  
  </style>
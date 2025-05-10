<template>
  <div class="relative" v-if="shop">
    <!-- HERO SECTION WITH OVERLAY -->
    <div class="relative">
      <!-- Background Image with Gradient Overlay -->
      <div
        :style="[getBoostedShopImage(shop.is_boosted)]"
        class="h-[300px] md:h-[400px] w-full bg-cover bg-center relative overflow-hidden"
      >
        <!-- Dark Gradient Overlay -->
        <div
          class="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70"
        ></div>
      </div>

      <!-- Profile Content Positioned on Hero -->
      <div class="container mx-auto px-4">
        <div
          class="relative -top-[100px] flex flex-col items-center md:items-start md:flex-row md:gap-8"
        >
          <!-- Profile Image -->
          <div
            :style="`background: url('${shop?.profile?.image_url}')`"
            :class="[
              shop.is_boosted
                ? 'ring-4 ring-amber-400 shadow-lg shadow-amber-300/30'
                : '',
              shop.is_verified
                ? 'ring-4 ring-teal-500 shadow-lg shadow-teal-300/30'
                : '',
            ]"
            class="size-[160px] md:size-[180px] rounded-full bg-cover bg-center shadow-xl relative border-4 border-white dark:border-gray-800"
          >
            <span
              v-if="shop.boosted"
              class="absolute -right-2 bottom-3 size-[38px] text-white rounded-full flex justify-center items-center bg-amber-500 p-2"
            >
              <i class="bi bi-rocket-takeoff-fill text-lg"></i>
            </span>
          </div>

          <!-- Shop Info -->
          <div class="flex-1 mt-4 md:mt-10 text-center md:text-left text-white">
            <div
              class="flex flex-col md:flex-row md:justify-between md:items-start"
            >
              <div>
                <h1
                  class="text-2xl md:text-3xl font-bold flex items-center justify-center md:justify-start gap-2"
                >
                  {{ shop.name }}
                  <i
                    class="bi bi-patch-check-fill text-teal-400"
                    v-if="shop.is_verified"
                  ></i>
                </h1>
                <div class="text-gray-200 mt-1">{{ shop.category }}</div>

                <div
                  class="mt-3 text-gray-200 flex items-center justify-center md:justify-start gap-2"
                  v-if="shop.location"
                >
                  <i class="bi bi-geo-alt"></i>
                  <span>{{ shop.location }}</span>
                </div>
                <div class="text-gray-300 text-sm mt-1">
                  joined whatsell: {{ formatCustomDate(shop.createdAt) }}
                </div>
              </div>

              <!-- Stats in Hero Section -->
              <div
                class="flex gap-6 mt-4 md:mt-0 justify-center md:justify-end text-gray-200"
              >
                <div class="text-center">
                  <div class="font-bold text-2xl">{{ shop.listings }}</div>
                  <div class="text-sm">Listings</div>
                </div>
                <div class="text-center">
                  <div class="font-bold text-2xl">{{ followers.length }}</div>
                  <div class="text-sm">Followers</div>
                </div>
                <div class="text-center">
                  <div class="font-bold text-2xl">0</div>
                  <div class="text-sm">Ratings</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- MAIN CONTENT AREA -->
    <div class="container mx-auto px-4 -mt-[60px] mb-12">
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6">
        <!-- Shop Description & Action Section -->
        <div
          class="flex flex-col lg:flex-row gap-8 mb-8 pb-8 border-b border-gray-200 dark:border-gray-700"
        >
          <!-- Description Section -->
          <div class="flex-1">
            <h2
              class="text-xl font-semibold mb-3"
              :class="shop.is_boosted ? 'text-amber-600' : 'text-teal-600'"
            >
              About This Shop
            </h2>
            <p class="text-gray-700 dark:text-gray-300">
              {{ shopDescription }}
              <UButton
                v-if="shop.description.length > 200"
                :color="shop.is_boosted ? 'yellow' : 'teal'"
                @click="des_expanded = !des_expanded"
                :label="des_expanded ? 'see less' : 'see more'"
                variant="link"
              />
            </p>
          </div>

          <!-- Action Button Section -->
          <div class="md:w-[280px]">
            <div class="absolute top-5 right-5 flex gap-3">
              <UDropdown
                :items="isAllowed ? items_allowed : items"
                :popper="{ placement: 'bottom-start' }"
              >
                <UButton
                  color="gray"
                  icon="iconoir:more-horiz"
                  variant="ghost"
                />
              </UDropdown>
            </div>

            <div class="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <!-- If owner -->
              <UButton
                v-if="isAllowed"
                icon="material-symbols:box-add-sharp"
                class="w-full justify-center"
                :color="shop.is_boosted ? 'yellow' : 'teal'"
                @click="useRouter().push('/sell')"
                label="Add Product"
                size="lg"
              />
              <!-- If visitor -->
              <template v-else>
                <UButton
                  v-if="user"
                  @click="followShop(shop._id)"
                  :icon="
                    isFollowingShop(followers) ? '' : 'bi:person-plus-fill'
                  "
                  :loading="loading_fl"
                  loading-icon="svg-spinners:bars-rotate-fade"
                  class="w-full justify-center"
                  :variant="isFollowingShop(followers) ? 'solid' : 'outline'"
                  :color="shop.is_boosted ? 'yellow' : 'teal'"
                  :label="isFollowingShop(followers) ? 'Following' : 'Follow'"
                  size="lg"
                />
                <UButton
                  v-else
                  @click="useRouter().push('/login')"
                  :icon="
                    isFollowingShop(followers) ? '' : 'bi:person-plus-fill'
                  "
                  class="w-full justify-center"
                  :variant="isFollowingShop(followers) ? 'solid' : 'outline'"
                  :color="shop.is_boosted ? 'yellow' : 'teal'"
                  :label="isFollowingShop(followers) ? 'Following' : 'Follow'"
                  size="lg"
                />
              </template>
            </div>
          </div>
        </div>

        <!-- Tabs and Content Section -->
        <div class="w-full">
          <!-- Tabs Navigation -->
          <div class="border-b border-gray-200 dark:border-gray-700 mb-6">
            <div class="flex gap-1">
              <UButton
                @click="currentTab = 0"
                :variant="currentTab == 0 ? 'ghost' : 'ghost'"
                :class="currentTab == 0 ? 'border-b-2' : ''"
                :style="
                  currentTab == 0
                    ? { borderColor: shop.is_boosted ? '#ca8a04' : '#0d9488' }
                    : {}
                "
                :color="
                  currentTab == 0
                    ? shop.is_boosted
                      ? 'yellow'
                      : 'teal'
                    : 'gray'
                "
                icon="heroicons:squares-plus"
                size="lg"
                label="Listings"
              />
              <UButton
                @click="[(currentTab = 1), getShopGlips(shop._id)]"
                :variant="currentTab == 1 ? 'ghost' : 'ghost'"
                :class="currentTab == 1 ? 'border-b-2' : ''"
                :style="
                  currentTab == 1
                    ? { borderColor: shop.is_boosted ? '#ca8a04' : '#0d9488' }
                    : {}
                "
                :color="
                  currentTab == 1
                    ? shop.is_boosted
                      ? 'yellow'
                      : 'teal'
                    : 'gray'
                "
                icon="heroicons:video-camera"
                size="lg"
                label="Glips"
              />
            </div>
          </div>

          <!-- Tab Content: Listings -->
          <div v-if="currentTab === 0" class="flex flex-col gap-6">
            <div class="min-h-[500px] overflow-hidden">
              <div
                v-if="products.length == 0"
                class="flex flex-col justify-center items-center gap-3 mt-12 text-gray-600 dark:text-gray-400"
              >
                <i class="bi bi-box2 text-6xl opacity-50"></i>
                <span class="text-lg">No products found</span>
              </div>
              <div v-else>
                <MasonryWall
                  :items="products"
                  :ssr-columns="1"
                  :column-width="200"
                  :gap="16"
                >
                  <template #default="{ item }">
                    <ProductCard
                      class="transform transition-all duration-300 hover:-translate-y-1"
                      :has-liked-button="true"
                      :id="item._id"
                      :product_price="item.price.toLocaleString()"
                      :image_url="item.images[0]"
                      :views="item.views"
                      :is_liked="checkLikes(item._id)"
                      :product_slug="item.slug"
                    />
                  </template>
                </MasonryWall>
              </div>
            </div>

            <!-- Pagination -->
            <div
              class="flex justify-center items-center gap-6 mt-4"
              v-if="products.length > 0"
            >
              <UButton
                :loading="loadingProducts"
                loading-icon="svg-spinners:bars-rotate-fade"
                :disabled="current_page == 1"
                variant="ghost"
                :color="shop.is_boosted ? 'yellow' : 'teal'"
                @click="[current_page--, getShopProducts()]"
                icon="heroicons:arrow-small-left"
              />
              <span class="text-gray-700 dark:text-gray-300"
                >{{ current_page }} of {{ total_page }}</span
              >
              <UButton
                :loading="loadingProducts"
                loading-icon="svg-spinners:bars-rotate-fade"
                variant="ghost"
                :color="shop.is_boosted ? 'yellow' : 'teal'"
                :disabled="current_page == total_page"
                icon="heroicons:arrow-small-right"
                @click="[current_page++, getShopProducts()]"
              />
            </div>
          </div>

          <!-- Tab Content: Glips -->
          <div v-if="currentTab === 1" class="min-h-[500px]">
            <div
              v-if="loading_glips"
              class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"
            >
              <USkeleton
                v-for="glip in 8"
                :key="glip"
                class="h-[200px] rounded-lg"
                :ui="{ background: 'dark:bg-gray-700' }"
              />
            </div>
            <div
              v-else
              class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"
            >
              <GlipCard
                v-for="item in glips"
                :key="item._id"
                :item="item"
                class="transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div
              v-if="!loading_glips && glips.length === 0"
              class="flex flex-col justify-center items-center gap-3 mt-12 text-gray-600 dark:text-gray-400 py-8"
            >
              <i class="bi bi-camera-video text-6xl opacity-50"></i>
              <span class="text-lg">No glips available</span>
            </div>
          </div>
        </div>
      </div>

      <!-- REVIEWS SECTION -->
     
    </div>
  </div>
</template>
<style scoped>
.shadow-text {
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
}
</style>

<style scoped>
.antialiased {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

<script setup>
import {
  useRoute,
  useAsyncData,
  useHead,
  useRouter,
  useNuxtApp,
} from "#imports"; // Ensure all imports are here
import { ref, computed, watch, onMounted } from "vue"; // Add computed, watch, onMounted

const route = useRoute();
const config = useRuntimeConfig();
// ... (all your existing refs: isExpanded, shopImage, etc.)
const isExpanded = ref(false);
const shopImage = ref("");
const shopBoostDuration = ref(1);
const glipsModal = ref(false);
const loading = ref(false); // This seems to be a general loading, maybe rename if specific
const currentTab = ref(0);
const products = ref([]);
const user = ref(null); // Initialize as null for clarity
const shopId = ref("");
const shopRating = ref(4); // This seems to be a static rating, averageRating will be dynamic
const loadingProducts = ref(false);
const loadingGlips = ref(false); // Renamed from loading_glips for consistency
const followers = ref([]);
const boostShopModal = ref(false);
const liked_products = ref([]);
const des_expanded = ref(false);

// import verifiedShop from '@/assets/images/verified_shop.png'; // Keep if used elsewhere
import normalShop from "@/assets/images/non_verified_shop.png";
import boostedShopImage from "@/assets/images/boosted_shop.png";

const getBoostedShopImage = (isBoosted) =>
  `background-image: url(${isBoosted ? boostedShopImage : normalShop})`;

const {
  data: shop,
  pending: shopLoading,
  error: shopError,
} = await useAsyncData(
  "shop",
  async () => {
    try {
      const response = await $fetch(
        `${config.public.apiBase}/shops/${route.params.name}/full`
      );
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
  },
  {
    // By default, useAsyncData might not refetch on param change on client-side nav unless key changes or watch is set.
    // If `route.params.name` can change while on this page, you might need:
    // watch: [() => route.params.name]
  }
);

// Review System Refs
const reviews = ref([]);
const loadingReviews = ref(false);
const averageRating = ref(0);
const showReviewForm = ref(false);
const newReview = ref({
  rating: 0,
  text: "",
});
const submittingReview = ref(false);

// === EXISTING FUNCTIONS ===
const addViewsToShop = async () => {
  if (!shop.value?._id) return; // Ensure shop is loaded
  try {
    await useNuxtApp().$apiFetch(`/shops/${route.params.name}/view`);
  } catch (err) {
    console.log("err adding views to shop: ", err);
  }
};

function formatCustomDate(isoString) {
  if (!isoString) return "Date not available";
  const date = new Date(isoString);
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();
  const getOrdinalSuffix = (num) => {
    if (num > 3 && num < 21) return "th";
    switch (num % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };
  return `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
}

function getPercentageForRating(reviews, rating) {
  if (!reviews || reviews.length === 0) return 0;
  const count = reviews.filter((review) => review.rating === rating).length;
  return Math.round((count / reviews.length) * 100);
}

const current_page = ref(1);
const total_page = ref(1);
const total_products = ref(1);
const getShopProducts = async () => {
  if (!shop.value?._id) return; // Ensure shop is loaded
  loadingProducts.value = true;
  try {
    const res = await useNuxtApp().$apiFetch(
      `/products/${route.params.name}/shop?page=${current_page.value}`
    );
    products.value = res.products;
    current_page.value = res.currentPage;
    total_page.value = res.totalPages;
    total_products.value = res.totalProducts;
  } catch (err) {
    console.log("err getting shops products: ", err);
  }
  loadingProducts.value = false;
};

const getUserDetails = async () => {
  try {
    const res = await useNuxtApp().$apiFetch(`/user`);
    user.value = res.user;
    liked_products.value = res.user.liked_products || []; // Ensure liked_products is an array
  } catch (error) {
    console.log("Error fetching user details: ", error);
    user.value = null; // Set user to null if not logged in or error
  }
};

const shopDescription = computed(() => {
  if (!shop.value?.description) return "";
  if (des_expanded.value) {
    return shop.value.description;
  } else {
    // Ensure description exists and is long enough before slicing
    return shop.value.description.length > 200
      ? shop.value.description.slice(0, 200) + "..."
      : shop.value.description;
  }
});

const isAllowed = computed(() => {
  if (user.value && shop.value) {
    return user.value._id === shop.value.owner?._id; // Add optional chaining for owner
  }
  return false;
});

const checkLikes = (product_id) => {
  return liked_products.value.includes(product_id);
};

const isFollowingShop = (followers_) => {
  if (!user.value || !followers_ || followers_.length === 0) return false;
  const user_id = user.value._id;
  return followers_.some((follower) => follower._id === user_id);
};

const getShopById = async (shop_id) => {
  if (!shop_id) return;
  try {
    const res = await useNuxtApp().$apiFetch(`/shops/${shop_id}`);
    if (res.shop) {
      followers.value = res.shop.followers;
      // If you need to update the main shop object, be careful with reactivity:
      // Object.assign(shop.value, res.shop); // This might be one way
    }
  } catch (err) {
    console.log("err getting shop by id: ", err);
  }
};

const loading_fl = ref(false);
const followShop = async (shop_id) => {
  if (!user.value) {
    useRouter().push("/login"); // Redirect to login if user not available
    return;
  }
  if (!shop_id) return;
  loading_fl.value = true;
  try {
    await useNuxtApp().$apiFetch(`/shops/${shop_id}/follow`, {
      method: "POST",
    });
    // Re-fetch shop data or followers specifically to update UI
    await getShopById(shop_id); // This will update followers.value
  } catch (err) {
    console.log("err following shop: ", err);
    // Add user feedback (e.g., toast notification)
  }
  loading_fl.value = false;
};

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
      alert("Shop link copied to clipboard!"); // Or use a toast
    } catch (err) {
      alert("Sharing is not supported or failed.");
    }
  }
};

const items = computed(() => [
  // Make it computed if shop.value is needed or for dynamic states
  [
    {
      label: "Share",
      icon: "hugeicons:share-05",
      click: shareShop,
    },
  ],
  [
    {
      label: "Report",
      icon: "hugeicons:flag-03",
      disabled: true, // Implement reporting if needed
    },
  ],
]);

const items_allowed = computed(() => [
  // Make it computed
  [
    {
      label: "Share",
      icon: "hugeicons:share-05",
      click: shareShop,
    },
    {
      label: "Shop Settings",
      icon: "hugeicons:settings-02",
      click: () => {
        useRouter().push("/account/shop");
      },
    },
  ],
]);

const glips = ref([]);
// loadingGlips is already defined
const getShopGlips = async (shop_id) => {
  if (!shop_id) return;
  loadingGlips.value = true;
  try {
    const res = await useNuxtApp().$apiFetch(`/products/glips/${shop_id}/all`);
    glips.value = res.glips || [];
  } catch (err) {
    console.log("err getting glips: ", err);
    glips.value = [];
  }
  loadingGlips.value = false;
};

// === REVIEW SYSTEM METHODS ===
const calculateAverageRating = () => {
  if (reviews.value.length === 0) {
    averageRating.value = 0;
    return;
  }
  const totalRating = reviews.value.reduce(
    (sum, review) => sum + review.rating,
    0
  );
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
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const fetchedReviews = [
      {
        _id: "r1",
        user: { name: "Alice Wonderland" },
        rating: 5,
        text: "Amazing products and fast shipping! Highly recommend this shop. The quality is top-notch and the customer service was very helpful when I had a question.",
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      },
      {
        _id: "r2",
        user: { name: "Bob The Builder" },
        rating: 4,
        text: "Good quality items, though one was a bit different from the picture. Overall satisfied and would consider buying again.",
        createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
      },
      {
        _id: "r3",
        user: { name: "Charlie Brown" },
        rating: 3,
        text: "Average experience. Took a while to arrive but the product was as described.",
        createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
      },
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
  if (
    !newReview.value.rating ||
    !newReview.value.text.trim() ||
    !user.value ||
    !shop.value
  ) {
    alert("Please provide a rating and comment."); // Replace with a toast if you have one
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
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const submittedReview = {
      _id: `r${Date.now()}`,
      user: {
        name: user.value?.name || user.value?.username || "Current User",
      }, // Adjust based on your user object
      rating: newReview.value.rating,
      text: newReview.value.text,
      createdAt: new Date().toISOString(),
    };
    reviews.value.unshift(submittedReview); // Add to the beginning of the list
    // --- END DUMMY SUBMISSION ---

    calculateAverageRating();
    showReviewForm.value = false;
    newReview.value = { rating: 0, text: "" }; // Reset form
    alert("Review submitted successfully!"); // Replace with toast
  } catch (err) {
    console.error("Error submitting review:", err);
    alert("Failed to submit review. Please try again."); // Replace with toast
  } finally {
    submittingReview.value = false;
  }
};

const formatReviewDate = (isoString) => {
  if (!isoString) return "";
  const date = new Date(isoString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
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
watch(
  shop,
  (newShopValue) => {
    if (newShopValue && newShopValue._id) {
      getShopProducts(); // Fetches initial page of products
      addViewsToShop();
      fetchShopReviews(newShopValue._id); // Fetch reviews for the current shop
    } else if (!newShopValue && !shopLoading.value) {
      // Handle case where shop is definitively not found or error occurred
      console.log("Shop data is null and not loading, possible 404 or error.");
      // You might want to redirect or show a specific message.
    }
  },
  { immediate: true }
); // `immediate: true` runs the watcher once on component mount with current shop value

// Set meta tags dynamically (before page is rendered)
useHead(
  computed(() => {
    const shopData = shop.value; // Get current value of shop
    const title = shopData
      ? `${shopData.name} - ${shopData.category}`
      : "Shop Details";
    const description =
      shopData?.description || "View products and details for this shop.";
    const imageUrl = shopData?.profile?.image_url;
    const pageUrl = `https://wha-sell.vercel.app/shops/${route.params.name}`; // Ensure this is your production URL

    return {
      title: title,
      meta: [
        { name: "description", content: description },
        { property: "og:title", content: shopData?.name || "Shop on Whatsell" },
        { property: "og:description", content: description },
        {
          property: "og:image",
          content: imageUrl || "your_default_og_image_url_here.png",
        },
        { property: "og:type", content: "profile" }, // 'product.group' or 'profile' could be more suitable for a shop page
        { property: "og:url", content: pageUrl },
        {
          name: "twitter:card",
          content: imageUrl ? "summary_large_image" : "summary",
        },
        {
          name: "twitter:image",
          content: imageUrl || "your_default_twitter_image_url_here.png",
        },
        // Add more meta tags if needed
      ],
      link: [{ rel: "canonical", href: pageUrl }],
    };
  })
);
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
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}
.dark .max-h-\[600px\]::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.2);
}

.whitespace-pre-wrap {
  white-space: pre-wrap; /* Ensures newlines in review text are respected */
}
</style>

<style scoped></style>

<template>
  <div v-if="!shop">A shop {{ route.params.name }}</div>
  <component v-else :is="selectedTemplate" />

  <div class="p-3">
    <div v-if="reviews" class="mb-6 p-4 rounded-lg shadow-sm container mx-auto bg-slate-600/10">
      <div class="flex items-center gap-4">
        <span class="text-5xl font-bold"
          :class="shop.is_boosted ? 'text-purple-700 dark:text-purple-300' : 'text-green-700 dark:text-green-300'">
          {{ reviews?.stats?.average_rating?.toFixed(1) }}
        </span>
        <div>
          <div class="flex items-center mb-1">
            <i v-for="star in 5" :key="'avg-star-' + star" class="bi text-xl"
              :class="star <= Math.round(reviews?.stats?.average_rating) ? (shop.is_boosted ? 'bi-star-fill text-purple-500' : 'bi-star-fill text-green-500') : 'bi-star text-gray-400'">
            </i>
          </div>
          <span class="text-sm text-gray-600 dark:text-gray-400">Based on {{ reviews?.stats?.total_reviews }} review{{
            reviews?.length
              === 1 ? '' : 's' }}</span>
        </div>
      </div>
  
    </div>


    <!-- REVIEW SECTION -->
    <div v-for="review in reviews.reviews" :key="review._id"
      class="p-5 border rounded-lg flex flex-col gap-1 justify-start" :class="shop.is_boosted
        ? 'bg-white dark:bg-gray-800 border-purple-100 dark:border-purple-800/50'
        : 'bg-white dark:bg-gray-800 border-green-100 dark:border-green-800/50'
        ">
      <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">
        {{ formatReviewDate(review.createdAt) }}
      </p>

      <div class="flex flex-shrink-0">
        <i v-for="star in 5" :key="review._id + '-star-' + star" class="bi text-sm" :class="star <= review.rating
          ? shop.is_boosted
            ? 'bi-star-fill text-purple-500'
            : 'bi-star-fill text-green-500'
          : 'bi-star text-gray-400 dark:text-gray-500'
          ">
        </i>
      </div>

      <strong class="text-gray-800 text-xl dark:text-gray-100">{{
        review.product_name
      }}</strong>

      <p class="text-sm">{{ review.feedback }}</p>

      <p class="text-gray-700 dark:text-gray-300 mt-2 whitespace-pre-wrap text-sm flex items-center gap-2">
        <i class="bi bi-patch-check-fill text-blue-500"></i> verified review by
        {{ review.user?.username }}
      </p>

      <div v-if="review.images.length > 0" class="my-4 w-full flex flex-row gap-3">
        <div v-for="image in review.images" :key="image" class="w-fit">
          <img :src="image" alt="review image" class="size-[100px] rounded-md" />
        </div>
      </div>
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

import Template_0 from "@/components/templates/Template_0.vue";
import Template_1 from "@/components/templates/Template_1.vue";
import Template_2 from "@/components/templates/Template_2.vue";
import Template_3 from "@/components/templates/Template_3.vue";
import Template_4 from "@/components/templates/Template_4.vue";

const templateMap = {
  0: Template_0,
  1: Template_1,
  2: Template_2,
  3: Template_3,
  4: Template_4,
};

const selectedTemplate = computed(() => {
  const template_code = shop.value?.template_code;
  return templateMap[template_code] || Template_0;
});

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

const getShopReviews = async () => {
  loadingReviews.value = true;
  try {
    const res = await useNuxtApp().$apiFetch(
      `/shops/${useRoute().params.name}/reviews`
    );
    reviews.value = res.data;
    console.log("shop reviews: ", res);
  } catch (err) {
    console.log("err getting shop reviews: ", err);
  }
  loadingReviews.value = false;
};
onMounted(async () => {
  getShopReviews();
});

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
      // fetchShopReviews(newShopValue._id); // Fetch reviews for the current shop
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
  white-space: pre-wrap;
  /* Ensures newlines in review text are respected */
}
</style>

<style scoped></style>

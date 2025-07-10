<template>
  <ScrollToTop />

  <div class="min-h-screen md:p-0">
    <!-- HERO CAROUSEL -->
    <!--     <UCarousel v-slot="{ item }" :items="items" :ui="{ item: 'basis-full' }" class="rounded-lg overflow-hidden mt-3 !max-h-[300px]" arrows>
  <img :src="item" class="w-full " draggable="false">
</UCarousel> -->

    <!-- <button @click="promptForNotificationPermission">Enable Notifications</button> -->

    <HeroSection />

    <!-- all categories.... -->
    <h2 class="font-bold mt-12">Explore Our Categories</h2>
    <!-- {{ categories }} -->
    <div class="flex flex-row gap-3 overflow-x-auto mt-3 cat_box">
      <NuxtLink
        target="_blank"
        :to="`/categories/${category.category}`"
        v-for="(category, index) in categories"
        class="flex justify-center items-center text-sm min-w-[200px] p-3 bg-white border dark:border-gray-600 dark:bg-gray-900 rounded-full font-bold"
      >
        {{ category.category }}</NuxtLink
      >
    </div>

    <!-- best deals for your 2morrow -->
    <h2 class="font-bold mt-12">Best Deals for you today</h2>
    <div v-if="loading" class="mt-12 flex flex-wrap gap-3">
      <!-- dummy product card -->
      <div
        v-for="card in 10"
        class="flex-1 md:flex-0 min-w-[150px] w-[150px] h-[200px] flex flex-col gap-2 p-1 bg-gray-500 bg-opacity-20 rounded-md"
      >
        <USkeleton
          class="w-full h-[50%]"
          :ui="{ background: 'dark:bg-gray-700' }"
        />
        <USkeleton
          class="w-[80%] h-[10px]"
          :ui="{ background: 'dark:bg-gray-700' }"
        />
        <USkeleton
          class="w-full h-[20px]"
          :ui="{ background: 'dark:bg-gray-700' }"
        />
        <USkeleton
          class="w-[70%] h-[10px]"
          :ui="{ background: 'dark:bg-gray-700' }"
        />
      </div>
    </div>
    <div
      v-if="!loading && products.length > 0"
      class=""
    >
      <div class="flex justify-start items-start w-full">
        <div
          class="columns-2 sm:columns-3 lg:columns-4 xl:columns-4 gap-4 space-y-4"
        >
          <div v-for="item in products" class="break-inside-avoid">
            <ProductCard
              :user="user"
              class="mt-[15px]"
              :has-liked-button="true"
              :id="item._id"
              :product_price="item.price.toLocaleString()"
              :image_url="item.images[0]"
              :views="item.views"
              :is_liked="checkLikes(item._id)"
              :product_slug="item.slug"
              :product_name="item.name"
            />
          </div>
        </div>
      </div>
      <!--  <MasonryWall
        :items="products.slice(0, 20)"
        :ssr-columns="1"
        :column-width="130"
        :gap="10"
      >
        <template #default="{ item, index }">
          <ProductCard
            class="mt-[15px]"
            :has-liked-button="true"
            :id="item._id"
            :product_price="item.price.toLocaleString()"
            :image_url="item.images[0]"
            :views="item.views"
            :is_liked="checkLikes(item._id)"
            :product_slug="item.slug"
            :product_name="item.name"
          />
        </template>
      </MasonryWall> -->
    </div>

    <!-- Premium Sellers -->
    <h2 class="font-bold mt-12">Premium Sellers</h2>
    <div class="flex flex-wrap gap-3 mt-3">
      <BoostedShopCard
        v-for="shop in boosted_shops"
        :name="shop.name"
        :category="shop.category"
        :image_url="shop?.profile?.image_url"
      />
      <div
        v-if="!loading_boosted_shops && boosted_shops.length == 0"
        class="p-5 py-8 text-center w-full bg-[#00c1f618] rounded-lg text-xl text-[#00C1F6]"
      >
        There are limited slots available,<br />
        be the first to take an available slot. <br />
        <NuxtLink v-if="user?.shop" :to="`/account/shop`">
          <button
            class="rounded-full bg-[#00C1F6] text-white p-3 px-6 mt-6 font-bold"
          >
            Boost Your Shop Now! <i class="bi bi-rocket-fill ml-3"></i>
          </button>
        </NuxtLink>

        <NuxtLink v-else to="/account/shop">
          <button
            class="rounded-full bg-black text-white p-3 px-6 mt-6 font-bold"
          >
            Create Your shop
          </button>
        </NuxtLink>
      </div>
    </div>

    <!-- get all shops -->
    <h2 class="font-bold mt-12">Discover Shops Near your location</h2>

    <!--  <UCarousel
      ref="carouselRef"
      v-slot="{ item }"
      :items="shops"
      class="mt-3"
      arrows
    >
      <ShopCard
        class="mr-3"
        :header_image="item?.headerImage"
        :name="item?.name"
        :category="item?.category"
        :image_url="item?.profile?.image_url"
        :location="`${item?.owner?.location?.state} | ${item?.owner?.location?.LGA}`"
      />
    </UCarousel>
 -->

    <!-- {{ all_shops }} -->
    <div
      class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-3 py-5 relative h-[790px] overflow-hidden"
    >
      <ShopCard
        v-for="shop in shops"
        :name="shop.name"
        :header_image="shop.headerImage"
        :category="shop.category"
        :image_url="shop?.profile?.image_url"
        :location="shop?.profile?.location"
      />
      <div
        v-if="shops.length === 0"
        class="p-12 flex flex-col items-center justify-center w-full gap-3 col-span-full"
      >
        <i class="bi bi-exclamation-circle text-4xl"></i>
        <span>No shops available</span>
      </div>

      <!-- Cover -->
      <div
        class="w-full h-[65%] bottom-0 overflow_cover_dark hidden dark:flex absolute justify-center items-center"
      >
        <UButton
          @click="navigateTo('/shops')"
          label="See All Shops"
          color="green"
          class="bg-app_green"
        />
      </div>
      <div
        class="w-full h-[65%] bottom-0 overflow_cover dark:hidden absolute flex justify-center items-center"
      >
        <UButton
          @click="navigateTo('/shops')"
          label="See All Shops"
          color="green"
          class="bg-app_green"
        />
      </div>
    </div>

    <div
      v-if="!user"
      class="flex flex-col gap-3 justify-center items-center h-[300px]"
    >
      <p class="text-center">
        Join whatsell and start selling your products to a wide audience.
      </p>
      <NuxtLink to="/register/seller">
        <button class="rounded-full bg-app_green text-white p-3 px-6 font-bold">
          Become a Vendor Today!
        </button>
      </NuxtLink>
      <span
        >Are you a regular buyer?
        <Nuxtlink to="/register/buyer" class="underline text-blue-500">
          signup</Nuxtlink
        >
        and start buying!
      </span>
    </div>

    <!-- best deals for your 2morrow -->
    <h2 class="font-bold mt-12 mb-6">Posted previously by vendors</h2>
    <div v-if="loading" class="mt-12 flex flex-wrap gap-3">
      <!-- dummy product card -->
      <div
        v-for="card in 10"
        class="flex-1 md:flex-0 min-w-[150px] w-[150px] h-[200px] flex flex-col gap-2 p-1 bg-gray-500 bg-opacity-20 rounded-md"
      >
        <USkeleton
          class="w-full h-[50%]"
          :ui="{ background: 'dark:bg-gray-700' }"
        />
        <USkeleton
          class="w-[80%] h-[10px]"
          :ui="{ background: 'dark:bg-gray-700' }"
        />
        <USkeleton
          class="w-full h-[20px]"
          :ui="{ background: 'dark:bg-gray-700' }"
        />
        <USkeleton
          class="w-[70%] h-[10px]"
          :ui="{ background: 'dark:bg-gray-700' }"
        />
      </div>
    </div>
    <div
      v-if="!loading && products.length > 0"
      class="flex flex-row flex-wrap gap-3"
    >
    </div>

    <!-- BEST SELLING -->
    <!-- <h2 class="font-bold mt-12">All shops</h2> -->

    <!-- FAQ SECTION -->
    <h2 class="font-bold mt-12">Services to help you Shop</h2>
    <div class="flex flex-row flex-wrap gap-3 pb-10 mt-3">
      <div
        class="flex flex-col justify-between items-center flex-1 rounded-md overflow-hidden h-[300px] min-w-[300px] border dark:border-none"
      >
        <div
          class="flex flex-col gap-3 bg-white dark:bg-gray-900 h-[50%] p-5 w-full"
        >
          <span class="font-bold text-xl">Frequently Asked Questions</span>
          <p class="mt-2 text-sm">Updates on safe Shopping in our shops</p>
        </div>
        <div class="h-[50%] bg-yellow-400 w-full question"></div>
      </div>

      <div
        class="flex flex-col justify-between items-center flex-1 rounded-md overflow-hidden h-[300px] min-w-[300px] border dark:border-none"
      >
        <div
          class="flex flex-col gap-3 bg-white dark:bg-gray-900 h-[50%] p-5 w-full"
        >
          <span class="font-bold text-xl">Navigate WhatSell With Ease</span>
          <p class="mt-2 text-sm">
            Updates how you can navigate WhatSell easily
          </p>
        </div>
        <div class="h-[50%] bg-green-400 w-full coins"></div>
      </div>

      <div
        class="flex flex-col justify-between items-center flex-1 rounded-md overflow-hidden h-[300px] min-w-[300px] border dark:border-none"
      >
        <div
          class="flex flex-col gap-3 bg-white dark:bg-gray-900 h-[50%] p-5 w-full"
        >
          <span class="font-bold text-xl"
            >Safety Tips for Secure Purchasing</span
          >
          <p class="mt-2 text-sm">
            Get full insight on how to safely buy products on WhatSell
          </p>
        </div>
        <div class="h-[50%] bg-green-800 w-full gaurd"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  name: "Market",
});
import { ref } from "vue";
import { useRoute, useAsyncData } from "#imports";
import axios from "axios";
const carouselRef = ref();

const promptForNotificationPermission = async () => {
  try {
    const permission = await OneSignal.Notifications.requestPermission();
    if (permission) {
      console.log("Notification permission granted");
      // You can now get the user's ID
      const userId = await OneSignal.User.pushSubscription.getId();
      console.log("User ID:", userId);

      // Send this ID to your backend if needed
    } else {
      console.log("Notification permission denied");
    }
  } catch (error) {
    console.error("Error requesting permission:", error);
  }
};

const checkSubscriptionStatus = async () => {
  const isSubscribed = await OneSignal.Notifications.isPushSupported();
  const permission = await OneSignal.Notifications.permission;
  console.log("Push supported:", isSubscribed);
  console.log("Permission status:", permission);
};

onMounted(() => {
  setInterval(() => {
    if (!carouselRef.value) return;

    if (carouselRef.value.page === carouselRef.value.pages) {
      return carouselRef.value.select(0);
    }

    carouselRef.value.next();
  }, 3000);
});

const items = [
  "https://picsum.photos/1280/720?random=1",
  "https://picsum.photos/1280/720?random=2",
  "https://picsum.photos/1280/720?random=3",
  "https://picsum.photos/1280/720?random=4",
  "https://picsum.photos/1280/720?random=5",
  "https://picsum.photos/1280/720?random=6",
];

const config = useRuntimeConfig();

const loading = ref(false);
// Fetch and extract only the `products` array
const { data: products, error: products_error } = await useAsyncData(
  "products",
  async () => {
    loading.value = true;
    const response = await $fetch(`${config.public.apiBase}/products`);
    loading.value = false;
    return response.products.slice(0, 50).reverse(); // Extracting the nested products array
  }
);

const { data: prev_products, error: prev_products_error } = await useAsyncData(
  "prev_products",
  async () => {
    loading.value = true;
    const response = await $fetch(`${config.public.apiBase}/products`);
    loading.value = false;
    return response.products.slice(0, 10); // Extracting the nested products array
  }
);

const categories = ref([]);
const getcats = async () => {
  try {
    const response = await useNuxtApp().$apiFetch(`/categories_image`);
    categories.value = response.data;
    console.log("cats: ", response);
  } catch (error) {
    console.log("erro getting categories: ", error);
  }
};

const shop_loading = ref(false);
const shops = ref([]);
async function getAllShops() {
  shop_loading.value = true;
  try {
    const response = await useNuxtApp().$apiFetch(`/shops/list/all`);
    shops.value = response.shops.reverse();
    console.log("all shops: ", response);
  } catch (error) {
    console.log("error getting categories: ", error);
  }
  shop_loading.value = false;
}

const user = ref(null);
const credits = ref(0);
const liked_products = ref([]);
const getUserDetails = async () => {
  try {
    const res = await useNuxtApp().$apiFetch(`/user`);
    user.value = res.user;
    credits.value = res.credits;
    liked_products.value = res.user.liked_products;
    console.log("user: ", res);
  } catch (error) {
    console.log(error);
  }
};

const checkLikes = (product_id) => {
  if (liked_products.value.includes(product_id)) {
    return true;
  } else {
    return false;
  }
};

const loading_boosted_shops = ref(false);
const boosted_shops = ref([]);
const getBoostedShops = async () => {
  loading_boosted_shops.value = true;
  try {
    const res = await useNuxtApp().$apiFetch("/shops/boosted/all");
    boosted_shops.value = res.shops;
    console.log("Premium Sellers: ", res);
  } catch (err) {
    console.log("err getting Premium Sellers: ", err);
  }
  loading_boosted_shops.value = false;
};

getBoostedShops();
getcats();
getAllShops();
getUserDetails();

// console.log("Fetched products:", products.value)
// console.log("fetched categories: ", categories.value)

const toast = useToast();

const verifyEmail = async (token) => {
  try {
    const response = await axios.post(
      `${useRuntimeConfig().public.apiBase}/email_verify`,
      { token }
    );
    console.log("res from email verifi: ", response);
    toast.add({ title: response.data.message });
  } catch (error) {
    console.log("error from email verifi: ", error);
    toast.add({ title: error.response.data.message });
  }
};

onMounted(() => {
  const token = useRoute().query.token;
  if (token) {
    verifyEmail(token);
  }
});
</script>

<style scoped>
.question {
  background: url("../assets/images/questions_yellow.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.coins {
  background: url("../assets/images/coins_.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.gaurd {
  background: url("../assets/images/gaurd_.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
</style>

<template>
  <!-- BUY NOW MODAL -->
  <UModal v-model="proceed_to_buy" :ui="{ container: 'flex items-center justify-center min-h-screen' }">
    <UCard>
      <template #header>
        <span class=" text-xl font-bold"> Proceed to purchase</span>
      </template>
      <div class=" flex flex-col gap-3">
        <span>Before you proceed, make sure you carefully read and follow these helpful tips to ensure the safety of
          yourself
          and your goods!</span>
        <div class=" flex flex-col text-left p-12 bg-blue-500 bg-opacity-20 rounded-lg">
          <span class=" font-bold bg-blue-500 rounded-md p-5 w-fit text-center mx-auto"><i
              class="bi bi-shield-check"></i>
            Safety tips</span>
          <ol class="list-decimal pl-5 mt-3">
            <li v-for="item in buying_rules">{{ item }}</li>
          </ol>
        </div>
      </div>
      <template #footer>
        <div class=" w-full flex justify-between items-center">
          <UButton label="Cancel" color="red" varaint="soft" size="xl" @click="proceed_to_buy = !proceed_to_buy" />

          <!-- `https://wa.me/${product?.shop?.owner?.phone}?text=${wa_message_text}` : '#'"> -->
          <a :href="`https://wa.me/${product?.shop?.owner?.phone}/?text=${wa_message_text}`">
            <UButton label="Proceed" color="green" size="xl" @click="proceed_to_buy = !proceed_to_buy"
              variant="solid" />
          </a>
        </div>
      </template>
    </UCard>
  </UModal>



  <!-- PRODUCT DESCRIPTION -->
  <UModal v-model="product_description" :ui="{ container: 'flex items-center justify-center min-h-screen' }">
    <UCard>
      <template #header>
        <span class=" text-xl font-bold"> {{ product.name }}</span>
      </template>
      <div v-html="formattedDecription" class=" max-h-[500px] overflow-y-auto inner"></div>
    </UCard>
  </UModal>

  <!-- PRODUCT IMAGE MODAL -->
  <UModal v-model="preview_image" :ui="{ container: 'flex items-center justify-center min-h-screen' }">
    <div class=" flex flex-col">
      <div class=" flex flex-col bg-gray-500 px-6 min-h-[300px] justify-center items-center">
        <img :src="selected_image" />
      </div>
    </div>
  </UModal>

  <!-- SHARE MODAL -->
  <UModal v-model="share_modal_open" :ui="{ container: 'flex items-center justify-center min-h-screen' }">
    <div class="p-8 flex flex-col gap-3 justify-center text-center">
      <span class=" font-bold text-xl">Share this product</span>
      <div class=" mt-1 flex flex-row gap-6 w-full justify-evenly items-center">
        <a :href="`whatsapp://send?text=Hey checkout this product on whatsell ${fullUrl}`"
          data-action="share/whatsapp/share">
          <button class=" text-green-500 text-4xl">
            <i class="bi bi-whatsapp"></i>
          </button>
        </a>

        <a target="_blank" :href="`http://www.facebook.com/share.php?u=${fullUrl}&amp;title='${product.name}'`">
          <button class=" text-blue-500 text-4xl">
            <i class="bi bi-facebook"></i>
          </button>
        </a>

        <a target="_blank" class="twitter-share-button"
          :href="`https://twitter.com/intent/tweet?text= Hey checkout this product on whatsell ${fullUrl}`">
          <button class=" text-slate-500 text-4xl">
            <i class="bi bi-twitter"></i>
          </button>
        </a>

        <a :href="`https://www.instagram.com/stories/create/?url=${fullUrl}`" target="_blank">
          <button class=" text-orange-500 text-4xl">
            <i class="bi bi-instagram"></i>
          </button>
        </a>
      </div>

      <!-- COPY THE LINK -->
      <div class=" flex flex-col mt-3">
        <span class=" font-bold">Copy the link</span>
        <div class=" mt-3 flex items-center border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
          <input type="text" class="p-2 w-full outline-none" :value="fullUrl" readonly>
          <button class="p-2 flex flex-row gap-3" @click="copyPageLink">
            <i class="bi bi-clipboard"></i>
            <span v-if="copied">Copied</span>
            <span v-else>Copy</span>
          </button>
        </div>
      </div>
    </div>
  </UModal>

  <!-- PRODUCT LIKE -->
  <UModal v-model="no_auth_like" :ui="{ container: 'flex items-center justify-center min-h-screen' }">
    <div class="p-12 text-center items-center justify-center flex flex-col gap-3">
      <h1 class=" text-2xl font-bold">Please login to continue</h1>
      <img src="../../../assets/images/auth_pages.png" class=" w-[300px]" />
      <NuxtLink to="/login" class=" w-full">
        <button class=" bg-app_green text-white p-3 rounded-md w-full">Login</button>
      </NuxtLink>
    </div>
  </UModal>



  <div class=" p-5">
    <!-- SHOP AREA -->
    <div class=" flex flex- gap-3 p-3 border dark:border-gray-600 mb-3 rounded-xl">
      <div class=" size-[100px] overflow-hidden">
        <img :src="product?.shop?.profile?.image_url" @click="useRouter().push(`/shops/${product?.shop?.name}`)"
          class=" rounded-md cursor-pointer" />
      </div>

      <div class=" flex flex-col gap-2">
        <span class=" font-bold text-xl cursor-pointer" @click="useRouter().push(`/shops/${product?.shop?.name}`)">{{
          product?.shop?.name }}</span>
        <span class="bg-green-500 bg-opacity-10 px-3 py-1 text-green-700 text-sm font-semibold w-fit">{{ product?.shop?.category }}</span>
        <span class="text-sm">{{ product?.shop?.profile?.location?.state }} | joined {{ product?.shop?.createdAt.split('T')[0] }}</span>
      </div>
    </div>


    <!-- PRODUCT DETAIL AREA -->
    <div class="flex flex-col md:flex-row gap-12 flex-wra relative" v-if="product">
      <div class="flex flex-col gap-3 md:w-[50%] ">
        <!-- <div :style="`background-image: url('${main_image}'); background-size: contain;`" class="full-image w-full h-[400px] rounded-md flex justify-center items-center bg-gray-100"></div> -->
        <div class=" flex flex-col gap-3">
          <UCarousel v-slot="{ item }" :items="product?.images" :prev-button="{
            icon: 'i-heroicons-arrow-left-20-solid',
          }" :next-button="{
            icon: 'i-heroicons-arrow-right-20-solid',
          }" :ui="{ item: 'basis-full' }" class="rounded-lg overflow-hidden max-h-[400px]" arrows>
            <img :src="item" class="w-full !max-h-[800px]" draggable="false">
          </UCarousel>
          <!-- <span>{{ product_images.length }}</span> -->
          <div class="flex flex-row gap-3 overflow-hidden relative">
            <img v-for="image in product?.images" class=" size-[50px] rounded-lg " :src="image"
              @click="previewImage(image)" />
            <!-- EXTRA IMG INDICATOR -->
            <div v-if="product_images > 4"
              class=" size-[100px] absolute right-0 rounded-lg flex justify-center items-center extra_img_indicator">
              <span class=" font-bold text-xl">+1</span>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col md:w-[50%]">
        <span class="bg-green-500 bg-opacity-10 px-3 py-1 text-green-700 text-2xl font-semibold w-fit">{{ product.name
        }}</span>
        <span class="px-3 py-2 mt-2 text-orange-600 bg-orange-500 bg-opacity-10 w-fit rounded-md text-sm">
          <i class="bi bi-stars"></i>
          {{ product.condition }}
        </span>
        <div class="text-3xl font-bold mt-3 flex flex-col">
          <span>NGN {{ product.price.toLocaleString() }}</span>
          <span class="text-sm" v-if="product.negotiable">Negotiable</span>

          <span v-if="product.delivery_fee" class="text-blue-500 text-[20px]">+ NGN{{
            product.delivery_fee.toLocaleString() }} delivery fee</span>
          <small class="text-sm" v-else>Non-negotiable</small>
        </div>

        <div class="flex flex-col gap-2 mt-5">
          <div class="flex flex-row justify-between">
            <p class="font-bold text-xl">Product Description</p>
          </div>

          <div class="flex flex-col-reverse relative">
            <UButton label="see more" variant="link" color="green"
              @click="product_description = !product_description" />
            <div v-html="formattedDecription.substring(0, 200)" class=" ">
            </div>
          </div>
          <div class="flex flex-row gap-3 flew-wrap text-sm text-gray-400">
            <span><i class="bi bi-tag mr-1"></i>{{ product.category }}</span>
            <!-- <span v-if="product?.shop"><i class="bi bi-geo-alt mr-1"></i>{{ product?.shop?.profile?.location?.address }}, {{  product?.shop?.profile?.location?.state }}</span> -->
            <span><i class="bi bi-eye mr-1"></i>{{ product.views }} views</span>
          </div>
        </div>
        <div class="mt-3 flex flex-col gap-2">


          <UButton v-if="product.shop.accept_payments" 
          block
            :disabled="checking_out"
            :loading="checking_out"
            color="blue"
            :icon="checking_out ? 'svg-spinners:6-dots-scale-middle' : 'hugeicons:payment-success-01'"
            class="bg-blue-500 hover:bg-opacity-90 text-white w-full rounded-lg p-3 text-lg font-semibold"
            @click="user ? checkoutProduct() : (no_auth_like = !no_auth_like)">Buy this item</UButton>


          <button v-else class="bg-app_green hover:bg-opacity-90 text-white w-full rounded-lg p-3 text-lg font-semibold"
            @click="user ? (proceed_to_buy = !proceed_to_buy) : (no_auth_like = !no_auth_like)">Message seller</button>

          <div class=" flex flex-row justify-evenly">

            <NuxtLink :to="`/shops/${product?.shop?.name}`" target="_blank" class="action_btns">
              <button class=" flex gap-3">
                <i class="bi bi-shop"></i>
                <span class="hidden md:flex">Shop</span>
              </button>
            </NuxtLink>

            <a v-if="user && product" class="action_btns border-l"
              :href="product?.shop?.owner?.phone ? `https://wa.me/${product?.shop?.owner?.phone}` : '#'"
              target="_blank">
              <button class="flex gap-3">
                <i class="bi bi-chat-square-quote"></i>
                <span class="hidden md:flex">Chat</span>
              </button>
            </a>
            <button @click="no_auth_like = true" v-else class="action_btns border-l">
              <i class="bi bi-chat-square-quote"></i>
              <span class="hidden md:flex">Chat</span>
            </button>

            <button @click="addToLikes(product?._id)" class="action_btns border-l"
              :class="isLiked ? '!text-app_green' : ''">
              <i class="bi" :class="isLiked ? 'bi-hand-thumbs-up-fill' : 'bi-hand-thumbs-up'"></i>
              <span class="hidden md:flex" v-if="isLiked">Liked</span>
              <span class="hidden md:flex" v-else>Like</span>
            </button>

            <button @click="share_modal_open = !share_modal_open" class="action_btns border-l">
              <i class="bi bi-share"></i>
              <span class="hidden md:flex">Share</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- {{ product }} -->
    <!-- SIMILAR ITEMS YOU MAY LIKE -->
    <h2 class=" font-bold mt-12">Similar items you may like</h2>
    <div class="flex flex-row overflow-x-auto mt-3 pt-5 gap-3">
      <!-- similar products: {{ similar_products }} -->
      <ProductCard v-for="(item, index) in similar_products" class=" mt-[3px] !max-w-[150px]" :hasLikedButton="false"
        :id="item._id" :product_slug="item.slug" :views="item.views" :posted="item.createdAt"
        :product_price="item.price.toLocaleString()" :shop_name="item.shop.name"
        @like-product="addProductToLikes(item._id)" :image_url="item.images[0]">
      </ProductCard>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useAsyncData, useHead } from '#imports';
import { useRequestURL } from '#app';
const buying_rules = [
  "Avoid paying in advance, even if it's delivery",
  "Meet the seller at a safe public place",
  "Inspect the item and ensure it’s exactly what you ordered",
  "Make sure that the packed item is what you’ve inspected",
  "Only pay if you’re satisfied!"
]

const proceed_to_buy = ref(false);
const product_description = ref(false);
// Get current route
const route = useRoute();
const config = useRuntimeConfig();
const shop = ref(null);
const isAllowed = ref(false);
const isLiked = ref(false);
const product_images = ref([]);
const share_modal_open = ref(false);

// full path url..
const fullUrl = ref(useRequestURL().href);
const copied = ref(false);
const copyPageLink = async () => {
  try {
    await navigator.clipboard.writeText(fullUrl.value);
    copied.value = true;
    setTimeout(() => (copied.value = false), 3000); // Hide "Copied" message after 2 sec
  } catch (err) {
    console.error("Failed to copy:", err);
  }
};

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


const checkLikes = (product_id) => {
  if (liked_products.value.includes(product_id)) {
    isLiked.value = true;
  } else {
    isLiked.value = false;
  }
};

const addToLikes = async (id) => {
  try {
    isLiked.value = !isLiked.value;
    const res = await useNuxtApp().$apiFetch(`/products/${id}/like`, {
      method: 'POST'
    });
    console.log("tried liking a product: ", res);
    isLiked.value = res.data.is_liked;
  } catch (error) {
    console.log("error liking product: ", error);
  }

};


// Fetch product data before rendering (SSR-compatible)
const { data: product } = await useAsyncData('product', async () => {
  const response = await $fetch(`${config.public.apiBase}/products/${route.params.id}`);
  shop.value = response.product.shop
  product_images.value = response.product.images;
  console.log("product: ", response.product);
  return response.product;
});

const formattedDecription = computed(() => product.value.description.replace(/\n/g, '<br>'));

const user = ref(null);
const liked_products = ref([]);
const getUserData = async () => {
  try {
    const response = await useNuxtApp().$apiFetch(`/user`);
    user.value = response.user;
    liked_products.value = response.user.liked_products;
    checkLikes(route.params.id);
  } catch (error) {
    console.log("error getting user data: ", error);
  }
};

const loading_sm_products = ref(false);
const similar_products = ref([]);
const getSimilarProducts = async () => {
  loading_sm_products.value = true;
  try {
    const response = await useNuxtApp().$apiFetch(`/products/similar/all?keyword=${product.value.name}`,);
    console.log(" all similar products: ", response);
    similar_products.value = response.products;
  } catch (error) {
    console.log("error getting similar products: ", error);
  }
  loading_sm_products.value = false;
}


const no_auth_like = ref(false);


const wa_message_text = `${window?.location?.href} ${encodeURIComponent('\n')} ${encodeURIComponent('\n')} ${encodeURIComponent('\n')} Hello ${product.value?.shop?.owner?.username}, I want to buy this product`;

const toast = useToast();
const checking_out = ref(false);
const checkoutProduct = async () => {
  try {
    checking_out.value = true;
    const res = await useNuxtApp().$apiFetch(`/products/${route.params.id}/checkout`, {
      method: 'POST',
      body: {
        email: user.value.email,
        name: user.value.name,
        phone: user.value.phone,
        delivery_info: {
          address: user.value.address,
        }
      }
    });
    console.log("checkout product: ", res);
    window.location.href = res.payment_url;
  } catch (error) {
    console.log("error checking out product: ", error);
  /*   useToast().add({
      title: 'Error',
      description: 'Failed to process checkout. Please try again.',
      color: 'red'
    }); */
    toast.add({ title: error._data.message })
  }
  checking_out.value = false;
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

const preview_image = ref(false);
const selected_image = ref(null);

const previewImage = (image) => {
  console.log('image clicked: ', image);
  selected_image.value = image;
  preview_image.value = true;
}

let index = 0;
const previousImage = () => {
  index = Number(index) - 1
  if (index > 0) {
    selected_image.value = product.value.images[index]
    console.log("viewing: ", selected_image.value)
  }
}

const nextImage = () => {
  index = Number(index) + 1
  if (index < product.value.images.length) {
    selected_image.value = product.value.images[index]
    console.log("viewing: ", selected_image.value)
  }
}



onMounted(() => {
  // get user data...
  getUserData()

  if (product.value) {
    getSimilarProducts();
  }

})
</script>


<style scoped>
.extra_img_indicator {
  background: rgb(7, 104, 184);
  background: linear-gradient(-270deg, rgba(7, 104, 184, 0) 0%, rgba(0, 0, 0, 1) 56%);
}


.action_btns {
  @apply px-5 text-center flex-1 dark:border-gray-600 flex gap-2 justify-center items-center hover:text-app_green hover:bg-opacity-10 mt-3
}

.inner {
  scroll-snap-type: y mandatory;
}

.inner {
  overflow: auto;
  /* or scroll */
  scrollbar-width: none;
  /* For Firefox */
  -ms-overflow-style: none;
  /* For Internet Explorer and Edge */
}

.inner::-webkit-scrollbar {
  display: none;
  /* For Chrome, Safari, and newer Edge */
}
</style>
<template>
    <!-- <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"> -->
    <div class="min-h-screen">
        <!-- Page Header -->
        <!-- <div class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div class="text-center">
                    <div class="flex items-center justify-center mb-4">
                        <div class="p-3 bg-red-100 dark:bg-red-900/30 rounded-full mr-4">
                            <i class="bi bi-heart-fill text-2xl text-red-500"></i>
                        </div>
                        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
                            My Liked Products
                        </h1>
                    </div>
                    <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Discover and manage all the products you've liked. Your personal collection of favorites is saved here for easy access.
                    </p>
                </div>
            </div>
        </div>
 -->
        <!-- Content Section -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <!-- PRODUCT CARD LOADER -->
            <div v-if="loading" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                <div v-for="index in 8" :key="index" class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <div class="aspect-square">
                        <USkeleton class="h-full w-full" :ui="{ background: 'dark:bg-gray-700' }" />
                    </div>
                    <div class="p-4 space-y-3">
                        <USkeleton class="h-4 w-[60%]" :ui="{ background: 'dark:bg-gray-700' }" />
                        <USkeleton class="h-4 w-full" :ui="{ background: 'dark:bg-gray-700' }" />
                        <div class="flex justify-between items-center">
                            <USkeleton class="h-4 w-16" :ui="{ background: 'dark:bg-gray-700' }" />
                            <USkeleton class="h-4 w-12" :ui="{ background: 'dark:bg-gray-700' }" />
                        </div>
                    </div>
                </div>
            </div>

            <!-- PRODUCT CARD -->
            <div v-if="!loading && products.length > 0" class="space-y-6">
                <!-- Stats Section -->
                <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-4">
                            <div class="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                                <i class="bi bi-heart-fill text-lg text-red-500"></i>
                            </div>
                            <div>
                                <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Total Liked Products</p>
                                <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ products.length }}</p>
                            </div>
                        </div>
                        <div class="text-right">
                            <p class="text-sm text-gray-500 dark:text-gray-400">Last updated</p>
                            <p class="text-sm font-medium text-gray-900 dark:text-white">{{ new Date().toLocaleDateString() }}</p>
                        </div>
                    </div>
                </div>

                <!-- Products Grid -->
                <div
                  class="masonry-grid"
                  style="column-count: 2; column-gap: 1.5rem;"
                  :style="{
                    columnCount: 
                      $screen('xl') ? 5 :
                      $screen('lg') ? 4 :
                      $screen('sm') ? 3 : 2,
                    columnGap: '1.5rem'
                  }"
                >
                  <div
                    v-for="item in products"
                    :key="item._id"
                    class="break-inside-avoid mb-6 w-full"
                  >
                    <ProductCard
                      class="w-full"
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

            <!-- IF NOT PRODUCT FOUND -->
            <div v-if="!loading && products.length == 0" class="flex flex-col justify-center items-center gap-6 py-16">
                <div class="text-center">
                    <div class="mb-6">
                        <div class="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                            <i class="bi bi-heart text-4xl text-gray-400"></i>
                        </div>
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            No Liked Products Yet
                        </h3>
                        <p class="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                            Start exploring products and like the ones you're interested in. They'll appear here for easy access.
                        </p>
                    </div>
                    <NuxtLink 
                        to="/" 
                        class="inline-flex items-center px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors duration-200"
                    >
                        <i class="bi bi-arrow-left mr-2"></i>
                        Start Exploring
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const loading = ref(false);
const products = ref([]);

const getLikedProducts = async () => {
    loading.value = true;
    try {
        const response = await useNuxtApp().$apiFetch(`/user/likes`);
        products.value = response.liked_products;
        console.log("products :", response);
    } catch (error) {
        console.log(error);
    }
    loading.value = false;
};

const user = ref(null);
const liked_products = ref([]);
const getUserDetails = async () => {
    try {
        const res = await useNuxtApp().$apiFetch(`/user`);
        user.value = res.user;
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
onMounted(() => {
    getLikedProducts();
    getUserDetails();
});
</script>

<style lang="scss" scoped></style>

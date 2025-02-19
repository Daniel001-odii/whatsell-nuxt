<template>
    <div class="">
        


        <!-- {{ products }} -->
        <!-- PRODUCT CARD LOADER -->
        <div v-if="loading" class=" flex flex-wrap gap-3">
            <div v-for="index in 8" class=" rounded-md flex flex-col gap-2 flex-1 min-w-[160px] h-[220px]">
                <USkeleton class="h-full w-full" :ui="{ background: 'dark:bg-gray-700' }" />
                <div class=" flex flex-col gap-3">
                    <USkeleton class="h-4 w-[50px]" :ui="{ background: 'dark:bg-gray-700' }" />
                    <USkeleton class="h-4 w-full" :ui="{ background: 'dark:bg-gray-700' }" />
                    <USkeleton class="h-4 w-8" :ui="{ background: 'dark:bg-gray-700' }" />
                </div>
            </div>
        </div>

        <!-- PRODUCT CARD -->
        <div v-if="!loading && products && products.length > 0">
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
                :product_price="item.price.toLocaleString()"
                :image_url="item.images[0]"
                :views="item.views"
                :product_slug="item.slug"
                :is_liked="checkLikes(item._id)"
                />
            </template>
            </MasonryWall>      
        </div>

        <!-- IF NOT PRODUCT FOUND -->
        <div v-else class=" flex flex-col justify-center items-center gap-3 mt-12 text-gray-600">
            <i class=" bi bi-box2 text-6xl"></i>
            <span>No Liked Product yet</span>
        </div>
           
    
    </div>
</template>

<script setup>
const loading = ref(false);
const products = ref([]);


// const res = await $axios(`${useRuntimeConfig().public.apiBase}/user`);

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

const checkLikes = (product_id) => {
    if(liked_products.value.includes(product_id)){
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

<style lang="scss" scoped>

</style>
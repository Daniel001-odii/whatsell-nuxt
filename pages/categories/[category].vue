<template>
    <div>
        <div class=" h-[200px] bg-app_green category relative flex justify-center items-center !bg-no-repeat bg-top !bg-cover"
            :style="header_image ? `background: url('${header_image}')` : ''">
            <h1 class=" text-3xl uppercase font-bold text-white z-10">{{ route.params.category }}</h1>
            <div class=" absolute h-full w-full bg-black bg-opacity-40 top-0"></div>
        </div>


        <div v-if="loading" class=" mt-12 flex flex-wrap gap-3">
            <!-- dummy product card -->
            <div v-for="card in 10"
                class=" flex-1 md:flex-0 min-w-[150px] w-[150px] h-[200px] flex flex-col gap-2 p-1 bg-gray-500 bg-opacity-20 rounded-md">
                <USkeleton class="w-full h-[50%]" :ui="{ background: 'dark:bg-gray-700' }" />
                <USkeleton class="w-[80%] h-[10px]" :ui="{ background: 'dark:bg-gray-700' }" />
                <USkeleton class="w-full h-[20px]" :ui="{ background: 'dark:bg-gray-700' }" />
                <USkeleton class="w-[70%] h-[10px]" :ui="{ background: 'dark:bg-gray-700' }" />
            </div>
        </div>
        <div v-if="!loading && products" class=" flex flex-row flex-wrap gap-3">
            <MasonryWall :items="products" :ssr-columns="1" :column-width="130" :gap="10">
                <template #default="{ item, index }">
                    <ProductCard class=" mt-[15px]" :has-liked-button="true" :id="item._id"
                        :product_price="(item.price).toLocaleString()" :image_url="item.images[0]" :views="item.views"
                        :is_liked="checkLikes(item._id)" :product_slug="item.slug" />
                </template>
            </MasonryWall>
        </div>

        <div class= " flex flex-col justify-center items-center text-xl text-center mt-24">
            <img src="../../assets/images/went_wrong.png" alt="no items" class=" h-[220px] mb-3"/>
            <span class=" font-bold"> No Items in this category yet</span>
            <small>checkout <NuxtLink to="/" class=" text-underline text-blue-500">other categories</NuxtLink></small>
        </div>

    </div>
</template>

<script setup>
import { useRoute, useAsyncData, useHead } from '#imports';
const route = useRoute();
const items = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const loading = ref(true);


const header_image = ref('');
const products = ref(null);

const getProductsByCategory = async () => {
    loading.value = false;
    try {
        const res = await useNuxtApp().$apiFetch(`/products/products_by_category/${route.params.category}`)
        console.log('products: ', res);
        header_image.value = res.header_image;
        products.value = res.data;
    } catch (err) {
        console.log('err getting products: , ', err)
    }
    loading.value = false;
}

getProductsByCategory();


const checkLikes = (product_id) => {
    if(liked_products.value.includes(product_id)){
        return true;
    } else {
        return false;
    }
};

const user = ref(null);
const credits = ref(0);
const liked_products = ref([]);
const getUserDetails = async()=> {
    try {
        const res = await useNuxtApp().$apiFetch(`/user`);
        user.value = res.user;
        credits.value = res.credits;
        liked_products.value = res.user.liked_products;
        console.log('user: ', res)
    } catch (error) {
        console.log(error);
    }
}
getUserDetails();

</script>

<style scoped></style>
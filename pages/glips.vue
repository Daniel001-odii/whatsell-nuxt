<template>
    <!-- <div v-if="glip_preview_modal" class=" relative"> -->
    <div class=" relative">

        <ReelsContainer :glips="currrent_glip" :is-open="glip_preview_modal" @close="glip_preview_modal = false" />
    </div>

    <!-- <div> -->
    <h1>From Shops youre following</h1>
    <div class=" flex overflow-x-auto py-3 gap-3">

        <!-- GLIP CARDS -->
        <!-- CREATE NEW GLIP -->
        <div
            class="min-w-[130px]  w-[130px] h-[200px] flex justify-center items-center rounded-lg bg-gray-500 bg-opacity-20">
            <div class=" size-14 rounded-full bg-green-500 flex justify-center items-center">
                <i class="bi bi-plus"></i>
            </div>
        </div>


        <!-- GLIPS LIST -->
        <div v-for="item in grouped_glips" @click="openGlipPreview(item)"
            :Style="`background-image: url(${item?.shop?.profile?.image_url})`"
            class=" bg-center bg-no-repeat bg-cover overflow-hidden relative min-w-[130px] w-[130px] h-[200px] flex justify-center items-center rounded-lg bg-gray-500 ">
            <div class=" h-full w-full bg-black bg-opacity-50"></div>
            <div class=" size-14 rounded-full bg-green-500 overflow-hidden absolute border-4 border-app_green">
                <img :src="item?.shop?.profile?.image_url" />
            </div>
            <div class=" absolute bottom-5 text-sm">{{ item?.shop?.name }}</div>
        </div>
    </div>

    <h2 class=" font-bold text-lg mt-12">Best deals for you today</h2>
    <div class=" flex flex-wrap mt-4 gap-1">
        <div v-for="item in glips"
            class=" flex flex-col rounded-md p-3 justify-end items-end  h-[200px] bg-gray-500 bg-opacity-20 w-fit">
            <div class=" flex flex-col">
                <span>{{ }}</span>
                <span>NGN Product Price</span>
                <small>location...</small>
            </div>
        </div>
    </div>
    <!-- </div> -->
    <!-- </div> -->
    <!--  <div class=" flex flex-wrap gap-3">
        <GlipCard class=" w-[200px] flex-1"
        v-for="product in glips"
        :has-liked-button="false"
        :product_slug="product.slug"
        />
    </div> -->
</template>

<script setup>
const currrent_glip = ref(null);
const user = ref(null);
const credits = ref(0);
const liked_glips = ref([]);
const getUserDetails = async () => {
    try {
        const res = await useNuxtApp().$apiFetch(`/user`);
        user.value = res.user;
        credits.value = res.credits;
        liked_glips.value = res.user.liked_glips;
        console.log('user: ', res)
    } catch (error) {
        console.log(error);
    }
}

const checkLikes = (product_id) => {
    if (liked_glips.value.includes(product_id)) {
        return true;
    } else {
        return false;
    }
};

const glips = ref([])
const getglips = async () => {
    try {
        const res = await useNuxtApp().$apiFetch('/shops/glips/all');
        glips.value = res.glips;
        console.log('got glips: ', res)
    } catch (err) {
        console.log('err getting glisp: ', err);
    }
}
getglips();

const grouped_glips = ref([]);
const getGroupedGlips = async () => {
    try {
        const res = await useNuxtApp().$apiFetch('/products/glips/all_shops');
        grouped_glips.value = res.data;
        console.log('grouped glips: ', res.data)
    } catch (err) {
        console.log('err getting grouped glisp: ', err);
    }
}
getGroupedGlips();

const glip_preview_modal = ref(false);
const openGlipPreview = (item) => {
    currrent_glip.value = item;
    console.log("current glip: ", item)
    glip_preview_modal.value = true;

}
// http://localhost:8000/api/products/glips/all_shops

/* const videos = [
  { url: 'https://firebasestorage.googleapis.com/v0/b/test-for-mongo.appspot.com/o/product-glips%2Fsaveinsta.cc_720p-hotankara-short-gown-styles-to-watch-the-full-video-you-can-check-the-description-below.mp4?alt=media&token=ae756fc2-2d83-4b5c-962b-371d0df187c9'},
  { url: 'https://firebasestorage.googleapis.com/v0/b/test-for-mongo.appspot.com/o/product-glips%2Fsaveinsta.cc_720p-hotankara-short-gown-styles-to-watch-the-full-video-you-can-check-the-description-below.mp4?alt=media&token=ae756fc2-2d83-4b5c-962b-371d0df187c9'},
]; */
const videos = [
    'https://firebasestorage.googleapis.com/v0/b/test-for-mongo.appspot.com/o/product-glips%2Fsaveinsta.cc_720p-hotankara-short-gown-styles-to-watch-the-full-video-you-can-check-the-description-below.mp4?alt=media&token=ae756fc2-2d83-4b5c-962b-371d0df187c9',
    /* 'https://firebasestorage.googleapis.com/v0/b/test-for-mongo.appspot.com/o/product-glips%2Fsaveinsta.cc_720p-hotankara-short-gown-styles-to-watch-the-full-video-you-can-check-the-description-below.mp4?alt=media&token=ae756fc2-2d83-4b5c-962b-371d0df187c9',
    'https://firebasestorage.googleapis.com/v0/b/test-for-mongo.appspot.com/o/product-glips%2Fsaveinsta.cc_720p-hotankara-short-gown-styles-to-watch-the-full-video-you-can-check-the-description-below.mp4?alt=media&token=ae756fc2-2d83-4b5c-962b-371d0df187c9',
    'https://firebasestorage.googleapis.com/v0/b/test-for-mongo.appspot.com/o/product-glips%2Fsaveinsta.cc_720p-hotankara-short-gown-styles-to-watch-the-full-video-you-can-check-the-description-below.mp4?alt=media&token=ae756fc2-2d83-4b5c-962b-371d0df187c9', */
];

const glips_modal = ref(true);
</script>

<style scoped>
/* @apply h-[95vh] overflow-y-auto fixed z-[9] top-[0] left-1/2 -translate-x-1/2  w-full md:w-fit */
</style>
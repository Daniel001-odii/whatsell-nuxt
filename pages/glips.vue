<template>
   <!-- TEST COMPONENT STARTS HERE -->
<!-- GROK - WORKS!   -->
<div class="reels-container">
    <GlipComponent
      v-for="(video, index) in videos"
      :key="index"
      :video-src="video"
    />
  </div>

  <!-- <GlipComponent :videos="videos"/> -->
<!-- TEST COMPONENT ENDS HERE -->

    <!-- <div> -->
        <h1>From Shops youre following</h1>
        <div class=" flex overflow-x-auto p-3 gap-3">

            <!-- GLIP CARD -->
           <!--   <div class="min-w-[130px]  w-[130px] h-[200px] flex justify-center items-center rounded-lg bg-gray-500 bg-opacity-20">
                <div class=" size-14 rounded-full bg-green-500 flex justify-center items-center">
                    <i class="bi bi-plus"></i>
                </div>
             </div>
             <div v-for="item in products.length" class=" min-w-[130px] w-[130px] h-[200px] flex justify-center items-center rounded-lg bg-gray-500 bg-opacity-20">
                <div class=" size-14 rounded-full bg-green-500"></div>
             </div> -->
        </div>

        <h2 class=" font-bold text-lg mt-12">Best deals for you today</h2>
        <div class=" flex flex-wrap mt-4 gap-1">

          <!--   <div v-for="item in products" class=" flex flex-col rounded-md p-3 justify-end items-end  h-[200px] bg-gray-500 bg-opacity-20 w-fit">
                <div class=" flex flex-col">
                    <span>Product name</span>
                    <span>NGN Product Price</span>
                    <small>location...</small>
                </div>
            </div> -->
        </div>
    <!-- </div> -->
<!-- </div> -->
   <!--  <div class=" flex flex-wrap gap-3">
        <GlipCard class=" w-[200px] flex-1"
        v-for="product in products"
        :has-liked-button="false"
        :product_slug="product.slug"
        />
    </div> -->
</template>

<script setup>
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

const checkLikes = (product_id) => {
    if(liked_products.value.includes(product_id)){
        return true;
    } else {
        return false;
    }
};

const products = ref([])
const getProducts = async()=>{
    try{
        const res = await useNuxtApp().$apiFetch('/products');
        products.value = res.products; 
        console.log('got products: ', res)
    }catch(err){
        console.log('err getting glisp: ', err);
    }
}
getProducts();

/* const videos = [
  { url: 'https://firebasestorage.googleapis.com/v0/b/test-for-mongo.appspot.com/o/product-glips%2Fsaveinsta.cc_720p-hotankara-short-gown-styles-to-watch-the-full-video-you-can-check-the-description-below.mp4?alt=media&token=ae756fc2-2d83-4b5c-962b-371d0df187c9'},
  { url: 'https://firebasestorage.googleapis.com/v0/b/test-for-mongo.appspot.com/o/product-glips%2Fsaveinsta.cc_720p-hotankara-short-gown-styles-to-watch-the-full-video-you-can-check-the-description-below.mp4?alt=media&token=ae756fc2-2d83-4b5c-962b-371d0df187c9'},
]; */
const videos = [
   'https://firebasestorage.googleapis.com/v0/b/test-for-mongo.appspot.com/o/product-glips%2Fsaveinsta.cc_720p-hotankara-short-gown-styles-to-watch-the-full-video-you-can-check-the-description-below.mp4?alt=media&token=ae756fc2-2d83-4b5c-962b-371d0df187c9',
   'https://firebasestorage.googleapis.com/v0/b/test-for-mongo.appspot.com/o/product-glips%2Fsaveinsta.cc_720p-hotankara-short-gown-styles-to-watch-the-full-video-you-can-check-the-description-below.mp4?alt=media&token=ae756fc2-2d83-4b5c-962b-371d0df187c9',
   'https://firebasestorage.googleapis.com/v0/b/test-for-mongo.appspot.com/o/product-glips%2Fsaveinsta.cc_720p-hotankara-short-gown-styles-to-watch-the-full-video-you-can-check-the-description-below.mp4?alt=media&token=ae756fc2-2d83-4b5c-962b-371d0df187c9',
   'https://firebasestorage.googleapis.com/v0/b/test-for-mongo.appspot.com/o/product-glips%2Fsaveinsta.cc_720p-hotankara-short-gown-styles-to-watch-the-full-video-you-can-check-the-description-below.mp4?alt=media&token=ae756fc2-2d83-4b5c-962b-371d0df187c9',
];
// https://firebasestorage.googleapis.com/v0/b/test-for-mongo.appspot.com/product-glips/saveinsta.cc_720p-short-ankara-dresses-for-every-occasion-ankarastyles2023-africanclothing-dress-youtubeshorts.mp4
/* const { data: products, error: products_error } = await useAsyncData('products', async () => {
  const response = await $fetch(`${config.public.apiBase}/products`)
  return response.products // Extracting the nested products array
}) */
</script>

<style scoped>
.reels-container {
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  position: fixed;
  z-index: 999999;
  top: 0px;
}

</style>
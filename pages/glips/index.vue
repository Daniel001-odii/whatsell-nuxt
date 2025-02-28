<template>
    <!-- <div v-if="glip_preview_modal" class=" relative"> -->
    <div class=" relative">

        <ReelsContainer :glips="currrent_glip" :is-open="glip_preview_modal" @close="glip_preview_modal = false" />
    </div>

    <!-- {{ currrent_glip?.glips[0]?._id }} -->
    <!-- <div> -->
    <h1 class=" font-bold text-lg">From Shops youre following</h1>
    <div class=" flex overflow-x-auto py-3 gap-3">

        <!-- GLIP CARDS -->
        <!-- CREATE NEW GLIP -->
        <div
            class="relative min-w-[130px]  w-[130px] h-[200px] flex justify-center items-center rounded-lg bg-gray-500 bg-opacity-20">
            <button @click="useRouter().push('/sell?type=glips')" class=" size-14 rounded-full bg-green-500 flex justify-center items-center text-white">
                <i class="bi bi-plus text-3xl"></i>
            </button>
            <span class=" text-sm text-white absolute bottom-5">New glip</span>
        </div>

        <!-- @click="openGlipPreview(item)" -->
        <!-- GLIPS LIST -->
        <div v-if="user && user.account_type == 'seller'" v-for="item in grouped_glips" 
       
        @click="useRouter().push(`/glips/${item?.glips[0]?._id}`)"
            :style="`background-image: url(${item?.shop?.profile?.image_url})`"
            class=" bg-center bg-no-repeat bg-cover overflow-hidden relative min-w-[130px] w-[130px] h-[200px] flex justify-center items-center rounded-lg bg-gray-500 ">
            <div class=" h-full w-full bg-black bg-opacity-50"></div>
            <div class=" size-14 rounded-full bg-green-500 overflow-hidden absolute border-4 border-app_green">
                <img :src="item?.shop?.profile?.image_url" />
            </div>
            <div class=" absolute bottom-5 text-sm">{{ item?.shop?.name }}</div>
        </div>
    </div>

    <h2 class=" font-bold text-lg mt-12">Deals from other shops</h2>
    <div class=" flex flex-wrap mt-4 gap-1">
        <div v-for="item in glips" 
         @click="useRouter().push(`/glips/${item?.glips[0]?._id}`)"
            :Style="`background-image: url(${item?.shop?.profile?.image_url})`"
            class=" bg-center bg-no-repeat bg-cover overflow-hidden relative flex-1 md:flex-0 md:max-w-[130px] w-[130px] h-[200px] flex justify-center items-center rounded-lg bg-gray-500 ">
            <div class=" h-full w-full bg-black bg-opacity-50"></div>
            <div class=" size-14 rounded-full bg-green-500 overflow-hidden absolute border-4 border-app_green">
                <img :src="item?.shop?.profile?.image_url" />
            </div>
            <div class=" absolute bottom-5 text-sm">{{ item?.shop?.name }}</div>
        </div>
        <!-- <div v-for="item in glips"
            class=" relative flex-1 md:flex-0 md:max-w-[130px] w-[130px] flex flex-col rounded-md p-3 justify-end items-start h-[200px] bg-gray-500 bg-opacity-20">
            <div class=" flex flex-col absolute">
                <span>{{ item?.name}}</span>
                <span class=" font-bold">NGN {{ item.price?.toLocaleString() }}</span>
                <small>{{ item?.shop?.profile?.location?.state }}</small>
            </div>
            <video :src="item?.video_url" class=" !w-full !h-full"></video>
        </div> -->
    </div>
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
getUserDetails();

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
        const res = await useNuxtApp().$apiFetch('/products/glips/all_shops');
        glips.value = res.data;
        console.log('got glips: ', res)
    } catch (err) {
        console.log('err getting glisp: ', err);
    }
}
getglips();

const grouped_glips = ref([]);
const geGlipsFromFollowedShops = async () => {
    try {
        // const res = await useNuxtApp().$apiFetch('/products/glips/all_shops');
        const res = await useNuxtApp().$apiFetch('/products/glips/followed_shops/all_glips');
        grouped_glips.value = res.data;
        console.log('grouped glips: ', res.data)
    } catch (err) {
        console.log('err getting grouped glisp: ', err);
    }
}
geGlipsFromFollowedShops();

const glip_preview_modal = ref(false);
const openGlipPreview = (item) => {
    currrent_glip.value = item;
    console.log("current glip: ", item)
    // glip_preview_modal.value = true;

}

const glips_modal = ref(true);



const getGlipById = async(glip_id)=> {
    try{
        const res = await useNuxtApp().$apiFetch(`/products/glips/details/${glip_id}`);
        console.log('got a glip detail: ', res);
        const item ={
            glips: res.result
        };
        currrent_glip.value = item;
        glip_preview_modal.value = true;
        
    }catch(err){
        console.log('err getting glip detail: ', err);
    }
}


onMounted(()=>{
    const glip_id_in_route = useRoute().query.id
    if(glip_id_in_route){
        getGlipById(glip_id_in_route);
    }
})
</script>

<style scoped>
/* @apply h-[95vh] overflow-y-auto fixed z-[9] top-[0] left-1/2 -translate-x-1/2  w-full md:w-fit */
</style>
<template>
    <div class=" flex flex-col">
        <div v-if="loading_user" class= " flex gap-3 p-3 rounded-md h-[150px] mt-12">
            <USkeleton class="min-w-[150px] h-full md:w-[200px] md:h-[120px]" :ui="{ background: 'dark:bg-gray-700' }" />
            <div class=" flex flex-col gap-3">
                <USkeleton class="w-[200px] h-[20px]" :ui="{ background: 'dark:bg-gray-700' }" />
                <USkeleton class="w-[100px] h-[20px]" :ui="{ background: 'dark:bg-gray-700' }" />
                <USkeleton class="w-[80px] h-[20px]" :ui="{ background: 'dark:bg-gray-700' }" />
            </div>
        </div>

        <!-- SHOP PREVIEW IF USER IS SELLER -->
        <div v-if="!loading_user && user && shop" class=" flex flex-col">
            <h2 class=" font-bold mt-12">Your Shop</h2>
            <div class= "h-[150px] flex gap-3 p-3 border dark:border-gray-600 rounded-md mt-3 hover:border-green-500">
                <NuxtLink :to="`/shops/${shop.name}`">
                    <div 
                    :style="`background: url(${shop?.profile?.image_url});`"
                    style="background-position: center; background-size: cover; background-repeat: no-repeat;"
                    class=" h-full w-[150px] md:w-[200px] rounded-md bg-gray-600 border dark:border-gray-600">
                        <!-- <img :src="shop?.profile?.image_url" alt="shop image"/> -->
                    </div>
                </NuxtLink>
                <div class=" flex flex-col">
                    <NuxtLink :to="`/shops/${shop.name}`" class=" font-bold text-xl capitalize">{{ shop.name }}</NuxtLink>
                    <span>{{ shop.category }}</span>
                    <small>joined: {{ shop.createdAt }}</small>
                </div>
            </div>
        </div>


        <!-- SHOPS NEAR YOU -->
        <h2 class=" font-bold mt-12">Shops near you</h2>
        <!-- -{{ followed_shops }} -->
        <div v-if="loading_followed_shops" class=" flex flex-row gap-3 mt-3  overflow-x-auto py-5">
            <USkeleton  class=" size-[280px]" :ui="{ background: 'dark:bg-gray-700' }" />
            <USkeleton  class=" size-[280px]" :ui="{ background: 'dark:bg-gray-700' }" />
            <USkeleton  class=" size-[280px]" :ui="{ background: 'dark:bg-gray-700' }" />
        </div>
        <div v-else class=" flex flex-row gap-3 mt-3  overflow-x-auto py-5">
            <ShopCard 
            v-for="shop in followed_shops"
            :header_image="shop.headerImage"
            :name="shop.name"
            :category="shop.category"
            :image_url="shop?.profile?.image_url"
            :location="shop?.profile?.location"
            />
            <div v-if="followed_shops.length === 0" class=" p-12 flex flex-col items-center justify-center w-full gap-3">
                <i class="bi bi-exclamation-circle text-4xl"></i>
                <span>Not available at this time</span>
            </div>
        </div>


        
        <!-- SHOPS YOU FOLLOW -->
        <h2 class=" font-bold mt-12">Shops you follow</h2>
        <div v-if="loading_followed_shops" class=" flex flex-row gap-3 mt-3  overflow-x-auto py-5">
            <USkeleton  class=" size-[280px]" :ui="{ background: 'dark:bg-gray-700' }" />
            <USkeleton  class=" size-[280px]" :ui="{ background: 'dark:bg-gray-700' }" />
            <USkeleton  class=" size-[280px]" :ui="{ background: 'dark:bg-gray-700' }" />
        </div>
        <div v-else class=" flex flex-row gap-3 mt-3  overflow-x-auto">
            <ShopCard
            v-for="shop in followed_shops"
            :name="shop.name"
            :category="shop.category"
            :image_url="shop?.profile?.image_url"
            :location="shop?.profile?.location"
            />

            <div v-if="followed_shops.length === 0" class=" p-12 flex flex-col items-center justify-center w-full gap-3">
                <i class="bi bi-exclamation-circle text-4xl"></i>
                <span>youre not following any shops yet</span>
            </div>
        </div>


        

        <!-- BOOSTED SHOPS -->
        <h2 class=" font-bold mt-12">Boosted shops</h2>
        <div v-if="loading_boosted_shops" class=" flex flex-row gap-3 mt-3  overflow-x-auto py-5">
            <USkeleton  class=" size-[280px]" :ui="{ background: 'dark:bg-gray-700' }" />
            <USkeleton  class=" size-[280px]" :ui="{ background: 'dark:bg-gray-700' }" />
            <USkeleton  class=" size-[280px]" :ui="{ background: 'dark:bg-gray-700' }" />
        </div>
        <div v-else class=" flex flex-wrap gap-3 mt-3">
            <BoostedShopCard
            v-for="shop in boosted_shops"
            :name="shop.name"
            :category="shop.category"
            :image_url="shop?.profile?.image_url"
            />
            <div v-if="boosted_shops.length == 0" class="p-5 py-8 text-center w-full bg-[#00c1f618] rounded-lg text-xl text-[#00C1F6]">There are limited slots available,<br/> be the first to take an available slot. <br/> 
                <NuxtLink v-if="user && user?.shop" :to="`/account/shop`">
                    <button class="rounded-full bg-[#00C1F6] text-white p-3 px-6 mt-6 font-bold">Boost Your Shop Now! <i class="bi bi-rocket-fill ml-3"></i></button>
                </NuxtLink>

                <NuxtLink v-else to="/account/shop">
                    <button class="rounded-full bg-black text-white p-3 px-6 mt-6 font-bold">Create Your shop</button>
                </NuxtLink>
            </div>
        </div>

        <!-- BEST SELLING -->
        <h2 class=" font-bold mt-12">All shops</h2>
        <!-- {{ all_shops }} -->
        <div class=" flex flex-row gap-3 mt-3 overflow-x-auto py-5">
            <ShopCard
            v-for="shop in all_shops"
            :name="shop.name"
            :header_image="shop.headerImage"
            :category="shop.category"
            :image_url="shop?.profile?.image_url"
            :location="shop?.profile?.location"
            />
            <div v-if="all_shops.length === 0" class=" p-12 flex flex-col items-center justify-center w-full gap-3">
                <i class="bi bi-exclamation-circle text-4xl"></i>
                <span>No shops available</span>
            </div>
        </div>
    </div>
</template>

<script setup>

const user = ref(null);
const shop = ref(null);

const loading_user = ref(false);
const getUserDetails = async()=> {
    loading_user.value = true;
    try {
        const res = await useNuxtApp().$apiFetch(`/user`);
        user.value = res.user;
        shop.value = res?.user?.shop;
        console.log('user from shops page: ', res)
    } catch (error) {
        console.log(error);
    }
    loading_user.value = false;
}

const followed_shops = ref([]);
const loading_followed_shops = ref(false);
const getFollowedShops = async()=> {
    loading_followed_shops.value = true;
    try{
        const res = await useNuxtApp().$apiFetch('/shops/followed/all');
        console.log("followed shops: ", res);
        followed_shops.value = res.followed_shops;
    }catch(err){
        console.log("error getting followed shops: ", err);
    }
    loading_followed_shops.value = false;
}
getFollowedShops();

const all_shops = ref([]);
const getAllShops = async()=>{
    try{
        const res = await useNuxtApp().$apiFetch('/shops/list/all');
        all_shops.value = res.shops;
        console.log("all shops: ", res.shops);
    }catch(err){
        console.log("error getting all shops: ", err)
    }
}
getAllShops();

const loading_boosted_shops = ref(false);
const boosted_shops = ref([]);
const getBoostedShops = async()=>{
    loading_boosted_shops.value = true
    try{
        const res = await useNuxtApp().$apiFetch('/shops/boosted/all');
        boosted_shops.value = res.shops;
        console.log("boosted shops: ", res);
    }catch(err){
        console.log("err getting boosted shops: ", err);
    }
    loading_boosted_shops.value = false
}
getBoostedShops();


onMounted(()=>{
    getUserDetails();
})

</script>

<style lang="scss" scoped>

</style>
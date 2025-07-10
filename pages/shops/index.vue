<template>
    <div class=" flex flex-col">
        <div v-if="loading_user" class=" flex gap-3 p-3 rounded-md h-[150px] mt-12">
            <USkeleton class="min-w-[150px] h-full md:w-[200px] md:h-[120px]"
                :ui="{ background: 'dark:bg-gray-700' }" />
            <div class=" flex flex-col gap-3">
                <USkeleton class="w-[200px] h-[20px]" :ui="{ background: 'dark:bg-gray-700' }" />
                <USkeleton class="w-[100px] h-[20px]" :ui="{ background: 'dark:bg-gray-700' }" />
                <USkeleton class="w-[80px] h-[20px]" :ui="{ background: 'dark:bg-gray-700' }" />
            </div>
        </div>

        <!-- SHOP PREVIEW IF USER IS SELLER -->
        <div v-if="!loading_user && user && shop" class="flex flex-col">
            <h2 class="font-bold mt-12 mb-4 text-2xl flex items-center gap-2">
                Your Shop
            </h2>
            <div class="flex flex-col md:flex-row gap-5 p-5 border dark:border-gray-600 rounded-xl mt-3 bg-white dark:bg-gray-900 shadow hover:shadow-lg transition-shadow duration-200">
                <!-- Shop Image -->
                <NuxtLink :to="`/shops/${shop.name}`" class="flex-shrink-0">
                    <div
                        :style="`background: url(${shop?.profile?.image_url}); background-position: center; background-size: cover; background-repeat: no-repeat;`"
                        class="h-[120px] w-[120px] md:h-[150px] md:w-[150px] rounded-full border-4 border-green-500 shadow-md flex items-center justify-center overflow-hidden bg-gray-200 dark:bg-gray-700"
                    >
                        <i v-if="!shop?.profile?.image_url" class="bi bi-shop text-5xl text-green-400"></i>
                    </div>
                </NuxtLink>
                <!-- Shop Info -->
                <div class="flex flex-col justify-center flex-1 gap-2">
                    <div class="flex items-center gap-2">
                        <NuxtLink :to="`/shops/${shop.name}`" class="font-bold text-2xl capitalize hover:underline">
                            {{ shop.name }}
                        </NuxtLink>
                        <span class="ml-2 px-2 py-1 bg-green-100 text-green-700 rounded text-xs uppercase tracking-wide">
                            {{ shop.category }}
                        </span>
                    </div>
                    <div class="flex items-center gap-3 mt-1">
                        <i class="bi bi-calendar-event text-gray-400"></i>
                        <small class="text-gray-500">Joined: {{ shop.createdAt.split("T")[0] }}</small>
                    </div>
                    <div class="flex items-center gap-3 mt-2">
                        <NuxtLink :to="`/shops/${shop.name}`" class="text-blue-500 hover:underline text-sm flex items-center gap-1">
                            <i class="bi bi-box-arrow-up-right"></i> Visit Shop
                        </NuxtLink>
                        <NuxtLink to="/account/shop" class="text-gray-500 hover:text-green-600 text-sm flex items-center gap-1">
                            <i class="bi bi-pencil-square"></i> Edit Shop
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>


        <!-- SHOPS NEAR YOU -->
        <h2 class=" font-bold mt-12">Shops near you</h2>
        <!-- -{{ followed_shops }} -->
        <div v-if="loading_followed_shops" class=" flex flex-row gap-3 mt-3  overflow-x-auto py-5">
            <USkeleton class=" size-[280px]" :ui="{ background: 'dark:bg-gray-700' }" />
            <USkeleton class=" size-[280px]" :ui="{ background: 'dark:bg-gray-700' }" />
            <USkeleton class=" size-[280px]" :ui="{ background: 'dark:bg-gray-700' }" />
        </div>
        <div v-else class=" flex flex-row gap-3 mt-3  overflow-x-auto py-5">
            <ShopCard v-for="shop in followed_shops" :header_image="shop.headerImage" :name="shop.name"
                :category="shop.category" :image_url="shop?.profile?.image_url" :location="shop?.profile?.location" />
            <div v-if="followed_shops.length === 0"
                class=" p-12 flex flex-col items-center justify-center w-full gap-3">
                <i class="bi bi-exclamation-circle text-4xl"></i>
                <span>Not available at this time</span>
            </div>
        </div>



        <!-- SHOPS YOU FOLLOW -->
        <h2 class=" font-bold mt-12">Shops you follow</h2>
        <div v-if="loading_followed_shops" class=" flex flex-row gap-3 mt-3  overflow-x-auto py-5">
            <USkeleton class=" size-[280px]" :ui="{ background: 'dark:bg-gray-700' }" />
            <USkeleton class=" size-[280px]" :ui="{ background: 'dark:bg-gray-700' }" />
            <USkeleton class=" size-[280px]" :ui="{ background: 'dark:bg-gray-700' }" />
        </div>
        <div v-else class=" flex flex-row gap-3 mt-3  overflow-x-auto">
            <ShopCard v-for="shop in followed_shops" :name="shop.name" :category="shop.category"
                :image_url="shop?.profile?.image_url" :location="shop?.profile?.location" />

            <div v-if="followed_shops.length === 0 && user"
                class=" p-12 flex flex-col items-center justify-center w-full gap-3">
                <i class="bi bi-exclamation-circle text-4xl"></i>
                <span>youre not following any shops yet</span>
            </div>
            <div v-if="!user" class=" p-12 flex flex-col items-center justify-center w-full gap-3">
                <i class="bi bi-exclamation-circle text-4xl"></i>
                <span>Please 
                    <RouterLink to="/login" class="underline text-blue-500">login</RouterLink> to view shops youre following</span>
            </div>
        </div>




        <!-- Premium Sellers -->
        <h2 class=" font-bold mt-12">Premium Sellers</h2>
        <div v-if="loading_boosted_shops" class=" flex flex-row gap-3 mt-3  overflow-x-auto py-5">
            <USkeleton class=" size-[280px]" :ui="{ background: 'dark:bg-gray-700' }" />
            <USkeleton class=" size-[280px]" :ui="{ background: 'dark:bg-gray-700' }" />
            <USkeleton class=" size-[280px]" :ui="{ background: 'dark:bg-gray-700' }" />
        </div>
        <div v-else class=" flex flex-wrap gap-3 mt-3">
            <BoostedShopCard v-for="shop in boosted_shops" :name="shop.name" :category="shop.category"
                :image_url="shop?.profile?.image_url" />
            <div v-if="boosted_shops.length == 0"
                class="p-5 py-8 text-center w-full bg-[#00c1f618] rounded-lg text-xl text-[#00C1F6]">There are limited
                slots available,<br /> be the first to take an available slot. <br />
                <NuxtLink v-if="user && user?.shop" :to="`/account/shop`">
                    <button class="rounded-full bg-[#00C1F6] text-white p-3 px-6 mt-6 font-bold">Boost Your Shop Now! <i
                            class="bi bi-rocket-fill ml-3"></i></button>
                </NuxtLink>

                <NuxtLink v-else to="/account/shop">
                    <button class="rounded-full bg-black text-white p-3 px-6 mt-6 font-bold">Create Your shop</button>
                </NuxtLink>
            </div>
        </div>

        <!-- BEST SELLING -->
        <h2 class=" font-bold mt-12">All shops</h2>
        <!-- {{ all_shops }} -->
        <div class=" flex flex-row flex-wrap gap-3 mt-3 py-5">
            <ShopCard v-for="shop in all_shops" :name="shop.name" :header_image="shop.headerImage"
                :category="shop.category" :image_url="shop?.profile?.image_url" :location="shop?.profile?.location" />
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
const getUserDetails = async () => {
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
const getFollowedShops = async () => {
    loading_followed_shops.value = true;
    try {
        const res = await useNuxtApp().$apiFetch('/shops/followed_shops/all');
        console.log("followed shops: ", res);
        followed_shops.value = res.followed_shops;
    } catch (err) {
        console.log("error getting followed shops: ", err);
    }
    loading_followed_shops.value = false;
}
getFollowedShops();

const all_shops = ref([]);
const getAllShops = async () => {
    try {
        const res = await useNuxtApp().$apiFetch('/shops/list/all');
        all_shops.value = res.shops.reverse();
        console.log("all shops: ", res.shops);
    } catch (err) {
        console.log("error getting all shops: ", err)
    }
}
getAllShops();

const loading_boosted_shops = ref(false);
const boosted_shops = ref([]);
const getBoostedShops = async () => {
    loading_boosted_shops.value = true
    try {
        const res = await useNuxtApp().$apiFetch('/shops/boosted/all');
        boosted_shops.value = res.shops;
        console.log("Premium Sellers: ", res);
    } catch (err) {
        console.log("err getting Premium Sellers: ", err);
    }
    loading_boosted_shops.value = false
}
getBoostedShops();

const getting_nearby_shops = ref(false);
const shops_near_me = ref([]);
const location_error = ref('');
const state = ref('')

const getShopsNearMe = async (current_state) => {
    getting_nearby_shops.value = true
    try {
        const response = await useNuxtApp().$apiFetch(`/shops/near_me/${current_state}/all`);
        shops_near_me.value = response.nearby_stores;
        console.log("shops near me: ", response);
    } catch (error) {
        console.log("error getting nearby states: ", error);
    }
    getting_nearby_shops.value = false
}

const getLocation = () => {
    if (window?.navigator?.geolocation) {
        window?.navigator?.geolocation.getCurrentPosition(showPosition(), showError());

    } else {
        location_error.value = "Geolocation is not supported by this browser.";
    }
}


const showPosition = (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    console.log("user lat long: ", lat, lon);

    const locale = {
        lat,
        lon
    };

    // Use the OpenCage Geocoding API to get the location details
    const apiKey = useRuntimeConfig().public.openCageAPIKey; // Replace with your OpenCage API key
    const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${apiKey}`;

    const getttt = () => {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.results && data?.results?.length > 0) {
                    // Extract the state from the result
                    state.value = data.results[0].components.state;

                    console.log("got shop from geo location: ", state.value)

                    // call request from backend..
                    getShopsNearMe(state.value);
                } else {
                    location_error.value = "Unable to retrieve state information.";
                }
            })
            .catch(error => {
                console.error('Error:', error);
                location_error.value = "An error occurred while fetching location details.";
            });
    };

    getttt();

}


const showError = (error) => {
    switch (error.code) {
        case error.PERMISSION_DENIED:
           location_error.value = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
           location_error.value = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
           location_error.value = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
           location_error.value = "An unknown error occurred.";
            break;
    }
}
// getLocation();
onMounted(() => {
    getUserDetails();
   
})

</script>

<style lang="scss" scoped></style>
<template>
    <!-- CREDIT ALERT -->
    <UModal v-model="low_credits_modal" :ui="{ width: 'w-[400px]' }">
        <UCard>
            <template #header>
                <h1 class=" font-bold text-xl text-app_green">Low credits alert</h1>
            </template>

            <div class=" flex flex-col gap-3 justify-center items-center text-center py-6">
                <img src="../assets/images/low_credit.png" class=" w-[200px]" />
                <span class=" font-bold text-lg">You are running low on credits</span>
                <small>Top up your wallet to continue enjoying our services</small>
            </div>

            <div class=" flex justify-between">
                <UButton label="Cancel" variant="outline" color="gray" class="p-3" @click="low_credits_modal = false" />

                <UButton color="green" variant="solid" class="p-3" label="Top-up now" @click="[navigateTo('/account/subscriptions'), low_credits_modal = false]" />
            </div>
        </UCard>
    </UModal>



    <!-- USER SESSION EXPIRED -->
    <div class="border-b border-gray-300 dark:border-gray-600">

        <!-- AUTH NAVBAR -->
        <div v-if="user" class="flex flex-col gap-3 justify-center items-center p-3">
            <div class="container mx-auto flex w-full items-center justify-between">
                <div class="flex flex-row w-full md:w-fit justify-between">
                    <div class="w-[120px]">
                        <NuxtLink to="/">
                            <img src="../assets/images/logo/whatsell_logo.png" />
                        </NuxtLink>
                    </div>
                </div>

                <!-- nav links -->
                <div class="flex gap-12 justify-evenly items-center">
                    <div
                        class="flex  font-bold md:justify-between justify-evenly gap-8 md:gap-12 items-center fixed md:relative bottom-0 p-2 md:p-0 left-0 z-10 md:z-10 right-0 bg-white dark:bg-[#21262d] border-t dark:border-gray-600 md:border-none">
                        <NuxtLink to="/" class="flex flex-col items-center" :class="isHomePage ? 'text-green-500':''">
                       
                            <UButton 
                            class=" md:hidden"
                            :color="isHomePage ?'green':'white'"
                            icon="iconoir:home-simple"
                            variant="link"
                            />
                            <span class="text-[8px] md:text-sm">Home</span>
                        </NuxtLink>
                        <NuxtLink to="/shops" class="flex flex-col items-center" :class="isShopsPage ? 'text-green-500':''">
                            <UButton
                            class=" md:hidden"
                            :color="isShopsPage ?'green':'white'"
                            icon="iconoir:shop-window"
                            variant="link"
                            />
                            <span class="text-[8px] md:text-sm">Shops</span>
                        </NuxtLink>
                        <NuxtLink v-if="user.account_type == 'seller'" to="/sell" class="flex flex-col items-center" :class="isSellPage ? 'text-green-500':''">
                            <UButton
                            class=" md:hidden"
                            :color="isSellPage ?'green':'white'"
                            icon="iconoir:plus-circle-solid"
                            variant="link"
                            />
                            <span class="text-[8px] md:text-sm">Sell</span>
                        </NuxtLink>
                        <NuxtLink to="/glips" class="flex flex-col items-center" :class="isGlipsPage ? 'text-green-500':''">
                            
                            <UButton
                            class=" md:hidden"
                            :color="isGlipsPage ?'green':'white'"
                            icon="iconoir:media-video-list"
                            variant="link"
                            />
                            <span class="text-[8px] md:text-sm">Glips</span>
                        </NuxtLink>
                        <NuxtLink to="/likes" class="flex flex-col items-center" :class="isLikesPage ? 'text-green-500':''">
                            <UButton
                            class=" md:hidden"
                            :color="isLikesPage ?'green':'white'"
                            icon="iconoir:thumbs-up"
                            variant="link"
                            />
                            <span class="text-[8px] md:text-sm">Likes</span>
                        </NuxtLink>
                    </div>

                    <UButton
                    @click="useRouter().push('/account/shop')"
                    icon="mingcute:coin-3-fill"
                    :label="credits.toString()"
                    color="black"
                    variant="ghost"
                    />
                    <!-- <div div class="flex gap-2 items-center">
                        <img src="../assets/images/coins_group.png" class="w-[35px]" />
                        <span>{{ credits }}</span>
                    </div> -->
                    <div>
                        <UDropdown v-if="user" :items="menu_items" :popper="{ placement: 'bottom-start' }"
                            :ui="{ width: 'w-[320px]', background: ' dark:bg-[#21262d]' }">
                            <UAvatar 
                            :chip-color="user?.email_verification?.is_verified ? 'none':'green'"
                            chip-text="" 
                            chip-position="top-right"
                                :alt="user?.username.toUpperCase()" />
                            <template #user_contents>
                                <div class="flex gap-3 items-center justify-center text-[14px] relative">
                                    <UAvatar 
                                   :chip-color="user?.email_verification?.is_verified ? 'none':'green'"
                                    chip-text=""
                                        chip-position="top-right" :alt="user?.username.toUpperCase()" />
                                    <div class="flex flex-col text-left -gap-1">
                                        <span class="font-bold">{{ user?.username }}</span>
                                        <small :class="!user?.email_verification?.is_verified
                                                ? 'text-orange-500'
                                                : ''
                                            ">
                                            <i v-if="!user?.email_verification?.is_verified"
                                                class="bi bi-exclamation-circle-fill"></i>
                                            {{ user?.email }}</small>
                                    </div>
                                    <button class="absolute -right-[130px]">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15"
                                            viewBox="0 0 24 24">
                                            <path fill="currentColor"
                                                d="M8.025 22L6.25 20.225L14.475 12L6.25 3.775L8.025 2l10 10z" />
                                        </svg>
                                    </button>
                                </div>
                            </template>
                            <template #theme>
                                <button class="" :icon="isDark
                                        ? 'i-heroicons-moon-20-solid'
                                        : 'i-heroicons-sun-20-solid'
                                    " color="gray" variant="link" aria-label="Theme" @click="isDark = !isDark">
                                    Theme
                                </button>
                            </template>
                        </UDropdown>
                    </div>
                </div>
            </div>
        </div>


        <!-- NON_AUTH NAVBAR -->
        <div v-else
            class="container mx-auto flex md:flex-row flex-col w-full md:items-center justify-between gap-4 relative p-3">
            <div class="flex flex-row w-full md:w-fit justify-between">
                <div class="w-[120px]">
                    <NuxtLink to="/">
                        <img src="../assets/images/logo/whatsell_logo.png" />
                    </NuxtLink>
                </div>
                <UButton variant="link" @click="toggleMenu" color="green" class="md:hidden inline-block">
                    <i class="bi bi-ui-radios-grid"></i>
                </UButton>
            </div>


            <!-- search -->
            <div :class="is_collapsed ? 'md:flex' : 'hidden md:flex'"
                class="md:w-fit md:flex-1 flex-col gap-3 md:flex-row md:justify-between md:items-center">
                <div class="flex flex-col w-full justify-center items-center mt-6 md:mt-0">
                    <form @submit.prevent="handleSearch()"
                        class="flex flex-row w-full md:w-[300px] rounded-full overflow-hidden gap-1 bg-white dark:bg-gray-900 border dark:border-gray-600 items-center">
                        <input v-model="searchQuery" @keyup.enter="handleSearch" class="px-5 p-3 outline-none w-full"
                            type="text" placeholder=" Search for shops, foods,cloths, drinks..." />
                        <div class="flex flex-row-reverse justify-between items-center gap-6 flex-1 px-4">
                            <button @click="openFilter" type="button" class="flex md:hidden">
                                <i class="bi bi-filter"></i>
                            </button>
                            <button type="submit">
                                <i class="bi bi-search"></i>
                            </button>
                        </div>
                    </form>
                </div>

           

                <!-- auth buttons -->
                <div class="flex flex-col md:flex-row-reverse items-start md:items-center font-bold gap-3 mt-4 md:mt-0">
                    <NuxtLink to="/login" class="w-full md:w-fit">
                        <UButton 
                        color="gray"
                        label="Login"
                        class=" font-bold"
                        variant="link"/>
                    </NuxtLink>

                    <NuxtLink to="/register" class="w-full md:w-fit">
                        <UButton 
                        color="gray"
                        class="text-nowrap font-bold"
                        label="Join now"
                        variant="link"/>
                    </NuxtLink>

                    <UButton class="" :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'
                        " color="gray" variant="link" aria-label="Theme" @click="isDark = !isDark">Theme</UButton>
                    
                   
                </div>
            </div>

            
            <!-- mobile nav links -->
            <div
                class="md:ml-3 flex font-bold md:justify-between justify-evenly gap-8 md:gap-12 items-center fixed md:relative bottom-0 p-2 md:p-0 left-0 z-10 md:z-10 right-0 bg-white dark:bg-[#21262d] border-t dark:border-gray-600 md:border-none">
                <NuxtLink to="/" class="flex flex-col items-center" :class="isHomePage ? 'text-green-500':''">
                    <UButton 
                    class=" md:hidden"
                    :color="isHomePage ?'green':'white'"
                    icon="iconoir:home-simple"
                    variant="link"
                    />
                    <span class="text-[8px] md:text-sm">Home</span>
                </NuxtLink>
                <NuxtLink to="/shops" class="flex flex-col items-center" :class="isShopsPage ? 'text-green-500':''">
                    <UButton
                    class=" md:hidden"
                    :color="isShopsPage ?'green':'white'"
                    icon="iconoir:shop-window"
                    variant="link"
                    />
                    <span class="text-[8px] md:text-sm">Shops</span>
                </NuxtLink>
                <NuxtLink to="/glips" class="flex flex-col items-center" :class="isGlipsPage ? 'text-green-500':''">
                    <UButton
                    class=" md:hidden"
                    :color="isGlipsPage ?'green':'white'"
                    icon="iconoir:media-video-list"
                    variant="link"
                    />
                    <span class="text-[8px] md:text-sm">Glips</span>
                </NuxtLink>
            </div>
            

            
        </div>

        
  
    

    <div v-if="user"
        class="pt-4 w-full flex flex-row justify-center items-center dark:border-gray-600 sticky top-0 mx-auto border-t mb-4">
        <form @submit.prevent="handleSearch()"
            class="flex flex-row w-full lg:w-[600px] md:w-[300px] rounded-full overflow-hidden gap-1 bg-white dark:bg-gray-900 border dark:border-gray-600 items-center">
            <input v-model="searchQuery" @keyup.enter="handleSearch" class="px-5 p-2 outline-none w-full"
                type="text" placeholder=" Search for shops, foods,cloths, drinks..." />
            <div class="flex flex-row-reverse justify-between items-center gap-6 flex-1 px-4">
                <button @click="openFilter" type="button" class="flex md:hidden">
                    <i class="bi bi-filter"></i>
                </button>
                <button type="submit">
                    <i class="bi bi-search"></i>
                </button>
            </div>
        </form>
    </div>

</div>
</template>

<script setup>
import { ref } from "vue";
const { $axios } = useNuxtApp();
const colorMode = useColorMode();
const searchQuery = ref("");
const session_expired = ref(false);
import { useRouter } from "vue-router";
const router = useRouter();
const user = ref('');
const credits = ref(0);
const loading = ref(false);


import { useUserStore } from "~/stores/user";
const userStore = useUserStore();
// Only fetch if user data is not already in store

const menu_items = [
    [
        {
            label: "menu",
            slot: "user_contents",
            click: () => {
                router.push("/account");
            },
        },
    ],
    [
        {
            label: "inventory",
            icon: "material-symbols:inventory-2-outline-rounded",
            click: () => {
                router.push("/account/shop");
            },
        },
        {
            label: "Wallet",
            icon: "material-symbols:account-balance-wallet-outline",
            click: () => {
                router.push("/account/wallet");
            },
        },
      /*   {
            label: "Location",
            icon: "material-symbols:location-on-outline",
            click: () => {
                router.push("/account/");
            },
        }, */
        {
            label: "Invoice",
            icon: "material-symbols:insert-page-break",
            disabled: true,
        },
        {
            label: "theme",
            icon: "material-symbols:nightlight-badge-outline-rounded",
            click: () => {
                isDark.value = !isDark.value;
            },
        },
    ],
    [
        {
            label: "Logout",
            icon: "material-symbols:power-settings-new-outline",
            iconClass: "text-red-500 dark:text-red-500",
            class: " py-3 text-red-500 dark:text-red-500",
            click: () => {
                logout();
            },
        },
    ],
];

const isDark = computed({
    get() {
        return colorMode.value === "dark";
    },
    set() {
        colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
    },
});

const is_collapsed = ref(false);
const toggleMenu = () => {
    is_collapsed.value == false
        ? (is_collapsed.value = true)
        : (is_collapsed.value = false);
};

// get user details...
const has_alerts = ref(false);

const low_credits_modal = ref(false);
const getUserDetails = async () => {
  loading.value = true;
  try {
    const res = await useNuxtApp().$apiFetch(`/user`); // Headers are handled by the plugin
    user.value = res.user;
    credits.value = res.credits;
    res.credits <= 5 ? (low_credits_modal.value = true) : (low_credits_modal.value = false);
    has_alerts.value = !user.value.email_verification?.is_verified || user.value.is_on_hold;
  } catch (error) {
    console.log("Couldn't get user: ", error);
  }
  loading.value = false;
};

/* const logout = () => {
    userStore.logout();
}; */
const logout = () => {
  const token = useCookie('accessToken');
  token.value = null; // Clear the token
  navigateTo('/login'); // Redirect to the login page
};



onMounted(() => {
    getUserDetails();
});

const isHomePage = computed(() => {
    return router.currentRoute.value.name === "index";
});

const isShopsPage = computed(() => {
    return router.currentRoute.value.path === "/shops";
});

const isSellPage = computed(() => {
    return router.currentRoute.value.name === "sell";
});

const isGlipsPage = computed(() => {
    return router.currentRoute.value.name === "glips";
});

const isLikesPage = computed(() => {
    return router.currentRoute.value.name === "likes";
});

const handleSearch = () => {
    if (searchQuery.value) {
        router.push(`/search?q=${searchQuery.value}`);
    }
};




</script>

<style scoped>
</style>

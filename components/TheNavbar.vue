<template>
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

                <!-- search -->
                <div class="flex gap-12 items-center justify-evenly">
                    <div
                        class="flex font-bold md:justify-between justify-evenly gap-8 md:gap-12 items-center fixed md:relative bottom-0 p-5 md:p-0 left-0 z-[99999] md:z-10 right-0 bg-white dark:bg-[#21262d] border-t dark:border-gray-600 md:border-none">
                        <NuxtLink to="/" class="flex flex-col items-center" :class="isHomePage ? 'text-green-500':''">
                            <!-- <span><i class="md:hidden bi bi-columns-gap"></i></span> -->
                            <svg width="30" height="30" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_470_61039)">
                                <path d="M19.793 9.07276L14.2378 4.75192C13.7502 4.37266 13.1502 4.16675 12.5326 4.16675C11.9149 4.16675 11.3149 4.37266 10.8273 4.75192L5.27109 9.07276C4.93718 9.33243 4.66702 9.66497 4.48126 10.045C4.29549 10.425 4.19902 10.8425 4.19922 11.2655V18.7655C4.19922 19.318 4.41871 19.8479 4.80941 20.2386C5.20011 20.6293 5.73002 20.8488 6.28255 20.8488H18.7826C19.3351 20.8488 19.865 20.6293 20.2557 20.2386C20.6464 19.8479 20.8659 19.318 20.8659 18.7655V11.2655C20.8659 10.4082 20.4701 9.5988 19.793 9.07276Z" fill="currentColor" />
                                <path d="M16.6668 15.625C14.3647 17.0135 10.6335 17.0135 8.3335 15.625" stroke="#FAFAFA" stroke-width="2.08333" stroke-linecap="round" stroke-linejoin="round"/>
                                </g>
                                <defs>
                                <clipPath id="clip0_470_61039">
                                <rect width="30" height="30" fill="white"/>
                                </clipPath>
                                </defs>
                            </svg>
                            <span class="text-[12px] md:text-sm">Home</span>
                        </NuxtLink>
                        <NuxtLink to="/shops" class="flex flex-col items-center" :class="isShopsPage ? 'text-green-500':''">
                            <!-- <span><i class="md:hidden bi bi-shop"></i></span> -->
                            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22.9998 21.5H22.4373C22.3876 21.5 22.3399 21.4803 22.3047 21.4451C22.2696 21.41 22.2498 21.3623 22.2498 21.3125V13.3208C22.2502 13.291 22.2436 13.2615 22.2303 13.2348C22.217 13.208 22.1976 13.1849 22.1735 13.1672C22.1495 13.1495 22.1216 13.1378 22.0922 13.133C22.0627 13.1283 22.0326 13.1306 22.0042 13.1399C21.5741 13.2751 21.1274 13.3505 20.6767 13.364C20.6214 13.364 20.5689 13.3663 20.5173 13.3663C19.6505 13.3683 18.7976 13.1482 18.04 12.7269C17.9826 12.695 17.9181 12.6783 17.8525 12.6783C17.7869 12.6783 17.7223 12.695 17.665 12.7269C16.9076 13.1482 16.0548 13.3683 15.1881 13.3663C14.3263 13.3675 13.4789 13.1448 12.729 12.7199C12.6712 12.6871 12.6059 12.6699 12.5394 12.6699C12.473 12.6699 12.4077 12.6871 12.3498 12.7199C11.5887 13.1464 10.7304 13.3692 9.85795 13.3668C8.99031 13.3673 8.1376 13.1411 7.38435 12.7105C7.32607 12.6773 7.26016 12.6599 7.1931 12.6599C7.12604 12.6599 7.06014 12.6773 7.00185 12.7105C6.24861 13.1411 5.39589 13.3673 4.52826 13.3668C4.47717 13.3668 4.4256 13.3668 4.37029 13.3644H4.36748C3.90097 13.3504 3.43884 13.2701 2.99498 13.1258C2.96687 13.1167 2.93701 13.1144 2.90784 13.1191C2.87867 13.1237 2.85101 13.1352 2.82711 13.1526C2.80321 13.1699 2.78375 13.1927 2.77032 13.219C2.75689 13.2453 2.74987 13.2744 2.74982 13.304V21.3125C2.74982 21.3623 2.73007 21.41 2.6949 21.4451C2.65974 21.4803 2.61205 21.5 2.56232 21.5H2.02326C1.61826 21.5 1.26857 21.8113 1.25076 22.2163C1.2462 22.3175 1.2622 22.4186 1.29778 22.5135C1.33337 22.6083 1.3878 22.695 1.45781 22.7682C1.52781 22.8415 1.61193 22.8998 1.70509 22.9396C1.79824 22.9795 1.8985 23 1.99982 23H22.9764C23.3814 23 23.7311 22.6888 23.7489 22.2838C23.7534 22.1826 23.7374 22.0815 23.7019 21.9866C23.6663 21.8918 23.6118 21.8051 23.5418 21.7319C23.4718 21.6586 23.3877 21.6003 23.2946 21.5605C23.2014 21.5206 23.1011 21.5001 22.9998 21.5ZM10.9998 18.3125C10.9998 18.3623 10.9801 18.41 10.9449 18.4451C10.9097 18.4803 10.8621 18.5 10.8123 18.5H6.68732C6.63759 18.5 6.5899 18.4803 6.55474 18.4451C6.51958 18.41 6.49982 18.3623 6.49982 18.3125V15.3125C6.49982 15.1634 6.55909 15.0203 6.66458 14.9148C6.77006 14.8093 6.91314 14.75 7.06232 14.75H10.4373C10.5865 14.75 10.7296 14.8093 10.8351 14.9148C10.9406 15.0203 10.9998 15.1634 10.9998 15.3125V18.3125ZM18.3123 21.5H14.9373C14.8876 21.5 14.8399 21.4803 14.8047 21.4451C14.7696 21.41 14.7498 21.3623 14.7498 21.3125V15.3125C14.7498 15.1634 14.8091 15.0203 14.9146 14.9148C15.0201 14.8093 15.1631 14.75 15.3123 14.75H17.9373C18.0865 14.75 18.2296 14.8093 18.3351 14.9148C18.4406 15.0203 18.4998 15.1634 18.4998 15.3125V21.3125C18.4998 21.3623 18.4801 21.41 18.4449 21.4451C18.4097 21.4803 18.3621 21.5 18.3123 21.5Z" fill="currentColor"/>
                                <path d="M23.5891 8.48187L21.5772 3.86516C21.0504 2.73219 19.8471 2 18.5116 2H6.48582C5.15035 2 3.94707 2.73219 3.4202 3.86516L1.40832 8.48187C0.986446 9.39172 1.54379 10.3259 1.54426 10.3264L1.55738 10.3475C1.58035 10.3841 1.62113 10.4412 1.64598 10.4778C1.64832 10.4806 1.6502 10.4839 1.65254 10.4872L1.88692 10.7708C1.89568 10.7815 1.90507 10.7917 1.91504 10.8012L2.14941 11.0277L2.1691 11.0445C2.30674 11.1625 2.45397 11.2688 2.60926 11.3623V11.3647C3.1194 11.6737 3.70061 11.846 4.29676 11.8648C4.3352 11.8648 4.37363 11.8648 4.41254 11.8648C5.31454 11.8665 6.18368 11.5263 6.84488 10.9128L6.86035 10.8983C6.92941 10.8332 7.02071 10.797 7.11559 10.797C7.21047 10.797 7.30177 10.8332 7.37082 10.8983L7.38629 10.9128C8.05454 11.5253 8.92809 11.8651 9.83457 11.8651C10.741 11.8651 11.6146 11.5253 12.2829 10.9128C12.3522 10.8486 12.4432 10.813 12.5376 10.813C12.6321 10.813 12.7231 10.8486 12.7924 10.9128C13.4587 11.5234 14.329 11.8629 15.2327 11.8649C16.1364 11.8669 17.0083 11.5312 17.6772 10.9236C17.7455 10.8603 17.8352 10.8252 17.9282 10.8252C18.0213 10.8252 18.111 10.8603 18.1793 10.9236C18.8489 11.5349 19.7246 11.871 20.6313 11.8648H20.748C21.3292 11.8431 21.8947 11.6703 22.3886 11.3633C22.4332 11.3366 22.4758 11.3084 22.5189 11.2803C22.8521 11.0557 23.142 10.7729 23.3749 10.4455L23.4564 10.3222C23.4646 10.3097 23.4721 10.2966 23.4789 10.2828C23.5568 10.1244 23.9739 9.30969 23.5891 8.48187Z" fill="currentColor"/>
                            </svg>
                            <span class="text-[12px] md:text-sm">Shops</span>
                        </NuxtLink>
                        <NuxtLink to="/sell" class="flex flex-col items-center" :class="isSellPage ? 'text-green-500':''">
                            <span><i class="md:hidden bi bi-plus-square-fill"></i></span>
                            <span class="text-[12px] md:text-sm">Sell</span>
                        </NuxtLink>
                        <NuxtLink to="/glips" class="flex flex-col items-center" :class="isGlipsPage ? 'text-green-500':''">
                            <!-- <span><i class="md:hidden bi bi-camera-reels"></i></span> -->
                            <svg width="25" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2 19.9V5.1C2 4.76863 2.26863 4.5 2.6 4.5H17.4C17.7314 4.5 18 4.76863 18 5.1V19.9C18 20.2314 17.7314 20.5 17.4 20.5H2.6C2.26863 20.5 2 20.2314 2 19.9Z" fill="currentColor"/>
                                <path d="M22 6.5V18.5" stroke="#959595" stroke-width="2" stroke-linecap="round"/>
                                <path d="M11 15C11 15.8284 10.3284 16.5 9.5 16.5C8.67157 16.5 8 15.8284 8 15C8 14.1716 8.67157 13.5 9.5 13.5C10.3284 13.5 11 14.1716 11 15Z" fill="currentColor"/>
                                <path d="M11 15V9.1C11 8.76863 11.2686 8.5 11.6 8.5H13M11 15C11 15.8284 10.3284 16.5 9.5 16.5C8.67157 16.5 8 15.8284 8 15C8 14.1716 8.67157 13.5 9.5 13.5C10.3284 13.5 11 14.1716 11 15Z" stroke="#FAFAFA" stroke-width="2" stroke-linecap="round"/>
                            </svg>
                            <span class="text-[12px] md:text-sm">Glips</span>
                        </NuxtLink>
                        <NuxtLink to="/likes" class="flex flex-col items-center" :class="isLikesPage ? 'text-green-500':''">
                            <span><i class="md:hidden bi bi-hand-thumbs-up-fill"></i></span>
                            <span class="text-[12px] md:text-sm">Likes</span>
                        </NuxtLink>
                    </div>

                    <div div class="flex gap-2 items-center">
                        <img src="../assets/images/coins_group.png" class="w-[35px]" />
                        <span>{{ credits }}</span>
                    </div>
                    <div>
                        <UDropdown v-if="user" :items="menu_items" :popper="{ placement: 'bottom-start' }"
                            :ui="{ width: 'w-[320px]', background: ' dark:bg-[#21262d]' }">
                            <UAvatar 
                            
                            chip-text="" 
                            chip-position="top-right"
                                :alt="user?.username.toUpperCase()" />
                            <template #user_contents>
                                <div class="flex gap-3 items-center justify-center text-[14px] relative">
                                    <UAvatar 
                                   
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
                                    <button class="absolute -right-[100px]">
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
                                    " color="gray" variant="ghost" aria-label="Theme" @click="isDark = !isDark">
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
                <UButton variant="ghost" @click="toggleMenu" color="green" class="md:hidden inline-block">
                    <i class="bi bi-ui-radios-grid" />
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
                <div class="flex flex-col md:flex-row gap-3 items-start md:items-center">
                    <NuxtLink to="/login" class="w-full md:w-fit">
                        <button variant="ghost" class="p-3 rounded-md px-6 w-full text-left">
                            Login
                        </button>
                    </NuxtLink>

                    <NuxtLink to="/register" class="w-full md:w-fit">
                        <button variant="ghost" class="p-3 rounded-md px-6 text-nowrap w-full text-left">
                            Sign Up
                        </button>
                    </NuxtLink>

                    <UButton class="mx-3" :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'
                        " color="gray" variant="ghost" aria-label="Theme" @click="isDark = !isDark">Theme</UButton>
                </div>
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
                router.push("/account");
            },
        },
        {
            label: "Wallet",
            icon: "material-symbols:account-balance-wallet-outline",
            click: () => {
                router.push("/account");
            },
        },
        {
            label: "Location",
            icon: "material-symbols:location-on-outline",
            click: () => {
                router.push("/account");
            },
        },
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


const getUserDetails = async () => {
  loading.value = true;
  try {
    const res = await useNuxtApp().$apiFetch(`/user`); // Headers are handled by the plugin
    user.value = res.user;
    credits.value = res.credits;
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

<style scoped></style>

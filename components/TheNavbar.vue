<template>
    <!-- USER SESSION EXPIRED -->
    <div class="border-b border-gray-300 dark:border-gray-600">


        <!-- NAVBAR SKELETON -->
       <!--  <div v-if="loading" class=" container mx-auto gap-3 flex flex-row justify-between items-center p-3">
            <div class="flex flex-row w-full md:w-fit justify-between">
                <div class="w-[120px]">
                    <NuxtLink to="/">
                        <img src="../assets/images/logo/whatsell_logo.png" />
                    </NuxtLink>
                </div>
            </div>
            <div class=" flex flex-row gap-8">
                <USkeleton class=" w-[80px] h-10 rounded-md" :ui="{ background: 'dark:bg-gray-700' }" />
                <USkeleton class=" size-[40px] rounded-full" :ui="{ background: 'dark:bg-gray-700' }" />
            </div>
        </div> -->
    

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
                    <!-- class="hidden md:inline-block" -->
                    <div
                        class="flex font-bold md:justify-between justify-evenly gap-6 md:gap-12 items-center fixed md:relative bottom-0 md:p-0 left-0 z-[99999] md:z-10 right-0 bg-white dark:bg-[#21262d] dark:border-gray-600 md:border-none">
                        <NuxtLink to="/" class="flex flex-col items-center">
                            <span><i class="md:hidden bi bi-columns-gap"></i></span>
                            <span>Home</span>
                        </NuxtLink>
                        <NuxtLink to="/shops" class="flex flex-col items-center">
                            <span><i class="md:hidden bi bi-shop"></i></span>
                            <span>Shops</span>
                        </NuxtLink>
                        <NuxtLink to="/shops" class="flex flex-col items-center">
                            <span><i class="md:hidden bi bi-plus-square"></i></span>
                            <span>Sell</span>
                        </NuxtLink>
                        <NuxtLink to="/#" class="flex flex-col items-center">
                            <span><i class="md:hidden bi bi-camera-reels"></i></span>
                            <span>Glips</span>
                        </NuxtLink>
                        <NuxtLink to="/likes" class="flex flex-col items-center">
                            <span><i class="md:hidden bi bi-hand-thumbs-up"></i></span>
                            <span>Likes</span>
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
            <div
                class="border-t pt-4 w-full flex flex-row justify-center items-center dark:border-gray-600 px-3 sticky top-0">
                <form @submit.prevent="handleSearch()"
                    class="flex flex-row w-full lg:w-[600px] md:w-[300px] rounded-full overflow-hidden gap-1 bg-white dark:bg-gray-900 border dark:border-gray-600 items-center">
                    <input v-model="searchQuery" @keyup.enter="handleSearch" class="px-5 p-3 outline-none w-full"
                        type="text" placeholder=" Search for shops, foods,cloths, drinks..." />
                    <div class="flex flex-row-reverse justify-between items-center gap-6 flex-1 px-4 border-l dark:border-gray-600 h-full">
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
    // alert("hello world")
});

</script>

<style scoped></style>

<template>
    <!-- USER SESSION EXPIRED -->
    <UModal v-model="session_expired">
      <div class="p-4">
        <span>Your session expired, login to continue</span>
      </div>
    </UModal>


    <div class="border-b border-gray-300 dark:border-gray-600">
        <div class=" container mx-auto flex md:flex-row flex-col p-5 w-full md:items-center justify-between gap-4">
            <div class=" flex flex-row w-full md:w-fit justify-between">
                <div class=" w-[150px]">
                    <NuxtLink to="/">
                        <img src="../assets/images/logo/whatsell_logo.png"/>
                    </NuxtLink>
                </div>
                <UButton variant="ghost" @click="toggleMenu" color="green" class=" md:hidden inline-block">
                    <i class="bi bi-ui-radios-grid"/>
                </UButton>
            </div>

            <!-- search -->
            <div v-if="!user" :class="is_collapsed ? 'flex':'hidden md:flex'" class=" md:w-fit flex-1 flex-col gap-3 md:flex-row md:justify-between md:items-center">
                <div class=" flex flex-col w-full justify-center items-center mt-6 md:mt-0">
                    <form @submit.prevent="handleSearch()" class=" flex flex-row w-full md:w-[300px] rounded-full overflow-hidden gap-1 bg-white dark:bg-gray-900 border dark:border-gray-600 items-center">
                        <input 
                        v-model="searchQuery"
                        @keyup.enter="handleSearch"
                        class=" px-5 p-3 outline-none w-full" type="text" placeholder=" Search for shops, foods,cloths, drinks..."/>
                        <div class=" flex flex-row-reverse justify-between items-center gap-6 flex-1 px-4">
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
                <div class=" flex flex-col md:flex-row gap-3 items-start md:items-center">
                    <NuxtLink to="/login" class=" w-full md:w-fit">
                        <button variant="ghost"  class=" p-3 rounded-md px-6 w-full text-left">Login</button>
                    </NuxtLink>
                
                    <NuxtLink to="/register" class=" w-full md:w-fit">
                        <button variant="ghost" class=" p-3 rounded-md px-6 text-nowrap w-full text-left">Sign Up</button>
                    </NuxtLink>
                
                    <UButton class="mx-3"
                        :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
                        color="gray"
                        variant="ghost"
                        aria-label="Theme"
                        @click="isDark = !isDark"
                    >Theme</UButton>
                </div>
            </div>

            <!-- IF USER IS AUTH -->
            <div v-else class=" flex gap-3 items-center justify-evenly w-full">
                <NuxtLink to="/">Home</NuxtLink>
                <NuxtLink to="/shops">Shops</NuxtLink>
                <NuxtLink to="/#">Glips</NuxtLink>
                <NuxtLink to="/likes">Likes</NuxtLink>
                <div class="flex gap-2 items-center">
                    <img src="../assets/images/coins_group.png" class=" w-[35px]"/>
                    <span>{{ user?.credits }}</span>
                </div>
                <div>
                    <UDropdown :items="menu_items" :popper="{ placement: 'bottom-start' }">
                        <button>Seller</button>
                        <template #user_contents>
                            <div class="flex gap-3 items-center justify-center text-[14px] relative">
                                <div class=" size-[30px] rounded-full font-bold bg-app_green text-white flex justify-center items-center">DA</div>
                                <div class=" flex flex-col text-left -gap-1">
                                    <span class=" font-bold">Dannie</span>
                                    <small>dannie@gmail.com</small>
                                </div>
                                <!-- <button class=" absolute">></button> -->
                            </div>
                        </template>
                    </UDropdown>

                  <!--   <UDropdown :items="menu_items" :ui="{ item: { disabled: 'cursor-text select-text' } }" :popper="{ placement: 'bottom-start' }">
                        <UAvatar src="https://avatars.githubusercontent.com/u/739984?v=4" />

                        <template #account="{ item }">
                        <div class="text-left">
                            <p>
                            Signed in as
                            </p>
                            <p class="truncate font-medium text-gray-900 dark:text-white">
                            {{ item.label }}
                            </p>
                        </div>
                        </template>

                        <template #item="{ item }">
                        <span class="truncate">{{ item.label }}</span>

                        <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto" />
                        </template>
                    </UDropdown> -->
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const { $axios } = useNuxtApp();
const colorMode = useColorMode()
const searchQuery = ref('');
const session_expired = ref(false);
import { useRouter } from "vue-router";
const router = useRouter();

const menu_items = [
  [{
    label: 'menu',
    slot: 'user_contents',
  }],
  [{
    label: 'inventory',
    icon: 'material-symbols:inventory-2-outline-rounded',
    click: () => {
      router.push('/account')
    }
  }, {
    label: 'Wallet',
    icon: 'material-symbols:account-balance-wallet-outline',
    click: () => {
      router.push('/account')
    }
  },
  {
    label: 'Location',
    icon: 'material-symbols:location-on-outline',
    click: () => {
      router.push('/account')
    }
  },
  {
    label: 'Invoice',
    icon: 'material-symbols:insert-page-break',
    disabled: true
  }],
  [{
    label: 'Logout',
    icon: 'material-symbols:power-settings-new-outline',
    iconClass: 'text-red-500',
    class: " py-3 text-red-500",
    click: () => {
      router.push('/account')
    }
  }]
]


const isDark = computed({
  get () {
    return colorMode.value === 'dark'
  },
  set () {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
});

const is_collapsed = ref(false);
const toggleMenu =()=> {
    is_collapsed.value == false ? is_collapsed.value = true : is_collapsed.value = false;
}


// get user details...
const user = ref(null);
const getUserDetails = async()=> {
    try {
        const res = await $axios(`${useRuntimeConfig().public.apiBase}/user`);
        user.value = res;
        console.log('user: ', res)
    } catch (error) {
        session_expired.value = true;
        console.log(error);
    }
}

onMounted(()=> {
    getUserDetails();
})
</script>

<style scoped>

</style>
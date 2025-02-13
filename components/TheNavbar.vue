<template>
    <div class="border-b border-gray-300 dark:border-gray-600">
        <div class=" container mx-auto flex md:flex-row flex-col flex-wrap p-5 w-full md:items-center justify-between gap-4">
            <div class=" flex flex-row w-full md:w-fit justify-between">
                <div class=" w-[150px]">
                    <NuxtLink to="/">
                        <img src="../assets/images/logo/whatsell_logo.png"/>
                    </NuxtLink>
                </div>
                <UButton variant="ghost" @click="toggleMenu" color="green" class=" md:hidden inline-block">
                    <i class="bi bi-three-dots"/>
                </UButton>
            </div>

            <!-- search -->
            <div :class="is_collapsed ? 'flex':'hidden md:flex'" class=" md:w-fit flex-1 flex-col gap-3 md:flex-row md:justify-between md:items-center">
                <div class=" flex flex-col w-full justify-center items-center mt-6 md:mt-0">
                    <form @submit.prevent="handleSearch()" class=" flex flex-row w-full md:w-[600px] rounded-full overflow-hidden gap-1 bg-white dark:bg-gray-900 border dark:border-gray-600 items-center">
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
                        <UButton variant="ghost" color="black" class=" p-3 rounded-md px-6 w-full text-left">Login</UButton>
                    </NuxtLink>
                
                    <NuxtLink to="/register" class=" w-full md:w-fit">
                        <button  class=" p-3 rounded-md bg-black text-white px-6 text-nowrap w-full text-left">Sign Up</button>
                    </NuxtLink>
                
                    <UButton
                        :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
                        color="gray"
                        variant="ghost"
                        aria-label="Theme"
                        @click="isDark = !isDark"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const colorMode = useColorMode()
const searchQuery = ref('');

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
</script>

<style scoped>

</style>
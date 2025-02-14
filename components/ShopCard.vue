<template>
    <NuxtLink :to="`/shops/${name}`" class="flex flex-1 min-w-[300px] relative h-[290px] bg-gray-50 dark:bg-gray-900 rounded-lg flex-col overflow-hidden">
        <div class=" h-[60%] w-full relative" :style="`background: url(${image_url})`" style="background-position: center; background-repeat: no-repeat; background-size: cover;">
            <div class=" size-16 border-2 absolute top-[76%] left-[20px] border-white bg-green-100 rounded-full flex justify-center items-center text-2xl">
                <i class="bi bi-shop text-green-600"></i>
            </div>
        </div>
        <div class=" h-[30%] w-full p-8">
            <p class="font-bold text-lg">{{ name }}</p>
            <p class=" text-gray-400">{{ category }}</p>
            <p class=" text-gray-200 text-sm">{{ location }}</p>
        </div>
    </NuxtLink>
</template>

<script>
    export default {
        name: "ShopCard",
        props: {
            name: '',
            category: '',
            image_url: '',
            location: '',
        }
    }
</script>

<style scoped>
.status-tag{
    /* background: linear-gradient(light-orange, orange); */
}
</style>
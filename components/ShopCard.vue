<template>
    <NuxtLink :to="`/shops/${name}`" class="flex flex-1 max-w-[320px]  min-w-[300px] relative h-[290px] bg-gray-50 dark:bg-black rounded-lg flex-col overflow-hidden">
        <div class=" h-[60%] w-full relative" 
        :style="header_image ? `background: url(${header_image})`: `background: url(${image_url})`" 
        style="background-position: center; background-repeat: no-repeat; background-size: cover;">
            <div 
            :style="`background: url(${image_url})`" 
            style="background-position: center; background-repeat: no-repeat; background-size: cover;"
            class=" size-16 border-2 absolute top-[76%] left-[20px] border-white bg-green-100 rounded-full flex justify-center items-center text-2xl">
                <i v-if="!image_url" class="bi bi-shop text-green-600"></i>
            </div>
        </div>
        <div class=" h-[30%] w-full p-8">
            <p class="font-bold text-lg">{{ name }}</p>
            <p class=" text-gray-400">{{ category }} <span v-if="location?.state">| {{ location?.state }}</span></p>
        </div>
    </NuxtLink>
</template>

<script>
    export default {
        name: "ShopCard",
        props: {
            name: String,
            category: String,
            image_url: String,
            header_image: String,
            location: String,
        }
    }
</script>

<style scoped>
.status-tag{
    /* background: linear-gradient(light-orange, orange); */
}
</style>
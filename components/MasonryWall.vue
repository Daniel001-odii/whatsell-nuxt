<template>
<masonry-wall :items="items" :ssr-columns="1" :column-width="300" :gap="16">
            <template #default="{ item }">
                <div class="masonry-item bg-white rounded-lg overflow-hidden shadow-md">
                    <img :src="item.image" alt="Product Image" class="w-full h-auto object-cover" @error="handleImageError">
                    <div class="p-4">
                        <h2 class="text-lg font-semibold text-gray-800 mb-2">{{ item.title }}</h2>
                        <p class="text-gray-600 text-sm mb-4">{{ item.description }}</p>
                        <div class="flex items-center justify-between">
                            <span class="text-xl font-bold text-indigo-600">{{ item.price }}</span>
                            <button class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
                                View Details
                            </button>
                        </div>
                    </div>
                </div>
            </template>
        </masonry-wall>
</template>

<script>
 import MasonryWall from '@yeger/vue-masonry-wall'
export default {
    setup () {
        

        return {}
    }
}
</script>

<style scoped>

</style>
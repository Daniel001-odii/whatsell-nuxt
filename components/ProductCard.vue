<template>
    <div class="relative group bg-white dark:bg-gray-900 p-1 rounded-2xl hover:border-green-500 hover:shadow-md border border-transparent h-fit w-fit">
        <!-- IMAGE -->
        <div class="overflow-hidden rounded-2xl">
            <NuxtLink v-if="product_slug" :to="`/products/${id}/${product_slug}`" class="text-sm clamp-4">
                <img :src="image_url" class="w-full transition-transform duration-300 transform group-hover:scale-125 peer md:max-w-[280px]" />
                <img v-if="!image_url" src="../assets/images/logo/whatsell_gray.png" class="w-full transition-transform duration-300 transform group-hover:scale-125 peer" />
            </NuxtLink>
        </div>

        <!-- TEXT AND WRITE-UPS -->
        <div class="p-2">
            <NuxtLink v-if="product_slug" :to="`/products/${id}/${product_slug}`" class="text-sm clamp-4">
                {{ product_slug }}
            </NuxtLink>
            <div class="flex justify-between items-center">
                <span class="text-lg font-bold">NGN {{ product_price }}</span>

                <!-- Like Button -->
                <button v-if="hasLikedButton"
                    @click="toggleLike"
                    :class="[
                        'h-8 w-8 rounded-full bg-white dark:bg-gray-900 dark:border-gray-600 flex justify-center items-center border absolute top-3 right-3',
                        isLiked ? 'border-green-500' : 'border-gray-300'
                    ]"
                >
                    <i :class="isLiked ? 'bi bi-hand-thumbs-up-fill text-green-500' : 'bi bi-hand-thumbs-up'"></i>
                </button>
            </div>
            <div class="text-gray-400 text-[12px] flex justify-between">
                <span>
                    <i class="bi bi-eye-fill"></i>
                    {{ views }} views
                </span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { isLabeledStatement } from 'typescript';
import { ref } from 'vue';
// import { defineProps } from 'vue';
const { $axios } = useNuxtApp();
const emit = defineEmits()


const props = defineProps({
    hasLikedButton: Boolean,
    id: String,
    product_price: String,
    image_url: String,
    views: {
        type: Number,
        default: 0,
    },
    product_slug: String,
    is_liked: {
        type: Boolean,
        default: false,
    },
});

const isLiked = ref(props.is_liked);

const toggleLike = async () => {
    try{

        isLiked.value = !isLiked.value;
        const res = await $axios.post(`${useRuntimeConfig().public.apiBase}/products/${props.id}/like`);
        console.log("tried liking a product: ", res);

        emit('liked', {
            id: props.id,
            isLiked: isLiked.value,
        });

        isLiked.value = res.data.is_liked;

    }catch(error){
        console.log("error liking product: ", error);
    }
   
};

watch(() => props.is_liked, (newVal) => {
    isLiked.value = newVal;
});
</script>

<style scoped>
.product-image {
    filter: grayscale();
    background-size: cover;
    background-position: center;
    background-repeat: none;
}

.prod-alt-image {
    background-image: url("../assets/images/image_5.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-blend-mode: saturation;
    min-height: 100px;
}
</style>

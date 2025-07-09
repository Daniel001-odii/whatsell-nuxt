<template>
      <!-- PRODUCT LIKE -->
  <UModal v-model="no_auth_like" :ui="{ container: 'flex items-center justify-center min-h-screen' }">
    <div class="p-12 text-center items-center justify-center flex flex-col gap-3">
      <h1 class=" text-2xl font-bold">Please login to continue</h1>
      <img src="../../../assets/images/auth_pages.png" class=" w-[300px]" />
      <NuxtLink to="/login" class=" w-full">
        <button class=" bg-app_green text-white p-3 rounded-md w-full">Login</button>
      </NuxtLink>
    </div>
  </UModal>



    <div class="min-w-[180px] sm:min-w-[250px] lg:min-w-[280px] max-w-[300px] sm:max-w-[200px] relative group bg-white dark:bg-gray-900 p-1 rounded-2xl hover:bg-slate-100/20 h-fit flex flex-col border">
        <!-- IMAGE -->
        <div class="overflow-hidden rounded-2xl">
            <NuxtLink v-if="product_slug" :to="id ? `/products/${id}/${product_slug}`:'#'" class="text-sm clamp-4">
                <img :src="image_url" class="w-full transition-transform duration-300 transform group-hover:scale-125 peer md:max-w-[400px]" />
                <img v-if="!image_url" src="../assets/images/logo/whatsell_gray.png" class="w-full transition-transform duration-300 transform group-hover:scale-125 peer" />
            </NuxtLink>
        </div>


        <!-- TEXT AND WRITE-UPS -->
        <div class="p-2">
            <NuxtLink v-if="product_slug" :to="id ? `/products/${id}/${product_slug}`:'#'" class="text-sm font-semibold">
                {{ product_name }}
            </NuxtLink>
            <div class="flex justify-between items-center">
                <!-- <span class="text-lg font-bold">NGN {{ product_price }}</span> -->

                <!-- Like Button -->
                <button v-if="hasLikedButton"
                    @click="user ? (toggleLike) : (no_auth_like = !no_auth_like)"
                    :class="[
                        'h-8 w-8 rounded-full bg-white dark:bg-gray-900 dark:border-gray-600 flex justify-center items-center border absolute top-3 right-3',
                        isLiked ? 'border-green-500' : 'border-gray-300'
                    ]"
                >
                    <i :class="isLiked ? 'bi bi-hand-thumbs-up-fill text-green-500' : 'bi bi-hand-thumbs-up'"></i>
                </button>
            </div>
           <!--  <div class="text-gray-400 text-[12px] flex justify-between">
                <span>
                    <i class="bi bi-eye-fill"></i>
                    {{ views }} views
                </span>
            </div> -->
        </div>
    </div>
</template>

<script setup>
import { isLabeledStatement } from 'typescript';
import { ref } from 'vue';
// import { defineProps } from 'vue';
const { $axios } = useNuxtApp();
const emit = defineEmits()

const toast = useToast();

const props = defineProps({
    hasLikedButton: Boolean,
    id: String,
    product_price: String,
    image_url: String,
    user: String,
    views: {
        type: Number,
        default: 0,
    },
    product_slug: String,
    is_liked: {
        type: Boolean,
        default: false,
    },
    product_name: String,
});

const no_auth_like = ref(false);

const isLiked = ref(props.is_liked);

const toggleLike = async () => {
    try{

        isLiked.value = !isLiked.value;
        const res = await useNuxtApp().$apiFetch(`/products/${props.id}/like`, {
            method: 'POST',
        });
       
        console.log("tried liking a product: ", res);

        emit('liked', {
            id: props.id,
            isLiked: isLiked.value,
        });

        isLiked.value = res.is_liked;
        if(res.is_liked == true){
            toast.add({ title: res.message })
        }

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

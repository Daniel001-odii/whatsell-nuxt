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
                        'h-8 w-8 rounded-full bg-white dark:bg-gray-700 flex justify-center items-center border absolute top-3 right-3',
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

<script>

export default {
    name: "ProductCard",
    props: {
        hasLikedButton: {
            type: Boolean,
            default: true,
        },
        id: {
            type: String,
            required: true,
        },
        product_slug: {
            type: String,
            required: true,
        },
        product_price: {
            type: String,
            required: true,
        },
        product_image: {
            type: String,
            default: "",
        },
        views: {
            type: Number,
            default: 0,
        },
        is_liked: {
            type: Boolean,
            default: false,
        },
        image_url: {
            type: String,
            required: true,
        },
    },

    data() {
        return {
            isLiked: this.is_liked, // Local reactive state for like button
        };
    },

    methods: {
        async toggleLike(){
                try{

                    this.isLiked = !this.isLiked;
                    const response = await axios.post(`/products/${this.id}/like`);
                    console.log("likes: ", response);
                    this.$toast.open({
                        message: `${response.data.message}`,
                        type: 'default',
                    });

                    // Example: Emit to parent for API call
                    this.$emit("update-like", {
                        productId: this.id,
                        isLiked: this.isLiked,
                    });

                    this.isLiked = response.data.is_liked;

                }catch(error){
                    this.$toast.open({
                        message: `${response.data.message}`,
                        type: 'default',
                    });
                }
        },

        async toggleLike11() {
            try {
                // Emit the like/unlike event to the parent or handle API logic here
                this.isLiked = !this.isLiked;

                // Example: Emit to parent for API call
                this.$emit("update-like", {
                    productId: this.id,
                    isLiked: this.isLiked,
                });

                // Example API call logic
                // await axios.post(`/products/${this.id}/like`, { isLiked: this.isLiked });

            } catch (error) {
                console.error("Error toggling like:", error);
                // Revert the state if the API call fails
                this.isLiked = !this.isLiked;
            }
        },
    },

    watch: {
        // Ensure reactivity if the `is_liked` prop changes externally
        is_liked(newVal) {
            this.isLiked = newVal;
        },
    },
};
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

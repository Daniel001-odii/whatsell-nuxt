<template>
    <div>
        <h1>A product page for {{ route.params.id }}</h1>
        <br/>
        <img v-if="product" :src="product?.images[0]" class="size-[200px]" />
        <p>{{ product?.name }}</p>
        <span>{{ product }}</span>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute, useHead } from '#imports';

const route = useRoute();
const product = ref(null);
const metaImage = ref('');

const getProduct = async () => {
    try {
        const response = await $fetch(`https://wha-sell-api.vercel.app/api/products/${route.params.id}`);
        product.value = response.product;
        metaImage.value = response.product?.images[0] || '';

        console.log("response from fetch: ", response);
    } catch (error) {
        console.error("Error fetching product:", error);
    }
};

// Fetch product when the component is mounted
await getProduct();

// Watch for product updates and update meta tags dynamically
watch(product, (newProduct) => {
    if (newProduct) {
        useHead({
            title: newProduct.name,
            meta: [
                { name: 'description', content: newProduct.description || 'Default description' },
                { property: "og:title", content: newProduct.name },
                { property: "og:description", content: newProduct.description },
                { property: "og:image", content: metaImage.value },
                { property: "og:type", content: "product" },
                { name: "twitter:card", content: "summary_large_image" },
                { name: "twitter:image", content: metaImage.value }
            ],
        });
    }
});
</script>

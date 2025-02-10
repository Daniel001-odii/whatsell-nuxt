<template>
    <div>
      <h1 v-if="product">Product: {{ product.name }}</h1>
      <img v-if="product" :src="product?.images[0]" class="size-[200px]" />
      <p v-if="product">{{ product.description }}</p>
      <!-- {{ product }} -->
    </div>
  </template>
  
  <script setup>
  import { useRoute, useAsyncData, useHead } from '#imports';
  
  // Get current route
  const route = useRoute();
  
  // Fetch product data before rendering (SSR-compatible)
  const { data: product } = await useAsyncData('product', async () => {
    const response = await $fetch(`https://wha-sell-api.vercel.app/api/products/${route.params.id}`);
    return response.product;
  });
  
  // Set meta tags dynamically (before page is rendered)
  useHead({
    title: `${product.value?.name} - NGN${product.value?.price.toLocaleString()}` || "Default Product Title",
    meta: [
      { name: 'description', content: product.value?.description || 'Default description' },
      { property: "og:title", content: `${product.value?.name} - NGN${product.value?.price.toLocaleString()}` || "Default Product Title" },
      { property: "og:description", content: product.value?.description || "Default Product Description" },
      { property: "og:image", content: product.value?.images[0] || "https://example.com/default-image.jpg" },
      { property: "og:type", content: "product" },
      { property: "og:url", content: `https://wha-sell.vercel.app/products/${route.params.id}` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: product.value?.images[0] || "https://example.com/default-image.jpg" }
    ],
  });
  </script>
  
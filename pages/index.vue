<template>
    <div>
        <h1>Market View</h1>

      <!-- {{ products }} <span>A BREAAAAAK</span> -->

      <div v-for="product in products.products">
        <span>{{ product.name }}</span>
      </div>

      
    </div>
</template>

<script setup>
import { ref } from 'vue';

// const products = ref([]); // Ensure it's a ref (reactive)

const { data: products } = await useFetch('http://localhost:8000/api/products');

// products.value = all_products;



</script>

<style scoped>

</style>
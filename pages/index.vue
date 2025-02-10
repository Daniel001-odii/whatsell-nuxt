<template>
    <div>
        <h1>Market View</h1>

      <!-- {{ products }} <span>A BREAAAAAK</span> -->

      <div v-for="product in products.products" class="bg-slate-200 mb-20">
        <span>{{ product.name }} <br/> {{ product._id }}</span><br/>
      </div>

      
    </div>
</template>

<script setup>
import { ref } from 'vue';

// const products = ref([]); // Ensure it's a ref (reactive)

const { data: products } = await useFetch('https://wha-sell-api.vercel.app/api/products');

// products.value = all_products;



</script>

<style scoped>

</style>
<template>
 <div class=" min-h-screen p-5">

  <UCarousel v-slot="{ item }" :items="items" :ui="{ item: 'basis-full' }" class="rounded-lg overflow-hidden" arrows>
    <img :src="item" class="w-full" draggable="false">
  </UCarousel>

  <!-- best deals for your 2morrow -->
  <h2 class=" font-bold text-xl my-3">Best Deals for you today</h2>

<div class=" flex flex-row flex-wrap gap-3 mt-4">
    <MasonryWall
    :items="products"
    :ssr-columns="1"
    :column-width="130"
    :gap="10"
    >
      <template #default="{ item, index }">
        <ProductCard class=" mt-[15px]"
          :has-liked-button="false"
          :id="item._id"
          :product_image="item.images[0]"
          :product_price="item.price"
          :image_url="item.images[0]"
          :views="item.views"
          :product_slug="item.slug"
        />
      </template>
    </MasonryWall>
  </div>

  <!-- {{ products }} -->
   <!--  <ProductCard
        v-for="(product, index) in products.products" :key="index"
        :has-liked-button="false"
        :id="product._id"
        :product_image="product.images[0]"
        :product_price="product.price"
        :image_url="product.images[0]"
        :views="product.views"
        :product_slug="product.slug"
        /> -->
  <!-- </div> -->

 </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useAsyncData, useHead } from '#imports';

const items = [
  'https://picsum.photos/1920/1080?random=1',
  'https://picsum.photos/1920/1080?random=2',
  'https://picsum.photos/1920/1080?random=3',
  'https://picsum.photos/1920/1080?random=4',
  'https://picsum.photos/1920/1080?random=5',
  'https://picsum.photos/1920/1080?random=6'
]

const config = useRuntimeConfig()


const v = ref('')
const options = ['Apple', 'Banana', 'Blueberry', 'Grapes', 'Pineapple', 'りんご']
const vegetables = ['Aubergine', 'Broccoli', 'Carrot', 'Courgette', 'Leek']
// const products = ref([]); // Ensure it's a ref (reactive)


// Fetch and extract only the `products` array
const { data: products, error } = await useAsyncData('products', async () => {
  const response = await $fetch(`${config.public.apiBase}/products`)
  return response.products // Extracting the nested products array
})

console.log("Fetched products:", products.value)

</script>

<style scoped>

</style>
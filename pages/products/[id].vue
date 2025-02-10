<template>
     <Head>
      <Title>{{ product.name }}</Title>
      <Meta name="description" :content="product.description" />
      <Meta name="ogTitle" :content="product.name" />
      <Meta name="ogDescription" :content="product.description" />
      <Meta v-if="product" name="ogImage" :content="product?.images[0]" />
    </Head>
    <div>
        <h1>A product page for {{ route.params }}</h1><br/>
        <img v-if="product" :src="product?.images[0]" class="size-[200px]"/>
        <p>{{ product.name }}</p>
        <span>{{ product }}</span>
    </div>
</template>
<!-- 66d723e686ae1bb074c8ef47 -->
<!-- <script setup>
const route = useRoute();
const { data: product } = await useFetch(`http://localhost:8000/api/products/66d723e686ae1bb074c8ef47`);

</script>
 -->
<script>
export default {
    data() {
        return {
            route: useRoute(),
            product: '',
            useHead,
        }
    },

    methods: {
        async getProduct(){
            try{
                const response = await $fetch(`https://wha-sell-api.vercel.app/api/products/${this.route.params.id}`);
                this.product = response.product;
                
                console.log("response from fetch: ", response);
            }catch(error){
                console.log("error getting product: ", error);
            }
        },
    },

    created() {
        this.getProduct();

  /*       useSeoMeta({
            title: this.product?.name,
            ogTitle: 'My Amazing Site',
            description: 'This is my amazing site, let me tell you all about it.',
            ogDescription: 'This is my amazing site, let me tell you all about it.',
            ogImage: 'https://example.com/image.png',
            twitterCard: 'summary_large_image',
        }); */
       
    },
};
</script>

<style scoped>

</style>
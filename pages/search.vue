<template>
    <div>

    </div>
    <div class=" flex flex-col md:flex-row gap-4">
        <div class=" flex flex-col w-full md:w-[300px] gap-3">
            <div class="flex justify-between items-center">
                <h1 class=" font-bold text-2xl">Filters</h1>
                <UButton
                    @click="filter_box = !filter_box"
                    class="md:hidden"
                    color="green"
                    variant="soft"
                    icon="iconoir:filter-list"
                    :label="filter_box ? 'Hide Filters' : 'Show Filters'"
                />
            </div>

            <div v-if="filter_box">

                <!-- LOCATION -->
                <div class=" filter_section">
                    <span class="font-bold">Location</span>
                    <select class="p-3 border rounded-md dark:border-gray-600">
                        <option value="" diabled>Select Location</option>
                    </select>
                </div>


                <!-- PRICE -->
                <div class=" filter_section">
                    <span class="font-bold">Price</span>
                    <div class=" flex gap-3">
                        <NumberInput :model-value="price_filter.min" />
                        <NumberInput :model-value="price_filter.max" />
                    </div>
                    <div class=" flex flex-col gap-3 p-5">
                        <label v-for="price in default_prices" class=" flex gap-6">
                            <input type="radio" id="prices" name="prices" :value="price" />
                            <span>{{ price.text }}</span>
                        </label>
                    </div>
                </div>


                <!-- CONDITION -->
                <div class=" filter_section">
                    <span class="font-bold">Condition</span>
                    <select class="p-3 border rounded-md dark:border-gray-600">
                        <option value="" diabled>Select Condition</option>
                        <option v-for="item in product_condition" :value="item">{{ item }}</option>
                    </select>
                </div>


                <!-- VERIFIED SELLER? -->
                <div class=" filter_section">
                    <span class="font-bold">Seller Type</span>
                    <select class="p-3 border rounded-md dark:border-gray-600">
                        <option value="" diabled>Select Type</option>
                        <option v-for="item in sellers" :value="item">{{ item }}</option>
                    </select>
                </div>
            </div>

        </div>
        <div class=" flex flex-col flex-1">
            <div class=" flex flex-wrap gap-1">
                <span class="font-bold my-6">{{ results?.length }} Results found for {{ useRoute().query.find }} in
                    products</span>
            </div>

            <!-- PRODUCTS -->
            <div class="flex flex-wrap gap-3 max-h-screen">
                <USkeleton v-if="loading" v-for="glip in 5" class=" flex-1 w-[130px] h-[200px] min-w-[130px]"
                    :ui="{ background: 'dark:bg-gray-700' }" />
                <div v-if="!loading && results.length > 0" class=" flex flex-row flex-wrap gap-3">
                    <MasonryWall :items="results" :ssr-columns="1" :column-width="130" :gap="10">
                        <template #default="{ item, index }">
                            <ProductCard class=" mt-[15px]" :has-liked-button="true" :id="item._id"
                                :product_price="(item.price).toLocaleString()" :image_url="item.images[0]"
                                :views="item.views" :is_liked="checkLikes(item._id)" :product_slug="item.slug" />
                        </template>
                    </MasonryWall>
                </div>

                <div class=" flex flex-col gap-6" v-if="!loading && results.length == 0">
                    <span>No exact match found for {{ useRoute().query.find }}, other results:</span>

                    <div class="flex flex-row flex-wrap gap-3">
                        <MasonryWall :items="alt_result" :ssr-columns="1" :column-width="130" :gap="10">
                            <template #default="{ item, index }">
                                <ProductCard class=" mt-[15px]" :has-liked-button="true" :id="item._id"
                                    :product_price="(item.price).toLocaleString()" :image_url="item.images[0]"
                                    :views="item.views" :is_liked="checkLikes(item._id)" :product_slug="item.slug" />
                            </template>
                        </MasonryWall>
                    </div>
                </div>

            </div>

            <!-- GLIPS -->
            <span v-if="!loading && glip_results.length > 0" class="font-bold my-6">{{ glip_results?.length }} Results
                found for {{
                    useRoute().query.find }} in Glips</span>
            <div class="flex flex-wrap gap-3 max-h-screen">
                <USkeleton v-if="loading" v-for="glip in 5" class=" flex-1 w-[130px] h-[200px] min-w-[130px]"
                    :ui="{ background: 'dark:bg-gray-700' }" />
                <GlipCard v-if="!loading && glip_results.length > 0" :item="item" v-for="item in glip_results" />
            </div>
        </div>
    </div>
    <!-- 
    <USkeleton v-if="loading_glips" v-for="glip in 10" class=" flex-1 w-[130px] h-[200px] min-w-[130px]"
    :ui="{ background: 'dark:bg-gray-700' }" /> -->
</template>

<script setup>

const product_condition = [
    "brand new",
    "fairly used",
    "refurbished",
    "refurbished by manufacturer"
]

const sellers = [
    "verified",
    "unverified"
]

const default_prices = [
    { min: 0, max: 50000, text: 'Under 50K' },
    { min: 50000, max: 100000, text: '50k - 100K' },
    { min: 300000, max: 500000, text: '300K - 500K' },
    { min: 300000, max: 10000000, text: 'More than 300K' },
]

const price_filter = reactive({
    min: 0,
    max: 0,
})
const filter_box = ref(true);
const condition_filter = ref('')
const seller_filter = ref('')
const location_filter = ref('')

const results = ref([]);
const glip_results = ref([]);
const alt_result = ref([])
const loading = ref(false);

const searchProducts = async (keyword) => {
    loading.value = true;
    try {
        const res = await useNuxtApp().$apiFetch(`/products/search/product?keyword=${keyword}`);
        results.value = res.products;
        glip_results.value = res.glips;

        if (res.products.length == 0) {
            alt_result.value = res.alternate_products
        }
        console.log('results: ', res)
    } catch (error) {
        console.log(error);
    }
    loading.value = false;
}



const user = ref(null);
const credits = ref(0);
const liked_products = ref([]);
const getUserDetails = async () => {
    try {
        const res = await useNuxtApp().$apiFetch(`/user`);
        user.value = res.user;
        credits.value = res.credits;
        liked_products.value = res.user.liked_products;
        console.log('user: ', res)
    } catch (error) {
        console.log(error);
    }
}
getUserDetails();

const checkLikes = (product_id) => {
    if (liked_products.value.includes(product_id)) {
        return true;
    } else {
        return false;
    }
};

// watch changes in route query and search for products
watch(() => useRoute().query.find, (newQuery, oldQuery) => {
    console.log('query changed: ', oldQuery, '>', newQuery);
    searchProducts(newQuery);
}, { immediate: true });

onMounted(() => {
    searchProducts(useRoute().query.find);
})

results.value = useRoute().state?.results || [];
</script>

<style scoped>
.filter_section {
    @apply flex flex-col p-3 dark:bg-gray-900 border dark:border-gray-600 rounded-md gap-3 my-3
}
</style>
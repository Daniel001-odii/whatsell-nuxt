<template>
  <div class="flex flex-col gap-3 h-fit py-3">
<!-- {{ user }} -->
<div v-if="user && user.account_type == 'seller'" class=" flex flex-col gap-6">
  <div class=" flex flex-wrap gap-3">
    <div class=" stat_box">
      <UButton
      size="2xs"
      color="gray"
      icon="hugeicons:user-check-01"
      label="Follower Count"
      variant="link"
      />
      <b class=" text-3xl">{{ shop_insights.followers_count }}</b>
    </div>
    <div class=" stat_box">
      <UButton
      size="2xs"
      color="gray"
      icon="hugeicons:delivery-view-01"
      label="Product Views"
      variant="link"
      />
      <b class=" text-3xl">{{ shop_insights?.shop?.views }}</b>
    </div>
    <div class="stat_box">
      <UButton
      size="2xs"
      color="gray"
      icon="hugeicons:inbox-upload"
      label="Sold products"
      variant="link"
      />
      <b class=" text-3xl">{{ shop_insights?.shop?.sold_products }}</b>
    </div>
  </div>

  <!-- CHARTS -->
  
  <div class=" mt-2 flex flex-col rounded  dark:border-gray-600 border p-5">
    <span class="font-bold">Followers</span>
    <Bar 
    v-if="bar_chart.labels" 
    :data="bar_chart" 
    :options="chart_options" 
    />
  </div>



<!-- {{ shop_insights }} -->
</div>
<div v-else class="p-8 border flex flex-col rounded-lg text-center dark:border-gray-600 text-gray-400">
    <i class="bi bi-graph-up-arrow mb-2 text-4xl"></i>
    <span>Your Insights will be available when you create your shop</span>
</div>


</div>
</template>

<script setup>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js'
ChartJS.register(
    CategoryScale, 
    LinearScale, 
    BarElement, 
    Title, 
    Tooltip, 
    Legend, 
    ArcElement,
    PointElement,
    LineElement);
import { Bar } from 'vue-chartjs'
import { Doughnut } from 'vue-chartjs'
import { Line } from 'vue-chartjs'

// use headless layout
definePageMeta({
  layout: 'accounts',
})
const chart_data = reactive({
  labels: ['January', 'February', 'March'],
  datasets: [{ data: [40, 20, 12] }]
})
const chart_options = {
  responsive: true
}

const user = ref('');
const getUserDetails = async()=> {
    try {
        const res = await useNuxtApp().$apiFetch(`/user`);
        user.value = res.user;
    } catch (error) {
        console.log(error);
    }
}

const analytics = reactive({
  followers_count: '',

});
const shop_insights = ref(null);
const bar_chart = reactive({
  labels: '',
  datasets: [],
})

const getShopInsights = async()=>{
  try{
    const res = await useNuxtApp().$apiFetch('/shops/data/analytics');
    shop_insights.value = res;
    bar_chart.labels = res.chart_data.labels;
    bar_chart.datasets = res.chart_data.datasets;
    bar_chart.datasets[0].label = "Monthly followers"
  }catch(err){
    console.log(err)
  }
}
getShopInsights();



onMounted(()=>{
  getUserDetails();
})
</script>

<style scoped>
.stat_box{
  @apply h-[120px] flex-1 border dark:border-gray-600 rounded-md flex flex-col gap-4 p-5
}
</style>
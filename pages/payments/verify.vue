<template>
    <div class=" flex flex-col items-center justify-center h-screen text-center">
        <!-- {{ route.query.reference[1] }} -->
        <div v-if="payment_status === null" class=" flex flex-col items-center justify-center ">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><!-- Icon from SVG Spinners by Utkarsh Verma - https://github.com/n3r4zzurr0/svg-spinners/blob/main/LICENSE --><g><rect width="2" height="5" x="11" y="1" fill="#FFA500" opacity=".14"/><rect width="2" height="5" x="11" y="1" fill="#FFA500" opacity=".29" transform="rotate(30 12 12)"/><rect width="2" height="5" x="11" y="1" fill="#FFA500" opacity=".43" transform="rotate(60 12 12)"/><rect width="2" height="5" x="11" y="1" fill="#FFA500" opacity=".57" transform="rotate(90 12 12)"/><rect width="2" height="5" x="11" y="1" fill="#FFA500" opacity=".71" transform="rotate(120 12 12)"/><rect width="2" height="5" x="11" y="1" fill="#FFA500" opacity=".86" transform="rotate(150 12 12)"/><rect width="2" height="5" x="11" y="1" fill="#FFA500" transform="rotate(180 12 12)"/><animateTransform attributeName="transform" calcMode="discrete" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;30 12 12;60 12 12;90 12 12;120 12 12;150 12 12;180 12 12;210 12 12;240 12 12;270 12 12;300 12 12;330 12 12;360 12 12"/></g></svg>
            <h1  class=" text-2xl font-bold">Verifying payment...</h1>
        </div>

        <div v-else-if="payment_status === 'failed'" class=" flex flex-col items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><!-- Icon from Huge Icons by Hugeicons - undefined --><path fill="none" stroke="#FF0000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m15.75 15l-6-6m0 6l6-6m7 3c0-5.523-4.477-10-10-10s-10 4.477-10 10s4.477 10 10 10s10-4.477 10-10" color="#FF0000"/></svg>
            <h1 class=" text-2xl font-bold">Payment verification failed</h1>
            <p>something went wrong...</p>
        </div>

        <div v-else-if="payment_status === 'success'" class=" flex flex-col items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><!-- Icon from Huge Icons by Hugeicons - undefined --><g fill="none" stroke="#00FF00" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" color="#00FF00"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12s4.477 10 10 10s10-4.477 10-10"/><path d="m8 12.5l2.5 2.5L16 9"/></g></svg>
            <h1 class=" text-2xl font-bold">Payment verification successful</h1>
            <p>Thank you for your purchase</p>
        </div>
        
        <h1 v-else class=" text-2xl font-bold">Payment {{ payment_status }}</h1>
    </div>
</template>

<script setup>
// http://localhost:8000/api/products/verify/product_payment?reference=CHECKOUT_66dc10224a0997906604025e_1746918928846,CHECKOUT_66dc10224a0997906604025e_1746918928846
const route = useRoute();
// http://localhost:3000/payments/verify?reference=CHECKOUT_66dc10224a0997906604025e_1746918928846&reference=CHECKOUT_66dc10224a0997906604025e_1746918928846&trxref=CHECKOUT_66dc10224a0997906604025e_1746918928846
// const reference = ref(route.query.reference);

const payment_status = ref(null);

const verifyPayment = async () => {
   try{
    const res = await useNuxtApp().$apiFetch(`/products/verify/product_payment?reference=${route.query.reference[0]}`);
    console.log(res);
    payment_status.value = res.data.status;
   } catch(error){
    console.log(error);
    payment_status.value = "failed";
   }
}

onMounted(async () => {
    await verifyPayment();
});

</script>

<style lang="scss" scoped>

</style>
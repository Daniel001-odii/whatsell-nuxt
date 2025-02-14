<template>
    <div>
        <h1 class=" text-3xl font-bold py-5">{{ route.params.category }}</h1>
    </div>
</template>

<script setup>
import { useRoute, useAsyncData, useHead } from '#imports';
const route = useRoute();



</script>

<style scoped>

</style>
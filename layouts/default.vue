<template>
    <div class=" dark:bg-[#21262d]">
        <TheNavbar/>
        <div class=" container mx-auto p-3 min-h-screen">
            <!-- <div class=" font-bold text-xl capitalize my-4">{{ useRoute().path }}</div> -->
            <slot/>
        </div>
        <TheFooter/>
    </div>
</template>

<script setup></script>

<style scoped>

</style>
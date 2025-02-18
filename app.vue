<template>
<NuxtLayout>
  <UNotifications />
  <!-- <div class=" dark:bg-[#21262d]"> -->
    <!-- <TheNavbar/> -->
    <div class=" container mx-auto">
      <NuxtPage />
    </div>
    <!-- <TheFooter/> -->
  <!-- </div> -->
</NuxtLayout>
</template>
<script setup>

</script>


<style>
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css");

.form-input{
    @apply w-full  rounded-md p-3 shadow-md shadow-[#E0F6EA] hover:bg-app_light_green outline-none border
}

.divider-tab{
    @apply font-bold p-3 border rounded-lg mt-6 capitalize text-green-700
}
</style>

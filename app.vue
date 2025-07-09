<template>
<!-- <div class="dark:bg-[#21262d]"> -->
  <div class="">
<NuxtLayout>
  <UNotifications />
    <div class=" ">
      <NuxtPage />
    </div>
</NuxtLayout>
</div>
</template>
<script setup>
import { onMounted } from 'vue'


useHead({
  script: [
    {
      async: true,
      src: "https://www.googletagmanager.com/gtag/js?id=G-TNS7YNXYQB"
    },
    {
      innerHTML: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){ dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', 'G-TNS7YNXYQB');
      `,
      type: "text/javascript"
    }
  ],
  __dangerouslyDisableSanitizersByTagID: {
    'google-analytics': ['innerHTML']
  }
});


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

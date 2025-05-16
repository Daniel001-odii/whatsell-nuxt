<template>
    <div class="flex flex-1 relative min-w-[300px] h-fit bg-gray-50 dark:bg-gray-900 rounded-lg flex-col overflow-hidden border-4 border-[#00C1F6]">
     <RouterLink :to="`/shops/${name}`">
         <div class=" h-[200px] lg:h-[300px] w-full relative bg-green-100" :style="`background-image:url(${image_url})`" style="background-position: center; background-repeat: no-repeat; background-size: cover;">
             <span class="absolute right-6 top-4 rounded-full size-[40px] flex justify-center items-center text-white bg-[#00C1F6]">
                 <i class="bi bi-rocket-takeoff-fill"></i>
             </span>
         </div>
     </RouterLink>
         <div class=" h-[30%] w-full p-8">
             <p class="font-bold text-lg">{{ name }}</p>
             <p class=" text-gray-400">{{ category }}</p>
             <RouterLink :to="`/shops/${name}`">
                 <button class="rounded-full bg-[#00C1F6] text-white p-3 px-6 mt-6">Shop Now</button>
             </RouterLink>
         </div>
     </div>
 </template>
 
 <script>
     export default {
         name: "BoostedShopCard",
         props: {
             name: '',
             category: '',
             image_url: '',
         }
     }
 </script>
 
 <style scoped>
 .status-tag{
     /* background: linear-gradient(light-orange, orange); */
 }
 </style>
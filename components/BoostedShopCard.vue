<template>
  <div
    class="flex flex-col md:flex-row w-full  min-h-[220px]  bg-white dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700"
  >
    <!-- Left: Image Side -->
    <RouterLink :to="`/shops/${name}`" class="md:w-1/2 w-full h-48 md:h-auto relative group">
      <div
        class="w-full h-full bg-green-100"
        :style="`background-image:url(${image_url}); background-position:center; background-size:cover; background-repeat:no-repeat;`"
      >
        <span
          class="absolute right-4 top-4 rounded-full size-[40px] flex justify-center items-center text-white bg-[#00C1F6] group-hover:scale-110 transition-transform"
        >
          <i class="bi bi-rocket-takeoff-fill"></i>
        </span>
        <div class="absolute inset-0 bg-gradient-to-t from-[#00C1F6]/60 to-transparent"></div>
      </div>
    </RouterLink>

    <!-- Right: Details Side -->
    <div class="flex flex-col justify-between md:w-1/2 w-full p-6 bg-white dark:bg-gray-900">
      <div>
        <p class="font-extrabold text-2xl text-[#00C1F6] mb-1 truncate">{{ name }}</p>
        <p class="text-gray-500 dark:text-gray-300 text-sm mb-4">{{ category }}</p>
        <p class="text-gray-700 dark:text-gray-200 text-base mb-6">
          🚀 <span class="font-semibold text-[#00C1F6]">Boosted Shop!</span> Enjoy premium visibility and exclusive features. Want your shop to stand out? <span class="font-semibold">Boost now</span> and attract more buyers!
        </p>
      </div>
      <RouterLink :to="`/shops/${name}`">
        <button
          class="rounded-full bg-[#00C1F6] hover:bg-[#009eae] text-white font-semibold py-2 px-6 transition-colors w-full md:w-auto"
        >
          Shop Now
        </button>
      </RouterLink>
    </div>
  </div>
</template>

<script>
export default {
  name: "BoostedShopCard",
  props: {
    name: {
      type: String,
      required: true,
      default: '',
    },
    category: {
      type: String,
      required: true,
      default: '',
    },
    image_url: {
      type: String,
      required: true,
      default: '',
    },
  },
};
</script>

<style scoped>
/* Add any custom styles if needed */
</style>
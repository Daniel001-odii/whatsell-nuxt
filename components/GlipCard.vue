<template>
  <div
    @click="useRouter().push(`/glips/${item?._id}?id=${item?._id}`)"
    :style="`background-image: url(${
      item?.thumbnail || item?.shop?.profile?.image_url
    })`"
    class="bg-center bg-no-repeat bg-cover overflow-hidden relative flex-1 md:flex-0 md:max-w-[130px] w-[130px] h-[200px] min-w-[130px] flex justify-center items-center rounded-lg bg-gray-500"
  >
    <div
      class="absolute bottom-2 text-sm left-0 px-2 text-white [text-shadow:_0_2px_8px_#000]"
    >
      {{ item?.name }}
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    return {};
  },
  props: {
    item: Object,
  },
};
</script>

<style lang="scss" scoped></style>

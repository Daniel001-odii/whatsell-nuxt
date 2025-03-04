<template>
  <div v-if="isOpen" @click.self="close"
    class=" bg-white dark:bg-gray-800  h-[90vh] fixed z-[9] top-[0] md:top-1/2 left-1/2 -translate-x-1/2 md:-translate-y-1/2 w-full md:w-[90vw] md:p-5 flex justify-center items-end md:items-center border rounded-lg dark:border-gray-600">
    <UButton color="green" class="absolute top-5 left-5 z-10 rounded-full" icon="material-symbols:chevron-left" variant="soft"
      @click="close" />

    <!-- MUTE AUDIO BUTTON -->
    <!-- <div class="absolute top-5 left-5 p-5 z-10">
      <button @click="close" class=" bg-black bg-opacity-50 rounded-full p-4 justify-center items-center">
        <i class="bi bi-chevron-left"></i>
      </button>
    </div>
 -->
    <div class="md:w-fit w-full overflow-y-auto h-[100%] inner">
      <!-- {{ glips }} -->
      <GlipComponent v-for="(item, index) in glips.glips" :key="index" 
      :video-src="item.video_url" 
      :glip="item" 
      :shop="glips.shop"
      />
    </div>
  </div>
</template>

<script setup>
// import { ref, defineProps, defineEmits } from 'vue';
// import { onMounted, onUnmounted } from 'vue';

/* export default {
    props: {
        glips: {
            required: true,
        },
        isOpen: {
          type: Boolean,
          required: true,
        },
    },
  }
    setup(){ */


// Props to control the modal
const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  glips: {
    required: true,
  },
});

const emit = defineEmits(['close']);

// Close modal function
const close = () => {
  emit('close');
};

// Optional: Close on ESC key
const handleEscape = (event) => {
  if (event.key === 'Escape' && props.isOpen) {
    close();
  }
};

// Add and clean up event listener
onMounted(() => document.addEventListener('keydown', handleEscape));
onUnmounted(() => document.removeEventListener('keydown', handleEscape));
// }
</script>

<style scoped>
/* .reels-container{
    @apply h-[93vh] overflow-y-auto fixed z-[9] top-[0] md:top-1/2 left-1/2 -translate-x-1/2 md:-translate-y-1/2 w-full md:w-fit
} */
.inner {
  scroll-snap-type: y mandatory;
}

.inner {
  overflow: auto;
  /* or scroll */
  scrollbar-width: none;
  /* For Firefox */
  -ms-overflow-style: none;
  /* For Internet Explorer and Edge */
}

.inner::-webkit-scrollbar {
  display: none;
  /* For Chrome, Safari, and newer Edge */
}
</style>
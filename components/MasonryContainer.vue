<!-- MasonryLayout.vue -->
<template>
    <div ref="masonryContainer" class="masonry-container">
      <div v-for="(item, index) in items" :key="index" class="masonry-item">
        <slot :item="item" :index="index">
          <!-- Default content if no slot is provided -->
          <div class="card">
            <img v-if="item.image" :src="item.image" :alt="item.title || `Item ${index}`">
            <div class="card-content">
              <h3 v-if="item.title">{{ item.title }}</h3>
              <p v-if="item.description">{{ item.description }}</p>
            </div>
          </div>
        </slot>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted, watch } from 'vue';
  
  // Props
  const props = defineProps({
    items: {
      type: Array,
      required: true,
      default: () => []
    },
    columnWidth: {
      type: Number,
      default: 300 // Default minimum column width in pixels
    },
    gap: {
      type: Number,
      default: 20 // Gap between items in pixels
    }
  });
  
  // Refs
  const masonryContainer = ref(null);
  
  // Calculate and update columns based on container width
  const updateColumns = () => {
    if (!masonryContainer.value) return;
    
    const containerWidth = masonryContainer.value.offsetWidth;
    const columns = Math.floor(containerWidth / (props.columnWidth + props.gap));
    const calculatedWidth = (containerWidth - (columns - 1) * props.gap) / columns;
    
    masonryContainer.value.style.columnWidth = `${calculatedWidth}px`;
    masonryContainer.value.style.columnGap = `${props.gap}px`;
  };
  
  // Handle resize
  let resizeObserver = null;
  onMounted(() => {
    updateColumns();
    
    resizeObserver = new ResizeObserver(() => {
      updateColumns();
    });
    
    if (masonryContainer.value) {
      resizeObserver.observe(masonryContainer.value);
    }
  });
  
  onUnmounted(() => {
    if (resizeObserver && masonryContainer.value) {
      resizeObserver.unobserve(masonryContainer.value);
    }
  });
  
  // Watch for items changes
  watch(() => props.items, () => {
    nextTick(() => updateColumns());
  });
  </script>
  
  <style scoped>
  .masonry-container {
    columns: auto;
    column-gap: 20px;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
  }
  
  .masonry-item {
    break-inside: avoid;
    margin-bottom: 20px;
  }
  
  .card {
    background: #fff;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .card img {
    width: 100%;
    height: auto;
    display: block;
  }
  
  .card-content {
    padding: 15px;
  }
  
  h3 {
    margin: 0 0 10px 0;
    font-size: 1.1rem;
  }
  
  p {
    margin: 0;
    color: #666;
  }
  </style>
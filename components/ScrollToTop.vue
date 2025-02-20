<template>
    <div>
      <button
        v-if="isVisible"
        @click="scrollToTop"
        class="z-50 fixed bottom-20 right-5 bg-app_green text-white border-2 border-app_green size-12 rounded-full shadow-lg transition-all duration-300"
      >
         <i class="bi bi-arrow-up"></i>
      </button>
    </div>
  </template>
  
  <script>
  export default {
    name: "ScrollToTop",
  
    data() {
      return {
        isVisible: false, // Determines whether the button is visible
      };
    },
  
    methods: {
      scrollToTop() {
        // Smoothly scrolls to the top of the page
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      },
  
      handleScroll() {
        // Show the button when scrolled down 200px or more
        this.isVisible = window.scrollY > 200;
      },
    },
  
    mounted() {
      // Attach the scroll event listener
      window.addEventListener("scroll", this.handleScroll);
    },
  
    beforeUnmount() {
      // Clean up the event listener
      window.removeEventListener("scroll", this.handleScroll);
    },
  };
  </script>
  
  <style scoped>
  /* Optional styles for the scroll-to-top button */
  </style>
  
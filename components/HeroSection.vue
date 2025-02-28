<!-- components/HeroSection.vue -->
<template>
    <ClientOnly>
      <!-- <section class="hero bg-gradient-to-r from-green-500 to-green-700 rounded-lg"> -->
      <section class="hero bg-app_green rounded-lg">
        <div class="hero-content">
          <div class="hero-text">
            <h1 ref="title" class="title">{{ currentTitle }}</h1>
            <p ref="subtitle" class="subtitle">Shop smarter, live better.</p>
            <button ref="cta" class="cta-button bg-black">Explore Now</button>
          </div>
          <div class="hero-images">
            <img
              ref="currentImg"
              :src="currentImage"
              alt="Featured item"
              class="hero-img"
            />
          </div>
        </div>
      </section>
    </ClientOnly>
  </template>
  
  <script>
  import { defineComponent, onMounted, ref, onUnmounted, nextTick } from 'vue';
  import { gsap } from 'gsap';
  import heroImage1 from '@/assets/images/hero/hero_image_1.jpg';
import heroImage2 from '@/assets/images/hero/hero_image_2.jpg';
import heroImage3 from '@/assets/images/hero/hero_image_3.jpg';

  export default defineComponent({
    setup() {
      // Refs for DOM elements
      const title = ref(null);
      const subtitle = ref(null);
      const cta = ref(null);
      const currentImg = ref(null);
  
      // Dynamic content
      const titles = [
        'Discover Your Style',
        'Fast Delivery, Always',
        'Endless Variety Awaits',
      ];
      const images = [heroImage1, heroImage2, heroImage3];
       /*  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=600&q=80',
      ]; */
      const currentTitle = ref(titles[0]);
      const currentImage = ref(images[0]);
      let animationInterval = null;
  
      onMounted(async () => {
        // Wait for DOM to be fully ready
        await nextTick();
  
        if (!title.value || !currentImg.value) {
          console.warn('HeroSection: Refs not ready for animation');
          return;
        }
  
        // Initial animation
        const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
        tl.from(title.value, { y: -30, opacity: 0, duration: 0.8 })
          .from(subtitle.value, { y: 20, opacity: 0, duration: 0.6 }, '-=0.4')
          .from(cta.value, { scale: 0.9, opacity: 0, duration: 0.5 }, '-=0.3')
          .from(currentImg.value, { x: 50, opacity: 0, duration: 0.7 }, '-=0.5');
  
        // Cycle content every 3 seconds
        let index = 1;
        animationInterval = setInterval(() => {
          const nextTitle = titles[index % titles.length];
          const nextImage = images[index % images.length];
  
          // Animate title out and in
          gsap.to(title.value, {
            y: 20,
            opacity: 0,
            duration: 0.5,
            ease: 'power4.in',
            onComplete: () => {
              currentTitle.value = nextTitle;
              gsap.fromTo(
                title.value,
                { y: -20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, ease: 'power4.out' }
              );
            },
          });
  
          // Animate image out and in
          gsap.to(currentImg.value, {
            x: -50,
            opacity: 0,
            duration: 0.5,
            ease: 'power4.in',
            onComplete: () => {
              currentImage.value = nextImage;
              gsap.fromTo(
                currentImg.value,
                { x: 50, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.5, ease: 'power4.out' }
              );
            },
          });
  
          index++;
        }, 5000); // Changed to 3 seconds
      });
  
      onUnmounted(() => {
        if (animationInterval) clearInterval(animationInterval);
      });
  
      return { title, subtitle, cta, currentImg, currentTitle, currentImage };
    },
  });
  </script>
  
  <style scoped>
  .hero {
    max-height: 300px;
    /* background: linear-gradient(120deg, #1e3c72 0%, #2a5298 100%); */
    padding: 1rem;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .hero-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 1200px;
  }
  
  .hero-text {
    color: #fff;
    flex: 1;
    padding: 1rem;
  }
  
  .title {
    font-size: 2.5rem;
    font-weight: 800;
    line-height: 1.1;
    margin-bottom: 0.5rem;
  }
  
  .subtitle {
    font-size: 1rem;
    opacity: 0.9;
    margin-bottom: 1rem;
  }
  
  .cta-button {
    padding: 0.6rem 1.5rem;
    font-size: 1rem;
    /* background-color: #ff6f61; */
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: transform 0.3s, background-color 0.3s;
  }
  
  .cta-button:hover {
    background-color: #e65b50;
    transform: scale(1.05);
  }
  
  .hero-images {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    width: 400px;
    height: 250px;
  }
  
  .hero-img {
    object-fit: cover;
    border-radius: 12px;
    /* box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2); */
  }
  </style>
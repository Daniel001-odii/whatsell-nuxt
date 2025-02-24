<template>
    <div class="video-reel" ref="videoContainer">
      <video
        ref="video"
        :src="videoSrc"
        @timeupdate="updateProgress"
        @error="handleError"
        loop
      ></video>
      <div class="controls">
        <button @click="togglePlay">
          {{ userPaused ? 'Play' : 'Pause' }}
        </button>
        <progress :value="progress" max="100"></progress>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      videoSrc: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        isInView: false,
        userPaused: false,
        progress: 0,
        observer: null,
      };
    },
    computed: {
      shouldPlay() {
        return this.isInView && !this.userPaused;
      },
    },
    watch: {
      shouldPlay(newVal) {
        const video = this.$refs.video;
        if (newVal) {
          video.play().catch((err) => {
            console.error('Error playing video:', err);
          });
        } else {
          video.pause();
        }
      },
    },
    mounted() {
      const options = {
        root: null, // Use the viewport as the root
        threshold: 0.5, // Trigger when 50% of the video is visible
      };
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          this.isInView = entry.isIntersecting;
        });
      }, options);
      this.observer.observe(this.$refs.videoContainer);
    },
    beforeDestroy() {
      if (this.observer) {
        this.observer.disconnect();
      }
    },
    methods: {
      togglePlay() {
        this.userPaused = !this.userPaused;
      },
      updateProgress() {
        const video = this.$refs.video;
        if (video.duration) {
          this.progress = (video.currentTime / video.duration) * 100;
        }
      },
      handleError() {
        console.error('Failed to load video:', this.videoSrc);
        // Optionally emit an event to the parent or show an error UI
      },
    },
  };
  </script>
  
  <style scoped>
  .video-reel {
    height: 100vh;
    scroll-snap-align: start;
    position: relative;
  }
  
  .video-reel video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .controls {
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  button {
    padding: 5px 10px;
  }
  
  progress {
    width: 70%;
  }
  </style>
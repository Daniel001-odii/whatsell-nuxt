<template>
    <div class="stories-container">
      <div
        v-for="(story, index) in stories"
        :key="index"
        class="story"
        :class="{ active: activeStoryIndex === index }"
        ref="storyRefs"
      >
        <!-- Video Element -->
        <video
          ref="videoRefs"
          :src="story.url"
          @loadedmetadata="handleVideoLoaded"
          @timeupdate="handleTimeUpdate"
          @ended="handleVideoEnd"
          @click="handleStoryClick"
          muted
        ></video>
  
        <!-- Play/Pause Icon -->
        <div v-if="isPaused" class="play-pause-icon" @click.stop="handleStoryClick">
          <i class="bi bi-play-circle-fill"></i>
        </div>
  
        <!-- Mute/Unmute Button -->
        <div class="mute-unmute-icon" @click.stop="toggleMute">
          <i :class="isMuted ? 'bi bi-volume-mute-fill' : 'bi bi-volume-up-fill'"></i>
        </div>
  
        <!-- Progress Bar -->
        <div class="progress-bar">
          <div
            class="progress"
            :style="{ width: progressWidths[index] + '%' }"
          ></div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';

const props = defineProps({
  stories: {
    type: Array,
    required: true,
    validator: (value) => {
      return value.every((story) => story.url && typeof story.url === 'string');
    },
  },
});

const activeStoryIndex = ref(0);
const videoRefs = ref([]);
const storyRefs = ref([]);
const progressWidths = ref(props.stories.map(() => 0));
const isPaused = ref(false);
const isMuted = ref(false);

// Play the active video
const playActiveVideo = () => {
  if (videoRefs.value[activeStoryIndex.value]) {
    videoRefs.value[activeStoryIndex.value].play();
    isPaused.value = false;
  }
};

// Pause the active video
const pauseActiveVideo = () => {
  if (videoRefs.value[activeStoryIndex.value]) {
    videoRefs.value[activeStoryIndex.value].pause();
    isPaused.value = true;
  }
};

// Handle video end
const handleVideoEnd = () => {
  if (activeStoryIndex.value < props.stories.length - 1) {
    // Move to the next story
    activeStoryIndex.value++;
    progressWidths.value[activeStoryIndex.value] = 0;
    scrollToStory(activeStoryIndex.value);
    playActiveVideo();
  } else {
    // Replay the current story
    replayVideo();
  }
};

// Replay the current video
const replayVideo = () => {
  if (videoRefs.value[activeStoryIndex.value]) {
    videoRefs.value[activeStoryIndex.value].currentTime = 0;
    playActiveVideo();
  }
};

// Handle video time update
const handleTimeUpdate = () => {
  const video = videoRefs.value[activeStoryIndex.value];
  if (video) {
    const progress = (video.currentTime / video.duration) * 100;
    progressWidths.value[activeStoryIndex.value] = progress;
  }
};

// Handle video metadata load
const handleVideoLoaded = () => {
  if (activeStoryIndex.value === 0) {
    playActiveVideo();
  }
};

// Handle story click (pause/play)
const handleStoryClick = () => {
  isPaused.value = !isPaused.value;
  if (isPaused.value) {
    pauseActiveVideo();
  } else {
    playActiveVideo();
  }
};

// Toggle mute/unmute
const toggleMute = () => {
  if (videoRefs.value[activeStoryIndex.value]) {
    videoRefs.value[activeStoryIndex.value].muted = !videoRefs.value[activeStoryIndex.value].muted;
    isMuted.value = videoRefs.value[activeStoryIndex.value].muted;
  }
};

// Scroll to the active story
const scrollToStory = (index) => {
  if (storyRefs.value[index]) {
    storyRefs.value[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

// Watch for active story changes
watch(activeStoryIndex, (newIndex, oldIndex) => {
  if (oldIndex !== null) {
    progressWidths.value[oldIndex] = 0;
    pauseActiveVideo();
  }
  scrollToStory(newIndex);
  playActiveVideo();
});

// Handle scroll events to pause videos out of view
const handleScroll = () => {
  const storiesContainer = document.querySelector('.stories-container');
  if (storiesContainer) {
    const { top, bottom } = storiesContainer.getBoundingClientRect();
    if (top > window.innerHeight || bottom < 0) {
      pauseActiveVideo();
    } else {
      playActiveVideo();
    }
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>


  <style scoped>
 .stories-container {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
  height: 100vh;
}

.story {
  scroll-snap-align: start;
  flex: 0 0 100vh;
  position: relative;
}

video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.progress-bar {
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  height: 4px;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
}

.progress {
  height: 100%;
  background-color: white;
  border-radius: 2px;
  transition: width 0.1s linear;
}

.play-pause-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 3rem;
  color: white;
  cursor: pointer;
  opacity: 0.8;
}

.play-pause-icon:hover {
  opacity: 1;
}

.mute-unmute-icon {
  position: absolute;
  bottom: 20px;
  right: 20px;
  font-size: 1.5rem;
  color: white;
  cursor: pointer;
  opacity: 0.8;
}

.mute-unmute-icon:hover {
  opacity: 1;
}
  </style>
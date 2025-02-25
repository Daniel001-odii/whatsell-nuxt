<template>
    <div class="video-reel md:rounded-lg overflow-hidden" ref="videoContainer">
        <video ref="video" @click="togglePlay" :src="videoSrc" @timeupdate="updateProgress" @error="handleError" loop
            playsinline webkit-playsinline  muted></video>

        <!-- MUTE AUDIO BUTTON -->
        <div class="absolute top-0 p-5">
            <button @click="toggleMute" class=" bg-black bg-opacity-50 rounded-full p-4 justify-center items-center">
                <i class="bi text-xl" :class="isMuted ? 'bi-volume-mute' : 'bi-volume-down'"></i>
            </button>
        </div>

        <!-- PAUSE PLAY BUTTON -->
        <transition name="fade">
            <div v-if="userPaused" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-125">
                <button @click="togglePlay" class=" bg-black bg-opacity-50 rounded-full size-14 justify-center items-center ">
                    <i class="bi bi-play-fill text-2xl"></i>
                </button>
            </div>
        </transition>

        <div class=" flex flex-col gap-3 absolute right-0 top-[55%] -translate-y-1/2 p-5">
            <button class=" bg-black bg-opacity-50 rounded-full p-4 justify-center items-center">
                <i class="bi bi-shop text-xl"></i>
            </button>
            <button class=" bg-black bg-opacity-50 rounded-full p-4 justify-center items-center">
                <i class="bi bi-share text-xl"></i>
            </button>
        </div>

        <!-- PRODUCT AND DESCRIPTION -->
        <div class="absolute flex flex-col gap-2 bottom-[0px] left-[0px] right-[0px] p-5 bottom-part">
            <span>Product Name</span>
            <span class=" font-bold text-2xl">NGN Product Price</span>
            <span>product description...</span>
            <UButton
            color="green"
            variant="solid"
            class=" w-full justify-center p-3 mb-4"
            label="Buy"
            />
            <!-- VID PROGRESS BAR -->
            <div>
                <UProgress color="green" size="sm" :value="progress" :max="100" />
            </div>
        </div>


       <!--  <div class="absolute bottom-[10px] left-[10px] right-[10px] flex items-center">
            
        </div> -->
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
            isMuted: true, // Initially muted
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

                // testing auto unmute.....
                video.muted = false;
                this.isMuted = false;
            } else {
                video.pause();
                video.muted = true;
                this.isMuted = true;
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
        toggleMute() {
            const video = this.$refs.video;
            video.muted = !video.muted;
            this.isMuted = video.muted;
        },

    },
};
</script>

<style scoped>
.video-reel {
    height: 100%;
    scroll-snap-align: start;
    position: relative;
}

.video-reel video {
    width: 100%;
    height: 100%;
    object-fit: cover;
}


button {
    padding: 5px 10px;
}

.bottom-part{
    background: rgb(7,104,184);
    background: linear-gradient(180deg, rgba(7,104,184,0) 0%, rgba(0,0,0,1) 100%);
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease-in-out, visibility 0.3s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    visibility: hidden;
}

.fade-enter-to,
.fade-leave-from {
    opacity: 1;
    visibility: visible;
}
</style>
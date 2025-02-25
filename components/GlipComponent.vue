<template>
    <div class="video-reel md:rounded-lg overflow-hidden" ref="videoContainer">
        <video ref="video" @click="togglePlay" :src="videoSrc" @timeupdate="updateProgress" @error="handleError" loop
            playsinline webkit-playsinline  muted></video>



        <!-- PAUSE PLAY BUTTON -->
        <transition name="fade">
            <div v-if="userPaused" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-125">
                <button @click="togglePlay"
                    class=" bg-black bg-opacity-50 rounded-full size-14 justify-center items-center ">
                    <i class="bi bi-play-fill text-2xl"></i>
                </button>
            </div>
        </transition>


        <!-- PRODUCT AND DESCRIPTION -->
        <div class="absolute flex flex-col gap-2 bottom-[0px] left-[0px] right-[0px] p-5 bottom-part text-white">
            <span>{{ glip.name }}</span>
            <span class=" font-bold text-2xl">NGN {{ glip.price?.toLocaleString() }}</span>
            <div class=" flex flex-col">
            <div class=" w-[80%] text-wrap" v-html="productDescription"></div>
            <UButton 
              v-if="glip.description.length > 50"
              class=" !w-fit"
              color="green"
              @click="des_expanded = !des_expanded" 
              :label="des_expanded ? 'see less':'see more'" variant="link"/>
            </div>

            <UButton color="green" variant="solid" class=" w-full justify-center !p-3 mb-4" label="Buy" />
            <!-- VID PROGRESS BAR -->
            <div class=" relative">
                <div class=" flex flex-col-reverse gap-4 absolute bottom-[80px] right-0 items-center">

                    <!-- AUDIO CONTROL -->
                    <button @click="toggleMute" class="rounded-full p-4 justify-center items-center">
                        <!-- <i class="bi text-2xl" :class="isMuted ? 'bi-volume-mute' : 'bi-volume-down'"></i> -->
                        <svg v-if="isMuted" xmlns="http://www.w3.org/2000/svg" width="2em" height="2em"
                            viewBox="0 0 24 24">
                            <g fill="none" stroke="#ffffff" stroke-width="1.5">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="m18 14l2-2m2-2l-2 2m0 0l-2-2m2 2l2 2"></path>
                                <path
                                    d="M2 13.857v-3.714a2 2 0 0 1 2-2h2.9a1 1 0 0 0 .55-.165l6-3.956a1 1 0 0 1 1.55.835v14.286a1 1 0 0 1-1.55.835l-6-3.956a1 1 0 0 0-.55-.165H4a2 2 0 0 1-2-2Z">
                                </path>
                            </g>
                        </svg>
                        <svg v-else xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
                            <g fill="none" stroke="#ffffff" stroke-width="1.5">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M19.5 7.5S21 9 21 11.5s-1.5 4-1.5 4"></path>
                                <path
                                    d="M2 13.857v-3.714a2 2 0 0 1 2-2h2.9a1 1 0 0 0 .55-.165l6-3.956a1 1 0 0 1 1.55.835v14.286a1 1 0 0 1-1.55.835l-6-3.956a1 1 0 0 0-.55-.165H4a2 2 0 0 1-2-2Z">
                                </path>
                            </g>
                        </svg>
                    </button>

                    <!-- VISIT SHOP -->
                    <NuxtLink :to="`/shops/${shop.name}`">
                        <button class="  rounded-full p-4 justify-center items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
                                <g fill="none" stroke="#ffffff" stroke-width="1.5">
                                    <path
                                        d="M20.485 3h-3.992l.5 5s1 1 2.5 1a3.23 3.23 0 0 0 2.139-.806a.5.5 0 0 0 .15-.465L21.076 3.5a.6.6 0 0 0-.591-.5Z">
                                    </path>
                                    <path d="m16.493 3l.5 5s-1 1-2.5 1s-2.5-1-2.5-1V3z"></path>
                                    <path d="M11.993 3v5s-1 1-2.5 1s-2.5-1-2.5-1l.5-5z"></path>
                                    <path
                                        d="M7.493 3H3.502a.6.6 0 0 0-.592.501L2.205 7.73a.5.5 0 0 0 .15.465c.328.29 1.061.806 2.138.806c1.5 0 2.5-1 2.5-1z">
                                    </path>
                                    <path d="M3 9v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9"></path>
                                    <path stroke-miterlimit="16" d="M14.833 21v-6a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v6">
                                    </path>
                                </g>
                            </svg>
                        </button>
                    </NuxtLink>

                    <!-- SHARE -->
                    <button class=" rounded-full p-4 justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
                            <g fill="none" stroke="#ffffff" stroke-width="1.5">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M18 22a3 3 0 1 0 0-6a3 3 0 0 0 0 6m0-14a3 3 0 1 0 0-6a3 3 0 0 0 0 6M6 15a3 3 0 1 0 0-6a3 3 0 0 0 0 6">
                                </path>
                                <path d="m15.5 6.5l-7 4m0 3l7 4"></path>
                            </g>
                        </svg>
                    </button>
                </div>

                <UProgress color="green" size="sm" :value="progress" :max="100" />
            </div>
        </div>


        <!--  <div class="absolute bottom-[10px] left-[10px] right-[10px] flex items-center">
            
        </div> -->
    </div>
</template>

<script>
/* const des_expanded = ref(false);
const shopDescription = computed(()=>{
  if(des_expanded.value){
    return shop.value.description
  } else {
    return shop.value.description.slice(0,200) + '...';
  }
}) */


export default {
    props: {
        videoSrc: {
            type: String,
            required: true,
        },
        glip: {
            type: Object,
            required: true,
        },
        shop: {
            type: Object,
            required: true,
        }
    },
    data() {
        return {
            isInView: false,
            userPaused: false,
            progress: 0,
            observer: null,
            isMuted: true, // Initially muted
            des_expanded: false,
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

    computed: {
        productDescription() {
            if (this.des_expanded) {
                return this.glip.description
            } else {
                return this.glip.description.slice(0, 50) + '...';
            }
        }
    }
};
</script>

<style scoped>
.video-reel {
    height: 100%;
    scroll-snap-align: start;
    position: relative;
    max-width: 400px;
    margin: 0 auto;
}

.video-reel video {
    width: 100%;
    height: 100%;
    object-fit: cover;
}


button {
    padding: 5px 10px;
}

.bottom-part {
    background: rgb(7, 104, 184);
    background: linear-gradient(180deg, rgba(7, 104, 184, 0) 0%, rgba(0, 0, 0, 1) 100%);
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
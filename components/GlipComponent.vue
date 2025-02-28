<template>
    <div class="video-reel flex justify-center items-center bg-black" ref="videoContainer">
        <video ref="video" class="max-w-[400px]" :src="videoSrc" @waiting="isLoading = true"
            @canplay="isLoading = false" @click="togglePlay" @timeupdate="updateProgress" @error="handleError" loop
            playsinline webkit-playsinline></video>

        <!-- VIDEO LOADING -->
        <div v-if="isLoading" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-125">
            <TheSpinner/>
        </div>


        <!-- VIDEO VOERLAYS HERE -->
        <!-- PAUSE PLAY BUTTON -->
        <transition name="fade">
            <div v-if="userPaused" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-125">
                <button @click="togglePlay"
                    class=" bg-black bg-opacity-50 text-white rounded-full size-14 justify-center items-center ">
                    <i class="bi bi-play-fill text-2xl"></i>
                </button>
            </div>
        </transition>


        <!-- PRODUCT AND DESCRIPTION -->
        <div class="absolute flex flex-col gap-2 bottom-[0px] left-[0px] right-[0px] p-5 bottom-part text-white">
            <span>{{ glip.name }}</span>
            <span class=" font-bold text-2xl">NGN {{ glip.price?.toLocaleString() }}</span>
            <div class=" flex flex-col">
                <div class=" w-[80%] text-wrap" v-html="productDescription()"></div>
                <UButton v-if="glip.description.length > 50" class=" !w-fit" color="green"
                    @click="des_expanded = !des_expanded" :label="des_expanded ? 'see less' : 'see more'"
                    variant="link" />
            </div>

            <!-- BUY BUTTON -->
            <a :href="glip?.shop?.owner?.phone ? `https://wa.me/${glip?.shop?.owner?.phone}/?text=${wa_message_text}`:'#'" >
                <UButton v-if="glip?.shop?.owner?.phone" color="green" variant="solid" class=" w-full justify-center !p-3 mb-4" label="Buy" />
            </a>
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
                    <NuxtLink :to="`/shops/${glip?.shop?.name}`">
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
                    <button class=" rounded-full p-4 justify-center items-center" @click="shareGlip">
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




    </div>
</template>

<script>
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
        }
    },
    data() {
        return {
            isInView: false,
            userPaused: false,
            progress: 0,
            observer: null,
            des_expanded: false,
            isMuted: false,
            isLoading: true,
            wa_message_text: `${window.location.href} ${encodeURIComponent('\n')} ${encodeURIComponent('\n')} ${encodeURIComponent('\n')} Hello ${this.glip?.shop?.owner?.username}, I want to buy this product`,
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
                // useRouter().push(`/glips/${this.glip._id}`);

                // USE SEO FOR ALL GLIPS>>>
                // this.glip?.video_url.split('/').pop().split('?')[0];
               /*  useHead({
                    title: `${this.glip?.name} - NGN${this.glip?.price.toLocaleString()}` || "Default glip Title",
                    meta: [
                        { name: 'description', content: this.glip?.description || 'Default description' },
                        { property: "og:title", content: `${this.glip?.name} - NGN${this.glip?.price.toLocaleString()}` || "Default glip Title" },
                        { property: "og:description", content: this.glip?.description || "Default glip Description" },
                        { property: "og:image", content: `https://res.cloudinary.com/djyopolxa/video/upload/so_5,vc_auto,w_800/${this.glip?.video_url.split('/').pop().split('?')[0]}.jpg` },
                        { property: "og:type", content: "glip" },
                        { property: "og:url", content: `https://wha-sell.vercel.app/glips/${useRoute().params.id}` },
                        { name: "twitter:card", content: "summary_large_image" },
                        { name: "twitter:image", content: `https://res.cloudinary.com/djyopolxa/video/upload/so_5,vc_auto,w_800/${this.glip?.video_url.split('/').pop().split('?')[0]}.jpg` },
                    ],
                }); */
                navigateTo({
                    query: {
                        id: this.glip._id,
                    },
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
                console.log("i sin view: ", entry.isIntersecting)
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
        productDescription() {
            if (this.des_expanded) {
                return this.glip.description
            } else {
                return this.glip.description.slice(0, 50) + '...';
            }
        },

        async shareGlip() {
            if (navigator.share) {
                try {
                    await navigator.share({
                        title: "Hi, check out this glip!",
                        text: `${this.glip.name}`,
                        url: window.location.href, // Current page URL
                    });
                    console.log("Shared successfully");
                } catch (error) {
                    console.error("Error sharing:", error);
                }
            } else {
                alert("Your browser does not support the Web Share API.");
            }
        }
    },
};

/* const shareShop = async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: "Hi, check this Shop on whatsell!",
        text: `${shop.value.category}`,
        url: window.location.href, // Current page URL
      });
      console.log("Shared successfully");
    } catch (error) {
      console.error("Error sharing:", error);
    }
  } else {
    alert("Your browser does not support the Web Share API.");
  }
}; */
</script>

<style scoped>
.video-reel {
    height: 100%;
    scroll-snap-align: start;
    position: relative;
}

.video-reel video {
    /* width: 100%;
    height: 100%;*/
    object-fit: cover;
}

button {
    padding: 5px 10px;
}

progress {
    width: 70%;
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
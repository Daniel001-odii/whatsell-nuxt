<template>
    <!-- <div class="relative"> -->
        <div @click="openGlipModal()" class=" flex-1 min-w-[120px] w-[200px] h-[300px] bg-black rounded-lg flex justify-center items-center relative overflow-hidden">
            <video class=" !h-full">
                <source :src="video_url">
            </video>
            <div class="bg-black bg-opacity-40 text-white absolute p-3 rounded-md bottom-3 left-1/2 transform -translate-x-1/2 flex flex-row gap-3 text-sm w-[90%]">
                <!-- <button class="p-3 rounded-full bg-white text-app_green size-8 flex justify-center items-center"><i class="bi bi-hand-thumbs-up"></i></button> -->
                <div class="flex flex-col">
                    <span class="font-bold">{{ name }}</span>
                    <span class="text-[12px]">NGN {{ price }}</span>
                </div>
            </div>
        </div>
    <!-- </div> -->
</template>

<script>
    export default {
        name: "GlipVideoBox",
        props: {
            price: Number,
            name: String,
            video_url: String,
        },

        methods: {
            openGlipModal(){
                this.$emit('fullscreen');
            }
        }
    }
</script>

<style scoped>

</style>
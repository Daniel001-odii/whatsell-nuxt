<template>
        <div>
        <div class="border rounded-lg flex flex-col p-3" v-if="user">
            <form @submit.prevent="updateUserProfile" class="flex flex-col justify-center items-center gap-3 p-5">
                <div class="relative">
                    <div class=" uppercase font-bold flex justify-center items-center rounded-full !size-28 bg-gray-200 text-gray-500"> {{ user.username[0] }} {{ user.username[1] }}</div>
                </div>

            
                <div class="w-full flex flex-col gap-3">
                    <div class="flex flex-col justify-center items-start gap-3 w-full">
                        <span class="font-bold test-md">Email Address<span class="text-red-500 ml-1">*</span></span>
                        <input disabled type="email" name="email" class="bg-slate-100 text-gray-400 w-full p-3 rounded-md overflow-hidden outline-none" v-model="user.email">
                    </div>

                    <div class="flex flex-col justify-center items-start gap-3 w-full">
                        <span class="font-bold test-md">Full Name<span class="text-red-500 ml-1">*</span></span>
                        <input type="text" name="username" class="bg-slate-100 w-full p-3 rounded-md overflow-hidden outline-none" v-model="user.username">
                    </div>                   

                    <div class="flex flex-col justify-center items-start gap-3 w-full">
                        <span class="font-bold test-md">Phone Number<span class="text-red-500 ml-1">*</span></span>
                        <input type="phone" name="phone" class="bg-slate-100 w-full p-3 rounded-md overflow-hidden outline-none" v-model="user.phone">
                    </div>
                    <div class="flex items-end justify-end">
                        <button type="submit" class="bg-app_green p-3 rounded-md text-white">
                            <span v-if="loading_profile">loading...</span>
                            <span v-else> Save Edits</span>     
                        </button>
                    </div>
                </div>
            </form>
        </div>

        <!-- LOCATION AREA -->
<!-- {{ NaijaStates.all() }} -->
        <div id="location" class="divider-tab bg-white">
            location 
        </div>

       <!--  <form @submit.prevent="updateUserLocation" class="border rounded-lg flex flex-col  gap-3 p-8 mt-1 bg-white">
            <div class="flex flex-row gap-3">
                <div class="flex flex-col justify-center items-start gap-3 w-full">
                    <span class="font-bold test-md">state<span class="text-red-500 ml-1">*</span></span>
                    <select class="border bg-slate-100 p-3 w-full rounded-md" v-model="location.state" name="state">
                        <option disabled value="">Select State</option>
                        <option v-for="state in NaijaStates.all()" :value="state.state">{{ state.state }}</option>
                    </select>
                </div>

                <div class="flex flex-col justify-center items-start gap-3 w-full">
                    <span class="font-bold test-md">L.G.A<span class="text-red-500 ml-1">*</span></span>
                    <select  class="border bg-slate-100 p-3 w-full rounded-md" v-model="location.LGA" name="LGA">
                        <option disabled value="">Select LGA</option>
                        <option v-if="location.state" v-for="LGA in NaijaStates.lgas(location.state).lgas" :value="LGA">{{ LGA }}</option>
                    </select>
                </div>
            </div>

            <div class="flex flex-col justify-center items-start gap-3 w-full">
                <span class="font-bold test-md">Address<span class="text-red-500 ml-1">*</span></span>
                <input type="address" name="address" class="bg-slate-100 w-full p-3 rounded-md overflow-hidden outline-none" v-model="location.address">
            </div>

            <div class="flex items-end justify-end mt-3">
                <button type="submit" class="bg-app_green p-3 rounded-md text-white">
                    <span v-if="loading_location">loading...</span>
                    <span v-else> Save Edits</span>
                </button>
            </div>
        </form> -->

        <!-- CONTACT AREA -->
        <div class="divider-tab bg-white">
            Contact
        </div>

        <!-- {{ socials.whatsapp }} -->
        <div class="flex flex-col bg-white p-8 rounded-lg mt-3 border">
            <div class="font-bold text-lg mt-3">Add Social Media Channel</div>
       
            <div class="flex flex-row flex-wrap gap-3 mt-3">
                <button @click="whatsapp_field = !whatsapp_field" class="social-btn" :class="socials.whatsapp ? 'bg-green-400 text-white':''">
                    <i class="bi bi-whatsapp"></i>
                    WhatsApp
                    <i v-if="!socials.whatsapp" class="bi bi-plus"></i>
                </button>
                <button @click="youtube_field = !youtube_field" class="social-btn" :class="socials.youtube ? 'bg-green-400 text-white':''">
                    <i class="bi bi-youtube"></i>
                    Youtube
                    <i v-if="!socials.youtube" class="bi bi-plus"></i>
                </button>
                <button @click="facebook_field = !facebook_field" class="social-btn" :class="socials.facebook ? 'bg-green-400 text-white':''">
                    <i class="bi bi-facebook"></i>
                    facebook
                    <i v-if="!socials.facebook" class="bi bi-plus"></i>
                </button>
                <button @click="instagram_field = !instagram_field" class="social-btn" :class="socials.instagram ? 'bg-green-400 text-white':''">
                    <i class="bi bi-instagram"></i>
                    instagram
                    <i v-if="!socials.instagram" class="bi bi-plus"></i>
                </button>
                <button @click="twitter_field = !twitter_field" class="social-btn" :class="socials.twitter ? 'bg-green-400 text-white':''">
                    <i class="bi bi-twitter"></i>
                    twitter
                    <i v-if="!socials.twitter" class="bi bi-plus"></i>
                </button>
            </div>

            <form @submit.prevent="updateUserSocials">
                <div v-if="whatsapp_field" class="flex flex-col justify-center items-start gap-3 w-full mt-3">
                    <span class="font-bold test-md">WhatsApp Number</span>
                    <input type="phone" class="bg-slate-100 w-full p-3 rounded-md overflow-hidden outline-none" v-model="socials.whatsapp">
                </div>
                <div v-if="youtube_field" class="flex flex-col justify-center items-start gap-3 w-full mt-3">
                    <span class="font-bold test-md">Youtube Link</span>
                    <input type="text" class="bg-slate-100 w-full p-3 rounded-md overflow-hidden outline-none"  v-model="socials.youtube">
                </div>
                <div v-if="facebook_field" class="flex flex-col justify-center items-start gap-3 w-full mt-3">
                    <span class="font-bold test-md">Facebook Profile Link</span>
                    <input type="text" class="bg-slate-100 w-full p-3 rounded-md overflow-hidden outline-none"  v-model="socials.facebook">
                </div>
                <div v-if="instagram_field" class="flex flex-col justify-center items-start gap-3 w-full mt-3">
                    <span class="font-bold test-md">instagram Profile Link</span>
                    <input type="text" class="bg-slate-100 w-full p-3 rounded-md overflow-hidden outline-none"  v-model="socials.instagram">
                </div>
                <div v-if="twitter_field" class="flex flex-col justify-center items-start gap-3 w-full mt-3">
                    <span class="font-bold test-md">twitter Profile Link</span>
                    <input type="text" class="bg-slate-100 w-full p-3 rounded-md overflow-hidden outline-none"  v-model="socials.twitter">
                </div>

                <div class="flex items-end justify-end mt-3">
                    <button type="submit" class="bg-app_green p-3 rounded-md text-white">
                        <span v-if="loading_socials">loading...</span>
                        <span v-else> Save Edits</span>
                    </button>
                </div>
            </form>
        </div>

         <!-- REFER CODE AREA -->
         <div class="divider-tab bg-white">
            Refer and Earn
        </div>

        <!-- Refer and earn details -->
        <div class="flex flex-col bg-white p-8 rounded-lg mt-3 border">
            <div class="mt-3 text-blue-500">Invite a friend and earn 10 credits once your friend signs up with your referal link</div>
            <div class="flex flex-col justify-center items-start gap-3 w-full mt-3">
                <span class="font-bold test-md">Referal Link</span>
                <div class=" flex flex-row gap-3 border p-3 rounded-lg">
                    <input type="text" class="bg-slate-100 w-full p-3 rounded-md overflow-hidden outline-none" :value="refferal_link" disabled>
                    <button class="bg-app_green p-3 rounded-md text-white" @click="copyRefferalCode">
                        <i class="bi bi-copy"></i>
                    </button>
                </div>
                
            </div>
        </div>

        

    </div>
</template>

<script setup>
// use headless layout
definePageMeta({
  layout: 'accounts',
})

import { ref, reactive } from 'vue';

const user = ref(null);

onMounted(()=>{
    user.value = JSON.parse(localStorage.getItem('user'));
})

const socials = reactive({
    whatsapp: '',
    facebook: '',
    instagram: '',
    twitter: '',
})
</script>

<style scoped>

</style>
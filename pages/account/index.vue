<template>
    <div>

        <!-- PROFILE EDIT AREA -->
        <div class="border rounded-lg flex flex-col p-3" v-if="user">
            <form @submit.prevent="updateUserProfile" class="flex flex-col justify-center items-center gap-3 p-5">
                <div class="relative">
                    <UAvatar
                    size="3xl"
                    :alt="user?.username?.toUpperCase()"
                    />
                </div>
                <div class="w-full flex flex-col gap-3">
                    <div class="flex flex-col justify-center items-start gap-3 w-full">
                        <span class="font-bold ">Email Address<span class="text-red-500 ml-1">*</span></span>
                        <UInput disabled type="email" name="email"  v-model="user.email" class=" w-full"/>
                    </div>

                    <div class="flex flex-col justify-center items-start gap-3 w-full">
                        <span class="font-bold ">Full Name<span class="text-red-500 ml-1">*</span></span>
                        <UInput type="text" name="username" v-model="user.username" class=" w-full"/>
                    </div>                   

                    <div class="flex flex-col justify-center items-start gap-3 w-full">
                        <span class="font-bold ">Phone Number<span class="text-red-500 ml-1">*</span></span>
                        <UInput type="phone" name="phone" v-model="user.phone" class="w-full"/>
                    </div>
                    <div class="flex items-end justify-end">
                        <UButton 
                        :loading="loading_profile"
                        type="submit"
                        class=" !bg-app_green"
                        loading-icon="svg-spinners:bars-rotate-fade"
                        >
                            Save Edits   
                        </UButton>
                    </div>
                </div>
            </form>
        </div>

        <!-- LOCATION AREA -->
        <div id="location" class="divider-tab bg-white dark:bg-transparent">
            location 
        </div>

        <form @submit.prevent="updateUserLocation" class="border rounded-lg flex flex-col  gap-3 p-8 mt-1">
            <div class="flex flex-row gap-3">
                <div class="flex flex-col justify-center items-start gap-3 w-full">
                    <span class="font-bold ">state<span class="text-red-500 ml-1">*</span></span>
                    <USelect 
                     :size="'xl'"
                    v-model="state" 
                    :options="NaijaStates.all()"
                    value-attribute="state"
                    option-attribute="state"
                    placeholder="Select State"
                    class="w-full"/>
                </div>

                <div class="flex flex-col justify-center items-start gap-3 w-full">
                    <span class="font-bold ">L.G.A<span class="text-red-500 ml-1">*</span></span>
                    <USelect 
                    :size="'xl'"
                    v-model="LGA" 
                    :options="NaijaStates.lgas(state).lgas"
                    option-attribute="LGA"
                    placeholder="Select LGA"
                    class="w-full"/>
                </div>
            </div>

            <div class="flex flex-col justify-center items-start gap-3 w-full">
                <span class="font-bold ">Address<span class="text-red-500 ml-1">*</span></span>
                <UInput type="address" name="address" class=" w-full" v-model="address"/>
            </div>

            <div class="flex items-end justify-end mt-3">
                <UButton 
                :loading="loading_location"
                type="submit"
                class=" !bg-app_green"
                loading-icon="svg-spinners:bars-rotate-fade"
                >
                    Save Edits   
                </UButton>
            </div>
        </form>

        <!-- CONTACT AREA -->
        <div class="divider-tab">
            Contact
        </div>

        <div class="flex flex-col p-8 rounded-lg mt-3 border">
            <div class="font-bold text-lg mt-3">Add Social Media Channel</div>
       
            <div class="flex flex-row flex-wrap gap-3 mt-3">
                <UButton 
                :variant="socials.whatsapp ? 'solid':'ghost'"
                color="green"
                @click="whatsapp_field = !whatsapp_field" class="social-btn">
                    <i class="bi bi-whatsapp"></i>
                    WhatsApp
                    <i v-if="!socials.whatsapp" class="bi bi-plus"></i>
                </UButton>
                <UButton 
                :variant="socials.youtube ? 'solid':'ghost'"
                color="red"
                @click="youtube_field = !youtube_field" class="social-btn">
                    <i class="bi bi-youtube"></i>
                    Youtube
                    <i v-if="!socials.youtube" class="bi bi-plus"></i>
                </UButton>
                <UButton 
                :variant="socials.facebook ? 'solid':'ghost'"
                color="blue"
                @click="facebook_field = !facebook_field" class="social-btn">
                    <i class="bi bi-facebook"></i>
                    facebook
                    <i v-if="!socials.facebook" class="bi bi-plus"></i>
                </UButton>
                <UButton 
                :variant="socials.instagram ? 'solid':'ghost'"
                color="orange"
                @click="instagram_field = !instagram_field" class="social-btn">
                    <i class="bi bi-instagram"></i>
                    instagram
                    <i v-if="!socials.instagram" class="bi bi-plus"></i>
                </UButton>
                <UButton 
                :variant="socials.twitter ? 'solid':'ghost'"
                color="gray"
                @click="twitter_field = !twitter_field" class="social-btn" >
                    <i class="bi bi-twitter"></i>
                    twitter
                    <i v-if="!socials.twitter" class="bi bi-plus"></i>
                </UButton>
            </div>

            <form @submit.prevent="updateUserSocials">
                <div v-if="whatsapp_field" class="flex flex-col justify-center items-start w-full mt-3">
                    <span class="font-bold ">WhatsApp Number</span>
                    <UInput type="phone" class="w-full" v-model="socials.whatsapp"/>
                </div>
                <div v-if="youtube_field" class="flex flex-col justify-center items-start w-full mt-3">
                    <span class="font-bold ">Youtube Link</span>
                    <UInput type="text" class="w-full"  v-model="socials.youtube"/>
                </div>
                <div v-if="facebook_field" class="flex flex-col justify-center items-start w-full mt-3">
                    <span class="font-bold ">Facebook Profile Link</span>
                    <UInput type="text" class="w-full"  v-model="socials.facebook"/>
                </div>
                <div v-if="instagram_field" class="flex flex-col justify-center items-start w-full mt-3">
                    <span class="font-bold ">instagram Profile Link</span>
                    <UInput type="text" class="w-full"  v-model="socials.instagram"/>
                </div>
                <div v-if="twitter_field" class="flex flex-col justify-center items-start w-full mt-3">
                    <span class="font-bold ">twitter Profile Link</span>
                    <UInput type="text" class="w-full"  v-model="socials.twitter"/>
                </div>

                <div class="flex items-end justify-end mt-3">
                    <UButton 
                    :loading="loading_socials"
                    type="submit"
                    class=" !bg-app_green"
                    loading-icon="svg-spinners:bars-rotate-fade"
                    >
                        Save Edits   
                    </UButton>
                </div>
            </form>
        </div>

         <!-- REFER CODE AREA -->
        <div class="divider-tab">
            Refer and Earn
        </div>

        <!-- Refer and earn details -->
        <div class="flex flex-col p-8 rounded-lg mt-3 border">
            <div class="mt-3 text-blue-500">Invite a friend and earn 10 credits once your friend signs up with your referal link</div>
            <div class="flex flex-col justify-center items-start gap-3 w-full mt-3">
                <span class="font-bold ">Referal Link</span>
                <div class=" flex flex-row gap-2 w-full">
                    <UInput type="text" class=" w-full" v-model="refferal_link" disabled />
                    <button class="bg-app_green p-3 rounded-md text-white" @click="copyRefLink">
                        <i class="bi bi-check" v-if="copied"></i>
                        <i class="bi bi-copy" v-else></i>
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

import NaijaStates from 'naija-state-local-government';
import { ref, reactive } from 'vue';

const user = ref(null);
const state = ref('Abia');
const LGA = ref('');
const address = ref('');

const categories = ref([]);
const loading_socials = ref(false);

const whatsapp_field = ref(false);
const youtube_field = ref(false);
const facebook_field = ref(false);
const instagram_field = ref(false);
const twitter_field = ref(false);
const toast = useToast();
const getCategories = async () => {
    try{
        const res = await useNuxtApp().$apiFetch('/categories');
        categories.value = res.categories;
        console.log('categories', categories.value);
    }catch(err){
        console.log(err);
    }
}

getCategories();

const refferal_link = ref('');
const getUserDetails = async()=>{
    try{
        const res = await useNuxtApp().$apiFetch('/user');
        user.value = res.user;
        socials.whatsapp = user.value.profile.socials.whatsapp || '';
        socials.facebook = user.value.profile.socials.whatsapp || '';
        socials.instagram = user.value.profile.socials.whatsapp || '';
        socials.twitter = user.value.profile.socials.whatsapp || '';


        state.value = res.user.location?.state || 'Abia';
        LGA.value = res.user.location?.LGA  || ''; 
        address.value = res.user.location?.address || '';
        console.log("user from accounts", res);
        refferal_link.value = `${window.origin}/invite?refferal_code=${res.user.refferal_code}`;   
        
        // console.log("reflink: ", `${window.origin}/invite?refferal_code=${res.user.refferal_code}`);
    }catch(err){
        console.log(err);
    }
}
getUserDetails();

const loading_profile = ref(false);
const updateUserProfile = async()=>{
    loading_profile.value = true;
    try{
        const res = await useNuxtApp().$apiFetch('/user/update', {
            method: 'PATCH',
            body: user.value
        });
        toast.add({ title: "Profile updated" })
        console.log('profile updated', res);
    }catch(err){
        console.log(err);
    }
    loading_profile.value = false;
}

const loading_location = ref(false);
const updateUserLocation = async()=>{
    const location = {
        state: state.value,
        LGA: LGA.value,
        address: address.value
    };

    loading_location.value = true;
    try{
        const res = await useNuxtApp().$apiFetch('/user/update', {
            method: 'PATCH',
            body: { location },
        });
        toast.add({ title: "Location updated" })
        console.log('location updated', res);
    }catch(err){
        console.log(err);
    }
    loading_location.value = false;
}

const socials = reactive({
    whatsapp: '',
    facebook: '',
    instagram: '',
    twitter: '',
})
const updateUserSocials = async()=>{
    loading_socials.value = true;
    try{
        const res = await useNuxtApp().$apiFetch('/user/update', {
            method: 'PATCH',
            body: { socials },
        });
        toast.add({ title: "Socials updated" })
        console.log('socials updated', res);
    }catch(err){
        console.log(err);
    }
    loading_socials.value = false;
}


const copied = ref(false);


const copyRefLink = async () => {
try {
    await navigator.clipboard.writeText(refferal_link.value);
    copied.value = true;
    setTimeout(() => (copied.value = false), 3000); // Hide "Copied" message after 2 sec
} catch (err) {
    console.error("Failed to copy:", err);
}
};





</script>

<style scoped>
div, form{
    @apply dark:border-gray-700
}
</style>
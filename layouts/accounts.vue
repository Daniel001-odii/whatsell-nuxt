<template>

    <!-- email unverified? -->
    <UModal v-model="email_verified" prevent-close :ui="{ container: 'flex items-center justify-center min-h-screen' }">
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              Notice
            </h3>

            <nuxt-link to="/">
                <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" />
            </nuxt-link>
          </div>
        </template>

        <div class= " flex flex-col justify-center items-center gap-3 text-center">
            <i class="bi bi-envelope-exclamation text-5xl  text-gray-400"></i>
            <span class=" font-bold text-2xl">Please verify your email <br/>to continue</span>
            <small>A verification mail was sent to <b>{{ email }}</b> after signup, please click the link to verify your email address and continue using whatsell or resend verification mail.</small>
            <UButton
            @click="resendVerificationMail"
            class="p-3 !bg-app_green text-white"
            :loading="loading"
            :loading-icon="`svg-spinners:bars-rotate-fade`"
            >Re-send verication mail <span v-if="loading">{{ seconds }}</span></UButton>
        </div>
      </UCard>
    </UModal>


    <div class="  mx-auto dark:bg-[#21262d]">
        <TheNavbar/>
       
        <div  class=" container  mx-auto flex md:flex-row gap-5 relative flex-col p-5  min-h-screen">
            <div class="flex flex-col gap-2">
                <NuxtLink to="/">
                    <button class="flex flex-row gap-1 font-medium text-xl p-3">
                        <i class="bi bi-arrow-left-short"></i>
                        Akount
                    </button>
                </NuxtLink>
                <!-- sticky top-5 -->
                <div class="p-3  md:sticky top-5  flex flex-col gap-3 border rounded-lg w-full md:w-64 min-w-64 h-fit bg-white dark:bg-gray-900 dark:border-gray-600">
                    <NuxtLink to="/account" class="nav-items"  :class="{'active-nav': isUserPage }" @click="page_visible = !page_visible" id="account_details">Personal details</NuxtLink>
                    <NuxtLink to="/account/shop" class="nav-items" :class="{'active-nav': isShopPage }"  @click="page_visible = !page_visible" id="my_shop">My Shop</NuxtLink>
                    <NuxtLink to="/account/analytics" class="nav-items" :class="{'active-nav': isAnalyticsPage }" @click="page_visible = !page_visible" id="analytics">Analytics & Insights</NuxtLink>
                    <NuxtLink to="/account/subscriptions" class="nav-items" :class="{'active-nav': isUpgradePage }" @click="page_visible = !page_visible" id="subscriptions">Subscriptions</NuxtLink>
                    <!-- <NuxtLink to="/account/notifications" class="nav-items" :class="{'active-nav': isNotifyPage }" @click="page_visible = !page_visible">Manage Notifications</NuxtLink> -->
                    <!-- <NuxtLink to="#" class="nav-items" :class="{'active-nav': isNotifyPage }" @click="page_visible = !page_visible">Manage Notifications</NuxtLink> -->
                </div>
            </div>


            <div class="flex flex-col gap-3 w-full pb-12">
                <div class="font-bold p-3 border rounded-lg text-green-700 bg-white dark:bg-gray-900 dark:border-gray-600">
                    <span>{{ useRouter().currentRoute.value.name }}</span>
                </div>
                <slot/>
            </div>
        </div>
        <TheFooter/>
    </div>
</template>

<script setup>
import { ref } from 'vue'
const email_verified = ref(false);
const verification_mail_sent = ref(false);
const toast = useToast();
const loading = ref(false);
const email = ref(null);
const seconds = ref(null);

let time = 60;

const countDown = () => {
    loading.value = true;
    if (time > 0) {
        setTimeout(() => {
            time -= 1;
            seconds.value = time;
            countDown();
        }, 1000);
    } else {
        time = 60;
        loading.value = false;
    }
}


// resend verification mail...
const resendVerificationMail = async () =>{
    loading.value = true;
    try{
        const response = await useNuxtApp().$apiFetch(`/email_verification/send`, 
        { 
            method: 'POST',
            body: { email: email.value }
        });

        console.log("response from verifying mail: ", response);
        verification_mail_sent.value = true;
        toast.add({ title: response.message })
        countDown();
    }catch(error){
        toast.add({ title: error.response.message })
        console.log("error resending mail: ", error)
    }
    loading.value = false;
}


const user = ref(null);
const getUserDetails = async()=> {
    try {
        const res = await useNuxtApp().$apiFetch(`/user`);
        user.value = res.user;
        email_verified.value = !res.user.email_verification.is_verified;
        email.value = res.user.email;
        console.log(" user data from accoumts: ", user.value);
    } catch (error) {
        session_expired.value = true;
        console.log(error);
    }
}

onMounted(() => {
    getUserDetails();
});

/* computed(() => {
    return {
        isUserPage: useRoute().name === 'account',
        isShopPage: useRoute().name === 'account-shop',
        isAnalyticsPage: useRoute().name === 'account-analytics',
        isUpgradePage: useRoute().name === 'account-subscriptions',
        isNotifyPage: useRoute().name === 'account-notifications',
    }
}) */

const isUserPage = computed(() => {
    return useRouter().currentRoute.value.path === "/account";
});

const isShopPage = computed(() => {
    return useRouter().currentRoute.value.path === "/account/shop";
});

const isAnalyticsPage = computed(() => {
    return useRouter().currentRoute.value.path === "/account/analytics";
});

const isUpgradePage = computed(() => {
    return useRouter().currentRoute.value.path === "/account/subscriptions";
});

const isNotifyPage = computed(() => {
    return useRouter().currentRoute.value.path === "/account/notifications";
});

</script>

<style scoped>
   .nav-items{
        @apply p-3 rounded-md hover:bg-slate-500 hover:bg-opacity-15
    }

    .active-nav{
        @apply hover:text-app_green text-app_green font-bold border-r-[5px] border-app_green rounded-none
    }
</style>
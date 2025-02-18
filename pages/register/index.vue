<template>
    <div class=" flex flex-row min-h-screen">
        <div class=" w-full md:w-[50%] flex flex-col justify-center items-center">
            <div class="p-12 flex flex-col gap-5 md:max-w-[600px]">
                <h1 class=" text-3xl font-bold">Sign Up - {{ is_selected }}</h1>
                <span>What do you intend doing on Whatsell?</span>
                <div class="flex flex-row flex-wrap gap-6">

                    <label v-for="user in user_types" 
                    :class="is_selected == user.type ? 'border-[#47c68f] bg-[#47c68f] bg-opacity-10':''" 
                    
                    class=" flex flex-col relative flex-1 border p-5 rounded-lg gap-5 min-w-[300px]">
                        <span class=" font-bold text-xl">{{ user.type }}</span>
                        <p>{{ user.description }}</p>
                        <input type="radio" v-model="is_selected" :value="user.type" class=" absolute top-5 right-5"/>
                    </label>
                </div>

                <!-- proceed button -->
                <UButton 
                @click="proceedToRegisterPage" 
                class="text-center p-3 !bg-app_green rounded-lg justify-center text-white font-bold" 
                :disabled="!is_selected">Let's moove!</UButton>
            </div>
        </div>
        <div class="bg-[#f1f5f9] hidden md:flex md:w-[50%] min-h-full justify-center items-center">
            <div class=" size[300px]">
                <img src="../../assets/images/auth_pages.png"/>
            </div>
        </div>
    </div>
</template>

<script setup>
// use headless layout
definePageMeta({
  layout: 'headless',
})


import { useRouter } from 'vue-router';
const router = useRouter();

  const is_selected = ref('');
  const user_types = [
    {
        type: "buyer",
        description: "As a buyer I intend on browsing and buying product listings only"
    },
    {
        type: "seller",
        description: "As a seller I intend on listing, selling and buying products only"
    }
  ]

  const proceedToRegisterPage =()=> {
        router.push(`/register/${is_selected.value}`)
  };


</script>

<style scoped>
button{
    @apply bg-opacity-90 hover:bg-opacity-100
}

button:disabled{
    @apply cursor-not-allowed bg-gray-300
}
</style>
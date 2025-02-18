<template>
    <div class="min-h-screen flex flex-row">
      <div class="w-full md:w-[50%] min-h-screen flex justify-center items-center p-3 md:p-12">
        <div class="p-3 w-full max-w-lg">
          <form @submit.prevent="register">
            <h1 class="text-4xl font-bold text-app_green mb-3">Sign Up Buyer</h1>
            <p class="my-3">Start your journey today! Buying made easy.</p>
  
            <span class="text-red-500 py-3">{{ error_message }}</span>
  
            <div class="flex flex-col gap-3">
              <div>
                <input @input="validateUsername" id="username" type="text" name="username" placeholder="username"
                  v-model="form.username" class="form-input" :class="errors.username ? 'border-red-400':''" required>
                <small v-if="errors.username || form.username === ''" class="text-red-500">{{ errors.username }}</small>
              </div>
              <div>
                <div class="flex flex-row relative">
                  <!-- <SpinnerComponent v-if="loading_email" class="absolute top-[50%] right-[5%]" /> -->
                  <input id="email" type="email" @change="checkEmail" name="email" placeholder="example@mail.com"
                    v-model="form.email" class="form-input" :class="errors.email ? 'border-red-400':''" required>
                </div>
  
                <small v-if="errors.email" class="text-red-500">{{ errors.email }}</small>
              </div>
              <div class="relative">
                <!-- <SpinnerComponent v-if="loading_phone" class="absolute top-[35%] right-[5%]" /> -->
                <input type="tel" @change="checkPhone" name="phone" placeholder="081234567890" v-model="form.phone"
                  class="form-input" :class="errors.phone ? 'border-red-400':''" required>
                <small v-if="errors.phone" class="text-red-500">{{ errors.phone }}</small>
              </div>
              <div>
                <div class="relative">
                  <input :type="show_pass ? 'text' : 'password'" placeholder="password" v-model="form.password"
                    class="form-input" :class="errors.password ? 'border-red-400':''"
                    @input="evaluatePasswordStrength($event.target.value)" required>

                  <button @click="show_pass = !show_pass" type="button" class="bi absolute top-3 right-3">
                    <svg v-if="show_pass" xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                        <path d="M4.25 10.4167C6.75 5.00008 14.25 5.00008 16.75 10.4167" stroke="#0A0B0A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M10.4987 13.3333C9.5782 13.3333 8.83203 12.5872 8.83203 11.6667C8.83203 10.7462 9.5782 10 10.4987 10C11.4192 10 12.1654 10.7462 12.1654 11.6667C12.1654 12.5872 11.4192 13.3333 10.4987 13.3333Z" stroke="#0A0B0A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 16 16" fill="none">
                        <path d="M3 5.3335C5 9.66683 11 9.66683 13 5.3335" stroke="#21272A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M11.2109 7.54492L13.0001 9.99992" stroke="#21272A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M8 8.5835V11.0002" stroke="#21272A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M4.78922 7.54492L3 9.99992" stroke="#21272A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </button>

                </div>
                <small v-if="errors.password" class="text-red-500">{{ errors.password }}</small>
  
                <div class="mt-3 flex flex-col gap-1">
                  <span class="text-[12px] text-gray-400 mb-3" v-if="passwordStrength.score < 5">1 uppercase, lowercase,
                    numbers, symbols, and no spacing (Use “_” if necessary) </span>
                  <span class="font-semibold text-sm mb-1">Password strength</span>
                  <div class="h-[8px] bg-[#e0e0e0] rounded-md overflow-hidden relative">
                    <div :class="['strength-level', passwordStrength.label.toLowerCase()]"
                      :style="{ width: passwordStrength.score * 20 + '%' }"></div>
                  </div>
                  <span class="text-sm">{{ passwordStrength.label }}</span>
                </div>
              </div>
            </div>
            <div class="mt-3 text-gray-400">
              <p>Already a member? 
                <NuxtLink class="text-app_green underline" to="/login">Login</NuxtLink>
            </p>
            </div>
            <button type="submit" :disabled="loading || passwordStrength.score < 5 || form_error"
              class="bg-[#37B36E] text-white w-full rounded-md p-3 mt-6 hover:bg-opacity-80 font-bold disabled:cursor-not-allowed disabled:bg-gray-300">
              <span v-if="loading">loading...</span>
              <span v-else>Oya let's get started</span>
            </button>
          </form>
        </div>
      </div>
      <div class="bg-[#f1f5f9] hidden md:flex md:w-[50%] min-h-full justify-center items-center">
          <div class=" size[300px]">
              <img src="../assets/images/auth_pages.png"/>
          </div>
      </div>
    </div>
  </template>
  
  <script setup>
  // use headless layout
definePageMeta({
  layout: 'headless',
})


  import { ref, reactive } from 'vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  const form = reactive({
    username: '',
    email: '',
    phone: '',
    password: '',
  });
  
  const errors = reactive({
    username: '',
    email: '',
    phone: '',
    password: '',
  });
  
  const passwordStrength = reactive({
    score: 0,
    label: 'Weak'
  });
  
  const show_pass = ref(false);
  const loading = ref(false);
  const form_error = ref(false);
  const loading_email = ref(false);
  const loading_phone = ref(false);
  const error_message = ref('');
  
  const validateUsername = () => {
    form.username = form.username.replace(/[^a-zA-Z0-9_]/g, "").slice(0, 15);
    errors.username = form.username.length < 3 ? "Username must be at least 3 characters" : "";
  };
  
  const evaluatePasswordStrength = (password) => {
    let score = 0;
    if (password.length > 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[\W]/.test(password)) score += 1;
  
    passwordStrength.score = score;
    passwordStrength.label = score <= 2 ? 'Weak' : score <= 4 ? 'Good' : 'Strong';
  };
  
  const register = () => {
  console.log('Submitting form:', form);
};
</script>

<style scoped>
button {
  @apply bg-opacity-90 hover:bg-opacity-100
}

.input-type{
    @apply flex border flex-col p-3 rounded-lg justify-start items-start gap-5
}


input[type="radio"]:checked{
    @apply bg-app_green border border-app_green
}

.strength-level {
    height: 100%;
    transition: width 0.3s;
}

.weak {
    background: #C03744;
}

.good {
    background: #EDA145;
}

.strong {
    background: #15B097;
}

</style>
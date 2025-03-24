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
                    v-model="form.email" class="form-input" :class="errors.email ? '!border-red-400':''" required>
                </div>
  
                <small v-if="errors.email" class="text-red-500">{{ errors.email }}</small>
              </div>
              <div class="relative">
                <!-- <SpinnerComponent v-if="loading_phone" class="absolute top-[35%] right-[5%]" /> -->
                <input type="tel" @change="checkPhone" name="phone" placeholder="081234567890" v-model="form.phone"
                  class="form-input" :class="errors.phone ? '!border-red-400':''" required>
                <small v-if="errors.phone" class="text-red-500">{{ errors.phone }}</small>
              </div>
              <div>
                <div class="relative">
                  <input :type="show_pass ? 'text' : 'password'" placeholder="password" v-model="form.password"
                    class="form-input" :class="errors.password ? 'border-red-400':''"
                    @input="evaluatePasswordStrength($event.target.value)" required>

                  <button @click="show_pass = !show_pass" type="button" class="bi absolute top-3 right-3">
                    <svg v-if="!show_pass" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><!-- Icon from Huge Icons by Hugeicons - undefined --><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M22 8s-4 6-10 6S2 8 2 8m13 5.5l1.5 2.5m3.5-5l2 2M2 13l2-2m5 2.5L7.5 16" color="currentColor"/></svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><!-- Icon from Huge Icons by Hugeicons - undefined --><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" color="currentColor"><path d="M21.544 11.045c.304.426.456.64.456.955c0 .316-.152.529-.456.955C20.178 14.871 16.689 19 12 19c-4.69 0-8.178-4.13-9.544-6.045C2.152 12.529 2 12.315 2 12c0-.316.152-.529.456-.955C3.822 9.129 7.311 5 12 5c4.69 0 8.178 4.13 9.544 6.045"/><path d="M15 12a3 3 0 1 0-6 0a3 3 0 0 0 6 0"/></g></svg>
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
           
            <UButton 
            type="submit" 
            :loading="loading"
            loading-icon="svg-spinners:6-dots-scale-middle" 
            color="green"
            :disabled="loading || passwordStrength.score < 5 || form_error"
              class="w-full justify-center p-3 font-bold mt-3">
              <span>Register</span>
            </UButton>

            <div class="mt-3 text-gray-400">
              <p>Already a member? 
                <NuxtLink class="text-app_green underline" to="/login">Login</NuxtLink>
            </p>
            </div>
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
  import axios from 'axios';
  
const router = useRouter();
const accessToken = useCookie('accessToken', {
  maxAge: 60 * 60 * 24 * 7, // 7 days
  httpOnly: false, // Set to true if using from a server route
  secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
  sameSite: 'strict'
});
const refreshToken = useCookie('refreshToken', {
  maxAge: 60 * 60 * 24 * 100, // 7 days
  httpOnly: false, // Set to true if using from a server route
  secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
  sameSite: 'strict'
});
  
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
  
const toast = useToast()
const register = async () => {
  loading.value = true;
  errors.value = {
    username: '',
    email: '',
    phone: '',
    password: '',
  };
  try{
    const res = await axios.post(`${useRuntimeConfig().public.apiBase}/register/primary`, form);
    console.log("registered: ", res);
    accessToken.value = res.data.accessToken;
    refreshToken.value = res.data.refreshToken;
    toast.add({ title: res.data.message })
    setTimeout(() => {
      router.push('/');
    }, 2000);
  }catch(error){
    console.log("error in rgister: ", error);
    errors[error.response.data.fields] = error.response.data.message;
  }
  loading.value = false;
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
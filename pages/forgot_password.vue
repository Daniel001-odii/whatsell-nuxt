<template>
    <div class="min-h-screen flex flex-row">
      <div class="w-full md:w-[50%] min-h-screen flex justify-center items-center p-3 md:p-12">
        <div class="p-3 w-full max-w-lg">
          <form @submit.prevent="register" class=" flex flex-col">
            <h1 class="text-4xl font-bold text-app_green">Reset Password</h1>
            <p class="my-3">Enter your email address to reset your password.
                If we find your email in our records, we will send you a link to reset your password.</p>
  
            <span class="text-red-500 py-3">{{ error_message }}</span>
  
            <div class="flex flex-col gap-3">
             
              <div>
                <div class="flex flex-row relative">
                  <!-- <SpinnerComponent v-if="loading_email" class="absolute top-[50%] right-[5%]" /> -->
                  <input
                    id="email"
                    type="email"
                    @change="checkEmail"
                    name="email"
                    placeholder="Email"
                    v-model="form.email"
                    class="form-input"
                    :class="errors.email ? 'border-red-400' : ''"
                    required
                  />
                </div>
  
                <small v-if="errors.email" class="text-red-500">{{
                  errors.email
                }}</small>
              </div>
            </div>

            <UButton loading-icon="i-heroicons-arrow-path-20-solid" 
            color="green" 
            class=" w-full justify-center p-3 font-bold my-4">Send reset link</UButton>
            <span>Not yet a member? <NuxtLink to="/register" class=" underline text-app_green">join us</NuxtLink></span>
          </form>
        </div>
      </div>
      <div class="bg-[#f1f5f9] hidden md:flex md:w-[50%] min-h-full justify-center items-center">
        <div class=" size[300px]">
            <img src="../assets/images/pass_reset.png"/>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive } from "vue";
  import { useRouter } from "vue-router";
  
  const router = useRouter();
  
  const form = reactive({
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  
  const errors = reactive({
    emailOrPhone: "",
    password: "",
  });
  
  const loading = ref(false);
  const form_error = ref(false);
  const error_message = ref("");
  
  const login = () => {
    console.log("Submitting form:", form);
  };
  </script>
  
  <style scoped>
  button {
    @apply bg-opacity-90 hover:bg-opacity-100;
  }
  
  .input-type {
    @apply flex border flex-col p-3 rounded-lg justify-start items-start gap-5;
  }
  
  input[type="radio"]:checked {
    @apply bg-app_green border border-app_green;
  }
  </style>
  
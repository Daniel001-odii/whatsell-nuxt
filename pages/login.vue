<template>
  <div class="min-h-screen flex flex-row">
    <div class="w-full md:w-[50%] min-h-screen flex justify-center items-center p-3 md:p-12">
      <div class="p-3 w-full max-w-lg">
        <form @submit.prevent="register" class=" flex flex-col">
          <h1 class="text-4xl font-bold text-app_green">Login</h1>
          <p class=" my-3">Welcome back!</p>

            <div class=" flex flex-col gap-3">
                <!-- <span class="text-red-500 py-3">{{ error_message }}</span> -->

                <div class="flex flex-col gap-3">
                
                    <div>
                    <div class="flex flex-row relative">
                        <!-- <SpinnerComponent v-if="loading_email" class="absolute top-[50%] right-[5%]" /> -->
                        <input
                        id="email"
                        type="email"
                        @change="checkEmail"
                        name="email"
                        placeholder="Email or phone"
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
                
                    <div>
                    <div class="relative">
                        <input
                        :type="show_pass ? 'text' : 'password'"
                        placeholder="password"
                        v-model="form.password"
                        class="form-input"
                        :class="errors.password ? 'border-red-400' : ''"
                        @input="evaluatePasswordStrength($event.target.value)"
                        required
                        />

                        <button
                        @click="show_pass = !show_pass"
                        type="button"
                        class="bi absolute top-3 right-3"
                        >
                        <svg
                            v-if="show_pass"
                            xmlns="http://www.w3.org/2000/svg"
                            width="21"
                            height="20"
                            viewBox="0 0 21 20"
                            fill="none"
                        >
                            <path
                            d="M4.25 10.4167C6.75 5.00008 14.25 5.00008 16.75 10.4167"
                            stroke="#0A0B0A"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            />
                            <path
                            d="M10.4987 13.3333C9.5782 13.3333 8.83203 12.5872 8.83203 11.6667C8.83203 10.7462 9.5782 10 10.4987 10C11.4192 10 12.1654 10.7462 12.1654 11.6667C12.1654 12.5872 11.4192 13.3333 10.4987 13.3333Z"
                            stroke="#0A0B0A"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            />
                        </svg>
                        <svg
                            v-else
                            xmlns="http://www.w3.org/2000/svg"
                            width="21"
                            height="21"
                            viewBox="0 0 16 16"
                            fill="none"
                        >
                            <path
                            d="M3 5.3335C5 9.66683 11 9.66683 13 5.3335"
                            stroke="#21272A"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            />
                            <path
                            d="M11.2109 7.54492L13.0001 9.99992"
                            stroke="#21272A"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            />
                            <path
                            d="M8 8.5835V11.0002"
                            stroke="#21272A"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            />
                            <path
                            d="M4.78922 7.54492L3 9.99992"
                            stroke="#21272A"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            />
                        </svg>
                        </button>
                    </div>
                    <small v-if="errors.password" class="text-red-500">{{
                        errors.password
                    }}</small>
                    </div>
                </div>
                
                <NuxtLink to="/forgot_password" class=" text-app_green underline">Forgot password</NuxtLink>
                
                <UButton loading loading-icon="i-heroicons-arrow-path-20-solid" 
                color="green" 
                class=" w-full justify-center p-3 font-bold">Login</UButton>
                <span>Not yet a member? <NuxtLink to="/register" class=" underline text-app_green">join us</NuxtLink></span>
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

<template>
  <div class="min-h-screen flex flex-row">
    <div class="w-full md:w-[50%] min-h-screen flex justify-center items-center p-3 md:p-12">
      <div class="p-3 w-full max-w-lg">
        <form @submit.prevent="handleLogin" class="flex flex-col">
          <h1 class="text-4xl font-bold text-app_green">Login</h1>
          <p class="my-3">Welcome back!</p>

          <div class="flex flex-col gap-3">

            <div class="flex flex-col gap-3">
              <div>
                <div class="flex flex-row relative">
                  <!-- <SpinnerComponent v-if="loading_email" class="absolute top-[50%] right-[5%]" /> -->
                  <input id="email" type="email" name="email" placeholder="Email or phone" v-model="form.emailOrPhone"
                    class="form-input" :class="{ '!border-red-500': error_message }" required />
                </div>
              </div>

              <div>
                <div class="relative">
                  <input type="password" placeholder="password" v-model="form.password" class="form-input"
                    :class="{ '!border-red-500': error_message }" required />
                  <small v-if="error_message" class="text-red-500">{{
                    error_message
                  }}</small>
                </div>
              </div>
            </div>

            <NuxtLink to="/forgot_password" class="text-app_green underline">Forgot password</NuxtLink>

            <UButton 
            @click="handleLogin" type="submit" 
            :loading="loading" 
            loading-icon="svg-spinners:bars-rotate-fade"
              color="green" class="w-full justify-center p-3 font-bold">Login</UButton>
            <span>Not yet a member?
              <NuxtLink to="/register" class="underline text-app_green">join us</NuxtLink>
            </span>
          </div>
        </form>
      </div>
    </div>
    <div class="bg-[#f1f5f9] hidden md:flex md:w-[50%] min-h-full justify-center items-center">
      <div class="size[300px]">
        <img src="../assets/images/auth_pages.png" />
      </div>
    </div>
  </div>
</template>

<script setup>
// use headless layout
definePageMeta({
  layout: "headless",
});

import { ref, reactive } from "vue";
import { useRoute, useRouter } from "#imports";
import axios from "axios";

const router = useRouter();

const form = reactive({
  emailOrPhone: "",
  password: "",
});
const errors = reactive({
  emailOrPhone: "",
  password: "",
});

const loading = ref(false);
const form_error = ref(false);
const toast = useToast();
const error_message = ref(null);
const handleLogin = async () => {
  loading.value = true;
  error_message.value = null;
  try {
    const res = await useNuxtApp().$apiFetch(`/login`, {
      method: "POST",
      body: form,
    });

    const token = useCookie("accessToken");
    token.value = res.accessToken;
    toast.add({ title: res.message })
    router.push("/");
    console.log("from login: ", res);
  } catch (error) {
    console.log("Login failed:", error._data.message);
    loading.value = false;
    // toast.add({ title: error._data.message })
    error_message.value = error._data.message;
  }
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

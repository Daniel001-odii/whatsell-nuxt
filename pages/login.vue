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
                    <button type="button" variant="ghost" size="sm" @click="is_pass = !is_pass" class="absolute inset-y-0 my-auto right-3 flex items-center">
                      <svg v-if="!is_pass" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><!-- Icon from Huge Icons by Hugeicons - undefined --><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" color="currentColor"><path d="M21.544 11.045c.304.426.456.64.456.955c0 .316-.152.529-.456.955C20.178 14.871 16.689 19 12 19c-4.69 0-8.178-4.13-9.544-6.045C2.152 12.529 2 12.315 2 12c0-.316.152-.529.456-.955C3.822 9.129 7.311 5 12 5c4.69 0 8.178 4.13 9.544 6.045"/><path d="M15 12a3 3 0 1 0-6 0a3 3 0 0 0 6 0"/></g></svg>
                      <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><!-- Icon from Huge Icons by Hugeicons - undefined --><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M22 8s-4 6-10 6S2 8 2 8m13 5.5l1.5 2.5m3.5-5l2 2M2 13l2-2m5 2.5L7.5 16" color="currentColor"/></svg>
                    </button>
                  <input ref="password" :type="is_pass ? 'password':'text'" placeholder="password" v-model="form.password" class="form-input"
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
const is_pass = ref(true);

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

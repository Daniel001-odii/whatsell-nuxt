<template>
  <div class="min-h-screen flex flex-row">
    <div
      class="w-full md:w-[50%] min-h-screen flex justify-center items-center p-3 md:p-12 flex-col"
    >

    <!-- ALERT HERE -->
     <div v-if="email_sent" class=" flex flex-col gap-3 justify-center items-center text-center">
      <i class="bi bi-envelope-check text-4xl text-gray-400"></i>
      <span class=" text-app_green font-bold text-2xl">Reset Email sent successfully!</span>
      <p> we have sent a password reset link to your email, <br/> ngwanu reset your password from there zi.</p>
     </div>

      <div v-else class="p-3 w-full max-w-lg">
        <h1 class="text-4xl text-app_green font-bold">Set a new password</h1>
        <form
          v-if="useRoute().query.token"
          @submit.prevent="resetPassword"
          class="flex flex-col"
        >
          <p class="my-3">Set a new password, must be at least 8 characters.</p>

          <span class="text-red-500 py-3">{{ error_message }}</span>

          <div class="flex flex-col gap-3">
            <div>
              <span class="font-bold text-lg">Password</span>
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

                <span
                  @click="show_pass = !show_pass"
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
                </span>
              </div>
              <small v-if="errors.password" class="text-red-500">{{
                errors.password
              }}</small>

              <div class="mt-3 flex flex-col gap-1">
               <!--  <span
                  class="text-[12px] text-gray-400 mb-3"
                  v-if="passwordStrength.score < 5"
                  >1 uppercase, lowercase, numbers, symbols and no spacing (If
                  you need one use this symbol “_”)
                </span> -->
                <span class="font-semibold text-sm mb-1"
                  >Password strength</span
                >
                <div
                  class="h-[8px] bg-[#e0e0e0] rounded-md overflow-hidden relative"
                >
                  <div
                    :class="[
                      'strength-level',
                      passwordStrength.label.toLowerCase(),
                    ]"
                    :style="{ width: passwordStrength.score * 20 + '%' }"
                  ></div>
                </div>
                <span class="text-sm">{{ passwordStrength.label }}</span>
              </div>
            </div>

            <div>
              <span class="font-bold text-lg">Password confirmation</span>
              <div class="relative">
                <input
                  name="password"
                  :type="show_pass ? 'text' : 'password'"
                  placeholder="password"
                  v-model="form.password_confirmation"
                  class="form-input"
                  :class="errors.password ? 'border-red-400' : ''"
                  required
                />
              </div>
              <small
                v-if="
                  form.password != '' &&
                  form.password != form.password_confirmation
                "
                class="text-red-500"
                >passwords do not match</small
              >
            </div>
          </div>
          <UButton
            type="submit"
            :disabled="form.password != form.password_confirmation || passwordStrength.score < 5"
            :loading="loading"
            loading-icon="svg-spinners:bars-rotate-fade"
            color="green"
            class="w-full justify-center p-3 font-bold my-4"
            >Reset Password</UButton
          >

          <div class="mt-3 text-gray-400">
            <p>
              Not yet a member?
              <RouterLink class="text-app_green" to="/register"
                >join us</RouterLink
              >
            </p>
          </div>
        </form>

        <form v-else @submit.prevent="sendResetMail" class="flex flex-col">
          <h1 class="text-4xl font-bold text-app_green">Reset Password</h1>
          <p class="my-3">
            Enter your email address to reset your password. If we find your
            email in our records, we will send you a link to reset your
            password.
          </p>

          <span class="text-red-500 py-3">{{ error_message }}</span>

          <div class="flex flex-col gap-3">
            <div>
              <div class="flex flex-row relative">
                <!-- <SpinnerComponent v-if="loading_email" class="absolute top-[50%] right-[5%]" /> -->
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="johndoe@gmail.com"
                  v-model="email"
                  class="form-input"
                  :class="error_message ? 'border-red-400' : ''"
                  required
                />
              </div>

              <small v-if="error_message" class="text-red-500">{{
                error_message
              }}</small>
            </div>
          </div>

          <UButton
            type="submit"
            :loading="loading"
            loading-icon="svg-spinners:bars-rotate-fade"
            color="green"
            class="w-full justify-center p-3 font-bold my-4"
            >Send reset link</UButton
          >
          <span
            >Not yet a member?
            <NuxtLink to="/register" class="underline text-app_green"
              >join us</NuxtLink
            ></span
          >
        </form>
      </div>
    </div>
    <div
      class="bg-[#f1f5f9] hidden md:flex md:w-[50%] min-h-full justify-center items-center"
    >
      <div class="size[300px]">
        <img src="../assets/images/pass_reset.png" />
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "headless",
});
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { _disabled } from "#tailwind-config/theme/aria";

const router = useRouter();
const toast = useToast();
const email = ref("");
const loading = ref(false);
const error_message = ref("");
const show_pass = ref(false);
const email_sent = ref(false);

const errors = reactive({
  password: "",
});

const passwordStrength = reactive({
  score: 0,
  label: "Weak",
});

const sendResetMail = async () => {
  loading.value = true;
  error_message.value = "";
  try {
    const res = await axios.post(
      `${useRuntimeConfig().public.apiBase}/password_reset/link`,
      {
        email: email.value,
      }
    );

    toast.add({ title: res.data.message });
    email_sent.value = true;

    console.log("reset mail sent", res.data.message);
  } catch (err) {
    console.log("error sending reset mail", err);
  }
  loading.value = false;
};

/*
    FOR ACTUAL PASSWORD RESET
  */
const form = reactive({
  email: "",
  token: "",
  password: "",
  password_confirmation: "",
});

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


// reset password...
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

const resetPassword = async () => {
  loading.value = true;
  error_message.value = "";
  try {
    const res = await axios.post(
      `${useRuntimeConfig().public.apiBase}/password_reset`,
      {
        email: form.email,
        token: useRoute().query.token,
        password: form.password,
        password_confirmation: form.password_confirmation,
      }
    );

    accessToken.value = res.data.accessToken;
    refreshToken.value = res.data.refreshToken;
    toast.add({ title: res.data.message })
    setTimeout(() => {
      router.push('/');
    }, 2000);

    console.log("password reset", res);
  } catch (err) {
    toast.add({ title: err.response.data.message });
    console.log("error resetting password", err);
  }
  loading.value = false;
};
</script>
<!-- Dan@tech123 -->
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

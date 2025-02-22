<template>
  <UModal
    :ui="{ container: 'flex items-center justify-center min-h-screen' }"
    v-model="image_cropper"
    prevent-close
  >
    <UCard
      :ui="{
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      }"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <h3
            class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
          >
            Select a shop image
          </h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="image_cropper = false"
          />
        </div>
      </template>
      <ImageCropper @image-uploaded="handleUploadSuccess" />
    </UCard>
</UModal>


<!-- {{form}} -->
  <div class="min-h-screen flex flex-row">
    <div
      class="w-full md:w-[50%] min-h-screen flex justify-center items-center p-3 md:p-12"
    >
      <div class="p-3 w-full max-w-lg">
        <form @submit.prevent="register">
          <h1 class="text-4xl font-bold text-app_green mb-3">Sign Up Seller</h1>
          <p class="my-3">Start your journey today! Selling made easy.</p>

          <!-- PROGRESS BAR -->
          <div
            class="flex flex-row justify-between mb-8 text-center w-full relative"
          >
            <div class="flex flex-col justify-center items-center gap-2">
              <span
                class="h-[40px] w-[40px] flex rounded-full justify-center font-bold items-center bg-app_green text-white"
                >1</span
              >
              <span class="text-sm text-gray-400">Personal details</span>
            </div>

            <div class="flex flex-col justify-center items-center gap-2">
              <span
                :class="
                  slide >= 1 ? 'bg-app_green text-white' : 'bg-white text-black'
                "
                class="h-[40px] w-[40px] flex rounded-full justify-center font-bold items-center border border-app_green"
                >2</span
              >
              <span class="text-sm text-gray-400">shop details</span>
            </div>

            <div class="flex flex-col justify-center items-center gap-2">
              <span
                :class="
                  slide >= 2 ? 'bg-app_green text-white' : 'bg-white text-black'
                "
                class="h-[40px] w-[40px] flex rounded-full justify-center font-bold items-center border border-app_green"
                >3</span
              >
              <span class="text-sm text-gray-400">shop preview</span>
            </div>
            <!-- Centered dashed border line -->
            <div
              class="border border-dashed absolute w-[80%] -z-10 top-5 left-0 right-0 mx-auto"
            ></div>
          </div>

          <span class="text-red-500 py-3">{{ error_message }}</span>

          <!-- FORM SLIDES... -->
          <!-- FORM SLIDE 1 -->
          <div v-show="slide == 0" class="flex flex-col gap-3">
            <div>
              <input
                class="form-input"
                id="username"
                type="text"
                v-model="form.username"
                @input="validateUsername"
                placeholder="your username"
              />

              <!-- <input type="text" placeholder="username" v-model="form.username" class="form-input" :class="errors.username ? 'border-red-400':''" required> -->
              <small
                v-if="errors.username || form.username == ''"
                class="text-red-500"
                >{{ errors.username }}</small
              >
            </div>
            <div>
              <div class="flex flex-row gap-2 relative">
                <input
                  @change="checkEmail"
                  type="email"
                  placeholder="example@mail.com"
                  v-model="form.email"
                  class="form-input"
                  :class="errors.email ? 'border-red-400' : ''"
                  required
                />
                <TheSpinner
                  class="absolute right-5 top-4"
                  v-if="email_loading"
                />
              </div>

              <small v-if="errors.email" class="text-red-500">{{
                errors.email
              }}</small>
            </div>
            <div>
              <div class="flex flex-row gap-2 relative">
                <input
                  class="form-input"
                  id="phone"
                  type="text"
                  v-model="form.phone"
                  @input="validatePhone"
                  @change="checkPhone"
                  placeholder="08123456789"
                />
                <TheSpinner
                  class="absolute right-5 top-4"
                  v-if="phone_loading"
                />
              </div>
              <small v-if="errors.phone" class="text-red-500">{{
                errors.phone
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
                <!-- <i  :class="show_pass ? 'bi-eye':'bi-eye-slash'" class="bi absolute top-3 right-3"></i> -->
              </div>
              <small v-if="errors.password" class="text-red-500">{{
                errors.password
              }}</small>

              <div class="mt-3 flex flex-col gap-1">
                <span
                  class="text-[12px] text-gray-400 mb-3"
                  v-if="passwordStrength.score < 5"
                  >1 uppercase, lowercase, numbers, symbols and no spacing (If
                  you need one use this symbol “_”)
                </span>
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

            <UButton
              type="button"
              @click="slide += 1"
              :disabled="
                loading ||
                email_loading ||
                phone_loading ||
                passwordStrength.score < 5 ||
                form_error ||
                form.email == '' ||
                form.username == '' ||
                form.phone == '' ||
                form.password == ''
              "
              class="!bg-app_green w-full p-3 justify-center"
            >
              Next
            </UButton>
          </div>

          <!-- FORM SLIDE 2 -->
          <div v-show="slide == 1" class="flex flex-col gap-3">
            <div>
              <div class="flex flex-row gap-2 relative">
                <input
                  type="text"
                  @input="validateShopName"
                  @change="checkShopName"
                  placeholder="Shop name"
                  v-model="form.shop_name"
                  class="form-input"
                  :class="errors.shop_name ? 'border-red-400' : ''"
                  required
                />
                <TheSpinner
                  class="absolute right-5 top-4"
                  v-if="shop_name_loading"
                />
              </div>
              <small
                v-if="errors.shop_name || form.shop_name == ''"
                class="text-red-500"
                >{{ errors.shop_name }}</small
              >
            </div>

            <div>
              <!-- <select class="form-input" v-model="shop_category">
                <option value="" disabled>Select Category</option>
                <option v-for="Category in shop_categories" :value="Category">{{ Category }}</option>
              </select> -->
              <USelect
                size="xl"
                v-model="form.shop_category"
                :options="shop_categories"
              />
            </div>

            <div>
              <textarea
                type="textarea"
                placeholder="Shop Bio"
                v-model="form.shop_description"
                class="form-input max-h-[100px] min-h-[100px]"
                :class="errors.shop_name ? 'border-red-400' : ''"
              ></textarea>
              <small
                v-if="errors.shop_name || form.shop_name == ''"
                class="text-red-500"
                >{{ errors.shop_name }}</small
              >
            </div>

            <div class="flex gap-3">
              <UButton
                variant="outline"
                type="button"
                @click="slide -= 1"
                class=""
              >
                <i class="bi bi-caret-left-fill"></i>
              </UButton>

              <div class="w-full">
                <UButton
                  type="button"
                  @click="slide += 1"
                  :disabled="
                    form.shop_name == '' ||
                    form.shop_category == '' ||
                    form.shop_description == '' ||
                    form_error
                  "
                  class="!bg-app_green justify-center w-full p-3"
                >
                  Next
                </UButton>
              </div>
            </div>
          </div>

          <!-- FORM SLIDE 3 -->
          <div v-show="slide == 2" class="flex flex-col gap-3">
            <div class="flex flex-col justify-center items-center gap-1">
              <span class="text-xl font-bold mb-4"
                >Select a profile photo for your shop</span
              >
              <div
                @click="image_cropper = !image_cropper"
                class="size-40 bg-gray-600 rounded-full relative flex justify-center items-center overflow-hidden outline outline-offset-2 outline-4 outline-green-500"
              >
                <img v-if="form.image" :src="form.image" class="size-full" />
                <span v-else class="text-gray-400">
                  <i class="bi bi-camera-fill text-4xl text-white"></i>
                </span>
              </div>
              <h1 class="font-bold text-lg">{{ form.shop_name }}</h1>
              <p>{{ form.shop_description }}</p>
              <span
                class="bg-green-500 bg-opacity-30 text-app_green px-3 p-2 rounded-md"
                >{{ form.shop_category }}</span
              >
            </div>

            <div class="flex gap-3">
              <UButton
                variant="outline"
                type="button"
                @click="slide -= 1"
                class=""
              >
                <i class="bi bi-caret-left-fill"></i>
              </UButton>

              <div class="w-full">
                <UButton
                  type="button"
                  @click="register"
                  :disabled="!form.image"
                  :loading="loading"
                  loading-icon="svg-spinners:6-dots-scale-middle"
                  class="!bg-app_green justify-center w-full p-3"
                >
                  Complete
                </UButton>
              </div>
            </div>
          </div>

          <p class="mt-3">
            Already a member?
            <NuxtLink class="text-app_green underline" to="/login"
              >Login</NuxtLink
            >
          </p>
        </form>
      </div>
    </div>
    <div
      class="bg-[#f1f5f9] hidden md:flex md:w-[50%] min-h-full justify-center items-center"
    >
      <div class="size[300px]">
        <img src="../../assets/images/auth_pages.png" />
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
import { useRouter } from "vue-router";
// import { Cropper, CircleStencil } from "vue-advanced-cropper";

import axios from 'axios'


const router = useRouter();
/* const img = ref(
  "https://images.unsplash.com/photo-1600984575359-310ae7b6bdf2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80"
);
const change = ({ coordinates, canvas }) => {
  console.log(coordinates, canvas);
}; */

const form = reactive({
  username: "",
  email: "",
  phone: "",
  password: "",
  image: "",
  shop_name: "",
  shop_category: "",
  shop_description: "",
});

const errors = reactive({
  username: "",
  email: "",
  phone: "",
  password: "",
});

const passwordStrength = reactive({
  score: 0,
  label: "Weak",
});

const shop_categories = reactive([
  "electronics",
  "furniture",
  "clothing & textile",
  "fashion & beauty",
  "health",
  "tools & industrial",
  "arts & crafts",
  "footwears",
  "phone & telecoms",
  "accessories",
  "phones",
  "baby, kids & toys",
  "drinks & groceries",
  "other",
]);

const show_pass = ref(false);
const loading = ref(false);
const form_error = ref(false);
const error_message = ref("");
const image_cropper = ref(false);
const slide = ref(2);

const phone_loading = ref(false);
const email_loading = ref(false);
const shop_name_loading = ref(false);

/* const validateUsername = () => {
  form.username = form.username.replace(/[^a-zA-Z0-9_]/g, "").slice(0, 15);
  errors.username =
    form.username.length < 3 ? "Username must be at least 3 characters" : "";
}; */

const evaluatePasswordStrength = (password) => {
  let score = 0;
  if (password.length > 8) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[\W]/.test(password)) score += 1;

  passwordStrength.score = score;
  passwordStrength.label = score <= 2 ? "Weak" : score <= 4 ? "Good" : "Strong";
};

const handleUploadSuccess = (image) => {
  console.log("image uploaded:", image);
  form.image = image;
  image_cropper.value = false;
};

// Function to check email
const checkEmail = async () => {
  email_loading.value = true;
  errors.email = "";
  form_error.value = false;
  try {
    const response = await axios.post(`${useRuntimeConfig().public.apiBase}/user/email_check`, {
      email: form.email,
    });
    console.log("Email response:", response);
  } catch (error) {
    console.log("Error checking email:", error);
    errors.email = error.response?.data?.message || "An error occurred";
    form_error.value = true;
  }
  email_loading.value = false;
};

// Function to check phone
const checkPhone = async () => {
  phone_loading.value = true;
  form_error.value = false;
  errors.phone = "";
  try {
    const response = await axios.get(`${useRuntimeConfig().public.apiBase}/user/phone_check/${form.phone}`);
    console.log("Phone response:", response);
  } catch (error) {
    console.log("Error checking phone:", error);
    errors.phone = error.response?.data?.message || "An error occurred";
    form_error.value = true;
  }
  phone_loading.value = false;
};

// Function to check shop name
const checkShopName = async () => {
  shop_name_loading.value = true;
  form_error.value = false;
  errors.shop_name = "";
  try {
    const response = await axios.get(
      `${useRuntimeConfig().public.apiBase}/shops/name_check/${form.shop_name}`
    );
    console.log("Shop name response:", response);
  } catch (error) {
    console.log("Error checking shop name:", error);
    errors.shop_name =
    error.response?.data?.message || "An error occurred";

    form_error.value = true;
  }
  shop_name_loading.value = false;
};

const accessToken = useCookie("accessToken", {
  maxAge: 60 * 60 * 24 * 7, // 7 days
  httpOnly: false, // Set to true if using from a server route
  secure: process.env.NODE_ENV === "production", // Use secure cookies in production
  sameSite: "strict",
});
const refreshToken = useCookie("refreshToken", {
  maxAge: 60 * 60 * 24 * 100, // 7 days
  httpOnly: false, // Set to true if using from a server route
  secure: process.env.NODE_ENV === "production", // Use secure cookies in production
  sameSite: "strict",
});

const toast = useToast();
const register = async () => {
  try {
    loading.value = true;

    // Check if user has a referral code
    const storedReferral = localStorage.getItem("refferal_code");
    if (storedReferral) {
      form.refferal_code = storedReferral;
      toast.add({ title: "You have been reffered" });
    }

    // Send registration request
    const response = await axios.post(
      `${useRuntimeConfig().public.apiBase}/register/secondary`,
      form,
      { withCredentials: true }
    );
    console.log("Registration response:", response);

    // Show success toast notification
    toast.add({ title: response.data.message });

    // Clear referral code from local storage
    localStorage.removeItem("refferal_code");

    accessToken.value = response.data.accessToken;
    refreshToken.value = response.data.refreshToken;

    // Redirect after success
    setTimeout(() => {
      router.push("/");
    }, 2000);

    form_error.value = false;
  } catch (error) {
    if (error.response?.data?.error?.errors) {
      const backendErrors = error.response.data.error.errors;
      errors.username = backendErrors.username?.message || "";
      errors.email = backendErrors.email?.message || "";
      errors.phone = backendErrors.phone?.message || "";
      errors.password = backendErrors.password?.message || "";
    } else {
      error_message.value =
        error.response?.data?.message || "An error occurred";
    }

    console.log("Error registering user:", error);
    loading.value = false;
  }
};


// Validate phone number
const validatePhone = () => {
  const validPhone = form.phone.replace(/[^0-9]/g, '').slice(0, 11)
  if (form.phone !== validPhone || validPhone.length > 11) {
    errors.phone = 'Only numbers are allowed, and must not exceed 11 digits.'
  } else {
    errors.phone = ''
  }
  form.phone = validPhone
}

// Validate username
const validateUsername = () => {
  const validUsername = form.username.replace(/[^a-zA-Z]/g, '').slice(0, 15)
  if (form.username.length > 15) {
    errors.username = 'Username must not exceed 15 characters.'
  } else if (form.username !== validUsername) {
    errors.username = 'Only alphabets are allowed.'
  } else {
    errors.username = ''
  }
  form.username = validUsername
}

// Validate shop name
const validateShopName = () => {
  const validShopName = form.shop_name.replace(/[^a-zA-Z]/g, '').slice(0, 15)
  if (form.shop_name.length > 15) {
    errors.shop_name = 'Shop name must not exceed 15 characters.'
  } else if (form.shop_name !== validShopName) {
    errors.shop_name = 'Only alphabets are allowed.'
  } else {
    errors.shop_name = ''
  }
  form.shop_name = validShopName
}

// Automatically validate input when values change
watch(() => form.phone, validatePhone)
watch(() => form.username, validateUsername)
watch(() => form.shop_name, validateShopName)
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

.strength-level {
  height: 100%;
  transition: width 0.3s;
}

.weak {
  background: #c03744;
}

.good {
  background: #eda145;
}

.strong {
  background: #15b097;
}
</style>

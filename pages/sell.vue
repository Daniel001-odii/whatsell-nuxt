<template>
    <div>

<!-- LISTING MODAL -->
<UModal
    :ui="{ container: 'flex items-center justify-center min-h-screen' }"
    v-model="listing_modal"
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
            Complete product listing
          </h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="listing_modal = false"
          />
        </div>
      </template>
      <div class=" flex flex-col gap-3 justify-center items-center">
        <div v-if="uploaded_product" class="flex flex-col justify-center items-center text-center">
            <span class=" font-bold text-3xl text-app_green">Product Uploaded!</span>
            <small>Click below to see your product page</small>
        </div>
        <ProductCard
        :class="uploaded_product ? 'border border-app_green':''"
        class=" !min-w-[200px] !w-[200px]"
        :id="uploaded_product ? uploaded_product._id:null"
        :product_slug="product.name"
        :has-liked-button="false"
        :image_url="product.images[0]"
        :product_price="product.price.toLocaleString()"
        :views="0"
        />
      </div>
      <template #footer>
        <UButton
        v-if="!uploaded_product"
        @click="postProduct"
        color="green"
        size="lg"
        label="Post Now"
        :loading="uploading_product"
        loading-icon="svg-spinners:6-dots-scale-middle"
        block
        />
        <!-- `/products/${id}/${product_slug}` -->
        <NuxtLink  v-else :to="`/products/${uploaded_product._id}/${uploaded_product.slug}`" target="_blank" class="w-full">
            <UButton
            icon="hugeicons:delivery-view-01"
            color="blue"
            size="lg"
            label="View Product"
            block
            />
        </NuxtLink>
      </template>
    </UCard>
</UModal>

<!-- GLIP MODAL -->
<UModal
    :ui="{ container: 'flex items-center justify-center min-h-screen' }"
    v-model="glips_modal"
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
            Complete glip listing
          </h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="glips_modal = false"
          />
        </div>
      </template>
      <div class=" flex flex-col gap-3 justify-center items-center">
        <div v-if="uploaded_product" class="flex flex-col justify-center items-center text-center">
            <span class=" font-bold text-3xl text-app_green">Glip Uploaded!</span>
            <small>Click below to see your product page</small>
        </div>
        <div class=" flex relative justify-center items-center">
            <img :src="product.thumbnail" class=" w-[150px] rounded-md"/>
            <span class="absolute text-white text-xl">
                <i class="bi bi-play-circle-fill"></i>
            </span>
           
        </div>
        
      </div>
      <template #footer>
        <UButton
        v-if="!uploaded_product"
        @click="postGlip"
        color="green"
        size="lg"
        label="Post Now"
        :loading="uploading_product"
        loading-icon="svg-spinners:6-dots-scale-middle"
        block
        />
        <UButton
        v-else
        @click="glips_modal = false"
        color="blue"
        size="lg"
        label="Continue"
        block
        />
      </template>
    </UCard>
</UModal>


<!-- {{ product }} -->

        <!-- TAB TOGGLES -->
        <div class=" flex flex-row p-1 bg-gray-500 bg-opacity-10 gap-1 rounded-md mt-12 max-w-md mx-auto">
            <UButton
            @click="currentTab = 0"
            :variant="currentTab == 0 ? 'solid':'ghost'"
            color="green"
            icon="heroicons:squares-plus"
            size="lg" label="Listings" 
            class=" flex-1 justify-center"/>
            <UButton
            @click="currentTab = 1"
            :variant="currentTab == 1 ? 'solid':'ghost'" 
            color="green"
            icon="heroicons:video-camera"
            size="lg" label="Glips" 
            class=" flex-1 justify-center"/>
        </div>

    
        <!-- CONTENT -->
        <!-- TAB 0 FOR LISTING -->
        <div v-if="currentTab == 0" class=" flex mt-6 max-w-md mx-auto">
            <!-- SLIDE 1 -->
            <div v-if="current_slide == 1" class="flex flex-col gap-5 p-2">
                <div class=" flex flex-col gap-2">
                    <span class=" font-bold">Product name</span>
                    <UInput
                    :maxlength="30"
                    v-model="product.name"
                    placeholder="Iphone 12 pro max"
                    required/>
                </div>
                <div class=" flex flex-col gap-1">
                    <span class=" font-bold">Product description</span>
                    <div class="relative w-full">
                    <textarea 
                    :maxlength="char_size"
                    v-model="product.description" required
                    class="border dark:border-gray-600 p-5 h-[200px] w-full rounded-md outline-none" 
                    placeholder="iphone 12 pro...
battery health 80%
True tone
128GB ROM">
                    </textarea>
                    <UButton
                    size="2xs"
                    disabled
                    class="absolute right-2 bottom-5"
                    variant="solid"
                    color="yellow"
                    label="Generate (beta)"
                    icon="hugeicons:ai-brain-03"
                    />
                </div>
                <small :class="product.description.length > 400 ? 'text-red-500':'text-blue-500'">{{ product.description.length }} of {{ char_size }}</small>
                </div>
                <div class=" flex flex-col gap-2">
                    <b>Product category</b>
                    <select v-model="product.category" class="p-3 rounded-md">
                        <option disabled value="">select category</option>
                        <option v-for="cat in categories">{{ cat.name }}</option>
                    </select>
                </div>
                <div class=" flex flex-col gap-3">
                    <span class="font-bold">Product image</span>
                    <span class=" text-blue-500">At least 1 photo of this product must be added. The first image will be displayed as the product thumbnail <br/>5 images maximum</span>
                    <div class="mt-3 flex flex-row gap-3 overflow-x-auto">
                        <label class=" !size-20 rounded-lg bg-green-500 bg-opacity-20 text-app_green flex items-center justify-center cursor-pointer">
                            <input type="file" class="hidden" @change="onFileChange" multiple>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13 21H3.6C3.26863 21 3 20.7314 3 20.4V3.6C3 3.26863 3.26863 3 3.6 3H20.4C20.7314 3 21 3.26863 21 3.6V13" stroke="#47C67F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M3 16L10 13L15.5 15.5" stroke="#47C67F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M16 10C14.8954 10 14 9.10457 14 8C14 6.89543 14.8954 6 16 6C17.1046 6 18 6.89543 18 8C18 9.10457 17.1046 10 16 10Z" stroke="#47C67F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M19 19V22M16 19H19H16ZM22 19H19H22ZM19 19V16V19Z" stroke="#47C67F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </label>
                        <div v-for="(image, index) in upload_image_results" :key="index">
                            <div 
                            :class="image.status == 'error' ? 'border-red-500':' dark:border-green-500'"
                            class="size-20 rounded-lg border overflow-hidden relative">

                                <div  class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                    <TheSpinner v-if="image.status == 'uploading'" class=" p-2 rounded-lg bg-black bg-opacity-40"/>
                                    <i v-if="image.status == 'error'" class="bi bi-exclamation-triangle-fill text-red-500"></i>
                                </div>
                                    
                                <img 
                                :src="image.image_preview" 
                                alt="Product Photo" 
                                class="w-full h-full object-cover">
                                <UButton 
                                size="2xs"
                                color="red"
                                square
                                icon="hugeicons:cancel-01"
                                variant="soft"
                                type="button" @click="removeImage(image.filePath, index)" class="absolute top-1 right-1"/>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="flex">
                    <UButton
                    :disabled="!product.name || !product.description || !product.category || product.images.length == 0"
                    class=" w-full justify-center"
                    label="Next"
                    color="green"
                    size="lg"
                    @click="current_slide++"
                    />
                </div>
            </div>
            
            <!-- SLIDE 2 -->
            <div v-if="current_slide == 2" class="flex flex-col gap-5 p-2 w-full">
                <div class=" flex flex-col gap-2">
                    <b>Product condition</b>
                    <select v-model="product.condition" class="p-3 rounded-md" required>
                        <option disabled value="">select condition</option>
                        <option v-for="item in product_condition">{{ item }}</option>
                    </select>
                </div>
                <div class=" flex flex-col gap-2">
                    <span class=" font-bold">Product price</span>
                   <NumberInput
                   v-model="product.price"
                   />
                </div>
                <div class=" flex flex-col gap-2">
                    <b>Will you charge for delivery</b>
                    <select v-model="product.charge_for_delivery" class="p-3 rounded-md" required>
                        <option disabled value="">select...</option>
                        <option v-for="item in yes_no">{{ item }}</option>
                    </select>
                </div>
                <div class=" flex flex-col gap-2" v-if="product.charge_for_delivery == 'yes'">
                    <span class=" font-bold">Delivery Fee</span>
                   <NumberInput
                   v-model="product.delivery_fee"
                   />
                </div>
                
                <div class=" flex flex-col gap-2">
                    <b>Are you open for negotiation</b>
                    <select v-model="product.price_negotiable" class="p-3 rounded-md" required>
                        <option disabled value="">select...</option>
                        <option v-for="item in yes_no">{{ item }}</option>
                    </select>
                   <!--  <USelect
                    :size="'xl'"
                    v-model="product.price_negotiable" 
                    :options="yes_no" 
                    required
                    /> -->
                </div>

                <div class=" flex flex-col gap-2 opacity-80">
                    <UCheckbox label="Auto-post this product (beta)" required :model-value="false" disabled/>
                    <div class=" flex gap-3 ml-8">
                        <i class="bi bi-whatsapp"></i>
                        <i class="bi bi-facebook"></i>
                        <i class="bi bi-twitter-x"></i>
                    </div>
                </div>

                <div class="flex gap-3">
                    <UButton
                    class=" flex-1 justify-center"
                    label="Previous"
                    color="gray"
                    size="lg"
                    @click="current_slide--"
                    />
                    <UButton
                    :disabled="!product.condition || !product.price || !product.charge_for_delivery || !product.price_negotiable"
                    @click="listing_modal = true"
                    class="flex-1 justify-center"
                    label="Complete"
                    color="green"
                    size="lg"
                    />
                </div>
            </div>
        </div>

        <!-- TAB 1 FOR GLIPS -->
        <div v-if="currentTab == 1" class=" flex mt-6 max-w-md mx-auto">
            <!-- SLIDE 1 -->
            <div v-if="current_slide == 1" class="flex flex-col gap-5 p-2 w-full">
                <div class=" flex flex-col gap-3">
                    <div class="mt-3 flex">
                        <div v-if="video_details.name" class="flex flex-row-reverse gap-3">
                            <div v-if="thumbnail" class="flex flex-col gap-2 max-w-[300px]">
                                <p class="text-sm"><strong>{{ video_details.name.substring(0,20) }}</strong></p>
                                <div>
                                    <p><strong>Size:</strong> {{ video_details.size }} MB</p>
                                    <p><strong>Duration:</strong> {{ video_details.duration }}</p>
                                    <UButton
                                    disabled
                                    size="sm"
                                    variant="soft"
                                    :color="glip_upload_status == 'uploading' ? 'blue':'green'"
                                    :icon="glip_upload_status == 'uploading' ? 'svg-spinners:bars-rotate-fade':'iconoir:check'"
                                    :label="glip_upload_status == 'uploading' ? 'uploading':'done'"
                                    />
                                    <UButton
                                    @click="deleteGlip"
                                    size="sm"
                                    variant="soft"
                                    label="delete"
                                    icon="iconoir:trash"
                                    color="red"
                                    />
                                </div>
                               <!--  <label class="btn bg-app_green text-white">Replace
                                    <input type="file" class="hidden" @change="onVideoFileChange">
                                </label> -->
                            </div>
                            <img :src="thumbnail" alt="Video Thumbnail" class="w-[50%] h-[200px]"/>
                        
                        </div>
                        <label  v-else class=" w-full border border-app_green py-6 rounded-lg bg-green-500 bg-opacity-20 text-app_green flex flex-col text-center items-center justify-center cursor-pointer">
                            <input type="file" class="hidden" @change="onVideoFileChange" multiple>
                            <div class=" flex flex-col">
                                <span class=" font-bold text-app_green">Upload a video clip of your product</span>
                                <span>Tap to input your media content</span>
                                <i class="bi bi-camera-video text-4xl"></i>
                            </div>
                        </label>
                    </div>
                </div>
                <div class=" flex flex-col gap-2">
                    <span class=" font-bold">Product name</span>
                    <UInput
                    :maxlength="30"
                    v-model="product.name"
                    placeholder="Iphone 12 pro max"
                    required/>
                </div>
                <div class=" flex flex-col gap-1">
                    <span class=" font-bold">Product description</span>
                    <div class="relative w-full">
                    <textarea 
                    :maxlength="char_size"
                    v-model="product.description" required
                    class="border dark:border-gray-600 p-5 h-[200px] w-full rounded-md outline-none" 
                    placeholder="iphone 12 pro...
battery health 80%
True tone
128GB ROM">
                    </textarea>
                    <UButton
                    size="2xs"
                    disabled
                    class="absolute right-2 bottom-5"
                    variant="solid"
                    color="yellow"
                    label="Generate (beta)"
                    icon="hugeicons:ai-brain-03"
                    />
                </div>
                <small :class="product.description.length > 400 ? 'text-red-500':'text-blue-500'">{{ product.description.length }} of {{ char_size }}</small>
                </div>
                <div class=" flex flex-col gap-2">
                    <b>Product category</b>
                    <select v-model="product.category" class="p-3 rounded-md">
                        <option disabled value="">select category</option>
                        <option v-for="cat in categories">{{ cat.name }}</option>
                    </select>
                </div>

                

                <div class="flex">
                    <UButton
                    :disabled="!product.name || !product.description || !product.category || !product.video_url"
                    class=" w-full justify-center"
                    label="Next"
                    color="green"
                    size="lg"
                    @click="current_slide++"
                    />
                </div>
            </div>
            
            <!-- SLIDE 2 -->
            <div v-if="current_slide == 2" class="flex flex-col gap-5 p-2 w-full">
                <div class=" flex flex-col gap-2">
                    <b>Product condition</b>
                    <select v-model="product.condition" class="p-3 rounded-md" required>
                        <option disabled value="">select condition</option>
                        <option v-for="item in product_condition">{{ item }}</option>
                    </select>
                </div>
                <div class=" flex flex-col gap-2">
                    <span class=" font-bold">Product price</span>
                   <NumberInput
                   v-model="product.price"
                   />
                </div>
                <div class=" flex flex-col gap-2">
                    <b>Will you charge for delivery</b>
                    <select v-model="product.charge_for_delivery" class="p-3 rounded-md" required>
                        <option disabled value="">select...</option>
                        <option v-for="item in yes_no">{{ item }}</option>
                    </select>
                </div>
                <div class=" flex flex-col gap-2" v-if="product.charge_for_delivery == 'yes'">
                    <span class=" font-bold">Delivery Fee</span>
                   <NumberInput
                   v-model="product.delivery_fee"
                   />
                </div>
                
                <div class=" flex flex-col gap-2">
                    <b>Are you open for negotiation</b>
                    <select v-model="product.price_negotiable" class="p-3 rounded-md" required>
                        <option disabled value="">select...</option>
                        <option v-for="item in yes_no">{{ item }}</option>
                    </select>
                </div>

                <div class=" flex flex-col gap-2 opacity-80">
                    <UCheckbox label="Auto-post this product (beta)" required :model-value="false" disabled/>
                    <div class=" flex gap-3 ml-8">
                        <i class="bi bi-whatsapp"></i>
                        <i class="bi bi-facebook"></i>
                        <i class="bi bi-twitter-x"></i>
                    </div>
                </div>

                <div class="flex gap-3">
                    <UButton
                    class=" flex-1 justify-center"
                    label="Previous"
                    color="gray"
                    size="lg"
                    @click="current_slide--"
                    />
                    <UButton
                    :disabled="!product.condition || !product.price || !product.charge_for_delivery || !product.price_negotiable"
                    @click="glips_modal = true"
                    class="flex-1 justify-center"
                    label="Complete"
                    color="green"
                    size="lg"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const glips_modal = ref(false);
const char_size = 500;
const currentTab = ref(0);
const current_slide = ref(1);
const product_category = ref('');
const product = reactive({
    name: '',
    description: '',
    category: '',
    images: [],
    condition: '',
    price: '',
    charge_for_delivery: '',
    delivery_fee: '',
    price_negotiable: '',

    // FOR GLIPS...
    video_url: '',
    thumbnail: '',
});


const categories = ref([]);
const getCategories = async () => {
    try{
        const res = await useNuxtApp().$apiFetch('/categories');
        categories.value = res.categories;
        console.log('categories', categories.value);
    }catch(err){
        console.log(err);
    }
}
getCategories();

const product_condition = [
    "brand new",
    "fairly used",
    "refurbished",
    "refurbished by manufacturer"
]
const yes_no = [
    "yes",
    "no"
]
const listing_modal = ref(false);

const onFileChange = (event)=> {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file) {
        // Allowed file types
        const allowedTypes = ["image/"];

        // Check if the file type is allowed
        const isValidFileType = allowedTypes.some(type => file.type.startsWith(type));

        if (!isValidFileType) {
            file_upload_error.value = "Please select a valid image file (jpg, png, svg, etc)";
        } else if (file.size > 3 * 1024 * 1024) {
            file_upload_error.value = "File size should not exceed 3MB.";
        } else {
            file_upload_error.value = "";
            file.progress 
            uploadFile(file);
        }
    }
    };
};


const glip_upload_status = ref(null);
const uploadVideoFile = async (file)=> {
    glip_upload_status.value  = 'uploading';
    try{
        const formData = new FormData();
        formData.append('video', file);
        const res = await useNuxtApp().$apiFetch('/products/video', {
            body: formData,
            method: 'POST'
        });
        console.log("video uploaded: ", res);
        product.video_url = res.videoUrl;
        product.thumbnail = res.thumbnailUrl;
    }catch(err){
        console.log("err uploading video: ", err);
    }
    glip_upload_status.value  = 'done';
};

const video_details = reactive({
    name: '',
    size: '',
    duration: ''
});
const thumbnail = ref(null);

const onVideoFileChange = (event)=> {
    const file = event.target.files[0];
    file_upload_error.value = ""; // Reset the error


    console.log("vid received: ", file)
    if (!file) {
        file_upload_error.value = "No file selected.";
        return;
    }

    // Check if the file type is video
    if (!file.type.startsWith('video')) {
        file_upload_error.value = "Only video files are allowed.";
        console.log("Only video files are allowed.")
        return;
    }

    // Check if the file size is less than or equal to 10MB
    const sizeInMB = (file.size / (1024 * 1024)).toFixed(2); // Convert bytes to MB
    /* if (sizeInMB > 10) {
        file_upload_error.value = "File size should be less than or equal to 10MB.";
        console.log("File size should be less than or equal to 10MB.")
        return;
    } */

    const videoElement = document.createElement('video');
    const canvasElement = document.createElement('canvas');
    
    videoElement.src = URL.createObjectURL(file);
    videoElement.muted = true; // Mute the video

    videoElement.addEventListener('loadedmetadata', () => {
        // Get video duration and convert it to seconds
        const duration = Math.floor(videoElement.duration); // Duration in seconds

        // Check if the video duration is greater than 30 seconds
        if (duration > 30) {
        file_upload_error.value = "Video too long (should not be more than 30 seconds).";
        console.log("Video too long (should not be more than 30 seconds).")
        return;
        }

        // If no error, store video details in the data
    
        video_details.name = file.name,
        video_details.size = sizeInMB,
        video_details.duration =`${duration}s` // Store duration in seconds

        // Set the current time to generate thumbnail at 5 seconds
        videoElement.currentTime = 5;
    });

    videoElement.addEventListener('seeked', async () => {
        const ctx = canvasElement.getContext('2d');
        canvasElement.width = videoElement.videoWidth;
        canvasElement.height = videoElement.videoHeight;
        ctx.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
        
        // Convert the canvas to a data URL (thumbnail image)
        thumbnail.value = canvasElement.toDataURL('image/jpeg');
        // start upload here..
        uploadVideoFile(file);
    });
};


const upload_image_results = ref([]);

const removeImage = (filePath, index)=> {
    upload_image_results.value.splice(index, 1);
    product.images.splice(index, 1);
    deleteImage(filePath);
};

const file_upload_error = ref('');
const image_uploading = ref(false);
const uploadFile = async (file) => {
    const result = {
        status: 'uploading',
        image_preview: '',
        filePath: '',
    };

    const url = URL.createObjectURL(file);
    result.image_preview = url;
    upload_image_results.value.push(result);
    const index = upload_image_results.value.length - 1;
  
    try{
        if(upload_image_results.length > 5){
            console.log("max file upload reached")
        } else {
            const formData = new FormData();
            formData.append('images', file);
            

            const res = await useNuxtApp().$apiFetch('/products/image', {
                body: formData,
                method: 'POST'
            });

            console.log("uploaded: ", res);

            // update upload status here...
            upload_image_results.value[index].status = "done";
            product.images.push(res.result.url)
            result.filePath = res.result.url
            // upload_image_results.push()

        }
    }catch(err){
        console.log("err in upload file: ", err);
        // console.log("current upload instance: ", upload_image_results.value[index])
        upload_image_results.value[index].status = "error";
    }
}

const extractFilePath =(url)=> {
    // Create a URL object
    const urlObj = new URL(url);

    // Extract the pathname from the URL
    const fullPath = urlObj.pathname;

    // Extract the portion of the path from the folder name to the image name
    const filePath = fullPath.substring(fullPath.indexOf('product-images/'));

    console.log("deleted: ", filePath)

    return filePath;
};

const deleteImage = async (filePath)=> {
    try {
        const extractedPath = extractFilePath(filePath).replace(/ /g, '%20');
        console.log("Attempting to delete: ", extractedPath);

        const response = await useNuxtApp().$apiFetch(`/products/image/delete`, {
            body: { filePath: extractedPath },
            method: 'DELETE',
        });
        console.log("deleting image: ", response);
    } catch (error) {
        console.log("error deleting image: ", error);
    }
};

const uploading_product = ref(false)
const uploaded_product = ref(null);

const toast = useToast()
const postProduct = async ()=> {
    uploading_product.value = true;
    try{
        const res = await useNuxtApp().$apiFetch('/products/new', {
            method: 'POST',
            body: product,
        });
        uploaded_product.value = res.product;
        console.log('upload red: ', res);

        // reset product
        Object.keys(product).forEach((key) => {
            if (Array.isArray(product[key])) {
            product[key] = [];
            } else {
            product[key] = '';
            }
        });
    }catch(err){
        console.log("err in product upload: ", err);
        toast.add({ title: err.res.message });
    }
    uploading_product.value = false;
}

const postGlip = async ()=> {
    uploading_product.value = true;
    try{
        const res = await useNuxtApp().$apiFetch('/products/glips/new', {
            method: 'POST',
            body: product,
        });
        console.log("res from posted glip: ", res)
        uploaded_product.value = res.glip;
        
        
        // reset product
        Object.keys(product).forEach((key) => {
            if (Array.isArray(product[key])) {
            product[key] = [];
            } else {
            product[key] = '';
            }
        });
        video_details.name = '';
        video_details.size = '';
        video_details.duration = '';

        current_slide.value = 1;
    }catch(err){
        console.log("err posting glip: ", err);
        // toast.add({ title: err.res.message });
    }
    uploading_product.value = false;
}

const deleteGlip = async ()=> {
    try{
        video_details.name = '';
        video_details.size = '';
        video_details.duration = '';

        const video_key = product.video_url.split('/').pop().split('?')[0];
        console.log("got video key: ", video_key)
        const res = await useNuxtApp().$apiFetch(`/products/glips/delete/${video_key}`, {
            method: 'DELETE'
        });
        console.info('deleted vid: ', res);
    }catch(err){
        console.error('err deleteing vid: ', err);
    }
}

onMounted(()=>{
    if(useRoute().query.type == 'glips'){
        currentTab.value = 1
    }
})

</script>

<style scoped>

</style>

<!-- https://res.cloudinary.com/djyopolxa/video/upload/eo_20,so_0/p0tltwnkoheolqa0fs5k -->
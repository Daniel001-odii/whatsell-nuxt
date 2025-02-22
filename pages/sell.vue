<template>
    <div>

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
      <div class=" flex justify-center items-center">
        <ProductCard
        class=" !min-w-[200px] !w-[200px]"
        :product_slug="product.name"
        :has-liked-button="false"
        :image_url="product.images[0]"
        :product_price="product.price.toLocaleString()"
        :views="0"
        />
      </div>
      <template #footer>
        <UButton
        @click="postProduct"
        color="green"
        size="lg"
        label="Post Now"
        :loading="uploading_product"
        loading-icon="svg-spinners:6-dots-scale-middle"
        block
        />
      </template>
    </UCard>
</UModal>

{{ product }}

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
            disabled
            @click="currentTab = 1"
            :variant="currentTab == 1 ? 'solid':'ghost'" 
            color="green"
            icon="heroicons:video-camera"
            size="lg" label="Glips" 
            class=" flex-1 justify-center"/>
        </div>

    
        <!-- CONTENT -->
        <div class=" flex mt-6 max-w-md mx-auto">
            <!-- SLIDE 1 -->
            <div v-if="current_slide == 1" class="flex flex-col gap-5 p-2">
                <div class=" flex flex-col gap-2">
                    <span class=" font-bold">Product name</span>
                    <UInput
                    :maxlength="30"
                    v-model="product.name"
                    required/>
                </div>
                <div class=" flex flex-col gap-2">
                    <span class=" font-bold">Product description</span>
                    <textarea 
                    v-model="product.description" required
                    class="border dark:border-gray-600 p-5 h-[200px]" 
                    placeholder="iphone 12 pro /n battery health 80%...">
                    </textarea>
                </div>
                <div class=" flex flex-col gap-2">
                    <b>Product category</b>
                   <!--  <USelect
                    :size="'xl'"
                    model-value="other"
                    v-model="product.category" 
                    :options="categories" 
                    option-attribute="name"
                    required
                    /> -->
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
                                icon="hugeicons:cancel-circle"
                                variant="link"
                                type="button" @click="removeImage(image.filePath, index)" class="absolute top-1 right-1"/>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="flex">
                    <UButton
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
                    <USelect
                    :size="'xl'"
                    model-value="brand new"
                    v-model="product.condition" 
                    :options="product_condition" 
                    required
                    />
                </div>
                <div class=" flex flex-col gap-2">
                    <span class=" font-bold">Product price</span>
                   <NumberInput
                   v-model="product.price"
                   />
                </div>
                <div class=" flex flex-col gap-2">
                    <b>Will you charge for delivery</b>
                    <USelect
                    :size="'xl'"
                    v-model="product.charge_for_delivery" 
                    :options="yes_no"
                    required
                    />
                </div>
                <div class=" flex flex-col gap-2">
                    <b>Are you open for negotiation</b>
                    <USelect
                    :size="'xl'"
                    v-model="product.price_negotiable" 
                    :options="yes_no" 
                    required
                    />
                </div>

                <div class=" flex flex-col gap-2 opacity-50">
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
                    @click="listing_modal = true"
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
            data: { filePath: extractedPath },
            method: 'DELETE',
        });
        console.log("deleting image: ", response);
    } catch (error) {
        console.log("error deleting image: ", error);
    }
};

const uploading_product = ref(false)
const postProduct = async ()=> {
    uploading_product.value = true;
    try{
        const res = await useNuxtApp().$apiFetch('/products/new', {
            method: 'POST',
            body: product,
        });
        console.log('upload red: ', res)
    }catch(err){
        console.log("err in product upload: ", err);
    }
    uploading_product.value = true;
}

</script>

<style scoped>

</style>
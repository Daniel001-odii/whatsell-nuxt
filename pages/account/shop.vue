<template>

<!-- SHOP IMAGE MODAL -->
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
      <ImageCropper 
      :image-src="blobUrl"
      @image-uploaded="handleUploadSuccess" />
    </UCard>
</UModal>

  <!-- DELETE PRODUCT -->
  <UModal 
  :ui="{ container: 'flex items-center justify-center min-h-screen' }"
  v-model="product_delete_modal" prevent-close>
    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            Delete product
          </h3>
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="product_delete_modal = false" />
        </div>
      </template>
      <div class="flex flex-row gap-3">
        <img :src="current_product.images[0]" class=" w-[100px] rounded-md"/>
        <div class=" flex flex-col">
          <span>Are you sure you want to this product?</span>
          <span class="text-2xl">{{ current_product.name }}</span>
          <span class=" font-bold">NGN {{ current_product.price.toLocaleString() }}</span>
        </div>
      </div>
      <template #footer>
        <div class=" flex flex-row justify-between">
          <UButton
          @click="product_delete_modal = false"
          label="cancel"
          color="gray"
          variant="outline"
          />
          <UButton
          @click="deleteProduct(current_product._id)"
          color="red"
          variant="solid"
          loading-icon="svg-spinners:bars-rotate-fade"
          :loading="deleting_prod"
          icon="hugeicons:delete-02"
          label="Delete"
          />
        </div>
      </template>
     
    </UCard>
  </UModal>

  <!-- EDIT PRODUCT MODAL -->
  <UModal 
  :ui="{ container: 'flex items-center justify-center min-h-screen' }"
  v-model="product_edit_modal" prevent-close>
    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            Edit Product
          </h3>
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="product_edit_modal = false" />
        </div>
      </template>
      <div class="flex flex-col gap-3">
        <div class="flex flex-row gap-3">
          <img :src="current_product.images[0]" class=" w-[100px] rounded-md"/>
          <div class=" flex flex-col">
            <span class="text-2xl font-bold">{{ current_product.name }}</span>
            <span class="text-sm text-green-500">{{ current_product.category }}</span>
            <div class= "flex gap-2 mt-3">
              <img  v-for="image in current_product.images" :src="image" class=" w-[45px] rounded-md"/>
            </div>
          </div>
        </div>
        <form @submit.prevent="updateProduct" class=" flex flex-col gap-3">
          <div class=" flex flex-col">
            <b>Product name</b>
            <UInput v-model="current_product.name" placeholder="product price" required=""/>
          </div>
        
          <div class=" flex flex-col">
            <b>Product price</b>
            <UInput v-model="current_product.price" placeholder="product price" required/>
          </div>

          <div class=" flex flex-col">
            <b>Product description</b>
            <textarea class="border dark:border-gray-600 p-3" v-model="current_product.description" placeholder="product description" required/>
          </div>

          <div class=" flex flex-col">
            <b>Product category</b>
            <USelect
            :size="'xl'"
            v-model="current_product.category" 
            :options="categories" 
            option-attribute="name" 
            required
            />
          </div>

          <div class=" flex flex-col">
            <b>Charge for delivery</b>
            <USelect
            :size="'xl'"
            v-model="current_product.charge_for_delivery" 
            :options="prod_delivery_charge"  
            />
          </div>

        </form>
      </div>
      <template #footer>
        <div class=" w-full flex">
          <UButton
          @click="updateProduct"
          class="!self-end"
          color="green"
          variant="solid"
          label="Update"
          loading-icon="svg-spinners:bars-rotate-fade"
          :loading="editing_prod"
          />
        </div>
      </template>
    </UCard>
  </UModal>

  <div>
    <!-- SHOP EDIT  -->
    <form @submit.prevent="updateShop" class="border dark:border-gray-600 rounded-lg flex flex-col p-5 gap-3">
      <div class=" flex justify-center items-center mt-6">
        <div @click="image_cropper = true"
            :style="`background: url(${shop.image})`"
            class=" size-[100px] border rounded-full dark:border-gray-600 !bg-cover !bg-center !bg-no-repeat 
            relative overflow-hidden group
            ">
            <div class=" h-full w-full absolute top-0 bg-black bg-opacity-30 group-hover:flex hidden justify-center items-center">
              <i class=" bi bi-camera-fill text-white text-2xl"></i>
            </div>
          
        </div>
      </div>

      <div class=" flex flex-col gap-3 mt-4">
        <span>Shop or business name</span>
        <UInput 
        placeholder="Enter shop name" v-model="shop.name" disabled/>
        <small class=" text-blue-500"><i class="bi bi-exclamation-circle"></i> Please contact support if you would want to change your shop name</small>
      </div>

      <div class=" flex flex-col gap-3 ">
        <span>Shop description</span>
        <UInput 
        type="textarea"
        placeholder="Enter shop name" v-model="shop.description"/>
      </div>

      <!-- {{ shop.category }} -->
      <div class=" flex flex-col gap-3 ">
        <span>Shop category</span>
        <USelect
        search
        :size="'xl'"
        v-model="shop.category" 
        :options="categories" 
        option-attribute="name" 
        />
      </div>

      <UButton 
      :loading="loading_shop"
      type="submit"
      class=" !bg-app_green self-end mt-4"
      loading-icon="svg-spinners:bars-rotate-fade"
      label="Save Edits"
      />
    </form>


    <!-- PROUDUCTS -->
    <div class="divider-tab">
        My Products
    </div>
    <div class="border dark:border-gray-600 rounded-lg flex flex-col p-5">
      
      <UTable
      :loading="loading_products"
      :loading-state="{ icon: 'svg-spinners:bars-rotate-fade', label: 'Loading Your Products...' }"
      :progress="{ color: 'primary', animation: 'carousel' }"
      :rows="products" 
      :columns="columns"
      >
        <template #actions-data="{ row }">
          <UDropdown :items="items(row)">
            <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
          </UDropdown>
        </template>
        <template #empty-state>
          <div class="flex flex-col items-center justify-center py-6 gap-3">
            <span class="italic text-sm">No Products Listings Yet!</span>
            <UButton label="Add Product" />
          </div>
        </template>
      </UTable>

      <!-- current_page, total_page, getShopProducts -->
        <!-- pagination for products -->
      <div class=" flex gap-6 mt-1 w-full justify-center items-center" v-if="products.length > 0">
            <UButton
            :loading="loading_products"
            loading-icon="svg-spinners:bars-rotate-fade"
            :disabled="current_page == 1"
            variant="ghost"
            color="green"
            @click="[current_page --, getShopProducts()]"
            icon="heroicons:arrow-small-left"
            />
            <span>{{ current_page }} of {{ total_page }}</span>
            <UButton
            :loading="loading_products"
            loading-icon="svg-spinners:bars-rotate-fade"
            variant="ghost"
            color="green"
            :disabled="current_page == total_page"
            icon="heroicons:arrow-small-right"
            @click="[current_page ++, getShopProducts()]"
            />
      </div>
    </div>

    <!-- SPECIAL ACTIONS -->
      <!-- PROUDUCTS -->
    <div class="divider-tab">
        Special Actions
    </div>
    <div class="border dark:border-gray-600 rounded-lg flex flex-col p-5">
      <UAlert
        icon="hugeicons:swipe-right-07"
        color="orange"
        variant="solid"
        title="Heads up!"
        description="By toggling any of these special actions you can perform the listed transactions. Follow the steps carefully to carry out each action successfully."
      />

      <div class=" mt-4 flex flex-col gap-4">
        <div class=" flex flex-row justify-between items-center">
          <div class=" flex flex-col">
            <b class="text-xl">Boost your shop</b>
            <span>Increase your shop visibility for a specific time frame</span>
          </div>
          <UToggle
            color="green"
            on-icon="i-heroicons-check-20-solid"
            off-icon="i-heroicons-x-mark-20-solid"
            v-model="shop.is_boosted"
          />
        </div>
        <div class=" flex flex-row justify-between items-center">
          <div class=" flex flex-col">
            <b class="text-xl">Advertise a service/event</b>
            <span>Expand reach with front row billboard access, pay per ad click</span>
          </div>
          <UToggle
            disabled
            color="green"
            on-icon="i-heroicons-check-20-solid"
            off-icon="i-heroicons-x-mark-20-solid"
            :model-value="false"
          />
        </div>
      </div>
    </div>
  </div>

  <!-- SHOP BOOST MODAL -->
  <UModal
  :ui="{ container: 'flex items-center justify-center min-h-screen' }"
    v-model="boost_shop_modal"
    prevent-close
  >
  <UCard>
    <template #header>
        <div class="flex items-center justify-between">
          <h3
            class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
          >
            Boost Your Shop
          </h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="boost_shop_modal = false"
          />
        </div>
    </template>
    <div class=" flex justify-center items-center flex-col gap-3">
      <div class=" w-fit rounded-full border-[6px] border-purple-500 p-1 relative ">
        <div 
          :style="`background: url(${shop.image})`"
          class=" size-[100px] rounded-full dark:border-gray-600 !bg-cover !bg-center !bg-no-repeat 
          overflow-hidden
          ">
        </div>
        <span class=" absolute size-[30px] -right-2 bottom-2 text-white rounded-full flex justify-center items-center bg-purple-500 p-3">
          <i class="bi bi-rocket-takeoff-fill"></i>
        </span>
      </div>

      <div class=" flex flex-col mt-4 text-center">
        <span class=" text-xl">Boost <b>{{ shop.name }}</b> shop</span>
        <span>Proceed to select your desired timeline and make payment</span>
      </div>

      <UAlert
        icon="hugeicons:rocket-01"
        color="purple"
        variant="solid"
        title="Heads up!"
        description="This transaction is slot-based, once all slots are booked you have to wait till a slot is available before you can boost your shop."
      />

      <div class=" flex flex-wrap gap-4 justify-start items-center py-3 w-full">
        <UButton
        @click="shop_boost_duration = coin" 
        class=" !flex-1 justify-center w-[128px]"
        v-for="coin in 7"
        :variant="shop_boost_duration == coin ? 'solid':'ghost'"
        color="purple"
        :label="`${coin}D`"
        />
      
        <div class=" flex justify-between items-center w-full">
            <span>{{ shop_boost_duration }}D</span>
            <span>=</span>
            <input class=" border-b p-3 outline-none w-[85%]" placeholder="XXX" disabled :value="`${shop_boost_duration * 10} Coins`">
        </div>

        
      </div>
      
    </div>
    <template #footer>
      <div class=" flex items-center justify-end gap-6">
        <UButton
          variation="soft"
          color="gray"
          label="Cancel"
          @click="boost_shop_modal = false"
          />
          <UButton
          variant="solid"
          color="green"
          icon="hugeicons:cash-01"
          label="Pay"
          />
      </div>

     
    </template>
  </UCard>
  </UModal>
</template>

<script setup>
// use headless layout
definePageMeta({
  layout: 'accounts',
})
import { useRouter } from "vue-router";

const shop_boost_duration = ref(1);
const router = useRouter();
const shop = reactive({
  name: '',
  category: '',
  description: '',
  image: ''
})
const columns = [
{
  key: 'name',
  label: 'Name',
  sortable: true
}, {
  key: 'category',
  label: 'Category',
  sortable: true
}, {
  key: 'price',
  label: 'Price',
  sortable: true
},{
  key: 'actions'
}
];

const current_product = ref(null);
const items = row => [
  [
  {
    label: 'view',
    icon: 'hugeicons:delivery-view-02',
    click: () => {
      router.push(`/products/${row._id}/${row.name}`)
    }
  },
  {
    label: 'Edit',
    icon: 'hugeicons:edit-02',
    click: () => {
      product_edit_modal.value = !product_edit_modal.value;
      current_product.value = row;
    }
  }, 
], 
  [{
    label: 'Delete',
    iconClass: 'text-red-500 dark:text-red-500',
    class: 'text-red-500 dark:text-red-500',
    icon: 'hugeicons:delete-02',
    click: () => {
      product_delete_modal.value = !product_delete_modal.value;
      current_product.value = row;
    }
  }]
]

const boost_shop_modal = ref(true);

const product_edit_modal = ref(false);
const product_delete_modal = ref(false);
const prod_delivery_charge = [
  "yes",
  "no"
];

const products = ref([]);
const loading_products = ref(false);
const current_page = ref(1);
const total_page = ref(1);
const total_products = ref(1);
const loading_shop = ref(false);
const selected = ref([products[1]])
const getShopProducts = async(shop_name = user.value.shop.name)=>{
  loading_products.value = true;
  try{
    const res = await useNuxtApp().$apiFetch(`/products/${shop_name}/shop?page=${current_page.value}`);
    products.value = res.products;
    current_page.value = res.currentPage;
    total_page.value = res.totalPages;
    total_products.value = res.totalProducts;

    console.log("products: ", res);
  }catch(err){
    console.log("err getting shops products: ", err)
  }
  loading_products.value = false;
}

const updateShop = async()=>{
  loading_shop.value = true
  try{
    const shop_id = user.value.shop._id;
    const res = await useNuxtApp().$apiFetch(`/shops/${shop_id}/edit`, {
      method: 'PATCH',
      body: {
        shop
      }
    })
    toast.add({ title: res.message })
  }catch(err){
    toast.add({ title: err.res.message })
  }
  loading_shop.value = false
}

const user = ref('');
const getUserDetails = async()=> {
    try {
        const res = await useNuxtApp().$apiFetch(`/user`);
        user.value = res.user;
        shop.name = res.user.shop.name;
        shop.category = res.user.shop.category;
        shop.description = res.user.shop.description;
        shop.image = res.user.shop.profile.image_url;
        getShopProducts(res.user.shop.name);
        console.log('user: ', res)
    } catch (error) {
        console.log(error);
    }
}
getUserDetails();

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

const toast = useToast();
const deleting_prod = ref(false);
const deleteProduct = async(product_id)=> {
  deleting_prod.value = true;
  try{
    const res = await useNuxtApp().$apiFetch(`/products/${product_id}/delete`, {
      method: 'DELETE'
    })
    toast.add({ title: res.message });
    product_delete_modal.value = false;
    getShopProducts(user.value.shop.name);
  }catch(err){
    console.log("err deleteing prod: ", err);
  }
  deleting_prod.value = false;
}

const editing_prod = ref(false);
const updateProduct = async()=> {
  editing_prod.value = true;
  const prod_id = current_product.value._id
  try{
    const product = current_product.value;
    const res = await useNuxtApp().$apiFetch(`/products/${prod_id}/edit`, {
      method: 'PUT',
      body: {
        product
      }
    })
    console.log('edit prod: ', res);
    product_edit_modal.value = false;
    toast.add({ title: res.message });
    getShopProducts();
  }catch(err){
    console.log("err editing prod: ", err);
  }
  editing_prod.value = false;
}

const image_cropper = ref(false);
const handleUploadSuccess = (image) => {
  console.log("image uploaded:", image);
  shop.image = image;
  updateShop();
  image_cropper.value = false;
};

</script>

<style scoped>

</style>
<template>
    <!-- VERIFY WITHDRAWAL -->
    <UModal v-model="verify_modal">
        <UCard>
            <template #header>
                <h1 class=" font-bold text-xl text-app_green">Verify withdrawal</h1>
                <span>We need to make sure its actually you initializing this transaction</span>
            </template>

            <div class=" flex flex-col gap-3 justify-center items-center text-center py-6">
                <span class="font-bold">Enter the 6-digit verification code <br/>sent to your registered email</span>
                <div>
                    <PinInputRoot id="pin-input" v-model="value" placeholder="○" class="flex gap-2 items-center mt-1"
                        @complete="handleComplete">
                        <PinInputInput
                        v-model="otp" 
                        type="text"
                        otp
                        v-for="(id, index) in 6" :key="id" :index="index"
                            class="w-10 h-10 bg-transparent border dark:border-gray-600 rounded text-center shadow-lg text-green10 placeholder:text-mauve8 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-white" />
                    </PinInputRoot>
                </div>
            </div>

            <div class=" flex justify-between">
                <UButton label="Cancel" variant="outline" color="gray" class="p-3" @click="verify_modal = false" />

                <UButton color="green" variant="solid" class="p-3" label="Verify Withdrawal" />
            </div>
        </UCard>
    </UModal>

    <!-- WITHDRAWAL FORM -->
    <UModal v-model="withdrawal_modal" prevent-close
        :ui="{ container: 'flex items-center justify-center min-h-screen' }">
        <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
            <template #header>
                <div class="flex items-center justify-between">
                    <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                        Withdraw Funds
                    </h3>

                    <UButton @click="withdrawal_modal = false" color="gray" variant="ghost"
                        icon="i-heroicons-x-mark-20-solid" class="-my-1" />

                </div>
            </template>

            <div class=" text-left flex flex-col gap-6">
                <div>
                    <h1 class=" font-bold text-app_green text-2xl">Withdraw Funds</h1>
                    <small>Please ensure your withdrawal amount is not above your current balance</small>
                </div>

                <div class=" flex flex-col">
                    <span>Enter withdrawal amount</span>
                    <NumberInput :model-value="withdrawal.amount" />
                </div>

                <div>
                    <span>Withdrawal details</span>
                    <div class=" flex flex-wrap gap-3 items-start">
                        <div class=" flex flex-col flex-1 min-w-[200px]">
                            <span>Bank name</span>
                            <UInput placeholder="Enter bank name" v-model="withdrawal.bank_name" />
                        </div>
                        <div class=" flex flex-col flex-1 min-w-[200px]">
                            <span>Account name</span>
                            <UInput placeholder="John Doe" v-model="withdrawal.bank_name" />
                        </div>
                        <div class=" flex flex-col flex-1 min-w-[200px]">
                            <span>Account number</span>
                            <UInput placeholder="XXXXXXXXX" v-model="withdrawal.bank_name" />
                        </div>
                    </div>
                </div>
            </div>
            <template #footer>
                <div class=" flex justify-between">
                    <UButton label="Cancel" variant="outline" color="gray" class="p-3"
                        @click="withdrawal_modal = false" />

                    <UButton @click="verify_modal = true" color="green" variant="solid" class="p-3" label="Proceed to verification" />
                </div>
            </template>
        </UCard>
    </UModal>


    <div>
        <div class=" flex flex-wrap gap-3">
            <div class=" flex flex-col gap-3 p-5 border rounded-md dark:border-gray-600 flex-1">
                <span class=" text-sm bg-green-500 bg-opacity-10 text-green-600 rounded-md p-2 w-fit">
                    <i class="bi bi-wallet2"></i> wallet
                </span>
                <span class="flex items-center gap-3">Available Balance 
                    <UButton 
                    :icon="show_balance ? 'iconoir:eye-empty':'iconoir:eye-off'" 
                    @click="show_balance = !show_balance"
                    color="gray"
                    variant="ghost"/>
                </span>
                <div class=" font-bold text-2xl text-nowrap">NGN 
                    <span v-if="show_balance">17,200</span>
                    <span v-else>****</span>
                </div>
            </div>
            <div class=" flex flex-col gap-3 p-5 border rounded-md dark:border-gray-600 flex-1">
                <span class=" text-sm  bg-orange-500 bg-opacity-10 text-orange-600 rounded-md p-2 w-fit">
                    <i class="bi bi-wallet2"></i> Escrow
                </span>
                <span class="flex items-center gap-3">Available Balance 
                    <UButton 
                    :icon="show_escrow ? 'iconoir:eye-empty':'iconoir:eye-off'" 
                    @click="show_escrow = !show_escrow"
                    color="gray"
                    variant="ghost"/>
                </span>
                <div class=" font-bold text-2xl text-nowrap">NGN 
                    <span v-if="show_escrow">10,000</span>
                    <span v-else>****</span>
                </div>
            </div>
        </div>

        <!-- QUICK ACTIONS -->
        <div class="flex flex-col gap-3 rounded-md border dark:border-gray-600 p-5 mt-4">
            <h2 class=" font-bold">Quick Actions</h2>
            <div class="flex gap-3 flex-wrap">
                <UButton disabled color="red" class="p-5 flex-1 text-nowrap" icon="hugeicons:circle-arrow-down-02"
                    label="Deposit Funds" />
                <UButton @click="withdrawal_modal = true" color="green" class="p-5 flex-1 text-nowrap"
                    icon="hugeicons:circle-arrow-up-02" label="withdraw Funds" />
            </div>
        </div>
    </div>
</template>

<script setup>
import NumberInput from '~/components/NumberInput.vue';

// use headless layout
definePageMeta({
    layout: 'accounts',
})
const verify_modal = ref(false);
const withdrawal_modal = ref(false);

const withdrawal = reactive({
    amount: '',
    bank_name: '',
    account_name: '',
    account_no: ''
})



import { Label, PinInputInput, PinInputRoot } from 'radix-vue'

const value = ref([])
function handleComplete(e) {
  // eslint-disable-next-line no-alert
  alert(e.join(''))
}

const otp = ref(null);

const show_balance = ref(false);
const show_escrow= ref(false);

</script>

<style lang="scss" scoped></style>
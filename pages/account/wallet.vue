<template>
    <!-- DEPOSIT MODAL -->
    <UModal v-model="deposit_modal" prevent-close
        :ui="{ container: 'flex items-center justify-center min-h-screen' }">
        <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
            <template #header>
                <div class="flex items-center justify-between">
                    <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                        Deposit Funds
                    </h3>
                    <UButton @click="deposit_modal = false" color="gray" variant="ghost"
                        icon="i-heroicons-x-mark-20-solid" class="-my-1" />
                </div>
            </template>

            <div class="text-left flex flex-col gap-6">
                <div>
                    <h1 class="font-bold text-app_green text-2xl">Deposit Funds</h1>
                    <small>Add funds to your wallet to continue enjoying our services</small>
                </div>

                <div class="flex flex-col gap-4">
                    <div>
                        <span class="text-sm font-medium">Select amount</span>
                        <div class="grid grid-cols-3 gap-2 mt-2">
                            <UButton 
                                v-for="amount in deposit_amounts" 
                                :key="amount"
                                :variant="selected_deposit_amount === amount ? 'solid' : 'outline'"
                                :color="selected_deposit_amount === amount ? 'green' : 'gray'"
                                @click="selected_deposit_amount = amount"
                                class="p-3">
                                ₦{{ amount.toLocaleString() }}
                            </UButton>
                        </div>
                    </div>

                    <div>
                        <span class="text-sm font-medium">Or enter custom amount</span>
                        <NumberInput 
                            :model-value="custom_deposit_amount" 
                            @update:model-value="custom_deposit_amount = $event"
                            placeholder="Enter amount" />
                    </div>
                </div>
            </div>

            <template #footer>
                <div class="flex justify-between">
                    <UButton label="Cancel" variant="outline" color="gray" class="p-3"
                        @click="deposit_modal = false" />
                    <UButton 
                        @click="initiateDeposit" 
                        :loading="deposit_loading"
                        color="green" 
                        variant="solid" 
                        class="p-3" 
                        label="Proceed to Payment" />
                </div>
            </template>
        </UCard>
    </UModal>

    <!-- VERIFY WITHDRAWAL -->
    <UModal v-model="verify_modal">
        <UCard>
            <template #header>
                <h1 class="font-bold text-xl text-app_green">Verify Withdrawal</h1>
                <span>We need to make sure it's actually you initiating this transaction</span>
            </template>

            <div class="flex flex-col gap-3 justify-center items-center text-center py-6">
                <span class="font-bold">Enter the 6-digit verification code <br/>sent to your registered email</span>
                <div>
                    <PinInputRoot id="pin-input" v-model="otp_value" placeholder="-" class="flex gap-2 items-center mt-1"
                        @complete="handleOtpComplete">
                        <PinInputInput
                            v-for="(id, index) in 6" 
                            :key="id" 
                            :index="index"
                            type="text"
                            class="w-10 h-10 bg-transparent border dark:border-gray-600 rounded text-center shadow-lg text-green10 placeholder:text-mauve8 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-white" />
                    </PinInputRoot>
                </div>
                <div v-if="otp_error" class="text-red-500 text-sm">{{ otp_error }}</div>
            </div>

            <div class="flex justify-between">
                <UButton label="Cancel" variant="outline" color="gray" class="p-3" @click="verify_modal = false" />
                <UButton 
                    @click="verifyWithdrawal" 
                    :loading="verify_loading"
                    color="green" 
                    variant="solid" 
                    class="p-3" 
                    label="Verify Withdrawal" />
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

            <div class="text-left flex flex-col gap-6">
                <div>
                    <h1 class="font-bold text-app_green text-2xl">Withdraw Funds</h1>
                    <small>Please ensure your withdrawal amount is not above your current balance</small>
                </div>

                <div class="flex flex-col gap-4">
                    <div>
                        <span class="text-sm font-medium">Available Balance</span>
                        <div class="text-2xl font-bold text-app_green">₦{{ wallet_balance.toLocaleString() }}</div>
                    </div>

                    <div>
                        <span class="text-sm font-medium">Enter withdrawal amount</span>
                        <NumberInput 
                            :model-value="withdrawal.amount" 
                            @update:model-value="withdrawal.amount = $event"
                            placeholder="Enter amount" />
                        <div v-if="withdrawal_error" class="text-red-500 text-sm mt-1">{{ withdrawal_error }}</div>
                    </div>

                    <div>
                        <span class="text-sm font-medium">Withdrawal details</span>
                        <div class="flex flex-wrap gap-3 items-start mt-2">
                            <div class="flex flex-col flex-1 min-w-[200px]">
                                <span class="text-xs text-gray-600 dark:text-gray-400">Bank name</span>
                                <UInput 
                                    placeholder="Enter bank name" 
                                    v-model="withdrawal.bank_name" 
                                    class="mt-1" />
                            </div>
                            <div class="flex flex-col flex-1 min-w-[200px]">
                                <span class="text-xs text-gray-600 dark:text-gray-400">Account name</span>
                                <UInput 
                                    placeholder="John Doe" 
                                    v-model="withdrawal.account_name" 
                                    class="mt-1" />
                            </div>
                            <div class="flex flex-col flex-1 min-w-[200px]">
                                <span class="text-xs text-gray-600 dark:text-gray-400">Account number</span>
                                <UInput 
                                    placeholder="XXXXXXXXX" 
                                    v-model="withdrawal.account_no" 
                                    class="mt-1" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <template #footer>
                <div class="flex justify-between">
                    <UButton label="Cancel" variant="outline" color="gray" class="p-3"
                        @click="withdrawal_modal = false" />
                    <UButton 
                        @click="initiateWithdrawal" 
                        :loading="withdrawal_loading"
                        color="green" 
                        variant="solid" 
                        class="p-3" 
                        label="Proceed to verification" />
                </div>
            </template>
        </UCard>
    </UModal>

    <!-- TRANSACTION HISTORY MODAL -->
    <UModal v-model="history_modal" size="2xl">
        <UCard>
            <template #header>
                <div class="flex items-center justify-between">
                    <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                        Transaction History
                    </h3>
                    <UButton @click="history_modal = false" color="gray" variant="ghost"
                        icon="i-heroicons-x-mark-20-solid" class="-my-1" />
                </div>
            </template>

            <div class="max-h-96 overflow-y-auto">
                <div v-if="loading_transactions" class="flex justify-center py-8">
                    <USpinner size="lg" />
                </div>
                <div v-else-if="transactions.length === 0" class="text-center py-8 text-gray-500">
                    No transactions found
                </div>
                <div v-else class="space-y-3">
                    <div 
                        v-for="transaction in transactions" 
                        :key="transaction._id"
                        class="flex items-center justify-between p-3 border rounded-lg dark:border-gray-600">
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 rounded-full flex items-center justify-center"
                                :class="transaction.type === 'credit' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'">
                                <i :class="transaction.type === 'credit' ? 'bi bi-arrow-down-circle' : 'bi bi-arrow-up-circle'"></i>
                            </div>
                            <div>
                                <div class="font-medium">{{ transaction.description }}</div>
                                <div class="text-sm text-gray-500">{{ formatDate(transaction.created_at) }}</div>
                            </div>
                        </div>
                        <div class="text-right">
                            <div :class="transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'" class="font-medium">
                                {{ transaction.type === 'credit' ? '+' : '-' }}₦{{ transaction.amount.toLocaleString() }}
                            </div>
                            <div class="text-xs text-gray-500">{{ transaction.status }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </UCard>
    </UModal>

    <!-- MAIN WALLET CONTENT -->
    <div>
        <!-- BALANCE CARDS -->
        <div class="flex flex-wrap gap-3">
            <div class="flex flex-col gap-3 p-5 border rounded-md dark:border-gray-600 flex-1">
                <span class="text-sm bg-green-500 bg-opacity-10 text-green-600 rounded-md p-2 w-fit">
                    <i class="bi bi-wallet2"></i> Wallet
                </span>
                <span class="flex items-center gap-3">Available Balance 
                    <UButton 
                        :icon="show_balance ? 'iconoir:eye-empty':'iconoir:eye-off'" 
                        @click="show_balance = !show_balance"
                        color="gray"
                        variant="ghost"/>
                </span>
                <div class="font-bold text-2xl text-nowrap">NGN 
                    <span v-if="show_balance">{{ wallet_balance.toLocaleString() }}</span>
                    <span v-else>****</span>
                </div>
            </div>
            <div class="flex flex-col gap-3 p-5 border rounded-md dark:border-gray-600 flex-1">
                <span class="text-sm bg-orange-500 bg-opacity-10 text-orange-600 rounded-md p-2 w-fit">
                    <i class="bi bi-wallet2"></i> Escrow
                </span>
                <span class="flex items-center gap-3">Available Balance 
                    <UButton 
                        :icon="show_escrow ? 'iconoir:eye-empty':'iconoir:eye-off'" 
                        @click="show_escrow = !show_escrow"
                        color="gray"
                        variant="ghost"/>
                </span>
                <div class="font-bold text-2xl text-nowrap">NGN 
                    <span v-if="show_escrow">{{ escrow_balance.toLocaleString() }}</span>
                    <span v-else>****</span>
                </div>
            </div>
        </div>

        <!-- QUICK ACTIONS -->
        <div class="flex flex-col gap-3 rounded-md border dark:border-gray-600 p-5 mt-4">
            <h2 class="font-bold">Quick Actions</h2>
            <div class="flex gap-3 flex-wrap">
                <UButton 
                    @click="deposit_modal = true" 
                    color="red" 
                    class="p-5 flex-1 text-nowrap" 
                    icon="hugeicons:circle-arrow-down-02"
                    label="Deposit Funds" />
                <UButton 
                    @click="withdrawal_modal = true" 
                    color="green" 
                    class="p-5 flex-1 text-nowrap"
                    icon="hugeicons:circle-arrow-up-02" 
                    label="Withdraw Funds" />
                <UButton 
                    @click="history_modal = true" 
                    color="blue" 
                    class="p-5 flex-1 text-nowrap"
                    icon="hugeicons:history" 
                    label="Transaction History" />
            </div>
        </div>

        <!-- RECENT TRANSACTIONS -->
        <div class="mt-6">
            <div class="flex items-center justify-between mb-4">
                <h3 class="font-bold">Recent Transactions</h3>
                <UButton 
                    @click="history_modal = true" 
                    variant="ghost" 
                    color="gray" 
                    size="sm">
                    View All
                </UButton>
            </div>
            
            <div v-if="loading_transactions" class="flex justify-center py-8">
                <USpinner />
            </div>
            <div v-else-if="recent_transactions.length === 0" class="text-center py-8 text-gray-500">
                No recent transactions
            </div>
            <div v-else class="space-y-3">
                <div 
                    v-for="transaction in recent_transactions" 
                    :key="transaction._id"
                    class="flex items-center justify-between p-3 border rounded-lg dark:border-gray-600">
                    <div class="flex items-center gap-3">
                        <div class="w-8 h-8 rounded-full flex items-center justify-center text-sm"
                            :class="transaction.type === 'credit' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'">
                            <i :class="transaction.type === 'credit' ? 'bi bi-arrow-down' : 'bi bi-arrow-up'"></i>
                        </div>
                        <div>
                            <div class="font-medium text-sm">{{ transaction.description }}</div>
                            <div class="text-xs text-gray-500">{{ formatDate(transaction.created_at) }}</div>
                        </div>
                    </div>
                    <div class="text-right">
                        <div :class="transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'" class="font-medium text-sm">
                            {{ transaction.type === 'credit' ? '+' : '-' }}₦{{ transaction.amount.toLocaleString() }}
                        </div>
                        <div class="text-xs text-gray-500">{{ transaction.status }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import NumberInput from '~/components/NumberInput.vue';
import { PinInputInput, PinInputRoot } from 'radix-vue';

// use headless layout
definePageMeta({
    layout: 'accounts',
});

// Modal states
const deposit_modal = ref(false);
const withdrawal_modal = ref(false);
const verify_modal = ref(false);
const history_modal = ref(false);

// Balance visibility
const show_balance = ref(false);
const show_escrow = ref(false);

// Wallet data
const wallet_balance = ref(0);
const escrow_balance = ref(0);
const transactions = ref([]);
const recent_transactions = ref([]);
const loading_transactions = ref(false);

// Deposit form
const deposit_amounts = [1000, 2000, 5000, 10000, 20000, 50000];
const selected_deposit_amount = ref(1000);
const custom_deposit_amount = ref('');
const deposit_loading = ref(false);

// Withdrawal form
const withdrawal = reactive({
    amount: '',
    bank_name: '',
    account_name: '',
    account_no: ''
});
const withdrawal_loading = ref(false);
const withdrawal_error = ref('');

// OTP verification
const otp_value = ref([]);
const otp_error = ref('');
const verify_loading = ref(false);

// Toast notification
const toast = useToast();

// Get wallet data
const getWalletData = async () => {
    try {
        const res = await useNuxtApp().$apiFetch('/user/wallet');
        wallet_balance.value = res.wallet?.balance || 0;
        escrow_balance.value = res.wallet?.escrow_balance || 0;
        transactions.value = res.wallet?.transactions || [];
        recent_transactions.value = transactions.value.slice(0, 5);
    } catch (error) {
        console.error('Error fetching wallet data:', error);
        toast.add({ 
            title: 'Error fetching wallet data', 
            color: 'red' 
        });
    }
};

// Get transactions
const getTransactions = async () => {
    loading_transactions.value = true;
    try {
        const res = await useNuxtApp().$apiFetch('/user/wallet/transactions');
        transactions.value = res.transactions || [];
        recent_transactions.value = transactions.value.slice(0, 5);
    } catch (error) {
        console.error('Error fetching transactions:', error);
        toast.add({ 
            title: 'Error fetching transactions', 
            color: 'red' 
        });
    }
    loading_transactions.value = false;
};

// Initiate deposit
const initiateDeposit = async () => {
    const amount = custom_deposit_amount.value || selected_deposit_amount.value;
    
    if (!amount || amount <= 0) {
        toast.add({ 
            title: 'Please enter a valid amount', 
            color: 'red' 
        });
        return;
    }

    deposit_loading.value = true;
    try {
        const res = await useNuxtApp().$apiFetch('/user/wallet/deposit', {
            method: 'POST',
            body: { amount: parseInt(amount) }
        });
        
        // Redirect to payment gateway
        window.location.href = res.payment_url;
    } catch (error) {
        console.error('Error initiating deposit:', error);
        toast.add({ 
            title: error._data?.message || 'Error initiating deposit', 
            color: 'red' 
        });
    }
    deposit_loading.value = false;
};

// Initiate withdrawal
const initiateWithdrawal = async () => {
    // Validate form
    if (!withdrawal.amount || withdrawal.amount <= 0) {
        withdrawal_error.value = 'Please enter a valid amount';
        return;
    }
    
    if (parseInt(withdrawal.amount) > wallet_balance.value) {
        withdrawal_error.value = 'Amount exceeds available balance';
        return;
    }
    
    if (!withdrawal.bank_name || !withdrawal.account_name || !withdrawal.account_no) {
        withdrawal_error.value = 'Please fill in all bank details';
        return;
    }

    withdrawal_error.value = '';
    withdrawal_loading.value = true;
    
    try {
        const res = await useNuxtApp().$apiFetch('/user/wallet/withdraw', {
            method: 'POST',
            body: {
                amount: parseInt(withdrawal.amount),
                bank_details: {
                    bank_name: withdrawal.bank_name,
                    account_name: withdrawal.account_name,
                    account_no: withdrawal.account_no
                }
            }
        });
        
        // Close withdrawal modal and open verification modal
        withdrawal_modal.value = false;
        verify_modal.value = true;
        
        // Reset form
        Object.keys(withdrawal).forEach(key => {
            withdrawal[key] = '';
        });
        
        toast.add({ 
            title: 'Verification code sent to your email', 
            color: 'green' 
        });
    } catch (error) {
        console.error('Error initiating withdrawal:', error);
        toast.add({ 
            title: error._data?.message || 'Error initiating withdrawal', 
            color: 'red' 
        });
    }
    withdrawal_loading.value = false;
};

// Handle OTP completion
const handleOtpComplete = (value) => {
    otp_value.value = value;
};

// Verify withdrawal
const verifyWithdrawal = async () => {
    if (otp_value.value.length !== 6) {
        otp_error.value = 'Please enter the complete 6-digit code';
        return;
    }

    verify_loading.value = true;
    otp_error.value = '';
    
    try {
        const res = await useNuxtApp().$apiFetch('/user/wallet/verify-withdrawal', {
            method: 'POST',
            body: { 
                otp: otp_value.value.join('') 
            }
        });
        
        verify_modal.value = false;
        otp_value.value = [];
        
        toast.add({ 
            title: 'Withdrawal request submitted successfully', 
            color: 'green' 
        });
        
        // Refresh wallet data
        await getWalletData();
    } catch (error) {
        console.error('Error verifying withdrawal:', error);
        otp_error.value = error._data?.message || 'Invalid verification code';
    }
    verify_loading.value = false;
};

// Format date
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

// Watch for custom deposit amount changes
watch(custom_deposit_amount, (newVal) => {
    if (newVal) {
        selected_deposit_amount.value = null;
    }
});

// Watch for selected deposit amount changes
watch(selected_deposit_amount, (newVal) => {
    if (newVal) {
        custom_deposit_amount.value = '';
    }
});

// Initialize data on mount
onMounted(() => {
    getWalletData();
    getTransactions();
});
</script>

<style lang="scss" scoped></style>
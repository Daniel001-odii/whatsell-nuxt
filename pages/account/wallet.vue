<template>
    <div>
        <div class=" flex flex-wrap gap-3">
            <div class=" flex flex-col gap-3 p-5 border rounded-md dark:border-gray-600 flex-1">
                <span class=" text-sm bg-green-500 bg-opacity-10 text-green-600 rounded-md p-2 w-fit">
                    <i class="bi bi-wallet2"></i> wallet
                </span>
                <span>Available Balance</span>
                <span class=" font-bold text-2xl">NGN 17,200</span>
            </div>
            <div class=" flex flex-col gap-3 p-5 border rounded-md dark:border-gray-600 flex-1">
                <span class=" text-sm  bg-orange-500 bg-opacity-10 text-orange-600 rounded-md p-2 w-fit">
                    <i class="bi bi-wallet2"></i> Escrow
                </span>
                <span>Available Balance</span>
                <span class=" font-bold text-2xl">NGN 17,200</span>
            </div>
        </div>

        <!-- QUICK ACTIONS -->
         <div class="flex flex-col gap-3 rounded-md border dark:border-gray-600 p-5 mt-4">
            <h2 class=" font-bold">Quick Actions</h2>
            <div class="flex gap-3">
                <UButton
                color="red"
                class="p-5"
                icon="hugeicons:circle-arrow-down-02"
                label="Deposit Funds"
                />
                <UButton
                color="green"
                class="p-5"
                icon="hugeicons:circle-arrow-up-02"
                label="Deposit Funds"
                />
            </div>
         </div>
    </div>
</template>

<script setup>
// use headless layout
definePageMeta({
  layout: 'accounts',
})
</script>

<style lang="scss" scoped>

</style>
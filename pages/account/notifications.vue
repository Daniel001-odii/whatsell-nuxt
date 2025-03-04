<template>
    <div>
        <div class="border dark:border-gray-600 rounded-lg flex flex-col gap-3 p-8 mt-3">
            <div>
                <h1 class=" font-bold">Email notifications</h1>
                <span>Allow us send you email notifications for any of these activities by simply toggling it on</span>
            </div>

            
            <div v-for="toggle in notifications" class=" flex justify-between items-center mb-5">
                <div>
                    <h2>{{ toggle.title }}</h2>
                    <small>{{ toggle.subs }}</small>
                </div>
                <UToggle
                disabled
                color="green"
                on-icon="i-heroicons-check-20-solid"
                off-icon="i-heroicons-x-mark-20-solid"
                :model-value="true"
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

const notifications = [
  {
    title: "Engagement Alerts",
    subs: "Get notified when shops you follow list new product, events and discounts"
  },
  {
    title: "Order notifications",
    subs: "Get updates on new, completed, cancelled orders."
  },
  {
    title: "Promotional notifications",
    subs: "Get updates on new features, deals or platform promotions"
  },
  {
    title: "Message Alerts",
    subs: "Get notified when a customer sends a message"
  },
  {
    title: "Payment Updates",
    subs: "Receive alerts about payments, refunds, or transaction issues"
  },
  {
    title: "Platform Announcements",
    subs: "Get notified about important updates, changes or maintenance schedules"
  },
  {
    title: "New Feature Highlights",
    subs: "Be the first to know when new tools or features are launched"
  },
  {
    title: "Daily Sales Insights",
    subs: "Receive a summary of your daily sales performance"
  },
  {
    title: "Help & Support Updates",
    subs: "Get notified when a support ticket or query is addressed"
  }
];

console.log(notifications);

</script>

<style lang="scss" scoped>

</style>
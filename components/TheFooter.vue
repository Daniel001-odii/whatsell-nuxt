<template>
  <footer class="p-8 pt-24 border-t dark:border-gray-600 md:p-6">
    <div
      class="flex flex-row flex-wrap justify-between md:container mx-auto gap-6"
    >
      <!-- Logo and Description Section -->
      <div class="flex flex-col gap-3 w-full md:w-[35%]">
        <!-- <h2 class="text-2xl font-bold text-green-700">WhatSell</h2> -->
        <img src="../assets/images/logo/whatsell_logo.png" class="w-[120px]" />
        <p class="mt-4">
          WhatSell connects buyers and sellers seamlessly, bringing local
          shopping to your fingertips. Discover, buy, and sell effortlessly
          within your community and support local businesses and enjoy a smarter
          shopping experience!
        </p>

        <!-- WhatsApp Channel -->
        <div class="mt-6">
          <h3 class="font-semibold">Join Our WhatsApp Channel</h3>
          <p class="">Access, stay up to date and grow with WhatSell</p>
          <div
            class="mt-3 flex items-center border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden"
          >
            <input
              type="text"
              class="p-2 w-full outline-none"
              value="https://chat.whatsapp.com/FKlBouQOk2FIhp0sLGTntT"
              readonly
            />
            <a
              href="https://chat.whatsapp.com/FKlBouQOk2FIhp0sLGTntT"
              target="_blank"
            >
              <button class="p-2 bg-slate-300/50">
                <i class="bi bi-whatsapp"></i>
              </button>
            </a>
          </div>
        </div>
      </div>

      <!-- Categories Section -->
      <!-- <div class="flex flex-col gap-3 flex-1">
        <h3 class="text-lg font-semibold mb-2">Categories</h3>
        <ul class=" space-y-2">
          <li>Electronics & Gadgets</li>
          <li>Health & Beauty</li>
          <li>Automotive</li>
          <li>Office Supplies</li>
          <li>Arts & Crafts Supplies</li>
          <li>Fashion & Apparel</li>
          <li>Books & Media</li>
          <li>Toys & Games</li>
          <li>Pet Supplies</li>
          <li>Jewelry & Watches</li>
          <li>Home & Kitchen</li>
          <li>Sport & Outdoors</li>
          <li>Grocery & Gourmet Food</li>
          <li>Baby Products</li>
          <li>Travel & Luggage</li>
        </ul>
      </div>  -->

      <!-- Quick Links Section -->
      <!-- <div class="flex flex-col gap-3 flex-1">
        <h3 class="text-lg font-semibold mb-2">Quick Links</h3>
        <ul class=" space-y-2">
          <li>Market</li>
          <li>Shops</li>
          <li>Categories</li>
          <li>Wallet</li>
          <li>Clips</li>
          <li>Accounts</li>
          <li>Terminologies</li>
          <li>Safety Tips</li>
          <li>FAQ's</li>
          <li>Help</li>
        </ul>
      </div> -->

      <!-- Contact Us Section -->
      <div class="flex flex-col gap-3 flex-1">
        <h3 class="text-lg font-semibold mb-2">Contact Us</h3>
        <ul class="space-y-2">
          <li>+234 706 789 5678</li>
          <li>+234 802 789 5390</li>
          <li>support@whatsell.com</li>
          <li>HQ @ No 12, Alesa, Isarowiwa Road, Port Harcourt, Nigeria</li>
        </ul>
      </div>
    </div>

    <!-- Social Media Icons and Footer Bottom -->
    <div
      class="container flex flex-row flex-wrap md:justify-between items-center border-t mx-auto py-8 gap-6 mt-4 font-bold dark:border-gray-600"
    >
      <!-- Social Media Icons -->
      <div class="flex space-x-8 text-green-700">
        <a href="https://chat.whatsapp.com/FKlBouQOk2FIhp0sLGTntT"><i class="bi bi-whatsapp text-xl"></i></a>
        <!-- <a href="#"><i class="bi bi-facebook text-xl"></i></a> -->
        <!-- <a href="#"><i class="bi bi-instagram text-xl"></i></a> -->
        <!-- <a href="#"><i class="bi bi-linkedin text-xl"></i></a> -->
      </div>

      <!-- Footer Links -->
     <!--  <div class="flex space-x-8">
        <a href="#">Terms of Use</a>
        <a href="#">Privacy Policy</a>
      </div> -->

      <!-- Copyright -->
      <p class="">&copy; All Rights reserved by WhatSell 2025</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: "TheFooter",
};
</script>

<style scoped></style>

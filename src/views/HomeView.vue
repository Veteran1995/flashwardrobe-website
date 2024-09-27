<template>
  <div>
    <FullScreenLoading v-if="isLoading" />
    <Slider :slides="frontSettings" />
    <Brand />
    <Avert1 />
    <NewArrival
      :products="trendyProducts"
      text="Trendy Products"
      description="Get The Trendy Products in Town Flashwardrobe"
    />
    <!-- <TrendingProducts :products="trendyProducts" /> -->
    <Avert2 />
    <NewArrival
      :products="newProducts"
      text="New Arrival"
      description="Get The Latest Flashy Items in Town From Flashwardrobe"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axiosAdmin from "@/common/plugins/axiosAdmin";
import common from "../common/composable/common";

import Brand from "@/components/Brand.vue";
import Slider from "@/components/Slider.vue";
import TrendingProducts from "@/components/TrendingProducts.vue";
import Avert1 from "@/components/Avert1.vue";
import Avert2 from "@/components/Avert2.vue";
import NewArrival from "@/components/NewArrival.vue";
import FullScreenLoading from "@/components/FullScreenLoading.vue";

// Remove import if Header is not used
// import Header from "@/components/Header.vue";

// Call the composable (common) and extract any needed properties
const { frontWarehouse } = common();

// Define your reactive variables
const route = useRoute();
const frontSettings = ref({});
const frontProductCards = ref([]);
const featuredProducts = ref([]);
const currency = ref({});
const categories = ref([]);
const newProducts = ref([]);
const trendyProducts = ref([]);
const warehouse = ref([]);
const isLoading = ref(true); // Initialize isLoading to true

// Fetch data on component mount
onMounted(async () => {
  try {
    const response = await axiosAdmin
      .get("front/homepage/flash-wordrobe-2z17xsaa")
      .then((response) => {
        currency.value = response.data.currency;
        frontSettings.value = response.data.front_settings;
        frontProductCards.value = frontSettings.front_product_cards;
        console.log(frontSettings.value);
        featuredProducts.value = frontProductCards.featured_products_details;
        newProducts.value = response.data.front_product_cards.filter(
          (e) => e.title === "New Arrival"
        );
        trendyProducts.value = response.data.front_product_cards.filter(
          (e) => e.title === "Feature Products"
        );
      });

    const categoriesResponse = await axiosAdmin.get("shop-categories");
    categories.value = categoriesResponse.message.categories;
  } catch (error) {
    // Handle errors here (e.g., display error message)
  } finally {
    isLoading.value = false; // Set loading to false after processing
  }
});
</script>

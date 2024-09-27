<template>
  <div class="container">
    <div class="heading heading-center mb-3">
      <h2 class="title">Trendy Products</h2>

      <ul class="nav nav-pills justify-content-center" role="tablist">
        <li class="nav-item">
          <a
            class="nav-link active"
            id="trendy-all-link"
            data-toggle="tab"
            href="#trendy-all-tab"
            role="tab"
            aria-controls="trendy-all-tab"
            aria-selected="true"
          >
            All
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            id="trendy-women-link"
            data-toggle="tab"
            href="#trendy-women-tab"
            role="tab"
            aria-controls="trendy-women-tab"
            aria-selected="false"
          >
            Women
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            id="trendy-men-link"
            data-toggle="tab"
            href="#trendy-men-tab"
            role="tab"
            aria-controls="trendy-men-tab"
            aria-selected="false"
          >
            Men
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            id="trendy-access-link"
            data-toggle="tab"
            href="#trendy-access-tab"
            role="tab"
            aria-controls="trendy-access-tab"
            aria-selected="false"
          >
            Accessories
          </a>
        </li>
      </ul>
    </div>

    <div
      class="owl-carousel owl-simple carousel-equal-height carousel-with-shadow owl-loaded owl-drag"
      data-toggle="owl"
      :data-owl-options="{
        nav: false,
        dots: true,
        margin: 20,
        loop: false,
        responsive: {
          '0': { items: 2 },
          '480': { items: 2 },
          '768': { items: 3 },
          '992': { items: 4 },
          '1200': { items: 4, nav: true },
        },
      }"
    >
      <div class="owl-stage-outer">
        <div
          v-if="products.length > 0"
          class="owl-stage"
          style="
            transform: translate3d(0px, 0px, 0px);
            transition: all;
            width: 1438px;
          "
        >
          <template
            v-for="item in products[0].products_details"
            :key="item.xid"
          >
            <TrendyProductCard :item="item" />
          </template>
        </div>
      </div>

      <div class="owl-nav disabled">
        <button type="button" role="presentation" class="owl-prev disabled">
          <i class="icon-angle-left"></i>
        </button>
        <button type="button" role="presentation" class="owl-next">
          <i class="icon-angle-right"></i>
        </button>
      </div>
      <div class="owl-dots">
        <button role="button" class="owl-dot active"><span></span></button>
        <button role="button" class="owl-dot"><span></span></button>
      </div>
    </div>
  </div>

  <div class="mb-5"></div>
</template>

<script setup>
import TrendyProductCard from "@/components/TrendyProductCard.vue";
import { defineProps } from "vue";

defineProps({
  products: {
    type: Array,
  },
});
// import { ref, onMounted, watch } from "vue";
// import { useStore } from "vuex";
// import { message } from "ant-design-vue";
// import { filter, forEach } from "lodash-es";
// import cart from "../common/composable/cart";
// import { getSalesPriceWithTax } from "../common/scripts/functions";
</script>

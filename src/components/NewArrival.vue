<template>
  <div class="container pt-6 new-arrivals">
    <div class="heading heading-center mb-3">
      <h2 class="title">{{ text }}</h2>
      <!-- End .title -->

      <ul class="nav nav-pills justify-content-center" role="tablist">
        <li class="nav-item">
          <a
            class="nav-link active"
            id="new-all-link"
            data-toggle="tab"
            href="#new-all-tab"
            role="tab"
            aria-controls="new-all-tab"
            aria-selected="true"
            >All</a
          >
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            id="new-cloth-link"
            data-toggle="tab"
            href="#new-cloth-tab"
            role="tab"
            aria-controls="new-cloth-tab"
            aria-selected="false"
            >Clothing</a
          >
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            id="new-shoes-link"
            data-toggle="tab"
            href="#new-shoes-tab"
            role="tab"
            aria-controls="new-shoes-tab"
            aria-selected="false"
            >Shoes &amp; Boots</a
          >
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            id="new-access-link"
            data-toggle="tab"
            href="#new-access-tab"
            role="tab"
            aria-controls="new-access-tab"
            aria-selected="false"
            >Accessories</a
          >
        </li>
      </ul>
    </div>
    <!-- End .heading -->

    <div class="tab-content">
      <div
        class="tab-pane p-0 fade show active"
        id="new-all-tab"
        role="tabpanel"
        aria-labelledby="new-all-link"
      >
        <div class="products" v-if="products.length > 0">
          <div class="row justify-content-center">
            <template
              v-for="item in products[0].products_details"
              :key="item.xid"
            >
              <NewArrivalProductCard :item="item" />
            </template>
            <!-- End .col-sm-6 col-md-4 col-lg-3 -->
          </div>
          <!-- End .row -->
        </div>
        <!-- End .products -->
      </div>
      <!-- .End .tab-pane -->
    </div>
    <!-- End .tab-content -->

    <div class="more-container text-center mt-1 mb-3">
      <a href="#" class="btn btn-outline-primary-2 btn-round btn-more"
        >Load more</a
      >
    </div>
    <!-- End .more-container -->
  </div>

  <div class="mb-2"></div>
</template>

<script setup>
import NewArrivalProductCard from "./NewArrivalProductCard.vue";

// products should be an array of objects
defineProps({
  products: {
    type: Array,
  },
  text: {
    type: String,
  },
});
</script>

<template>
  <div class="col-6 col-md-4 col-lg-3" v-if="item && item.xid">
    <div class="product product-2">
      <figure class="product-media">
        <a href="product.html">
          <img
            :src="item.image_url"
            alt="Product image"
            class="product-image"
             style="height:300px; background-size:contain"
          />
          <img
            :src="item.image_url"
            alt="Product image"
            class="product-image-hover"
          />
        </a>

        <div class="product-action-vertical">
          <a
            href="#"
            class="btn-product-icon btn-wishlist"
            title="Add to wishlist"
            ><span>add to wishlist</span></a
          >
        </div>
        <!-- End .product-action -->

        <div class="product-action product-action-transparent">
          <a href="#" class="btn-product btn-cart"><span>add to cart</span></a>
        </div>
        <!-- End .product-action -->
      </figure>
      <!-- End .product-media -->

      <div class="product-body">
        <div class="product-cat">
          <a href="#">Clothing</a>
        </div>
        <!-- End .product-cat -->
        <h3 class="product-title">
          <a href="product.html">{{ item.name }}</a>
        </h3>
        <!-- End .product-title -->
        <div class="product-price">$60.00</div>
        <!-- End .product-price -->
        <div class="product-nav product-nav-dots">
          <a href="#" class="active" style="background: #e5dcb1"
            ><span class="sr-only">Color name</span></a
          >
          <a href="#" style="background: #b9cbd8"
            ><span class="sr-only">Color name</span></a
          >
        </div>
        <!-- End .product-nav -->
      </div>
      <!-- End .product-body -->
    </div>
    <!-- End .product -->
  </div>
</template>

<script setup>
import { defineProps } from "vue";

// products should be an array of objects
defineProps({
  item: {
    type: Object,
  },
});
</script>

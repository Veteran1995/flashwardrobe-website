<template>
  <div class="page-content">
    <div class="container">
      <div class="product-details-top">
        <div class="row">
          <div class="col-md-6">
            <div class="product-gallery product-gallery-vertical">
              <figure class="product-main-image">
                <img
                  id="product-zoom"
                  :src="currentProduct.image_url"
                  :data-zoom-image="currentProduct.image_url"
                  alt="product image"
                />
                <a
                  href="#"
                  id="btn-product-gallery"
                  class="btn-product-gallery"
                >
                  <i class="icon-arrows"></i>
                </a>
              </figure>
              <!-- Additional image gallery items -->
            </div>
          </div>

          <div class="col-md-6">
            <div class="product-details">
              <h1 class="product-title">
                {{ currentProduct?.name || "Loading..." }}
              </h1>
              <div class="ratings-container">
                <div class="ratings">
                  <div class="ratings-val" style="width: 80%"></div>
                </div>
                <a
                  class="ratings-text"
                  href="#product-review-link"
                  id="review-link"
                >
                  ( 2 Reviews )
                </a>
              </div>

              <div class="product-price">
                {{ formatAmountCurrency(getSalesPriceWithTax(currentProduct)) }}
              </div>

              <div class="product-content">
                <p>{{ currentProduct?.description || "Loading..." }}</p>
              </div>

              <div class="details-filter-row details-row-size">
                <label>Color:</label>
                <div class="product-nav product-nav-thumbs">
                  <a href="#" class="active">
                    <img :src="currentProduct.image_url" alt="product desc" />
                  </a>
                </div>
              </div>

              <div class="details-filter-row details-row-size">
                <label for="size">Size:</label>
                <div class="select-custom">
                  <select name="size" id="size" class="form-control">
                    <option value="#" selected="selected">Select a size</option>
                    <option value="s">Small</option>
                    <option value="m">Medium</option>
                    <option value="l">Large</option>
                    <option value="xl">Extra Large</option>
                  </select>
                </div>
                <a href="#" class="size-guide"
                  ><i class="icon-th-list"></i> size guide</a
                >
              </div>

              <div class="details-filter-row details-row-size">
                <label for="qty">Qty:</label>
                <div class="product-details-quantity">
                  <div class="input-group input-spinner">
                    <div class="input-group-prepend">
                      <button
                        @click="decrementQuantity"
                        class="btn btn-decrement btn-spinner"
                        type="button"
                      >
                        <i class="icon-minus"></i>
                      </button>
                    </div>
                    <input
                      type="text"
                      style="text-align: center"
                      class="form-control"
                      required=""
                      :value="currentProduct.cart_quantity"
                      placeholder=""
                    />
                    <div class="input-group-append">
                      <button
                        @click="incrementQuantity"
                        class="btn btn-increment btn-spinner"
                        type="button"
                      >
                        <i class="icon-plus"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div class="product-details-action">
                <a
                  href="javascript:void(0);"
                  @click="incrementQuantity"
                  class="btn-product btn-cart"
                >
                  <span>add to cart</span>
                </a>
              </div>

              <!-- Additional product details -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { getSalesPriceWithTax } from "../common/scripts/functions";
import axiosAdmin from "@/common/plugins/axiosAdmin";

export default {
  props: ["currency"],
  setup(props) {
    const store = useStore();
    const route = useRoute();
    const currentProduct = ref({});
    const frontSettings = ref({});
    const frontProductCards = ref([]);
    const featuredProducts = ref([]);
    const currency = ref({});

    onMounted(() => {
      const slug = route.params.slug;
      fetchProductBySlug(slug);
    });

    const fetchProductBySlug = (slug) => {
      axiosAdmin
        .get("front/homepage/flash-wordrobe-2z17xsaa") // Adjust the endpoint as necessary
        .then((response) => {
          const product = response.data; // Assuming this is the product object
          if (product) {
            currentProduct.value = {
              ...product,
              cart_quantity: 0,
            };
          }
        })
        .catch((error) => {
          console.error("Error fetching product:", error);
        });
    };

    const formatAmountCurrency = (amount) => {
      const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
      });
      return formatter.format(amount);
    };

    const incrementQuantity = () => {
      currentProduct.value.cart_quantity += 1;
      addItem(currentProduct.value);
    };

    const decrementQuantity = () => {
      if (currentProduct.value.cart_quantity > 0) {
        currentProduct.value.cart_quantity -= 1;
        addItem(currentProduct.value);
      }
    };

    const addItem = (product) => {
      // Your add item logic here
    };

    return {
      currentProduct,
      formatAmountCurrency,
      addItem,
      incrementQuantity,
      decrementQuantity,
      getSalesPriceWithTax,
    };
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>

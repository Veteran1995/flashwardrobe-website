<template>
  <div class="container pt-6 new-arrivals">
    <div class="heading heading-center mb-3">
      <h2 class="title">{{ text }}</h2>
      <!-- End .title -->

      <p>{{ description }}</p>
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
              <NewArrivalProductCard
                :item="item"
                @myCustomEvent="handleCustomEvent"
              />
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

  <div
    v-if="visible"
    class="modal-backdrop fade show"
    style="opacity: 0.5"
  ></div>

  <!-- Modal Content -->
  <div
    v-if="visible"
    class="modal fade show"
    id="signin-modal"
    tabindex="-1"
    role="dialog"
    style="display: block; padding-right: 15px"
    aria-modal="true"
  >
    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-body">
          <button
            type="button"
            class="close"
            @click="hideModal"
            aria-label="Close"
          >
            <span aria-hidden="true"><i class="icon-close"></i></span>
          </button>

          <div class="page-content">
            <div class="container">
              <div class="product-details-top">
                <div class="row">
                  <div class="col-md-6">
                    <div class="product-gallery product-gallery-vertical">
                      <div class="row">
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
                        <!-- End .product-main-image -->

                        <div
                          id="product-zoom-gallery"
                          class="product-image-gallery"
                        >
                          <a
                            class="product-gallery-item active"
                            href="#"
                            :data-image="currentProduct.image_url"
                            :data-zoom-image="currentProduct.image_url"
                          >
                            <img
                              :src="currentProduct.image_url"
                              alt="product side"
                            />
                          </a>

                          <a
                            class="product-gallery-item"
                            href="#"
                            data-image="/assets/images/products/single/2.jpg"
                            data-zoom-image="/assets/images/products/single/2-big.jpg"
                          >
                            <img
                              :src="currentProduct.image_url"
                              alt="product cross"
                            />
                          </a>

                          <a
                            class="product-gallery-item"
                            href="#"
                            :data-image="currentProduct.image_url"
                            :data-zoom-image="currentProduct.image_url"
                          >
                            <img
                              :src="currentProduct.image_url"
                              alt="product with model"
                            />
                          </a>

                          <a
                            class="product-gallery-item"
                            href="#"
                            :data-image="currentProduct.image_url"
                            :data-zoom-image="currentProduct.image_url"
                          >
                            <img
                              :src="currentProduct.image_url"
                              alt="product back"
                            />
                          </a>
                        </div>
                        <!-- End .product-image-gallery -->
                      </div>
                      <!-- End .row -->
                    </div>
                    <!-- End .product-gallery -->
                  </div>
                  <!-- End .col-md-6 -->

                  <div class="col-md-6">
                    <div class="product-details">
                      <h1 class="product-title">{{ currentProduct.name }}</h1>
                      <!-- End .product-title -->

                      <div class="ratings-container">
                        <div class="ratings">
                          <div class="ratings-val" style="width: 80%"></div>
                          <!-- End .ratings-val -->
                        </div>
                        <!-- End .ratings -->
                        <a
                          class="ratings-text"
                          href="#product-review-link"
                          id="review-link"
                          >( 2 Reviews )</a
                        >
                      </div>
                      <!-- End .rating-container -->

                      <div class="product-price">
                        {{
                          formatAmountCurrency(
                            getSalesPriceWithTax(currentProduct)
                          )
                        }}
                      </div>
                      <!-- End .product-price -->

                      <div class="product-content">
                        <p>
                          {{ currentProduct.description }}
                        </p>
                      </div>
                      <!-- End .product-content -->

                      <div class="details-filter-row details-row-size">
                        <label>Color:</label>

                        <div class="product-nav product-nav-thumbs">
                          <a href="#" class="active">
                            <img
                              :src="currentProduct.image_url"
                              alt="product desc"
                            />
                          </a>
                          <a href="#">
                            <img
                              :src="currentProduct.image_url"
                              alt="product desc"
                            />
                          </a>
                        </div>
                        <!-- End .product-nav -->
                      </div>
                      <!-- End .details-filter-row -->

                      <div class="details-filter-row details-row-size">
                        <label for="size">Size:</label>
                        <div class="select-custom">
                          <select name="size" id="size" class="form-control">
                            <option value="#" selected="selected">
                              Select a size
                            </option>
                            <option value="s">Small</option>
                            <option value="m">Medium</option>
                            <option value="l">Large</option>
                            <option value="xl">Extra Large</option>
                          </select>
                        </div>
                        <!-- End .select-custom -->

                        <a href="#" class="size-guide"
                          ><i class="icon-th-list"></i>size guide</a
                        >
                      </div>
                      <!-- End .details-filter-row -->

                      <div class="details-filter-row details-row-size">
                        <label for="qty">Qty:</label>
                        <div class="product-details-quantity">
                          <input
                            type="number"
                            id="qty"
                            class="form-control"
                            value="1"
                            min="1"
                            max="10"
                            step="1"
                            data-decimals="0"
                            required=""
                            style="display: none"
                          />
                          <div class="input-group input-spinner">
                            <div class="input-group-prepend">
                              <button
                                @click="
                                  currentProduct.cart_quantity -= 1;
                                  addItem(currentProduct);
                                "
                                style="min-width: 26px"
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
                                @click="
                                  currentProduct.cart_quantity += 1;
                                  addItem(currentProduct);
                                "
                                style="min-width: 26px"
                                class="btn btn-increment btn-spinner"
                                type="button"
                              >
                                <i class="icon-plus"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                        <!-- End .product-details-quantity -->
                      </div>
                      <!-- End .details-filter-row -->

                      <div class="product-details-action">
                        <a
                          href="javascript:void(0);"
                          @click="
                            currentProduct.cart_quantity += 1;
                            addItem(currentProduct);
                          "
                          class="btn-product btn-cart"
                          ><span>add to cart</span></a
                        >

                        <!-- End .details-action-wrapper -->
                      </div>
                      <!-- End .product-details-action -->

                      <div class="product-details-footer">
                        <div class="product-cat">
                          <span>Category:</span>
                          <a href="#">Women</a>, <a href="#">Dresses</a>,
                          <a href="#">Yellow</a>
                        </div>
                        <!-- End .product-cat -->

                        <div class="social-icons social-icons-sm">
                          <span class="social-label">Share:</span>
                          <a
                            href="#"
                            class="social-icon"
                            title="Facebook"
                            target="_blank"
                            ><i class="icon-facebook-f"></i
                          ></a>
                          <a
                            href="#"
                            class="social-icon"
                            title="Twitter"
                            target="_blank"
                            ><i class="icon-twitter"></i
                          ></a>
                          <a
                            href="#"
                            class="social-icon"
                            title="Instagram"
                            target="_blank"
                            ><i class="icon-instagram"></i
                          ></a>
                          <a
                            href="#"
                            class="social-icon"
                            title="Pinterest"
                            target="_blank"
                            ><i class="icon-pinterest"></i
                          ></a>
                        </div>
                      </div>
                      <!-- End .product-details-footer -->
                    </div>
                    <!-- End .product-details -->
                  </div>
                  <!-- End .col-md-6 -->
                </div>
                <!-- End .row -->
              </div>
              <!-- End .product-details-top -->

              <div class="product-details-tab">
                <ul class="nav nav-pills justify-content-center" role="tablist">
                  <li class="nav-item">
                    <a
                      class="nav-link active"
                      id="product-desc-link"
                      data-toggle="tab"
                      href="#product-desc-tab"
                      role="tab"
                      aria-controls="product-desc-tab"
                      aria-selected="true"
                      >Description</a
                    >
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      id="product-info-link"
                      data-toggle="tab"
                      href="#product-info-tab"
                      role="tab"
                      aria-controls="product-info-tab"
                      aria-selected="false"
                      >Additional information</a
                    >
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      id="product-shipping-link"
                      data-toggle="tab"
                      href="#product-shipping-tab"
                      role="tab"
                      aria-controls="product-shipping-tab"
                      aria-selected="false"
                      >Shipping &amp; Returns</a
                    >
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      id="product-review-link"
                      data-toggle="tab"
                      href="#product-review-tab"
                      role="tab"
                      aria-controls="product-review-tab"
                      aria-selected="false"
                      >Reviews (2)</a
                    >
                  </li>
                </ul>
                <div class="tab-content">
                  <div
                    class="tab-pane fade active show"
                    id="product-desc-tab"
                    role="tabpanel"
                    aria-labelledby="product-desc-link"
                  >
                    <div class="product-desc-content">
                      <h3>Product Information</h3>
                      <p>
                        {{ currentProduct.description }}
                      </p>
                      <ul>
                        <li>
                          Nunc nec porttitor turpis. In eu risus enim. In vitae
                          mollis elit.
                        </li>
                        <li>Vivamus finibus vel mauris ut vehicula.</li>
                        <li>
                          Nullam a magna porttitor, dictum risus nec, faucibus
                          sapien.
                        </li>
                      </ul>

                      <p>Not Available</p>
                    </div>
                    <!-- End .product-desc-content -->
                  </div>
                  <!-- .End .tab-pane -->
                  <div
                    class="tab-pane fade"
                    id="product-info-tab"
                    role="tabpanel"
                    aria-labelledby="product-info-link"
                  >
                    <div class="product-desc-content">
                      <h3>Information</h3>
                      <p>Not Available</p>
                    </div>
                    <!-- End .product-desc-content -->
                  </div>
                  <!-- .End .tab-pane -->
                  <div
                    class="tab-pane fade"
                    id="product-shipping-tab"
                    role="tabpanel"
                    aria-labelledby="product-shipping-link"
                  >
                    <div class="product-desc-content">
                      <h3>Delivery &amp; returns</h3>
                      <p>Not Available</p>
                    </div>
                    <!-- End .product-desc-content -->
                  </div>
                  <!-- .End .tab-pane -->
                  <div
                    class="tab-pane fade"
                    id="product-review-tab"
                    role="tabpanel"
                    aria-labelledby="product-review-link"
                  >
                    <div class="reviews">
                      <h3>Reviews (2)</h3>
                      Not Available
                      <!-- End .review -->
                    </div>
                    <!-- End .reviews -->
                  </div>
                  <!-- .End .tab-pane -->
                </div>
                <!-- End .tab-content -->
              </div>
              <!-- End .product-details-tab -->

              <!-- End .owl-carousel -->
            </div>
            <!-- End .container -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import NewArrivalProductCard from "./NewArrivalProductCard.vue";
import { useStore } from "vuex";
import { filter, forEach } from "lodash-es";
import { getSalesPriceWithTax } from "../common/scripts/functions";
import { message } from "ant-design-vue"; // Assuming you're using ant-design-vue

const visible = ref(false);
const currentProduct = ref({});
const store = useStore();
const emit = defineEmits(["customEvent"]); // Declare emit for custom events

// Declare props using defineProps
const props = defineProps({
  products: {
    type: Array,
    required: true, // Ensure products is an array
  },
  text: {
    type: String,
    required: true, // Ensure text is required
  },
  description: {
    type: String,
    required: true, // Ensure text is required
  },
});

onMounted(() => {
  const cartItems = store.getters["front/storeCartItems"];
  let productQuantity = 0;

  // Assuming you're working with a list of products and `props.products[0]`
  if (props.products.length > 0) {
    forEach(cartItems, (item) => {
      if (item.xid == props.products[0].xid) {
        productQuantity = item.cart_quantity;
      }
    });

    currentProduct.value = {
      ...props.products[0], // Using the first product or any logic to select the product
      cart_quantity: productQuantity,
    };
  }
});

const showModal = () => {
  visible.value = true;
};

const hideModal = () => {
  visible.value = false;
};

const formatAmountCurrency = (amount) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  return formatter.format(amount);
};

const addItem = (item) => {
  const cartItems = store.getters["front/storeCartItems"];
  const updatedCartItems = filter(
    cartItems,
    (cartItem) => cartItem.xid != item.xid
  );

  if (item.cart_quantity > 0) {
    updatedCartItems.push({
      ...item,
      cart_quantity: item.cart_quantity,
    });
  }

  store.commit("front/addCartItems", updatedCartItems);
  message.success("Item updated in cart");
};

watch(
  () => store.getters["front/storeCartItems"],
  (newCartItems) => {
    let productQuantity = 0;

    forEach(newCartItems, (item) => {
      if (item.xid == currentProduct.value.xid) {
        productQuantity = item.cart_quantity;
      }
    });

    currentProduct.value = {
      ...currentProduct.value,
      cart_quantity: productQuantity,
    };
  },
  { immediate: true }
);

// Custom event handler function
const handleCustomEvent = (data) => {
  currentProduct.value = data;
  visible.value = true;
};
</script>

<style scoped>
.modal-dialog {
  max-width: 80%;
  margin: 1.75rem auto;
}

.modal-content {
  max-height: calc(100vh - 2rem); /* Make sure content is scrollable */
  overflow-y: auto;
}

.modal-body {
  padding: 2rem;
}
</style>

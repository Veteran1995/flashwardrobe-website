<template>
  <div
    class="col-6 col-md-4 col-lg-3"
    v-if="currentProduct && currentProduct.xid"
  >
    <div class="product product-2">
      <figure class="product-media">
        <a href="javascript:void(0);" @click="displayProduct">
          <img
            :src="currentProduct.image_url"
            alt="Product image"
            class="product-image"
            style="height: 300px; background-size: contain"
          />
          <img
            :src="currentProduct.image_url"
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

        <div
          class="product-action product-action-transparent"
          v-if="currentProduct.cart_quantity == 0"
        >
          <a
            href="javascript:void(0);"
            class="btn-product btn-cart"
            @click="
              currentProduct.cart_quantity += 1;
              addItem(currentProduct);
            "
            ><span>add to cart</span></a
          >
        </div>
        <div>
          <div
            class="cart-product-quantity"
            v-if="currentProduct.cart_quantity > 0"
            style="width: 100%"
          >
            <input
              type="number"
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
                :value="currentProduct.cart_quantity"
                required=""
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
          <a href="product.html">{{ currentProduct.name }}</a>
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
<script>
import { ref, onMounted, watch } from "vue";
import { useStore } from "vuex";
import { message } from "ant-design-vue";
import { filter, forEach } from "lodash-es";
import cart from "../common/composable/cart";
import { getSalesPriceWithTax } from "../common/scripts/functions";

export default {
  props: ["item", "currency"],
  emits: ["myCustomEvent"], // Declare the event
  setup(props, { emit }) {
    const store = useStore();
    const visible = ref(false);
    const productQuantity = ref(1); // Correct initialization of product quantity
    const currentProduct = ref({});

    onMounted(() => {
      const cartItems = store.getters["front/storeCartItems"];
      let productQuantity = 0;

      forEach(cartItems, (iee) => {
        if (iee.xid === props.item.xid) {
          productQuantity = iee.cart_quantity;
        }
      });

      currentProduct.value = {
        ...props.item,
        cart_quantity: productQuantity,
      };
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
        (cartItem) => cartItem.xid !== item.xid
      );

      if (item.cart_quantity > 0) {
        updatedCartItems.push({
          ...item,
          cart_quantity: item.cart_quantity,
        });
      }

      store.commit("front/addCartItems", updatedCartItems);
      message.success(`Item updated in cart`);
    };

    watch(
      () => store.state.front,
      () => {
        let productQuantity = 0;
        forEach(store.getters["front/storeCartItems"], (iee) => {
          if (iee.xid === currentProduct.value.xid) {
            productQuantity = iee.cart_quantity;
          }
        });

        currentProduct.value = {
          ...currentProduct.value,
          cart_quantity: productQuantity,
        };
      }
    );

    const displayProduct = () => {
      emit("myCustomEvent", currentProduct.value); // Emit event with the current product data
    };

    return {
      currentProduct,
      formatAmountCurrency,
      visible,
      productQuantity,
      hideModal,
      showModal,
      addItem,
      getSalesPriceWithTax,
      displayProduct,
    };
  },
};
</script>

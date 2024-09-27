<template>
  <a
    href="#"
    class="dropdown-toggle"
    role="button"
    data-toggle="dropdown"
    aria-haspopup="true"
    aria-expanded="false"
    data-display="static"
  >
    <i class="icon-shopping-cart"></i>
    <span class="cart-count">{{ totalCartItems }}</span>
  </a>
  <div class="dropdown-menu dropdown-menu-right">
    <div class="dropdown-cart-products" v-if="products.length > 0">
      <div v-for="item in products.slice(0, 4)" :key="item.xid" class="product">
        <div class="product-cart-details">
          <h4 class="product-title">
            <a href="product.html"> {{ item.name }} </a>
          </h4>

          <span class="cart-product-info" @click="removeItem(item.xid)">
            <span class="cart-product-qty">{{ item.cart_quantity }}</span>
            x {{ formatAmountCurrency(getSalesPriceWithTax(item)) }}
          </span>
        </div>

        <figure class="product-image-container">
          <a href="product.html" class="product-image">
            <img :src="item.image_url" alt="product" />
          </a>
        </figure>
        <a
          href="javascript:void(0);"
          @click="removeItem(item.xid)"
          class="btn-remove"
          title="Remove Product"
        >
          <i class="icon-close"></i>
        </a>
      </div>
    </div>

    <div class="dropdown-cart-total">
      <span>Total</span>

      <span class="cart-total-price">{{ formatAmountCurrency(total) }}</span>
    </div>

    <div class="dropdown-cart-action">
      <router-link to="/shop/cart" class="btn btn-primary"
        >View Cart</router-link
      >
      <a
        href="javascript:void(0);"
        @click="proceedCheckout"
        class="btn btn-outline-primary-2"
      >
        <span>Checkout</span>
        <i class="icon-long-arrow-right"></i>
      </a>
    </div>
    <Login :modalVisible="isLoginModalVisible" @modalClosed="closeLoginModal" />
  </div>
</template>
<script>
import { defineComponent, computed, ref, onMounted, watch } from "vue";

import { useStore } from "vuex";
import { useRouter } from "vue-router";
import cart from "../../common/composable/cart";
import { getSalesPriceWithTax } from "../../common/scripts/functions";
import Login from "./Login.vue";

export default defineComponent({
  emits: ["openLoginModal"],
  components: { Login },
  setup(props, { emit }) {
    const store = useStore();
    const visible = ref(false);
    const router = useRouter();
    const { products, updateCart, removeItem, total, frontWarehouse } = cart();

    const showDrawer = () => (visible.value = true);

    const closeDrawer = () => (visible.value = false);
    const loginModalVisible = ref(false);
    const isLoginModalVisible = ref(false);

    const isLoggedIn = computed(() => {
      return store.getters["front/isLoggedIn"];
    });

    const openLoginModal = () => {
      loginModalVisible.value = true;
    };

    const loginModalClosed = () => {
      loginModalVisible.value = false;
    };

    const closeLoginModal = () => {
      isLoginModalVisible.value = false;
    };

    const formatAmountCurrency = (amount) => {
      const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
      });

      return formatter.format(amount);
    };

    const proceedCheckout = () => {
      if (isLoggedIn.value) {
        router.push({ name: "checkout" });
      } else {
        isLoginModalVisible.value = true;
      }
    };

    return {
      visible,
      showDrawer,
      closeDrawer,
      totalCartItems: computed(() => store.getters["front/totalCartItems"]),
      isLoggedIn,
      products,
      removeItem,
      updateCart,
      formatAmountCurrency,
      total,
      proceedCheckout,
      getSalesPriceWithTax,
      frontWarehouse,
      isLoginModalVisible,
      closeLoginModal,
      innerWidth: window.innerWidth,
      openLoginModal,
      loginModalClosed,
    };
  },
});
</script>

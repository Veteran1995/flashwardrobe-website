<template>
  <tr>
    <td class="product-col">
      <div class="product">
        <figure class="product-media">
          <a href="#">
            <img :src="item.image_url" alt="Product image" />
          </a>
        </figure>

        <h3 class="product-title">
          <a href="#">{{ item.name }}</a>
        </h3>
        <!-- End .product-title -->
      </div>
      <!-- End .product -->
    </td>
    <td class="price-col">
      {{ formatAmountCurrency(getSalesPriceWithTax(item)) }}
    </td>
    <td class="quantity-col">
      <div class="cart-product-quantity">
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
                item.cart_quantity -= 1;
                addItem(item);
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
            :value="item.cart_quantity"
            placeholder=""
          />
          <div class="input-group-append">
            <button
              @click="
                item.cart_quantity += 1;
                addItem(item);
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
      <!-- End .cart-product-quantity -->
    </td>
    <td class="total-col">
      {{
        formatAmountCurrency(getSalesPriceWithTax(item) * item.cart_quantity)
      }}
    </td>
    <td class="remove-col">
      <button @click="removeItem(item.xid)" class="btn-remove">
        <i class="icon-close"></i>
      </button>
    </td>
  </tr>
</template>
<script>
import { defineComponent, computed, ref, onMounted, watch } from "vue";

import { useStore } from "vuex";
import { useRouter } from "vue-router";
import cart from "../../common/composable/cart";
import { getSalesPriceWithTax } from "../../common/scripts/functions";

export default defineComponent({
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  emits: ["openLoginModal"],
  components: {},
  setup(props, { emit }) {
    const store = useStore();
    const visible = ref(false);
    const router = useRouter();
    const { products, updateCart, removeItem, total, frontWarehouse } = cart();

    const showDrawer = () => (visible.value = true);

    const closeDrawer = () => (visible.value = false);

    const isLoggedIn = computed(() => {
      return store.getters["front/isLoggedIn"];
    });

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
      message.success(`Item updated in cart`);
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
      visible.value = false;

      if (isLoggedIn.value) {
        router.push({
          name: "front.checkout",
          params: { warehouse: frontWarehouse.value.slug },
        });
      } else {
        emit("openLoginModal");
      }
    };

    return {
      visible,
      showDrawer,
      closeDrawer,
      totalCartItems: computed(() => store.getters["front/totalCartItems"]),

      products,
      removeItem,
      updateCart,
      formatAmountCurrency,
      total,
      proceedCheckout,
      getSalesPriceWithTax,
      frontWarehouse,

      innerWidth: window.innerWidth,
    };
  },
});
</script>

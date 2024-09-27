<template>
  <div>
    <div
      class="page-header text-center"
      style="background-image: url('assets/images/page-header-bg.jpg')"
    >
      <div class="container">
        <h1 class="page-title">Shopping Cart<span>Shop</span></h1>
      </div>
      <!-- End .container -->
    </div>
    <!-- End .page-header -->

    <nav aria-label="breadcrumb" class="breadcrumb-nav">
      <div class="container">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="index.html">Home</a></li>
          <li class="breadcrumb-item"><a href="#">Shop</a></li>
          <li class="breadcrumb-item active" aria-current="page">
            Shopping Cart
          </li>
        </ol>
      </div>
      <!-- End .container -->
    </nav>
    <!-- End .breadcrumb-nav -->

    <div class="page-content">
      <div class="cart">
        <div class="container">
          <div class="row">
            <div class="col-lg-9">
              <table class="table table-cart table-mobile">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  <template v-if="products && products.length > 0">
                    <CartItem
                      v-for="item in products.slice(0, 4)"
                      :key="item.xid"
                      :item="item"
                    />
                  </template>
                  <template v-else>
                    <p style="font-size: large;">No Item in cart</p>
                  </template>
                </tbody>
              </table>
              <!-- End .table table-wishlist -->

              <div class="cart-bottom">
                <div class="cart-discount">
                  <form action="#">
                    <div class="input-group">
                      <input
                        type="text"
                        class="form-control"
                        required
                        placeholder="coupon code"
                      />
                      <div class="input-group-append">
                        <button class="btn btn-outline-primary-2" type="submit">
                          <i class="icon-long-arrow-right"></i>
                        </button>
                      </div>
                      <!-- .End .input-group-append -->
                    </div>
                    <!-- End .input-group -->
                  </form>
                </div>
                <!-- End .cart-discount -->

                <router-link to="/shop/cart" class="btn btn-outline-dark-2"
                  ><span>UPDATE CART</span><i class="icon-refresh"></i
                ></router-link>
              </div>
              <!-- End .cart-bottom -->
            </div>
            <!-- End .col-lg-9 -->
            <aside class="col-lg-3">
              <div class="summary summary-cart">
                <h3 class="summary-title">Cart Total</h3>
                <!-- End .summary-title -->

                <table class="table table-summary">
                  <tbody>
                    <tr class="summary-subtotal">
                      <td>Subtotal:</td>
                      <td>{{ formatAmountCurrency(total) }}</td>
                    </tr>

                    <tr class="summary-total">
                      <td>Total:</td>
                      <td>{{ formatAmountCurrency(total) }}</td>
                    </tr>
                    <!-- End .summary-total -->
                  </tbody>
                </table>
                <!-- End .table table-summary -->

                <a
                  href="javascript:void(0);"
                  @click="proceedCheckout"
                  class="btn btn-outline-primary-2 btn-order btn-block"
                  >PROCEED TO CHECKOUT</a
                >
              </div>
              <!-- End .summary -->

              <router-link
                to="/shop"
                class="btn btn-outline-dark-2 btn-block mb-3"
                ><span>CONTINUE SHOPPING</span><i class="icon-refresh"></i
              ></router-link>
            </aside>
            <!-- End .col-lg-3 -->
          </div>
          <!-- End .row -->
        </div>
        <!-- End .container -->
      </div>
      <!-- End .cart -->
    </div>

    <!-- Login Modal Component -->
    <Login :modalVisible="isLoginModalVisible" @modalClosed="closeLoginModal" />
  </div>
</template>

<script>
import { defineComponent, computed, ref, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import cart from "../common/composable/cart";
import CartItem from "@/components/Auth/CartItem.vue";
import Login from "@/components/Auth/Login.vue";

export default defineComponent({
  emits: ["openLoginModal"],
  components: {
    CartItem,
    Login,
  },
  setup(props, { emit }) {
    const store = useStore();
    const router = useRouter();
    const { products, updateCart, removeItem, total } = cart();

    const isLoginModalVisible = ref(false);

    const isLoggedIn = computed(() => store.getters["front/isLoggedIn"]);

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
        emit("openLoginModal");
      }
    };

    const closeLoginModal = () => {
      isLoginModalVisible.value = false;
    };

    return {
      products,
      updateCart,
      removeItem,
      formatAmountCurrency,
      total,
      proceedCheckout,
      isLoginModalVisible,
      closeLoginModal,
    };
  },
});
</script>

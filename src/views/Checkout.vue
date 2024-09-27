<template>
  <div
    class="page-header text-center"
    style="background-image: url('assets/images/page-header-bg.jpg')"
  >
    <div class="container">
      <h1 class="page-title">Checkout<span>Shop</span></h1>
    </div>
    <!-- End .container -->
  </div>
  <!-- End .page-header -->
  <nav aria-label="breadcrumb" class="breadcrumb-nav">
    <div class="container">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="index.html">Home</a></li>
        <li class="breadcrumb-item"><a href="#">Shop</a></li>
        <li class="breadcrumb-item active" aria-current="page">Checkout</li>
      </ol>
    </div>
    <!-- End .container -->
  </nav>
  <!-- End .breadcrumb-nav -->

  <div class="page-content">
    <div class="checkout">
      <div class="container">
        <!-- End .checkout-discount -->

        <div class="row">
          <div class="col-lg-9">
            <h2 class="checkout-title">Billing Details</h2>
            <UserAddress
              :selectedAddress="selectedAddress"
              @onAddressSelection="addressSelected"
            />
          </div>
          <!-- End .col-lg-9 -->
          <aside class="col-lg-3">
            <div class="summary">
              <h3 class="summary-title">Your Order</h3>
              <!-- End .summary-title -->

              <table class="table table-summary">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Total</th>
                  </tr>
                </thead>

                <tbody>
                  <template v-if="products">
                    <tr v-for="item in products">
                      <td>
                        <a href="#">{{ item.name }}</a>
                      </td>
                      <td>
                        {{
                          formatAmountCurrency(
                            getSalesPriceWithTax(item) * item.cart_quantity
                          )
                        }}
                      </td>
                    </tr>
                  </template>

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

              <div class="accordion-summary" id="accordion-payment">
                <div class="card">
                  <div class="card-header" id="heading-3">
                    <h2 class="card-title">
                      <a
                        class="collapsed"
                        role="button"
                        data-toggle="collapse"
                        href="#collapse-3"
                        aria-expanded="false"
                        aria-controls="collapse-3"
                      >
                        Cash on delivery
                      </a>
                    </h2>
                  </div>
                  <!-- End .card-header -->
                  <div
                    id="collapse-3"
                    class="collapse"
                    aria-labelledby="heading-3"
                    data-parent="#accordion-payment"
                  >
                    <div class="card-body">
                      Quisque volutpat mattis eros. Lorem ipsum dolor sit amet,
                      consectetuer adipiscing elit. Donec odio. Quisque volutpat
                      mattis eros.
                    </div>
                    <!-- End .card-body -->
                  </div>
                  <!-- End .collapse -->
                </div>
                <!-- End .card -->
              </div>
              <!-- End .accordion -->

              <button
                :disabled="products.length == 0 || selectedAddress == null"
                @click.prevent="confirmOrder"
                class="btn btn-outline-primary-2 btn-order btn-block"
              >
                <span class="btn-text">Confirm Order</span>
                <span class="btn-hover-text">Proceed to Checkout</span>
              </button>
            </div>
            <!-- End .summary -->
          </aside>
          <!-- End .col-lg-3 -->
        </div>
        <!-- End .row -->
      </div>
      <!-- End .container -->
    </div>
    <!-- End .checkout -->
  </div>
  <!-- End .page-content -->
</template>

<script>
import { defineComponent, ref, onMounted, createVNode } from "vue";
import {
  DeleteOutlined,
  WalletOutlined,
  RollbackOutlined,
  RightOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons-vue";
import { Modal } from "ant-design-vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import cart from "../common/composable/cart";
import UserAddress from "./address/Index.vue";
import { getSalesPriceWithTax } from "../common/scripts/functions";
import apiFront from "../common/composable/apiFront";
import FullScreenLoading from "@/components/FullScreenLoading.vue"; // Import the component

export default defineComponent({
  components: {
    DeleteOutlined,
    WalletOutlined,
    RollbackOutlined,
    RightOutlined,
    UserAddress,
    ExclamationCircleOutlined,
    FullScreenLoading,
  },
  setup() {
    const {
      products,
      updateCart,
      removeItem,
      subtotal,
      totalTax,
      total,
      frontWarehouse,
    } = cart();
    const selectedAddress = ref(null);
    const addressMethod = ref(true);
    const { t } = useI18n();
    const router = useRouter();
    const store = useStore();
    const { loading, addEditRequestFront } = apiFront();

    const isLoading = ref(true); // Initialize isLoading to true

    onMounted(() => {});

    const addressSelected = (addressId) => {
      selectedAddress.value = addressId;
    };

    const formatAmountCurrency = (amount) => {
      const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
      });

      return formatter.format(amount);
    };

    const confirmOrder = () => {
      Modal.confirm({
        title: t("front.confirm_order"),
        icon: createVNode(ExclamationCircleOutlined),
        content: t("front.confirm_order_message"),
        okText: t("common.yes"),
        cancelText: t("common.no"),
        onOk() {
          addEditRequestFront({
            url: `front/self/checkout-orders/${frontWarehouse.value.slug}`,
            data: {
              products: products.value,
              address_id: selectedAddress.value,
              warehouse: frontWarehouse.value.slug,
            },
            successMessage: t("front.order_placed_message"),
            success: (res) => {
              store.commit("front/addCartItems", []);
              router.push({
                name: "checkout.success",
                params: {
                  uniqueId: res.unique_id,
                  warehouse: frontWarehouse.value.slug,
                },
              });
            },
          });
        },
        onCancel() {
          loading.value = false;
        },
      });
    };

    return {
      products,
      removeItem,
      updateCart,
      formatAmountCurrency,
      subtotal,
      total,
      totalTax,
      selectedAddress,
      addressSelected,
      addressMethod,
      getSalesPriceWithTax,
      confirmOrder,
      loading,
      frontWarehouse,
    };
  },
});
</script>
<style lang="less">
.payment-methods {
  border: 1px solid #f0f2f5;
  border-radius: 5px;
  background: #fbfbfb;
  padding: 10px;

  .cod {
    display: flex;
    justify-content: space-between;

    .icon-text {
      display: flex;
      align-items: center;
      font-weight: 500;
    }
  }
}
</style>

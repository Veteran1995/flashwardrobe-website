<template>
  <div>
    <!-- Alert Box for Cancelled Order -->
    <div v-if="order.cancelled" class="alert-box alert-error">
      <i class="icon-stop"></i>
      <strong>{{ $t("online_orders.order_cancelled") }}</strong>
      <p>{{ $t("online_orders.order_cancelled_message") }}</p>
    </div>

    <!-- Order Status Display -->
    <div v-else class="order-status">
      {{ order.order_status }}
    </div>

    <!-- Order Summary -->
    <div class="item-desc">
      <span>{{ $t("online_orders.order_summary") }}</span>
    </div>

    <!-- Order Details Description List -->
    <div class="description-container">
      <dl class="description-list">
        <dt>Order Id</dt>
        <dd>{{ order.invoice_number }}</dd>

        <dt>Total</dt>
        <dd>{{ order.total }}</dd>

        <dt>Customer Name</dt>
        <dd>{{ order.shipping_address.name }}</dd>

        <dt>Email</dt>
        <dd>{{ order.shipping_address.email }}</dd>

        <dt>Phone</dt>
        <dd>{{ order.shipping_address.phone }}</dd>

        <dt>Payment Status</dt>
        <dd>{{ order.payment_status }}</dd>

        <dt>Order Status</dt>
        <dd>{{ order.order_status }}</dd>

        <dt>Shipping Address</dt>
        <dd>{{ order.shipping_address.shipping_address }}</dd>

        <dt>{{ $t("stock.billing_address") }}</dt>
        <dd>{{ order.shipping_address.address }}</dd>
      </dl>
    </div>

    <!-- Order Items Table -->
    <div class="table-container">
      <table class="order-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in order.items" :key="item.id">
            <td>{{ index + 1 }}</td>
            <td>{{ item.product.name }}</td>
            <td>{{ item.quantity }}</td>
            <td>{{ item.unit_price }}</td>
            <td>{{ item.subtotal }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Totals Summary -->
    <div class="totals-container">
      <div class="totals-row">
        <span>Subtotal</span>
        <span>{{ order.subtotal }}</span>
      </div>
      <div class="totals-row">
        <span>Discount</span>
        <span>{{ order.discount }}</span>
      </div>
      <div class="totals-row">
        <span>Order Tax</span>
        <span>{{ order.tax_amount }}</span>
      </div>
      <div class="totals-row">
        <span>Shipping</span>
        <span>{{ order.shipping }}</span>
      </div>
      <div class="totals-row totals-grand-total">
        <strong>Grand Total</strong>
        <strong>{{ order.total }}</strong>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    order: {
      default: {},
    },
    detailView: {
      default: "front",
    },
  },
});
</script>

<style scoped>
.alert-box {
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}

.alert-error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.alert-error i.icon-stop {
  margin-right: 10px;
}

.order-status {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
}

.item-desc {
  margin-top: 40px;
  font-size: 16px;
  font-weight: bold;
}

.description-container {
  margin-top: 20px;
}

.description-list {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 10px;
  margin: 0;
  padding: 0;
}

.description-list dt {
  font-weight: bold;
}

.description-list dd {
  margin: 0;
}

.table-container {
  margin-top: 20px;
}

.order-table {
  width: 100%;
  border-collapse: collapse;
}

.order-table th,
.order-table td {
  padding: 10px;
  border: 1px solid #ccc;
  text-align: left;
}

.totals-container {
  margin-top: 30px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  font-weight: bold;
}

.totals-row {
  display: flex;
  justify-content: space-between;
}

.totals-grand-total {
  font-size: 1.2em;
}
</style>

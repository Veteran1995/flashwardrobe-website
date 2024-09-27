<template>
  <!-- Orders Table -->
  <div class="table-responsive">
    <table class="table table-hover table-striped table-custom">
      <thead>
        <tr>
          <th>Date</th>
          <th>Total</th>
          <th>Order Status</th>
          <th>Payment Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in data" :key="order.id">
          <td>{{ order.order_date }}</td>
          <td>{{ formatAmountCurrency(order.total) }}</td>
          <td>
            <span
              :class="`badge p-2 ${
                order.order_status === 'delivered'
                  ? 'badge-success'
                  : 'badge-primary'
              }`"
            >
              {{ order.order_status }}
            </span>
          </td>
          <td>
            <span
              :class="`badge p-2 ${
                order.payment_status === 'paid' ? 'badge-success' : 'badge-danger'
              }`"
            >
              {{ order.payment_status }}
            </span>
          </td>
          <td style="display: flex; align-items: center">
            <OrderDetailsModal :order="order" />
            <a href="javascript:void(0);" @click="cancelOrder(order.unique_id)">
              <i style="font-size: 20px" class="icon-eye"></i>
            </a>
            <a href="#">
              <i
                style="font-size: 25px; margin-left: 5px"
                class="icon-arrow-down"
              ></i>
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import OrderDetailsModal from "./OrderDetailsModal.vue";
import common from "../common/composable/common";

export default defineComponent({
  props: ["data"],
  emits: ["reloadOrders"],
  components: {
    OrderDetailsModal,
  },
  setup(props, { emit }) {
    const formatAmountCurrency = (amount) => {
      const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
      });

      return formatter.format(amount);
    };

    const cancelOrder = (uniqueId) => {
      if (confirm("Are you sure you want to cancel this order?")) {
        axios.post(`/front/self/cancel-order/${uniqueId}`).then((response) => {
          emit("reloadOrders");
          alert("Order cancelled successfully.");
        });
      }
    };

    return {
      cancelOrder,
      formatAmountCurrency,
    };
  },
});
</script>

<style scoped>
.table-responsive {
  width: 100%; /* Ensures the table takes full width */
  overflow-x: auto; /* Allows horizontal scrolling on smaller screens */
}

.table-custom {
  width: 100%; /* Ensures the table takes full width */
}

.table-custom th {
  background-color: #c66;
  color: white;
  padding-left: 5px;
}

.table-custom td {
  padding: 10px;
  text-align: center;
}

/* Badge Styling */
.badge {
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 14px;
  color: #fff;
}

.badge-success {
  background-color: #28a745;
}

.badge-primary {
  background-color: #007bff;
}

.badge-danger {
  background-color: #dc3545;
}
</style>

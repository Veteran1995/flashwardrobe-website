<template>
  <div class="mt-30 mb-30">
    <div class="breadcrumb-container">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <router-link
              :to="{
                name: 'homepage',
              }"
            >
              {{ $t("front.home") }}
            </router-link>
          </li>
          <li class="breadcrumb-item">
            <router-link
              :to="{
                name: 'dashboard',
              }"
            >
              {{ $t("front.dashboard") }}
            </router-link>
          </li>
          <li class="breadcrumb-item">
            <router-link
              :to="{
                name: 'dashboard',
              }"
            >
              {{ $t("front.my_orders") }}
            </router-link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            {{ $t("front.order_placed") }}
          </li>
        </ol>
      </nav>
    </div>

    <div class="dashboard-container mt-30">
      <div class="result-container">
        <i class="icon-check" style="font-size: 50px; color: green"></i>
        <div class="result-header">
          <h1>Order Placed</h1>
          <p>{{ $t("Order placed successfully", [orderUniqueId]) }}</p>
        </div>
        <div class="result-actions">
          <router-link
            :to="{
              name: 'dashboard',
            }"
            class="btn btn-primary"
          >
            <i class="icon-shopping-cart"></i> All Orders
          </router-link>
          <router-link
            :to="{
              name: 'homepage',
            }"
            class="btn btn-secondary"
          >
            Continue Shopping
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useRoute } from "vue-router";
import { ShoppingOutlined } from "@ant-design/icons-vue";
export default defineComponent({
  setup() {
    const route = useRoute();
    const orderUniqueId = route.params.uniqueId;

    return {
      orderUniqueId,
    };
  },
});
</script>

<style scoped>
.breadcrumb-container {
  margin-bottom: 1.5rem;
}

.breadcrumb {
  display: flex;
  flex-wrap: wrap;
  padding: 0.75rem 1.25rem;
  margin-bottom: 1rem;
  list-style: none;
  background-color: #e9ecef;
  border-radius: 0.375rem;
}

.breadcrumb-item {
  display: inline-block;
  font-size: 13px;
}

.breadcrumb-item + .breadcrumb-item::before {
  display: inline-block;
  padding-right: 0.5rem;
  color: #6c757d;
  content: "/";
}

.breadcrumb-item.active {
  color: #6c757d;
}

.dashboard-container {
  border-radius: 10px;
  border: 1px solid #ddd;
  padding-top: 200px;
  padding-bottom: 200px;
}

.result-container {
  text-align: center;
}

.result-header h1 {
  margin: 0;
  font-size: 30px;
}

.result-header p {
  margin: 0.5rem 0;
  font-size: 20px;
}

.result-actions {
  margin-top: 1.5rem;
}

.btn {
  display: inline-block;
  padding: 0.5rem 1rem;
  margin: 0.5rem;
  font-size: 18px;
  text-align: center;
  border: 1px solid transparent;
  border-radius: 0.375rem;
  cursor: pointer;
  text-decoration: none;
}

.btn-primary {
  background-color: #007bff;
  color: #fff;
}

.btn-secondary {
  background-color: #6c757d;
  color: #fff;
}

.icon-shopping::before {
  content: "\f08c"; /* Font Awesome shopping icon */
  font-family: "Font Awesome 5 Free";
}
</style>
